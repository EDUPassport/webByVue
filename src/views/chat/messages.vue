<template>
  <div class="bg">
    <div class="message-container">
      <div class="message-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <div class="message-r-container">

        <div class="message-r-bg-container">

          <div class="chat-content-container">

            <div class="chat-side-container">

              <div class="chat-side-t-container">
                <div class="chat-side-t-label">
                  Messages
                </div>
                <div class="chat-side-search">
                  <el-input placeholder="Search chats"></el-input>
                </div>
              </div>

              <div class="conversations">
                <el-scrollbar class="conversations-box">
                  <div v-if="conversationsData.length !==0">
                    <div class="scroll-item" v-for="(conversation, key) in conversationsData" :key="key"
                         :class="activeConversationKey === conversation.userId+'_'+conversation.data.identity ? 'conversation-active' : ''"
                    >
                      <div class="item-head">
                        <el-avatar :src="conversation.data.avatar" class="head-icon"/>
                        <div class="item-head_unread" v-if="conversation.unread">{{ conversation.unread }}</div>
                      </div>
                      <div class="scroll-item_info" @click="navigateToChat(conversation)">
                        <div class="item-info-top">
                        <span class="item-info-top_name">
                          {{ conversation.data.name }}
                        </span>
                          <!--                        <div class="item-info-top_time">{{formatDate(conversation.lastMessage.timestamp)}}</div>-->
                        </div>
                        <div class="item-info-bottom">
                          <div class="item-info-bottom-item">
                            <div class="item-info-top_content">
                        <span v-if="conversation.lastMessage.type == 'text'" class="text-conversation">
                          {{ conversation.lastMessage.payload.text }}
                        </span>
                              <span v-else-if="conversation.lastMessage.type == 'video'">[Video Message]</span>
                              <span v-else-if="conversation.lastMessage.type == 'audio'">[Audio Message]</span>
                              <span v-else-if="conversation.lastMessage.type == 'image'">[Image Message]</span>
                              <span v-else-if="conversation.lastMessage.type == 'file'">[File Message]</span>
                              <span v-else-if="conversation.lastMessage.type == 'order'">[Order Message]</span>
                              <span v-else>[Unidentified content]</span>
                            </div>
                            <div class="item-info-bottom_action">
                              <el-popover
                                  :visible="activeActionKey === key"
                                  placement="bottom"
                                  :width="150"
                              >
                                <template #reference>
                                  <el-icon @click="showAction(conversation,key)">
<!--                                    <more-filled/>--><ArrowDownBold />
                                  </el-icon>
                                </template>
                                <div class="item-info-bottom_action-btn" v-if="action.show">
                                  <div>
                                    <el-button link type="primary" @click="topConversation">
                                      {{ action.conversation.top ? 'UNPIN' : 'PIN CHAT TO THE TOP' }}
                                    </el-button>
                                  </div>
                                  <div class="item-info-bottom_delete_btn">
                                    <el-button link type="warning"  @click="removeConversation">
                                      DELETE CHATS
                                    </el-button>
                                  </div>
                                </div>
                              </el-popover>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="no-conversation" v-else>
                    No Chat Currently
                  </div>

                </el-scrollbar>
                <div class="mask" v-show="showLoading">

                </div>
              </div>

            </div>
            <div class="chat-chat-container" >
              <!--            <div class="chat-chat-header">-->
              <!--              <span class="chat-chat-title">{{ friend.name }}</span>-->
              <!--              <div class="chat-chat-close" @click="setShowChatStatus()">-->
              <!--                <el-icon :size="30" color="#808080">-->
              <!--                  <circle-close/>-->
              <!--                </el-icon>-->
              <!--              </div>-->
              <!--            </div>-->
              <div class="chat-message-container">
                <el-scrollbar class="scroll-view" ref="scrollView">
                  <div class="history-load-tip" @click="loadMoreHistoryMessage()">
                    {{ allHistoryLoaded ? 'History has no more messages' : 'Click to get history messages' }}
                  </div>
                  <div v-for="(message, index) in messages" :key="index">
                    <div class="time-lag"
                         v-if="index == 0 || (messages[index].timestamp - messages[index - 1].timestamp > 5 * 60 * 1000)">
                      {{ formatDate(message.timestamp) }}
                    </div>
                    <chat-message :message="message" :messageStatus="message.status"
                                  :to="friend"
                                  :currentUser="currentUser" :type="type"
                                  @showImageFullScreen="showImageFullScreen"/>
                  </div>
                </el-scrollbar>
              </div>
              <send-box :to="friend" :type="type" @onSent="messageOnSent"/>

              <div class="img-layer" @click="image.show = false" v-show="image.show">
                <el-image :src="image.url"></el-image>
              </div>
            </div>

