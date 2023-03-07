<template>
  <div class="signup-bg">
    <el-row justify="center" align="top" class="signup-container">
      <el-col class="signup-l-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="signup-t" @click="turnHome()">
          <el-image class="signup-t-logo" :src="imgLogo"></el-image>
        </div>
        <div class="signup-m">
          <div>
            <el-button plain>
              <el-icon style="margin-right: 10px;">
                <Back />
              </el-icon>
              Back
            </el-button>
          </div>
          <div class="signup-m-label">Let’s get started</div>
          <div class="signup-m-tips">
            Just a few more details, we're almost there.
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
              <el-form-item label="Email" prop="email">
                <el-input placeholder="Enter your email" v-model="signForm.name"></el-input>
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input show-password placeholder="Enter your password" v-model="signForm.password"></el-input>
              </el-form-item>
              <el-form-item label="Confirm Password" prop="confirm_password">
                <el-input show-password placeholder="Confirm your password" v-model="signForm.confirm_password"></el-input>
              </el-form-item>

              <div class="continue-btn-container">
                <el-button class="continue-btn" type="primary" @click="continueNextStep()">
                  Confirm
                </el-button>
              </div>

              <div class="xll-divider" >
                <el-divider content-position="center">OR</el-divider>
              </div>

              <div class="sign-in-btn-container">
                <el-button
                    class="login-option-btn"
                    plain
                >
                  <template #icon>
                    <el-icon>
                      <IconLogosGoogleIcon></IconLogosGoogleIcon>
                    </el-icon>
                  </template>
                  Sign in with Google
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

          <stepComponent :identity="userIdentity" :step-index="3"></stepComponent>

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

export default {
  name: "accountCreation",
  components:{
    stepComponent
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
    const userType = ref(1)

    const userIdentity = route.query.type;

    function turnHome() {
      return router.push('/')
    }

    function backToLogin() {
      return router.push('/login')
    }

    function continueNextStep(){
      router.push({path:'/signup/fillOutInfo',query:{type:userType.value}})
    }

    const signForms = ref(null)
    const signForm = reactive({

    })

    const signRules = reactive({

    })

    return {
      userIdentity,
      signForms,
      signForm,
      signRules,
      userType,
      continueNextStep,
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
  margin: 40px auto 20px;
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