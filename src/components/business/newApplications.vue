<template>
  <div class="applications">
    <div class="applications-label">
      <span>Recent Applications ({{ data.length }})</span>
      <el-button class="applications-all-btn"
                 @click="showAllApplications()"
                 link>
        All Applications
      </el-button>
    </div>

    <el-scrollbar class="application-container">

      <template v-if="data.length > 0">

        <div class="application-header">
          <div class="application-header-item">Applicant Name</div>
          <div class="application-header-item">Post Applied</div>
          <div class="application-header-item">Match Meter</div>
          <div class="application-header-item"></div>
        </div>

        <div v-for="(item,i) in data" :key="i">

          <div class="application">

            <div class="application-item">
              <el-avatar class="application-avatar-img"
                         :src="item.user_contact.headimgurl ? item.user_contact.headimgurl : defaultAvatar ">
              </el-avatar>
              <span>{{ item.user_contact.educator_contact.name }}</span>
            </div>
            <div class="application-item">
              <span>{{ item.job.job_title }}</span>
            </div>

            <div class="application-item">
              <div style="width: 100px;">
                <el-progress :stroke-width="15" :percentage="item.match_meter" color="#9173FF"/>
              </div>
            </div>

            <div class="application-item" style="justify-content: flex-end;">
              <el-button class="view-application-btn" size="small" type="info" @click="viewApplicationEvent(item.id)">
                View
              </el-button>
            </div>

          </div>

          <div class="application-expand" v-if="item.id == selectedApplicationIdWithCompany">
            <div class="work-exp">
              <div class="work-exp-label">
                <span>Working experience</span>
                <el-button class="view-detail-btn" link @click="viewEducatorDetail(item)">
                  VIEW DETAILS
                </el-button>
              </div>
              <div class="work-exp-c">

                <template v-for="(work,i) in item.user_contact.educator_contact.work_info" :key="i">

                  <div class="work-exp-c-item" v-if="i<=2">
                    <div class="work-exp-c-item-label"> {{ work.title }}</div>
                    <div class="work-exp-c-item-text">
                      {{ work.company_name }}, {{ work.location }}
                    </div>
                    <div class="work-exp-c-item-text">
                      {{ $filters.ymdFormatTimestamp(work.work_time_from) }} - {{
                        $filters.ymdFormatTimestamp(work.work_time_to)
                      }}
                    </div>
                  </div>

                </template>

                <div class="work-exp-c-item">
                  <!--                  <div class="work-exp-c-item-label">+2 more jobs</div>-->
                </div>


              </div>
            </div>

            <div class="education-cer">
              <div class="education-cer-label">
                Education & Certifications
              </div>
              <div class="education-cer-c">

                <template v-for="(education,i) in item.user_contact.educator_contact.education_info"
                          :key="i">
                  <div class="education-cer-c-item">
                    <div class="education-cer-c-label">
                      {{ education.school_name }}
                    </div>
                    <div class="education-cer-c-text">
                      {{ education.degree }}
                    </div>
                    <div class="education-cer-c-text">
                      {{
                        $filters.ymdFormatTimestamp(education.start_time)
                      }}-{{ $filters.ymdFormatTimestamp(education.end_time) }}
                    </div>
                  </div>
                </template>

                <!--              <div class="education-cer-c-item">-->
                <!--                <div class="education-cer-c-label">-->
                <!--                  Certificates and Diplomas-->
                <!--                </div>-->
                <!--                <div class="education-cer-c-text">-->
                <!--                  TOEFL,CELTA,Delta Module 1,Delta Module2,Delta Module 3-->
                <!--                </div>-->
                <!--              </div>-->

                <!--              <div class="education-cer-c-item">-->
                <!--                <div class="education-cer-c-label">-->
                <!--                  Languages-->
                <!--                </div>-->
                <!--                <div class="education-cer-c-text">-->
                <!--                  English(native)-->
                <!--                </div>-->
                <!--                <div class="education-cer-c-text">-->
                <!--                  Korean(fluent)-->
                <!--                </div>-->
                <!--                <div class="education-cer-c-text">-->
                <!--                  Turkish(beginner)-->
                <!--                </div>-->
                <!--              </div>-->

              </div>
            </div>

            <div class="application-b">
              <div class="application-b-l">
                <el-button class="application-b-l-btn-1" plain round @click="viewEducatorDetail(item)">
                  View Profile
                  <el-icon style="margin-left: 4px;">
                    <IconIconParkShare/>
                  </el-icon>
                </el-button>
                <el-button class="application-b-l-btn-1" plain round @click="viewEducatorResume(item)">
                  Resume
                  <el-icon style="margin-left: 4px;">
                    <IconIconParkShare/>
                  </el-icon>
                </el-button>
              </div>
              <div class="application-b-r">
                <el-button class="application-b-l-btn-1" link round
                           :disabled="item.status == 3"
                           @click="showApplyJobStatusDialog(item.id,3,i)"
                >
                  NOT INTERESTED
                </el-button>
                <el-button class="application-b-l-btn-2" type="primary" round
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

    <jobApplyStatusPopup :visible="applyJobStatusVisible"
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
import {encode} from 'js-base64'

