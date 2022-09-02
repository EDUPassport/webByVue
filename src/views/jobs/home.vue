<template>
  <div class="bg">
    <div class="ja-container">
      <div class="ja-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <div class="ja-r-container">
        <div class="ja-r-container-bg">

          <div class="da-container">

            <div class="da">
              <div class="da-t">
                <div class="da-t-l">
                  <div class="da-label">
                    Jobs
                  </div>
                  <div class="da-filter">
                    VIEW BY: JOBS
                  </div>
                </div>
                <div class="da-t-r">
                  <el-button class="da-t-r-btn"
                             @click="postJob()"
                             type="primary" round>
                    POST A JOB
                  </el-button>
                </div>
              </div>

              <div class="da-item-container">

                <el-row :gutter="50">
                  <el-col :span="6" class="da-item-t-item">Job title</el-col>
                  <el-col :span="6" class="da-item-t-item">Total applicants</el-col>
                  <el-col :span="6" class="da-item-t-item">Posted/Deadline</el-col>
                  <el-col :span="6" class="da-item-t-item">Action</el-col>
                </el-row>

                <div class="da-item-container-height">
                  <div  v-for="(item,i) in myJobsData" :key="i">

                    <el-row :gutter="50" class="da-da-item" >

                      <el-col :span="6" class="da-job-title">
                        {{item.job_title}}
                      </el-col>
                      <el-col :span="3" class="da-total-applicants">
                        .{{item.resume_count}}
                      </el-col>
                      <el-col :span="3" class="da-total-applicants">
                        <el-tag type="info" disable-transitions
                                v-if="item.status == 0">
                          Pending
                        </el-tag>
                        <el-tag type="success" disable-transitions
                                v-if="item.status == 1">
                          Active
                        </el-tag>
                        <el-tag type="danger" disable-transitions
                                v-if="item.status == 2">
                          Rejected
                        </el-tag>
                      </el-col>
                      <el-col :span="6" class="da-posted-deadline">
                        {{ $filters.howLongFormat(item.refresh_time) }} / {{ $filters.ymdFormatEvent(item.job_due_time)}}
                      </el-col>
                      <el-col :span="6">
                        <el-button class="da-action-btn"
                                   @click="viewAllApplicants(1)"
                                   plain round>
                          VIEW APPLICANTS
                        </el-button>
                      </el-col>

                    </el-row>

                    <div v-if="selectedApplicantsData.indexOf(1) !== -1">
                      <div class="da-item">
                        <div class="da-item-basic">
                          <div class="da-item-basic-l">
                            <el-avatar class="da-item-avatar-img" :src="defaultAvatar"></el-avatar>
                          </div>
                          <div class="da-item-basic-r">
                            <div class="da-item-name">Andrew Christian</div>
                            <div class="da-item-n">
                              <div class="da-item-n-1">Classroom Teacher</div>
                              <div class="da-item-n-1">Spain</div>
                              <div class="da-item-n-1">12 years</div>
                            </div>
                          </div>

                        </div>

                        <div class="da-item-basic"></div>
                        <div class="da-item-basic"></div>

                        <div class="dashboard-view-application">
                          <el-button class="dashboard-view-application-btn" plain round @click="viewApplicationEvent()">
                            VIEW
                          </el-button>
                        </div>
                      </div>

                      <div class="da-item-expand" v-if="expandStatus">
                        <div class="dashboard-work-exp">
                          <div class="dashboard-work-exp-label">
                            <span>Working experience</span>
                            <el-button class="dashboard-view-detail-btn" link>
                              VIEW DETAILS
                            </el-button>
                          </div>
                          <div class="dashboard-work-exp-c">
                            <div class="dashboard-work-exp-c-item">
                              <div class="dashboard-work-exp-c-item-label">ESL Teacher</div>
                              <div class="dashboard-work-exp-c-item-text">
                                EF English First, Singapore
                              </div>
                              <div class="dashboard-work-exp-c-item-text">
                                2010-now(12 years)
                              </div>
                            </div>

                            <div class="dashboard-work-exp-c-item">
                              <div class="dashboard-work-exp-c-item-label">Kindergarten Teacher</div>
                              <div class="dashboard-work-exp-c-item-text">
                                Kindergarten for dogs, Philladelphia,PA
                              </div>
                              <div class="dashboard-work-exp-c-item-text">
                                2008-2010(2 years)
                              </div>
                            </div>

                            <div class="dashboard-work-exp-c-item">
                              <div class="dashboard-work-exp-c-item-label">Tutor</div>
                              <div class="dashboard-work-exp-c-item-text">
                                Self, Springfield, il
                              </div>
                              <div class="dashboard-work-exp-c-item-text">
                                2000-2008(8 years)
                              </div>
                            </div>

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
                            <div class="dashboard-education-cer-c-item">
                              <div class="dashboard-education-cer-c-label">
                                University of California,Los Angeles
                              </div>
                              <div class="dashboard-education-cer-c-text">
                                Master's degree,Applied Linguistics
                              </div>
                              <div class="dashboard-education-cer-c-text">
                                Sep 2011 - Sep 2013
                              </div>
                            </div>

                            <div class="dashboard-education-cer-c-item">
                              <div class="dashboard-education-cer-c-label">
                                San Diego State University
                              </div>
                              <div class="dashboard-education-cer-c-text">
                                Bachelor's degree,Linguistics
                              </div>
                              <div class="dashboard-education-cer-c-text">
                                Sep 2008 - May 2011
                              </div>
                            </div>


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
                            <el-button class="da-item-b-l-btn-1" plain round>
                              VIEW PROFILE
                            </el-button>
                            <el-button class="da-item-b-l-btn-1" plain round>
                              RESUME
                            </el-button>
                          </div>
                          <div class="da-item-b-r">
                            <el-button class="da-item-b-l-btn-1" link round>
                              NOT INTERESTED
                            </el-button>
                            <el-button class="da-item-b-l-btn-2" type="primary" round>
                              SHORTLIST IT
                            </el-button>
                          </div>
                        </div>

                      </div>

                    </div>


                  </div>

                </div>


              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default/avatar.png'
