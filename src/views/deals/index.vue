<template>
  <div class="bg" v-loading="showLoadingStatus">
    <div class="xll-container">

      <el-row :gutter="0" align="top" justify="center">

        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <dealFilterComponent
              :locationData="locationOptions"
              :tagsData="tagsData"
              :subCateData="subCateData"
              @search="confirmFilterSearch"
          ></dealFilterComponent>
        </el-col>

        <template v-if="showDealDetailStatus">

          <!--          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">-->
          <!--            <dealByListComponent :listData="dealsListData"-->
          <!--                                 @back="backToSearchResults"-->
          <!--                                 @detail="showDealDetailDialog"-->
          <!--                                 :info="companyInfo">-->
          <!--            </dealByListComponent>-->
          <!--          </el-col>-->
          <el-col class="deal-business-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

            <div class="deal-business-bg">
              <businessProfile
                  :canEdit="true"
                  :fromDeal="true"
                  @back="backToSearchResults"
                  :info="companyInfo"
                  :identity="5">
              </businessProfile>
            </div>

          </el-col>

        </template>

        <!--        deal list-->
        <template v-else>

          <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="6">
            <featuredDealsPromoted
                :adsData="adsDataMid"
                :featuredData="featuredDealsData"
                @addFavorite="addFavoriteFeatured"
                @cancelFavorite="cancelFavoriteFeatured"
                @viewProfile="viewProfile"
                @detail="showDealDetailDialog">
            </featuredDealsPromoted>
          </el-col>

          <el-col class="deals-list-col" :xs="24" :sm="24" :md="13" :lg="13" :xl="14">

            <el-scrollbar class="deals-list-scroll">

              <div class="xll-ads-container" v-if="adsDataTop.length>0">
                <adsComponent :height="adsHeight" :adsData="adsDataTop"></adsComponent>
              </div>

              <div class="deals-bg-container">
                <template v-if="dealsListData.length > 0">
                  <div class="deals-container">

                    <div class="deals-item-container"
                         v-for="(item,index) in dealsListData" :key="index"
                    >
                      <div class="deals-item">
                        <div class="deals-item-bg">
                          <el-image
                              class="deals-item-background-img"
                              :src="item.company_info.background_image ? item.company_info.background_image : ''"
                              fit="cover"
                              @click="viewProfile(item.company_info)"
                          ></el-image>

                          <div class="deals-item-favorite" v-if="item.is_favorite && item.is_favorite == 1"
                               @click="cancelFavorite(2,item.id,index)">
                            <el-icon color="#6650B3" :size="25">
                              <IconFontistoFavorite/>
                            </el-icon>
                          </div>
                          <div class="deals-item-favorite" v-else
                               @click="addFavorite(item.id,2,item.title,item.company_logo,index)">
                            <el-icon :size="25">
                              <CollectionTag/>
                            </el-icon>
                          </div>

                        </div>
                        <div class="deals-item-c">
                          <div class="deals-item-c-l">
                            <el-avatar class="deals-logo"
                                       :src="item.company_logo"
                                       @click="viewProfile(item.company_info)"
                            >
                            </el-avatar>
                          </div>
                          <div class="deals-item-c-r">
                            <div class="deals-item-c-r-1" @click="viewProfile(item.company_info)">
                              {{ item.company_info.company_name }}
                            </div>
                            <div class="deals-item-c-r-2" @click="showDealDetailDialog(item)">
                              {{ item.title }}
                            </div>
                          </div>
                        </div>

                        <div class="deals-item-b">
                          <div class="deals-item-b-l">

                            <template
                                v-if="item.company_info.category_name_en && item.company_info.category_name_en != '0'">
                              {{ item.company_info.category_name_en }}
                            </template>
                            <template v-else>

                            </template>

                          </div>
                          <div class="deals-item-b-r">
                            <el-button link @click="showDealDetailDialog(item)">
                              DETAILS
                            </el-button>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                  <div class="deals-pagination">
                    <el-pagination layout="prev, pager, next" :default-current-page="1"
                                   @size-change="dealPageSizeChange"
                                   @current-change="dealPageChange"
                                   :current-page="dealPage" :page-size="dealLimit"
                                   :total="dealTotalNum">
                    </el-pagination>
                  </div>

                </template>
                <template v-else>
                  <el-empty description="..."></el-empty>
                </template>

              </div>

              <div class="xll-ads-bottom-container" v-if="adsDataBottom.length>0">
                <adsComponent :height="adsHeight" :adsData="adsDataBottom"></adsComponent>
              </div>

            </el-scrollbar>


          </el-col>

        </template>

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
                 :url="locationUrl+'?id='+shareInfo.id"
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
  ADS_LIST, USER_INFO_VISITOR_V2, SWITCH_IDENTITY_V2, USER_SUB_IDENTITY_V2, FEATURED_DEALS_LIST, DEALS_DETAIL
} from "@/api/api";
import {encode} from "js-base64";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import dealDetailCard from "@/components/dealDetailCard";
import shareCard from "@/components/shareCard";
import dealFilterComponent from "@/components/dealFilterComponent";
import businessProfile from "@/components/businessProfile";
// import dealByListComponent from "@/components/dealByListComponent";
import featuredDealsPromoted from "@/components/deals/featuredDealsPromoted";
import adsComponent from "@/components/ads/adsComponent";

