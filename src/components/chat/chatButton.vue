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
import {ref, inject, onBeforeMount} from 'vue'
import {useStore} from 'vuex'
// import {encode} from 'js-base64'
import {useRouter} from 'vue-router'
import {encode } from 'js-base64'
import {ADD_CHAT_TO_DATABASE} from "@/api/api";

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

    const currentUser = store.state.currentUser

    const GoEasy = inject('GoEasy');
    const goEasy = inject('goEasy');
    let unreadAmount = ref(0);

    function connectGoEasy() {
      goEasy.connect({
        id: currentUser.uuid,
        data: {name: currentUser.name, avatar: currentUser.avatar,companyId: currentUser.companyId, identity: currentUser.identity, uid:currentUser.uid},
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
    }

    let token = localStorage.getItem('token')

    onBeforeMount(() => {

      if(token){
        if (goEasy.getConnectionStatus() === 'disconnected') {
          connectGoEasy();  //连接goeasy
        }
        goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, setUnreadNumber);
      }

    })

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

      let targetUser = this.targetUser;

      let identity = this.identity;
      let uuid = targetUser.user_id + '#' + this.identity + '#' + targetUser.id

      if (uuid == targetUser.user_id) {
        return false;
      }

      let token = localStorage.getItem('token')
      if (!token || token === '') {
        return this.$router.push('/login')
      }

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

      let obj = {
        uuid: uuid,
        name: name,
        avatar: avatar
      }

      let str = encodeURI(encode(JSON.stringify(obj)));

      let path = '/chat/messages/privatechat/' + targetUser.user_id
      this.addChatToDatabase(targetUser.user_id, this.identity, targetUser.id)

      this.$router.push({ path: path , query:{str: str  } } )

    },
    addChatToDatabase(userId, identity, companyId){
      let params = {
        to_user_id: userId,
        to_identity: identity,
        to_company_id: companyId
      }

      ADD_CHAT_TO_DATABASE(params).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })

    }

  }

}
</script>

<style scoped>

</style>