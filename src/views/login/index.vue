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
        <el-row class="xll-login-row-container" justify="center" align="middle" v-if="showValue == 1">
          <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
            <div class="xll-login-container">
              <div class="login-tabs-container">
                <div class="login-label"
                     :class="showValue==1 ? 'login-tab-active' : ''"
                     @click="switchLoginRegister(1)"
                >Login</div>
                <div class="register-label"
                     :class="showValue==2 ? 'login-tab-active' : ''"
                     @click="switchLoginRegister(2)"
                >Register</div>
              </div>
              <div class="xll-login-form-container">
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
                    <el-button class="submit-btn"
                               round
                               type="primary"
                               :loading="submitLoginLoadingStatus"
                               @click="submitLoginForm('loginForm')">
                      Login
                    </el-button>
                  </el-form-item>
                </el-form>

                <div class="facebook-btn-container">
                  <el-button class="apple-btn" plain round icon="iconfont  el-icon-alifacebook">
                    Facebook Sign in
                  </el-button>
                </div>

                <div class="google-btn-container">
                  <el-button class="google-btn" plain round icon="iconfont  el-icon-aligoogle">
                    Google Sign in
                  </el-button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
            <div class="xll-ads-container">
<!--              <el-image :src="shanghaiImg" class="ads-image" ></el-image>-->
            </div>
          </el-col>
        </el-row>

        <el-row class="xll-register-row-container" justify="center" align="middle" v-if="showValue == 2">
          <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
            <div class="xll-register-container">
              <div class="login-tabs-container">
                <div class="login-label"
                     :class="showValue==1 ? 'login-tab-active' : ''"
                     @click="switchLoginRegister(1)"
                >Login</div>
                <div class="register-label"
                     :class="showValue==2 ? 'login-tab-active' : ''"
                     @click="switchLoginRegister(2)"
                >Register</div>
              </div>
              <div class="xll-register-form-container" >
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
                        <el-button class="send-code-btn"  :loading="sendCodeLoading" @click="sendEmailCode">Send Code</el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="Email Activation Code" prop="code" required>
                    <el-input size="medium" placeholder="6 digit code"
                              v-model="registerForm.code"></el-input>
                  </el-form-item>
                  <el-form-item label="Password" prop="password" required>
                    <el-input size="medium" type="password" placeholder="Password" v-model="registerForm.password"></el-input>
                  </el-form-item>
                  <el-form-item label="Confirm Password" prop="c_password" required>
                    <el-input size="medium" type="password" placeholder="Confirm"
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
                    <el-button class="submit-btn"
                               type="primary"
                               round
                               :loading="submitRegisterLoadingStatus"
                               @click="submitRegisterForm('registerForm')">
                      Submit
                    </el-button>
                  </el-form-item>
                </el-form>
                <div class="facebook-btn-container">
                  <el-button class="apple-btn" plain round icon="iconfont  el-icon-alifacebook">
                    Facebook Sign in
                  </el-button>
                </div>
                <div class="google-btn-container">
                  <el-button class="google-btn" plain round icon="iconfont  el-icon-aligoogle">
                    Google Sign in
                  </el-button>
                </div>
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

  </div>


</template>

<script>
// import {hcaptcha} from "@shubhamranjan/vue-hcaptcha";
import imgLogo from '@/assets/logo.png'
import {EMAIL_LOGIN, EMAIL_REGISTER} from "@/api/api";

import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {SEND_EMAIL_CODE} from "@/api/api";
import shanghaiImg  from '@/assets/bg/bg-shanghai.jpg'

export default {
  name: "index",
  data() {
    return {
      imgLogo,
      shanghaiImg,
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
      sendCodeLoading:false,
      showValue:1

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

    let value = route.query.type;
    const showType = value ? value : 1

    return {
      getParams,
      skipHomePage,
      showType
    }
  },
  created() {
    this.showValue = this.showType
    console.log(this.showValue)
  },
  methods: {
    goHome(){
      this.$router.push('/home')
    },
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
          this.$message.error(err.msg)
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
                  localStorage.setItem('first_name',firstName)
                  localStorage.setItem('last_name',lastName)
                }
                if(identity == 2){
                  let firstName = res.message.business.first_name;
                  let lastName = res.message.business.last_name;
                  localStorage.setItem('name',firstName+' '+ lastName)
                  localStorage.setItem('first_name',firstName)
                  localStorage.setItem('last_name',lastName)
                }
                if(identity == 3){
                  let firstName = res.message.vendor.first_name;
                  let lastName = res.message.vendor.last_name;
                  localStorage.setItem('name',firstName+' '+ lastName)
                  localStorage.setItem('first_name',firstName)
                  localStorage.setItem('last_name',lastName)
                }
                setTimeout(function () {
                  self.skipHomePage()
                  self.submitLoginLoadingStatus = false
                }, 1500)
              }
            }).catch(err=>{
              console.log(err)
              this.$message.error(err.msg)
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

          }).catch(err=>{
            console.log(err)
            this.$message.error(err.msg)
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
    },
    switchLoginRegister(value){
      this.showValue = value
    }
  }

}

</script>

<style scoped>

.container-1 {
  padding-top: 20px;
  position: relative;
}

.go-home-container{
  position: absolute;
  left: 20px;
  top: 20px;
}
.go-home-btn{
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
.xll-login-row-container{
  width: 1100px;
  margin: 0 auto;
  border-radius: 20px;
  background-color: #DAEBCF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  background-image: url("../../assets/bg/bg-shanghai.jpg");
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
}

.xll-login-container{
  overflow: hidden;
  background-color: #FFFFFF;
}

.xll-login-form-container{
  padding:20px 20px 40px 20px;
}

.xll-register-row-container{
  width: 1100px;
  margin: 0 auto;
}
.xll-register-container{
  overflow: hidden;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}
.xll-register-form-container{
  padding:20px 20px 40px 20px;
}

.login-tabs-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #EEEEEE;
}

.login-label{
  width:50%;
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  text-align: center;
}
.login-label:hover{
  background-color: #0AA0A8;
  color: #FFFFFF;
}

.login-tab-active{
  background-color: #0AA0A8;
  color: #FFFFFF;
}

.register-label{
  width: 50%;
  text-align: center;
  font-size: 16px;
  padding:10px;
  cursor: pointer;
}

.register-label:hover{
  background-color: #0AA0A8;
  color: #FFFFFF;
}


.facebook-btn-container{
  margin-top: 20px;
}
.google-btn-container{
  margin-top: 20px;
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

.xll-ads-container{
  height: 100%;
}

.ads-image{
  width: 100%;
  height: 100%;
}

</style>
