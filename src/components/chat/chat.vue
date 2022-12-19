<template>
  <div v-show="token">
    <div class="chat-container">
      <div class="chat-icon-container" @click="setShowChatStatus()">
        <div class="xll-chat-icon-container">
          <el-image class="xll-chat-icon" :src="chatIcon"></el-image>
        </div>
        <div class="xll-im-unread-total" v-if="unreadTotal>0"></div>
      </div>
    </div>
    <div class="chat-content-container" v-if="showChatStatus">
      <div class="chat-side-container">

        <div class="chat-side-t-container">
          <div class="chat-side-logo-container">
            <el-image class="chat-side-logo" :src="imgLogo"></el-image>
          </div>
          <div class="chat-side-search">
            <el-input  placeholder="Search"></el-input>
          </div>
        </div>

        <div class="conversations">
          <div class="conversations-box">
            <div v-if="conversationsData.length !==0">
              <div class="scroll-item" v-for="(conversation, key) in conversationsData" :key="key"
              :class="activeConversationKey === conversation.userId+'_'+conversation.data.identity ? 'conversation-active' : ''"
              >
                <div class="item-head">
                  <el-image :src="conversation.data.avatar"  class="head-icon"/>
                  <div class="item-head_unread" v-if="conversation.unread">{{conversation.unread}}</div>
                </div>
                <div class="scroll-item_info" @click="navigateToChat(conversation)">
                  <div class="item-info-top" >
                    <span class="item-info-top_name">{{conversation.data.name}}</span>
                    <div class="item-info-top_time">{{formatDate(conversation.lastMessage.timestamp)}}</div>
                  </div>
                  <div class="item-info-bottom">
                    <div class="item-info-bottom-item" >
                      <div class="item-info-top_content">
                        <span v-if="conversation.lastMessage.type == 'text'" class="text-conversation">
                          {{conversation.lastMessage.payload.text}}
                        </span>
                        <span v-else-if="conversation.lastMessage.type == 'video'">[Video Message]</span>
                        <span v-else-if="conversation.lastMessage.type == 'audio'">[Audio Message]</span>
                        <span v-else-if="conversation.lastMessage.type == 'image'">[Image Message]</span>
                        <span v-else-if="conversation.lastMessage.type == 'file'">[File Message]</span>
                        <span v-else-if="conversation.lastMessage.type == 'order'">[Order Message]</span>
                        <span v-else>[Unidentified content]</span>
                      </div>
                      <div class="item-info-bottom_action" >
                        <el-popover
                            :visible="activeActionKey === key"
                            placement="right"
                            :width="150"
                            trigger="click"
                        >
                          <template #reference>
                            <el-icon @click="showAction(conversation,key)"><more-filled /></el-icon>
                          </template>
                          <div class="item-info-bottom_action-btn" v-if="action.show">
                            <div>
                              <el-button type="primary" @click="topConversation">
                                {{action.conversation.top ? 'Unpin' : 'Pin chat to the top'}}
                              </el-button>
                            </div>
                            <div class="item-info-bottom_delete_btn">
                              <el-button type="warning" @click="removeConversation">
                                Delete Chat
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

          </div>
          <div class="mask" v-show="showLoading">

          </div>
        </div>

      </div>
      <div class="chat-chat-container" v-if="friend">
        <div class="chat-chat-header">
          <span class="chat-chat-title" >{{friend.name}}</span>
          <div class="chat-chat-close" @click="setShowChatStatus()">
            <el-icon :size="30" color="#808080"><circle-close /></el-icon>
          </div>
        </div>
        <div class="chat-message-container" >
          <div class="scroll-view" ref="scrollView">
            <div class="history-load-tip" @click="loadMoreHistoryMessage()">
              {{allHistoryLoaded ? 'History has no more messages' : 'Click to get history messages'}}
            </div>
            <div v-for="(message, index) in messages" :key="index">
              <div class="time-lag"
                   v-if="index == 0 || (messages[index].timestamp - messages[index - 1].timestamp > 5 * 60 * 1000)">
                {{formatDate(message.timestamp)}}
              </div>
              <chat-message :message="message" :messageStatus="message.status" :to="friend"
                            :currentUser="currentUser" :type="type"
                            @showImageFullScreen="showImageFullScreen"/>
            </div>
          </div>
        </div>
        <send-box :to="friend" :type="type" @onSent="scrollToBottom" @onSuccess="sendSuccess" />

        <div class="img-layer" @click="image.show = false" v-show="image.show">
          <el-image :src="image.url"></el-image>
        </div>
      </div>
      <div class="chat-chat-container" v-else>
        <div class="chat-chat-header">
          <span class="chat-chat-title" ></span>
          <div class="chat-chat-close" @click="setShowChatStatus()">
            <el-icon :size="30" color="#808080"><circle-close /></el-icon>
          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import imgLogo from '@/assets/logo.png'
import chatIcon from '@/assets/chat/chat-icon.png'
import chatIcon1 from '@/assets/chat/chat-icon-1.png'
import {useStore} from 'vuex'
import {computed} from "vue";
import SendBox from "./chat-component/SendBox";
import ChatMessage from "./chat-component/ChatMessage";

