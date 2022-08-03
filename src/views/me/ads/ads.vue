<template>
  <div class="bg">
    <div class="favorites-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="list-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="purchase-btn-contianer">
            <el-button type="primary" round @click="turnPurchase()" >Purchase</el-button>
          </div>

          <div class="list-container" >
            <div class="list-label">
              <h3>Purchased Advertisement Slots</h3>
              <div class="list-label-underline"></div>
            </div>
            <template v-if="myAdsData.length>0">
              <div class="list-item" v-for="(item,i) in myAdsData" :key="i">
                <div class="list-item-l" v-if="item.parent_info">
                  <el-image class="list-item-l-img" :src="item.parent_info.image_url"></el-image>
                </div>
                <div class="list-item-r">
                  <h3  v-if="item.parent_info">{{item.parent_info.title_en}}</h3>
                  <div class="list-item-desc" v-if="item.parent_info">
                    {{item.parent_info.desc_en}}
                  </div>
                  <div class="list-item-redeem-container">
                    <template v-if="item.is_pay==1">
                      <el-button class="list-item-redeem-btn" type="primary" round
                        @click="redeem(item)"
                      >Redeem</el-button>
                    </template>
                    <template v-else>
                      <el-button class="list-item-redeem-btn" type="warning" round
                      @click="pay()"
                      >Pay</el-button>
                    </template>

                  </div>
                </div>
                <div class="list-item-type">
                  <span v-if="item.ad_category.name_en">{{ item.ad_category.name_en }}</span>
                </div>

              </div>

            </template>
            <template v-else>
              <div class="empty-tips">
                You have no ads yet.
              </div>
            </template>
          </div>
          <div class="list-pagination" v-if="myAdsData.length>0">
            <el-pagination layout="prev, pager, next" :default-current-page="1"
                           @size-change="pageSizeChange"
                           @current-change="pageChange"
                           :current-page="page" :page-size="limit"
                           :total="totalNum"></el-pagination>
          </div>
<!--          <div class="ads-container">-->
<!--            <el-image :src="dashboardAdsImg"></el-image>-->
<!--          </div>-->

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { GET_MY_ADS} from "@/api/api";
import dashboardAdsImg from '@/assets/ads/2.png'
import meSideMenu from "@/components/meSideMenu";
import {encode} from "js-base64";

export default {
  name: "ads",
  components: {
    meSideMenu
  },
  data() {
    return {
      dashboardAdsImg,
      myAdsData: [],
      page: 1,
      limit: 8,
      totalNum: 0,
    }
  },
  mounted() {
    this.getMyAdsList(this.page,this.limit)
  },
  methods: {
    turnPurchase(){
      this.$router.push('/me/ads/platform')
    },
    getMyAdsList(page,limit){
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      GET_MY_ADS(params).then(res=>{
        console.log(res)
        if (res.code == 200) {
          this.myAdsData = res.message.data
          // console.log(res.message.data)
          this.totalNum = res.message.total
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
    pageSizeChange(e) {
      console.log(e)
    },
    pageChange(e) {
      this.page = e
      this.getMyAdsList(e, this.limit)
      console.log(e)
    },
    redeem(data){
      let dataStr = JSON.stringify(data)
      this.$router.push({path:'/me/ads/redeem',query:{info:encode(dataStr)}})
    },
    pay(){
      this.$msgbox({
        title:"Notice",
        message:"Payment is not currently supported, please go to the mini program to pay.",
        dangerouslyUseHTMLString:false,
        type:"warning",
        center:true,
        showCancelButton:true,
        cancelButtonText:"Cancel",
        confirmButtonText:"Confirm",
        "round-button":true,
        callback(action){
          console.log(action)
          if(action==='confirm'){
            console.log('用户点击确定')
          }
        }

      })

    }

  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.favorites-container {
  margin: 0 auto;
  padding: 20px 0;
}

.list-col{
  padding: 0 20px;
}
.list-container{
  margin-top: 20px;
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
}

.list-item{
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  position: relative;
}

.list-item:hover{
  background-color: #EEEEEE;
}

.list-item-l{
  width: 40%;
  text-align: center;
}

.list-item-l-img{
  //width: 200px;
  height: 200px;
  border-radius: 10px;
  border: 1px solid #EEEEEE;
}

.list-item-r{
  width: 50%;

}
.list-item-title{

}
.list-item-desc{
  font-size: 14px;
  line-height: 28px;
}
.list-item-r-t{
  text-align: left;
}
.list-item-r-t a{
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
}


.list-item-type{
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  background-color: #0AA0A8;
  color: #FFFFFF;
  padding: 4px 10px;
  border-radius: 4px;
}

.list-pagination{
  margin-top: 20px;
  text-align: center;
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

.list-label{

}

.list-label-underline{
  width:40px;
  height: 2px;
  background-color: #DD4A68;
}

.list-item-redeem-container{
  text-align: right;
}

.list-item-redeem-btn{
  font-size: 16px;
}

@media screen and (min-width: 1200px){
  .favorites-container{
    width: 1100px;
  }

}

@media screen and (max-width: 768px){

}

</style>
