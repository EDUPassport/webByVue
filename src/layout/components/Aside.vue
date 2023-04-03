<template>

  <div class="menu-xll-bg-container">

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
        <div class="menu-custom-item" @click="turnSetting()">
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

  </div>

</template>

<script>
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

import {LOGOUT_V2} from "@/api/api";

export default {
  name: "meSideMenu",
  setup() {
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
    identity: {
      get() {
        return this.$store.state.identity
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
    contactUs() {
      window.open('https://forms.zohopublic.com/edupassport/form/ContactUs1/formperma/W3VqHmZCLc7oBTIm0cBDz43WsPoDWS0NrHdhGyqdadU', '_blank')
    },
    showSideMenu() {
      this.showSideMenuStatus = !this.showSideMenuStatus;

    },
    turnHome(){
      this.$router.push('/')
    },
    turnSetting(){
      this.$router.push('/setting')
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

.menu-xll-bg-container {
  width: 300px;
  background: #4732B3;
  height: var(--i-window-height);
  display: flex;
  flex-direction: column;
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

@media screen and (max-width: 1200px) {
  .menu-xll-bg-container {
    width: 80px;
  }

  .menu-edu-logo{
    width: 43px;
    padding-top: 40px;
    padding-left: 17px;
  }
  .menu-edu-logo-43-img{
    display: block;
  }

  .menu-edu-logo-img{
    display: none;
  }

  .menu-item a span{
    display: none;
  }

  .menu-upgrade-btn span{
    display: none;
  }

  .menu-custom-item span{
    display: none;
  }

  .menu-logout-container span{
    display: none;
  }

}

@media screen and (min-width: 769px) {

}

@media screen and (max-width: 768px) {
  .menu-xll-bg-container{
    display: none;
  }

}

</style>
