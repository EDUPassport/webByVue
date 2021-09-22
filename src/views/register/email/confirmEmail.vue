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
            <h1>Check your email for a code</h1>
            <span>
              We’ve sent a six-digit code to {{ruleForm.email}}. The code will expire shortly, so please enter it soon.
            </span>
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
              <el-form-item prop="code">
                <el-input placeholder="Enter your email code" type="number" :maxlength="6" v-model="ruleForm.code"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="Enter your password" type="password" v-model="ruleForm.password"></el-input>
              </el-form-item>
              <el-form-item prop="c_password">
                <el-input placeholder="Enter your password again" type="password" v-model="ruleForm.c_password" ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submit-btn" :loading="submitLoadingStatus" @click="submitForm('ruleForm')">
                  Confirm
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>

        <el-row class="marginTop container-4" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <el-divider></el-divider>
          </el-col>
        </el-row>

        <el-row class="marginTop container-7" justify="center" align="middle">
          <el-col :xs="22" :sm="12" :md="12" :lg="8" :xl="6">
            <div class="container-7-tips">
              Can’t find your code? Check your spam folder!
              <router-link to="/login">Try again</router-link>
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
import {EMAIL_REGISTER} from "@/api/api";

export default {
  name: "confirmEmail",
  data() {
    return {
      imgLogo,
      emailValue:'',
      ruleForm: {
        email: '',
        code:'',
        password:'',
        c_password:''
      },
      rules: {
        code: [
          {required: true, message: 'Please fill out your email code.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please fill out your password.', trigger: 'blur'}
        ],
        c_password: [
          {required: true, message: 'Please fill out your password again.', trigger: 'blur'}
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

    const skipLoginPage = () =>{
      return router.push(
          {
            path:'/login'
          }
      )
    }

    return {
      getParams,
      skipLoginPage
    }
  },
  mounted() {
    let params = this.getParams()
    this.ruleForm.email = decodeURIComponent(params.email) ;

  },
  methods: {
    submitForm(formName) {
      let self = this;
      this.submitLoadingStatus = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({},this.ruleForm)
          EMAIL_REGISTER(params).then(res=>{
            console.log(res)
            if(res.code == 200){
                // let userInfo = res.message
              // localStorage.setItem('uid',res.message.id)
              this.$message.success('Register Success! ')
              this.skipLoginPage()
            }

          })

          setTimeout(function () {
            self.submitLoadingStatus = false
          }, 2000)
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

.container-2 span{
  line-height:30px;
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
