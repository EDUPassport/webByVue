<template>
  <div class="us-bg">
    <el-row class="banner-row" :gutter="0" align="middle" justify="center">
      <el-col class="banner-bg" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h1>Industry News</h1>
      </el-col>
    </el-row>
    <el-row   class="news-container" align="middle" justify="center" v-loading="articleListData.length<= 0">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="news-t">
          <div class="news-left-line"></div>
          <div class="news-label">Industry News</div>
        </div>
        <div class="news-content">
          <div class="news-item" v-for="(item,i) in articleListData" :key="i">
            <div class="news-item-img-container">
              <el-image class="news-item-img" :src="item.user_url !='' ? item.user_url : item.url"
                        fit="cover"></el-image>
            </div>
            <div class="news-item-title">
              {{item.title}}
            </div>
            <div class="news-item-desc">
              {{item.desc}}
            </div>
            <div class="news-item-operation">
              <div class="news-item-readmore">
                <el-button type="primary" round @click="turnDetail(item.link)">Continue Reading</el-button>
              </div>
              <div class="news-item-share">
                <el-button type="primary" icon="el-icon-share" circle></el-button>
              </div>
            </div>

          </div>
        </div>


      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ADS_LIST} from "@/api/api";

export default {
  name: "list",
  data(){
    return {
      articleListData:[]
    }
  },
  mounted() {
    this.getAdsList()
  },
  methods:{
    getAdsList() {
      let identity = localStorage.getItem('identity')

      let params = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          let adsData = res.message;
          // console.log(adsData);

          let adsDataNews = [];

          if (identity == 0 || !identity) {
            adsDataNews = adsData.filter(item => item.name == 'guest_industry_news');
          }
          if (identity == 1) {
            adsDataNews = adsData.filter(item => item.name == 'educator_industry_news');
          }
          if (identity == 2) {
            adsDataNews = adsData.filter(item => item.name == 'business_industry_news');
          }
          if (identity == 3) {
            adsDataNews = adsData.filter(item => item.name == 'vendor_industry_news');
          }
          let articleListData = adsDataNews[0].data;

          this.articleListData = articleListData;

        }
      })

    },
    turnDetail(link){
      window.open(link, '_blank');
    }

  }
}
</script>

<style scoped>
.us-bg{
  background-color: #FFFFFF;
}

.banner-bg{
  height: 200px;
  background-image: url("../../assets/bg/wheat.png");
  background-size:50%;
  background-repeat: repeat;
  background-position: center;
}

.banner-bg h1{
  height: 100%;
  background-color: rgba(0,0,0,0.2);
  font-size: 28px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 200px;
}

.news-container{
  width: 600px;
  padding: 20px;
  margin: 0 auto;
}

.news-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.news-left-line{
  width: 4px;
  height: 40px;
  border-radius: 4px;
  background-color: #00b3d2;
}

.news-label{
  font-size: 24px;
  font-weight: bold;
}
.news-content{
  padding: 20px;
}

.news-item{
  padding: 10px;
  margin-top: 20px;
  border-bottom:1px solid #EEEEEE;
}

.news-item-img-container{
  border-radius: 20px;
  overflow:hidden;
}
.news-item-img{
  border-radius: 20px;
}

.news-item-title{
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}

.news-item-desc{
  font-size: 14px;
  color: #808080;
}
.news-item-operation{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0;
}

.news-item-readmore{

}
.news-item-share{
  margin-left: 10px;
}

</style>