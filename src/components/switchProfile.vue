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
import {CHANGE_IDENTITY_LANGUAGE, GET_BASIC_INFO} from '@/api/api'

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
        text:'Loading...'
      })
      let uid = localStorage.getItem('uid')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        let isEducator = res.message.is_educator;
        let isBusiness = res.message.is_business;
        let isVendor = res.message.is_vendor;
        // let isOther = res.message.is_other;
        // let identity = res.message.identity;

        if (e == 1) {
          if (isEducator >= 10) {
            this.changeIdentity(1)
          } else {
            this.$loading().close()
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            // this.$router.push('/role/educator')

          }

        }
        if (e == 2) {
          if (isBusiness >= 10) {
            this.changeIdentity(2)
          } else {
            this.$loading().close()
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            // this.$router.push('/role/business')

          }

        }
        if (e == 3) {
          if (isVendor >= 10) {
            this.changeIdentity(3)
          } else {
            this.$loading().close()
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            // this.$router.push('/role/vendor')

          }

        }


      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })
    },
    changeIdentity(identity) {
      let params = {
        token: localStorage.getItem('token'),
        identity: identity
      }

      CHANGE_IDENTITY_LANGUAGE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          localStorage.setItem('identity', identity)

          this.$loading().close()

          this.getBasicInfo()

          this.$router.push({
            path: '/overview', query: {identity: identity}
          })
          this.handleClose()
        }
      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })

    },
    getBasicInfo() {
      let uid = localStorage.getItem('uid')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          localStorage.setItem('uid', res.message.id)
          localStorage.setItem('identity', res.message.identity)
          localStorage.setItem('language', res.message.language)
          localStorage.setItem('email', res.message.email)

          let identity = res.message.identity
          let firstName;
          let lastName;
          let avatar;

          if (identity == 0) {
            localStorage.setItem('name', 'Guest')
            firstName = 'Guest'
            lastName = ''
            avatar = ''
          }
          if (identity == 1) {
            firstName = res.message.educator_info.first_name;
            lastName = res.message.educator_info.last_name;
            avatar = res.message.educator_info.profile_photo;
          }
          if (identity == 2) {
            firstName = res.message.business_info.first_name;
            lastName = res.message.business_info.last_name;
            avatar = res.message.business_info.profile_photo;
          }
          if (identity == 3) {
            firstName = res.message.vendor_info.first_name;
            lastName = res.message.vendor_info.last_name;
            avatar = res.message.vendor_info.profile_photo;
          }

          localStorage.setItem('name', firstName + ' ' + lastName)
          localStorage.setItem('avatar', avatar)
          localStorage.setItem('first_name', firstName)
          localStorage.setItem('last_name', lastName)

          this.$store.commit('username', firstName + ' ' + lastName)
          this.$store.commit('userAvatar', avatar)
          this.$store.commit('identity', identity)

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