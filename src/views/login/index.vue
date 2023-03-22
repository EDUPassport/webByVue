<template>
  <div class="login-bg">

    <el-row justify="center" align="top" class="login-container">

      <el-col class="login-l-col" :xs="24" :sm="24" :md="12" :lg="11" :xl="11">

        <div class="login-t" @click="turnHome()">
          <el-image class="login-t-logo" :src="imgLogo"></el-image>
        </div>

        <div class="login-m">

          <div class="login-m-label">Welcome back</div>
          <div class="login-m-tips">
            Welcome back! Please enter your details
          </div>

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
                <el-form-item label="Email" prop="email">
                  <el-input placeholder="Enter your email" v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password">
                  <el-input placeholder="Enter your password"
                            type="password"
                            show-password
                            v-model="loginForm.password"></el-input>
                </el-form-item>

                <div class="remember-forgot-container">
<!--                  <div class="remember-container">-->
<!--                    <el-checkbox size="large" v-model="rememberValue" label="Remember Me"-->
<!--                                 @change="rememberChange"></el-checkbox>-->
<!--                  </div>-->
                  <div class="forgot-password-container">
                    <el-button link class="forgot-password-btn" @click="forgotPassword()">
                      Forgot password?
                    </el-button>
                  </div>
                </div>

                <el-form-item>
                  <el-button class="submit-btn"
                             type="primary"
                             :loading="submitLoginLoadingStatus"
                             @click="submitLoginForm('loginForm')">
                    Sign in
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
                    <el-input placeholder="Phone #"
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
                          <el-button link @click="switchToPhoneBySms()">
                            Log in via password
                          </el-button>
                        </div>
                      </div>
                    </template>
                    <div class="xll-input-container">
                      <div class="xll-input-input">
                        <el-input placeholder="Code"
                                  v-model="loginPhoneSmsForm.code">
                        </el-input>
                      </div>
                      <el-button class="xll-input-btn" type="primary" round
                                 :loading="checkCodeBtn.loading"
                                 :disabled="checkCodeBtn.disabled"
                                 @click="getCheckCode()"
                      >{{ checkCodeBtn.text }}
                      </el-button>
                    </div>
                  </el-form-item>

                  <div class="remember-forgot-container">
<!--                    <div class="remember-container">-->
<!--                      <el-checkbox v-model="rememberValue" label="Remember Me" @change="rememberChange"></el-checkbox>-->
<!--                    </div>-->
                    <div class="forgot-password-container">
                      <el-button link class="forgot-password-btn" @click="forgotPassword()">Forgot password?
                      </el-button>
                    </div>
                  </div>

                  <el-form-item>
                    <el-button class="submit-btn"

                               type="primary"
                               @click="submitLoginPhoneSmsForm('loginPhoneSmsForm')">
                      Sign in
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
                    <el-input placeholder="Phone #"
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
                          <el-button link @click="switchToPhoneBySms()">
                            Log in via SMS verification code
                          </el-button>
                        </div>
                      </div>
                    </template>
                    <el-input placeholder="Password" type="password"
                              show-password
                              v-model="loginPhonePassForm.password"></el-input>
                  </el-form-item>

                  <div class="remember-forgot-container">
