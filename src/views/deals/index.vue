<template>
  <div class="bg" v-loading="showLoadingStatus">
    <div class="xll-container">
      <el-row align="middle" justify="center">
        <el-col class="sub-cate-container" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="sub-cate-item" v-for="(item,i) in subCateData" :key="i"
               :class="sCateId == item.id ? 'sub-cate-item-active' : ''"
               @click="selectSubCate(item.id)">
            <el-image class="sub-cate-icon" :src="item.icon_url"></el-image>
            <span>{{item.identity_name}}</span>
          </div>
        </el-col>
      </el-row>

      <el-row class="content-container" align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="offer-deal">
            <el-button class="offer-deal-btn" type="primary" @click="offerDeal()" round>
              Offer a Deal
            </el-button>
          </div>
          <div class="deals-events-filter-container">
            <div class="deals-events-filter-label">Deals & Events</div>
            <div class="deals-events-filter-location">
              <el-select class="deals-events-filter-select" v-model="locationValue" clearable
                         placeholder="Location"
                         size="medium"
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
            <div class="deals-events-filter-tags">
              <el-select class="deals-events-filter-select" v-model="tagValue" clearable multiple placeholder="Tags"
                         size="medium"
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
          </div>
          <featuredJobs></featuredJobs>
          <featuredDeals></featuredDeals>
          <latestIndustryNews></latestIndustryNews>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">

          <div class="xll-ads-container" v-if="adsDataMid.length>0">
            <el-carousel height="180px" indicator-position="none" >
              <el-carousel-item class="xll-ads-swiper-item"
                                v-for="(item,i) in adsDataMid" :key="i"
                                @click="turnBanner(item.link)"
              >
                <div class="xll-ads-l">
                  <el-image class="xll-ads-l-img"
                            :src="item.user_url !='' ? item.user_url : item.url">
                    <template #error>
                      <div class="image-ads-slot">
                        <el-icon :size="80" color="#808080"><Picture /></el-icon>
                      </div>
                    </template>
                  </el-image>
                </div>
                <div class="xll-ads-r">
                  <h4>Advertise with Us</h4>
                  <h5>Description:</h5>
                  <div class="xll-ads-r-desc">
                    Your Adverts and their description will be displayed here.
                    Just click on the banner
                  </div>

                </div>
              </el-carousel-item>
            </el-carousel>

          </div>


          <div class="deals-container">
            <div class="deals-item" v-for="(item,index) in dealsListData"  :key="index">
              <div class="deals-item-bg"
                   :style="item.user_info.header_photo !='' ? 'background-image:url('+ item.user_info.header_photo + ')' : ''">
                <div class="deals-item-t">
                  <div class="deals-item-t-l">
                    <template v-if="item.user_info">
                      <el-image class="deals-logo" :src="item.user_info.logo"></el-image>
                    </template>
                  </div>
                  <div class="deals-item-t-r" v-if="item.is_favorite && item.is_favorite == 1"
                       @click="cancelFavorite(2,item.id,index)">
                    <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
                  </div>
                  <div class="deals-item-t-r" v-else @click="addFavorite(item.id,2,item.title,item.user_info.logo,index)">
                    <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
                  </div>
                </div>
                <!--                <div class="deals-item-tag-container">-->
                <!--                  <div class="deals-item-tag">Deal</div>-->
                <!--                </div>-->

                <div class="deals-item-name-container">
                  <div class="deals-item-title" @click="turnDealDetail(item.id)">
                    {{ item.title }}
                  </div>
                  <div class="deals-item-name">
                    {{item.desc}}
                  </div>
                </div>

              </div>

              <div class="deals-item-b">
                <div class="deals-item-b-l">
                  <template v-if="item.vendor_type_icon">
                    <el-image class="hot-deal-type-icon" :src="item.vendor_type_icon.icon_url"></el-image>
                  </template>
                </div>
                <div class="deals-item-b-r">
                  <template v-if="item.user_info">
                    {{ item.user_info.vendor_name_en }}
                  </template>
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

          <div class="xll-ads-container xll-ads-container-margin" v-if="adsDataBottom.length>0">
            <el-carousel height="180px" indicator-position="none" >
              <el-carousel-item class="xll-ads-swiper-item" v-for="(item,i) in adsDataBottom" :key="i">
                <div class="xll-ads-l">
                  <el-image class="xll-ads-l-img"
                            :src="item.user_url !='' ? item.user_url : item.url">
                    <template #error>
                      <div class="image-ads-slot">
                        <el-icon :size="80" color="#808080"><Picture /></el-icon>
                      </div>
                    </template>
                  </el-image>
                </div>
                <div class="xll-ads-r">
                  <h4>Advertise with Us</h4>
                  <h5>Description:</h5>
                  <div class="xll-ads-r-desc">
                    Your Adverts and their description will be displayed here.
                    Just click on the banner
                  </div>

                </div>
              </el-carousel-item>
            </el-carousel>

          </div>


        </el-col>
      </el-row>

    </div>
  </div>

