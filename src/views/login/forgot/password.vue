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
        <div class="password-m-label">Forget Password?</div>
        <div class="password-m-tips">
          No Problem! We’ll help you recover your Password
        </div>

        <div class="password-m-form">
          <el-form
              :model="passwordForm"
              :rules="passwordRules"
              ref="passwordForms"
              label-width="100px"
              label-position="top"
              class="demo-ruleForm"
          >
            <el-form-item label="Email" prop="email">
              <el-input placeholder="Enter your email" v-model="passwordForm.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="reset-btn"
                         type="primary"
                         :loading="passwordLoadingStatus"
                         @click="sendCode(passwordForms)">
                Reset Password
              </el-button>
            </el-form-item>

            <el-form-item>
              <el-button class="back-btn"
                         type="primary"
                         link
                         @click="backToLogin()">
                <el-icon style="margin-right: 10px;">
                  <Back />
                </el-icon>
                Back to login
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
import passwordLockImg from '@/assets/newHome/login/password-lock.png'

import {useRouter} from 'vue-router'
import {ref,reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {SEND_EMAIL_CODE_REST_PASSWORD_V3} from "@/api/api";
import {encode} from 'js-base64'

export default {
  name: "password",
  data(){
    return {
      imgLogo,
      passwordLockImg
    }
  },
  setup(){

    const router = useRouter()

    function turnHome(){
      return router.push('/')
    }

    function backToLogin(){
      return router.push('/login')
    }

    const passwordLoadingStatus = ref(false)

    const passwordForms = ref()

    const passwordForm = reactive({
      email:''
    })

    const passwordRules = reactive({
      email: [
        {type: 'email', required: true, message: 'Enter a valid email address', trigger: 'blur'}
      ],
    })

    function sendCode(formName){
      passwordLoadingStatus.value = true;

      if(!formName) return;

      formName.validate((valid) => {
        if (valid) {
          let params = Object.assign({}, passwordForm)

          SEND_EMAIL_CODE_REST_PASSWORD_V3(params).then(res=>{
            console.log(res)
            if(res.code == 200){
              passwordLoadingStatus.value = false;
              let paramsStr = encode(JSON.stringify(params))
              router.push({path:'/forgot/sendCode',query:{str:encodeURIComponent(paramsStr)}})
            }
          }).catch(err=>{
            console.log(err)
            passwordLoadingStatus.value = false;

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
          ElMessage({
            type:'warning',
            message:'Enter a valid email address',
            grouping:true
          })
          passwordLoadingStatus.value = false
          return false
        }
      })

    }

    return {
      sendCode,
      passwordForms,
      passwordForm,
      passwordRules,
      passwordLoadingStatus,
      turnHome,
      backToLogin
    }
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