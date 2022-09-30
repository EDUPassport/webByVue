<template>
  <div class="bg">
    <div class="ja-container">
      <div class="ja-l-container">
        <meSideMenu></meSideMenu>
      </div>

      <el-scrollbar class="ja-r-container">
        <div class="ja-r-container-bg">

          <div class="da-container">

            <div class="da">
              <div class="da-t">
                <div class="da-t-l">
                  <div class="da-label">
                    <template v-if="filterByJobStatus">
                      Jobs
                    </template>
                    <template v-if="filterByApplicantStatus">
                      Applications
                    </template>
                  </div>
                  <template v-if="filterByJobStatus">
                    <div class="da-filter" @click="filterByApplicants()">
                      <el-icon>
                        <IconEpMenu />
                      </el-icon>
                      <span>VIEW BY: JOBS</span>
                      <el-icon>
                        <ArrowDownBold />
                      </el-icon>
                    </div>
                  </template>

                  <template v-if="filterByApplicantStatus">
                    <div class="da-filter" @click="filterByJobs()">
                      <el-icon>
                        <IconEpMenu />
                      </el-icon>
                      <span>VIEW BY: APPLICATIONS</span>

                      <el-icon>
                        <ArrowDownBold />
                      </el-icon>
                    </div>
                  </template>

                </div>
                <div class="da-t-r" v-if="filterByJobStatus">
                  <template v-if="identity == 1 || identity == 5">
                    <el-button class="da-t-r-btn"
                               disabled
                               type="primary" round>
                      POST A JOB
                    </el-button>
                  </template>
                  <template v-else>
                    <el-button class="da-t-r-btn"
                               @click="postJob()"
                               type="primary" round>
                      POST A JOB
                    </el-button>
                  </template>

                </div>
              </div>

              <div class="da-item-container">

                <el-row :gutter="0" v-if="filterByJobStatus">
                  <el-col :span="6" class="da-item-t-item">Job title</el-col>
                  <el-col :span="6" class="da-item-t-item">Total applicants</el-col>
                  <el-col :span="6" class="da-item-t-item">Posted/Deadline</el-col>
                  <el-col :span="6" class="da-item-t-item">Action</el-col>
                </el-row>

                <el-row :gutter="0" v-if="filterByApplicantStatus">
                  <el-col :span="6" class="da-item-t-item">Applicant</el-col>
                  <el-col :span="6" class="da-item-t-item">Position applied for</el-col>
                  <el-col :span="6" class="da-item-t-item">Status</el-col>
                  <el-col :span="6" class="da-item-t-item">Action</el-col>
                </el-row>

                <template v-if="filterByJobStatus">
                  <div class="da-item-container-height">
                    <div  v-for="(item,i) in myJobsData" :key="i">

                      <el-row :gutter="0" class="da-da-item" >

                        <el-col :span="6" class="da-job-title">

                          <div class="da-job-title-l">
                            <el-popover
                                v-if="item.status == 0"
                                placement="top-start"
                                title="Pending"
                                :width="300"
                                trigger="hover"
                                content="Your job post is pending approval. Please give us 2-3 business days to review."
                            >
                              <template #reference>
                                <el-icon :size="20" color="#F9B019">
                                  <IconIcBaselinePendingActions />
                                </el-icon>
                              </template>
                            </el-popover>

                            <el-popover
                                v-if="item.status == 2"
                                placement="top-start"
                                title="Rejected"
                                :width="300"
                                trigger="hover"
                                content="Please contact us for more information"
                            >
                              <template #reference>
                                <el-icon :size="20" color="#FF4D4D">
                                  <IconCiError />
                                </el-icon>
                              </template>
                            </el-popover>
                          </div>

                         <div class="da-job-title-r">
                           <el-tooltip
                               class="box-item"
                               effect="dark"
                               :content="item.job_title"
                               placement="top"
                           >
                             {{item.job_title}}
                           </el-tooltip>
                         </div>
                        </el-col>

                        <el-col :span="6" class="da-total-applicants">
                          <div class="da-total-applicants-l-circle" v-if="item.unread_status"></div>
                          <span>{{item.resume_count}}</span>
                        </el-col>

                        <el-col :span="6" class="da-posted-deadline">
                          {{ $filters.howLongFormat(item.refresh_time) }} / {{ $filters.ymdFormatEvent(item.job_due_time)}}
                        </el-col>
                        <el-col :span="6">
                          <el-button class="da-action-btn"
                                     @click="viewAllApplicants(item.id,item.unread_id)"
                                     plain round>
                            VIEW APPLICANTS
                          </el-button>
                          <el-button plain round @click="editJob(item.id)">
                            EDIT
                          </el-button>
                        </el-col>

                      </el-row>

                      <div v-if="item.id == selectedJobId && selectedApplicantStatus">

                        <template v-for="(item,i) in sApplicantsData" :key="i">

                          <el-row :gutter="50"  class="da-item" >
                            <el-col :span="18">
                              <div class="da-item-basic">
                                <div class="da-item-basic-l">
                                  <el-avatar class="da-item-avatar-img"
                                             :src="item.user_contact.headimgurl ? item.user_contact.headimgurl : defaultAvatar ">
                                  </el-avatar>
                                </div>
                                <div class="da-item-basic-r">
                                  <div class="da-item-name">{{ item.user_contact.educator_contact.name }}</div>
                                  <div class="da-item-n">
                                    <div class="da-item-n-1">{{item.user_contact.educator_contact.job_title}}</div>
                                    <div class="da-item-n-1">{{item.user_contact.educator_contact.nationality}}</div>
                                    <div class="da-item-n-1" v-if="item.user_contact.educator_contact.Teaching_experience">
                                      <span v-for="(exp,i) in item.user_contact.educator_contact.Teaching_experience" :key="i">
                                        {{exp.object_en}}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </el-col>
                            <el-col :span="6">
                              <div class="dashboard-view-application">
                                <el-button class="dashboard-view-application-btn"
                                           plain round
                                           @click="viewApplicationEvent(item.id)">
                                  VIEW
                                </el-button>
                              </div>
                            </el-col>

                          </el-row>

                          <div class="da-item-expand" v-if="item.id == selectedApplicationId && expandStatus">
                            <div class="dashboard-work-exp">
                              <div class="dashboard-work-exp-label">
                                <span>Working experience</span>
                                <el-button class="dashboard-view-detail-btn" link>
                                  VIEW DETAILS
                                </el-button>
                              </div>
                              <div class="dashboard-work-exp-c">

                                <template  v-for="(work,i) in item.user_contact.educator_contact.work_info"
                                           :key="i">
                                  <div class="dashboard-work-exp-c-item"
                                      v-if="i<=2"
                                  >
                                    <div class="dashboard-work-exp-c-item-label">
                                      {{work.title}}
                                    </div>
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
                                          :key="i"
                                >
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

                            <div class="da-item-b">
                              <div class="da-item-b-l">

                              </div>
                              <div class="da-item-b-r">
                                <el-button class="da-item-b-l-btn-1" link round>
                                  REJECT
                                </el-button>
                                <el-button class="da-item-b-l-btn-1" round>
                                  ARCHIVE
                                </el-button>
                                <el-button class="da-item-b-l-btn-2" type="primary" round>
                                  INTERESTED
                                </el-button>
                              </div>
                            </div>

                          </div>

                        </template>


                      </div>


                    </div>

                  </div>

                </template>

                <template v-if="filterByApplicantStatus">
                  <div class="da-item-container-height">

                    <div  v-for="(item,i) in myApplicationsData" :key="i">
                      <el-row class="da-item"  >

                        <el-col :span="6">
                          <div class="da-item-basic">
                            <div class="da-item-basic-l-a">
                              <el-avatar class="da-item-avatar-img"
                                         :src="item.user_contact.headimgurl ? item.user_contact.headimgurl : defaultAvatar ">
                              </el-avatar>
                            </div>
                            <div class="da-item-basic-r">
                              <div class="da-item-name">{{ item.user_contact.educator_contact.name }}</div>
                              <div class="da-item-n">
                                <div class="da-item-n-1">{{item.user_contact.educator_contact.nationality}}</div>
                                <div class="da-item-n-1"
                                     v-if="item.user_contact.educator_contact.Teaching_experience">
                                  <span v-for="(exp,i) in item.user_contact.educator_contact.Teaching_experience"
                                        :key="i"
                                  >{{exp.object_en}}</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        </el-col>
                        <el-col :span="6">
                            <span class="da-item-a-job-title">{{item.job.job_title}}</span>
                        </el-col>
                        <el-col :span="6">
                          <div style="width: 100px;">
                            <el-progress :stroke-width="15" :percentage="item.match_meter" color="#9173FF" />
                          </div>

