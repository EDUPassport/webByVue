<template>
  <div class="signup-bg">
    <el-row justify="center" align="top" class="signup-container">
      <el-col class="signup-l-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="signup-t" @click="turnHome()">
          <el-image class="signup-t-logo" :src="imgLogo"></el-image>
        </div>
        <div class="signup-m">

          <div class="signup-back-btn-container">
            <el-button  size="small" plain @click="turnBack()">
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
                <el-form-item label="First Name" prop="first_name">
                  <el-input placeholder="Enter your First Name"
                            :formatter="(value)=> validForbid(value) "
                            :parser="(value) => value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, '')"
                            v-model="educatorForm.first_name">
                  </el-input>
                </el-form-item>
                <el-form-item label="Last Name" prop="last_name">
                  <el-input placeholder="Enter your Last Name"
                            :formatter="(value)=> validForbid(value) "
                            :parser="(value) => value.replace(/[^\u4E00-\u9FA5a-zA-Z0-9]/g, '')"
                            v-model="educatorForm.last_name">
                  </el-input>
                </el-form-item>
                <el-form-item label="Current Residence" prop="current_residence">
                  <el-input placeholder="Enter your Residence" v-model="educatorForm.current_residence"></el-input>
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
                  <el-button class="continue-btn" size="large" type="primary" @click="continueNextStep()">
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
                <el-form-item label="Country" prop="country_id">
                  <el-select v-model="schoolForm.country_id"
                             style="width: 100%;"
                             :teleported="false"
                             @change="countryChange(schoolForm.country_id)"
                             value-key="id"
                             filterable
                             placeholder="Select your Country">
                    <el-option v-for="(item,i) in countryOptions"
                               :key="i"
                               :label="item.name"
                               :value="item.id">
                    </el-option>
                  </el-select>

                </el-form-item>

                <template v-if="stateOptions.length>0">
                  <el-form-item label="Province" prop="state_id">
                    <el-select v-model="schoolForm.state_id"
                               style="width: 100%;"
                               :teleported="false"
                               value-key="id"
                               filterable
                               @change="stateChange(schoolForm.country_id,schoolForm.state_id)"
                               placeholder="Select your province">
                      <el-option v-for="(item,i) in stateOptions"
                                 :key="i"
                                 :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>

                <template v-if="townOptions.length > 0">
                  <el-form-item label="City" prop="town_id">
                    <el-select v-model="schoolForm.town_id"
                               style="width: 100%;"
                               :teleported="false"
                               value-key="id"
                               filterable
                               @change="townChange"
                               placeholder="Select your city">
                      <el-option v-for="(item,i) in townOptions"
                                 :key="i"
                                 :label="item.name"
                                 :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>

                <el-form-item label="School Name" prop="company_name">
                  <el-input placeholder="Enter your School Name"
                            v-model="schoolForm.company_name">
                  </el-input>
                </el-form-item>

                <div class="continue-btn-container">
                  <el-button class="continue-btn" size="large" type="primary" @click="continueNextStep()">
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
                <el-form-item label="Company Name" prop="company_name">
                  <el-input placeholder="Enter your Company Name"
                            v-model="recruiterForm.company_name">
                  </el-input>
                </el-form-item>

                <el-form-item label="Country" prop="country_id">
                  <el-select v-model="recruiterForm.country_id"
                             style="width: 100%;"
                             :teleported="false"
                             value-key="id"
                             filterable
                             placeholder="Select your Country">
                    <el-option v-for="(item,i) in countryOptions"
                               :key="i"
                               :label="item.name"
                               :value="item.id">
                    </el-option>
                  </el-select>

                </el-form-item>

                <div class="continue-btn-container">
                  <el-button class="continue-btn" size="large" type="primary" @click="continueNextStep()">
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
                <el-form-item label="Company Name" prop="company_name">
                  <el-input placeholder="Enter your Company Name"
                            v-model="otherForm.company_name">
                  </el-input>
                </el-form-item>

                <div class="continue-btn-container">
                  <el-button class="continue-btn" size="large" type="primary" @click="continueNextStep()">
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
                  <el-input placeholder="Enter your Business Name"
                            v-model="vendorForm.company_name">
                  </el-input>
                </el-form-item>

                <div class="continue-btn-container">
                  <el-button class="continue-btn" size="large" type="primary" @click="continueNextStep()">
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

          <stepComponent :fromGoogle="registerRefGoogle" :userType="userType" :step-index="userStepIndex"></stepComponent>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import imgLogo from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
