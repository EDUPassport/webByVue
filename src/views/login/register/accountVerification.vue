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
                  type="email"
                  :email="formInfoDecode.email"
                  text="Resend Code"
                  success-text="Resend Code Successfully">
              </check-code-button>

              <div class="continue-btn-container">
                <el-button class="continue-btn" type="primary" :disabled="nextDisabledStatus" @click="continueNextStep()">
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

          <stepComponent :userType="userType" :step-index="4"></stepComponent>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import imgLogo from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
import passwordLockImg from '@/assets/newHome/login/password-lock.png'
import educatorImg from '@/assets/newHome/register/educator.png'
import educatorActiveImg from '@/assets/newHome/register/educator-active.png'
import businessImg from '@/assets/newHome/register/business.png'
import businessActiveImg from '@/assets/newHome/register/business-active.png'
import vendorImg from '@/assets/newHome/register/vendor.png'
import vendorActiveImg from '@/assets/newHome/register/vendor-active.png'
import imageDefault from '@/assets/newHome/register/image-rectangle.png'


import {useRouter, useRoute} from 'vue-router'
import {ref, reactive} from 'vue'
import {countriesData} from "@/utils/data";
import stepComponent from "@/components/register/stepComponent.vue";
import sixInputVerificationCode from "@/components/register/sixInputVerificationCode.vue";
import checkCodeButton from "@/components/register/checkCodeButton.vue";
import {decodeByJsBase64} from "@/utils/utils";

export default {
  name: "accountVerification",
  components:{
    stepComponent,
    sixInputVerificationCode,
    checkCodeButton
  },
  data() {
    return {
      imgLogo,
      passwordLockImg,
      educatorImg,
      educatorActiveImg,
      businessImg,
      businessActiveImg,
      vendorImg,
      vendorActiveImg,
      imageDefault,
      nationalityOptions: countriesData,
    }
  },
  setup() {

    const router = useRouter()
    const route = useRoute()

    const userType = route.query.type;

    function turnHome() {
      return router.push('/')
    }

    function backToLogin() {
      return router.push('/login')
    }

    const routeFormInfo = route.query.formInfo
    const formInfoDecode = JSON.parse(decodeByJsBase64(routeFormInfo))

    function continueNextStep(){
      console.log(formInfoDecode)
      console.log(signForm)
      // router.push({path:'/signup/accountVerification',query:{type:userType.value}})
    }

    const signForms = ref(null)
    const signForm = reactive({
        code:''
    })

    const signRules = reactive({
      code: [
        {required: true, message: 'Please fill out your code.', trigger: 'blur'}
      ],
    })

    const nextDisabledStatus = ref(true)

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

    return {
      nextDisabledStatus,
      formInfoDecode,
      signForms,
      signForm,
      signRules,
      userType,
      turnBack,
      continueNextStep,
      turnHome,
      backToLogin,
      sixCodeComplete,
      disabledNext
    }

  }
}
</script>

<style scoped>

.signup-bg {
  background-color: #FFFFFF;
}

.signup-container {
  max-width: 1440px;
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

.xll-divider{
  margin-top: 20px;
}

/deep/ .el-divider__text {
  background-color: #FFFFFF;
  color: #D0D5DD;
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.sign-in-btn-container{
  width: 100%;
  margin-top: 20px;
}

.login-option-btn{
  width: 100%;
}

</style>