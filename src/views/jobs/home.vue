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
                    <span v-if="filterByJobStatus">Jobs</span>
                    <span v-if="filterByApplicantStatus">Applications</span>
                  </div>

                  <el-dropdown class="da-filter" v-if="identity == 2 || identity == 3 || identity == 4">
                      <span class="da-dropdown-span">
                         <el-icon style="margin-right: 4px;">
                           <IconSubwayFourBox/>
                         </el-icon>
                         View By:
                        <template v-if="filterByJobStatus">
                          Jobs
                        </template>
                        <template v-if="filterByApplicantStatus">
                          Applications
                        </template>
                         <el-icon style="margin-left: 2px;">
                           <ArrowDownBold/>
                         </el-icon>
                      </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item   @click="filterByJobs()">
                          <span class="da-dropdown-item-span">Jobs</span>
                        </el-dropdown-item>
                        <el-dropdown-item   @click="filterByApplicants()" >
                          <span class="da-dropdown-item-span">Applications</span>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>

                  <el-dropdown class="da-filter" v-if="filterByApplicantStatus">
                      <span class="da-dropdown-span">
                         <el-icon style="margin-right: 4px;">
                           <IconIcBaselineFilterList/>
                         </el-icon>
                         Filter By Status:
                        <template v-if="identity == 1">
                          <template v-if="statusValue==0">All</template>
                          <template v-if="statusValue==1">Submitted</template>
                          <template v-if="statusValue==2">Shortlisted</template>
                          <template v-if="statusValue==3">Not Selected</template>
                          <template v-if="statusValue==4">Accepted</template>
                        </template>
                        <template v-else>
                          <template v-if="statusValue==0">All</template>
                          <template v-if="statusValue==1">Submitted</template>
                          <template v-if="statusValue==2">Shortlisted</template>
                          <template v-if="statusValue==3">Not Interested</template>
                          <template v-if="statusValue==4">Interested</template>
                        </template>

                         <el-icon style="margin-left: 2px;">
                           <ArrowDownBold/>
                         </el-icon>
                      </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <template v-if="identity == 1">
                          <el-dropdown-item v-for="(item,i) in educatorStatusOptions" :key="i"
                                            @click="filterApplicantsByStatusWithEducator(item.id)">
                            <span class="da-dropdown-item-span">{{item.name}}</span>
                          </el-dropdown-item>
                        </template>
                        <template v-else>
                          <el-dropdown-item v-for="(item,i) in businessStatusOptions" :key="i"
                                            @click="filterApplicantsByStatusWithEducator(item.id)">
                            <span class="da-dropdown-item-span">{{item.name}}</span>
                          </el-dropdown-item>
                        </template>

                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>

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
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">
                    <span>Job title</span>
                  </el-col>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">
                    <span>Total applicants</span>
                  </el-col>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">
                    <span>Posted/Deadline</span>
                  </el-col>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">
                    <span>Action</span>
                  </el-col>
                </el-row>

                <el-row :gutter="0" v-if="filterByApplicantStatus">
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">
                    <span v-if="identity == 1">Job position</span>
                    <span v-else>Applicant</span>
                  </el-col>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">
                    <span v-if="identity == 1">Date applied</span>
                    <span v-else>Position applied for</span>
                  </el-col>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">
                    <span>Status</span>
                  </el-col>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="da-item-t-item">
                    <span>Action</span>
                  </el-col>
                </el-row>

                <template v-if="filterByJobStatus">
                  <template v-if="myJobsData.length > 0">
                    <div class="da-item-container-height">
                      <div v-for="(item,i) in myJobsData" :key="i">

                        <el-row :gutter="0" class="da-da-item">

                          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="da-job-title">

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
                                    <IconIcBaselinePendingActions/>
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
                                    <IconCiError/>
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
                                {{ item.job_title }}
                              </el-tooltip>
                            </div>
                          </el-col>

                          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="da-total-applicants">
                            <div class="da-total-applicants-l-circle" v-if="item.unread_status"></div>
                            <span>{{ item.resume_count }}</span>
                          </el-col>

                          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="da-posted-deadline">
                            <template v-if="item.refresh_time">
                              {{ $filters.howLongFormat(item.refresh_time) }}
                            </template>
                            <template v-else>-</template>
                            /
                            <template v-if="item.job_due_time">
