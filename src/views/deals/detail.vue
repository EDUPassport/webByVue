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

        <el-col :xs="0" :sm="24" :md="7" :lg="7" :xl="6">
          <featuredDealsPromoted
              :adsData="adsDataMid"
              :featuredData="featuredDealsData"
              @addFavorite="addFavoriteFeatured"
              @cancelFavorite="cancelFavoriteFeatured"
              @viewProfile="viewProfile"
              @detail="showDealDetailDialog"
              @dealDetail="turnDealDetail"
          >
          </featuredDealsPromoted>
        </el-col>
        <el-col class="deal-detail-col" :xs="24" :sm="24" :md="13" :lg="13" :xl="14">

          <el-scrollbar class="deal-detail-scroll">

            <div class="dialog-container" >

              <div class="action-container">

                <div class="action-l">
                  <el-button class=""
                             @click="backToSearchResults()"
                             link>
                    <el-icon>
                      <ArrowLeft />
                    </el-icon>
                    BACK
                  </el-button>
                </div>
                <div class="action-r">

                </div>

              </div>

              <div class="dialog-t" >
                <el-image class="dialog-background-img"
                          fit="cover"
                          :src="companyInfo.background_image">
                  <template #error>
                    <div class="img-slot-background">
                      <el-icon :size="80" color="#808080">
                        <Picture/>
                      </el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="dialog-b">

                <div class="dialog-b-l">

                  <div class="dialog-logo">
                    <el-avatar class="dialog-logo-img" :src="companyInfo.logo"></el-avatar>
                  </div>
                  <div class="dialog-qrcode">
<!--                    <vue-qrcode :value="qrcodeValue" :options="{width:200}"></vue-qrcode>-->
                  </div>

                </div>

                <div class="dialog-b-r">

                  <div class="dialog-company-name">
                    {{ detailData.company_name }}
                  </div>
                  <p class="dialog-company-desc">
                    {{ companyInfo.desc }}
                  </p>

                  <div class="dialog-vendor-profile"
                       @click="readMoreDeal(detailData.user_id, detailData.identity, detailData.company_id)">
                    VENDOR PROFILE
                  </div>

                  <div class="dialog-title">
                    {{ detailData.title }}
                  </div>

                  <p class="dialog-desc">
                    {{ detailData.desc }}
                  </p>

<!--                  <div class="dialog-desc">-->
<!--                    {{ detailData.tags_en }}-->
<!--                  </div>-->

                  <template v-if="detailData.is_online == 2 || detailData.is_online == 3">
                    <mapComponent :lng="detailData.lng" :lat="detailData.lat"></mapComponent>
                  </template>

                  <div class="dialog-category">
                    <el-space :size="5" wrap spacer="·">
                      <!--            <span>discount</span>-->
                      <span>{{ companyInfo.category_name_en }}</span>
                    </el-space>
                  </div>

                  <div class="share-btn-container">
                    <el-button link @click="shareDeal(detailData)" >
                      SHARE
                    </el-button>
                  </div>


                </div>

              </div>


            </div>


          </el-scrollbar>


        </el-col>


      </el-row>

      <dealDetailCard :info="dealDetailData"
                      :qrcodeValue="qrcodeValue"
                      @close="dealDetailDialogVisible=false"
                      @share="shareDeal"
                      @viewProfile="viewProfile"
                      :visible="dealDetailDialogVisible">
      </dealDetailCard>

      <shareCard :visible="shareDialogVisible"
                 :title="shareInfo.title"
                 :description="shareInfo.desc"
                 :quote="shareInfo.desc"
                 :url="locationUrl"
                 @close="shareDialogVisible=false"
      >
      </shareCard>

    </div>
  </div>

</template>

<script>

import {
  TAGS_LIST,
  DEALS_LIST,
  DEALS_AREA_LIST,
  ADD_FAVORITE,
  CANCEL_FAVORITE,
  ADS_LIST, USER_INFO_VISITOR_V2, USER_SUB_IDENTITY_V2, FEATURED_DEALS_LIST, DEALS_DETAIL
} from "@/api/api";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import dealDetailCard from "@/components/dealDetailCard";
import shareCard from "@/components/shareCard";
import dealFilterComponent from "@/components/dealFilterComponent";

