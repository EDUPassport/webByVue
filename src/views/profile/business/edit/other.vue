<template>
  <div class="bg">
    <div class="basic-container">
      <div class="basic-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <div class="basic-r-container">
        <div class="basic-r-container-bg">

          <div class="account-profile-t">
            <div class="account-profile-t-l">Your profile</div>
            <div class="account-profile-t-r">
              <el-button class="account-profile-cancel-btn" plain round>
                CANCEL
              </el-button>
              <el-button class="account-profile-save-btn" type="primary" round
                         :loading="submitLoadingValue"
                         @click="submitForm('basicForm')">
                SAVE
              </el-button>
            </div>
          </div>

          <div class="basic-form">
            <el-form
                ref="basicForm"
                :model="basicForm"
                :rules="basicRules"
                label-width="120px"
                label-position="top"
                class="demo-ruleForm"
            >

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  1.Basic information
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Company name" prop="company_name">
                        <el-input v-model="basicForm.company_name" placeholder="Company name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Address">
                        <el-input v-model="basicForm.address" placeholder="Street name,building,apartment"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Website">
                        <el-input v-model="basicForm.website" placeholder="https://"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Location">

                        <div class="xll-location-container">
                          <div class="xll-location-l">
                            <template v-if="haveLocationStatus">
                              {{ $filters.countryInfoFormat(countryInfo) }}
                            </template>

                            <template v-else>
                              <el-select v-model="countryObj"
                                         @change="countryChange"
                                         value-key="id"
                                         filterable
                                         placeholder="Select Country">
                                <el-option v-for="(item,i) in countryOptions" :key="i" :label="item.name"
                                           :value="item"></el-option>
                              </el-select>

                              <template v-if="provinceOptions.length>0">
                                <el-select v-model="provinceObj"
                                           value-key="id"
                                           filterable
                                           class="account-location-select"
                                           @change="provinceChange"
                                           placeholder="Select Province">
                                  <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.name"
                                             :value="item"></el-option>
                                </el-select>
                              </template>
                              <template v-if="cityOptions.length>0">
                                <el-select v-model="cityObj"
                                           value-key="id"
                                           filterable
                                           class="account-location-select"
                                           @change="cityChange"
                                           placeholder="Select City">
                                  <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.name"
                                             :value="item"></el-option>
                                </el-select>
                              </template>
                            </template>
                          </div>

                          <div class="xll-location-r" >
                            <el-button plain round v-if="haveLocationStatus"
                                       @click="changeEditLocation()">
                              Edit
                            </el-button>
                            <el-button plain round v-if="showLocationCancelStatus"
                                       @click="changeCancelLocation()">
                              Cancel
                            </el-button>
                          </div>

                        </div>

                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="50">
                    <el-col :span="12">
                      <el-form-item  label="Add Location Pin">
                        <div class="map-container">
                          <div id="mapContainer" class="basemap"></div>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  2.Contact information
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Displayed name" prop="display_name">
                        <el-input v-model="basicForm.display_name" placeholder="Your full name or alias"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item  label="Job title" prop="job_title">
                        <el-input v-model="basicForm.job_title" placeholder="eg, HR, other, etc."></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item  label="E-mail address">
                        <el-input v-model="basicForm.work_email" placeholder="Your email address"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item  label="Phone number" prop="phone" >
                        <div class="contact-phone-container">
                          <div class="contact-phone-l">
                            <!--                    @onChange="onDefaultChange"-->
                            <el-select v-model="basicForm.country_code" filterable class="m-2" placeholder="Select" >
                              <el-option
                                  v-for="item in phoneCodeData"
                                  :key="item.phone_code"
                                  :label="item.en+' '+item.phone_code"
                                  :value="item.phone_code"
                              >
                                <span style="float: left">{{ item.en }}</span>
                                <span style=" float: right;color: var(--el-text-color-secondary);font-size: 13px;">
                          {{ item.phone_code }}
                        </span>
                              </el-option>
                            </el-select>
                          </div>
                          <div class="contact-phone-r">
                            <el-input v-model="basicForm.work_phone" placeholder="Phone #"></el-input>
                          </div>
                        </div>
                      </el-form-item>

                    </el-col>

                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  3.Business information
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Category" prop="category_id" required>
                        <div class="categories-tags" v-for="(item,k) in subCateOptions" :key="k">
                          <div v-if="item['children'].length>0" class="category-parent">
                          </div>
                          <div v-if="item['children'].length===0" class="categories-tags-item"
                               :class="selectBusinessTypeList.findIndex(element=>element.id === item.id) == -1 ? '' : 'tag-active' "
                               @click="selectBusinessType(item)">
                            {{ item.identity_name }}
                          </div>
                          <div class="categories-tags-item" v-for="(child,key) in item['children']" :key="key"
                               :class="selectBusinessTypeList.findIndex(element=>element.id === child.id) == -1 ? '' : 'tag-active' "
                               @click="selectBusinessType(child)">
                            {{ child.identity_name }}
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                          label="Business registration certificate" prop="business_reg_img">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :http-request="businessRegPhotoHttpRequest"
                            :before-upload="beforeBusinessRegPhotoUpload"
                        >
                          <el-image v-if="businessRegPhotoUrl" :src="businessRegPhotoUrl" class="upload-photo-img-1"></el-image>
                          <el-icon v-else :size="45">
                            <IconBiPlusSquare />
                          </el-icon>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="License" prop="license">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :http-request="licenseHttpRequest"
                            :before-upload="beforeLicensePhotoUpload"
                        >
                          <el-image v-if="licensePhotoUrl" :src="licensePhotoUrl" class="upload-photo-img-1"></el-image>
                          <el-icon  v-else :size="45">
                            <IconBiPlusSquare />
                          </el-icon>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Year of establishment">
                        <el-date-picker
                            v-model="basicForm.year_founded"
                            type="year"
                            format="YYYY"
                            value-format="YYYY"
                            placeholder="eg, 1890"
                            :disabledDate="birthdayDisabledDate"
                            style="width: 100%"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  4.About other
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">
                    <el-col :span="24">
                      <el-form-item label="Introduction" prop="desc">
                        <el-input v-model="basicForm.desc" type="textarea"
                                  :rows="4"
                                  placeholder="Write a couple of paragraphs about your school and why educators would want to teach there.">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="50">
                    <el-col :span="24">
                      <el-form-item  label="Technology Available" prop="technology_available">
                        <el-input v-model="basicForm.technology_available" type="textarea"
                                  :rows="4"
                                  placeholder="Computers, Smart screens, 3D Printing, etc..."></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item  label="Logo" prop="logo">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :http-request="logoPhotoHttpRequest"
                            :before-upload="beforeLogoPhotoUpload"
                        >
                          <el-image v-if="logoPhotoUrl" :src="logoPhotoUrl" class="upload-photo-img"></el-image>
                          <el-icon  v-else :size="45">
                            <IconBiPlusSquare />
                          </el-icon>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Introduction Video" prop="video_url">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :http-request="videoHttpRequest"
                            :before-upload="beforeIntroVideoUpload"
                        >
                          <video v-if="introVideoUrl" :src="introVideoUrl" controls class="upload-photo-img-1"/>
                          <el-icon  v-else :size="45">
                            <IconBiPlusSquare />
                          </el-icon>
                        </el-upload>
                      </el-form-item>

                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Background Image" prop="background_image">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :http-request="backgroundHttpRequest"
                            :before-upload="beforeBackgroundPhotoUpload"
                        >
                          <el-image v-if="backgroundPhotoUrl" :src="backgroundPhotoUrl" class="upload-photo-img-1"></el-image>
                          <el-icon  v-else :size="45">
                            <IconBiPlusSquare />
                          </el-icon>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item  label="Profile Photo" prop="profile_photo">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :http-request="profilePhotoHttpRequest"
                            :before-upload="beforeProfilePhotoUpload"
                        >
                          <el-image v-if="profilePhotoUrl" :src="profilePhotoUrl" class="upload-photo-img"></el-image>
                          <el-icon  v-else :size="45">
                            <IconBiPlusSquare />
                          </el-icon>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item  label="Field Trips">
                        <el-switch v-model="basicForm.felds_trips"></el-switch>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </div>
              </div>

            </el-form>

          </div>

        </div>
      </div>

    </div>

    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUploadProfile()" ></xllLoading>
  </div>
