<template>
    <div>
        <el-scrollbar class="bg">
            <div class="t-container">
                <div class="t-label">My Jobs</div>
                <div class="t-tips">
                    Explore career possibilities with our curated job listings
                </div>
            </div>

            <div class="content-container">

                <div class="my-jobs-filter">

                    <el-dropdown :hide-on-click="false" trigger="click">
                        <span><el-image :src="filterIconImg"></el-image></span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>
                                    <el-button link
                                               @click="filterMyJobsByOpenStatus(-1)">
                                        All
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button link
                                               @click="filterMyJobsByOpenStatus(1)">
                                        Open
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button link
                                               @click="filterMyJobsByOpenStatus(0)">
                                        Closed
                                    </el-button>
                                </el-dropdown-item>

                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>

                <el-tabs v-model="activeTabPane" @tab-change="changeActiveTab">
                    <el-tab-pane label="Jobs" name="jobs">
                        <div v-loading="loadingJobsStatus">
                            <template v-if="emptyLoadingStatus">
                                <el-empty :image="emptyImg" description="No data"></el-empty>
                            </template>
                            <template v-else>
                                <div class="job-container" >
                                    <div class="job-item" v-for="(item,index) in jobListData" :key="index">
                                        <div class="job-item-t">
                                            <div class="job-item-t-l">
                                                <el-image
                                                    :src="item.third_company_logo ? item.third_company_logo : item.company_logo"
                                                    class="job-item-avatar"></el-image>
                                            </div>
                                            <div class="job-item-t-r">
                                                <div class="job-item-name">
                                                    <span class="text-ellipsis"> {{ item.job_title }}</span>
                                                    <span class="xll-tag xll-tag-1" v-if="item.status==0"><el-icon style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Pending</span>

                                                    <template v-if="item.status == 1">
                                                        <span class="xll-tag xll-tag-2" v-if="item.is_open==1"><el-icon style="margin-right: 2px;"><IconElOkCircle/></el-icon>Open</span>
                                                        <span class="xll-tag xll-tag-3" v-if="item.is_open==0"><el-icon style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Closed</span>
                                                    </template>

                                                    <span class="xll-tag xll-tag-3" v-if="item.status==2"><el-icon style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Not Approved</span>
                                                    <span class="xll-tag xll-tag-application"
                                                          @click="turnApplications(item.id,item.unread_id)" v-if="item.status==1">
                                                    {{ item.resume_count }} Applications
                                                </span>

                                                    <span v-if="item.unread_status" class="read-star"></span>

                                                </div>
                                                <div class="job-item-desc">
                                                    {{ $filters.doRepAdvance(item.desc) }}
                                                </div>

                                            </div>
                                        </div>
                                        <div class="job-item-b">
                                            <el-tooltip
                                                effect="light"
                                                :content="item.job_location"
                                                placement="bottom"
                                            >
                                                <div class="job-item-location">
                                                    <el-image class="job-item-icon-24"
                                                              :src="locationIconImg"></el-image>
                                                    <span>{{ item.job_location }}</span>
                                                </div>

                                            </el-tooltip>

                                            <div class="job-item-salary">
                                                <el-image class="job-item-icon-24" :src="salaryIconImg"></el-image>
                                                <span>{{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}</span>
                                            </div>

                                            <div class="job-item-salary">
                                                <el-image class="job-item-icon-24" :src="calendarImg"></el-image>
                                                <!-- {{ $filters.howLongFormat(item.refresh_time) }} -->
                                                <span>{{ timeAgo(item.refresh_time)}} ago</span>
                                            </div>
                                            <span @click="shareJob(item)" style="cursor: pointer;"><el-icon ><IconIcRoundShare/></el-icon></span>

                                        </div>

                                        <div class="job-item-more-actions">
                                            <el-dropdown :hide-on-click="false" trigger="click">
                                                <span class="job-item-more-text"><el-icon><IconRiMore2Fill/></el-icon></span>
                                                <template #dropdown>
                                                    <el-dropdown-menu>

                                                        <el-dropdown-item>
                                                            <el-button link
                                                                       @click="turnEditJobs(item.id, item.version_time)">
                                                                Edit
                                                            </el-button>
                                                        </el-dropdown-item>
                                                        <el-dropdown-item v-if="item.status == 1">
                                                            <el-button link
                                                                       @click="openOrCloseJob(item.id,item.is_open)">
                                                                <span v-if="item.is_open === 1">Close Job</span>
                                                                <span v-if="item.is_open === 0">Open Job</span>
                                                            </el-button>
                                                        </el-dropdown-item>
                                                        <el-dropdown-item>
                                                            <el-button link
                                                            @click="centerDialogVisible = true">
                                                                Delete
                                                            </el-button>
                                                            <el-dialog
                                                             v-model="centerDialogVisible" 
                                                              width="30%"
                                                                align-center
                                                                style="border-radius: 8px;">
                                                                <template #header="{titleId, titleClass }">
                                                                <div class="my-header">
                                                                    <h4 :id="titleId" :class="titleClass">Delete</h4>
                                                                </div>
                                                                </template>
                                                                <span style="font-family: inter;">Are you sure to delete this?</span>
                                                                    <template #footer>
                                                                    <span class="dialog-footer">
                                                                        <el-button style="border: 1px solid red;color: red;font-weight: 400;" @click="deleteJob(item.id)">
                                                                        Confirm
                                                                        </el-button>
                                                                    </span>
                                                                    </template> 
                                                                 </el-dialog>

                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </template>
                                            </el-dropdown>
                                        </div>
                                    </div>

                                </div>
                                <div class="job-pagination" v-if="jobTotalNum>0">
                                    <el-pagination layout="prev, pager, next"
                                                   :default-current-page="1"
                                                   @size-change="jobPageSizeChange"
                                                   @current-change="jobPageChange"
                                                   :current-page="jobPage"
                                                   :page-size="jobLimit"
                                                   :total="jobTotalNum">
                                    </el-pagination>
                                </div>

                            </template>

                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="Templates" name="job_templates">
                        <job-templates
                                :job-template-data="jobTemplateData"
                                @post-job="postJobFromTemplate"
                                @edit="editJobTemplate"
                                @delete="deleteJobTemplate"
                                @turn-manual-posting="turnManualPosting()"
                        ></job-templates>
                    </el-tab-pane>
                    <el-tab-pane label="Drafts" name="job_drafts">
                        <job-drafts
                                :drafts-data="jobDraftsData"
                                @post="postJobFromDrafts"
                                @edit="editJobDrafts"
                                @delete="deleteJobDrafts"
                                @turn-manual-posting="turnManualPosting()"
                        ></job-drafts>
                    </el-tab-pane>
                </el-tabs>

            </div>

        </el-scrollbar>

        <shareCard :visible="shareDialogVisible"
                   share-title="Share Job Post"
                   :title="shareInfo.title"
                   :description ="shareInfo.desc"
                   :quote = "shareInfo.desc"
                   :url="shareLocationUrl"
                   @close="shareDialogVisible=false"
        >
        </shareCard>

        <applications
            :visible="applicationsVisible"
            @close="applicationsVisible=false"
            :total-num="applicationsTotalNum"
            :data="applicationsData"
        >
        </applications>

    </div>
</template>

<script setup>
import {randomString} from "@/utils";
import {
    HOME_JOB_CLOSE,
    HOME_JOB_DELETE,
    HOME_JOB_TEMPLATE_DELETE,
    JOB_TEMPLATE_LIST, JOBS_APPLICATIONS,
    MY_JOBS,
    SET_READ,
    USER_UNREAD
} from '@/api/api';
import {ref, onMounted, computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import locationIconImg from "@/assets/newHome/dashboard/location_nofill.svg";
import salaryIconImg from "@/assets/newHome/dashboard/salary_nofill.svg";
import calendarImg from "@/assets/newHome/dashboard/calendar.svg";
import shareCard from "@/components/shareCard.vue";
import emptyImg from '@/assets/newHome/dashboard/empty.svg'
import filterIconImg from '@/assets/filter.svg'

import moment from 'moment';
import Applications from "@/components/pool/applications.vue";

const store = useStore()
const route = useRoute()
const router = useRouter()
const token = localStorage.getItem('token')
const identity = computed(() => store.state.identity)

const jobListData = ref([])
const centerDialogVisible=ref(false) 
const jobPage = ref(1)
const jobLimit = ref(6)
const jobTotalNum = ref(0)
const versionTime = randomString()

const activeTabPane = ref('jobs')

const loadingJobsStatus = ref(true)
const emptyLoadingStatus = ref(false)

const shareDialogVisible = ref(false)
const shareInfo = ref({})
const shareLocationUrl = ref('')
const shareJob = (item)=>{
    shareInfo.value = {
        title:item.job_title,
        desc:item.desc,
        id:item.id
    }

    let origin  = window.location.origin
    shareLocationUrl.value = origin + '/jobs/detail?id='+item.id;

    shareDialogVisible.value = true;
}


const timeAgo = (postedAt) => {
     return moment(postedAt).fromNow(true);
}

const turnManualPosting = () => {
    router.push({path: '/jobs/post', query: {version_time: versionTime}})
}
const changeActiveTab = (e) => {
    console.log(e)
    if(e === 'jobs'){
        getMyJobs(jobPage.value, jobLimit.value)
    }

    if (e === 'job_templates') {
        getJobTemplateList()
    }

    if (e === 'job_drafts') {
        getJobDraftsList()
    }

}
const jobPageSizeChange = (e) => {
    console.log(e)
}

const jobPageChange = (e) => {
    jobPage.value = e
    getMyJobs(e, jobLimit.value)
}
const filterMyJobsByOpenStatus = (e) =>{
    let params = {
        page: jobPage.value,
        limit: jobLimit.value
    }

    if(e !== -1){
        params.is_open = e
    }

    loadingJobsStatus.value = true

    MY_JOBS(params).then(res => {
        if (res.code == 200) {
            let jobData = res.message.data
            jobTotalNum.value = res.message.total
            emptyLoadingStatus.value = res.message.total <= 0;

            filterUserUnreadAndJobList(jobData)
            loadingJobsStatus.value = false
        }

    }).catch(err => {
        console.log(err)
        loadingJobsStatus.value = false
        emptyLoadingStatus.value = true
    })
}

const getMyJobs = (page, limit) => {
    loadingJobsStatus.value = true
    let params = {
        page: page,
        limit: limit
    }

    MY_JOBS(params).then(res => {
        if (res.code == 200) {
            let jobData = res.message.data
            jobTotalNum.value = res.message.total
            emptyLoadingStatus.value = res.message.total <= 0;

            filterUserUnreadAndJobList(jobData)
            loadingJobsStatus.value = false
        }

    }).catch(err => {
        console.log(err)
        loadingJobsStatus.value = false
        emptyLoadingStatus.value = true
    })

}

const filterUserUnreadAndJobList = (jobData) => {

    let params = {
        identity: identity.value
    }

    USER_UNREAD(params).then(res => {
        let unreadListData = res.message.list;

        jobData.forEach(item => {

            if (unreadListData && unreadListData.length > 0) {
                let a = unreadListData.filter(function (element) {
                    return element.type == 1 && element.type_id == item.id
                })
                if (a.length > 0) {
                    item.unread_status = true;
                    item.unread_id = a[0].id;
                } else {
                    item.unread_status = false;
                }
            } else {
                item.unread_status = false;
            }

        })

        jobListData.value = jobData

    }).catch(err => {
        console.log(err)
    })

}
const jobTemplateData = ref([])

const getJobTemplateList = () => {
    let params = {
        type: 1,
        page: 1,
        limit: 100
    }

    JOB_TEMPLATE_LIST(params).then(res => {
        console.log(res)
        if (res.code === 200) {
            let jobTemplateArr = res.message.data;
            jobTemplateArr.forEach(item => {
                item.content = item.content ? JSON.parse(item.content) : {}
            })
            jobTemplateData.value = jobTemplateArr;
        }

    }).catch(err => {
        console.log(err)
    })

}

const editJobTemplate = (item) => {
    store.commit('setJobTemplateDetail', item)
    router.push({path: '/jobs/post', query: {version_time: versionTime}})
}

const postJobFromTemplate = (item) => {
    store.commit('setJobTemplateDetail', item)
    router.push({path: '/jobs/post', query: {version_time: versionTime,post_from:'template'}})
}

const deleteJobTemplate = (id) => {
    let params = {
        id: id
    }
    HOME_JOB_TEMPLATE_DELETE(params).then(res => {
        if (res.code === 200) {
            getJobTemplateList()
        }
    }).catch(err => {
        console.log(err)
    })
}

const jobDraftsData = ref([])

const getJobDraftsList = () => {
    let params = {
        type: 2,
        page: 1,
        limit: 100
    }

    JOB_TEMPLATE_LIST(params).then(res => {
        console.log(res)
        if (res.code === 200) {
            let jobDraftsArr = res.message.data;
            jobDraftsArr.forEach(item => {
                item.content = item.content ? JSON.parse(item.content) : {}
            })
            jobDraftsData.value = jobDraftsArr;
        }

    }).catch(err => {
        console.log(err)
    })

}


const editJobDrafts = (item) => {
    store.commit('setJobTemplateDetail', item)
    router.push({path: '/jobs/post', query: {version_time: versionTime}})
}

const postJobFromDrafts = (item) => {
    store.commit('setJobTemplateDetail', item)
    router.push({path: '/jobs/post', query: {version_time: versionTime,post_from:'drafts'}})
}

const deleteJobDrafts = (id) => {
    let params = {
        id: id
    }
    HOME_JOB_TEMPLATE_DELETE(params).then(res => {
        if (res.code === 200) {
            getJobDraftsList()
        }
    }).catch(err => {
        console.log(err)
    })
}

const applicationsData = ref([])
const applicationsTotalNum = ref(0)
const applicationsVisible = ref(false)
const turnApplications = (jobId,unreadId)=>{
    applicationsVisible.value = true
    turnApplicationsOld(jobId,unreadId)
    getJobResumes(jobId, 1 , 1000)
}

const getJobResumes = (jobId,page,limit)=>{
    let params = {
        page: page,
        limit: limit,
        job_id: jobId
    }
    JOBS_APPLICATIONS(params).then(res=>{
        console.log(res)
        if(res.code == 200){
            applicationsData.value = res.message.data
            applicationsTotalNum.value = res.message.total
        }
    }).catch(err=>{
        console.log(err)
    })
}

const turnApplicationsOld = (id, unreadId) => {
    console.log('turn applications')
    let params = {
        id: unreadId,
        identity: identity,
        status: 1,
        token: token
    }

    SET_READ(params).then(res => {
        if (res.code == 200) {
            router.push({path: '/jobs/applications', query: {id: id}})
        }
    }).catch(err => {
        console.log(err)
    })
}

const turnEditJobs = (jobId, version_time) => {
    router.push({path: '/jobs/post', query: {job_id: jobId,version_time:version_time,job_type:'edit'}})
}

const deleteJob = (jobId)=>{
    centerDialogVisible.value=false
    let params = {
        job_id:jobId,
        is_delete:1
    }
    HOME_JOB_DELETE(params).then(res=>{
        if(res.code === 200){
            getMyJobs(jobPage.value, jobLimit.value)
        }

    }).catch(err=>{
        console.log(err)
    })
}

const openOrCloseJob = (jobId,isOpen)=>{
    let params = {
        job_id:jobId,
        is_open: isOpen === 1 ? 0 : 1
    }

    HOME_JOB_CLOSE(params).then(res=>{
        if(res.code === 200){
            getMyJobs(jobPage.value, jobLimit.value)
        }

    }).catch(err=>{
        console.log(err)
    })
}

onMounted(() => {
    if (route.query.tab) {
        activeTabPane.value = route.query.tab;
    }
    getMyJobs(jobPage.value, jobLimit.value)
})


</script>

<style scoped>

.dialog-border{
    border-radius: 10px !important;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.text-ellipsis{
text-overflow: ellipsis;
    overflow: hidden;
    width: 180px;
    white-space: nowrap
}

:deep(.el-tabs__item){
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #98A2B3;
}

:deep(.el-tabs__item.is-active){
    color: #6648FF;
}

:deep(.el-tabs__active-bar) {
    background-color: #6648FF;
}


.bg {
    background-color: #FFFFFF;
    height: calc(var(--i-window-height) - 120px);

}

.t-container {
    margin: 0 40px 0 40px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
    color: #000000;
}

.t-tips {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
}

.content-container {
    margin: 30px 40px 40px 40px;
    position: relative;
}

.my-jobs-filter{
    position: absolute;
    right: 10px;
    top: 0px;
    cursor: pointer;
    z-index: 1100;
}

.job-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 140px;
}


.job-item {
    flex-basis: calc(50% - 47px);
    margin-right: 30px;
    margin-bottom: 24px;
    padding: 18px 16px;
    background: #F9FAFB;
    border-radius: 12px;
    position: relative;
}

.job-item:nth-child(2n) {
    margin-right: 0;
}

.job-item-t {
    display: flex;
    flex-direction: row;
}

.job-item-avatar {
    width: 48px;
    height: 48px;
    background: #F7F5FF;
    border-radius: 6px;
}

.job-item-t-l {
    margin-right: 9px;
}

.job-item-name {
    display: flex;
    flex-direction: row;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
}

.job-item-desc {
    width:340px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #667085;

    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    padding-top: 6px;
}

.job-item-b {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 25px;
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

.job-item-more-actions {
    position: absolute;
    right: 10px;
    top: 10px;
}

.job-item-more-text {
    position: relative;
    right:10px;
    top:10px;
    cursor: pointer;
}

.xll-tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 12px;
    padding: 4px 8px;
    gap: 2px;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
}

.xll-tag-1 {
    color: #F79009;
    background: #FFFAEB;
}

.xll-tag-2 {
    color: #12B76A;
    background: #ECFDF3;
}


.xll-tag-3 {
    color: #F04438;
    background: #FEF3F2;
}

.xll-tag-application{
    cursor: pointer;
    background: #E6E1FF;
    border-radius: 4px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    text-decoration-line: underline;
    color: #344054;
}

.job-pagination {
    margin-top: 60px;
    display: flex;
    justify-content: center;
}

.read-star {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: red;
    top: 10px;
    right: 19px;
}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {


}

</style>