<!--                              {{ $filters.ymdFormatEvent(item.job_due_time) }}-->
                              {{ $filters.ymdFormatEvent(item.apply_due_date) }}
                            </template>
                            <template v-else>
                              -
                            </template>

                          </el-col>
                          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="da-action-btn-container" >
                            <el-button class="da-action-btn"
                                       @click="viewAllApplicants(item.id,item.unread_id,item.unread_status)"
                                       plain round>
                              VIEW APPLICANTS
                            </el-button>
                            <el-button plain round @click="editJob(item.id)">
                              EDIT
                            </el-button>

                            <el-dropdown class="da-more-dropdown" :hide-on-click="false" trigger="click">
                              <el-button link type="primary">
                                <el-icon :size="20">
                                  <IconIcRoundMoreHoriz />
                                </el-icon>
                              </el-button>

                              <template #dropdown>
                                <el-dropdown-menu>
                                  <el-dropdown-item>
                                    <el-button link @click="viewUserProfile(item.company_id,item.user_id,item.identity)">
                                      VIEW PROFILE
                                    </el-button>
                                  </el-dropdown-item>
                                </el-dropdown-menu>
                              </template>
                            </el-dropdown>

                          </el-col>

                        </el-row>

                        <div v-if="item.id == selectedJobId">

                          <template v-for="(item,i) in sApplicantsData" :key="i">

                            <el-row :gutter="50" class="da-item-jobs">
                              <el-col :span="18">
                                <div class="da-item-basic">
                                  <div class="da-item-basic-l">
                                    <el-avatar class="da-item-avatar-img"
                                               v-if="item.user_contact"
                                               :src="item.user_contact.headimgurl ? item.user_contact.headimgurl : defaultAvatar ">
                                    </el-avatar>
                                  </div>
                                  <div class="da-item-basic-r">
                                    <div class="da-item-name" v-if="item.user_contact">
                                      {{ item.user_contact.educator_contact.name }}
                                    </div>
                                    <div class="da-item-n">
                                      <div class="da-item-n-1" v-if="item.user_contact">
                                        {{ item.user_contact.educator_contact.job_title }}
                                      </div>
                                      <div class="da-item-n-1" v-if="item.user_contact">
                                        {{ item.user_contact.educator_contact.nationality }}
                                      </div>
                                      <div class="da-item-n-1"
                                           v-if="item.user_contact.educator_contact.Teaching_experience">
                                      <span v-for="(exp,i) in item.user_contact.educator_contact.Teaching_experience"
                                            :key="i">
                                        {{ exp.object_en }}
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

                            <div class="da-item-expand" v-if="viewApplicantsChecked.indexOf(item.id) != -1">
                              <div class="dashboard-work-exp">
                                <div class="dashboard-work-exp-label">
                                  <span>Working experience</span>
                                  <el-button class="dashboard-view-detail-btn" link
                                             @click="viewEducatorDetail(item)">
                                    VIEW DETAILS
                                  </el-button>
                                </div>
                                <div class="dashboard-work-exp-c" v-if="item.user_contact">

                                  <template v-for="(work,i) in item.user_contact.educator_contact.work_info"
                                            :key="i">
                                    <div class="dashboard-work-exp-c-item"
                                         v-if="i<=2"
                                    >
                                      <div class="dashboard-work-exp-c-item-label">
                                        {{ work.title }}
                                      </div>
                                      <div class="dashboard-work-exp-c-item-text">
                                        {{ work.company_name }}, {{ work.location }}
                                      </div>
                                      <div class="dashboard-work-exp-c-item-text">
                                        {{ $filters.ymdFormatTimestamp(work.work_time_from) }} - {{
                                          $filters.ymdFormatTimestamp(work.work_time_to)
                                        }}
                                      </div>
                                    </div>
                                  </template>

                                  <div class="dashboard-work-exp-c-item">
                                    <!--                                  <div class="dashboard-work-exp-c-item-label">+2 more jobs</div>-->
                                  </div>


                                </div>
                              </div>

                              <div class="dashboard-education-cer">
                                <div class="dashboard-education-cer-label">
                                  Education & Certifications
                                </div>
                                <div class="dashboard-education-cer-c" v-if="item.user_contact">
                                  <template v-for="(education,i) in item.user_contact.educator_contact.education_info"
                                            :key="i"
                                  >
                                    <div class="dashboard-education-cer-c-item">
                                      <div class="dashboard-education-cer-c-label">
                                        {{ education.school_name }}
                                      </div>
                                      <div class="dashboard-education-cer-c-text">
                                        {{ education.degree }}
                                      </div>
                                      <div class="dashboard-education-cer-c-text">
                                        {{
                                          $filters.ymdFormatTimestamp(education.start_time)
                                        }}-{{ $filters.ymdFormatTimestamp(education.end_time) }}
                                      </div>
                                    </div>
                                  </template>

                                  <div class="dashboard-education-cer-c-item" v-if="item.user_contact.educator_contact.certification">
                                    <div class="dashboard-education-cer-c-label">
                                      Certificates and Diplomas
                                    </div>
                                    <div class="dashboard-education-cer-c-text">
                                      {{ $filters.userObjectFormat(item.user_contact.educator_contact.certification) }}
                                    </div>
                                  </div>

                                  <div class="dashboard-education-cer-c-item" v-if="item.user_contact.educator_contact.languages">
                                    <div class="dashboard-education-cer-c-label">
                                      Languages
                                    </div>
                                    <div class="dashboard-education-cer-c-text"
                                         v-for="(language,i) in item.user_contact.educator_contact.languages"
                                         :key="i"
                                    >
                                      {{ language.object_en }}
                                      <span v-if="language.object_score == 1">(Native)</span>
                                      <span v-if="language.object_score == 2">(Fluent)</span>
                                      <span v-if="language.object_score == 3">(Conversational)</span>
                                      <span v-if="language.object_score == 4">(Beginner)</span>
                                    </div>

                                  </div>

                                </div>
                              </div>

                              <div class="da-item-b">
                                <div class="da-item-b-l">

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
                                <div class="da-item-b-r">
                                  <el-button class="da-item-b-l-btn-1" link round
                                             :disabled="item.status == 3"
                                             @click="showApplyJobStatusDialog(item,3, i)"
                                  >
                                    NOT INTERESTED
                                  </el-button>
                                  <!--                                <el-button class="da-item-b-l-btn-1" round>-->
                                  <!--                                  ARCHIVE-->
                                  <!--                                </el-button>-->
                                  <el-button class="da-item-b-l-btn-2" type="primary" round
                                             :disabled="item.status == 4"
                                             @click="showApplyJobStatusDialog(item,4, i)"
                                  >
                                    INTERESTED
                                  </el-button>
                                </div>
                              </div>

                            </div>

                          </template>


                        </div>


                      </div>

                    </div>
                    <div class="xll-pagination-container">
                      <el-pagination layout="prev, pager, next"
                                     :default-current-page="myJobPage"
                                     @size-change="myJobPageSizeChange"
                                     @current-change="myJobPageChange"
                                     :current-page="myJobPage"
                                     :page-size="myJobLimit"
                                     :total="myJobTotalNum">
                      </el-pagination>
                    </div>

                  </template>
                  <template v-else>
                    <el-empty description="-"></el-empty>
                  </template>

                </template>

                <template v-if="filterByApplicantStatus">

                  <template v-if="myApplicationsData.length>0">
                    <div class="da-item-container-height">

                      <div v-for="(item,i) in myApplicationsData" :key="i">
                        <el-row class="da-item">

                          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" >
                            <div class="da-item-basic">
                              <div class="da-item-basic-l-a">

                                <template v-if="identity == 1">
                                  <el-avatar class="da-item-avatar-img"
                                             :src="item.job && item.job.company && item.job.company.logo ? item.job.company.logo : defaultAvatar ">
                                  </el-avatar>
                                </template>
                                <template v-else>
                                  <el-avatar class="da-item-avatar-img"
                                             :src="item.user_contact && item.user_contact.headimgurl ? item.user_contact.headimgurl : defaultAvatar ">
                                  </el-avatar>
                                </template>

                              </div>
                              <template v-if="identity == 1">
                                <div class="da-item-basic-r">
                                  <div class="da-item-company-name" v-if="item.job">
                                    {{ item.job.company_name }}
                                  </div>
                                  <div class="da-item-job-title" v-if="item.job">
                                    {{item.job.job_title}}
                                  </div>
                                  <div class="da-item-n-educator">
                                    <div class="da-item-n-1" v-if="item.job">
                                      {{ item.job.currency }} {{ item.job.salary_min }} - {{ item.job.salary_max }}
                                      <span v-if="item.job.payment_period == 112">hourly</span>
                                      <span v-if="item.job.payment_period == 113">daily</span>
                                      <span v-if="item.job.payment_period == 114">weekly</span>
                                      <span v-if="item.job.payment_period == 115">monthly</span>
                                      <span v-if="item.job.payment_period == 116">annually</span>
                                    </div>
                                    <div class="da-item-n-1" v-if="item.job">
                                      <span>{{item.job.job_location}}</span>
                                    </div>
                                    <div class="da-item-n-1" v-if="item.job">
                                      <span v-if="item.job.employment_type==1">Full time</span>
                                      <span v-if="item.job.employment_type==2">Part time</span>
                                      <span v-if="item.job.employment_type==3">Seasonal</span>
                                    </div>

                                  </div>
                                </div>

                              </template>
                              <template v-else>
                                <div class="da-item-basic-r">
                                  <div class="da-item-name" v-if="item.user_contact">
                                    {{ item.user_contact.educator_contact.name }}
                                  </div>
                                  <div class="da-item-n">
                                    <div class="da-item-n-1" v-if="item.user_contact">
                                      {{ item.user_contact.educator_contact.nationality }}
                                    </div>
                                    <div class="da-item-n-1"
                                         v-if="item.user_contact.educator_contact.Teaching_experience">
                                  <span v-for="(exp,i) in item.user_contact.educator_contact.Teaching_experience"
                                        :key="i"
                                  >{{ exp.object_en }}</span>
                                    </div>
                                  </div>
                                </div>

                              </template>

                            </div>
                          </el-col>
                          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="da-item-a-job-title-col" >
                            <template v-if="identity == 1">
                            <span class="da-item-a-job-title">
                            {{ $filters.howLongFormat(item.c_time) }}
                            </span>
                            </template>
                            <template v-else>
                            <span class="da-item-a-job-title" v-if="item.job">
                            {{ item.job.job_title }}
                            </span>
                            </template>

                          </el-col>

                          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" >

                            <template v-if="identity == 1">

                              <div class="xll-status-tag-container">
                                <div class="xll-status-tag xll-status-tag-no-fill xll-status-tag-1" v-if="item.status == 1">
                                  <span>Submitted</span>
                                </div>
                              </div>

                              <div class="xll-status-tag-container">
                                <div class="xll-status-tag xll-status-tag-fill xll-status-tag-2" v-if="item.status == 2">
                                  <span>Shortlisted</span>
                                </div>
                              </div>

                              <div class="xll-status-tag-container">
                                <div class="xll-status-tag xll-status-tag-fill xll-status-tag-3" v-if="item.status == 3">
                                  <span>Not Selected</span>
                                </div>
                              </div>

                              <div class="xll-status-tag-container">
                                <div class="xll-status-tag xll-status-tag-fill xll-status-tag-4" v-if="item.status == 4">
                                  <span>Accepted</span>
                                </div>
                              </div>

                            </template>

                            <template v-if="identity == 2 || identity == 3 || identity == 4">

                              <div style="width: 100px;" >
                                <el-progress :stroke-width="15" :percentage="item.match_meter" color="#9173FF"/>
                              </div>
                              <div style="margin-top: 10px;">
                                <div class="xll-status-tag-container">
                                  <div class="xll-status-tag xll-status-tag-no-fill xll-status-tag-1" v-if="item.status == 1">
                                    <span>Submitted</span>
                                  </div>
                                </div>
                                <div class="xll-status-tag-container">
                                  <div class="xll-status-tag xll-status-tag-fill xll-status-tag-2" v-if="item.status == 2">
                                    <span>Shortlisted</span>
                                  </div>
                                </div>
                                <div class="xll-status-tag-container">
                                  <div class="xll-status-tag xll-status-tag-fill xll-status-tag-3" v-if="item.status == 3">
                                    <span>Not interested</span>
                                  </div>
                                </div>
                                <div class="xll-status-tag-container">
                                  <div class="xll-status-tag xll-status-tag-fill xll-status-tag-4" v-if="item.status == 4">
                                    <span>Interested</span>
                                  </div>
                                </div>

                              </div>

                            </template>

                            <!--                          {{item.match_meter}}-->
                          </el-col>

                          <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" >
                            <div class="dashboard-view-application">

                              <template v-if="identity == 1 && item.job && item.job.company">
                                <chatButton text="SEND A MESSAGE"
                                            :target-user="item.job.company"
                                            @onSuccess="chatSuccess"
                                            btn-style="primary"
                                            :identity="item.job.identity">

                                </chatButton>
                              </template>
                              <template v-if="identity == 2 || identity == 3 || identity == 4">
                                <el-button class="dashboard-view-application-btn"
                                           plain round
                                           @click="viewApplicationIdWithCompany(item.id)">
                                  VIEW APPLICATION
                                </el-button>
                                <template v-if="item.user_contact.educator_contact">
                                  <chatButton text="SEND A MESSAGE"
                                              :target-user="item.user_contact.educator_contact"
                                              @onSuccess="chatSuccess"
                                              btn-style="primary"
                                              :identity="1">

                                  </chatButton>
                                </template>

                              </template>

                            </div>
                          </el-col>

                        </el-row>

                        <div class="da-item-expand" v-if="item.id == selectedApplicationIdWithCompany">
                          <div class="dashboard-work-exp">
                            <div class="dashboard-work-exp-label">
                              <span>Working experience</span>
                              <el-button class="dashboard-view-detail-btn" link
                                         @click="viewEducatorDetail(item)">
                                VIEW DETAILS
                              </el-button>
                            </div>
                            <div class="dashboard-work-exp-c" v-if="item.user_contact">

                              <template v-for="(work,i) in item.user_contact.educator_contact.work_info" :key="i">
                                <div class="dashboard-work-exp-c-item"
                                     v-if="i<=2"
                                >
                                  <div class="dashboard-work-exp-c-item-label">
                                    {{ work.title }}
                                  </div>
                                  <div class="dashboard-work-exp-c-item-text">
                                    {{ work.company_name }}, {{ work.location }}
                                  </div>
                                  <div class="dashboard-work-exp-c-item-text">
                                    {{ $filters.ymdFormatTimestamp(work.work_time_from) }} - {{
                                      $filters.ymdFormatTimestamp(work.work_time_to)
                                    }}
                                  </div>
                                </div>
                              </template>

                              <div class="dashboard-work-exp-c-item">
                                <!--                              <div class="dashboard-work-exp-c-item-label">+2 more jobs</div>-->
                              </div>


                            </div>
                          </div>

                          <div class="dashboard-education-cer">
                            <div class="dashboard-education-cer-label">
                              Education & Certifications
                            </div>
                            <div class="dashboard-education-cer-c" v-if="item.user_contact">

                              <template v-for="(education,i) in item.user_contact.educator_contact.education_info"
                                        :key="i"
                              >
                                <div class="dashboard-education-cer-c-item">
                                  <div class="dashboard-education-cer-c-label">
                                    {{ education.school_name }}
                                  </div>
                                  <div class="dashboard-education-cer-c-text">
                                    {{ education.degree }}
                                  </div>
                                  <div class="dashboard-education-cer-c-text">
                                    {{
                                      $filters.ymdFormatTimestamp(education.start_time)
                                    }}-{{ $filters.ymdFormatTimestamp(education.end_time) }}
                                  </div>
                                </div>
                              </template>

                              <div class="dashboard-education-cer-c-item" v-if="item.user_contact.educator_contact.certification">
                                <div class="dashboard-education-cer-c-label">
                                  Certificates and Diplomas
                                </div>
                                <div class="dashboard-education-cer-c-text">
                                  {{ $filters.userObjectFormat(item.user_contact.educator_contact.certification) }}
                                </div>
                              </div>

                              <div class="dashboard-education-cer-c-item" v-if="item.user_contact.educator_contact.languages">
                                <div class="dashboard-education-cer-c-label">
                                  Languages
                                </div>
                                <div class="dashboard-education-cer-c-text"
                                     v-for="(language,i) in item.user_contact.educator_contact.languages"
                                     :key="i"
                                >
                                  {{ language.object_en }}
                                  <span v-if="language.object_score == 1">(Native)</span>
                                  <span v-if="language.object_score == 2">(Fluent)</span>
                                  <span v-if="language.object_score == 3">(Conversational)</span>
                                  <span v-if="language.object_score == 4">(Beginner)</span>
                                </div>

                              </div>

                            </div>
                          </div>

                          <div class="da-item-b">
                            <div class="da-item-b-l">
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
                            <div class="da-item-b-r">
                              <el-button class="da-item-b-l-btn-1" link round
                                         :disabled="item.status == 3"
                                         @click="showApplyJobStatusDialog(item,3,i)"
                              >
                                NOT INTERESTED
                              </el-button>
                              <!--                            <el-button class="da-item-b-l-btn-1" round>-->
                              <!--                              ARCHIVE-->
                              <!--                            </el-button>-->
                              <el-button class="da-item-b-l-btn-2" type="primary" round
                                         :disabled="item.status == 4"
                                         @click="showApplyJobStatusDialog(item,4,i)"
                              >
                                INTERESTED
                              </el-button>

                            </div>
                          </div>

                        </div>

                      </div>

                    </div>
                    <div class="xll-pagination-container">
                      <el-pagination layout="prev, pager, next"
                                     :default-current-page="myApplicationsPage"
                                     @size-change="myApplicationsPageSizeChange"
                                     @current-change="myApplicationsPageChange"
                                     :current-page="myApplicationsPage"
                                     :page-size="myApplicationsLimit"
                                     :total="myApplicationsTotalNum">
                      </el-pagination>
                    </div>

                  </template>
                  <template v-else>
                    <el-empty description="-"></el-empty>
                  </template>


                </template>


              </div>

            </div>

          </div>

        </div>

      </el-scrollbar>

      <jobApplyStatusPopup :visible="applyJobStatusVisible"
                           :status="applyJobStatusValue"
                           @update="updateApplyJobStatus"
                           :info="companyInfo"
                           @close="applyJobStatusVisible = false"
                           @updateAndChat="updateApplyJobAndChat"
      >

      </jobApplyStatusPopup>

    </div>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default/avatar.png'
