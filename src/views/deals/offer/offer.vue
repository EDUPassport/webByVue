<template>
  <div class="bg">
    <div class="profile-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="jobs-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

          <div class="basic-form">
            <el-form
                ref="basicForm"
                :model="basicForm"
                :rules="basicRules"
                label-width="120px"
                label-position="top"
                class="demo-ruleForm"
            >
              <el-form-item label="Deal Name" prop="title">
                <el-input v-model="basicForm.title" placeholder="Example:50% off all pizzas.."></el-input>
              </el-form-item>
              <el-form-item label="Deal Description" prop="desc">
                <el-input v-model="basicForm.desc" type="textarea" placeholder="Deal Details"></el-input>
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
              <el-form-item label="Deal Location">

                <el-tabs class="deals-tabs-container" type="border-card"
                         @tab-click="dealLocationTypeChange"
                         v-model="dealLocationTypeValue">
                  <el-tab-pane label="Online" name="1">
                    <div class="deals-tips">
                      This deal is only available online
                    </div>
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
                         v-loading="map1Loading"
                         v-if="dealLocationTypeValue == 3">
                      <div id="mapContainer1" class="basemap"></div>
                    </div>
                  </el-tab-pane>
                </el-tabs>

              </el-form-item>

              <el-form-item label="Deal Agreement">
                <div class="deal-agreement">
                  I understand this deal will need EDU Passport's approval.
                </div>
              </el-form-item>


            </el-form>

            <div class="xll-submit-container">
              <el-button type="primary" @click="submitForm('basicForm')">
                Submit
              </el-button>
              <el-button @click="resetForm('basicForm')">Reset</el-button>
            </div>

          </div>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import meSideMenu from "@/components/meSideMenu";
import {TAG_LIST, TAG_IS_EXISTS, ADD_DEALS, GET_COUNTRY_LIST} from '@/api/api';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default {
  name: "jobs",
  components: {
    meSideMenu
  },
  data() {
    return {
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

      }

    }
  },
  mounted() {
    this.getTagsList()
    this.getAllCountry()
  },
  methods: {
    dealLocationTypeChange(e){
      console.log(e.paneName)
      let self =this
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.basicForm.tag = this.selectTagsList;
          this.basicForm.tags_cn = this.tagsCnData.join(',');
          this.basicForm.tags_en = this.tagsEnData.join(',');
          this.$loading({
            text:'Loading...'
          })
          let params = Object.assign({}, this.basicForm);
          ADD_DEALS(params).then(res => {
            console.log(res)
            if(res.code == 200){
              this.$router.push('/deals/myDeals')
              this.$loading().close()
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

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
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

.basic-form{
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
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

.deal-agreement{
  text-align: left;
  font-size: 12px;
  color: #00b3d2;
}

.xll-submit-container{
  text-align: center;
}
</style>