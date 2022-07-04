<template>
  <div class="profile-l-container">
    <div class="profile-photo-container">
      <el-avatar :size="120" :src="userAvatar !='' ? userAvatar : defaultAvatar"></el-avatar>
      <div class="profile-xll-username">
        <span>{{username}}</span>
      </div>
    </div>
    <div class="l-container">
      <div class="l-item">
        <router-link :to="{path:'/overview',query:{identity:identity}}" exact>Overview</router-link>
      </div>
      <div class="l-item">
        <div  class="l-item-msg"
              :class="activeMsg ? 'l-item-msg-active' : ''"
              @click="turnMyMessages()">My Messages</div>
      </div>

      <div class="l-item"
           v-for="(item,i) in menuData" :Key="i"
           :class="selectedKeys === item.link  ? 'router-link-exact-active' : '' ">
        <template v-if="item.link === '/jobs/post' ">
          <router-link :to="{path:item.link,query:{version_time:versionTime}}" exact>
            {{item.menu_name_en}}
          </router-link>
        </template>
        <template v-else>
          <router-link :to="{path:item.link}" exact>{{item.menu_name_en}}</router-link>
        </template>

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
      activeMsg:false

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
  },
  methods:{
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
  //min-height: 800px;
  min-height: 100vh;
  background-color: #0A1E76;
  border-radius: 10px;
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
.l-item-msg{
  background-color: #0A1E76;
  font-size: 14px;
  line-height: 40px;
  padding-left: 20px;
  color:#FFFFFF;
  cursor:pointer;
  font-weight: bold;
}
.l-item-msg-active{
  background-color: #0C1954;
}
.l-item-msg:hover{
  background-color: #0C1954;
}

.l-item a:hover{
  background-color: #0C1954;
}
.l-item a{
  /*width: 100%;*/
  font-size: 14px;
  font-weight: bold;
  line-height: 40px;
  text-decoration: none;
  color: #ffffff;
  display: block;
  padding-left: 20px;
}
.router-link-exact-active {
  background-color: #0C1954;
  color: #ffffff !important;
}
</style>