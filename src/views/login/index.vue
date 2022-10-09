<template>
  <div class="login-bg">

    <el-row justify="center" align="top" class="login-container">
      <el-col :xs="0" :sm="0" :md="4" :lg="4" :xl="4">
        <div class="login-l" @click="turnHome()">
          <div class="login-l-edu">EDU</div>
          <div class="login-l-passport">PASSPORT</div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">

        <div class="login-m">
          <h1>Log in</h1>

          <div class="xll-login-form-container">
            <template v-if="loginEmailStatus">
              <el-form
                  :model="loginForm"
                  :rules="loginRules"
                  ref="loginForm"
                  label-width="100px"
                  label-position="top"
                  class="demo-ruleForm"
              >
                <el-form-item  prop="email">
                  <el-input size="large" placeholder="Email Address" v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item style="margin-top:25px;"  prop="password">
                  <el-input size="large" placeholder="Password" type="password"
                            show-password
                            v-model="loginForm.password"></el-input>
                </el-form-item>

                <div class="remember-forgot-container">
                  <div class="remember-container">
                    <el-checkbox size="large" v-model="rememberValue" label="Remember Me" @change="rememberChange"></el-checkbox>
                  </div>
                  <div class="forgot-password-container">
                    <el-button link class="forgot-password-btn"  @click="forgotPassword()">
                      Forgot password?
                    </el-button>
                  </div>
                </div>

                <el-form-item>
                  <el-button class="submit-btn"
                             round
                             type="primary"
                             size="large"
                             :loading="submitLoginLoadingStatus"
                             @click="submitLoginForm('loginForm')">
                    Login
                  </el-button>
                </el-form-item>
              </el-form>
            </template>
            <template v-if="loginPhoneStatus">
              <!--                手机号 验证码登录-->
              <template v-if="loginByPhoneWithSmsStatus">
                <el-form
                    :model="loginPhoneSmsForm"
                    :rules="loginPhoneSmsRules"
                    ref="loginPhoneSmsForm"
                    :hide-required-asterisk="true"
                    label-position="top"
                    class="demo-ruleForm"
                >
                  <el-form-item label="Phone #" prop="phone">
                    <template #label>
                      <span class="login-require-star">*</span>
                      <span class="login-label-text">Phone #</span>
                    </template>
                    <el-input size="large" placeholder="Phone #"
                              v-model="loginPhoneSmsForm.phone"></el-input>
                  </el-form-item>

                  <el-form-item label="6 Digit Code" prop="phone_code">
                    <template #label>
                      <div class="password-container">
                        <div class="password-l">
                          <span class="login-require-star">*</span>
                          <span class="login-label-text">6 Digit Code</span>
                        </div>
                        <div class="password-r">
                          <el-button link size="large" @click="switchToPhoneBySms()">
                            Log in via password
                          </el-button>
                        </div>
                      </div>
                    </template>
                    <div class="xll-input-container">
                      <div class="xll-input-input">
                        <el-input size="large" placeholder="Code"
                                  v-model="loginPhoneSmsForm.code">
                        </el-input>
                      </div>
                      <el-button class="xll-input-btn" type="primary" round
                                 size="large"
                                 :loading="checkCodeBtn.loading"
                                 :disabled="checkCodeBtn.disabled"
                                 @click="getCheckCode()"
                      >{{ checkCodeBtn.text }}
                      </el-button>
                    </div>
                  </el-form-item>

                  <div class="remember-forgot-container">
                    <div class="remember-container">
                      <el-checkbox v-model="rememberValue" label="Remember Me" @change="rememberChange"></el-checkbox>
                    </div>
                    <div class="forgot-password-container">
                      <el-button link class="forgot-password-btn" @click="forgotPassword()">Forgot password?
                      </el-button>
                    </div>
                  </div>

                  <el-form-item>
                    <el-button class="submit-btn"
                               size="large"
                               round
                               type="primary"
                               @click="submitLoginPhoneSmsForm('loginPhoneSmsForm')">
                      LOGIN
                    </el-button>
                  </el-form-item>
                </el-form>
              </template>

              <!--               手机号码密码登录-->
              <template v-if="loginByPhoneWithPasswordStatus">
                <el-form
                    :model="loginPhonePassForm"
                    :rules="loginPhonePassRules"
                    ref="loginPhonePassForm"
                    :hide-required-asterisk="true"
                    label-position="top"
                    class="demo-ruleForm"
                >
                  <el-form-item label="Phone #" prop="phone">
                    <template #label>
                      <span class="login-require-star">*</span>
                      <span class="login-label-text">Phone #</span>
                    </template>
                    <el-input size="large" placeholder="Phone #"
                              v-model="loginPhonePassForm.phone"></el-input>
                  </el-form-item>

                  <el-form-item label="Password" prop="password">
                    <template #label>
                      <div class="password-container">
                        <div class="password-l">
                          <span class="login-require-star">*</span>
                          <span class="login-label-text">Password</span>
                        </div>
                        <div class="password-r">
                          <el-button  link size="large" @click="switchToPhoneBySms()">
                            Log in via SMS verification code
                          </el-button>
                        </div>
                      </div>
                    </template>
                    <el-input size="large" placeholder="Password" type="password"
                              show-password
                              v-model="loginPhonePassForm.password"></el-input>
                  </el-form-item>

                  <div class="remember-forgot-container">
                    <div class="remember-container">
                      <el-checkbox v-model="rememberValue" label="Remember Me" @change="rememberChange"></el-checkbox>
                    </div>
                    <div class="forgot-password-container">
                      <el-button link class="forgot-password-btn" @click="forgotPassword()">
                        Forgot password?
                      </el-button>
                    </div>
                  </div>

                  <el-form-item>
                    <el-button class="submit-btn"
                               size="large"
                               round
                               type="primary"
                               @click="submitLoginPhonePassForm('loginPhonePassForm')">
                      LOGIN
                    </el-button>
                  </el-form-item>

                </el-form>
              </template>
            </template>

            <div class="xll-divider">
              <el-divider content-position="center">or</el-divider>
            </div>

            <div class="sign-in-btn-container">
              <el-button v-if="!loginPhoneStatus" size="large"
                         @click="loginWithPhone()"
                         class="login-option-btn" link round>
                <template #icon>
                  <el-icon >
                    <IconBytesizeMobile />
                  </el-icon>
                </template>

                SIGN IN WITH PHONE NUMBER
              </el-button>
              <el-button v-if="!loginEmailStatus"
                         @click="loginWithPhone()"
                         class="login-option-btn"
                         link round
                         size="large"
              >
                <template #icon>
                  <el-icon>
                    <IconCarbonEmail />
                  </el-icon>
                </template>
                 SIGN IN WITH EMAIL
              </el-button>
            </div>

            <div class="sign-in-btn-container">
              <el-button @click="linkedinSignIn()"
                         size="large"
                         class="login-option-btn" link round
                         >
                <template #icon>
                  <el-icon>
                    <IconLogosLinkedinIcon />
                  </el-icon>
                </template>
                 SIGN IN WITH LINKEDIN
              </el-button>
            </div>

            <div class="sign-in-btn-container">
              <el-button @click="googleSignIn()"
                         size="large"
                         class="login-option-btn"
                         link round
                        >
                <template #icon>
                  <el-icon>
                    <IconLogosGoogleIcon></IconLogosGoogleIcon>
                  </el-icon>
                </template>
                 SIGN IN WITH GOOGLE
              </el-button>
            </div>

          </div>


        </div>

      </el-col>
      <el-col :xs="0" :sm="0" :md="4" :lg="4" :xl="4">
        <div class="login-r">

          <div class="login-close">
            <el-button class="login-close-btn"
                       link
                       @click="goHome()"
            >
              CLOSE
            </el-button>
          </div>

          <div class="sign-up">
            <el-button class="sign-up-btn"
                       plain
                       round
                       @click="signUp()"
            >
              SIGN UP
            </el-button>
          </div>

        </div>
      </el-col>

    </el-row>

    <ForgotPassword :isShow="forgotDialogVisible" @close="closeForgotDialog()"></ForgotPassword>

  </div>