</template>

<script>
import xllLoading from "@/components/xllLoading"

import meSideMenu from "@/components/meSideMenu";

import {
  ZOHO_SYNC,
  SWITCH_IDENTITY_V2,
  GET_COUNTRY_LIST,
  SUB_CATE_LIST,USER_SUB_IDENTITY_V2,
  USER_INFO_BY_TOKEN_V2, OTHER_COMPANY_EDIT_V2, UPLOAD_BY_ALI_OSS, UPLOAD_BY_SERVICE, USER_MENU_LIST
} from '@/api/api'
import {phoneCodeData} from "@/utils/phoneCode";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {countriesData} from "@/utils/data";
import {decode} from "js-base64";
import ImageCompressor from 'compressorjs'


export default {
  name: "other",
  components: {
    meSideMenu,
    xllLoading
  },
  setup(){
    const birthdayDisabledDate = (date)=>{
      let myDate = new Date();
      return date.getTime() >= myDate.getTime();
    }
    return {
      birthdayDisabledDate
    }
  },
  data() {
    return {
      companyInfo:{},
      countryInfo:'',
      haveLocationStatus:false,
      showLocationCancelStatus:false,
      uploadLoadingStatus:false,
      sideMenuStatus:true,
      submitLoadingValue:false,
      phoneCodeData:phoneCodeData,
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      profilePhotoUrl:'',
      logoPhotoUrl:'',
      licensePhotoUrl:'',
      businessRegPhotoUrl:'',
      introVideoUrl:'',
      backgroundPhotoUrl:'',
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      basicForm: {
        company_name:'',
        license:'',
        logo:'',
        category_id:'',
        category_name_en:'',
        category_name_cn:'',
        desc:'',
        pid:'',
        work_phone:'',
        country_id:'',
        state_id:'',
        town_id:'',

        address:'',
        lat:'',
        lng:'',
        felds_trips: 0,
        work_email:'',
        country_code:'+86',
        video_url:'',
        year_founded:'',
        business_reg_img:'',
        technology_available: '',
        website:'',
        profile_photo:''

      },
      basicRules: {
        company_name: [
          {
            required: true,
            message: 'Please input ',
            trigger: 'blur',
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please input ',
            trigger: 'blur',
          },
        ]


      },
      nationalityOptions: countriesData,
      countryObj:{},
      provinceObj:{},
      cityObj:{},
      districtObj:{},
      countryName:'',
      countryNameCn:'',
      provinceName:'',
      provinceNameCn:'',
      cityName:'',
      cityNameCn:'',
      districtName:'',
      districtNameCn:'',

      countryOptions:[],
      provinceOptions: [],
      cityOptions: [],
      districtOptions: [],
      subCateOptions: [],
      selectBusinessTypeList: [],
      selectEducatorTypeList: [],
      sLocationType:1,//1 国外 2国内

      businessInfo: {},
      i:0,
      id:0,
      cid:0,
      action:''

    }
  },
  async mounted() {

    await this.getSubIdentityList()

    this.getAllCountry()

    this.initMap()

    let str = this.$route.query.s;

    if(str){
      let strObj = JSON.parse(decode(str))

      // console.log(str)
      this.i = strObj.i;
      this.id = strObj.id;
      this.cid = strObj.cid;
      this.action = strObj.action;

      if(strObj.action == 'add'){
        this.sideMenuStatus = false;
        this.getBasicInfo(strObj.i)
      }

      if(strObj.action == 'edit'){
        this.getBasicInfo(strObj.i)
      }

    }

  },
  methods: {
    changeEditLocation(){
      this.haveLocationStatus = false;
      this.showLocationCancelStatus = true;

      this.countryName = '';
      this.countryNameCn  = '';

      this.provinceName = '';
      this.provinceNameCn = '';

      this.cityName = '';
      this.cityNameCn = '';


    },
    changeCancelLocation(){
      this.haveLocationStatus = true;
      this.showLocationCancelStatus = false;

      let companyInfo = this.companyInfo;

      if(companyInfo.country_info){
        let countryInfoArr = JSON.parse(companyInfo.country_info)
        this.countryName = countryInfoArr.country_name_en;
        this.countryNameCn  = countryInfoArr.country_name_cn;
        this.provinceName = countryInfoArr.province_name_en;
        this.provinceNameCn = countryInfoArr.province_name_cn;
        this.cityName = countryInfoArr.city_name_en;
        this.cityNameCn = countryInfoArr.city_name_cn;

        this.basicForm.country_info = companyInfo.country_info;

      }

    },
    async getSubIdentityList(){
      let params = {
        pid: 4,
        tree: 1
      }

      await USER_SUB_IDENTITY_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.subCateOptions = res.message
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
    cancelUploadProfile(){
      this.uploadLoadingStatus = false;
    },
    licenseHttpRequest(options){
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file,{
        quality:0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token',localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if(isInChina === 'yes'){
            formData.append('file[]',file,file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.licensePhotoUrl = myFileUrl
                self.basicForm.license = myFileUrl

              }
            }).catch(err=>{
              console.log(err)
            })

          }

          if(isInChina === 'no'){
            formData.append('file',file,file.name)
            UPLOAD_BY_SERVICE(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.licensePhotoUrl = myFileUrl
                self.basicForm.license = myFileUrl
              }
            }).catch(err=>{
              console.log(err)
            })

          }

        },
        error(err){
          console.log(err.message)
        }

      })

    },
    beforeLicensePhotoUpload(file) {
      this.uploadLoadingStatus = true;
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    profilePhotoHttpRequest(options){
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file,{
        quality:0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token',localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if(isInChina === 'yes'){
            formData.append('file[]',file,file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.profilePhotoUrl = myFileUrl
                self.basicForm.profile_photo = myFileUrl

              }
            }).catch(err=>{
              console.log(err)
            })

          }

          if(isInChina === 'no'){
            formData.append('file',file,file.name)
            UPLOAD_BY_SERVICE(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.profilePhotoUrl = myFileUrl
                self.basicForm.profile_photo = myFileUrl
              }
            }).catch(err=>{
              console.log(err)
            })

          }

        },
        error(err){
          console.log(err.message)
        }

      })

    },
    beforeProfilePhotoUpload(file) {
      this.uploadLoadingStatus = true;

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    backgroundHttpRequest(options){
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file,{
        quality:0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token',localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if(isInChina === 'yes'){
            formData.append('file[]',file,file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.backgroundPhotoUrl = myFileUrl
                self.basicForm.background_image = myFileUrl
              }
            }).catch(err=>{
              console.log(err)
            })

          }

          if(isInChina === 'no'){
            formData.append('file',file,file.name)
            UPLOAD_BY_SERVICE(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.backgroundPhotoUrl = myFileUrl
                self.basicForm.background_image = myFileUrl
              }
            }).catch(err=>{
              console.log(err)
            })

          }

        },
        error(err){
          console.log(err.message)
        }

      })

    },
    beforeBackgroundPhotoUpload(file) {
      this.uploadLoadingStatus = true;

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    businessRegPhotoHttpRequest(options){
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file,{
        quality:0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token',localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if(isInChina === 'yes'){
            formData.append('file[]',file,file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.businessRegPhotoUrl = myFileUrl
                self.basicForm.business_reg_img = myFileUrl

              }
            }).catch(err=>{
              console.log(err)
            })

          }

          if(isInChina === 'no'){
            formData.append('file',file,file.name)
            UPLOAD_BY_SERVICE(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.businessRegPhotoUrl = myFileUrl
                self.basicForm.business_reg_img = myFileUrl
              }
            }).catch(err=>{
              console.log(err)
            })

          }

        },
        error(err){
          console.log(err.message)
        }

      })

    },
    beforeBusinessRegPhotoUpload(file) {
      this.uploadLoadingStatus = true;
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    logoPhotoHttpRequest(options){
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file,{
        quality:0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token',localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if(isInChina === 'yes'){
            formData.append('file[]',file,file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.logoPhotoUrl = myFileUrl
                self.basicForm.logo = myFileUrl

              }
            }).catch(err=>{
              console.log(err)
            })

          }

          if(isInChina === 'no'){
            formData.append('file',file,file.name)
            UPLOAD_BY_SERVICE(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.logoPhotoUrl = myFileUrl
                self.basicForm.logo = myFileUrl
              }
            }).catch(err=>{
              console.log(err)
            })

          }

        },
        error(err){
          console.log(err.message)
        }

      })

    },
    beforeLogoPhotoUpload(file) {
      this.uploadLoadingStatus = true;

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    videoHttpRequest(options){
      let self = this;
      // console.log(options)
      const formData = new FormData();
      let file = options.file;

      formData.append('token',localStorage.getItem('token'))
      // console.log(file)
      let isInChina = process.env.VUE_APP_CHINA
      if(isInChina === 'yes'){
        formData.append('file[]',file,file.name)
        UPLOAD_BY_ALI_OSS(formData).then(res=>{
          // console.log(res)
          if(res.code == 200){
            let myFileUrl = res.data[0]['file_url'];
            self.uploadLoadingStatus = false;
            self.introVideoUrl = myFileUrl
            self.basicForm.video_url = myFileUrl

          }
        }).catch(err=>{
          console.log(err)
        })

      }

      if(isInChina === 'no'){
        formData.append('file',file,file.name)
        UPLOAD_BY_SERVICE(formData).then(res=>{
          // console.log(res)
          if(res.code == 200){
            let myFileUrl = res.message.file_path;
            self.uploadLoadingStatus = false;
            self.introVideoUrl = myFileUrl
            self.basicForm.video_url = myFileUrl
          }
        }).catch(err=>{
          console.log(err)
        })

      }

    },
    beforeIntroVideoUpload(file) {
      console.log(file)
      this.uploadLoadingStatus = true;
    },
    initMap() {
      mapboxgl.accessToken = this.accessToken;

      const map = new mapboxgl.Map({
        container: "mapContainer",
        center: [121.472644, 31.231706],
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

      // {
      //   draggable:true
      // }

      // .setLngLat([121.47, 31.23])
      // .addTo(map);

      // marker.on('dragend',(e)=>{
      //   console.log(e)
      // })
      geocoder.on('result', (e) => {
        console.log(e)
        marker.setLngLat(e.result.center).addTo(map)
        this.basicForm.address = e.result.place_name
        this.basicForm.lng = e.result.center[0]
        this.basicForm.lat = e.result.center[1]

      })
      geocoder.on('clear', (e) => {
        console.log(e)
        this.basicForm.address =''
        this.basicForm.lng = ''
        this.basicForm.lat = ''
      })

    },
    setPlace(e) {
      console.log(e)
    },
    changeIdentity(companyId,language){
      let params = {
        identity:4,
        company_id:companyId,
        language:language
      }

      SWITCH_IDENTITY_V2(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          localStorage.setItem('identity',4)
          localStorage.setItem('company_id',companyId)
          this.$store.commit('identity',4)
          this.$store.commit('allIdentityChanged',true )
          this.$router.push('/business/profile')
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    submitForm(formName) {

      this.submitLoadingValue = true;

      let businessTypeId;
      let businessTypeName;
      let businessTypeNameCn;
      this.selectBusinessTypeList.forEach(item => {
        businessTypeId = item.id;
        businessTypeName = item.identity_name;
        businessTypeNameCn = item.identity_name_cn;
      })

      this.basicForm.company_contact_id = this.id;
      this.basicForm.category_id = businessTypeId;
      this.basicForm.category_name_en = businessTypeName;
      this.basicForm.category_name_cn = businessTypeNameCn;

      let countryObj = {
        country_name_en:this.countryName,
        country_name_cn:this.countryNameCn,
        province_name_en:this.provinceName,
        province_name_cn:this.provinceNameCn,
        city_name_en:this.cityName,
        city_name_cn:this.cityNameCn
      }

      this.basicForm.country_info = JSON.stringify(countryObj)

      let action = this.action;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(action == 'edit'){
            this.basicForm.id = this.cid;
          }
          if(action == 'add'){
            this.basicForm.id = this.cid;
          }

          let params = Object.assign({}, this.basicForm);
          OTHER_COMPANY_EDIT_V2(params).then(res => {
            console.log(res)
            if (res.code == 200) {

              this.$store.commit('username',this.basicForm.company_name)
              this.$store.commit('userAvatar',this.basicForm.logo)

              this.submitLoadingValue = false;

              if(action == 'edit'){
                this.$router.push('/business/profile')
              }else{
                localStorage.setItem('company_id', res.message.other_company_id)

                this.$store.commit('allIdentityChanged',true )
                let uid = localStorage.getItem('uid')

                this.getUserMenuList(uid,4, res.message.other_company_id, uid)

                this.changeIdentity(res.message.other_company_id,2)
              }

              // this.submitEduBusinessCompanyForm()

            }
          }).catch(err => {
            console.log(err)
            this.submitLoadingValue = false;
            this.$message.error(err.msg)
          })

        } else {
          this.submitLoadingValue = false;
          console.log('error submit!!')
          return false
        }
      })
    },
    getUserMenuList(uid,identity,companyId,createUid){

      let params = {
        user_id: uid,
        identity: identity,
        company_id: companyId,
        create_user_id: createUid,
        page:1,
        limit:1000
      }

      USER_MENU_LIST(params).then(res=>{
        // console.log(res)
        if(res.code === 200){
          let pcAllData = res.message.pc;
          if(pcAllData){
            let sData = pcAllData.filter(item=>item.identity == identity)
            this.$store.commit('menuData', sData)
            localStorage.setItem('menuData',JSON.stringify(sData))
          }

        }

      }).catch(err=>{
        console.log(err)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(e) {
      console.log(e)
    },
    getAllCountry(){
      let params = {
      }
      GET_COUNTRY_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.countryOptions = res.message;
        }
      }).catch(err=>{
        this.$message.error(err.msg)
      })
    },
    getAllProvinces(countryId){
      let params = {
        country_id:countryId
      }
      GET_COUNTRY_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.provinceOptions = res.message;
        }
      }).catch(err=>{
        this.$message.error(err.msg)
      })
    },
    getAllCitys(countryId,stateId){
      let params = {
        country_id:countryId,
        state_id:stateId
      }
      GET_COUNTRY_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.cityOptions = res.message;
        }
      }).catch(err=>{
        this.$message.error(err.msg)
      })
    },
    countryChange(e){
      console.log(e)
      this.basicForm.state_id=undefined
      this.basicForm.town_id = undefined

      this.provinceOptions = []
      this.cityOptions = []

      this.basicForm.country_id = e.id
      this.countryName = e.name
      this.countryNameCn = e.name
      this.getAllProvinces(e.id)

    },
    provinceChange(e) {
      console.log(e)
      this.basicForm.town_id = undefined
      this.cityOptions = []

      this.basicForm.state_id = e.id
      this.provinceName = e.name
      this.provinceNameCn = e.name

      this.getAllCitys(this.basicForm.country_id,e.id)
    },
    cityChange(e) {
      console.log(e)
      this.basicForm.town_id = e.id
      this.cityName = e.name
      this.cityNameCn = e.name
    },
    getSubCateList() {
      let params = {
        pid: 2,
        tree: 1
      }
      SUB_CATE_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.subCateOptions = res.message
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    selectBusinessType(item) {
      console.log(item);
      if (this.selectBusinessTypeList.indexOf(item) == -1) {
        if (this.selectBusinessTypeList.length > 0) {
          let len = this.selectBusinessTypeList.length - 1;
          this.selectBusinessTypeList.splice(len, 1);
        }
        this.selectBusinessTypeList.push(item);
      } else {
        this.selectBusinessTypeList.splice(this.selectBusinessTypeList.indexOf(item), 1);
      }

    },
    async getBasicInfo() {

      let params = {
        identity:4
      }
      await USER_INFO_BY_TOKEN_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          // let userContact = res.message.user_contact;
          // let companyContact = res.message.user_contact.company_contact;
          let companyInfo = res.message.user_contact.company;

          if (companyInfo.company_name) {
            this.basicForm.company_name = companyInfo.company_name;
          }
          if (companyInfo.desc) {
            this.basicForm.desc = companyInfo.desc;
          }
          if (companyInfo.work_phone) {
            this.basicForm.work_phone = companyInfo.work_phone;
          }

          if (companyInfo.technology_available) {
            this.basicForm.technology_available = companyInfo.technology_available;
          }
          if (companyInfo.felds_trips) {
            this.basicForm.felds_trips = companyInfo.felds_trips;
          }

          if (companyInfo.work_email) {
            this.basicForm.work_email = companyInfo.work_email;
          }

          if (companyInfo.lat) {
            this.basicForm.lat = companyInfo.lat;
          }
          if (companyInfo.lng) {
            this.basicForm.lng = companyInfo.lng;
          }
          if (companyInfo.address) {
            this.basicForm.address = companyInfo.address;
          }
          if (companyInfo.country_code) {
            this.basicForm.country_code = companyInfo.country_code;
          }
          if (companyInfo.video_url) {
            this.introVideoUrl = companyInfo.video_url;
            this.basicForm.video_url = companyInfo.video_url;
          }
          if (companyInfo.logo) {
            this.logoPhotoUrl = companyInfo.logo;
            this.basicForm.logo = companyInfo.logo;
          }

          if (companyInfo.background_image && companyInfo.background_image != '0') {
            this.backgroundPhotoUrl = companyInfo.background_image;
            this.basicForm.background_image = companyInfo.background_image;
          }

          if (companyInfo.business_reg_img) {
            this.businessRegPhotoUrl = companyInfo.business_reg_img;
            this.basicForm.business_reg_img = companyInfo.business_reg_img;
          }

          if (companyInfo.license) {
            this.licensePhotoUrl = companyInfo.license;
            this.basicForm.license = companyInfo.license;
          }
          if (companyInfo.year_founded) {
            this.basicForm.year_founded = companyInfo.year_founded.toString();
          }

          if(companyInfo.country_info){
            this.basicForm.country_info = companyInfo.country_info;

            let countryInfoArr = JSON.parse(companyInfo.country_info)

            this.countryName = countryInfoArr.country_name_en;
            this.countryNameCn  = countryInfoArr.country_name_cn;
            this.provinceName = countryInfoArr.province_name_en;
            this.provinceNameCn = countryInfoArr.province_name_cn;
            this.cityName = countryInfoArr.city_name_en;
            this.cityNameCn = countryInfoArr.city_name_cn;

            this.basicForm.country_info = companyInfo.country_info;
            this.countryInfo = companyInfo.country_info;

            this.haveLocationStatus = true;

          }

          if(companyInfo.country_id){
            this.basicForm.country_id = companyInfo.country_id;
          }
          if(companyInfo.state_id){
            this.basicForm.state_id = companyInfo.state_id;
          }
          if(companyInfo.town_id){
            this.basicForm.town_id = companyInfo.town_id;
          }

          if(companyInfo.website){
            this.basicForm.website = companyInfo.website;
          }

          let typeId = companyInfo.category_id;
          let typeNameEn = companyInfo.category_name_en;
          let typeName = companyInfo.category_name_cn;

          let typeObj = {
            id:typeId,
            identity_name:typeNameEn,
            identity_name_cn:typeName
          }

          this.selectBusinessTypeList.push(typeObj)


        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    async submitEduBusinessCompanyForm() {

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'z_gad': ''},
        {'SingleLine': params.company_name  // Education Business Name
        },
        {'Dropdown2': params.business_type_name  //Education Business Category
        },
        {'Dropdown': 'Education Business'  //Company Type
        },
        {'Website': ''  //Education Business Website
        },
        {'SingleLine1': ''  // Education Business Contact
        },
        {'Number2': ''  //  Company Number
        },
        {'SingleLine5': userId  //UserID
        },
        {'PhoneNumber_countrycode': ''  //Education Business Phone
        },
        {'Email': ''  // Education Business Email
        },
        {'Number': ''   //Number of Employees
        },
        {'Number1': ''   //Membership Duration
        },
        {'Dropdown1': ''   //Membership Type
        },
        {'Address_AddressLine1': ''   //Street Address
        },
        {'Address_City': ''   //City
        },
        {'Address_Region': ''   //State/Region/Province
        },
        {'Address_Country': ''   //Country
        },
        {'SingleLine4': ''   //   Business Registration No.
        },
        {'MultiLine': ''   //Company Intro
        },
        {'SingleLine3': ''   //WeChat ID
        },
        {'Number3': ''  //  Number of Branches
        },
        {'Number4': ''  //    Number of Students
        },
        {'MultipleChoice': ''  //    Students Ages
        },
        {'MultiLine1': ''  //     Curriculum Subjects
        },
        {'MultiLine2': ''  //     School Facilities
        },
        {'Website1': ''  // Business License Link
        },
        {'Website2': ''   //Company Logo Link
        },
        {'Website3': ''   //Header Image Link
        }
      ]

      let zohoParams = {
        zoho_data: zohoData,
        zoho_url: 'https://forms.zohopublic.com/edupassport/form/EduBusinessCompanyForm/formperma/2gsVgXjDNmE5niOKVzRmwT2tlYNWWCTD2kCDHv_CAV8/htmlRecords/submit'
      }

      await ZOHO_SYNC(zohoParams).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })

    }


  }
}
</script>

