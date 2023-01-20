<template>
  <div>
    <el-drawer
        :model-value="visible"
        direction="ltr"
        size="50%"
        @close="closeMobileMenu()"
    >
      <template #header>
        <div style="width: 30px;">
          <div class="logo-mobile-new-container">
            <div class="logo-mobile-new">
              <el-image class="logo-mobile-new-logo-img" :src="logoImgLogo"></el-image>
            </div>
            <div class="logo-mobile-new-beta">Beta</div>
            <el-button link @click="closeMobileMenu()">close</el-button>
          </div>
        </div>

      </template>
      <div class="mobile-menu-drawer-bg">
        <div class="nav-link-item">
          <router-link to="/" exact>HOME</router-link>
        </div>
        <div class="nav-link-item">
          <router-link to="/jobs" exact>EDU JOBS</router-link>
        </div>
        <div class="nav-link-item">
          <router-link to="/deals" exact> EDU DEALS</router-link>
        </div>
        <div class="nav-link-item">
          <router-link to="/events" exact>EDU EVENTS</router-link>
        </div>
        <div class="nav-link-item">
          <el-link :underline=false href="https://blogs.edupassport.io/" target="_blank">BLOG</el-link>
        </div>

        <template v-if="token">
          <div class="nav-link-item">
            <router-link to="/overview" exact>PROFILE</router-link>
          </div>
        </template>
        <template v-else>
          <div class="nav-link-item">
            <router-link to="/login" exact>LOGIN</router-link>
          </div>

          <div class="nav-link-item">
            <router-link to="/signUp" exact>SIGN UP</router-link>
          </div>

        </template>

        <div class="mobile-chose-country">
          <div class="mobile-country-china">
            <el-button link @click="turnChinaWebsite()">China</el-button>
          </div>
          <div class="mobile-country-global">
            <el-button link @click="turnGlobalWebsite()">Global</el-button>
          </div>
        </div>

      </div>


    </el-drawer>

  </div>

</template>

<script>
import logoImgLogo from '@/assets/newHome/logo/Logo_Transparent.png'

export default {
  name: "mobileDrawerMenu",
  props:['visible'],
  data(){
    return {
      logoImgLogo,
      envName: process.env.VUE_APP_ENV_NAME,
      menuDrawerStatus:false
    }
  },
  computed: {
    identity: {
      get() {
        return this.$store.state.identity
      }
    },
    token:{
      get(){
        return localStorage.getItem('token')
      }
    }

  },
  methods:{
    closeMobileMenu(){
      this.$emit('close')
    },
    turnChinaWebsite(){
      window.open('https://www.edupassport.cn')
    },
    turnGlobalWebsite(){
      window.open('https://www.edupassport.io')
    }
  }

}
</script>

<style scoped>
/deep/ .el-drawer{
  background-color: #F0F2F5;
}

.nav-link-container {
  text-align: left;
}

.nav-link-container a {
  margin-left: 20px;
  text-decoration: none;
  color: #262626;

  font-size: 24px;
  line-height: 30px;

}

.nav-link-container a:hover {
  color: #000000;
}

.xll-sub-dropdown h4 {
  padding: 4px 10px;
  border-bottom: 1px solid #eeeeee;
  color: #808080;
}


.nav-link-item {
  cursor: pointer;
  padding: 10px;
  /*border-bottom: 1px solid #EEEEEE;*/
}

.nav-link-item span{
  font-size: 16px;
  color: #262626;
  line-height: 20px;
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}


.nav-link-item a {
  /*display: block;*/
  text-decoration: none;
  font-size: 16px;
  color: #262626;
  line-height: 20px;
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}


.logo-mobile-new-container {
  display: none;
}

@media screen and  (max-width: 768px) {


  .logo-mobile-new-container {
    width: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

  }

  .logo-mobile-new {
    cursor: pointer;
  }

  .logo-mobile-new-logo-img {
    width: 30px;
  }

  .logo-mobile-new-beta {
    position: absolute;
    top: 0;
    right: -25px;
    background-color: #49397f;
    padding: 2px 10px;
    border-radius: 10px;
    color: #EEEEEE;
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 12px;
  }

  .mobile-menu-drawer-bg{
    background-color: #F0F2F5;
    height: calc(100% - 100px);
    position: relative;
  }

  .mobile-chose-country{
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;

  }

}
</style>