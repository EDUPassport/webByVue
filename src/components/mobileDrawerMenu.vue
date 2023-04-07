<template>
  <div>
    <el-drawer
        :z-index="1100"
        :model-value="visible"
        :with-header="false"
        :show-close="false"
        direction="ltr"
        size="300px"
        modal-class="custom-drawer"
        @close="closeMobileMenu()"
    >
      <div class="close-circle-container" @click="closeMobileMenu()">
        <el-icon class="close-circle-icon" color="#ffffff" :size="24"><ArrowLeft /></el-icon>
      </div>

      <el-scrollbar height="100%" class="menu-xll-bg-container">

        <div class="menu-edu-logo" @click="turnHome()">
          <el-image class="menu-edu-logo-img" :src="eduLogoImg"></el-image>
          <el-image class="menu-edu-logo-43-img" :src="logo43Img"></el-image>
        </div>

        <div class="menu-items-container">

          <div class="menu-item menu-item-margin" v-for="(item,i) in menuData" :Key="i">

            <router-link :to="{path:item.link}" exact>

              <el-image class="xll-icon-image"
                        :class="selectedKeys === item.link  ? 'router-img-active' : '' "
                        :src="selectedKeys === item.link ? item.icon_hover : item.icon">
              </el-image>

              <span :class="selectedKeys === item.link  ? 'router-txt-active' : '' ">{{ item.menu_name_en }}</span>

            </router-link>

            <div class="item-head_unread" v-if="item.menu_name_en === 'MESSAGES' && unreadTotal > 0 ">
              {{ unreadTotal }}
            </div>

          </div>

        </div>

        <div class="menu-upgrade-btn">
          <el-image class="menu-upgrade-img" :src="upgradeImg"></el-image>
          <span>Upgrade to Premium</span>
        </div>

        <div class="menu-items-container">

          <div class="menu-item menu-item-margin">

            <router-link to="/jobs" exact>
              <span>EDU Jobs</span>
            </router-link>

          </div>
          <div class="menu-item menu-item-margin">

            <router-link to="/deals" exact>
              <span>EDU Deals</span>
            </router-link>

          </div>
          <div class="menu-item menu-item-margin">

            <router-link to="/events" exact>
              <span>EDU Events</span>
            </router-link>

          </div>

        </div>

        <div class="menu-bottom-container">

          <div class="menu-bottom-top-container">
            <div class="menu-custom-item"  >
              <el-image
                  :src="messageQuestionImg"
                  @click="contactUs()"
                  class="menu-custom-item-img">
              </el-image>
              <span @click="contactUs()">Support</span>
            </div>
            <div class="menu-custom-item">
              <el-image :src="settingImg" class="menu-custom-item-img"></el-image>
              <span>Settings</span>
            </div>
          </div>

          <div class="menu-bottom-bottom-container">
            <div class="menu-logout-container" >
              <el-image :src="logoutImg" class="menu-custom-item-img"></el-image>
              <span @click="logout()">Logout</span>
            </div>
          </div>

        </div>

      </el-scrollbar>

    </el-drawer>

  </div>

</template>

