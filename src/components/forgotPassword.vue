<template>
<div v-if="isShow">
  <el-dialog :model-value="isShow"
             @close="handleClose()"
             title="Forgot Password"
             :width="dialogWidthValue" center>

    <div class="switch-container">
      <div class="switch-item"
           v-if="showEmail"
           :class="switchValue === 1 ? 'switch-item-active' : '' "
           @click="handleSwitch(1)"
      >
        By Email
      </div>
      <div class="switch-item"
           v-if="showPhone"
           :class="switchValue === 2 ? 'switch-item-active' : '' "
           @click="handleSwitch(2)"
      >
        By Phone #
      </div>
    </div>

    <div class="forgot-form-container">
      <template v-if="switchValue===1">
        <el-form
            :model="forgotForm1"
            :rules="forgotRules1"
            ref="forgotForm1"
            label-width="250px"
            :label-position="formLabelPosition"
            class="demo-ruleForm"
        >
          <el-form-item label="Email" prop="email" required>
            <el-input  placeholder="Email" v-model="forgotForm1.email"></el-input>
          </el-form-item>

          <el-form-item  label="6 Digit Code" prop="email_code" required>

            <div class="xll-input-container">
              <div class="xll-input-input">
                <el-input  placeholder="Code"
                          v-model="forgotForm1.email_code">
                </el-input>
              </div>
              <el-button class="xll-input-btn" type="primary" round
                         :loading="checkCodeBtn.loading"
                         :disabled="checkCodeBtn.disabled"
                         @click="sendEmailCode()"
              >{{checkCodeBtn.text}}</el-button>
            </div>
          </el-form-item>

          <el-form-item label="New Password" prop="password" required>
            <el-input  placeholder="New Password" type="password"
                      v-model="forgotForm1.password"></el-input>
          </el-form-item>

          <el-form-item label="Confirm Password" prop="confirm_password" required>
            <el-input  placeholder="Confirm Your New Password"
                      type="password"
                      v-model="forgotForm1.confirm_password"></el-input>
          </el-form-item>

        </el-form>

        <div class="submit-container">
          <el-button class="submit-btn"
                     round
                     type="primary"
                     :loading="submitLoadingStatus"
                     @click="submitForm1('forgotForm1')">
            Submit
          </el-button>
        </div>
      </template>

      <template v-if="switchValue===2">
        <el-form
            :model="forgotForm2"
            :rules="forgotRules2"
            ref="forgotForm2"
            label-width="250px"
            :label-position="formLabelPosition"
            class="demo-ruleForm"
        >
          <el-form-item label="Phone #" prop="phone" required>
            <el-input  placeholder="Phone #" v-model="forgotForm2.phone"></el-input>
          </el-form-item>

          <el-form-item  label="6 Digit Code" prop="phone_code" required>

            <div class="xll-input-container">
              <div class="xll-input-input">
                <el-input  placeholder="Code"
                          v-model="forgotForm2.phone_code">
                </el-input>
              </div>
              <el-button class="xll-input-btn" type="primary" round
                         :loading="checkCodeBtn.loading"
                         :disabled="checkCodeBtn.disabled"
                         @click="getCheckCode()"
              >{{checkCodeBtn.text}}</el-button>
            </div>
          </el-form-item>

          <el-form-item label="New Password" prop="password" required>
            <el-input  placeholder="New Password"
                      type="password"
                      v-model="forgotForm2.password"></el-input>
          </el-form-item>

          <el-form-item label="Confirm Password" prop="confirm_password" required>
            <el-input  placeholder="Confirm Your New Password"
                      type="password"
                      v-model="forgotForm2.confirm_password"></el-input>
          </el-form-item>

        </el-form>

        <div class="submit-container">
          <el-button class="submit-btn"
                     round
                     type="primary"
                     :loading="submitLoadingStatus"
                     @click="submitForm2('forgotForm2')">
            Submit
          </el-button>
        </div>
      </template>

    </div>


  </el-dialog>
</div>
</template>

<script>
import {ref,reactive} from "vue";

import {
  WEIXIN_SEND_SMS,
  FIND_PASSWORD_BY_PHONE_V2, FIND_PASSWORD_BY_EMAIL_V2, SEND_EMAIL_CODE_REST_PASSWORD
} from "@/api/api";

