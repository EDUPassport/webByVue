<template>
  <div class="bg" v-loading="showLoadingStatus">

    <template v-if="exchangeAccountInfo">
      <ExchangeAccountInfo :info="exchangeAccountInfo"></ExchangeAccountInfo>
    </template>

    <el-row class="bg-container" :gutter="0" align="top" justify="center">

      <el-col class="jobs-filter-col" :xs="22" :sm="22" :md="4" :lg="4" :xl="4">

        <div class="jobs-bg-filter-container">
          <div class="jobs-filter-container">
            <div class="jobs-filter-label">Find a job</div>
            <div class="jobs-filter-location">
              <el-select class="jobs-filter-select" v-model="locationValue" clearable placeholder="Location"
                         @change="locationChange"
                         size="default">
                <el-option
                    v-for="item in locationOptions"
                    :key="item.id"
                    :label="item.CityPinyin"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div class="jobs-filter-salary">
              <el-select class="jobs-filter-select" v-model="salaryValue" clearable
                         @change="salaryChange"
                         placeholder="Salary" size="default">
                <el-option
                    v-for="item in salaryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="jobs-filter-gender">
              <el-select class="jobs-filter-select" v-model="genderValue" clearable
                         @change="genderChange"
                         placeholder="Gender" size="default">
                <el-option
                    v-for="item in genderOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="jobs-filter-job-type">
              <el-select class="jobs-filter-select" v-model="jobTypeValue" clearable
                         @change="jobTypeChange"
                         placeholder="Job Type" size="default">
                <el-option
                    v-for="item in jobTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="jobs-filter-student-age">
              <el-select class="jobs-filter-select" v-model="studentAgeValue" clearable
                         @change="studentAgeChange"
                         placeholder="Student Age"
                         size="default">
                <el-option
                    v-for="item in studentAgeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div class="jobs-filter-online">
              <el-select class="jobs-filter-select" v-model="onlineValue" clearable
                         @change="onlineChange"
                         placeholder="Online/Offline"
                         size="default">
                <el-option
                    v-for="item in onlineOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </div>


          </div>

        </div>
        <!--        featuredJobs jobs    -->
        <!--        <featuredJobs></featuredJobs>-->
        <!--        latest industry articles-->
        <!--        <latestIndustryNews></latestIndustryNews>-->

      </el-col>

      <el-col class="jobs-list-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <template v-if="isOther">
          <jobsListComponent :jobListData="otherJobListData"
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
          <businessProfile :canEdit="false" :info="companyInfo" :identity="detailData.identity" ></businessProfile>

        </template>

        <template v-else>
          <div class="job-detail-bg-container">

            <div class="xll-ads-container" v-if="jobsAdsListTop.length>0">
              <div class="xll-ads-label">Sponsored</div>
              <el-carousel height="13vh" indicator-position="none">
                <el-carousel-item class="xll-ads-swiper-item"
                                  v-for="(item,i) in jobsAdsListTop" :key="i"
                                  @click="turnBanner(item.link)"
                >
                  <div class="xll-ads">
                    <el-image class="xll-ads-img"
                              :src="item.user_url !='' ? item.user_url : item.url">
                      <template #error>
                        <div class="image-ads-slot">
                          <el-icon :size="80" color="#808080">
                            <Picture/>
                          </el-icon>
                        </div>
                      </template>
                    </el-image>
                  </div>
                </el-carousel-item>
              </el-carousel>

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
                  <el-button type="primary" round>QUICK APPLY</el-button>
                  <el-button plain round>SAVE</el-button>
                </div>
              </div>

              <el-scrollbar class="job-detail-c">
                <div class="job-detail-c-1">
                  <div class="job-detail-c-item">
                    <div class="job-detail-c-item-l">Start date:</div>
                    <div class="job-detail-c-item-r">{{detailData.entry_date}}</div>
                  </div>
                  <div class="job-detail-c-item">
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
                  <div class="job-detail-c-item">
                    <div class="job-detail-c-item-l">Student's age:</div>
                    <div class="job-detail-c-item-r">
                      {{ $filters.userObjectFormat(detailData.age_to_teach)}}
                    </div>
                  </div>
                  <div class="job-detail-c-item">
                    <div class="job-detail-c-item-l">Subjects:</div>
                    <div class="job-detail-c-item-r">
                      {{ $filters.userObjectFormat(detailData.subject)}}
                    </div>
                  </div>
                </div>

                <div class="job-detail-c-2">
                  <div class="job-detail-c-2-l">
                    <div class="job-detail-c-item-label">Requirements:</div>
                    <div class="job-detail-c-item-c">
                      <div class="job-detail-c-item">
                        <div class="job-detail-c-item-l">Teaching experience:</div>
                        <div class="job-detail-c-item-r">
                          {{detailData.teaching_times_en}}
                        </div>
                      </div>
                      <div class="job-detail-c-item">
                        <div class="job-detail-c-item-l">Minimum education:</div>
                        <div class="job-detail-c-item-r">
                          {{detailData.education_en}}
                        </div>
                      </div>
                      <div class="job-detail-c-item">
                        <div class="job-detail-c-item-l">Class size:</div>
                        <div class="job-detail-c-item-r">
                          {{detailData.class_size}}
                        </div>
                      </div>
                      <div class="job-detail-c-item">
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

                      <div class="job-detail-c-item">
                        <div class="job-detail-c-item-l">Teaching certificates:</div>
                        <div class="job-detail-c-item-r">CeLaa</div>
                      </div>
                      <div class="job-detail-c-item">
                        Teaching license
                      </div>
                      <div class="job-detail-c-item">
                        First AID certificate
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
                      <div class="job-detail-c-item">
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
                  <div style="margin-top: 25px;" v-html="detailData.desc"></div>
                </div>

                <div class="map-container">
                  <div id="mapContainer" class="basemap"></div>
                </div>

              </el-scrollbar>

            </div>


          </div>

        </template>


      </el-col>
    </el-row>
  </div>
