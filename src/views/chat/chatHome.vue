<template>
  <div class="bg">
    <div class="msg-xll-container">
      <div class="msg-xll-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <div class="msg-xll-r-container">
        <div class="msg-xll-r-bg-container">

          <div class="home">
            <div class="home-container">
              <div class="home-menu">
                <div class="menu-header">
                  <el-avatar class="user-avatar" :src="currentUser.avatar"/>
                  <div class="user-profile">
                    <div class="user-profile-main">
                      <div class="user-profile-header">
                        <el-avatar :src="currentUser.avatar"/>
                        <div>{{ currentUser.name }}</div>
                      </div>
<!--                      <div class="user-profile-info">-->
<!--                        <div class="user-profile-info-title">Email</div>-->
<!--                        <div>{{ currentUser.email }}</div>-->
<!--                      </div>-->
<!--                      <div class="user-profile-info">-->
<!--                        <div class="user-profile-info-title">Phone</div>-->
<!--                        <div>{{ currentUser.phone }}</div>-->
<!--                      </div>-->
                    </div>
                  </div>
                </div>
                <div class="menu-box">
                  <div class="menu-list">
                    <router-link tag="div" class="menu-item" to="/chat/messages" replace>
                      <el-icon :size="25">
                        <IconMaterialSymbolsChatOutline />
                      </el-icon>
                      <span v-if="unreadAmount" class="menu-unread">{{ unreadAmount }}</span>
                    </router-link>
                    <router-link tag="div" class="menu-item" to="/chat/history" replace>
                    <el-icon :size="25">
                      <IconRiChatHistoryLine />
                    </el-icon>
                  </router-link>
                  </div>

                </div>
              </div>
              <div class="home-main">
                <suspense>
                  <router-view></router-view>
                </suspense>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>

import {ref, onBeforeMount, inject} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import meSideMenu from "@/components/meSideMenu";

export default {
  name: 'chatHome',
  components:{
    meSideMenu
  },
  setup() {

    const router = useRouter();
    const store = useStore();
    const GoEasy = inject('GoEasy');
    const goEasy = inject('goEasy');
    const currentUser = store.state.currentUser;

    let unreadAmount = ref(0);

    function connectGoEasy() {
      goEasy.connect({
        id: currentUser.uuid,
        data: {name: currentUser.name, avatar: currentUser.avatar},
        onSuccess: function () {  //连接成功
          console.log("GoEasy connect successfully.") //连接成功
        },
        onFailed: function (error) { //连接失败
          console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
        },
        onProgress: function (attempts) { //连接或自动重连中
          console.log("GoEasy is connecting", attempts);
        }
      });
    }

    function setUnreadNumber(content) {
      unreadAmount.value = content.unreadTotal;
      store.commit('setImUnreadTotal', content.unreadTotal)
    }

    function logout() {
      if (confirm('确认要退出登录吗？')) {
        goEasy.disconnect({
          onSuccess: () => {
            store.commit('updateCurrentUser', null);
            router.replace({path: './login'});
          },
          onFailed: (error) => {
            console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
          }
        });
      }
    }

    onBeforeMount(() => {
      if (goEasy.getConnectionStatus() === 'disconnected') {
        connectGoEasy();  //连接goeasy
      }
      goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, setUnreadNumber);
    })

    return {
      currentUser,
      unreadAmount,
      logout
    }

  },

}
</script>

<style scoped>

.bg{
  background-color: #F0F2F5;
}

.msg-xll-container{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}


.msg-xll-l-container {

}

.msg-xll-r-container {
  width: calc(100% - 160px);
  height: calc(100vh - 140px);
}

.msg-xll-r-bg-container {
  padding: 50px;
}


.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-container {
  width: 100%;
  height: calc(100vh - 340px);
  background: #FFFFFF;
  display: flex;
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 18px;
  overflow: hidden;
}

.home-menu {
  width: 80px;
  background-color: #F7F7F7;
  border-right: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-header {
  margin: 20px auto;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  cursor: pointer;
}

.user-avatar:hover + .user-profile {
  /*display: block;*/
  display: none;
}

.user-profile {
  display: none;
  color: #FFFFFF;
  position: absolute;
  top: 0;
  left: 70px;
  width: 250px;
  height: auto;
  background: #FFFFFF;
  z-index: 999;
}

.user-profile-main {
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  color: #303133;
  border-radius: 4px;
}

.user-profile-header {
  padding: 18px 20px;
  border-bottom: 1px solid #EBEEF5;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
}

.user-profile-header img {
  width: 45px;
  height: 45px;
}

.user-profile-info {
  display: flex;
  padding: 10px 20px;
  font-size: 14px;
  color: #666666;
  line-height: 28px;
}

.user-profile-info-title {
  width: 70px;
}

.menu-box {
  padding: 40px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.menu-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-item {
  color: #303133;
  cursor: pointer;
  box-sizing: border-box;
  height: 56px;
  position: relative;
}

.menu-unread {
  position: absolute;
  top: -15px;
  right: -18px;
  min-width: 22px;
  min-height: 22px;

  padding: 4px;

  text-align: center;
  border-radius: 50%;
  background-color: #d02129;
  color: #ffffff;
  font-size: 12px;
}

.router-link-active i {
  color: #d02129 !important;
}

.iconfont {
  padding: 15px;
  font-size: 28px;
  color: #606266;
  cursor: pointer;
}

.iconfont:active {
  color: #d02129;
}

.home-main {
  padding: 0;
  flex: 1;
}

@media screen and (max-width: 768px) {
  .home-container{
    height: 100%;
    border-radius: 0;
    box-shadow: none;
  }

  .msg-xll-r-container{
    width: 100%;
    height: calc( var(--i-window-height) - 160px);
  }

  .msg-xll-r-bg-container{
    height: 100%;
    padding: 0;

  }

  .home-menu{
    width: 60px;
  }

  .menu-header{
    margin: 10px auto;
  }

  .user-avatar{
    width: 30px;
    height: 30px;
  }

  .menu-box{
    padding: 15px 0;
  }
  .menu-item{
    height: 40px;
  }


}

</style>