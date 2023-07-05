<template>
<el-scrollbar class="applications-container">

    <div class="jobs-items" v-loading="jobsLoadingStatus">

        <div class="jobs-item" v-for="(item,i ) in applyJobsData" :key="i+'-match'">
            <div class="jobs-item-t">
                <div class="jobs-item-t-l">
                    <el-image
                        class="jobs-item-logo"
                        fit="cover"
                        :src="item.job.company_logo">
                        <template #error>
                            <el-image :src="defaultBusinessAvatar"></el-image>
                        </template>
                    </el-image>
                </div>
                <div class="jobs-item-t-r">
                    <div class="jobs-item-name" @click="seeMore(item)">
                        {{item.job.job_title}}
                    </div>
                    <div class="jobs-item-name-time">
                        <span class="xll-tag xll-tag-company-name">
                            <el-image style="margin-right: 8px;" :src="jobBusinessDefaultAvatar" fit="cover"></el-image>
                            {{item.job.company_name}}
                        </span>
                    </div>
                </div>
            </div>
            <div class="jobs-item-m">
                <div class="jobs-item-desc">
                    {{ $filters.doRepAdvance(item.job.desc)  }}
                </div>
            </div>
            <div class="jobs-item-b">
                <el-tooltip
                    effect="light"
                    :content="item.job_location"
                    placement="bottom"
                >
                    <div class="job-item-location">
                        <el-image class="job-item-icon-24"
                                  :src="locationIconImg"></el-image>
                        <span>{{ item.job_location ?? '-' }}</span>
                    </div>

                </el-tooltip>

                <div class="job-item-salary">
                    <el-image class="job-item-icon-24" :src="salaryIconImg"></el-image>
                    <span>{{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}</span>
                </div>

                <div class="job-item-salary">
                    <el-image class="job-item-icon-24" :src="calendarImg"></el-image>
                    <!-- {{ $filters.howLongFormat(item.refresh_time) }} -->
                    <span>{{ dateFormat(item.refresh_time)}}</span>
                </div>

                <div>
                    <span class="xll-tag xll-tag-submitted" v-if="item.status == 1" >Submitted</span>
                    <span class="xll-tag xll-tag-shortlisted" v-if="item.status == 2" >Shortlisted</span>
                    <span class="xll-tag xll-tag-not-selected" v-if="item.status == 3" >Not Selected</span>
                    <span class="xll-tag xll-tag-accepted" v-if="item.status == 4" >Accepted</span>
                </div>
            </div>

            <div class="jobs-item-sl">
                <el-button link type="info" @click="shareJob(item)">
                    <IconIcRoundShare/>
                </el-button>

                <template v-if="item.is_favorite">
                    <el-button link type="info" @click="cancelFavorite(item,i,'jobMatch')">
                        <IconFlatColorIconsLike/>
                    </el-button>
                </template>
                <template v-else>
                    <el-button link type="info" @click="addFavorite(item,i,'jobMatch')">
                        <IconIconParkOutlineLike/>
                    </el-button>
                </template>
            </div>

        </div>

     </div>

    <job-detail :visible="jobDetailVisible" :data="jobDetailData" @close="jobDetailVisible=false"></job-detail>
    <shareCard :visible="shareDialogVisible"
               share-title="Share Job Post"
               :title="shareInfo.title"
               :description="shareInfo.desc"
               :quote="shareInfo.desc"
               :url="shareLocationUrl"
               @close="shareDialogVisible=false"
    >
    </shareCard>

</el-scrollbar>
</template>

<script setup>
import {ADD_FAVORITE, CANCEL_FAVORITE, JOB_DETAIL, MY_APPLY_JOBS} from "@/api/api";
import {ref, onMounted} from 'vue'
import defaultBusinessAvatar from "@/assets/newHome/default-business-avatar.svg";
import jobBusinessDefaultAvatar from '@/assets/newHome/job-business-default-avatar.svg'
import {ElLoading} from 'element-plus'
import JobDetail from "@/components/jobs/jobDetail.vue";
import ShareCard from "@/components/shareCard.vue";
import locationIconImg from "@/assets/newHome/dashboard/location_nofill.svg";
import salaryIconImg from "@/assets/newHome/dashboard/salary_nofill.svg";
import calendarImg from "@/assets/newHome/dashboard/calendar.svg";
import moment from 'moment'

const dateFormat = (value)=>{
    return moment(value).format('LL')
}

const jobDetailVisible = ref(false)
const jobDetailData = ref({})

const jobsLoadingStatus = ref(false)
const jobStatus = ref(0)
const page = ref(1)
const limit = ref(4)
const applyJobsData = ref([])
const applyJobsTotalNum = ref(0)

const getMyApplyJobs = (page,limit)=>{
    let params = {
        page:page,
        limit:limit
    }

    if(jobStatus.value){
        params.status = jobStatus.value
    }

    MY_APPLY_JOBS(params).then(res=>{
        if(res.code == 200){
            applyJobsData.value = res.message.data
            applyJobsTotalNum.value = res.message.total
        }
    }).catch(err=>{
        console.log(err)
    })

}
const seeMore = (item)=>{
    const loading = ElLoading.service({
        text:'loading...'
    })
    let params = {
        job_id:item.id
    }
    JOB_DETAIL(params).then(res=>{
        if(res.code === 200){
            jobDetailData.value = res.message
            jobDetailVisible.value = true
            loading.close()
        }
    }).catch(err=>{
        console.log(err)
        loading.close()
    })

}

const shareDialogVisible = ref(false)
const shareInfo = ref({})
const shareLocationUrl = ref('')
const shareJob = (item) => {
    shareInfo.value = {
        title: item.job_title,
        desc: item.desc,
        id: item.id
    }

    let origin = window.location.origin
    shareLocationUrl.value = origin + '/jobs/detail?id=' + item.id;

    shareDialogVisible.value = true;
}

const addFavorite = (item,index) => {

    let params = {
        type: 1,
        type_id: item.id,
        type_title: item.title,
        type_url: item.company_logo
    }
    // console.log(params)
    ADD_FAVORITE(params).then(res => {
        if (res.code == 200) {
            applyJobsData.value[index]['is_favorite'] = 1

        }
    }).catch(err => {
        console.log(err)

    })

}

const cancelFavorite = (item,index) => {
    let params = {
        type: 1,
        type_id: item.id
    }
    CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            applyJobsData.value[index]['is_favorite'] = 0
        }
    }).catch(err => {
        console.log(err)
    })
}


