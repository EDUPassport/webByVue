<template>
  <div class="login-bg">

    <div class="mobile-banner">
      <div class="mobile-banner-bg"></div>
    </div>

    <el-row justify="center" align="top" class="login-container">
      <el-col :xs="2" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="login-l" @click="turnHome()">
          <el-image class="login-l-logo" :src="logoImgLight"></el-image>
        </div>
      </el-col>
      <el-col class="login-m-col" :xs="20" :sm="16" :md="16" :lg="16" :xl="16">

        <div class="login-m">
          <h1>Sign up</h1>

          <div class="xll-register-container">

            <div class="register-step-container">
              <div class="register-step-l">
                <div class="register-step-circle"
                     :class="stepValue === 1  ? 'register-step-circle-active' : '' "
                >1
                </div>
                <div class="register-step-tips"
                     :class="stepValue === 1 ? 'register-step-tips-active' : '' "
                >
                  Account <br> information
                </div>
              </div>
              <div class="register-step-m">-</div>
              <div class="register-step-r">
                <div class="register-step-circle"
                     :class="stepValue === 2 ? 'register-step-circle-active' : '' "
                >2
                </div>
                <div class="register-step-tips"
                     :class="stepValue === 2 ? 'register-step-tips-active' : '' "
                >
                  Profile <br> information
                </div>
              </div>
            </div>

            <div class="xll-register-form-container">
              <el-form
                  :model="registerForm"
                  :rules="registerRules"
                  ref="registerForms"
                  label-width="160px"
                  label-position="top"
                  class="demo-ruleForm"
              >

                <template v-if="stepValue === 1">

                  <el-form-item prop="first_name" required>
                    <el-input size="large" placeholder="First Name"
                              @change="inputChange"
                              @input="inputChange"
                              :formatter="(value)=> validForbid(value) "
                              :parser="(value) => value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, '')"
                              v-model="registerForm.first_name">
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="last_name" required>
                    <el-input size="large" placeholder="Last Name"
                              @change="inputChange"
                              @input="inputChange"
                              :formatter="(value)=> validForbid(value) "
                              :parser="(value) => value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, '')"
                              v-model="registerForm.last_name">
                    </el-input>
                  </el-form-item>

                  <el-form-item prop="email" required v-if="loginEmailStatus">

                    <div class="xll-email-input">
                      <el-input size="large" placeholder="Email address"
                                @change="inputChange"
                                @input="inputChange"
                                v-model="registerForm.email">
                      </el-input>
                      <div class="send-code-btn" @click="sendEmailCode('registerForms')">
                        {{ checkCodeBtn.text }}
                      </div>
                    </div>

                  </el-form-item>

                  <el-form-item prop="phone" required v-if="loginPhoneStatus">

                    <div class="xll-email-input">
                      <el-input size="large" placeholder="Phone number"
                                @change="inputChange"
                                @input="inputChange"
                                v-model="registerForm.phone">
                      </el-input>
                      <div class="send-code-btn" @click="getCheckCodeForRegister()">
                        {{ checkCodeBtn.text }}
                      </div>
                    </div>

                  </el-form-item>

                  <div class="xll-change-phone" @click="loginWithPhone()" v-if="isFromChinaEnv === 'yes' ">

                    <template v-if="loginEmailStatus">
                      SIGN UP WITH A PHONE NUMBER INSTEAD
                    </template>
                    <template v-if="loginPhoneStatus">
                      SIGN UP WITH A EMAIL INSTEAD
                    </template>

                  </div>

                  <el-form-item prop="code" required>
                    <el-input size="large" placeholder="Activation code"
                              @change="inputChange"
                              @input="inputChange"
                              v-model="registerForm.code"></el-input>
                  </el-form-item>

                  <el-form-item prop="password" required>
                    <el-input size="large" placeholder="Create password"
                              show-password
                              type="password"
                              @change="inputChange"
                              @input="inputChange"
                              v-model="registerForm.password"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="c_password" required>
                    <el-input size="large" type="password" placeholder="Confirm password"
                              show-password
                              @change="inputChange"
                              @input="inputChange"
                              v-model="registerForm.c_password"
                    ></el-input>
                  </el-form-item>

                  <div class="xll-create-account">
                    <el-button class="xll-create-account-btn"
                               :disabled="createAccountDisabledStatus"
                               type="primary"
                               round
                               @click="createAccount('registerForms')"
                    >
                      CREATE AN ACCOUNT
                    </el-button>
                  </div>

                </template>

                <template v-if="stepValue === 2">
                  <div class="identity-container">
                    <div class="identity-label">
                      Choose your profile <br>
                      <span>(you can change it later)</span>
                    </div>

                    <div class="identity-tabs identity-tabs-margin">

                      <div class="identity-tab identity-tab-l"
                           :class="identityValue == 1 ? 'identity-tab-active' : '' "
                           @click="selectedIdentity(1)">
                        Educator
                      </div>
                      <div class="identity-tab identity-tab-m"
                           :class="businessDialogStatus ? 'identity-tab-active' : '' "
                           @click="selectedBusinessAll()">
                        Educational business
                      </div>
                      <div class="identity-tab identity-tab-r"
                           :class="identityValue == 5 ? 'identity-tab-active' : '' "
                           @click="selectedIdentity(5)">Vendor
                      </div>

                    </div>

                    <div class="identity-tips">
                      <template v-if="identityValue == 1">
                        You are a teacher, tutor, mentor working with students directly.
                      </template>
                      <template v-if="businessDialogStatus">
                        You are working at a school, university, education center as a hiring person or a recruiter.
                      </template>
                      <template v-if="identityValue == 5">
                        You have your own business and would like to promote it and support educators.
                      </template>

                    </div>

                    <div class="business-dialog-container" v-if="businessDialogStatus">

                      <!--                      <div class="identity-business-tips">-->
                      <!--                        Please choose the one that fits you best-->
                      <!--                      </div>-->

                      <div class="identity-tabs">

                        <div class="identity-tab identity-tab-l"
                             @click="selectedIdentityBusiness(3)"
                             :class="identityValue == 3 ? 'identity-tab-active' : '' "
                        >School
                        </div>

                        <div class="identity-tab identity-tab-m"
                             @click="selectedIdentityBusiness(2)"
                             :class="identityValue == 2 ? 'identity-tab-active' : '' "
                        >Recruiter
                        </div>

                        <div class="identity-tab identity-tab-r"
                             @click="selectedIdentityBusiness(4)"
                             :class="identityValue == 4 ? 'identity-tab-active' : '' "
                        >Other
                        </div>
                      </div>

                      <div class="identity-tips">

                        <template v-if="identityValue == 2">
                          You are a recruiter or a head hunter working for one or more companies.
                        </template>
                        <template v-if="identityValue == 3">
                          You are a hiring person working at a school, university, etc.
                        </template>
                        <template v-if="identityValue == 4">
                          Choose this if you don’t fit into other categories.
                          You can
                          <el-button link type="primary" @click="contactUs()">CONTACT US</el-button>
                          if you have doubts.
                        </template>

                      </div>

                      <div class="margin-aaa"></div>

                      <el-form-item prop="company_name">
                        <el-input
                            v-if="identityValue == 2"
                            size="large" placeholder="Displayed name"
                            @change="companyInputChange"
                            @input="companyInputChange"
                            v-model="companyName">
                        </el-input>
                        <el-input
                            v-if="identityValue == 3"
                            size="large" placeholder="School name"
                            @change="companyInputChange"
                            @input="companyInputChange"
                            v-model="companyName">
                        </el-input>
                        <el-input
                            v-if="identityValue == 4"
                            size="large" placeholder="School name"
                            @change="companyInputChange"
                            @input="companyInputChange"
                            v-model="companyName">
                        </el-input>

                      </el-form-item>

                    </div>

                    <div class="margin-aaa"></div>
                    <el-form-item prop="company_name" v-if="identityValue == 5">
                      <el-input
                          size="large" placeholder="Name of your store/restaurant/company"
                          @change="companyInputChange"
                          @input="companyInputChange"
                          v-model="companyName">
                      </el-input>
                    </el-form-item>

                  </div>

                  <div class="complete-btn-container">
                    <el-button class="complete-btn"
                               type="primary"
                               :disabled="completeBtnDisabledStatus"
                               round
                               :loading="submitRegisterLoadingStatus"
                               @click="submitRegisterForm('registerForms')">
                      COMPLETE
                    </el-button>

                    <el-button link class="complete-back-btn" @click="completeBack()">
                      BACK
                    </el-button>
                  </div>

                </template>

              </el-form>

            </div>
          </div>

        </div>

      </el-col>
      <el-col :xs="2" :sm="4" :md="4" :lg="4" :xl="4">

        <div class="login-r">

          <div class="login-close">
            <el-button type="primary" link @click="goHome()">CLOSE</el-button>
          </div>

          <div class="sign-up">
            <el-button plain round @click="turnToLogin()">LOG IN</el-button>
          </div>

        </div>
      </el-col>

    </el-row>

  </div>

