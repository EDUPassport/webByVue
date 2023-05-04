<template>
  <div class="bg">

    <template v-if="exchangeAccountInfo">
      <ExchangeAccountInfo :info="exchangeAccountInfo"></ExchangeAccountInfo>
    </template>

    <el-row class="bg-container" :gutter="0" align="top" justify="center">

      <el-col class="jobs-filter-col" :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <filterWithJobList @search="searchByFilter"></filterWithJobList>
      </el-col>

      <el-col class="jobs-list-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">

        <template v-if="isOther">
          <jobsListComponent :jobListData="otherJobListData"
                             :adsData="jobsAdsListMid"
                             :selectedJobId="selectedJobId"
                             :jobLimit="otherJobLimit"
                             :jobTotalNum="otherJobTotalNum"
                             :jobPage="otherJobPage"
                             :isOther="true"
                             :companyInfo="companyInfo"
                             :loading="jobLoadingValue"
                             :loadingFeatured="jobFeaturedLoadingValue"
                             @jobDetailEvent="turnJobDetail"
                             @backToResults="backToResults"
                             @jobPageChange="otherJobPageChange"
                             @addFavorite = "addFavorite"
                             @cancelFavorite="cancelFavorite"
          >
          </jobsListComponent>
        </template>
        <template v-else>
          <jobsListComponent :jobListData="jobListData"
                             :adsData="jobsAdsListMid"
                             :selectedJobId="selectedJobId"
                             :jobLimit="jobLimit"
                             :jobTotalNum="jobTotalNum"
                             :jobPage="jobPage"
                             :isOther="false"
                             :loading="jobLoadingValue"
                             :loadingFeatured="jobFeaturedLoadingValue"
                             @jobDetailEvent="turnJobDetail"
                             @jobPageChange="jobPageChange"
                             @addFavorite = "addFavorite"
                             @cancelFavorite="cancelFavorite"

          >
          </jobsListComponent>
        </template>

      </el-col>

      <el-col class="job-detail-col" :xs="24" :sm="0" :md="12" :lg="12" :xl="12">

        <suspense>
          <router-view :key="$route.params"></router-view>
        </suspense>

      </el-col>
    </el-row>

  </div>
</template>

<script>

import filterWithJobList from "@/components/jobs/filterWithJobList";
import jobsListComponent from "@/components/jobsListComponent";

import {useRouter, useRoute} from "vue-router";
import {
  JOB_LIST,
  ADD_FAVORITE,
  CANCEL_FAVORITE,
   COMPANY_JOB_LIST,
  ADS_LIST
} from "@/api/api";

import ExchangeAccountInfo from '@/components/jobs/exchangeInfo';
import {encode} from "js-base64";
import {randomString} from "@/utils";