<!--                          {{item.match_meter}}-->
                        </el-col>
                        <el-col :span="6">
                          <div class="dashboard-view-application">
                            <el-button class="dashboard-view-application-btn"
                                       plain round
                                       @click="viewApplicationIdWithCompany(item.id)">
                              VIEW APPLICATION
                            </el-button>
                          </div>
                        </el-col>

                      </el-row>

                      <div class="da-item-expand" v-if="item.id == selectedApplicationIdWithCompany">
                        <div class="dashboard-work-exp">
                          <div class="dashboard-work-exp-label">
                            <span>Working experience</span>
                            <el-button class="dashboard-view-detail-btn" link>
                              VIEW DETAILS
                            </el-button>
                          </div>
                          <div class="dashboard-work-exp-c">

                            <template v-for="(work,i) in item.user_contact.educator_contact.work_info" :key="i">
                              <div class="dashboard-work-exp-c-item"
                                   v-if="i<=2"
                              >
                                <div class="dashboard-work-exp-c-item-label">
                                  {{work.title}}
                                </div>
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
                                      :key="i"
                            >
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

<!--                            <div class="dashboard-education-cer-c-item">-->
<!--                              <div class="dashboard-education-cer-c-label">-->
<!--                                Certificates and Diplomas-->
<!--                              </div>-->
<!--                              <div class="dashboard-education-cer-c-text">-->
<!--                                TOEFL,CELTA,Delta Module 1,Delta Module2,Delta Module 3-->
<!--                              </div>-->
<!--                            </div>-->

