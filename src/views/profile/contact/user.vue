<template>
  <div class="bg">
    <div class="basic-container">

      <profileTitle :i="i" :action="action"></profileTitle>

      <el-row align="top" justify="center">
        <el-col v-if="sideMenuStatus" :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu ></meSideMenu>
        </el-col>
        <el-col class="basic-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

          <div class="basic-breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item>Your Personal Information</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="basic-form">
            <el-form
                ref="basicForms"
                :model="basicForm"
                :rules="basicRules"
                label-width="120px"
                label-position="top"
                class="demo-ruleForm"
            >
              <el-form-item label="First Name" prop="first_name">
                <el-input v-model="basicForm.first_name" placeholder="First Name"></el-input>
              </el-form-item>
              <el-form-item label="Last Name" prop="last_name">
                <el-input v-model="basicForm.last_name" placeholder="Last Name"></el-input>
              </el-form-item>
<!--              <el-form-item label="User Name" prop="username">-->
<!--                <el-input v-model="basicForm.username" placeholder="User Name"></el-input>-->
<!--              </el-form-item>-->

              <el-form-item label="Gender" prop="sex">
                <el-select v-model="basicForm.sex" placeholder="Select your gender">
                  <el-option v-for="(item,i) in sexOptions" :key="i" :label="item.object_en"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Phone #" prop="phone" >
                <div class="contact-phone-container">
                  <div class="contact-phone-l">
                    <!--                    @onChange="onDefaultChange"-->
                    <el-select v-model="basicForm.area_code" filterable class="m-2" placeholder="Select" >
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
                    <el-input v-model="basicForm.phone" placeholder="Phone #"></el-input>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="Email" prop="email">
                <template #label>
                  Email (Caution: Changing this will affect your login details)
                </template>
                <el-input v-model="basicForm.email" placeholder="Email"></el-input>
              </el-form-item>

              <el-form-item label="Avatar" prop="headimgurl">
                <el-upload
                    class="profile-uploader"
                    action=""
                    :headers="uploadHeaders"
                    :show-file-list="false"
                    :http-request="profilePhotoHttpRequest"
                    :before-upload="beforeProfilePhotoUpload"
                >
                  <el-image v-if="profilePhotoUrl" :src="profilePhotoUrl" class="profile-avatar"></el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="Birthdate" prop="birthday">
                <el-date-picker
                    v-model="basicForm.birthday"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="Pick a date"
                    :disabledDate="birthdayDisabledDate"
                    style="width: 100%"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="Location">

                <template v-if="sLocationType==1">
                  <el-select v-model="countryObj"
                             @change="countryChange"
                             value-key="id"
                             filterable
                             placeholder="Select Country">
                    <el-option v-for="(item,i) in countryOptions" :key="i" :label="item.Pinyin"
                               :value="item"></el-option>
                  </el-select>
                  <template v-if="provinceOptions.length>0">
                    <el-select v-model="provinceObj"
                               value-key="id"
                               filterable
                               @change="provinceForChange"
                               placeholder="Select Province">
                      <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.Pinyin"
                                 :value="item"></el-option>
                    </el-select>
                  </template>
                  <template v-if="cityOptions.length>0">
                    <el-select v-model="cityObj"
                               value-key="id"
                               filterable
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

            </el-form>
          </div>

          <div class="submit-btn-container">
            <el-button type="primary"
                       class="submit-btn"
                       :loading="submitLoadingValue"
                       @click="submitForm('basicForms')">
              Submit
            </el-button>
          </div>

          <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUploadProfile()" ></xllLoading>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {phoneCodeData} from "@/utils/phoneCode";
import {countriesData} from "@/utils/data";
import meSideMenu from "@/components/meSideMenu";
import profileTitle from "@/components/profileTitle"
import xllLoading from "@/components/xllLoading"

import {
  ZOHO_SYNC,
  GET_COUNTRY_LIST, ALL_AREAS, USER_CONTACT_EDIT_V2, USER_INFO_BY_TOKEN_V2, USER_INFO_VISITOR_V2,
  UPLOAD_BY_ALI_OSS, UPLOAD_BY_SERVICE
} from '@/api/api';
import {useStore} from "vuex";
import {ref,reactive} from "vue";
import {encode,decode} from 'js-base64'

import ImageCompressor from 'compressorjs'


