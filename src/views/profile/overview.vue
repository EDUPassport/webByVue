<template>
  <div class="bg">
    <div class="overview-container">
      <div class="overview-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <el-scrollbar class="overview-r-container">
        <div class="overview-r-container-bg">
          <div class="dashboard-container">
            <div class="dashboard-1-container">
              <div class="dashboard-1">
                <div class="dashboard-1-label">New applications</div>
                <div class="dashboard-1-number">
                  +7
                </div>
                <div class="dashboard-1-tips">
                  total:21 applications
                </div>
              </div>

              <div class="dashboard-1">
                <div class="dashboard-1-label">Views this month</div>
                <div class="dashboard-1-number">
                  +18
                </div>
                <div class="dashboard-1-tips">
                  total:156 views
                </div>
              </div>

              <div class="dashboard-1">
                <div class="dashboard-1-label">New educators</div>
                <div class="dashboard-1-number">
                  +48
                </div>
                <div class="dashboard-1-tips">
                  total:892 educators
                </div>
              </div>

              <div class="dashboard-1">
                <div class="dashboard-1-label">Jobs posted</div>
                <div class="dashboard-1-number">
                  3/ <el-icon> <IconIcOutlineAllInclusive /> </el-icon>
                </div>
                <div class="dashboard-1-tips">
                  <span>this month</span>
                  <el-button class="dashboard-post-a-job-btn"
                             type="primary" round>
                    POST A JOB
                  </el-button>
                </div>
              </div>

              <div class="dashboard-1  dashboard-1-bg-1">
                <div class="dashboard-1-label">Quick actions</div>
                <div class="dashboard-1-actions">
                  <el-button class="dashboard-1-action-btn" plain round>
                    UPGRADE
                  </el-button>
                  <el-button class="dashboard-1-action-btn" plain round>
                    ADVERTISE
                  </el-button>
                </div>
              </div>

            </div>
            <div class="dashboard-applications">
              <div class="dashboard-applications-label">
                <span>New applicants(7)</span>
                <el-button class="dashboard-applications-all-btn" link>
                  ALL APPLICATIONS
                </el-button>
              </div>
              <el-scrollbar class="dashboard-application-container">
                <div class="dashboard-application">

                  <div class="dashboard-application-basic">
                    <div class="dashboard-application-basic-l">
                      <el-avatar class="dashboard-application-avatar-img" :src="defaultAvatar"></el-avatar>
                    </div>
                    <div class="dashboard-application-basic-r">
                      <div class="dashboard-application-name">Andrew Christian</div>
                      <div class="dashboard-application-n">
                        <div class="dashboard-application-n-1">Spain</div>
                        <div class="dashboard-application-n-2">12 years</div>
                      </div>
                    </div>

                  </div>

                  <div class="dashboard-application-job">
                    <div class="dashboard-application-job-1">Classroom Teacher</div>
                    <div class="dashboard-application-job-2">
                      position applied for
                    </div>
                  </div>

                  <div class="dashboard-application-match">
                    <div class="dashboard-application-match-1">89%</div>
                    <div class="dashboard-application-match-2">match meter</div>
                  </div>

                  <div class="dashboard-view-application">
                    <el-button class="dashboard-view-application-btn" plain round @click="viewApplicationEvent()">
                      VIEW APPLICATION
                    </el-button>
                  </div>

                </div>

                <div class="dashboard-application-expand" v-if="expandStatus">
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

              </el-scrollbar>

            </div>

<!--            <div class="xll-ads-container xll-ads-container-margin" v-if="adsDataBottom.length>0">-->
<!--              <el-carousel height="220px" indicator-position="none">-->
<!--                <el-carousel-item class="xll-ads-swiper-item" v-for="(item,i) in adsDataBottom" :key="i">-->
<!--                  <div class="xll-ads-l">-->
<!--                    <el-image class="xll-ads-l-img"-->
<!--                              :src="item.user_url !='' ? item.user_url : item.url"></el-image>-->
<!--                  </div>-->
<!--                  <div class="xll-ads-r">-->
<!--                    <h4>Advertise with Us</h4>-->
<!--                    <h5>Description:</h5>-->
<!--                    <div class="xll-ads-r-desc">-->
<!--                      Your Adverts and their description will be displayed here.-->
<!--                      Just click on the banner-->
<!--                    </div>-->

<!--                  </div>-->
<!--                </el-carousel-item>-->
<!--              </el-carousel>-->

<!--            </div>-->

          </div>
          <el-dialog
              v-model="dialogUserMenuCompanyVisible"
              title="Choose a Company"
              width="30%"
              center
          >
            <div class="switch-account-tips">
              Hello! Select a company to update！
            </div>
            <div class="switch-account-container">
              <div class="switch-account-item"
                   v-for="(item,i) in userMenuCompanyData"
                   :key="i"
                   @click="selectCompanyToUpdate(item.user_id,item.id)">
                <template v-if="item">
                  <template v-if="identity == 1 ">
                    {{ item.name }}
                  </template>
                  <template v-if="identity != 1 && item.company_name">
                    {{ item.company_name }}
                  </template>
                </template>


              </div>

            </div>
          </el-dialog>

        </div>


      </el-scrollbar>

    </div>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default/avatar.png'
import meSideMenu from "@/components/meSideMenu";
import {
  ADS_LIST, ALL_ASSIGN_USERS,
  EDUCATOR_PERCENTAGE_V2, OTHER_PERCENTAGE_V2,
  RECRUITER_PERCENTAGE_V2,
  SCHOOL_PERCENTAGE_V2, USER_INFO_BY_TOKEN_V2,
  USER_INFO_VISITOR_V2, USER_MENU_COMPANY, VENDOR_PERCENTAGE_V2
} from '@/api/api';
import dashboardListsImg from '@/assets/dashboard/list.png'
import dashboardAdsImg from '@/assets/ads/2.png'
import {onBeforeRouteUpdate} from "vue-router";
import {computed, ref} from "vue";
import {encode} from "js-base64";

export default {
  name: "index",
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

      anotherUserId: 0

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
    }

  }
}
</script>

<style scoped>
.bg {
  background-color: #F0F2F5;
}

.overview-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.overview-l-container{

}

.overview-r-container{
  width:calc(100% - 160px);
  height: calc(100vh - 140px);
}

.overview-r-container-bg{
  padding:30px 50px 50px 50px;
}

.dashboard-container {

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
  display: flex;
  align-items: center;
}

.dashboard-1-tips {
  font-size: 23px;
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-post-a-job-btn {
  margin-left: 15px;
}


.dashboard-applications {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 15px;
  margin-top: 20px;

}

.dashboard-applications-label {
  font-size: 30px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
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
  margin-top:15px;
}

.dashboard-work-exp-c-item {
  flex: 1;
  padding-right: 40px;
}

.dashboard-work-exp-c-item-label {
  font-size: 23px;
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #262626;
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
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #262626;
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
