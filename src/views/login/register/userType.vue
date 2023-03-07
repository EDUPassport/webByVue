<template>
  <div class="signup-bg">
    <el-row justify="center" align="top" class="signup-container">
      <el-col class="signup-l-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="signup-t" @click="turnHome()">
          <el-image class="signup-t-logo" :src="imgLogo"></el-image>
        </div>
        <div class="signup-m">

          <div class="signup-m-label">Let’s get onboarded</div>
          <div class="signup-m-tips">
            Don't be shy, introduce yourself!
          </div>

          <div class="signup-m-form">

            <div class="user-type-container">
              <div class="user-type" :class="userType === 1 ? 'user-type-active' : ''" @click="selectEducator()">
                <div class="user-type-l">
                  <template v-if="userType === 1">
                    <el-image :src="educatorActiveImg" fit="cover"></el-image>
                  </template>
                  <template v-else>
                    <el-image :src="educatorImg" fit="cover"></el-image>
                  </template>

                </div>
                <div class="user-type-r">
                  <div class="user-type-r-label">
                    I’m an Educator
                  </div>
                  <div class="user-type-r-tips">
                    I'm looking for work opportunities
                  </div>
                </div>
              </div>
              <div class="user-type" :class="userType === 2 ? 'user-type-active' : ''" @click="selectBusiness()">
                <div class="user-type-l">
                  <template v-if="userType === 2">
                    <el-image :src="businessActiveImg" fit="cover"></el-image>
                  </template>
                  <template v-else>
                    <el-image :src="businessImg" fit="cover"></el-image>
                  </template>
                </div>
                <div class="user-type-r">
                  <div class="user-type-r-label">
                    I’m an Education Business
                  </div>
                  <div class="user-type-r-tips">
                    I want to recruit educators
                  </div>
                </div>
              </div>

              <div class="user-type" :class="userType === 5 ? 'user-type-active' : ''" @click="selectVendor()">
                <div class="user-type-l">
                  <template v-if="userType === 5">
                    <el-image :src="vendorActiveImg" fit="cover"></el-image>
                  </template>
                  <template v-else>
                    <el-image :src="vendorImg" fit="cover"></el-image>
                  </template>
                </div>
                <div class="user-type-r">
                  <div class="user-type-r-label">
                    I’m a Vendor
                  </div>
                  <div class="user-type-r-tips">
                    I want to provide deals and increase sales
                  </div>
                </div>
              </div>

            </div>

            <div class="continue-btn-container">
              <el-button class="continue-btn" type="primary" @click="continueNextStep()">
                Continue
              </el-button>
            </div>

            <div class="signup-m-form-sign-in">
              Already have an account?
              <el-button link type="primary" @click="backToLogin()">Sign in</el-button>
            </div>

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
            <template v-if="userType===1">For Educators</template>
            <template v-if="userType===2">For Education Business</template>
            <template v-if="userType===5">For Vendors</template>
          </div>

          <div class="signup-r-tips">
            <template v-if="userType===1">Hey, there! 👋 Seeking work opportunities? We're here to connect you with the best options in the business.</template>
            <template v-if="userType===2">Hey, there! :wave: Looking for top-notch educators? We've made recruiting easy and efficient.</template>
            <template v-if="userType===5">Hey, there! :wave: Wanting to boost your sales? We'll be showcasing your products and services to educators worldwide.</template>
          </div>

          <div class="signup-r-image-container">
            <el-image :src="imageDefault"></el-image>
          </div>

        </div>
        <el-image></el-image>
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

import {useRouter} from 'vue-router'
import {ref} from 'vue'

export default {
  name: "selectUserType",
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
      imageDefault
    }
  },
  setup() {

    const router = useRouter()
    const userType = ref(1)

    function turnHome() {
      return router.push('/')
    }

    function backToLogin() {
      return router.push('/login')
    }

    function selectEducator() {
      userType.value = 1
    }

    function selectBusiness() {
      userType.value = 2
    }

    function selectVendor() {
      userType.value = 5
    }

    function continueNextStep(){
      router.push({path:'/signup/fillOutInfo',query:{type:userType.value}})
    }

    return {
      userType,
      continueNextStep,
      selectEducator,
      selectBusiness,
      selectVendor,
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
  margin: 100px auto 20px;
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
  margin-top: 30px;

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
  margin-top: 30px;
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
  font-size: 32px;
  line-height: 40px;
  color: #1D2939;

  margin: 80px 0 0 60px;

}

.signup-r-tips{
  font-family: 'Inter',Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #667085;

  margin: 15px 80px 0 60px;

}

.signup-r-image-container{
  margin-top: auto;
  margin-bottom: 0;
  margin-left: 130px;
  height: 690px;
  background-color: #FFFFFF;
  border-top-left-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>