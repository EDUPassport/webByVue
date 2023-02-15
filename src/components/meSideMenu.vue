<template>
  <div>
    <div class="menu-xll-bg-container">

      <div class="menu-btn-container">
        <el-button class="menu-btn" type="primary" @click="showSideMenu()">Menu</el-button>
      </div>

      <el-scrollbar class="l-container">

        <div class="l-item l-item-margin" v-for="(item,i) in menuData" :Key="i">

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

      </el-scrollbar>

      <div class="contact-us-container">
        <el-icon :size="45" color="#6648FF" @click="contactUs()">
          <IconIcBaselineLiveHelp/>
        </el-icon>
        <span @click="contactUs()">Contact Us</span>
      </div>


    </div>

    <div class="menu-mobile-bg">
      <div class="menu-mobile-container">

        <div class="menu-mobile-item" v-for="(item,i) in menuData.slice(0,4)" :Key="i">

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

        <div class="menu-mobile-item-more-container" @click="showMoreMenuItemsWithMobile()">

          <template v-if="showMoreMenuItemsVisible">
            <el-icon class="menu-mobile-item-more-icon" :size="30">
              <IconIcBaselineClose />
            </el-icon>
            <span>Close</span>
          </template>
          <template v-else>
            <el-icon class="menu-mobile-item-more-icon" :size="30">
              <IconIcRoundMoreVert />
            </el-icon>
            <span>More</span>
          </template>

          <div  class="menu-mobile-more-show-container" v-if="showMoreMenuItemsVisible">

            <div class="menu-mobile-item menu-mobile-item-circle"
                 v-for="(item,i) in menuData.slice(4)" :Key="i">

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

        </div>

      </div>

    </div>

  </div>


</template>

<script>
import {randomString} from "@/utils";
import {USER_MENU_LIST} from '@/api/api'
import defaultAvatar from '@/assets/default/avatar.png'
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {ref, computed} from 'vue'

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
    // this.getUserMenuList()
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
      window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')

    },
    showSideMenu() {
      this.showSideMenuStatus = !this.showSideMenuStatus;

    },
    getUserMenuList() {
      let self = this;
      let params = {
        user_id: localStorage.getItem('uid'),
        identity: self.identity,
        company_id: localStorage.getItem('company_id'),
        create_user_id: localStorage.getItem('c_uid'),
        page: 1,
        limit: 1000
      }
      USER_MENU_LIST(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          let pcAllData = res.message.pc;
          let sData = pcAllData.filter(item => item.identity == self.identity)
          this.$store.commit('menuData', sData)
          // localStorage.setItem('menuData',res.message.pc)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    turnMyMessages() {
      // this.activeMsg = true
      this.setShowChatStatus()
    }

  }
}
</script>

<style scoped>

.menu-xll-bg-container {
  background-color: #ffffff;
  height: calc(100vh - 140px);
}

.profile-l-container {
  width: 160px;
  height: calc(100vh - 140px);
}


.profile-xll-username span {
  font-size: 14px;
  color: #ffffff;
}

.l-container {
  width: 160px;
  padding: 50px 0;
  height: calc(100vh - 340px);
}

.l-item {
  margin: 0 25px 40px 25px;
  position: relative;
}

.l-item-margin {

}

.l-item a {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 0 auto;
  text-align: center;

  font-size: 16px;
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  text-decoration: none;
  color: #262626;

}

.l-item a span {
  margin-top: 15px;
}


.router-img-active{
  background-color: #F0F2F5;
}

.router-txt-active{
  color: #6650B3 !important;
}

.xll-icon-image {
  width: 35px;
  height: 35px;
  padding: 4px 20px;
  border-radius: 43px;

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

.contact-us-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  /*height: 70px;*/

  background-color: #FFFFFF;
}

.contact-us-container span {
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}

@media screen and (min-width: 769px) {

  .menu-btn-container {
    display: none;
  }

  .menu-btn {
    margin: 10px 20px;
  }

  .menu-mobile-bg {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .menu-xll-bg-container {
    display: none;
  }

  .menu-mobile-bg {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: #ffffff;
    z-index: 1000;
    padding: 10px 0 10px 20px;
    height: 60px;

    border-top: 1px solid #F0F2F5;

  }

  .menu-mobile-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  .menu-mobile-item {
    position: relative;
    flex: 1;
  }

  .menu-mobile-item-circle{
    width:70px;
    height: 70px;
    background-color: #FFFFFF;
    margin: 10px;
    padding: 4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }

  .menu-mobile-item a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border-radius: 15px;

    margin: 0 auto;
    text-align: center;

    font-size: 12px;
    font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    text-decoration: none;
    color: #262626;

  }

  .menu-mobile-item-more-container{
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;

  }
  .menu-mobile-item-more-icon{
    padding: 4px 15px;
  }

  .xll-icon-image{
    width:30px;
    height: 30px;
    padding: 4px 15px;

  }
  .menu-mobile-item-more-container span{
    font-size: 12px;
    font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    text-decoration: none;
    color: #262626;
  }

  .menu-mobile-more-show-container{
    z-index: 2100;
    position: absolute;
    bottom: 60px;
    right: 0;

  }

}

</style>
