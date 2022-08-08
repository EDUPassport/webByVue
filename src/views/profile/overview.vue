<template>
  <div class="bg">
    <div class="profile-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="dashboard-container">
            <div class="dashboard-top-container">
              <div class="dashboard-label">Dashboard</div>
              <div class="dashboard-profile-percentage">
                <h4>Profile:</h4>
                <div class="percentage-progress-container-bg">
                  <div class="percentage-progress-container">
                    <el-progress class="percentage-progress"
                                 :text-inside="true"
                                 :stroke-width="20"
                                 :percentage="profilePercentage" color="#b1c452">
                    </el-progress>

                    <div class="percentage-progress-post-job">
                      <span v-if="identity == 1">Apply for a job</span>
                      <span v-if="identity == 2 || identity == 3 || identity ==4">Post a Job</span>
                      <span v-if="identity == 5">Offer a Deal</span>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            <div class="dashboard-content">
              <template v-if="identity == 1">
                <div class="dashboard-item events-bg" @click="applicationsHref()">
                  <div class="dashboard-item-l">
                    <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                  </div>
                  <div class="dashboard-item-r">
                    <router-link to="/me/applications">My Job Applications</router-link>
                  </div>
                </div>

              </template>
              <template v-if="identity == 2 || identity == 3 || identity == 4">
                <div class="dashboard-item jobs-bg" @click="jobPostsHref()">
                  <div class="dashboard-item-l">
                    <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                  </div>
                  <div class="dashboard-item-r">
                    <router-link to="/jobs">Job Posts</router-link>
                  </div>
                </div>
                <div class="dashboard-item events-bg" @click="myEventsHref()">
                  <div class="dashboard-item-l">
                    <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                  </div>
                  <div class="dashboard-item-r">
                    <router-link to="/events/myEvents">My Events</router-link>
                  </div>
                </div>

              </template>
              <template v-if="identity == 5">
                <div class="dashboard-item deals-bg" @click="myDealsHref()">
                  <div class="dashboard-item-l">
                    <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                  </div>
                  <div class="dashboard-item-r">
                    <router-link to="/deals/myDeals"> My Deals</router-link>
                  </div>
                </div>
                <div class="dashboard-item events-bg" @click="myEventsHref()">
                  <div class="dashboard-item-l">
                    <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                  </div>
                  <div class="dashboard-item-r">
                    <router-link to="/events/myEvents">My Events</router-link>
                  </div>
                </div>
              </template>

              <!--              <div class="dashboard-item ads-bg">-->
              <!--                <div class="dashboard-item-l">-->
              <!--                  <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>-->
              <!--                </div>-->
              <!--                <div class="dashboard-item-r">-->
              <!--                  <router-link to="/">My Ads</router-link>-->
              <!--                </div>-->
              <!--              </div>-->

              <div class="dashboard-item favorites-bg" @click="myFavoritesHref()">
                <div class="dashboard-item-l">
                  <el-image class="dashboard-item-l-icon" :src="dashboardListsImg"></el-image>
                </div>
                <div class="dashboard-item-r">
                  <router-link to="/favorites">My Favorites</router-link>
                </div>
              </div>

            </div>
          </div>

          <accountInfo :info="userContact" :phone="userContact.phone" :email="userContact.email"
                       :level="accountInfoLevel" :vip-due-time="accountInfoVipDueTime"
                       :category-str="accountInfoCategoryStr"
                       :identityActionStatus="true"
          ></accountInfo>


          <div class="admin-container" v-if="isThirdCompanyStatus != 1">
            <h3>Account Administrators</h3>
            <div class="admin-content-container">
              <h4>Contributors</h4>
              <div class="admin-content-underline"></div>
              <div class="admin-list-container">
                <template v-if="assignUserData.length>0">
                  <div class="admin-item-container"
                       v-for="(item,i) in assignUserData" :key="i"
                       @click="showMyCompany(item.id)"
                  >
                    <div class="admin-item-img-container">
                      <el-image class="admin-item-img"
                                :src="item.headimgurl ? item.headimgurl : defaultAvatar ">

                      </el-image>
                    </div>
                    <div class="admin-item-name">{{ item.first_name }} {{item.last_name}}</div>
                    <div class="admin-item-role">
                      <template v-if="item.identity === 1">Educator</template>
                      <template v-if="item.identity === 2">Recruiter</template>
                      <template v-if="item.identity === 3">School</template>
                      <template v-if="item.identity === 4">Other</template>
                      <template v-if="item.identity === 5">Vendor</template>
                    </div>
                  </div>

                </template>

              </div>

              <div class="add-admin">
                <el-button type="primary" @click="addAdmin()">Add an Admin</el-button>
              </div>

            </div>
          </div>


          <div class="xll-ads-container xll-ads-container-margin" v-if="adsDataBottom.length>0">
            <el-carousel height="220px" indicator-position="none">
              <el-carousel-item class="xll-ads-swiper-item" v-for="(item,i) in adsDataBottom" :key="i">
                <div class="xll-ads-l">
                  <el-image class="xll-ads-l-img"
                            :src="item.user_url !='' ? item.user_url : item.url"></el-image>
                </div>
                <div class="xll-ads-r">
                  <h4>Advertise with Us</h4>
                  <h5>Description:</h5>
                  <div class="xll-ads-r-desc">
                    Your Adverts and their description will be displayed here.
                    Just click on the banner
                  </div>

                </div>
              </el-carousel-item>
            </el-carousel>

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
                    {{item.name}}
                  </template>
                  <template v-if="identity != 1 && item.company_name">
                    {{item.company_name}}
                  </template>
                </template>


              </div>

            </div>
          </el-dialog>



        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default/avatar.png'
