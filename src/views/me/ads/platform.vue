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
            Platform of Choice
          </div>
          <div class="list-content">
            Which platform do you want to be seen on?
          </div>
          <div class="list-container" >
            <template v-if="adsCategoryData.length>0">
              <div class="list-item" v-for="(item,i) in adsCategoryData" :key="i"
                   @click="selectPlatform(item.id,item.name_key)"
              >
                <el-image :src="item.icon_before"></el-image>
                <span>{{item.name_en}}</span>
              </div>

            </template>
            <template v-else>
              <div class="empty-tips">
                You have no ads yet.
              </div>
            </template>
          </div>
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
  name: "platform",
  components: {
    meSideMenu
  },
  data() {
    return {
      dashboardAdsImg,
      adsCategoryData: [],

    }
  },
  mounted() {
    this.getAdCategoryList()
  },
  methods: {
    selectPlatform(id,key) {

      if(key == 'App'){
        this.$router.push({path:'/me/ads/identity',query:{platform_id:id,inApp:1}})

      }else{
        this.$router.push({path:'/me/ads/list',query:{platform_id:id,inApp:2}})

      }

    },
    turnBack(){
      this.$router.push('/me/ads')
    },
    getAdCategoryList(){
      let params = {
        token: localStorage.getItem('token'),
        tree: 1
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

</style>