import meSideMenu from "@/components/meSideMenu";
import {
  ADS_LIST, ALL_ASSIGN_USERS,
  EDUCATOR_PERCENTAGE_V2, MY_JOBS, OTHER_PERCENTAGE_V2,
  RECRUITER_PERCENTAGE_V2,
  SCHOOL_PERCENTAGE_V2, USER_INFO_BY_TOKEN_V2,
  USER_INFO_VISITOR_V2, USER_MENU_COMPANY, VENDOR_PERCENTAGE_V2
} from '@/api/api';
import dashboardListsImg from '@/assets/dashboard/list.png'
import dashboardAdsImg from '@/assets/ads/2.png'
import {onBeforeRouteUpdate} from "vue-router";
import {computed, ref} from "vue";
import {encode} from "js-base64";
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
  watch: {
    allIdentityChanged(newValue) {
      // console.log(newValue)
      if (newValue) {
        this.getAllAssignUsers()
        this.getBasicInfo(this.identity)
      }
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

      identity: this.$route.query.identity,
      adsDataBottom: [],
      profilePercentage: 0,
      accountInfoLevel: 1,
      accountInfoVipDueTime: '',
      accountInfoCategoryStr: '',

      assignUserData: [],
      dialogUserMenuCompanyVisible: false,
      userMenuCompanyData: [],

      anotherUserId: 0,
      selectedApplicantsData:[],
      versionTime:randomString(),

      myJobsData:[],
      myJobPage:1,
      myJObLimit:5


    }
  },
  mounted() {
    // let uid = localStorage.getItem('uid')

    onBeforeRouteUpdate(to => {
      // console.log(to)
      this.identity = to.query.identity
      this.getBasicInfo(to.query.identity)
      this.getPercentage(this.identity)

    })

    this.getBasicInfo(this.identity)
    this.getAdsList()

    this.getPercentage(this.identity)
    this.getAllAssignUsers()

    this.getMyJobs(this.myJobPage, this.myJObLimit)

  },
  methods: {
    viewApplicationEvent(){
      this.expandStatus = !this.expandStatus
    },
    selectCompanyToUpdate(userId, companyId) {
      this.$router.push({
        path: '/profile/admin/add',
        query: {action: 'edit', uid: this.anotherUserId, cuid: userId, cId: companyId}
      })
    },
    showMyCompany(userId) {
      this.anotherUserId = userId
      let params = {
        user_id: userId
      }
      USER_MENU_COMPANY(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.dialogUserMenuCompanyVisible = true;
          this.userMenuCompanyData = res.message;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getAllAssignUsers() {
      let params = {}
      ALL_ASSIGN_USERS(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.assignUserData = res.message
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addAdmin() {
      this.$router.push({path: '/profile/admin/add', query: {}})
    },
    getPercentage(identity) {
      if (identity == 1) {
        this.getEducatorPercentage()
      }
      if (identity == 2) {
        this.getRecruiterPercentage()
      }
      if (identity == 3) {
        this.getSchoolPercentage()
      }
      if (identity == 4) {
        this.getOtherPercentage()
      }
      if (identity == 5) {
        this.getVendorPercentage()
      }
    },
    getEducatorPercentage() {
      let params = {}
      EDUCATOR_PERCENTAGE_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.profilePercentage = res.message.is_educator;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getRecruiterPercentage() {
      let params = {}
      RECRUITER_PERCENTAGE_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.profilePercentage = res.message.is_recruiting;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getSchoolPercentage() {
      let params = {}
      SCHOOL_PERCENTAGE_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.profilePercentage = res.message.is_school;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getOtherPercentage() {
      let params = {}
      OTHER_PERCENTAGE_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.profilePercentage = res.message.is_other;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getVendorPercentage() {
      let params = {}
      VENDOR_PERCENTAGE_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.profilePercentage = res.message.is_vendor;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    turnBanner(link) {
      // console.log(link)
      if (link != '') {
        window.location.href = link
      } else {
        let token = localStorage.getItem('token')
        if (!token) {
          window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')

          return;
        }
        this.$router.push('/me/ads/platform')
      }
    },
    getAdsList() {
      let ads_data = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(ads_data).then(res => {
        if (res.code == 200) {
          // console.log(rs.message)
          let adsDataBottom = [];
          let identity = localStorage.getItem('identity');

          if (!identity) {
            adsDataBottom = res.message.filter(item => item.name == 'guest_m1');
          }
          if (identity == 1) {

            adsDataBottom = res.message.filter(item => item.name == 'educator_m1');
          }
          if (identity == 2) {
            adsDataBottom = res.message.filter(item => item.name == 'business_m1');
          }
          if (identity == 3) {
            adsDataBottom = res.message.filter(item => item.name == 'vendor_m1');
          }

          if (adsDataBottom.length > 0) {
            this.adsDataBottom = adsDataBottom[0].data;
          }

        }

      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    applicationsHref() {
      this.$router.push({path: '/me/applications'})
    },
    jobPostsHref() {
      this.$router.push({path: '/jobs'})
    },
    myEventsHref() {
      this.$router.push({path: '/events/myEvents'})
    },
    myDealsHref() {
      this.$router.push({path: '/deals/myDeals'})
    },
    myFavoritesHref() {
      this.$router.push({path: '/favorites'})
    },
    getBasicInfo(identity) {

      let params = {
        identity: identity
      }

      USER_INFO_BY_TOKEN_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          let userContact = res.message.user_contact;

          let company = {};
          let educatorContact = {};

          if (userContact) {
            this.userContact = userContact
          }

          if (identity == 1) {

            educatorContact = res.message.user_contact.educator_contact;

            if (educatorContact) {
              this.educatorContact = educatorContact
              this.accountInfoLevel = educatorContact.vip_level
              this.accountInfoVipDueTime = educatorContact.vip_due_time
              this.accountInfoCategoryStr = educatorContact.sub_identity_name_en

            }
          }

          if (identity == 2 || identity == 3 || identity == 4 || identity == 5) {

            company = res.message.user_contact.company;

            if (company) {
              this.companyInfo = company
              this.accountInfoLevel = company.vip_level
              this.accountInfoVipDueTime = company.vip_due_time
              this.accountInfoCategoryStr = company.category_name_en
            }

          }


        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getVisitorInfo(uid, identity) {

      let params = {
        user_id: uid,
        identity: identity
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          let userContact = res.message.user_contact;
          let company = {};
          let educatorContact = {};

          if (userContact) {
            this.userContact = userContact
          }

          if (identity == 1) {

            educatorContact = res.message.user_contact.educator_contact;

            if (educatorContact) {
              this.educatorContact = educatorContact
            }
          }

          if (identity == 2 || identity == 3 || identity == 4 || identity == 5) {

            company = res.message.user_contact.company;

            if (company) {
              this.companyInfo = company
            }

          }


        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    editBasicInfo() {
      let strObj = {
        i: this.identity,
        action: 'edit'
      }
      let str = encode(JSON.stringify(strObj))

      this.$router.push({path: '/profile/contact/user', query: {s: str}})
    },
    viewAllApplicants(i){
      let index = this.selectedApplicantsData.indexOf(i)
      if(index == -1){
        this.selectedApplicantsData.push(i)
      }else{
        this.selectedApplicantsData.splice(index,1)
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
          let resData = res.message.data
          this.myJobsData =  resData.concat(resData).concat(resData).concat(resData)
          // console.log(res.message.data)
        } else {
          console.log(res.msg)
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
  font-family: BSemiBold, serif;
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
  font-family: BCBold, serif;
  color: #6650B3;

}

.dashboard-1-tips {
  font-size: 23px;
  font-family: Assistant-SemiBold, serif;
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
  font-family: BSemiBold, serif;
  font-weight: 600;
  color: #262626;
}

.da-filter{
  font-family: BCM, serif;
  font-size: 20px;
  margin-left: 50px;
}

.da-t-r-btn{

}

.da-all-btn {
  font-size: 20px;
  font-family: BCM, serif;
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
  font-family: AssiRegular, serif;
  font-size: 18px;
  color: #262626;

}

.da-da-item{
  padding: 20px 0;
  border-bottom:  2px solid #f0f2f5 ;
}

.da-job-title{
  font-family: BarlowM, serif;
  font-size: 25px;
}

.da-total-applicants{
  font-family: Assistant-SemiBold, serif;
  font-size: 23px;
}

.da-posted-deadline{
  font-family: AssiRegular, serif;
  font-size: 23px;
}

.da-action-btn{
  font-family: BCM, serif;
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
  font-family: BarlowM, serif;
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
  font-family: AssiRegular, serif;
  color: #262626;
  margin-right: 10px;
}


.dashboard-view-application {
  flex: 1;
}

.dashboard-view-application-btn {
  font-size: 20px;
  font-family: BCM, serif;
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
  align-items: baseline;
  justify-content: flex-start;
}

.dashboard-education-cer-c-item {
  flex: 1;
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
