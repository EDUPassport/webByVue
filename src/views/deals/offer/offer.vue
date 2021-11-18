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

                <el-tabs class="deals-tabs-container" type="border-card" v-model="dealLocationTypeValue">
                  <el-tab-pane label="Online" name="1">
                    <div class="deals-tips">
                      This deal is only available online
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Offline" name="2">
                    <div class="deals-location-select-container">
                      <el-select v-model="basicForm.province"
                                 @change="provinceChange"
                                 placeholder="Select Province">
                        <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.Pinyin"
                                   :value="item.id"></el-option>
                      </el-select>
                      <el-select v-model="basicForm.city"
                                 @change="cityChange"
                                 placeholder="Select City">
                        <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.Pinyin"
                                   :value="item.id"></el-option>
                      </el-select>
                      <el-select v-model="basicForm.district"
                                 @change="districtChange"
                                 placeholder="Select District">
                        <el-option v-for="(item,i) in districtOptions" :key="i" :label="item.Pinyin"
                                   :value="item.id"></el-option>
                      </el-select>
                    </div>

                    <div class="map-container">
                      <div id="mapContainer" class="basemap"></div>
                    </div>

                  </el-tab-pane>
                  <el-tab-pane label="Both" name="3">
                    <div class="deals-tips">
                      This deal is available online and at the location below
                    </div>
                    <div class="deals-location-select-container">
                      <el-select v-model="basicForm.province"
                                 @change="provinceChange"
                                 placeholder="Select Province">
                        <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.Pinyin"
                                   :value="item.id"></el-option>
                      </el-select>
                      <el-select v-model="basicForm.city"
                                 @change="cityChange"
                                 placeholder="Select City">
                        <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.Pinyin"
                                   :value="item.id"></el-option>
                      </el-select>
                      <el-select v-model="basicForm.district"
                                 @change="districtChange"
                                 placeholder="Select District">
                        <el-option v-for="(item,i) in districtOptions" :key="i" :label="item.Pinyin"
                                   :value="item.id"></el-option>
                      </el-select>
                    </div>
                    <div class="map-container">
                      <div id="mapContainer1" class="basemap"></div>
                    </div>
                  </el-tab-pane>
                </el-tabs>

              </el-form-item>

              <el-form-item label="Deal Agreement">
                <div class="deal-agreement">
                  I understand this deal will need ESL Passport's approval.
                </div>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('basicForm')">
                  Submit
                </el-button>
                <el-button @click="resetForm('basicForm')">Reset</el-button>
              </el-form-item>
            </el-form>

          </div>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import meSideMenu from "@/components/meSideMenu";
import {VISITOR_USER_INFO,TAG_LIST,TAG_IS_EXISTS,ALL_AREAS,ADD_DEALS} from '@/api/api';
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
      provinceOptions: [],
      provinceName: '',
      cityOptions: [],
      cityName: '',
      districtOptions: [],
      districtName: '',

      basicForm: {
        token: localStorage.getItem('token'),
        user_id: localStorage.getItem('uid'),
        title: '',
        desc: '',
        tag:'',
        is_online: 0,
        location:'',
        province:'',
        city:'',
        district:'',
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
    // this.getVisitorBasicInfo()
    this.getTagsList()
    this.getAllAreas(0)
    this.initMap()
    this.initMap1()
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = this.accessToken;

      const map = new mapboxgl.Map({
        container: "mapContainer",
        center: [115.64673, 34.42592],
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
        center: [115.64673, 34.42592],
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
    getAllAreas(pid) {
      let params = {
        pid: pid
      }
      ALL_AREAS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.provinceOptions = res.message
        }
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
      })
    },
    provinceChange(e) {
      console.log(e)
      this.getAllCitys(e)
    },
    cityChange(e) {
      console.log(e)
      this.getAllDistricts(e)
    },
    districtChange(e) {
      console.log(e)
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
    getVisitorBasicInfo() {
      let uid = localStorage.getItem('uid')
      let identity = localStorage.getItem('identity')
      let params = {
        id: uid,
        identity: identity
      }
      VISITOR_USER_INFO(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.basicUserInfo = res.message
          if (identity == 1 && res.message.educator_info) {
            this.userInfo = res.message.educator_info
          }
          if (identity == 2 && res.message.business_info) {
            this.userInfo = res.message.business_info
          }
          if (identity == 3 && res.message.vendor_info) {
            this.userInfo = res.message.vendor_info
          }

        }
      })
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
</style>