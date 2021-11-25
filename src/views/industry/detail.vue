<template>
  <div class="bg" v-loading="showLoadingStatus">
    <el-row class="bg-container" align="top" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="detail-container">
            <div class="detail-title">{{detailData.title}}</div>
          <div class="detail-banner-image">
            <el-image :src="detailData.image_url"></el-image>
          </div>
          <div class="detail-content" v-html="detailData.content" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <!--        featuredJobs jobs    -->
        <featuredJobs></featuredJobs>
        <!--        latest industry articles-->
        <latestIndustryNews></latestIndustryNews>
      </el-col>

    </el-row>
  </div>
</template>

<script>

import {BLOG_DETAIL, BLOG_LIST} from "@/api/api";

import featuredJobs from "@/components/featuredJobs";
import latestIndustryNews from "@/components/latestIndustryNews";

export default {
  name: "detail",
  data() {
    return {
      showLoadingStatus: false,
      detailData:{}

    }
  },
  components: {
    featuredJobs,
    latestIndustryNews
  },
  setup() {

  },
  created() {

  },
  mounted() {
    let id = this.$route.query.id;
    this.getBlogDetail(id)

  },
  methods: {
    getBlogDetail(id) {
      let params = {
        id: id
      }

      BLOG_DETAIL(params).then(res => {
        console.log(res)
        if(res.code == 200){
          this.detailData = res.message
        }
      })

    },
    getBlogList() {
      let params = {
        page: 1,
        limit: 5
      }

      BLOG_LIST(params).then(res => {
        console.log(res)
      })

    }

  }


}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.bg-container {
  width: 1100px;
  margin: 0 auto;
  padding-top: 40px;
}
.detail-container{
  padding: 20px;
}

.detail-title{
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
}

.detail-banner-image{

}
.detail-content{
  font-size: 14px;
}
</style>
