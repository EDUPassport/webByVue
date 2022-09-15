<template>
  <div class="bg" v-loading="showLoadingStatus">
    <div class="xll-container">

      <el-row :gutter="0" align="top" justify="center">

        <el-col class="filter-deal-col" :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <div class="filter-bg-container">
            <div class="offer-deal">
              <el-button class="offer-deal-btn" type="primary" @click="offerDeal()" round>
                Offer a Deal
              </el-button>
            </div>
            <div class="deals-events-filter-container">

              <div class="deals-events-filter-item">
                <div class="deals-events-filter-label">Location</div>
                <el-select class="deals-events-filter-select"
                           v-model="locationValue" clearable
                           placeholder="Location"
                           size="default"
                           @change="locationChange"
                >
                  <el-option
                      v-for="item in locationOptions"
                      :key="item.id"
                      :label="item.Pinyin"
                      :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>

              <div class="deals-events-filter-item">
                <div class="qx-checked-container">
                  <div class="qx-checked-item"
                       @click="selectIsOnline()"
                  >
                    <div class="qx-checked-square"
                         :class="filterIsOnlineValue ? 'qx-checked-square-active' : '' "
                    ></div>
                    <div class="qx-checked-label">Online</div>
                  </div>
                </div>

              </div>

              <div class="deals-events-filter-item">
                <div class="deals-events-filter-label">Tags</div>
                <el-select class="deals-events-filter-select"
                           v-model="tagValue"
                           clearable multiple
                           placeholder="Tags"
                           size="default"
                           @change="tagChange"
                >
                  <el-option
                      v-for="item in tagsData"
                      :key="item.id"
                      :label="item.name_en"
                      :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>

              <div class="deals-events-filter-item">
                <div class="deals-events-filter-label">Deal type</div>

                <div class="qx-checked-container">
                  <div class="qx-checked-item" v-for="(item,i) in subCateData" :key="i"
                       @click="selectSubCate(item.id)"
                  >
                    <div class="qx-checked-square"
                         :class="sCateId == item.id ? 'qx-checked-square-active' : '' "
                    ></div>
                    <div class="qx-checked-label">{{ item.identity_name }}</div>
                  </div>
                </div>

              </div>

            </div>

            <div class="filter-search-btn-container">
              <el-button type="primary" round>
                SEARCH
              </el-button>
            </div>

            <div class="filter-contact-us-container">
              <el-icon :size="45" color="#6648FF">
                <IconIcBaselineLiveHelp/>
              </el-icon>
              <span>Contact Us</span>
            </div>

          </div>


        </el-col>

        <template v-if="showDealDetailStatus">
          <el-col class="deals-from-col" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">

            <el-scrollbar class="deals-from-bg-container">
              <div class="deals-from-t">
                <div class="deals-from-back">
                  <el-button class="deals-from-back-btn"
                             @click="backToSearchResults()"
                             link>
                    BACK TO SEARCH RESULTS
                  </el-button>
                </div>
                <div class="deals-from-label">
                  Deals from Jonas Email Coffee Roasters
                </div>
              </div>
              <div class="deals-from-b">
                <div class="deals-from-item" v-for="(item,index) in dealsListData" :key="index">
                  <div class="deals-item-bg">
                    <el-image
                        class="deals-item-background-img"
                        :src="item.company_info.background_image ? item.company_info.background_image : ''"
                        fit="cover"
                    ></el-image>

                    <div class="deals-item-favorite" v-if="item.is_favorite && item.is_favorite == 1"
                         @click="cancelFavorite(2,item.id,index)">
                      <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
                    </div>
                    <div class="deals-item-favorite" v-else
                         @click="addFavorite(item.id,2,item.title,item.company_logo,index)">
                      <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
                    </div>

                  </div>
                  <div class="deals-item-c">
                    <div class="deals-item-c-l">
                      <el-avatar class="deals-logo" :src="item.company_logo"></el-avatar>
                    </div>
                    <div class="deals-item-c-r">
                      <div class="deals-item-c-r-1">
                        {{ item.company_name }}
                      </div>
                      <div class="deals-item-c-r-2" @click="dealDetailForQrcode(item)">
                        {{ item.title }}
                      </div>
                    </div>
                  </div>

                  <div class="deals-item-b">
                    <div class="deals-item-b-l">

                      <template v-if="item.company_info.category_name_en && item.company_info.category_name_en != '0'">
                        {{ item.company_info.category_name_en }}
                      </template>
                      <template v-else>
                        unknown
                      </template>

                    </div>
                    <div class="deals-item-b-r">
                      <el-button link @click="turnDealDetail(item.id)">
                        DETAILS
                      </el-button>
                    </div>
                  </div>

                </div>

              </div>

            </el-scrollbar>

          </el-col>
          <el-col class="deal-detail-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">

            <el-scrollbar class="deal-detail-bg-container">
              <div class="deal-detail-background">
                <el-image
                    class="deal-detail-background-img"
                    fit="cover"
                    v-if="detailData.company"
                    :src="detailData.company.background_image ? detailData.company.background_image : '' "
                ></el-image>
              </div>
              <div class="deal-detail-c">
                <div class="deal-detail-c-l">
                  <el-avatar class="deal-detail-c-l-logo"
                             :src="detailData.company_logo"></el-avatar>
                </div>
                <div class="deal-detail-c-r">

                  <div class="deal-detail-c-r-1">
                    {{detailData.title}}
                  </div>

                  <div class="deal-detail-tags" v-if="detailData.company">
                    <el-tag>{{detailData.company.category_name_en}}</el-tag>
                  </div>

                  <div class="deal-detail-item-container">

                    <div class="deal-detail-item">
                      <div class="deal-detail-item-l">Website:</div>
                      <div class="deal-detail-item-r">www.baidu.com</div>
                    </div>

                    <div class="deal-detail-item">
                      <div class="deal-detail-item-l">Do we have events?</div>
                      <div class="deal-detail-item-r">No</div>
                    </div>

                    <div class="deal-detail-item">
                      <div class="deal-detail-item-l">Address:</div>
                      <div class="deal-detail-item-r">www.baidu.com</div>
                    </div>

                    <div class="deal-detail-item">
                      <div class="deal-detail-item-l">Are we dog friendly?</div>
                      <div class="deal-detail-item-r">Yes</div>
                    </div>

                    <div class="deal-detail-item">
                      <div class="deal-detail-item-l">Phone number:</div>
                      <div class="deal-detail-item-r">www.baidu.com</div>
                    </div>

                  </div>
                </div>
              </div>

              <div class="deal-detail-desc">
                <p>
                  {{ detailData.desc }}
                </p>
              </div>

              <div class="map-container">
                <div id="mapContainer" class="basemap"></div>
              </div>


            </el-scrollbar>
          </el-col>
        </template>

        <!--        deal list-->
        <template v-else>

          <el-col class="deals-list-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

            <div class="xll-ads-container">
              <el-carousel style="width:797px;margin:0 auto;overflow:hidden;" height="20vh" indicator-position="none">
                <el-carousel-item class="xll-ads-swiper-item"
                                  v-for="(item,i) in featuredDealsData" :key="i"
                                  @click="turnBanner(item.link)"
                >
                  <div class="xll-ads-l">
                    <el-image class="xll-ads-l-img"
                              :src="item.user_url !='' ? item.user_url : item.url">
                      <template #error>
                        <div class="image-ads-slot">
                          <el-icon :size="80" color="#808080">
                            <Picture/>
                          </el-icon>
                        </div>
                      </template>
                    </el-image>
                  </div>
                  <div class="xll-ads-r">
                    <el-avatar class="deals-logo" :src="item.company_logo"></el-avatar>
                    <div class="deals-item-c-r-1" @click="turnDealDetail(item.id)">
                      {{ item.company_name }}
                    </div>
                    <div class="deals-item-c-r-2">
                      <!--                      {{item.desc}}-->
                      {{ item.title }}
                    </div>

                    <div class="deals-item-b-1">
                      <div class="deals-item-b-l">
                        Discount . F&B
                        <template v-if="item.company_category_logo">
                          <el-image class="hot-deal-type-icon" :src="item.company_category_logo"></el-image>
                        </template>
                      </div>
                      <div class="deals-item-b-r">
                        <el-button link>DETAILS</el-button>
                      </div>
                    </div>

                  </div>
                </el-carousel-item>
              </el-carousel>

            </div>
            <el-scrollbar class="deals-bg-container">

              <div class="deals-container">
                <div class="deals-item" v-for="(item,index) in dealsListData" :key="index">
                  <div class="deals-item-bg">
                    <el-image
                        class="deals-item-background-img"
                        :src="item.company_info.background_image ? item.company_info.background_image : ''"
                        fit="cover"
                    ></el-image>

                    <div class="deals-item-favorite" v-if="item.is_favorite && item.is_favorite == 1"
                         @click="cancelFavorite(2,item.id,index)">
                      <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
                    </div>
                    <div class="deals-item-favorite" v-else
                         @click="addFavorite(item.id,2,item.title,item.company_logo,index)">
                      <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
                    </div>

                  </div>
                  <div class="deals-item-c">
                    <div class="deals-item-c-l">
                      <el-avatar class="deals-logo" :src="item.company_logo"></el-avatar>
                    </div>
                    <div class="deals-item-c-r">
                      <div class="deals-item-c-r-1">
                        {{ item.company_name }}
                      </div>
                      <div class="deals-item-c-r-2" @click="dealDetailForQrcode(item)">
                        {{ item.title }}
                      </div>
                    </div>
                  </div>

                  <div class="deals-item-b">
                    <div class="deals-item-b-l">

                      <template v-if="item.company_info.category_name_en && item.company_info.category_name_en != '0'">
                        {{ item.company_info.category_name_en }}
                      </template>
                      <template v-else>
                        unknown
                      </template>

                    </div>
                    <div class="deals-item-b-r">
                      <el-button link @click="turnDealDetail(item.id)">
                        DETAILS
                      </el-button>
                    </div>
                  </div>

                </div>

              </div>
              <div class="deals-pagination">
                <el-pagination layout="prev, pager, next" :default-current-page="1"
                               @size-change="dealPageSizeChange"
                               @current-change="dealPageChange"
                               :current-page="dealPage" :page-size="dealLimit"
                               :total="dealTotalNum"></el-pagination>
              </div>

            </el-scrollbar>

            <el-dialog v-model="dealDialogVisible">

              <div class="dialog-deal-container" v-if="qrcodeDealDetailData">
                <div class="dialog-deal-l">
                  <vue-qrcode :value="qrcodeDealValue" :options="{width:200}"></vue-qrcode>
                </div>
                <div class="dialog-deal-r">
                  <div class="dialog-deal-r-1">
                    <el-avatar :src="qrcodeDealDetailData.company_logo"></el-avatar>
                  </div>
                  <div class="dialog-deal-r-2">
                    {{ qrcodeDealDetailData.company_name }}
                  </div>
                  <div class="dialog-deal-r-3">
                    {{ qrcodeDealDetailData.company_info.desc }}
                  </div>
                  <div class="dialog-deal-r-4" @click="readMoreDeal(qrcodeDealDetailData.id)">
                    READ MORE
                  </div>
                  <div class="dialog-deal-r-5">
                    {{ qrcodeDealDetailData.title }}
                  </div>
                  <div class="dialog-deal-r-6">
                    {{ qrcodeDealDetailData.desc }}
                  </div>
                  <div class="dialog-deal-r-7">
                    {{ qrcodeDealDetailData.company_info.category_name_en }}
                  </div>
                </div>
              </div>

            </el-dialog>

          </el-col>

        </template>

      </el-row>

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


