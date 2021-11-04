<template>
  <div class="bg">
    <div class="bg-2">
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
        </el-header>
        <el-main>
          <el-row justify="center" align="middle">
            <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14">
              <el-tabs type="border-card" class="login-tabs">
                <el-tab-pane label="Login">
                  <div class="login-tabs-login-container">
                    <el-row class="marginTop container-7" justify="center" align="middle">
                      <el-col :xs="24" :sm="24" :md="22" :lg="22" :xl="22">
                        <el-form
                            :model="loginForm"
                            :rules="loginRules"
                            ref="loginForm"
                            label-width="100px"
                            label-position="top"
                            class="demo-ruleForm"
                        >
                          <el-form-item label="Username/Email" prop="email">
                            <el-input size="medium" placeholder="Username/Email" v-model="loginForm.email"></el-input>
                          </el-form-item>
                          <el-form-item label="Password" prop="password">
                            <el-input size="medium" placeholder="Password" type="password"
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
                            <el-button class="submit-btn" :loading="submitLoginLoadingStatus" @click="submitLoginForm('loginForm')">
                              Login in
                            </el-button>
                          </el-form-item>
                        </el-form>
                      </el-col>
                    </el-row>

                    <el-row class=" marginTop container-5" justify="center" align="middle">
                      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                        <el-button class="apple-btn" plain icon="iconfont  el-icon-alifacebook">
                          Sign in with Facebook
                        </el-button>
                      </el-col>
                    </el-row>

                    <el-row class="marginTop container-4" justify="center" align="middle">
                      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                        <el-button class="google-btn" plain icon="iconfont  el-icon-aligoogle">
                          Sign in with Google
                        </el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Register">
                  <div class="login-tabs-register-container">
                    <el-row class="marginTop container-3" justify="center" align="middle">
                      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
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
                            <el-input size="medium" placeholder="Email"
                                      v-model="registerForm.email">
                              <template #append>
                                <el-button class="send-code-btn"  :loading="sendCodeLoading" @click="sendEmailCode">Send Code</el-button>
                              </template>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="Email Activation Code" prop="code" required>
                            <el-input size="medium" placeholder="Email Activation Code"
                                      v-model="registerForm.code"></el-input>
                          </el-form-item>
                          <el-form-item label="Password" prop="password" required>
                            <el-input size="medium" type="password" placeholder="Password" v-model="registerForm.password"></el-input>
                          </el-form-item>
                          <el-form-item label="Confirm Password" prop="c_password" required>
                            <el-input size="medium" type="password" placeholder="Confirm Password"
                                      v-model="registerForm.c_password"></el-input>
                          </el-form-item>
                          <div class="identity-container">
                            <div class="identity-label">I am a/an</div>
                            <div class="identity-content">
                              <div class="identity-btn"
                                   :class="identityValue == 1 ? 'identity-educator-active' : '' "
                                   @click="selectedIdentity(1)">Educator</div>
                              <div class="identity-btn identity-btn-margin"
                                   :class="identityValue == 2 ? 'identity-business-active' : '' "
                                   @click="selectedIdentity(2)">Business</div>
                              <div class="identity-btn identity-btn-margin"
                                   :class="identityValue == 3 ? 'identity-vendor-active' : '' "
                                   @click="selectedIdentity(3)">Vendor</div>
                            </div>
                          </div>
                          <el-form-item>
                            <el-button class="submit-btn" :loading="submitRegisterLoadingStatus"
                                       @click="submitRegisterForm('registerForm')">
                              Submit
                            </el-button>
                          </el-form-item>
                        </el-form>
                      </el-col>
                    </el-row>

                    <el-row class="marginTop container-6" justify="center" align="middle">
                      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                        <el-button class="apple-btn" plain icon="iconfont  el-icon-alifacebook">
                          Sign in with Facebook
                        </el-button>
                      </el-col>
                    </el-row>
                    <el-row class=" marginTop container-5" justify="center" align="middle">
                      <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22">
                        <el-button class="google-btn" plain icon="iconfont  el-icon-aligoogle">
                          Sign in with Google
                        </el-button>
                      </el-col>
                    </el-row>
                  </div>

                </el-tab-pane>
              </el-tabs>
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

    </div>
  </div>

</template>

<script>
// import {hcaptcha} from "@shubhamranjan/vue-hcaptcha";
import imgLogo from '@/assets/logo.png'
import {EMAIL_LOGIN, EMAIL_REGISTER} from "@/api/api";

import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {SEND_EMAIL_CODE} from "@/api/api";

