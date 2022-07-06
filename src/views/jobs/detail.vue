<template>
  <div class="bg">
    <el-row class="detail-row" align="top" justify="start">
      <el-col class="detail-l-col" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="job-title">{{ detailData.job_title }}</div>
        <div class="job-address-salary">
          <div class="job-address">
            {{ detailData.address }}
          </div>
          <div class="job-salary">
            {{ detailData.currency }}{{ detailData.salary_min }} - {{ detailData.salary_max }}
          </div>
        </div>

        <div class="job-desc-container">
          <div class="job-desc-label">Job Description</div>
          <div class="job-desc-label-underline"></div>
          <div class="job-desc-content">
            {{ detailData.desc }}
          </div>
          <div class="job-tags">
            <div class="job-tag" v-if="detailData.employment_type==1">FullTime</div>
            <div class="job-tag" v-if="detailData.employment_type==2">PartTime</div>
            <div class="job-tag" v-if="detailData.employment_type==3">Seasonal</div>
            <div class="job-tag" v-if="detailData.is_equal == 1">Equal Opportunity</div>
            <div class="job-tag" v-if="detailData.is_online == 1">Online</div>
          </div>
        </div>

        <div class="job-details-container">
          <div class="job-details-label">Job Details</div>
          <div class="job-details-label-underline"></div>
          <div class="job-details-content">
            <div class="application-deadline"
                 v-if="detailData.apply_due_date && detailData.apply_due_date !='0000-00-00'">
              <b>Application: </b>
              <span>{{detailData.apply_due_date}}</span>
            </div>
            <div class="start-date" v-if="detailData.entry_date">
              <b>Start Date: </b>
              <span>{{detailData.entry_date}}</span>
            </div>
            <div class="number-vacancies" v-if="detailData.numbers">
              <b>Number of Vacancies: </b>
              <span>{{detailData.numbers}}</span>
            </div>
            <div class="class-size" v-if="detailData.class_size">
              <b>Class Size: </b>
              <span>{{detailData.class_size}} Students</span>
            </div>
            <div class="subjects" v-if="detailData.subject">
              <b>Subject(s):</b>
              <span v-for="(item,i) in detailData.subject" :key="i">{{item.object_en}}</span>
            </div>
            <div class="working-hours">

            </div>
            <div class="student-ages" v-if="detailData.age_to_teach">
              <b>Student Ages:</b>
              <span v-for="(item,i) in detailData.age_to_teach" :key="i">{{item.object_en}}</span>
            </div>

            <div class="job-location" v-if="detailData.job_location">
              <b>Job Location: </b>
              <span>{{detailData.job_location}}</span>
<!--              <span v-if="detailData.country">{{detailData.country.Pinyin}}</span>-->
<!--              <span v-if="detailData.foreign_provinces">, {{detailData.foreign_provinces.Pinyin}}</span>-->
<!--              <span v-if="detailData.foreign_citys">, {{detailData.foreign_citys.Pinyin}}</span>-->
<!--              <span v-if="detailData.foreign_districts">, {{detailData.foreign_districts.Pinyin}}</span>-->
<!--              <span v-if="detailData.provinces">, {{detailData.provinces.Pinyin}}</span>-->
<!--              <span v-if="detailData.citys">, {{detailData.citys.Pinyin}}</span>-->
<!--              <span v-if="detailData.districts">, {{detailData.districts.Pinyin}}</span>-->
            </div>
          </div>
        </div>

        <div class="compensation-container">
          <div class="compensation-label">Compensation</div>
          <div class="compensation-label-underline"></div>
          <div class="compensation-content">
            <div class="compensation-salary">
              <b>Salary: </b>
              <span> {{ detailData.currency }}{{ detailData.salary_min }} - {{ detailData.salary_max }}</span>

            </div>
            <div class="compensation-payment" v-if="detailData.payment_period_en">
              <b>Payment: </b>
              <span>{{ detailData.payment_period_en }}</span>
            </div>
            <div class="compensation-class-size" v-if="detailData.class_size">
              <b>Class Size: </b>
              <span>{{ detailData.class_size }}</span>
            </div>
            <div class="compensation-benefits" v-if="detailData.benefits">
              <b>Benefits:</b>
              <span v-for="(item,i) in detailData.benefits" :key="i">{{item.object_en}}</span>
            </div>
          </div>
        </div>

        <div class="qua-container">
          <div class="qua-label">Qualification Requirements</div>
          <div class="qua-label-underline"></div>
          <div class="qua-content">
            <div class="qua-teach-exp" v-if="detailData.teaching_times_en">
              <b>Teaching Experience: </b>
              <span>{{detailData.teaching_times_en}}</span>
            </div>
            <div class="qua-teach-exp" v-if="detailData.is_native" >
              <b>Native Speaker Requirement: </b>
              <span>Required</span>
            </div>
