<template>
  <div class="featured-jobs-container">
    <div class="featured-jobs-label">Featured Jobs</div>
    <div class="featured-jobs-content">
      <swiper :slidesPerView="1" :spaceBetween="30"
              :pagination='{"clickable": true}'
              :autoplay='{"delay": 2500,"disableOnInteraction": false,"pauseOnMouseEnter":true}'
              :navigation="false"
              class="mySwiper">
        <swiper-slide v-for="(item,index) in jobFeaturedListData" :key="index">
          <!--                animate__animated  animate__backInUp-->
          <div class="featured-jobs-card ">
            <div class="featured-jobs-card-images"
                 :style="item.logo !='' ? 'background-image:url('+ item.logo + ')' : ''">
              <div class="featured-jobs-card-image"></div>
              <div class="featured-jobs-favorite" v-if="item.is_favorite && item.is_favorite == 1"
                   @click="cancelFavorite(1,item.id,index)">
                <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
              </div>
              <div class="featured-jobs-favorite" v-else @click="addFavorite(item.id,1,item.job_title,item.logo,index)">
                <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
              </div>
            </div>
            <div class="featured-jobs-title">
              <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}" >{{ item.job_title }}</router-link>
            </div>
            <div class="featured-business-name">{{ item.business_name }}</div>
            <div class="featured-jobs-location">
              <el-icon>
                <LocationFilled></LocationFilled>
              </el-icon>
              {{ item.address }}
            </div>
            <div class="featured-jobs-tags">
              <view class="featured-jobs-tags-l">
                <view class="featured-jobs-work-type">
                  <i class="iconfont el-icon-alishijian"></i>
                  <span v-if="item.employment_type==1">FT</span>
                  <span v-if="item.employment_type==2">PT</span>
                  <span v-if="item.employment_type==3">S</span>
                </view>
                <view class="featured-jobs-gender" v-if="item.sex == 1 || item.sex == 2">
                  <i class="iconfont el-icon-alimale-female"></i>
                  <span v-if="item.sex == 1">Male</span>
                  <span v-if="item.sex == 2">Female</span>
                </view>
                <view class="featured-jobs-work-exp">
                  <i class="iconfont el-icon-aligongzuojingyan"></i>
                  1-2 yrs
                </view>
              </view>
              <view class="featured-jobs-salary">
                {{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}
              </view>

            </div>
            <div class="featured-jobs-b">
              <div class="featured-jobs-b-l">
                <el-button class="featured-jobs-apply-btn" round @click="applyJobs(item.id)">Quick Apply</el-button>
              </div>
              <div class="featured-jobs-b-r">
                <el-icon>
                  <Calendar/>
                </el-icon>&nbsp;
                {{ $filters.howLongFormat(item.refresh_time) }}
              </div>

            </div>
          </div>
        </swiper-slide>
      </swiper>

    </div>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/zoom"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {
  Pagination, Autoplay, Navigation, Zoom
} from 'swiper';
import {JOB_FEATURED_LIST,APPLY_JOBS,ADD_FAVORITE,CANCEL_FAVORITE} from "@/api/api";

SwiperCore.use([Pagination, Autoplay, Navigation, Zoom]);

export default {
  name: "featuredJobs",
  data(){
    return  {
      jobFeaturedListData: []
    }
  },
  components:{
    Swiper,
    SwiperSlide,
  },
  mounted() {
    this.getJobFeaturedList()
  },
  methods:{
    getJobFeaturedList() {
      let params = {
        ad_type: 2
      }

      JOB_FEATURED_LIST(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.jobFeaturedListData = res.message;
        } else {
          console.log(res.msg)
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    applyJobs(id) {

      let identity = localStorage.getItem('identity')
      let token = localStorage.getItem('token')
      if (identity == 1) {
        let params = {
          job_id: id,
          token: token
        }

        APPLY_JOBS(params).then(res => {
          if (res.code == 200) {
            this.$message.success('Apply Success')
          }
        }).catch(err=>{
          console.log(err)
          if(err.code === 400){
            this.$message.error('Please complete your profile in order to apply')
          }else{
            this.$message.error(err.msg)
          }

        })

      } else {
        this.$message.warning('Please switch to an educator profile to be able to apply')
      }


    },
    addFavorite(id, type, title, url,index) {
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
          this.jobFeaturedListData[index]['is_favorite'] = 1
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    cancelFavorite(type,typeId,index){
      let params = {
        token:localStorage.getItem('token'),
        type:type,
        type_id:typeId
      }
      CANCEL_FAVORITE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.jobFeaturedListData[index]['is_favorite'] = 0
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },

  }

}
</script>

<style scoped>
.featured-jobs-container {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  /*border: 1px solid #eeeeee;*/
  margin-top: 20px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.featured-jobs-label {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.featured-jobs-content {
  margin-top: 10px;
}

#mySwiper {
  height: 350px;
}

.mySwiper {
  padding-bottom: 30px;
}

.featured-jobs-card {
  width: 98%;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #eeeeee;

}

.featured-jobs-card:hover {

}

.featured-jobs-card-images {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background-color: #EEEEEE;

  background-position: center;
  background-size: auto;
  background-repeat: no-repeat;
}

.featured-jobs-favorite{
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.xll-heart-icon {
  font-size: 30px !important;
}
.featured-jobs-card-image {
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
}

.featured-jobs-title {
  padding: 0 20px;
  margin-top: 10px;
  text-align: left;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.featured-jobs-title a{
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  color: #000000;

}

.featured-business-name {
  text-align: left;
  font-weight: bold;
  font-size: 16px;
  color: #808080;
  padding: 0 20px;
  margin-top: 10px;
}

.featured-jobs-location {
  text-align: left;
  font-size: 14px;
  color: #808080;
  padding: 0 20px;
  margin-top: 10px;
}

.featured-jobs-tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 10px;
}

.featured-jobs-tags-l {

}

.featured-jobs-work-type {
  font-size: 12px;
  color: #808080;
}

.featured-jobs-work-type span{
  margin-left: 4px;
}

.featured-jobs-gender {
  margin-left: 5px;
  font-size: 12px;
  color: #808080;
}
.featured-jobs-gender span{
  margin-left: 4px;
}

.featured-jobs-work-exp {
  margin-left: 5px;
  font-size: 12px;
  color: #808080;
}
.featured-jobs-work-exp span{
  margin-left: 4px;
}

.featured-jobs-salary {
  color: #00b3d2;
  font-size: 12px;
}

.featured-jobs-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid #eeeeee;

}

.featured-jobs-b-l {

}

.featured-jobs-apply-btn {
  background-color: #20AEC6;
  color: #ffffff;
  font-size: 14px;
}

.featured-jobs-b-r {
  font-size: 14px;
  color: #808080;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

</style>