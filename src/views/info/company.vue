<template>
  <div class="bg">
    <el-row class="detail-row" align="top" justify="start">

      <el-col class="detail-l-col" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="back-container">
          <el-button type="info" class="back-btn" @click="turnBack()" >
            <el-icon :size="18">
              <Back></Back>
            </el-icon>
            Back
          </el-button>
        </div>
        <div class="business-info-container">
          <div class="business-info-t">
            <div class="business-info-label">
              <div class="business-info-label-text">Business Information</div>
              <div class="profile-underline-2"></div>
            </div>
          </div>

          <div class="business-info-content">
            <div class="business-info-logo-name-container">
              <div class="business-info-logo">
                <el-image v-if="logoPhotoUrl" :src="logoPhotoUrl" class="logo-avatar"></el-image>
              </div>
              <template v-if="identityR == 2">
                <div class="business-info-name" v-if="userInfo.business_name">
                  {{ userInfo.business_name }}
                </div>
              </template>
              <template v-if="identityR == 3">
                <div class="business-info-name" v-if="userInfo.vendor_name_en">
                  {{ userInfo.vendor_name_en }}
                </div>
              </template>
            </div>

            <template v-if="identityR == 2">
              <div class="business-info-item" v-if="userInfo.business_phone">
                Contact #: <span>{{ userInfo.business_phone }}</span>
              </div>
              <div class="business-info-item" v-if="userInfo.business_bio">
                Business Introduction #: <span>{{ userInfo.business_bio }}</span>
              </div>
              <div class="business-info-item" v-if="userInfo.year_founded ">
                Founded In: <span>{{ userInfo.year_founded }}</span>
              </div>
            </template>

            <template v-if="identityR == 3">
              <div class="business-info-item" v-if="userInfo.phone">
                Contact #: <span>{{ userInfo.phone }}</span>
              </div>
              <div class="business-info-item" v-if="userInfo.vendor_bio">
                Business Introduction #: <span>{{ userInfo.vendor_bio }}</span>
              </div>
            </template>

            <div class="business-info-item"
                 v-if="userInfo.provinces && userInfo.citys && userInfo.districts"
            >
              Business Location:
              <span>{{ userInfo.provinces.Pinyin }}, {{ userInfo.citys.Pinyin }}, {{ userInfo.districts.Pinyin }}</span>
            </div>
            <div class="map-container" v-if="userInfo.lat && userInfo.lng">
              <div id="mapContainer" class="basemap"></div>
            </div>

          </div>

          <div class="detail-swiper-container" v-if="userInfo.user_images && userInfo.user_images.length>0">
            <el-carousel height="350px">
              <el-carousel-item class="detail-swiper-item" v-for="(item,i) in userInfo.user_images" :key="i">
                <el-image class="detail-swiper-banner-image" :src="item.url" fit="cover"></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>

        </div>

      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="job-xll-r-container">

        <div class="company-bio-container">
          <div class="company-bio-label">Company Bio</div>
          <div class="company-bio-label-underline"></div>
          <div class="company-bio-content">
            <div class="company-logo-container">
              <el-image class="company-logo" v-if="logoPhotoUrl"
                        :src="logoPhotoUrl"></el-image>
            </div>
            <template v-if="identityR == 2">
              <div class="company-bio-text" v-if="userInfo.business_bio">
                {{ userInfo.business_bio }}
              </div>
            </template>
            <template v-if="identityR == 3">
              <div class="company-bio-text" v-if="userInfo.vendor_bio">
                {{ userInfo.vendor_bio }}
              </div>
            </template>
            <!--            <div class="view-profile-btn-container">-->
            <!--              <el-button class="view-profile-btn" type="primary" round>View Profile</el-button>-->
            <!--            </div>-->
          </div>
        </div>

        <div class="contact-container" v-if="userInfo">
          <div class="contact-label">Contact Person</div>
          <div class="contact-content">
            <div class="contact-l">
              <el-image class="contact-profile-photo" :src="userInfo.profile_photo"></el-image>
            </div>
            <div class="contact-r">
              <div class="contact-r-t">
                Hi I am {{ userInfo.first_name }} from {{ userInfo.business_name }}.
              </div>
              <div class="contact-r-b">
                <el-button type="primary" @click="chat(userInfo.user_id)">Let's Chat!</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="other-jobs-container" v-if="identityR == 2">
          <div class="other-jobs-label">
            Other Jobs by
            <span v-if="userInfo">{{ userInfo.business_name }}</span>
          </div>
          <div class="other-jobs-content">
            <div class="other-jobs-item" v-for="(item,index) in otherJobsData" :key="index">
              <div class="other-jobs-l">
                <el-image class="other-jobs-logo" v-if="userInfo" :src="userInfo.logo"></el-image>
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
import {
  COMPANY_JOB_LIST, ADD_TO_CHAT, USER_INFO_VISITOR_V2
} from "@/api/api";
import latestIndustryNews from "@/components/latestIndustryNews";
import {useStore} from 'vuex'
import {useRoute} from "vue-router";
import {randomString} from "@/utils";

