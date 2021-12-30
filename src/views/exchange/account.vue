<template>
  <div class="bg">
    <h1>Information is being exchanged, please wait patiently...</h1>
  </div>
</template>

<script>
import {INTERNATIONAL_REGISTER} from "../../api/api";
import md5 from 'js-md5'

export default {
  name: "account",
  mounted() {
    console.log(this.$route.query)
    let email = this.$route.query.email
    let firstName = this.$route.query.first_name
    let lastName = this.$route.query.last_name
    this.internationalRegister(email, firstName, lastName)

  },
  methods: {
    internationalRegister(email, firstName, lastName) {
      let self = this;
      let emailArr = email.split('@')
      let emailFirstChar = emailArr[0].substr(0, 1)
      let emailLastChar = emailArr[0].substr(-1)

      let emailStr = emailFirstChar + emailLastChar + email;

      let params = {
        email: email,
        code: md5(emailStr),
        first_name: firstName,
        last_name: lastName
      }
      INTERNATIONAL_REGISTER(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          localStorage.setItem('token', res.message.token)
          localStorage.setItem('uid', res.message.id)
          localStorage.setItem('identity', res.message.identity)
          localStorage.setItem('language', res.message.language)
          localStorage.setItem('email', res.message.email)
          let identity = res.message.identity

          if (identity == 1) {
            let firstName = res.message.educator_info.first_name;
            let lastName = res.message.educator_info.last_name;
            localStorage.setItem('name', firstName + ' ' + lastName)
            localStorage.setItem('first_name', firstName)
            localStorage.setItem('last_name', lastName)
          }

          setTimeout(function () {
            self.$router.push('/jobs')
          }, 1500)

        }
      }).catch(err => {
        console.log(err)
        if (err.code === 400) {
          self.$msgbox({
            title: 'Success',
            message: 'You have already registered, please log in your account',
            type: 'success',
            callback: (action) => {
                console.log(action)
              if(action === 'confirm'){
                self.$router.push('/login')
              }
            }
          })

        }

      })

    }
  }
}
</script>

<style scoped>
.bg{
  padding: 40px;
}
</style>