<template>
  <div class="bg" v-loading="showLoadingStatus">

    <template v-if="exchangeAccountInfo">
      <ExchangeAccountInfo :info="exchangeAccountInfo" ></ExchangeAccountInfo>
    </template>

    <el-row class="bg-container" align="top" justify="center" >
      <el-col :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
        <div class="jobs-filter-container">
          <div class="jobs-filter-label">Find a job</div>
          <div class="jobs-filter-location">
            <el-select class="jobs-filter-select" v-model="locationValue" clearable placeholder="Location"
                       @change="locationChange"
                       size="medium">
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
                       placeholder="Salary" size="medium">
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
                       placeholder="Gender" size="medium">
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
                       placeholder="Job Type" size="medium">
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
                       size="medium">
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
                       size="medium">
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
        <!--        featuredJobs jobs    -->
        <featuredJobs></featuredJobs>
        <!--        latest industry articles-->
        <latestIndustryNews></latestIndustryNews>

      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">

        <div class="xll-ads-container" v-if="jobsAdsListTop.length>0">
          <el-carousel height="180px" indicator-position="none" >
            <el-carousel-item class="xll-ads-swiper-item"
                              v-for="(item,i) in jobsAdsListTop" :key="i"
                              @click="turnBanner(item.link)"
            >
              <div class="xll-ads-l" >
                <el-image class="xll-ads-l-img"
                          :src="item.user_url !='' ? item.user_url : item.url">
                  <template #error>
                    <div class="image-ads-slot">
                      <el-icon :size="80" color="#808080"><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="xll-ads-r">
                <h4>Advertise with Us</h4>
                <h5>Description:</h5>
                <div class="xll-ads-r-desc">
                  Your Adverts and their description will be displayed here.
                  Just click on the banner
                </div>

              </div>
            </el-carousel-item>
          </el-carousel>

        </div>

        <div class="jobs-list-container" >
          <div class="jobs-list-label-container">
            <div class="jobs-list-label">We've found you {{ jobTotalNum }} open jobs</div>
            <div class="post-a-job">
              <el-button class="post-a-job-btn" type="primary" round @click="postJob()">Post a Job</el-button>
            </div>
          </div>
          <div class="jobs-list-content">
            <div class="jobs-list-item" v-for="(item,index) in jobListData" :key="index">

              <div class="jobs-favorite" v-if="item.is_favorite && item.is_favorite == 1"
                   @click="cancelFavorite(1,item.id,index)">
                <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
              </div>
              <div class="jobs-favorite" v-else @click="addFavorite(item.id,1,item.job_title,item.logo,index)">
                <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
              </div>
              <div class="jobs-list-item-l">
                <el-image class="jobs-item-logo" :src="item.third_company_logo ? item.third_company_logo : item.company_logo"
                          fit="contain">
                  <template #error>
                    <div class="image-slot">
                      <el-icon :size="60" color="#808080"><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="jobs-list-item-r">
                <div class="jobs-list-item-title">
                  <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}">{{ item.job_title }}</router-link>
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
                  <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}">Read More...</router-link>
                </div>
              </div>

              <div class="jobs-list-item-b">
                <div class="jobs-list-item-b-l">
                  <view class="jobs-list-item-work-type">
                    <i class="iconfont el-icon-alishijian"></i>
                    <span v-if="item.employment_type==1">FT</span>
                    <span v-if="item.employment_type==2">PT</span>
                    <span v-if="item.employment_type==3">S</span>
                  </view>
                  <view class="jobs-list-item-gender" v-if="item.sex == 1 || item.sex == 2">
                    <i class="iconfont el-icon-alimale-female"></i>
                    <span v-if="item.sex == 1">Male</span>
                    <span v-if="item.sex == 2">Female</span>
                  </view>
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

        <div class="xll-ads-container xll-ads-container-margin" v-if="jobsAdsListMid.length>0">
          <el-carousel height="180px" indicator-position="none" >
            <el-carousel-item class="xll-ads-swiper-item" v-for="(item,i) in jobsAdsListMid" :key="i">
              <div class="xll-ads-l">
                <el-image class="xll-ads-l-img"
                          :src="item.user_url !='' ? item.user_url : item.url">
                  <template #error>
                    <div class="image-ads-slot">
                      <el-icon :size="80" color="#808080"><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="xll-ads-r">
                <h4>Advertise with Us</h4>
                <h5>Description:</h5>
                <div class="xll-ads-r-desc">
                  Your Adverts and their description will be displayed here.
                  Just click on the banner
                </div>

              </div>
            </el-carousel-item>
          </el-carousel>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import ads22Img from '@/assets/ads/22.png'