export default {
  name: "list",
  data() {
    return {
      jobLoadingValue:false,
      jobFeaturedLoadingValue:false,

      isOther:false,
      companyInfo:{},

      jobListData: [],

      jobPage: 1,
      jobLimit: 10,
      jobTotalNum: 0,
      showLoadingStatus: true,
      versionTime: randomString(),
      jobsAdsListTop: [],
      jobsAdsListMid: [],
      jobAdsHeight:'190px',

      detailData:{},
      selectedJobId:0,

      otherJobPage:1,
      otherJobLimit:5,
      otherJobTotalNum:0,
      otherJobListData:[],
      jobDetailHeight:0,

      searchFilterParams:{},

    }
  },
  components: {
    ExchangeAccountInfo,
    jobsListComponent,
    filterWithJobList,
  },
  setup() {
    let router = useRouter()
    let route = useRoute()

    const exchangeAccountInfo = route.query.exchange_job
    // console.log(exchangeAccountInfo)
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    const skipJobsList = (query) => {
      router.push({
        path: '/jobs',
        query: query
      })
    }

    const currentIdentity = localStorage.getItem('identity')

    return {
      onSwiper,
      onSlideChange,
      skipJobsList,
      currentIdentity,
      exchangeAccountInfo
    }

  },
  beforeRouteUpdate(to){
    console.log(to)
    console.log('------- before route update -----------');

    let jobId = to.params.id;
    let page = to.params.page;

    let userId = to.query.uid;
    let fullPath = to.fullPath;

    if(userId){
      this.isOther = true;

      if(jobId){
        this.selectedJobId = jobId
      }else{
        this.selectedJobId = 0
      }

      if(page){
        this.otherJobPage = Number(page)
      }
      this.getCompanyJobList(userId, this.otherJobPage, this.otherJobLimit)

    }else{

      this.isOther = false;

      if(jobId){
        this.selectedJobId = jobId
      }else{
        this.selectedJobId = 0
      }

      if(page){
        this.jobPage = Number(page);
      }

      if(fullPath === '/jobs'){
        console.log('------- before route update jobs -----------');

        this.selectedJobId = 0
        this.jobPage = 1
        this.getJobList(1, this.jobLimit)
      }


    }

  },
  mounted() {

    let path = this.$route.path;
    let userId = this.$route.query.uid;
    let jobId = this.$route.params.id;
    let page = this.$route.params.page;
    let qPage = this.$route.query.page;

    if(userId){
      this.isOther = true;

      if(path === '/jobs'){

        if(qPage){
          this.otherJobPage = Number(qPage)
        }
        this.getCompanyJobList(userId, page, this.otherJobLimit)

      }else{

        if(jobId){
          this.selectedJobId = jobId
        }else{
          this.selectedJobId = 0
        }
        if(page){
          this.otherJobPage = Number(page)
        }
        this.getCompanyJobList(userId, page, this.otherJobLimit)

      }

    }else{

      this.isOther = false;

      if(path === '/jobs'){
        if(qPage){
          this.jobPage = Number(qPage);
        }

      }else{
        if(jobId){
          this.selectedJobId = jobId
        }else{
          this.selectedJobId = 0
        }

        if(page){
          this.jobPage = Number(page);
        }

      }

      this.getJobList(this.jobPage, this.jobLimit)

    }

    this.getAdsList()

  },
  methods: {
    searchByFilter(e){

      this.searchFilterParams = e;

      this.jobPage = 1;
      this.selectedJobId = 0;

      let params = {
        page: this.jobPage,
        limit: this.jobLimit
      }
      let jobTitle = e.job_title

      if(jobTitle){
        params.job_title = jobTitle
      }

      let salaryValue = e.salary;

      if (salaryValue) {
        params.salary_begin = salaryValue[0] * 1000
        params.salary_end = salaryValue[1] * 1000
      }
      
      let envName = process.env.VUE_APP_ENV_NAME

      if (e.location) {
        if (envName === 'development' || envName === 'production') {
          params.country = e.location
        }
        if (envName === 'developmentCN' || envName === 'productionCN') {
          params.city = e.location
        }
      }

      if (e.employment_type) {
        params.employment_type = e.employment_type
      }

      if (e.student_age) {
        params.age_to_teach = e.student_age
      }

      if(e.work_type){
        params.work_type = e.work_type
      }

      if(e.payment_period){
        params.payment_period = e.payment_period
      }

      this.jobLoadingValue = true;
      JOB_LIST(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

          this.jobListData = res.message.data
          this.jobTotalNum = res.message.total
          this.jobLoadingValue = false

          this.$router.replace({path:'/jobs',query:{page:1}})
        }

      }).catch(err => {
        console.log(err)
        this.jobLoadingValue = false
        if (err.msg) {
          return this.$message.error(err.msg)
        }
        if (err.message) {
          return  this.$message.error(err.message)
        }
      })

    },
    turnBanner(link) {

      if (link != '') {
        window.location.href = link
      } else {
        let token = localStorage.getItem('token')
        if (!token) {
          window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')
          return;
        }
        this.$router.push('/me/ads/platform')
      }
    },
    getAdsList() {
      let ads_data = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(ads_data).then(res => {
        if (res.code == 200) {
          // console.log(rs.message)
          let jobsAdsListTop = [];
          let jobsAdsListMid = [];
          let identity = localStorage.getItem('identity');

          if (!identity) {
            jobsAdsListTop = res.message.filter(item => item.name == 'guest_j2');
            jobsAdsListMid = res.message.filter(item => item.name == 'guest_j3');
          }
          if (identity == 1) {
            jobsAdsListTop = res.message.filter(item => item.name == 'educator_j2');
            jobsAdsListMid = res.message.filter(item => item.name == 'educator_j3');
          }

          if (identity == 2 || identity == 3 || identity == 4) {
            jobsAdsListTop = res.message.filter(item => item.name == 'business_j2');
            jobsAdsListMid = res.message.filter(item => item.name == 'business_j3');
          }

          if (identity == 5) {
            jobsAdsListTop = res.message.filter(item => item.name == 'vendor_j2');
            jobsAdsListMid = res.message.filter(item => item.name == 'vendor_j3');
          }

          if (jobsAdsListTop.length > 0) {
            this.jobsAdsListTop = jobsAdsListTop[0].data;
          }
          if (jobsAdsListMid.length > 0) {
            this.jobsAdsListMid = jobsAdsListMid[0].data;
          }

        }

      }).catch(err => {
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    addFavorite(id, type, title, url, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: id,
        type_title: title,
        type_url: url
      }
      // console.log(params)
      ADD_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.jobListData[index]['is_favorite'] = 1
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })

    },
    jobPageSizeChange(e) {
      console.log(e)
    },
    async jobPageChange(e) {
      console.log(e)
      this.jobPage = e
      // this.selectedJobId = 0
      let userId = this.$route.query.uid;
      await this.getJobList(e, this.jobLimit, true)
      if(this.isOther){
        this.$router.push({path:'/jobs',query:{page:e,uid:userId}})
      }else if (! this.$route.params.id){
        this.$router.push({path:'/jobs',query:{page:e}})
      }

    },
    async getJobList(page, limit, pageClicked) {
      this.jobLoadingValue = true;
      // this.showLoadingStatus = true;
      let params = {
        page: page,
        limit: limit
      }

      let e = this.searchFilterParams;

      let jobTitle = e.job_title

      if(jobTitle){
        params.job_title = jobTitle
      }

      let salaryValue = e.salary;

      if (salaryValue) {
        params.salary_begin = salaryValue[0] * 1000
        params.salary_end = salaryValue[1] * 1000
      }

      let envName = process.env.VUE_APP_ENV_NAME

      if (e.location) {
        if (envName === 'development' || envName === 'production') {
          params.country = e.location
        }
        if (envName === 'developmentCN' || envName === 'productionCN') {
          params.city = e.location
        }
      }

      if (e.employment_type) {
        params.employment_type = e.employment_type
      }

      if (e.student_age) {
        params.age_to_teach = e.student_age
      }

      if(e.work_type){
        params.work_type = e.work_type
      }

      if(e.payment_period){
        params.payment_period = e.payment_period
      }

      await JOB_LIST(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          let jobData = res.message.data;

          this.jobListData = jobData
          // console.log(res.message.data)
          this.jobTotalNum = res.message.total
          this.jobLoadingValue = false

          let screenWidth = document.body.clientWidth
          let screenWidthFloor = Math.floor(screenWidth)

          if(screenWidthFloor > 768){

            let routeJobId = this.$route.params.id;

            if(!routeJobId || pageClicked){

              if(this.jobTotalNum>0){
                this.selectedJobId = Object.values(jobData)[0]['id']
             }

            }

            let path = '/jobs/detail/' + this.selectedJobId + '/' + page;

            this.$router.replace({path:path})
          }


        } else {
          console.log(res.msg)
        }
      }).catch(err => {
        console.log(err)
        this.jobLoadingValue = false
        if (err.msg) {
          return this.$message.error(err.msg)
        }
        if (err.message) {
          return this.$message.error(err.message)
        }
      })

    },
    cancelFavorite(type, typeId, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.jobListData[index]['is_favorite'] = 0
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    postJob() {
      let token = localStorage.getItem('token')
      let self = this

      if (!token || token == '') {
        return this.$msgbox({
          title: 'Post a Job',
          message: 'Before posting a job, you need to log in',
          type: 'warning',
          confirmButtonText: 'Log in',
          callback(action) {
            console.log(action)
            if (action === 'confirm') {
              let redirectParamsObj = {
                path: '/jobs',
                query: {
                  id: self.$route.query.id
                }
              }

              let redirectParamsStr = encode(JSON.stringify(redirectParamsObj))

              self.$router.push({path: '/login', query: {redirect_params: redirectParamsStr}})

            }
          }
        })
      }

      let identity = localStorage.getItem('identity')

      if (identity == 1) {
        return this.$message.error('Oops! Your current identity is an educator, please switch to Education Business')
      }

      self.$router.push({path: '/jobs/post', query: {version_time: self.versionTime}})

    },
    getCompanyJobList(userId,page,limit){
      this.jobLoadingValue = true;

      let params = {
        user_id: userId,
        is_open: 1,
        status:1,
        page: page,
        limit: limit
      }

      let e = this.searchFilterParams;

      let jobTitle = e.job_title

      if(jobTitle){
        params.job_title = jobTitle
      }

      let salaryValue = e.salary;

      if (salaryValue) {
        params.salary_begin = salaryValue[0] * 1000
        params.salary_end = salaryValue[1] * 1000
      }

      let envName = process.env.VUE_APP_ENV_NAME

      if (e.location) {
        if (envName === 'development' || envName === 'production') {
          params.country = e.location
        }
        if (envName === 'developmentCN' || envName === 'productionCN') {
          params.city = e.location
        }
      }

      if (e.employment_type) {
        params.employment_type = e.employment_type
      }

      if (e.student_age) {
        params.age_to_teach = e.student_age
      }

      if(e.work_type){
        params.work_type = e.work_type
      }

      if(e.payment_period){
        params.payment_period = e.payment_period
      }

      COMPANY_JOB_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.otherJobListData = res.message.data;
          this.otherJobTotalNum = res.message.total;
          this.jobLoadingValue = false
        }

      }).catch(err=>{
        console.log(err)
        this.jobLoadingValue = false
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    otherJobPageChange(e) {
      console.log(e)
      // this.showLoadingStatus = true;
      this.otherJobPage = e
      this.selectedJobId = 0
      let userId = this.$route.query.uid;

      if(this.isOther){
        this.$router.push({path:'/jobs',query:{page:e,uid:userId}})
      }else{
        this.$router.push({path:'/jobs',query:{page:e}})
      }

      this.getCompanyJobList(userId ,e, this.otherJobLimit)

    },
    backToResults(){

      this.isOther = false;
      this.selectedJobId = 0;

      this.$router.push({path:'/jobs',query:{page:this.jobPage}})

      this.getJobList(this.jobPage, this.jobLimit)

    },
    turnJobDetail(id,page,isOther){

      let path = '/jobs/detail/' + id + '/' + page;
      let fromUid = this.$route.query.uid;

      this.selectedJobId = id;

      if(isOther){
        this.$router.push({path:path,query:{uid:fromUid}})
      }else{
        this.$router.push({path:path,query:{}})
      }

    },


  }


}
</script>

