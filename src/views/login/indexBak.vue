<template>
  <div class="bg">
    <el-container class="login-container">
      <el-header class="container-1" height="auto">
        <el-row justify="center" align="middle">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="logo-container">
              <router-link class="logo-title" to="/">
                <el-image class="logo-img" :src="imgLogo" fit="contain"></el-image>
              </router-link>
            </div>
          </el-col>
        </el-row>
        <div class="go-home-container">
          <el-button class="go-home-btn" type="primary" round @click="goHome()">Home</el-button>
        </div>
      </el-header>
      <el-main>
        <el-row class="xll-login-row-container" justify="center" align="middle" v-if="showValue == 'login' ">
          <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
            <div class="xll-login-container">
              <div class="login-tabs-container">
                <div class="login-label"
                     :class="showValue=='login' ? 'login-tab-active' : ''"
                     @click="switchLoginRegister('login')"
                >Login
                </div>
                <div class="register-label"
                     :class="showValue=='sign-up' ? 'login-tab-active' : ''"
                     @click="switchLoginRegister('sign-up')"
                >Register
                </div>
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
                      <el-input size="medium" placeholder="Email" v-model="loginForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                      <el-input size="medium" placeholder="Password" type="password"
                                show-password
                                v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <div class="remeber-container">
                      <el-checkbox v-model="remeberValue" label="Remeber Me" @change="remeberChange"></el-checkbox>
                    </div>
                    <!--                          <div class="hcaptcha-container">-->
                    <!--                            <hcaptcha-->
                    <!--                                sitekey="ad946ce8-55f2-4b65-97d5-0c42eccf794d"-->
                    <!--                                @verify="humanVerify"-->
                    <!--                            />-->
                    <!--                          </div>-->
                    <el-form-item>
                      <el-button class="submit-btn"
                                 round
                                 type="primary"
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
                        <el-input size="medium" placeholder="Phone #"
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
                              <el-button type="text" @click="switchToPhoneBySms()">
                                Log in via password
                              </el-button>
                            </div>
                          </div>
                        </template>
                        <div class="xll-input-container">
                          <div class="xll-input-input">
                            <el-input size="medium" placeholder="Code"
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

                      <div class="remeber-container">
                        <el-checkbox v-model="remeberValue" label="Remeber Me" @change="remeberChange"></el-checkbox>
                      </div>

                      <el-form-item>
                        <el-button class="submit-btn"
                                   round
                                   type="primary"
                                   @click="submitLoginPhoneSmsForm('loginPhoneSmsForm')">
                          Login
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
                        <el-input size="medium" placeholder="Phone #"
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
                              <el-button type="text" @click="switchToPhoneBySms()">
                                Log in via SMS verification code
                              </el-button>
                            </div>
                          </div>
                        </template>
                        <el-input size="medium" placeholder="Password" type="password"
                                  show-password
                                  v-model="loginPhonePassForm.password"></el-input>
                      </el-form-item>

                      <div class="remeber-container">
                        <el-checkbox v-model="remeberValue" label="Remeber Me" @change="remeberChange"></el-checkbox>
                      </div>
                      <el-form-item>
                        <el-button class="submit-btn"
                                   round
                                   type="primary"
                                   @click="submitLoginPhonePassForm('loginPhonePassForm')">
                          Login
                        </el-button>
                      </el-form-item>
                    </el-form>
                  </template>
                </template>


                <!--                <div class="facebook-btn-container">-->
                <!--                  <el-button @click="linkedinSignIn()" class="apple-btn" plain round-->
                <!--                             icon="iconfont  el-icon-alifacebook">-->
                <!--                    Facebook Sign in-->
                <!--                  </el-button>-->
                <!--                </div>-->
                <div class="phone-btn-container">
                  <el-button v-if="!loginPhoneStatus" @click="loginWithPhone()" class="login-option-btn" plain round
                             icon="iconfont xll-icon el-icon-aliphone">
                    Login with Phone number
                  </el-button>
                  <el-button v-if="!loginEmailStatus" @click="loginWithPhone()" class="login-option-btn" plain round
                             icon="iconfont xll-icon  el-icon-aliemail">
                    Login with Email
                  </el-button>
                </div>

                <div class="facebook-btn-container">
                  <el-button @click="linkedinSignIn()" class="login-option-btn" plain round
                             icon="iconfont xll-icon  el-icon-alilinkedin">
                    Linkedin Sign in
                  </el-button>
                </div>

                <div class="google-btn-container">
                  <el-button @click="googleSignIn()" class="login-option-btn" plain round
                             icon="iconfont xll-icon  el-icon-aligoogle">
                    Google Sign in
                  </el-button>
                </div>

                <div class="forgot-password-container">
                  <el-button type="text" class="forgot-password-btn" @click="forgotPassword()">Forgot Password
                  </el-button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="0" :sm="0" :md="14" :lg="14" :xl="14">
            <div class="xll-ads-container">
              <!--              <el-image :src="shanghaiImg" class="ads-image" ></el-image>-->
            </div>
          </el-col>
        </el-row>

        <el-row class="xll-register-row-container" justify="center" align="middle" v-if="showValue == 'sign-up' ">
          <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
            <div class="xll-register-container">
              <div class="login-tabs-container">
                <div class="login-label"
                     :class="showValue=='login' ? 'login-tab-active' : ''"
                     @click="switchLoginRegister('login')"
                >Login
                </div>
                <div class="register-label"
                     :class="showValue=='sign-up' ? 'login-tab-active' : ''"
                     @click="switchLoginRegister('sign-up')"
                >Register
                </div>
              </div>
              <div class="xll-register-form-container">
                <template v-if="loginEmailStatus">
                  <el-form
                      :model="registerForm"
                      :rules="registerRules"
                      ref="registerForm"
                      label-width="160px"
                      label-position="top"
                      class="demo-ruleForm"
                  >
                    <el-form-item label="First Name" prop="first_name" required>
                      <el-input size="medium" placeholder="First Name" v-model="registerForm.first_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Last Name" prop="last_name" required>
                      <el-input size="medium" placeholder="Last Name" v-model="registerForm.last_name"></el-input>
                    </el-form-item>

                    <el-form-item label="Email" prop="email" required>
                      <el-input size="medium" placeholder="name@domain.com"
                                v-model="registerForm.email">
                        <template #append>
                          <el-button class="send-code-btn" :loading="sendCodeLoading" @click="sendEmailCode">Send Code
                          </el-button>
                        </template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Email Activation Code" prop="code" required>
                      <el-input size="medium" placeholder="6 digit code"
                                v-model="registerForm.code"></el-input>
                    </el-form-item>

                    <el-form-item label="Password" prop="password" required>
                      <el-input size="medium" placeholder="Password"
                                show-password
                                type="password"
                                v-model="registerForm.password"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm Password" prop="c_password" required>
                      <el-input size="medium" type="password" placeholder="Confirm"
                                show-password
                                v-model="registerForm.c_password"
                      ></el-input>
                    </el-form-item>
                    <div class="identity-container">
                      <div class="identity-label">I am a/an</div>
                      <div class="identity-content">
                        <div class="identity-btn"
                             :class="identityValue == 1 ? 'identity-educator-active' : '' "
                             @click="selectedIdentity(1)">Educator
                        </div>
                        <template v-if="identityBusinessCheckedStatus">
                          <div class="identity-btn identity-btn-margin"
                               :class="identityBusinessCheckedStatus ? 'identity-business-active' : '' "
                               @click="businessDialogStatus=true">
                            {{identityBusinessStr}}
                          </div>
                        </template>
                        <template v-else>
                          <div class="identity-btn identity-btn-margin"  @click="selectEducationBusiness()">
                            {{identityBusinessStr}}
                          </div>
                        </template>
                        <div class="identity-btn identity-btn-margin"
                             :class="identityValue == 5 ? 'identity-vendor-active' : '' "
                             @click="selectedIdentity(5)">Vendor
                        </div>
                      </div>

                      <div class="business-dialog-container" v-if="businessDialogStatus">
                        <div class="business-dialog-close" @click="closeBusinessDialog()">
                          <el-icon :size="30" >
                            <circle-close />
                          </el-icon>
                        </div>
                        <h3>Welcome Education Business</h3>
                        <span>Which would you say best describes your business? </span>
                        <div class="business-identity-container">
                          <div class="business-identity-item"
                               @click="selectedIdentityBusiness(2,'Recruiter')"
                               :class="identityValue == 2 ? 'identity-business-active' : '' "
                          >Recruiter</div>
                          <div class="business-identity-item"
                               @click="selectedIdentityBusiness(3,'School')"
                               :class="identityValue == 3 ? 'identity-business-active' : '' "
                          >School</div>
                          <div class="business-identity-item"
                               @click="selectedIdentityBusiness(4,'Other')"
                               :class="identityValue == 4 ? 'identity-business-active' : '' "
                          >Other</div>
                        </div>

                        <div class="business-dialog-btn-container">
                          <el-button class="business-dialog-submit-btn" type="primary" round
                                     @click="submitIdentityBusiness()"
                          >Submit</el-button>
                        </div>
                      </div>

                    </div>

                    <el-form-item>
                      <el-button class="submit-btn"
                                 type="primary"
                                 round
                                 :loading="submitRegisterLoadingStatus"
                                 @click="submitRegisterForm('registerForm')">
                        Submit
                      </el-button>
                    </el-form-item>
                  </el-form>

                </template>

                <template v-if="loginPhoneStatus">
                  <el-form
                      :model="registerPhoneForm"
                      :rules="registerPhoneRules"
                      ref="registerPhoneForm"
                      label-width="160px"
                      label-position="top"
                      class="demo-ruleForm"
                  >
                    <el-form-item label="First Name" prop="first_name" required>
                      <el-input size="medium" placeholder="First Name" v-model="registerPhoneForm.first_name"></el-input>
                    </el-form-item>
                    <el-form-item label="Last Name" prop="last_name" required>
                      <el-input size="medium" placeholder="Last Name" v-model="registerPhoneForm.last_name"></el-input>
                    </el-form-item>

                    <el-form-item label="Phone #" prop="phone">
                      <el-input size="medium" placeholder="Phone #"
                                v-model="registerPhoneForm.phone"></el-input>
                    </el-form-item>

                    <el-form-item label="6 Digit Code" prop="phone_code">
                      <template #label>
                        <div class="password-container">
                          <div class="password-l">
                            <span class="login-require-star">*</span>
                            <span class="login-label-text">6 Digit Code</span>
                          </div>
                          <div class="password-r">

                          </div>
                        </div>
                      </template>
                      <div class="xll-input-container">
                        <div class="xll-input-input">
                          <el-input size="medium" placeholder="Code"
                                    v-model="registerPhoneForm.code">
                          </el-input>
                        </div>
                        <el-button class="xll-input-btn" type="primary" round
                                   :loading="checkCodeBtn.loading"
                                   :disabled="checkCodeBtn.disabled"
                                   @click="getCheckCodeForRegister()"
                        >{{ checkCodeBtn.text }}
                        </el-button>
                      </div>
                    </el-form-item>

                    <el-form-item label="Password" prop="password" required>
                      <el-input size="medium" placeholder="Password"
                                show-password
                                type="password"
                                v-model="registerPhoneForm.password"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm Password" prop="c_password" required>
                      <el-input size="medium" type="password" placeholder="Confirm"
                                show-password
                                v-model="registerPhoneForm.c_password"
                      ></el-input>
                    </el-form-item>
                    <div class="identity-container">
                      <div class="identity-label">I am a/an</div>
                      <div class="identity-content">
                        <div class="identity-btn"
                             :class="identityValue == 1 ? 'identity-educator-active' : '' "
                             @click="selectedIdentity(1)">Educator
                        </div>
                        <template v-if="identityBusinessCheckedStatus">
                          <div class="identity-btn identity-btn-margin"
                               :class="identityBusinessCheckedStatus ? 'identity-business-active' : '' "
                               @click="businessDialogStatus=true">
                            {{identityBusinessStr}}
                          </div>
                        </template>
                        <template v-else>
                          <div class="identity-btn identity-btn-margin"  @click="selectEducationBusiness()">
                            {{identityBusinessStr}}
                          </div>
                        </template>
                        <div class="identity-btn identity-btn-margin"
                             :class="identityValue == 5 ? 'identity-vendor-active' : '' "
                             @click="selectedIdentity(5)">Vendor
                        </div>
                      </div>

                      <div class="business-dialog-container" v-if="businessDialogStatus">
                        <div class="business-dialog-close" @click="closeBusinessDialog()">
                          <el-icon :size="30" >
                            <circle-close />
                          </el-icon>
                        </div>
                        <h3>Welcome Education Business</h3>
                        <span>Which would you say best describes your business? </span>
                        <div class="business-identity-container">
                          <div class="business-identity-item"
                               @click="selectedIdentityBusiness(2,'Recruiter')"
                               :class="identityValue == 2 ? 'identity-business-active' : '' "
                          >Recruiter</div>
                          <div class="business-identity-item"
                               @click="selectedIdentityBusiness(3,'School')"
                               :class="identityValue == 3 ? 'identity-business-active' : '' "
                          >School</div>
                          <div class="business-identity-item"
                               @click="selectedIdentityBusiness(4,'Other')"
                               :class="identityValue == 4 ? 'identity-business-active' : '' "
                          >Other</div>
                        </div>

                        <div class="business-dialog-btn-container">
                          <el-button class="business-dialog-submit-btn" type="primary" round
                                     @click="submitIdentityBusiness()"
                          >Submit</el-button>
                        </div>
                      </div>

                    </div>

                    <el-form-item>
                      <el-button class="submit-btn"
                                 type="primary"
                                 round
                                 :loading="submitRegisterLoadingStatus"
                                 @click="submitRegisterPhoneForm('registerPhoneForm')">
                        Submit
                      </el-button>
                    </el-form-item>
                  </el-form>

                </template>

              </div>
            </div>

          </el-col>
        </el-row>

      </el-main>

      <el-footer class="footer-container" height="auto">

        <el-row justify="center" align="middle">
          <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6">
            <div class="footer-content">
              <!--                <router-link to="/privacy">Privacy & terms</router-link>-->
            </div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>

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
  LOGIN_EMAIL_PWD_V2, PHONE_REGISTER_V2, LOGIN_PHONE_SMS_V2, LOGIN_PHONE_PWD_V2
} from "@/api/api";
//LINKEDIN_CODE
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import shanghaiImg from '@/assets/bg/bg-shanghai.jpg'
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
      shanghaiImg,
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
      remeberValue: false,
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
      console.log(route.query)
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
      return router.push({path: '/'})
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
  },
  created() {
    this.showValue = this.showType
  },
  methods: {
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
    goHome() {
      this.$router.push('/')
    },
    remeberChange(e) {
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
                let resMessage = res.message;
                // console.log(resMessage.company_id)
                localStorage.setItem('token', resMessage.token)
                localStorage.setItem('uid', resMessage.id)
                localStorage.setItem('identity', resMessage.identity)
                localStorage.setItem('language', resMessage.language)
                localStorage.setItem('email', resMessage.email)
                localStorage.setItem('company_id', resMessage.company_id)

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
                      self.$router.push({path: '/login', query: {type: 'sign-up'}})
                      self.showValue = 'sign-up'
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
                      self.$router.push({path: '/login', query: {type: 'sign-up'}})
                      self.showValue = 'sign-up'
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

                let resMessage = res.message

                localStorage.setItem('token', resMessage.token)
                localStorage.setItem('uid', resMessage.id)
                localStorage.setItem('identity', resMessage.identity)
                localStorage.setItem('language', resMessage.language)
                localStorage.setItem('phone', resMessage.phone)
                localStorage.setItem('company_id', resMessage.company_id)
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
                      self.$router.push({path: '/login', query: {type: 'sign-up'}})
                      self.showValue = 'sign-up'
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
                    self.$router.push({path: '/login', query: {type: 'login',email:self.registerForm.email}})
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
                    self.$router.push({path: '/login', query: {type: 'login',phone:self.registerPhoneForm.phone}})
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

.container-1 {
  padding-top: 20px;
  position: relative;
}

.go-home-container {
  position: absolute;
  left: 20px;
  top: 20px;
}

.go-home-btn {
  font-size: 14px;
}

.logo-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 100px;
  height: 100px;
}

.logo-title {
  text-decoration: none;
}

.create-account-tips {
  color: #808080;
  padding: 10px;
}

.create-account-link a {
  text-decoration: none;
  color: #00b3d2;
  padding: 10px;
  font-weight: bold;
}

.xll-login-row-container {
  /*width: 1100px;*/
  margin: 0 auto;
  border-radius: 20px;
  background-color: #DAEBCF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  background-image: url("../../assets/bg/bg-shanghai.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.xll-login-container {
  overflow: hidden;
  background-color: #FFFFFF;
}

.xll-login-form-container {
  padding: 20px 20px 20px 20px;
}

.xll-register-row-container {
  /*width: 1100px;*/
  margin: 0 auto;
}

.xll-register-container {
  overflow: hidden;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}

.xll-register-form-container {
  padding: 20px 20px 40px 20px;
}


.login-tabs-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #EEEEEE;
}

