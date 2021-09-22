<template>
  <div>
    <el-container>
      <el-header class="container-1" height="auto">
        <el-row  justify="center" align="middle">
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <div class="logo-container">
              <router-link class="logo-title" to="/">
                <el-image class="logo-img" :src="imgLogo" fit="contain"></el-image>
              </router-link>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <el-main >
        <el-row class="container-2" justify="center" align="middle">
          <el-col :xs="0" :sm="12" :md="12" :lg="8" :xl="8">
            <h1>Log in to your account</h1>
          </el-col>
        </el-row>

        <el-row class="marginTop container-3" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                label-position="top"
                class="demo-ruleForm"
            >
              <el-form-item label="Enter your work email address" prop="email">
                <el-input placeholder="name@work-email.com" v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submit-btn" :loading="submitLoadingStatus" @click="submitForm('ruleForm')">
                  Next >
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row class="marginTop container-4" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <el-divider>Or Sign in with</el-divider>
          </el-col>
        </el-row>

        <el-row class=" marginTop container-5" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <el-button class="google-btn" plain icon="iconfont  el-icon-aligoogle">Sign in with Google</el-button>
          </el-col>
        </el-row>
        <el-row class="marginTop container-6" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <el-button class="apple-btn" plain icon="iconfont  el-icon-aliapple">Sign in with Apple</el-button>
          </el-col>
        </el-row>

        <el-row class="marginTop container-7" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <div class="container-7-tips">
              Don't have an account yet?
              <router-link to="/login"> Sign up</router-link>
            </div>
          </el-col>
        </el-row>
      </el-main>

      <el-footer class="footer-container" height="auto">

        <el-row  justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
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
import {useRoute, useRouter} from "vue-router";
import {SEND_EMAIL_CODE} from "@/api/api";

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
        ]
      },
      submitLoadingStatus: false
    }
  },
  setup(){

    let router = useRouter()
    let route = useRoute()
    const skipConfirmEmail = (query) =>{
      router.push({
        path:'/confirmemail',
        query:query
      })
    }
    const getParams = () =>{
      console.log(route.params)
    }
    return {
      skipConfirmEmail,
      getParams
    }
  },
  methods: {
    submitForm(formName) {
      let self = this;
      this.submitLoadingStatus = true;
      let routerQuery = {
        email: encodeURIComponent(this.ruleForm.email)
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({},this.ruleForm)
          SEND_EMAIL_CODE(params).then(res=>{
            if(res.code == 200){
              this.$message.success('Success')

              setTimeout(function () {
                self.skipConfirmEmail(routerQuery)
                self.submitLoadingStatus = false
              }, 1000)

            }else{
              this.$message.error(res.msg)
            }
            // console.log(res)
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
.marginTop{
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

.container-7-tips {
  background-color: #eeeeee;
  padding: 20px;
  border-radius: 6px;
  font-size: 16px;
  line-height: 20px;
  color: #808080;
}

.container-7-tips a {
  text-decoration: none;
  color: #00b3d2;
}

.footer-container{
  margin-top: 20px;
}

.footer-content a{
  color: #000000;
}

/deep/ .el-input__inner{
  height: 50px !important;
}
</style>
