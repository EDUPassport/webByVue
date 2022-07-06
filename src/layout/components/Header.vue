<template>
  <div>
    <el-affix :offset="0" :z-index="1000">
      <el-header class="header-container" height="auto">
        <el-row class="header-row-container" :gutter="0" justify="start" align="middle">
          <el-col class="logo-container" :xs="4" :sm="4" :md="2" :lg="2" :xl="2">
            <el-image class="logo-img" :src="logoImg" fit="fill" @click="turnHome()"></el-image>
          </el-col>

          <el-col :xs="0" :sm="0" :md="0" :lg="17" :xl="17">
            <div class="nav-link-container">
              <router-link to="/home" exact>Home</router-link>
              <router-link to="/jobs" exact>Jobs</router-link>
              <router-link to="/deals" exact> Edu Deals</router-link>
              <router-link to="/events/list" exact> Events</router-link>
              <!--              <router-link to="/industry/news" exact>News</router-link>-->
              <router-link to="/blog/list" exact>Blog</router-link>
              <router-link to="/contact/us" exact> Contact</router-link>
              <router-link to="/about/us" exact> About</router-link>
              <router-link to="/services/price" exact> Pricing</router-link>
              <template v-if="envName === 'development' || envName === 'production'">
              <span v-if="!identity || identity == 1"
                    class="nav-china-jobs" @click="turnEnvJobs()">China Jobs</span>
              </template>
              <template v-if="envName === 'developmentCN' || envName === 'productionCN'">
              <span v-if="!identity || identity == 1"
                    class="nav-china-jobs" @click="turnEnvJobs()">International Jobs</span>
              </template>
            </div>
          </el-col>

          <el-col :xs="16" :sm="16" :md="18" :lg="5" :xl="5">
            <div class="user-container">
              <template v-if="token && token !='' ">
                <div class="user-container-1">
                  <div class="user-avatar">

                    <el-dropdown>
                      <el-avatar :src="userAvatar !='' ? userAvatar : defaultAvatar"></el-avatar>

                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="dialogDiscountCardVisible=true">My Discount Card</el-dropdown-item>
                          <el-dropdown-item @click="turnEditProfile()">My Profile</el-dropdown-item>
                          <!--                    <el-dropdown-item>Change Password</el-dropdown-item>-->
                          <!--                    <el-dropdown-item >Change Language</el-dropdown-item>-->
                          <el-dropdown-item divided @click="returnMySelf()" v-if="isThirdCompanyStatus == 1">
                            Return to Previous Account
                          </el-dropdown-item>
                          <el-dropdown-item divided @click="loginOut()">Log Out</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>

                  </div>
                  <div class="user-1-r">
                    <div class="user-name"> Hi, {{ username }}</div>
                    <div class="user-dropdown">
                      <template v-if="isThirdCompanyStatus == 1">
                         <span class="el-dropdown-link">
                            <template v-if="identity == 0">Guest</template>
                            <template v-if="identity == 1">Educator</template>
                            <template v-if="identity == 2">Edu-Business</template>
                            <template v-if="identity == 3">Edu-Business</template>
                            <template v-if="identity == 4">Edu-Business</template>
                            <template v-if="identity == 5">Vendor</template>
                          </span>
                      </template>
                      <template v-else>
                        <el-dropdown size="large" trigger="click" :hide-on-click="false"
                                     popper-class="xll-dropdown">
                          <span class="el-dropdown-link">
                            <template v-if="identity == 0">Guest</template>
                            <template v-if="identity == 1">Educator</template>
                            <template v-if="identity == 2">Edu-Business</template>
                            <template v-if="identity == 3">Edu-Business</template>
                            <template v-if="identity == 4">Edu-Business</template>
                            <template v-if="identity == 5">Vendor</template>
                            <i  class="el-icon-arrow-down el-icon--right"></i>
                          </span>

                          <template #dropdown >
                            <el-dropdown-menu >
                              <div class="xll-more-company-dropdown" >
                                <div class="xll-more-company-dropdown-l">
                                  <el-dropdown-item class="xll-dropdown-item">
                                    <el-dropdown size="large" placement="left-start" :max-height="400">
                                  <span class="el-dropdown-link-business">
                                     <i class="el-icon-arrow-left xll-icon-arrow-left"></i>
                                     Educator
                                  </span>
                                      <template #dropdown>
                                        <el-dropdown-menu >
                                          <div class="xll-sub-dropdown"  v-if="educatorContactData.length>0">
                                            <el-dropdown-item
                                                class="xll-dropdown-item"
                                                v-for="(item,i) in educatorContactData"
                                                :key="i"
                                                @click="changeIdentity(item.id,1,2)">

                                              <template v-if="item.name">
                                                {{item.name}}
                                              </template>
                                              <template v-else>
                                                Default ID : {{item.id}}
                                              </template>
                                            </el-dropdown-item>
                                          </div>

                                          <div class="xll-sub-dropdown">
                                            <el-dropdown-item class="xll-dropdown-item" @click="createRole(1)">
                                              <div class="xll-add-icon-container" >
                                                <span>Add</span>
                                                <el-icon class="xll-icon-circle-plus-1" :size="14">
                                                  <CirclePlus/>
                                                </el-icon>
                                              </div>
                                            </el-dropdown-item>
                                          </div>


                                          <!--                                        <template v-if="educatorContactData.name">-->
                                          <!--                                          <el-dropdown-item-->
                                          <!--                                              class="xll-dropdown-item"-->
                                          <!--                                              @click="changeIdentity(educatorContactData.id,1,2)">-->
                                          <!--                                              {{educatorContactData.name}}-->
                                          <!--                                          </el-dropdown-item>-->
                                          <!--                                        </template>-->

                                          <!--                                        <template v-else>-->
                                          <!--                                          <el-dropdown-item-->
                                          <!--                                              class="xll-dropdown-item"-->
                                          <!--                                              @click="changeIdentity(educatorContactData.id,1,2)"-->
                                          <!--                                          >-->
                                          <!--                                            <div class="xll-add-icon-container" >-->
                                          <!--                                              <span>Add</span>-->
                                          <!--                                              <el-icon class="xll-icon-circle-plus-1" :size="14">-->
                                          <!--                                                <CirclePlus/>-->
                                          <!--                                              </el-icon>-->
                                          <!--                                            </div>-->
                                          <!--                                          </el-dropdown-item>-->
                                          <!--                                        </template>-->

                                        </el-dropdown-menu>

                                        <!--                                      <el-dropdown-menu v-else>-->

                                        <!--                                        <el-dropdown-item class="xll-dropdown-item" @click="createRole(1)">-->
                                        <!--                                          <div class="xll-add-icon-container" >-->
                                        <!--                                            <span>Add</span>-->
                                        <!--                                            <el-icon class="xll-icon-circle-plus-1" :size="14">-->
                                        <!--                                              <CirclePlus/>-->
                                        <!--                                            </el-icon>-->
                                        <!--                                          </div>-->
                                        <!--                                        </el-dropdown-item>-->

                                        <!--                                      </el-dropdown-menu>-->

                                      </template>
                                    </el-dropdown>

                                  </el-dropdown-item>

                                </div>
                                <div class="xll-more-company-dropdown-r">
                                  <!--                                <el-icon class="xll-icon-circle-plus" :size="20"-->
                                  <!--                                         @click="createRole(1)"-->
                                  <!--                                >-->
                                  <!--                                  <CirclePlus/>-->
                                  <!--                                </el-icon>-->
                                </div>

                              </div>

                              <div class="xll-more-company-dropdown">
                                <div class="xll-more-company-dropdown-l">

                                  <el-dropdown-item class="xll-dropdown-item">
                                    <el-dropdown size="large" placement="left-start" :max-height="400">
                                  <span class="el-dropdown-link-business">
                                     <i class="el-icon-arrow-left xll-icon-arrow-left"></i>
                                    Edu-Business
                                  </span>
                                      <template #dropdown>
                                        <el-dropdown-menu>
                                          <div class="xll-sub-dropdown"  v-if="recruiterCompanyData.length>0">
                                            <el-dropdown-item
                                                class="xll-dropdown-item"
                                                v-for="(item,i) in recruiterCompanyData"
                                                :key="i"
                                                @click="changeIdentity(item.id,2,2)">

                                              <template v-if="item.company_name">
                                                {{item.company_name}}
                                              </template>
                                              <template v-else>
                                                Default ID: {{item.id}}
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
                                                {{item.company_name}}
                                              </template>
                                              <template v-else>
                                                Company ID: {{item.id}}
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
                                                {{item.company_name}}
                                              </template>
                                              <template v-else>
                                                Default ID: {{item.id}}
                                              </template>
                                            </el-dropdown-item>
                                          </div>

                                          <div class="xll-sub-dropdown">
                                            <el-dropdown-item class="xll-dropdown-item" @click="selectBusinessRole()">
                                              <div class="xll-add-icon-container" >
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

                                </div>
                                <div class="xll-more-company-dropdown-r">
                                  <!--                                <el-icon class="xll-icon-circle-plus" :size="20"-->
                                  <!--                                         @click="selectBusinessRole()"-->
                                  <!--                                >-->
                                  <!--                                  <CirclePlus/>-->
                                  <!--                                </el-icon>-->
                                </div>

                              </div>

                              <div class="xll-more-company-dropdown" >
                                <div class="xll-more-company-dropdown-l">
                                  <el-dropdown-item class="xll-dropdown-item">
                                    <el-dropdown size="large" placement="left-start" :max-height="400">
                                  <span class="el-dropdown-link-business">
                                     <i class="el-icon-arrow-left xll-icon-arrow-left"></i>
                                     Vendor
                                  </span>
                                      <template #dropdown>
                                        <el-dropdown-menu >
                                          <template v-if="vendorCompanyData.length>0">

                                            <el-dropdown-item
                                                class="xll-dropdown-item"
                                                v-for="(item,i) in vendorCompanyData"
                                                :key="i"
                                                @click="changeIdentity(item.id,5,2)">
                                              <template v-if="item.company_name">
                                                {{item.company_name}}
                                              </template>
                                              <template v-else>
                                                Default ID: {{item.id}}
                                              </template>
                                            </el-dropdown-item>
                                          </template>

                                          <el-dropdown-item class="xll-dropdown-item" @click="createRole(5)">
                                            <div class="xll-add-icon-container" >
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

                                </div>
                                <div class="xll-more-company-dropdown-r">
                                  <!--                                <el-icon class="xll-icon-circle-plus" :size="20"-->
                                  <!--                                         @click="createRole(5)"-->
                                  <!--                                >-->
                                  <!--                                  <CirclePlus/>-->
                                  <!--                                </el-icon>-->
                                </div>

                              </div>
                            </el-dropdown-menu>
                          </template>

                        </el-dropdown>

                      </template>

                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <router-link class="login-btn" :to="{path:'/edupassport',query:{type:'login'}}">Login</router-link>
                <el-button class="sign-up-btn" type="default" @click="signUp()">Sign Up</el-button>
              </template>
            </div>
          </el-col>

          <el-col :xs="4" :sm="4" :md="4" :lg="0" :xl="0">
            <div @click="menuDrawerStatus = true">
              <i class="iconfont el-icon-alihamburger-menu-gray xll-icon-size"></i>
            </div>
            <el-drawer
                v-model="menuDrawerStatus"
                direction="rtl"
                size="60%"

            >
              <div class="nav-link-item">
                <router-link to="/home" exact>Home</router-link>
              </div>
              <div class="nav-link-item">
                <router-link to="/jobs" exact>Jobs</router-link>
              </div>
              <div class="nav-link-item">
                <router-link to="/deals" exact> Edu Deals</router-link>
              </div>
              <div class="nav-link-item">
                <router-link to="/events/list" exact> Events</router-link>
              </div>
              <!--              <div class="nav-link-item">-->
              <!--                <router-link to="/industry/news" exact>News</router-link>-->
              <!--              </div>-->
              <div class="nav-link-item">
                <router-link to="/blog/list" exact>Blog</router-link>
              </div>
              <div class="nav-link-item">
                <router-link to="/contact/us" exact> Contact</router-link>
              </div>
              <div class="nav-link-item">
                <router-link to="/about/us" exact> About</router-link>
              </div>
              <div class="nav-link-item">
                <router-link to="/services/price" exact> Pricing</router-link>
              </div>

              <div class="nav-link-item">
                <template v-if="envName === 'development' || envName === 'production'">
                            <span v-if="!identity || identity == 1"
                                  @click="turnEnvJobs()">China Jobs</span>
                </template>
                <template v-if="envName === 'developmentCN' || envName === 'productionCN'">
                             <span v-if="!identity || identity == 1"
                                   @click="turnEnvJobs()">International Jobs</span>
                </template>
              </div>
              <div class="nav-link-item">
                <router-link :to="{path:'/edupassport',query:{type:'login'}}">Login</router-link>
              </div>
              <div class="nav-link-item">
                <router-link :to="{path: '/edupassport', query: {type: 'sign-up'}}">Sign Up</router-link>
              </div>

            </el-drawer>
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
        width="30%"
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

  </div>

