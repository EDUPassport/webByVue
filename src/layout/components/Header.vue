<template>
  <div>
    <el-affix :offset="0" :z-index="1000">
      <el-header class="header-container" height="auto">
        <el-row class="header-row-container" :gutter="0" justify="start" align="middle">
          <el-col :xs="4" :sm="4" :md="2" :lg="2" :xl="2">

            <div class="logo-new-container">
              <div class="logo-new" @click="turnHome()">
                <el-image class="logo-new-logo-img" :src="logoImgLogo"></el-image>
              </div>
              <div class="logo-new-beta">Beta</div>
            </div>

            <div class="logo-mobile-new-container">
              <div class="logo-mobile-new" @click="turnHome()">
                <el-image class="logo-mobile-new-logo-img" :src="logoImgLogo"></el-image>
              </div>
              <div class="logo-mobile-new-beta">Beta</div>
              <el-button link @click="showMobileMenu()">Menu</el-button>
            </div>


          </el-col>

          <el-col :xs="0" :sm="0" :md="0" :lg="14" :xl="14">
            <div class="nav-link-container">

              <el-dialog
                  v-model="dialogSwitchJobVisible"
                  title=""
                  width="30%"
              >
                <div class="switch-job-container">
                  <h3 v-if="envName==='development' || envName === 'production' ">
                    You will now be redirected to our
                    chinese website
                  </h3>
                  <h3 v-if="envName==='developmentCN' || envName === 'productionCN' ">
                    You will now be redirected to our
                    international website
                  </h3>
                  <div class="switch-job-tips">
                    Your login and account info will be sent along to ease the transition
                  </div>
                  <div class="switch-job-btn-container">
                    <el-button class="switch-job-btn" type="primary" round @click="turnEnvJobs()">
                      Let's Go
                    </el-button>
                  </div>
                </div>

              </el-dialog>

              <el-dropdown size="default">
                    <span class="el-dropdown-link-job">
                          EDU Jobs
                    <el-icon class="el-icon--right">
                      <arrow-down/>
                      </el-icon>
                    </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="goChinaJob()">
                      <span class="el-dropdown-link-job-1">China</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click="goInternationalJob()">
                      <span class="el-dropdown-link-job-1">International</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <router-link to="/deals" exact> EDU Deals</router-link>
              <router-link to="/events" exact>EDU Events</router-link>

            </div>
          </el-col>

          <el-col :xs="20" :sm="20" :md="22" :lg="8" :xl="8">
            <div class="user-container">
              <template v-if="token && token !='' ">
                <div class="user-container-1">

                  <div class="user-container-1-earth">

                    <el-popover :width="160" >

                      <template #reference>
                        <el-icon :size="20" >
                          <IconFa6SolidEarthAmericas />
                        </el-icon>
                      </template>
                      <template #default>

                        <div class="user-container-1-earth-expand">
                          <div class="user-container-1-earth-international" @click="goInternationalWebsite()">
                            <span v-if="envName === 'development' || envName === 'production'"></span>
                            international
                          </div>
                          <div class="user-container-1-earth-china" @click="goChinaWebsite()">
                            <span v-if="envName === 'developmentCN' || envName === 'productionCN'"></span>
                            Chinese
                          </div>
                        </div>

                      </template>
                    </el-popover>

                  </div>

                  <div class="user-1-r">
                    <div class="user-name"> Welcome back, {{ username }}</div>
                    <div class="user-dropdown">

                      <div class="user-dropdown-ll">

                        <div class="user-dropdown-bell" v-if="isThirdCompanyStatus != 1">
                          <el-popover :width="330">
                            <template #reference>
                              <el-icon class="circle-circle" :size="20" color="#6650B3"
                                       v-if="unreadTotal>0 || inAppUnreadTotal > 0">
                                <IconBiBellFill></IconBiBellFill>
                                <span class="circle-red"></span>
                              </el-icon>
                              <el-icon :size="20" v-else>
                                <IconBiBell></IconBiBell>
                              </el-icon>

                            </template>
                            <template #default>

                              <div class="notification-c">
                                <div class="notification-all-read"
                                     @click="setInAppReadAll()"
                                >
                                  Mark all as read
                                </div>

                                <div class="notification-items"
                                     v-infinite-scroll="loadUserUnreadMore">

                                  <div class="notification-item"
                                       v-for="(item,i) in inAppNotificationData" :key="i"
                                  >
                                    <div class="notification-item-time">
                                      {{ $filters.howLongFormat(item.c_time) }}
                                    </div>

                                    <div class="notification-item-c">
                                      <div class="notification-item-c-l"
                                           :class="item.is_read ? '' : 'no-read-1'"
                                      >
                                        <template v-if="item.type == 1">
                                          <el-icon :size="20">
                                            <IconEduApplicationNofill20/>
                                          </el-icon>
                                        </template>
                                        <template v-else-if="item.type == 2">
                                          <el-icon :size="20">
                                            <IconEduPerksNofill20/>
                                          </el-icon>
                                        </template>
                                        <template v-else>
                                          <el-icon :size="20">
                                            <IconBiCardText/>
                                          </el-icon>
                                        </template>

                                      </div>
                                      <div class="notification-item-c-r"
                                           @click="setInAppRead(item.id,item.identity,i)"
                                           :class="item.is_read ? '' : 'no-read-2' "
                                      >
                                        {{ item.desc }}
                                      </div>

                                    </div>
                                  </div>

                                </div>

                                <div class="im-msg-container">
                                  <el-button class="im-msg-btn" plain round
                                             @click="turnChatPage()">
                                    <el-icon :size="20">
                                      <IconEduChatNofill20/>
                                    </el-icon>
                                    <span>{{ unreadTotal }}</span>
                                  </el-button>
                                </div>

                              </div>

                            </template>
                          </el-popover>

                        </div>

                        <el-dropdown size="large"
                                     trigger="click"
                                     :hide-on-click="false"
                                     popper-class="xll-dropdown"
                        >

                          <span class="el-dropdown-link">

                            <template v-if="identity == 0">Guest</template>
                            <template v-if="identity == 1">Educator</template>
                            <template v-if="identity == 2">Edu-Business</template>
                            <template v-if="identity == 3">Edu-Business</template>
                            <template v-if="identity == 4">Edu-Business</template>
                            <template v-if="identity == 5">Vendor</template>
                            <el-icon :size="24" style="margin-left: 5px;">
                              <IconIcBaselineExpandMore/>
                            </el-icon>

                          </span>

                          <template #dropdown>
                            <el-dropdown-menu>
                              <template v-if="isThirdCompanyStatus == 1">
                                <el-dropdown-item
                                    @click="turnOverview()"
                                >
                                  <el-icon>
                                    <IconMaterialSymbolsDashboardOutlineRounded/>
                                  </el-icon>

                                  <span class="el-dropdown-link-1">DASHBOARD</span>

                                </el-dropdown-item>
                                <el-dropdown-item  @click="returnMySelf()">
                                  <el-icon>
                                    <IconAkarIconsArrowBackThick/>
                                  </el-icon>
                                  <span class="el-dropdown-link-1"> RETURN TO MY ACCOUNT</span>

                                </el-dropdown-item>
                              </template>
                              <template v-else>
                                <el-dropdown-item
                                    @click="turnOverview()"
                                >
                                  <el-icon>
                                    <IconMaterialSymbolsDashboardOutlineRounded/>
                                  </el-icon>

                                  <span class="el-dropdown-link-1">DASHBOARD</span>

                                </el-dropdown-item>
                                <el-dropdown-item @click="turnEditProfile()">
                                  <el-icon>
                                    <IconIconoirProfileCircled/>
                                  </el-icon>

                                  <span class="el-dropdown-link-1"> MY PROFILE</span>
                                </el-dropdown-item>

                                <div class="el-dropdown-tips">switch profile</div>
                                <el-dropdown-item class="xll-dropdown-item">

                                  <el-dropdown size="large"
                                               placement="left-start"
                                               :max-height="400">
                                          <span class="el-dropdown-link-sp">
                                              Educator
                                          </span>
                                    <template #dropdown>
                                      <el-dropdown-menu>
                                        <div class="xll-sub-dropdown" v-if="educatorContactData.length>0">
                                          <el-dropdown-item
                                              class="xll-dropdown-item"
                                              v-for="(item,i) in educatorContactData"
                                              :key="i"
                                              @click="changeIdentity(item.id,1,2)">

                                            <template v-if="item.name">

                                              <span class="el-dropdown-link">{{ item.name }}</span>
                                            </template>
                                            <template v-else>
                                              <span class="el-dropdown-link">Click to Update Profile</span>
                                            </template>

                                          </el-dropdown-item>
                                        </div>

                                        <div class="xll-sub-dropdown" v-else>
                                          <el-dropdown-item class="xll-dropdown-item" @click="createRole(1)">
                                            <div class="xll-add-icon-container">
                                              <span>Add</span>
                                              <el-icon class="xll-icon-circle-plus-1" :size="14">
                                                <CirclePlus/>
                                              </el-icon>
                                            </div>
                                          </el-dropdown-item>
                                        </div>

                                      </el-dropdown-menu>

                                    </template>
                                  </el-dropdown>

                                </el-dropdown-item>

                                <el-dropdown-item class="xll-dropdown-item">
                                  <el-dropdown size="large" placement="left-start" :max-height="400">
                                  <span class="el-dropdown-link-sp">

                                    Edu-Business
                                  </span>
                                    <template #dropdown>
                                      <el-dropdown-menu>
                                        <div class="xll-sub-dropdown" v-if="recruiterCompanyData.length>0">
                                          <el-dropdown-item
                                              class="xll-dropdown-item"
                                              v-for="(item,i) in recruiterCompanyData"
                                              :key="i"
                                              @click="changeIdentity(item.id,2,2)">

                                            <template v-if="item.company_name">
                                              <span class="el-dropdown-link">{{ item.company_name }}</span>
                                            </template>
                                            <template v-else>
                                              <span class="el-dropdown-link">Click to Update Profile</span>
                                            </template>
                                          </el-dropdown-item>
                                        </div>

                                        <div class="xll-sub-dropdown" v-if="schoolCompanyData.length>0">
                                          <el-dropdown-item
                                              class="xll-dropdown-item"
                                              v-for="(item,i) in schoolCompanyData"
                                              :key="i"
                                              @click="changeIdentity(item.id,3,2)">
                                            <template v-if="item.company_name">

                                              <span class="el-dropdown-link">{{ item.company_name }}</span>
                                            </template>
                                            <template v-else>
                                              <span class="el-dropdown-link">Click to Update Profile</span>
                                            </template>
                                          </el-dropdown-item>
                                        </div>
                                        <div class="xll-sub-dropdown" v-if="otherCompanyData.length>0">
                                          <el-dropdown-item
                                              v-for="(item,i) in otherCompanyData"
                                              :key="i"
                                              class="xll-dropdown-item"
                                              @click="changeIdentity(item.id,4,2)">
                                            <template v-if="item.company_name">

                                              <span class="el-dropdown-link">{{ item.company_name }}</span>
                                            </template>
                                            <template v-else>
                                              <span class="el-dropdown-link">Click to Update Profile</span>
                                            </template>
                                          </el-dropdown-item>
                                        </div>

                                        <div class="xll-sub-dropdown">
                                          <el-dropdown-item class="xll-dropdown-item" @click="selectBusinessRole()">
                                            <div class="xll-add-icon-container">
                                              <span>Add</span>
                                              <el-icon class="xll-icon-circle-plus-1" :size="14">
                                                <CirclePlus/>
                                              </el-icon>
                                            </div>
                                          </el-dropdown-item>
                                        </div>

                                      </el-dropdown-menu>
                                    </template>
                                  </el-dropdown>

                                </el-dropdown-item>


                                <el-dropdown-item class="xll-dropdown-item">
                                  <el-dropdown size="large" placement="left-start" :max-height="400">
                                  <span class="el-dropdown-link-sp">
                                     Vendor
                                  </span>
                                    <template #dropdown>
                                      <el-dropdown-menu>
                                        <template v-if="vendorCompanyData.length>0">

                                          <el-dropdown-item
                                              class="xll-dropdown-item"
                                              v-for="(item,i) in vendorCompanyData"
                                              :key="i"
                                              @click="changeIdentity(item.id,5,2)">
                                            <template v-if="item.company_name">
                                              <span class="el-dropdown-link">{{ item.company_name }}</span>
                                            </template>
                                            <template v-else>
                                              <span class="el-dropdown-link">Click to Update Profile</span>
                                            </template>
                                          </el-dropdown-item>
                                        </template>

                                        <el-dropdown-item class="xll-dropdown-item" @click="createRole(5)">
                                          <div class="xll-add-icon-container">
                                            <span>Add</span>
                                            <el-icon class="xll-icon-circle-plus-1" :size="14">
                                              <CirclePlus/>
                                            </el-icon>
                                          </div>
                                        </el-dropdown-item>

                                      </el-dropdown-menu>

                                    </template>
                                  </el-dropdown>

                                </el-dropdown-item>

                                <el-dropdown-item @click="loginOut()">
                                  <el-icon>
                                    <IconIcBaselineLogout/>
                                  </el-icon>
                                  <span class="el-dropdown-link-1">  LOG OUT</span>

                                </el-dropdown-item>
                              </template>

                            </el-dropdown-menu>
                          </template>

                        </el-dropdown>


                      </div>


                    </div>
                  </div>

                  <div class="user-avatar">
                    <el-avatar class="user-avatar-img" :src="userAvatar !='' ? userAvatar : defaultAvatar"></el-avatar>
                  </div>

                </div>
              </template>
              <template v-else>
                <el-button link @click="login()">
                  LOGIN
                </el-button>
                <el-button class="sign-up-btn"
                           round
                           type="primary"
                           @click="signUp()">
                  Sign Up
                </el-button>
              </template>
            </div>
          </el-col>

        </el-row>


      </el-header>

    </el-affix>

    <el-dialog
        v-model="dialogDiscountCardVisible"
        title="Discount Card"
        width="30%"
    >
      <div class="discount-card-container">
        <el-image :src="discountCardImg"></el-image>
      </div>
    </el-dialog>

    <el-dialog
        v-model="dialogBusinessAccountVisible"
        title="Create Account"
        :width="dialogBusinessAccountWidth"
        center
    >
      <div class="switch-account-tips">
        Hello! Which one are you?
      </div>
      <div class="switch-account-container">
        <div class="switch-account-item" @click="createRole(2)">
          Recruiter
        </div>
        <div class="switch-account-item" @click="createRole(3)">
          School
        </div>
        <div class="switch-account-item" @click="createRole(4)">
          Other
        </div>
      </div>
    </el-dialog>


    <el-drawer
        v-model="menuDrawerStatus"
        direction="ltr"
        size="50%"
    >
      <template #header>
        <div style="width: 30px;">
          <div class="logo-mobile-new-container">
            <div class="logo-mobile-new">
              <el-image class="logo-mobile-new-logo-img" :src="logoImgLogo"></el-image>
            </div>
            <div class="logo-mobile-new-beta">Beta</div>
            <el-button link @click="closeMobileMenu()">close</el-button>
          </div>
        </div>

      </template>
      <div class="mobile-menu-drawer-bg">

        <div class="nav-link-item">
          <router-link to="/jobs" exact>EDU Jobs</router-link>
        </div>
        <div class="nav-link-item">
          <router-link to="/deals" exact> EDU Deals</router-link>
        </div>
        <div class="nav-link-item">
          <router-link to="/events" exact>EDU Events</router-link>
        </div>

        <div class="mobile-chose-country">
          <div class="mobile-country-china">
            <el-button link @click="goChinaWebsite()">China</el-button>
          </div>
          <div class="mobile-country-global">
            <el-button link @click="goInternationalWebsite()">Global</el-button>
          </div>
        </div>

      </div>


    </el-drawer>


  </div>

