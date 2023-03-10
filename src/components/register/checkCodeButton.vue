<template>
  <div class="resend-code">
    <el-button class="resend-code-btn"
               type="primary"
               link
               :loading="checkCodeBtn.loading"
               :disabled="checkCodeBtn.disabled"
               @click="sendCode()">
      {{checkCodeBtn.text}}
    </el-button>
  </div>

</template>

<script>
import { reactive} from 'vue'
import { SEND_EMAIL_CODE_REST_PASSWORD_V3} from "@/api/api";
import {ElMessage} from 'element-plus'
export default {
  name: "checkCodeButton",
  props:{
    email:{
      type:String,
      default:''
    },
    text:{
      type:String,
      default:'Resend Code'
    },
    type:{
      type:String,
      default:''
    },
    successText:{
      type:String,
      default:''
    }
  },
  setup(props,context){

    const checkCodeBtn = reactive(
        {
          text: props.text,
          loading:false,
          disabled:false,
          duration:60,
          timer:null
        }
    )

    const getCheckCodeTimer = ()=>{
      if(checkCodeBtn.duration !== 60){
        checkCodeBtn.disabled = true
        checkCodeBtn.loading = true
      }
      // 清除定时器
      checkCodeBtn.timer && clearInterval(checkCodeBtn.timer)
      //开启定时器
      checkCodeBtn.timer = setInterval(()=>{
        const tmp = checkCodeBtn.duration--
        checkCodeBtn.text = `00:${tmp} S`
        checkCodeBtn.loading = true
        checkCodeBtn.disabled = true
        if(tmp <= 0){
          //清除定时器
          clearInterval(checkCodeBtn.timer)
          checkCodeBtn.duration = 60
          checkCodeBtn.text = props.text
          // 设置按钮可以点击
          checkCodeBtn.disabled = false
          checkCodeBtn.loading = false
        }
        console.log(checkCodeBtn)
      },1000)
    }

    function sendCode(){

      if(!props.email){
        ElMessage({
          type:'warning',
          message:'Enter a valid email address',
          grouping:true
        })

        return false
      }

      getCheckCodeTimer()

      let params = {
        email:props.email
      }

      if(props.type === 'email-forgot'){

        SEND_EMAIL_CODE_REST_PASSWORD_V3(params).then(res=>{
          console.log(res)
          if(res.code == 200){
            context.emit('complete')

            ElMessage({
              type:'success',
              message:props.successText,
              grouping:true
            })
          }

        }).catch(err=>{
          console.log(err)

          checkCodeBtn.timer && clearInterval(checkCodeBtn.timer)

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

    }

    return {
      checkCodeBtn,
      getCheckCodeTimer,
      sendCode
    }

  }

}

</script>

<style scoped>

.resend-code{
  text-align: right;
}

.resend-code-btn{
  font-size: 12px;
  font-weight: 600;
}

</style>