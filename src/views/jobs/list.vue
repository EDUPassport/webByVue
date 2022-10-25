<template>
  <div class="bg" v-loading="showLoadingStatus">

    <template v-if="exchangeAccountInfo">
      <ExchangeAccountInfo :info="exchangeAccountInfo"></ExchangeAccountInfo>
    </template>

    <el-row class="bg-container" :gutter="0" align="top" justify="center">

      <el-col class="jobs-filter-col" :xs="22" :sm="22" :md="4" :lg="4" :xl="4">
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
                             :jobFeaturedData="jobFeaturedListData"
                             :selectedJobId="selectedJobId"
                             :jobLimit="jobLimit"
                             :jobTotalNum="jobTotalNum"
                             :jobPage="jobPage"
                             :isOther="false"
                             @jobDetailEvent="turnJobDetail"
                             @jobPageChange="jobPageChange"
                             @addFavorite = "addFavorite"
                             @cancelFavorite="cancelFavorite"

          >
          </jobsListComponent>
        </template>

      </el-col>

      <el-col class="job-detail-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <template v-if="showCompanyStatus">
          <businessProfile :canEdit="false"
                           :fromDeal="false"
                           :info="companyInfo"
                           :identity="detailData.identity"
          >
          </businessProfile>
        </template>

        <template v-else>

          <el-scrollbar class="xll-job-detail">

            <div class="job-detail-bg-container">

              <div class="xll-ads-container" v-if="jobsAdsListTop.length>0">
                <adsComponent :height="jobAdsHeight" :adsData="jobsAdsListTop">
                </adsComponent>
              </div>

              <div class="job-detail-container">

                <div class="job-detail-t">
                  <div class="job-detail-t-l">
                    <div class="job-detail-t-l-1"
                         v-if="detailData.company"
                         @click="turnBusinessProfile(detailData.company)"
                    >
                      {{detailData.company.company_name}}
                    </div>
                    <div class="job-detail-t-l-2">
                      {{detailData.job_title}}
                    </div>
                    <div class="job-detail-t-l-3">
                      {{detailData.job_location}}
                    </div>
                  </div>
                  <div class="job-detail-t-r">
                    <el-button link @click="shareJob(detailData)">
                      SHARE
                    </el-button>
                    <el-button type="primary" round
                               :loading="applyBtnLoading"
                               @click="applyJob(detailData.id)">
                      QUICK APPLY
                    </el-button>
                    <el-button plain round
                               @click="saveJob(detailData.id,1,detailData.job_title,detailData.company_logo)">
                      SAVE
                      <el-icon>
                        <CollectionTag />
                      </el-icon>
                    </el-button>
                  </div>
                </div>

                <el-scrollbar class="job-detail-c">

                  <div class="job-detail-c-1">
                    <div class="job-detail-c-item" v-if="detailData.entry_date">
                      <div class="job-detail-c-item-l">Start date:</div>
                      <div class="job-detail-c-item-r">{{detailData.entry_date}}</div>
                    </div>

                    <div class="job-detail-c-item" v-if="detailData.age_to_teach">
                      <div class="job-detail-c-item-l">Student's age:</div>
                      <div class="job-detail-c-item-r">
                        {{ $filters.userObjectFormat(detailData.age_to_teach)}}
                      </div>
                    </div>

                    <div class="job-detail-c-item" v-if="detailData.subject">
                      <div class="job-detail-c-item-l">Subjects:</div>
                      <div class="job-detail-c-item-r">
                        {{ $filters.userObjectFormat(detailData.subject)}}
                      </div>
                    </div>

                    <div class="job-detail-c-item" v-if="workingHoursData.length>0">
                      <div class="job-detail-c-item-l">Hours:</div>
                      <div class="job-detail-c-item-r">
                        <div class="working-hours">
                          <div class="working-hours-item" v-for="(item,index) in workingHoursData" :key="index">
                            <el-tag class="working-hours-week" v-for="(week,i) in item.week" :key="i">
                              <span v-if="week==1">M</span>
                              <span v-if="week==2">T</span>
                              <span v-if="week==3">W</span>
                              <span v-if="week==4">Th</span>
                              <span v-if="week==5">F</span>
                              <span v-if="week==6">Sa</span>
                              <span v-if="week==7">Su</span>
                            </el-tag>
                            <span class="working-hours-hours">{{item.hours}}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div class="job-detail-c-2">
                    <div class="job-detail-c-2-l">
                      <div class="job-detail-c-item-label">Requirements:</div>
                      <div class="job-detail-c-item-c">
                        <div class="job-detail-c-item" v-if="detailData.teaching_times_en">
                          <div class="job-detail-c-item-l">Teaching experience:</div>
                          <div class="job-detail-c-item-r">
                            {{detailData.teaching_times_en}}
                          </div>
                        </div>
                        <div class="job-detail-c-item" v-if="detailData.education_en">
                          <div class="job-detail-c-item-l">Minimum education:</div>
                          <div class="job-detail-c-item-r">
                            {{detailData.education_en}}
                          </div>
                        </div>
                        <div class="job-detail-c-item" v-if="detailData.class_size">
                          <div class="job-detail-c-item-l">Class size:</div>
                          <div class="job-detail-c-item-r">
                            {{detailData.class_size}}
                          </div>
                        </div>
                        <div class="job-detail-c-item" v-if="detailData.numbers">
                          <div class="job-detail-c-item-l">Number of Vacancies:</div>
                          <div class="job-detail-c-item-r">
                            {{detailData.numbers}}
                          </div>
                        </div>
                        <div class="job-detail-c-item"
                             v-if="detailData.apply_due_date && detailData.apply_due_date !='0000-00-00'"
                        >
                          <div class="job-detail-c-item-l">Application:</div>
                          <div class="job-detail-c-item-r">
                            {{detailData.apply_due_date}}
                          </div>
                        </div>

                        <div class="job-detail-c-item" v-if="detailData.Teaching_certificate">
                          <div class="job-detail-c-item-l">Teaching certificates:</div>
                          <div class="job-detail-c-item-r">
                            {{ $filters.userObjectFormat(detailData.Teaching_certificate)}}
                          </div>
                        </div>

                      </div>

                    </div>

                    <div class="job-detail-c-2-r">
                      <div class="job-detail-c-item-label">Compensation:</div>
                      <div class="job-detail-c-item-c">
                        <div class="job-detail-c-item">
                          <div class="job-detail-c-item-l">Salary range:</div>
                          <div class="job-detail-c-item-r">
                            {{ detailData.currency }} {{ detailData.salary_min }} - {{ detailData.salary_max }} /
                            <span v-if="detailData.payment_period == 112">hourly</span>
                            <span v-if="detailData.payment_period == 113">daily</span>
                            <span v-if="detailData.payment_period == 114">weekly</span>
                            <span v-if="detailData.payment_period == 115">monthly</span>
                            <span v-if="detailData.payment_period == 116">annually</span>
                          </div>
                        </div>
                        <div class="job-detail-c-item" v-if="detailData.benefits">
                          <div class="job-detail-c-item-l">Benefits:</div>
                          <div class="job-detail-c-item-r">
                            {{ $filters.userObjectFormat(detailData.benefits)}}
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                  <div class="job-detail-desc">
                    <div class="job-detail-desc-label">Job details:</div>
                    <div class="job-detail-desc-content" v-html="detailData.desc"></div>
                  </div>

                  <div class="map-container">
                    <div id="mapContainer" class="basemap"></div>
                  </div>

                </el-scrollbar>

              </div>

            </div>

          </el-scrollbar>

        </template>

        <shareCard :visible="shareDialogVisible"
                   :title="shareInfo.title"
                   :description ="shareInfo.desc"
                   :quote = "shareInfo.desc"
                   :url="locationUrl"
                   @close="shareDialogVisible=false"
        >
        </shareCard>


      </el-col>
    </el-row>
  </div>
