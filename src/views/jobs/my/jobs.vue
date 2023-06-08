<template>
    <div class="bg">
        <div class="jobs-list-container">
            <div class="jobs-list-t">
                <div class="jobs-list-label">My Posted Jobs</div>
                <div class="jobs-list-t-r">
                    <el-button type="default" round class="post-job-btn" @click="postJob()">Post a Job
                    </el-button>
                </div>
            </div>

            <div class="jobs-list-content">
                <div class="jobs-list-item" v-for="(item,index) in jobListData" :key="index">
                    <div class="jobs-list-item-l">
                        <el-image class="jobs-item-logo"
                                  :src="item.third_company_logo ? item.third_company_logo : item.company_logo"
                                  fit="contain">
                        </el-image>
                    </div>
                    <div class="jobs-list-item-r">
                        <div class="jobs-list-item-title">
                            <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}">{{
                                    item.job_title
                                }}
                            </router-link>
                        </div>
                        <div class="jobs-list-item-name">
                            {{ item.company_name }}
                        </div>
                        <div class="jobs-list-item-address">
                            {{ item.address }}
                        </div>
                        <div class="jobs-list-item-desc">
                            {{ item.desc }}
                        </div>
                        <div class="jobs-list-item-readmore">
                            <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}">Read More...
                            </router-link>
                        </div>
                    </div>

                    <div class="jobs-list-item-b">
                        <div class="jobs-list-item-b-l">
                            <view class="jobs-list-item-work-type">
                                <i class="iconfont el-icon-alishijian"></i>
                                <template v-if="item.employment_type==1">FT</template>
                                <template v-if="item.employment_type==2">PT</template>
                                <template v-if="item.employment_type==3">S</template>
                            </view>
                            <view class="jobs-list-item-gender" v-if="item.sex == 1 || item.sex == 2">
                                <i class="iconfont el-icon-alimale-female"></i>
                                <template v-if="item.sex == 1">Male</template>
                                <template v-if="item.sex == 2">Female</template>
                            </view>
                            <view class="jobs-list-item-work-exp">
                                <i class="iconfont el-icon-aligongzuojingyan"></i>
                                1-2 yrs
                            </view>
                        </div>

                        <div class="jobs-list-item-b-m">
                            <el-button class="jobs-list-item-b-m-btn" type="primary" round
                                       @click="turnApplications(item.id,item.unread_id)">
                                Applications ( {{ item.resume_count }} ) <span v-if="item.unread_status"
                                                                               class="read-star"></span>
                            </el-button>

                            <el-button class="jobs-list-item-b-m-btn" type="warning" round
                                       @click="turnEditJobs(item.id)">
                                Edit
                            </el-button>

                        </div>


                        <div class="jobs-list-item-b-r">
                            <view class="jobs-list-item-date">
                                <el-icon>
                                    <Calendar/>
                                </el-icon>&nbsp;
                                {{ $filters.howLongFormat(item.refresh_time) }}
                            </view>
                            <view class="jobs-list-item-salary">
                                {{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}
                            </view>
                        </div>
                    </div>

                    <div class="list-item-tag actived-0" v-if="item.status==0">
                        Pending
                    </div>
                    <div class="list-item-tag actived-1" v-if="item.status==1">
                        Active
                    </div>
                    <div class="list-item-tag actived-2" v-if="item.status==2">
                        Rejected
                    </div>

                </div>
            </div>
            <div class="jobs-list-pagination">
                <el-pagination layout="prev, pager, next" :default-current-page="1"
                               @size-change="jobPageSizeChange"
                               @current-change="jobPageChange"
                               :current-page="jobPage" :page-size="jobLimit"
                               :total="jobTotalNum"></el-pagination>
            </div>

        </div>

    </div>
</template>

<script setup>
import {randomString} from "@/utils";
import {MY_JOBS, SET_READ, USER_UNREAD} from '@/api/api';
import {ref, onMounted, computed} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

const store = useStore()
const router = useRouter()
const token = localStorage.getItem('token')
const identity = computed(() => store.state.identity)

const jobListData = ref([])
const jobPage = ref(1)
const jobLimit = ref(5)
const jobTotalNum = ref(0)
const versionTime = randomString()

const postJob = () => {
    router.push({
        path: '/jobs/post', query: {version_time: versionTime}
    })
}

const jobPageSizeChange = (e) => {
    console.log(e)
}

const jobPageChange = (e) => {
    jobPage.value = e
    getMyJobs(e, jobLimit.value)
}

const getMyJobs = (page, limit) => {

    let params = {
        page: page,
        limit: limit
    }

    MY_JOBS(params).then(res => {
        if (res.code == 200) {
            let jobData = res.message.data
            jobTotalNum.value = res.message.total
            // jobListData.value = jobData
            filterUserUnreadAndJobList(jobData)
        }

    }).catch(err => {
        console.log(err)
    })

}

const filterUserUnreadAndJobList = (jobData)=>{

    let params = {
        identity:identity.value
    }

    USER_UNREAD(params).then(res=>{
        let unreadListData = res.message.list;

        jobData.forEach(item => {

            if(unreadListData &&  unreadListData.length> 0){
                let a = unreadListData.filter(function (element) {
                    return element.type == 1 && element.type_id == item.id
                })
                if (a.length > 0) {
                    item.unread_status = true;
                    item.unread_id = a[0].id;
                } else {
                    item.unread_status = false;
                }
            }else{
                item.unread_status = false;
            }

        })

        jobListData.value = jobData

    }).catch(err=>{
        console.log(err)
    })

}

const turnApplications = (id, unreadId) => {
    let data = {
        id: unreadId,
        identity: identity,
        status: 1,
        token: token
    }

    SET_READ(data).then(res => {
        console.log(res)
        if (res.code == 200) {
            router.push({path: '/jobs/applications', query: {id: id}})
        } else {
            console.log('set read:' + res.msg)
        }
    }).catch(err => {
        console.log(err)
    })
}

const turnEditJobs = (jobId) => {
    router.push({path: '/jobs/post', query: {job_id: jobId}})
}

onMounted(() => {
    getMyJobs(jobPage.value, jobLimit.value)
})


</script>

<style scoped>
.bg {
    background-color: #f5f6f7;
}

.jobs-list-container {
    padding: 20px;
    border-radius: 10px;
    background-color: #FFFFFF;
}

.jobs-list-t {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid #EEEEEE;
}

.jobs-list-label {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
}

.post-job-btn {
    background-color: #0AA0A8;
    color: #FFFFFF;
}

.jobs-list-content {
    margin-top: 10px;
}

.jobs-list-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
    background-color: #ffffff;
    padding: 10px 20px;
    border-radius: 10px;
    text-align: left;
    border: 1px solid #EEEEEE;
    position: relative;
    overflow: hidden;
}

