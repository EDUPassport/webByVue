<template>
<div class="us-bg">
  <el-row class="banner-row" :gutter="0" align="middle" justify="center">
    <el-col class="banner-bg" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h1>Contact Us</h1>
    </el-col>
  </el-row>
  <el-row class="map-row" :gutter="0" align="middle" justify="center">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="mp-container">
        <div id="mapContainer" class="basemap"></div>
      </div>
    </el-col>
  </el-row>
  <el-row class="contact-form-row" :gutter="0" align="middle" justify="center">
    <el-col class="contact-form-container" :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
      <el-form
          :model="usForm"
          :rules="usRules"
          ref="usForm"
          label-width="160px"
          label-position="top"
          class="demo-ruleForm"
      >
        <el-form-item label="First Name" prop="first_name" required>
          <el-input size="medium" placeholder="First Name" v-model="usForm.first_name"></el-input>
        </el-form-item>
        <el-form-item label="Last Name" prop="last_name" required>
          <el-input size="medium" placeholder="Last Name" v-model="usForm.last_name"></el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email" required>
          <el-input size="medium" placeholder="Email" v-model="usForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Message" prop="message" required>
          <el-input size="medium" type="textarea" placeholder="Message" v-model="usForm.message"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="submit-btn"
                     type="primary"
                     :loading="submitLoadingStatus"
                     @click="submitForm('usForm')">
            Submit
          </el-button>
        </el-form-item>
      </el-form>

    </el-col>
    <el-col class="contact-detail-bg" :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
      <div class="contact-detail-container">
        <div class="contact-detail-label">CONTACT DETAILS</div>
        <div class="contact-detail-underline"></div>
        <div class="contact-detail-tips">
          Contact us for inquiries, suggestions, partnerships and more
        </div>
        <div class="contact-detail-location">
          San Antonio, Texas, 78266
        </div>
        <div class="contact-detail-phone">
          (+1) 131 2275 4880
        </div>
        <div class="contact-detail-email">
          contact@eslpassport.com
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
import {CONTACT_US} from "../../api/api";

export default {
  name: "us",
  data(){
    return {
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      usForm: {
        first_name: '',
        last_name:'',
        email:'',
        message:''
      },
      usRules: {
        first_name: [
          {required: true, message: 'Please enter your first name', trigger: 'blur'}
        ],
        last_name: [
          {required: true, message: 'Please enter your last name', trigger: 'blur'}
        ],
        email: [
          {required: true, message: 'Please enter your email', trigger: 'blur'}
        ],
        message: [
          {required: true, message: 'Please enter your message', trigger: 'blur'}
        ]
      },
      submitLoadingStatus:false
    }
  },
  mounted() {
    this.initMap(-98.33076300,29.65546900)
  },
  methods:{
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
    submitForm(formName) {
      this.submitLoadingStatus = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({},this.usForm)
          CONTACT_US(params).then(res=>{
            console.log(res)
            if(res.code == 200){
              this.$message.success('Success')
              this.submitLoadingStatus = false;
            }

          }).catch(err=>{
            console.log(err)
            this.$message.error(err.msg)
          })
         console.log('submit')
        } else {
          console.log('error submit!!')
          this.submitLoadingStatus = false
          return false
        }
      })
    }

  }
}
</script>

<style scoped>
.us-bg{
  background-color: #f5f6f7;
}

.banner-bg{
  height: 200px;
  background-image: url("../../assets/bg/wheat.png");
  background-size:50%;
  background-repeat: repeat;
  background-position: center;
}

.banner-bg h1{
  height: 100%;
  background-color: rgba(0,0,0,0.2);
  font-size: 28px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 200px;
}

.map-row{
  /*width: 1100px;*/
  margin: 0 auto;
}

.mp-container{
  padding: 20px;
  margin-top: 40px;
  height: 500px;
  background-color: #FFFFFF;
  border-radius: 10px;
}
.basemap{
  width: 100%;
  height: 100%;
}

.contact-form-row{
  /*width: 1100px;*/
  margin: 40px auto;
  background-color: #FFFFFF;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
}

.contact-form-container{
  padding: 20px 40px 20px 20px;
}
.contact-detail-bg{
  height: 100%;
  background-image: url("../../assets/bg/wheat.png");
  background-size:50%;
  background-repeat: repeat;
  background-position: center;
}

.contact-detail-container{
  height: 100%;
  background-color: rgba(72,146,178,0.8);
  text-align: left;
  padding: 20px;
}

.contact-detail-label{
  font-size: 22px;
  font-weight: bold;
  color: #FFFFFF;
}

.contact-detail-underline{
  width: 80px;
  border: 1px solid #00b3d2;
  margin-top: 4px;
}

.contact-detail-tips{
  font-size: 16px;
  margin-top: 60px;
  color: #FFFFFF;
}

.contact-detail-location{
  font-size: 16px;
  color: #FFFFFF;
  margin-top: 80px;
}

.contact-detail-phone{
  font-size: 16px;
  color: #FFFFFF;
  margin-top: 40px;
}
.contact-detail-email{
  font-size: 16px;
  color: #FFFFFF;
  margin-top: 40px;
}

@media screen and (min-width: 1200px){
  .map-row{
    width: 1100px;
  }
  .contact-form-row{
    width: 1100px;
  }

}
</style>
