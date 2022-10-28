<template>
  <div class="bg" >

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

      <el-col class="job-detail-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-loading="showLoadingStatus">
        <businessProfile :canEdit="false"
                         :fromDeal="false"
                         :info="companyInfo"
                         :identity="detailData.identity"
        >
        </businessProfile>

      </el-col>
    </el-row>
  </div>
</template>

<script>

import filterWithJobList from "@/components/jobs/filterWithJobList";
import jobsListComponent from "@/components/jobsListComponent";

import {useRouter, useRoute} from "vue-router";
import {
  ADS_LIST,
  ADD_FAVORITE,
  CANCEL_FAVORITE,
  USER_INFO_VISITOR_V2, COMPANY_JOB_LIST, JOB_FEATURED_LIST
} from "@/api/api";
import BusinessProfile from "@/components/businessProfile";
import ExchangeAccountInfo from '@/components/jobs/exchangeInfo';
// import {encode} from "js-base64";
// import {randomString} from "@/utils";

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

      companyInfo:{},
      jobFeaturedListData: [],
      showLoadingStatus: false,

      detailData:{},
      selectedJobId:0,
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,

      otherJobPage:1,
      otherJobLimit:10,
      otherJobTotalNum:0,
      otherJobListData:[],
      jobsAdsListMid:[]

    }
  },
  components: {
    ExchangeAccountInfo,
    jobsListComponent,
    BusinessProfile,
    filterWithJobList

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

  },
  mounted() {

    let userId = this.$route.query.uid;
    let identity = this.$route.query.i;
    let cid = this.$route.query.cid;
    let jobId = this.$route.query.jobId;

    if(userId && identity && cid && jobId){

      this.getCompanyJobList(userId,this.otherJobPage, this.otherJobLimit)
      this.getVisitorUserInfo(userId,identity,cid)
      this.selectedJobId = jobId

    }
    this.getAdsList()

  },
  methods: {
    getVisitorUserInfo(userId,identity,companyId) {

      let params = {
        user_id:userId,
        identity:identity,
        company_id:companyId
      }
      this.showLoadingStatus = true;
      USER_INFO_VISITOR_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.companyInfo = res.message.user_contact.company;

          this.showLoadingStatus = false;
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    searchByFilter(e){
      console.log(e)
      this.jobLoadingValue = true;

      let params = {
        user_id:this.companyInfo.user_id,
        is_open: 1,
        status:1,
        page: this.otherJobPage,
        limit: this.otherJobLimit
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

          // let jobData = res.message.data;
          // let routeJobId = this.$route.query.id;
          // if(!routeJobId){
          //
          //   if(jobData && jobData.length>0){
          //     this.selectedJobId = jobData[0]['id']
          //   }
          //
          // }
          let resMessage = res.message

          console.log(resMessage.data)
          if(resMessage.data){
            this.otherJobListData = res.message.data
          }else{
            this.otherJobListData = []
          }

          if(resMessage.total){
            this.otherJobTotalNum = res.message.total
          }

          this.jobLoadingValue = false;

        } else {
          console.log(res.msg)
        }
      }).catch(err => {
        console.log(err)
        this.jobLoadingValue = false;
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
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
    turnBanner(link) {
      console.log(link)
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
          let jobsAdsListMid = [];
          let identity = localStorage.getItem('identity');

          if (!identity) {
            jobsAdsListMid = res.message.filter(item => item.name == 'guest_j3');
          }
          if (identity == 1) {
            jobsAdsListMid = res.message.filter(item => item.name == 'educator_j3');
          }

          if (identity == 2 || identity == 3 || identity == 4) {
            jobsAdsListMid = res.message.filter(item => item.name == 'business_j3');
          }

          if (identity == 5) {
            jobsAdsListMid = res.message.filter(item => item.name == 'vendor_j3');
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
      this.jobLoadingValue = true;
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
          this.jobLoadingValue = false;
        }

      }).catch(err=>{
        console.log(err)
        this.jobLoadingValue = false;
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
      this.$router.go(-1)
      // this.$router.push('/jobs')
      // this.showCompanyStatus = false;
      // this.isOther = false;
      // this.$router.push({path:'/jobs',query:{id:this.selectedJobId,page:this.jobPage}})

    },
    turnJobDetail(id){
      this.$router.push({path:'/jobs/detail',query:{id:id}})
    },
    getJobFeaturedList() {
      let params = {
        ad_type: 2
      }

      JOB_FEATURED_LIST(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.jobFeaturedListData = res.message;
        } else {
          console.log(res.msg)
        }
      }).catch(err=>{
        console.log(err)
        // this.$message.error(err.msg)
      })

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


@media screen and (max-width: 768px ) {

}

@media screen  and (min-width: 1200px) {

}
</style>
