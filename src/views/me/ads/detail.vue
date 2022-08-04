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

          <div class="list-container">
              <div class="a-container">
                <div class="a-card" v-if="adsData.image_url">
                  <el-image class="a-card-image" :src="adsData.image_url" ></el-image>
                </div>
                <div class="a-title">
                  {{adsData.title_cn}}
                </div>
              </div>

              <div class="b-container">
                <div class="b-title">Ad Slot Details:</div>
                <div class="b-desc">
                  {{adsData.desc_en}}
                </div>
                <div class="third-service">
                  <span>Would you like us to help you design your ad?</span>
                  <div class="lei-switch">
                    <div class="lei-switch-yes" :class="switchValue==1 ? 'lei-switch-yes-active' : '' "
                          @click="leiSwitchEvent(1)">Yes</div>
                    <div class="lei-switch-no" :class="switchValue == 0 ? 'lei-switch-no-active' : '' "
                          @click="leiSwitchEvent(0)">No</div>
                  </div>
                </div>

                <div v-for="(item,index) in adsData.children" :key="index">

                  <div v-if="item.children.length>0">
                    <div v-for="(child,i) in item.children" :key="i">
                      <div class="b-purchase" v-if="child.children.length>0">

                      </div>
                      <div class="b-purchase" v-else>

                        <div class="b-purchase-t">
                          <div class="up-down" @click="selectIndexEvent(child.id)">
                            <template v-if="selectIndexData.indexOf(child.id) == -1">
                              <el-icon><arrow-down-bold /></el-icon>
                            </template>
                            <template v-else>
                              <el-icon><arrow-up-bold /></el-icon>
                            </template>

                          </div>
                          <div class="b-purchase-title" @click="selectIndexEvent(child.id)">
                            {{child.name_en}}
                          </div>
                          <div class="b-purchase-button">
                            <el-button type="parimary" @click="purchase(child)">Purchase</el-button>
                          </div>
                        </div>
                        <div class="b-purchase-b" v-if="selectIndexData.indexOf(child.id) != -1">
                          <div class="b-purchase-b-title">
                            {{child.title_en}}
                          </div>
                          <div class="b-purchase-b-desc">
                            {{child.desc_en}}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div v-else class="b-purchase">
                    <div class="b-purchase-t">
                      <div class="up-down" @click="selectIndexEvent(item.id)">
                        <template v-if="selectIndexData.indexOf(item.id) == -1">
                          <el-icon><arrow-down-bold /></el-icon>
                        </template>
                        <template v-else>
                          <el-icon><arrow-up-bold /></el-icon>
                        </template>

                      </div>
                      <div class="b-purchase-title" @click="selectIndexEvent(item.id)">
                        {{item.name_en}}
                      </div>
                      <div class="b-purchase-button">
                        <el-button type="primary" @click="purchase(item)">Purchase</el-button>
                      </div>
                    </div>
                    <div class="b-purchase-b" v-if="selectIndexData.indexOf(item.id) != -1">
                      <div class="b-purchase-b-title">
                        {{item.title_en}}
                      </div>
                      <div class="b-purchase-b-desc">
                        {{item.desc_en}}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
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
import {GET_ADS_CATEGORY_INFO} from "@/api/api";
import dashboardAdsImg from '@/assets/ads/2.png'
import meSideMenu from "@/components/meSideMenu";
// import {accMul,accDiv,accSub} from "@/utils"