</template>

<script>
import jobsListComponent from "@/components/jobsListComponent";
import ads22Img from '@/assets/ads/22.png'
import {useRouter, useRoute} from "vue-router";
import {
  ADS_LIST,
  JOB_LIST,
  USER_OBJECT_LIST,
  JOBS_AREA_LIST,
  ADD_FAVORITE,
  CANCEL_FAVORITE,
  USER_INFO_VISITOR_V2, SWITCH_IDENTITY_V2,
  JOBS_COUNTRY_LIST, JOB_DETAIL, COMPANY_JOB_LIST
} from "@/api/api";
import BusinessProfile from "@/components/businessProfile";
// import featuredJobs from "@/components/featuredJobs";
// import latestIndustryNews from "@/components/latestIndustryNews";
import ExchangeAccountInfo from '@/components/jobs/exchangeInfo';
import {encode} from "js-base64";
import {randomString} from "@/utils";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
  name: "list",
  data() {
    return {
      showCompanyStatus:false,
      isOther:false,
      companyInfo:{},
      ads22Img,
      locationValue: '',
      locationOptions: [],
      salaryValue: '',
      salaryOptions: [
        {
          label: '0-5K',
          value: 1
        },
        {
          label: '5K-10K',
          value: 2
        },
        {
          label: '10K-15K',
          value: 3
        },
        {
          label: '15K+',
          value: 4
        }
      ],
      genderValue: '',
      genderOptions: [
        {
          label: 'Male',
          value: 1
        }, {
          label: 'Female',
          value: 2
        }
      ],
      jobTypeValue: '',
      jobTypeOptions: [
        {
          label: 'Full-time',
          value: 1
        },
        {
          label: 'Part-time',
          value: 2
        },
        {
          label: 'Seasonal',
          value: 3
        }
      ],
      studentAgeValue: '',
      studentAgeOptions: [],
      onlineValue: '',
      onlineOptions: [
        {
          label: 'Online',
          value: 1
        },
        {
          label: 'Offline',
          value: 0
        }

      ],
      workExpValue: '',
      workExpOptions: [],
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

      detailData:{},
      selectedJobId:0,
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      workingHoursData:[],

      selectedOtherJobId:0,
      otherJobPage:1,
      otherJobLimit:1,
      otherJobTotalNum:0,
      otherJobListData:[]

    }
  },
  components: {
    ExchangeAccountInfo,
    jobsListComponent,
    BusinessProfile

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
  mounted() {

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

    this.getUserObjectList()
    this.getAdsList()

    let envName = process.env.VUE_APP_ENV_NAME
    if (envName === 'development' || envName === 'production') {
      this.getJobCountryList()
      let countryValue = this.$route.query.country;
      if (countryValue && countryValue != '') {
        this.locationValue = Number(countryValue)
      }
    }

    if (envName === 'developmentCN' || envName === 'productionCN') {
      this.getJobsAreaList()
      let cityValue = this.$route.query.city;
      if (cityValue && cityValue != '') {
        this.locationValue = Number(cityValue)
      }
    }

    this.getJobList(this.jobPage, this.jobLimit)

  },
  methods: {
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
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
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
          if (identity == 2) {
            jobsAdsListTop = res.message.filter(item => item.name == 'business_j2');
            jobsAdsListMid = res.message.filter(item => item.name == 'business_j3');
          }
          if (identity == 3) {
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
    getJobCountryList() {
      let params = {}
      JOBS_COUNTRY_LIST(params).then(res => {
        if (res.code == 200) {
          this.locationOptions = res.message;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getJobsAreaList() {
      let params = {}
      JOBS_AREA_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.locationOptions = res.message;
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
    getUserObjectList() {
      let params = {}
      USER_OBJECT_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          let ageToTeachList = res.message.filter(item => item.pid == 4)
          // let lan = localStorage.getItem('language')

          ageToTeachList.forEach(item => {
            let obj = {
              label: item.object_en,
              value: item.id
            }

            this.studentAgeOptions.push(obj)

          })

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
    locationChange(e) {
      // console.log(e)
      this.jobListData = []
      this.showLoadingStatus = true
      this.locationValue = e;
      this.getJobList(this.jobPage, this.jobLimit)
    },
    salaryChange(e) {
      // console.log(e)
      this.jobListData = []
      this.showLoadingStatus = true
      this.salaryValue = e
      this.getJobList(this.jobPage, this.jobLimit)
    },
    genderChange(e) {
      this.jobListData = []
      this.showLoadingStatus = true
      // console.log(e)
      this.genderValue = e
      this.getJobList(this.jobPage, this.jobLimit)
    },
    jobTypeChange(e) {
      this.jobListData = []
      this.showLoadingStatus = true
      // console.log(e)
      this.jobTypeValue = e
      this.getJobList(this.jobPage, this.jobLimit)
    },
    studentAgeChange(e) {
      this.jobListData = []
      this.showLoadingStatus = true
      // console.log(e)
      this.studentAgeValue = e
      this.getJobList(this.jobPage, this.jobLimit)
    },
    onlineChange(e) {
      this.jobListData = []
      this.showLoadingStatus = true
      // console.log(e)
      this.onlineValue = e
      this.getJobList(this.jobPage, this.jobLimit)
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

              self.$router.push({path: '/edupassport', query: {redirect_params: redirectParamsStr}})

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
      console.log(this.jobPage)
      console.log(isOther)

      this.showCompanyStatus = false;
      if(isOther){
        this.$router.push({path:'/jobs',query:{id:id,page:page,from:1}})

      }else{
        this.$router.push({path:'/jobs',query:{id:id,page:page}})

      }

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

.jobs-bg-filter-container{

}

.jobs-filter-container {
  background-color: #F0F2F5;
  height: calc(100vh - 200px);
  padding: 30px;
  /*overflow-y: scroll;*/
}

.jobs-filter-label {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.jobs-filter-location {
  margin-top: 10px;
}

.jobs-filter-select {
  width: 100%;
}

.jobs-filter-salary {
  margin-top: 10px;
}

.jobs-filter-gender {
  margin-top: 10px;
}

.jobs-filter-job-type {
  margin-top: 10px;
}

.jobs-filter-student-age {
  margin-top: 10px;
}

.jobs-filter-online {
  margin-top: 10px;
}

.jobs-filter-work-exp {
  margin-top: 10px;
}

.xll-ads-container {
  padding: 0 50px;
  margin-bottom: 50px;
}

.xll-ads-label{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  color:#262626;
}

.xll-ads{

}

.xll-ads-swiper-item {
  cursor: pointer;
  border-radius: 10px;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.image-ads-slot {
  text-align: center;
  padding: 50px 150px;
}


.job-detail-bg-container{
  background-color: #F0F2F5;
  height: calc(100vh - 170px);
  padding: 30px 30px 0 30px;
}

.job-detail-container{

}

.job-detail-t{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  height: 120px;

}

.job-detail-t-l{
  width: 70%;
}

.job-detail-t-l-1{
  cursor: pointer;
  font-family:BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color:#6650B3;
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
}

.job-detail-c{
  height: calc(87vh - 365px);

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
  margin-top: 50px;
}

.job-detail-c-2-l{
  width: 50%;
}
.job-detail-c-2-r{
  width:50%;
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

.map-container{
  margin-top: 25px;
  margin-bottom: 50px;
}

#mapContainer{
  height: 300px;
}

@media screen and (max-width: 768px ) {

}

@media screen  and (min-width: 1200px) {

}
</style>
