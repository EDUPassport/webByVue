<template>
  <div class="bg">
    <div class="profile-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="deals-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

          <div class="deals-list-container">

            <div class="deals-list-t">
              <div class="deals-list-label">My Deals</div>
              <div class="deals-list-t-r">
                <el-button type="default" class="post-deal-btn" round @click="postDeal()">Offer a Deal</el-button>
              </div>
            </div>
            <div class="deals-list-content">
              <div class="deals-item" v-for="(item,index) in dealsListData"  :key="index">

                <div class="deals-item-bg" :style="'background-image:url('+ item.user_info.profile_photo + ')'">
                  <div class="deals-item-t">
                    <div class="deals-item-t-l">
                      <template v-if="item.user_info">
                        <el-image class="deals-logo" :src="item.user_info.logo"></el-image>
                      </template>
                    </div>
                    <div class="deals-item-t-r">
<!--                      <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>-->
                    </div>
                  </div>
<!--                  <div class="deals-item-tag-container">-->
<!--                    <div class="deals-item-tag">Deal</div>-->
<!--                  </div>-->

                  <div class="deals-item-name-container">
                    <div class="deals-item-title"  @click="turnDealDetail(item.id)">
                      {{ item.desc }}
                    </div>
                    <div class="deals-item-name">
                      <template v-if="item.user_info">
                        {{ item.user_info.vendor_name_en }}
                      </template>
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
                    {{item.location}}
                  </div>
                </div>

                <div class="list-item-tag actived-0" v-if="item.status==0">
                  Pending
                </div>
                <div class="list-item-tag actived-1" v-if="item.status==1">
                  Active
                </div>
                <div class="list-item-tag actived-2" v-if="item.status==2">
                  Rejected
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import meSideMenu from "@/components/meSideMenu";
import {VISITOR_USER_INFO,MY_DEALS} from '@/api/api';

export default {
  name: "deals",
  components: {
    meSideMenu
  },
  data() {
    return {
      userInfo: {},
      basicUserInfo: {},
      dealsListData:[],
      dealPage:1,
      dealLimit:10,
      dealTotalNum:0,
    }
  },
  mounted() {
    // this.getVisitorBasicInfo()
    this.getMyDeals(this.dealPage,this.dealLimit)
  },
  methods: {
    postDeal(){
      this.$router.push({
        path:'/deals/offer',query:{}
      })
    },
    turnDealDetail(id){
      this.$router.push({path:'/deals/detail',query:{
        id:id
        }})
    },
    dealPageSizeChange(e) {
      console.log(e)
    },
    dealPageChange(e) {
      this.jobPage = e
      this.getMyJobs(e, this.dealLimit)
      console.log(e)
    },
    getMyDeals(page,limit){
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      MY_DEALS(params).then(res=>{
        console.log(res)
        if (res.code == 200) {
          this.dealsListData = res.message.data
          // console.log(res.message.data)
          this.dealTotalNum = res.message.total
        } else {
          console.log(res.msg)
        }
      })

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
.deals-r-container{
  padding: 0 20px;
}
.deals-list-container {
  padding: 20px;
  border-radius:10px;
  background-color: #FFFFFF;
}

.deals-list-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #EEEEEE;
}

.deals-list-label {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}
.post-deal-btn{
  background-color: #0AA0A8;
  color: #FFFFFF;
}
.deals-list-content {
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
  border: 1px solid #eeeeee;
  background-color: #ffffff;
  position: relative;
  box-shadow: 0px 0px 4px 0px rgba(50, 50, 50, 0.47);
}

.deals-item-bg {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
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
  font-weight: bold;
}

.deals-item-title:hover{
  text-decoration: underline;
  font-size: 18px;
}
.deals-item-name {
  color: #ffffff;
  font-size: 16px;
  text-align: left;
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
  width: 80%;
  font-size: 12px;
  color: #808080;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.deals-pagination{
  margin-top: 20px;
}

.list-item-tag {
  position: absolute;
  top: 8px;
  right: -60px;
  color: #FFFFFF;
  transform: rotate(30deg);
  padding: 4px 80px 4px 160px;
  text-align: center;
  font-size:14px;
}

.actived-0 {
  background-color: #00B3D2;
}

.actived-1 {
  background-color: #B1C452;
}

.actived-2 {
  background-color: #FF2870;
}
</style>