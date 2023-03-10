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

          <template v-if="userType ==='educator' ">
            <div class="signup-m-label">Let’s get started</div>
            <div class="signup-m-tips">
              Tell us more, we're curious!
            </div>
            <div class="signup-m-form">

              <el-form
                  :model="educatorForm"
                  :rules="educatorRules"
                  ref="educatorForms"
                  label-width="100px"
                  label-position="top"
                  class="demo-ruleForm"
              >
                <el-form-item label="Full Name" prop="name">
                  <el-input placeholder="Enter your Full Name" v-model="educatorForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Current Residence" prop="address">
                  <el-input placeholder="Enter your Residence" v-model="educatorForm.address"></el-input>
                </el-form-item>

                <el-form-item label="Nationality" prop="nationality">
                  <el-select v-model="educatorForm.nationality"
                             style="width: 100%;"
                             filterable
                             fit-input-width
                             :teleported="false"
                             placeholder="Select your Nationality">
                    <el-option v-for="(item,i) in nationalityOptions" :key="i" :label="item.name"
                               :value="item.name"></el-option>
                  </el-select>
                </el-form-item>

                <div class="continue-btn-container">
                  <el-button class="continue-btn" type="primary" @click="continueNextStep()">
                    Continue
                  </el-button>
                </div>

              </el-form>

            </div>

          </template>

          <template v-if="userType === 'school' ">
            <div class="signup-m-label">Let’s get started</div>
            <div class="signup-m-tips">
              Tell us about yourself a bit.
            </div>
            <div class="signup-m-form">

              <el-form
                  :model="schoolForm"
                  :rules="schoolRules"
                  ref="schoolForms"
                  label-width="100px"
                  label-position="top"
                  class="demo-ruleForm"
              >
                <el-form-item label="Country" prop="country">
                  <el-select v-model="countryObj"
                             style="width: 100%;"
                             :teleported="false"
                             @change="countryChange"
                             value-key="id"
                             filterable
                             placeholder="Select your Country">
                    <el-option v-for="(item,i) in countryOptions" :key="i" :label="item.name"
                               :value="item"></el-option>
                  </el-select>

                </el-form-item>

                <el-form-item label="City" prop="city">
                  <el-select v-model="cityObj"
                             style="width: 100%;"
                             :teleported="false"
                             class="account-location-select"
                             value-key="id"
                             filterable
                             @change="cityChange"
                             placeholder="Select your city">
                    <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.name"
                               :value="item"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="School Name" prop="name">
                  <el-input placeholder="Enter your School Name" v-model="schoolForm.company_name"></el-input>
                </el-form-item>

                <div class="continue-btn-container">
                  <el-button class="continue-btn" type="primary" @click="continueNextStep()">
                    Continue
                  </el-button>
                </div>

              </el-form>

            </div>


          </template>

          <template v-if="userType === 'recruiter' ">
            <div class="signup-m-label">Let’s get started</div>
            <div class="signup-m-tips">
              Tell us about yourself a bit.
            </div>
            <div class="signup-m-form">

              <el-form
                  :model="recruiterForm"
                  :rules="recruiterRules"
                  ref="recruiterForms"
                  label-width="100px"
                  label-position="top"
                  class="demo-ruleForm"
              >
                <el-form-item label="Company Name" prop="name">
                  <el-input placeholder="Enter your Company Name" v-model="recruiterForm.company_name"></el-input>
                </el-form-item>

                <el-form-item label="Country" prop="name">
                  <el-input placeholder="Select your Country" v-model="recruiterForm.company_name"></el-input>
                </el-form-item>

                <div class="continue-btn-container">
                  <el-button class="continue-btn" type="primary" @click="continueNextStep()">
                    Continue
                  </el-button>
                </div>

              </el-form>

            </div>
          </template>

          <template v-if="userType === 'other' ">
            <div class="signup-m-label">Let’s get started</div>
            <div class="signup-m-tips">
              Tell us about yourself a bit.
            </div>
            <div class="signup-m-form">

              <el-form
                  :model="otherForm"
                  :rules="otherRules"
                  ref="otherForms"
                  label-width="100px"
                  label-position="top"
                  class="demo-ruleForm"
              >
                <el-form-item label="Company Name" prop="name">
                  <el-input placeholder="Enter your Company Name" v-model="otherForm.company_name"></el-input>
                </el-form-item>

                <div class="continue-btn-container">
                  <el-button class="continue-btn" type="primary" @click="continueNextStep()">
                    Continue
                  </el-button>
                </div>

              </el-form>

            </div>

          </template>

          <template v-if="userType === 'vendor' ">
            <div class="signup-m-label">Boost your Business</div>
            <div class="signup-m-tips">
              Tell us about yourself a bit.
            </div>
            <div class="signup-m-form">

              <el-form
                  :model="vendorForm"
                  :rules="vendorRules"
                  ref="vendorForms"
                  label-width="100px"
                  label-position="top"
                  class="demo-ruleForm"
              >
                <el-form-item label="Business Name" prop="company_name">
                  <el-input placeholder="Enter your Business Name" v-model="vendorForm.company_name"></el-input>
                </el-form-item>

                <div class="continue-btn-container">
                  <el-button class="continue-btn" type="primary" @click="continueNextStep()">
                    Continue
                  </el-button>
                </div>

              </el-form>

            </div>
          </template>


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

          <stepComponent :userType="userType" :step-index="2"></stepComponent>

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
import {ref, reactive, onMounted} from 'vue'
import {countriesData} from "@/utils/data";
import stepComponent from "@/components/register/stepComponent.vue";
import {ElMessage} from 'element-plus'
import {encodeByJsBase64} from "@/utils/utils";
import {GET_COUNTRY_LIST} from "@/api/api";