export default {
  name: "chat",
  setup(){
    const store = useStore()

    let token = localStorage.getItem('token')

    const currentUser = computed(()=>store.state.currentUser)
    const nowChatUserInfo = computed(()=>store.state.nowChatUserInfo)
    const showChatStatus = computed(()=>store.state.showChatStatus)
    const setShowChatStatus = () => store.commit('showChatStatus',!store.state.showChatStatus)

    return {
      token,
      currentUser,
      nowChatUserInfo,
      showChatStatus,
      setShowChatStatus
    }

  },
  components : {
    SendBox,
    ChatMessage
  },
  data(){
    return {
      imgLogo,
      chatIcon,
      chatIcon1,
      showLoading : false,
      action : {
        conversation : null,
        show : false,
        toastMessage : '',
        showToast : false
      },

      conversationsData:[],
      activeConversationKey:undefined,

      friendId: undefined ,
      chatType: '',

      friend : null,
      allHistoryLoaded : false,
      messages : [],

      image : {
        show : false,
        url : ''
      },
      type: "",
      unreadTotal:0,
      showBottomActionStatus:false,
      activeActionKey:undefined

    }
  },
  beforeMount() {
    let self = this;
    this.showLoading = true;

    let user = this.currentUser

    this.type = this.GoEasy.IM_SCENE.PRIVATE;

    if(user){
      if (this.goEasy.getConnectionStatus() === 'disconnected') {
        this.service.connect(user);
      }
      //监听会话列表变化
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (conversations) => {
        let nowChatUserInfo = self.nowChatUserInfo

        if(JSON.stringify(nowChatUserInfo) !== '{}'){
          self.messages = self.service.getPrivateMessages(nowChatUserInfo.uuid);
          self.friend = nowChatUserInfo;
          self.activeConversationKey = nowChatUserInfo.uuid
          self.scrollToBottom();
          self.initialPrivateListeners();
          if(self.messages.length !== 0) {
            self.markMessageAsRead(nowChatUserInfo.uuid);
          }
        }

        self.conversationsData = conversations.conversations || [];
        self.unreadTotal = conversations.unreadTotal;
        // console.log(self.conversationsData)
      });

      //加载会话列表
      this.goEasy.im.latestConversations({
        onSuccess: function (res) {
          let content = res.content;

          self.conversationsData = content.conversations;
          self.unreadTotal = content.unreadTotal
        },
        onFailed: function (error) {
          console.log("失败获取最新会话列表, code:" + error.code + " content:" + error.content);
        }
      });
      this.initialPrivateListeners()

    }

  },
  unmounted() {
    this.service.onNewPrivateMessageReceive = function(){};
  },
  methods:{
    topConversation() {
      let self = this;
      let conversation = this.action.conversation;
      let failedDescription = conversation.top ? 'Cancel Failed' : 'Pin Failed';
      if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
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
      }else{
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
      if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
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
      }else {
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
      let id = conversation.userId || conversation.groupId;
      this.activeConversationKey = conversation.userId +'_'+ conversation.data.identity

      let identity = conversation.data.identity;
      let companyId = conversation.data.companyId;
      // console.log(identity)

      this.friendId = id;
      this.chatType = conversation.type;

      this.friend = await this.service.findFriendById(id,identity,companyId);

      this.messages =await this.service.getPrivateMessages(id);
      // console.log(this.messages)
      // this.loadMoreHistoryMessage()

      this.scrollToBottom();

      this.initialPrivateListeners();

      if(this.messages.length !== 0) {
        this.markMessageAsRead(id);
      }

    },
    showAction (conversation, key) {
      if(this.activeActionKey === key){
        this.activeActionKey = undefined
      }else{
        this.activeActionKey = key
      }
      this.action.conversation = conversation;
      this.action.show = true
    },
    initialPrivateListeners () {
      let self = this
      //传入监听器，收到一条私聊消息总是滚到到页面底部
      this.service.onNewPrivateMessageReceive =  (friendId,message)=> {
        console.log('传入监听器，收到一条私聊消息总是滚到到页面底部')
        console.log(message)
        if (friendId === this.friend.uuid) {
          this.markMessageAsRead(friendId);
          setTimeout(function () {
            self.scrollToBottom()
          },1000)
        }
      };
    },
    loadMoreHistoryMessage () {
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
          self.messages = {}
          self.messages = localHistory;
          // console.log(self.messages)
        },
        onFailed: function (error) {
          //获取失败
          if(error.code === 401){
            console.log("获取历史消息失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
          }else{
            console.log("获取历史消息失败, code:" + error.code + ",错误信息:" + error.content);
          }
        }
      });
    },
    markMessageAsRead (friendId) {
      this.goEasy.im.markPrivateMessageAsRead({
        userId: friendId,
        onSuccess: function () {
          console.log('标记为已读成功')
        },
        onFailed: function (error) {
          console.log("标记为已读失败",error);
        }
      });
    },
    showImageFullScreen (message) {
      this.image.url = message.payload.url;
      this.image.show = true;
    },
    scrollToBottom () {
      this.$nextTick(() => {
        let height = this.$refs.scrollView.scrollHeight
        // console.log(height)
        this.$refs.scrollView.scrollTo(0, height)
      })
    },
    async sendSuccess(e){
      console.log(e)
      // await this.friend = await this.service.findFriendById(e,identity);
     await this.$nextTick(()=>{
        this.messages =  this.service.getPrivateMessages(e);
      })

    }
  }
}
</script>