</template>

<script>
import featuredJobs from "@/components/featuredJobs";
import featuredDeals from "@/components/featuredDeals";
import latestIndustryNews from "@/components/latestIndustryNews";
import {
  SUB_CATE_LIST,
  TAGS_LIST,
  DEALS_LIST,
  DEALS_AREA_LIST,
  ADD_FAVORITE,
  CANCEL_FAVORITE,
  GET_BASIC_INFO, CHANGE_IDENTITY_LANGUAGE, ADS_LIST
} from "@/api/api";
import {encode} from "js-base64";

export default {
  name: "index",
  components:{
    featuredJobs,
    featuredDeals,
    latestIndustryNews
  },
  data(){
    return {
      subCateData:[],
      locationValue: '',
      locationOptions: [],
      tagValue:[],
      tagsData:[],
      dealsListData:[],
      dealPage:1,
      dealLimit:10,
      dealTotalNum:0,
      sCateId:0,
      showLoadingStatus:true,
      adsDataMid:[],
      adsDataBottom:[],

    }
  },
  mounted() {
    this.getSubCateList(3)
    this.getTagsList()
    this.getDealsAreaList()
    this.getAdsList()
    this.getDealsList(this.dealPage,this.dealLimit,this.sCateId)
  },
  methods: {
    turnBanner(link){
      console.log(link)
      if (link != '') {
        window.location.href =  link
      } else {
        let token = localStorage.getItem('token')
        if(!token){
          window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4','_blank')

          return;
        }
        this.$router.push('/me/ads/platform')
      }
    },
    getAdsList(){
      let ads_data = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(ads_data).then(res=>{
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

          if(adsDataMid.length>0){
            this.adsDataMid = adsDataMid[0].data;
          }
          if(adsDataBottom.length>0){
            this.adsDataBottom = adsDataBottom[0].data;
          }

        }

      }).catch(err=>{
        this.$message.error(err.msg)
      })
    },
    turnDealDetail(id){
      this.$router.push({path:'/deals/detail',query:{
          id:id
        }})
    },
    selectSubCate(cateId){
      // console.log(cateId)
      this.dealsListData = []
      this.showLoadingStatus=true

      if(this.sCateId == cateId){
        this.sCateId = 0
      }else{
        this.sCateId = cateId
      }
      this.getDealsList(this.dealPage,this.dealLimit,this.sCateId)

    },
    locationChange(e){
      // console.log(e)
      this.dealsListData = []
      this.showLoadingStatus=true
      this.locationValue = e
      this.getDealsList(this.dealPage,this.dealLimit,this.sCateId)
    },
    tagChange(e){
      // console.log(e)
      this.dealsListData = []
      this.showLoadingStatus=true
      this.tagValue = e
      this.getDealsList(this.dealPage,this.dealLimit,this.sCateId)
    },
    getSubCateList(pid) {
      let params = {
        pid: pid,
        tree: 0
      }

      SUB_CATE_LIST(params).then(res=>{
        console.log(res)
        if(res.code  == 200){
          this.subCateData = res.message
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getTagsList(){
      let params = {
        page:1,
        limit:1000
      }
      TAGS_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.tagsData = res.message.data;
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getDealsList(page,limit,sCateId) {
      let params = {
        page: page,
        limit: limit
      }
      if(sCateId != 0){
        params.vendor_type_id = sCateId
      }
      if(this.locationValue != ''){
        params.city = this.locationValue
      }

      let tagValue = this.tagValue

      if(tagValue.length>0){
        params.tag_name = this.tagValue
      }

      DEALS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.dealsListData = res.message.data;
          this.dealTotalNum = res.message.total
          this.showLoadingStatus=false
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getDealsAreaList(){
      DEALS_AREA_LIST({}).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.locationOptions = res.message
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    dealPageSizeChange(e){
      console.log(e)
    },
    dealPageChange(e){
      this.showLoadingStatus=true
      this.dealPage = e
      this.getDealsList(e, this.dealLimit,this.sCateId)

      document.documentElement.scrollTop = 200
    },
    addFavorite(id, type, title, url,index) {
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
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    cancelFavorite(type,typeId,index){
      let params = {
        token:localStorage.getItem('token'),
        type:type,
        type_id:typeId
      }
      CANCEL_FAVORITE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.dealsListData[index]['is_favorite'] = 0
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    offerDeal(){
      let token = localStorage.getItem('token')
      let self = this
      if(!token || token == ''){
        return this.$msgbox({
          title:'Offer a Deal',
          message:'Before offer a deal, you need to log in',
          type:'warning',
          confirmButtonText:'Log in',
          callback(action){
            console.log(action)
            if(action==='confirm'){
              let redirectParamsObj = {
                path:'/deals',
                query:{
                  id:self.$route.query.id
                }
              }

              let redirectParamsStr =encode(JSON.stringify(redirectParamsObj))

              self.$router.push({path:'/login',query:{redirect_params:redirectParamsStr}})
            }
          }
        })
      }

      let identity = localStorage.getItem('identity')

      if(identity != 3){
        this.selectRole(3)
      }

      self.$router.push({path:'/deals/offer',query:{}})
    },
    selectRole(e) {
      let uid = localStorage.getItem('uid')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        let isEducator = res.message.is_educator;
        let isBusiness = res.message.is_business;
        let isVendor = res.message.is_vendor;
        // let isOther = res.message.is_other;
        // let identity = res.message.identity;

        if (e == 1) {
          if (isEducator >= 10) {
            let firstName = res.message.educator_info.first_name;
            let lastName = res.message.educator_info.last_name;
            let avatar = res.message.educator_info.profile_photo;

            localStorage.setItem('name', firstName + ' ' + lastName)
            localStorage.setItem('avatar', avatar)
            localStorage.setItem('first_name', firstName)
            localStorage.setItem('last_name', lastName)

            this.$store.commit('username', firstName + ' ' + lastName)
            this.$store.commit('userAvatar', avatar)

            this.changeIdentity(1)
          } else {
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push('/role/educator')
          }

        }
        if (e == 2) {
          if (isBusiness >= 10) {
            let firstName = res.message.business_info.first_name;
            let lastName = res.message.business_info.last_name;
            let avatar = res.message.business_info.profile_photo;
            localStorage.setItem('name', firstName + ' ' + lastName)
            localStorage.setItem('avatar', avatar)
            localStorage.setItem('first_name', firstName)
            localStorage.setItem('last_name', lastName)

            this.$store.commit('username', firstName + ' ' + lastName)
            this.$store.commit('userAvatar', avatar)

            this.changeIdentity(2)
          } else {
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push('/role/business')
          }

        }
        if (e == 3) {
          if (isVendor >= 10) {
            let firstName = res.message.vendor_info.first_name;
            let lastName = res.message.vendor_info.last_name;
            let avatar = res.message.vendor_info.profile_photo;

            localStorage.setItem('name', firstName + ' ' + lastName)
            localStorage.setItem('avatar', avatar)
            localStorage.setItem('first_name', firstName)
            localStorage.setItem('last_name', lastName)

            this.$store.commit('username', firstName + ' ' + lastName)
            this.$store.commit('userAvatar', avatar)

            this.changeIdentity(3)
          } else {
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push('/role/vendor')
          }

        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    changeIdentity(identity) {
      let params = {
        token: localStorage.getItem('token'),
        identity: identity
      }

      CHANGE_IDENTITY_LANGUAGE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          localStorage.setItem('identity', identity)
          this.$store.commit('identity',identity)
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    }

  }
}
</script>

<style scoped>
.bg{
  background-color: #f5f6f7;
}
.xll-container{
  /*width: 1100px;*/
  margin: 0 auto;
}
.sub-cate-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding:10px 40px;
  /*border-bottom: 1px solid #eeeeee;*/
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.sub-cate-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}
.sub-cate-item-active{
  border: 1px solid #0AA0A8;
  border-radius: 8px;
}
.sub-cate-icon{
  width: 80px;
  height: 80px;
}
.sub-cate-item span{
  font-size: 14px;
}
.content-container{
  padding: 20px;
}

.offer-deal{
  width: 100%;
  text-align: center;
  padding-top: 20px;
}

.offer-deal-btn{
  width: 98%;
  font-size: 14px;
}

.deals-events-filter-container{
  background-color: #ffffff;
  /*border: 1px solid #eeeeee;*/
  margin-top:20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.deals-events-filter-label{
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.deals-events-filter-location{
  margin-top: 10px;
}
.deals-events-filter-select{
  width: 100%;
}

.deals-events-filter-tags{
  margin-top: 10px;
}

.deals-container{
  padding-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.deals-item {
  width: 48%;
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden;
  /*border: 1px solid #eeeeee;*/
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.deals-item-bg {
  background-color: #faf7f7;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.deals-item:hover {
  /*border: 1px solid #eeeeee;*/
  /*box-shadow: 0px 5px 4px 0px rgba(50, 50, 50, 0.47);*/
}

.deals-item-t {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 10px 40px 10px;
  background-color: rgba(0,0,0,0.3);
}

.deals-item-t-l {

}

.deals-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #FFFFFF;
}

.deals-item-t-r {
  color: #ffffff;

}

.xll-heart-icon {
  font-size: 30px !important;
}

.deals-item-tag-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
}

.deals-item-tag {
  background-color: #0AA0A8;
  color: #ffffff;
  padding: 4px 14px;
  border-radius: 4px;

}

.deals-item-name-container {
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.6);
}

.deals-item-title {
  color: #ffffff;
  font-size: 16px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
}

.deals-item-title:hover{
  text-decoration: underline;

}

.deals-item-name {
  color: #ffffff;
  font-size: 14px;
  text-align: left;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.deals-item-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.deals-item-b-l {
  width: 20%;
  text-align: left;
}

.hot-deal-type-icon{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.deals-item-b-r {
  width: 79%;
  font-size: 12px;
  color: #808080;
  padding-right: 20px;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.deals-pagination{
  margin-top: 20px;
  text-align: center;
}

.xll-ads-container{
  padding: 20px 0 0 20px;
}

.xll-ads-container-margin{
  margin-top: 20px;
  margin-bottom: 20px;
}

.xll-ads-swiper-item{
  cursor:pointer;
  border-radius: 10px;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.xll-ads-l{
  width:60%;
  height: 100%;
}
.xll-ads-l-img{
//width: 100%;
  height: 100%;
  border-radius:10px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
}

.xll-ads-r{
  width:36%;
}

.xll-ads-r{
  padding-right: 4%;
}
.xll-ads-r h4{
  color:#004956;
}

.xll-ads-r h5{
  margin-top:20px;
}

.xll-ads-r-desc{
  font-size: 14px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}


@media screen and (min-width: 1200px){
  .xll-container{
    width: 1100px;
  }
}

.image-ads-slot{
  text-align: center;
  padding:50px 150px;
}

</style>