import meSideMenu from "@/components/meSideMenu";
import {
  ALL_JOB_RESUME,
  JOBS_APPLICATIONS, MY_APPLY_JOBS,
  MY_JOBS, SET_APPLY_JOB_STATUS, SET_READ,
  USER_UNREAD
} from '@/api/api';
import dashboardListsImg from '@/assets/dashboard/list.png'
import dashboardAdsImg from '@/assets/ads/2.png'
// import {onBeforeRouteUpdate} from "vue-router";
import {computed, ref} from "vue";
// import {encode} from "js-base64";
import {randomString} from "@/utils";
import {encode} from 'js-base64';
import jobApplyStatusPopup from "@/components/status/jobApplyStatusPopup";
import chatButton from "@/components/chat/chatButton";
import { useRouter } from 'vue-router';
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "home",
  components: {
    meSideMenu,
    jobApplyStatusPopup,
    chatButton
  },
  setup() {

    const i = ref(localStorage.getItem('identity'))

    const identity1 = computed(() => {
      return i.value
    })
    const router = useRouter()

    function turnChatPage(){
      router.push({path:'/chat/messages'})
    }


    return {
      identity1,
      turnChatPage
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
      viewJobApplicantsChecked:[],
      viewApplicantsChecked:[],

      expandStatus: false,
      dashboardListsImg,
      dashboardAdsImg,
      defaultAvatar,
      userInfo: {},
      basicUserInfo: {},

      userContact: {},

      companyInfo: {},

      identity: localStorage.getItem('identity'),

      anotherUserId: 0,
      selectedApplicantsData: [],
      versionTime: randomString(),
      selectedJobId: 0,
      selectedApplicationId: 0,
      selectedApplicantStatus: false,
      sApplicantsData: [],

      filterByJobStatus: true,
      filterByApplicantStatus: false,

      myJobsData: [],
      myJobPage: 1,
      myJobLimit: 10,
      myJobTotalNum: 0,

      myApplicationsData: [],
      myApplicationsPage: 1,
      myApplicationsLimit: 10,
      myApplicationsTotalNum: 0,

      selectedApplicationIdWithCompany: 0,

      applyJobStatusValue: 0,
      applyJobStatusVisible:false,
      applyJobStatusId: 0,
      applyJobAlwaysValue:false,

      statusValue:0,
      educatorStatusOptions:[
        {
          name:'All',
          id:0
        },
        {
          name:'Submitted',
          id:1
        },
        {
          name:'Shortlisted',
          id:2
        },
        {
          name:'Not Selected',
          id:3
        },
        {
          name:'Accepted',
          id:4
        }
      ],
      businessStatusOptions:[
        {
          name:'All',
          id:0
        },
        {
          name:'Submitted',
          id:1
        },
        {
          name:'Shortlisted',
          id:2
        },
        {
          name:'Not Interested',
          id:3
        },
        {
          name:'Interested',
          id:4
        }
      ]

    }


  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  mounted() {

    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      updateWindowHeight()
    }

    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        updateWindowHeight()
      }
    }

    // let uid = localStorage.getItem('uid')
    let currentIdentity = this.identity

    if (currentIdentity == 1) {
      this.filterByApplicantStatus = true;
      this.filterByJobStatus = false;
      this.getMyApplyJobs(this.myApplicationsPage,this.myApplicationsLimit);
    }

    if(currentIdentity == 2 || currentIdentity == 3 || currentIdentity == 4){
      if (this.filterByJobStatus) {
        this.getMyJobs(this.myJobPage, this.myJobLimit)
      }

      if (this.filterByApplicantStatus) {
        this.getAllJobResumeList(this.myApplicationsPage, this.myApplicationsLimit)
      }

    }

  },
  methods: {
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

    },
    viewApplicationIdWithCompany(id) {
      this.selectedApplicationIdWithCompany = id
    },
    getAllJobResumeList(page, limit) {
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      if(this.statusValue){
        params.status = this.statusValue
      }

      ALL_JOB_RESUME(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.myApplicationsData = res.message.data
          // console.log(res.message.data)
          this.myApplicationsTotalNum = res.message.total
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
    getMyApplyJobs(page,limit){
      let params = {
        page:page,
        limit:limit
      }

      if(this.statusValue){
        params.status = this.statusValue
      }

      MY_APPLY_JOBS(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.myApplicationsData = res.message.data
          // console.log(res.message.data)
          this.myApplicationsTotalNum = res.message.total
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    viewApplicationEvent(applicationId) {
      let index = this.viewApplicantsChecked.indexOf(applicationId)
      if(index == -1){
        this.viewApplicantsChecked.push(applicationId)
      }else{
        this.viewApplicantsChecked.splice(index,1)
      }

      // this.selectedApplicationId = applicationId

      // this.expandStatus = !this.expandStatus

    },
    editJob(jobId) {
      this.$router.push({path: '/jobs/post', query: {job_id: jobId}})
    },
    viewAllApplicants(jobId, unreadId, unreadStatus) {

      this.selectedJobId = jobId;

      this.sApplicantsData = [];

      if(unreadStatus){
        let data = {
          id: unreadId,
          identity: localStorage.getItem('identity'),
          status: 1
        }

        SET_READ(data).then(res => {
          console.log(res)
          if (res.code == 200) {
            console.log('--------- set unread ----------- ')
          } else {
            console.log('set read:' + res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }

      this.getJobResumes(jobId, 1, 100)

    },
    postJob() {
      this.$router.push({path: '/jobs/post', query: {version_time: this.versionTime}})
    },
    getMyJobs(page, limit) {
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      MY_JOBS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          let jobData = res.message.data

          this.myJobTotalNum = res.message.total

          let unread_data = {
            identity: localStorage.getItem('identity'),
            token: localStorage.getItem('token')
          }

          USER_UNREAD(unread_data).then(res => {
            if (res.code == 200) {
              let unreadListData = res.message.list;
              jobData.forEach(item => {
                // console.log(item)
                let a = unreadListData.filter(function (element) {
                  return element.type == 1 && element.type_id == item.id
                })
                if (a.length > 0) {
                  item.unread_status = true;
                  item.unread_id = a[0].id;
                } else {
                  item.unread_status = false;
                }

              })
              this.myJobsData = jobData
              console.log(jobData)
            } else {
              console.log('unread:' + res.msg)
            }

          })

        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getJobResumes(jobId, page, limit) {
      let params = {
        page: page,
        limit: limit,
        job_id: jobId
      }
      JOBS_APPLICATIONS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.sApplicantsData = res.message.data
          // console.log(res.message.data)
          // this.totalNum = res.message.total
        }
      }).catch(err => {
        console.log(err)
      })
    },
    filterApplicantsByStatusWithEducator(value){
      this.statusValue = value

      let currentIdentity = this.identity
      this.filterByJobStatus = false;
      this.filterByApplicantStatus = true;

      if (currentIdentity == 1) {
        this.getMyApplyJobs(this.myApplicationsPage,this.myApplicationsLimit);
      }

      if(currentIdentity == 2 || currentIdentity == 3 || currentIdentity == 4){
        this.getAllJobResumeList(this.myApplicationsPage, this.myApplicationsLimit)
      }

    },
    filterByApplicants() {

      let currentIdentity = this.identity
      this.filterByJobStatus = false;
      this.filterByApplicantStatus = true;

      if (currentIdentity == 1) {
        this.getMyApplyJobs(this.myApplicationsPage,this.myApplicationsLimit);
      }

      if(currentIdentity == 2 || currentIdentity == 3 || currentIdentity == 4){
        this.getAllJobResumeList(this.myApplicationsPage, this.myApplicationsLimit)
      }

      // this.filterByJobStatus = false;
      // this.filterByApplicantStatus = true;
      // this.getAllJobResumeList(this.myApplicationsPage, this.myApplicationsLimit)
    },
    filterByJobs() {
      this.filterByJobStatus = true;
      this.filterByApplicantStatus = false;
      this.getMyJobs(this.myJobPage, this.myJobLimit)
    },
    myJobPageSizeChange(e) {
      console.log(e)
    },
    myJobPageChange(e) {
      console.log(e)
      this.myJobPage = e
      this.getMyJobs(e, this.myJobLimit)
      // console.log(e)
      // document.documentElement.scrollTop = 120
    },
    myApplicationsPageSizeChange(e) {
      console.log(e)
    },
    myApplicationsPageChange(e) {
      console.log(e)
      this.myApplicationsPage = e

      if(this.identity == 1){
        this.getMyApplyJobs(e, this.myApplicationsLimit)
      }
      if(this.identity == 2 || this.identity == 3 || this.identity == 4){
        this.getAllJobResumeList(e, this.myApplicationsLimit)
      }

      // console.log(e)
      // document.documentElement.scrollTop = 120
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

          if(this.filterByJobStatus){
            this.sApplicantsData[index]['status'] = value
          }

          if(this.filterByApplicantStatus){
            this.myApplicationsData[index]['status'] = value
          }

          if(type === 3){
            this.turnChatPage()
          }


        }
      }).catch(err=>{
        console.log(err)
      })

    },
    showApplyJobStatusDialog(item,value,index){
      console.log(item)
      this.companyInfo = item.user_contact.educator_contact;

      let alwaysValue = localStorage.getItem('statusDialogAlways')
      if(alwaysValue){
        this.setApplyJobStatus(item.id, value, index,2)
        return;
      }

      this.applyJobStatusIndex = index
      this.applyJobStatusId = item.id;
      this.applyJobStatusValue = value;
      this.applyJobStatusVisible = true;

    },
    updateApplyJobStatus(alwaysValue){
      this.applyJobAlwaysValue = alwaysValue
      this.setApplyJobStatus(this.applyJobStatusId, this.applyJobStatusValue, this.applyJobStatusIndex,1)

    },
    updateApplyJobAndChat(alwaysValue){
      this.applyJobAlwaysValue = alwaysValue
      this.setApplyJobStatus(this.applyJobStatusId, this.applyJobStatusValue, this.applyJobStatusIndex,3)
    },
    chatSuccess(){
      this.turnChatPage()
    },
    viewUserProfile(companyId, userId, roleValue) {
      if (roleValue == 1) {
        let obj = {
          cid: companyId,
          uid: userId,
          identity: 1
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path: '/educator/profile', query: {str: str}})
      }
      if (roleValue == 2) {
        let obj = {
          cid: companyId,
          uid: userId,
          identity: 2
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path: '/business/profile', query: {str: str}})
      }
      if (roleValue == 3) {
        let obj = {
          cid: companyId,
          uid: userId,
          identity: 3
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path: '/business/profile', query: {str: str}})
      }
      if (roleValue == 4) {
        let obj = {
          cid: companyId,
          uid: userId,
          identity: 4
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path: '/business/profile', query: {str: str}})
      }
      if (roleValue == 5) {
        let obj = {
          cid: companyId,
          uid: userId,
          identity: 5
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path: '/vendor/profile', query: {str: str}})
      }
    }


  }
}

