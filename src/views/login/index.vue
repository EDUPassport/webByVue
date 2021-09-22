<template>
  <div>
    <el-container>
      <el-header class="container-1" height="auto">
        <el-row justify="space-between" align="middle">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8"></el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="logo-container">
              <router-link class="logo-title" to="/">
                <el-image class="logo-img" :src="imgLogo" fit="contain"></el-image>
              </router-link>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="create-account-container">
              <div class="create-account-tips">New to ESL Passport?</div>
              <div class="create-account-link">
                <router-link to="/register">Create an account</router-link>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row class="marginTop container-2" justify="center" align="middle">
          <el-col :xs="0" :sm="12" :md="12" :lg="8" :xl="8">
            <h1>Sign in to ESL Passport</h1>
          </el-col>
        </el-row>

        <el-row class="marginTop container-3" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="8">
            <span>We suggest using the email address that you use at work.</span>
          </el-col>
        </el-row>

        <el-row class="marginTop container-4" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <el-button class="google-btn" plain icon="iconfont  el-icon-aligoogle">Sign in with Google</el-button>
          </el-col>
        </el-row>
        <el-row class=" marginTop container-5" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <el-button class="apple-btn" plain icon="iconfont  el-icon-aliapple">Sign in with Apple</el-button>
          </el-col>
        </el-row>
        <el-row class="marginTop container-6" justify="center" align="middle">
          <el-col :xs="20" :sm="12" :md="12" :lg="8" :xl="6">
            <el-divider>OR</el-divider>
          </el-col>
        </el-row>

        <el-row class="marginTop container-7" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                label-position="top"
                class="demo-ruleForm"
            >
              <el-form-item prop="email">
                <el-input class="elInput" placeholder="name@work-email.com" v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="Enter your password" type="password" v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submit-btn" :loading="submitLoadingStatus" @click="submitForm('ruleForm')">
                  Sign in with email address
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row class="marginTop container-8" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <div class="container-8-tips">
              We’ll email you a magic code for a password-free sign-in. Or you can
              <router-link to="/register"> sign in manually instead.</router-link>
            </div>
          </el-col>
        </el-row>
      </el-main>

      <el-footer class="footer-container" height="auto">

        <el-row justify="center" align="middle">
          <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="6">
            <div class="footer-content">
              <router-link to="/privacy">Privacy & terms</router-link>

            </div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>


  </div>

</template>

<script>
import imgLogo from '@/assets/logo.png'
import {EMAIL_LOGIN} from "@/api/api";
import {useRoute, useRouter} from "vue-router";

export default {
  name: "index",
  data() {
    return {
      imgLogo,
      ruleForm: {
        email: ''
      },
      rules: {
        email: [
          {required: true, message: 'Please fill out your email address.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please enter your password', trigger: 'blur'}
        ]
      },
      submitLoadingStatus: false
    }
  },
  setup(){
    let router = useRouter()
    let route = useRoute()
    const getParams = () =>{
      console.log(route.query )
      return route.query;
    }

    const skipHomePage = () =>{
      return router.push(
          {
            path:'/'
          }
      )
    }

    return {
      getParams,
      skipHomePage
    }
  },
  methods: {
    submitForm(formName) {
      let self = this;
      this.submitLoadingStatus = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.ruleForm)
          EMAIL_LOGIN(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              localStorage.setItem('token', res.message.token)
              localStorage.setItem('identity', res.message.identity)
              localStorage.setItem('language', res.message.language)
              localStorage.setItem('email', res.message.email)
              setTimeout(function () {
                self.skipHomePage()
                self.submitLoadingStatus = false
              }, 2000)
            } else {
              this.$message.error(res.msg)
            }
          })

        } else {
          console.log('error submit!!')
          this.submitLoadingStatus = false
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  }
}
</script>

<style scoped>
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

/deep/ .el-input__inner {
  height: 50px !important;
}
</style>
