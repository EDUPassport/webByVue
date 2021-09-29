<template>
<div>
  <div>
    <el-row class="detail-row" align="top" justify="center">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="job-title">{{detailData.job_title}}</div>
        <div class="job-address">
          {{detailData.address}}
        </div>
        <div class="job-salary">
          {{detailData.currency}}{{detailData.salary_min}} - {{detailData.salary_max}}
        </div>

        <div class="job-desc-container">
          <div class="job-desc-label">Job Description</div>
          <div class="job-desc-content">
            {{detailData.desc}}
          </div>
          <div class="job-tags">
            <div class="job-tag">FullTime</div>
            <div class="job-tag">Equal Opportunity</div>
            <div class="job-tag">laboris</div>
          </div>
        </div>

        <div class="job-details-container">
          <div class="job-details-label">Job Details</div>
          <div class="job-details-content">
            <div class="application-deadline">
              <b>Application: </b>
              <span>Dec 31, 2021</span>
            </div>
            <div class="start-date">
              <b >Start Date: </b>
              <span>Dec 31,2021</span>
            </div>
            <div class="number-vacancies">
              <b>Number of Vacancies:</b>
              <span>1</span>
            </div>
            <div class="class-size">
              <b>Class Size:</b>
              <span>10</span>
            </div>
            <div class="subjects">
              <b>Subject(s):</b>
              <span>English</span>
              <span>Maths</span>
            </div>
            <div class="working-hours">

            </div>
            <div class="student-ages">
              <span>Montessori(7-12yrs)</span>
              <span>Montessori(7-12yrs)</span>
              <span>Montessori(7-12yrs)</span>
            </div>

          </div>
        </div>

        <div class="compensation-container">
          <div class="compensation-label">Compensation</div>
          <div class="compensation-content">
            <div class="compensation-salary">
              <b>Salary: </b>
              {{detailData.currency}}{{detailData.salary_min}} - {{detailData.salary_max}}
            </div>
            <div class="compensation-payment">
              <b>Payment: </b>
              {{detailData.payment_period_en}}
            </div>
            <div class="compensation-class-size">
              <b>Class Size: </b>
              {{detailData.class_size}}
            </div>
            <div class="compensation-benefits">
              <b>Benefits: </b>
              <div class="compensation-benefits-content">
                <div class="compensation-benefits-item">Work Visa</div>
                <div class="compensation-benefits-item">Work Visa</div>
                <div class="compensation-benefits-item">Work Visa</div>
              </div>
            </div>

          </div>
        </div>

        <div class="qua-container">
          <div class="qua-label">Qualification Requirements</div>
          <div class="qua-content">
            <div class="qua-teach-exp">
              <b>Teaching Experience: </b>
              <span>1-2yrs</span>
            </div>
            <div class="qua-age">
              <b>Age: </b>
              <span>18-44</span>
            </div>
            <div class="qua-education-req">
              <b>Minimum Education Requirements: </b>
              <span>Bachelors</span>
            </div>
          </div>
        </div>

        <div class="address-container">
          <div class="address-label">Address & Location</div>
          <div class="address-content">
            <div class="address-address">
              <b>Address:</b>
              <span>{{detailData.address}}</span>
            </div>

            <div class="address-location">
              <b>Location: </b>
            </div>
          </div>

        </div>

        <div class="apply-btn-container">
          <el-button class="apply-btn" type="primary">Apply Now!</el-button>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
      </el-col>
    </el-row>
  </div>

</div>
</template>

<script>
import {JOB_DETAIL} from "@/api/api";

export default {
  name: "detail",
  data(){
    return {
      detailData:{}
    }
  },
  mounted() {
    let jobId = this.$route.query.id;
    this.getJobDetail(jobId)
  },
  methods:{
    getJobDetail(id){
      let params = {
        job_id:id
      }
      JOB_DETAIL(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.detailData = res.message
        }
      })

    }
  }
}
</script>

<style scoped>
.detail-row{
  width: 1100px;
  margin: 0 auto;
}
</style>