</template>

<script>
import {
  USER_INFO_BY_TOKEN_V2,
  SWITCH_IDENTITY_V2,
  USER_INFO_VISITOR_V2,
  USER_ALL_IDENTITY_V2,
  LOGOUT_V2, USER_MENU_LIST, COMEBACK_MYSELF, USER_UNREAD_LIST, SET_READ, SET_READ_ALL, USER_UNREAD
} from '@/api/api'
import logoImg from '@/assets/logo.png'
import defaultAvatar from '@/assets/default/avatar.png'
import discountCardImg from '@/assets/discountcard/discountCard.png'
import {encode, decode} from 'js-base64'
import logoImgLight from "@/assets/newHome/logo/Full_Logo_Vertical_Transparent_Light.png"
import logoImgLightH from "@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png"
import logoImgLogo from '@/assets/newHome/logo/Logo_Transparent.png'
import {onBeforeRouteUpdate, onBeforeRouteLeave} from 'vue-router'
import {ref} from 'vue'


export default {
  name: "Header",
  setup() {
    let unreadChanged = ref(0)

    onBeforeRouteUpdate((to) => {
      console.log('------- header router -------')
      console.log(to)
      unreadChanged.value++
    })
    onBeforeRouteLeave((to) => {
      console.log(to)
      unreadChanged.value++

    })

    return {
      unreadChanged
    }

  },
  data() {
    return {
      logoImg,
      logoImgLight,
      logoImgLightH,
      logoImgLogo,
      discountCardImg,
      defaultAvatar,
      menuDrawerStatus: false,
      dialogBusinessAccountVisible: false,
      dialogBusinessAccountWidth:'30%',
      token: '',
      dialogDiscountCardVisible: false,
      envName: process.env.VUE_APP_ENV_NAME,
      recruiterCompanyData: [],
      schoolCompanyData: [],
      otherCompanyData: [],
      vendorCompanyData: [],
      educatorContactData: {},
      educatorContactStatus: false,
      dialogSwitchJobVisible: false,

      inAppNotificationData: [],
      inAppPage: 1,
      inAppLimit: 10,
      inAppLastPage: 0,
      inAppUnreadTotal: 0,

      showEarthStatus:false

    }
  },
  watch: {
    allIdentityChanged(newValue) {
      console.log('header all ' + newValue)
      if (newValue) {
        this.getAllIdentity()
        this.getBasicInfo(this.identity)
        this.inAppNotificationData = []
        this.getUserUnreadList(1, this.inAppLimit)
        this.getUserUnread()
      }
    },
    unreadTotal(newValue) {
      console.log(newValue)

    },
    unreadChanged(newValue) {
      console.log('---- unread ------' + newValue)
      if (this.token) {
        this.inAppNotificationData = []
        this.getUserUnreadList(1, this.inAppLimit)
        this.getUserUnread()
      }

    }

  },
  computed: {

    allIdentityChanged: {
      get() {
        return this.$store.state.allIdentityChanged
      }
    },
    username: {
      get() {
        return this.$store.state.username
      }
    },
    userAvatar: {
      get() {
        return this.$store.state.userAvatar
      }

    },
    identity: {
      get() {
        return this.$store.state.identity
      }
    },
    isThirdCompanyStatus: {
      get() {
        return this.$store.state.isThirdCompanyStatus
      }
    },
    unreadTotal: {
      get() {
        return this.$store.state.imUnreadTotal
      }
    }

  },
  unmounted() {
    window.onresize = null
  },
  mounted() {
    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      this.dialogBusinessAccountWidth = '80%'
    }

    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        this.dialogBusinessAccountWidth = '80%'
      }
    }

    let identity = localStorage.getItem('identity')
    let token = localStorage.getItem('token')
    this.token = token;
    if (token) {
      this.getBasicInfo(identity)
      this.getAllIdentity()
      this.getUserUnreadList(this.inAppPage, this.inAppLimit)
      this.getUserUnread()
    }

  },
  methods: {
    showMobileMenu(){
      this.menuDrawerStatus = true;
    },
    closeMobileMenu(){
      this.menuDrawerStatus = false;
    },
    turnChatPage() {
      this.$router.push('/chat/messages')
    },
    turnEnvJobs() {

      let token = localStorage.getItem('token')
      let domain = process.env.VUE_APP_EXCHANGE_DOMAIN

      if (token) {
        let firstName = localStorage.getItem('first_name')
        let lastName = localStorage.getItem('last_name')
        let email = localStorage.getItem('email')
        let uid = localStorage.getItem('uid')

        let navObj = {
          uid: uid,
          email: email,
          first_name: firstName,
          last_name: lastName
        }

        let navObjStr = JSON.stringify(navObj)

        let a = encode(navObjStr)
        let b = decode(a)
        console.log(JSON.parse(b))

        let navUrl = domain + '/jobs?exchange_job=' + a
        // console.log(navUrl)
        window.open(navUrl, '_self')
      } else {
        let adomain = domain + '/jobs'
        window.open(adomain, '_self')
      }

    },
    goChinaJob() {
      let envName = this.envName;

      if (envName === 'development' || envName === 'production') {
        this.dialogSwitchJobVisible = true;
      }

      if (envName === 'developmentCN' || envName === 'productionCN') {
        this.$router.push('/jobs')
      }
    },
    goInternationalJob() {
      let envName = this.envName;

      if (envName === 'development' || envName === 'production') {
        this.$router.push('/jobs')
      }

      if (envName === 'developmentCN' || envName === 'productionCN') {

        this.dialogSwitchJobVisible = true;
      }
    },
    getAllIdentity() {

      let params = {}
      USER_ALL_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.$store.commit('allIdentityChanged', false)

          let vendorCompany = []
          let recruitingCompany = []
          let schoolCompany = []
          let otherCompany = []

          let userContact = res.message.user_contact

          if (userContact) {
            let educatorContact = userContact.educarot_contact

            if (educatorContact) {
              this.educatorContactStatus = true;
              this.educatorContactData = educatorContact
            } else {
              this.educatorContactStatus = false;
            }

            if (res.message.user_contact) {
              vendorCompany = res.message.user_contact.vendor_company
              recruitingCompany = res.message.user_contact.recruiting_company
              schoolCompany = res.message.user_contact.school_company
              otherCompany = res.message.user_contact.other_company
            }

            if (vendorCompany) {
              this.vendorCompanyData = vendorCompany
            }

            if (recruitingCompany) {
              this.recruiterCompanyData = recruitingCompany
            }

            if (schoolCompany) {
              this.schoolCompanyData = schoolCompany
            }

            if (otherCompany) {
              this.otherCompanyData = otherCompany
            }

          } else {
            this.educatorContactData = []
            this.vendorCompanyData = []
            this.recruiterCompanyData = []
            this.schoolCompanyData = []
            this.otherCompanyData = []
          }

        }

      }).catch(err => {
        console.log(err)
      })
    },
    signUp() {
      this.$router.push({path: '/signup', query: {}})
    },
    getBasicInfo(identity) {

      let params = {
        identity: identity
      }

      USER_INFO_BY_TOKEN_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

          let userContact = res.message.user_contact;

          let companyInfo = {};

          let defaultName = userContact.first_name + ' ' + userContact.last_name
          let name = defaultName;

          let avatar = 'https://oss.esl-passport.cn/educator.png';

          if (identity == 1) {
            avatar = userContact.headimgurl;
          }

          if (identity == 2 || identity == 3 || identity == 4 || identity == 5) {

            if (userContact.company) {
              companyInfo = userContact.company;
              avatar = companyInfo.logo;
              name = companyInfo.company_name;
            }

          }

          let uuid = userContact.id + '#' + identity + '#' + userContact.company_id

          let currentUser = {
            uuid: uuid,
            uid: userContact.id,
            identity: identity,
            name: name,
            avatar: avatar,
            companyId: userContact.company_id
          }

          this.$store.commit('currentUser', currentUser)

          localStorage.setItem('name', name)
          localStorage.setItem('avatar', avatar)
          localStorage.setItem('is_third_company', res.message.user_contact.is_third_company)

          this.$store.commit('username', name)
          this.$store.commit('userAvatar', avatar)
          this.$store.commit('changeThirdCompanyStatus', res.message.user_contact.is_third_company)


        }
      }).catch(err => {
        console.log(err)
        // this.$message.error(err.msg)
      })
    },
    login() {
      this.$router.push('/login')
    },
    returnMySelf() {
      this.$loading({
        text: 'Loading...'
      })
      let self = this;
      COMEBACK_MYSELF().then(res => {
        console.log(res)
        if (res.code == 200) {
          let uid = localStorage.getItem('uid')
          let identityValue = res.message.return_identity
          let companyIdValue = res.message.return_company_id

          this.$store.commit('identity', identityValue)
          this.$store.commit('allIdentityChanged', true)

          this.$store.commit('currentCompanyId', companyIdValue)

          localStorage.setItem('identity', identityValue)
          localStorage.setItem('company_id', companyIdValue)

          this.getBasicInfo(identityValue)
          this.getAllIdentity()
          this.getUserMenuList(uid, identityValue, companyIdValue, uid)

          setTimeout(function () {
            self.$router.push({path: '/overview', query: {}})
            self.$loading().close()
          }, 1200)
          // window.location.reload()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    loginOut() {
      this.$loading({
        text: 'Loading...'
      })

      let params = {
        token: localStorage.getItem('token'),
        platform: 4
      }

      LOGOUT_V2(params).then(res => {
        if (res.code == 200) {
          localStorage.clear()
          this.token = '';
          this.$store.commit('username', '')
          this.$store.commit('userAvatar', '')
          this.$router.push('/')
          this.$loading().close()
        }

        // console.log(res)
      }).catch(err => {
        console.log(err)
      })

    },
    turnOverview() {
      let self = this;
      this.$loading({
        text: 'Loading...'
      })

      this.$router.push('/overview')

      setTimeout(function () {
        self.$loading().close()
      }, 1500)
    },
    turnEditProfile() {
      this.$loading({
        text: 'Loading...'
      })
      let companyId = localStorage.getItem('company_id')
      let identity = localStorage.getItem('identity')

      if (companyId && companyId != '0') {
        this.changeIdentity(companyId, identity, 2)
        this.$loading().close()

      } else {
        if (identity == 1) {
          this.$loading().close()
          let strObj = {
            i: 1,
            action: 'add'
          }
          let str = encode(JSON.stringify(strObj))

          this.$router.push({path: '/educator/edit/home', query: {s: str}})

        }

        if (identity == 2) {

          this.$loading().close()
          let strObj = {
            i: 2,
            action: 'add'
          }
          let str = encode(JSON.stringify(strObj))
          this.$router.push({path: '/business/edit/recruiter', query: {s: str}})

        }

        if (identity == 3) {

          this.$loading().close()
          let strObj = {
            i: 3,
            action: 'add'
          }
          let str = encode(JSON.stringify(strObj))
          this.$router.push({path: '/business/edit/school', query: {s: str}})
        }

        if (identity == 4) {

          this.$loading().close()

          let strObj = {
            i: 4,
            action: 'add'
          }
          let str = encode(JSON.stringify(strObj))
          this.$router.push({path: '/business/edit/other', query: {s: str}})

        }

        if (identity == 5) {

          this.$loading().close()

          let strObj = {
            i: 5,
            action: 'add'
          }

          let str = encode(JSON.stringify(strObj))
          this.$router.push({path: '/vendor/edit/vendor', query: {s: str}})

        }

      }

    },
    selectBusinessRole() {
      console.log('select business role')
      this.dialogBusinessAccountVisible = true;
    },
    createRole(identity) {
      this.$loading({
        text: 'Loading...'
      })
      if (identity == 1) {
        this.$loading().close()
        let strObj = {
          i: 1,
          action: 'add'
        }
        let str = encode(JSON.stringify(strObj))
        this.$router.push({path: '/educator/edit/home', query: {s: str}})

      }

      if (identity == 2) {

        this.$loading().close()
        let strObj = {
          i: 2,
          action: 'add'
        }
        let str = encode(JSON.stringify(strObj))
        this.$router.push({path: '/business/edit/recruiter', query: {s: str}})

        this.dialogBusinessAccountVisible = false
      }

      if (identity == 3) {

        this.$loading().close()
        let strObj = {
          i: 3,
          action: 'add'
        }
        let str = encode(JSON.stringify(strObj))
        this.$router.push({path: '/business/edit/school', query: {s: str}})

        this.dialogBusinessAccountVisible = false

      }

      if (identity == 4) {

        this.$loading().close()

        let strObj = {
          i: 4,
          action: 'add'
        }
        let str = encode(JSON.stringify(strObj))

        this.$router.push({path: '/business/edit/other', query: {s: str}})
        this.dialogBusinessAccountVisible = false

      }

      if (identity == 5) {

        this.$loading().close()

        let strObj = {
          i: 5,
          action: 'add'
        }

        let str = encode(JSON.stringify(strObj))
        this.$router.push({path: '/vendor/edit/vendor', query: {s: str}})

      }


    },
    selectRole(e) {
      this.$loading({
        text: 'Loading...'
      })

      let params = {
        user_id: localStorage.getItem('uid'),
        identity: e
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        let userContact = res.message.user_contact;
        let educatorContact = {};

        let companyInfo = {};

        let isEducator = userContact.is_educator;
        let isRecruiting = userContact.is_recruiting;
        let isSchool = userContact.is_school;
        let isOther = userContact.is_other;
        let isVendor = userContact.is_vendor;
        let identity = e;

        if (identity == 1) {
          if (isEducator > 10) {
            educatorContact = res.message.user_contact.educator_contact;
            this.changeIdentity(educatorContact.id, 1, 2)
            this.$router.push({path: '/overview', query: {}})
            this.$loading().close()
          } else {
            this.$loading().close()
            this.$router.push({path: '/educator/edit/home', query: {i: 1}})

          }

        }

        if (identity == 2) {

          if (isRecruiting > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id, 2, 2)
            this.$router.push({path: '/overview', query: {}})
            this.$loading().close()

          } else {
            this.$loading().close()
            this.$router.push({path: '/business/edit/recruiter', query: {i: 2}})
            this.dialogBusinessAccountVisible = false

          }
        }

        if (identity == 3) {

          if (isSchool > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id, 3, 2)
            this.$router.push({path: '/overview', query: {}})
            this.$loading().close()
          } else {
            this.$loading().close()
            this.$router.push({path: '/business/edit/school', query: {i: 3}})

            this.dialogBusinessAccountVisible = false
          }

        }

        if (identity == 4) {

          if (isOther > 10) {
            companyInfo = res.message.user_contact.company;

            this.changeIdentity(companyInfo.id, 4, 2)
            this.$router.push({path: '/overview', query: {}})
            this.$loading().close()
          } else {
            this.$loading().close()
            this.$router.push({path: '/business/edit/other', query: {i: 4}})

            this.dialogBusinessAccountVisible = false
          }

        }

        if (identity == 5) {

          if (isVendor > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id, 5, 2)
            this.$router.push({path: '/overview', query: {}})
            this.$loading().close()
          } else {
            this.$loading().close()
            this.$router.push({path: '/vendor/edit/vendor', query: {i: 5}})

          }

        }


      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })
    },
    changeIdentity(companyId, identity, language) {
      let params = {
        company_id: companyId,
        language: language,
        identity: identity
      }

      SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.$store.commit('allIdentityChanged', true)

          localStorage.setItem('company_id', companyId)
          localStorage.setItem('identity', identity)

          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData', str)

          this.$store.commit('identity', identity)
          this.$store.commit('currentCompanyId', companyId)
          this.$store.commit('menuData', res.message)

          this.getBasicInfo(identity)

          this.$router.push('/account/home')

          if (this.goEasy.getConnectionStatus() === 'connected') {
            this.goEasy.disconnect({
              onSuccess: function(){
                console.log("GoEasy disconnect successfully.")
              },
              onFailed: function(error){
                console.log("Failed to disconnect GoEasy, code:"+error.code+ ",error:"+error.content);
              }
            });
          }

          localStorage.removeItem('chatJsonConversation')

          this.$loading().close()

        }
      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })

    },
    getUserMenuList(uid, identity, companyId, cId) {

      let params = {
        user_id: uid,
        identity: identity,
        company_id: companyId,
        create_user_id: cId,
        page: 1,
        limit: 1000
      }
      USER_MENU_LIST(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData', str)

          this.$store.commit('menuData', res.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    turnHome() {
      this.$router.push('/')
    },
    turnZohoBlog() {
      let envName = this.envName;

      if (envName === 'development' || envName === 'production') {
        window.open('https://news.edupassport.io/blogs', '_blank')
      }

      if (envName === 'developmentCN' || envName === 'productionCN') {
        window.open('https://news.esl-passport.cn/blogs', '_blank')
      }


    },
    loadUserUnreadMore() {
      this.inAppPage++
      if (this.inAppPage <= this.inAppLastPage) {
        this.getUserUnreadList(this.inAppPage, this.inAppLimit)
      }

    },
    getUserUnreadList(page, limit) {
      let params = {
        page: page,
        limit: limit
      }
      USER_UNREAD_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.inAppNotificationData = this.inAppNotificationData.concat(res.message.data);
          this.inAppLastPage = res.message.last_page;

        }
      }).catch(err => {
        console.log(err)
      })
    },
    setInAppRead(id, identity, index) {
      let params = {
        id: id,
        identity: identity,
        status: 1
      }
      SET_READ(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.inAppNotificationData[index]['is_read'] = 1
          this.getUserUnread()
        }
      }).catch(err => {
        console.log(err)
      })

    },
    setInAppReadAll() {

      let params = {
        status: 1
      }

      SET_READ_ALL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.inAppNotificationData = []
          this.getUserUnreadList(1, this.inAppLimit)
          this.getUserUnread()
        }
      }).catch(err => {
        console.log(err)
      })

    },
    getUserUnread() {
      let params = {
        identity: localStorage.getItem('identity')
      }
      USER_UNREAD(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.inAppUnreadTotal = res.message.count;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    goChinaWebsite(){
      window.open('https://www.edupassport.cn')
    },
    goInternationalWebsite(){
      window.open('https://www.edupassport.io')
    }

  }

}
</script>

