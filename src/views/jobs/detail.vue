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
            <div class="application-deadline">
              <b>Application: </b>
              <span>{{detailData.apply_due_date}}</span>
            </div>
            <div class="start-date">
              <b>Start Date: </b>
              <span>{{detailData.entry_date}}</span>
            </div>
            <div class="number-vacancies">
              <b>Number of Vacancies: </b>
              <span>{{detailData.numbers}}</span>
            </div>
            <div class="class-size">
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
              <b>Student Ages</b>
              <span v-for="(item,i) in detailData.age_to_teach" :key="i">{{item.object_en}}</span>
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
            <div class="compensation-payment">
              <b>Payment: </b>
              <span>{{ detailData.payment_period_en }}</span>
            </div>
            <div class="compensation-class-size">
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
            <div class="qua-teach-exp">
              <b>Teaching Experience: </b>
              <span>{{detailData.teaching_times_en}}</span>
            </div>
            <div class="qua-age">
              <b>Age: </b>
              <span>{{ detailData.age_min }} - {{detailData.age_max}}</span>
            </div>
            <div class="qua-education-req">
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

        <div class="job-detail-share-container">
          <div class="jobs-favorite" v-if="isFavoriteValue == 1"
               @click="cancelFavorite(1,detailData.id)">
            <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
          </div>
          <div class="jobs-favorite" v-else @click="addFavorite(detailData.id,1,detailData.job_title,detailData.logo)">
            <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
          </div>

        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
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
<!--            <div class="view-profile-btn-container">-->
<!--              <el-button class="view-profile-btn" type="primary" round>View Profile</el-button>-->
<!--            </div>-->
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
                <el-button type="primary">Let's Chat!</el-button>
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
import {COMPANY_JOB_LIST, JOB_DETAIL,APPLY_JOBS,ADD_FAVORITE,IS_FAVORITE,CANCEL_FAVORITE} from "@/api/api";
import latestIndustryNews from "@/components/latestIndustryNews";

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
          this.$message.error(err.msg)
        })

      } else {
        this.$message.warning('Only Educator Can Apply')
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

.job-detail-share-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  padding: 20px;
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
</style>
