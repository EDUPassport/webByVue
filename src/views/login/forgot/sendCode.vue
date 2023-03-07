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
          <div class="password-m-label">Verification Code</div>
          <div class="password-m-tips">
            A Verification code already sent to your registered email
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
              <el-form-item label="6-Digit-Code" prop="email_code" >

                <div class="input-box" @keydown="keydown" @keyup="keyup"  @input="inputEvent">

                  <input maxlength="1" min="0" max="9" data-index="0" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[0]" ref="firstInput" />
                  <input class="input-box-space" disabled data-index="-1" />

                  <input maxlength="1" min="0" max="9" data-index="1" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[1]"  />
                  <input class="input-box-space" disabled data-index="-1" />

                  <input maxlength="1" min="0" max="9" data-index="2" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[2]"  />
                  <input class="input-box-space" disabled data-index="-1" />

                  <input maxlength="1" min="0" max="9" data-index="3" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[3]"  />
                  <input class="input-box-space" disabled data-index="-1" />

                  <input maxlength="1" min="0" max="9" data-index="4" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[4]"  />
                  <input class="input-box-space" disabled data-index="-1" />

                  <input maxlength="1" min="0" max="9" data-index="5" oninput ="value=value.replace(/[^\d]/g,'')" v-model.trim.number="input[5]"  />

                </div>

              </el-form-item>

              <div class="resend-code">
                <el-button class="resend-code-btn" type="primary" link @click="resendCode()">
                  Resend Code
                </el-button>
              </div>

              <el-form-item>
                <el-button class="reset-btn"
                           type="primary"
                           :disabled="verificationCodeDisabledStatus"
                           @click="verificationCodeForEmail(passwordForms)">
                  Next
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
import passwordLockImg from '@/assets/newHome/login/verification-code.png'

