<template>
<div class="setting-bg">
  <div class="setting-label">
    Setting
  </div>
  <div class="switch-container">
    <div class="switch-item switch-item-l"
         :class="sPathName === '/setting/account' ? 'switch-item-active' : '' "
         @click="turnAccount()">
      <span>Account</span>
    </div>
    <div class="switch-item switch-item-m"
         @click="turnProfile()">
      <span>Profile</span>
    </div>
    <div class="switch-item switch-item-r"
         @click="turnPrivacy()">
      <span>Privacy</span>
    </div>
  </div>

  <router-view></router-view>
</div>
</template>

<script>
import {onBeforeRouteUpdate, useRouter} from 'vue-router'
import {ref} from 'vue'
export default {
  name: "index",
  setup(){
    const router = useRouter()

    const sPathName = ref(window.location.pathname)
    // console.log(sPathName)
    onBeforeRouteUpdate((to)=>{
      // console.log(from, to)
      sPathName.value = to.path
    })
    function turnAccount(){
      router.push({path:'/setting/account'})
    }

    function turnProfile(){
      router.push({path:'/setting/educator'})
    }

    function turnPrivacy(){
      router.push({path:'/setting/privacy'})
    }

    return {
      sPathName,
      turnAccount,
      turnProfile,
      turnPrivacy
    }

  }
}
</script>

<style scoped>
.setting-bg{
  background-color: #FFFFFF;
  height: var(--i-window-height);
}
.setting-label{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  color: #000000;
  padding: 40px 0 0 40px;
}

.switch-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 30px 0 0 40px;
}

.switch-item{
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 89px;
  height: 42px;
  background: #FFFFFF;
  cursor: pointer;
}

.switch-item-l{
  border-left: 1px solid #D0D5DD;
  border-top: 1px solid #D0D5DD;
  border-bottom: 1px solid #D0D5DD;
  border-radius: 8px 0px 0px 8px;
}
.switch-item-m{
  border: 1px solid #D0D5DD;
}
.switch-item-r{
  border-right: 1px solid #D0D5DD;
  border-bottom: 1px solid #D0D5DD;
  border-top: 1px solid #D0D5DD;
  border-radius: 0px 8px 8px 0px;
}

.switch-item span{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */

  text-align: right;

  /* Grey/800 */

  color: #1D2939;
}
.switch-item:hover{
  background: #F2F4F7;
}
.switch-item-active{
  background: #F2F4F7;
}
</style>