onMounted(()=>{
    getMyApplyJobs(page.value, limit.value)
})

</script>

<style scoped>
.applications-container{
    width: 100%;
    height: calc(var(--i-window-height) - 120px);
    background-color: #FFFFFF;
}

.jobs-items{
    width: calc(100% - 80px);
    margin:40px;
    min-height: 200px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.jobs-item{
    width: calc((100% - 120px)/2);
    /*box-sizing: border-box;*/
    background: #F9FAFB;
    border-radius: 12px;

    padding: 24px;
    margin-right: 24px;
    margin-bottom: 16px;
    position: relative;
}

.jobs-item:nth-child(2n){
    margin-right: 0;
}

.jobs-item-t{
    display: flex;
    flex-direction: row;
}

.jobs-item-logo{
    width: 48px;
    height: 48px;
    background: #F7F5FF;
    border-radius: 6px;
}

.jobs-item-t-r{
    margin-left:12px ;
}

.jobs-item-name{
    display: flex;
    flex-direction: row;
    cursor: pointer;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
}

.jobs-item-name:hover{
    text-decoration: underline;
}

.xll-tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px 8px;
    gap: 2px;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;

}

.xll-tag-submitted {
    background-color: #E6E1FF;
    color: #6648FF;
}

.xll-tag-shortlisted{
    background-color: #E6E1FF;
    color: #6648FF;
}

.xll-tag-not-selected{
    background-color: #FEE4E2;
    color: #F04438;
}

.xll-tag-accepted{

}

.xll-tag-company-name{
    color: #1D2939;
    background:  #E6E1FF;
    margin-top: 8px;
}


.jobs-item-name-time{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #98A2B3;
}

.jobs-item-m{
    margin: 20px 0;
}

.jobs-item-desc{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

}

.jobs-item-b{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.job-item-location span {
    width: 110px;
    overflow: hidden;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}

.job-item-location, .job-item-salary {
    display: flex;
    align-items: center;
}

.job-item-location span, .job-item-salary span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
    color: #344054;
}

.job-item-icon-24 {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}
.jobs-pagination{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0;
}

.jobs-item-sl{
    position: absolute;
    right: 40px;
    top: 20px;
}
</style>