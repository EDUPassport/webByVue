<template>

  <div>
    <el-header class="header-container" height="auto">
      <el-row  :gutter="0" justify="start" align="middle">
        <el-col class="logo-container" :xs="12" :sm="3" :md="3" :lg="1" :xl="1">
          <el-image class="logo-img" :src="logoImg" fit="fill"></el-image>
        </el-col>

        <el-col :xs="0" :sm="18" :md="17" :lg="20" :xl="21">
          <div class="nav-link-container">
            <router-link to="/">Home</router-link>
            <router-link to="/">Job Listings</router-link>
            <router-link to="/"> Industry News</router-link>
            <router-link to="/">Blog</router-link>
            <router-link to="/"> Contact</router-link>
            <router-link to="/"> GoDeals </router-link>
          </div>
        </el-col>

        <el-col :xs="12" :sm="3" :md="4" :lg="3" :xl="2">
          <div class="user-container">
            Hi,Jon!
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
  data(){
    return {
      logoImg
    }
  },

}
</script>

<style scoped>
.header-container{
  padding: 10px 40px;
  border-bottom: 1px solid #eeeeee;
}
.logo-container{
  text-align: left;
}
.logo-img{
  width: 60px;
  height: 60px;
}
.nav-link-container{
  text-align: left;
}
.nav-link-container a{
  margin-left: 20px;
  text-decoration: none;
  color: #000000;
  font-weight: bold;
}

.nav-link-container a:hover{
  color: #00b3d2;
}

.user-container{
  text-align: right;
}
</style>