</script>

<style scoped>
.da-more-dropdown{
  margin-left: 25px;
}

.bg {
  background-color: #F0F2F5;
}

.ja-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.ja-l-container {

}

.ja-r-container {
  width: calc(100% - 160px);
  height: calc(100vh - 140px);
}

.ja-r-container-bg {
  padding: 30px 50px 50px 50px;
}

.da-container {

}

.dashboard-item-r a {
  text-decoration: none;
  color: #FFFFFF;
}

.da {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 15px;
  margin-top: 20px;

}

.da-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.da-t-l {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
}

.da-label span{
  font-size: 30px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #262626;
}

.da-filter {
   margin-left: 45px;
}

.da-dropdown-span{
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  cursor: pointer;

  display: flex;
  align-items: center;

}

.da-dropdown-item-span{
  font-size: 14px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.da-t-r-btn {

}

.da-all-btn {
  font-size: 20px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #6650B3;
  margin-left: 10px;
}

.da-item-container {
  margin-top: 20px;
  padding: 20px;
}

.da-item-container-height {
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

.da-item-t-item {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;

}

.da-da-item {
  padding: 20px 0;
  border-bottom: 2px solid #f0f2f5;
  position: relative;
}

.da-da-item-status-container {
  position: absolute;
  left: 0;
  top: 0;
}

.da-job-title {


  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.da-job-title-l {
  display: flex;
  align-items: center;
}

.da-job-title-r {
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 25px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.da-total-applicants {
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.da-total-applicants span {
  margin-left: 4px;
}

.da-total-applicants-l-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #6648FF;
}


.da-posted-deadline {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
}

.da-action-btn {
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}

.da-da-item-item {
  flex: 1;
  color: #262626;
}
.da-item-jobs{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}

.da-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 0;

}

.da-item-basic {
  flex: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
}

.da-item-basic-l {
  padding-left: 20px;
}

.da-item-basic-l-a {

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
  font-size: 24px;
  font-family: "Cabin Medium", "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}
.da-item-company-name{
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}
.da-item-job-title{
  font-size: 24px;
  font-family: "Cabin Medium", "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.da-item-n {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;
}
.da-item-n-educator{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 15px;
}

.da-item-n-1 {
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
  margin-right: 10px;
}

.da-item-a-job-title {
  font-size: 24px;
  font-family: "Cabin Medium", "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
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

.dashboard-work-exp-label span {
  font-size: 26px;
  font-family: BarlowM, serif;
  font-weight: 500;
  color: #262626;
}

.dashboard-view-detail-btn {
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
  margin-top: 15px;
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
  margin-top: 50px;

}

.da-item-b-l {

}

.da-item-b-l-btn-1 {
  font-size: 20px;
  font-weight: 500;
  color: #262626;
}

.da-item-b-l-btn-2 {
  font-size: 20px;
  font-weight: 500;
  color: #FFFFFF;
}

.da-item-b-r {

}

.xll-pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid #eeeeee;
}
.xll-status-tag-container{
  display: flex;
  overflow: hidden;
}
.xll-status-tag{
  width:auto;
  height: 40px;
  line-height: 40px;
  padding: 0 35px 0 15px;

  font-size:20px;
  font-family: BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  position: relative;

}

.xll-status-tag-no-fill:before{
  content: '';
  width:40px;
  height: 20px;
  transform: rotate(60deg);
  background-color: #FFFFFF;
  border-bottom: 1px solid #262626;
  position: absolute;
  right: -20px;
  top: -13px;
}

.xll-status-tag-no-fill:after{
  content: '';
  width: 40px;
  height: 20px;
  transform: rotate(-60deg);
  background-color: #ffffff;
  position: absolute;
  right: -20px;
  bottom: -13px;
  border-top: 1px solid #262626;
}

.xll-status-tag-fill:before{
  content: '';
  width:40px;
  height: 20px;
  transform: rotate(60deg);
  background-color: #ffffff;
  position: absolute;
  right: -20px;
  top: -10px;
}

.xll-status-tag-fill:after{
  content: '';
  width: 40px;
  height: 20px;
  transform: rotate(-60deg);
  background-color: #ffffff;
  position: absolute;
  right: -20px;
  bottom: -10px;
}

.xll-status-tag-1{
  border: 1px solid #262626;
}
.xll-status-tag-2{
  background-color: #B3B3B3;
}
.xll-status-tag-3{
  color: #FFFFFF;
  background-color: #42B0B8;
}
.xll-status-tag-4{
  color: #FFFFFF;
  background-color: #6650B3;
}



@media screen and (max-width: 768px){

  .xll-status-tag{
    font-size: 14px;
    height: 28px;
    line-height: 28px;
  }

  .xll-status-tag-no-fill:before{
    content: '';
    width:40px;
    height: 20px;
    transform: rotate(60deg);
    background-color: #FFFFFF;
    border-bottom: 1px solid #262626;
    position: absolute;
    right: -20px;
    top: -18px;
  }

  .xll-status-tag-no-fill:after{
    content: '';
    width: 40px;
    height: 20px;
    transform: rotate(-60deg);
    background-color: #ffffff;
    position: absolute;
    right: -20px;
    bottom: -18px;
    border-top: 1px solid #262626;
  }

  .ja-r-container{
    width: 100%;
    height: calc( var(--i-window-height) - 160px);

  }

  .ja-r-container-bg{
    padding: 0;

  }

  .da{
    background-color: #F0F2F5;
    padding: 0;
    margin-top: 0;
    border-radius: 0;
  }

  .da-t{
    padding: 15px;
    height: 30px;
  }

  .da-label span{
    font-size: 18px;

  }
  .da-filter{
    margin-left: 15px;
  }

  .da-item-container{
    margin-top: 0;
    padding: 0;
  }

  .da-item-container-height{
    height: auto;
  }

  .da-item-b{
    flex-direction: column;
  }

  .da-item-b-l{

  }
  .da-item-b-r{
    margin-top: 10px;
  }

  .da-da-item{
    padding: 15px;
    margin: 15px;
    background-color: #FFFFFF;
    border-radius: 18px;
  }

  .da-job-title-r{
    font-size: 18px;
  }

  .da-total-applicants{
    margin-top: 15px;
    font-size: 12px;
  }

  .da-posted-deadline{
    margin-top: 15px;
    font-size: 12px;
  }

  .da-action-btn-container{
    margin-top: 15px;
    text-align: right;
  }

  .da-action-btn{
    font-size: 12px;
  }

  .da-item-jobs{
    padding: 15px;
    border-bottom:1px solid #F0F2F5;
    background-color: #FFFFFF;
  }

  .da-item{
    padding: 15px;
    border-bottom:1px solid #F0F2F5;
    background-color: #FFFFFF;
    margin: 15px;
    border-radius: 18px;
  }

  .da-item-avatar-img{
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }

  .da-item-name{
    font-size: 18px;
  }
  .da-item-n{
    margin-top: 10px;
  }

  .da-item-company-name{
    font-size: 12px;
  }

  .da-item-job-title{
    font-size: 16px;
  }

  .da-item-n-1{
    font-size: 12px;
  }

  .dashboard-view-application{

  }
  .dashboard-view-application-btn{
    margin-right: 15px;
    font-size: 12px;
  }

  .da-item-expand{
    padding: 15px;
  }

  .dashboard-work-exp-label span{
    font-size: 14px;
  }
  .dashboard-view-detail-btn{
    font-size: 12px;
  }

  .dashboard-work-exp-c{
    flex-direction: column;

  }
  .dashboard-work-exp-c-item{
    width: 100%;
    padding-right: 0;
    flex: auto;

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
    font-size: 14px;
  }

  .dashboard-education-cer-c{
    flex-direction: column;
  }

  .dashboard-education-cer-c-item{
    padding-right: 0;
    margin-top: 15px;
  }
  .dashboard-education-cer-c-label{
    font-size: 14px;
  }

  .dashboard-education-cer-c-text{
    font-size: 12px;
  }

  .da-item-b-l-btn-1{
    font-size: 12px;
  }
  .da-item-b-l-btn-2{
    font-size: 12px;
  }


  .da-item-basic{
    flex: auto;
    width: 100%;
  }

  .da-item-a-job-title{
    font-size: 14px;
  }

  .da-item-a-job-title-col{
    margin: 15px 0;
  }
  .dashboard-view-application{
    display: flex;
    flex-direction: column;

  }
  .dashboard-view-application-btn{
    margin: 0 0 15px 0;
  }

  .da-dropdown-span{
    font-size: 12px;
  }


}

</style>
