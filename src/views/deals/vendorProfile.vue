<template>
  <div class="bg" v-loading="showLoadingStatus">
    <div class="xll-container">

      <el-row :gutter="0" align="top" justify="center">

        <el-col :xs="0" :sm="24" :md="4" :lg="4" :xl="4">
          <dealFilterComponent
              :locationData="locationOptions"
              :tagsData="tagsData"
              :subCateData="subCateData"
              @search="confirmFilterSearch"
          ></dealFilterComponent>
        </el-col>

        <!--          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">-->
        <!--            <dealByListComponent :listData="dealsListData"-->
        <!--                                 @back="backToSearchResults"-->
        <!--                                 @detail="showDealDetailDialog"-->
        <!--                                 :info="companyInfo">-->
        <!--            </dealByListComponent>-->
        <!--          </el-col>-->
        <el-col class="deal-business-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

          <businessProfileActionWithBack></businessProfileActionWithBack>

          <el-scrollbar class="deal-business-bg">
            <businessProfile
                :info="companyInfo"
                :fromMe="false"
                :identity="5">
            </businessProfile>
          </el-scrollbar>

        </el-col>


      </el-row>

    </div>
  </div>

</template>

<script>

import {
  TAGS_LIST,
  DEALS_AREA_LIST,
  ADD_FAVORITE,
  CANCEL_FAVORITE,
  ADS_LIST, USER_INFO_VISITOR_V2, USER_SUB_IDENTITY_V2, FEATURED_DEALS_LIST, USER_BROWSING_HISTORY_ADD
} from "@/api/api";
import {encode} from "js-base64";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import dealFilterComponent from "@/components/dealFilterComponent";
import businessProfile from "@/components/businessProfile";
import businessProfileActionWithBack from "@/components/businessProfileActionWithBack";
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "vendorProfile",
  components: {
    dealFilterComponent,
    businessProfile,
    businessProfileActionWithBack

  },
  setup() {

    const locationUrl = window.location.href;

    return {
      locationUrl
    }

  },
  data() {
    return {

      subCateData: [],
      locationValue: '',
      locationOptions: [],
      tagValue: [],
      tagsData: [],
      dealsListData: [],
      dealPage: 1,
      dealLimit: 10,
      dealTotalNum: 0,
      sCateId: 0,
      showLoadingStatus: true,

      adsHeight: '190px',
      adsDataTop: [],
      adsDataMid: [],
      adsDataBottom: [],
      featuredDealsData: [],

      dealDetailDialogVisible: false,
      dealDetailData: {},
      qrcodeValue: '',
      webDomain: process.env.VUE_APP_DOMAIN,
      showDealDetailStatus: false,
      filterIsOnlineValue: false,
      detailData: {},
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,

      shareDialogVisible: false,
      shareInfo: {},

      filterResultData: {},
      companyInfo: {}

    }
  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  mounted() {

    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor < 768) {
      updateWindowHeight()
    }
    //
    // if (screenWidthFloor >= 768 && screenWidthFloor < 992) {
    //   this.adsHeight = '190px'
    // }
    if (screenWidthFloor >= 992 && screenWidthFloor < 1200) {
      this.adsHeight = '120px'
    }
    if (screenWidthFloor >= 1200 && screenWidthFloor < 1920) {
      this.adsHeight = '140px'
    }
    if(screenWidthFloor >= 1920){
      this.adsHeight = "190px"
    }

    window.onresize = () =>{
      if (screenWidthFloor < 768) {
        updateWindowHeight()
      }
      //
      // if (screenWidthFloor >= 768 && screenWidthFloor < 992) {
      //   this.adsHeight = '190px'
      // }
      if (screenWidthFloor >= 992 && screenWidthFloor < 1200) {
        this.adsHeight = '120px'
      }
      if (screenWidthFloor >= 1200 && screenWidthFloor < 1920) {
        this.adsHeight = '140px'
      }
      if(screenWidthFloor >= 1920){
        this.adsHeight = "190px"
      }

    }

    let userId = this.$route.query.uid;
    let identity = this.$route.query.i;
    let cid = this.$route.query.cid;

    if(userId && identity && cid){
      this.getVisitorUserInfo(userId,identity,cid)
      this.addUserBrowsingHistory(cid)
    }

    this.getFeaturedDealsList()

    this.getSubIdentityList()
    this.getTagsList()
    this.getDealsAreaList()
    this.getAdsList()

  },
  methods: {
    addUserBrowsingHistory(id){
      let params = {
        type:8,
        type_id:id
      }
      USER_BROWSING_HISTORY_ADD(params).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })

    },
    confirmFilterSearch(e) {
      console.log(e)
      this.filterResultData = e;
      this.getDealsList(this.dealPage, this.dealLimit)
    },
    backToSearchResults() {
      this.$router.go(-1)
      // this.$router.push('/deals')
    },
    readMoreDeal(id) {
      this.showDealDetailStatus = true;
      this.dealDetailDialogVisible = false;
      this.$router.push({path: '/deals', query: {id: id}})
    },
    showDealDetailDialog(item) {

      this.dealDetailData = item;
      this.dealDetailDialogVisible = true;
      this.qrcodeValue = this.webDomain + '?id=' + item.id;

    },
    shareDeal(e) {
      // console.log(e)
      this.shareDialogVisible = true;
      this.shareInfo = e;
    },
    getVisitorUserInfo(userId,identity,companyId) {

      let params = {
        user_id:userId,
        identity:identity,
        company_id:companyId
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.companyInfo = res.message.user_contact.company;

          this.showLoadingStatus = false;
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    turnBanner(link) {
      console.log(link)
      if (link != '') {
        window.location.href = link
      } else {
        let token = localStorage.getItem('token')
        if (!token) {
          window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')

          return;
        }
        this.$router.push('/me/ads/platform')
      }
    },
    getAdsList() {
      let ads_data = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(ads_data).then(res => {
        if (res.code == 200) {
          // console.log(rs.message)
          let adsDataTop = []
          let adsDataMid = [];
          let adsDataBottom = [];
          let identity = localStorage.getItem('identity');

          if (!identity) {
            adsDataTop = res.message.filter(item => item.name == 'guest_d1');
            adsDataMid = res.message.filter(item => item.name == 'guest_d2');
            adsDataBottom = res.message.filter(item => item.name == 'guest_d3');
          }
          if (identity == 1) {
            adsDataTop = res.message.filter(item => item.name == 'educator_d1');
            adsDataMid = res.message.filter(item => item.name == 'educator_d2');
            adsDataBottom = res.message.filter(item => item.name == 'educator_d3');
          }
          if (identity == 2 || identity == 3 || identity == 4) {
            adsDataTop = res.message.filter(item => item.name == 'business_d1');
            adsDataMid = res.message.filter(item => item.name == 'business_d2');
            adsDataBottom = res.message.filter(item => item.name == 'business_d3');
          }
          if (identity == 5) {
            adsDataTop = res.message.filter(item => item.name == 'vendor_d1');
            adsDataMid = res.message.filter(item => item.name == 'vendor_d2');
            adsDataBottom = res.message.filter(item => item.name == 'vendor_d3');
          }
          if (adsDataTop.length > 0) {
            this.adsDataTop = adsDataTop[0].data;
          }
          if (adsDataMid.length > 0) {
            this.adsDataMid = adsDataMid[0].data;
          }
          if (adsDataBottom.length > 0) {
            this.adsDataBottom = adsDataBottom[0].data;
          }

        }

      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    turnDealDetail(id) {
      this.$router.push({
        path: '/deals/detail', query: {
          id: id
        }
      })
      // this.showDealDetailStatus = true;
      // this.$router.push({path: '/deals', query: {id: id}})
    },
    getSubIdentityList() {
      let params = {
        pid: 5,
        tree: 1
      }

      USER_SUB_IDENTITY_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.subCateData = res.message
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
    getTagsList() {
      let params = {
        page: 1,
        limit: 1000
      }
      TAGS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tagsData = res.message.data;
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getDealsAreaList() {
      DEALS_AREA_LIST({}).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.locationOptions = res.message
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addFavorite(id, type, title, url, index) {
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
          this.dealsListData[index]['is_favorite'] = 1
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    cancelFavorite(type, typeId, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.dealsListData[index]['is_favorite'] = 0
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addFavoriteFeatured(id, type, title, url, index) {
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
          this.featuredDealsData[index]['is_favorite'] = 1
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    cancelFavoriteFeatured(type, typeId, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.featuredDealsData[index]['is_favorite'] = 0
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    offerDeal() {
      let token = localStorage.getItem('token')
      let self = this
      if (!token || token == '') {
        return this.$msgbox({
          title: 'Offer a Deal',
          message: 'Before offer a deal, you need to log in',
          type: 'warning',
          confirmButtonText: 'Log in',
          callback(action) {
            console.log(action)
            if (action === 'confirm') {
              let redirectParamsObj = {
                path: '/deals',
                query: {
                  id: self.$route.query.id
                }
              }

              let redirectParamsStr = encode(JSON.stringify(redirectParamsObj))

              self.$router.push({path: '/login', query: {redirect_params: redirectParamsStr}})
            }
          }
        })
      }

      let identity = localStorage.getItem('identity')

      if (identity != 5) {
        return this.$message.error('Oops! Your current identity is not an vendor, please switch to Vendor')
      }

      self.$router.push({path: '/deals/offer', query: {}})
    },

    getFeaturedDealsList() {
      let params = {}
      FEATURED_DEALS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.featuredDealsData = res.message;
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    initMap(lng, lat) {
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
      marker.setLngLat([lng, lat]).addTo(map)

    }

  }
}
</script>

<style scoped>
.bg {
  background-color: #FFFFFF;
}

.xll-container {
  width: 100%;
  margin: 0 auto;
}

.deal-business-col {
  padding-left: 25px;
}

.deal-business-bg {
  background-color: #F0F2F5;
  padding: 0 50px;
  height: calc(100vh - 200px);

}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {
  .deal-business-col{
    padding: 0;
  }

  .deal-business-bg{
    height: calc( var(--i-window-height) - 110px);
    padding: 0;
    background-color: #FFFFFF;
  }
}

</style>