import {useRouter, useRoute} from 'vue-router'
import {ref,reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {REGISTER_EMAIL_CHECK, SEND_EMAIL_CODE_REST_PASSWORD} from "@/api/api";

export default {
  name: "sendCode",
  data(){
    return {
      imgLogo,
      passwordLockImg,
      pasteResult: [],
      input:['', '', '', '', '', '']
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

    const verificationCodeDisabledStatus = ref(true)

    const passwordForms = ref()

    const passwordForm = reactive({
      email:route.query.email,
      email_code:''
    })

    const passwordRules = reactive({
      email: [
        {type: 'email', required: true, message: 'Enter a valid email address', trigger: 'blur'}
      ],
      email_code: [
        {required: true, message: 'Enter verification code', trigger: 'blur'}
      ],
    })

    function resendCode(){

      if(!route.query.email){
        ElMessage({
          type:'warning',
          message:'Enter a valid email address',
          grouping:true
        })

        return false
      }

      let params = {
        email:route.query.email
      }

      SEND_EMAIL_CODE_REST_PASSWORD(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          ElMessage({
            type:'success',
            message:'Resend Code Successfully',
            grouping:true
          })
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


    }


    function verificationCodeForEmail(formName){
      if(!formName) return;
      console.log(formName)
      formName.validate((valid) => {
        if (valid) {
          let params = Object.assign({}, passwordForm)

          REGISTER_EMAIL_CHECK(params).then(res=>{
            console.log(res)
            if(res.code == 200){
              router.push({path:'/forgot/setNewPassword',query:params})
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
          ElMessage({
            type:'warning',
            message:'Enter your verification code',
            grouping:true
          })
          return false
        }
      })

    }

    return {
      verificationCodeForEmail,
      passwordForms,
      passwordForm,
      passwordRules,
      verificationCodeDisabledStatus,
      resendCode,
      turnHome,
      backToLogin
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.$refs.firstInput.focus()
    })
  },
  methods:{
    // 解决一个输入框输入多个字符
    inputEvent(e) {

      let index = e.target.dataset.index * 1;
      let el = e.target;
      this.input[index] = el.value.slice(0,1)
    },
    keydown(e) {

      let index = e.target.dataset.index * 1;
      let el = e.target;
      if (e.key === 'Backspace') {

        if (this.input[index].length > 0) {
          this.input[index] = ''

        } else {

          if(el.previousElementSibling ){

            if(el.previousElementSibling.dataset.index === '-1'){
              el.previousElementSibling.previousElementSibling.focus()
            }else{
              el.previousElementSibling.focus()
            }

            this.input[index-1] = ''

          }

        }

        this.verificationCodeDisabledStatus =true;

      } else if (e.key === 'Delete') {

        if (this.input[index].length > 0) {
          this.input[index] = ''
        } else {
          if (el.nextElementSibling) {
            this.input[index = 1] = ''
          }
        }

        if(el.nextElementSibling){
          if( el.nextElementSibling.dataset.index === '-1'){
            el.nextElementSibling.nextElementSibling.focus()
          }else{
            el.nextElementSibling.focus()
          }

        }

        this.verificationCodeDisabledStatus =true;


      } else if (e.key === 'Home') {

        el.parentElement.children[0] && el.parentElement.children[0].focus()

      } else if (e.key === 'End') {

        // el.parentElement.children[this.input.length - 1] && el.parentElement.children[this.input.length - 1].focus()
        el.parentElement.children[this.input.length +4 ] && el.parentElement.children[this.input.length + 4].focus()

      } else if (e.key === 'ArrowLeft') {

        if (el.previousElementSibling) {
          if(el.previousElementSibling.dataset.index === '-1'){
            el.previousElementSibling.previousElementSibling.focus()
          }else{
            el.previousElementSibling.focus()
          }

        }

      } else if (e.key === 'ArrowRight') {

        if (el.nextElementSibling) {
          if(el.nextElementSibling.dataset.index === '-1'){
            el.nextElementSibling.nextElementSibling.focus()
          }else{
            el.nextElementSibling.focus()
          }

        }

      } else if (e.key === 'ArrowUp') {
        if (this.input[index] * 1 < 9) {
          this.input[index] = (this.input[index] * 1 + 1).toString()
        }
      } else if (e.key === 'ArrowDown') {
        if (this.input[index] * 1 > 0) {
          this.input[index] = (this.input[index] * 1 - 1).toString()
        }
      }
    },
    keyup(e) {

      let index = e.target.dataset.index * 1;
      let el = e.target;

      if(e.key === 'Enter'){

        this.input[index] = ''

      }else{

        if (/Digit|Numpad/i.test(e.code)) {
          this.input[index] = e.code.replace(/Digit|Numpad/i, '')

          // 如果中间去掉加的东西，需要改这里
          if(el.nextElementSibling){

            if(el.nextElementSibling.dataset.index === '-1'){
              el.nextElementSibling.nextElementSibling.focus();

            }else{
              el.nextElementSibling && el.nextElementSibling.focus();
            }

          }

          if (index === 5) {
            if (this.input.join('').length === 6) {
              document.activeElement.blur();
              this.passwordForm.email_code = this.input.join('')
              this.verificationCodeDisabledStatus = false;
              // this.$emit('complete', this.input);
            }
          }

        } else {
          if (this.input[index] === '') {
            this.input[index] = ''
          }
        }

      }

    },
    mousewheel(e) {
      let index = e.target.dataset.index;
      if (e.wheelDelta > 0) {
        if (this.input[index] * 1 < 9) {
          this.input[index] = (this.input[index] * 1 + 1).toString()
        }
      } else if (e.wheelDelta < 0) {
        if (this.input[index] * 1 > 0) {
          this.input[index] = (this.input[index] * 1 - 1).toString()
        }
      } else if (e.key === 'Enter') {

        if (this.input.join('').length === 6) {
          document.activeElement.blur();
          this.passwordForm.email_code = this.input.join('')
          this.verificationCodeDisabledStatus = false;
          // this.$emit('complete', this.input);
        }
      }
    },
    paste(e) {
      console.log(e)
      // console.log(e.clipboardData)
      // 当进行粘贴时
      e.clipboardData.items[0].getAsString(str => {
        if (str.toString().length === 6) {
          this.pasteResult = str.split('');
          document.activeElement.blur();
          // this.$emit('complete', this.input);
          this.passwordForm.email_code = this.input.join('')
          this.verificationCodeDisabledStatus = false;
        }
      })
    }

  }
}
</script>

<style scoped>
.password-bg{
  background-color: #FFFFFF;
}
.password-container{
  max-width: 1440px;
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
.input-box-container{
  position: relative;
}

.input-box{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.input-box input{
  width: 44px;
  height: 44px;
  //margin-right: 30px;

  border: 1px solid #98A2B3;
  border-radius: 6px;
  text-align: center;
  font-family: Inter, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 24px;

  color: #1D2939;

}


.input-box-space{

  width: 6px !important;
  height: 4px !important;
  background: #D0D5DD;
  border-radius: 0px !important;
  margin-right: 7px !important;
  margin-left: 7px;
  border: none !important;

}

.resend-code{
  text-align: right;
}

.resend-code-btn{
  font-size: 12px;
  font-weight: 600;
}

</style>