<style scoped>

.chat-container{
  position: fixed;
  bottom: 110px;
  right: 30px;
  z-index: 990;

}

.chat-icon-container{
  border:none;
  position: relative;
  cursor: pointer;
  display:flex;
  align-items:center;
  justify-content: center;
}

.xll-chat-icon-container{
  height: 60px;
  width: 60px;
  border-radius: 60px;
  overflow: hidden;
}

.xll-chat-icon{
  width:100%;
  height: 100%;
}

.xll-im-unread-total{
  position: absolute;
  right: 4px;
  top: 2px;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  background-color: #f60441;
}

.chat-content-container{
  position: fixed;
  bottom: 165px;
  right: 30px;
  z-index: 990;

  background-color: #FFFFFF;

  border-radius:10px;
  border: 1px solid #EEEEEE;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
}

.chat-side-container{
  width: 30%;
  height: 100%;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
}

.chat-side-t-container{
  height: 30%;
}

.chat-side-logo-container{
  padding-top: 10px;
  text-align: center;
}

.chat-side-logo{
  width: 60px;
  height: 60px;
}
.chat-side-search{
  padding: 0 10px;
}
.conversations {
  display: flex;
  flex-direction: column;
  height:70%;
}

.conversations-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.conversations-box:hover{
  overflow-y: scroll;
}

.conversations-box .scroll-item {
  display: flex;
  align-items: center;
  padding: 4px ;
}

.conversations-box .scroll-item_info {
  width: 70%;
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
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #262628;
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
.item-info-bottom .item-info-top_content span{
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
  top:40%;
  left: 50%;
  margin:-15px -15px;
  width: 30px;
  height: 30px;
  overflow: hidden;

}

.conversations .mask img {
  width: 20px;
  height: 20px;
  display: block;
}

.item-head{
  position: relative;
  width: 30%;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;

}
.conversations-box .scroll-item .head-icon {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid #EEEEEE;
}

.item-head .item-head_unread{
  padding:2px 5px;
  background-color: #EE593C;
  color: #FFFFFF;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  border-radius: 10px;
  position: absolute;
  top:0;
  right: 0;
}

.conversations .item-info-bottom-item{
  display: flex;
  justify-content: space-between;
}
.item-info-bottom .item-info-bottom_action{
  width: 20%;
  /*width:25px;*/
  /*height: 25px;*/
  flex-grow: 0;
  flex-shrink: 0;
  cursor: pointer;
}
.item-info-bottom_action-btn{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item-info-bottom_delete_btn{
  margin-top: 10px;
}

.conversations .text-conversation{
  /*width: 15px;*/
  display: block;
  overflow: hidden;
  flex-shrink: 0;
  flex-grow: 0;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 14px;
}


.chat-chat-container{
  height: 100%;
  width:70%;
}
.chat-chat-header{
  width: 100%;
  height: 10%;

  background: rgb(243, 244, 247);
  border-top-right-radius: 10px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-chat-title{
  font-size: 16px;
  font-weight: bold;
}

.chat-chat-close{
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.chat-message-container{
  overflow: hidden;
  width: 100%;
  height: 60%;
}

.chat-message-container .group-member{
  right: 10px;
  width: 30px;
  height: 30px;

  position: fixed;

  top:60px;
  z-index: 2;
  border-radius: 30px;
  /*background:#C4C4C4 url("/images/group-icon.png") no-repeat center;*/
  background-size: 80%;
}
.history-load-tip{
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
.chat-message-container .scroll-view{
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.chat-message-container .scroll-view .time-lag{
  font-size: 10px;
  text-align: center;
}
.chat-chat-container .img-layer{
  width: 100%;
  height: 100%;
  background: #262628;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chat-chat-container .img-layer img{
  max-width: 100%;
  max-height: 100%;
}

.conversation-active{
  background-color: #EEEEEE;
}
.xll-im-icon{
  font-size: 24px;
  color: #B1C452;
}

@media screen and (max-width: 768px) {
  .chat-content-container{
    width: 80%;
    height: 50%;
  }
}

@media screen and (min-width: 769px) and (max-width: 992px) {
  .chat-content-container{
    width: 80%;
    height: 50%;
  }

}

@media screen and (min-width: 993px) and (max-width: 1200px) {
  .chat-content-container{
    width: 60%;
    height: 50%;
  }
}

@media screen and (min-width: 1200px) {
  .chat-content-container{
    width: 50%;
    height: 50%;
  }
}

*::-webkit-scrollbar{
     width: 4px;
   }


*::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}

* {
     scrollbar-width: 10px;
     scrollbar-base-color: green;
     scrollbar-track-color: red;
     scrollbar-arrow-color: blue;
}



</style>