.login-label {
  width: 50%;
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}

.login-label:hover {
  background-color: #0AA0A8;
  color: #FFFFFF;
}

.login-tab-active {
  background-color: #0AA0A8;
  color: #FFFFFF;
}

.register-label {
  width: 50%;
  text-align: center;
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
}

.register-label:hover {
  background-color: #0AA0A8;
  color: #FFFFFF;
}

.phone-btn-container {
  margin-top: 10px;
}

.facebook-btn-container {
  margin-top: 10px;
}

.google-btn-container {
  margin-top: 10px;
}

.forgot-password-container {
  margin-top: 10px;
  text-align: center;
}

.forgot-password-btn {
  font-size: 16px;
}

.google-btn {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  line-height: 26px;
}

.apple-btn {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  line-height: 26px;
}

.linkedin-btn {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  line-height: 26px;
}

.login-option-btn {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.submit-btn {
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  margin-top: 20px;
}


.footer-container {
  margin-top: 20px;
}

.footer-content a {
  text-decoration: none;
  color: #808080;
}

.remeber-container {
  text-align: left;
}

.hcaptcha-container {
  text-align: left;
  margin-top: 20px;
}

.business-dialog-container{
  position: absolute;
  background-color: #ffffff;
  bottom: 30px;
  left:0;
  right:0;
  margin:auto;
  width:100%;
  //padding: 20px;
  padding:40px 0 20px 0;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.4);
}

