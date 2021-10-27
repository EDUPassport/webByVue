<template>
  <div class="bg">
    <div class="profile-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="dashboard-container">
            <div class="dashboard-label">Dashboard</div>
            <div class="dashboard-content">
              <div class="dashboard-item jobs-bg">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                </div>
                <div class="dashboard-item-r">
                  <router-link to="/">Job Posts</router-link>
                </div>
              </div>
              <div class="dashboard-item deals-bg">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                </div>
                <div class="dashboard-item-r">
                  <router-link to="/"> My Deals</router-link>
                </div>
              </div>

              <div class="dashboard-item ads-bg">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                </div>
                <div class="dashboard-item-r">
                  <router-link to="/">My Ads</router-link>
                </div>
              </div>

              <div class="dashboard-item events-bg">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                </div>
                <div class="dashboard-item-r">
                  <router-link to="/">Events</router-link>
                </div>
              </div>

              <div class="dashboard-item favorites-bg">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                </div>
                <div class="dashboard-item-r">
                  <router-link to="/">My Favorites</router-link>
                </div>
              </div>

              <div class="dashboard-item msg-bg">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                </div>
                <div class="dashboard-item-r">
                  <router-link to="/">My Messages</router-link>
                </div>
              </div>

            </div>
          </div>

          <accountInfo></accountInfo>

          <div class="ads-container">
            <el-image class="ads-img" :src="dashboardAdsImg"></el-image>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import accountInfo from "../../components/accountInfo";
import meSideMenu from "@/components/meSideMenu";
import {VISITOR_USER_INFO} from '@/api/api';
import dashboardListsImg from '@/assets/dashboard/list.png'
import dashboardAdsImg from '@/assets/ads/2.png'

export default {
  name: "index",
  components: {
    meSideMenu,
    accountInfo
  },
  data() {
    return {
      dashboardListsImg,
      dashboardAdsImg,
      userInfo: {},
      basicUserInfo: {}
    }
  },
  mounted() {
    this.getVisitorBasicInfo()
  },
  methods: {
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


.dashboard-container {
  padding: 20px;
  text-align: left;
}

.dashboard-label {
  font-size: 20px;
  font-weight: bold;
}

.dashboard-content {
  padding: 20px;
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

}

.dashboard-item {
  width: 45%;
  background-color: #EEEEEE;
  color: #ffffff;
  margin-top: 20px;
  padding: 1%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.dashboard-item-l {

}

.dashboard-item-l-icon {
  width: 50px;
  height: 50px;
}

.dashboard-item-r {
  padding-left: 20px;
}
.dashboard-item-r a{
  text-decoration: none;
  color: #FFFFFF;
}
.ads-container {
  margin-top: 20px;
  padding: 20px;
}
.ads-img{
  width: 100%;
  border-radius: 10px;
}
.jobs-bg {
  background-color: #870043;
}

.deals-bg {
  background-color: #48cdda;
}

.ads-bg {
  background-color: #20aec6;
}

.events-bg {
  background-color: #A8BD4E;
}

.favorites-bg {
  background-color: #FE2563;
}

.msg-bg {
  background-color: #00525F;
}
</style>