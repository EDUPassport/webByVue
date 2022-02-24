<template>
<div class="container" v-loading="showLoading">
  <h1>Logging in via Linkedin, please wait ... </h1>
</div>
</template>

<script>
import {LINKEDIN_CODE} from "@/api/api";
import {useStore} from 'vuex'

export default {
  name: "linkedin",
  setup(){
    const store = useStore()
    const setCurrentUser = (data) => store.commit('currentUser', data)
    return {
      setCurrentUser
    }
  },
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
          localStorage.setItem('uid', res.message.id)
          localStorage.setItem('identity', res.message.identity)
          localStorage.setItem('language', res.message.language)
          localStorage.setItem('email', res.message.email)

          let identity = res.message.identity
          if (identity == 0) {
            localStorage.setItem('name', 'Guest')
          }
          let firstName = ''
          let lastName = ''
          let currentAvatar = 'https://oss.esl-passport.cn/educator.png'

          if (identity == 1) {
            firstName = res.message.educator.first_name
            lastName = res.message.educator.last_name
            if(res.message.educator.profile_photo){
              currentAvatar = res.message.educator.profile_photo
            }

          }

          if (identity == 2) {
            firstName = res.message.business.first_name
            lastName = res.message.business.last_name
            if(res.message.business.profile_photo){
              currentAvatar = res.message.business.profile_photo
            }

          }
          if (identity == 3) {
            firstName = res.message.vendor.first_name
            lastName = res.message.vendor.last_name
            if(res.message.vendor.profile_photo){
              currentAvatar = res.message.vendor.profile_photo
            }
          }

          localStorage.setItem('name', firstName + ' ' + lastName)
          localStorage.setItem('first_name', firstName)
          localStorage.setItem('last_name', lastName)

          let currentUser = {
            uuid: res.message.id,
            identity: identity,
            name: firstName + ' ' + lastName,
            avatar: currentAvatar,
          }
          // console.log(currentUser)

          this.setCurrentUser(currentUser)

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

h1{
  text-align: center;
}

</style>