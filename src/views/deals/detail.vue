<template>
  <div class="bg">
    <el-row class="detail-row" align="top" justify="start">
      <el-col class="detail-l-col" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="job-title">{{ detailData.title }}</div>
        <div class="job-address-salary">
          <div class="job-address">
            {{ detailData.location }}
          </div>
        </div>

        <div class="job-desc-container">
          <div class="job-desc-label">Deal Description</div>
          <div class="job-desc-label-underline"></div>
          <div class="job-desc-content">
            {{ detailData.desc }}
          </div>
          <div class="job-tags" v-if="detailData.tags">
            <div class="job-tag" v-for="(item,i) in detailData.tags" :key="i">{{item.tag_name_en}}</div>
          </div>

        </div>

        <div class="address-container">
          <div class="address-label">Address & Location</div>
          <div class="address-label-underline"></div>
          <div class="address-content">
            <div class="address-address">
              <b>Address:</b>
              <span>{{ detailData.location }}</span>
            </div>

            <div class="address-location">
              <b>Location: </b>
              <div class="map-container">
                <div id="mapContainer" class="basemap"></div>
              </div>
            </div>
          </div>

        </div>


        <!--          <div class="apply-btn-container">-->
        <!--            <el-button class="apply-btn" type="info">Apply Now!</el-button>-->
        <!--          </div>-->
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="xll-deals-r-container">

        <div class="deals-detail-share-container">
          <div class="deals-favorite" v-if="isFavoriteValue == 1"
               @click="cancelFavorite(2,detailData.id)">
            <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
          </div>
          <div class="deals-favorite" v-else @click="addFavorite(detailData.id,2,detailData.title,detailData.company_logo)">
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
                  :title="detailData.title == undefined ? '' : detailData.title"
              >
                <i class="iconfont el-icon-alitwitter xll-icon"></i>
              </ShareNetwork>
              <ShareNetwork
                  network="LinkedIn"
                  :url="locationUrl"
                  :title="detailData.title == undefined ? '' : detailData.title"
              >
                <i class="iconfont el-icon-alilinkedin xll-icon"></i>
              </ShareNetwork>
              <ShareNetwork
                  network="Facebook"
                  :url="locationUrl"
                  :title="detailData.title == undefined ? '' : detailData.title"
                  :description="detailData.desc == undefined ? '' : detailData.desc"
                  :quote="detailData.title == undefined ? '' : detailData.title"
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
              <el-image class="company-logo" v-if="detailData.company"
                        :src="detailData.company.logo"></el-image>
            </div>
            <div class="company-bio-text" v-if="detailData.company">
              {{ detailData.company.desc }}
            </div>
            <div class="view-profile-btn-container">
              <el-button class="view-profile-btn" type="primary" round
                         @click="viewCompanyProfile(detailData.user_id)">
                View Profile
              </el-button>
            </div>
          </div>
        </div>

        <div class="contact-container" v-if="detailData.user_contact">
          <div class="contact-label">Contact Person</div>
          <div class="contact-content">
            <div class="contact-l">
              <el-image class="contact-profile-photo" :src="detailData.user_contact.headimgurl"></el-image>
            </div>
            <div class="contact-r">
              <div class="contact-r-t">
                Hi I am {{ detailData.user_contact.first_name }} from {{ detailData.company.company_name }}.
              </div>
              <div class="contact-r-b">
                <el-button type="primary" @click="chat(detailData.user_id)">Let's Chat!</el-button>
              </div>
            </div>
          </div>
        </div>

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
  COMPANY_JOB_LIST, DEALS_DETAIL, ADD_FAVORITE, IS_FAVORITE, CANCEL_FAVORITE, ADD_TO_CHAT,
  USER_INFO_VISITOR_V2, SWITCH_IDENTITY_V2
} from "@/api/api";
import {useStore} from "vuex";
import {encode} from "js-base64";

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
      showSocialShareExpandStatus:false
    }
  },
  components:{

  },
  mounted() {
    let dealId = this.$route.query.id;
    this.getDealDetail(dealId)
    let token = localStorage.getItem('token')
    if(token && token != ''){
      this.isFavorite(2,dealId)
    }

  },
  methods: {
    viewCompanyProfile(id){
      this.$router.push({path:'/info/company',query:{id:id,identity:3}})
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
    getDealDetail(id) {
      let params = {
        deal_id: id,
        token:localStorage.getItem('token')
      }
      DEALS_DETAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.detailData = res.message

          this.initMap(res.message.lng,res.message.lat)

          let userId = res.message.user_id
          this.getCompanyJobList(userId)
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
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
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
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
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

      let vendorInfo = this.detailData.userInfo;

      let type = this.GoEasy.IM_SCENE.PRIVATE;
      let name = vendorInfo.first_name+' '+ vendorInfo.last_name;
      let avatar = vendorInfo.profile_photo ? vendorInfo.profile_photo : 'https://oss.esl-passport.cn/educator.png';

      let nowUserInfo = {
        uuid:userId,
        name:name,
        avatar:avatar,
        identity:3
      }

      let textMessage = this.goEasy.im.createTextMessage({
        text: 'Hello',
        to: {
          id: userId,
          type: type,
          data: {
            name: name,
            avatar: avatar,
            identity:3
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

    },
    offerDeal(){
      let token = localStorage.getItem('token')
      let self = this
      if(!token || token == ''){
        return this.$msgbox({
          title:'Offer a Deal',
          message:'Before offer a deal, you need to log in',
          type:'warning',
          confirmButtonText:'Log in',
          callback(action){
            console.log(action)
            if(action==='confirm'){
              let redirectParamsObj = {
                path:'/deals/detail',
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

      if(identity != 3){
        this.selectRole(3)
      }

      self.$router.push({path:'/deals/offer',query:{}})
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
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 4}})

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

    },

  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.detail-row {
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
  padding-left: 20px;
  font-weight: bold;
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
  background-color: #b1c452;
  color: #ffffff;
}

.offer-deal{
  width: 100%;
  text-align: center;
  padding-top: 20px;
}

.offer-deal-btn{
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
  text-align:right;
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
.other-jobs-r-t{
  font-size: 14px;
  font-weight: bold;
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

.deals-detail-share-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #FFFFFF;
  padding:10px 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.deals-favorite{
  cursor: pointer;
}

.xll-heart-icon{
  font-size: 34px;
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

@media screen and (min-width: 1200px){

  .detail-row {
    width: 1100px;
  }

}

@media screen  and (max-width: 768px ){
  .xll-deals-r-container{
    padding:20px;
  }




}

</style>
