<template>
  <div class="conversations">
    <div class="conversation-list">
      <div class="conversation-list-container">
        <div class="conversation-list-top">
          <div class="conversation-list-top-label">Messages</div>
          <div class="conversation-list-top-search">

            <el-select
                v-model="chatSearchValue"
                filterable
                clearable
                remote
                reserve-keyword
                :remote-method="chatSearchRemoteMethod"
                :loading="chatSearchLoading"
                placeholder="Search chats"
                @change="chatLocationChange"
            >
              <el-option
                  v-for="conversation in chatSearchConversationData"
                  :key="conversation.userId"
                  :label="conversation.data.name"
                  :value="conversation"
              />
            </el-select>

          </div>
        </div>

        <div class="conversation-list-content">
          <div v-if="conversations.length">
            <router-link replace
              v-for="(conversation, key) in conversations" :key="key"
              :to="chatLocation(conversation)"
            >
              <div class="conversation" @contextmenu.prevent.stop="e => showRightClickMenu(e,conversation)">
                <div class="avatar">
                  <el-avatar class="avatar-img" :src="conversation.data.avatar"/>
                  <div v-if="conversation.unread>0"
                       class="unread-count">
                    <span class="unread">{{ conversation.unread }}</span>
                  </div>
                </div>
                <div class="conversation-message">
                  <div class="conversation-top">
                    <span class="conversation-name">{{ conversation.data.name }}</span>
                    <div class="conversation-time">
                      <div>{{ formatDate(conversation.lastMessage.timestamp) }}</div>
                    </div>
                  </div>
                  <div class="conversation-bottom">
                    <div class="conversation-content" v-if="conversation.lastMessage.recalled">
                      <div v-if="conversation.type === 'private'">
                        {{ conversation.lastMessage.senderId === currentUser.id ? 'you' : `"${conversation.data.name}"` }} retracted a message
                      </div>
                      <div v-if="conversation.type === 'group'">
                        {{ conversation.lastMessage.senderId === currentUser.id ? 'you' : `"${conversation.lastMessage.senderData.name}"` }} retracted a message
                      </div>
                    </div>
                    <div class="conversation-content" v-else>
                      <div class="unread-text"
                           v-if="conversation.lastMessage.read === false && conversation.lastMessage.senderId === currentUser.id">
                        [unread]
                      </div>
                      <div v-if="conversation.type === 'private'">
                        {{ conversation.lastMessage.senderId === currentUser.id ? 'me' : conversation.data.name }}:
                      </div>
                      <div v-else>
                        {{ conversation.lastMessage.senderId === currentUser.id ? 'me' : conversation.lastMessage.senderData.name }}:
                      </div>
                      <span class="text" v-if="conversation.lastMessage.type === 'text'">{{conversation.lastMessage.payload.text}}</span>
                      <span v-else-if="conversation.lastMessage.type === 'video'">[Video messages]</span>
                      <span v-else-if="conversation.lastMessage.type === 'audio'">[Voice messages]</span>
                      <span v-else-if="conversation.lastMessage.type === 'image'">[Image messages]</span>
                      <span v-else-if="conversation.lastMessage.type === 'file'">[File messages]</span>
                      <span v-else-if="conversation.lastMessage.type === 'order'">[Order messages]</span>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div v-else class="no-conversation">- No Chat Currently -</div>
        </div>
      </div>
      <div v-if="rightClickMenu.visible" :style="{'left': rightClickMenu.x + 'px', 'top': rightClickMenu.y + 'px'}"
           class="action-box">
        <div class="action-item" @click="topConversation">{{ rightClickMenu.conversation.top ? 'UNPIN' : 'PIN CHAT TO THE TOP' }}</div>
        <div class="action-item" @click="deleteConversation">DELETE CHATS</div>
      </div>
    </div>
    <div class="chat">
      <router-view :key="$route.params.id"/>
    </div>
  </div>
</template>

<script>

import {ref, reactive, onMounted, onBeforeUnmount, inject} from 'vue';
import { useStore } from 'vuex'
// import restApi from "@/api/restapi.js";
import {encode} from 'js-base64'
import {useRouter} from 'vue-router'