<!--            <div class="chat-chat-container" v-else>-->
              <!--            <div class="chat-chat-header">-->
              <!--              <span class="chat-chat-title"></span>-->
              <!--              <div class="chat-chat-close" @click="setShowChatStatus()">-->
              <!--                <el-icon :size="30" color="#808080">-->
              <!--                  <circle-close/>-->
              <!--                </el-icon>-->
              <!--              </div>-->
              <!--            </div>-->
<!--            </div>-->

          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default/avatar.png'
import meSideMenu from "@/components/meSideMenu";
import {computed, ref} from "vue";
import imgLogo from '@/assets/logo.png'
import chatIcon from '@/assets/chat/chat-icon.png'
import chatIcon1 from '@/assets/chat/chat-icon-1.png'
import {useStore} from 'vuex'
import SendBox from "@/components/chat/chat-component/SendBox";
import ChatMessage from "@/components/chat/chat-component/ChatMessage";

export default {
  name: "index",
  components: {
    meSideMenu,
    SendBox,
    ChatMessage
  },
  setup() {

    const i = ref(localStorage.getItem('identity'))

    const identity1 = computed(() => {
      return i.value
    })

    const store = useStore()

    let token = localStorage.getItem('token')

    const currentUser = computed(() => store.state.currentUser)
    const nowChatUserInfo = computed(() => store.state.nowChatUserInfo)
    const showChatStatus = computed(() => store.state.showChatStatus)
    const setShowChatStatus = () => store.commit('showChatStatus', !store.state.showChatStatus)

    const messages = ref([])

    return {
      identity1,
      token,
      currentUser,
      nowChatUserInfo,
      showChatStatus,
      setShowChatStatus,
      messages
    }

  },
  watch: {

  },
  computed: {

  },
  data() {
    return {
      defaultAvatar,
      imgLogo,
      chatIcon,
      chatIcon1,
      showLoading: false,
      action: {
        conversation: null,
        show: false,
        toastMessage: '',
        showToast: false
      },

      conversationsData: [],
      activeConversationKey: undefined,

      friendId: undefined,
      chatType: '',

      friend: null,
      allHistoryLoaded: false,

      image: {
        show: false,
        url: ''
      },
      type: "",
      unreadTotal: 0,
      showBottomActionStatus: false,
      activeActionKey: undefined

    }
  },
  beforeMount() {

    let self = this;
    this.showLoading = true;

    let user = this.currentUser

    if (this.goEasy.getConnectionStatus() === 'disconnected') {
      this.service.connect(user);
    }

    //加载会话列表
    this.goEasy.im.latestConversations({
      onSuccess: function (res) {
        console.log('加载会话列表----------- messages page')
        let content = res.content;
        self.showLoading = false;
        // self.unreadTotal = content.unreadTotal;
        self.$store.commit('setImUnreadTotal',content.unreadTotal)
        self.conversationsData = content.conversations;
      },
      onFailed: function (error) {
        this.showLoading = false;
        console.log("失败获取最新会话列表, code:" + error.code + " content:" + error.content);
      }

    })

    //监听会话列表变化
    this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (conversations) => {
      console.log('监听会话列表变化-------  messages page')
      self.conversationsData = conversations.conversations || [];
      self.$store.commit('setImUnreadTotal',conversations.unreadTotal)
      // self.unreadTotal = conversations.unreadTotal;
      // console.log(this.conversationsData)
    });

    let nowChatUserInfo = self.nowChatUserInfo

    if (JSON.stringify(nowChatUserInfo) !== '{}') {
      console.log('now chat user info ----- ')
      this.type = this.GoEasy.IM_SCENE.PRIVATE;
      self.messages = self.service.getPrivateMessages(nowChatUserInfo.uuid);
      self.friend = nowChatUserInfo;
      self.activeConversationKey = nowChatUserInfo.uuid + '_' + nowChatUserInfo.identity
      self.scrollToBottom();
      self.initialPrivateListeners();
      if (self.messages.length !== 0) {
        self.markMessageAsRead(nowChatUserInfo.uuid);
      }

      // console.log(self.friend)
    }


  },
  unmounted() {
    this.service.onNewPrivateMessageReceive = function(){};
  },
  methods: {
    topConversation() {
      let self = this;
      let conversation = this.action.conversation;
      let failedDescription = conversation.top ? 'Cancel Failed' : 'Pin Failed';
      if (conversation.type === this.GoEasy.IM_SCENE.PRIVATE) {
        this.goEasy.im.topPrivateConversation({
          userId: conversation.userId,
          top: !conversation.top,
          onSuccess: function () {
            console.log('pin success')
          },
          onFailed: function (error) {
            self.$message.error(failedDescription)
            console.log(error);
          }
        });
      } else {
        this.goEasy.im.topGroupConversation({
          groupId: conversation.groupId,
          top: !conversation.top,
          onSuccess: function () {
            console.log('pin fail')
          },
          onFailed: function (error) {
            self.$message.error(failedDescription)
            console.log(error);
          }
        });
      }
      this.action.show = false;
      self.activeActionKey = undefined
    },
    removeConversation() {
      let self = this;
      let conversation = this.action.conversation;
      let failedDescription = "delete failed";
      if (conversation.type === this.GoEasy.IM_SCENE.PRIVATE) {
        this.goEasy.im.removePrivateConversation({
          userId: conversation.userId,
          onSuccess: function () {
            console.log('delete success')
          },
          onFailed: function (error) {
            self.$message.error(failedDescription)
            console.log(error);
          }
        });
      } else {
        this.goEasy.im.removeGroupConversation({
          groupId: conversation.groupId,
          onSuccess: function () {
            console.log('delete failed')
          },
          onFailed: function (error) {
            self.$message.error(failedDescription)
            console.log(error);
          }
        });
      }
      this.action.show = false;
      self.activeActionKey = undefined
    },
    async navigateToChat(conversation) {
      console.log('navigate to chat --------------------')
      this.activeConversationKey = conversation.userId + '_' + conversation.data.identity

      let id = conversation.userId || conversation.groupId;
      let identity = conversation.data.identity;
      let companyId = conversation.data.companyId;
      let friendId = id;

      this.type = this.GoEasy.IM_SCENE.PRIVATE;
      // this.currentUser = this.service.currentUser;

      this.friend = await this.service.findFriendById(friendId, identity, companyId);
      // this.friend = this.nowChatUserInfo;

      // 获取的是未读的短消息
      this.messages = this.service.getPrivateMessages(friendId);
      // this.loadMoreHistoryMessage()

      this.scrollToBottom();
      this.initialPrivateListeners();
      if (this.messages.length !== 0) {
        this.markMessageAsRead(friendId);
      }

    },
    showAction(conversation, key) {
      if (this.activeActionKey === key) {
        this.activeActionKey = undefined
      } else {
        this.activeActionKey = key
      }
      this.action.conversation = conversation;
      this.action.show = true
    },
    initialPrivateListeners() {
      let self = this

      //传入监听器，收到一条私聊消息总是滚到到页面底部
      this.service.onNewPrivateMessageReceive = (friendId, message) => {
        console.log('传入监听器，收到一条私聊消息总是滚到到页面底部' + message)
        let old = this.messages
        this.messages = []
        this.messages = old
        // this.messages.unshift(message)

        if (friendId === self.friend.uuid) {
          self.markMessageAsRead(friendId);
          self.scrollToBottom()
        }

      }

    },
    loadMoreHistoryMessage() {
      console.log('加载更多历史消息-----------------')
      let self = this;
      let lastMessageTimeStamp = Date.now();
      let lastMessage = this.messages[0];

      if (lastMessage) {
        lastMessageTimeStamp = lastMessage.timestamp;
      }

      let currentLength = this.messages.length;

      this.goEasy.im.history({
        userId: self.friend.uuid,
        lastTimestamp: lastMessageTimeStamp,
        onSuccess: function (result) {
          // console.log(result)
          //获取本地记录
          let localHistory = self.service.getPrivateMessages(self.friend.uuid);
          //添加加载的记录到本地记录尾部
          let messages = result.content;
          for (let i = messages.length - 1; i >= 0; i--) {
            localHistory.unshift(messages[i]);
          }
          if (localHistory.length === currentLength) {
            self.allHistoryLoaded = true;
          }
          // self.messages = {}
          self.messages = localHistory;

        },
        onFailed: function (error) {
          //获取失败
          if (error.code === 401) {
            console.log("获取历史消息失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
          } else {
            console.log("获取历史消息失败, code:" + error.code + ",错误信息:" + error.content);
          }
        }
      });
    },
    markMessageAsRead(friendId) {
      this.goEasy.im.markPrivateMessageAsRead({
        userId: friendId,
        onSuccess: function () {
          console.log('标记为已读成功')
        },
        onFailed: function (error) {
          console.log("标记为已读失败", error);
        }
      });
    },
    showImageFullScreen(message) {
      this.image.url = message.payload.url;
      this.image.show = true;
    },
    scrollToBottom() {
      // this.initialPrivateListeners()
      // this.loadMoreHistoryMessage()
      this.$nextTick(() => {
        this.$refs.scrollView.scrollTo(0, 10000000)
      })

    },
    messageOnSent(e){

      this.messages = [];
      this.messages = e;
      this.scrollToBottom()
      this.$forceUpdate()
    }


  }
}
</script>