</template>

<script>

// import {hcaptcha} from "@shubhamranjan/vue-hcaptcha";
import imgLogo from '@/assets/logo.png'
//WEIXIN_SEND_SMS
import {
  EMAIL_REGISTER_V2,
  SEND_EMAIL_CODE,
  WEIXIN_SEND_SMS,
  ZOHO_SYNC,
  LOGIN_EMAIL_PWD_V2, PHONE_REGISTER_V2, LOGIN_PHONE_SMS_V2, LOGIN_PHONE_PWD_V2, USER_MENU_LIST
} from "@/api/api";
//LINKEDIN_CODE
import {useRoute, useRouter} from "vue-router";
import axios from "axios";

import {randomString} from '@/utils'
import {useStore} from 'vuex'
import {reactive, ref} from "vue";
import {decode} from "js-base64";
import ForgotPassword from '@/components/forgotPassword'

export default {
  name: "index",
  data() {
    return {
      imgLogo,
      identityBusinessCheckedStatus:false,
      identityBusinessStrBefore:"",
      identityBusinessStr:'Education-Business',
      loginPhoneStatus: false,
      loginEmailStatus: true,

      loginByPhoneWithPasswordStatus: false,
      loginByPhoneWithSmsStatus: true,

      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [
          {required: true, message: 'Please fill out your email address.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please enter your password', trigger: 'blur'}
        ]
      },
      loginPhoneSmsForm: {
        phone: '',
        code: ''
      },
      loginPhoneSmsRules: {
        phone: [
          {required: true, message: 'Please fill out your phone #.', trigger: 'blur'}
        ],
        code: [
          {required: true, message: 'Please enter 6 digit code.', trigger: 'blur'}
        ],
      },
      loginPhonePassForm: {
        phone: '',
        password: '',
      },
      loginPhonePassRules: {
        phone: [
          {required: true, message: 'Please fill out your phone #.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please enter your password', trigger: 'blur'}
        ]
      },

      submitLoginLoadingStatus: false,
      submitRegisterLoadingStatus: false,
      humanVerifyStatus: true,
      rememberValue: false,
      registerForm: {
        first_name: '',
        last_name: '',
        email: '',
        code: '',
        password: '',
        c_password: ''
      },
      registerRules: {
        first_name: [
          {required: true, message: 'Please fill out your first name.', trigger: 'blur'}
        ],
        last_name: [
          {required: true, message: 'Please fill out your last name.', trigger: 'blur'}
        ],
        code: [
          {required: true, message: 'Please fill out your code.', trigger: 'blur'}
        ],
        email: [
          {required: true, message: 'Please fill out your email address.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please enter your password', trigger: 'blur'}
        ],
        c_password: [
          {required: true, message: 'Please enter your password again', trigger: 'blur'}
        ]
      },
      registerPhoneForm: {
        first_name: '',
        last_name: '',
        phone: '',
        code: '',
        password: '',
        c_password: ''
      },
      registerPhoneRules: {
        first_name: [
          {required: true, message: 'Please fill out your first name.', trigger: 'blur'}
        ],
        last_name: [
          {required: true, message: 'Please fill out your last name.', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: 'Please fill out your phone #.', trigger: 'blur'}
        ],
        code: [
          {required: true, message: 'Please fill out your code', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please enter your password', trigger: 'blur'}
        ],
        c_password: [
          {required: true, message: 'Please enter your password again', trigger: 'blur'}
        ]
      },
      identityValue: 0,
      sendCodeLoading: false,
      showValue: 'login',
      businessDialogStatus:false

    }
  },
  components: {
    ForgotPassword
  },
  setup(props, context) {
    //hcaptcha,
    console.log(props)
    console.log(context)
    let router = useRouter()
    let route = useRoute()
    const getParams = () => {
      // console.log(route.query)
      return route.query;
    }

    const forgotDialogVisible = ref(false)

    const skipHomePage = () => {
      let a = route.query.redirect_params
      if (a) {
        let b = JSON.parse(decode(a))
        if (b.path) {
          return router.push({path: b.path, query: b.query})
        }
      }

      return router.push({path: '/overview'})
    }

    let value = route.query.type;
    const showType = value ? value : 'login'

    const store = useStore()
    const setCurrentUser = (data) => store.commit('currentUser', data)

    let checkCodeBtn = reactive(
        {
          text: 'Get Code',
          loading: false,
          disabled: false,
          duration: 10,
          timer: null
        }
    )

    const getCheckCodeTimer = () => {
      if (checkCodeBtn.duration !== 10) {
        checkCodeBtn.disabled = true
        checkCodeBtn.loading = true
      }
      // 清除定时器
      checkCodeBtn.timer && clearInterval(checkCodeBtn.timer)
      //开启定时器
      checkCodeBtn.timer = setInterval(() => {
        const tmp = checkCodeBtn.duration--
        checkCodeBtn.text = `${tmp} S`
        checkCodeBtn.loading = true
        checkCodeBtn.disabled = true
        if (tmp <= 0) {
          //清除定时器
          clearInterval(checkCodeBtn.timer)
          checkCodeBtn.duration = 10
          checkCodeBtn.text = 'Reacquire'
          // 设置按钮可以点击
          checkCodeBtn.disabled = false
          checkCodeBtn.loading = false
        }
        console.log(checkCodeBtn)
      }, 1000)
    }

    return {
      getParams,
      skipHomePage,
      showType,
      setCurrentUser,
      checkCodeBtn,
      getCheckCodeTimer,
      forgotDialogVisible
    }
  },
  beforeRouteUpdate(to){
    // console.log(to)
    if(to.query.email){
      this.loginForm.email = to.query.email
    }

  },
  mounted() {

    let email = this.$route.query.email
    if (email) {
      this.loginForm.email = email
    }

    let isAccountCookieExist = this.$cookies.isKey('account')
    console.log(isAccountCookieExist)
    if(isAccountCookieExist){
      let accountCookie = this.$cookies.get('account')
      this.rememberValue = true;

      if(accountCookie.type === 1){
        this.loginForm.email = accountCookie.email
        this.loginForm.password = accountCookie.password
      }

      if(accountCookie.type === 2){
        this.loginPhonePassForm.phone = accountCookie.phone
        this.loginPhonePassForm.password = accountCookie.password
      }
    }

  },
  created() {
    this.showValue = this.showType
  },
  methods: {
    turnHome(){
      this.$router.push('/')
    },
    changeType(e){
      e.target.type = 'password'
    },
    getCheckCode() {

      let params = {
        phone: this.loginPhoneSmsForm.phone
      }

      WEIXIN_SEND_SMS(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getCheckCodeTimer()
          this.$message.success('Success')
        }
      }).catch(err => {
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    getCheckCodeForRegister() {

      let params = {
        phone: this.registerPhoneForm.phone
      }

      WEIXIN_SEND_SMS(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getCheckCodeTimer()
          this.$message.success('Success')
        }
      }).catch(err => {
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    signUp(){
      this.$router.push('/edupassport/signup')
    },
    goHome() {
      this.$router.push('/')
    },
    rememberChange(e) {
      console.log(e)
    },
    humanVerify(response, responseKey) {
      // console.log(response);
      console.log(responseKey);
      this.$loading({
        text: 'Loading...'
      })
      let params = new FormData()
      params.append('secret', '0x55587f4f237ef6B48A96284Ee257D0AA3d828508')
      params.append('response', response)

      axios.post('/siteverify', params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        baseURL: '/hcaptcha',
        timeout: 100000
      }).then(res => {
        console.log(res)
        if (res.success) {
          this.$loading().close()
          this.humanVerifyStatus = true
          this.$message.success('Success')
        } else {
          this.$message.error('Fail')
          this.$loading().close()
        }

      })

    },
    sendEmailCode() {
      let self = this;
      let email = this.registerForm.email
      if (email) {

        let params = {
          email: email
        }
        self.sendCodeLoading = true
        SEND_EMAIL_CODE(params).then(res => {
          if (res.code == 200) {

            setTimeout(function () {
              self.sendCodeLoading = false
              self.$message.success('Activation Code Sent')
            }, 1500)
          }
        }).catch(err => {
          console.log(err)
          if(err.msg){
            this.$message.error(err.msg)
          }
          if(err.message){
            this.$message.error(err.message)
          }
        })
      }

    },
    selectEducationBusiness(){
      this.businessDialogStatus = true
      this.identityBusinessCheckedStatus = false
      this.identityValue = 0
    },
    submitIdentityBusiness(){
      if(this.identityValue == 0 ){
        return;
      }
      this.businessDialogStatus = false;
    },
    selectedIdentityBusiness(identity,identityName){
      this.businessDialogStatus = true;

      if(identity && identityName){
        this.identityBusinessCheckedStatus = true
        this.identityValue = identity
        this.identityBusinessStr = identityName
      }

    },
    closeBusinessDialog(){
      this.businessDialogStatus = false
      this.identityBusinessCheckedStatus = false
      this.identityValue = 0
      this.identityBusinessStr = 'Education-Business'
    },
    selectedIdentity(value) {
      console.log(value)
      this.identityBusinessCheckedStatus = false
      this.identityBusinessStr = 'Education-Business'
      this.businessDialogStatus = false;

      this.identityValue = value
    },
    rememberMeAction(data,type){
      // 1 email login 2 login by phone and password
      let isExists = this.$cookies.isKey('account')
      if(isExists){
        this.$cookies.remove('account')
      }

      if(this.rememberValue){

        let obj = {}
        if(type === 1){
          obj = {
            type:1,
            email:data.email,
            password:data.password
          }

        }

        if(type === 2){
          obj = {
            type:2,
            phone:data.phone,
            password:data.password
          }
        }

        this.$cookies.set('account',obj, 60 * 60 * 24 * 30)

      }


    },
    submitLoginForm(formName) {
      let self = this;
      if (self.humanVerifyStatus) {
        this.submitLoginLoadingStatus = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.loginForm)
            LOGIN_EMAIL_PWD_V2(params).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.rememberMeAction(params,1)

                let resMessage = res.message;
                // console.log(resMessage.company_id)
                localStorage.setItem('token', resMessage.token)
                localStorage.setItem('uid', resMessage.id)
                localStorage.setItem('identity', resMessage.identity)
                localStorage.setItem('language', resMessage.language)
                localStorage.setItem('email', resMessage.email)
                localStorage.setItem('company_id', resMessage.company_id)
                this.$store.commit('currentCompanyId', resMessage.company_id)

                if(resMessage.third_company_id){
                  localStorage.setItem('thirdCompanyId', resMessage.third_company_id)
                  this.$store.commit('thirdCompanyId',resMessage.third_company_id)
                }

                let identity = resMessage.identity;
                let firstName = resMessage.first_name;
                let lastName = resMessage.last_name;
                let currentAvatar = 'https://oss.esl-passport.cn/educator.png'

                localStorage.setItem('name', firstName + ' ' + lastName)
                localStorage.setItem('first_name', firstName)
                localStorage.setItem('last_name', lastName)

                this.$store.commit('identity',resMessage.identity)

                let currentUser = {
                  uuid: resMessage.id,
                  identity: identity,
                  name: firstName + ' ' + lastName,
                  avatar: currentAvatar,
                }
                // // console.log(currentUser)
                //
                this.setCurrentUser(currentUser)
                // localStorage.setItem('currentUser',JSON.stringify(currentUser));
                this.getUserMenuList(resMessage.id,identity, resMessage.company_id, resMessage.id)

                setTimeout(function () {
                  self.skipHomePage()
                  self.submitLoginLoadingStatus = false
                }, 1500)

              }
            }).catch(err => {
              console.log(err)

              if(err.message.status == 10001){

                this.$msgbox({
                  title:"Seems you dont have an account",
                  message:"would you like to sign up?",
                  dangerouslyUseHTMLString:false,
                  type:"warning",
                  center:true,
                  showCancelButton:true,
                  cancelButtonText:"No,thank you",
                  confirmButtonText:"Sign Up",
                  "round-button":true,
                  callback(action){
                    console.log(action)
                    if(action==='confirm'){
                      self.$router.push({path: '/edupassport/signup', query: {}})
                    }
                  }

                })

              }else{
                this.$message.error(err.msg)
              }
              this.submitLoginLoadingStatus = false
            })

          } else {
            console.log('error submit!!')
            this.submitLoginLoadingStatus = false
            return false
          }
        })

      }

    },
    submitLoginPhoneSmsForm(formName) {
      let self = this;
      if (self.humanVerifyStatus) {
        // this.submitLoginLoadingStatus = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.loginPhoneSmsForm)
            LOGIN_PHONE_SMS_V2(params).then(res => {
              console.log(res)
              if (res.code == 200) {

                let resMessage = res.message;

                localStorage.setItem('token', resMessage.token)
                localStorage.setItem('uid', resMessage.id)
                localStorage.setItem('identity', resMessage.identity)
                localStorage.setItem('language', resMessage.language)
                localStorage.setItem('phone', resMessage.phone)
                localStorage.setItem('company_id', resMessage.company_id)
                this.$store.commit('currentCompanyId', resMessage.company_id)

                if(resMessage.third_company_id){
                  localStorage.setItem('thirdCompanyId', resMessage.third_company_id)
                  this.$store.commit('thirdCompanyId',resMessage.third_company_id)
                }

                let identity = resMessage.identity

                let firstName =  resMessage.first_name
                let lastName = resMessage.last_name
                let currentAvatar = 'https://oss.esl-passport.cn/educator.png'

                localStorage.setItem('name', firstName + ' ' + lastName)
                localStorage.setItem('first_name', firstName)
                localStorage.setItem('last_name', lastName)

                this.$store.commit('identity',resMessage.identity)

                let currentUser = {
                  uuid: resMessage.id,
                  identity: identity,
                  name: firstName + ' ' + lastName,
                  avatar: currentAvatar,
                }
                // console.log(currentUser)

                this.setCurrentUser(currentUser)
                // localStorage.setItem('currentUser',JSON.stringify(currentUser));
                this.getUserMenuList(resMessage.id,identity, resMessage.company_id, resMessage.id)

                setTimeout(function () {
                  self.skipHomePage()
                  self.submitLoginLoadingStatus = false
                }, 1500)
              }
            }).catch(err => {
              console.log(err)
              if(err.message.status == 10001){

                this.$msgbox({
                  title:"Seems you dont have an account",
                  message:"would you like to sign up?",
                  dangerouslyUseHTMLString:false,
                  type:"warning",
                  center:true,
                  showCancelButton:true,
                  cancelButtonText:"No,thank you",
                  confirmButtonText:"Sign Up",
                  "round-button":true,
                  callback(action){
                    console.log(action)
                    if(action==='confirm'){
                      self.$router.push({path: '/edupassport/signup', query: {}})
                    }
                  }

                })

              }else{
                this.$message.error(err.msg)
              }

            })

          } else {
            console.log('error submit!!')
            this.submitLoginLoadingStatus = false
            return false
          }
        })

      }
    },
    submitLoginPhonePassForm(formName) {
      let self = this;
      if (self.humanVerifyStatus) {
        // this.submitLoginLoadingStatus = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.loginPhonePassForm)
            LOGIN_PHONE_PWD_V2(params).then(res => {
              console.log(res)
              if (res.code == 200) {

                this.rememberMeAction(params,2)

                let resMessage = res.message

                localStorage.setItem('token', resMessage.token)
                localStorage.setItem('uid', resMessage.id)
                localStorage.setItem('identity', resMessage.identity)
                localStorage.setItem('language', resMessage.language)
                localStorage.setItem('phone', resMessage.phone)
                localStorage.setItem('company_id', resMessage.company_id)
                this.$store.commit('currentCompanyId', resMessage.company_id)

                if(resMessage.third_company_id){
                  localStorage.setItem('thirdCompanyId', resMessage.third_company_id)
                  this.$store.commit('thirdCompanyId',resMessage.third_company_id)
                }

                let identity = resMessage.identity
                let firstName = resMessage.first_name
                let lastName = resMessage.last_name
                let currentAvatar = 'https://oss.esl-passport.cn/educator.png'

                localStorage.setItem('name', firstName + ' ' + lastName)
                localStorage.setItem('first_name', firstName)
                localStorage.setItem('last_name', lastName)

                this.$store.commit('identity',resMessage.identity)

                let currentUser = {
                  uuid: resMessage.id,
                  identity: identity,
                  name: firstName + ' ' + lastName,
                  avatar: currentAvatar,
                }
                // console.log(currentUser)

                this.setCurrentUser(currentUser)
                // localStorage.setItem('currentUser',JSON.stringify(currentUser));
                this.getUserMenuList(resMessage.id,identity, resMessage.company_id, resMessage.id)

                setTimeout(function () {
                  self.skipHomePage()
                  self.submitLoginLoadingStatus = false
                }, 1500)
              }
            }).catch(err => {
              console.log(err)
              if(err.message.status == 10001){

                this.$msgbox({
                  title:"Seems you dont have an account",
                  message:"would you like to sign up?",
                  dangerouslyUseHTMLString:false,
                  type:"warning",
                  center:true,
                  showCancelButton:true,
                  cancelButtonText:"No,thank you",
                  confirmButtonText:"Sign Up",
                  "round-button":true,
                  callback(action){
                    console.log(action)
                    if(action==='confirm'){
                      self.$router.push({path: '/edupassport/signup', query: {}})
                    }
                  }

                })

              }else{
                this.$message.error(err.msg)
              }

            })

          } else {
            console.log('error submit!!')
            this.submitLoginLoadingStatus = false
            return false
          }
        })

      }
    },
    getUserMenuList(uid,identity,companyId,cId){

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
          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData',str)
          this.$store.commit('menuData', res.message)
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    async submitEducatorContactForm(userId){

      let params = Object.assign({}, this.registerForm)

      let zohoData = [
        {'zf_referrer_name':''},
        {'zf_redirect_url':''},
        {'zc_gad':''},
        {'SingleLine':userId //UserID
        },
        {'SingleLine1':params.first_name // First Name
        },
        {'SingleLine2':params.last_name //  Last Name
        },
        {'Dropdown':'' //  Gender
        },
        {'Date':'' //   Date of Birth dd-MMM-yyyy
        },
        {'SingleLine3':'' //   Title
        },
        {'Email':params.email //   Email
        },
        {'PhoneNumber_countrycode':'' //   Phone
        },
        {'SingleLine4':'' //   Nationality
        },
        {'Dropdown1':'' //   Membership Type
        },
        {'MultiLine':'' //   Languages Spoken
        },
        {'Number':'' //   Membership Duration
        },
        {'SingleLine5':'' //   City
        },
        {'SingleLine6':'' //   Province
        },
        {'SingleLine7':'' //   Country
        },
        {'Dropdown2':'' //   Educator Type
        },
        {'MultiLine1':'' //   Education
        },
        {'MultiLine2':'' //    Work History
        },
        {'Dropdown3':'' //    Teaching Experience
        },
        {'MultiLine3':'' //   Certifications
        },
        {'MultiLine4':'' //   Educator Intro
        },
        {'Website':'' //   Contact image Link
        },
        {'Website1':'' //   Intro Video Link
        }
      ]

      let zohoParams = {
        zoho_data: zohoData,
        zoho_url: 'https://forms.zohopublic.com/edupassport/form/EducatorContactForm/formperma/G014C7ko-MpOp3A2vp6NZlgxhPbGj2HDtbzlZEI6cks/htmlRecords/submit'
      }

      await ZOHO_SYNC(zohoParams).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    async submitCompanyContactForm(userId){

      let params = Object.assign({}, this.registerForm)

      let zohoData = [
        {'zf_referrer_name':''},
        {'zf_redirect_url':''},
        {'zc_gad':''},
        {'SingleLine':userId  //UserID
        },
        {'SingleLine1':params.first_name  // First Name
        },
        {'SingleLine2':params.last_name  //  Last Name
        },
        {'Dropdown':'' //  Gender
        },
        {'Date':''  //   Date of Birth dd-MMM-yyyy params.birthday
        },
        {'SingleLine3':''  //   Title
        },
        {'Email':params.email  //   Email
        },
        {'PhoneNumber_countrycode':''  //   Phone
        },
        {'SingleLine4':''  //   Nationality
        },
        {'Dropdown1':''  //   Membership Type
        },
        {'Number':''  //   Membership Duration
        },
        {'SingleLine5':''  //   City
        },
        {'SingleLine6':''  //   Province
        },
        {'SingleLine7':''  //   Country
        },
        {'Website':'' //   Contact image Link
        }

      ]

      let zohoParams = {
        zoho_data: zohoData,
        zoho_url: 'https://forms.zohopublic.com/edupassport/form/CompanyContactForm/formperma/ZYHWpHeaRP511w85Ljl47AYAS77L3z9qcqUw4Wv48io/htmlRecords/submit'
      }

      await ZOHO_SYNC(zohoParams).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })

    },
    submitRegisterForm(formName) {

      let self = this;
      this.submitRegisterLoadingStatus = true;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(valid)
          let params = Object.assign({
            identity: self.identityValue
          }, this.registerForm)

          EMAIL_REGISTER_V2(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              // let userInfo = res.message
              // localStorage.setItem('uid',res.message.id)
              if (self.identityValue == 1) {
                this.submitEducatorContactForm(res.message.id)
              }
              if (self.identityValue == 2 || self.identityValue == 3
              || self.identityValue == 4 || self.identityValue == 5
              ) {
                this.submitCompanyContactForm(res.message.id)
              }

              self.submitRegisterLoadingStatus = false

              this.$msgbox({
                title:"All Set",
                message:"Let's get you logged in!",
                dangerouslyUseHTMLString:false,
                type:"success",
                center:true,
                confirmButtonText:"OK",
                "round-button":true,
                callback(action){
                  console.log(action)
                  if(action==='confirm'){
                    self.$router.push({path: '/edupassport', query: {type: 'login',email:self.registerForm.email}})
                    self.showValue = 'login'
                  }
                }

              })
              // window.location.reload()

            }

          }).catch(err => {
            console.log(err)
            self.submitRegisterLoadingStatus = false
            this.$message.error(err.msg)
          })

        } else {
          console.log('error submit!!')
          this.submitRegisterLoadingStatus = false
          return false
        }
      })
    },
    submitRegisterPhoneForm(formName) {

      let self = this;
      this.submitRegisterLoadingStatus = true;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(valid)
          let params = Object.assign({
            identity: self.identityValue
          }, this.registerPhoneForm)

          PHONE_REGISTER_V2(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              // let userInfo = res.message
              // localStorage.setItem('uid',res.message.id)
              if (self.identityValue == 1) {
                this.submitEducatorContactForm(res.message.id)
              }
              if (self.identityValue == 2 || self.identityValue == 3
                || self.identityValue == 4 || self.identityValue == 5
              ) {
                this.submitCompanyContactForm(res.message.id)
              }

              self.submitRegisterLoadingStatus = false

              this.$msgbox({
                title:"All Set",
                message:"Let's get you logged in!",
                dangerouslyUseHTMLString:false,
                type:"success",
                center:true,
                confirmButtonText:"OK",
                "round-button":true,
                callback(action){
                  console.log(action)
                  if(action==='confirm'){
                    self.$router.push({path: '/edupassport', query: {type: 'login',phone:self.registerPhoneForm.phone}})
                    self.showValue = 'login'
                  }
                }

              })
              // window.location.reload()

            }

          }).catch(err => {
            console.log(err)
            self.submitRegisterLoadingStatus = false
            this.$message.error(err.msg)
          })

        } else {
          console.log('error submit!!')
          this.submitRegisterLoadingStatus = false
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    switchLoginRegister(value) {
      this.showValue = value
    },
    async googleSignIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        this.user = googleUser.getBasicProfile().getEmail();
        console.log("getId", this.user);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
            "getAuthResponse",
            this.$gAuth.instance.currentUser.get().getAuthResponse()
        );

      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickGetAuthCode() {

      try {
        const authCode = await this.$gAuth.getAuthCode();
        console.log("authCode", authCode);
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    linkedinSignIn() {
      let client_id = process.env.VUE_APP_LINKEDIN_CLIENT_ID
      let response_type = process.env.VUE_APP_LINKEDIN_RESPONSE_TYPE
      let redirect_uri = process.env.VUE_APP_LINKEDIN_REDIRECT_URI
      // let redirect_uri = 'https://dev.esl-passport.cn/login/linkedin'
      let state = randomString()
      let scope = process.env.VUE_APP_LINKEDIN_SCOPE

      window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?response_type=' + response_type + '&client_id=' + client_id
          + '&redirect_uri=' + redirect_uri + '&state=' + state + '&scope=' + scope

    },
    loginWithPhone() {
      this.loginPhoneStatus = !this.loginPhoneStatus
      this.loginEmailStatus = !this.loginEmailStatus

    },
    switchToPhoneBySms() {
      this.loginByPhoneWithSmsStatus = !this.loginByPhoneWithSmsStatus
      this.loginByPhoneWithPasswordStatus = !this.loginByPhoneWithPasswordStatus
    },
    forgotPassword() {
      this.forgotDialogVisible = true
    },
    closeForgotDialog() {
      this.forgotDialogVisible = false
    }


  }

}