<style scoped>
.bg {
  background-color: #F0F2F5;
}
.basic-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
.basic-l-container{

}

.basic-r-container {
  width:calc(100% - 160px);
}

.basic-r-container-bg{
  padding:30px 50px 50px 50px;
}

.account-profile-t{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 40px 0;
}

.account-profile-t-l{
  font-family: BSemiBold, serif;
  font-size:30px;
  color:#262626;

}

.account-profile-t-r{

}

.account-profile-cancel-btn{
  font-size:20px;
}

.account-profile-save-btn{
  font-size:20px;
}

.basic-form {
  padding-bottom: 50px;
  /*height: 800px;*/
  overflow-y: scroll;
}

.demo-ruleForm {
  text-align: left;
}

.categories-tags {

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px dashed #EEEEEE;
  padding-bottom: 10px;
}

.categories-tags:last-child {
  border-bottom: none;
}

.category-parent {
  width: 100%;
  font-size: 14px;
  color: #808080;
  font-weight: 700;
  text-align: left;
}

.categories-tags-item {
  padding: 4px 10px;
  background-color: #EEEEEE;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 6px;
  font-size: 20px;
  cursor: pointer;
  font-family: BCM, serif;
}

.tag-active {
  background-color: #6650B3;
  color: #FFFFFF;
}

