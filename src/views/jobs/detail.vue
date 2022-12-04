<template>
  <div class="bg">

    <template v-if="exchangeAccountInfo">
      <ExchangeAccountInfo :info="exchangeAccountInfo"></ExchangeAccountInfo>
    </template>

    <el-row class="bg-container" :gutter="0" align="top" justify="center">

      <el-col class="jobs-filter-col" :xs="22" :sm="22" :md="4" :lg="4" :xl="4">
        <filterWithJobList @search="searchByFilter"></filterWithJobList>
      </el-col>

      <el-col class="jobs-list-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">

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


      </el-col>

      <el-col class="job-detail-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12"  v-loading="showLoadingStatus">

        <jobDetailComponent
            :detailData="detailData"
            :workingHoursData="workingHoursData"
            :adsData="jobsAdsListTop"
            :adsHeight="jobAdsHeight"

        ></jobDetailComponent>


      </el-col>
    </el-row>
  </div>
</template>

<script>
import jobDetailComponent from '@/components/jobs/detailComponent'
import filterWithJobList from "@/components/jobs/filterWithJobList";
import jobsListComponent from "@/components/jobsListComponent";

import ads22Img from '@/assets/ads/22.png'
import {useRouter, useRoute} from "vue-router";
import {
  ADS_LIST,
  ADD_FAVORITE,
  CANCEL_FAVORITE, JOB_DETAIL, COMPANY_JOB_LIST
} from "@/api/api";