<style scoped>
.bg {
  background-color: #FFFFFF;
}

.bg-container {
  width: 100%;
  margin: 0 auto;
}

.jobs-filter-col{
  padding-right: 13px;
}

.jobs-list-col{
  padding-left: 12px;
  padding-right: 13px;
}

.job-detail-col{
  padding-left: 12px;
}

.xll-ads-container {
  /*padding: 0 50px;*/
  margin-bottom: 50px;
}


.xll-job-detail{
  height: calc(100vh - 140px);
  background-color: #F0F2F5;
}

.job-detail-bg-container{
  height: calc(100vh - 170px);
  padding: 30px 30px 0 30px;
}

@media screen and (min-width: 1920px) {
  /*  190 */
  .job-detail-container{
    height: calc(100vh - 190px -  220px);
  }

  .job-detail-c{
    height: calc(100vh - 190px - 340px );
  }

}

@media screen and (max-width: 1919px) and (min-width: 1200px) {
  /*  140 */
  .job-detail-container{
    height: calc(100vh - 140px -  220px);
  }

  .job-detail-c{
    height: calc(100vh - 140px - 340px );
  }
}

@media screen and (max-width: 1199px) and (min-width: 992px) {
  /*  120 */
  .job-detail-container{
    height: calc(100vh - 120px -  220px);
  }

  .job-detail-c{
    height: calc(100vh - 120px - 340px );
  }
}