export default {
  name: "index",
  data() {
    return {
      imgLogo,
      loginForm: {
        email: ''
      },
      loginRules: {
        email: [
          {required: true, message: 'Please fill out your email address.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please enter your password', trigger: 'blur'}
        ]
      },
      submitLoginLoadingStatus: false,
      submitRegisterLoadingStatus:false,
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
      identityValue: 0,
      sendCodeLoading:false

    }
  },
  components: {

  },
  setup() {
    //hcaptcha,
    let router = useRouter()
    let route = useRoute()
    const getParams = () => {
      console.log(route.query)
      return route.query;
    }

    const skipHomePage = () => {
      return router.push(
          {
            path: '/'
          }
      )
    }

    return {
      getParams,
      skipHomePage
    }
  },
  methods: {
    remeberChange(e) {
      console.log(e)
    },
    humanVerify(response, responseKey) {
      // console.log(response);
      console.log(responseKey);
      this.$loading({
        text:'Loading...'
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
              self.$message.success('Success')
            }, 1500)

          }

        }).catch(err=>{
          console.log(err)
          self.sendCodeLoading = false
        })

      }

    },
    selectedIdentity(value) {
      console.log(value)
      this.identityValue = value
    },
    submitLoginForm(formName) {
      let self = this;
      if(self.humanVerifyStatus){
        this.submitLoginLoadingStatus = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = Object.assign({}, this.loginForm)
            EMAIL_LOGIN(params).then(res => {
              // console.log(res)
              if (res.code == 200) {
                localStorage.setItem('token', res.message.token)
                localStorage.setItem('uid',res.message.id)
                localStorage.setItem('identity', res.message.identity)
                localStorage.setItem('language', res.message.language)
                localStorage.setItem('email', res.message.email)

                let identity  = res.message.identity
                if(identity == 0){
                  localStorage.setItem('name','Guest')
                }
                if(identity == 1){
                  let firstName = res.message.educator.first_name;
                  let lastName = res.message.educator.last_name;
                  localStorage.setItem('name',firstName+' '+ lastName)
                }
                if(identity == 2){
                  let firstName = res.message.business.first_name;
                  let lastName = res.message.business.last_name;
                  localStorage.setItem('name',firstName+' '+ lastName)
                }
                if(identity == 3){
                  let firstName = res.message.vendor.first_name;
                  let lastName = res.message.vendor.last_name;
                  localStorage.setItem('name',firstName+' '+ lastName)
                }
                setTimeout(function () {
                  self.skipHomePage()
                  self.submitLoginLoadingStatus = false
                }, 1500)
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
    submitRegisterForm(formName) {
      let self = this;
      this.submitRegisterLoadingStatus = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(valid)
          let params = Object.assign({
            identity:self.identityValue
          },this.registerForm)
          EMAIL_REGISTER(params).then(res=>{
            console.log(res)
            if(res.code == 200){
              // let userInfo = res.message
              // localStorage.setItem('uid',res.message.id)
              this.$message.success('Registration completed!')
              location.reload()
            }

          })

          setTimeout(function () {
            self.submitRegisterLoadingStatus = false
          }, 2000)
        } else {
          console.log('error submit!!')
          this.submitRegisterLoadingStatus = false
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }

}

</script>

<style scoped>
.bg{
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='80' height='80' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M-20.133 4.568C-13.178 4.932-6.452 7.376 0 10c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432'  stroke-width='1' stroke='hsla(183, 89%, 35%, 1)' fill='none'/><path d='M-20.133 24.568C-13.178 24.932-6.452 27.376 0 30c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432'  stroke-width='1' stroke='hsla(189, 100%, 41%, 1)' fill='none'/><path d='M-20.133 44.568C-13.178 44.932-6.452 47.376 0 50c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432'  stroke-width='1' stroke='hsla(70, 49%, 55%, 1)' fill='none'/><path d='M-20.133 64.568C-13.178 64.932-6.452 67.376 0 70c6.452 2.624 13.036 5.072 20 5 6.967-.072 13.56-2.341 20-5 6.44-2.659 13.033-4.928 20-5 6.964-.072 13.548 2.376 20 5s13.178 5.068 20.133 5.432'  stroke-width='1' stroke='hsla(189, 100%, 17%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
  height: 100vh;
}

.bg-2{
  background-color: rgba(255,255,255,0.95);
  height: 100vh;
}
.login-container{
  width: 1100px;
  margin: 0 auto;
}

.marginTop {
  margin-top: 20px;
}

.container-1 {
  padding-top: 60px;
}

.logo-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.logo-img {
  width: 140px;
  height: 140px;
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

.submit-btn {
  width: 100%;
  background-color: #0aa0a8;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  margin-top: 20px;
}

.container-8-tips {
  background-color: #eeeeee;
  padding: 20px;
  border-radius: 6px;
  font-size: 16px;
  line-height: 20px;
  color: #808080;
}

.container-8-tips a {
  text-decoration: none;
  color: #00b3d2;
}

.footer-container {
  margin-top: 20px;
}

.footer-content a {
  text-decoration: none;
  color: #808080;
}

/*/deep/ .el-input__inner {*/
/*  height: 50px !important;*/
/*}*/


.login-tabs {
  border-radius: 20px;
  overflow: hidden;
}

.login-tabs-login-container {
  padding-bottom: 40px;
}

.login-tabs-register-container {
  padding-bottom: 40px;
}

.remeber-container {
  text-align: left;
}

.hcaptcha-container {
  text-align: left;
  margin-top: 20px;
}

.identity-container {

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

.identity-btn{
  background-color: #f5f6f7;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.identity-btn-margin{
  margin-left: 10px;
}

.identity-educator-active{
  background-color: #00b3d2;
  color: #ffffff;
}
.identity-business-active{
  background-color: #d2005b;
  color: #ffffff;
}
.identity-vendor-active{
  background-color: #b1c452;
  color: #ffffff;
}

.send-code-btn{
  background-color: #0AA0A8 !important;
  color: #ffffff !important;
  padding: 10px;
}

</style>