export default {
  name:'chatConversations',
  setup(){
    const store = useStore();
    const router = useRouter();
    const GoEasy = inject('GoEasy');
    const goEasy = inject('goEasy');
    const currentUser = store.state.currentUser;

    let conversations = ref([]);
    let rightClickMenu = reactive({
      conversation: null,
      visible: false,
      x: null,
      y: null,
    });

    let chatSearchValue = ref('')
    let chatSearchLoading = ref(false)
    let chatSearchConversationData = ref([])

    function chatSearchRemoteMethod(query){
      if(query){
        chatSearchLoading.value = true;
        setTimeout(()=>{
          chatSearchLoading.value = false
          chatSearchConversationData.value = conversations.value.filter(item=>{
            return item.data.name.toLowerCase().includes(query.toLowerCase())
          })
        }, 200)
      }

    }

    function loadConversations() {
      goEasy.im.latestConversations({
        onSuccess: (result) => {
          console.log(result)

          let content = result.content;
          renderConversations(content);
        },
        onFailed: (error) => {
          console.log('获取最新会话列表失败, code:' + error.code + 'content:' + error.content);
        },
      });
    }

    function listenConversationUpdate() {
      // 监听会话列表变化
      goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, renderConversations);
    }

    function renderConversations(content) {
      conversations.value = content.conversations;
    }

    // function subscribeGroup() {
    //   let groups = restApi.findGroups(currentUser);
    //   let groupIds = groups.map((item) => item.id);
    //   goEasy.im.subscribeGroup({
    //     groupIds: groupIds,
    //     onSuccess: function () {
    //       console.log('订阅群消息成功');
    //     },
    //     onFailed: function (error) {
    //       console.log('订阅群消息失败:', error);
    //     },
    //   });
    // }

    function showRightClickMenu(e, conversation) {
      rightClickMenu.conversation = conversation;
      rightClickMenu.visible = true;
      rightClickMenu.x = e.pageX;
      rightClickMenu.y = e.pageY;
    }

    function hideRightClickMenu() {
      rightClickMenu.visible = false;
    }

    function topConversation() {
      let conversation = rightClickMenu.conversation;
      let description = conversation.top ? 'UNPIN' : 'PIN';
      goEasy.im.topConversation({
        conversation: conversation,
        top: !conversation.top,
        onSuccess: function () {
          console.log(description, '成功');
        },
        onFailed: function (error) {
          console.log(description, '失败：', error);
        },
      });
    }

    function deleteConversation() {
      if (confirm('Are you sure you want to delete this conversation？')) {
        let conversation = rightClickMenu.conversation;
        goEasy.im.removeConversation({
          conversation: conversation,
          onSuccess: function () {
            console.log('删除会话成功');
          },
          onFailed: function (error) {
            console.log(error);
          },
        });
      }
    }

    function chatLocationChange (conversation) {

      if(conversation){
        let uuid = conversation.userId;
        let uuidArr = uuid.split('#')

        let path = conversation.type === 'private' ?
            '/chat/messages/privatechat/' + uuidArr[0] :
            '/chat/messages/groupchat/'+conversation.groupId

        let obj = {
          uuid: conversation.userId,
          name: conversation.data.name,
          avatar: conversation.data.avatar
        }

        router.push({
          path: path,
          query: {
            str: encodeURI(encode(JSON.stringify(obj)))
          }
        })
      }

    }

    function chatLocation (conversation) {
      console.log(conversation)
      let uuid = conversation.userId;
      let uuidArr = uuid.split('#')

      let path = conversation.type === 'private' ?
          '/chat/messages/privatechat/' + uuidArr[0] :
          '/chat/messages/groupchat/'+conversation.groupId

      let obj = {
        uuid: conversation.userId,
        name: conversation.data.name,
        avatar: conversation.data.avatar
      }

      return {
        path: path,
        query: {
          str: encodeURI(encode(JSON.stringify(obj)))
        }
      }
    }

    onMounted(() => {
      //隐藏Conversation右键菜单
      document.addEventListener('click', () => {
        hideRightClickMenu();
      });

      listenConversationUpdate(); //监听会话列表变化
      loadConversations(); //加载会话列表
      // subscribeGroup();  //订阅群消息
    })

    onBeforeUnmount(() => {
      goEasy.im.off(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, renderConversations);
    })

    return {
      currentUser,
      conversations,
      rightClickMenu,
      chatSearchValue,
      chatSearchLoading,
      chatSearchConversationData,
      chatSearchRemoteMethod,
      showRightClickMenu,
      topConversation,
      deleteConversation,
      chatLocation,
      chatLocationChange
    }

  }
}
</script>


