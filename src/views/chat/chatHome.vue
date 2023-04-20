<template>
    <div class="home-container">
        <div class="home-main">
            <suspense>
                <router-view></router-view>
            </suspense>
        </div>
    </div>
</template>

<script>

import {ref, onBeforeMount, inject} from 'vue';
import {useStore} from 'vuex';

export default {
  name: 'chatHome',
  components:{

  },
  setup() {

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

    onBeforeMount(() => {
      if (goEasy.getConnectionStatus() === 'disconnected') {
        connectGoEasy();  //连接goeasy
      }
      goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, setUnreadNumber);
    })

    return {
      currentUser,
      unreadAmount
    }

  },

}
</script>

<style scoped>


.home-container {
  width: 100%;
  height: var(--i-window-height);
  background: #FFFFFF;
  display: flex;
  position: relative;

  overflow: hidden;
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
}

</style>