import {useRouter, useRoute} from 'vue-router'
import {ref, reactive, onMounted} from 'vue'
import {countriesData} from "@/utils/data";
import stepComponent from "@/components/register/stepComponent.vue";
import {ElMessage} from 'element-plus'
import {encodeByJsBase64,decodeByJsBase64} from "@/utils/utils";
import {EMAIL_REGISTER_V2, GET_COUNTRY_LIST} from "@/api/api";
import {ElMessageBox} from 'element-plus'

export default {
  name: "accountCreation",
  components: {
    stepComponent
  },
  data() {
    return {
      imgLogo,
      nationalityOptions: countriesData
    }
  },
  setup() {

    const router = useRouter()
    const route = useRoute()

    const userType = route.query.type;
    const userStepIndex = ref(2)
    const methodValue = route.query.method;
    const methodJson = methodValue ?  JSON.parse(decodeByJsBase64(methodValue)) : {}
    console.log(methodJson)

    const registerRefGoogle = ref(methodJson.method === 'Google_login')
    console.log(registerRefGoogle)

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
      current_residence:'',
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
      current_residence: [
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
      country_id:'',
      state_id:'',
      town_id:'',
      company_name:''
    })

    const schoolRules = reactive({
      company_name: [
        {
          required: true,
          message: 'Enter your School name',
          trigger: 'blur',
        }
      ]

    })

    const recruiterForms = ref(null)
    const recruiterForm = reactive({
      country_id:'',
      company_name:''
    })

    const recruiterRules = reactive({
      company_name: [
        {
          required: true,
          message: 'Enter your Company name',
          trigger: 'blur',
        }
      ]
    })

    const otherForms = ref(null)
    const otherForm = reactive({
      company_name:''
    })

    const otherRules = reactive({
      company_name: [
        {
          required: true,
          message: 'Enter your Company name',
          trigger: 'blur',
        }
      ]
    })

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
            params = Object.assign({
              identity:1
            },educatorForm)
          }

          if(userType === 'school'){
            params = Object.assign({
              identity:3
            },schoolForm)
          }

          if(userType === 'recruiter'){
            params = Object.assign({
              identity:2
            },recruiterForm)
          }

          if(userType === 'other'){
            params = Object.assign({
              identity:4
            },otherForm)
          }

          if(userType === 'vendor'){
            params = Object.assign({
              identity:5
            },vendorForm)
          }

          if(methodValue){
            // let methodJson = JSON.parse(decodeByJsBase64(methodValue))
            if(methodJson.method === 'Google_login'){

              methodJson.email = 'test' + Math.random() + '@gmail.com'

              let registerParams = Object.assign({email:methodJson.email}, params)
              console.log(registerParams)

              EMAIL_REGISTER_V2(registerParams).then(res => {
                console.log(res)
                if (res.code == 200) {

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
                        router.push({path: '/login', query: {email: methodJson.email}})
                      }
                    }

                  })

                }

              }).catch(err => {
                console.log(err)

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
            return false;
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
    const stateOptions = ref([])
    const stateObj = ref({})
    const townOptions = ref([])
    const townObj = ref({})

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

    function getAllState(countryId){
      let params = {
        country_id:countryId
      }
      GET_COUNTRY_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
           stateOptions.value = res.message;
        }
      }).catch(err=>{
        ElMessage({
          type:'warning',
          message:err.msg,
          grouping:true
        })

      })
    }

    function getAllTown(countryId, stateId){

      let params = {
        country_id:countryId,
        state_id:stateId
      }

      GET_COUNTRY_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          townOptions.value = res.message;
        }
      }).catch(err=>{
        ElMessage({
          type:'warning',
          message:err.msg,
          grouping:true
        })

      })
    }



    function countryChange(countryId){
      stateOptions.value = []
      townOptions.value = []
      schoolForm.state_id = ''
      schoolForm.town_id = ''

      getAllState(countryId)

    }

    function stateChange(countryId, stateId){
      townOptions.value = []
      schoolForm.town_id = ''
      getAllTown(countryId, stateId)
    }

    function townChange(e){
      console.log(e)
    }

    function turnBack() {
      router.go(-1)
    }

    onMounted(()=>{
      if(userType === 'school' || userType === 'recruiter' || userType === 'other'){
        userStepIndex.value = 3
      }

      getAllCountry()

    })

    return {
      userStepIndex,
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
      stateOptions,
      stateObj,
      stateChange,
      townOptions,
      townObj,
      townChange,
      registerRefGoogle

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
