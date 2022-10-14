<template>
  <div class="bg">
    <div class="overview-container">
      <div class="overview-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <el-scrollbar class="overview-r-container">
        <div class="overview-r-container-bg">

          <div class="dashboard-container">

            <template v-if="identity == 1">

              <div class="dashboard-1-container">
<!--                <div class="dashboard-1">-->
<!--                  <h5>You were viewed</h5>-->
<!--                  <h1>18 <span>times this week</span></h1>-->
<!--                </div>-->
                <div class="dashboard-1">
                  <h1> <span>
                    More awesome widgets are coming soon...
                  </span></h1>
                </div>
              </div>

              <div class="container-2">
                <div class="container-2-l">
                  <dailyJobMatch></dailyJobMatch>
                </div>
                <div class="container-2-r">
                  <applicationsUpdates></applicationsUpdates>
                </div>
              </div>

              <div class="container-3">
                <div class="container-3-l">
                  <favoritedJobsDashboard></favoritedJobsDashboard>
                </div>

              </div>

            </template>

            <template v-if="identity == 2 || identity == 3 || identity == 4">
<!--              <div class="dashboard-1-container">-->
<!--                <div class="dashboard-1">-->
<!--                  <h5>New applications</h5>-->
<!--                  <h1>+7</h1>-->
<!--                  <div class="dashboard-1-tips">-->
<!--                    total:21 applications-->
<!--                  </div>-->
<!--                </div>-->

<!--                <div class="dashboard-1">-->
<!--                  <h5>Views this month</h5>-->
<!--                  <h1>-->
<!--                    +18-->
<!--                  </h1>-->
<!--                  <div class="dashboard-1-tips">-->
<!--                    total:156 views-->
<!--                  </div>-->
<!--                </div>-->

<!--                <div class="dashboard-1">-->
<!--                  <h5>New educators</h5>-->
<!--                  <h1>-->
<!--                    +48-->
<!--                  </h1>-->
<!--                  <div class="dashboard-1-tips">-->
<!--                    total:892 educators-->
<!--                  </div>-->
<!--                </div>-->

<!--                <div class="dashboard-1">-->
<!--                  <h5 >Jobs posted</h5>-->
<!--                  <h1>-->
<!--                    3/ <el-icon> <IconIcOutlineAllInclusive /> </el-icon>-->
<!--                  </h1>-->
<!--                  <div class="dashboard-1-tips">-->
<!--                    <span>this month</span>-->
<!--                    <el-button class="dashboard-post-a-job-btn"-->
<!--                               @click="postJob()"-->
<!--                               type="primary" round>-->
<!--                      POST A JOB-->
<!--                    </el-button>-->
<!--                  </div>-->

<!--                </div>-->

<!--                <div class="dashboard-1  dashboard-1-bg-1">-->
<!--                  <h5>Quick actions</h5>-->
<!--                  <div class="dashboard-1-actions">-->
<!--                    <el-button class="dashboard-1-action-btn" plain round>-->
<!--                      UPGRADE-->
<!--                    </el-button>-->
<!--                    <el-button class="dashboard-1-action-btn" plain round>-->
<!--                      ADVERTISE-->
<!--                    </el-button>-->
<!--                  </div>-->
<!--                </div>-->

<!--              </div>-->

              <div class="dashboard-1-container">
                <div class="dashboard-1">
                  <h1> <span>
                    More awesome widgets are coming soon...
                  </span></h1>
                </div>
              </div>

              <NewApplications :data="myApplicationsData"></NewApplications>

            </template>

            <template v-if="identity == 5">

<!--              <div class="dashboard-1-container">-->
<!--                <div class="dashboard-1">-->
<!--                  <h5>You posted</h5>-->
<!--                  <div class="dashboard-1-h">-->
<!--                    <h1>-->
<!--                      18 <span>deals</span>-->
<!--                    </h1>-->
<!--                    <h1>-->
<!--                      2 <span>events</span>-->
<!--                    </h1>-->
<!--                  </div>-->

<!--                </div>-->
<!--                <div class="dashboard-1">-->
<!--                  <h5 >Deals performance</h5>-->
<!--                  <div  class="dashboard-1-h">-->
<!--                    <h1>-->
<!--                      52 <span>favorited</span>-->
<!--                    </h1>-->
<!--                    <h1>-->
<!--                      1 <span>redeemed</span>-->
<!--                    </h1>-->
<!--                  </div>-->

<!--                </div>-->
<!--                <div class="dashboard-1">-->
<!--                  <h5>Events performance</h5>-->
<!--                  <div  class="dashboard-1-h">-->
<!--                    <h1>-->
<!--                      0 <span>favorited</span>-->
<!--                    </h1>-->
<!--                    <h1>-->
<!--                      0 <span>redeemed</span>-->
<!--                    </h1>-->
<!--                  </div>-->

<!--                </div>-->

