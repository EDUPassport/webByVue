<template>
  <template v-if="btnStyle === 'link' ">
    <el-button link
               style="color: #6650B3;"
               type="primary"
               @click="chat()"
               :disabled="targetUser.user_id + '#' + identity + '#' + targetUser.id == currentUser.uuid"
    >
      {{ text }}
    </el-button>
  </template>
  <template v-else-if="btnStyle === 'primary' ">
    <el-button
        round
        type="primary"
        @click="chat()"
        :disabled="targetUser.user_id + '#' + identity + '#' + targetUser.id == currentUser.uuid"
    >
      {{ text }}
    </el-button>
  </template>
  <template v-else>
    <el-button link
               type="primary"
               @click="chat()"
               :disabled="targetUser.user_id + '#' + identity + '#' + targetUser.id == currentUser.uuid"
    >
      {{ text }}
    </el-button>
  </template>
</template>

<script>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
// import {encode} from 'js-base64'
import {useRouter} from 'vue-router'

export default {
  name: "chatComponent",
  props: ['text', 'targetUser', 'identity', 'btnStyle'],
  setup() {

    let thumbsSwiper = ref(null);

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    }

    const store = useStore()
    const router = useRouter()

    const setNowChatUserInfo = (data) => store.commit('nowChatUserInfo', data)

    const setShowChatStatus = () => store.commit('showChatStatus', true)

    function turnChatPage() {
      router.push({path: '/chat/messages'})
    }

    const currentUser = computed(() => store.state.currentUser)

    return {
      thumbsSwiper,
      setThumbsSwiper,
      setNowChatUserInfo,
      setShowChatStatus,
      currentUser,
      turnChatPage
    }


  },
  data() {
    return {

    }
  },
  methods: {
    chat() {

      let self = this;
      let targetUser = this.targetUser;
      let user = this.currentUser
      let identity = this.identity;
      let uuid = targetUser.user_id + '#' + this.identity + '#' + targetUser.id

      if (uuid == targetUser.user_id) {
        return false;
      }

      if (this.goEasy.getConnectionStatus() === 'disconnected') {
        this.service.connect(user);
      }

      let token = localStorage.getItem('token')
      if (!token || token === '') {
        return this.$router.push('/login')
      }

      let type = this.GoEasy.IM_SCENE.PRIVATE;
      let name = '';
      let avatar = '';

      if(identity == 1){
        name = targetUser.name;
        avatar = targetUser.profile_photo ? targetUser.profile_photo : 'https://oss.esl-passport.cn/educator.png';
      }

      if(identity == 2 || identity == 3 || identity == 4 || identity == 5 ){
        name = targetUser.display_name;
        avatar = targetUser.logo ? targetUser.logo : 'https://oss.esl-passport.cn/educator.png';
      }

      let nowUserInfo = {
        uuid: uuid,
        uid: targetUser.user_id,
        name: name,
        avatar: avatar,
        identity: identity,
        companyId: targetUser.id
      }

      let textMessage = this.goEasy.im.createTextMessage({
        text: 'Hello',
        to: {
          id: uuid,
          type: type,
          data: {
            uid:targetUser.user_id,
            name: name,
            avatar: avatar,
            identity: identity,
            companyId: targetUser.id
          }
        }
      });

      let localHistory = [];
      if (type === this.GoEasy.IM_SCENE.PRIVATE) {
        localHistory = this.service.getPrivateMessages(uuid);
      } else {
        localHistory = this.service.getGroupMessages(uuid);
      }
      // console.log(localHistory)
      localHistory.push(textMessage)

      this.goEasy.im.sendMessage({
        message: textMessage,
        onSuccess: function (message) {
          console.log("发送成功.", message);
          self.setNowChatUserInfo(nowUserInfo)
          // self.turnChatPage()
          self.$emit('onSuccess')
        },
        onFailed: function (error) {
          console.log("发送失败:", error);
        }
      })

    }

  }

}
</script>

<style scoped>

</style>