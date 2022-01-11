<template>
  <div>
    <div class="chat-container">
      <div class="chat-icon-container" @click="showChatStatus=!showChatStatus">
        <el-icon :size="30"><chat-line-square /></el-icon>
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

              <div class="scroll-item" v-for="(conversation, key) in conversationsData" :key="key">
                <div class="item-head">
                  <el-image :src="conversation.data.avatar"  class="head-icon"/>
                  <div class="item-head_unread" v-if="conversation.unread">{{conversation.unread}}</div>
                </div>
                <div class="scroll-item_info">
                  <div class="item-info-top">
                    <span class="item-info-top_name">{{conversation.data.name}}</span>
                    <div class="item-info-top_time">{{formatDate(conversation.lastMessage.timestamp)}}</div>
                  </div>
                  <div class="item-info-bottom">
                    <div class="item-info-bottom-item" @click="navigateToChat(conversation)">
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
                      <div class="item-info-bottom_action" @click.stop="showAction(conversation)">
                        <el-icon><more-filled /></el-icon>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="no-conversation" v-else>
              当前没有会话
            </div>
            <div class="action-container" v-if="action.show">
              <div class="layer" @click="action.show = false"></div>
              <div class="action-box">
                <div class="action-item" @click="topConversation">{{action.conversation.top ? '取消置顶' : '置顶聊天'}}</div>
                <div class="action-item" @click="removeConversation">删除聊天</div>
              </div>
            </div>
            <div class="action-toast" v-if="action.showToast">
              {{action.toastMessage}}
            </div>
          </div>
          <div class="mask" v-show="showLoading">
            <!--              <img src="/static/images/pending.gif"/>-->
          </div>

        </div>

      </div>
      <div class="chat-chat-container" v-if="friend">
        <div class="chat-chat-header">
          <span class="chat-chat-title">{{friend.name}}</span>
        </div>
        <div class="chat-message-container">
          <div class="scroll-view" ref="scrollView">
            <div class="history-load-tip" @click="loadMoreHistoryMessage">
              {{allHistoryLoaded ? '已经没有更多的历史消息' : '点击获取历史消息'}}
            </div>
            <div v-for="(message, index) in messages" :key="index">
              <div class="time-lag"
                   v-if="index == 0 || (messages[index].timestamp - messages[index - 1].timestamp > 5 * 60 * 1000)">
                {{formatDate(message.timestamp)}}
              </div>
              <chat-message :message="message" :to="friend" :currentUser="currentUser" :type="type" @showImageFullScreen="showImageFullScreen"/>
            </div>
          </div>
        </div>
        <send-box :to="friend" :type="type" @onSent="scrollToBottom"/>

        <div class="img-layer" @click="image.show = false" v-show="image.show">
          <img :src="image.url">
        </div>
      </div>

    </div>

  </div>


</template>

<script>
import imgLogo from '@/assets/logo.png'
import {useStore} from 'vuex'
import {computed} from "vue";
import SendBox from "./chat-component/SendBox";
import ChatMessage from "./chat-component/ChatMessage";
// import {VISITOR_USER_INFO} from '@/api/api'