.job-detail-t{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  height: 120px;
}

.job-detail-t-l{
  width: 50%;
}

.job-detail-t-r{
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: flex-start;*/
  /*flex-direction: row;*/
}

.job-detail-t-l-1{
  cursor: pointer;
  font-family:BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color:#6650B3;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.job-detail-t-l-2{
  font-family:BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 35px;
  color:#262626;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.job-detail-t-l-3{
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color:#262626;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}




.job-detail-c-1{

}

.job-detail-c-item{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.job-detail-c-item-l{
  /*width: 210px;*/
  font-family:Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color:#262626;
}
.job-detail-c-item-r{
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color:#262626;
  margin-left: 10px;
}

.job-detail-c-2{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
}

.job-detail-c-2-l{
  width: 100%;
}
.job-detail-c-2-r{
  width:100%;
  margin-top: 50px;
}

.job-detail-c-item-label{
  font-family:BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color:#262626;
}
.job-detail-c-item-c{
  margin-top: 25px;
}
.job-detail-desc{
  margin-top: 50px;
}

.job-detail-desc-label{
  font-family:BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color:#262626;
}

.job-detail-desc-content{
  margin-top: 25px;
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color:#262626;
}

.map-container{
  margin-top: 25px;
  margin-bottom: 50px;
}

#mapContainer{
  height: 300px;
}

.working-hours{
  width: 100%;
}

.working-hours-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 10px;
  position: relative;
}
.working-hours-week{
  margin-left: 10px;
}
.working-hours-hours{
  margin-left: 20px;
}

@media screen  and (min-width: 1200px) {

}

@media screen and (max-width: 768px ) {
  .jobs-list-col{
    padding: 0;
  }

  .jobs-filter-col{
    padding-right: 0;
  }



}



</style>
