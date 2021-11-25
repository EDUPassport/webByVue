<template>
  <div class="bg">
    <div class="favorites-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="list-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="list-container" v-if="jobsData.length>0">
            <div class="list-label">
              My Job Applications
            </div>
            <div class="list-label-underline"></div>
            <div class="list-item" v-for="(item,i) in jobsData" :key="i">
              <div class="list-item-l">
                <el-image class="list-item-l-img" :src="item.logo"></el-image>
              </div>
              <div class="list-item-r">
                <div class="list-item-r-t">
                  <router-link  :to="{path:'/jobs/detail',query:{id:item.job_id}}">
                    {{ item.job_title }}
                  </router-link>
                </div>
                <div class="list-item-r-mid">
                  {{item.job.business_name}}
                </div>
                <div class="list-item-r-b">
                  <div class="list-item-r-b-l">
                    {{item.job.job_location}}
                  </div>
                  <div class="list-item-r-b-r">
                    ¥ {{item.job.salary_min}} - {{item.job.salary_max}}
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="list-pagination" v-if="jobsData.length>0">
            <el-pagination layout="prev, pager, next" :default-current-page="1"
                           @size-change="pageSizeChange"
                           @current-change="pageChange"
                           :current-page="page" :page-size="limit"
                           :total="totalNum"></el-pagination>
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
import {MY_APPLY_JOBS} from "@/api/api";
import dashboardAdsImg from '@/assets/ads/2.png'
import meSideMenu from "@/components/meSideMenu";

export default {
  name: "applications",
  components: {
    meSideMenu
  },
  data() {
    return {
      dashboardAdsImg,
      jobsData: [],
      page: 1,
      limit: 8,
      totalNum: 0,
    }
  },
  mounted() {
    this.getMyApplyJobsList(this.page, this.limit)
  },
  methods: {
    getMyApplyJobsList(page, limit) {
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      MY_APPLY_JOBS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.jobsData = res.message.data
          // console.log(res.message.data)
          this.totalNum = res.message.total
        }
      })

    },
    pageSizeChange(e) {
      console.log(e)
    },
    pageChange(e) {
      this.page = e
      this.getMyApplyJobsList(e, this.limit)
      console.log(e)
    }

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

.list-col {
  padding: 0 20px;
}

.list-container {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
}
.list-label{
  font-size: 22px;
  font-weight: bold;
  text-align: left;
}

.list-label-underline{
  width: 80px;
  border-bottom:2px solid #ff2870;
  margin-bottom: 20px;
}
.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px 0;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  position: relative;
}

.list-item:hover {
  background-color: #EEEEEE;
}

.list-item-l {
  width: 20%;
}

.list-item-l-img {
  width: 100px;
  height:100px;
  border-radius: 50%;
  border: 1px solid #EEEEEE;
}

.list-item-r {
  width: 80%;
}

.list-item-r-t {
  text-align: left;
}

.list-item-r-t a {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
}
.list-item-r-mid{
  text-align: left;
  font-size: 16px;
  color: #808080;
  font-weight: bold;
  margin-top: 20px;
}

.list-item-r-b{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 0 0;
}

.list-item-r-b-l{
  width: 80%;
  font-size: 14px;
  color: #808080;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.list-item-r-b-r{
  width: 20%;
  font-size: 16px;
  color: #00b3d2;
  font-weight: bold;
}

.list-pagination {
  margin-top: 20px;
}

.ads-container {
  margin-top: 20px;
}

</style>
