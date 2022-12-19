<template>
  <div class="bg">
    <div class="profile-container">

      <div class="profile-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <div class="profile-r-container">

        <div class="new-deal-t">
          <div class="new-deal-t-l">New deal</div>
          <div class="new-deal-t-r">

            <el-button class="new-deal-btn" link round @click="discard()">
              DISCARD
            </el-button>
            <!--              <el-button class="new-deal-btn" plain round>-->
            <!--                SAVE AS DRAFT-->
            <!--              </el-button>-->
            <el-button class="new-deal-btn" type="primary" round
                       :loading="submitLoadingValue"
                       @click="submitForm('basicForm')">
              SUBMIT
            </el-button>
          </div>
        </div>

        <el-scrollbar class="profile-r-bg-container">

          <div class="basic-form">
            <div class="basic-form-label">
              Deal information
            </div>
            <el-form
                ref="basicForm"
                :model="basicForm"
                :rules="basicRules"
                label-width="120px"
                label-position="top"
                class="deals-form"
            >
              <el-row :gutter="50">
                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                  <el-form-item label="Deal Name" prop="title">
                    <el-input v-model="basicForm.title" placeholder="eg. 10% off your first class."></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                  <el-form-item label="Deal Description" prop="desc">
                    <el-input v-model="basicForm.desc" type="textarea"
                              :rows="4"
                              placeholder="Provide a paragraph or two about the deal and how to redeem it.">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="50">

                <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                  <el-form-item label="Tags" >
                    <div class="tags-tips">
                      Tags will help find your deal easier
                    </div>
                    <template v-if="editDealStatus">
                      <div class="tags-current-container">
                        {{basicForm.tags_en}}
                      </div>
                    </template>
                    <div class="object-tags-add">
                      <div class="object-tags-item-add">
                        <el-input type="text"
                                  v-model="ownTagsValue"
                                  placeholder='Click "add" after each entry '>
                        </el-input>
                        <div class="object-tags-item-btn-container">
                          <el-button class="object-tags-item-btn"
                                     type="primary"
                                     link
                                     :disabled="!ownTagsValue"
                                     @click="addOwnTag">
                            ADD
                          </el-button>
                        </div>
                      </div>
                    </div>

                    <div class="object-tags-container">

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
                             :class=" selectOwnTagsList.indexOf(item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownTagsList" :key="index"
                             @click="selectTagB(item)">
                          {{ item }}
                        </div>
                      </div>

                    </div>

                  </el-form-item>

                </el-col>

                <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">

                  <el-form-item  label="Deal Location">

                    <div class="deals-location-bg">
                      <div class="deals-tabs-container">
                        <div class="deals-tabs-l"
                             :class="dealLocationType === 1 ? 'tags-active' : '' "
                             @click="changeDealLocationType(1)">
                          ONLINE
                        </div>
                        <div class="deals-tabs-m"
                             :class="dealLocationType === 2 ? 'tags-active' : '' "
                             @click="changeDealLocationType(2)">
                          OFFLINE
                        </div>
                        <div class="deals-tabs-r"
                             :class="dealLocationType === 3 ? 'tags-active' : '' "
                             @click="changeDealLocationType(3)">
                          BOTH
                        </div>
                      </div>

                      <div class="deal-location-current-container" v-if="editDealStatus">
                        {{basicForm.location}}
                      </div>

                      <template v-if="dealLocationType === 1">

                        <div class="deals-location-container">
                          <div class="deals-tips">
                            This deal is only available online
                          </div>
                        </div>

                      </template>
                      <template v-if="dealLocationType === 2">

                        <div class="deals-location-container">
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
                               v-loading="mapLoading">
                            <div id="mapContainer" class="basemap"></div>
                          </div>

                        </div>
                      </template>

                      <template v-if="dealLocationType === 3">

                        <div class="deals-location-container">
                          <div class="deals-tips">
                            This deal is available online and at the location below
                          </div>
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
                               v-loading="map1Loading">
                            <div id="mapContainer1" class="basemap"></div>
                          </div>

                        </div>
                      </template>

                    </div>



                  </el-form-item>

                </el-col>
              </el-row>


            </el-form>

          </div>

        </el-scrollbar>

      </div>

    </div>

    <submitMessage :title="dealSuccessTitle"
                   :description="dealSuccessDesc"
                   @close="submitDealSuccess"
                   :visible="dealSuccessVisible">
    </submitMessage>

  </div>