<style scoped>
.header-container {
  border-bottom: 1px solid #F0F2F5;
  height: 140px;
  background-color: #FFFFFF;
  color: #262626;
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.header-row-container {
  height: 100%;
}


.nav-link-container {
  text-align: left;
}

.nav-link-container a {
  margin-left: 20px;
  text-decoration: none;
  color: #262626;

  font-size: 24px;
  line-height: 30px;

}

.nav-link-container a:hover {
  color: #000000;
}

.zoho-blog-menu {
  cursor: pointer;

  margin-left: 20px;
  text-decoration: none;
  color: #262626;

  font-size: 24px;
  line-height: 30px;
}

.zoho-blog-menu:hover {
  color: #000000;
}

.nav-china-jobs {
  margin-left: 20px;
  color: #262626;

  font-size: 24px;
  line-height: 30px;
  cursor: pointer;
}

.nav-china-jobs:hover {
  color: #000000;
}

.user-container {
  text-align: right;
}

.user-container span {
  cursor: pointer;
}

.user-container-1 {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
}

.user-container-1-earth{
  margin: 4px 8px 0 0;
  cursor: pointer;
  position: relative;
}

.user-container-1-earth-expand{
  padding: 15px;
}

.user-container-1-earth-international{
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
}

.user-container-1-earth-international span{
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #9173ff;
  margin-right: 10px;
}

.user-container-1-earth-china{
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

}

.user-container-1-earth-china span{
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #9173ff;
  margin-right: 10px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 80px;

  margin-left: 10px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 4px;
}

.user-avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 80px;

  cursor: pointer;
}