export default {
  name: "index",
  components: {
    dealDetailCard,
    shareCard,
    dealFilterComponent,
    businessProfile,
    // dealByListComponent,
    featuredDealsPromoted,
    adsComponent

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
  beforeRouteUpdate(to) {
    console.log(to)
    let dealId = to.query.id
    if (dealId) {
      console.log('deal detail ==========')
      this.getDealDetail(dealId)
      this.showDealDetailStatus = true
    } else {

      this.getDealsList(this.dealPage, this.dealLimit)
      this.getFeaturedDealsList()
      this.showDealDetailStatus = false;
    }

  },
  mounted() {

    let dealId = this.$route.query.id;
    if (dealId) {
      this.getDealDetail(dealId)
      this.showDealDetailStatus = true;

    } else {
      this.showDealDetailStatus = false;
      this.getDealsList(this.dealPage, this.dealLimit)
      this.getFeaturedDealsList()
    }

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
      this.showDealDetailStatus = false;
      this.getDealsList(this.dealPage, this.dealLimit)
      this.getFeaturedDealsList()
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
    viewProfile(e) {
      this.companyInfo = e;
      this.showDealDetailStatus = true;
      this.dealDetailDialogVisible = false;
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
      // this.$router.push({
      //   path: '/deals/detail', query: {
      //     id: id
      //   }
      // })
      this.showDealDetailStatus = true;
      this.$router.push({path: '/deals', query: {id: id}})
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
    selectRole(e) {
      this.$loading({
        text: 'Loading...'
      })

      let params = {
        user_id: localStorage.getItem('uid'),
        identity: e
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        let userContact = res.message.user_contact;
        let educatorContact = {};

        let companyInfo = {};

        let isEducator = userContact.is_educator;
        let isRecruiting = userContact.is_recruiting;
        let isSchool = userContact.is_school;
        let isOther = userContact.is_other;
        let isVendor = userContact.is_vendor;
        let identity = e;

        if (identity == 1) {
          if (isEducator > 10) {
            educatorContact = res.message.user_contact.educator_contact;
            this.changeIdentity(educatorContact.id, 1, 2)

            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 1}})

          }

        }

        if (identity == 2) {

          if (isRecruiting > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id, 2, 2)
            // this.$router.push({path: '/overview', query: {identity: identity}})

            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 2}})

            this.dialogBusinessAccountVisible = false
          }
        }

        if (identity == 3) {

          if (isSchool > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id, 3, 2)
            // this.$router.push({path: '/overview', query: {identity: identity}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 3}})

            this.dialogBusinessAccountVisible = false
          }

        }

        if (identity == 4) {

          if (isOther > 10) {
            companyInfo = res.message.user_contact.company;

            this.changeIdentity(companyInfo.id, 4, 2)
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 4}})

            this.dialogBusinessAccountVisible = false
          }

        }

        if (identity == 5) {

          if (isVendor > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id, 5, 2)
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 5}})

          }

        }


      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })
    },
    changeIdentity(companyId, identity, language) {
      let params = {
        company_id: companyId,
        language: language,
        identity: identity
      }

      SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.$store.commit('allIdentityChanged', true)

          localStorage.setItem('company_id', companyId)
          localStorage.setItem('identity', identity)

          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData', str)

          this.$store.commit('identity', identity)
          this.$store.commit('menuData', res.message)

          this.$loading().close()
        }
      }).catch(err => {
        console.log(err)
        this.$loading().close()
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
      DEALS_DETAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.detailData = res.message
          this.showLoadingStatus = false;
          this.initMap(res.message.lng, res.message.lat)

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

.filter-deal-col {
  padding-right: 13px;
}

.deal-detail-col {

}

.deal-detail-bg-container {
  background-color: #F0F2F5;
  height: calc(100vh - 200px);
  padding: 30px;
}

.deal-detail-background {
  width: 100%;
  height: 240px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.deal-detail-background-img {
  width: 100%;
}

.deal-detail-c {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.deal-detail-c-l {

}

.deal-detail-c-l-logo {
  width: 150px;
  height: 150px;
  border-radius: 150px;

}

.deal-detail-c-r {
  padding-left: 25px;
}

.deal-detail-c-r-1 {
  font-family: BSemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 45px;
  color: #262626;
}

.deal-detail-item-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.deal-detail-item {
  width: 45%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.deal-detail-item-l {

  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.deal-detail-item-r {
  padding-left: 15px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.deal-detail-desc {
  margin-top: 25px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.map-container {
  margin-top: 25px;
}

#mapContainer {
  height: 300px;
}

.deals-list-col {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.deals-featured-scroll {
  height: calc(100vh - 140px);
}

.deals-featured-container {
  padding: 25px;
}

.deals-featured-label {
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.deals-list-scroll {
  background-color: #F0F2F5;
  height: calc(100vh - 140px);
}

.deals-bg-container {
  padding: 37px 37px 0 37px;
  /*padding: 0 30px 0 30px;*/
}

.deals-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

}

.deals-featured-item {
  width: 100%;
  margin-top: 20px;
  border-radius: 40px;
  overflow: hidden;

  background-color: #ffffff;
  box-shadow: 0px 0px 10px #0000001A;
}

.deals-item-container {
  width: 50%;
  /*margin-top: 20px;*/
}

.deals-item {
  margin: 13px;
  border-radius: 40px;
  overflow: hidden;

  background-color: #ffffff;
  box-shadow: 0px 0px 10px #0000001A;
}

.deals-from-col {
  padding-left: 12px;
}


.deals-item-bg {
  height: 240px;
  border-radius: 40px;

  background-color: #faf7f7;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  overflow: hidden;

  position: relative;
}

.deals-item-favorite {
  position: absolute;
  right: 20px;
  top: 20px;

}

.deals-item-background-img {
  width: 100%;
}

.deals-item-c {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 25px;
}

.deals-logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #EEEEEE;
  background-color: #FFFFFF;
}

.deals-item-c-r {
  margin-left: 25px;
}

.deals-item-c-r-1 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
  cursor: pointer;
}

.deals-item-c-r-2 {
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 24px;
  color: #262626;
  cursor: pointer;
}

.deals-item-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px 25px 25px;

}

.deals-item-b-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.deals-item-b-l {
  text-align: left;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.hot-deal-type-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.deals-item-b-r {
  font-size: 12px;
  color: #808080;
  padding-right: 20px;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.deals-pagination {
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
}


.xll-ads-container {
  padding: 25px 50px 0 50px;
  background-color: #F0F2F5;
}

.xll-ads-bottom-container {
  padding: 0 50px 50px 50px;
}

.deal-business-col {
  padding-left: 25px;
}

.deal-business-bg {
  background-color: #F0F2F5;
  padding: 0 50px;
}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {

}

</style>
