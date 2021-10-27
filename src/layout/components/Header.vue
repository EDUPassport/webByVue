<template>

  <div>
    <el-header class="header-container" height="auto">
      <el-row :gutter="0" justify="start" align="middle">
        <el-col class="logo-container" :xs="12" :sm="3" :md="3" :lg="2" :xl="2">
          <el-image class="logo-img" :src="logoImg" fit="fill"></el-image>
        </el-col>

        <el-col :xs="0" :sm="18" :md="16" :lg="17" :xl="17">
          <div class="nav-link-container">
            <router-link to="/home" exact>Home</router-link>
            <router-link to="/jobs" exact>Job Listings</router-link>
            <router-link to="/" exact> Industry News</router-link>
            <router-link to="/" exact>Blog</router-link>
            <router-link to="/" exact> Contact</router-link>
            <router-link to="/deals" exact> Go Deals</router-link>
          </div>
        </el-col>

        <el-col :xs="12" :sm="3" :md="5" :lg="5" :xl="5">

          <div class="user-container">
            <template v-if="username!='' && username ">
              <el-dropdown>
                Hi, {{ username }}
                <span class="el-dropdown-link" >
                  <template v-if="identity == 1">Educator</template>
                  <template v-if="identity == 2">Business</template>
                  <template v-if="identity == 3">Vendor</template>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>

                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="dialogSwitchAccountVisible=true">Switch Account</el-dropdown-item>
                    <el-dropdown-item>My Discount Card</el-dropdown-item>
                    <el-dropdown-item @click="turnEditProfile()">Edit Profile</el-dropdown-item>
                    <el-dropdown-item>Change Password</el-dropdown-item>
                    <el-dropdown-item >Change Language</el-dropdown-item>
                    <el-dropdown-item divided @click="loginOut">Log Out</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
            <template v-else>
              <el-button type="primary" @click="login">Login</el-button>
              <!--              <router-link to="/login">Login</router-link>-->
            </template>
          </div>
        </el-col>

      </el-row>
    </el-header>

    <el-dialog
        v-model="dialogSwitchAccountVisible"
        title="Switch Account"
        width="30%"
    >
      <div class="switch-account-tips">
        Hello! Which one are you?
      </div>
      <div class="switch-account-container">
        <div class="switch-account-item" @click="selectRole(1)">
          Educator
        </div>
        <div class="switch-account-item" @click="selectRole(2)">
          Education Business
        </div>
        <div class="switch-account-item" @click="selectRole(3)">
          Vendor (Deal Program)
        </div>
      </div>
<!--      <template #footer>-->
<!--      <span class="dialog-footer">-->
<!--        <el-button @click="dialogSwitchAccountVisible = false">Cancel</el-button>-->
<!--        <el-button type="primary"-->
<!--                   @click="dialogSwitchAccountVisible = false">Confirm</el-button>-->
<!--      </span>-->
<!--      </template>-->
    </el-dialog>

  </div>

</template>

<script>
import {CHANGE_IDENTITY_LANGUAGE,GET_BASIC_INFO} from '@/api/api'
import logoImg from '@/assets/logo.png'

export default {
  name: "Header",
  data() {
    return {
      logoImg,
      dialogSwitchAccountVisible:false,
      username:'',
      identity: '',
      token:''
    }
  },
  mounted() {
    this.username = localStorage.getItem('name')
    this.identity = localStorage.getItem('identity')
    this.token = localStorage.getItem('token')
    if(this.token){
      this.getBasicInfo()
    }

  },
  methods: {
    getBasicInfo() {
      let uid = localStorage.getItem('uid')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        console.log(res)
        if(res.code == 200){

          localStorage.setItem('uid',res.message.id)
          localStorage.setItem('identity', res.message.identity)
          localStorage.setItem('language', res.message.language)
          localStorage.setItem('email', res.message.email)

          let identity  = res.message.identity
          let firstName;
          let lastName;
          this.identity = identity

          if(identity == 0){
            localStorage.setItem('name','Guest')
            firstName = 'Guest'
            lastName = ''
          }
          if(identity == 1){
             firstName = res.message.educator_info.first_name;
             lastName = res.message.educator_info.last_name;
          }
          if(identity == 2){
             firstName = res.message.business_info.first_name;
             lastName = res.message.business_info.last_name;
          }
          if(identity == 3){
             firstName = res.message.vendor_info.first_name;
             lastName = res.message.vendor_info.last_name;
          }

          localStorage.setItem('name',firstName+' '+ lastName)
          this.username = firstName+' '+ lastName

        }
      })
    },
    login() {
      this.$router.push('/login')
    },
    loginOut() {
      localStorage.clear()
      location.reload()
    },
    turnProfilePage() {
      this.$router.push('/overview')
    },
    turnEditProfile(){
      this.$router.push('/overview')
    },
    selectRole(e) {
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
          }else{
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push('/role/educator')
            this.dialogSwitchAccountVisible = false
          }

        }
        if (e == 2) {
          if (isBusiness >= 10) {
            this.changeIdentity(2)
          } else {
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push('/role/business')
            this.dialogSwitchAccountVisible = false
          }

        }
        if (e == 3) {
          if (isVendor >= 10) {
            this.changeIdentity(3)
          } else {
            this.$message.warning('Oops!.. Your profile is incomplete. ')
            this.$router.push('/role/vendor')
            this.dialogSwitchAccountVisible = false
          }

        }
      })
    },
    changeIdentity(identity){
      let params = {
        token:localStorage.getItem('token'),
        identity:identity
      }

      CHANGE_IDENTITY_LANGUAGE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          localStorage.setItem('identity',identity)
          this.dialogSwitchAccountVisible =false
          this.getBasicInfo()
          this.$router.push('/home')
        }
      })

    }
  }

}
</script>

<style scoped>
.header-container {
  padding: 10px 40px;
  border-bottom: 1px solid #eeeeee;
}

.logo-container {
  text-align: left;
}

.logo-img {
  width: 60px;
  height: 60px;
}

.nav-link-container {
  text-align: left;
}

.nav-link-container a {
  margin-left: 20px;
  text-decoration: none;
  color: #000000;
  font-weight: bold;
}

.nav-link-container a:hover {
  color: #00b3d2;
}

.user-container {
  text-align: right;
}

.user-container span {
  cursor: pointer;
}

.router-link-exact-active {
  background-color: #00b3d2;
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 4px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #0AA0A8;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.switch-account-tips{
  font-size: 12px;
}
.switch-account-container{
    padding: 10px;
}
.switch-account-item{
  font-size: 14px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