.business-dialog-close{
  position: absolute;
  right: 10px;
  top:10px;
  cursor: pointer;

}

.business-dialog-container h3{

}
.business-dialog-container span{
  font-size: 14px;
  color:#808080;
  line-height: 30px;
}

.business-identity-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.business-identity-item{
  flex:1;
  margin:10px;
  background-color: #f5f6f7;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.business-dialog-btn-container{
  margin-top: 20px;
}

.business-dialog-submit-btn{

}

.identity-container {
  position: relative;
}

.identity-label {
  font-size: 14px;
  text-align: left;
  padding: 10px 0;
}

.identity-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.identity-btn {
  background-color: #f5f6f7;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.identity-btn-margin {
  margin-left: 10px;
}

.identity-educator-active {
  background-color: #00b3d2;
  color: #ffffff;
}

.identity-business-active {
  background-color: #d2005b;
  color: #ffffff;
}

.identity-vendor-active {
  background-color: #b1c452;
  color: #ffffff;
}

.send-code-btn {
  background-color: #0AA0A8 !important;
  color: #ffffff !important;
  padding: 10px;
}

.xll-ads-container {
  height: 100%;
}

.ads-image {
  width: 100%;
  height: 100%;
}

/deep/ .xll-icon {
  font-size: 24px;
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

@media screen and (min-width: 1200px) {
  .xll-login-row-container {
    width: 1100px;
  }

  .xll-register-row-container {
    width: 1100px;
  }

}

@media screen and (max-width: 768px){

}
</style>
