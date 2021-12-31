<template>
<div class="container">
  <h1>Logging in via Linkedin, please wait ... </h1>
</div>
</template>

<script>
import {LINKEDIN_CODE} from "@/api/api";

export default {
  name: "linkedin",
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