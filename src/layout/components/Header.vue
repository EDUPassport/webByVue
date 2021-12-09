<template>
  <div>
    <el-header class="header-container" height="auto">
      <el-row class="header-row-container" :gutter="0" justify="start" align="middle">
        <el-col class="logo-container" :xs="12" :sm="3" :md="3" :lg="2" :xl="2">
          <el-image class="logo-img" :src="logoImg" fit="fill" @click="turnHome()"></el-image>
        </el-col>

        <el-col :xs="0" :sm="18" :md="16" :lg="17" :xl="17">
          <div class="nav-link-container">
            <router-link to="/home" exact>Home</router-link>
            <router-link to="/jobs" exact>Job Listings</router-link>
            <router-link to="/deals" exact> Go Deals</router-link>
            <router-link to="/industry/news" exact> Industry News</router-link>
            <router-link to="/blog/list" exact>Blog</router-link>
            <router-link to="/contact/us" exact> Contact</router-link>
            <router-link to="/about/us" exact> About Us</router-link>
            <span class="nav-china-jobs" @click="turnChinaJobs()">China Jobs</span>
          </div>
        </el-col>

        <el-col :xs="12" :sm="3" :md="5" :lg="5" :xl="5">
          <div class="user-container">
            <template v-if="token && token !='' ">
              <div class="user-container-1">
                <div class="user-avatar">
                  <el-dropdown>
                    <el-image class="user-avatar-img" :src="userAvatar !='' ? userAvatar : defaultAvatar"></el-image>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="dialogDiscountCardVisible=true">My Discount Card</el-dropdown-item>
                        <el-dropdown-item @click="turnEditProfile()">My Profile</el-dropdown-item>
                        <!--                    <el-dropdown-item>Change Password</el-dropdown-item>-->
                        <!--                    <el-dropdown-item >Change Language</el-dropdown-item>-->
                        <el-dropdown-item divided @click="loginOut">Log Out</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>

                </div>
                <div class="user-1-r">
                  <div class="user-name"> Hi, {{ username }}</div>
                  <div class="user-dropdown">
                    <el-dropdown>
                    <span class="el-dropdown-link">
                        <template v-if="identity == 1">Educator</template>
                        <template v-if="identity == 2">Business</template>
                        <template v-if="identity == 3">Vendor</template>
                       <i class="el-icon-arrow-down el-icon--right"></i>
                     </span>

                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item @click="selectRole(1)">Educator</el-dropdown-item>
                          <el-dropdown-item @click="selectRole(2)">Business</el-dropdown-item>
                          <el-dropdown-item @click="selectRole(3)">Vendor</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>

                  </div>
                </div>
              </div>
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
    </el-dialog>

    <el-dialog
        v-model="dialogDiscountCardVisible"
        title="Discount Card"
        width="30%"
    >
      <div class="discount-card-container">
        <el-image :src="discountCardImg"></el-image>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import {CHANGE_IDENTITY_LANGUAGE, GET_BASIC_INFO} from '@/api/api'
import logoImg from '@/assets/logo.png'
import defaultAvatar from '@/assets/default/avatar.png'
import discountCardImg from '@/assets/discountcard/discountCard.png'

export default {
  name: "Header",
  data() {
    return {
      logoImg,
      discountCardImg,
      defaultAvatar,
      dialogSwitchAccountVisible: false,
      token: '',
      dialogDiscountCardVisible: false
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.state.username
      }
    },
    userAvatar: {
      get() {
        return this.$store.state.userAvatar
      }

    },
    identity: {
      get() {
        return this.$store.state.identity
      }
    }

  },
  mounted() {
    // this.username = localStorage.getItem('name')
    // this.identity = localStorage.getItem('identity')
    let token = localStorage.getItem('token')
    this.token = token;
    if (token) {
      this.getBasicInfo()
    }

  },
  methods: {
    turnChinaJobs(){

      let token = localStorage.getItem('token')
      if(token ){
        let domain = ''
        let envName = process.env.VUE_APP_ENV_NAME

        if(envName === 'developmentCN'){
          domain = 'test.esl-passport.cn'
        }
        if(envName === 'development'){
          domain = 'dev.eslpassport.com'
        }
        if(envName === 'productionCN'){
          domain = 'www.esl-passport.cn'
        }
        if(envName === 'production'){
          domain = 'www.eslpassport.com'
        }
        let email = localStorage.getItem('email')
        let uid = localStorage.getItem('uid')
        let navUrl = 'https://'+domain + '/exchange/account?uid='+uid + '&email='+email + '&from=foreign'
        console.log(navUrl)
        window.open(navUrl,'_blank')
      }else {
        this.$router.push('/login')
      }


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

          this.$store.commit('username', firstName + ' ' + lastName)
          this.$store.commit('userAvatar', avatar)
          this.$store.commit('identity', identity)

        }
      })
    },
    login() {
      this.$router.push('/login')
    },
    loginOut() {
      localStorage.clear()
      this.$router.push('/')
      setTimeout(function () {
        location.reload()
      }, 1500)
    },
    turnProfilePage() {
      this.$router.push({path: '/overview', query: {identity: this.identity}})
    },
    turnEditProfile() {
      this.$router.push({path: '/overview', query: {identity: this.identity}})
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
          } else {
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
    changeIdentity(identity) {
      let params = {
        token: localStorage.getItem('token'),
        identity: identity
      }

      CHANGE_IDENTITY_LANGUAGE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          localStorage.setItem('identity', identity)
          this.dialogSwitchAccountVisible = false
          this.getBasicInfo()
          this.$router.push({
            path: '/overview', query: {identity: identity}
          })
        }
      })

    },
    turnHome() {
      this.$router.push('/')
    }
  }

}
</script>

<style scoped>
.header-container {
  padding: 10px 40px;
  border-bottom: 1px solid #eeeeee;
}

.header-row-container {

}

.logo-container {
  text-align: left;
}

.logo-img {
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.nav-link-container {
  text-align: left;
}

.nav-link-container a {
  margin-left: 20px;
  text-decoration: none;
  color: #000000;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
}

.nav-link-container a:hover {
  color: #00b3d2;
}

.nav-china-jobs{
  margin-left: 20px;
  color: #000000;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
}

.nav-china-jobs:hover{
  color: #00b3d2;
}

.user-container {
  text-align: right;
}

.user-container span {
  cursor: pointer;
}

.user-container-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.4);
  overflow: hidden;
  padding: 4px;
}

.user-avatar-img {
  cursor: pointer;
}

.user-1-r {
  margin-left: 10px;
}

.user-name {
  width: 80px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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

.switch-account-tips {
  font-size: 12px;
}

.switch-account-container {
  padding: 10px;
}

.switch-account-item {
  font-size: 14px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.switch-account-item:hover {
  background-color: #0AA0A8;
  color: #FFFFFF;
}

.discount-card-container {
  width: 99%;
  margin: 0 auto;
}
</style>
