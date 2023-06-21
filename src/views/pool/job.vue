<template>
    <div class="job-pool-bg">
        <el-scrollbar class="job-pool-l">
            <div class="job-pool-filter">
                <jobs-filter @search="searchByFilter"></jobs-filter>
            </div>
        </el-scrollbar>
        <el-scrollbar class="job-pool-r-scroll" ref="jobPoolScroll">
            <div class="job-pool-r">

                <div class="pool-filter-icon-container">
                    <el-image :src="filterIconImg" @click="showJobFilter"> </el-image>

                    <div class="pool-filter-mobile" id="pool-filter-mobile">
                        <jobs-filter @search="searchByFilter"></jobs-filter>
                    </div>

                </div>

                <el-tabs  v-model="activeTabName" @tab-change="tabChange">
                    <el-tab-pane label="Featured Jobs" name="featured_jobs">
                        <div class="job-pool-swiper">
                            <el-carousel style="width: 100%" trigger="click" height="203px">
                                <el-carousel-item v-for="item in 4" :key="item" style="background-color: #FFFFFF;border-radius: 12px;">
                                    <el-image
                                        style="width: 100%;background-color: #FFFFFF;border-radius: 12px;"
                                        src="https://cdn.staticaly.com/gh/unilei/picx-images-hosting@master/20230609/kkpansGroup-342.3n9i1f0npyc0.jpg">
                                    </el-image>
                                </el-carousel-item>
                            </el-carousel>
                        </div>

                        <div class="jobs-items" v-loading="allFeaturedJobsLoadingStatus">

                            <div class="jobs-item" v-for="(item,i ) in jobFeaturedData" :key="i">
                                <div class="jobs-item-t">
                                    <div class="jobs-item-t-l">
                                        <el-image class="jobs-item-logo" :src="item.company_logo"></el-image>
                                    </div>
                                    <div class="jobs-item-t-r">
                                        <div class="jobs-item-name">
                                            {{item.job_title}}
                                            <span class="xll-tag xll-tag-1"  >Recommended by EDU 💜</span>

                                        </div>
                                        <div class="jobs-item-name-time">
                                            {{item.company_name}} . Posted {{ $filters.howLongFormat(item.c_time) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="jobs-item-m">
                                    <div class="jobs-item-desc">
                                        {{ $filters.doRepAdvance(item.desc)  }}
                                    </div>
                                </div>
                                <div class="jobs-item-b">
                                    <el-button link @click="seeMore(item)">See More</el-button>
<!--                                    <el-button type="primary">Apply Now</el-button>-->
                                    <applyButton :selectJobId="item.id"
                                                    btn-text="Apply Now"
                                                    :job-info="item" >
                                    </applyButton>
                                </div>

                                <div class="jobs-item-sl">
                                    <el-button link type="info" @click="shareJob(item)">
                                        <IconIcRoundShare/>
                                    </el-button>

                                    <template v-if="item.is_favorite">
                                        <el-button link type="info" @click="cancelFavorite(item,i,'featured')">
                                            <IconFlatColorIconsLike/>
                                        </el-button>
                                    </template>
                                    <template v-else>
                                        <el-button link type="info" @click="addFavorite(item,i,'featured')">
                                            <IconIconParkOutlineLike/>
                                        </el-button>
                                    </template>
                                </div>

                            </div>
                        </div>

                    </el-tab-pane>

                    <el-tab-pane label="All Jobs" name="all_jobs">
                        <div class="job-pool-swiper">
                            <el-carousel style="width: 100%" trigger="click" height="203px">
                                <el-carousel-item v-for="item in 4" :key="item" style="background-color: #FFFFFF;border-radius: 12px;">
                                    <el-image
                                        style="width: 100%;background-color: #FFFFFF;border-radius: 12px;"
                                        src="https://cdn.staticaly.com/gh/unilei/picx-images-hosting@master/20230609/kkpansGroup-342.3n9i1f0npyc0.jpg">
                                    </el-image>
                                </el-carousel-item>
                            </el-carousel>
                        </div>

                        <div v-loading="allJobsLoadingStatus">
                            <div class="jobs-items">

                                <div class="jobs-item" v-for="(item,i ) in jobsData" :key="i">
                                    <div class="jobs-item-t">
                                        <div class="jobs-item-t-l">
                                            <el-image class="jobs-item-logo" :src="item.company_logo"></el-image>
                                        </div>
                                        <div class="jobs-item-t-r">
                                            <div class="jobs-item-name">
                                                {{item.job_title}}
                                            </div>
                                            <div class="jobs-item-name-time">
                                                {{item.company_name}} . Posted {{ $filters.howLongFormat(item.c_time) }}
                                            </div>
                                        </div>

                                    </div>
                                    <div class="jobs-item-m">
                                        <div class="jobs-item-desc">
                                            {{ $filters.doRepAdvance(item.desc)  }}
                                        </div>
                                    </div>
                                    <div class="jobs-item-b">
                                        <el-button link @click="seeMore(item)">See More</el-button>
                                        <applyButton :selectJobId="item.id"
                                                        btn-text="Apply Now"
                                                        :job-info="item" >
                                        </applyButton>
                                    </div>

                                    <div class="jobs-item-sl">
                                        <el-button link type="info" @click="shareJob(item)">
                                            <IconIcRoundShare/>
                                        </el-button>

                                        <template v-if="item.is_favorite">
                                            <el-button link type="info" @click="cancelFavorite(item,i,'all')">
                                                <IconFlatColorIconsLike/>
                                            </el-button>
                                        </template>
                                        <template v-else>
                                            <el-button link type="info" @click="addFavorite(item,i,'all')">
                                                <IconIconParkOutlineLike/>
                                            </el-button>
                                        </template>
                                    </div>


                                </div>

                            </div>
                            <div class="jobs-pagination">
                                <el-pagination layout="prev, pager, next"
                                               :default-current-page="jobsPage"
                                               @size-change="jobsPageSizeChange"
                                               @current-change="jobsPageChange"
                                               :current-page="jobsPage"
                                               :page-size="jobsLimit"
                                               :total="jobsTotalNum">
                                </el-pagination>
                            </div>

                        </div>

                    </el-tab-pane>
                </el-tabs>

            </div>

        </el-scrollbar>

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

    </div>

</template>

<script setup>
import {ref, onMounted} from 'vue'
import {ADD_FAVORITE, CANCEL_FAVORITE, JOB_DETAIL, JOB_FEATURED_LIST, JOB_LIST} from "@/api/api";
import {ElLoading} from 'element-plus'
// import {useRouter} from 'vue-router'
import applyButton from "@/components/jobs/applyButton.vue";
import filterIconImg from "@/assets/filter.svg";

// const router = useRouter()
const jobPoolScroll = ref(null)
const searchFilterParams = ref({})

const jobsData = ref([])
const jobsPage = ref(1)
const jobsLimit = ref(6)
const jobsTotalNum = ref(0)
const allJobsLoadingStatus = ref(false)
const allFeaturedJobsLoadingStatus = ref(false)

const activeTabName = ref('featured_jobs')

const jobFeaturedData = ref([])

const jobDetailVisible = ref(false)
const jobDetailData = ref({})

const tabChange = (e)=>{
    // console.log(e)
    if(e === 'featured_jobs'){
        // router.push({path:'/job/pool',query:{tab:'featured_jobs'}})
        getJobFeaturedList()
    }
    if(e === 'all_jobs'){
        // router.push({path:'/job/pool',query:{tab:'all_jobs'}})
        getJobsData(jobsPage.value, jobsLimit.value)
    }
}

const jobsPageSizeChange = (e)=> {
    jobsLimit.value = e
    getJobsData(jobsPage.value, e)
}

const jobsPageChange = (e)=> {
    jobsPage.value = e
    getJobsData(e, jobsLimit.value)
}

const getJobsData = (page, limit) =>{
    allJobsLoadingStatus.value = true
    let params = {
        page: page,
        limit: limit
    }

    let jobTitle = searchFilterParams.value.job_title

    if(jobTitle){
        params.job_title = jobTitle
    }

    let datePosted = searchFilterParams.value.c_time
    if(datePosted){
        params.c_time = datePosted
    }

    let salaryValue = searchFilterParams.value.salary;

    if (salaryValue) {
        params.salary_begin = salaryValue[0]
        params.salary_end = salaryValue[1]
    }

    let envName = process.env.VUE_APP_ENV_NAME

    if (searchFilterParams.value.location) {
        if (envName === 'development' || envName === 'production') {
            params.country = searchFilterParams.value.location
        }
        if (envName === 'developmentCN' || envName === 'productionCN') {
            params.city = searchFilterParams.value.location
        }
    }

    if (searchFilterParams.value.employment_type) {
        params.employment_type = searchFilterParams.value.employment_type
    }

    if (searchFilterParams.value.student_age) {
        params.age_to_teach = searchFilterParams.value.student_age
    }

    if(searchFilterParams.value.work_type){
        params.work_type = searchFilterParams.value.work_type
    }

    if(searchFilterParams.value.payment_period){
        params.payment_period = searchFilterParams.value.payment_period
    }

    JOB_LIST(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
            jobsData.value = res.message.data;
            jobsTotalNum.value = res.message.total
            allJobsLoadingStatus.value = false
            jobPoolScroll.value.setScrollTop(0)

        }

    }).catch(err => {
        console.log(err)
        allJobsLoadingStatus.value = false
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

const getJobFeaturedList = ()=> {
    allFeaturedJobsLoadingStatus.value = true
    let params = {
        ad_type: 2
    }

    JOB_FEATURED_LIST(params).then(res => {
        if (res.code === 200) {
             jobFeaturedData.value = res.message
            allFeaturedJobsLoadingStatus.value = false
        }

    }).catch(err=>{
        console.log(err)
    })

}
const searchByFilter = (e)=>{
    console.log(e)
    activeTabName.value = 'all_jobs'
    searchFilterParams.value = e;
    jobsPage.value = 1;
    getJobsData(1, jobsLimit.value)
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

const addFavorite = (item,index,type) => {

    let params = {
        type: 1,
        type_id: item.id,
        type_title: item.title,
        type_url: item.company_logo
    }
    // console.log(params)
    ADD_FAVORITE(params).then(res => {
        if (res.code == 200) {
            if(type === 'featured'){
                jobFeaturedData.value[index]['is_favorite'] = 1
            }
            if(type === 'all'){
                jobsData.value[index]['is_favorite'] = 1
            }

        }
    }).catch(err => {
        console.log(err)

    })

}

const cancelFavorite = (item,index,type) => {
    let params = {
        type: 1,
        type_id: item.id
    }
    CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            if(type === 'featured'){
                jobFeaturedData.value[index]['is_favorite'] = 1
            }
            if(type === 'all'){
                jobsData.value[index]['is_favorite'] = 1
            }
        }
    }).catch(err => {
        console.log(err)
    })
}

const showJobFilter = ()=>{
    let element = document.getElementById("pool-filter-mobile");
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

onMounted(()=>{
    getJobFeaturedList()
})


</script>

<style scoped>


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

:deep(.el-tabs__active-bar){
    background-color: #6648FF;
}

.job-pool-bg{
    width: 100%;
    height: calc(var(--i-window-height) - 120px);
    background-color: #FFFFFF;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.job-pool-l{
    height: calc(var(--i-window-height) - 120px);
}
.job-pool-filter{
    margin: 20px 0 40px 40px;
}

.job-pool-r{
    margin: 20px 40px 40px 0;
}

.job-pool-r-scroll{
    width: 780px;
    height: calc(var(--i-window-height) - 140px);
}

.jobs-items{
    margin-top: 30px;
    min-height: 200px;
}

.jobs-item{
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 11px;
    padding: 24px;
    margin-bottom: 16px;
    position: relative;
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

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
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
    color: #1D2939;
    background: #FFDB91;
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
    text-align: right;
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

@media screen and (min-width: 832px) {
    .pool-filter-icon-container{
        display: none;
    }
}

@media screen and (max-width: 831px) {

    .job-pool-l{
        display: none;
    }

    .job-pool-r-scroll{
        width: auto;
        margin:0 40px;
    }
    .job-pool-r{
       position: relative;
    }
    .pool-filter-icon-container{
        position: absolute;
        top: 10px;
        right:  0;
        z-index: 100;
        cursor: pointer;
    }

    .pool-filter-mobile{
        position: absolute;
        top:  34px;
        right: -10px;

    }

}


</style>