import {useRouter,useRoute} from "vue-router";
import {
  ADS_LIST,
  JOB_LIST,
  USER_OBJECT_LIST,
  JOBS_AREA_LIST,
  ADD_FAVORITE,
  CANCEL_FAVORITE,
  USER_INFO_VISITOR_V2, SWITCH_IDENTITY_V2,
  JOBS_COUNTRY_LIST
} from "@/api/api";

import featuredJobs from "@/components/featuredJobs";
import latestIndustryNews from "@/components/latestIndustryNews";
import ExchangeAccountInfo from '@/components/jobs/exchangeInfo';
import {encode} from "js-base64";
import {randomString} from "@/utils";

export default {
  name: "list",
  data() {
    return {
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
      onlineValue:'',
      onlineOptions:[
        {
          label:'Online',
          value:1
        },
        {
          label:'Offline',
          value:0
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
      showLoadingStatus:true,
      versionTime:randomString(),
      jobsAdsListTop:[],
      jobsAdsListMid:[],

    }
  },
  components: {
    featuredJobs,
    latestIndustryNews,
    ExchangeAccountInfo
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
    // const getParams = () =>{
    //   console.log(route.params)
    // }
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
  created() {

    console.log(this.$route.query)

  },
  mounted() {

    this.getUserObjectList()
    this.getAdsList()


    let envName = process.env.VUE_APP_ENV_NAME
    if(envName === 'development' || envName === 'production'){
      this.getJobCountryList()
      let countryValue= this.$route.query.country;
      if(countryValue && countryValue !=''){
        this.locationValue = Number(countryValue)
      }
    }

    if(envName === 'developmentCN' || envName === 'productionCN' ){
      this.getJobsAreaList()
      let cityValue= this.$route.query.city;
      if(cityValue && cityValue !=''){
        this.locationValue = Number(cityValue)
      }
    }

    this.getJobList(this.jobPage, this.jobLimit)
  },
  methods: {
    turnBanner(link){
      console.log(link)
      if (link != '') {
        window.location.href =  link
      } else {
        let token = localStorage.getItem('token')
        if(!token){
          window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4','_blank')
          return;
        }
        this.$router.push('/me/ads/platform')
      }
    },
    getAdsList(){
      let ads_data = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(ads_data).then(res=>{
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

              if(jobsAdsListTop.length>0){
                this.jobsAdsListTop = jobsAdsListTop[0].data;
              }
              if(jobsAdsListMid.length>0){
                this.jobsAdsListMid = jobsAdsListMid[0].data;
              }

            }

      }).catch(err=>{
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })
    },
    addFavorite(id, type, title, url,index) {
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
          this.jobListData[index]['is_favorite'] = 1
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
    getJobCountryList(){
      let params = {}
      JOBS_COUNTRY_LIST(params).then(res=>{
        if(res.code == 200){
          this.locationOptions = res.message;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getJobsAreaList(){
      let params = {}
      JOBS_AREA_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.locationOptions = res.message;
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
    jobPageSizeChange(e) {
      console.log(e)
    },
    jobPageChange(e) {
      this.showLoadingStatus = true;
      this.jobPage = e
      this.getJobList(e, this.jobLimit)
      // console.log(e)
      document.documentElement.scrollTop = 120
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

      if(this.locationValue != ''){
        if(envName === 'development' || envName === 'production'){
          params.country = this.locationValue
        }
        if(envName === 'developmentCN' || envName === 'productionCN'){
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
          this.jobListData = res.message.data
          // console.log(res.message.data)
          this.jobTotalNum = res.message.total
          this.showLoadingStatus= false
        } else {
          console.log(res.msg)
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
    locationChange(e){
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
    cancelFavorite(type,typeId,index){
      let params = {
        token:localStorage.getItem('token'),
        type:type,
        type_id:typeId
      }
      CANCEL_FAVORITE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.jobListData[index]['is_favorite'] = 0
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
    postJob(){
      let token = localStorage.getItem('token')
      let self = this

      if(!token || token == ''){
        return this.$msgbox({
          title:'Post a Job',
          message:'Before posting a job, you need to log in',
          type:'warning',
          confirmButtonText:'Log in',
          callback(action){
            console.log(action)
            if(action==='confirm'){
              let redirectParamsObj = {
                path:'/jobs',
                query:{
                  id:self.$route.query.id
                }
              }

              let redirectParamsStr =encode(JSON.stringify(redirectParamsObj))

              self.$router.push({path:'/edupassport',query:{redirect_params:redirectParamsStr}})

            }
          }
        })
      }

      let identity = localStorage.getItem('identity')

      if(identity == 1){
        return this.$message.error('Oops! Your current identity is an educator, please switch to Education Business')
      }

      self.$router.push({path:'/jobs/post',query:{version_time:self.versionTime}})

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
            educatorContact =  res.message.user_contact.educator_contact;
            this.changeIdentity(educatorContact.id,1,2)
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
            this.changeIdentity(companyInfo.id,2,2)
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
            this.changeIdentity(companyInfo.id,3,2)
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

            this.changeIdentity(companyInfo.id,4,2)
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
            this.changeIdentity(companyInfo.id,5,2)
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
          this.$store.commit('allIdentityChanged',true )

          localStorage.setItem('company_id',companyId)
          localStorage.setItem('identity', identity)

          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData',str)

          this.$store.commit('identity', identity)
          this.$store.commit('menuData', res.message)

          this.$loading().close()
        }
      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })

    }


  }


}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.bg-container {
  /*width: 1100px;*/
  margin: 0 auto;
  padding-top: 40px;
}

.jobs-filter-container {
  background-color: #ffffff;
  /*border: 1px solid #eeeeee;*/
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
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
.jobs-filter-online{
  margin-top:10px;
}

.jobs-filter-work-exp {
  margin-top: 10px;
}
.xll-ads-container{
  padding: 0 20px;
}
.xll-ads-container-margin{
  margin-bottom: 20px;
}
.xll-ads-swiper-item{
  cursor:pointer;
  border-radius: 10px;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.xll-ads-l{
  width:60%;
  height: 100%;
}
.xll-ads-l-img{
  height: 100%;
  border-radius:10px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
}

.image-ads-slot{
  text-align: center;
  padding:50px 150px;
}

.xll-ads-r{
  width:36%;
}

.xll-ads-r{
  padding-right: 4%;
}
.xll-ads-r h4{
  color:#004956;
}

.xll-ads-r h5{
  margin-top:20px;
}

.xll-ads-r-desc{
  font-size: 14px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.jobs-list-container {
  padding: 20px;
}
.jobs-list-label-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}
.jobs-list-label {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.jobs-list-content {
  margin-top: 10px;
}

.jobs-list-item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.jobs-favorite{
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;

}

.xll-heart-icon{
  font-size: 24px;
}

.jobs-list-item-l {
  width: 30%;
  height: 180px;
}

.jobs-item-logo {
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: 1px solid #EEEEEE;
}

.image-slot{
  padding:40px;
  text-align: center;
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

.jobs-list-item-title a:hover {
  text-decoration: underline;
  font-size: 20px;
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
  overflow: hidden;
  display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 4;
}

.jobs-list-item-readmore {
  margin-top: 20px;
}
.jobs-list-item-readmore a{
  font-size: 14px;
  color: #808080;
  text-decoration: none;
}

.jobs-list-item-readmore a:hover{
  font-size: 16px;
  text-decoration: underline;
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
.jobs-list-item-work-type span{
  margin-left: 4px;
}

.jobs-list-item-gender {
  margin-left: 5px;
  font-size: 12px;
}
.jobs-list-item-gender span{
  margin-left: 4px;
}

.jobs-list-item-work-exp {
  margin-left: 5px;
  font-size: 12px;
}

.jobs-list-item-work-exp span{
  margin-left: 4px;
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
  margin: 20px;
  text-align: center;
}
@media screen and (max-width: 768px ){
  .jobs-filter-container{
    display:none;
  }
  .featured-jobs-container{
    display: none;
  }
  .articles-container{
    display:none;
  }

  .jobs-list-item{
    /*padding:4px;*/
  }

  .jobs-list-item-title a{
    font-size: 14px;
  }
  .jobs-list-item-name{
    margin-top: 4px;
    font-size:12px;
  }
  .jobs-list-item-desc{
    display:none;
  }
  .jobs-list-item-readmore{
    margin-top:4px;
    font-size:14px;
  }
  .jobs-list-item-address{
    margin-top:4px;
    font-size:12px;
  }
  .jobs-list-item-l{
    height: 100px;
  }
.image-slot{
  padding:10px;
}
}

@media screen  and (min-width: 1200px){
  .bg-container{
    width:1100px;
  }
}
</style>