.user-1-r {
  margin-left: 10px;
}

.user-name {

  font-size: 23px;
  line-height: 30px;

  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;

}

.router-link-exact-active {
  background-color: #6650B3;
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 4px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;

  color: #262626;
  font-size: 25px;
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}


.el-dropdown-link-sp {
  display: flex;
  align-items: center;

  color: #262626;
  font-size: 22px;
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.el-dropdown-link-1 {
  color: #262626;
  font-size: 20px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.el-dropdown-tips {
  margin-top: 10px;
  padding-left: 20px;
  color: #262626;
  font-size: 14px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.xll-add-icon-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.xll-icon-circle-plus-1 {
  margin-left: 4px;
}

.xll-icon-arrow-left {
  position: absolute;
  left: -12px;
  top: -1px;
  bottom: 0;
  margin: auto;
}

.xll-sub-dropdown {
  padding: 10px;
}

.xll-sub-dropdown h4 {
  padding: 4px 10px;
  border-bottom: 1px solid #eeeeee;
  color: #808080;
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

.discount-card-container {
  width: 99%;
  margin: 0 auto;
}

.login-btn {
  font-size: 14px;
  text-decoration: none;

  font-weight: bold;
  padding: 0 10px;
  display: none;
}

.nav-link-item {
  cursor: pointer;
  padding: 10px;
  /*border-bottom: 1px solid #EEEEEE;*/
}

.nav-link-item span{
  font-size: 16px;
  color: #262626;
  line-height: 20px;
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}


.nav-link-item a {
  /*display: block;*/
  text-decoration: none;
  font-size: 16px;
  color: #262626;
  line-height: 20px;
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.el-dropdown-link-job {
  font-size: 24px;
  line-height: 30px;

  margin-left: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
}

.el-dropdown-link-job-1 {
  font-size: 24px;
  line-height: 30px;
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.switch-job-container {
  padding: 20px;
  text-align: center;
}

.switch-job-container h3 {
  word-break: normal;
}

.switch-job-tips {
  margin-top: 20px;
  word-break: normal;
  font-size: 24px;
  line-height: 30px;
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.switch-job-btn-container {
  margin-top: 40px;
}

.switch-job-btn {

}


.xll-icon-size {
  font-size: 40px;
  cursor: pointer;
  color: #ffffff;
}


.user-dropdown-ll {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}

.user-dropdown-bell {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 15px;
}


.logo-new-container {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

}

.logo-new {
  cursor: pointer;
}

.logo-new-logo-img {
  width: 60px;
}



.logo-new-beta {
  position: absolute;
  top: 0;
  right: -25px;
  background-color: #49397f;
  padding: 2px 10px;
  border-radius: 10px;
  color: #EEEEEE;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 12px;
}

.notification-c {
  padding: 15px;
}

.notification-all-read {
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  text-align: right;
  cursor: pointer;
}

.notification-items {
  margin-top: 25px;
  max-height: 300px;
  overflow: auto;
}

.notification-items::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.notification-items::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: #9173ff;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );
}

.notification-items::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}

.notification-item {
  padding: 0 15px;
  margin-bottom: 25px;
}

.notification-item-time {
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 16px;
}

.notification-item-c {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 15px;
}

.notification-item-c-l {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: #F0F2F5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-item-c-r {
  width: calc(100% - 50px);
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  word-break: break-word;
  text-align: left;
  cursor: pointer;
}

.no-read-1 {
  background-color: #E7DEFF;
}

.no-read-2 {
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.im-msg-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-top: 25px;
}

.im-msg-btn {
  width: 100%;
}

.im-msg-container span {

  font-size: 18px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  margin-left: 15px;
}


.circle-circle {
  position: relative;
}

.circle-red {
  display: block;
  position: absolute;
  right: 0;
  top: -5px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #FF4D4D;
}

.logo-mobile-new-container {
  display: none;
}

@media screen and  (max-width: 768px) {

  .user-container-1-earth{
    display: none;
  }

  /deep/ .el-drawer{
    background-color: #F0F2F5;
  }

  .user-name {
    font-size: 14px;
  }

  .el-dropdown-link {
    font-size: 12px;
  }

  .user-avatar {
    width: 40px;
    height: 40px;

  }

  .user-avatar-img {
    width: 40px;
    height: 40px;
  }

  .user-dropdown-ll {
    margin-top: 0;

  }

  .header-container {
    height: 80px;
  }

  .logo-new-container {
    display: none;
  }

  .logo-mobile-new-container {
    width: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

  }

  .logo-mobile-new {
    cursor: pointer;
  }

  .logo-mobile-new-logo-img {
    width: 30px;
  }

  .logo-mobile-new-beta {
    position: absolute;
    top: 0;
    right: -25px;
    background-color: #49397f;
    padding: 2px 10px;
    border-radius: 10px;
    color: #EEEEEE;
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 12px;
  }

  .mobile-menu-drawer-bg{
    background-color: #F0F2F5;
    height: calc(100% - 100px);
    position: relative;
  }

  .mobile-chose-country{
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;

  }

}


</style>
