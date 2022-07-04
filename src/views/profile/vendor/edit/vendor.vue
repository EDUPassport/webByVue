<template>
  <div class="bg">
    <div class="basic-container">

      <profileTitle :i="i" :action="action"></profileTitle>

      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" v-if="sideMenuStatus">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="basic-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="basic-breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/vendor/profile' }">Profile</el-breadcrumb-item>
              <el-breadcrumb-item>Vendor</el-breadcrumb-item>
            </el-breadcrumb>
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
              <el-form-item label="Company Name" prop="company_name">
                <el-input v-model="basicForm.company_name" placeholder="Company Name"></el-input>
              </el-form-item>
              <el-form-item label="Business Introduction" prop="desc">
                <el-input v-model="basicForm.desc" type="textarea"
                          placeholder="Business Introduction"></el-input>
              </el-form-item>

              <el-form-item label="Work Email">
                <el-input v-model="basicForm.work_email" placeholder="Please input"></el-input>
              </el-form-item>
              <el-form-item label="Website">
                <el-input v-model="basicForm.website" placeholder="Please input"></el-input>
              </el-form-item>

              <el-form-item label="Work Phone #" prop="phone" >
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

              <el-form-item label="Logo Photo" prop="logo">
                <el-upload
                    class="profile-uploader"
                    action=""
                    :headers="uploadHeaders"
                    :show-file-list="false"
                    :http-request="logoPhotoHttpRequest"
                    :before-upload="beforeLogoPhotoUpload"
                >
                  <el-image v-if="logoPhotoUrl" :src="logoPhotoUrl" class="profile-avatar"></el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="Year Founded">
                <el-date-picker
                    v-model="basicForm.year_founded"
                    type="year"
                    format="YYYY"
                    value-format="YYYY"
                    placeholder="Year Founded"
                    style="width: 100%"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="Location">

                <template v-if="sLocationType==1">
                  <el-select v-model="countryObj"
                             @change="countryChange"
                             value-key="id"
                             placeholder="Select Country">
                    <el-option v-for="(item,i) in countryOptions" :key="i" :label="item.Pinyin"
                               :value="item"></el-option>
                  </el-select>
                  <template v-if="provinceOptions.length>0">
                    <el-select v-model="provinceObj"
                               value-key="id"
                               @change="provinceForChange"
                               placeholder="Select Province">
                      <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.Pinyin"
                                 :value="item"></el-option>
                    </el-select>
                  </template>
                  <template v-if="cityOptions.length>0">
                    <el-select v-model="cityObj"
                               value-key="id"
                               @change="cityForChange"
                               placeholder="Select City">
                      <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.Pinyin"
                                 :value="item"></el-option>
                    </el-select>
                  </template>
                  <template v-if="districtOptions.length>0">
                    <el-select v-model="districtObj"
                               value-key="id"
                               @change="districtForChange"
                               placeholder="Select District">
                      <el-option v-for="(item,i) in districtOptions" :key="i" :label="item.Pinyin"
                                 :value="item"></el-option>
                    </el-select>
                  </template>

                </template>
                <template v-if="sLocationType==2">
                  <el-select v-model="provinceObj"
                             value-key="id"
                             @change="provinceChange"
                             placeholder="Select Province">
                    <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.Pinyin"
                               :value="item"></el-option>
                  </el-select>
                  <el-select v-model="cityObj"
                             value-key="id"
                             @change="cityChange"
                             placeholder="Select City">
                    <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.Pinyin"
                               :value="item"></el-option>
                  </el-select>
                  <el-select v-model="districtObj"
                             value-key="id"
                             @change="districtChange"
                             placeholder="Select District">
                    <el-option v-for="(item,i) in districtOptions" :key="i" :label="item.Pinyin"
                               :value="item"></el-option>
                  </el-select>
                </template>

              </el-form-item>
              <el-form-item label="Add Location Pin">
                <div class="map-container">
                  <div id="mapContainer" class="basemap"></div>
                </div>
              </el-form-item>
              <el-form-item label="Vendor Categories (Choose 1)" prop="category_id" required>
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

              <el-form-item label="License" prop="license">
                <el-upload
                    class="business-reg-uploader"
                    action=""
                    :headers="uploadHeaders"
                    :show-file-list="false"
                    :http-request="licenseHttpRequest"
                    :before-upload="beforeLicensePhotoUpload"
                >
                  <el-image v-if="licensePhotoUrl" :src="licensePhotoUrl" class="business-reg-avatar"></el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

            </el-form>

          </div>
          <div class="submit-btn-container">
            <el-button type="primary"
                       class="submit-btn"
                       :loading="submitLoadingValue"
                       @click="submitForm('basicForm')">
              Submit
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUploadProfile()" ></xllLoading>
  </div>