.tags-active {
  background-color: #00CE47;
  color: #FFFFFF;
}


.basic-breadcrumb-container {
  padding: 10px;
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
.business-reg-uploader{
  border: 1px dashed #EEEEEE;
  text-align: center;
  padding:8px;
  border-radius:10px;
}

.business-reg-uploader:hover {
  border-color: #0AA0A8;
}

/deep/ .profile-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

/deep/ .profile-uploader .el-upload:hover {
  border-color: #0AA0A8;
}

/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.profile-avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.intro-video-uploader {
  border: 1px dashed #d9d9d9;
  padding:8px;
  text-align: center;
  border-radius:10px;
}

.intro-video-uploader:hover {
  border-color: #0AA0A8;
}

/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.intro-video-avatar {
  width: 378px;
  height: 178px;
  display: block;
}

.contact-phone-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.contact-phone-l{
  width:28%;
}

.contact-phone-r{
  width:70%;
}



.xll-location-container{
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content: flex-start;

}
.xll-location-l{

}

.xll-location-r{
  margin-left:20px;
}


.account-profile-item-container{
  padding: 50px;
  border-radius: 38px;
  background-color: #ffffff;
  margin-bottom: 50px;

}

.account-profile-item-label{
  font-family: BarlowM, serif;
  font-size:26px;
  color:#262626;
}

.account-profile-item-c{
   margin-top: 15px;
}


/deep/ .el-input--default .el-input__wrapper{
  /*min-width: 350px;*/
}

.upload-photo-img{
  width:70px;
}

.upload-photo-img-1{
  width: 100%;
}

.account-location-select{
  margin-top:15px;
}


@media screen and (min-width: 1200px){
  .basic-container{

  }
}

@media screen and (max-width: 768px){

}

</style>