<!--            <div class="qua-age">-->
<!--              <b>Age: </b>-->
<!--              <span>{{ detailData.age_min }} - {{detailData.age_max}}</span>-->
<!--            </div>-->
            <div class="qua-education-req" v-if="detailData.education_en">
              <b>Minimum Education Requirements: </b>
              <span>{{detailData.education_en}}</span>
            </div>
          </div>
        </div>

        <div class="address-container">
          <div class="address-label">Address & Location</div>
          <div class="address-label-underline"></div>
          <div class="address-content">
            <div class="address-address">
              <b>Address:</b>
              <span>{{ detailData.address }}</span>
            </div>

            <div class="address-location">
              <b>Location: </b>
              <div class="map-container">
                <div id="mapContainer" class="basemap"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="apply-btn-container">
          <el-button class="apply-btn" type="primary" round @click="applyJobs(detailData.id)">Apply Now!</el-button>
        </div>

      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="job-xll-r-container">

        <div class="job-detail-share-container">
          <div class="jobs-favorite" v-if="isFavoriteValue == 1"
               @click="cancelFavorite(1,detailData.id)">
            <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
          </div>
          <div class="jobs-favorite" v-else @click="addFavorite(detailData.id,1,detailData.job_title,detailData.logo)">
            <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
          </div>

          <div class="social-share-container">

            <div class="social-share-icon-container"
                 @click="showSocialShareExpandStatus = !showSocialShareExpandStatus"
                 @mouseover="showSocialShareExpandStatus=true">
              <el-icon :size="24">
                <Share/>
              </el-icon>
            </div>

            <div class="social-share-icon-expand" v-if="showSocialShareExpandStatus"
                 @mouseleave="showSocialShareExpandStatus = false"
            >
              <ShareNetwork
                  network="Twitter"
                  :url="locationUrl"
                  :title="detailData.job_title == undefined ? '' : detailData.job_title"
              >
                <i class="iconfont el-icon-alitwitter xll-icon"></i>
              </ShareNetwork>
              <ShareNetwork
                  network="LinkedIn"
                  :url="locationUrl"
                  :title="detailData.job_title == undefined ? '' : detailData.job_title"
              >
                <i class="iconfont el-icon-alilinkedin xll-icon"></i>
              </ShareNetwork>
              <ShareNetwork
                  network="Facebook"
                  :url="locationUrl"
                  :title="detailData.job_title == undefined ? '' : detailData.job_title"
                  :description="detailData.desc == undefined ? '' : detailData.desc"
                  :quote="detailData.job_title == undefined ? '' : detailData.job_title"
              >
                <i class="iconfont el-icon-alifacebook xll-icon"></i>
              </ShareNetwork>
            </div>

          </div>
        </div>

        <div class="company-bio-container">
          <div class="company-bio-label">Company Bio</div>
          <div class="company-bio-label-underline"></div>
          <div class="company-bio-content">
            <div class="company-logo-container">
              <el-image class="company-logo" v-if="detailData.business"
                        :src="detailData.business.logo"></el-image>
            </div>
            <div class="company-bio-text" v-if="detailData.business">
              {{ detailData.business.business_bio }}
            </div>
            <div class="view-profile-btn-container">
              <el-button class="view-profile-btn" type="primary" round
                         @click="viewCompanyProfile(detailData.business.user_id)">
                View Profile
              </el-button>
            </div>
          </div>
        </div>

        <div class="contact-container" v-if="detailData.business">
          <div class="contact-label">Contact Person</div>
          <div class="contact-content">
            <div class="contact-l">
              <el-image class="contact-profile-photo" :src="detailData.business.profile_photo"></el-image>
            </div>
            <div class="contact-r">
              <div class="contact-r-t">
                Hi I am {{ detailData.business.first_name }} from {{ detailData.business.business_name }}.
              </div>
              <div class="contact-r-b">
                <el-button type="primary" @click="chat(detailData.user_id)">Let's Chat!</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="other-jobs-container">
          <div class="other-jobs-label">
            Other Jobs by
            <span v-if="detailData.business">{{ detailData.business.business_name }}</span>
          </div>
          <div class="other-jobs-content">
            <div class="other-jobs-item" v-for="(item,index) in otherJobsData" :key="index">
              <div class="other-jobs-l">
                <el-image class="other-jobs-logo" v-if="detailData.business" :src="detailData.business.logo"></el-image>
              </div>
              <div class="other-jobs-r">
                <div class="other-jobs-r-t">
                  <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}">{{ item.job_title }}</router-link>
                </div>
                <div class="other-jobs-r-b">
                  {{item.refresh_time}}
                </div>
              </div>
            </div>
          </div>
        </div>

        <latestIndustryNews></latestIndustryNews>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {COMPANY_JOB_LIST, JOB_DETAIL,APPLY_JOBS,ADD_FAVORITE,IS_FAVORITE,
  CANCEL_FAVORITE,ADD_TO_CHAT,GET_BASIC_INFO,CHANGE_IDENTITY_LANGUAGE} from "@/api/api";
