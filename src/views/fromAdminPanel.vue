<template>
<div class="admin-bg">
  <div class="logo">
    <el-image class="logo-img" :src="logoImgLightH"></el-image>
  </div>
  <div class="loading" v-loading="loadingValue" element-loading-background="#f6f7f8" >

  </div>
  <div class="text">
    A large amount of information is loading and transmitting, please wait a moment ......
  </div>
</div>
</template>

<script>
import {decode} from 'js-base64'
import {USER_MENU_LIST} from "@/api/api"
import logoImgLightH from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'

export default {
  name: "fromAdminPanel",
  data(){
    return {
      logoImgLightH,
      loadingValue:true
    }
  },
  mounted(){

    let from_admin = this.$route.query.from_admin;
    if(from_admin){
      localStorage.clear();

      // console.log(from_admin)
      let decodeAdmin = decode(decodeURIComponent(from_admin))
      // console.log(decodeAdmin)

      let userObj = JSON.parse(decodeAdmin)
      // console.log(userObj)

      let identity = userObj.identity;
      let firstName = userObj.first_name;
      let lastName = userObj.last_name;
      let currentAvatar = 'https://oss.esl-passport.cn/educator.png'

      localStorage.setItem('token', userObj.token)
      localStorage.setItem('uid', userObj.id)
      localStorage.setItem('identity', userObj.identity)
      localStorage.setItem('language', userObj.language)
      localStorage.setItem('email', userObj.email)
      localStorage.setItem('company_id', userObj.company_id)
      localStorage.setItem('name', firstName + ' ' + lastName)
      localStorage.setItem('first_name', firstName)
      localStorage.setItem('last_name', lastName)

      if(userObj.third_company_id){
        localStorage.setItem('thirdCompanyId', userObj.third_company_id)
      }
      let uuid = userObj.id + '#' + identity + '#' + userObj.company_id

      let currentUser = {
        uuid: uuid,
        uid: userObj.id,
        identity: identity,
        name: firstName + ' ' + lastName,
        avatar: currentAvatar,
        companyId:userObj.company_id
      }

      this.$store.commit('currentCompanyId', userObj.company_id)
      this.$store.commit('thirdCompanyId',userObj.third_company_id)
      this.$store.commit('identity',userObj.identity)
      this.$store.commit('currentUser',currentUser)

      this.getUserMenuList(userObj.id,identity, userObj.company_id, userObj.id)

    }

  },
  methods:{

    getUserMenuList(uid,identity,companyId,cId){
      let self = this;
      let params = {
        user_id:uid,
        identity:identity,
        company_id:companyId,
        create_user_id:cId,
        page:1,
        limit:1000
      }

      USER_MENU_LIST(params).then(res=>{
        // console.log(res)
        if(res.code === 200){
          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData',str)
          this.$store.commit('menuData', res.message)

          setTimeout(function (){
            self.$router.push('/account/home')
          }, 1500)

        }
      }).catch(err=>{
        console.log(err)
      })

    },

  }

}
</script>

<style scoped>

.admin-bg{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo{
  text-align: center;
}
.logo-img{
  width: 300px;
}

.loading{
  width: 200px;
  height: 200px;
  margin: 50px;
}

.text{
  text-align: center;
  font-size: 26px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;

}


</style>