.jobs-list-item-l {
    width: 30%;
    height: 180px;
}

.jobs-item-logo {
    width: 80%;
    height: 80%;
    border-radius: 10px;
}

.jobs-list-item-r {
    width: 70%;
}

.jobs-list-item-title a {
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    text-decoration: none;
}

.jobs-list-item-name {
    font-size: 16px;
    color: #808080;
    margin-top: 20px;
}

.jobs-list-item-address {
    font-size: 14px;
    color: #808080;
    margin-top: 10px;
}

.jobs-list-item-desc {
    font-size: 12px;
    color: #808080;
    margin-top: 10px;
}

.jobs-list-item-readmore {
    margin-top: 20px;
}

.jobs-list-item-readmore a {
    font-size: 14px;
    color: #808080;
    text-decoration: none;
}

.jobs-list-item-b {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
}

.jobs-list-item-work-type {
    font-size: 12px;
}

.jobs-list-item-gender {
    font-size: 12px;
    margin-left: 10px;
}

.jobs-list-item-b-l {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 30%;
}


.jobs-list-item-b-r {
    width: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.jobs-list-item-b-m {
    width: 30%;
    text-align: left;
}

.jobs-list-item-b-m-btn {
    position: relative;
}

.jobs-list-item-work-exp {
    font-size: 12px;
    margin-left: 10px;
}

.jobs-list-item-date {
    font-size: 12px;
}

.jobs-list-item-salary {
    font-size: 12px;
    margin-left: 10px;
    color: #00b3d2;
}

.jobs-list-pagination {
    margin-top: 20px;
    text-align: center;
}

.list-item-tag {
    position: absolute;
    top: 8px;
    right: -60px;
    color: #FFFFFF;
    transform: rotate(30deg);
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 160px;
    padding-right: 80px;
    text-align: center;
    font-size: 14px;
}

.actived-0 {
    background-color: #00B3D2;
}

.actived-1 {
    background-color: #B1C452;
}

.actived-2 {
    background-color: #FF2870;
}

.read-star {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: red;
    top: 0;
    right: 1px;
}

@media screen and (min-width: 1200px) {
    .profile-container {
        width: 1100px;
    }

}

@media screen and (max-width: 768px) {
    .jobs-list-item-title a {
        font-size: 14px;
    }

    .jobs-list-item-name {
        margin-top: 4px;
        font-size: 12px;
    }

    .jobs-list-item-desc {
        display: none;
    }

    .jobs-list-item-readmore {
        margin-top: 4px;
        font-size: 14px;
    }

    .jobs-list-item-address {
        margin-top: 4px;
        font-size: 12px;
    }

    .jobs-list-item-l {
        height: 100px;
    }
}

</style>
