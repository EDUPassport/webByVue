<template>
  <div class="bg">
    <div class="favorites-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="list-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="list-container" >
            <div class="list-label">
              My Job Applications
            </div>
            <div class="list-label-underline"></div>
            <template v-if="jobsData.length>0">
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

            </template>
            <template v-else>
              <div class="empty-tips">
                No Job Applications yet.
              </div>
            </template>
          </div>
          <div class="list-pagination" v-if="jobsData.length>0">
            <el-pagination layout="prev, pager, next" :default-current-page="1"
                           @size-change="pageSizeChange"
                           @current-change="pageChange"
                           :current-page="page" :page-size="limit"
                           :total="totalNum"></el-pagination>
          </div>
<!--          <div class="ads-container">-->
<!--            <el-image :src="dashboardAdsImg"></el-image>-->
<!--          </div>-->

          <div class="xll-ads-container xll-ads-container-margin" v-if="adsDataTop.length>0">
            <el-carousel height="220px" indicator-position="none" >
              <el-carousel-item class="xll-ads-swiper-item" v-for="(item,i) in adsDataTop" :key="i">
                <div class="xll-ads-l">
                  <el-image class="xll-ads-l-img"
                            :src="item.user_url !='' ? item.user_url : item.url"></el-image>
                </div>
                <div class="xll-ads-r">
                  <h4>Advertise with Us</h4>
                  <h5>Description:</h5>
                  <div class="xll-ads-r-desc">
                    Your Adverts and their description will be displayed here.
                    Just click on the banner
                  </div>

                </div>
              </el-carousel-item>
            </el-carousel>
          </div>


        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {ADS_LIST, MY_APPLY_JOBS} from "@/api/api";
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
      adsDataTop:[]
    }
  },
  mounted() {
    this.getMyApplyJobsList(this.page, this.limit)
    this.getAdsList()
  },
  methods: {
    turnBanner(link){
      console.log(link)
      if (link != '') {
        window.location.href =  link
      } else {
        let token = localStorage.getItem('token')
        if(!token){
          window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4','_blank')

          return;
        }
        this.$router.push('/me/ads/platform')
      }
    },
    getAdsList(){
      let ads_data = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(ads_data).then(res=>{
        if (res.code == 200) {
          // console.log(rs.message)
          let adsDataTop = [];
          let identity = localStorage.getItem('identity');

          if (!identity) {
            adsDataTop = res.message.filter(item => item.name == 'guest_h1');
          }
          if (identity == 1) {

            adsDataTop = res.message.filter(item => item.name == 'educator_h1');
          }
          if (identity == 2) {
            adsDataTop = res.message.filter(item => item.name == 'business_h1');
          }
          if (identity == 3) {
            adsDataTop = res.message.filter(item => item.name == 'vendor_h1');
          }

          if(adsDataTop.length>0){
            this.adsDataTop = adsDataTop[0].data;
          }

        }

      }).catch(err=>{
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })
    },
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
  text-align: center;
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
  text-align: center;
}
.empty-tips{
  color: #808080;
  font-size: 14px;
  text-align: center;
}


.xll-ads-container{
  padding: 20px 20px 0 20px;
}

.xll-ads-container-margin{
  margin-top: 20px;
  margin-bottom: 20px;
}

.xll-ads-swiper-item{
  cursor:pointer;
  border-radius: 10px;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.xll-ads-l{
  width:60%;
  height: 100%;
}
.xll-ads-l-img{
//width: 100%;
  height: 100%;
  border-radius:10px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
}

.xll-ads-r{
  width:36%;
}

.xll-ads-r{
  padding-right: 4%;
}
.xll-ads-r h4{
  color:#004956;
}

.xll-ads-r h5{
  margin-top:20px;
}

.xll-ads-r-desc{
  font-size: 14px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

@media screen and (min-width:1200px) {
  .favorites-container{
    width:1100px;
  }

}

@media screen and (max-width: 768px) {

}


</style>
