<template>
  <div class="signup-bg">
    <el-row justify="center" align="top" class="signup-container">
      <el-col class="signup-l-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="signup-t" @click="turnHome()">
          <el-image class="signup-t-logo" :src="imgLogo"></el-image>
        </div>
        <div class="signup-m">

          <div class="signup-back-btn-container">
            <el-button plain @click="turnBack()">
              <el-icon style="margin-right: 10px;">
                <Back/>
              </el-icon>
              Back
            </el-button>
          </div>

          <template v-if="userType === 'educator' ">
            <div class="signup-m-label">Setup Password</div>
            <div class="signup-m-tips">
              Enter and confirm your password.
            </div>
          </template>
          <template v-if="userType === 'school' ">
            <div class="signup-m-label">Setup Password</div>
            <div class="signup-m-tips">
              Enter and confirm your password.
            </div>
          </template>
          <template v-if="userType === 'recruiter' ">
            <div class="signup-m-label">Setup Password</div>
            <div class="signup-m-tips">
              Enter and confirm your password.
            </div>
          </template>
          <template v-if="userType === 'other' ">
            <div class="signup-m-label">Setup Password</div>
            <div class="signup-m-tips">
              Enter and confirm your password.
            </div>
          </template>
          <template v-if="userType === 'vendor' ">
            <div class="signup-m-label">Setup Password</div>
            <div class="signup-m-tips">
              Enter and confirm your password.
            </div>

          </template>

          <div class="signup-m-form">

            <el-form
                :model="signForm"
                :rules="signRules"
                ref="signForms"
                label-width="100px"
                label-position="top"
                class="demo-ruleForm"
            >

              <el-form-item label="Password" prop="password">
                <el-input show-password placeholder="Enter your password" v-model="signForm.password"></el-input>
              </el-form-item>
              <el-form-item label="Confirm Password" prop="c_password">
                <el-input show-password placeholder="Confirm your password"
                          v-model="signForm.c_password"></el-input>
              </el-form-item>

              <div class="continue-btn-container">
                <el-button class="continue-btn"
                           type="primary"
                           :loading="confirmLoadingStatus"
                           @click="confirmForm(signForms)">
                  Confirm
                </el-button>
              </div>

            </el-form>

          </div>

        </div>
        <div class="signup-b">
          <div class="signup-copyright">
            © EDU Passport 2023
          </div>
        </div>
      </el-col>

      <el-col class="signup-r-col" :xs="0" :sm="0" :md="12" :lg="12" :xl="12">
        <div class="signup-r-container">
          <div class="signup-r-label">
            Signup Progress
          </div>

          <stepComponent :userType="userType" :step-index="userStepIndex"></stepComponent>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import imgLogo from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'

import {useRouter, useRoute} from 'vue-router'
import {ref, reactive,onMounted} from 'vue'
import stepComponent from "@/components/register/stepComponent.vue";
import {decodeByJsBase64} from "@/utils/utils";
import {ElMessage,ElMessageBox } from 'element-plus'
import {EMAIL_REGISTER_V2} from "@/api/api";

