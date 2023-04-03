<template>
  <div>
    <el-dialog :model-value="visible"
               width="600px"
               center
               align-center
               :show-close="false"
               :before-close="beforeClose"
               draggable
    >

      <div class="dialog-container"  >
        <div class="label">Verification Code</div>
        <div class="tips">
          A Verification code already sent to your email address
        </div>
        <div class="form">

          <el-form
              :model="vForm"
              :rules="vRules"
              ref="vForms"
              label-width="100px"
              label-position="top"
              class="demo-ruleForm"
          >
            <el-form-item label="6-Digit-Code" prop="code" >
              <sixInputVerificationCode @disabled="disabledNext" @complete="sixCodeComplete" ></sixInputVerificationCode>
            </el-form-item>

            <check-code-button
                v-if="showBtn"
                type="email-forgot"
                :email="vForm.email"
                text="Resend Code"
                success-text="Resend Code Successfully">
            </check-code-button>

            <el-form-item>
              <el-button class="next-btn"
                         size="large"
                         type="primary"
                         :disabled="nextDisabledStatus"
                         @click="verificationCodeForEmail(vForms)">
                Next
              </el-button>
            </el-form-item>

          </el-form>

        </div>

      </div>

    </el-dialog>

  </div>
</template>

<script>
import {ElMessage} from 'element-plus'
import sixInputVerificationCode from "@/components/register/sixInputVerificationCode.vue";
import checkCodeButton from "@/components/register/checkCodeButton.vue";
import {ref, reactive, onMounted} from 'vue'
import {CHECK_EMAIL_CODE_REST_PASSWORD_V3} from "@/api/api";
export default {
  name: "verificationCodeDialog",
  props:['info','visible','qrcodeValue'],
  components:{
    sixInputVerificationCode,
    checkCodeButton
  },
  setup(){
    const showBtn = ref(false)
    const nextDisabledStatus = ref(true)

    function disabledNext(e){
      console.log(e)
      nextDisabledStatus.value = e;
    }

    const vForms = ref(null)

    const vForm = reactive({
      email:'',
      code:''
    })

    const vRules = reactive({
      email: [
        {type: 'email', required: true, message: 'Enter a valid email address', trigger: 'blur'}
      ],
      code: [
        {required: true, message: 'Enter verification code', trigger: 'blur'}
      ],
    })

    function sixCodeComplete(e){
      console.log(e)
    }

    function verificationCodeForEmail(formName){
      if(!formName) return;
      formName.validate((valid) => {
        if (valid) {
          let params = Object.assign({}, vForm)


          CHECK_EMAIL_CODE_REST_PASSWORD_V3(params).then(res=>{
            console.log(res)
            if(res.code == 200){
               alert('success')
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

    onMounted(()=>{
      setTimeout(() => {
        showBtn.value = true;
      }, 60000); // 60000 milliseconds = 1 minute
    })

    return {
      showBtn,
      disabledNext,
      vForm,
      vRules,
      vForms,
      sixCodeComplete,
      nextDisabledStatus,
      verificationCodeForEmail

    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    beforeClose(done){
      this.$emit('close')
      done()
    },
    readMoreDeal(userId,identity,companyId){
      this.$emit('viewProfile',userId, identity, companyId)
    },
    share(info){
      this.$emit('share',info)
    }

  }

}
</script>

<style scoped>

.dialog-container{
  width: 430px;
  height: 310px;
  margin: 0 auto;
  padding: 70px 95px;
  background-color: #FFFFFF;
  position: relative;
}

/deep/ .el-dialog{
  --el-dialog-bg-color: none;
  --el-dialog-box-shadow: none;
}

.label{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  color: #101828;

}

.tips{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  text-align: center;

  color: #667085;
  margin-top: 12px;

}

.form{
  margin-top: 40px;
}

.next-btn{
  width:100%;
  margin-top: 40px;
}

@media screen and (max-width: 768px) {
  .dialog-container{
    width: 100%;
    height: auto;
  }

}
</style>