</template>

<script>
import shareCard from "@/components/shareCard";
import filterWithJobList from "@/components/jobs/filterWithJobList";
import jobsListComponent from "@/components/jobsListComponent";
import ads22Img from '@/assets/ads/22.png'
import {useRouter, useRoute} from "vue-router";
import {
  ADS_LIST,
  JOB_LIST,
  ADD_FAVORITE,
  CANCEL_FAVORITE,
  USER_INFO_VISITOR_V2, SWITCH_IDENTITY_V2, JOB_DETAIL, COMPANY_JOB_LIST, JOB_FEATURED_LIST, APPLY_JOBS
} from "@/api/api";
import BusinessProfile from "@/components/businessProfile";
import ExchangeAccountInfo from '@/components/jobs/exchangeInfo';
import {encode} from "js-base64";
import {randomString} from "@/utils";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import adsComponent from "@/components/ads/adsComponent";

export default {
  name: "list",
  data() {
    return {
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
      showLoadingStatus: true,
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
      otherJobLimit:1,
      otherJobTotalNum:0,
      otherJobListData:[],
      jobDetailHeight:0

    }
  },
  components: {
    ExchangeAccountInfo,
    jobsListComponent,
    BusinessProfile,
    filterWithJobList,
    shareCard,
    adsComponent

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
    let page = to.query.page;
    let fromValue = to.query.from;

    if(jobId){
      this.selectedJobId = jobId
      if(!this.showCompanyStatus){
        this.getJobDetail(jobId)
      }

    }

    if(page){

      if(fromValue == 1){
        this.otherJobPage = Number(page)
      }else{
        this.jobPage = Number(page);
      }

    }


  },
  unmounted() {
    window.onresize = null
  },
  mounted() {

    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    // if (screenWidthFloor < 768) {
    //   this.jobAdsHeight = '190px'
    // }
    //
    // if (screenWidthFloor >= 768 && screenWidthFloor < 992) {
    //   this.jobAdsHeight = '190px'
    // }
    if (screenWidthFloor >= 992 && screenWidthFloor < 1200) {
      this.jobAdsHeight = '120px'
    }
    if (screenWidthFloor >= 1200 && screenWidthFloor < 1920) {
      this.jobAdsHeight = '140px'
    }
    if(screenWidthFloor >= 1920){
      this.jobAdsHeight = "190px"
    }

    window.onresize = () =>{
      // if (screenWidthFloor < 768) {
      //   this.jobAdsHeight = '190px'
      // }
      //
      // if (screenWidthFloor >= 768 && screenWidthFloor < 992) {
      //   this.jobAdsHeight = '190px'
      // }
      if (screenWidthFloor >= 992 && screenWidthFloor < 1200) {
        this.jobAdsHeight = '120px'
      }
      if (screenWidthFloor >= 1200 && screenWidthFloor < 1920) {
        this.jobAdsHeight = '140px'
      }
      if(screenWidthFloor >= 1920){
        this.jobAdsHeight = "190px"
      }

    }

    let jobId = this.$route.query.id;
    let page = this.$route.query.page;
    let fromValue = this.$route.query.from;

    if(jobId){
      this.selectedJobId = jobId
      this.getJobDetail(jobId)
    }

    if(page){

      if(fromValue == 1){
        this.otherJobPage = Number(page)
      }else{
        this.jobPage = Number(page);
      }

    }

    this.getJobFeaturedList()
    this.getJobList(this.jobPage, this.jobLimit)
    this.getAdsList()

  },
  methods: {
    searchByFilter(e){
      console.log(e)

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

      JOB_LIST(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          let jobData = res.message.data;
          let routeJobId = this.$route.query.id;
          if(!routeJobId){

            if(jobData.length>0){
              this.selectedJobId = jobData[0]['id']
              this.getJobDetail(jobData[0]['id'])
            }

          }

          this.jobListData = res.message.data
          // console.log(res.message.data)
          this.jobTotalNum = res.message.total
          this.showLoadingStatus = false
        } else {
          console.log(res.msg)
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
    getJobDetail(id) {
      let params = {
        job_id: id
      }
      JOB_DETAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.detailData = res.message

          const workHours = res.message.working_hours
          if (workHours) {
            // this.jobForm.working_hours = JSON.parse(workHours)
            this.workingHoursData = JSON.parse(workHours)
          }

          this.initMap(res.message.lng,res.message.lat)
          // let userId = res.message.user_id
          // this.getCompanyJobList(userId)
        }
      }).catch(err=>{
        console.log(err)
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
    jobPageChange(e) {
      console.log(e)
      this.showLoadingStatus = true;
      this.jobPage = e
      this.getJobList(e, this.jobLimit)
      // console.log(e)
      // document.documentElement.scrollTop = 120
    },
    getJobList(page, limit) {

      let params = {
        page: page,
        limit: limit
      }

      JOB_LIST(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          let jobData = res.message.data;
          let routeJobId = this.$route.query.id;
          if(!routeJobId){

            if(jobData.length>0){
              this.selectedJobId = jobData[0]['id']
              this.getJobDetail(jobData[0]['id'])
            }

          }

          this.jobListData = res.message.data
          // console.log(res.message.data)
          this.jobTotalNum = res.message.total
          this.showLoadingStatus = false


        } else {
          console.log(res.msg)
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
    selectRole(e) {
      this.$loading({
        text: 'Loading...'
      })

      let params = {
        user_id: localStorage.getItem('uid'),
        identity: e
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        let userContact = res.message.user_contact;
        let educatorContact = {};

        let companyInfo = {};

        let isEducator = userContact.is_educator;
        let isRecruiting = userContact.is_recruiting;
        let isSchool = userContact.is_school;
        let isOther = userContact.is_other;
        let isVendor = userContact.is_vendor;
        let identity = e;

        if (identity == 1) {
          if (isEducator > 10) {
            educatorContact = res.message.user_contact.educator_contact;
            this.changeIdentity(educatorContact.id, 1, 2)
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 1}})

          }

        }

        if (identity == 2) {

          if (isRecruiting > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id, 2, 2)
            // this.$router.push({path: '/overview', query: {identity: identity}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 2}})

            this.dialogBusinessAccountVisible = false
          }
        }

        if (identity == 3) {

          if (isSchool > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id, 3, 2)
            // this.$router.push({path: '/overview', query: {identity: identity}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 3}})

            this.dialogBusinessAccountVisible = false
          }

        }

        if (identity == 4) {

          if (isOther > 10) {
            companyInfo = res.message.user_contact.company;

            this.changeIdentity(companyInfo.id, 4, 2)
            this.$loading().close()
          } else {
            this.$loading().close()
            this.$router.push({path: '/profile/contact/user', query: {i: 4}})
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.dialogBusinessAccountVisible = false
          }

        }

        if (identity == 5) {

          if (isVendor > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id, 5, 2)
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 5}})

          }

        }


      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })
    },
    changeIdentity(companyId, identity, language) {
      let params = {
        company_id: companyId,
        language: language,
        identity: identity
      }

      SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.$store.commit('allIdentityChanged', true)

          localStorage.setItem('company_id', companyId)
          localStorage.setItem('identity', identity)

          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData', str)

          this.$store.commit('identity', identity)
          this.$store.commit('menuData', res.message)

          this.$loading().close()
        }
      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })

    },
    turnBusinessProfile(info){
      // console.log(info)
      this.showCompanyStatus = true;
      this.isOther = true;

      this.companyInfo = info;
      this.getCompanyJobList(info.user_id,this.otherJobPage,this.otherJobLimit);

    },
    getCompanyJobList(userId,page,limit){

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
        }

      }).catch(err=>{
        console.log(err)
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
      this.showCompanyStatus = false;
      this.isOther = false;
      this.$router.push({path:'/jobs',query:{id:this.selectedJobId,page:this.jobPage}})

    },
    turnJobDetail(id,page,isOther){

      this.showCompanyStatus = false;
      if(isOther){
        this.$router.push({path:'/jobs',query:{id:id,page:page,from:1}})

      }else{
        this.$router.push({path:'/jobs',query:{id:id,page:page}})

      }

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

    },
    shareJob(data){
      this.shareInfo = {
        title:data.job_title,
        desc:data.desc,
        id:data.id
      }
      this.shareDialogVisible = true;
    },
    applyJob(id) {
      this.applyBtnLoading = true;
      let identity = localStorage.getItem('identity')
      let token = localStorage.getItem('token')
      if (identity == 1) {
        let params = {
          job_id: id,
          token: token
        }
        APPLY_JOBS(params).then(res => {
          if (res.code == 200) {
            this.$message.success('Apply Success')
            this.applyBtnLoading = false;
          }
        }).catch(err=>{
          console.log(err)
          if(err.code === 400){
            this.$message.error('Please complete your profile in order to apply')
          }else{
            if(err.msg){
              this.$message.error(err.msg)
            }
            if(err.message){
              this.$message.error(err.message)
            }
          }

          this.applyBtnLoading = false;

        })

      } else {
        this.$message.warning('Please switch to an educator profile to be able to apply')
        this.applyBtnLoading = false;
      }


    },
    saveJob(id, type, title, url){
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: id,
        type_title: title,
        type_url: url
      }
      ADD_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.isFavoriteValue = 1
        }
      }).catch(err=>{
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
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
