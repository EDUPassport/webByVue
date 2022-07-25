<template>
<div  v-if="isShow">
  <el-dialog :model-value="isShow"
             @close="handleClose()"
             title="Switch Profile" width="30%" center>
    <div class="switch-profile-container">
      <div class="switch-profile-item">
        <el-button :disabled="identity==1" class="switch-profile-item-btn" type="primary" plain round
                  @click="selectRole(1)"
        >
          Educator
        </el-button>
      </div>
      <div class="switch-profile-item">
        <el-button :disabled="identity==2" class="switch-profile-item-btn" type="primary" plain round
                   @click="selectRole(2)"
        >
          Edu-Business
        </el-button>
      </div>
      <div class="switch-profile-item">
        <el-button :disabled="identity==3" class="switch-profile-item-btn" type="primary" plain round
                   @click="selectRole(3)"
        >
          Vendor
        </el-button>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {USER_INFO_BY_TOKEN_V2, SWITCH_IDENTITY_V2, USER_INFO_VISITOR_V2} from '@/api/api'

export default {
  name: "switchProfile",
  props:['isShow','identity'],
  setup(props,ctx){

    const handleClose = ()=>{
      ctx.emit('close',false)
    }
    return {
      handleClose
    }
  },
  methods:{
    selectRole(e) {
      this.$loading({
        text: 'Loading...'
      })

      let params = {
        user_id: localStorage.getItem('uid'),
        identity: e
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        let userContact = res.message.user_contact;
        let educatorContact = {};

        let companyInfo = {};

        let isEducator = userContact.is_educator;
        let isRecruiting = userContact.is_recruiting;
        let isSchool = userContact.is_school;
        let isOther = userContact.is_other;
        let isVendor = userContact.is_vendor;
        let identity = e;

        if (identity == 1) {
          if (isEducator > 10) {
            educatorContact =  res.message.user_contact.educator_contact;
            this.changeIdentity(educatorContact.id,1,2)
            this.$router.push({path: '/overview', query: {identity: identity}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 1}})

          }

        }

        if (identity == 2) {

          if (isRecruiting > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id,2,2)
            // this.$router.push({path: '/overview', query: {identity: identity}})
            this.$router.push({path: '/profile/contact/user', query: {i: 2}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 2}})

            this.dialogBusinessAccountVisible = false
          }
        }

        if (identity == 3) {

          if (isSchool > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id,3,2)
            // this.$router.push({path: '/overview', query: {identity: identity}})
            this.$router.push({path: '/profile/contact/user', query: {i: 3}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 3}})

            this.dialogBusinessAccountVisible = false
          }

        }

        if (identity == 4) {

          if (isOther > 10) {
            companyInfo = res.message.user_contact.company;

            this.changeIdentity(companyInfo.id,4,2)
            this.$router.push({path: '/overview', query: {identity: identity}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 4}})

            this.dialogBusinessAccountVisible = false
          }

        }

        if (identity == 5) {

          if (isVendor > 10) {

            companyInfo = res.message.user_contact.company;
            this.changeIdentity(companyInfo.id,5,2)
            this.$router.push({path: '/overview', query: {identity: 5}})
            this.$loading().close()
          } else {
            this.$loading().close()
            // this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push({path: '/profile/contact/user', query: {i: 5}})

          }

        }


      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })
    },
    changeIdentity(companyId, identity, language) {
      let params = {
        company_id: companyId,
        language: language,
        identity: identity
      }

      SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.$store.commit('allIdentityChanged',true )

          localStorage.setItem('company_id',companyId)
          localStorage.setItem('identity', identity)

          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData',str)

          this.$store.commit('identity', identity)
          this.$store.commit('menuData', res.message)

          this.getBasicInfo(identity)
          this.$router.push({
            path: '/overview', query: {identity: identity}
          })

          this.$loading().close()
        }
      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })

    },
    getBasicInfo(identity) {

      let params = {
        identity: identity
      }

      USER_INFO_BY_TOKEN_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

          let userContact = res.message.user_contact;

          let companyInfo = {};
          let defaultName = userContact.first_name + ' ' + userContact.last_name
          let name = '';
          let avatar = 'https://oss.esl-passport.cn/educator.png';

          if(identity == 1){
            let educatorContact = res.message.user_contact.educator_contact;
            name = educatorContact.name ? educatorContact.name : defaultName;
            avatar = userContact.headimgurl;
          }

          if(identity == 2 || identity == 3 || identity == 4 || identity == 5){

            if(userContact.company){
              companyInfo = userContact.company;
              name = companyInfo.company_name ? companyInfo.company_name : defaultName;
              avatar = companyInfo.logo;
            }else{
              name = defaultName;
              avatar = 'https://oss.esl-passport.cn/educator.png';
            }

          }

          localStorage.setItem('name', name)
          localStorage.setItem('avatar', avatar)

          this.$store.commit('username', name)
          this.$store.commit('userAvatar', avatar)
          this.$store.commit('changeThirdCompanyStatus', res.message.user_contact.is_third_company)

          localStorage.setItem('is_third_company',res.message.user_contact.is_third_company )

        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    }

  }

}
</script>

<style scoped>
.switch-profile-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.switch-profile-item{
  width: 100%;
  margin-top: 20px;
}
.switch-profile-item-btn{
  width: 100%;
  font-size: 14px;
}
</style>