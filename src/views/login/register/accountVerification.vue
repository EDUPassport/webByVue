<template>
  <div class="signup-bg">
    <el-row justify="center" align="top" class="signup-container">
      <el-col class="signup-l-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="signup-t" @click="turnHome()">
          <el-image class="signup-t-logo" :src="imgLogo"></el-image>
        </div>
        <div class="signup-m">
          <div class="signup-back-btn-container">
            <el-button size="small" plain @click="turnBack()">
              <el-icon style="margin-right: 10px;">
                <Back />
              </el-icon>
              Back
            </el-button>
          </div>

          <div class="signup-m-label">Verification Code</div>
          <div class="signup-m-tips">
            A verification code has been sent to your email address.
          </div>

          <div class="signup-m-form">

            <el-form
                :model="signForm"
                :rules="signRules"
                ref="signForms"
                label-width="100px"
                label-position="top"
                class="demo-ruleForm"
            >
              <el-form-item label="6-Digit-Code" prop="code">
                <sixInputVerificationCode @disabled="disabledNext" @complete="sixCodeComplete"></sixInputVerificationCode>
              </el-form-item>

              <check-code-button
                  type="email-register"
                  :email="formInfoDecode.email"
                  text="Resend Code"
                  success-text="Resend Code Successfully">
              </check-code-button>

              <div class="continue-btn-container">
                <el-button class="continue-btn"
                           size="large"
                           type="primary"
                           :loading="nextLoadingStatus"
                           :disabled="nextDisabledStatus"
                           @click="continueNextStep()">
                  Next
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
import sixInputVerificationCode from "@/components/register/sixInputVerificationCode.vue";
import checkCodeButton from "@/components/register/checkCodeButton.vue";
import {decodeByJsBase64, encodeByJsBase64} from "@/utils/utils";
import {REGISTER_EMAIL_CHECK} from "@/api/api";
import {ElMessage} from 'element-plus'

export default {
  name: "accountVerification",
  components:{
    stepComponent,
    sixInputVerificationCode,
    checkCodeButton
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
    const userStepIndex = ref(3)
    const nextLoadingStatus = ref(false)
    const nextDisabledStatus = ref(true)

    function turnHome() {
      return router.push('/')
    }

    function backToLogin() {
      return router.push('/login')
    }

    const routeFormInfo = route.query.formInfo
    const formInfoDecode = JSON.parse(decodeByJsBase64(routeFormInfo))


    const signForms = ref(null)
    const signForm = reactive({
        code:''
    })

    const signRules = reactive({
      code: [
        {required: true, message: 'Please fill out your code.', trigger: 'blur'}
      ],
    })


    function sixCodeComplete(e){
      console.log(e)
      signForm.code = e.join('')
    }

    function disabledNext(e){
      console.log(e)
      nextDisabledStatus.value = e;

    }

    function turnBack(){
      router.go(-1)
    }

    function continueNextStep(){
      console.log(formInfoDecode)
      console.log(signForm)

      if(!signForm.code || signForm.code === ''){
        return ElMessage({
          type:'warning',
          message:'Enter your verification code',
          grouping:true
        })
      }

      nextLoadingStatus.value =true

      let emailParams = {
        email:formInfoDecode.email,
        code:signForm.code
      }

      REGISTER_EMAIL_CHECK(emailParams).then(res=>{
        if(res.code == 200){
          // console.log(res)

          let routeFormInfo = decodeByJsBase64(route.query.formInfo)
          let formDecode = JSON.parse(routeFormInfo)

          let params = Object.assign(formDecode,signForm)
          let formInfo = encodeByJsBase64(JSON.stringify(params))

          router.push({path: '/signup/passwordSetup', query: { type: userType,formInfo:formInfo}})

          nextLoadingStatus.value = false

        }

      }).catch(err=>{
        console.log(err)
        nextLoadingStatus.value = false

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

    }

    onMounted(()=>{
      if(userType === 'school' || userType === 'recruiter' || userType === 'other'){
        userStepIndex.value = 4
      }
    })

    return {
      userStepIndex,
      nextDisabledStatus,
      formInfoDecode,
      signForms,
      signForm,
      signRules,
      userType,
      nextLoadingStatus,
      turnBack,
      continueNextStep,
      turnHome,
      backToLogin,
      sixCodeComplete,
      disabledNext
    }

  },
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
//margin: 100px auto 20px;
  margin: 40px auto 20px;
  padding-top: 60px;
  position: relative;
}

.signup-back-btn-container{
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


.continue-btn-container {
  margin-top: 50px;
}

.continue-btn {
  width: 100%;
}

.signup-r-col {
  background: #F2F4F7;
  overflow: hidden;
}

.signup-r-container{
  display: flex;
  flex-direction: column;
  height: 100%;

}

.signup-r-label{

  font-family: 'Inter',Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
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
