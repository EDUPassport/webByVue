<template>

  <div>
    <el-header class="header-container" height="auto">
      <el-row :gutter="0" justify="start" align="middle">
        <el-col class="logo-container" :xs="12" :sm="3" :md="3" :lg="1" :xl="1">
          <el-image class="logo-img" :src="logoImg" fit="fill"></el-image>
        </el-col>

        <el-col :xs="0" :sm="18" :md="17" :lg="20" :xl="20">
          <div class="nav-link-container">
            <router-link to="/home" exact>Home</router-link>
            <router-link to="/jobs" exact>Job Listings</router-link>
            <router-link to="/" exact> Industry News</router-link>
            <router-link to="/" exact>Blog</router-link>
            <router-link to="/" exact> Contact</router-link>
            <router-link to="/" exact> GoDeals</router-link>
          </div>
        </el-col>

        <el-col :xs="12" :sm="3" :md="4" :lg="3" :xl="3">
          <div class="user-container">
            <template v-if="username!='' && username ">
              Hi,{{ username }}!
              <el-button type="warning" @click="loginOut">Login Out</el-button>
            </template>
            <template v-else>
              <el-button type="primary" @click="login">Login</el-button>
<!--              <router-link to="/login">Login</router-link>-->
            </template>
          </div>
        </el-col>

      </el-row>
    </el-header>

  </div>

</template>

<script>
import logoImg from '@/assets/logo.png'

export default {
  name: "Header",
  data() {
    return {
      logoImg
    }
  },
  setup() {

    const username = localStorage.getItem('name')

    return {
      username
    }

  },
  methods: {
    login(){
      this.$router.push('/login')
    },
    loginOut() {
      localStorage.clear()
      location.reload()
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

.router-link-exact-active {
  background-color: #00b3d2;
  color: #ffffff !important;
  padding: 10px 20px;
  border-radius: 4px;
}
</style>