<!--                    <div class="remember-container">-->
<!--                      <el-checkbox v-model="rememberValue" label="Remember Me" @change="rememberChange"></el-checkbox>-->
<!--                    </div>-->
                    <div class="forgot-password-container">
                      <el-button link class="forgot-password-btn" @click="forgotPassword()">
                        Forgot password?
                      </el-button>
                    </div>
                  </div>

                  <el-form-item>
                    <el-button class="submit-btn"

                               type="primary"
                               @click="submitLoginPhonePassForm('loginPhonePassForm')">
                      Sign in
                    </el-button>
                  </el-form-item>

                </el-form>
              </template>
            </template>

            <div class="xll-divider" v-if="isFromChinaEnv === 'yes' ">
              <el-divider content-position="center">OR</el-divider>
            </div>

            <div class="sign-in-btn-container" v-if="isFromChinaEnv === 'yes' ">
              <el-button v-if="!loginPhoneStatus"
                         @click="loginWithPhone()"
                         class="login-option-btn" plain>
                <template #icon>
                  <el-icon>
                    <IconBytesizeMobile/>
                  </el-icon>
                </template>

                Sign in with phone number
              </el-button>
              <el-button v-if="!loginEmailStatus"
                         @click="loginWithPhone()"
                         class="login-option-btn"
                         plain
              >
                <template #icon>
                  <el-icon>
                    <IconCarbonEmail/>
                  </el-icon>
                </template>
                Sign in with Email
              </el-button>
            </div>

            <!--            <div class="sign-in-btn-container">-->
            <!--              <el-button @click="linkedinSignIn()"-->
            <!--                        -->
            <!--                         class="login-option-btn" link round-->
            <!--                         >-->
            <!--                <template #icon>-->
            <!--                  <el-icon>-->
            <!--                    <IconLogosLinkedinIcon />-->
            <!--                  </el-icon>-->
            <!--                </template>-->
            <!--                 SIGN IN WITH LINKEDIN-->
            <!--              </el-button>-->
            <!--            </div>-->

            <div class="sign-in-btn-container">
              <GoogleLogin style="width: 100%;"
                           class="login-option-btn"
                           :callback="googleSignInWithCode">
                <el-button plain style="width: 100%;" >
                  <template #icon>
                    <el-icon>
                      <IconLogosGoogleIcon></IconLogosGoogleIcon>
                    </el-icon>
                  </template>
                  Sign in with Google
                </el-button>
              </GoogleLogin>

            </div>
            <div class="sign-in-btn-container">
              <GoogleLogin class="login-option-btn"
                           style="width: 100%;"
                           :callback="googleSignIn"
                           :auto-login="false"
                           :prompt="false"
                           :button-config="{type:'standard',locale: 'en-US',text:'signin_with'}" />
            </div>

          </div>

          <div class="login-sign-up-container">
            Don't have an account?
            <el-button link @click="signUp()">Sign up</el-button>
          </div>

        </div>

        <div class="login-copyright">
          © EDU Passport 2023
        </div>

      </el-col>

      <el-col :xs="0" :sm="0" :md="12" :lg="13" :xl="13">
        <div class="login-r-images">
          <el-image class="login-r-image" :src="loginRImage" fit="cover"></el-image>
          <div class="login-r-image-mask">
            <div class="login-r-image-mask-content">
              <div class="login-r-image-mask-title">
                “As an Educator, EDU Passport has been my go-to platform for all things education.”
              </div>
              <div class="login-r-image-mask-name">
                Abigel Dawn
              </div>
              <div class="login-r-image-mask-position">
                English Educator
              </div>
            </div>

          </div>
        </div>
      </el-col>

    </el-row>

    <ForgotPassword :isShow="forgotDialogVisible" @close="closeForgotDialog()"></ForgotPassword>

    <el-dialog v-model="loginErrorDialogVisible" :width="loginErrorDialogWidthValue">
      <div class="login-error-container">
        <h4>
          Welcome Back!
        </h4>
        <p>
          Oops, your username or password is wrong

        </p>

        <div class="login-error-ok-container">
          <el-button plain round @click="loginErrorHelp()">GET HELP</el-button>
          <el-button type="primary" round @click="loginErrorOk()">OK</el-button>
        </div>

      </div>

    </el-dialog>

  </div>

</template>

<script>

// import {hcaptcha} from "@shubhamranjan/vue-hcaptcha";
import logoImgLight from "@/assets/newHome/logo/Logo_Transparent.png"
import loginRImage from "@/assets/newHome/login/r-image.png"
import imgLogo from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
//WEIXIN_SEND_SMS
import {
  EMAIL_REGISTER_V2,
  SEND_EMAIL_CODE,
  WEIXIN_SEND_SMS,
  LOGIN_EMAIL_PWD_V2,
  PHONE_REGISTER_V2,
  LOGIN_PHONE_SMS_V2,
  LOGIN_PHONE_PWD_V2,
  USER_MENU_LIST,
  SEND_USER_PRIVATE_PASSWORD,
  EDUCATOR_PERCENTAGE_V2,
  RECRUITER_PERCENTAGE_V2,
  SCHOOL_PERCENTAGE_V2,
  OTHER_PERCENTAGE_V2,
  VENDOR_PERCENTAGE_V2, GOOGLE_CALLBACK_API
} from "@/api/api";
//LINKEDIN_CODE
import {useRoute, useRouter} from "vue-router";
import axios from "axios";

