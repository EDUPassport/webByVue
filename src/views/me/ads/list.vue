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
              <div class="a-title">Platform:</div>
              <div class="box-container">
                <div class="box-item" :class="platformId != item.id ? '' : 'active' "
                     v-for="(item,index) in adsCategoryData" :key="index" @click="selectPlatform(item)">
                  <span>{{item.name_en}}</span>
                </div>
              </div>
            </div>

            <div class="a-container" v-if="inApp==1">
              <div class="a-title">Target Audience:</div>
              <div class="box-container">
                <div class="box-item" :class="selectIdentityData.indexOf(item.id)==-1 ? '' : 'active' "
                     @click="selectIdentity(item.id)" v-for="(item,index) in adsChildrenOneList" :key="index">
                  <span>{{item.name_en}}</span>
                </div>
              </div>
            </div>

            <div class="b-container">
              <div class="b-title">Available Ad Slots:</div>
              <div class="card-container" v-if="inApp == 1">
                <div class="card" v-for="(item,index) in adsChildrenTwoData" :key="index">
                  <div class="card-title">
                    {{item.name_en}}
                  </div>
                  <div class="card-item" v-for="(child,i) in item.children" :key="i" @click="turnCardDetail(child)">
                    <div class="card-item-img-container">
                      <el-image :src="child.image_url" ></el-image>
                    </div>
                    <div class="card-item-price">
                      {{child.name_en}}
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-container" v-if="inApp == 2">
                <div class="card">
                  <div class="card-item" v-for="(item,index) in adsChildrenTwoData" :key="index"
                       @click="turnCardDetail(item)">
                    <div class="card-item-img-container">
                      <el-image :src="item.image_url" ></el-image>
                    </div>
                    <div class="card-item-price">
                      {{item.name_en}}
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
import {GET_ADS_CATEGORY_LIST} from "@/api/api";
import dashboardAdsImg from '@/assets/ads/2.png'
import meSideMenu from "@/components/meSideMenu";

export default {
  name: "list",
  components: {
    meSideMenu
  },
  data() {
    return {
      dashboardAdsImg,
      identityList: [],
      adsCategoryData: [],
      adsChildrenOneList: [],
      adsList: [],
      platformId: 0,
      inApp: 0,
      identityStr: '',

      selectIdentityData: [],
      adsChildrenTwoData: []

    }
  },
  mounted() {

    let platformId = this.$route.query.platform_id;
    let identityStr = this.$route.query.identity;
    let inApp = this.$route.query.inApp;

    this.platformId = platformId;
    this.identityStr = identityStr;
    this.inApp = inApp;

    this.getAdsCategoryList();

    if (inApp == 1 && platformId) {
      let identityData = identityStr.split(',');
      let data = [];
      identityData.forEach(item => {
        data.push(Number(item))
      })
      this.selectIdentityData = data;
      this.getAdsCategoryListByPidWidIdentity(platformId, data);
    }

    if (inApp == 2 && platformId) {
      this.getAdsCategoryTwoData(platformId);
    }


  },
  methods: {

    turnBack(){
      this.$router.push('/me/ads/platform')
    },
    getAdsCategoryListByPidWidIdentity(pid, identityData) {
      // pid kw tree
      let data = {
        pid: pid,
        tree: 1,
        token: localStorage.getItem('token')
      }
      GET_ADS_CATEGORY_LIST(data).then(res => {
        console.log(res)
        if (res.code == 200) {
          let adsData = res.message;

          this.adsChildrenOneList = res.message;

          let adsTwoData = []
          adsData.filter(function(item) {
            // console.log(item)
            if (identityData.indexOf(item.id) != -1) {
              adsTwoData.push(item)
            }
            return adsTwoData;
          })

          this.adsChildrenTwoData = adsTwoData;

        } else {
          console.log(res.msg)
        }
      }).catch(err => {
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    getAdsCategoryTwoData(pid) {
      let data = {
        pid: pid,
        tree: 1,
        token: localStorage.getItem('token')
      }
      GET_ADS_CATEGORY_LIST(data).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.adsChildrenTwoData = res.message;
        } else {
          console.log(res.msg)
        }
      }).catch(err => {
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })
    },
    getAdsCategoryList() {
      // pid kw tree
      let data = {
        tree: 1,
        token: localStorage.getItem('token')
      }
      GET_ADS_CATEGORY_LIST(data).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.adsCategoryData = res.message;
        } else {
          console.log(res.msg)
        }
      }).catch(err => {
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    turnCardDetail(value) {
      console.log(value)
      // uni.setStorageSync('pCategoryDetail',JSON.stringify(value));
      this.$router.push({path:'/me/ads/detail',query:{id:value.id} })
    },
    selectIdentity(roleValue) {
      let data = this.selectIdentityData;
      let index = data.indexOf(roleValue);

      if (index == -1) {
        data.push(roleValue)
      } else {
        data.splice(index, 1)
      }

      this.getAdsCategoryListByPidWidIdentity(this.platformId, data);

    },
    selectPlatform(item) {
      this.platformId = item.id;
      if (item.id == 1) {
        this.inApp = 1;
        this.getAdsCategoryListByPidWidIdentity(item.id, this.selectIdentityData);
      } else {
        this.inApp = 2;
      }
      this.getAdsCategoryTwoData(item.id);
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
  width: 1100px;
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
}

.a-container {
  width: 100%;
  padding: 10px 20px;

}

.a-title {
  font-size: 16px;
  color: #808080;
}

.box-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

}

.box-item {
  background-color: rgba(0, 180, 210, 0.2);
  padding: 10px 20px;
  border-radius: 10px;
  margin: 10px 0 0 10px;
  font-size: 14px;
  cursor: pointer;
}

.b-container {
  border-top: 1px solid #EEEEEE;
  margin-top: 20px;
  padding: 10px 20px;
}

.b-title {
  font-size: 16px;
  color: #808080;
}

.card-container {
  padding: 20px;
}

.card-title {
  width: 100%;
  font-size: 14px;
}

.card {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.card-item {
  width: 48%;

  border: 1px solid #EEEDF2;

  border-radius: 20px;
  margin-top: 20px;
  background-color: #FFFFFF;

  box-shadow: 0 0 30px 0 rgba(43, 86, 112, .1);

  overflow: hidden;
  flex-wrap: wrap;
  cursor: pointer;
}

.card-item-img-container{
  width: 100%;
}

.card-item-img-container image{
  width: 100%;
}

.card-item-title {
  font-weight: 700;
  font-size: 14px;
  text-align: right;
  color: #808080;
}

.card-item-price {
  font-size: 14px;
  font-weight: 700;
  text-align: right;
  color: #303030;

  padding: 4px 10px;
  border-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-ads-tag {
  position: absolute;
  left: -60px;
  top: 20px;
  background-color: #000000;
  color: #FFFFFF;
  padding: 0px 80px;
  transform: rotate(-45deg);
  font-size: 24px;
}

.no-actived {
  background-color: #808080;
  color: #FFFFFF;
}

.active {
  background-color: #00CE47;
  color: #FFFFFF !important;
}

.ads-container {
  margin-top: 20px;
  text-align: center;
}

</style>