export default {
  name: "company",
  setup(){
    const store = useStore()
    const Route = useRoute()
    const identityR = Route.query.identity

    const setNowChatUserInfo = (data) => store.commit('nowChatUserInfo',data)
    const setShowChatStatus = () => store.commit('showChatStatus', true)
    const locationUrl  = window.location.href;
    return {
      setNowChatUserInfo,
      setShowChatStatus,
      locationUrl,
      identityR
    }

  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      userInfo: {},
      logoPhotoUrl:'',
      backgroundUrl:'',
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
    let userId = this.$route.query.id;
    let identity = this.$route.query.identity;

    this.getVisitorBasicInfo(userId,identity)

  },
  methods: {
    turnBack(){
      this.$router.go(-1)
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
    getVisitorBasicInfo(uid,identity) {

      let params = {
        user_id: uid,
        identity: identity
      }
      USER_INFO_VISITOR_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          // let userContact = res.message.user_contact;
          // let companyContact = res.message.user_contact.company_contact;
          let recruiterInfo = res.message.user_contact.company;

          if (recruiterInfo.company_name) {
            this.basicForm.company_name = recruiterInfo.company_name;
          }
          if (recruiterInfo.desc) {
            this.basicForm.desc = recruiterInfo.desc;
          }
          if (recruiterInfo.work_phone) {
            this.basicForm.work_phone = recruiterInfo.work_phone;
          }
          if (recruiterInfo.work_email) {
            this.basicForm.work_email = recruiterInfo.work_email;
          }
          if (recruiterInfo.lat) {
            this.basicForm.lat = recruiterInfo.lat;
          }
          if (recruiterInfo.lng) {
            this.basicForm.lng = recruiterInfo.lng;
          }
          if (recruiterInfo.address) {
            this.basicForm.address = recruiterInfo.address;
          }
          if (recruiterInfo.country_code) {
            this.basicForm.country_code = recruiterInfo.country_code;
          }
          if (recruiterInfo.video_url) {
            this.introVideoUrl = recruiterInfo.video_url;
            this.basicForm.video_url = recruiterInfo.video_url;
          }
          if (recruiterInfo.logo) {
            this.logoPhotoUrl = recruiterInfo.logo;
            this.basicForm.logo = recruiterInfo.logo;
          }
          if (recruiterInfo.license) {
            this.licensePhotoUrl = recruiterInfo.license;
            this.basicForm.license = recruiterInfo.license;
          }
          if (recruiterInfo.year_founded) {
            this.basicForm.year_founded = recruiterInfo.year_founded.toString();
          }

          if(recruiterInfo.country_info){
            this.basicForm.country_info = recruiterInfo.country_info;
          }

          if(recruiterInfo.country){
            this.basicForm.country = recruiterInfo.country;
          }
          if(recruiterInfo.province){
            this.basicForm.province = recruiterInfo.province;
          }
          if(recruiterInfo.city){
            this.basicForm.city = recruiterInfo.city;
          }
          if(recruiterInfo.district){
            this.basicForm.district = recruiterInfo.district;
          }

          let typeId = recruiterInfo.category_id;
          let typeNameEn = recruiterInfo.category_name_en;
          let typeName = recruiterInfo.category_name_cn

          let typeObj = {
            id:typeId,
            identity_name:typeNameEn,
            identity_name_cn:typeName
          }

          this.selectBusinessTypeList.push(typeObj)

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
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    chat(userId){
      console.log(userId)
      let token = localStorage.getItem('token')
      if(!token || token === ''){
        return this.$router.push('/edupassport')
      }
      let userInfo = this.userInfo;

      let type = this.GoEasy.IM_SCENE.PRIVATE;
      let name = userInfo.first_name+' '+ userInfo.last_name;
      let avatar = userInfo.profile_photo ? userInfo.profile_photo : 'https://oss.esl-passport.cn/educator.png';

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
  background-color: #f5f6f7;
}

.detail-row {
  width: 1100px;
  margin: 0 auto;
  text-align: left;
  padding: 20px 0;
}

.detail-l-col {
  padding:0 20px 20px 20px;
}

/deep/ .back-btn span{
  display: flex;
  align-items: center;
}

.business-info-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.business-info-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.business-info-label {
  font-size: 16px;
  font-weight: bold;
}

.profile-underline-2 {
  width: 60px;
  margin-top: 8px;
  border-bottom: 2px solid #00b3d2;
}

.logo-avatar {
  width: 178px;
  height: 178px;
  border-radius: 50%;
}

.business-info-content {
  padding: 10px 0;
}

.business-info-logo-name-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.business-info-logo {
  padding: 10px;
}

.business-info-name {
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
}

.business-info-item {
  margin: 10px;
  color: #00b3d2;
  font-size: 14px;
}

.business-info-item span {
  color: #000000;
}

.business-info-background-banner-container {
  margin: 10px;
}

.business-info-background-banner-label {
  font-size: 14px;
  font-weight: bold;
}

.business-info-background-banner {
  margin-top: 10px;
}
.background-avatar{
  border-radius:10px;
}

.job-xll-r-container{
  padding-top:40px;
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

.map-container{
  margin-top: 10px;
  width: 100%;
  height: 300px;
  text-align: center;
}

.basemap{
  width: 100%;
  height: 100%;

}
.detail-swiper-container {
  margin-top: 20px;
}

.detail-swiper-item {
  border-radius: 20px;
  width:100%;
}

.detail-swiper-banner-image {
  width:100%;
  border-radius: 20px;
}

</style>