import latestIndustryNews from "@/components/latestIndustryNews";
import {useStore} from 'vuex'
import {randomString} from "@/utils";
import {encode } from "js-base64";

export default {
  name: "detail",
  setup(){
    const store = useStore()

    const setNowChatUserInfo = (data) => store.commit('nowChatUserInfo',data)
    const setShowChatStatus = () => store.commit('showChatStatus', true)
    const locationUrl  = window.location.href;
    return {
      setNowChatUserInfo,
      setShowChatStatus,
      locationUrl
    }

  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      detailData: {},
      otherJobsData:[],
      isFavoriteValue:0,
      versionTime:randomString(),
      showSocialShareExpandStatus:false
    }
  },
  components:{
    latestIndustryNews
  },
  mounted() {
    let jobId = this.$route.query.id;
    this.getJobDetail(jobId)
    let token = localStorage.getItem('token')
    if(token && token !=''){
      this.isFavorite(1,jobId)
    }

  },
  methods: {
    viewCompanyProfile(id){
      this.$router.push({path:'/info/company',query:{id:id,identity:2}})
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
    getJobDetail(id) {
      let params = {
        job_id: id
      }
      JOB_DETAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.detailData = res.message
          this.initMap(res.message.lng,res.message.lat)
          let userId = res.message.user_id
          this.getCompanyJobList(userId)
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    isFavorite(type,typeId){
      let params = {
        token:localStorage.getItem('token'),
        type:type,
        type_id:typeId
      }
      IS_FAVORITE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.isFavoriteValue = res.data;
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getCompanyJobList(userId){
      let params = {
        user_id: userId,
        is_open: 1,
        status:1,
        page: 1,
        limit: 5
      }

      COMPANY_JOB_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.otherJobsData = res.message.data
        }

      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    applyJobs(id) {

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
          }
        }).catch(err=>{
          console.log(err)
          if(err.code === 400){
            this.$message.error('Please complete your profile in order to apply')
          }else{
            this.$message.error(err.msg)
          }

        })

      } else {
        this.$message.warning('Please switch to an educator profile to be able to apply')
      }


    },
    addFavorite(id, type, title, url) {
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
        this.$message.error(err.msg)
      })

    },
    cancelFavorite(type,typeId){
      let params = {
        token:localStorage.getItem('token'),
        type:type,
        type_id:typeId
      }
      CANCEL_FAVORITE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.isFavoriteValue = 0
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    chat(userId){
      console.log(userId)
      let token = localStorage.getItem('token')
      if(!token || token === ''){
        return this.$router.push('/edupassport')
      }
      let businessInfo = this.detailData.business;

      let type = this.GoEasy.IM_SCENE.PRIVATE;
      let name = businessInfo.first_name+' '+ businessInfo.last_name;
      let avatar = businessInfo.profile_photo ? businessInfo.profile_photo : 'https://oss.esl-passport.cn/educator.png';

      let nowUserInfo = {
        uuid:userId,
        name:name,
        avatar:avatar,
        identity:2
      }

      let textMessage = this.goEasy.im.createTextMessage({
        text: 'Hello',
        to: {
          id: userId,
          type: type,
          data: {
            name: name,
            avatar: avatar,
            identity:2
          }
        }
      });

      let localHistory;
      if (type === this.GoEasy.IM_SCENE.PRIVATE) {
        localHistory = this.service.getPrivateMessages(userId);
      } else {
        localHistory = this.service.getGroupMessages(userId);
      }
      // console.log(localHistory)
      localHistory.push(textMessage)

      this.goEasy.im.sendMessage({
        message: textMessage,
        onSuccess: function (message) {
          console.log("发送成功.", message);
        },
        onFailed: function (error) {
          console.log("发送失败:", error);
        }
      });

      this.setShowChatStatus()
      this.setNowChatUserInfo(nowUserInfo)

    },
    addUserToChat(userId,toIdentity,identity){
      let params = {
        identity:identity,
        to_identity:toIdentity,
        to_user_id: userId
      }

      ADD_TO_CHAT(params).then(res=>{
        if(res.code === 200){
          console.log('add Chat successfuly')
        }
      }).catch(err=>{
        console.log(err)
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
                path:'/jobs/detail',
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

      if(identity != 2){
          this.selectRole(2)
      }

      self.$router.push({path:'/jobs/post',query:{version_time:self.versionTime}})

    },
    selectRole(e) {
      let uid = localStorage.getItem('uid')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        let isEducator = res.message.is_educator;
        let isBusiness = res.message.is_business;
        let isVendor = res.message.is_vendor;
        // let isOther = res.message.is_other;
        // let identity = res.message.identity;

        if (e == 1) {
          if (isEducator >= 10) {
            let firstName = res.message.educator_info.first_name;
            let lastName = res.message.educator_info.last_name;
            let avatar = res.message.educator_info.profile_photo;

            localStorage.setItem('name', firstName + ' ' + lastName)
            localStorage.setItem('avatar', avatar)
            localStorage.setItem('first_name', firstName)
            localStorage.setItem('last_name', lastName)

            this.$store.commit('username', firstName + ' ' + lastName)
            this.$store.commit('userAvatar', avatar)

            this.changeIdentity(1)
          } else {
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            // this.$router.push('/role/educator')
          }

        }
        if (e == 2) {
          if (isBusiness >= 10) {
            let firstName = res.message.business_info.first_name;
            let lastName = res.message.business_info.last_name;
            let avatar = res.message.business_info.logo;
            localStorage.setItem('name', firstName + ' ' + lastName)
            localStorage.setItem('avatar', avatar)
            localStorage.setItem('first_name', firstName)
            localStorage.setItem('last_name', lastName)

            this.$store.commit('username', firstName + ' ' + lastName)
            this.$store.commit('userAvatar', avatar)

            this.changeIdentity(2)
          } else {
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            // this.$router.push('/role/business')
          }

        }
        if (e == 3) {
          if (isVendor >= 10) {
            let firstName = res.message.vendor_info.first_name;
            let lastName = res.message.vendor_info.last_name;
            let avatar = res.message.vendor_info.logo;

            localStorage.setItem('name', firstName + ' ' + lastName)
            localStorage.setItem('avatar', avatar)
            localStorage.setItem('first_name', firstName)
            localStorage.setItem('last_name', lastName)

            this.$store.commit('username', firstName + ' ' + lastName)
            this.$store.commit('userAvatar', avatar)

            this.changeIdentity(3)
          } else {
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            // this.$router.push('/role/vendor')
          }

        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    changeIdentity(identity) {
      let params = {
        token: localStorage.getItem('token'),
        identity: identity
      }

      CHANGE_IDENTITY_LANGUAGE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          localStorage.setItem('identity', identity)
          this.$store.commit('identity',identity)
        }
      }).catch(err => {
        console.log(err)
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

.detail-row {
  width: 1100px;
  margin: 0 auto;
  text-align: left;
  padding: 20px 0;
}

.detail-l-col {
  padding: 20px;
}

.job-title {
  font-size: 24px;
  color: #ff2870;
  font-weight: bold;
  padding-left: 20px;
}

.job-address-salary {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
}

.job-address {
  color: #808080;
  font-size: 14px;
  padding-left: 20px;
  padding-top: 10px;
}

.job-salary {
  font-size: 14px;
  color: #ff2870;
}

.job-desc-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
}

.job-desc-label {
  font-weight: bold;
  font-size: 18px;
}

.job-desc-label-underline {
  width: 40px;
  margin-top: 4px;
  border-bottom: 2px solid #ff2870;
}

.job-desc-content {
  padding: 10px 0;
  font-size: 14px;
}

.job-tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.job-tag {
  font-size: 14px;
  background-color: #ff2870;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 4px;
}

.job-tag:not(:first-child) {
  margin: 10px;
}

.job-details-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
}

.job-details-label {
  font-weight: bold;
  font-size: 18px;
}

.job-details-label-underline {
  width: 40px;
  margin-top: 4px;
  border-bottom: 2px solid #ff2870;
}

.job-details-content {
  font-size: 14px;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.application-deadline {
  padding: 10px 0;
}

.application-deadline b {
  font-size: 14px;
}

.application-deadline span {
  color: #ff2870;
  font-size: 14px;
}

.job-location {
  padding: 10px 0;
}

.job-location b {
  font-size: 14px;
}

.job-location span {
  color: #ff2870;
  font-size: 14px;
  //margin-left: 10px;
}

.start-date {
  padding: 10px 0;
}

.start-date b {
  font-size: 14px;
}

.start-date span {
  color: #ff2870;
  font-size: 14px;
}

.number-vacancies {
  padding: 10px 0;
}

.number-vacancies b {
  font-size: 14px;
}

.number-vacancies span {
  color: #ff2870;
  font-size: 14px;
}

.class-size {
  padding: 10px 0;
}

.class-size b {
  font-size: 14px;
}

.class-size span {
  color: #ff2870;
  font-size: 14px;
}

.subjects {
  padding: 10px 0;
}

.subjects b {
  font-size: 14px;
}

.subjects span {
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}

.student-ages {
  padding: 10px 0;
}

.student-ages b {
  font-size: 14px;
}

.student-ages span {
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}

.compensation-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
}

.compensation-label {
  font-weight: bold;
  font-size: 18px;
}

.compensation-label-underline {
  width: 40px;
  margin-top: 4px;
  border-bottom: 2px solid #ff2870;
}

.compensation-content {
  font-size: 14px;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.compensation-salary {
  padding: 10px 0;
}

.compensation-salary b {
  font-size: 14px;
}

.compensation-salary span {
  color: #ff2870;
  font-size: 14px;
}

.compensation-payment {
  padding: 10px 0;
}

.compensation-payment b {
  font-size: 14px;
}

.compensation-payment span {
  color: #ff2870;
  font-size: 14px;
}

.compensation-class-size {
  padding: 10px 0;
}

.compensation-class-size b {
  font-size: 14px;
}

.compensation-class-size span {
  color: #ff2870;
  font-size: 14px;
}

.compensation-benefits {
  padding: 10px 0;
}

.compensation-benefits b {
  font-size: 14px;
}

.compensation-benefits span {
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}

.qua-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
}

.qua-label {
  font-weight: bold;
  font-size: 18px;
}

.qua-label-underline {
  width: 40px;
  margin-top: 4px;
  border-bottom: 2px solid #ff2870;
}

.qua-content {
  font-size: 14px;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.qua-teach-exp {
  padding: 10px 0;
}

.qua-teach-exp b {
  font-size: 14px;
}

.qua-teach-exp span {
  color: #ff2870;
  font-size: 14px;
}

.qua-age {
  padding: 10px 0;
}

.qua-age b {
  font-size: 14px;
}

.qua-age span {
  color: #ff2870;
  font-size: 14px;
}

.qua-education-req {
  padding: 10px 0;
}

.qua-education-req b {
  font-size: 14px;
}

.qua-education-req span {
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}

.address-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
}

.address-label {
  font-weight: bold;
  font-size: 18px;
}

.address-label-underline {
  width: 40px;
  margin-top: 4px;
  border-bottom: 2px solid #ff2870;
}

.address-content {
  font-size: 14px;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.address-address {
  padding: 10px 0;
}

.address-address b {
  font-size: 14px;
}

.address-address span {
  color: #ff2870;
  font-size: 14px;
}

.address-location {
  width: 100%;
}

.apply-btn-container {
  padding: 20px;
  margin-top: 20px;
}

.apply-btn {
  width: 100%;
  font-size: 14px;
}

.job-xll-r-container{
  padding-top:20px;
}
.job-detail-share-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #FFFFFF;
  padding:10px 20px;
  border-radius: 10px;
}

.jobs-favorite{
  cursor: pointer;
}

.xll-heart-icon{
  font-size: 34px;
}

.post-a-job{
  width: 100%;
  text-align: center;
  padding-top: 20px;
}
.post-a-job-btn{
  width: 90%;
  font-size: 14px;
}

.company-bio-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
  min-height: 200px;
}

.company-bio-label {
  font-weight: bold;
  font-size: 18px;
}

.company-bio-label-underline {
  width: 100%;
  margin-top: 4px;
  border-bottom: 2px solid #ff2870;
}

.company-bio-content{
  padding-top:10px;
}

.company-logo-container {
  float: left;
  padding: 10px;
}

.company-logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #EEEEEE;
}

.company-bio-text {
  min-height: 140px;
  font-size: 14px;
  word-wrap: break-word;
}

.view-profile-btn-container {
  padding: 10px 0;
  text-align: right;
}

.view-profile-btn {
  font-size: 14px;
  margin-top: 10px;
}

.contact-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
}