import {randomString} from '@/utils'
import {useStore} from 'vuex'
import {reactive, ref} from "vue";
import {decode} from "js-base64";
import ForgotPassword from '@/components/forgotPassword'
import { decodeCredential } from 'vue3-google-login'
export default {
  name: "index",
  data() {
    return {
      isFromChinaEnv: process.env.VUE_APP_CHINA,
      loginErrorDialogWidthValue: '50%',
      loginErrorDialogVisible: false,
      imgLogo,
      logoImgLight,
      loginRImage,
      identityBusinessCheckedStatus: false,
      identityBusinessStrBefore: "",
      identityBusinessStr: 'Education-Business',
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
          {type: 'email', required: true, message: 'Enter a valid email address', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Invalid password', trigger: 'blur'}
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
          {type: 'email', required: true, message: 'Please fill out your email address.', trigger: 'blur'}
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
      businessDialogStatus: false

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
  beforeRouteUpdate(to) {
    // console.log(to)
    if (to.query.email) {
      this.loginForm.email = to.query.email
    }

  },
  unmounted() {
    window.onresize = null
  },
  mounted() {

    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      this.loginErrorDialogWidthValue = '90%'
    }

    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        this.loginErrorDialogWidthValue = '90%'
      }
    }


    let email = this.$route.query.email
    if (email) {
      this.loginForm.email = email
    }

    let isAccountCookieExist = this.$cookies.isKey('account')

    if (isAccountCookieExist) {
      let accountCookie = this.$cookies.get('account')
      this.rememberValue = true;

      if (accountCookie.type === 1) {
        this.loginForm.email = accountCookie.email
        this.loginForm.password = accountCookie.password
      }

      if (accountCookie.type === 2) {
        this.loginPhonePassForm.phone = accountCookie.phone
        this.loginPhonePassForm.password = accountCookie.password
      }
    }



  },
  created() {
    this.showValue = this.showType
  },
  methods: {

    loginErrorOk() {
      this.loginErrorDialogVisible = false
    },
    loginErrorHelp() {
      window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')

    },
    sendPrivatePassword(email) {

      let params = {
        email: email
      }
      SEND_USER_PRIVATE_PASSWORD(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    turnHome() {
      this.$router.push('/')
    },
    changeType(e) {
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
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
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
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })

    },
    signUp() {
      this.$router.push('/signup')
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
          if (err.msg) {
            this.$message.error(err.msg)
          }
          if (err.message) {
            this.$message.error(err.message)
          }
        })
      }

    },
    selectEducationBusiness() {
      this.businessDialogStatus = true
      this.identityBusinessCheckedStatus = false
      this.identityValue = 0
    },
    submitIdentityBusiness() {
      if (this.identityValue == 0) {
        return;
      }
      this.businessDialogStatus = false;
    },
    selectedIdentityBusiness(identity, identityName) {
      this.businessDialogStatus = true;

      if (identity && identityName) {
        this.identityBusinessCheckedStatus = true
        this.identityValue = identity
        this.identityBusinessStr = identityName
      }

    },
    closeBusinessDialog() {
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
    rememberMeAction(data, type) {
      // 1 email login 2 login by phone and password
      let isExists = this.$cookies.isKey('account')
      if (isExists) {
        this.$cookies.remove('account')
      }

      if (this.rememberValue) {

        let obj = {}
        if (type === 1) {
          obj = {
            type: 1,
            email: data.email,
            password: data.password
          }

        }

        if (type === 2) {
          obj = {
            type: 2,
            phone: data.phone,
            password: data.password
          }
        }

        this.$cookies.set('account', obj, 60 * 60 * 24 * 30)

      }


    },
    handleSetCurrentUser(uid, identity, companyId, firstName, lastName, avatar) {

      let uuid = uid + '#' + identity + '#' + companyId
      let name = firstName + ' ' + lastName

      let currentUser = {
        uuid: uuid,
        name: name,
        avatar: avatar
      }

      this.setCurrentUser(currentUser)

    },
    storageLoginUserInfo(resMessage) {

      let self = this;

      let identity = resMessage.identity;
      let firstName = resMessage.first_name;
      let lastName = resMessage.last_name;
      let avatar = 'https://oss.esl-passport.cn/educator.png'
      let companyId = resMessage.company_id;

      let name = firstName + ' ' + lastName
      let companyName = ''

      localStorage.setItem('token', resMessage.token)
      localStorage.setItem('uid', resMessage.id)
      localStorage.setItem('identity', resMessage.identity)
      localStorage.setItem('language', resMessage.language)
      localStorage.setItem('email', resMessage.email)
      localStorage.setItem('company_id', resMessage.company_id)
      localStorage.setItem('name', name)
      localStorage.setItem('first_name', firstName)
      localStorage.setItem('last_name', lastName)

      if (identity == 1) {
        avatar = resMessage.headimgurl;
        companyName = firstName + ' ' + lastName;
        this.updateEducatorPercentage()
      }
      if (identity == 2) {
        avatar = resMessage.recruiting_info.logo;
        companyName = resMessage.recruiting_info.company_name;
        this.updateRecruiterPercentage()
      }
      if (identity == 3) {
        avatar = resMessage.school_info.logo;
        companyName = resMessage.school_info.company_name;
        this.updateSchoolPercentage()
      }
      if (identity == 4) {
        avatar = resMessage.other_info.logo;
        companyName = resMessage.other_info.company_name;
        this.updateOtherPercentage()
      }
      if (identity == 5) {
        avatar = resMessage.vendor_info.logo;
        companyName = resMessage.vendor_info.company_name;
        this.updateVendorPercentage()
      }

      this.$store.commit('currentCompanyId', resMessage.company_id)

      if (resMessage.third_company_id) {
        localStorage.setItem('thirdCompanyId', resMessage.third_company_id)
        this.$store.commit('thirdCompanyId', resMessage.third_company_id)
      }

      this.$store.commit('username', name)
      this.$store.commit('userAvatar', avatar)
      this.$store.commit('identity', resMessage.identity)
      this.$store.commit('companyName', companyName)
      this.$store.commit('changeThirdCompanyStatus', resMessage.is_third_company)

      this.handleSetCurrentUser(resMessage.id, identity, companyId, firstName, lastName, avatar)
      this.getUserMenuList(resMessage.id, identity, resMessage.company_id, resMessage.id)

      setTimeout(function () {
        self.skipHomePage()
        self.submitLoginLoadingStatus = false
      }, 1500)

    },
    updateEducatorPercentage() {
      let params = {
        token: localStorage.getItem('token')
      }
      EDUCATOR_PERCENTAGE_V2(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    updateRecruiterPercentage() {
      let params = {
        token: localStorage.getItem('token')
      }
      RECRUITER_PERCENTAGE_V2(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    updateSchoolPercentage() {
      let params = {
        token: localStorage.getItem('token')
      }
      SCHOOL_PERCENTAGE_V2(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    updateOtherPercentage() {
      let params = {
        token: localStorage.getItem('token')
      }
      OTHER_PERCENTAGE_V2(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    updateVendorPercentage() {
      let params = {
        token: localStorage.getItem('token')
      }

      VENDOR_PERCENTAGE_V2(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
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
                this.rememberMeAction(params, 1)

                let resMessage = res.message;

                this.storageLoginUserInfo(resMessage)

              }
            }).catch(err => {
              console.log(err)

              if (err.message.status == 10001) {

                this.$msgbox({
                  title: "Seems you dont have an account",
                  message: "would you like to sign up?",
                  dangerouslyUseHTMLString: false,
                  type: "warning",
                  center: true,
                  showCancelButton: true,
                  cancelButtonText: "No,thank you",
                  confirmButtonText: "Sign Up",
                  "round-button": true,
                  callback(action) {
                    console.log(action)
                    if (action === 'confirm') {
                      self.$router.push({path: '/signup', query: {}})
                    }
                  }

                })

              } else {

                this.loginErrorDialogVisible = true;

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

                if (resMessage.third_company_id) {
                  localStorage.setItem('thirdCompanyId', resMessage.third_company_id)
                  this.$store.commit('thirdCompanyId', resMessage.third_company_id)
                }

                let identity = resMessage.identity

                let firstName = resMessage.first_name
                let lastName = resMessage.last_name
                let currentAvatar = 'https://oss.esl-passport.cn/educator.png'
                let companyId = resMessage.company_id

                localStorage.setItem('name', firstName + ' ' + lastName)
                localStorage.setItem('first_name', firstName)
                localStorage.setItem('last_name', lastName)

                this.$store.commit('identity', resMessage.identity)

                this.handleSetCurrentUser(resMessage.id, identity, companyId, firstName, lastName, currentAvatar)

                // localStorage.setItem('currentUser',JSON.stringify(currentUser));
                this.getUserMenuList(resMessage.id, identity, resMessage.company_id, resMessage.id)

                setTimeout(function () {
                  self.skipHomePage()
                  self.submitLoginLoadingStatus = false
                }, 1500)
              }
            }).catch(err => {
              console.log(err)
              if (err.message.status == 10001) {

                this.$msgbox({
                  title: "Seems you dont have an account",
                  message: "would you like to sign up?",
                  dangerouslyUseHTMLString: false,
                  type: "warning",
                  center: true,
                  showCancelButton: true,
                  cancelButtonText: "No,thank you",
                  confirmButtonText: "Sign Up",
                  "round-button": true,
                  callback(action) {
                    console.log(action)
                    if (action === 'confirm') {
                      self.$router.push({path: '/signup', query: {}})
                    }
                  }

                })

              } else {
                this.loginErrorDialogVisible = true;
                // this.$message.error(err.msg)
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

                this.rememberMeAction(params, 2)

                let resMessage = res.message

                localStorage.setItem('token', resMessage.token)
                localStorage.setItem('uid', resMessage.id)
                localStorage.setItem('identity', resMessage.identity)
                localStorage.setItem('language', resMessage.language)
                localStorage.setItem('phone', resMessage.phone)
                localStorage.setItem('company_id', resMessage.company_id)
                this.$store.commit('currentCompanyId', resMessage.company_id)

                if (resMessage.third_company_id) {
                  localStorage.setItem('thirdCompanyId', resMessage.third_company_id)
                  this.$store.commit('thirdCompanyId', resMessage.third_company_id)
                }

                let identity = resMessage.identity
                let firstName = resMessage.first_name
                let lastName = resMessage.last_name
                let currentAvatar = 'https://oss.esl-passport.cn/educator.png'
                let companyId = resMessage.company_id

                localStorage.setItem('name', firstName + ' ' + lastName)
                localStorage.setItem('first_name', firstName)
                localStorage.setItem('last_name', lastName)

                this.$store.commit('identity', resMessage.identity)

                this.handleSetCurrentUser(resMessage.id, identity, companyId, firstName, lastName, currentAvatar)

                // localStorage.setItem('currentUser',JSON.stringify(currentUser));
                this.getUserMenuList(resMessage.id, identity, resMessage.company_id, resMessage.id)

                setTimeout(function () {
                  self.skipHomePage()
                  self.submitLoginLoadingStatus = false
                }, 1500)
              }
            }).catch(err => {
              console.log(err)
              if (err.message.status == 10001) {

                this.$msgbox({
                  title: "Seems you dont have an account",
                  message: "would you like to sign up?",
                  dangerouslyUseHTMLString: false,
                  type: "warning",
                  center: true,
                  showCancelButton: true,
                  cancelButtonText: "No,thank you",
                  confirmButtonText: "Sign Up",
                  "round-button": true,
                  callback(action) {
                    console.log(action)
                    if (action === 'confirm') {
                      self.$router.push({path: '/signup', query: {}})
                    }
                  }

                })

              } else {
                this.loginErrorDialogVisible = true;
                // this.$message.error(err.msg)
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

              self.submitRegisterLoadingStatus = false

              this.$msgbox({
                title: "All Set",
                message: "Let's get you logged in!",
                dangerouslyUseHTMLString: false,
                type: "success",
                center: true,
                confirmButtonText: "OK",
                "round-button": true,
                callback(action) {
                  console.log(action)
                  if (action === 'confirm') {
                    self.$router.push({path: '/login', query: {type: 'login', email: self.registerForm.email}})
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

              self.submitRegisterLoadingStatus = false

              this.$msgbox({
                title: "All Set",
                message: "Let's get you logged in!",
                dangerouslyUseHTMLString: false,
                type: "success",
                center: true,
                confirmButtonText: "OK",
                "round-button": true,
                callback(action) {
                  console.log(action)
                  if (action === 'confirm') {
                    self.$router.push({path: '/login', query: {type: 'login', phone: self.registerPhoneForm.phone}})
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
    googleSignInWithCode(response){
      console.log("Handle the response", response)
      let params = Object.assign({},response)
      GOOGLE_CALLBACK_API(params).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })

    },
    googleSignIn(response){
      const userData = decodeCredential(response.credential)
      console.log("Handle the userData", userData)
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
      this.$router.push({path:'/forgot/password',query:{ }})
      // this.forgotDialogVisible = true
    },
    closeForgotDialog() {
      this.forgotDialogVisible = false
    }


  }

}

</script>

<style scoped>

.login-bg {
  height: var(--i-window-height);
  position: relative;
  background-color: #FFFFFF;
}

.login-container {
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
}

.login-l-col{
  display: flex;
  flex-direction: column;
}

.login-t {
  padding: 32px 0 0 40px;
  cursor: pointer;
}

.login-t-logo {
  width: 180px;
}

.login-m {
  width: 360px;
  margin: 120px auto 0;
}

.login-m-label {
  text-align: center;
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  color: #101828;
}

.login-m-tips {

  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;

  text-align: center;
  color: #667085;
  margin-top: 12px;

}

.login-sign-up-container {
  margin-top: 20px;

  font-family: Inter, Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #667085;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.login-r-images {
  overflow: hidden;
  height: 100%;
  position: relative;
}

.login-r-image {
  width: 100%;
  height: 100%;
}

.login-r-image-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  background: linear-gradient(0.7deg, rgba(105, 65, 198, 0.3) 0.59%, rgba(105, 65, 198, 0) 99.39%);

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.login-r-image-mask-content {
  margin: 60px;
}

.login-r-image-mask-title {

  font-family: Inter, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 56px;

  letter-spacing: -0.02em;

  color: #FFFFFF;
  margin-bottom: 40px;
}

.login-r-image-mask-name {
  font-family: 'Work Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;

  color: #FFFFFF;

  margin-bottom: 10px;

}

.login-r-image-mask-position {
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;

  color: #EAECF0;
}

.login-copyright {
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;

  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;

  color: #667085;

  margin-top: auto;
  margin-left: 40px;
  margin-bottom: 25px;
}

.xll-login-form-container {
  margin-top: 40px;
}

.xll-divider {
  margin-top: 24px;
}

.forgot-password-container {
  text-align: center;
}

.forgot-password-btn {
  font-family: 'Poppins', Inter, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 12px;
  color: #6941C6;
}

/deep/ .el-checkbox__label {
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif !important;
  font-size: 14px;
}

.login-option-btn {

  width: 100%;

  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

.submit-btn {
  width: 100%;
  margin: 30px auto 0;
}

.remember-forgot-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

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

/deep/ .el-divider__text {
  background-color: #FFFFFF;
  color: #D0D5DD;
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.login-error-container {
  text-align: center;
}

.login-error-container h4 {
  margin-bottom: 25px;
}

.login-error-container p {
  font-size: 20px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.login-error-ok-container {
  margin-top: 25px;
}

.login-error-ok-container button {
  width: 100px;
}



@keyframes gradientBG {
   0% {
     background-position: 0% 50%;
   }
   50% {
     background-position: 100% 50%;
   }
   100% {
     background-position: 0% 50%;
   }
 }


@media screen and (min-width: 992px ) and (max-width: 1399px) {
  .login-m {
    width: 360px;
    margin: 100px auto 25px;
  }
}


@media screen and (max-width: 768px) {

   .login-m{
     width:auto;
     margin: 100px 25px 0 25px;
   }

  .xll-login-form-container{
    margin-top: 40px;
  }

  .submit-btn{
    margin-top: 25px;
  }

  .xll-divider{
    margin-top: 25px;
  }


}
</style>