export default {
  name: "userContact",
  components: {
    meSideMenu,
    profileTitle,
    xllLoading
  },
  setup(){
    const store = useStore()

    const setIdentity = (data)=>{
      store.commit('identity',data)
    }
    const submitLoadingValue = ref(false)

    const basicForms = ref(null)

    const basicForm = reactive({
      first_name: "",
      last_name:'',
      username:'',
      identity:localStorage.getItem('identity'),
      sex:'',
      phone:'',
      email:'',
      district:'',
      city:'',
      province:'',
      country:'',
      country_info:'',
      headimgurl:'',
      language: 2,
      birthday:'',
      area_code:'+86'
    })
    const checkContactPhone=(rule,value,callback)=>{
      if(!value){
        return callback(new Error('Please input  phone'))
      }
      if(!basicForm.area_code){
        return callback(new Error('Please input area code'))
      }
      callback()
    }

    const basicRules = reactive({
      first_name: [
        {
          required: true,
          message: 'First Name',
          trigger: 'blur',
        }
      ],
      last_name: [
        {
          required: true,
          message: 'Last Name',
          trigger: 'blur',
        }
      ],
      sex: [
        {
          required: true,
          message: 'Select your gender',
          trigger: 'change',
        }
      ],
      phone: [
        {
          required: true,
          validator:checkContactPhone,
          trigger: 'blur',
        },
      ],
      email: [
        {
          required: true,
          message: 'Please enter your email',
          trigger: 'change',
        }
      ],
      headimgurl: [
        {
          required: true,
          message: "Choose your avatar",
          trigger: 'change',
        },
      ]

    })

    const birthdayDisabledDate = (date)=>{
      let myDate = new Date();
      return date.getTime() >= myDate.getTime();
    }

    return {
      setIdentity,
      submitLoadingValue,
      basicForm,
      basicForms,
      basicRules,
      birthdayDisabledDate
    }
  },
  computed:{
    identity:{
      get(){
        return this.$store.state.identity
      }
    }
  },
  data() {
    return {
      uploadLoadingStatus:false,

      sideMenuStatus:true,
      sexOptions: [
        {
          value: 1,
          object_en: 'Male',
          object_cn: '男'
        },
        {
          value: 2,
          object_en: 'Female',
          object_cn: "女"
        },
        {
          value: 3,
          object_en: 'Undisclosed',
          object_cn: '未公开'
        }
      ],
      sLocationType:1, //1 国外 2国内
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
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      profilePhotoUrl: '',
      logoPhotoUrl: '',
      nationalityOptions: countriesData,
      phoneCodeData:phoneCodeData,

      i:0,
      action:'',

    }
  },
  beforeRouteUpdate(to){
      console.log(to.query.s)
    let str = to.query.s;

    if(str){
      let strObj = JSON.parse(decode(str))

      console.log(strObj)
      this.i = strObj.i;
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
  mounted() {

    let str = this.$route.query.s;

    if(str){
      let strObj = JSON.parse(decode(str))

      // console.log(strObj)
      this.i = strObj.i;
      this.action = strObj.action;

      if(strObj.action == 'add'){
        this.sideMenuStatus = false;
        this.getBasicInfo(strObj.i)
      }

      if(strObj.action == 'edit'){
        this.getBasicInfo(strObj.i)
      }

    }

    this.getAllCountry(0)
    this.getAllAreas(0)
  },
  methods: {
    cancelUploadProfile(){
      this.uploadLoadingStatus = false;
    },
    getVisitorInfo(uid,identity) {

      let params = {
        user_id:uid,
        identity:identity
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        console.log(res)
        if(res.code == 200){
          let userContact = res.message.user_contact;

          if(userContact){

            this.basicForm.first_name = userContact.first_name;
            this.basicForm.last_name = userContact.last_name;

            if(userContact.username){
              this.basicForm.username = userContact.username;
            }

            if(userContact.email){
              this.basicForm.email = userContact.email ;
            }
            if(userContact.sex){
              this.basicForm.sex = userContact.sex;
            }

            if(userContact.phone){
              this.basicForm.phone = userContact.phone;
            }
            if(userContact.country){
              this.basicForm.country = userContact.country;
            }

            if(userContact.province){
              this.basicForm.province = userContact.province;
            }
            if(userContact.city){
              this.basicForm.city = userContact.city;
            }
            if(userContact.district){
              this.basicForm.district = userContact.district;
            }
            if(userContact.headimgurl){
              this.basicForm.headimgurl = userContact.headimgurl;
              this.profilePhotoUrl = userContact.headimgurl
            }

            if(userContact.birthday && userContact.birthday !== '0000-00-00'){
              this.basicForm.birthday = userContact.birthday;
            }

            if(userContact.area_code){
              this.basicForm.area_code = userContact.area_code;
            }
            if(userContact.country_info){
              this.basicForm.country_info = userContact.country_info;
            }

          }

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getBasicInfo(identity) {

      let params = {
        identity:identity
      }

      USER_INFO_BY_TOKEN_V2(params).then(res => {
        // console.log(res)
        if(res.code == 200){
          let userContact = res.message.user_contact;

          if(userContact){

            this.basicForm.first_name = userContact.first_name;
            this.basicForm.last_name = userContact.last_name;

            if(userContact.username){
              this.basicForm.username = userContact.username;
            }

            if(userContact.email){
              this.basicForm.email = userContact.email ;
            }
            if(userContact.sex){
              this.basicForm.sex = userContact.sex;
            }

            if(userContact.phone){
              this.basicForm.phone = userContact.phone;
            }
            if(userContact.country){
              this.basicForm.country = userContact.country;
            }

            if(userContact.province){
              this.basicForm.province = userContact.province;
            }
            if(userContact.city){
              this.basicForm.city = userContact.city;
            }
            if(userContact.district){
              this.basicForm.district = userContact.district;
            }
            if(userContact.headimgurl){
              this.basicForm.headimgurl = userContact.headimgurl;
              this.profilePhotoUrl = userContact.headimgurl
            }

            if(userContact.birthday && userContact.birthday !== '0000-00-00'){
              this.basicForm.birthday = userContact.birthday;
            }

            if(userContact.area_code){
              this.basicForm.area_code = userContact.area_code;
            }
            if(userContact.country_info){
              let countryInfoArr = JSON.parse(userContact.country_info)
              this.countryName = countryInfoArr.country_name_en;
                 this.countryNameCn  = countryInfoArr.country_name_cn;
                  this.provinceName = countryInfoArr.province_name_en;
                  this.provinceNameCn = countryInfoArr.province_name_cn;
                  this.cityName = countryInfoArr.city_name_en;
                  this.cityNameCn = countryInfoArr.city_name_cn;
                  this.districtName = countryInfoArr.district_name_en;
                  this.districtNameCn = countryInfoArr.district_name_cn;
              this.basicForm.country_info = userContact.country_info;
            }

          }

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

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
                self.basicForm.headimgurl = myFileUrl

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
                self.basicForm.headimgurl = myFileUrl
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
    submitForm(formName) {
      // console.log(formName)
      let i = this.i;
      let action = this.action;

      this.submitLoadingValue=true
      this.$refs[formName].validate((valid) => {
        if (valid) {

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
          // console.log(this.basicForm)
          let params = Object.assign({}, this.basicForm)
          USER_CONTACT_EDIT_V2(params).then(res => {
            // console.log(res)
            if (res.code == 200) {

              if(i == 1){
                if(action == 'edit'){
                  this.$router.push('/educator/profile')
                }else{
                  let strObj = {
                    i:i,
                    action:'add'
                  }
                  let str = encode(JSON.stringify(strObj))
                  this.$router.push({path:'/educator/edit/basic',query:{s:str}})
                }

              }

              if(i == 2 || i == 3 || i == 4){
                if(action == 'edit'){
                  this.$router.push('/business/profile')
                }else{
                  let strObj = {
                    i:i,
                    action:'add'
                  }
                  let str = encode(JSON.stringify(strObj))

                  this.$router.push({path:'/profile/contact/company',query:{s:str}})
                }

              }

              if(i == 5){
                if(action == 'edit'){
                  this.$router.push('/vendor/profile')
                }else{
                  let strObj = {
                    i:i,
                    action:'add'
                  }
                  let str = encode(JSON.stringify(strObj))
                  this.$router.push({path:'/profile/contact/company',query:{s:str}})
                }
              }

            }
          }).catch(err=>{
            console.log(err)
            this.$message.error(err.msg)
            this.submitLoadingValue=false
          })
        } else {
          console.log('error submit!!')
          this.submitLoadingValue=false
          return false

        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
    async submitEducatorContactForm(){

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {'SingleLine': userId  //UserID//
        },
        {'SingleLine1': params.first_name // First Name
        },
        {'SingleLine2': params.last_name //  Last Name
        },
        {'Dropdown': ''  //  Gender
        },
        {'Date': ''  //   Date of Birth dd-MMM-yyyy
        },
        {'SingleLine3': ''  //   Title
        },
        {'Email': ''  //   Email
        },
        {'PhoneNumber_countrycode': ''  //   Phone
        },
        {'SingleLine4': ''  //   Nationality
        },
        {'Dropdown1': ''  //  Membership Type
        },
        {'MultiLine': ''  //  Languages Spoken
        },
        {'Number': ''  //  Membership Duration
        },
        {'SingleLine5': ''  //  City
        },
        {'SingleLine6': ''  //  Province
        },
        {'SingleLine7': ''  //  Country
        },
        {'Dropdown2': ''  //  Educator Type
        },
        {'MultiLine1': ''  //  Education
        },
        {'MultiLine2': ''  //   Work History
        },
        {'Dropdown3': ''  //  Teaching Experience
        },
        {'MultiLine3': ''  //  Certifications
        },
        {'MultiLine4': ''  //  Educator Intro
        },
        {'Website': params.profile_photo  //   Contact image Link
        },
        {'Website1': ''  //   Intro Video Link
        }
      ]

      let zohoParams = {
        zoho_data:zohoData,
        zoho_url:'https://forms.zohopublic.com/edupassport/form/EducatorContactForm/formperma/G014C7ko-MpOp3A2vp6NZlgxhPbGj2HDtbzlZEI6cks/htmlRecords/submit'
      }

      await ZOHO_SYNC(zohoParams).then(res=>{
        console.log(res)
      }).catch(err=>{
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

.basic-breadcrumb-container {
  padding: 10px;
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
.submit-btn-container{
  text-align: center;
  margin-top:40px;
}

.submit-btn{
  width:40%;
}


</style>