<style scoped>
  .conversations {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    color: #333333;
  }

  .conversation-list {
    width: 420px;
  }

  .conversation-list-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-right: #dbd6d6 1px solid;
  }

  .conversation-list-top{
    padding: 25px 25px 0 25px;
  }

  .conversation-list-top /deep/ .el-select{
    display: block;
  }

  .conversation-list-top-label{
    color: #262626;
    font-size: 24px;
    font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  }

  .conversation-list-top-search{
    margin-top: 25px;
  }

  .conversation-list-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .conversation-list-content::-webkit-scrollbar {
    display: none;
  }

  .conversation-list-content a{
    text-decoration: none;

  }

  .no-conversation {
    text-align: center;
    color: #666666;
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  .conversation {
    display: flex;
    padding: 12px 6px;
    cursor: pointer;
  }

  .unread-count {
    position: absolute;
    top: -8px;
    left: 40px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    color: white;
    background: #d02129;
  }

  .unread-count .unread {
    display: block;
    font-size: 12px;
    text-align: center;
    line-height: 18px;
  }

  .conversation-message {
    flex: 1;
    padding-left: 5px;
    display: flex;
    width: 250px;
    flex-direction: column;
    justify-content: space-around;
  }

  .conversation-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: right;
  }

  .conversation-name {
    font-size: 24px;
    font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    white-space: nowrap;
    color: #262626;
  }

  .conversation-time {
    color: #B9B9B9;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    width: 200px;
  }

  .conversation-bottom {
    display: flex;
    color: #666666;
  }

  .conversation-content {
    display: flex;
    width: 300px;
    font-size: 14px;
    color: #b3b3b3;
    font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  }

  .conversation-content .text {
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    white-space: nowrap;
    word-break: break-all;
  }

  .conversation-bottom .unread-text {
    color: #d02129;
    width: 35px !important;
  }

  .conversation .avatar {
    width: 50px;
    height: 50px;
    position: relative;

  }

  .conversation .avatar-img {
    width: 100%;
    height: 100%;
    border: 1px solid #F0F2F5;
  }

  .router-link-active .conversation {
    background: #eeeeee;
  }

  .action-box {
    width: 200px;
    height: 100px;
    background: #ffffff;
    border: 1px solid #cccccc;
    position: fixed;
    z-index: 100;
    border-radius: 5px;
  }

  .action-box .action-item {
    padding-left: 15px;
    line-height: 50px;
    font-size: 14px;
    color: #262628;
    cursor: pointer;
    font-family: "Cabin SemiBold", Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  .action-box .action-item:hover {
    background: #dddddd;
  }

  .chat {
    flex: 1;
    display: flex;
  }

  @media screen and (max-width: 768px) {

    .conversation-list{
      width: 100%;
    }
    .conversation-list-container{
      border-right: none;
    }

    .conversation-list-top{
      padding: 15px 15px 0 15px;
    }

    .conversation-list-top-label{
      font-size: 18px;
    }
    .conversation-list-top-search{
      margin-top: 15px;
    }

    .conversation-list-content{
      padding: 15px 0;
    }

    .conversation{
      padding: 10px;
      border-bottom: 1px solid #eeeff3;
    }

    .conversation .avatar{
      width: 30px;
      height: 30px;
    }

    .conversation-name{
      font-size: 14px;
    }

    .conversation-time{
      font-size: 12px;
    }

    .conversation-content{
      font-size: 12px;
    }

  }

</style>