import featuredDealsPromoted from "@/components/deals/featuredDealsPromoted";
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "detail",
  components: {
    shareCard,
    dealFilterComponent,
    featuredDealsPromoted,
    dealDetailCard
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

      dealDetailDialogVisible: false,
      dealDetailData: {},
      qrcodeValue: '',
      webDomain: process.env.VUE_APP_DOMAIN,

      filterIsOnlineValue: false,
      detailData: {},

      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,

      shareDialogVisible: false,
      shareInfo: {},

      filterResultData: {},
      companyInfo: {},
      featuredDealsData:[],
      adsDataMid:[]


    }
  },
  beforeRouteUpdate(to){
    console.log(to)
    let dealId = to.query.id;

    if(dealId){
      this.getDealDetail(dealId)
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

    let dealId = this.$route.query.id;
    if (dealId) {
      this.getDealDetail(dealId)
    }
    this.getFeaturedDealsList()
    this.getSubIdentityList()
    this.getTagsList()
    this.getDealsAreaList()
    this.getAdsList()

  },
  methods: {
    confirmFilterSearch(e) {
      console.log(e)
      this.filterResultData = e;
      this.getDealsList(this.dealPage, this.dealLimit)
    },
    backToSearchResults() {
      this.$router.go(-1)
    },
    readMoreDeal(userId,identity,companyId) {
      this.$router.push({path:'/deals/vendor/profile', query:{uid:userId,i:identity,cid:companyId}})
    },
    showDealDetailDialog(item) {

      this.dealDetailData = item;
      this.dealDetailDialogVisible = true;
      this.qrcodeValue = this.webDomain + '?id=' + item.id;

    },
    turnDealDetail(id){
      this.$router.push({path:'/deals/detail',query:{id:id}})
    },
    shareDeal(e) {
      // console.log(e)
      this.shareDialogVisible = true;
      this.shareInfo = e;


    },
    viewProfile(userId,identity,companyId) {

      this.$loading({text:''})

      let params = {
        user_id:userId,
        identity:identity,
        company_id:companyId
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.companyInfo = res.message.user_contact.company;
          this.showDealDetailStatus = true;
          this.dealDetailDialogVisible = false;
          this.$loading().close()
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
    getDealsList(page, limit) {

      let filterResult = this.filterResultData;

      let paramsA = {
        page: page,
        limit: limit
      }

      let params = Object.assign(paramsA, filterResult)

      DEALS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.dealsListData = res.message.data;
          this.dealTotalNum = res.message.total
          this.showLoadingStatus = false
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
    dealPageSizeChange(e) {
      console.log(e)
    },
    dealPageChange(e) {
      this.showLoadingStatus = true
      this.dealPage = e
      this.getDealsList(e, this.dealLimit)

      document.documentElement.scrollTop = 200
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

    getDealDetail(id) {
      let params = {
        deal_id: id,
        token: localStorage.getItem('token')
      }
      let self = this;
      DEALS_DETAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.detailData = res.message
          this.companyInfo = res.message.company;

          if(res.message.is_online == 2 || res.message.is_online == 3){

            setTimeout(function () {
              self.initMap(res.message.lng, res.message.lat)
            }, 3000)

          }

          this.showLoadingStatus = false
          // let userId = res.message.user_id
          // this.getCompanyJobList(userId)
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


#mapContainer {
  height: 300px;
}

.deal-detail-col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}


.deal-detail-scroll {
  background-color: #F0F2F5;
  width: calc(100% - 25px);
  height: calc(100vh - 140px);
  padding:0 0  0 25px ;
}

.dialog-container{
  min-height: calc(100vh - 140px);
  background-color: #FFFFFF;

  margin: 0 auto;

}

/deep/ .el-dialog{
  --el-dialog-bg-color: none;
  --el-dialog-box-shadow: none;
}

.dialog-t{
  width: 100%;
  height: 420px;

}

.dialog-background-img{
  width: 100%;
  height: 100%;
}

.dialog-b{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 25px;
}

.dialog-b-l{

}

.dialog-logo{

}

.dialog-logo-img{

  width: 150px;
  height: 150px;
  box-shadow: 0px 0px 6px #00000029;
}

.dialog-qrcode{
  display: none;
}

.dialog-b-r{
  width: calc(100% - 220px);
  position: relative;
  padding-right: 25px;
}

.dialog-b-r-height{
  height: 350px ;
}

.dialog-company-name{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.dialog-company-desc{
  margin-top: 10px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
  word-break: normal;


}

.dialog-vendor-profile{
  margin-top: 10px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #6650B3;
  cursor: pointer;
}

.dialog-vendor-profile:hover{
  text-decoration:underline;
}

.dialog-title{
  margin-top: 25px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.dialog-desc{
  margin-top: 25px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
  word-break: normal;
}


.dialog-action-l span{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;
}

.img-slot-background{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #faf7f7;
  width: 100%;
  height: 100%;
}
.dialog-category{
  margin-top: 25px;
}

.dialog-category span{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;
}

.share-btn-container{
  margin-top: 15px;
}


.action-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 15px;
}

.action-r{
  text-align: right;
  padding-right: 50px;
}


@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {

  .deal-detail-scroll{
    width: 100%;
    padding: 0;
    height: calc(var(--i-window-height) - 80px);
  }

  .dialog-container{
    min-height: calc(var(--i-window-height) - 80px);
  }

  .action-container{
    height: 30px;
  }

  .dialog-t{
    height: 120px;
  }
  .dialog-b{
    padding:25px 15px 15px 15px;
    flex-direction: column;
    position: relative;
  }
  .dialog-b-l{
    width: 40px;
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    margin: auto;
  }
  .dialog-logo-img{
    width: 40px;
    height: 40px;
  }
  .dialog-b-r{
    width: 100%;
    padding-right: 0;
  }

  .dialog-company-name{
    font-size: 16px;
  }

  .dialog-company-desc{
    font-size: 14px;
  }

  .dialog-vendor-profile{
    font-size: 12px;
  }

  .dialog-title{
    font-size: 18px;
  }

  .dialog-desc{
    font-size: 14px;
  }

  .dialog-category span{
    font-size: 12px;
  }




}

</style>