<!--                            <div class="dashboard-education-cer-c-item">-->
<!--                              <div class="dashboard-education-cer-c-label">-->
<!--                                Languages-->
<!--                              </div>-->
<!--                              <div class="dashboard-education-cer-c-text">-->
<!--                                English(native)-->
<!--                              </div>-->
<!--                              <div class="dashboard-education-cer-c-text">-->
<!--                                Korean(fluent)-->
<!--                              </div>-->
<!--                              <div class="dashboard-education-cer-c-text">-->
<!--                                Turkish(beginner)-->
<!--                              </div>-->
<!--                            </div>-->

                          </div>
                        </div>

                        <div class="da-item-b">
                          <div class="da-item-b-l">

                          </div>
                          <div class="da-item-b-r">
                            <el-button class="da-item-b-l-btn-1" link round>
                              REJECT
                            </el-button>
                            <el-button class="da-item-b-l-btn-1" round>
                              ARCHIVE
                            </el-button>
                            <el-button class="da-item-b-l-btn-2" type="primary" round>
                              INTERESTED
                            </el-button>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </template>


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
import meSideMenu from "@/components/meSideMenu";
import {
  ALL_JOB_RESUME,
  JOBS_APPLICATIONS,
  MY_JOBS, SET_READ,
  USER_UNREAD
} from '@/api/api';
import dashboardListsImg from '@/assets/dashboard/list.png'
import dashboardAdsImg from '@/assets/ads/2.png'
// import {onBeforeRouteUpdate} from "vue-router";
import {computed, ref} from "vue";
// import {encode} from "js-base64";
import {randomString} from "@/utils";