export default {
  name: "chat",
  setup(){
    const store = useStore()

    const currentUser = computed(()=>store.state.currentUser)
    return {
      currentUser
    }

  },
  components : {
    SendBox,
    ChatMessage
  },
  data(){
    return {
      imgLogo,
      showChatStatus:true,
      showLoading : false,
      action : {
        conversation : null,
        show : false,
        toastMessage : '',
        showToast : false
      },
      conversationsData:[],

      friendId: undefined ,
      chatType: '',

      friend : null,
      allHistoryLoaded : false,
      messages : [],

      image : {
        show : false,
        url : ''
      },
      type: ""
    }
  },
  beforeMount() {
    let self = this;
    this.showLoading = true;
    // let user = JSON.parse(localStorage.getItem("user"));
    let user = this.currentUser

    if(user){
      if (this.goEasy.getConnectionStatus() === 'disconnected') {
        this.service.connect(user);
      }
      //监听会话列表变化
      this.goEasy.im.on(this.GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, (conversations) => {
        this.conversationsData = conversations.conversations || [];
        this.unreadTotal = conversations.unreadTotal;
      });

      //加载会话列表
      this.goEasy.im.latestConversations({
        onSuccess: function (res) {
          // console.log(res.content)
          let content = res.content;
          self.showLoading = false;
          // self.$parent.$data.unreadTotal = content.unreadTotal;
          // self.$parent.$data.conversations = content.conversations;
          self.conversationsData = content.conversations;
        },
        onFailed: function (error) {
          this.showLoading = false;
          console.log("失败获取最新会话列表, code:" + error.code + " content:" + error.content);
        }
      });
      // this.initialPrivateListeners();
      //  pri
      // let friendId = 459;
      // // this.loadMoreHistoryMessage()
      // this.type = this.GoEasy.IM_SCENE.PRIVATE;
      // this.currentUser = this.service.currentUser;
      // this.friend = this.service.findFriendById(friendId);
      // this.messages = this.service.getPrivateMessages(friendId);
      // this.scrollToBottom();
      // this.initialPrivateListeners();
      // if(this.messages.length !== 0) {
      //   this.markMessageAsRead(friendId);
      // }
    }

  },
  unmounted() {
    // this.service.onNewPrivateMessageReceive = function(){};
  },
  methods:{
    topConversation() {
      let self = this;
      this.showLoading = true;
      let conversation = this.action.conversation;
      let failedDescription = conversation.top ? '取消置顶失败' : '置顶失败';
      if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
        this.goEasy.im.topPrivateConversation({
          userId: conversation.userId,
          top: !conversation.top,
          onSuccess: function () {
            self.showLoading = false;
          },
          onFailed: function (error) {
            self.showToast(failedDescription);
            console.log(error);
          }
        });
      }else{
        this.goEasy.im.topGroupConversation({
          groupId: conversation.groupId,
          top: !conversation.top,
          onSuccess: function () {
            self.showLoading = false;
          },
          onFailed: function (error) {
            self.showToast(failedDescription);
            console.log(error);
          }
        });
      }
      this.action.show = false;
    },
    removeConversation() {
      let self = this;
      this.showLoading = true;
      let conversation = this.action.conversation;
      let failedDescription = "删除失败";
      if(conversation.type === this.GoEasy.IM_SCENE.PRIVATE){
        this.goEasy.im.removePrivateConversation({
          userId: conversation.userId,
          onSuccess: function () {
            self.showLoading = false;
          },
          onFailed: function (error) {
            self.showToast(failedDescription);
            console.log(error);
          }
        });
      }else {
        this.goEasy.im.removeGroupConversation({
          groupId: conversation.groupId,
          onSuccess: function () {
            self.showLoading = false;
          },
          onFailed: function (error) {
            this.showToast(failedDescription);
            console.log(error);
          }
        });
      }
      this.action.show = false;
    },
    async navigateToChat(conversation) {
      let id = conversation.userId || conversation.groupId;
      // console.log(id)
      let identity = 1;
      this.friendId = id;
      this.chatType = conversation.type;
      // this.loadMoreHistoryMessage()

      this.type = this.GoEasy.IM_SCENE.PRIVATE;
      // this.currentUser = this.service.currentUser;
      // console.log(this.service.currentUser)

      this.friend = await this.service.findFriendById(id,identity);
      // console.log(this.friend)

      this.messages =await this.service.getPrivateMessages(id);

      this.scrollToBottom();

      this.initialPrivateListeners();
      if(this.messages.length !== 0) {
        this.markMessageAsRead(id);
      }

    },
    showToast (failedDescription) {
      this.showLoading = false;
      this.action.toastMessage = failedDescription;
      this.action.showToast = true;
      setTimeout(() => {
        this.action.showToast = false;
      },2000);
    },
    showAction (conversation) {
      this.action.conversation = conversation;
      this.action.show = true
    },

    initialPrivateListeners () {
      //传入监听器，收到一条私聊消息总是滚到到页面底部
      this.service.onNewPrivateMessageReceive =  (friendId,message)=> {
        console.log(message)
        if (friendId === this.friend.uuid) {
          this.markMessageAsRead(friendId);
          this.scrollToBottom()
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
      // console.log(self.friend)
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
          self.messages = localHistory;
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
    navigateBack() {//返回
      this.$router.go(-1);
    },
    showImageFullScreen (message) {
      this.image.url = message.payload.url;
      this.image.show = true;
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$refs.scrollView.scrollTo(0, this.$refs.scrollView.scrollHeight)
      })
    }
  }
}
</script>

<style scoped>

.chat-container{
  position: fixed;
  bottom: 140px;
  right: 0px;
  z-index: 1000;

}
.chat-icon-container{
  background-color: #FFFFFF;
  padding: 4px;
  border-radius: 10px;
  text-align: center;


  cursor: pointer;
  border: 1px solid #EEEEEE;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
}

.chat-content-container{
  position: fixed;
  bottom: 180px;
  right: 0px;
  z-index: 1000;

  background-color: #FFFFFF;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border: 1px solid #EEEEEE;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
}

.chat-side-container{
  border-right: 1px solid #EEEEEE;
  width: 30%;
  height: 100%;
  padding:0 10px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
}
.chat-side-t-container{
  height: 30%;
}

.chat-side-logo-container{
  padding-top: 10px;
}

.chat-side-logo{
  width: 60px;
  height: 60px;
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
  padding: 4px 0;
}

.conversations-box .scroll-item_info {
  width: 100%;

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
  cursor: pointer;
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
  z-index: 1000;
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
  width: 50px;
  height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;

}
.conversations-box .scroll-item .head-icon {
  width: 50px;
  height: 50px;
  border-radius: 50px;
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

.action-container{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.action-container .layer{
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(51, 51, 51, 0.5);
  width: 100%;
  height: 100%;
  z-index: 99;
}
.action-box{

  background: #ffffff;
  position: relative;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
}
.action-item{
  text-align: center;
  line-height: 60px;
  font-size: 17px;
  color: #262628;
  border-bottom: 1px solid #EFEFEF;

}
.action-toast{
  position: absolute;
  width: 200px;
  height: 50px;
  text-align: center;
  font-size: 15px;
  line-height: 50px;
  background: #9D9D9D;
  border-radius: 10px;
  top:50%;
  left: 50%;
  margin: 25px -10px;
  color: #262628;
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
  font-size: 18px;
  text-align: center;
  background: rgb(243, 244, 247);
  color: #000000;
  font-weight: bold;
  position: relative;
}

.chat-chat-title{
  font-size: 15px;
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