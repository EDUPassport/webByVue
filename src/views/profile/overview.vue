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
              <div class="dashboard-item">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon"></el-image>
                </div>
                <div class="dashboard-item-r">
                  Job Posts
                </div>
              </div>
              <div class="dashboard-item">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon"></el-image>
                </div>
                <div class="dashboard-item-r">
                  My Deals
                </div>
              </div>

              <div class="dashboard-item">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon"></el-image>
                </div>
                <div class="dashboard-item-r">
                  My Ads
                </div>
              </div>

              <div class="dashboard-item">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon"></el-image>
                </div>
                <div class="dashboard-item-r">
                  Events
                </div>
              </div>

              <div class="dashboard-item">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon"></el-image>
                </div>
                <div class="dashboard-item-r">
                  My Favorites
                </div>
              </div>

              <div class="dashboard-item">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon"></el-image>
                </div>
                <div class="dashboard-item-r">
                  My Messages
                </div>
              </div>

            </div>
          </div>

          <accountInfo></accountInfo>

          <div class="ads-container">
            <el-image></el-image>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import accountInfo from "../../components/accountInfo";
import meSideMenu from "@/components/meSideMenu";
export default {
  name: "index",
  components:{
    meSideMenu,
    accountInfo
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


.dashboard-container{
  padding: 20px;
  text-align: left;
}
.dashboard-label{
  font-size: 20px;
  font-weight: bold;
}

.dashboard-content{
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

.dashboard-item{
  width: 45%;
  background-color: #0AA0A8;
  color: #ffffff;
  margin-top: 20px;
  padding: 1%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.dashboard-item-l{

}
.dashboard-item-l-icon{
  width: 50px;
  height: 50px;
}

.dashboard-item-r{
  padding-left: 20px;
}




.ads-container{
  margin-top: 20px;
}

</style>