.contact-label {
  font-weight: bold;
  font-size: 18px;
}

.contact-content {
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.contact-l {
  padding: 10px;
}

.contact-profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.contact-r{
  padding: 10px;
}
.contact-r-t {
  font-size: 14px;
  font-weight: bold;
}

.contact-r-b {
  font-size: 14px;
  margin-top: 20px;
}
.other-jobs-container{
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
}

.other-jobs-label{
  font-weight: bold;
  font-size: 18px;
}

.other-jobs-content{
  padding: 10px 0;

}
.other-jobs-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eeeeee;
}
.other-jobs-l{
  padding: 10px;
}

.other-jobs-logo{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.other-jobs-r{
  padding: 10px;
}
.other-jobs-r-t a{
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
}
.other-jobs-r-t a:hover{
  text-decoration: underline;
}
.other-jobs-r-b{
  font-size: 14px;
  margin-top: 20px;
}

.map-container{
  height: 300px;
}
.basemap{
  width: 100%;
  height: 100%;
}

.social-share-container {
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
}

.social-share-icon-container {
  width: 30px;
  height: 30px;
  border: 2px solid #1E7AA2;
  background-color: #FFFFFF;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.social-share-icon-expand {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.social-share-icon-expand >>> a {
  margin-left: -6px;
  background-color: #FFFFFF;
  width: 30px;
  height: 30px;
  border: 2px solid #000000;
  display: flex;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.xll-icon {
  font-size: 24px;
}
</style>