<style scoped>
.bg {
  background-color: #F0F2F5;
}

.message-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.message-l-container {

}

.message-r-container {
  width:calc(100% - 160px);
  height: calc(100vh - 140px);
}

.message-r-bg-container{
  padding: 50px;
}


.chat-container {

}

.chat-icon-container {
  border: none;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.xll-chat-icon-container {
  height: 60px;
  width: 60px;
  border-radius: 60px;
  overflow: hidden;
}

.xll-chat-icon {
  width: 100%;
  height: 100%;
}

.xll-im-unread-total {
  position: absolute;
  right: 4px;
  top: 2px;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background-color: #f60441;
}

.chat-content-container {

  height: 840px;
  background-color: #FFFFFF;
  border-radius: 18px;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);

}

.chat-side-container {
  width: 450px;
  height: 100%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
}

.chat-side-t-container {
  height: 20%;
  padding: 0 50px;
}

.chat-side-t-label {
  color: #262626;
  font-size: 30px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  margin-top: 24px;
}

.chat-side-logo-container {
  padding-top: 10px;
  text-align: center;
}

.chat-side-logo {
  width: 60px;
  height: 60px;
}

.chat-side-search {
  margin-top: 50px;

}

.conversations {
  display: flex;
  flex-direction: column;
  height: 80%;
}

