<template>
<div>
  <h1>Information is being exchanged, please wait patiently</h1>
</div>
</template>

<script>
import {INTERNATIONAL_REGISTER} from "../../api/api";

export default {
  name: "account",
  mounted() {
    console.log(this.$route.query)
    let email = this.$route.query.email
    let firstName = this.$route.query.first_name
    let lastName = this.$route.query.last_name
    this.internationalRegister(email,firstName,lastName)
  },
  methods:{
      internationalRegister(email,firstName,lastName){

        let params = {
          email:email,
          first_name:firstName,
          last_name:lastName
        }
        INTERNATIONAL_REGISTER(params).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
          this.$message.error(err.msg)
        })

      }
  }
}
</script>

<style scoped>

</style>