<!--              </div>-->

              <div class="dashboard-1-container">
                <div class="dashboard-1">
                  <h1> <span>
                    More awesome widgets are coming soon...
                  </span></h1>
                </div>
              </div>

              <div class="container-4">
                <div class="container-4-l">
                  <activeDealsDashboard
                      :listData="dealsListData"
                  ></activeDealsDashboard>
                </div>
                <div class="container-4-r">
                  <activeEventsDashboard
                      :list-data="eventsListData"
                  ></activeEventsDashboard>
                </div>
              </div>


            </template>


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
  ADS_LIST, ALL_ASSIGN_USERS, ALL_JOB_RESUME, DEALS_LIST, EVENTS_LIST, USER_INFO_BY_TOKEN_V2,
  USER_INFO_VISITOR_V2, USER_MENU_COMPANY
} from '@/api/api';
import dashboardListsImg from '@/assets/dashboard/list.png'
import dashboardAdsImg from '@/assets/ads/2.png'
// import {onBeforeRouteUpdate} from "vue-router";
// import {ref} from "vue";
import {computed} from "vue";
import {useStore} from 'vuex'

import NewApplications from "@/components/business/newApplications";
import dailyJobMatch from "@/components/educator/dailyJobMatch";
import applicationsUpdates from "@/components/educator/applicationsUpdates";
import favoritedJobsDashboard from "@/components/educator/favoritedJobsDashboard";
import activeDealsDashboard from "@/components/vendor/activeDealsDashboard";
import activeEventsDashboard from "@/components/vendor/activeEventsDashboard";
import {randomString} from "@/utils";

export default {
  name: "index",
  components: {
    meSideMenu,
    NewApplications,
    dailyJobMatch,
    applicationsUpdates,
    favoritedJobsDashboard,
    activeDealsDashboard,
    activeEventsDashboard
  },
  setup() {
    const store = useStore()
    const currentUser = computed(() => store.state.currentUser)
    // const identity = ref(localStorage.getItem('identity'))
    //
    return {
      currentUser
    }

  },
  watch: {
    allIdentityChanged(newValue) {
      // console.log(newValue)
      if (newValue) {
        this.getAllAssignUsers()
        this.getBasicInfo(this.identity)
      }
    },
    identity(newValue){
      console.log('identity' + newValue)
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
    },
    identity:{
      get(){
        return this.$store.state.identity
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

      adsDataBottom: [],
      profilePercentage: 0,
      accountInfoLevel: 1,
      accountInfoVipDueTime: '',
      accountInfoCategoryStr: '',

      assignUserData: [],
      dialogUserMenuCompanyVisible: false,
      userMenuCompanyData: [],

      anotherUserId: 0,

      dealsListData:[],
      eventsListData:[],

      myApplicationsData:[],
      versionTime:randomString(),


    }
  },
  beforeMount() {

    let user = this.currentUser

    if (this.goEasy.getConnectionStatus() === 'disconnected') {
      this.service.connect(user);

    }

  },
  mounted() {

    // onBeforeRouteUpdate(to => {
    //   // console.log(to)
    //   this.identity = to.query.identity
    //   this.getBasicInfo(to.query.identity)
    //   this.getPercentage(this.identity)
    //
    // })

    // this.getBasicInfo(this.identity)
    // this.getAdsList()

    // this.getPercentage(this.identity)
    // this.getAllAssignUsers()
    this.getDealsList(1,10000)
    this.getEventsList(1,10000)

    this.getAllJobResumeList(1,10000)

  },
  methods: {
    postJob(){
      this.$router.push({path:'/jobs/post',query:{version_time:this.versionTime}})
    },
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
    getDealsList(page, limit) {

      let filterResult = this.filterResultData;

      let paramsA = {
        page: page,
        limit: limit
      }

      let params = Object.assign(paramsA,filterResult)

      DEALS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.dealsListData = res.message.data;
          this.dealTotalNum = res.message.total
          this.showLoadingStatus = false
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getEventsList(page,limit){

      let filterResult = this.filterResultData;

      let paramsA = {
        page: page,
        limit: limit
      }

      let params = Object.assign(paramsA,filterResult)

      EVENTS_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.eventsListData = res.message.data;
          this.eventTotalNum = res.message.total;
          this.showLoadingStatus=false

        }
      }).catch(err=>{
        console.log(err)
      })

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
  padding:50px;
}

.dashboard-container {

}

.dashboard-item-r a {
  text-decoration: none;
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

  margin-right: 50px;
  margin-bottom: 50px;
}

.dashboard-1 h5{
  font-weight: 400;
}

.dashboard-1 h1{
  color: #6650B3;
  display: flex;
  align-items: flex-end;
}

.dashboard-1 h1 span{
  margin-left: 15px;
  font-size: 20px;
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.dashboard-1-h{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
}

.dashboard-1-h h1:nth-child(1){
  margin-right: 15px;
}

.dashboard-1-bg-1 {
  box-shadow: 0px 3px 23px 1px rgba(102, 80, 179, 0.29);
  background: #E7DEFF;
}

.dashboard-1-actions {
  margin-top: 20px;
}

.dashboard-1-action-btn {
  font-size: 20px;

}

.dashboard-1-tips {
  font-size: 20px;
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}


.dashboard-post-a-job-btn {
  margin-left: 15px;
}

.container-2 {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  /*margin-top: 50px;*/
}

.container-2-l{
  width: calc(50% - 40px);
}

.container-2-r{
  width: calc(50% - 40px);
}

.container-3{
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
}

.container-3-l{
  width: calc(50% - 40px);
}


.container-4 {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.container-4-l{
  /*width: 580px;*/
 }

.container-4-r{
  margin-left: 50px;
}


</style>
