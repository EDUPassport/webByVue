<template>
  <div class="password-bg">
    <el-row justify="center" align="top" class="password-container">
      <el-col class="password-col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="password-t" @click="turnHome()">
          <el-image class="password-t-logo" :src="imgLogo"></el-image>
        </div>
        <div class="password-m">
          <div class="password-m-icon">
            <el-image :src="passwordLockImg"></el-image>
          </div>
          <div class="password-m-label">Change Password</div>
          <div class="password-m-tips">
            Setup your New Password
          </div>

          <div class="password-m-form">
            <el-form
                :model="passwordForm"
                :rules="passwordRules"
                @submit.prevent
                ref="passwordForms"
                label-width="100px"
                label-position="top"
                class="demo-ruleForm"
            >
              <el-form-item label="New Password" prop="password">
                <el-input show-password
                          @keyup.enter="resetPassword(passwordForms)"
                          placeholder="Enter your password"
                          v-model="passwordForm.password">
                </el-input>
              </el-form-item>
              <el-form-item label="Confirm Password" prop="confirm_password">
                <el-input show-password
                          placeholder="Confirm your password"
                          @keyup.enter="resetPassword(passwordForms)"
                          v-model="passwordForm.confirm_password">
                </el-input>
              </el-form-item>

              <el-form-item>
                <el-button class="reset-btn"
                           size="large"
                           type="primary"
                           :loading="passwordLoadingStatus"
                           @click="resetPassword(passwordForms)">
                  Confirm
                </el-button>
              </el-form-item>

            </el-form>

          </div>

        </div>
        <div class="password-b">
          <div class="password-copyright">
            © EDU Passport 2023
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import imgLogo from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
import passwordLockImg from '@/assets/newHome/login/password-unlock.png'

import {useRouter, useRoute} from 'vue-router'
import {ref,reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {decode} from 'js-base64'
import {FIND_PASSWORD_BY_EMAIL_V2} from "@/api/api";

export default {
  name: "setNewPassword",
  data(){
    return {
      imgLogo,
      passwordLockImg,
    }
  },
  setup(){

    const router = useRouter()
    const route = useRoute()

    function turnHome(){
      return router.push('/')
    }

    function backToLogin(){
      return router.push('/login')
    }

    const passwordLoadingStatus = ref(false)

    const passwordForms = ref()

    let str = decodeURIComponent(route.query.str);
    let decodeStr =JSON.parse( decode(str) )


    const passwordForm = reactive({
      email: decodeStr.email,
      email_code: decodeStr.code,
      password:'',
      confirm_password:''
    })


    const checkConfirmPassword = (rule,value,callback)=>{
      if(value === ''){
        callback(new Error('Confirm your password'))
      }else if(value !== passwordForm.password){
        callback(new Error('password doesn’t match'))
      }else{
        callback()
      }
    }

    const passwordRules = reactive({
      email: [
        {type: 'email', required: true, message: 'Enter a valid email address', trigger: 'blur'}
      ],
      email_code: [
        {required: true, message: 'Enter verification code', trigger: 'blur'}
      ],
      password: [
        {required: true, message: 'Enter your password', trigger: 'blur'}
      ],
      confirm_password: [
        {required: true, validator:checkConfirmPassword, trigger: 'blur'}
      ]
    })

    function resetPassword(formName){
      if(!formName) return;

      formName.validate((valid) => {
        if (valid) {
          let params = Object.assign({}, passwordForm)
          FIND_PASSWORD_BY_EMAIL_V2(params).then(res=>{
            console.log(res)
            if(res.code == 200){

              ElMessage({
                type:'success',
                message:'Success',
                grouping:true
              })

              router.push('/login')

            }
          }).catch(err=>{
            console.log(err)
            if(err.msg){
              ElMessage({
                type:'error',
                message: err.msg,
                grouping:true
              })
              return;
            }

            if(err.message){
              ElMessage({
                type:'error',
                message: err.message,
                grouping:true
              })

            }
          })


        } else {
          console.log('error submit!!')

          return false
        }
      })

    }

    return {
      resetPassword,
      passwordForms,
      passwordForm,
      passwordRules,
      passwordLoadingStatus,
      turnHome,
      backToLogin
    }
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style scoped>
.password-bg{
  background-color: #FFFFFF;
}
.password-container{

  margin: 0 auto;
  height: 100vh;
}

.password-col{
  display: flex;
  flex-direction: column;
}

.password-t{
  margin: 30px 0 0 40px;
  cursor: pointer;
}

.password-t-logo {
  width: 180px;
}

.password-m{
  min-width: 380px;
  margin: 100px auto 20px;
}

.password-m-icon{
  text-align: center;
}
.password-m-label{
  text-align: center;

  font-family: 'Inter',Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  /* identical to box height, or 100% */


  /* Grey/900 */

  color: #101828;
  margin-top: 30px;
}
.password-m-tips{
  font-family: 'Inter',Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */

  text-align: center;

  /* Grey/500 */

  color: #667085;
  margin-top: 20px;
}

.password-m-form{
  margin-top: 30px;
}
.reset-btn{
  width: 100%;
  margin-top: 40px;
}

.back-btn{
  width: 100%;
  color: #667085;
}

.password-b{
  margin-top: auto;
  margin-left: 40px;
  margin-bottom: 25px;
}

.password-copyright{
  font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #667085;
}

@media screen and (max-width: 1399px) {
  .password-container{
    width: 100%;
  }
}

@media screen and (min-width: 1400px){
  .password-container{
    max-width: 1400px;
  }
}

</style>