</template>

<script>
import xllLoading from "@/components/xllLoading"

import meSideMenu from "@/components/meSideMenu";
import profileTitle from "@/components/profileTitle";
import {
  ZOHO_SYNC,
  SWITCH_IDENTITY_V2,
  GET_COUNTRY_LIST,
  ALL_AREAS,
  SUB_CATE_LIST,
  USER_INFO_BY_TOKEN_V2,
  VENDOR_COMPANY_EDIT_V2,
  USER_INFO_VISITOR_V2,
  UPLOAD_BY_ALI_OSS,
  UPLOAD_BY_SERVICE,
  USER_MENU_LIST
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
  name: "vendor",
  components: {
    meSideMenu,
    profileTitle,
    xllLoading
  },
  data() {
    return {
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
      logoPhotoUrl:'',
      licensePhotoUrl:'',
      businessRegPhotoUrl:'',
      introVideoUrl:'',
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
        country:'',
        province:'',
        city:'',
        district:'',
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
        website:''
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
  mounted() {
    this.getAllCountry(0)
    this.getAllAreas(0)
    this.getSubCateList()
    this.initMap()


    let str = this.$route.query.s;

    if(str){
      let strObj = JSON.parse(decode(str))

      console.log(strObj)
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
      let self = this;
      let params = {
        identity:5,
        company_id:companyId,
        language:language
      }
      SWITCH_IDENTITY_V2(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          localStorage.setItem('identity',5)
          localStorage.setItem('company_id',companyId)
          self.$store.commit('identity',5)
          this.$store.commit('allIdentityChanged',true )
          this.$router.push('/vendor/profile')

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

      this.basicForm.category_id = businessTypeId;
      this.basicForm.category_name_en = businessTypeName;
      this.basicForm.category_name_cn = businessTypeNameCn;

      let countryObj = {
        country_name_en:this.countryName,
        country_name_cn:this.countryNameCn,
        province_name_en:this.provinceName,
        province_name_cn:this.provinceNameCn,
        city_name_en:this.cityName,
        city_name_cn:this.cityNameCn,
        district_name_en:this.districtName,
        district_name_cn:this.districtNameCn
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
          VENDOR_COMPANY_EDIT_V2(params).then(res => {
            console.log(res)
            if (res.code == 200) {

              this.$store.commit('username',this.basicForm.company_name)
              this.$store.commit('userAvatar',this.basicForm.logo)

              this.submitLoadingValue = false;


              if(action == 'edit'){
                this.$router.push('/vendor/profile')
              }else{

                localStorage.setItem('company_id', res.message.vendor_company_id)

                this.$store.commit('allIdentityChanged',true )
                let uid = localStorage.getItem('uid')

                this.getUserMenuList(uid,5, res.message.vendor_company_id, uid)
                this.changeIdentity(res.message.vendor_company_id,2)
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
          let sData = pcAllData.filter(item=>item.identity == identity)
          this.$store.commit('menuData', sData)
          localStorage.setItem('menuData',JSON.stringify(sData))
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
    getAllCountry(pid){
      let params = {
        pid:pid
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
    getAllForProvinces(pid){
      let params = {
        pid:pid
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
    getAllForCitys(pid){
      let params = {
        pid:pid
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
    getAllForDistricts(pid){
      let params = {
        pid:pid
      }

      GET_COUNTRY_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.districtOptions = res.message;
        }
      }).catch(err=>{
        this.$message.error(err.msg)
      })
    },
    getAllAreas(pid) {
      let params = {
        pid: pid
      }
      ALL_AREAS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.provinceOptions = res.message
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getAllCitys(pid) {
      let params = {
        pid: pid
      }
      ALL_AREAS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.cityOptions = res.message
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getAllDistricts(pid) {
      let params = {
        pid: pid
      }
      ALL_AREAS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.districtOptions = res.message
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    countryChange(e){
      console.log(e)
      this.basicForm.province=undefined
      this.basicForm.city = undefined
      this.basicForm.district = undefined
      this.basicForm.country = e.id
      this.countryName = e.Pinyin
      this.countryNameCn = e.Name

      if(e.id == 99999999){
        this.sLocationType =2
        this.getAllAreas(0)
      }else{
        this.sLocationType=1
        this.getAllForProvinces(e.id)
      }
    },
    provinceChange(e) {
      console.log(e)
      this.getAllCitys(e.id)
      this.basicForm.province = e.id
      this.provinceName = e.Pinyin
      this.provinceNameCn = e.Name

    },
    cityChange(e) {
      console.log(e)
      this.getAllDistricts(e.id)
      this.basicForm.city = e.id
      this.cityName = e.Pinyin
      this.cityNameCn = e.Name
    },
    districtChange(e) {
      console.log(e)
      this.basicForm.district = e.id
      this.districtName = e.Pinyin
      this.districtNameCn = e.Name
    },
    provinceForChange(e) {
      console.log(e)
      this.basicForm.city = undefined
      this.basicForm.district = undefined
      this.getAllForCitys(e.id)
      this.basicForm.province = e.id
      this.provinceName = e.Pinyin
      this.provinceNameCn = e.Name
    },
    cityForChange(e) {
      console.log(e)
      this.basicForm.district = undefined
      this.getAllForDistricts(e.id)
      this.basicForm.city = e.id
      this.cityName = e.Pinyin
      this.cityNameCn = e.Name
    },
    districtForChange(e) {
      console.log(e)
      this.basicForm.district = e.id
      this.districtName = e.Pinyin
      this.districtNameCn = e.Name
    },
    getSubCateList() {
      let params = {
        pid: 3,
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
    async getVisitorInfo() {

      let params = {
        user_id:localStorage.getItem('uid'),
        identity:5
      }
      await USER_INFO_VISITOR_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          // let userContact = res.message.user_contact;

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
          if (companyInfo.tuition) {
            this.basicForm.tuition = companyInfo.tuition;
          }
          if(companyInfo.country_info){
            this.basicForm.country_info = companyInfo.country_info;
          }

          if(companyInfo.country){
            this.basicForm.country = companyInfo.country;
          }
          if(companyInfo.province){
            this.basicForm.province = companyInfo.province;
          }
          if(companyInfo.city){
            this.basicForm.city = companyInfo.city;
          }
          if(companyInfo.district){
            this.basicForm.district = companyInfo.district;
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
    async getBasicInfo() {

      let params = {
        identity:5
      }
      await USER_INFO_BY_TOKEN_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          // let userContact = res.message.user_contact;

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
          if (companyInfo.tuition) {
            this.basicForm.tuition = companyInfo.tuition;
          }
          if(companyInfo.country_info){
            this.basicForm.country_info = companyInfo.country_info;
          }

          if(companyInfo.country){
            this.basicForm.country = companyInfo.country;
          }
          if(companyInfo.province){
            this.basicForm.province = companyInfo.province;
          }
          if(companyInfo.city){
            this.basicForm.city = companyInfo.city;
          }
          if(companyInfo.district){
            this.basicForm.district = companyInfo.district;
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
  background-color: #f5f6f7;
}

.basic-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.basic-r-container {
  padding: 20px;
}

.basic-form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
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
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
}

.tag-active {
  background-color: #00b3d2;
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

.xll-form-switch{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.xll-form-switch-label{
  color:#606266;
  font-size: 14px;
}
.submit-btn-container{
  text-align: center;
  margin-top:40px;
}

.submit-btn{
  width:40%;
}
</style>