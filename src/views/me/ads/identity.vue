<template>
  <div class="bg">
    <div class="favorites-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="list-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="back-btn-container">
            <el-button class="back-btn" plain round @click="turnBack()">Back</el-button>
          </div>

          <div class="list-title">
            Target Audience
          </div>
          <div class="list-content">
            Who do you want to be seen by?
          </div>

          <template v-if="adsCategoryData.length>0">
            <div class="list-container" >
              <div class="list-item" v-for="(item,i) in adsCategoryData" :key="i"
                   :class="selectRoleData.indexOf(item.id)==-1 ? '' : 'active' "
                   @click="selectRole(item.id)"
              >
                <el-image :src="item.icon_before"></el-image>
                <span>{{item.name_en}}</span>
              </div>
            </div>
            <div class="next-btn-container">
              <el-button class="next-btn" type="primary"  @click="turnNext()" >Next</el-button>
            </div>
          </template>
          <template v-else>
            <div class="empty-tips">
              You have no ads yet.
            </div>
          </template>

          <div class="ads-container">
            <el-image :src="dashboardAdsImg"></el-image>
          </div>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {GET_ADS_CATEGORY_LIST} from "@/api/api";
import dashboardAdsImg from '@/assets/ads/2.png'
import meSideMenu from "@/components/meSideMenu";

export default {
  name: "identity",
  components: {
    meSideMenu
  },
  data() {
    return {
      dashboardAdsImg,
      selectRoleData: [],
      adsCategoryData: [],
      platformId: 0,
      inApp:1

    }
  },
  mounted() {
    let platformId = this.$route.query.platform_id
    if(platformId){
      this.platformId = platformId
      this.getAdCategoryList(platformId)
    }

  },
  methods: {
    selectRole(roleValue) {
      let data = this.selectRoleData;
      let index = data.indexOf(roleValue);
      if (index == -1) {
        // data.splice(0, 1, roleValue);
        data.push(roleValue)
      } else {
        data.splice(index, 1)
      }

      this.selectRoleData = data;
      console.log(data)
    },
    turnNext() {
      let sRoleData = this.selectRoleData;

      if (sRoleData.length == 0) {
        return this.$message.error('Please select');
      }
      let platformId = this.platformId;
      let sRoleStr = sRoleData.join(',')
      this.$router.push({path:'/me/ads/list',query:{platform_id:platformId,identity:sRoleStr,inApp:1}})

    },
    turnBack(){
      this.$router.push('/me/ads/platform')
    },
    getAdCategoryList(platformId){
      let params = {
        token: localStorage.getItem('token'),
        tree: 1,
        pid: platformId
      }
      GET_ADS_CATEGORY_LIST(params).then(res=>{
        console.log(res)
        if (res.code == 200) {
          this.adsCategoryData = res.message

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


  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.active {
  background-color: #00CE47 !important;
  color: #FFFFFF !important;
}
.favorites-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.list-col{
  padding: 0 20px;
}

.back-btn-container{
  padding:0 20px;
}

.back-btn{

}

.list-title {

  font-size: 18px;
  font-weight: 700;
  text-decoration: underline;
  text-align: center;
}

.list-content {
  margin-top: 20px;
  font-size: 16px;
  color: #CCCCCC;
  text-align: center;

}

.list-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 90%;
  margin: 20px auto 0;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
}

.list-item{
  width: 44%;
  height: 200px;
  margin-top: 20px;
  /* border: 1rpx solid #E0E0E0; */
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding:1%;
  font-size: 18px;
  color: #808080;
  cursor:pointer;
}

.list-item:hover{
  background-color: #EEEEEE;
}

.ads-container {
  margin-top: 20px;
  text-align: center;
}

.empty-tips{
  font-size: 14px;
  color: #808080;
  text-align: center;
}
.next-btn-container{
  text-align: center;
  margin: 20px;

}
</style>
