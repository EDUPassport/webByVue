<template>
  <div class="container">
    <div class="container-label">
      Active deals
      <el-button link type="primary" @click="viewAllDeals()">
        VIEW ALL
      </el-button>
    </div>

    <el-scrollbar class="container-c">

      <template v-if="listData.length>0">
        <div class="deals-item" v-for="(item,index) in listData" :key="index">
          <div class="deals-item-bg">
            <el-image
                class="deals-item-background-img"
                :src="item.company_info.background_image ? item.company_info.background_image : ''"
                fit="cover"
            ></el-image>

            <!--          <div class="deals-item-favorite" v-if="item.is_favorite && item.is_favorite == 1"-->
            <!--               @click="cancelFavorite(2,item.id,index)">-->
            <!--            <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>-->
            <!--          </div>-->
            <!--          <div class="deals-item-favorite" v-else-->
            <!--               @click="addFavorite(item.id,2,item.title,item.company_logo,index)">-->
            <!--            <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>-->
            <!--          </div>-->

          </div>
          <div class="deals-item-c">
            <div class="deals-item-c-l">
              <el-avatar class="deals-logo" :src="item.company_logo"></el-avatar>
            </div>
            <div class="deals-item-c-r">
              <div class="deals-item-c-r-1">
                {{ item.company_name }}
              </div>
              <div class="deals-item-c-r-2" @click="showDealDetailDialog(item)">
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
              <!--            <el-button link  @click="showDealDetailDialog(item)">-->
              <!--              DETAILS-->
              <!--            </el-button>-->
            </div>
          </div>

        </div>

      </template>
      <template v-else>
        <el-empty style="width: 100%;" description="..."></el-empty>
      </template>

    </el-scrollbar>

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
               :url="shareUrl"
               @close="shareDialogVisible=false"
    >
    </shareCard>

  </div>

</template>

<script>
import dealDetailCard from "@/components/dealDetailCard";
import shareCard from "@/components/shareCard";

export default {
  name: "activeDealsDashboard",
  props:['listData'],
  components: {
    dealDetailCard,
    shareCard
  },
  data(){
    return {
      dealDetailData:{},
      qrcodeValue:'',
      dealDetailDialogVisible:false,
      shareDialogVisible:false,
      shareInfo:{},
      shareUrl:'',
      webDomain: process.env.VUE_APP_DOMAIN,

    }
  },
  methods:{
    showDealDetailDialog(item){
      this.dealDetailData = item;
      this.dealDetailDialogVisible = true;
      this.qrcodeValue = this.webDomain + '?id=' + item.id;
    },
    viewAllDeals(){
      this.$router.push('/deals')
    },
    shareDeal(e){
      const locationUrl = window.location.origin;

      this.shareDialogVisible = true;
      this.shareInfo = e;
      this.shareUrl = locationUrl + '/deals/detail?id='+e.id;
    },
    viewProfile(userId, identity, companyId) {
      this.$router.push({path: '/deals/vendor/profile', query: {uid: userId, i: identity, cid: companyId}})

    },

  }

}
</script>

<style scoped>

.container{
  min-width: 550px;

  background-color: #FFFFFF;
  /*padding: 25px 50px;*/
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;
}

.container-label{
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
  padding: 25px 50px;

}

.container-c{
  height: 600px;
}

.deals-item {
  width: 480px;
  margin:0 50px 25px 50px;

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
  height: 100%;
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

@media screen and (max-width: 768px) {
  .container{
    width: 100%;
    min-width: auto;
    background-color: #F0F2F5;
    box-shadow: none;
  }

  .container-label{
    font-size: 20px;
    padding: 0;
    margin: 0 15px 8px 15px;
  }

  .deals-item{
    width: auto;
    margin: 7px 15px 15px 15px;
  }

  .deals-item-bg{
    height: 150px;
  }

}

</style>