<template>
  <div class="bg">
    <div>
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

          <div class="deals-detail-share-container">
            <div class="deals-favorite" v-if="isFavoriteValue == 1"
                 @click="cancelFavorite(2,detailData.id)">
              <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
            </div>
            <div class="deals-favorite" v-else @click="addFavorite(detailData.id,2,detailData.title,detailData.userInfo.logo)">
              <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
            </div>
          </div>

          <!--          <div class="apply-btn-container">-->
<!--            <el-button class="apply-btn" type="info">Apply Now!</el-button>-->
<!--          </div>-->
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="company-bio-container">
            <div class="company-bio-label">Company Bio</div>
            <div class="company-bio-label-underline"></div>
            <div class="company-bio-content">
              <div class="company-logo-container">
                <el-image class="company-logo" v-if="detailData.userInfo"
                          :src="detailData.userInfo.logo"></el-image>
              </div>
              <div class="company-bio-text" v-if="detailData.userInfo">
                {{ detailData.userInfo.vendor_bio }}
              </div>
<!--              <div class="view-profile-btn-container">-->
<!--                <el-button class="view-profile-btn" type="primary" round>View Profile</el-button>-->
<!--              </div>-->
            </div>
          </div>

          <div class="contact-container" v-if="detailData.userInfo">
            <div class="contact-label">Contact Person</div>
            <div class="contact-content">
              <div class="contact-l">
                <el-image class="contact-profile-photo" :src="detailData.userInfo.profile_photo"></el-image>
              </div>
              <div class="contact-r">
                <div class="contact-r-t">
                  Hi I am {{ detailData.userInfo.first_name }} from {{ detailData.userInfo.vendor_name_en }}.
                </div>
                <div class="contact-r-b">
                  <el-button type="primary">Let's Chat!</el-button>
                </div>
              </div>
            </div>
          </div>

        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {COMPANY_JOB_LIST, DEALS_DETAIL,ADD_FAVORITE,IS_FAVORITE,CANCEL_FAVORITE} from "@/api/api";

export default {
  name: "detail",
  data() {
    return {
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      detailData: {},
      otherJobsData:[],
      isFavoriteValue:0
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
  /*height: 200px;*/
  min-height: 140px;
  font-size: 14px;
  word-wrap: break-word;
  /*overflow: hidden;*/
  /*word-break: break-all;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*display: -webkit-box;*/
  /*-webkit-box-orient: vertical;*/
  /*-webkit-box-orient: vertical;*/
  /*-webkit-line-clamp: 15;*/
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
  justify-content: center;
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

.deals-favorite{
  cursor: pointer;
}

.xll-heart-icon{
  font-size: 34px;
}


</style>