</script>

<style scoped>

.login-bg{
  min-height: 100vh;
  background-color: #F0F2F5;

}

.login-container{
  padding-top: 50px;
}

.login-l{
  padding-left: 50px;
  cursor: pointer;
}

.login-l-edu{
  font-family: BCExtraBold , "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:40px;
}

.login-l-passport{
  font-family: BCSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:17px;
}



.login-m{
  width:576px;
  margin:0 auto;
}

.login-m h1{
  text-align: center;
}

.xll-login-form-container{
  margin-top:67px;
}

.xll-divider{
  margin-top:50px;
}

.sign-in-btn-container{

}

.login-r{
  padding-right: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

}

.sign-up{

}
.sign-up-btn{
  font-size: 20px;
  color:#262626;
}

.login-close{
  margin-right: 20px;
}

.login-close-btn{
  font-size: 20px;
  color:#262626;
}


.create-account-link a {
  text-decoration: none;
  color: #00b3d2;
  padding: 10px;
  font-weight: bold;
}

.forgot-password-container {
  text-align: center;
}

.forgot-password-btn {

}

/deep/ .el-checkbox__label{
  font-family: BCM,"Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif !important;
  font-size: 20px;
}

.login-option-btn {
  font-family: BCM,"Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  width: 100%;
  font-size: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

.submit-btn {
  height: 40px;
  margin: 50px auto 0;
}

.remember-forgot-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.remember-container {
  text-align: left;
}

.hcaptcha-container {
  text-align: left;
  margin-top: 20px;
}


.login-require-star {
  color: #ff2870;
}

.login-label-text {
  padding-left: 4px;
}

.password-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.xll-input-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.xll-input-input {
  width: 70%;
}

.xll-input-btn {
  width: 26%;
}

/deep/ .el-divider__text{
  background-color: #F0F2F5;
}


@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px){

}
</style>
