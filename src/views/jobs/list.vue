<template>
  <div class="bg">
    <el-row class="bg-container" align="top" justify="center">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <div class="jobs-filter-container">
          <div class="jobs-filter-label">Find a job</div>
          <div class="jobs-filter-location">
            <el-select class="jobs-filter-select" v-model="locationValue" clearable placeholder="Location"
                       size="medium">
              <el-option
                  v-for="item in locationOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="jobs-filter-salary">
            <el-select class="jobs-filter-select" v-model="salaryValue" clearable
                       @change="salaryChange"
                       placeholder="Salary" size="medium">
              <el-option
                  v-for="item in salaryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="jobs-filter-gender">
            <el-select class="jobs-filter-select" v-model="genderValue" clearable
                       @change="genderChange"
                       placeholder="Gender" size="medium">
              <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="jobs-filter-job-type">
            <el-select class="jobs-filter-select" v-model="jobTypeValue" clearable
                       @change="jobTypeChange"
                       placeholder="Job Type" size="medium">
              <el-option
                  v-for="item in jobTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="jobs-filter-student-age">
            <el-select class="jobs-filter-select" v-model="studentAgeValue" clearable
                       @change="studentAgeChange"
                       placeholder="Student Age"
                       size="medium">
              <el-option
                  v-for="item in studentAgeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="jobs-filter-work-exp">
            <el-select class="jobs-filter-select" v-model="workExpValue" clearable placeholder="Work Experience"
                       size="medium">
              <el-option
                  v-for="item in workExpOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

        </div>

        <div class="featured-jobs-container">
          <div class="featured-jobs-label">Featured Jobs</div>
          <div class="featured-jobs-content">
            <swiper :slidesPerView="1" :spaceBetween="30"
                    :pagination='{"clickable": true}'
                    :autoplay='{"delay": 2500,"disableOnInteraction": false}'
                    :navigation="false"
                    class="mySwiper">
              <swiper-slide v-for="(item,index) in jobFeaturedListData" :key="index">
                <!--                animate__animated  animate__backInUp-->
                <div class="featured-jobs-card ">
                  <div class="featured-jobs-card-images">
                    <el-image class="featured-jobs-card-image" :src="item.logo" fit="fill"></el-image>
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
                        <template v-if="item.employment_type==1">FT</template>
                        <template v-if="item.employment_type==2">PT</template>
                        <template v-if="item.employment_type==3">S</template>
                      </view>
                      <view class="featured-jobs-gender" v-if="item.sex == 1 || item.sex == 2">
                        <i class="iconfont el-icon-alimale-female"></i>
                        <template v-if="item.sex == 1">Male</template>
                        <template v-if="item.sex == 2">Female</template>
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
                      <el-button class="featured-jobs-apply-btn">Quick Apply</el-button>
                    </div>
                    <div class="featured-jobs-b-r">
                      <el-icon>
                        <Calendar/>
                      </el-icon>&nbsp;
                      {{ $filters.howLongFormat(item.c_time) }}
                    </div>

                  </div>
                </div>
              </swiper-slide>
            </swiper>

          </div>
        </div>

        <div class="articles-container">
          <div class="articles-label">Latest Industry Articles</div>
          <div class="articles-content">
            <div class="articles-item" v-for="(item,index) in articleListData" :key="index">
              <div class="articles-item-l">
                <el-image class="articles-item-banner" :src="item.url" fit="cover"></el-image>
              </div>
              <div class="articles-item-r">
                <div class="articles-title">{{ item.title }}</div>
                <div class="articles-date"> {{ $filters.newsDateFormat(item.u_time) }}</div>
              </div>
            </div>
          </div>
        </div>

      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="jobs-list-container">
          <div class="jobs-list-label">We've found you {{ jobTotalNum }} open jobs</div>
          <div class="jobs-list-content">
            <div class="jobs-list-item" v-for="(item,index) in jobListData" :key="index">
              <div class="jobs-list-item-l">
                <el-image class="jobs-item-logo" :src="item.logo" fit="cover"></el-image>
              </div>
              <div class="jobs-list-item-r">
                <div class="jobs-list-item-title">
                  <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}" >{{ item.job_title }}</router-link>
                </div>
                <div class="jobs-list-item-name">
                  {{ item.business_name }}
                </div>
                <div class="jobs-list-item-address">
                  {{ item.address }}
                </div>
                <div class="jobs-list-item-desc">
                  {{ item.desc }}
                </div>
                <div class="jobs-list-item-readmore">
                  Read More...
                </div>
              </div>

              <div class="jobs-list-item-b">
                <div class="jobs-list-item-b-l">
                  <view class="jobs-list-item-work-type">
                    <i class="iconfont el-icon-alishijian"></i>
                    <template v-if="item.employment_type==1">FT</template>
                    <template v-if="item.employment_type==2">PT</template>
                    <template v-if="item.employment_type==3">S</template>
                  </view>
                  <view class="jobs-list-item-gender" v-if="item.sex == 1 || item.sex == 2">
                    <i class="iconfont el-icon-alimale-female"></i>
                    <template v-if="item.sex == 1">Male</template>
                    <template v-if="item.sex == 2">Female</template>
                  </view>
                  <view class="jobs-list-item-work-exp">
                    <i class="iconfont el-icon-aligongzuojingyan"></i>
                    1-2 yrs
                  </view>
                </div>

                <div class="jobs-list-item-b-r">
                  <view class="jobs-list-item-date">
                    <el-icon>
                      <Calendar/>
                    </el-icon>&nbsp;
                    {{ $filters.howLongFormat(item.c_time) }}
                  </view>
                  <view class="jobs-list-item-salary">
                    {{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}
                  </view>
                </div>
              </div>

            </div>
          </div>
          <div class="jobs-list-pagination">
            <el-pagination layout="prev, pager, next" :default-current-page="1"
                           @size-change="jobPageSizeChange"
                           @current-change="jobPageChange"
                           :current-page="jobPage" :page-size="jobLimit"
                           :total="jobTotalNum"></el-pagination>
          </div>

        </div>

      </el-col>
    </el-row>
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
import {useRouter} from "vue-router";
import {ADS_LIST, JOB_FEATURED_LIST, JOB_LIST,USER_OBJECT_LIST} from "@/api/api";


SwiperCore.use([Pagination, Autoplay, Navigation, Zoom]);

export default {
  name: "list",
  data() {
    return {
      locationValue: '',
      locationOptions: [],
      salaryValue: '',
      salaryOptions: [
        {
          label: '0-5K',
          value: 1
        },
        {
          label: '5K-10K',
          value: 2
        },
        {
          label: '10K-15K',
          value: 3
        },
        {
          label: '15K+',
          value: 4
        }
      ],
      genderValue: '',
      genderOptions: [
        {
          label: 'Male',
          value: 1
        }, {
          label: 'Female',
          value: 2
        }
      ],
      jobTypeValue: '',
      jobTypeOptions: [
        {
          label:'Full-time',
          value:1
        },
        {
          label: 'Part-time',
          value: 2
        },
        {
          label: 'Seasonal',
          value: 3
        }
      ],
      studentAgeValue: '',
      studentAgeOptions: [],
      workExpValue: '',
      workExpOptions: [],
      jobFeaturedListData: [],
      jobListData: [],
      articleListData: [],
      jobPage: 1,
      jobLimit: 5,
      jobTotalNum: 0

    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    let router = useRouter()
    // let route = useRoute()

    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    // const getParams = () =>{
    //   console.log(route.params)
    // }
    const skipJobsList = (query) => {
      router.push({
        path: '/jobs',
        query: query
      })
    }
    return {
      onSwiper,
      onSlideChange,
      skipJobsList
    };
  },
  mounted() {
    this.getJobList(this.jobPage, this.jobLimit)
    this.getJobFeaturedList()
    this.getAdsList()
    this.getUserObjectList()
  },
  methods: {
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
      })

    },
    jobPageSizeChange(e) {
      console.log(e)
    },
    jobPageChange(e) {
      this.jobPage = e
      this.getJobList(e, this.jobLimit)
      console.log(e)
    },
    getJobList(page, limit) {
      let params = {
        page: page,
        limit: limit
      }
      let salaryValue = this.salaryValue
      if(salaryValue !=''){
         if(salaryValue == 1){
           params.salary_begin = 0
           params.salary_end = 5000
         }
         if(salaryValue == 2){
           params.salary_begin = 5000
           params.salary_end = 10000
         }
         if(salaryValue == 3){
           params.salary_begin = 10000
           params.salary_end = 15000
         }
         if(salaryValue == 4){
           params.salary_begin = 15000
         }

      }
      if(this.genderValue != ''){
        params.sex = this.genderValue
      }

      if(this.jobTypeValue != ''){
        params.employment_type = this.jobTypeValue
      }

      if(this.studentAgeValue != ''){
        params.age_to_teach = this.studentAgeValue
      }

      JOB_LIST(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.jobListData = res.message.data
          // console.log(res.message.data)
          this.jobTotalNum = res.message.total
        } else {
          console.log(res.msg)
        }
      })

    },
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

    },
    getUserObjectList(){
      let params = {

      }
      USER_OBJECT_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
            let ageToTeachList = res.message.filter(item=>item.pid == 4)
          // let lan = localStorage.getItem('language')

          ageToTeachList.forEach(item=>{
            let obj = {
              label:item.object_en,
              value:item.id
            }

            this.studentAgeOptions.push(obj)

          })

        }

      })
    },
    salaryChange(e){
      // console.log(e)
      this.salaryValue = e
      this.getJobList(this.jobPage,this.jobLimit)
    },
    genderChange(e){
      // console.log(e)
      this.genderValue = e
      this.getJobList(this.jobPage,this.jobLimit)
    },
    jobTypeChange(e){
      // console.log(e)
      this.jobTypeValue = e
      this.getJobList(this.jobPage,this.jobLimit)
    },
    studentAgeChange(e){
      // console.log(e)
      this.studentAgeValue = e
      this.getJobList(this.jobPage,this.jobLimit)
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

.jobs-filter-container {
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  padding: 20px;
  border-radius: 10px;
}

.jobs-filter-label {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.jobs-filter-location {
  margin-top: 10px;
}

.jobs-filter-select {
  width: 100%;
}

.jobs-filter-salary {
  margin-top: 10px;
}

.jobs-filter-gender {
  margin-top: 10px;
}

.jobs-filter-job-type {
  margin-top: 10px;
}

.jobs-filter-student-age {
  margin-top: 10px;
}

.jobs-filter-work-exp {
  margin-top: 10px;
}

.featured-jobs-container {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #eeeeee;
  margin-top: 20px;
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
  box-shadow: 0px 5px 4px 0px rgba(50, 50, 50, 0.47);
  overflow: hidden;
  border: 1px solid #eeeeee;

}

.featured-jobs-card:hover {

}

.featured-jobs-card-images {
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.featured-jobs-card-image {
  width: 100%;

}

.featured-jobs-title {
  font-weight: bold;
  font-size: 16px;
  color: #000000;
  text-align: left;
  padding: 0 20px;
  margin-top: 10px;
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

.featured-jobs-gender {
  font-size: 12px;
  color: #808080;
}

.featured-jobs-work-exp {
  font-size: 12px;
  color: #808080;
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
  background-color: #b1c452;
  color: #ffffff;
}

.featured-jobs-b-r {
  font-size: 14px;
  color: #808080;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.articles-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eeeeee;
  margin-top: 20px;
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
  font-size: 12px;
  text-align: left;
  font-weight: bold;
}

.articles-date {
  text-align: left;
  font-size: 12px;
  margin-top: 16px;
}


.jobs-list-container {
  padding: 20px;
}

.jobs-list-label {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.jobs-list-content {
  margin-top: 10px;
}

.jobs-list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

.jobs-list-item-l {
  width: 30%;
}

.jobs-item-logo {
  width: 80%;
  height: 80%;
  border-radius: 10px;
}

.jobs-list-item-r {
  width: 70%;
}

.jobs-list-item-title a{
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
}

.jobs-list-item-name {
  font-size: 16px;
  color: #808080;
  margin-top: 20px;
}

.jobs-list-item-address {
  font-size: 14px;
  color: #808080;
  margin-top: 10px;
}

.jobs-list-item-desc {
  font-size: 12px;
  color: #808080;
  margin-top: 10px;
}

.jobs-list-item-readmore {
  font-size: 14px;
  color: #808080;
  margin-top: 20px;
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
  font-size: 12px;
}

.jobs-list-item-gender {
  font-size: 12px;
}

.jobs-list-item-work-exp {
  font-size: 12px;
}

.jobs-list-item-date {
  font-size: 12px;
}

.jobs-list-item-salary {
  font-size: 12px;
  margin-left: 10px;
  color: #00b3d2;
}

.jobs-list-pagination {
  margin-top: 20px;
}
</style>