<script>
import logoImgLogo from '@/assets/newHome/logo/Logo_Transparent.png'
import {useRouter} from 'vue-router'
import {LOGOUT_V2} from "@/api/api";
import {randomString} from "@/utils";
import defaultAvatar from '@/assets/default/avatar.png'
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {ref, computed} from 'vue'
import eduLogoImg from '@/assets/newHome/dashboard/edu-logo.svg'
import upgradeImg from '@/assets/newHome/dashboard/upgrade.svg'
import messageQuestionImg from '@/assets/newHome/dashboard/message-question.svg'
import settingImg from '@/assets/newHome/dashboard/setting.svg'
import logoutImg from '@/assets/newHome/dashboard/logout.svg'
import logo43Img from '@/assets/newHome/dashboard/logo-43.svg'

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

    const store = useStore()

    const setNowChatUserInfo = (data) => store.commit('nowChatUserInfo', data)
    const setShowChatStatus = () => store.commit('showChatStatus', true)
    const currentRoute = useRoute()
    const activeMenuStr = currentRoute.meta.activeMenu;
    const selectedKeys = ref(activeMenuStr ? activeMenuStr : currentRoute.path)
    const currentUser = computed(() => store.state.currentUser)

    const showMoreMenuItemsVisible = ref(false)

    function showMoreMenuItemsWithMobile(){
      showMoreMenuItemsVisible.value = !showMoreMenuItemsVisible.value
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
      turnBlog,
      showMoreMenuItemsVisible,
      showMoreMenuItemsWithMobile,
      setNowChatUserInfo,
      setShowChatStatus,
      selectedKeys,
      currentUser
    }

  },
  data() {
    return {
      logoImgLogo,
      envName: process.env.VUE_APP_ENV_NAME,
      envBlog: process.env.VUE_APP_BLOG,
      menuDrawerStatus: false,
      defaultAvatar,
      eduLogoImg,
      upgradeImg,
      messageQuestionImg,
      settingImg,
      logoutImg,
      logo43Img,
      accountInfo: {},
      accountPhotoValue: '',
      versionTime: randomString(),
      activeMsg: false,
      showSideMenuStatus: true,
    }
  },
  watch: {
    menuData(newValue) {
      console.log(newValue)
    },
    unreadTotal(newValue) {
      console.log(newValue)
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
    menuData: {
      get() {
        return this.$store.state.menuData
      }
    },
    unreadTotal: {
      get() {
        return this.$store.state.imUnreadTotal
      }
    },
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
  mounted() {

    let screenWidth = document.body.clientWidth

    if (Math.floor(screenWidth) < 768) {
      this.showSideMenuStatus = false;
    }
    if (Math.floor(screenWidth) >= 768 && Math.floor(screenWidth) < 992) {
      this.showSideMenuStatus = true;
    }
    if (Math.floor(screenWidth) >= 992 && Math.floor(screenWidth) < 1200) {
      this.showSideMenuStatus = true;
    }
    if (Math.floor(screenWidth) >= 1200) {
      this.showSideMenuStatus = true;
    }

    window.onresize = () => {
      let screenWidth2 = document.body.clientWidth
      if (Math.floor(screenWidth2) < 768) {
        this.showSideMenuStatus = false;
      }
      if (Math.floor(screenWidth2) >= 768 && Math.floor(screenWidth2) < 992) {
        this.showSideMenuStatus = true;
      }
      if (Math.floor(screenWidth2) >= 992 && Math.floor(screenWidth2) < 1200) {
        this.showSideMenuStatus = true;
      }
      if (Math.floor(screenWidth2) >= 1200) {
        this.showSideMenuStatus = true;
      }
    }
  },
  methods: {

    closeMobileMenu() {
      this.$emit('close')
    },
    contactUs() {
      window.open('https://forms.zohopublic.com/edupassport/form/ContactUs1/formperma/W3VqHmZCLc7oBTIm0cBDz43WsPoDWS0NrHdhGyqdadU', '_blank')
    },
    showSideMenu() {
      this.showSideMenuStatus = !this.showSideMenuStatus;

    },
    turnMyMessages() {
      // this.activeMsg = true
      this.setShowChatStatus()
    },
    logout() {
      this.$loading({
        text: 'Loading...'
      })

      let params = {
        token: localStorage.getItem('token'),
        platform: 4
      }

      LOGOUT_V2(params).then(res => {
        if (res.code == 200) {
          localStorage.clear()
          this.token = '';
          this.$store.commit('username', '')
          this.$store.commit('userAvatar', '')
          this.$router.push('/')
          this.$loading().close()
        }

        // console.log(res)
      }).catch(err => {
        console.log(err)
      })

    }

  }

}
</script>

<style scoped>
/deep/ .el-drawer{
  overflow: unset;
}
/deep/ .el-drawer__body {
  padding: 0;
}

.menu-xll-bg-container {
  width: 300px;
  background: #4732B3;
  height: var(--i-window-height);

  display: flex;
  flex-direction: column;

  z-index: 1300;
  top:0;
  bottom:0;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;

}

.close-circle-container{
  width: 115px;
  height: 115px;
  background: #4732B3;
  border-radius: 115px;
  z-index: 1200;
  position: absolute;
  top: 0;
  bottom: 0;
  right: -50px;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;

}

.close-circle-icon{
  margin-right: 10px;

}

.menu-edu-logo{
  width: 148px;
  padding-top: 40px;
  padding-left: 24px;
  cursor: pointer;
}

.menu-edu-logo-img{
  width: 100%;
}

.menu-edu-logo-43-img{
  display: none;
}

.menu-items-container{
  margin-top: 40px;
}

.menu-item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

}

.menu-item a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  text-decoration: none;

  width: 100%;
  height: 40px;
  margin:0 16px 8px 16px;
  padding: 0 16px;
}

.menu-item a span{
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  font-family: Inter, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  color: #ffffff;
  margin-left: 12px;
}

.menu-item a:hover{
  background: #5C41E6;
  border-radius: 6px;
}

.router-link-exact-active{
  background: #5C41E6;
  border-radius: 6px;
}

.xll-icon-image {
  width: 20px;
  height: 20px;
}

.menu-upgrade-btn{
  display: flex;
  flex-direction: row;
  align-items: center;

  background: #FFD171;
  border-radius: 6px;
  padding: 0 16px;
  margin: 16px;
  height: 40px;
  cursor: pointer;
}
.menu-upgrade-btn:hover{
  background-color: #fdb022;
}
.menu-upgrade-img{
  width: 20px;
  height: 20px;
}

.menu-upgrade-btn span{
  font-family: 'Inter',Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #1D2939;
  margin-left: 12px;
}


.item-head_unread {
  padding: 2px 5px;
  background-color: #EE593C;
  color: #FFFFFF;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
}

.menu-bottom-container{
  margin-bottom: 28px;
  margin-top: auto;
}

.menu-bottom-top-container{
  border-bottom: 1px solid #856DFF;
  margin: 0 16px;
}
.menu-custom-item{
  display: flex;
  align-items: center;
  height: 40px;

  margin-bottom: 8px;
}
.menu-custom-item span:hover{
  color: #98a2b3;
}
.menu-custom-item span{
  margin-left: 12px;
  font-family: 'Inter',Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  cursor: pointer;
}

.menu-custom-item-img{
  width: 20px;
  height: 20px;
  margin-left: 16px;
  cursor: pointer;
}

.menu-bottom-bottom-container{
  margin: 0 16px;
}
.menu-logout-container{
  display: flex;
  align-items: center;
  height: 40px;
}

.menu-logout-container span{
  margin-left: 12px;
  font-family: 'Inter',Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FDA29B;
  cursor: pointer;
}
.menu-logout-container span:hover{
  color: #f79009;
}

@media screen and  (max-width: 768px) {


}
</style>