</template>

<script>

import meSideMenu from "@/components/meSideMenu";
import {TAG_LIST, TAG_IS_EXISTS, ADD_DEALS, GET_COUNTRY_LIST, DEALS_DEAL_DETAIL} from '@/api/api';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import submitMessage from "@/components/popup/submitMessage";
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "jobs",
  components: {
    meSideMenu,
    submitMessage
  },
  data() {
    return {
      submitLoadingValue:false,
      mapLoading:false,
      map1Loading:false,
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      dealLocationTypeValue:"1",
      userInfo: {},
      basicUserInfo: {},
      tagsData:[],
      addTagsStatus: false,
      ownTagsValue: '',
      ownTagsList: [],
      selectTagsList: [],
      selectOwnTagsList:[],
      selectTagsArr: [],
      tagsCnData:[],
      tagsEnData:[],

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

      basicForm: {
        token: localStorage.getItem('token'),
        user_id: localStorage.getItem('uid'),
        deal_id:'',
        title: '',
        desc: '',
        tag:'',
        is_online: 0,
        location:'',
        country_id:'',
        state_id:'',
        town_id:'',
        lng:'',
        lat:'',
        tags_cn:'',
        tags_en:''
      },
      basicRules: {
        title: [
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
        ]

      },

      dealLocationType: 1,
      editDealStatus:false,

      dealSuccessTitle:'',
      dealSuccessDesc:'',
      dealSuccessVisible:false

    }
  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  mounted() {

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


    this.getTagsList()
    this.getAllCountry()

    let dealId = this.$route.query.deal_id
    if(dealId){
      this.basicForm.deal_id = dealId
      this.getDealDetail(dealId)
      this.editDealStatus = true;

    }

  },
  methods: {
    getDealDetail(id){
      let self =this

      let params = {
        deal_id:id
      }
      DEALS_DEAL_DETAIL(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          let resMessage = res.message;
          this.basicForm.title = resMessage.title
          this.basicForm.desc = resMessage.desc
          this.basicForm.tags_cn = resMessage.tags_cn
          this.basicForm.tags_en = resMessage.tags_en
          this.basicForm.is_online = resMessage.is_online
          this.dealLocationType = resMessage.is_online
          this.basicForm.location = resMessage.location

          if(resMessage.is_online == 2){
            this.mapLoading=true
            setTimeout(function () {
              self.initMap()
              self.mapLoading=false
            },1000)
          }

          if(resMessage.is_online == 3){
            this.map1Loading=true
            setTimeout(function () {
              self.initMap1()
              self.map1Loading=false
            },1000)

          }

          // tags 返回的数据和tagslist里面的数据的id不一致
          // let tags = resMessage.tags;
          // let tagsData = []
          // tags.forEach(item=>{
          //   tagsData.push(item.id)
          // })
          // this.selectTagsList = tagsData

        }
      }).catch(err=>{
        console.log(err)
      })
    },
    changeDealLocationType(value){
      this.dealLocationType = value
      let self =this

      if(value == 2){
        this.mapLoading=true
        setTimeout(function () {
          self.initMap()
          self.mapLoading=false
        },1000)
      }

      if(value == 3){
        this.map1Loading=true
        setTimeout(function () {
          self.initMap1()
          self.map1Loading=false
        },1000)

      }
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

      this.basicForm.state = e.id
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
    getTagsList(){
      let data = {
        page:1,
        limit:1000
      }
      TAG_LIST(data).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.tagsData = res.message.data;
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
              this.selectOwnTagsList.push(this.ownTagsValue);
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
    selectTagB(item){
      let index = this.selectOwnTagsList.indexOf(item);

      if (index == -1) {
        // this.selectTagsArr.push(item.id)
        this.tagsCnData.push(item);
        this.tagsEnData.push(item);

      } else {
        // this.selectTagsArr.splice(index, 1);
        this.tagsCnData.splice(index,1);
        this.tagsEnData.splice(index,1);
      }

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.basicForm.tag = this.selectTagsList;
          this.basicForm.tags_cn = this.tagsCnData.join(',');
          this.basicForm.tags_en = this.tagsEnData.join(',');
          this.basicForm.is_online = this.dealLocationType

          this.$loading({
            text:'Loading...'
          })

          let params = Object.assign({}, this.basicForm);
          ADD_DEALS(params).then(res => {
            console.log(res)
            if(res.code == 200){
              // this.$router.push('/deals/myDeals')
              this.$loading().close()

              this.dealSuccessTitle = 'Success'
              this.dealSuccessDesc = 'Your Deal offer Submission '+ this.basicForm.title + ' has been successfully sent.'
              this.dealSuccessVisible = true;


            }
          }).catch(err=>{
            console.log(err)
            this.$loading().close()

            if(err.msg){
              return this.$message.error(err.msg)
            }
            if(err.message){
              return  this.$message.error(err.message)
            }

          })

        } else {
          this.$loading().close()
          console.log('error submit!!')
          return false
        }
      })
    },
    submitDealSuccess(){
      this.dealSuccessVisible = false
      this.$router.push('/deals/myDeals')

    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    discard(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.profile-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.profile-l-container {

}

.profile-r-container {
  width: calc(100% - 160px);
  height: calc(100vh - 140px);
}

.profile-r-bg-container{
  height: calc(100vh - 240px);

}

.new-deal-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 30px 50px;
}

.new-deal-t-l {
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;

}

.new-deal-t-r {

}

.new-deal-btn {
  font-size: 20px;
}


.basic-form{

  background-color: #FFFFFF;
  padding: 50px;
  box-shadow: 0 3px 0 #00000012;
  border-radius: 38px;
  margin: 0 50px;
}

.basic-form-label{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.deals-form{
  margin-top: 25px;
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
  background-color: #F0F2F5;
  border: 1px solid #262626;
  padding: 4px 10px;
  border-radius: 6px;
  margin: 10px;
  font-size: 20px;
  font-family: BCM, serif;
  cursor: pointer;
}

.object-tags-add {
  width: 100%;
  margin-top: 10px;
}

.object-tags-item-add {
  width: 100%;
  position: relative;
}

.object-tags-item-btn-container {
  position: absolute;
  right: 10px;
  top: 10px;

}

.object-tags-item-btn {
  color: #262626;
  font-size: 20px;
}


.tags-active {
  background-color: #6650B3;
  color: #FFFFFF !important;
}

.deals-location-bg{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.deals-tabs-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.deals-tabs-l{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
  border: 2px solid #262626;
  height: 44px;
  line-height: 44px;
  padding: 0 20px;
  border-top-left-radius: 44px;
  border-bottom-left-radius: 44px;
  cursor: pointer;
}
.deals-tabs-m{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
  border-top: 2px solid #262626 ;
  border-bottom: 2px solid #262626 ;
  height: 44px;
  line-height: 44px;
  padding: 0 20px;
  cursor: pointer;
}

.deals-tabs-r{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
  border: 2px solid #262626;
  height: 44px;
  line-height: 44px;
  padding: 0 20px;
  border-top-right-radius: 44px;
  border-bottom-right-radius: 44px;
  cursor: pointer;
}
.deals-location-container{
  margin-top: 25px;
}

.deals-location-select-container{
  text-align: left;
}

.map-container{
  margin-top: 25px;
  min-width: 700px;
  width: 100%;
  height: 300px;
  text-align: center;
}

.basemap{
  width: 100%;
  height: 100%;

}

.tags-tips{
  text-align: left;
  font-size: 12px;
  color: #808080;
}
.deals-tips{
  text-align: left;
  font-size: 12px;
  color: #808080;
}

.deal-location-current-container{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin-top: 10px;
}

.tags-current-container{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
}

@media screen and (min-width: 1200px){

}

@media screen and (max-width: 768px){
    .profile-r-container{
      width: 100%;
      height: calc( var(--i-window-height) - 160px);

    }

  .new-deal-t{
    padding: 15px;
    height: 30px;
  }

  .new-deal-t-l{
    font-size: 18px;
  }
  .new-deal-btn{
    font-size: 12px;
  }

  .profile-r-bg-container{
    height: calc( var(--i-window-height) - 220px);
  }

  .basic-form{
    padding: 15px;
    margin: 15px;
    border-radius: 18px;
  }

  .basic-form-label{
    font-size: 18px;
  }

  .object-tags-item{
    font-size: 12px;
    padding: 0 6px;
  }

  .object-tags-item-btn-container{
    top: 0px;
  }

  .deals-tabs-l{
    font-size: 12px;
  }

  .deals-tabs-m{
    font-size: 12px;
  }

  .deals-tabs-r{
    font-size: 12px;
  }

  .map-container{
    min-width: 300px;
  }

}


</style>
