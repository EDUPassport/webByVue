<template>
<el-scrollbar class="jobs-list-bg-container">

  <div class="back-btn-container" v-if="isOther">
    <el-button class="back-btn" link type="primary"
               @click="backToSearchResults()"
    >
              <el-icon>
                <ArrowLeft />
              </el-icon>
      BACK TO SEARCH RESULTS
    </el-button>
  </div>

  <div class="back-btn-container" v-if="fromBusinessProfile">
    <el-button class="back-btn" link type="primary"
               @click="exitPreview()"
    >
      <el-icon>
        <ArrowLeft />
      </el-icon>
      EXIT PREVIEW
    </el-button>
  </div>

  <div class="jobs-featured" v-if="jobFeaturedData.length>0">
    <el-carousel :height="jobHeight+'px'" indicator-position="none">
      <el-carousel-item
          v-for="(item,i) in jobFeaturedData" :key="i"
      >
        <div  class="jobs-list-item-featured ">

          <div class="jobs-favorite" v-if="item.is_favorite && item.is_favorite == 1"
               @click="cancelFavoriteForFeatured(1,item.id,index)">
            <el-icon :size="30" color="#9173ff">
              <CollectionTag />
            </el-icon>
          </div>
          <div class="jobs-favorite" v-else
               @click="addFavoriteForFeatured(item.id,1,item.job_title,item.logo,i)">
            <el-icon :size="30">
              <CollectionTag />
            </el-icon>
          </div>

          <div class="jobs-list-item-l">
            <el-image class="jobs-item-logo"
                      :src="item.third_company_logo ? item.third_company_logo : item.company_logo"
                      fit="contain">
              <template #error>
                <div class="image-slot">
                  <el-icon :size="60" color="#808080">
                    <Picture/>
                  </el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="jobs-list-item-r">
            <div class="jobs-list-item-name">
              {{ item.company_name }}
            </div>

            <div class="jobs-list-item-title" @click="turnJobDetail(item.id)">
              {{ item.job_title }}
            </div>
            <view class="jobs-list-item-salary">
              <!--    Hourly:112 Daily:113 Weekly:114 Monthly:115 Annually:116                -->
              {{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}
              <span v-if="item.payment_period == 112">hourly</span>
              <span v-if="item.payment_period == 113">daily</span>
              <span v-if="item.payment_period == 114">weekly</span>
              <span v-if="item.payment_period == 115">monthly</span>
              <span v-if="item.payment_period == 116">annually</span>
            </view>
            <div class="jobs-list-item-address">
              {{ item.address }}
            </div>

            <div class="jobs-list-item-b">
              <div class="jobs-list-item-b-l">
                <view class="jobs-list-item-work-type">
                  <i class="iconfont el-icon-alishijian"></i>
                  <span v-if="item.employment_type==1">FT</span>
                  <span v-if="item.employment_type==2">PT</span>
                  <span v-if="item.employment_type==3">S</span>
                </view>

              </div>

              <div class="jobs-list-item-b-r">
                <view class="jobs-list-item-date">
                  <el-icon>
                    <Calendar/>
                  </el-icon>&nbsp;
                  {{ $filters.howLongFormat(item.refresh_time) }}
                </view>

              </div>
            </div>
          </div>

        </div>

      </el-carousel-item>
    </el-carousel>
    <div style="height: 25px;background-color: #FFFFFF;"></div>
  </div>

  <div class="jobs-list-container" >
    <div class="jobs-list-label-container">
      <div class="jobs-list-label">All jobs <span v-if="isOther || fromBusinessProfile">at {{companyInfo.company_name}}</span></div>
    </div>

    <div class="jobs-list-content">

        <template v-if="jobListData.length > 0">
          <div  class="jobs-list-item "
                v-for="(item,index) in jobListData" :key="index"
                :class="item.id == selectedJobId ? 'jobs-list-item-active' : '' ">

            <div class="jobs-favorite" v-if="item.is_favorite && item.is_favorite == 1"
                 @click="cancelFavorite(1,item.id,index)">
              <el-icon :size="30" color="#9173ff">
                <CollectionTag />
              </el-icon>
            </div>
            <div class="jobs-favorite" v-else
                 @click="addFavorite(item.id,1,item.job_title,item.logo,index)">
              <el-icon :size="30">
                <CollectionTag />
              </el-icon>
            </div>
            <div class="jobs-list-item-l">
              <el-image class="jobs-item-logo"
                        :src="item.third_company_logo ? item.third_company_logo : item.company_logo"
                        fit="contain">
                <template #error>
                  <div class="image-slot">
                    <el-icon :size="60" color="#808080">
                      <Picture/>
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </div>
            <div class="jobs-list-item-r">
              <div class="jobs-list-item-name">
                {{ item.company_name }}
              </div>

              <div class="jobs-list-item-title" @click="turnJobDetail(item.id)">
                {{ item.job_title }}
              </div>
              <view class="jobs-list-item-salary">
                <!--    Hourly:112 Daily:113 Weekly:114 Monthly:115 Annually:116                -->
                {{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}
                <span v-if="item.payment_period == 112">hourly</span>
                <span v-if="item.payment_period == 113">daily</span>
                <span v-if="item.payment_period == 114">weekly</span>
                <span v-if="item.payment_period == 115">monthly</span>
                <span v-if="item.payment_period == 116">annually</span>
              </view>
              <div class="jobs-list-item-address">
                {{ item.address }}
              </div>

              <div class="jobs-list-item-b">
                <div class="jobs-list-item-b-l">
                  <view class="jobs-list-item-work-type">
                    <i class="iconfont el-icon-alishijian"></i>
                    <span v-if="item.employment_type==1">FT</span>
                    <span v-if="item.employment_type==2">PT</span>
                    <span v-if="item.employment_type==3">S</span>
                  </view>

                </div>

                <div class="jobs-list-item-b-r">
                  <view class="jobs-list-item-date">
                    <el-icon>
                      <Calendar/>
                    </el-icon>&nbsp;
                    {{ $filters.howLongFormat(item.refresh_time) }}
                  </view>

                </div>
              </div>
            </div>

          </div>

        </template>
        <template v-else>
          <el-empty description="..."></el-empty>
        </template>

    </div>

    <div class="jobs-list-pagination" v-if="jobListData.length > 0">
      <el-pagination layout="prev, pager, next"
                     :default-current-page="jobPage"
                     @size-change="jobPageSizeChange"
                     @current-change="jobPageChange"
                     :current-page="jobPage"
                     :page-size="jobLimit"
                     :total="jobTotalNum">
      </el-pagination>
    </div>

  </div>

  <div class="xll-ads-container" v-if="adsData.length>0">

    <el-carousel style="width:100%;margin:0 auto;overflow:hidden;"
                 height="420px"
                 indicator-position="none">

      <el-carousel-item class="xll-ads-swiper-item"
                        v-for="(item,i) in adsData" :key="i"
                        @click="turnAdsDetail(item.link)"
      >
        <div class="xll-ads">
          <div class="xll-ads-t">
            <el-image class="xll-ads-img"
                      fit="cover"
                      :src="item.user_url !='' ? item.user_url : item.url">
              <template #error>
                <div class="image-ads-slot">
                  <el-icon :size="80" color="#808080">
                    <Picture/>
                  </el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="xll-ads-b">
            <div class="xll-ads-b-bg">
              {{item.title}}
            </div>

          </div>
        </div>

      </el-carousel-item>
    </el-carousel>

  </div>


  <div  class="jobs-list-item " style="position:fixed;z-index: -100; opacity: 0;" id="job">

    <div class="jobs-list-item-l">
      <el-avatar class="jobs-item-logo"
                 src=""
                fit="contain">
      </el-avatar>
    </div>
    <div class="jobs-list-item-r">
      <div class="jobs-list-item-name">
        1075  English Teacher English Teacher English Teacher
      </div>

      <div class="jobs-list-item-title">
        English Teacher
      </div>
      <view class="jobs-list-item-salary">
        <!--    Hourly:112 Daily:113 Weekly:114 Monthly:115 Annually:116                -->
        ฿ 250 - 500 hourly
        <span>annually</span>
      </view>
      <div class="jobs-list-item-address">
        Hourly:112 Daily:113 Weekly:114 Monthly:115 Annually:116
      </div>

      <div class="jobs-list-item-b">
        <div class="jobs-list-item-b-l">
          <view class="jobs-list-item-work-type">
            <i class="iconfont el-icon-alishijian"></i>
            <span>FT</span>
          </view>
        </div>

        <div class="jobs-list-item-b-r">
          <view class="jobs-list-item-date">
            <el-icon>
              <Calendar/>
            </el-icon>&nbsp;
            test test test
          </view>

        </div>
      </div>
    </div>

  </div>


</el-scrollbar>
</template>

<script>

import {ADD_FAVORITE, CANCEL_FAVORITE, JOB_FEATURED_LIST} from "@/api/api";

export default {
  name: "jobsListComponent",
  props:['jobListData','adsData', 'jobPage','jobLimit','jobTotalNum','selectedJobId','isOther','companyInfo','fromBusinessProfile'],
  data(){
    return {
      jobHeight:300,
      jobFeaturedData:[]
    }
  },
  mounted(){
    // this.getJobFeaturedList()
  },
  methods:{
    exitPreview(){
      this.$router.push('/account/home')
    },
    jobPageSizeChange(){
      console.log('job page size')
      this.$emit('jobPageSize')
    },
    jobPageChange(e){
      console.log('job page')
      if(this.isOther){
        this.$router.push({path:'/jobs',query:{id:this.selectedJobId,page:e,from:1}})
      }else{
        this.$router.push({path:'/jobs',query:{id:this.selectedJobId,page:e}})
      }

      this.$emit('jobPageChange', e)
    },
    addFavorite(id, type, title, url, index) {
      this.$emit('addFavorite',id,type,title,url,index)
    },
    cancelFavorite(type, typeId, index) {
      this.$emit('cancelFavorite',type, typeId, index)
    },
    backToSearchResults(){
      this.$emit('backToResults')
    },
    turnJobDetail(id){
      this.$emit('jobDetailEvent',id,this.jobPage,this.isOther)
      // <router-link :to="{'path':'/jobs',query:{id:item.id,page:jobPage}}">
      // this.$router.push({path:'/jobs',query:{id:id,page:this.jobPage}})
    },
    getJobFeaturedList() {
      let params = {
        ad_type: 2
      }

      JOB_FEATURED_LIST(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.jobFeaturedData = res.message;
          let jobDiv = document.getElementById('job')
          // console.log(jobDiv.offsetHeight)
          this.jobHeight = jobDiv.offsetHeight;
        } else {
          console.log(res.msg)
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    addFavoriteForFeatured(id, type, title, url,index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: id,
        type_title: title,
        type_url: url
      }
      ADD_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.jobFeaturedData[index]['is_favorite'] = 1
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    cancelFavoriteForFeatured(type,typeId,index){
      let params = {
        token:localStorage.getItem('token'),
        type:type,
        type_id:typeId
      }
      CANCEL_FAVORITE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.jobFeaturedData[index]['is_favorite'] = 0
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    turnAdsDetail(link){
      window.open(link, '_blank')
    }


  }
}
</script>

<style scoped>

.back-btn-container{
  margin-top: 25px;
  padding-left: 25px;
}
.back-btn{
  font-size: 20px;
}

.jobs-list-bg-container {
  /*max-width: 520px;*/
  height: calc(100vh - 140px);
  background-color: #F0F2F5;
}

.jobs-list-container {

}

.jobs-list-label-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 25px 0 10px 25px;
}

.jobs-list-label {
  text-align: left;
  font-size: 35px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-list-content {
  margin-top: 10px;
}

.jobs-list-item-featured{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 25px;
  text-align: left;

}

.jobs-list-item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;

  padding: 25px;

  text-align: left;
  border-bottom: 1px solid #262626;

}


.jobs-list-item-active{
  background-color: #FFFFFF;
  box-shadow: 0 0 12px #6650B329;
  border-bottom: none;
}

.jobs-favorite {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.xll-heart-icon {
  font-size: 24px;
}

.jobs-list-item-l {
  width: 60px;

}

.jobs-item-logo {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #EEEEEE;
}

.image-slot {
  padding: 40px;
  text-align: center;
}

.jobs-list-item-r {
  width: calc(100% - 80px);

}

.jobs-list-item-title {
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
  text-decoration: none;
  cursor: pointer;
}

.jobs-list-item-title:hover {
  text-decoration: underline;
  font-size: 26px;
}

.jobs-list-item-name {
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-list-item-address {
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-list-item-b {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.jobs-list-item-work-type {
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-list-item-work-type span {
  margin-left: 4px;
}

.jobs-list-item-gender {
  margin-left: 5px;
  font-size: 12px;
}

.jobs-list-item-gender span {
  margin-left: 4px;
}

.jobs-list-item-work-exp {
  margin-left: 5px;
  font-size: 12px;
}

.jobs-list-item-work-exp span {
  margin-left: 4px;
}

.jobs-list-item-date {
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-list-item-salary {
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-list-pagination {
  margin: 20px;
  display: flex;
  justify-content: center;
}

.xll-ads-container{
  /*padding: 0 25px 25px 25px;*/
  margin-bottom: 50px;
  margin-top: 50px;
}

.xll-ads-swiper-item{
  /*background-color: #FFFFFF;*/
  width: 100%;

}

.xll-ads{
  /*width: 90%;*/
  overflow: hidden;
  border-radius: 14px;
  width: calc(100% - 50px);
  margin: 0 auto;
  box-shadow: 0px 0px 10px #0000001A;
}

.xll-ads-img{
  border-radius: 14px;
}

.xll-ads-b{
  padding: 25px;
}

.xll-ads-b-bg{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 23px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

@media screen and (min-width: 1200px) and (max-width: 1919px) {
  .jobs-list-label{
    font-size: 20px;
  }
  .jobs-list-item-featured{
    padding: 10px;
  }



}

</style>