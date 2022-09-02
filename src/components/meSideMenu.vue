<template>
  <div>

    <div class="menu-btn-container">
      <el-button class="menu-btn" type="primary" @click="showSideMenu()">Menu</el-button>
    </div>

    <div class="profile-l-container" v-if="showSideMenuStatus">

<!--      <div class="profile-photo-container">-->
<!--        <el-avatar :size="120" :src="userAvatar !='' ? userAvatar : defaultAvatar"></el-avatar>-->
<!--        <div class="profile-xll-username">-->
<!--          <span>{{username}}</span>-->
<!--        </div>-->
<!--      </div>-->

      <div class="l-container">
        <div class="l-item">
          <router-link :to="{path:'/overview',query:{identity:identity}}" exact>
            <el-icon :size="45">
              <IconEduHomeNofill />
            </el-icon>
            <span>Overview</span>
          </router-link>
        </div>
        <div class="l-item l-item-margin">
          <router-link :class="selectedKeys === '/account/home'  ? 'router-link-exact-active' : '' "
                       :to="{path:'/account/home',query:{}}" exact>
            <el-icon :size="45">
              <IconEduAccountCircleNofill />
            </el-icon>
            <span>Account</span>
          </router-link>
        </div>

        <div class="l-item l-item-margin">
          <router-link :class="selectedKeys === '/jobs/home'  ? 'router-link-exact-active' : '' "
                       :to="{path:'/jobs/home',query:{}}" exact>
            <el-icon :size="45">
              <IconEduApplicationNofill />
            </el-icon>
            <span>Jobs and Applications</span>
          </router-link>
        </div>

        <div class="l-item l-item-margin">
          <router-link :to="{path:'/chat/messages',query:{}}" exact>
            <el-icon :size="45">
              <IconEduChatNofill />
            </el-icon>
            <span>Messages</span>
          </router-link>
        </div>
        <div class="l-item l-item-margin">
          <router-link :class="selectedKeys === '/perks/home'  ? 'router-link-exact-active' : '' "
                       :to="{path:'/perks/home',query:{}}" exact>
            <el-icon :size="45">
              <IconEduHomeNofill />
            </el-icon>
            <span>Perks</span>
          </router-link>
        </div>
<!--        <div class="l-item l-item-margin">-->
<!--          <div  class="l-item-msg"-->
<!--                :class="activeMsg ? 'l-item-msg-active' : ''"-->
<!--                @click="turnMyMessages()">-->
<!--            <el-icon :size="45">-->
<!--              <IconEduChatNofill />-->
<!--            </el-icon>-->
<!--           <span>Messages</span>-->
<!--          </div>-->
<!--        </div>-->

        <div class="l-item l-item-margin"
             v-for="(item,i) in menuData" :Key="i"
             :class="selectedKeys === item.link  ? 'router-link-exact-active' : '' ">
          <template v-if="item.link === '/jobs/post' ">
            <router-link :to="{path:item.link,query:{version_time:versionTime}}" exact>
              <el-image class="xll-icon-image" :src="item.icon"></el-image>
              <span>{{item.menu_name_en}}</span>
            </router-link>
          </template>
          <template v-else>
            <router-link :to="{path:item.link}" exact>
              <el-image  class="xll-icon-image" :src="item.icon"></el-image>
              <span>{{item.menu_name_en}}</span>
            </router-link>
          </template>

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
import {ref} from 'vue'

export default {
  name: "meSideMenu",
  setup(){
    const store = useStore()

    const setNowChatUserInfo = (data) => store.commit('nowChatUserInfo',data)
    const setShowChatStatus = () => store.commit('showChatStatus', true)
    const currentRoute = useRoute()
    const activeMenuStr = currentRoute.meta.activeMenu;
    const selectedKeys = ref(activeMenuStr ? activeMenuStr : currentRoute.path)

    return {
      setNowChatUserInfo,
      setShowChatStatus,
      selectedKeys
    }

  },
  data(){
    return {
      defaultAvatar,
      accountInfo:{},
      accountPhotoValue:'',
      versionTime:randomString(),
      activeMsg:false,
      showSideMenuStatus:true

    }
  },
  computed:{
    username:{
      get(){
        return this.$store.state.username
      }
    },
    userAvatar:{
      get(){
        return this.$store.state.userAvatar
      }

    },
    identity:{
      get(){
        return this.$store.state.identity
      }
    },
    menuData:{
      get(){
        return this.$store.state.menuData
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
  methods:{
    showSideMenu(){
      this.showSideMenuStatus = !this.showSideMenuStatus;
      // let obj = document.getElementsByClassName('profile-l-container');
      // console.log(obj)
      // obj[0].setAttribute('style','display:block');

    },
    getUserMenuList(){
      let self = this;
      let params = {
        user_id:localStorage.getItem('uid'),
        identity:self.identity,
        company_id:localStorage.getItem('company_id'),
        create_user_id:localStorage.getItem('c_uid'),
        page:1,
        limit:1000
      }
      USER_MENU_LIST(params).then(res=>{
        // console.log(res)
        if(res.code === 200){
          let pcAllData = res.message.pc;
          let sData = pcAllData.filter(item=>item.identity == self.identity)
          this.$store.commit('menuData', sData)
          // localStorage.setItem('menuData',res.message.pc)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    turnMyMessages(){
      // this.activeMsg = true
      this.setShowChatStatus()
    }

  }
}
</script>

<style scoped>
.profile-l-container{
  width: 160px;
  min-height: 100vh;
  background-color: #ffffff;

  padding-bottom: 20px;
}
.profile-photo-container{
  padding: 30px;

}
.profile-photo{

  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.profile-xll-username{
  text-align: center;
}

.profile-xll-username span{
  font-size: 14px;
  color: #ffffff;
}

.l-container{
  text-align: left;
  padding-top: 40px;
}
.l-item{

}

.l-item-margin{
  margin-top: 20px;
}

.l-item-msg{
  width:108px;

  margin: 0 auto;
  text-align: center;
  padding:10px;
  border-radius: 15px;

  font-size: 24px;
  font-family: BCRegular, serif;
  line-height: 29px;

  cursor:pointer;

}

.l-item-msg-active{
  background-color: #F0F2F5;
  color: #6650B3 !important;
}

.l-item-msg:hover{
  background-color: #F0F2F5;
  color: #6650B3 !important;
}

.l-item a:hover{
  background-color: #F0F2F5;
  color: #6650B3 !important;
}

.l-item a{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;

  width:108px;
  min-height: 94px;

  margin: 0 auto;
  text-align: center;
  padding:10px;
  border-radius: 15px;

  font-size: 24px;
  font-family: BCRegular, serif;
  line-height: 29px;
  text-decoration: none;
  color: #262626;

}

.l-item a span{
  margin-top:10px;
}


.router-link-exact-active {
  background-color: #F0F2F5;
  color: #6650B3 !important;
}


.menu-btn-container{
  display: none;
}
.menu-btn{
  margin:10px 20px;
}

.xll-icon-image{
  width: 30px;
  height: 30px;
}

@media screen and (max-width: 768px) {
  .profile-l-container{
    width: 200px;
    position: fixed;
    z-index:1000;
    top:0;
    bottom:0;
    right:0;

  }
  .menu-btn-container{
    display: inline ;

  }



}

</style>
