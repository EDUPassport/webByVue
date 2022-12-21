<template>
  <div class="bg">
    <div class="basic-container">
      <div class="basic-l-container">
        <meSideMenu></meSideMenu>
      </div>

      <el-scrollbar class="basic-r-container">

        <div class="basic-r-container-bg">

          <div class="account-profile-t">
            <div class="account-profile-t-l">Your profile</div>
            <div class="account-profile-t-r">
              <el-button class="account-profile-cancel-btn" plain round @click="cancel()">
                CANCEL
              </el-button>
              <el-button class="account-profile-save-btn" type="primary" round
                         :loading="submitLoadingValue"
                         @click="submitForm('basicForm',1)">
                SAVE
              </el-button>
              <el-button class="account-profile-save-btn" type="primary" round
                         :loading="submitAndViewLoadingValue"
                         @click="submitForm('basicForm',2)">
                SAVE & VIEW
              </el-button>
            </div>
          </div>

          <el-scrollbar class="basic-form">
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
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Recruiter name" prop="company_name">
                        <el-input v-model="basicForm.company_name" placeholder="Recruiter name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Address">
                        <el-input v-model="basicForm.address"
                                  @input="inputAddressEvent"
                                  placeholder="Street name,building,apartment"></el-input>
                      </el-form-item>
                    </el-col>
                    <!--                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">-->
                    <!--                      <el-form-item label="Website">-->
                    <!--                        <el-input v-model="basicForm.website" placeholder="https://"></el-input>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Location">

                        <div class="xll-location-container">
                          <div class="xll-location-l">
                            <template v-if="haveLocationStatus">
                              {{ $filters.countryInfoFormat(countryInfo) }}
                            </template>

                            <template v-else>
                              <el-select v-model="countryObj"
                                         :teleported="false"
                                         @change="countryChange"
                                         value-key="id"
                                         filterable
                                         placeholder="Select Country">
                                <el-option v-for="(item,i) in countryOptions" :key="i" :label="item.name"
                                           :value="item"></el-option>
                              </el-select>

                              <template v-if="provinceOptions.length>0">
                                <el-select v-model="provinceObj"
                                           :teleported="false"
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
                                           :teleported="false"
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

                          <div class="xll-location-r">
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
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <el-form-item label="Add Location Pin">
                        <div class="map-container">
                          <div id="mapContainer" class="basemap"></div>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Profile Photo" prop="profile_photo">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                            :http-request="profilePhotoHttpRequest"
                            :before-upload="beforeProfilePhotoUpload"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image">
                            <div v-if="profilePhotoUrl">
                              <el-image :src="profilePhotoUrl" style="width:100%;"></el-image>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleSingleImagePreview(profilePhotoUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleProfilePhotoRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>

                            </div>
                          </div>
                        </div>
                      </el-form-item>

                    </el-col>

                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  2.Contact information <span>(Information that Educators will see when they visit you profile)</span>
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Displayed name" prop="display_name">
                        <el-input v-model="basicForm.display_name"
                                  placeholder="Name that will be visible to others"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Job title" prop="job_title">
                        <el-input v-model="basicForm.job_title" placeholder="eg, HR, recruiter, etc."></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="E-mail address">
                        <el-input v-model="basicForm.work_email" placeholder="Please input"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Phone number" prop="phone">
                        <div class="contact-phone-container">
                          <div class="contact-phone-l">
                            <!--                    @onChange="onDefaultChange"-->
                            <el-select v-model="basicForm.country_code"
                                       :teleported="false"
                                       filterable class="m-2" placeholder="Select">
                              <el-option
                                  v-for="item in phoneCodeData"
                                  :key="item.phone_code"
                                  :label="item.phone_code"
                                  :value="item.phone_code"
                              >
                                <span style="float: left">{{ item.en }}</span>
                                <span style=" float: right;font-size: 13px;">
                                    {{ item.phone_code }}
                              </span>
                              </el-option>
                            </el-select>
                          </div>
                          <div class="contact-phone-r">
                            <el-input v-model="basicForm.work_phone" type="number" maxlength="25" placeholder="Phone #"></el-input>
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
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item class="account-profile-category" label="Category" prop="category_id" required>

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
                    <!--                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">-->
                    <!--                      <el-form-item-->
                    <!--                          label="Business registration certificate" prop="business_reg_img">-->
                    <!--                        <el-upload-->
                    <!--                            class="profile-uploader"-->
                    <!--                            action=""-->
                    <!--                            :headers="uploadHeaders"-->
                    <!--                            :show-file-list="false"-->
                    <!--                            :http-request="businessRegPhotoHttpRequest"-->
                    <!--                            :before-upload="beforeBusinessRegPhotoUpload"-->
                    <!--                        >-->
                    <!--                          <el-icon :size="45">-->
                    <!--                            <IconBiPlusSquare />-->
                    <!--                          </el-icon>-->
                    <!--                        </el-upload>-->

                    <!--                        <div class="account-xll-images" >-->
                    <!--                          <div class="account-xll-image">-->
                    <!--                            <div  v-if="businessRegPhotoUrl">-->
                    <!--                              <el-image :src="businessRegPhotoUrl" style="width:100%;"></el-image>-->
                    <!--                            </div>-->
                    <!--                            <div class="account-xll-image-mask">-->
                    <!--                              <span @click="handleSingleImagePreview(businessRegPhotoUrl)">-->
                    <!--                                <el-icon color="#ffffff" :size="45">-->
                    <!--                                  <zoom-in />-->
                    <!--                                </el-icon>-->
                    <!--                              </span>-->
                    <!--                            </div>-->
                    <!--                          </div>-->
                    <!--                        </div>-->

                    <!--                      </el-form-item>-->

                    <!--                    </el-col>-->
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="License" prop="license">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                            :http-request="licenseHttpRequest"
                            :before-upload="beforeLicensePhotoUpload"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image">
                            <div v-if="licensePhotoUrl">
                              <el-image :src="licensePhotoUrl" style="width:100%;"></el-image>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleSingleImagePreview(licensePhotoUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleLicensePhotoRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>

                      </el-form-item>

                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
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
                  4.About recruiter
                </div>
                <div class="account-profile-item-c">
                  <el-row :gutter="50">
                    <el-col :span="24">
                      <el-form-item label="Introduction" prop="desc">
                        <el-input v-model="basicForm.desc" type="textarea"
                                  :rows="4"
                                  placeholder="Write a couple of paragraphs about your business.">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Logo" prop="logo">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                            :http-request="logoPhotoHttpRequest"
                            :before-upload="beforeLogoPhotoUpload"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image">
                            <div v-if="logoPhotoUrl">
                              <el-image :src="logoPhotoUrl" style="width:100%;"></el-image>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleSingleImagePreview(logoPhotoUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleLogoPhotoRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>

                      </el-form-item>

                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Introduction Video" prop="video_url">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".mp4,.MP4"
                            :http-request="videoHttpRequest"
                            :before-upload="beforeIntroVideoUpload"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image">
                            <div v-if="introVideoUrl">
                              <video style="width: 100%;" :src="introVideoUrl" controls/>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleVideoPreview(introVideoUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleVideoUrlRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>

                            </div>
                          </div>
                        </div>


                      </el-form-item>

                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Background Image" prop="background_image">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                            :http-request="backgroundHttpRequest"
                            :before-upload="beforeBackgroundPhotoUpload"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image">
                            <div v-if="backgroundPhotoUrl">
                              <el-image :src="backgroundPhotoUrl" style="width:100%;"></el-image>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleSingleImagePreview(backgroundPhotoUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleBackgroundPhotoRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>
                      </el-form-item>

                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">

                      <el-form-item label="Additional images(up to 20mb/image)" prop="images">
                        <el-upload
                            style="width: 90%;"
                            ref="accountImagesUpload"
                            action="#"
                            :headers="uploadHeaders"
                            :data="uploadData"
                            :auto-upload="false"
                            name="file[]"
                            :show-file-list="false"
                            :limit="6"
                            :multiple="true"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                            :before-upload="beforeAccountImageUpload"
                            :file-list="accountImageFileList"
                            :on-change="handleAccountImageChange"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>

                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image"
                               v-for="(item,i) in accountImageFileList" :key="i">
                            <el-image :src="item.url"></el-image>
                            <div class="account-xll-image-mask">
                              <span @click="handleAccountImagePreview(item)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleAccountImageRemove(item,i)">
                                <el-icon color="#ffffff" :size="45">
                                  <Delete/>
                                </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>


                      </el-form-item>
                    </el-col>


                  </el-row>

                </div>
              </div>

            </el-form>

          </el-scrollbar>

        </div>
      </el-scrollbar>

    </div>

    <el-dialog width="50%" v-model="dialogSingleImageVisible" center>
      <el-image :src="dialogSingleImageUrl"></el-image>
    </el-dialog>

    <el-dialog width="50%" v-model="dialogVideoVisible" center>
      <video :src="dialogVideoUrl" controls></video>
    </el-dialog>

    <el-dialog width="50%" v-model="dialogAccountImageVisible" center>
      <el-image :src="dialogAccountImageUrl"></el-image>
    </el-dialog>


    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUploadProfile()"></xllLoading>

  </div>
</template>

<script>
import xllLoading from "@/components/xllLoading"
import ImageCompressor from 'compressorjs'

import {phoneCodeData} from "@/utils/phoneCode";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import meSideMenu from "@/components/meSideMenu";
// import profileTitle from "@/components/profileTitle";

import {
  ZOHO_SYNC,
  GET_COUNTRY_LIST,
  RECRUITER_COMPANY_EDIT_V2,
  SWITCH_IDENTITY_V2,
  USER_INFO_BY_TOKEN_V2,
  UPLOAD_BY_ALI_OSS,
  UPLOAD_BY_SERVICE,
  USER_MENU_LIST,
  USER_SUB_IDENTITY_V2,
  ADD_USER_IMG_V2, RECRUITER_PERCENTAGE_V2, UPLOAD_BY_SERVICE_MORE
} from '@/api/api'
import {countriesData} from "@/utils/data";
import {encode ,decode} from "js-base64";
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "recruiter",
  components: {
    meSideMenu,
    xllLoading
  },
  setup() {
    const birthdayDisabledDate = (date) => {
      let myDate = new Date();
      return date.getTime() >= myDate.getTime();
    }
    return {
      birthdayDisabledDate
    }
  },
  data() {
    return {
      dialogAccountImageUrl: '',
      dialogAccountImageVisible: false,
      accountImageFileList: [],
      companyInfo: {},
      countryInfo: '',
      haveLocationStatus: false,
      showLocationCancelStatus: false,
      uploadLoadingStatus: false,
      sideMenuStatus: true,
      submitLoadingValue: false,
      submitAndViewLoadingValue:false,
      phoneCodeData: phoneCodeData,
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      profilePhotoUrl: '',
      logoPhotoUrl: '',
      licensePhotoUrl: '',
      introVideoUrl: '',
      backgroundPhotoUrl: '',
      businessRegPhotoUrl: '',
      dialogSingleImageVisible: false,
      dialogSingleImageUrl: '',
      dialogVideoUrl: '',
      dialogVideoVisible: false,

      mapCenterValue:[-99.91028767893485, 32.082955230919616],
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      basicForm: {
        company_contact_id: '',
        company_name: '',
        license: '',
        logo: '',
        category_id: '',
        desc: '',
        pid: '',
        work_phone: '',
        country_info: '',
        country_id: '',
        state_id: '',
        town_id: '',
        address: '',
        lat: '',
        lng: '',
        country_code: '+86',
        video_url: '',
        year_founded: '',
        work_email: '',
        category_name_en: '',
        category_name_cn: '',
        profile_photo: '',
        business_reg_img: '',
        background_image: ''

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
        ],
        category_id: [
          {
            required: true,
            message: "Edu-Business Categories (Choose 1) ",
            trigger: 'change',
          },
        ],


      },
      nationalityOptions: countriesData,
      countryObj: {},
      provinceObj: {},
      cityObj: {},
      districtObj: {},
      countryName: '',
      countryNameCn: '',
      provinceName: '',
      provinceNameCn: '',
      cityName: '',
      cityNameCn: '',
      districtName: '',
      districtNameCn: '',

      countryOptions: [],
      provinceOptions: [],
      cityOptions: [],
      districtOptions: [],
      subCateOptions: [],
      selectBusinessTypeList: [],
      selectEducatorTypeList: [],
      businessInfo: {},
      sLocationType: 1, //1 国外 2国内

      i: 0,
      id: 0,
      cid: 0,
      action: ''
    }
  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  async mounted() {
    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      updateWindowHeight()
    }

    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        updateWindowHeight()
      }
    }

    await this.getSubIdentityList()

    this.getAllCountry()

    let str = this.$route.query.s;

    if (str) {
      let strObj = JSON.parse(decode(str))

      this.i = strObj.i;
      this.id = strObj.id;
      this.cid = strObj.cid;
      this.action = strObj.action;

      if (strObj.action == 'add') {
        // this.getBasicInfo(strObj.i)
        this.initMap()
      }

      if (strObj.action == 'edit') {
        this.getBasicInfo(strObj.i)
      }

    }

  },
  methods: {
    handleVideoPreview(file) {
      // console.log(file)
      this.dialogVideoUrl = file;
      this.dialogVideoVisible = true

    },
    handleSingleImagePreview(file) {
      this.dialogSingleImageUrl = file
      this.dialogSingleImageVisible = true;
    },
    handleProfilePhotoRemove(){
      this.profilePhotoUrl = ''
      this.basicForm.profile_photo = ''
    },
    handleLicensePhotoRemove(){
      this.licensePhotoUrl = ''
      this.basicForm.license = ''
    },
    handleLogoPhotoRemove(){
      this.logoPhotoUrl = ''
      this.basicForm.logo = ''
    },
    handleVideoUrlRemove(){
      this.introVideoUrl = ''
      this.basicForm.video_url = ''
    },
    handleBackgroundPhotoRemove(){
      this.backgroundPhotoUrl = ''
      this.basicForm.background_image = ''
    },
    changeEditLocation() {
      this.haveLocationStatus = false;
      this.showLocationCancelStatus = true;

      this.countryName = '';
      this.countryNameCn = '';

      this.provinceName = '';
      this.provinceNameCn = '';

      this.cityName = '';
      this.cityNameCn = '';


    },
    changeCancelLocation() {
      this.haveLocationStatus = true;
      this.showLocationCancelStatus = false;

      let companyInfo = this.companyInfo;

      if (companyInfo.country_info) {
        let countryInfoArr = JSON.parse(companyInfo.country_info)
        this.countryName = countryInfoArr.country_name_en;
        this.countryNameCn = countryInfoArr.country_name_cn;
        this.provinceName = countryInfoArr.province_name_en;
        this.provinceNameCn = countryInfoArr.province_name_cn;
        this.cityName = countryInfoArr.city_name_en;
        this.cityNameCn = countryInfoArr.city_name_cn;

        this.basicForm.country_info = companyInfo.country_info;

      }

    },
    async getSubIdentityList() {
      let params = {
        pid: 2,
        tree: 1
      }

      await USER_SUB_IDENTITY_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.subCateOptions = res.message
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }

      })
    },
    cancelUploadProfile() {
      this.uploadLoadingStatus = false;
    },
    businessRegPhotoHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.businessRegPhotoUrl = myFileUrl
                self.basicForm.business_reg_img = myFileUrl

              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.businessRegPhotoUrl = myFileUrl
                self.basicForm.business_reg_img = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
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
    licenseHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.licensePhotoUrl = myFileUrl
                self.basicForm.license = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.licensePhotoUrl = myFileUrl
                self.basicForm.license = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
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
    backgroundHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.backgroundPhotoUrl = myFileUrl
                self.basicForm.background_image = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.backgroundPhotoUrl = myFileUrl
                self.basicForm.background_image = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
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
    profilePhotoHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.profilePhotoUrl = myFileUrl
                self.basicForm.profile_photo = myFileUrl

              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.profilePhotoUrl = myFileUrl
                self.basicForm.profile_photo = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
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
    logoPhotoHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.logoPhotoUrl = myFileUrl
                self.basicForm.logo = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.logoPhotoUrl = myFileUrl
                self.basicForm.logo = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
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
    videoHttpRequest(options) {
      let self = this;

      const formData = new FormData();
      let file = options.file;

      formData.append('token', localStorage.getItem('token'))
      // console.log(file)
      let isInChina = process.env.VUE_APP_CHINA
      if (isInChina === 'yes') {
        formData.append('file[]', file, file.name)
        UPLOAD_BY_ALI_OSS(formData).then(res => {
          // console.log(res)
          if (res.code == 200) {
            let myFileUrl = res.data[0]['file_url'];
            self.uploadLoadingStatus = false;
            self.introVideoUrl = myFileUrl
            self.basicForm.video_url = myFileUrl
          }
        }).catch(err => {
          console.log(err)
        })

      }

      if (isInChina === 'no') {
        formData.append('file', file, file.name)
        UPLOAD_BY_SERVICE(formData).then(res => {
          // console.log(res)
          if (res.code == 200) {
            let myFileUrl = res.message.file_path;
            self.uploadLoadingStatus = false;
            self.introVideoUrl = myFileUrl
            self.basicForm.video_url = myFileUrl
          }
        }).catch(err => {
          console.log(err)
        })

      }


    },
    beforeIntroVideoUpload(file) {
      console.log(file)
      this.uploadLoadingStatus = true;

    },
    inputAddressEvent(e){
      console.log(e)
    },
    initMap() {
      mapboxgl.accessToken = this.accessToken;

      const map = new mapboxgl.Map({
        container: "mapContainer",
        center: this.mapCenterValue,
        style: this.mapStyle,
        zoom: 12
      });
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "top-right");
      map.addControl(new mapboxgl.FullscreenControl());

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      });

      map.addControl(geolocate, "top-right")

      const geocoder = new MapboxGeocoder({
        "accessToken": this.accessToken,
        "language":'en-US',
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
        // this.basicForm.address = e.result.place_name
        this.basicForm.lng = e.result.center[0]
        this.basicForm.lat = e.result.center[1]

      })
      geocoder.on('clear', (e) => {
        console.log(e)
        // this.basicForm.address = ''
        this.basicForm.lng = ''
        this.basicForm.lat = ''
      })

    },
    setPlace(e) {
      console.log(e)
    },
    changeIdentity(companyId, language, typeValue) {
      let params = {
        identity: 2,
        company_id: companyId,
        language: language
      }
      SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          let str = JSON.stringify(res.message)

          localStorage.setItem('menuData',str)
          localStorage.setItem('identity', 2)
          localStorage.setItem('company_id', companyId)

          this.$store.commit('identity', 2)
          this.$store.commit('allIdentityChanged',true )
          this.$store.commit('menuData', res.message)
          this.$store.commit('currentCompanyId', companyId)

          if(typeValue === 1){
            this.skipToAccountHome()
          }

          if(typeValue === 2){
            this.skipToViewProfile(companyId,2)
          }

        }
      }).catch(err => {
        console.log(err)
      })
    },
    cancel(){
      this.$router.push('/account/home')
    },
    updateUserProfilePercentage(){

      let params = {
        token: localStorage.getItem('token')
      }
      RECRUITER_PERCENTAGE_V2(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    skipToViewProfile(companyId,roleValue){
      let userId = localStorage.getItem('uid')
      if(roleValue == 1){
        let obj = {
          cid:companyId,
          uid:userId,
          identity:1
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path:'/educator/profile',query:{str:str}})
      }
      if(roleValue == 2){
        let obj = {
          cid:companyId,
          uid:userId,
          identity:2
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path:'/business/profile',query:{str:str}})
      }
      if(roleValue == 3){
        let obj = {
          cid:companyId,
          uid:userId,
          identity:3
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path:'/business/profile',query:{str:str}})
      }
      if(roleValue == 4){
        let obj = {
          cid:companyId,
          uid:userId,
          identity:4
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path:'/business/profile',query:{str:str}})
      }
      if(roleValue == 5){
        let obj = {
          cid:companyId,
          uid:userId,
          identity:5
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path:'/vendor/profile',query:{str:str}})
      }
    },
    skipToAccountHome(){
      let self = this;
      setTimeout(function (){

        self.submitLoadingValue = false;

        self.$router.push('/account/home')

      },3000)

    },
    submitForm(formName,typeValue) {

      let businessTypeId;
      let businessTypeName;
      let businessTypeNameCn;

      this.selectBusinessTypeList.forEach(item => {
        businessTypeId = item.id;
        businessTypeName = item.identity_name;
        businessTypeNameCn = item.identity_name_cn;
      })
      // console.log(businessTypeName)

      this.basicForm.category_id = businessTypeId;
      this.basicForm.category_name_en = businessTypeName;
      this.basicForm.category_name_cn = businessTypeNameCn;

      let countryObj = {
        country_name_en: this.countryName,
        country_name_cn: this.countryNameCn,
        province_name_en: this.provinceName,
        province_name_cn: this.provinceNameCn,
        city_name_en: this.cityName,
        city_name_cn: this.cityNameCn
      }

      this.basicForm.country_info = JSON.stringify(countryObj)

      let action = this.action;

      this.$refs[formName].validate((valid) => {
        if (valid) {

          if(typeValue === 1){
            this.submitLoadingValue = true;
          }
          if(typeValue === 2){
            this.submitAndViewLoadingValue = true;
          }

          if (action == 'edit') {
            this.basicForm.id = this.cid;
          }
          if (action == 'add') {
            this.basicForm.id = this.cid;
          }
          let params = Object.assign({}, this.basicForm);
          RECRUITER_COMPANY_EDIT_V2(params).then(res => {
            // console.log(res)
            if (res.code == 200) {

              this.$store.commit('username', this.basicForm.company_name)
              this.$store.commit('userAvatar', this.basicForm.logo)

              if (action == 'edit') {
                if (this.accountImageFileList.length > 0) {
                  this.uploadAccountImages(this.cid)
                }
                this.updateUserProfilePercentage()

                if(typeValue === 1){
                  this.skipToAccountHome()
                }

                if(typeValue === 2){
                  this.skipToViewProfile(res.message.recruiting_company_id,2)
                }

              } else {

                if (this.accountImageFileList.length > 0) {
                  this.uploadAccountImages(res.message.recruiting_company_id)
                }

                localStorage.setItem('company_id', res.message.recruiting_company_id)

                this.$store.commit('allIdentityChanged', true)

                // let uid = localStorage.getItem('uid')

                // this.getUserMenuList(uid, 2, res.message.recruiting_company_id, uid)
                this.updateUserProfilePercentage()

                this.changeIdentity(res.message.recruiting_company_id, 2,typeValue)
              }
              // this.submitEduBusinessCompanyForm()

            }
          }).catch(err => {
            console.log(err)
            // this.submitLoadingValue = false;
            // this.$message.error(err.msg)
          })

        } else {
          this.$message.warning('Please complete all required fields')
          console.log('error submit!!')
          return false
        }
      })

    },
    getUserMenuList(uid, identity, companyId, createUid) {

      let params = {
        user_id: uid,
        identity: identity,
        company_id: companyId,
        create_user_id: createUid,
        page: 1,
        limit: 1000
      }

      USER_MENU_LIST(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          let pcAllData = res.message.pc;
          if (pcAllData) {
            let sData = pcAllData.filter(item => item.identity == identity)
            this.$store.commit('menuData', sData)
            localStorage.setItem('menuData', JSON.stringify(sData))
          }

        }

      }).catch(err => {
        console.log(err)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(e) {
      console.log(e)
    },
    getAllCountry() {
      let params = {}
      GET_COUNTRY_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.countryOptions = res.message;
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    getAllProvinces(countryId) {
      let params = {
        country_id: countryId
      }
      GET_COUNTRY_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.provinceOptions = res.message;
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    getAllCitys(countryId, stateId) {
      let params = {
        country_id: countryId,
        state_id: stateId
      }
      GET_COUNTRY_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.cityOptions = res.message;
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    countryChange(e) {
      console.log(e)
      this.basicForm.state_id = undefined
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

      this.getAllCitys(this.basicForm.country_id, e.id)
    },
    cityChange(e) {
      console.log(e)
      this.basicForm.town_id = e.id
      this.cityName = e.name
      this.cityNameCn = e.name
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
    getBasicInfo() {

      let params = {
        identity: 2
      }

      USER_INFO_BY_TOKEN_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          // let userContact = res.message.user_contact;
          // let companyContact = res.message.user_contact.company_contact;
          let recruiterInfo = res.message.user_contact.company;
          this.companyInfo = recruiterInfo;

          if (recruiterInfo.company_name) {
            this.basicForm.company_name = recruiterInfo.company_name;
          }
          if (recruiterInfo.display_name) {
            this.basicForm.display_name = recruiterInfo.display_name;
          }
          if (recruiterInfo.job_title) {
            this.basicForm.job_title = recruiterInfo.job_title;
          }
          if (recruiterInfo.website) {
            this.basicForm.website = recruiterInfo.website;
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

          if(recruiterInfo.lat && recruiterInfo.lng){
            this.mapCenterValue = [recruiterInfo.lng, recruiterInfo.lat]
          }

          this.initMap()

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
          if (recruiterInfo.profile_photo) {
            this.profilePhotoUrl = recruiterInfo.profile_photo;
            this.basicForm.profile_photo = recruiterInfo.profile_photo;
          }

          if (recruiterInfo.background_image && recruiterInfo.background_image != '0') {
            this.backgroundPhotoUrl = recruiterInfo.background_image;
            this.basicForm.background_image = recruiterInfo.background_image;
          }

          if (recruiterInfo.license) {
            this.licensePhotoUrl = recruiterInfo.license;
            this.basicForm.license = recruiterInfo.license;
          }
          if (recruiterInfo.business_reg_img) {
            this.businessRegPhotoUrl = recruiterInfo.business_reg_img;
            this.basicForm.business_reg_img = recruiterInfo.business_reg_img;
          }
          if (recruiterInfo.year_founded) {
            this.basicForm.year_founded = recruiterInfo.year_founded.toString();
          }

          if (recruiterInfo.country_info) {
            this.basicForm.country_info = recruiterInfo.country_info;

            let countryInfoArr = JSON.parse(recruiterInfo.country_info)

            this.countryName = countryInfoArr.country_name_en;
            this.countryNameCn = countryInfoArr.country_name_cn;
            this.provinceName = countryInfoArr.province_name_en;
            this.provinceNameCn = countryInfoArr.province_name_cn;
            this.cityName = countryInfoArr.city_name_en;
            this.cityNameCn = countryInfoArr.city_name_cn;

            this.basicForm.country_info = recruiterInfo.country_info;
            this.countryInfo = recruiterInfo.country_info;

            this.haveLocationStatus = true;
          }

          if (recruiterInfo.country_id) {
            this.basicForm.country_id = recruiterInfo.country_id;
          }
          if (recruiterInfo.state_id) {
            this.basicForm.state_id = recruiterInfo.state_id;
          }
          if (recruiterInfo.town_id) {
            this.basicForm.town_id = recruiterInfo.town_id;
          }

          let typeId = recruiterInfo.category_id;
          let typeNameEn = recruiterInfo.category_name_en;
          let typeName = recruiterInfo.category_name_cn

          let typeObj = {
            id: typeId,
            identity_name: typeNameEn,
            identity_name_cn: typeName
          }

          this.selectBusinessTypeList.push(typeObj)

          if (recruiterInfo.images) {
            console.log(recruiterInfo.images)

            let userImages = recruiterInfo.images
            if (userImages.length > 0) {
              let userImagesArr = []
              userImages.forEach(item => {
                let userImageObj = {
                  name: '',
                  url: item.url
                }
                userImagesArr.push(userImageObj)
              })
              this.accountImageFileList = []
              this.accountImageFileList = userImagesArr
              console.log(this.accountImageFileList)

            }

          }

        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    handleAccountImageRemove(file, i) {
      console.log(file, i)
      this.accountImageFileList.splice(i, 1)

    },
    handleAccountImagePreview(file) {
      // console.log(file)
      this.dialogAccountImageUrl = file.url
      this.dialogAccountImageVisible = true

    },
    beforeAccountImageUpload(file) {
      const isJpeg = file.type === 'image/png' || file.type === 'image/jpg'
      if (!isJpeg) {
        return this.$message.error('Please select the correct file format to upload')
      }
      return isJpeg
    },
    handleAccountImageChange(file, fileList) {
      console.log(file)
      console.log(fileList)
      this.uploadLoadingStatus = true;

      let imgParams = new FormData();
      let token = localStorage.getItem('token')
      imgParams.append('token', token)
      imgParams.append('platform', 4)
      imgParams.append('file[]', file.raw)

      UPLOAD_BY_SERVICE_MORE(imgParams).then(res => {
        console.log(res)
        if (res.code == 200) {
          let imgData = res.message;
          // let imgArr = [];
          imgData.forEach(item => {
            let obj = {
              name: '',
              url: item
            }
            this.accountImageFileList.push(obj)
            this.uploadLoadingStatus = false;
          })
        }

      }).catch(err => {
        this.uploadLoadingStatus = false;
        console.log(err)
      })

    },
    uploadAccountImages(companyId) {
      let oldData = []
      this.accountImageFileList.forEach(file => {
        oldData.push(file.url)
      })

      let params = {
        token: localStorage.getItem('token'),
        identity: 2,
        company_id: companyId,
        img: oldData
      }

      ADD_USER_IMG_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          console.log('account images ----')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },

    accountImagePreview(url) {
      this.dialogAccountImageVisible = true;
      this.dialogAccountImageUrl = url;
    },
    async submitEduBusinessCompanyForm() {

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {
          'SingleLine': params.company_name  // Education Business Name
        },
        {
          'Dropdown2': params.category_name_en  //Education Business Category
        },
        {
          'Dropdown': 'Education Business'  //Company Type
        },
        {
          'Website': params.website  //Education Business Website
        },
        {
          'SingleLine1': params.last_name  // Education Business Contact
        },
        {
          'Number2': ''  //  Company Number
        },
        {
          'SingleLine5': userId  //UserID
        },
        {
          'PhoneNumber_countrycode': params.work_phone  //Education Business Phone
        },
        {
          'Email': ''  // Education Business Email
        },
        {
          'Number': ''   //Number of Employees
        },
        {
          'Number1': ''   //Membership Duration
        },
        {
          'Dropdown1': ''   //Membership Type
        },
        {
          'Address_AddressLine1': ''   //Street Address
        },
        {
          'Address_City': ''   //City
        },
        {
          'Address_Region': ''   //State/Region/Province
        },
        {
          'Address_Country': ''   //Country
        },
        {
          'SingleLine4': ''   //   Business Registration No.
        },
        {
          'MultiLine': ''   //Company Intro
        },
        {
          'SingleLine3': ''   //WeChat ID
        },
        {
          'Number3': ''  //  Number of Branches
        },
        {
          'Number4': ''  //    Number of Students
        },
        {
          'MultipleChoice': ''  //    Students Ages
        },
        {
          'MultiLine1': ''  //     Curriculum Subjects
        },
        {
          'MultiLine2': ''  //     School Facilities
        },
        {
          'Website1': ''  // Business License Link
        },
        {
          'Website2': ''   //Company Logo Link
        },
        {
          'Website3': ''   //Header Image Link
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

.basic-l-container {

}

.basic-r-container {
  width: calc(100% - 160px);
  height: calc(100vh - 140px);
}

.basic-r-container-bg {
  padding: 25px 50px 0 50px;
}


.account-profile-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 25px;
}

.account-profile-t-l {
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;

}

.account-profile-t-r {

}

.account-profile-cancel-btn {
  /*font-size: 20px;*/
}

.account-profile-save-btn {
  /*font-size: 20px;*/
}


.basic-form {
  height: calc(100vh - 230px);
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
  /*border-bottom: 1px dashed #EEEEEE;*/
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
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.tag-active {
  background-color: #6650B3;
  color: #FFFFFF;
}

.basic-breadcrumb-container {
  padding: 10px;
}

.map-container {
  margin-top: 10px;
  width: 100%;
  height: 300px;
  text-align: center;
}

.basemap {
  width: 100%;
  height: 100%;

}

.license-uploader {
  padding: 10px;
  border: 1px dashed #d9d9d9;
  border-radius: 10px;
  text-align: center;
}

.contact-phone-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.contact-phone-l {
  width: 35%;
}

.contact-phone-r {
  width: 60%;
}

.submit-btn-container {
  text-align: center;
  margin-top: 40px;
}

.submit-btn {
  width: 40%;
}

.xll-location-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

}

.xll-location-l {

}

.xll-location-r {
  margin-left: 20px;
}


.account-profile-item-container {
  padding: 50px;
  border-radius: 38px;
  background-color: #ffffff;
  margin-bottom: 50px;

}

.account-profile-item-label {
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}
.account-profile-item-label span{
  font-size: 20px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}
.account-profile-item-c {
  margin-top: 15px;
}

.account-profile-item-c-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.account-profile-item-c-item-1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}


.account-profile-category {
  width: 100%;
}

.account-profile-form-item {
  width: 350px;
  margin-right: 50px;
}

.account-profile-item-textarea {
  width: 100%;
}


.account-profile-item-location {
  width: 60%;
}

.account-profile-item-map {
  width: 40%;
}

/deep/ .el-input--default .el-input__wrapper {
  /*min-width: 350px;*/
}

.upload-photo-img {
  width: 70px;
}

.upload-photo-img-1 {
  width: 100%;
}

.account-location-select {
  margin-top: 15px;
}


.account-xll-images {
  width: 90%;
}

.account-xll-image {
  position: relative;
  margin-top: 10px;

}

.account-xll-image-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: none;

}

.account-xll-image:hover .account-xll-image-mask {
  /*display: inline;*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.account-xll-image-mask span {
  margin-right: 15px;
  cursor: pointer;
}

.account-xll-image-mask:hover {

}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {
    .basic-r-container{
      width: 100%;
      height: calc( var(--i-window-height) - 160px);
    }

  .basic-r-container-bg{
    padding: 15px;
  }

  .account-profile-t{
    padding-bottom: 15px;
  }

  .account-profile-t-l{
    font-size: 20px;
  }

  .account-profile-item-container{
    padding: 15px;
    margin-bottom: 15px;
  }

  .account-profile-item-label{
    font-size: 18px;
  }

  .account-profile-item-label span{
    font-size: 14px;
  }

  .categories-tags{
    padding-bottom: 0px;
  }

  .categories-tags-item{
    font-size: 12px;
    padding: 0 8px;
  }

}

@media screen and (max-width: 360px) {


  .account-profile-t{
    flex-direction: column;
  }
  .account-profile-t-r{
    margin-top: 10px;
  }
}


</style>
