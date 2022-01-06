<template>
<div class="container" v-loading="showLoading">
  <h1>Logging in via Linkedin, please wait ... </h1>
</div>
</template>

<script>
import {LINKEDIN_CODE} from "@/api/api";

export default {
  name: "linkedin",
  data(){
    return {
      showLoading:true
    }
  },
  created() {
    let linkedinCode = this.$route.query.code;
    console.log(linkedinCode)
    if(linkedinCode){
      this.linkedinLoginByCode(linkedinCode)
    }
  },
  methods:{
    linkedinLoginByCode(code){
      let params = {
        code:code
      }
      LINKEDIN_CODE(params).then(res=>{
        console.log(res)
        if(res.code === 200){
          this.showLoading = false;

          localStorage.setItem('token', res.message.token)
          localStorage.setItem('uid',res.message.id)
          localStorage.setItem('identity', res.message.identity)
          localStorage.setItem('language', res.message.language)
          localStorage.setItem('email', res.message.email)

          let identity  = res.message.identity
          if(identity == 0){
            localStorage.setItem('name','Guest')
          }
          if(identity == 1){
            let firstName = res.message.educator.first_name;
            let lastName = res.message.educator.last_name;
            localStorage.setItem('name',firstName+' '+ lastName)
            localStorage.setItem('first_name',firstName)
            localStorage.setItem('last_name',lastName)
          }

          if(identity == 2){
            let firstName = res.message.business.first_name;
            let lastName = res.message.business.last_name;
            localStorage.setItem('name',firstName+' '+ lastName)
            localStorage.setItem('first_name',firstName)
            localStorage.setItem('last_name',lastName)
          }
          if(identity == 3){
            let firstName = res.message.vendor.first_name;
            let lastName = res.message.vendor.last_name;
            localStorage.setItem('name',firstName+' '+ lastName)
            localStorage.setItem('first_name',firstName)
            localStorage.setItem('last_name',lastName)
          }

          this.$router.push('/home')

        }

      }).catch(err=>{
        console.log(err)
        this.$message.error('Service Error')
      })
    }
  }
}
</script>

<style scoped>
.container{
  padding: 80px;
}

</style>