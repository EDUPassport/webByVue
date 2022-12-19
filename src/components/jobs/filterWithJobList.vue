<template>
  <div>
    <div class="jobs-bg-filter-container">
      <el-scrollbar class="jobs-filter-container">

        <div class="jobs-filter-item">
          <div class="jobs-filter-label">Job title</div>
          <div class="jobs-filter-c">
            <el-input v-model="jobTitleValue" placeholder="Search for job titles"></el-input>
          </div>
        </div>

        <div class="jobs-filter-item">
          <div class="jobs-filter-label">Location</div>
          <div class="jobs-filter-c">
            <el-select class="jobs-filter-select"
                       v-model="locationValue"
                       clearable
                       :placeholder="locationPlaceholder"
                       @change="locationChange"
                       size="default">
              <el-option
                  v-for="item in locationOptions"
                  :key="item.id"
                  :label="item.CityPinyin"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="search-container">
          <el-button type="primary" round @click="search()">
            SEARCH
          </el-button>
        </div>
        <template v-if="!showMore">
          <div style="margin-top: 50px;text-align: center;">
            <el-button link @click="showMore=true">
              MORE FILTERS
            </el-button>
          </div>
        </template>
        <template v-if="showMore">
          <div class="jobs-filter-item">
            <div class="jobs-filter-label">Salary(USD)</div>
            <div class="jobs-filter-c">
              <el-slider v-model="salaryValue" range :max="50"
                         :marks="salaryMarks"
                         @change="salaryChange"
                         :format-tooltip="formatToolTip"
              ></el-slider>
            </div>
            <div class="jobs-filter-c">

            </div>
          </div>

          <div class="jobs-filter-item">
            <div class="jobs-filter-label">Employment type</div>
            <div class="jobs-filter-c">
              <el-select class="jobs-filter-select"
                         v-model="employmentTypeValue"
                         clearable
                         @change="jobTypeChange"
                         value-key="id"
                         placeholder="Full time,part time, etc."
              >
                <el-option
                    v-for="item in employmentTypeOptions"
                    :key="item.id"
                    :label="item.object_en"
                    :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="jobs-filter-item">
            <div class="jobs-filter-label">Students' age</div>
            <div class="jobs-filter-c">
              <el-checkbox-group v-model="studentAgeValue">

                <el-checkbox v-for="(item,i) in ageToTeachOptions" :key="i"
                             :label="item.id"
                >
                  {{ item.object_en }}
                </el-checkbox>

              </el-checkbox-group>

            </div>
          </div>
          <div class="jobs-filter-item">
            <div class="jobs-filter-label">Work schedule</div>
            <div class="jobs-filter-c">

              <el-checkbox-group v-model="workTypeValue">

                <el-checkbox v-for="(item,i) in workTypeOptions" :key="i"
                             :label="item.id"
                >
                  {{ item.object_en }}
                </el-checkbox>

              </el-checkbox-group>

            </div>
          </div>

        </template>

      </el-scrollbar>

      <div class="filter-contact-us-container">
        <div class="filter-hide" v-show="showMore">
          <el-button link @click="showMore = false">HIDE FILTERS</el-button>
        </div>

        <div class="filter-xll-action-container">

          <div class="filter-xll-action" @click="turnFeedback()">
            <el-image style="width: 45px;height: 45px;" fit="cover" :src="thumbUpImg"></el-image>
            <span>Feedback</span>
          </div>
          <div class="filter-xll-action">
            <el-icon :size="45" color="#6648FF" @click="contactUs()">
              <IconIcBaselineLiveHelp/>
            </el-icon>
            <span @click="contactUs()">Contact Us</span>
          </div>
        </div>

      </div>

    </div>

    <div class="jobs-mobile-bg-filter-container">
      <div class="jobs-mobile-filter-title">
        Search jobs
      </div>
      <div class="jobs-mobile-filter-1">
        <el-icon :size="25" @click="showJobsMobileExpand()">
          <IconTablerMenu2/>
        </el-icon>

        <el-input v-model="jobTitleValue"
                  class="jobs-mobile-filter-1-input"
                  placeholder="Search for job titles">
        </el-input>

        <el-button type="primary" round  @click="search()">Search</el-button>

      </div>

      <div class="jobs-mobile-filter-2" v-if="showJobsMobileExpandStatus">
        <div class="jobs-mobile-filter-tabs">
          <el-button link type="primary"
                     :class="filterType == 1 ? 'mobile-tab-active' : ''"
                     @click="chooseFilterType(1)">
            LOCATION
          </el-button>
          <el-button link type="primary"
                     :class="filterType == 2 ? 'mobile-tab-active' : ''"
                     @click="chooseFilterType(2)">
            SALARY
          </el-button>
          <el-button link type="primary"
                     :class="filterType == 3 ? 'mobile-tab-active' : ''"
                     @click="chooseFilterType(3)">
            TYPE
          </el-button>
          <el-button link type="primary"
                     :class="filterType == 4 ? 'mobile-tab-active' : ''"
                     @click="chooseFilterType(4)">
            STUDENT'S AGE
          </el-button>
          <el-button link type="primary"
                     :class="filterType == 5 ? 'mobile-tab-active' : ''"
                     @click="chooseFilterType(5)">
            WORK SCHEDULE
          </el-button>
        </div>

        <div class="jobs-mobile-filter-expand" >

          <div class="jobs-mobile-filter-expand-location" v-if="filterType == 1">
            <el-select class="jobs-filter-select"
                       v-model="locationValue"
                       clearable
                       :placeholder="locationPlaceholder"
                       @change="locationChange"
                       size="default">
              <el-option
                  v-for="item in locationOptions"
                  :key="item.id"
                  :label="item.CityPinyin"
                  :value="item.id"
              >
              </el-option>
            </el-select>
          </div>

          <div class="jobs-mobile-filter-expand-salary" v-if="filterType == 2">
            <el-slider v-model="salaryValue" range :max="50"
                       :marks="salaryMarks"
                       @change="salaryChange"
                       :format-tooltip="formatToolTip"
            ></el-slider>
          </div>
          <div class="jobs-mobile-filter-expand-tags" v-if="filterType == 3">
            <div class="jobs-mobile-filter-expand-tag"
                 v-for="(item,i) in employmentTypeOptions"
                 :key="i"
                 @click="selectedEmployment(item.id)"
                 :class="item.id == employmentTypeValue ? 'expand-tag-active' : ''"
            >
              {{item.object_en}}
            </div>
          </div>

          <div class="jobs-mobile-filter-expand-tags" v-if="filterType == 4">
            <div class="jobs-mobile-filter-expand-tag"
                 v-for="(item,i) in ageToTeachOptions"
                 :key="i"
                 :class="studentAgeValue.indexOf(item.id) == -1 ? '' : 'expand-tag-active'"
                 @click="selectedAgeToTeach(item)"
            >
              {{item.object_en}}
            </div>
          </div>

          <div class="jobs-mobile-filter-expand-tags" v-if="filterType == 5">
            <div class="jobs-mobile-filter-expand-tag"
                 v-for="(item,i) in workTypeOptions"
                 :key="i"
                 :class="workTypeValue.indexOf(item.id) == -1 ? '' : 'expand-tag-active' "
                 @click="selectedWorkType(item)"
            >
              {{item.object_en}}
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import {JOBS_AREA_LIST, JOBS_COUNTRY_LIST, USER_OBJECT_LIST} from "@/api/api";
import thumbUpImg from '@/assets/newHome/thumb-up.png'
import feedback2img from '@/assets/newHome/feedback2.png'
export default {
  name: "filterWithJobList",
  props: [],
  data() {
    return {
      showMore: false,

      jobTitleValue: undefined,
      locationValue: undefined,
      salaryValue: [3, 13],
      salaryMarks: {3: '3K', 13: '13k'},

      employmentTypeValue: undefined,
      studentAgeValue: [],
      workTypeValue: [],

      locationOptions: [],
      ageToTeachOptions: [],
      employmentTypeOptions: [],
      paymentPeriodOptions: [],
      currencyOptions: [],
      workTypeOptions: [],
      isSalaryChange: false,

      locationPlaceholder: '',
      filterType: 0,
      showJobsMobileExpandStatus:false,
      thumbUpImg,
      feedback2img

    }
  },
  mounted() {
    this.getUserObjectList()
    let envName = process.env.VUE_APP_ENV_NAME
    if (envName === 'development' || envName === 'production') {
      this.locationPlaceholder = 'Country'
      this.getJobCountryList()
      let countryValue = this.$route.query.country;
      if (countryValue && countryValue != '') {
        this.locationValue = Number(countryValue)
      }
    }

    if (envName === 'developmentCN' || envName === 'productionCN') {
      this.locationPlaceholder = 'City'
      this.getJobsAreaList()
      let cityValue = this.$route.query.city;
      if (cityValue && cityValue != '') {
        this.locationValue = Number(cityValue)
      }
    }

  },
  methods: {
    turnFeedback(){
      window.open('https://zfrmz.com/dPmO4eRCxYzpuSx0z6QA','_blank')
    },
    chooseFilterType(value){
      this.filterType = value
    },
    showJobsMobileExpand(){
      this.showJobsMobileExpandStatus = !this.showJobsMobileExpandStatus;
      this.filterType = 0
    },
    selectedEmployment(id){

      if(this.employmentTypeValue == id){

        this.employmentTypeValue = undefined
      }else{
        this.employmentTypeValue = id
      }

    },
    selectedAgeToTeach(item){
      let index = this.studentAgeValue.indexOf(item.id)
      if(index == -1){
        this.studentAgeValue.push(item.id)
      }else{
        this.studentAgeValue.splice(index,1)
      }

    },
    selectedWorkType(item){
      let index = this.workTypeValue.indexOf(item.id)
      if(index == -1){
        this.workTypeValue.push(item.id)
      }else{
        this.workTypeValue.splice(index, 1)
      }
    },
    contactUs() {
      window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')

    },
    search() {

      let data = {
        job_title: this.jobTitleValue,
        location: this.locationValue,
        employment_type: this.employmentTypeValue,
        student_age: this.studentAgeValue,
        work_type: this.workTypeValue
      }

      if (this.isSalaryChange) {
        data.salary = this.salaryValue
      }

      this.$emit('search', data)

    },
    getUserObjectList() {
      let data = {
        token: localStorage.getItem('token')
      }
      USER_OBJECT_LIST(data).then(res => {
        if (res.code == 200) {

          this.ageToTeachOptions = res.message.filter(item => item.pid === 4); //age to teach
          this.employmentTypeOptions = res.message.filter(item => item.pid === 3); //employment type
          this.paymentPeriodOptions = res.message.filter(item => item.pid === 111); // payment period
          this.currencyOptions = res.message.filter(item => item.pid === 117); // currency
          this.workTypeOptions = res.message.filter(item => item.pid === 184); //subject

        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    getJobCountryList() {
      let params = {}
      JOBS_COUNTRY_LIST(params).then(res => {
        if (res.code == 200) {
          this.locationOptions = res.message;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getJobsAreaList() {
      let params = {}
      JOBS_AREA_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.locationOptions = res.message;
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    formatToolTip(value) {
      return value + "K";
    },
    locationChange() {

    },
    salaryChange() {
      this.isSalaryChange = true
    },
    genderChange() {

    },
    jobTypeChange() {

    },
    studentAgeChange() {

    },
    onlineChange() {

    }

  }

}
</script>

<style scoped>

.jobs-bg-filter-container {
  background-color: #F0F2F5;
  height: calc(100vh - 200px);
  padding: 30px 0;
}


.jobs-filter-container {
  height: calc(100% - 160px);
}

.jobs-filter-item {
  margin-bottom: 25px;
  margin-left: 30px;
  margin-right: 30px;
}

.jobs-filter-label {
  font-size: 20px;
  font-family: BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-filter-c {
  margin-top: 10px;
}

.search-container {
  text-align: center;
  margin-bottom: 25px;
}

.filter-contact-us-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 160px;
}

.filter-xll-action-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.filter-xll-action{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  cursor: pointer;
}

.filter-xll-action span{
  font-family: BCRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}

.filter-hide {
  margin-bottom: 25px;
}

/deep/ .el-checkbox {
  width: 100%;
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

/deep/ .el-select {
  display: block;
}

@media screen and (min-width: 769px) {

  .jobs-mobile-bg-filter-container {
    display: none;
  }

}

@media screen and (max-width: 768px) {
  .jobs-bg-filter-container {
    display: none;
  }

  .jobs-mobile-bg-filter-container {
    padding: 15px;
    background-color: #F0F2F5;
  }

  .jobs-mobile-filter-title {
    font-size: 20px;
    font-family: BSemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    color: #262626;
  }

  .jobs-mobile-filter-1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
  }

  .jobs-mobile-filter-1-input {
    margin: 0 15px;
  }

  .jobs-mobile-filter-2 {
    margin-top: 15px;
  }

  .jobs-mobile-filter-tabs{
    overflow-y: scroll;
    white-space: nowrap;
  }

  .jobs-mobile-filter-expand-location{
    margin-top: 15px;
  }

  .jobs-mobile-filter-expand-salary{
    margin-top: 15px;
  }

  .jobs-mobile-filter-expand-tags{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .jobs-mobile-filter-expand-tag{
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #262626;
    margin-right: 8px;
    margin-top: 8px;
    font-size: 12px;
    font-family: Assistant-SemiBold , Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;

  }

  .expand-tag-active{
    background-color: #9173ff;
    color: #FFFFFF;
  }

  .mobile-tab-active{
    color: #9173ff;
  }

}


</style>