export default {
  name: "home",
  components: {
    meSideMenu
  },
  setup() {

    const i = ref(localStorage.getItem('identity'))

    const identity1 = computed(() => {
      return i.value
    })

    return {
      identity1
    }

  },
  computed: {
    isThirdCompanyStatus: {
      get() {
        return this.$store.state.isThirdCompanyStatus
      }
    },
    allIdentityChanged: {
      get() {
        return this.$store.state.allIdentityChanged
      }
    }

  },
  data() {
    return {
      expandStatus:false,
      dashboardListsImg,
      dashboardAdsImg,
      defaultAvatar,
      userInfo: {},
      basicUserInfo: {},

      userContact: {},

      companyInfo: {},

      identity: localStorage.getItem('identity'),

      anotherUserId: 0,
      selectedApplicantsData:[],
      versionTime:randomString(),
      selectedJobId:0,
      selectedApplicationId:0,
      selectedApplicantStatus:false,
      sApplicantsData:[],

      filterByJobStatus:true,
      filterByApplicantStatus:false,

      myJobsData:[],
      myJobPage:1,
      myJObLimit:5,

      myApplicationsData:[],
      myApplicationsPage:1,
      myApplicationsLimit:5,
      selectedApplicationIdWithCompany:0

    }


  },
  mounted() {
    // let uid = localStorage.getItem('uid')

    if(this.identity == 1){
      this.filterByApplicantStatus = true;
      this.filterByJobStatus = false;
    }

    if(this.filterByJobStatus){
      this.getMyJobs(this.myJobPage, this.myJObLimit)
    }

    if(this.filterByApplicantStatus){
      this.getAllJobResumeList(this.myApplicationsPage, this.myApplicationsLimit)
    }

  },
  methods: {
    viewApplicationIdWithCompany(id){
      this.selectedApplicationIdWithCompany = id
    },
    getAllJobResumeList(page, limit) {
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      ALL_JOB_RESUME(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.myApplicationsData = res.message.data
          // console.log(res.message.data)
          // this.totalNum = res.message.total
        }
      }).catch(err=>{
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    viewApplicationEvent(applicationId){
      this.expandStatus = !this.expandStatus
      this.selectedApplicationId = applicationId
    },
    editJob(jobId){
      this.$router.push({path:'/jobs/post',query:{job_id:jobId}})
    },
    viewAllApplicants(jobId,unreadId){
      this.selectedApplicantStatus = !this.selectedApplicantStatus;
      this.selectedJobId = jobId;

      if(this.selectedApplicantStatus){
        let data = {
          id:unreadId,
          identity:localStorage.getItem('identity'),
          status:1
        }

        SET_READ(data).then(res=>{
          console.log(res)
          if(res.code == 200){
            console.log('--------- set unread ----------- ')
          }else{
            console.log('set read:'+res.msg)
          }
        }).catch(err=>{
          console.log(err)
        })

        this.getJobResumes(jobId,1,100)
      }

    },
    postJob(){
      this.$router.push({path:'/jobs/post',query:{version_time:this.versionTime}})
    },
    getMyJobs(page,limit){
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      MY_JOBS(params).then(res=>{
        console.log(res)
        if (res.code == 200) {
          let jobData =  res.message.data

          this.jobTotalNum = res.message.total

          let unread_data = {
            identity: localStorage.getItem('identity'),
            token: localStorage.getItem('token')
          }

          USER_UNREAD(unread_data).then(res=>{
            if(res.code == 200){
              let unreadListData = res.message.list;
              jobData.forEach(item=>{
                // console.log(item)
                let a = unreadListData.filter(function(element){
                  return element.type == 1 && element.type_id == item.id
                })
                if(a.length>0){
                  item.unread_status = true;
                  item.unread_id = a[0].id;
                }else{
                  item.unread_status = false;
                }

              })
              this.myJobsData = jobData
              console.log(jobData)
            }else{
              console.log('unread:' + res.msg)
            }

          })

        }

      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getJobResumes(jobId,page,limit){
      let params = {
        page: page,
        limit: limit,
        job_id: jobId
      }
      JOBS_APPLICATIONS(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.sApplicantsData = res.message.data
          // console.log(res.message.data)
          // this.totalNum = res.message.total
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    filterByApplicants(){
      this.filterByJobStatus = false;
      this.filterByApplicantStatus = true;
      this.getAllJobResumeList(this.myApplicationsPage, this.myApplicationsLimit)
    },
    filterByJobs(){
      this.filterByJobStatus = true;
      this.filterByApplicantStatus = false;
      this.getMyJobs(this.myJobPage, this.myJObLimit)
    }


  }
}
</script>

<style scoped>
.bg {
  background-color: #F0F2F5;
}

.ja-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.ja-l-container{

}

.ja-r-container{
  width:calc(100% - 160px);
  height: calc(100vh - 140px);
}

.ja-r-container-bg{
  padding:30px 50px 50px 50px;
}

.da-container {

}

.dashboard-item-r a {
  text-decoration: none;
  color: #FFFFFF;
}


.xll-ads-container {
  padding: 20px 20px 0 20px;
}

.xll-ads-container-margin {
  margin-top: 20px;
  margin-bottom: 20px;
}

.xll-ads-swiper-item {
  cursor: pointer;
  border-radius: 10px;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.xll-ads-l {
  width: 60%;
  height: 100%;
}

.xll-ads-l-img {

  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.xll-ads-r {
  width: 36%;
}

.xll-ads-r {
  padding-right: 4%;
}

.xll-ads-r h4 {
  color: #004956;
}

.xll-ads-r h5 {
  margin-top: 20px;
}

.xll-ads-r-desc {
  font-size: 14px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}


.admin-container {
  padding: 20px;

}

.admin-container h3 {

}

.admin-content-container {
  background-color: #ffffff;
  padding: 20px 0;
  margin-top: 20px;
  border-radius: 20px;
  position: relative;
}

.admin-content-container h4 {
  margin-left: 20px;
}

.admin-content-underline {
  width: 60px;
  height: 4px;
  background-color: #DD4A68;
  margin-left: 20px;
}

.admin-list-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 0;
}

.admin-item-container {
  margin-left: 20px;
  margin-top: 20px;
  cursor: pointer;
}

.admin-item-img-container {
  width: 80px;
  height: 80px;
  border: 4px solid #004956;
  border-radius: 80px;
  overflow: hidden;
}

.admin-item-img {
  width: 100%;
}

.admin-item-name {
  text-align: center;
  font-weight: bold;
  line-height: 24px;
}

.admin-item-role {
  color: #00b3d2;
  line-height: 24px;
  text-align: center;
}

.add-admin {
  position: absolute;
  right: 40px;
  top: 20px;

}

.switch-account-tips {
  font-size: 16px;
  text-align: center;
}

.switch-account-container {
  padding: 10px;
}

.switch-account-item {
  font-size: 14px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  text-align: center;
}

.switch-account-item:hover {
  background-color: #0AA0A8;
  color: #FFFFFF;
}


.dashboard-1-container {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.dashboard-1 {
  background-color: #FFFFFF;
  padding: 20px;
  box-shadow: 0px 3px 23px 1px rgba(0, 0, 0, 0.07);
  border-radius: 18px;
  margin-right: 20px;
  margin-top: 20px;
}



.dashboard-1-bg-1 {
  box-shadow: 0px 3px 23px 1px rgba(102, 80, 179, 0.29);
  background: #E7DEFF;
}

.dashboard-1-label {
  font-size: 30px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #262626;

}

.dashboard-1-actions {
  margin-top: 20px;
}

.dashboard-1-action-btn {
  font-size: 20px;

}

.dashboard-1-number {
  font-weight: bold;
  font-size: 60px;
  font-family: BCBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #6650B3;

}

.dashboard-1-tips {
  font-size: 23px;
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;

}

.dashboard-post-a-job-btn {
  margin-left: 15px;
}


.da {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 15px;
  margin-top: 20px;

}

.da-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding:0 20px;
}

.da-t-l{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
}

.da-label {
  font-size: 30px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #262626;
}

.da-filter{
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin-left: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row;
}
.da-filter span{
  margin: 0 10px 0 10px;
}

.da-filter:hover{
  border-bottom: 1px solid #262626;
}

.da-t-r-btn{

}

.da-all-btn {
  font-size: 20px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #6650B3;
  margin-left: 10px;
}

.da-item-container {
  margin-top: 20px;
  padding:20px;
}

.da-item-container-height{
  height: 837px;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto
}

.da-item-container-height::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.da-item-container-height {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}

.da-item-t-item{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;

}

.da-da-item{
  padding: 20px 0;
  border-bottom:  2px solid #f0f2f5 ;
  position: relative;
}

.da-da-item-status-container{
  position: absolute;
  left: 0;
  top: 0;
}

.da-job-title{


  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.da-job-title-l{
  display: flex;
  align-items: center;
}

.da-job-title-r{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 25px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.da-total-applicants{
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.da-total-applicants span{
  margin-left: 4px;
}

.da-total-applicants-l-circle{
  width:10px;
  height: 10px;
  border-radius: 50%;
  background-color: #6648FF;
}


.da-posted-deadline{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
}

.da-action-btn{
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}

.da-da-item-item{
  flex:1;
  color:#262626;
}

.da-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  /*border-bottom: 2px solid #f0f2f5;*/
}


.da-item-basic {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
}

.da-item-basic-l {
  padding-left: 20px;
}

.da-item-basic-l-a{

}

.da-item-avatar-img {
  width: 70px;
  height: 70px;
  border-radius: 70px;
}


.da-item-basic-r {
  margin-left: 10px;
}

.da-item-name {
  font-size: 26px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.da-item-n {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;
}

.da-item-n-1 {
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
  margin-right: 10px;
}

.da-item-a-job-title{
  font-size: 26px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
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

.da-item-expand {
  padding: 20px;

}

.dashboard-work-exp {

}

.dashboard-work-exp-label {
  border-bottom: 2px solid #B3B3B3;
}

.dashboard-work-exp-label span{
  font-size: 26px;
  font-family: BarlowM, serif;
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
  margin-top:15px;
}

.dashboard-work-exp-c-item {
  flex: 1;
  padding-right: 40px;
}

.dashboard-work-exp-c-item-label {
  font-size: 23px;
  font-family: Assistant-SemiBold, serif;
  font-weight: 600;
  color: #262626;
}

.dashboard-work-exp-c-item-text {
  font-size: 23px;
  font-family: AssiRegular, serif;
  font-weight: 400;
  color: #262626;
}

.dashboard-education-cer {
  margin-top: 50px;
}

.dashboard-education-cer-label {
  font-size: 26px;
  font-family: BarlowM, serif;
  font-weight: 500;
  color: #262626;
}

.dashboard-education-cer-c {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.dashboard-education-cer-c-item {
  /*flex: 1;*/
  margin-top: 25px;
  padding-right: 40px;
}

.dashboard-education-cer-c-label {
  font-size: 23px;
  font-family: Assistant-SemiBold, serif;
  font-weight: 600;
  color: #262626;
}

.dashboard-education-cer-c-text {
  font-size: 23px;
  font-family: AssiRegular, serif;
  font-weight: 400;
  color: #262626;
}

.da-item-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top:50px;

}

.da-item-b-l {

}

.da-item-b-l-btn-1{
  font-size: 20px;
  font-weight: 500;
  color: #262626;
}

.da-item-b-l-btn-2{
  font-size: 20px;
  font-weight: 500;
  color: #FFFFFF;
}

.da-item-b-r {

}


</style>
