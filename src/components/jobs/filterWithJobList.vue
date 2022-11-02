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
        <el-button type="primary" round @click="search()" >
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
            <el-checkbox-group v-model="studentAgeValue"  >

              <el-checkbox v-for="(item,i) in ageToTeachOptions" :key="i"
                           :label="item.id"
              >
                {{item.object_en}}
              </el-checkbox>

            </el-checkbox-group>

          </div>
        </div>
        <div class="jobs-filter-item">
          <div class="jobs-filter-label">Work schedule</div>
          <div class="jobs-filter-c">

            <el-checkbox-group v-model="workTypeValue"  >

              <el-checkbox v-for="(item,i) in workTypeOptions" :key="i"
                           :label="item.id"
              >
                {{item.object_en}}
              </el-checkbox>

            </el-checkbox-group>

          </div>
        </div>

      </template>

    </el-scrollbar>

    <div class="filter-contact-us-container">
      <div class="filter-hide" v-show="showMore">
        <el-button link @click="showMore = false" >HIDE FILTERS</el-button>
      </div>
      <el-icon :size="45" color="#6648FF" @click="contactUs()">
        <IconIcBaselineLiveHelp />
      </el-icon>
      <span @click="contactUs()">Contact Us</span>
    </div>


  </div>

</div>
</template>

<script>
import {JOBS_AREA_LIST, JOBS_COUNTRY_LIST, USER_OBJECT_LIST} from "@/api/api";

export default {
  name: "filterWithJobList",
  props:[],
  data(){
    return {
      showMore:false,

      jobTitleValue:undefined,
      locationValue:undefined,
      salaryValue:[3,13],
      salaryMarks:{3:'3K',13:'13k'},

      employmentTypeValue:undefined,
      studentAgeValue:undefined,
      workTypeValue:undefined,

      locationOptions:[],
      ageToTeachOptions:[],
      employmentTypeOptions:[],
      paymentPeriodOptions:[],
      currencyOptions:[],
      workTypeOptions:[],
      isSalaryChange:false,

      locationPlaceholder:''

    }
  },
  mounted(){
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
  methods:{
    contactUs(){
      window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')

    },
    search(){

      let data = {
        job_title:this.jobTitleValue,
        location: this.locationValue,
        employment_type: this.employmentTypeValue,
        student_age: this.studentAgeValue,
        work_type: this.workTypeValue
      }

      if(this.isSalaryChange){
        data.salary = this.salaryValue
      }

      this.$emit('search',data)

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
    formatToolTip(value){
      return value + "K";
    },
    locationChange(){

    },
    salaryChange(){
      this.isSalaryChange = true
    },
    genderChange(){

    },
    jobTypeChange(){

    },
    studentAgeChange(){

    },
    onlineChange(){

    }

  }

}
</script>

<style scoped>

.jobs-bg-filter-container{
  position: relative;
}

.jobs-filter-container {
  background-color: #F0F2F5;
  height: calc(100vh - 340px);
  padding: 30px 30px 170px 30px;
}

.jobs-filter-item{
  margin-bottom: 25px;
}

.jobs-filter-label {
  font-size: 20px;
  font-family: BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  color: #262626;
}

.jobs-filter-c{
  margin-top: 10px;
}

.search-container{
  text-align: center;
  margin-bottom: 25px;
}

.filter-contact-us-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;
  width: 100%;
  background-color: #F0F2F5;
  z-index: 100;
  padding: 25px 0 0 0;
}

.filter-contact-us-container span {
  font-family: BCRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 25px;
  color: #262626;
}

.filter-hide{
  margin-bottom: 25px;
}

/deep/ .el-checkbox{
  width: 100%;
  font-size: 18px;
  font-family: AssiRegular,"Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

/deep/ .el-select{
  display: block;
}

</style>