import ExchangeAccountInfo from '@/components/jobs/exchangeInfo';
import {randomString} from "@/utils";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
  name: "detail",
  data() {
    return {
      jobLoadingValue:false,
      jobFeaturedLoadingValue:false,

      shareDialogVisible:false,
      shareInfo:{},
      locationUrl: window.location.href,

      applyBtnLoading:false,
      showCompanyStatus:false,

      isOther:false,
      companyInfo:{},
      ads22Img,

      jobFeaturedListData: [],
      jobListData: [],
      articleListData: [],
      jobPage: 1,
      jobLimit: 10,
      jobTotalNum: 0,
      showLoadingStatus: false,
      versionTime: randomString(),
      jobsAdsListTop: [],
      jobsAdsListMid: [],
      jobAdsHeight:'190px',

      detailData:{},
      selectedJobId:0,
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      workingHoursData:[],

      selectedOtherJobId:0,
      otherJobPage:1,
      otherJobLimit:10,
      otherJobTotalNum:0,
      otherJobListData:[],
      jobDetailHeight:0

    }
  },
  components: {
    ExchangeAccountInfo,
    jobsListComponent,
    filterWithJobList,
    jobDetailComponent

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
    return {
      onSwiper,
      onSlideChange,
      skipJobsList,
      exchangeAccountInfo
    };
  },
  beforeRouteUpdate(to){
    console.log(to)
    let jobId = to.query.id;

    if(jobId){
      this.selectedJobId = jobId
      this.getJobDetail(jobId)

    }

  },
  mounted() {

    let jobId = this.$route.query.id;

    if(jobId){
      this.selectedJobId = jobId
      this.getJobDetail(jobId)

    }

    this.getAdsList()

  },
  methods: {
    searchByFilter(e){
      this.jobLoadingValue = true;

      // this.$router.push('/jobs')

      console.log(e)

      let params = {
        user_id: this.companyInfo.user_id,
        is_open: 1,
        status:1,
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

      COMPANY_JOB_LIST(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

          this.otherJobListData = res.message.data
          // console.log(res.message.data)
          this.otherJobTotalNum = res.message.total
          this.jobLoadingValue = false
        } else {
          console.log(res.msg)
        }
      }).catch(err => {
        console.log(err)
        this.jobLoadingValue = false
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })

    },
    getJobDetail(id) {
      this.showLoadingStatus = true;
      let self = this;
      let params = {
        job_id: id
      }
      JOB_DETAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          let resMessage = res.message;

          self.getCompanyJobList(resMessage.user_id,self.otherJobPage,self.otherJobLimit)
          self.companyInfo = resMessage.company;

          this.detailData = res.message

          const workHours = res.message.working_hours
          if (workHours) {
            // this.jobForm.working_hours = JSON.parse(workHours)
            this.workingHoursData = JSON.parse(workHours)
          }

          setTimeout(function () {
            self.initMap(res.message.lng,res.message.lat)
          },3000)

          this.showLoadingStatus = false
        }
      }).catch(err=>{
        console.log(err)
        this.showLoadingStatus = false
        // if(err.msg){
        //   this.$message.error(err.msg)
        // }
        // if(err.message){
        //   this.$message.error(err.message)
        // }
      })

    },
    initMap(lng,lat){
      mapboxgl.accessToken = this.accessToken;

      const map = new mapboxgl.Map({
        container: "mapContainer",
        center: [lng, lat],
        style: this.mapStyle,
        zoom: 12
      });
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "top-right");

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      });

      map.addControl(geolocate, "top-right")

      const geocoder = new MapboxGeocoder({
        "accessToken": this.accessToken,
        "mapboxgl": mapboxgl
      })

      map.addControl(geocoder, 'top-left')
      const marker = new mapboxgl.Marker()
      marker.setLngLat([lng,lat]).addTo(map)

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
          this.otherJobListData[index]['is_favorite'] = 1
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
    cancelFavorite(type, typeId, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.otherJobListData[index]['is_favorite'] = 0
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
    getCompanyJobList(userId,page,limit){
      this.jobLoadingValue = true
      let params = {
        user_id: userId,
        is_open: 1,
        status:1,
        page: page,
        limit: limit
      }

      let salaryValue = this.salaryValue
      if (salaryValue != '') {
        if (salaryValue == 1) {
          params.salary_begin = 0
          params.salary_end = 5000
        }
        if (salaryValue == 2) {
          params.salary_begin = 5000
          params.salary_end = 10000
        }
        if (salaryValue == 3) {
          params.salary_begin = 10000
          params.salary_end = 15000
        }
        if (salaryValue == 4) {
          params.salary_begin = 15000
        }

      }

      let envName = process.env.VUE_APP_ENV_NAME

      if (this.locationValue != '') {
        if (envName === 'development' || envName === 'production') {
          params.country = this.locationValue
        }
        if (envName === 'developmentCN' || envName === 'productionCN') {
          params.city = this.locationValue
        }
      }

      if (this.genderValue != '') {
        params.sex = this.genderValue
      }

      if (this.jobTypeValue != '') {
        params.employment_type = this.jobTypeValue
      }

      if (this.studentAgeValue != '') {
        params.age_to_teach = this.studentAgeValue
      }

      params.is_online = this.onlineValue


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
      this.getCompanyJobList(this.companyInfo.user_id,e, this.otherJobLimit)

    },
    backToResults(){
      this.$router.push('/jobs')
      // this.$router.go(-1)
      // this.showCompanyStatus = false;
      // this.isOther = false;
      // this.$router.push({path:'/jobs',query:{id:this.selectedJobId,page:this.jobPage}})

    },
    turnJobDetail(id){

      this.$router.push({path:'/jobs/detail',query:{id:id}})

      // this.showCompanyStatus = false;
      // if(isOther){
      //   this.$router.push({path:'/jobs',query:{id:id,page:page,from:1}})
      //
      // }else{
      //   this.$router.push({path:'/jobs',query:{id:id,page:page}})
      //
      // }

    }


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

@media screen and (max-width: 768px ) {
  .jobs-filter-col{
    display: none;
  }

  .jobs-list-col{
    display: none;
  }

  .job-detail-col{
    padding-left: 0;
  }







}

@media screen  and (min-width: 1200px) {

}
</style>
