<template>
<div>
  <div class="dashboard-applications">
    <div class="dashboard-applications-label">
      <span>New applicants(7)</span>
      <el-button class="dashboard-applications-all-btn" link>
        ALL APPLICATIONS
      </el-button>
    </div>
    <el-scrollbar class="dashboard-application-container">

      <div  v-for="(item,i) in data" :key="i">

        <div class="dashboard-application" >

          <div class="dashboard-application-basic">
            <div class="dashboard-application-basic-l">
              <el-avatar class="dashboard-application-avatar-img"
                         :src="item.user_contact.headimgurl ? item.user_contact.headimgurl : defaultAvatar ">
              </el-avatar>
            </div>
            <div class="dashboard-application-basic-r">
              <div class="dashboard-application-name">{{ item.user_contact.educator_contact.name }}</div>
              <div class="dashboard-application-n">
                <div class="dashboard-application-n-1">{{item.user_contact.educator_contact.nationality}}</div>
                <div class="dashboard-application-n-2"
                     v-if="item.user_contact.educator_contact.Teaching_experience"
                >
                <span v-for="(exp,i) in item.user_contact.educator_contact.Teaching_experience"
                      :key="i"
                >{{exp.object_en}}</span>
                </div>
              </div>
            </div>

          </div>
          <div class="dashboard-application-job">
            <div class="dashboard-application-job-1">{{item.job.job_title}}</div>
            <div class="dashboard-application-job-2">
              position applied for
            </div>
          </div>

          <div class="dashboard-application-match">
            <div class="dashboard-application-match-1">
              <div style="width: 100px;">
                <el-progress :stroke-width="15" :percentage="item.match_meter" color="#9173FF" />
              </div>
            </div>
            <div class="dashboard-application-match-2">match meter</div>
          </div>

          <div class="dashboard-view-application">
            <el-button class="dashboard-view-application-btn" plain round @click="viewApplicationEvent(item.id)">
              VIEW APPLICATION
            </el-button>
          </div>

        </div>

        <div class="dashboard-application-expand" v-if="item.id == selectedApplicationIdWithCompany">
          <div class="dashboard-work-exp">
            <div class="dashboard-work-exp-label">
              <span>Working experience</span>
              <el-button class="dashboard-view-detail-btn" link>
                VIEW DETAILS
              </el-button>
            </div>
            <div class="dashboard-work-exp-c">

              <template v-for="(work,i) in item.user_contact.educator_contact.work_info" :key="i">

                <div class="dashboard-work-exp-c-item"  v-if="i<=2">
                  <div class="dashboard-work-exp-c-item-label"> {{work.title}}</div>
                  <div class="dashboard-work-exp-c-item-text">
                    {{work.company_name}}, {{work.location}}
                  </div>
                  <div class="dashboard-work-exp-c-item-text">
                    {{ $filters.ymdFormatTimestamp(work.work_time_from) }} - {{
                      $filters.ymdFormatTimestamp(work.work_time_to)
                    }}
                  </div>
                </div>

              </template>

              <div class="dashboard-work-exp-c-item">
                <div class="dashboard-work-exp-c-item-label">+2 more jobs</div>
              </div>


            </div>
          </div>

          <div class="dashboard-education-cer">
            <div class="dashboard-education-cer-label">
              Education & Certifications
            </div>
            <div class="dashboard-education-cer-c">

              <template v-for="(education,i) in item.user_contact.educator_contact.education_info"
                        :key="i">
                <div class="dashboard-education-cer-c-item">
                  <div class="dashboard-education-cer-c-label">
                    {{education.school_name}}
                  </div>
                  <div class="dashboard-education-cer-c-text">
                    {{education.degree}}
                  </div>
                  <div class="dashboard-education-cer-c-text">
                    {{
                      $filters.ymdFormatTimestamp(education.start_time)
                    }}-{{ $filters.ymdFormatTimestamp(education.end_time) }}
                  </div>
                </div>
              </template>

              <div class="dashboard-education-cer-c-item">
                <div class="dashboard-education-cer-c-label">
                  Certificates and Diplomas
                </div>
                <div class="dashboard-education-cer-c-text">
                  TOEFL,CELTA,Delta Module 1,Delta Module2,Delta Module 3
                </div>
              </div>

              <div class="dashboard-education-cer-c-item">
                <div class="dashboard-education-cer-c-label">
                  Languages
                </div>
                <div class="dashboard-education-cer-c-text">
                  English(native)
                </div>
                <div class="dashboard-education-cer-c-text">
                  Korean(fluent)
                </div>
                <div class="dashboard-education-cer-c-text">
                  Turkish(beginner)
                </div>
              </div>

            </div>
          </div>

          <div class="dashboard-application-b">
            <div class="dashboard-application-b-l">
              <el-button class="dashboard-application-b-l-btn-1" plain round>
                VIEW PROFILE
              </el-button>
              <el-button class="dashboard-application-b-l-btn-1" plain round>
                RESUME
              </el-button>
            </div>
            <div class="dashboard-application-b-r">
              <el-button class="dashboard-application-b-l-btn-1" link round>
                NOT INTERESTED
              </el-button>
              <el-button class="dashboard-application-b-l-btn-2" type="primary" round>
                SHORTLIST IT
              </el-button>
            </div>
          </div>

        </div>

      </div>


    </el-scrollbar>

  </div>

