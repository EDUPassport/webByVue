<template>
  <div>
    <el-drawer
        :z-index="3100"
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
        <div class="nav-link-item"  @click="turnHome()">
          <span :class="sMenuPath === '/' ? 'nav-link-item-active' : '' ">HOME</span>
        </div>
        <div class="nav-link-item" @click="turnJobs()">
          <span :class="sMenuPath === '/jobs' ? 'nav-link-item-active' : '' ">EDU JOBS</span>
        </div>
        <div class="nav-link-item" @click="turnDeals()">
          <span :class="sMenuPath === '/deals' ? 'nav-link-item-active' : '' ">EDU DEALS</span>
        </div>
        <div class="nav-link-item" @click="turnEvents()">
          <span :class="sMenuPath === '/events' ? 'nav-link-item-active' : '' ">EDU EVENTS</span>
        </div>

        <template v-if="envBlog ==='yes'">
          <div class="nav-link-item" @click="turnBlog()">
            <span>EDU BLOGS</span>
          </div>

        </template>

        <template v-if="token">
          <div class="nav-link-item" @click="turnProfile()">
            <span :class="sMenuPath === '/overview' ? 'nav-link-item-active' : '' ">PROFILE</span>
          </div>
        </template>
        <template v-else>
          <div class="nav-link-item" @click="turnLogin()">
            <span :class="sMenuPath === '/login' ? 'nav-link-item-active' : '' ">LOGIN</span>
          </div>
          <div class="nav-link-item" @click="turnSignUp()">
            <span :class="sMenuPath === '/signup' ? 'nav-link-item-active' : '' ">SIGN UP</span>
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
import {useRouter} from 'vue-router'
import {ref} from 'vue'

export default {
  name: "mobileDrawerMenu",
  props: ['visible'],
  setup(props, context) {
    const router = useRouter();
    console.log(props)
    // const visible = props.visible
    const sMenuPath = ref(window.location.pathname)

    function turnHome() {
      context.emit('close')
      sMenuPath.value = '/'
      return router.push('/')
    }

    function turnJobs() {
      context.emit('close')
      sMenuPath.value = '/jobs'
      return router.push('/jobs')
    }

    function turnDeals() {
      context.emit('close')
      sMenuPath.value = '/deals'
      return router.push('/deals')
    }

    function turnEvents() {
      context.emit('close')
      sMenuPath.value = '/events'
      return router.push('/events')
    }

    function turnProfile() {
      context.emit('close')
      sMenuPath.value = '/overview'
      return router.push('/overview')
    }

    function turnLogin() {
      context.emit('close')
      sMenuPath.value = '/login'
      return router.push('/login')
    }

    function turnSignUp() {
      context.emit('close')
      sMenuPath.value = '/signup'
      return router.push('/signup')
    }

    function turnChinaWebsite() {
      context.emit('close')
      return window.open('https://www.edupassport.cn')
    }

    function turnGlobalWebsite() {
      context.emit('close')
      return window.open('https://www.edupassport.io')
    }

    function turnBlog() {
      context.emit('close')
      return window.open('https://blog.edupassport.io/')
    }

    return {
      sMenuPath,
      turnHome,
      turnJobs,
      turnDeals,
      turnEvents,
      turnProfile,
      turnLogin,
      turnSignUp,
      turnChinaWebsite,
      turnGlobalWebsite,
      turnBlog
    }

  },
  data() {
    return {
      logoImgLogo,
      envName: process.env.VUE_APP_ENV_NAME,
      envBlog: process.env.VUE_APP_BLOG,
      menuDrawerStatus: false
    }
  },
  computed: {
    identity: {
      get() {
        return this.$store.state.identity
      }
    },
    token: {
      get() {
        return localStorage.getItem('token')
      }
    }

  },
  methods: {
    closeMobileMenu() {
      this.$emit('close')
    }

  }

}
</script>

<style scoped>
/deep/ .el-drawer {
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
}

.nav-link-item span {
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

.nav-link-item-active{
  text-decoration: underline;
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

  .mobile-menu-drawer-bg {
    background-color: #F0F2F5;
    height: 100%;
    position: relative;
  }

  .mobile-chose-country {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

  }

}
</style>
