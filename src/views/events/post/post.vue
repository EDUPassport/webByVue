<template>
  <div class="bg">
    <div class="profile-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="jobs-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <h3 class="post-event-label">Post an Event</h3>
          <div class="basic-form">
            <el-form
                ref="basicForm"
                :model="basicForm"
                :rules="basicRules"
                label-width="120px"
                label-position="top"
                class="demo-ruleForm"
            >
              <div class="post-event-detail-container">

                <h4>Event Details</h4>
                <div class="post-event-underline"></div>
                <el-form-item label="Event Type" prop="is_all">
                  <el-radio v-model="basicForm.is_all" label="1" size="large">Social</el-radio>
                  <el-radio v-model="basicForm.is_all" label="2" size="large">Professional</el-radio>
                </el-form-item>
                <el-form-item label="Event Location">

                  <el-tabs class="deals-tabs-container"
                           type="border-card"
                           @tab-click="dealLocationTypeChange"
                           v-model="dealLocationTypeValue">
                    <el-tab-pane label="Online" name="1">
                      <el-form-item label="Event Link">
                        <el-input v-model="basicForm.online_url" placeholder="Please input event link"></el-input>
                      </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="Offline" name="2">

                      <div class="deals-location-select-container">
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
                                     @change="cityChange"
                                     placeholder="Select City">
                            <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.name"
                                       :value="item"></el-option>
                          </el-select>
                        </template>

                      </div>

                      <div class="map-container"
                           v-loading="mapLoading"
                           v-if="dealLocationTypeValue == 2">
                        <div id="mapContainer" class="basemap"></div>
                      </div>

                    </el-tab-pane>
                    <el-tab-pane label="Both" name="3">
                      <el-form-item label="Event Link">
                        <el-input v-model="basicForm.online_url" placeholder="Please input event link"></el-input>
                      </el-form-item>
                      <div class="deals-location-select-container">
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
                                     @change="cityChange"
                                     placeholder="Select City">
                            <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.name"
                                       :value="item"></el-option>
                          </el-select>
                        </template>

                      </div>

                      <div class="map-container"
                           v-loading="map1Loading"
                           v-if="dealLocationTypeValue == 3">
                        <div id="mapContainer1" class="basemap"></div>
                      </div>

                    </el-tab-pane>
                  </el-tabs>

                </el-form-item>

                <el-form-item label="ESL Passport Members Get" prop="type_desc">
                  <el-input v-model="basicForm.type_desc" type="textarea"
                            placeholder="Enter the deal/discount you will offer our members."></el-input>
                </el-form-item>

                <el-form-item label="Category" prop="category_id">
                  <el-select v-model="basicForm.category_id"
                             placeholder="Choose a category"
                             size="large">
                    <el-option
                        v-for="item in categoryData"
                        :key="item.id"
                        :label="item.name_en"
                        :value="item.id"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="Venue" prop="event_place">
                  <el-input v-model="basicForm.event_place" type="text"
                            placeholder="Enter the Venue"
                  ></el-input>
                </el-form-item>
                <el-form-item label="Event Ticket Price" prop="pay_money">
                  <el-input v-model="basicForm.pay_money" placeholder="Please enter event ticket price"></el-input>
                </el-form-item>
                <el-form-item label="Currency">

                  <div class="object-tags-container">
                    <div class="object-tags">
                      <div class="object-tags-item"
                           :class=" selectCurrencyList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                           v-for="(item,index) in currencyList" :key="index"
                           @click="selectCurrency(item)">
                        {{ item.object_en }}
                      </div>
                    </div>
                    <div class="object-tags">
                      <div class="object-tags-item"
                           :class=" selectCurrencyList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                           v-for="(item,index) in ownCurrencyList" :key="index"
                           @click="selectCurrency(item)">
                        {{ item.object_en }}
                      </div>
                    </div>
                    <div class="object-tags">
                      <div class="object-tags-item" v-if="addCurrencyStatus==false"
                           @click="addCurrencyStatus=true">Add+
                      </div>
                    </div>

                    <div class="object-tags-add">
                      <div class="object-tags-item-add" v-if="addCurrencyStatus">
                        <el-input type="text" v-model="ownCurrencyValue"
                                  placeholder="Add your currency"></el-input>
                        <div class="object-tags-item-btn-container">
                          <el-button class="object-tags-item-btn" type="primary"
                                     v-if="ownCurrencyValue.length>0"
                                     @click="addOwnCurrency">Confirm
                          </el-button>
                          <el-button class="object-tags-item-btn" type="primary"
                                     v-if="ownCurrencyValue.length==0"
                                     @click="addCurrencyStatus=false">Cancel
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </div>

                </el-form-item>

              </div>

              <div class="post-event-info-container">
                <h4>General Event Info</h4>
                <div class="post-event-underline"></div>
                <el-form-item label="Event Name" prop="name">
                  <el-input v-model="basicForm.name" placeholder="Please enter you event name"></el-input>
                </el-form-item>
                <el-form-item label="Event Date" required prop="date">
                  <div class="event-date-container">
                    <div class="event-date">
                      <el-date-picker
                          v-model="basicForm.date"
                          @change="eventDateChange"
                          type="date"
                          :disabledDate="eventDisabledDate"
                          placeholder="Pick a day"
                          value-format="YYYY-MM-DD"
                      ></el-date-picker>
                    </div>
                    <div class="event-time">
                      <el-time-select
                          @change="startTimeChange"
                          v-model="startTime"
                          :max-time="endTime"
                          placeholder="Start time"
                          start="00:00"
                          step="00:01"
                          end="23:59"
                      />
                      <el-time-select
                          @change="endTimeChange"
                          v-model="endTime"
                          :min-time="startTime"
                          placeholder="End time"
                          start="00:00"
                          step="00:01"
                          end="23:59"
                      />
                    </div>
                  </div>

                </el-form-item>

                <el-form-item label="Tags" >
                  <div class="tags-tips">
                    Tags help people search for and discover you more easily. Add tags to improve your chances of discovery.
                  </div>
                  <div class="object-tags-container" >
                    <div class="object-tags">
                      <div class="object-tags-item"
                           :class=" selectTagsList.indexOf(item.id) == -1 ? '' : 'tags-active' "
                           v-for="(item,index) in tagsData" :key="index"
                           @click="selectTagA(item)">
                        {{ item.name_en }}
                      </div>
                    </div>
                    <div class="object-tags">
                      <div class="object-tags-item"
                           :class=" selectTagsList.indexOf(item) == -1 ? '' : 'tags-active' "
                           v-for="(item,index) in ownTagsList" :key="index" @click="selectTag(item)">
                        {{ item }}
                      </div>
                    </div>
                    <div class="object-tags">
                      <div class="object-tags-item" v-if="addTagsStatus==false"
                           @click="addTagsStatus=true">Add+
                      </div>
                    </div>

                    <div class="object-tags-add">
                      <div class="object-tags-item-add" v-if="addTagsStatus">
                        <el-input type="text" v-model="ownTagsValue"
                                  placeholder="Add tag"></el-input>
                        <div class="object-tags-item-btn-container">
                          <el-button class="object-tags-item-btn" type="primary"
                                     v-if="ownTagsValue.length>0"
                                     @click="addOwnTag">Confirm
                          </el-button>
                          <el-button class="object-tags-item-btn" type="primary"
                                     v-if="ownTagsValue.length==0"
                                     @click="addTagsStatus=false">Cancel
                          </el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-form-item>


                <el-form-item label="Event Description" prop="desc">
                  <el-input v-model="basicForm.desc" type="textarea"
                            placeholder="Enter event description."></el-input>
                </el-form-item>
                <el-form-item label="Event Flyer(jpg,png)" prop="file">
                  <el-upload
                      class="profile-uploader"
                      action=""
                      :headers="uploadHeaders"
                      :show-file-list="false"
                      :http-request="flyerHttpRequest"
                      :before-upload="beforeFlyerPhotoUpload"
                  >
                    <el-image v-if="flyerPhotoUrl" :src="flyerPhotoUrl" class="profile-avatar"></el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </el-form-item>

                <el-form-item label="Company Logo(jpg,png)" prop="third_company_logo">
                  <el-upload
                      class="profile-uploader"
                      action=""
                      :headers="uploadHeaders"
                      :show-file-list="false"
                      :http-request="companyLogoHttpRequest"
                      :before-upload="beforeCompanyLogoPhotoUpload"
                  >
                    <el-image v-if="companyLogoPhotoUrl" :src="companyLogoPhotoUrl" class="profile-avatar"></el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </el-form-item>

                <el-form-item label="Company Name" prop="third_company_name">
                  <el-input v-model="basicForm.third_company_name" type="text"
                            placeholder="Please input company name"
                  ></el-input>
                </el-form-item>

              </div>

            </el-form>

            <div class="xll-submit-container">
              <el-button type="primary" @click="submitForm('basicForm')">
                Submit
              </el-button>

            </div>

          </div>

        </el-col>
      </el-row>
    </div>

    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUpload()"></xllLoading>

  </div>