export default {
  name: "accountCreation",
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


    const educatorForms = ref(null)
    const educatorForm = reactive({
      first_name: '',
      last_name: '',
      address:'',
      nationality:''
    })

    const educatorRules = reactive({
      first_name: [
        {
          required: true,
          message: 'Enter your first name',
          trigger: 'blur',
        }
      ],
      last_name: [
        {
          required: true,
          message: "Enter your last name",
          trigger: 'blur',
        },
      ],
      address: [
        {
          required: true,
          message: "Enter your Residence",
          trigger: 'blur',
        },
      ],
      nationality: [
        {
          required: true,
          message: "Select your Nationality",
          trigger: 'change',
        },
      ],

    })

    const schoolForms = ref(null)
    const schoolForm = reactive({
      country:'',
      city:'',
      company_name:''
    })

    const schoolRules = reactive({})

    const recruiterForms = ref(null)
    const recruiterForm = reactive({})

    const recruiterRules = reactive({})

    const otherForms = ref(null)
    const otherForm = reactive({})

    const otherRules = reactive({})

    const vendorForms = ref(null)
    const vendorForm = reactive({
      company_name:''
    })

    const vendorRules = reactive({
      company_name: [
        {required: true, message: 'Enter your Business Name', trigger: 'blur'}
      ],
    })

    function continueNextStep() {

      let forms = {}

      if(userType === 'educator'){
         forms = educatorForms.value
      }
      if(userType === 'school'){
        forms = schoolForms.value
      }
      if(userType === 'recruiter'){
        forms = recruiterForms.value
      }
      if(userType === 'other'){
        forms = otherForms.value
      }
      if(userType === 'vendor'){
        forms = vendorForms.value
      }

      forms.validate((valid)=>{
        if(valid){
          let params = {}

          if(userType === 'educator'){
            params = Object.assign({},educatorForm)
          }

          if(userType === 'school'){
            params = Object.assign({},schoolForm)
          }

          if(userType === 'recruiter'){
            params = Object.assign({},recruiterForm)
          }

          if(userType === 'other'){
            params = Object.assign({},otherForm)
          }

          if(userType === 'vendor'){
            params = Object.assign({},vendorForm)
          }
          let formInfo = encodeByJsBase64(JSON.stringify(params))
          router.push({path: '/signup/accountCreation', query: {type: userType,formInfo: formInfo}})

        }else{
          console.log('error submit!!')
          ElMessage({
            type:'warning',
            message:'Please complete all required fields',
            grouping:true
          })
          return false
        }

      })

    }

    const countryOptions = ref([])
    const countryObj = ref({})

    function getAllCountry(){
      let params = {
      }

      GET_COUNTRY_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          countryOptions.value = res.message;
        }
      }).catch(err=>{
        ElMessage({
          type:'warning',
          message:err.msg,
          grouping:true
        })

      })
    }


    function countryChange(){
      getAllCity()
    }

    const cityOptions = ref([])
    const cityObj = ref({})

    function getAllCity(){
      let params = {
        country_id:1,
        state_id:1
      }
      GET_COUNTRY_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.cityOptions = res.message;
        }
      }).catch(err=>{
        ElMessage({
          type:'warning',
          message:err.msg,
          grouping:true
        })

      })
    }

    function cityChange(e){
      console.log(e)
    }

    function turnBack() {
      router.go(-1)
    }

    onMounted(()=>{
      getAllCountry()
    })

    return {

      educatorForms,
      educatorForm,
      educatorRules,
      schoolForms,
      schoolForm,
      schoolRules,
      recruiterForms,
      recruiterForm,
      recruiterRules,
      otherForms,
      otherForm,
      otherRules,
      vendorForms,
      vendorForm,
      vendorRules,

      userType,
      turnBack,
      continueNextStep,
      turnHome,
      backToLogin,
      countryOptions,
      countryObj,
      countryChange,

      cityOptions,
      cityObj,
      cityChange

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
//margin: 100px auto 20px; margin: 40px auto 20px;
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
</style>