<template>
<div>
  <div class="dashboard-applications">
    <div class="dashboard-applications-label">
      <span>New applicants({{data.length}})</span>
      <el-button class="dashboard-applications-all-btn"
                 @click="showAllApplications()"
                 link>
        ALL APPLICATIONS
      </el-button>
    </div>
    <el-scrollbar class="dashboard-application-container">

      <template v-if="data.length > 0">
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
                <el-button class="dashboard-view-detail-btn" link  @click="viewEducatorDetail(item)">
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
<!--                  <div class="dashboard-work-exp-c-item-label">+2 more jobs</div>-->
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

                <!--              <div class="dashboard-education-cer-c-item">-->
                <!--                <div class="dashboard-education-cer-c-label">-->
                <!--                  Certificates and Diplomas-->
                <!--                </div>-->
                <!--                <div class="dashboard-education-cer-c-text">-->
                <!--                  TOEFL,CELTA,Delta Module 1,Delta Module2,Delta Module 3-->
                <!--                </div>-->
                <!--              </div>-->

                <!--              <div class="dashboard-education-cer-c-item">-->
                <!--                <div class="dashboard-education-cer-c-label">-->
                <!--                  Languages-->
                <!--                </div>-->
                <!--                <div class="dashboard-education-cer-c-text">-->
                <!--                  English(native)-->
                <!--                </div>-->
                <!--                <div class="dashboard-education-cer-c-text">-->
                <!--                  Korean(fluent)-->
                <!--                </div>-->
                <!--                <div class="dashboard-education-cer-c-text">-->
                <!--                  Turkish(beginner)-->
                <!--                </div>-->
                <!--              </div>-->

              </div>
            </div>

            <div class="dashboard-application-b">
              <div class="dashboard-application-b-l">
                <el-button class="dashboard-application-b-l-btn-1" plain round @click="viewEducatorDetail(item)">
                  View Profile
                  <el-icon style="margin-left: 4px;">
                    <IconIconParkShare />
                  </el-icon>
                </el-button>
                <el-button class="dashboard-application-b-l-btn-1" plain round @click="viewEducatorResume(item)">
                  Resume
                  <el-icon style="margin-left: 4px;">
                    <IconIconParkShare />
                  </el-icon>
                </el-button>
              </div>
              <div class="dashboard-application-b-r">
                <el-button class="dashboard-application-b-l-btn-1" link round
                           :disabled="item.status == 3"
                           @click="showApplyJobStatusDialog(item.id,3,i)"
                >
                  NOT INTERESTED
                </el-button>
                <el-button class="dashboard-application-b-l-btn-2" type="primary" round
                           :disabled="item.status == 2"
                           @click="showApplyJobStatusDialog(item.id,2,i)"
                >
                  SHORTLIST IT
                </el-button>
              </div>
            </div>

          </div>

        </div>

      </template>
      <template v-else>
        <el-empty description="..."></el-empty>
      </template>

    </el-scrollbar>

  </div>

  <jobApplyStatusPopup  :visible="applyJobStatusVisible"
                        :status="applyJobStatusValue"
                        @update="updateApplyJobStatus"
                        @close="applyJobStatusVisible = false">

  </jobApplyStatusPopup>

</div>
</template>

<script>
import jobApplyStatusPopup from "@/components/status/jobApplyStatusPopup";
import defaultAvatar from '@/assets/default/avatar.png'
import {SET_APPLY_JOB_STATUS} from "@/api/api";
import {encode } from 'js-base64'