</div>
</template>

<script>

import defaultAvatar from '@/assets/default/avatar.png'

export default {
  name: "newApplications",
  props:['data'],
  data(){
    return {
      defaultAvatar,
      expandStatus:false,
      selectedApplicationIdWithCompany:undefined
    }
  },
  methods:{
    viewApplicationEvent(id){
      this.selectedApplicationIdWithCompany = id
      // this.expandStatus = !this.expandStatus
    },
  }
}
</script>

<style scoped>

.dashboard-applications {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 15px;
  /*margin-top: 20px;*/

}

.dashboard-applications-label {
  font-size: 30px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 400;
  color: #262626;
}

.dashboard-applications-all-btn {
  font-size: 20px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #6650B3;
  margin-left: 10px;
}

.dashboard-application-container {
  margin-top: 20px;
  height: 588px;
  /*overflow-y: scroll;*/
}

.dashboard-application {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 2px solid #f0f2f5;
}


.dashboard-application-basic {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
}

.dashboard-application-basic-l {

}

.dashboard-application-avatar-img {
  width: 70px;
  height: 70px;
  border-radius: 70px;
}


.dashboard-application-basic-r {
  margin-left: 10px;
}

.dashboard-application-name {
  font-size: 26px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-application-n {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;
}

.dashboard-application-n-1 {
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-application-n-2 {
  margin-left: 10px;
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-application-job {
  flex: 1;
}

.dashboard-application-job-1 {
  font-size: 26px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-application-job-2 {
  margin-top: 15px;
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-application-match {
  flex: 1;
}

.dashboard-application-match-1 {
  font-size: 26px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-application-match-2 {
  margin-top: 15px;
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-view-application {
  flex: 1;
}

.dashboard-view-application-btn {
  font-size: 20px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-application-expand {
  padding: 20px;

}

.dashboard-work-exp {

}

.dashboard-work-exp-label {
  border-bottom: 2px solid #B3B3B3;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.dashboard-work-exp-label span{
  font-size: 26px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #262626;
}
.dashboard-view-detail-btn{
  font-size: 20px;
  font-weight: 500;
  color: #6650B3;
  margin-left: 10px;
}

.dashboard-work-exp-c {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin-top:25px;
}

.dashboard-work-exp-c-item {
  flex: 1;
  padding-right: 40px;
}

.dashboard-work-exp-c-item-label {
  font-size: 23px;
  font-family: Assistant-Medium, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #262626;
  margin-bottom: 5px;
}

.dashboard-work-exp-c-item-text {
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 400;
  color: #262626;
}

.dashboard-education-cer {
  margin-top: 50px;
}

.dashboard-education-cer-label {
  font-size: 26px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #262626;
  border-bottom: 2px solid #B3B3B3;
}

.dashboard-education-cer-c {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin-top: 25px;
}

.dashboard-education-cer-c-item {
  flex: 1;
  padding-right: 40px;
}

.dashboard-education-cer-c-label {
  font-size: 23px;
  font-family: Assistant-Medium, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #262626;
  margin-bottom: 5px;
}

.dashboard-education-cer-c-text {
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 400;
  color: #262626;
}

.dashboard-application-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top:50px;

}

.dashboard-application-b-l {

}

.dashboard-application-b-l-btn-1{
  font-size: 20px;
  font-weight: 500;
  color: #262626;
}

.dashboard-application-b-l-btn-2{
  font-size: 20px;
  font-weight: 500;
  color: #FFFFFF;
}

.dashboard-application-b-r {

}


</style>