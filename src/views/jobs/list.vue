<template>
  <div class="bg" v-loading="showLoadingStatus">

    <template v-if="exchangeAccountInfo">
      <ExchangeAccountInfo :info="exchangeAccountInfo" ></ExchangeAccountInfo>
    </template>

    <el-row class="bg-container" align="top" justify="center" >
      <el-col :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
        <div class="jobs-filter-container">
          <div class="jobs-filter-label">Find a job</div>
          <div class="jobs-filter-location">
            <el-select class="jobs-filter-select" v-model="locationValue" clearable placeholder="Location"
                       @change="locationChange"
                       size="medium">
              <el-option
                  v-for="item in locationOptions"
                  :key="item.id"
                  :label="item.CityPinyin"
                  :value="item.id"
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
        <!--        featuredJobs jobs    -->
        <featuredJobs></featuredJobs>
        <!--        latest industry articles-->
        <latestIndustryNews></latestIndustryNews>

      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="jobs-list-container" >
          <div class="jobs-list-label">We've found you {{ jobTotalNum }} open jobs</div>
          <div class="jobs-list-content">
            <div class="jobs-list-item" v-for="(item,index) in jobListData" :key="index">

              <div class="jobs-favorite" v-if="item.is_favorite && item.is_favorite == 1"
                   @click="cancelFavorite(1,item.id,index)">
                <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
              </div>
              <div class="jobs-favorite" v-else @click="addFavorite(item.id,1,item.job_title,item.logo,index)">
                <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
              </div>
              <div class="jobs-list-item-l">
                <el-image class="jobs-item-logo" :src="item.logo" fit="cover"></el-image>
              </div>
              <div class="jobs-list-item-r">
                <div class="jobs-list-item-title">
                  <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}">{{ item.job_title }}</router-link>
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
                  <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}">Read More...</router-link>
                </div>
              </div>

              <div class="jobs-list-item-b">
                <div class="jobs-list-item-b-l">
                  <view class="jobs-list-item-work-type">
                    <i class="iconfont el-icon-alishijian"></i>
                    <span v-if="item.employment_type==1">FT</span>
                    <span v-if="item.employment_type==2">PT</span>
                    <span v-if="item.employment_type==3">S</span>
                  </view>
                  <view class="jobs-list-item-gender" v-if="item.sex == 1 || item.sex == 2">
                    <i class="iconfont el-icon-alimale-female"></i>
                    <span v-if="item.sex == 1">Male</span>
                    <span v-if="item.sex == 2">Female</span>
                  </view>
<!--                  <view class="jobs-list-item-work-exp">-->
<!--                    <i class="iconfont el-icon-aligongzuojingyan"></i>-->
<!--                    1-2 yrs-->
<!--                  </view>-->
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

import {useRouter,useRoute} from "vue-router";
import {JOB_LIST, USER_OBJECT_LIST,JOBS_AREA_LIST,ADD_FAVORITE,CANCEL_FAVORITE} from "@/api/api";