</template>

<script>
import {
  USER_INFO_BY_TOKEN_V2,
  SWITCH_IDENTITY_V2,
  USER_INFO_VISITOR_V2,
  USER_ALL_IDENTITY_V2,
  LOGOUT_V2, USER_MENU_LIST, COMEBACK_MYSELF
} from '@/api/api'
import logoImg from '@/assets/logo.png'
import defaultAvatar from '@/assets/default/avatar.png'
import discountCardImg from '@/assets/discountcard/discountCard.png'
import {encode, decode} from 'js-base64'

export default {
  name: "Header",
  data() {
    return {
      logoImg,
      discountCardImg,
      defaultAvatar,
      menuDrawerStatus: false,
      dialogBusinessAccountVisible: false,
      token: '',
      dialogDiscountCardVisible: false,
      envName: process.env.VUE_APP_ENV_NAME,
      recruiterCompanyData:[],
      schoolCompanyData:[],
      otherCompanyData:[],
      vendorCompanyData:[],
      educatorContactData:{},
      educatorContactStatus:false

    }
  },
  watch:{
    allIdentityChanged(newValue){
      console.log(newValue)
      if(newValue){
        this.getAllIdentity()
        this.getBasicInfo(this.identity)

      }
    }
  },
  computed: {
    allIdentityChanged:{
      get(){
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
    }

  },
  mounted() {
    // console.log(this.allIdentityChanged)
    let identity = localStorage.getItem('identity')
    let token = localStorage.getItem('token')
    this.token = token;
    if (token) {
      this.getBasicInfo(identity)
      this.getAllIdentity()
    }

  },
  methods: {
    getAllIdentity(){

      let params = {

      }
      USER_ALL_IDENTITY_V2(params).then(res=>{
        // console.log(res)
        if(res.code == 200){
          this.$store.commit('allIdentityChanged',false)

          let vendorCompany = []
          let recruitingCompany = []
          let schoolCompany = []
          let otherCompany = []

          let userContact = res.message.user_contact

          if(userContact){
            let educatorContact = userContact.educarot_contact

            if(educatorContact){
              this.educatorContactStatus = true;
              this.educatorContactData = educatorContact
            }else{
              this.educatorContactStatus = false;
            }

            if(res.message.user_contact){
              vendorCompany = res.message.user_contact.vendor_company
              recruitingCompany = res.message.user_contact.recruiting_company
              schoolCompany = res.message.user_contact.school_company
              otherCompany = res.message.user_contact.other_company
            }

            if(vendorCompany){
              this.vendorCompanyData = vendorCompany
            }

            if(recruitingCompany){
              this.recruiterCompanyData = recruitingCompany
            }

            if(schoolCompany){
              this.schoolCompanyData = schoolCompany
            }

            if(otherCompany){
              this.otherCompanyData = otherCompany
            }

          }else{
            this.educatorContactData = []
            this.vendorCompanyData = []
            this.recruiterCompanyData = []
            this.schoolCompanyData = []
            this.otherCompanyData = []
          }

        }

      }).catch(err=>{
        console.log(err)
      })
    },
    signUp() {
      this.$router.push({path: '/edupassport', query: {type: 'sign-up'}})
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
          let name = '';
          let avatar = 'https://oss.esl-passport.cn/educator.png';

          if(identity == 1){
            let educatorContact = res.message.user_contact.educator_contact;
            name = educatorContact.name ? educatorContact.name : defaultName;
            avatar = userContact.headimgurl;
          }

          if(identity == 2 || identity == 3 || identity == 4 || identity == 5){

            if(userContact.company){
              companyInfo = userContact.company;
              name = companyInfo.company_name ? companyInfo.company_name : defaultName;
              avatar = companyInfo.logo;
            }else{
              name = defaultName;
              avatar = 'https://oss.esl-passport.cn/educator.png';
            }

          }

          localStorage.setItem('name', name)
          localStorage.setItem('avatar', avatar)

          this.$store.commit('username', name)
          this.$store.commit('userAvatar', avatar)
          this.$store.commit('changeThirdCompanyStatus', res.message.user_contact.is_third_company)

          localStorage.setItem('is_third_company',res.message.user_contact.is_third_company )

        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    login() {
      this.$router.push('/edupassport')
    },
    returnMySelf(){
      COMEBACK_MYSELF().then(res=>{
        console.log(res)
        if(res.code == 200){
          let uid = localStorage.getItem('uid')
          let identityValue = res.message.return_identity
          let companyIdValue = res.message.return_company_id
          this.$store.commit('identity', identityValue)
          this.$store.commit('allIdentityChanged',true )

          this.getBasicInfo(identityValue)
          this.getAllIdentity()
          this.getUserMenuList(uid,identityValue,companyIdValue,uid)
          // window.location.reload()
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    loginOut() {
      this.$loading({
        text: 'Loading...'
      })

      let params = {
        token:localStorage.getItem('token'),
        platform:4
      }

      LOGOUT_V2(params).then(res=>{
        if(res.code == 200){
          localStorage.clear()
          this.token = '';
          this.$store.commit('username', '')
          this.$store.commit('userAvatar', '')
          this.$router.push('/')
          this.$loading().close()
        }

        // console.log(res)
      }).catch(err=>{
        console.log(err)
      })

    },
    turnEditProfile(){
      this.$loading({
        text: 'Loading...'
      })
      let companyId = localStorage.getItem('company_id')
      let identity = localStorage.getItem('identity')
      // console.log(companyId)
      if(companyId && companyId != '0' ){
        this.changeIdentity(companyId,identity,2)
        this.$router.push({path: '/overview', query: {identity: identity}})

        this.$loading().close()

      }else{
        if (identity == 1) {
          this.$loading().close()
          let strObj={
            i:1,
            action:'add'
          }
          let str = encode(JSON.stringify(strObj))
          // this.$message.warning('Oops!.. Your profile is incomplete. ')
          this.$router.push({path: '/profile/contact/user', query: {s:str}})

        }

        if (identity == 2) {

          this.$loading().close()
          let strObj={
            i:2,
            action:'add'
          }
          let str = encode(JSON.stringify(strObj))
          // this.$message.warning('Oops!.. Your profile is incomplete. ')
          this.$router.push({path: '/profile/contact/user', query: {s:str}})

        }

        if (identity == 3) {

          this.$loading().close()
          let strObj={
            i:3,
            action:'add'
          }
          let str = encode(JSON.stringify(strObj))
          // this.$message.warning('Oops!.. Your profile is incomplete. ')
          this.$router.push({path: '/profile/contact/user', query: {s: str}})

        }

        if (identity == 4) {

          this.$loading().close()

          let strObj={
            i:4,
            action:'add'
          }
          let str = encode(JSON.stringify(strObj))

          // this.$message.warning('Oops!.. Your profile is incomplete. ')
          this.$router.push({path: '/profile/contact/user', query: {s: str}})

        }

        if (identity == 5) {

          this.$loading().close()

          let strObj={
            i:5,
            action:'add'
          }

          let str = encode(JSON.stringify(strObj))
          // this.$message.warning('Oops!.. Your profile is incomplete. ')
          this.$router.push({path: '/profile/contact/user', query: {s: str}})

        }

      }

    },
    selectBusinessRole() {
      console.log('select business role')
      this.dialogBusinessAccountVisible = true;
    },
    createRole(identity){
      this.$loading({
        text: 'Loading...'
      })
      if (identity == 1) {
        this.$loading().close()
        let strObj={
          i:1,
          action:'add'
        }
        let str = encode(JSON.stringify(strObj))
        // this.$message.warning('Oops!.. Your profile is incomplete. ')
        this.$router.push({path: '/profile/contact/user', query: {s:str}})

      }

      if (identity == 2) {

        this.$loading().close()
        let strObj={
          i:2,
          action:'add'
        }
        let str = encode(JSON.stringify(strObj))
        // this.$message.warning('Oops!.. Your profile is incomplete. ')
        this.$router.push({path: '/profile/contact/user', query: {s:str}})

        this.dialogBusinessAccountVisible = false
      }

      if (identity == 3) {

        this.$loading().close()
        let strObj={
          i:3,
          action:'add'
        }
        let str = encode(JSON.stringify(strObj))
        // this.$message.warning('Oops!.. Your profile is incomplete. ')
        this.$router.push({path: '/profile/contact/user', query: {s: str}})

        this.dialogBusinessAccountVisible = false

        }

        if (identity == 4) {

          this.$loading().close()

          let strObj={
            i:4,
            action:'add'
          }
          let str = encode(JSON.stringify(strObj))

          // this.$message.warning('Oops!.. Your profile is incomplete. ')
          this.$router.push({path: '/profile/contact/user', query: {s: str}})

          this.dialogBusinessAccountVisible = false

        }

        if (identity == 5) {

          this.$loading().close()

          let strObj={
            i:5,
            action:'add'
          }

          let str = encode(JSON.stringify(strObj))

          // this.$message.warning('Oops!.. Your profile is incomplete. ')
          this.$router.push({path: '/profile/contact/user', query: {s: str}})
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
            educatorContact =  res.message.user_contact.educator_contact;
            this.changeIdentity(educatorContact.id,1,2)
            this.$router.push({path: '/overview', query: {identity: identity}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 1}})

          }

        }

        if (identity == 2) {

          if (isRecruiting > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id,2,2)
            // this.$router.push({path: '/overview', query: {identity: identity}})
            this.$router.push({path: '/profile/contact/user', query: {i: 2}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 2}})

            this.dialogBusinessAccountVisible = false
          }
        }

        if (identity == 3) {

          if (isSchool > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id,3,2)
            // this.$router.push({path: '/overview', query: {identity: identity}})
            this.$router.push({path: '/profile/contact/user', query: {i: 3}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 3}})

            this.dialogBusinessAccountVisible = false
          }

        }

        if (identity == 4) {

          if (isOther > 10) {
            companyInfo = res.message.user_contact.company;

            this.changeIdentity(companyInfo.id,4,2)
            this.$router.push({path: '/overview', query: {identity: identity}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 4}})

            this.dialogBusinessAccountVisible = false
          }

        }

        if (identity == 5) {

          if (isVendor > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id,5,2)
            this.$router.push({path: '/overview', query: {identity: 5}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 5}})

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
          this.$store.commit('allIdentityChanged',true )

          localStorage.setItem('company_id',companyId)
          localStorage.setItem('identity', identity)

          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData',str)

          this.$store.commit('identity', identity)
          this.$store.commit('menuData', res.message)

          this.getBasicInfo(identity)
          this.$router.push({
            path: '/overview', query: {identity: identity}
          })

          this.$loading().close()
        }
      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })

    },
    getUserMenuList(uid,identity,companyId,cId){
      let self = this;
      let params = {
        user_id:uid,
        identity:identity,
        company_id:companyId,
        create_user_id:cId,
        page:1,
        limit:1000
      }
      USER_MENU_LIST(params).then(res=>{
        // console.log(res)
        if(res.code === 200){
          let pcAllData = res.message.pc;
          let sData = pcAllData.filter(item=>item.identity == self.identity)
          this.$store.commit('menuData', sData)
          // localStorage.setItem('menuData',res.message.pc)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    turnHome() {
      this.$router.push('/')
    }
  }

}
</script>

<style scoped>
.header-container {
  max-width: 1920px;
  margin: 0 auto;
  padding: 10px 40px;
  background-color: #1D2634;
  color: #ffffff;
}

.header-row-container {

}

.logo-container {
  text-align: left;
}

.logo-img {
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.nav-link-container {
  text-align: left;
}

.nav-link-container a {
  margin-left: 20px;
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;

}

.nav-link-container a:hover {
  color: #00b3d2;
}

.nav-china-jobs {
  margin-left: 20px;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
}

.nav-china-jobs:hover {
  color: #00b3d2;
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
  align-items: center;
  justify-content: flex-end;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 4px;
}

.user-avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  cursor: pointer;
}

.user-1-r {
  margin-left: 10px;
}

.user-name {
  width: 80px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.router-link-exact-active {
  background-color: #00b3d2;
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 4px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #0AA0A8;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-dropdown-link-business {
  padding-right: 20px;
  padding-left:10px;
}

.xll-more-company-dropdown {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.xll-more-company-dropdown-l {

}

.xll-more-company-dropdown-r {
  //padding-right: 10px;
}

.xll-dropdown-item {
  padding: 4px 20px;
  font-size:14px;
}
.xll-dropdown-item:hover{
  color:#00b3d2;
}

.xll-icon-circle-plus:hover {
  color: #00b3d2;
}

.xll-icon-circle-plus {
  cursor: pointer;
  color:#808080;
}

.xll-add-icon-container{
  display:flex;flex-direction:row;align-items:center;justify-content: center;
}
.xll-icon-circle-plus-1{
  margin-left:4px;
}

.xll-icon-arrow-left {
  position: absolute;
  left: -12px;
  top: -1px;
  bottom: 0;
  margin: auto;
}
.xll-sub-dropdown{
  padding:10px;
}
.xll-sub-dropdown h4{
  padding:4px 10px;
  border-bottom:1px solid #eeeeee;
  color:#808080;
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
  color: #00b3d2;
  font-weight: bold;
  padding: 0 10px;
  display: none;
}

.sign-up-btn {
  background-color: #B1C452;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 14px;
  display: none;
  border: 1px solid #B1C452;
}

.nav-link-item {
  cursor: pointer;
  padding: 10px;
  color: #000000;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  border-bottom: 1px solid #EEEEEE;
}

.nav-link-item a {
  display: block;
  text-decoration: none;
  color: #000000;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
}

@media screen and  (min-width: 1200px) {
  .login-btn {
    display: inline;
  }

  .sign-up-btn {
    display: inline;
  }
}

.xll-icon-size {
  font-size: 40px;
  cursor: pointer;
  color: #ffffff;
}

.xll-dropdown {

}

</style>
