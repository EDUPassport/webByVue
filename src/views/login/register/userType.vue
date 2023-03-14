<template>
  <div class="signup-bg">
    <el-row justify="center" align="top" class="signup-container">
      <el-col class="signup-l-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="signup-t" @click="turnHome()">
          <el-image class="signup-t-logo" :src="imgLogo"></el-image>
        </div>

        <div class="signup-m">

          <div class="signup-back-btn-container" v-if="businessStatus">
            <el-button plain @click="turnBack()">
              <el-icon style="margin-right: 10px;">
                <Back />
              </el-icon>
              Back
            </el-button>
          </div>

          <template v-if="userType === 'educator' ">
            <div class="signup-m-label">Let’s get onboarded</div>
            <div class="signup-m-tips">
              Don't be shy, introduce yourself!
            </div>
          </template>
          <template
              v-if="userType === 'business' || userType === 'recruiter' || userType === 'school' || userType === 'other' ">
            <div class="signup-m-label">Signup to EDU Passport</div>
            <div class="signup-m-tips">
              Tell us about yourself a bit.
            </div>
          </template>

          <template v-if="userType === 'vendor' ">
            <div class="signup-m-label">Let’s get onboarded</div>
            <div class="signup-m-tips">
              Don't be shy, introduce yourself!
            </div>
          </template>

          <div class="signup-m-form">

            <div class="user-type-container">

              <div class="user-type"
                   v-for="(item,index) in userTypeData" :key="index"
                   :class="userType === item.type ? 'user-type-active' : ''"
                   @click="selectUserType(item.type)">

                <div class="user-type-l">

                  <template v-if="userType === item.type ">
                    <el-image :src="item.icon_active" fit="cover"></el-image>
                  </template>
                  <template v-else>
                    <el-image :src="item.icon" fit="cover"></el-image>
                  </template>

                </div>
                <div class="user-type-r">
                  <div class="user-type-r-label">
                    {{ item.label }}
                  </div>
                  <div class="user-type-r-tips">
                    {{ item.tips }}
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

          <template v-if="businessStatus">
            <div class="signup-r-label">
              Signup Progress
            </div>

            <stepComponent :userType="userType"  :step-index="2" ></stepComponent>
          </template>

          <template v-else>

            <div class="signup-r-label">
              <template v-if="userType=== 'educator' ">For Educators</template>
              <template v-if="userType=== 'business' ">For Education Business</template>
              <template v-if="userType=== 'vendor' ">For Vendors</template>
            </div>

            <div class="signup-r-tips">
              <template v-if="userType=== 'educator'">Hey, there! 👋 Seeking work opportunities? We're here to connect
                you with the best options in the business.
              </template>
              <template v-if="userType=== 'business' ">Hey, there! Looking for top-notch educators? We've made
                recruiting easy and efficient.
              </template>
              <template v-if="userType=== 'vendor' ">Hey, there! Wanting to boost your sales? We'll be showcasing your
                products and services to educators worldwide.
              </template>
            </div>

            <div class="signup-r-image-container">
              <el-image :src="imageDefault"></el-image>
            </div>
          </template>

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
import schoolImg from '@/assets/newHome/register/school-icon.png'
import schoolActiveImg from '@/assets/newHome/register/school-icon-active.png'
import recruiterImg from '@/assets/newHome/register/recruiter-icon.png'
import recruiterActiveImg from '@/assets/newHome/register/recruiter-icon-active.png'
import otherImg from '@/assets/newHome/register/other-icon.png'
import otherActiveImg from '@/assets/newHome/register/other-icon-active.png'

import {useRouter, useRoute} from 'vue-router'
import {ref, onMounted} from 'vue'
import stepComponent from "@/components/register/stepComponent.vue";

export default {
  name: "selectUserType",
  components: {
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
      schoolImg,
      schoolActiveImg,
      recruiterImg,
      recruiterActiveImg,
      otherImg,
      otherActiveImg
    }
  },
  setup() {

    const router = useRouter()
    const route = useRoute()

    const userType = ref('educator')

    const businessStatus = ref(false)

    let userTypeDataArr = [
      {
        type: 'educator',
        icon: educatorImg,
        icon_active: educatorActiveImg,
        label: 'I’m an Educator',
        tips: 'I want to find education jobs'
      },
      {
        type: 'business',
        icon: businessImg,
        icon_active: businessActiveImg,
        label: 'I’m an Education Business',
        tips: 'I want to recruit educators'
      },
      {
        type: 'vendor',
        icon: vendorImg,
        icon_active: vendorActiveImg,
        label: 'I’m a Vendor',
        tips: 'I want to provide deals and increase sales'
      }
    ]

    let userTypeForBusinessData = [
      {
        type: 'school',
        icon: schoolImg,
        icon_active: schoolActiveImg,
        label: 'I represent a School',
        tips: "I'm looking for educators for my school."
      },
      {
        type: 'recruiter',
        icon: recruiterImg,
        icon_active: recruiterActiveImg,
        label: "I’m a Recruiter",
        tips: 'I want to recruit educators'
      },
      {
        type: 'other',
        icon: otherImg,
        icon_active: otherActiveImg,
        label: 'Other',
        tips: 'I want to provide deals and increase sales'
      }
    ]

    const userTypeData = ref(userTypeDataArr)

    function turnHome() {
      return router.push('/')
    }

    function backToLogin() {
      return router.push('/login')
    }

    function turnBack(){
      businessStatus.value = false;
      userTypeData.value = userTypeDataArr
    }

    function selectUserType(type) {
      userType.value = type
      router.replace({path:'/signup',query:{type:type}})
    }


    function continueNextStep() {
      if (userType.value === 'business') {
        businessStatus.value = true;
        userTypeData.value = userTypeForBusinessData

      } else {
        router.push({path: '/signup/fillOutInfo', query: {type: userType.value}})
      }

    }

    onMounted(()=>{

      let typeValue = route.query.type;

      if(typeValue){
        userType.value = typeValue
        if(typeValue === 'school' || typeValue === 'recruiter' || typeValue === 'other'){
          businessStatus.value = true;
          userTypeData.value = userTypeForBusinessData
        }

      }

    })

    return {
      userType,
      userTypeData,
      businessStatus,
      selectUserType,
      continueNextStep,
      turnHome,
      turnBack,
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
  //max-width: 1440px;
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

.signup-r-container {
  display: flex;
  flex-direction: column;
  height: 100%;

}

.signup-r-label {
  font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #1D2939;

  margin: 80px 0 0 60px;

}

.signup-r-tips {
  font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #667085;

  margin: 15px 80px 0 60px;

}

.signup-r-image-container {
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