export default {
  name: "newApplications",
  props: ['data'],
  components: {
    jobApplyStatusPopup
  },
  data() {
    return {
      defaultAvatar,
      expandStatus: false,
      selectedApplicationIdWithCompany: undefined,

      applyJobStatusVisible: false,
      applyJobStatusValue: 0,
      applyJobStatusIndex: 0,
      applyJobAlwaysValue: false

    }
  },
  methods: {
    viewApplicationEvent(id) {

      if (this.selectedApplicationIdWithCompany === id) {
        this.selectedApplicationIdWithCompany = 0
      } else {
        this.selectedApplicationIdWithCompany = id
      }

      // this.expandStatus = !this.expandStatus
    },
    showAllApplications() {
      this.$router.push('/jobs/home')
    },
    setApplyJobStatus(id, value, index, type) {

      let params = {
        id: id,
        status: value
      }

      SET_APPLY_JOB_STATUS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          // this.applyJobStatusValue = value
          this.$message({
            type: 'success',
            message: 'Success'
          })

          if (type === 1) {
            this.applyJobStatusVisible = false
            if (this.applyJobAlwaysValue) {
              localStorage.setItem('statusDialogAlways', this.applyJobAlwaysValue)
            }
          }

          this.$emit('updateIndex', index, value)

        }
      }).catch(err => {
        console.log(err)
      })

    },
    updateApplyJobStatus(alwaysValue) {
      // console.log(alwaysValue)
      this.applyJobAlwaysValue = alwaysValue
      this.setApplyJobStatus(this.applyJobStatusId, this.applyJobStatusValue, this.applyJobStatusIndex, 1)

    },
    showApplyJobStatusDialog(id, value, index) {
      let alwaysValue = localStorage.getItem('statusDialogAlways')
      if (alwaysValue) {
        this.setApplyJobStatus(id, value, index, 2)
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
        from: 'other'
      }

      let str = encode(JSON.stringify(obj))
      let {href} = this.$router.resolve({
        path: '/educator/profile', query: {str: str}
      })
      window.open(href, '_blank')
      // this.$router.push({path: '/educator/profile', query: {str: str}})

    },
    viewEducatorResume(info) {
      console.log(info)
      let resumePdf = info.user_contact.educator_contact.resume_pdf

      if (resumePdf) {
        window.open(resumePdf, '_blank')
      } else {
        this.$message({
          type: 'warning',
          message: 'The user does not have a resume in pdf format',
          grouping: true
        })
      }

    }


  }
}
</script>

<style scoped>

.applications {

  box-sizing: border-box;

  width: 520px;
  height: 409px;
  border: 1px solid #EAECF0;
  filter: drop-shadow(0px 2px 3px rgba(16, 24, 40, 0.1));
  border-radius: 10px;
}