import accountInfo from "../../components/accountInfo";
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

export default {
  name: "index",
  components: {
    meSideMenu,
    accountInfo
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
  watch:{
    allIdentityChanged(newValue){
      // console.log(newValue)
      if(newValue){
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
    allIdentityChanged:{
      get(){
        return this.$store.state.allIdentityChanged
      }
    }

  },
  data() {
    return {
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

      assignUserData:[],
      dialogUserMenuCompanyVisible:false,
      userMenuCompanyData:[],

      anotherUserId:0

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
    selectCompanyToUpdate(userId,companyId){
      this.$router.push({path:'/profile/admin/add',query:{action:'edit',uid:this.anotherUserId,cuid:userId,cId:companyId}})
    },
    showMyCompany(userId){
      this.anotherUserId = userId
      let params = {
        user_id:userId
      }
      USER_MENU_COMPANY(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.dialogUserMenuCompanyVisible = true;
          this.userMenuCompanyData = res.message;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getAllAssignUsers(){
      let params = {}
      ALL_ASSIGN_USERS(params).then(res=>{
        console.log(res)
        if(res.code === 200){
          this.assignUserData = res.message
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    addAdmin(){
      this.$router.push({path:'/profile/admin/add',query:{}})
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

  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.profile-container {

  margin: 0 auto;
  padding: 20px 0;
}


.dashboard-container {
  padding: 20px;
  text-align: left;
}

.dashboard-top-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.dashboard-label {

}

.dashboard-profile-percentage {
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.percentage-progress-container-bg {
  background-color: #ffffff;
  padding: 10px;
  width: 80%;
  border-radius: 20px;
}

.percentage-progress-container {
  width: 100%;
  height: 20px;
  position: relative;
}

.percentage-progress {
  width: 100%;
  position: absolute;
  bottom: 0;

}

.percentage-progress-post-job {
  width: 80%;
  position: absolute;
  height: 10px;
  bottom: 20px;
  border-right: 1px solid #808080;
}

.percentage-progress-post-job span {
  position: absolute;
  right: -30px;
  top: -16px;
  font-size: 12px;
}

.dashboard-label {
  font-size: 20px;
  font-weight: bold;
}

.dashboard-content {
  padding: 20px;
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

}

.dashboard-item {
  width: 45%;
  cursor: pointer;
  background-color: #EEEEEE;
  color: #ffffff;
  margin-top: 20px;
  padding: 1%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.dashboard-item-l {

}

.dashboard-item-l-icon {
  width: 50px;
  height: 50px;
}

.dashboard-item-r {
  padding-left: 20px;
}

.dashboard-item-r a {
  text-decoration: none;
  color: #FFFFFF;
}

.ads-container {
  margin-top: 20px;
  padding: 0 20px;
  text-align: center;
}

.ads-img {
  width: 100%;
  border-radius: 10px;
}

.jobs-bg {
  background-color: #870043;
}

.deals-bg {
  background-color: #48cdda;
}

.ads-bg {
  background-color: #20aec6;
}

.events-bg {
  background-color: #A8BD4E;
}

.favorites-bg {
  background-color: #FE2563;
}

.msg-bg {
  background-color: #00525F;
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
  cursor:pointer;
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

@media screen and  (min-width:1200px) {
  .profile-container{
    width: 1100px;
  }
}

@media screen and (max-width: 768px){
  .dashboard-content{

  }
  .dashboard-item{
    margin-top:10px;
  }
  .dashboard-item-l-icon{
    width:30px;
    height: 30px;
  }



}


</style>
