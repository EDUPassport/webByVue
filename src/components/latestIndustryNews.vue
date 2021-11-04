<template>
  <div class="articles-container">
    <div class="articles-label">Latest Industry Articles</div>
    <div class="articles-content">
      <div class="articles-item" v-for="(item,index) in articleListData" :key="index">
        <div class="articles-item-l">
          <el-image class="articles-item-banner" :src="item.user_url !='' ? item.user_url : item.url" fit="cover"></el-image>
        </div>
        <div class="articles-item-r">
          <div class="articles-title">
            <el-link class="articles-title-link"
                     :href="item.link" target="_blank" :underline="false">{{ item.title }}
            </el-link>
          </div>
          <div class="articles-date"> {{ $filters.newsDateFormat(item.u_time) }}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {ADS_LIST} from "@/api/api";
export default {
  name: "latestIndustryNews",
  data(){
    return {
      articleListData: [],
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
          this.articleListLimitData = articleListData.slice(0, 2)


        }
      })

    }
  }
}
</script>

<style scoped>
.articles-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  /*border: 1px solid #eeeeee;*/
  margin-top: 20px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.articles-label {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.articles-content {
  margin-top: 10px;
}

.articles-item {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eeeeee;
}

.articles-item-l {
  width: 30%;
}

.articles-item-banner {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.articles-item-r {
  width: 65%;
}

.articles-title {
  text-align: left;
}

.articles-title-link{
  font-size: 12px;
  font-weight: bold;
}

.articles-date {
  text-align: left;
  font-size: 12px;
  margin-top: 16px;
}

</style>