export default {
  name: "detail",
  components: {
    meSideMenu
  },
  data() {
    return {
      dashboardAdsImg,
      adsData: [],
      selectIndex: -1,
      switchValue: 2,
      designMoney: 20,
      selectIndexData: []

    }
  },
  mounted() {
    let id = this.$route.query.id;

    this.getCategoryInfo(id)


  },
  methods: {

    turnBack(){
      this.$router.push('/me/ads/list')
    },
    selectIndexEvent(id) {
      let selectIndexData = this.selectIndexData;
      let index = selectIndexData.indexOf(id)
      if (index == -1) {
        this.selectIndexData.push(id)
      } else {
        this.selectIndexData.splice(index, 1)
      }
    },
    getCategoryInfo(id) {
      let data = {
        category_id: id
      }
      GET_ADS_CATEGORY_INFO(data).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.adsData = res.message;
        } else {
          console.log(res.msg)
        }
      }).then(err => {
        console.log(err)
      })
    },
    leiSwitchEvent(value) {
      this.switchValue = value;
      if (value == 1) {
        this.$msgbox({
          title:"Notice",
          message:"This feature will cost you an additional ￥20",
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
    },
    purchase(value) {
      console.log(value)
      this.$msgbox({
        title:"Notice",
        message:"Oops! Our system is down at the moment. Don’t worry our Account Manager has been notified and will be in touch with you soon.",
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
            window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4','_blank')

          }
        }

      })

      // let token = localStorage.getItem('token');
      //
      // let adsMoney = accMul(value.money,accDiv(accSub(100,value.discount),100));
      //
      // let designValue = this.switchValue;
      //
      // if (designValue == 2) {
      //   return this.$message.warning('Please choose whether you want us to help you design your ad')
      // }
      //
      // if (designValue == 1) {
      //   adsMoney += 2000
      // }
      //
      // console.log(token)
      // console.log(adsMoney)

    }



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
  margin: 0 auto;
  padding: 20px 0;
}

.list-col{
  padding: 0 20px;
}

.back-btn-container{
  padding:0 ;
}

.back-btn{

}
.list-container{
  background-color: #FFFFFF;
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;

}

.a-container {
  background-color: #FFFFFF;
  padding: 20px 20px 20px 20px;
}

.a-card {
  width: 100%;
  margin: 0 auto;
  background-color: #FFFFFF;
  border-radius: 20px;

}

.a-card-image {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(43, 86, 112, .2);
}

.a-title {
  font-size: 18px;
  font-weight: 700;
  margin-top: 20px;
}

.a-price {
  font-size: 18px;
  font-weight: 700;
  color: #FF2870;
}

.b-container {
  background-color: #FFFFFF;
  padding: 20px 20px 20px 20px;
}

.b-title {
  font-size: 16px;
  font-weight: 700;
  text-decoration: underline;
}

.b-desc {
  font-size: 14px;
  color: #808080;
  line-height: 30px;
}

.third-service {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
}

.third-service span {
  display: block;
  width: 75%;
  font-size: 16px;
  text-decoration: underline;
  /* transform: scale(.9); */
}

.lei-switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.lei-switch-yes {
  background-color: #f5f6f7;
  border: 1px solid #EEEEEE;
  padding: 4px 20px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 14px;
  cursor: pointer;
}

.lei-switch-no {
  padding: 4px 20px;
  background-color: #f5f6f7;
  border: 1px solid #EEEEEE;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 14px;
  cursor: pointer;
}

.lei-switch-yes-active {
  background-color: #00CE47;
  color: #FFFFFF;
}

.lei-switch-no-active {
  background-color: #EF2D37;
  color: #FFFFFF;
}

.b-purchase {}

.b-purchase-t {
  background-color: #F4F5F6;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border: 1px solid #EEEEEE;
}

.up-down {
  width: 10%;
}

.down-up {}

.b-purchase-title {
  width: 60%;
  text-align: center;
  font-size: 14px;
}

.b-purchase-button {}

.b-purchase-button  {

}

.b-purchase-b {
  background-color: #FFFFFF;
  padding: 20px;

  border-bottom: 1px solid #EEEEEE;
  border-left: 1px solid #EEEEEE;
  border-right: 1px solid #EEEEEE;
  border-radius: 10px;
}

.b-purchase-b-title {
  font-size: 16px;
  font-weight: 700;
}

.b-purchase-b-desc {
  font-size: 14px;
  line-height: 30px;
  color: #808080;
}
.ads-container {
  margin-top: 20px;
  text-align: center;
}

@media screen and (min-width: 1200px){
  .favorites-container{
    width: 1100px;
  }

}

@media screen and (max-width: 768px){

}


</style>