export default {
  name: "newApplications",
  props:['data'],
  components: {
    jobApplyStatusPopup
  },
  data(){
    return {
      defaultAvatar,
      expandStatus:false,
      selectedApplicationIdWithCompany:undefined,

      applyJobStatusVisible:false,
      applyJobStatusValue:0,
      applyJobStatusIndex:0,
      applyJobAlwaysValue:false

    }
  },
  methods:{
    viewApplicationEvent(id){

      if(this.selectedApplicationIdWithCompany === id){
        this.selectedApplicationIdWithCompany = 0
      }else{
        this.selectedApplicationIdWithCompany = id
      }

      // this.expandStatus = !this.expandStatus
    },
    showAllApplications(){
      this.$router.push('/jobs/home')
    },
    setApplyJobStatus(id,value,index,type){

      let params = {
        id: id,
        status: value
      }

      SET_APPLY_JOB_STATUS(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          // this.applyJobStatusValue = value
          this.$message({
            type:'success',
            message:'Success'
          })

          if(type === 1){
            this.applyJobStatusVisible =false
            if(this.applyJobAlwaysValue){
              localStorage.setItem('statusDialogAlways', this.applyJobAlwaysValue)
            }
          }

          this.$emit('updateIndex',index, value)

        }
      }).catch(err=>{
        console.log(err)
      })

    },
    updateApplyJobStatus(alwaysValue){
      // console.log(alwaysValue)
      this.applyJobAlwaysValue = alwaysValue
      this.setApplyJobStatus(this.applyJobStatusId, this.applyJobStatusValue, this.applyJobStatusIndex,1)

    },
    showApplyJobStatusDialog(id,value,index){
      let alwaysValue = localStorage.getItem('statusDialogAlways')
      if(alwaysValue){
        this.setApplyJobStatus(id, value, index,2)
        return;
      }

      this.applyJobStatusIndex = index
      this.applyJobStatusId = id;
      this.applyJobStatusValue = value;
      this.applyJobStatusVisible = true;

    },
    viewEducatorDetail(info) {
      console.log(info)
      let companyId = info.user_contact.company_id;
      let userId = info.user_contact.id;

      let obj = {
        cid: companyId,
        uid: userId,
        identity: 1,
        from:'other'
      }

      let str = encode(JSON.stringify(obj))
      let { href } = this.$router.resolve({
        path: '/educator/profile', query: {str: str}
      })
      window.open(href,'_blank')
      // this.$router.push({path: '/educator/profile', query: {str: str}})

    },
    viewEducatorResume(info) {
      console.log(info)
      let resumePdf = info.user_contact.educator_contact.resume_pdf

      if(resumePdf){
        window.open(resumePdf,'_blank')
      }else{
        this.$message({
          type:'warning',
          message:'The user does not have a resume in pdf format',
          grouping:true
        })
      }

    }


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

@media screen and (max-width: 768px) {
  .dashboard-applications{
    padding: 0;
    background-color: #F0F2F5;
  }

  .dashboard-applications-label{
    font-size: 20px;
    margin: 0 15px 8px 15px;
  }
  .dashboard-applications-all-btn{
    font-size: 12px;
  }

  .dashboard-application{
    padding: 15px;
    margin: 7px 15px 15px 15px;
    border-radius: 18px;
    border-bottom:none;
    background-color: #FFFFFF;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }

  .dashboard-application-basic{
    width: 100%;
  }
  .dashboard-application-avatar-img{
    width: 40px;
    height: 40px;
  }
  .dashboard-application-name{
    font-size: 18px;
  }
  .dashboard-application-n{
    margin-top: 4px;
  }
  .dashboard-application-n-1{
    font-size: 12px;
  }

  .dashboard-application-n-2{
    font-size: 12px;
  }

  .dashboard-application-job{
    width: 100%;
    margin-top: 10px;
  }

  .dashboard-application-job-1{
    font-size: 18px;
  }
  .dashboard-application-job-2{
    display: none;
  }

  .dashboard-application-match{
    width: 100%;
    margin-top: 20px;
  }
  .dashboard-application-match-2{
    display: none;
  }

  .dashboard-view-application{
    position: absolute;
    bottom: 15px;
    right: 15px;

  }

  .dashboard-view-application-btn{
    font-size: 12px;
  }

  .dashboard-application-expand{
    padding: 15px;
  }
  .dashboard-work-exp-label span{
    font-size: 18px;
  }
  .dashboard-view-detail-btn{
    font-size: 12px;
  }
  .dashboard-work-exp-c{
    flex-wrap: wrap;
    margin-top: 15px;
  }
  .dashboard-work-exp-c-item{
    width: 100%;
    flex: auto;
    padding-right: 0;
    margin-bottom: 4px;
  }

  .dashboard-work-exp-c-item-label{
    font-size: 14px;
  }
  .dashboard-work-exp-c-item-text{
    font-size: 12px;
  }

  .dashboard-education-cer{
    margin-top: 15px;
  }

  .dashboard-education-cer-label{
    font-size: 18px;
  }
  .dashboard-education-cer-c{
    margin-top: 15px;
    flex-wrap: wrap;
  }

  .dashboard-education-cer-c-item{
    width: 100%;
    flex: auto;
    padding-right: 0;
    margin-bottom: 4px;
  }

  .dashboard-education-cer-c-label{
    font-size: 14px;
  }

  .dashboard-education-cer-c-text{
    font-size: 12px;
  }

  .dashboard-application-b{
    margin-top: 15px;
    flex-direction: column;
  }

  .dashboard-application-b-l{

  }
  .dashboard-application-b-r{
    margin-top: 10px;
  }
  .dashboard-application-b-l-btn-1{
    font-size: 12px;
  }

  .dashboard-application-b-l-btn-2{
    font-size: 12px;
  }


}


</style>