</template>

<script>
import xllLoading from '@/components/xllLoading'
import meSideMenu from "@/components/meSideMenu";
import {
  EVENTS_ADD_EVENT,
  EVENTS_CATEGORY,
  EVENTS_TAGS,
  TAG_IS_EXISTS,
  ZOHO_SYNC, UPLOAD_BY_ALI_OSS, UPLOAD_BY_SERVICE, GET_COUNTRY_LIST, USER_OBJECT_LIST
} from '@/api/api';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import ImageCompressor from 'compressorjs'

export default {
  name: "post",
  components: {
    meSideMenu,
    xllLoading
  },
  setup(){
    const eventDisabledDate = (date)=>{
      let myDate = new Date();
      let year = myDate.getFullYear()
      let month = myDate.getMonth()  + 1
      let day = myDate.getDate()
      let mTime = year + '-' + month + '-' + day;
      let mDate = new Date(mTime)
      return date.getTime() < mDate.getTime();
    }

    return {
      eventDisabledDate
    }
  },
  data() {

    const checkEventDate = (rule,value,callback) =>{
      console.log(value)
      if(!value){
        return callback(new Error('Please select date'))
      }
      if(!this.startTime){
        return callback(new Error('Please select start time'))
      }
      if(!this.endTime){
        return callback(new Error('Please select end time'))
      }
      callback()
    }

    return {
      currencyList: [],
      addCurrencyStatus: false,
      ownCurrencyValue: '',
      ownCurrencyList: [],
      selectCurrencyList: [],
      selectCurrencyArr: [],

      uploadLoadingStatus:false,
      mapLoading:false,
      map1Loading:false,
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      flyerPhotoUrl:'',
      companyLogoPhotoUrl:'',
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      dealLocationTypeValue:"1",
      userInfo: {},
      basicUserInfo: {},

      sLocationType:1, //1 国外 2国内
      countryObj:{},
      provinceObj:{},
      cityObj:{},
      countryName:'',
      countryNameCn:'',
      provinceName:'',
      provinceNameCn:'',
      cityName:'',
      cityNameCn:'',

      countryOptions:[],
      provinceOptions: [],
      cityOptions: [],

      startTime:'',
      endTime:'',
      eventDate:'',
      basicForm: {
        token: localStorage.getItem('token'),
        user_id: localStorage.getItem('uid'),
        name: undefined,
        desc: undefined,
        third_company_logo:undefined,
        third_company_name:undefined,
        type_desc: undefined,
        pay_money: undefined,
        date: undefined,
        file: undefined,
        file_name:undefined,
        is_all: '1',
        event_place:undefined,
        start_time: undefined,
        end_time: undefined,
        is_online: 1,
        online_url:undefined,
        location:undefined,
        country_id:undefined,
        state_id:undefined,
        town_id:undefined,

        lat:undefined,
        lng:undefined,
        category_id:undefined,
        currency: '',
        tag:[],
        tags_cn:'',
        tags_en:''
      },
      basicRules: {
        name: [
          {
            required: true,
            message: 'Please input',
            trigger: 'blur',
          }
        ],
        desc: [
          {
            required: true,
            message: 'Please input',
            trigger: 'blur',
          },
        ],
        date: [
          {
            required: true,
            validator:checkEventDate,
            trigger: 'blur',
          },
        ],
        file: [
          {
            required: true,
            message: 'Please upload',
            trigger: 'blur',
          },
        ],
        third_company_logo: [
          {
            required: false,
            message: 'Please upload',
            trigger: 'blur',
          },
        ],
        third_company_name: [
          {
            required: false,
            message: 'Please input',
            trigger: 'blur',
          },
        ],

      },
      categoryData:[],
      tagsData:[],
      addTagsStatus: false,
      ownTagsValue: '',
      ownTagsList: [],
      selectTagsList: [],
      selectTagsArr: [],
      tagsCnData:[],
      tagsEnData:[],

    }
  },
  mounted() {
    this.getAllCountry()
    this.getUserObjectList()
    this.getEventCategories()
    this.getEventsTags()
  },
  methods: {
    companyLogoHttpRequest(options){
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
                self.companyLogoPhotoUrl = myFileUrl
                self.basicForm.third_company_logo = myFileUrl

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
                self.companyLogoPhotoUrl = myFileUrl
                self.basicForm.third_company_logo = myFileUrl
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
    flyerHttpRequest(options){
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
                self.flyerPhotoUrl = myFileUrl
                self.basicForm.file = myFileUrl

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
                self.flyerPhotoUrl = myFileUrl
                self.basicForm.file = myFileUrl
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
    addOwnTag() {
      this.addTagsStatus = false;
      let token = localStorage.getItem('token');
      let existData = {
        token:token,
        tag_name:this.ownTagsValue
      }
      TAG_IS_EXISTS(existData).then(res=>{
        console.log(res)
        if(res.code == 200){
          if(res.message == 0){
            let ownIndex = this.ownTagsList.indexOf(this.ownTagsValue);
            if(ownIndex == -1){
              this.ownTagsList.push(this.ownTagsValue);
            }
            let index = this.selectTagsList.indexOf(this.ownTagsValue);

            if (index == -1) {
              // this.selectTagsList.splice(index, 1, obj);
              this.selectTagsList.push(this.ownTagsValue)
              this.tagsCnData.push(this.ownTagsValue);
              this.tagsEnData.push(this.ownTagsValue);
            } else {
              this.selectTagsList.splice(index, 1);
              this.tagsCnData.splice(index,1);
              this.tagsEnData.splice(index,1);
            }

            this.ownTagsValue = '';

          }

        }

      })

    },
    selectTagA(item){
      let index = this.selectTagsList.indexOf(item.id);

      if (index == -1) {
        this.selectTagsList.push(item.id)
        this.tagsCnData.push(item.name_cn);
        this.tagsEnData.push(item.name_en);

      } else {
        this.selectTagsList.splice(index, 1);
        this.tagsCnData.splice(index,1);
        this.tagsEnData.splice(index,1);
      }

    },
    getEventsTags(){
      let params = {
        page: 1,
        limit: 10000,
        type:2
      }
      EVENTS_TAGS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tagsData = res.message.data;
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getEventCategories(){
      let params = {
        page: 1,
        limit: 10000
      }
      EVENTS_CATEGORY(params).then(res=>{
        this.categoryData = res.message.data;
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    dealLocationTypeChange(e){
      console.log(e.paneName)
      let self =this

      self.basicForm.is_online = e.paneName

      if(e.paneName == 2){
        this.mapLoading=true
        setTimeout(function () {
          self.initMap()
          self.mapLoading=false
        },1000)
      }

      if(e.paneName== 3){
        this.map1Loading=true
        setTimeout(function () {
          self.initMap1()
          self.map1Loading=false
        },1000)

      }
    },
    beforeFlyerPhotoUpload(file) {
      // this.$loading({
      //   text:'Uploading...'
      // })
      this.uploadLoadingStatus = true;
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    beforeCompanyLogoPhotoUpload(file){
      this.uploadLoadingStatus = true;
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    cancelUpload(){
      this.uploadLoadingStatus = false;
    },
    eventDateChange(e){
      // console.log(e)
      this.eventDate = e;
    },
    startTimeChange(e){
      console.log(e)
      this.startTime = e;
      let a = e + ':00'
      console.log(a)
      let startTime = this.eventDate + ' ' + a
      console.log(startTime)
    },
    endTimeChange(e){
      console.log(e)
      this.endTime = e;
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
      // marker.on('dragend',(e)=>{
      //   console.log(e)
      // })
      geocoder.on('result', (e) => {
        console.log(e)
        marker.setLngLat(e.result.center).addTo(map)
        this.basicForm.location = e.result.place_name
        this.basicForm.lng = e.result.center[0]
        this.basicForm.lat = e.result.center[1]

      })
      geocoder.on('clear', (e) => {
        console.log(e)
        this.basicForm.location =''
        this.basicForm.lng = ''
        this.basicForm.lat = ''
      })

    },
    initMap1() {
      mapboxgl.accessToken = this.accessToken;

      const map = new mapboxgl.Map({
        container: "mapContainer1",
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
      // marker.on('dragend',(e)=>{
      //   console.log(e)
      // })
      geocoder.on('result', (e) => {
        console.log(e)
        marker.setLngLat(e.result.center).addTo(map)
        this.basicForm.location = e.result.place_name
        this.basicForm.lng = e.result.center[0]
        this.basicForm.lat = e.result.center[1]

      })
      geocoder.on('clear', (e) => {
        console.log(e)
        this.basicForm.location =''
        this.basicForm.lng = ''
        this.basicForm.lat = ''
      })

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

      this.getAllCitys(this.basicForm.country_id,e.id)
    },
    cityChange(e) {
      console.log(e)
      this.basicForm.town_id = e.id
      this.cityName = e.name
      this.cityNameCn = e.name
    },
    addOwnCurrency() {
      this.addCurrencyStatus = false;
      let obj = {
        id: 0,
        object_en: this.ownCurrencyValue,
        object_pid: 117,
      }
      this.ownCurrencyList.push(obj);
      this.ownCurrencyValue = '';
      let index = this.selectCurrencyList.findIndex((element) => element === obj);
      if (index == -1) {
        this.selectCurrencyList.splice(index, 1, obj)
      } else {
        this.selectCurrencyList.splice(index, 1);
      }
    },
    selectCurrency(value) {
      let index = this.selectCurrencyList.findIndex((element) => element === value);
      if (index == -1) {
        this.selectCurrencyList.splice(index, 1, value)
      } else {
        this.selectCurrencyList.splice(index, 1);
      }
      // console.log(this.selectCurrencyList);
    },
    getUserObjectList() {
      let data = {
        token: localStorage.getItem('token')
      }
      USER_OBJECT_LIST(data).then(res => {
        if (res.code == 200) {
          this.currencyList = res.message.filter(item => item.pid === 117); // currency
        }
      }).catch(err => {
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.basicForm)
          // console.log(this.selectCurrencyList)
          this.basicForm.tag = this.selectTagsList;
          this.basicForm.tags_cn = this.tagsCnData.join(',');
          this.basicForm.tags_en = this.tagsEnData.join(',');

          if(this.eventDate){
            this.basicForm.date = this.eventDate
          }

          if(this.eventDate && this.startTime){
            this.basicForm.start_time = this.eventDate + ' ' + this.startTime + ':00'
          }

          if(this.eventDate && this.endTime){
            this.basicForm.end_time = this.eventDate + ' ' + this.endTime + ':00'
          }

          if (this.selectCurrencyList.length > 0) {
            let currency = this.selectCurrencyList;
            this.basicForm.currency = currency[0].object_en;
          } else {
            this.basicForm.currency = '';
          }

          let countryObj = {
            country_name_en:this.countryName,
            country_name_cn:this.countryNameCn,
            province_name_en:this.provinceName,
            province_name_cn:this.provinceNameCn,
            city_name_en:this.cityName,
            city_name_cn:this.cityNameCn
          }

          this.basicForm.country_info = JSON.stringify(countryObj)

          this.$loading({
            text:'Loading...'
          })

          let params = Object.assign({}, this.basicForm);
          EVENTS_ADD_EVENT(params).then(res => {
            console.log(res)
            if(res.code == 200){
              // this.submitEventForm()
              this.$loading().close()

              this.$router.push('/events/myEvents')
            }
          }).catch(err=>{
            console.log(err)
            this.$message.error(err.msg)
            this.$loading().close()
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async submitEventForm(){

      let params = Object.assign({}, this.basicForm)

      let startTimeStr = this.eventDate + ' ' + this.startTime + ':00';
      let endTimeStr = this.eventDate + ' ' + this.endTime + ':00'

      let startTimeDate = new Date(startTimeStr)
      let startHours = startTimeDate.getHours();
      let startMinutes = startTimeDate.getMinutes();
      let startTimeampm = startHours >= 12 ? 'PM' : 'AM';
      startHours = startHours % 12;
      startHours = startHours ? startHours : 12;
      startHours = startHours.toString().padStart(2,'0')
      startMinutes = startMinutes.toString().padStart(2, '0');

      let endTimeDate = new Date(endTimeStr)
      let endHours = endTimeDate.getHours();
      let endMinutes = endTimeDate.getMinutes();
      let endTimeampm = endHours >= 12 ? 'PM' : 'AM';
      endHours = endHours % 12;
      endHours = endHours ? endHours : 12;
      endHours = endHours.toString().padStart(2,'0');
      endMinutes = endMinutes.toString().padStart(2, '0');


      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {'SingleLine': params.name  //event name//
        },
        {'Dropdown2': params.category_id     // event category
        },
        {'SingleLine1':  params.pay_money  //  event price
        },
        {'SingleLine3': ''  //  event contact
        },
        {'SingleLine4': ''  //   Organizing Company
        },
        {'Dropdown': params.tags_en  //   event tags
        },
        {'Date': this.eventDate //   event date
        },
        {'Time_hours': startHours  //   event start time
        },
        {'Time_minutes': startMinutes  //   event start time
        },
        {'Time_meridiem': startTimeampm  //   am pm
        },
        {'Time1_hours': endHours  //  event end time
        },
        {'Time1_minutes': endMinutes  //   event end time
        },
        {'Time1_meridiem': endTimeampm  //  am pm
        },
        {'Email':  localStorage.getItem('email')    //  contact email
        },
        {'SingleLine6': params.event_place //  event venue
        },
        {'SingleLine7': params.location  //  event street address
        },
        {'Website': params.file  //  poster url
        },
        {'Dropdown1': ''  //   event post status
        },
        {'MultiLine': params.desc //  event description
        },
        {'MultiLine1': params.type_desc  //  deals for memebers
        },
      ]

      let zohoParams = {
        zoho_data:zohoData,
        zoho_url:'https://forms.zohopublic.com/edupassport/form/PostEventform/formperma/Far3vsluPJX_E1n27v0883C-insXpT_m6rJsJz-L5r8/htmlRecords/submit'
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

.profile-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.jobs-r-container{
  padding: 0 20px;
}
.post-event-label{
  margin-top:20px;
}
.basic-form{
  margin-top:20px;
}

.post-event-detail-container{
  background-color:#FFFFFF;
  padding:20px;
  border-radius:10px;
}
.post-event-info-container{
  margin-top:20px;
  background-color:#FFFFFF;
  padding:20px;
  border-radius:10px;
}

.post-event-underline{
  width:40px;
  height:2px;
  background-color: #f64c98;
  margin-top:4px;
}

.event-date-container{
  display:flex;
  flex-direction: row;
  align-items:center;
  justify-content: flex-start;
}
.event-date{

}
.event-time{
  margin-left:10px;
}
.deals-tabs-container{
  border-radius: 10px;
  overflow:hidden;
}

.deals-location-select-container{
  text-align: left;
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

.deals-tips{
  text-align: left;
  font-size: 12px;
  color: #808080;
}


.xll-submit-container{
  text-align: center;
  margin-top:20px;
}


.object-tags-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}

.object-tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

}

.object-tags-item {
  background-color: rgba(0, 179, 210, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  margin: 10px;
  font-size: 14px;
  cursor: pointer;
}

.object-tags-add {
  width: 100%;
  margin-top: 10px;
}

.object-tags-item-add {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}


.tags-active {
  background-color: #00CE47;
  color: #FFFFFF;
}
</style>