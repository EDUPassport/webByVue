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
      <div class="l-item">
        <router-link to="/favorites" exact>My Favorites</router-link>
      </div>
      <div class="l-item">
        <router-link v-if="identity == 1" to="/educator/profile" exact>My Account & Profile</router-link>
        <router-link v-if="identity == 2" to="/business/profile" exact>My Account & Profile</router-link>
        <router-link v-if="identity == 3" to="/vendor/profile" exact>My Account & Profile</router-link>
      </div>
<!--      <div class="l-item">-->
<!--        <router-link to="/" exact>My Ads</router-link>-->
<!--      </div>-->
      <div class="l-item" v-if="identity == 2">
        <router-link to="/jobs/myJobs" exact>My Jobs</router-link>
      </div>
      <div class="l-item" v-if="identity == 3">
        <router-link to="/deals/myDeals" exact>My Deals</router-link>
      </div>
      <div class="l-item" v-if="identity == 2">
        <router-link :to="{path:'/jobs/post',query:{version_time:versionTime}}" exact>Post a Job</router-link>
      </div>
      <div class="l-item" v-if="identity == 3">
        <router-link to="/deals/offer" exact>Offer a Deal</router-link>
      </div>
      <div class="l-item" v-if="identity == 3 || identity == 2">
        <router-link to="/events/myEvents" exact>My Events</router-link>
      </div>
      <div class="l-item" v-if="identity == 3 || identity == 2">
        <router-link to="/events/post" exact>Post Event</router-link>
      </div>
      <div class="l-item">
        <router-link to="/privacy/policy" exact>Privacy Policy</router-link>
      </div>
      <div class="l-item" v-if="identity == 1">
        <router-link to="/me/applications" exact>My Applications</router-link>
      </div>
      <div class="l-item">
        <router-link to="/faq/list" exact>FAQ</router-link>
      </div>
    </div>

  </div>

</template>

<script>
import {randomString} from "@/utils";
import {GET_BASIC_INFO} from  '@/api/api'
import defaultAvatar from '@/assets/default/avatar.png'
import {useStore} from "vuex";
export default {
  name: "meSideMenu",
  setup(){
    const store = useStore()

    const setNowChatUserInfo = (data) => store.commit('nowChatUserInfo',data)
    const setShowChatStatus = () => store.commit('showChatStatus', true)
    return {
      setNowChatUserInfo,
      setShowChatStatus
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
    }

  },
  mounted() {
    // console.log(this.identity)
    // this.getBasicInfo()
  },
  methods:{
    turnMyMessages(){
      // this.activeMsg = true
      this.setShowChatStatus()
    },
    getBasicInfo() {
      let uid = localStorage.getItem('uid')
      let identity = localStorage.getItem('identity')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        console.log(res)
        if(res.code == 200){

          this.phone = res.message.phone;
          if (identity == 1 && res.message.educator_info) {
            this.accountInfo = res.message.educator_info;
            this.accountPhotoValue = res.message.educator_info.profile_photo
          }
          if (identity == 2 && res.message.business_info) {
            this.accountInfo = res.message.business_info;
            this.accountPhotoValue = res.message.business_info.logo

          }
          if (identity == 3 && res.message.vendor_info) {
            this.accountInfo = res.message.vendor_info;
            this.accountPhotoValue = res.message.vendor_info.logo
          }

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    }
  }
}
</script>

<style scoped>
.profile-l-container{
  min-height: 800px;
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