import featuredJobs from "@/components/featuredJobs";
import latestIndustryNews from "@/components/latestIndustryNews";
import ExchangeAccountInfo from '@/components/jobs/exchangeInfo';

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
          label: 'Full-time',
          value: 1
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
      jobTotalNum: 0,
      showLoadingStatus:true

    }
  },
  components: {
    featuredJobs,
    latestIndustryNews,
    ExchangeAccountInfo
  },
  setup() {
    let router = useRouter()
    let route = useRoute()

    const exchangeAccountInfo = route.query.exchange_job
    console.log(exchangeAccountInfo)
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
      skipJobsList,
      exchangeAccountInfo
    };
  },
  created() {
    // this.getJobsAreaList()
    // this.getUserObjectList()
    // let cityValue= this.$route.query.city;
    // if(cityValue && cityValue !=''){
    //   this.locationValue = Number(cityValue)
    // }
    //
    // this.getJobList(this.jobPage, this.jobLimit)
    console.log(this.$route.query)
  },
  mounted() {
    this.getJobsAreaList()
    this.getUserObjectList()

    let cityValue= this.$route.query.city;
    if(cityValue && cityValue !=''){
      this.locationValue = Number(cityValue)
    }

    this.getJobList(this.jobPage, this.jobLimit)
  },
  methods: {
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
          this.jobListData[index]['is_favorite'] = 1
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getJobsAreaList(){
      let params = {}
      JOBS_AREA_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.locationOptions = res.message;
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    jobPageSizeChange(e) {
      console.log(e)
    },
    jobPageChange(e) {
      this.showLoadingStatus = true;
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
      if (salaryValue != '') {
        if (salaryValue == 1) {
          params.salary_begin = 0
          params.salary_end = 5000
        }
        if (salaryValue == 2) {
          params.salary_begin = 5000
          params.salary_end = 10000
        }
        if (salaryValue == 3) {
          params.salary_begin = 10000
          params.salary_end = 15000
        }
        if (salaryValue == 4) {
          params.salary_begin = 15000
        }

      }
      if(this.locationValue != ''){
        params.city = this.locationValue
      }
      if (this.genderValue != '') {
        params.sex = this.genderValue
      }

      if (this.jobTypeValue != '') {
        params.employment_type = this.jobTypeValue
      }

      if (this.studentAgeValue != '') {
        params.age_to_teach = this.studentAgeValue
      }

      JOB_LIST(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.jobListData = res.message.data
          // console.log(res.message.data)
          this.jobTotalNum = res.message.total
          this.showLoadingStatus= false
        } else {
          console.log(res.msg)
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getUserObjectList() {
      let params = {}
      USER_OBJECT_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          let ageToTeachList = res.message.filter(item => item.pid == 4)
          // let lan = localStorage.getItem('language')

          ageToTeachList.forEach(item => {
            let obj = {
              label: item.object_en,
              value: item.id
            }

            this.studentAgeOptions.push(obj)

          })

        }

      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    locationChange(e){
      // console.log(e)
      this.jobListData = []
      this.showLoadingStatus = true
      this.locationValue = e;
      this.getJobList(this.jobPage, this.jobLimit)
    },
    salaryChange(e) {
      // console.log(e)
      this.jobListData = []
      this.showLoadingStatus = true
      this.salaryValue = e
      this.getJobList(this.jobPage, this.jobLimit)
    },
    genderChange(e) {
      this.jobListData = []
      this.showLoadingStatus = true
      // console.log(e)
      this.genderValue = e
      this.getJobList(this.jobPage, this.jobLimit)
    },
    jobTypeChange(e) {
      this.jobListData = []
      this.showLoadingStatus = true
      // console.log(e)
      this.jobTypeValue = e
      this.getJobList(this.jobPage, this.jobLimit)
    },
    studentAgeChange(e) {
      this.jobListData = []
      this.showLoadingStatus = true
      // console.log(e)
      this.studentAgeValue = e
      this.getJobList(this.jobPage, this.jobLimit)
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
          this.jobListData[index]['is_favorite'] = 0
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
  /*width: 1100px;*/
  margin: 0 auto;
  padding-top: 40px;
}

.jobs-filter-container {
  background-color: #ffffff;
  /*border: 1px solid #eeeeee;*/
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
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
  position: relative;
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
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.jobs-favorite{
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;

}

.xll-heart-icon{
  font-size: 24px;
}

.jobs-list-item-l {
  width: 30%;
}

.jobs-item-logo {
  width: 80%;
  height: 80%;
  border-radius: 10px;
  border: 1px solid #EEEEEE;
}

.jobs-list-item-r {
  width: 70%;
}

.jobs-list-item-title a {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
}

.jobs-list-item-title a:hover {
  text-decoration: underline;
  font-size: 20px;
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
  overflow: hidden;
  display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 4;
}

.jobs-list-item-readmore {
  margin-top: 20px;
}
.jobs-list-item-readmore a{
  font-size: 14px;
  color: #808080;
  text-decoration: none;
}

.jobs-list-item-readmore a:hover{
  font-size: 16px;
  text-decoration: underline;
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
.jobs-list-item-work-type span{
  margin-left: 4px;
}

.jobs-list-item-gender {
  margin-left: 5px;
  font-size: 12px;
}
.jobs-list-item-gender span{
  margin-left: 4px;
}

.jobs-list-item-work-exp {
  margin-left: 5px;
  font-size: 12px;
}

.jobs-list-item-work-exp span{
  margin-left: 4px;
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
  text-align: center;
}

@media screen  and (min-width: 1200px){
  .bg-container{
    width:1100px;
  }
}
</style>