export default {
  name: "forgotPassword",
  props:{
    isShow:{
      type:Boolean,
      default:false
    },
    showEmail:{
      type:Boolean,
      default: true
    },
    showPhone:{
      type:Boolean,
      default:true
    },
    emailValue:{
      type:String,
      default:''
    },
    phoneValue:{
      type:String,
      default:''
    }

  },
  setup(props,ctx){
    const handleClose = ()=>{
      ctx.emit('close',false)
    }
    const switchValue = ref(1)

    const handleSwitch = (value)=>{
      switchValue.value = value
    }

    const submitLoadingStatus = ref(false)

    let checkCodeBtn = reactive(
        {
          text:'Get Code',
          loading:false,
          disabled:false,
          duration:10,
          timer:null
        }
    )

    const getCheckCodeTimer = ()=>{
      if(checkCodeBtn.duration !== 10){
        checkCodeBtn.disabled = true
        checkCodeBtn.loading = true
      }
      // 清除定时器
      checkCodeBtn.timer && clearInterval(checkCodeBtn.timer)
      //开启定时器
      checkCodeBtn.timer = setInterval(()=>{
        const tmp = checkCodeBtn.duration--
        checkCodeBtn.text = `${tmp} S`
        checkCodeBtn.loading = true
        checkCodeBtn.disabled = true
        if(tmp <= 0){
          //清除定时器
          clearInterval(checkCodeBtn.timer)
          checkCodeBtn.duration = 10
          checkCodeBtn.text = 'Reacquire'
          // 设置按钮可以点击
          checkCodeBtn.disabled = false
          checkCodeBtn.loading = false
        }
        console.log(checkCodeBtn)
      },1000)
    }

    return {
      handleClose,
      switchValue,
      handleSwitch,
      getCheckCodeTimer,
      checkCodeBtn,
      submitLoadingStatus

    }
  },
  data(){
    return {
      formLabelPosition:'left',
      dialogWidthValue:'50%',
      forgotForm1:{
        email: '',
        email_code: '',
        password: '',
        confirm_password: ''
      },
      forgotRules1:{
        email_code: [
          {required: true, message: 'Please fill out your code.', trigger: 'blur'}
        ],
        email: [
          {required: true, message: 'Please fill out your email address.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please enter your password', trigger: 'blur'}
        ],
        confirm_password: [
          {required: true, message: 'Please enter your password again', trigger: 'blur'}
        ]
      },
      forgotForm2:{
        phone: '',
        phone_code: '',
        password: '',
        confirm_password: ''
      },
      forgotRules2:{
        phone_code: [
          {required: true, message: 'Please fill out your code.', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: 'Please fill out your phone #.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please enter your password', trigger: 'blur'}
        ],
        confirm_password: [
          {required: true, message: 'Please enter your password again', trigger: 'blur'}
        ]
      }

    }
  },
  mounted() {
    let screenWidth = document.body.clientWidth

    if (Math.floor(screenWidth) <= 768) {
      this.dialogWidthValue = "90%"
      this.formLabelPosition = 'top'
    }
    if (Math.floor(screenWidth) > 768 && Math.floor(screenWidth) <= 992) {
      this.dialogWidthValue = "90%"
      this.formLabelPosition = 'top'
    }
    if (Math.floor(screenWidth) > 992 && Math.floor(screenWidth) <= 1200) {
      this.dialogWidthValue = "50%"
      this.formLabelPosition = 'left'
    }
    if (Math.floor(screenWidth) > 1200) {
      this.dialogWidthValue = "50%"
      this.formLabelPosition = 'left'
    }

    window.onresize = () => {
      let screenWidth2 = document.body.clientWidth
      if (Math.floor(screenWidth2) <= 768) {
        this.dialogWidthValue = "90%"
        this.formLabelPosition = 'top'
      }
      if (Math.floor(screenWidth2) > 768 && Math.floor(screenWidth2) <= 992) {
        this.dialogWidthValue = "90%"
        this.formLabelPosition = 'top'
      }
      if (Math.floor(screenWidth2) > 992 && Math.floor(screenWidth2) <= 1200) {
        this.dialogWidthValue = "50%"
        this.formLabelPosition = 'left'
      }
      if (Math.floor(screenWidth2) > 1200) {
        this.dialogWidthValue = "50%"
        this.formLabelPosition = 'left'
      }

      // console.log(document.body.clientWidth)
    }
  },
  unmounted() {
    window.onresize = null
  },
  methods:{
    getCheckCode(){

      let phone = this.forgotForm2.phone

      if(phone){
        let params = {
          phone:phone
        }
        WEIXIN_SEND_SMS(params).then(res=>{
          console.log(res)
          if(res.code === 200){
            this.getCheckCodeTimer()
            this.$message.success('Success')
          }
        }).catch(err=>{
          this.$message.error(err.msg)
        })
      }

    },
    sendEmailCode() {

      let self = this;
      let email = this.forgotForm1.email
      if (email) {

        let params = {
          email: email
        }

        SEND_EMAIL_CODE_REST_PASSWORD(params).then(res => {
          if (res.code == 200) {
            self.getCheckCodeTimer()
            self.$message.success('Success')
          }
        }).catch(err => {
          console.log(err)
          return this.$message.error(err.msg)
        })
      }

    },
    submitForm1(formName){
      this.submitLoadingStatus = true

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.forgotForm1)

          FIND_PASSWORD_BY_EMAIL_V2(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message.success(res.msg)
              this.submitLoadingStatus = false
              this.handleClose()
            }
          }).catch(err => {
            console.log(err)
            this.submitLoadingStatus = false
            this.$message.error(err.msg)
          })

        } else {
          console.log('error submit!!')
          this.submitLoadingStatus = false
          return false
        }

      })
    },
    submitForm2(formName){

      this.submitLoadingStatus = true

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.forgotForm2)

          FIND_PASSWORD_BY_PHONE_V2(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message.success(res.msg)
              this.submitLoadingStatus = false
              this.handleClose()

            }
          }).catch(err => {
            console.log(err)
            this.submitLoadingStatus = false
            this.$message.error(err.msg)
          })

        } else {
          console.log('error submit!!')
          this.submitLoadingStatus = false
          return false
        }

      })
    }


  }


}
</script>

<style scoped>

.switch-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  overflow: hidden;
}

.switch-item{
  flex: 1;
  background-color: #f5f6f7;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
}

.switch-item:hover{
  background-color: #9173ff;
  color:#FFFFFF;
}

.switch-item-active{
  background-color: #49397f;
  color:#FFFFFF;
}

.forgot-form-container{
  padding: 20px;
  margin-top: 20px;
}

.xll-input-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.xll-input-input{
  width: 70%;
}

.xll-input-btn{
  width: 26%;
}

.submit-container{
  padding-top: 20px;
  text-align: center;
}

.submit-btn{
  width:60%;
  font-size: 16px;
}

.dialog{
  border-radius: 20px;
}

@media screen and (max-width: 768px){
  .forgot-form-container{
    padding:0;

  }
}


</style>