export default {
  name: "passwordSetup",
  components: {
    stepComponent
  },
  data() {
    return {
      imgLogo
    }
  },
  setup() {

    const router = useRouter()
    const route = useRoute()

    const userType = route.query.type;
    const userStepIndex = ref(4)
    const confirmLoadingStatus = ref(false)

    function turnHome() {
      return router.push('/')
    }

    function backToLogin() {
      return router.push('/login')
    }


    const signForms = ref(null)
    const signForm = reactive({
      password: '',
      c_password: ''
    })

    const checkConfirmPassword = (rule,value,callback)=>{
      if(value === ''){
        callback(new Error('Confirm your password'))
      }else if(value !== signForm.password){
        callback(new Error('password doesn’t match'))
      }else{
        callback()
      }
    }

    const signRules = reactive({
      password: [
        {required: true, message: 'Enter your password', trigger: 'blur'}
      ],
      c_password: [
        {required: true, validator:checkConfirmPassword, trigger: 'blur'}
      ]
    })

    function turnBack() {
      router.go(-1)
    }

    function confirmForm(formName) {

      formName.validate((valid)=>{
        if(valid){
          confirmLoadingStatus.value = true

          let routeFormInfo = decodeByJsBase64(route.query.formInfo)
          let formDecode = JSON.parse(routeFormInfo)

          if(userType === 'educator'){
            signForm.identity = 1
          }else if(userType === 'school'){
            signForm.identity = 3
          }else if(userType === 'recruiter'){
            signForm.identity = 2
          }else if(userType === 'other'){
            signForm.identity = 4
          }else if(userType === 'vendor'){
            signForm.identity = 5
          }

          let params = Object.assign(formDecode,signForm)

          console.log(params)

          EMAIL_REGISTER_V2(params).then(res => {
            console.log(res)
            if (res.code == 200) {

              confirmLoadingStatus.value = false

              ElMessageBox({
                title: "All Set",
                message: "Let's get you logged in!",
                dangerouslyUseHTMLString: false,
                type: "success",
                center: true,
                confirmButtonText: "OK",
                "round-button": true,
                callback(action) {
                  if (action === 'confirm') {
                     router.push({path: '/login', query: {email: formDecode.email}})
                  }
                }

              })

            }

          }).catch(err => {
            console.log(err)
            confirmLoadingStatus.value = false

            if (err.msg) {
              ElMessage({
                type:'warning',
                message: err.msg,
                grouping:true
              })
              return;
            }

            if (err.message) {
              ElMessage({
                type:'warning',
                message: err.message,
                grouping:true
              })
            }
          })


        }else{
          console.log('error submit!!')
          return false
        }

      })

    }

    onMounted(()=>{
      if(userType === 'school' || userType === 'recruiter' || userType === 'other'){
        userStepIndex.value = 5
      }
    })

    return {
      userStepIndex,
      signForms,
      signForm,
      signRules,
      userType,
      confirmLoadingStatus,
      turnBack,
      confirmForm,
      turnHome,
      backToLogin
    }

  }
}
</script>

<style scoped>

.signup-bg {
  background-color: #FFFFFF;
}

.signup-container {

  margin: 0 auto;
  height: 100vh;
}

.signup-l-col {
  display: flex;
  flex-direction: column;
}


.signup-t {
  margin: 30px 0 0 40px;
  cursor: pointer;
}

.signup-t-logo {
  width: 180px;
}

.signup-m {
  min-width: 380px;

  margin: 40px auto 20px;
  padding-top: 60px;
  position: relative;
}

.signup-back-btn-container {
  position: absolute;
  top: 0;
  left: 0;
}

.signup-m-icon {
  text-align: center;
}

.signup-m-label {
  text-align: center;

  font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  color: #101828;
  margin-top: 60px;

}

.signup-m-tips {
  font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #667085;
  margin-top: 20px;
}

.signup-m-form {
  margin-top: 40px;
}

.user-type-container {

}

.user-type {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 20px;
  border: 1px solid #D0D5DD;
  border-radius: 8px;

  margin-bottom: 20px;
  cursor: pointer;

}

.user-type:hover {
  border: 1px solid #6648FF;
}

.user-type-active {
  border: 1px solid #6648FF;
  border-radius: 8px;
}

.user-type-r {
  margin-left: 20px;
}

.user-type-r-label {
  font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #1D2939;
}

.user-type-r-tips {
  font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #667085;
}

.continue-btn-container {
  margin-top: 50px;
}

.continue-btn {
  width: 100%;
}

.signup-m-form-sign-in {
  margin-top: 24px;

  font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #5E5E5E;

  display: flex;
  align-items: center;
  justify-content: center;

}

.signup-r-col {
  background: #F2F4F7;
  overflow: hidden;
}

.signup-r-container {
  display: flex;
  flex-direction: column;
  height: 100%;

}

.signup-r-label {

  font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #1D2939;

  margin: 60px 0 0 60px;

}

.signup-b {
  margin-top: auto;
  margin-left: 40px;
  margin-bottom: 25px;
}

.signup-copyright {
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;

  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;

  color: #667085;
}


@media screen and (max-width: 1399px) {
  .signup-container{
    width: 100%;
  }
}

@media screen and (min-width: 1400px){
  .signup-container{
    max-width: 1400px;
  }
}
</style>