export default {
  name: "index",
  components: {},
  data() {
    return {
      dealDialogVisible: false,
      subCateData: [],
      locationValue: '',
      locationOptions: [],
      tagValue: [],
      tagsData: [],
      dealsListData: [],
      dealPage: 1,
      dealLimit: 9,
      dealTotalNum: 0,
      sCateId: 0,
      showLoadingStatus: true,
      adsDataMid: [],
      adsDataBottom: [],
      featuredDealsData: [],
      qrcodeDealDetailData: {},
      qrcodeDealValue: '',
      webDomain: process.env.VUE_APP_DOMAIN,
      showDealDetailStatus: false,
      filterIsOnlineValue: false,
      detailData: {},
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,


    }
  },
  beforeRouteUpdate(to) {
    console.log(to)
    let dealId = to.query.id
    if (dealId) {
      console.log('deal detail ==========')
      this.getDealDetail(dealId)
      this.showDealDetailStatus = true
    }else{

      this.getDealsList(this.dealPage, this.dealLimit, this.sCateId)
      this.getFeaturedDealsList()
      this.showDealDetailStatus = false;
    }

  },
  mounted() {

    let dealId = this.$route.query.id;
    if (dealId) {
      this.getDealDetail(dealId)
      this.showDealDetailStatus = true;

    }else{
      this.showDealDetailStatus = false;
      this.getDealsList(this.dealPage, this.dealLimit, this.sCateId)
      this.getFeaturedDealsList()
    }

    this.getSubIdentityList()
    this.getTagsList()
    this.getDealsAreaList()
    // this.getAdsList()

  },
  methods: {
    backToSearchResults(){
      this.showDealDetailStatus = false;
      this.getDealsList(this.dealPage, this.dealLimit, this.sCateId)
      this.getFeaturedDealsList()
    },
    readMoreDeal(id) {
      this.showDealDetailStatus = true;
      this.dealDialogVisible = false;
      this.$router.push({path: '/deals', query: {id: id}})
    },
    dealDetailForQrcode(item) {
      this.qrcodeDealDetailData = item;
      this.qrcodeDealValue = this.webDomain + '?id=' + item.id;

      this.dealDialogVisible = true;
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
          let adsDataMid = [];
          let adsDataBottom = [];
          let identity = localStorage.getItem('identity');

          if (!identity) {
            adsDataMid = res.message.filter(item => item.name == 'guest_d2');
            adsDataBottom = res.message.filter(item => item.name == 'guest_d3');
          }
          if (identity == 1) {
            adsDataMid = res.message.filter(item => item.name == 'educator_d2');
            adsDataBottom = res.message.filter(item => item.name == 'educator_d3');
          }
          if (identity == 2) {
            adsDataMid = res.message.filter(item => item.name == 'business_d2');
            adsDataBottom = res.message.filter(item => item.name == 'business_d3');
          }
          if (identity == 3) {
            adsDataMid = res.message.filter(item => item.name == 'vendor_d2');
            adsDataBottom = res.message.filter(item => item.name == 'vendor_d3');
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
    selectSubCate(cateId) {
      // console.log(cateId)
      this.dealsListData = []
      this.showLoadingStatus = true

      if (this.sCateId == cateId) {
        this.sCateId = 0
      } else {
        this.sCateId = cateId
      }
      this.getDealsList(this.dealPage, this.dealLimit, this.sCateId)

    },
    selectIsOnline() {
      this.filterIsOnlineValue = !this.filterIsOnlineValue

      this.dealsListData = []
      this.showLoadingStatus = true

      this.getDealsList(this.dealPage, this.dealLimit, this.sCateId)

    },
    locationChange(e) {
      // console.log(e)
      this.dealsListData = []
      this.showLoadingStatus = true
      this.locationValue = e
      this.getDealsList(this.dealPage, this.dealLimit, this.sCateId)
    },
    tagChange(e) {
      // console.log(e)
      this.dealsListData = []
      this.showLoadingStatus = true
      this.tagValue = e
      this.getDealsList(this.dealPage, this.dealLimit, this.sCateId)
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
    getDealsList(page, limit, sCateId) {
      let params = {
        page: page,
        limit: limit
      }
      if (sCateId != 0) {
        params.company_category_id = sCateId
      }
      if (this.locationValue != '') {
        params.city = this.locationValue
      }

      let tagValue = this.tagValue

      if (tagValue.length > 0) {
        params.tag_name = this.tagValue
      }

      let isOnline = this.filterIsOnlineValue

      if (isOnline) {
        params.is_online = 1
      } else {
        params.is_online = 0
      }

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
      this.getDealsList(e, this.dealLimit, this.sCateId)

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

              self.$router.push({path: '/edupassport', query: {redirect_params: redirectParamsStr}})
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
    initMap(lng,lat){
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
      marker.setLngLat([lng,lat]).addTo(map)

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

.deal-detail-bg-container{
  background-color: #F0F2F5;
  height: calc(100vh - 200px);
  padding: 30px;
}

.deal-detail-background{
  width:100%;
  height: 240px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  overflow: hidden;
}

.deal-detail-background-img{
  width:100%;
}

.deal-detail-c{
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.deal-detail-c-l{

}

.deal-detail-c-l-logo{
  width:150px;
  height: 150px;
  border-radius: 150px;

}

.deal-detail-c-r{
  padding-left: 25px;
}
.deal-detail-c-r-1{
  font-family: BSemiBold,  Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 45px;
  color: #262626;
}

.deal-detail-item-container{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.deal-detail-item{
  width: 45%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.deal-detail-item-l{

  font-family: Assistant-SemiBold,  Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}
.deal-detail-item-r{
  padding-left: 15px;
  font-family: AssiRegular,  Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.deal-detail-desc{
  margin-top: 25px;
  font-family: AssiRegular,  Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.map-container{
  margin-top: 25px;
}

#mapContainer{
  height: 300px;
}

.deals-list-col{
  padding-left: 12px;
}

.filter-bg-container {
  background-color: #F0F2F5;
  height: calc(100vh - 200px);
  padding: 30px;
  position: relative;
}

.offer-deal {
  width: 100%;
  text-align: center;
  padding-top: 20px;
}

.offer-deal-btn {
  width: 98%;
  font-size: 14px;
}

.deals-events-filter-container {
  margin-top: 20px;
}

.deals-events-filter-label {
  text-align: left;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
  margin-bottom: 10px;
}

.deals-events-filter-select {
  width: 100%;
}

.deals-events-filter-item {
  margin-top: 25px;
}

.filter-search-btn-container {
  margin-top: 50px;
  text-align: center;
}

.filter-contact-us-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;

}

.filter-contact-us-container span {
  font-family: BCRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 25px;
  color: #262626;
}

.deals-bg-container {
  background-color: #F0F2F5;
  height: calc(100vh - 170px - 20vh - 100px);
  padding: 0 30px 30px 30px;
}

.deals-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

}


.deals-item {
  width: 32%;
  margin-top: 20px;
  border-radius: 40px;
  overflow: hidden;

  background-color: #ffffff;
  box-shadow: 0px 0px 10px #0000001A;
}

.deals-from-col {
  padding-left: 12px;
}

.deals-from-bg-container {
  background-color: #F0F2F5;
  height: calc(100vh - 170px);
  padding: 0 30px 30px 30px;
}

.deals-from-back {
  padding-top: 25px;
}

.deals-from-back-btn {
  font-size: 20px;
}

.deals-from-label {
  margin-top: 25px;
  font-family: BSemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.deals-from-item {
  width: 100%;
  margin-top: 20px;
  border-radius: 40px;
  overflow: hidden;

  background-color: #ffffff;
  box-shadow: 0px 0px 10px #0000001A;
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
  display: flex;
  justify-content: center;
}

.xll-ads-container {
  padding: 50px 0;
  background-color: #F0F2F5;
}

.xll-ads-swiper-item {

  cursor: pointer;
  border-radius: 10px;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #EEEEEE;
}

.xll-ads-l {
  width: 60%;
  height: 100%;
}

.xll-ads-l-img {
  background-color: #faecd8;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.xll-ads-r {
  width: 36%;
}

.xll-ads-r {
  padding-right: 4%;
}

.xll-ads-r h4 {
  color: #004956;
}

.xll-ads-r h5 {
  margin-top: 20px;
}

.xll-ads-r-desc {
  font-size: 14px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.dialog-deal-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.dialog-deal-l {

}

.dialog-deal-r {

}

.dialog-deal-r-2 {
  margin-top: 25px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}

.dialog-deal-r-3 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.dialog-deal-r-4 {
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #6650B3;
  cursor: pointer;
}

.dialog-deal-r-5 {
  margin-top: 25px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.dialog-deal-r-6 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.dialog-deal-r-7 {
  margin-top: 50px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}


.qx-checked-container {

}

.qx-checked-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
}

.qx-checked-square {
  border: 1px solid #808080;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  cursor: pointer;
}

.qx-checked-label {
  text-align: left;
  margin-left: 10px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.qx-done-btn-container {
  text-align: right;
  margin-top: 20px;
}

.qx-checked-square-active {
  background-color: #6650B3;
}

.image-ads-slot {
  text-align: center;
  padding: 50px 150px;
}


@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {

}

</style>