.conversations-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.conversations-box .scroll-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
}

.conversations-box .scroll-item_info {
  width: calc(100% - 90px);
  cursor: pointer;
  box-sizing: border-box;
  border-bottom: 1px solid #EFEFEF;
}

.conversations-box .scroll-item_info .item-info-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.conversations-box .item-info-top_name {
  /*width: 30%;*/
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 26px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
  font-weight: bold;
  white-space: nowrap;

}

.conversations-box .item-info-top_time {
  width: 70%;

  font-size: 12px;
  color: rgba(179, 179, 179, 0.8);
}

.conversations-box .item-info-bottom {
  overflow: hidden;
  padding: 10px 0;
}

.conversations-box .item-info-bottom-item {
  display: flex;
  justify-content: space-between;
}

.item-info-bottom .item-info-top_content {
  width: 60%;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #b3b3b3;
  display: flex;
}

.item-info-bottom .item-info-top_content span {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.item-info-bottom .item-info-bottom_unread {
  min-width: 20px;
  min-height: 20px;
  border-radius: 30px;
  font-size: 15px;
  text-align: center;

  background-color: #EE593C;
  color: #FFFFFF;
}

.no-conversation {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  color: #9D9D9D;
}

.conversations .mask {
  position: fixed;
  z-index: 900;
  top: 40%;
  left: 50%;
  margin: -15px -15px;
  width: 30px;
  height: 30px;
  overflow: hidden;

}

.conversations .mask img {
  width: 20px;
  height: 20px;
  display: block;
}

.item-head {
  position: relative;
  width: 70px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;

}

.conversations-box .scroll-item .head-icon {
  width: 70px;
  height: 70px;
  border-radius: 40px;
  border: 1px solid #EEEEEE;
}

.item-head .item-head_unread {
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

.conversations .item-info-bottom-item {
  display: flex;
  justify-content: space-between;
}

.item-info-bottom .item-info-bottom_action {
  width: 20%;

  flex-grow: 0;
  flex-shrink: 0;
  cursor: pointer;
}

.item-info-bottom_action-btn {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item-info-bottom_delete_btn {
  margin-top: 10px;
}

.conversations .text-conversation {

  display: block;
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}


.chat-chat-container {
  width: calc(100% - 450px);
  height: 100%;
  position: relative;
}


.chat-chat-header {
  width: 100%;
  height: 10%;

  background: rgb(243, 244, 247);
  border-top-right-radius: 10px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-chat-title {
  font-size: 16px;
  font-weight: bold;
}

.chat-chat-close {
  position: absolute;
  right: 10px;
  cursor: pointer;
}

.chat-message-container {
  overflow: hidden;
  width: 100%;
  height: calc(100% - 100px);
  background-color: #F0F2F5;
}

.chat-message-container .group-member {
  right: 10px;
  width: 30px;
  height: 30px;

  position: fixed;

  top: 60px;
  z-index: 2;
  border-radius: 30px;
  /*background:#C4C4C4 url("/images/group-icon.png") no-repeat center;*/
  background-size: 80%;
}

.history-load-tip {
  font-size: 12px;
  height: 45px;
  line-height: 45px;
  width: 100%;
  text-align: center;
  color: grey;
  flex-shrink: 0;
  flex-grow: 0;
  cursor: pointer;
}

.chat-message-container .scroll-view {
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
}

.chat-message-container .scroll-view .time-lag {
  font-size: 10px;
  text-align: center;
}

.chat-chat-container .img-layer {
  width: 100%;
  height: 100%;
  background: #262628;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-chat-container .img-layer img {
  max-width: 100%;
  max-height: 100%;
}

.conversation-active {
  background-color: #EEEEEE;
}

.xll-im-icon {
  font-size: 24px;
  color: #B1C452;
}

@media screen and (max-width: 768px) {

}

@media screen and (min-width: 769px) and (max-width: 992px) {


}

@media screen and (min-width: 993px) and (max-width: 1200px) {

}

@media screen and (min-width: 1200px) {

}

</style>