.applications-label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #101828;

  margin-top: 26px;
  margin-left: 16px;
}

.applications-all-btn {
  margin-left: 10px;
}

.application-container {
  margin-top: 20px;
  height: 340px;
}

.application-header{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 42px;
  left: 16px;
  top: 67px;

  background: #F9FAFB;
  border-radius: 0px;

  margin: 0 16px;
  padding: 0 9px;
}

.application-header-item{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #1D2939;

  width: 107px;
}

.application {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16px;

}

.application-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 9px;
  width: 107px;

}

.application-avatar-img {
  width: 24px;
  height: 24px;
  border-radius: 24px;
  margin-right: 8px;
}

.application-item span {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;

  color: #667085;
}


.view-application-btn {
  font-size: 20px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.application-expand {
  padding: 20px;

}

.work-exp {

}

.work-exp-label {
  border-bottom: 2px solid #B3B3B3;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.work-exp-label span {
  font-size: 16px;
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #262626;
}

.view-detail-btn {

  font-weight: 500;
  color: #6650B3;
  margin-left: 10px;
}

.work-exp-c {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin-top: 15px;
}

.work-exp-c-item {
  flex: 1;
  padding-right: 40px;
}

.work-exp-c-item-label {
  font-size: 14px;
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #262626;
  margin-bottom: 5px;
}

.work-exp-c-item-text {
  font-size: 14px;
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 400;
  color: #262626;
}

.education-cer {
  margin-top: 16px;
}

.education-cer-label {
  font-size: 16px;
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #262626;
  border-bottom: 2px solid #B3B3B3;
}

.education-cer-c {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  margin-top: 16px;
}

.education-cer-c-item {
  flex: 1;
  padding-right: 40px;
}

.education-cer-c-label {
  font-size: 14px;
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #262626;
  margin-bottom: 5px;
}

.education-cer-c-text {
  font-size: 14px;
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 400;
  color: #262626;
}

.application-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;

}

.application-b-l {

}

.application-b-l-btn-1 {
  font-size: 12px;
  font-weight: 500;
  color: #262626;
}

.application-b-l-btn-2 {
  font-size: 12px;
  font-weight: 500;
  color: #FFFFFF;
}

.application-b-r {

}

@media screen and (max-width: 768px) {
  .applications {
    padding: 0;
    background-color: #F0F2F5;
  }

  .applications-label {
    font-size: 20px;
    margin: 0 15px 8px 15px;
  }

  .applications-all-btn {
    font-size: 12px;
  }

  .application {
    padding: 15px;
    margin: 7px 15px 15px 15px;
    border-radius: 18px;
    border-bottom: none;
    background-color: #FFFFFF;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }

  .view-application-btn {
    font-size: 12px;
  }

  .application-expand {
    padding: 15px;
  }

  .work-exp-label span {
    font-size: 18px;
  }

  .view-detail-btn {
    font-size: 12px;
  }

  .work-exp-c {
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .work-exp-c-item {
    width: 100%;
    flex: auto;
    padding-right: 0;
    margin-bottom: 4px;
  }

  .work-exp-c-item-label {
    font-size: 14px;
  }

  .work-exp-c-item-text {
    font-size: 12px;
  }

  .education-cer {
    margin-top: 15px;
  }

  .education-cer-label {
    font-size: 18px;
  }

  .education-cer-c {
    margin-top: 15px;
    flex-wrap: wrap;
  }

  .education-cer-c-item {
    width: 100%;
    flex: auto;
    padding-right: 0;
    margin-bottom: 4px;
  }

  .education-cer-c-label {
    font-size: 14px;
  }

  .education-cer-c-text {
    font-size: 12px;
  }

  .application-b {
    margin-top: 15px;
    flex-direction: column;
  }

  .application-b-l {

  }

  .application-b-r {
    margin-top: 10px;
  }

  .application-b-l-btn-1 {
    font-size: 12px;
  }

  .application-b-l-btn-2 {
    font-size: 12px;
  }


}


</style>