</template>

<script>
// import {hcaptcha} from "@shubhamranjan/vue-hcaptcha";
import imgLogo from '@/assets/logo.png'
import logoImgLight from "@/assets/newHome/logo/Logo_Transparent.png"
//WEIXIN_SEND_SMS
import {
  EMAIL_REGISTER_V2,
  SEND_EMAIL_CODE,
  WEIXIN_SEND_SMS,
  PHONE_REGISTER_V2, REGISTER_EMAIL_CHECK
} from "@/api/api";
//LINKEDIN_CODE
import {useRoute, useRouter} from "vue-router";
import axios from "axios";

import {randomString} from '@/utils'
import {useStore} from 'vuex'
import {reactive, ref} from "vue";
import {decode} from "js-base64";

export default {
  name: "index",
  data() {
    return {
      isFromChinaEnv: process.env.VUE_APP_CHINA,
      logoImgLight,
      completeBtnDisabledStatus: true,
      companyName: '',
      createAccountDisabledStatus: true,
      stepValue: 1,
      imgLogo,
      identityBusinessCheckedStatus: false,

      submitRegisterLoadingStatus: false,
      humanVerifyStatus: true,
      remeberValue: false,

      identityValue: 0,
      sendCodeLoading: false,
      showValue: 'login',
      businessDialogStatus: false

    }
  },
  components: {},
  setup() {

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
          text: 'SEND CODE',
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

    const loginPhoneStatus = ref(false)

    const loginEmailStatus = ref(true)

    const registerForms = ref(null)

    let registerFormObj = {}
    let registerFormRuleObj = {}

    if (loginPhoneStatus.value) {
      registerFormObj = {
        first_name: '',
        last_name: '',
        phone: '',
        code: '',
        password: '',
        c_password: ''
      }

      registerFormRuleObj = {
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
      }
    }

    if (loginEmailStatus.value) {
      registerFormObj = {
        first_name: '',
        last_name: '',
        email: '',
        code: '',
        password: '',
        c_password: ''
      }
      registerFormRuleObj = {
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
          {type: 'email' , required: true, message: 'Please fill out your email address.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please enter your password', trigger: 'blur'}
        ],
        c_password: [
          {required: true, message: 'Please enter your password again', trigger: 'blur'}
        ]
      }
    }

    const registerForm = reactive(registerFormObj)

    const registerRules = reactive(registerFormRuleObj)

    const loginWithPhone = () => {
      loginPhoneStatus.value = !loginPhoneStatus.value
      loginEmailStatus.value = !loginEmailStatus.value

    }

    return {
      getParams,
      skipHomePage,
      showType,
      setCurrentUser,
      checkCodeBtn,
      getCheckCodeTimer,
      forgotDialogVisible,
      registerForm,
      registerRules,
      registerForms,
      loginEmailStatus,
      loginPhoneStatus,
      loginWithPhone

    }
  },
  mounted() {

  },
  methods: {

    test() {
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
            self.$router.push({path: '/login', query: {phone: self.registerForm.phone}})
          }
        }

      })
    },
    turnHome() {
      this.$router.push('/')
    },
    companyInputChange(e) {
      console.log(e)
      this.completeBtnDisabledStatus = e.length <= 0;
    },
    inputChange() {

      let firstName = this.registerForm.first_name;
      let lastName = this.registerForm.last_name;
      let email = this.registerForm.email
      let phone = this.registerForm.phone;
      let code = this.registerForm.code;
      let password = this.registerForm.password;
      let confirmPassword = this.registerForm.c_password;

      if (this.loginEmailStatus) {
        this.createAccountDisabledStatus = !(firstName && lastName && email && code && password && confirmPassword);
      }
      if (this.loginPhoneStatus) {
        this.createAccountDisabledStatus = !(firstName && lastName && phone && code && password && confirmPassword);
      }
    },
    changeType(e) {
      e.target.type = 'password'
    },
    getCheckCodeForRegister() {
      let phone = this.registerForm.phone;
      if (phone) {
        let params = {
          phone: phone
        }
        this.getCheckCodeTimer()

        WEIXIN_SEND_SMS(params).then(res => {
          console.log(res)
          if (res.code === 200) {

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

      }

    },
    turnToLogin() {
      this.$router.push('/login')
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
    sendEmailCode(formName) {
      let self = this;
      let email = this.registerForm.email

      this.$refs[formName].validateField('email',(valid) => {
        if (valid) {

          if (email) {

            let params = {
              email: email
            }
            this.getCheckCodeTimer()

            SEND_EMAIL_CODE(params).then(res => {
              if (res.code == 200) {

                self.$message({
                  type: 'success',
                  message: 'Activation Code Sent'
                })

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
          }else{
            return this.$message({
              type:'warning',
              message:'Please enter a valid email address',
              grouping:true
            })
          }

        } else {
          console.log('error submit!!')
          return this.$message({
            type:'warning',
            message:'Please enter a valid email address',
            grouping:true
          })
        }
      })


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
    selectedIdentityBusiness(identity) {
      this.businessDialogStatus = true;

      if (identity) {
        this.identityBusinessCheckedStatus = true
        this.identityValue = identity
      }

    },
    selectedBusinessAll() {
      this.completeBtnDisabledStatus = true;
      this.identityValue = 0;
      this.identityBusinessCheckedStatus = true;
      this.businessDialogStatus = true
      this.companyName = '';
    },
    selectedIdentity(value) {

      this.companyName = '';
      this.completeBtnDisabledStatus = value != 1;

      this.identityBusinessCheckedStatus = false

      this.businessDialogStatus = false;

      this.identityValue = value

    },

    createAccount(formName) {

      let self = this;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(valid)
          let email = this.registerForm.email;
          let emailCode = this.registerForm.code;
          let password = this.registerForm.password
          let confirmPassword = this.registerForm.c_password;

          let params = {
            email:email,
            code:emailCode
          }

          REGISTER_EMAIL_CHECK(params).then(res=>{
            if(res.code == 200){
              // console.log(res)
              if (confirmPassword !== password) {
                this.$message.warning('The two passwords are inconsistent')
                return;
              }
              self.stepValue = 2;

            }

          }).catch(err=>{
            console.log(err)
            return this.$message.warning('Incorrect verification code')
          })


        } else {
          console.log('error submit!!')
          this.submitRegisterLoadingStatus = false
          return false
        }
      })

    },
    completeBack() {
      this.stepValue = 1;
    },
    submitRegisterForm(formName) {

      let self = this;
      this.submitRegisterLoadingStatus = true;

      this.$refs[formName].validate((valid) => {
        if (valid) {

          let identityValue = self.identityValue;

          let aParams = {
            identity: identityValue
          }

          if (identityValue == 2 || identityValue == 4 || identityValue == 3 || identityValue == 5) {
            aParams.company_name = self.companyName
          }

          let params = Object.assign(aParams, self.registerForm)

          if (self.loginPhoneStatus) {
            PHONE_REGISTER_V2(params).then(res => {
              console.log(res)
              if (res.code == 200) {
                // let userInfo = res.message
                // localStorage.setItem('uid',res.message.id)

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
                      self.$router.push({path: '/login', query: {phone: self.registerForm.phone}})
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

          }

          if (self.loginEmailStatus) {
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
                    if (action === 'confirm') {
                      self.$router.push({path: '/login', query: {email: self.registerForm.email}})
                    }
                  }

                })

              }

            }).catch(err => {
              console.log(err)
              self.submitRegisterLoadingStatus = false
              this.$message.error(err.msg)
            })

          }


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
    contactUs() {
      window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')
    }


  }

}

</script>

<style scoped>

.login-bg {
  min-height: 100vh;
  background-color: #F0F2F5;
  padding-bottom: 100px;
  position: relative;
}

.login-container {
  /*max-width:1920px;*/
  padding-top: 50px;
}

.login-l {
  padding-left: 50px;
  cursor: pointer;
}

.login-l-logo {
  width: 60px;
}

.login-l-edu {
  font-family: BCExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 40px;
}

.login-l-passport {
  font-family: BCSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 17px;
}


.login-m {
  width: 576px;
  margin: 0 auto;
}

.login-m h1 {
  text-align: center;
}


.login-r {

  padding-right: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

}

.sign-up {

}

.sign-up-btn {
  font-size: 20px;
  color: #262626;
}

.login-close {
  margin-right: 20px;
}

.login-close-btn {
  font-size: 20px;
  color: #262626;
}


.xll-register-container {

}

.register-step-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.register-step-l {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.register-step-m {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.register-step-r {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.register-step-circle {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  line-height: 40px;
  background-color: #B3B3B3;
  font-family: BCSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;

}

.register-step-tips {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  margin-top: 15px;
  color: #262626;
}

.register-step-circle-active {
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  background-color: #59EDF7;
}

.register-step-tips-active {
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.xll-register-form-container {

}

.margin-aaa {
  margin-top: 25px;
}


.identity-tips {
  text-align: center;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
  margin-top: 15px;
}


.business-dialog-container {

  width: 100%;
  text-align: center;
  margin-top: 25px;

}

.identity-business-tips {
  font-size: 26px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  text-align: center;

}

.business-dialog-container h3 {

}

.business-dialog-container span {
  font-size: 14px;
  color: #808080;
  line-height: 30px;
}

.identity-container {
  position: relative;
}

.identity-label {
  font-size: 30px;
  text-align: center;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  margin-top: 10px;
}

.identity-label span {
  font-size: 23px;
  text-align: center;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.identity-tabs {

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

.identity-tabs-margin {
  margin-top: 50px;
}

.identity-tab {
  padding: 10px 25px;
  font-size: 20px;
  text-align: center;
  color: #262626;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  cursor: pointer;

}

.identity-tab:hover {
  background-color: #988CF5;
  color: #FFFFFF;
}

.identity-tab-l {
  border: 2px solid #262626;
  border-radius: 22px 0px 0px 22px;;
}

.identity-tab-m {
  border-top: 2px solid #262626;
  border-bottom: 2px solid #262626;
}

.identity-tab-r {
  border: 2px solid #262626;
  border-radius: 0px 22px 22px 0px;
}

.identity-tab-active {
  background-color: #988CF5;
  color: #FFFFFF;
}


.xll-email-input {
  width: 100%;
  position: relative;
}

.send-code-btn {
  position: absolute;
  right: 20px;
  top: 0px;
  bottom: 0;
  margin: auto;

  font-size: 24px;
  font-family: BCSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  z-index: 100;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
}

.send-code-btn:hover {
  text-decoration: underline;
}

.xll-change-phone {
  font-size: 20px;
  color: #262626;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  text-indent: 20px;
  padding-bottom: 20px;
  cursor: pointer;
}

.xll-change-phone:hover {
  font-weight: bold;
  color: #000000;
  text-decoration: underline;
}

.xll-create-account {
  text-align: center;
  margin-top: 50px;
}

.xll-create-account-btn {
  font-size: 20px;
}

.complete-btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
}

.complete-btn {
  font-size: 20px;
}

.complete-back-btn {
  margin-top: 25px;
  font-size: 24px;
  color: #262626;
}

@media screen and (min-width: 769px) {

  .mobile-banner{
    display: none;
  }
  .mobile-banner-bg{
    display: none;
  }

}

@media screen and (max-width: 768px) {

  .mobile-banner{
    position: relative;
    width: 100%;
    height: 130px;
    overflow: hidden;
  }
  .mobile-banner .mobile-banner-bg{
    position: absolute;
    left: -15%;
    width: 130%;
    height: 130px;
    background-color: #E7DEFF;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;

  }

  .login-bg {
    padding-bottom: 0;
  }

  .login-container {
    padding-top: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  .login-m-col {
    display: flex;
    align-items: center;
    justify-content: center;
    /*height: 100vh;*/
  }

  .login-l {
    padding-left: 15px;
    padding-top: 15px;
  }

  .login-m {
    width: 100%;
    margin-top: 80px;
  }

  .login-m h1 {
    font-size: 20px;
  }

  .login-r {
    padding-top: 15px;
    padding-right: 15px;
  }

  .login-l-logo {
    width: 30px;
  }

  .register-step-tips {
    font-size: 12px;
  }

  .send-code-btn {
    font-size: 12px;
  }

  .xll-change-phone {
    font-size: 12px;
  }

  .identity-label {
    font-size: 18px;
  }

  .identity-label span {
    font-size: 14px;
  }

  .identity-tab {
    font-size: 12px;
  }

  .identity-tips {
    font-size: 12px;
  }

  .complete-btn {
    font-size: 12px;
  }

  .complete-back-btn {
    font-size: 12px;
  }


}
</style>
