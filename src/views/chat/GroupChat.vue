<template>
  <div class="chat-container">
    <div class="chat-title">
      <img :src="group.avatar" class="chat-avatar"/>
      <div class="chat-name">{{ group.name }}</div>
    </div>
    <div class="chat-main" ref="scrollView">
      <div class="message-list" ref="messageList">
        <div v-if="history.loading" class="history-loading">
          <img src="../../assets/images/pending.gif"/>
        </div>
        <div v-else :class="history.allLoaded ? 'history-loaded':'load'" @click="loadHistoryMessage(false)">
          {{ history.allLoaded ? '已经没有更多的历史消息' : '获取历史消息' }}
        </div>
        <div v-for="(message, index) in history.messages" :key="index">
          <div class="time-tips">{{ renderMessageDate(message, index) }}</div>
          <div class="message-recalled" v-if="message.recalled">
            <div v-if="message.senderId !== currentUser.id">{{ message.senderData.name }}撤回了一条消息</div>
            <div v-else class="message-recalled-self">
              <div>你撤回了一条消息</div>
              <span v-if="message.type === 'text' && Date.now()-message.timestamp< 60 * 1000 "
                    @click="editRecalledMessage(message.payload.text)">重新编辑</span>
            </div>
          </div>
          <div class="message-item" v-else>
            <div class="message-item-checkbox" v-if="messageSelector.visible && message.status !== 'sending'">
              <input class="input-checkbox" type="checkbox" :value="message.messageId" v-model="messageSelector.ids"
                     @click="selectMessages">
            </div>
            <div class="message-item-content" :class="{ self: message.senderId === currentUser.id }">
              <div class="sender-info">
                <img v-if="currentUser.id === message.senderId" :src="currentUser.avatar" class="sender-avatar"/>
                <img v-else :src="message.senderData.avatar" class="sender-avatar"/>
              </div>
              <div class="message-content" @click.right="showActionPopup(message)">
                <div class="message-payload">
                  <div class="pending" v-if="message.status === 'sending'"></div>
                  <div class="send-fail" v-if="message.status === 'fail'"></div>
                  <div v-if="message.type === 'text'" class="content-text"
                       v-html="emoji.decoder.decode(message.payload.text)"></div>
                  <div v-if="message.type === 'image'" class="content-image"
                       @click="showImagePreviewPopup(message.payload.url)">
                    <img :src="message.payload.url"
                         :style="{height:getImageHeight(message.payload.width,message.payload.height)+'px'}"/>
                  </div>
                  <a v-if="message.type === 'file'" :href="message.payload.url" target="_blank" download="download">
                    <div class="content-file" title="点击下载">
                      <div class="file-info">
                        <span class="file-name">{{ message.payload.name }}</span>
                        <span class="file-size">{{ (message.payload.size / 1024).toFixed(2) }}KB</span>
                      </div>
                      <img class="file-img" src="../../assets/images/file-icon.png"/>
                    </div>
                  </a>
                  <div v-if="message.type ==='audio'" class="content-audio" @click="playAudio(message)">
                    <div class="audio-facade" :style="{width:Math.ceil(message.payload.duration)*7 + 50 + 'px'}">
                      <div class="audio-facade-bg" :class="{'play-icon':audioPlayer.playingMessage === message}"></div>
                      <div>{{ Math.ceil(message.payload.duration) || 1 }}<span>"</span></div>
                    </div>
                  </div>
                  <goeasy-video-player
                    v-if="message.type === 'video'"
                    :thumbnail="message.payload.thumbnail"
                    :src="message.payload.video.url"
                  />
                  <div v-if="message.type === 'order'" class="content-order">
                    <div class="order-id">订单号：{{ message.payload.id }}</div>
                    <div class="order-body">
                      <img :src="message.payload.url" class="order-img"/>
                      <div class="order-name">{{ message.payload.name }}</div>
                      <div>
                        <div class="order-price">{{ message.payload.price }}</div>
                        <div class="order-count">共{{ message.payload.count }}件</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-footer">
      <div class="action-delete" v-if="messageSelector.visible">
        <img class="delete-btn" src="../../assets/images/delete.png" @click="deleteMultipleMessages"/>
        <div>删除</div>
      </div>
      <div class="action-box" v-else>
        <div class="action-bar">
          <!-- 表情 -->
          <div class="action-item">
            <div v-if="emoji.visible" class="emoji-box">
              <img
                v-for="(emojiItem, emojiKey, index) in emoji.map"
                class="emoji-item"
                :key="index"
                :src="emoji.url + emojiItem"
                @click="chooseEmoji(emojiKey)"
              />
            </div>
            <i class="iconfont icon-smile" title="表情" @click="showEmojiBox"></i>
          </div>
          <!-- 图片 -->
          <div class="action-item">
            <label for="img-input">
              <i class="iconfont icon-picture" title="图片"></i>
            </label>
            <input v-show="false" id="img-input" accept="image/*" multiple type="file"
                   @change="sendImageMessage"/>
          </div>
          <!-- 视频 -->
          <div class="action-item">
            <label for="video-input"><i class="iconfont icon-film" title="视频"></i></label>
            <input v-show="false" id="video-input" accept="video/*" type="file"
                   @change="sendVideoMessage"/>
          </div>
          <!-- 文件 -->
          <div class="action-item">
            <label for="file-input">
              <i class="iconfont icon-wj-wjj" title="文件"></i>
            </label>
            <input v-show="false" id="file-input" type="file"
                   @change="sendFileMessage"/>
          </div>
          <!-- 自定义-订单消息 -->
          <div class="action-item">
            <i class="iconfont icon-liebiao" title="订单" @click="showOrderMessageList"></i>
          </div>
        </div>

        <!-- GoEasyIM最大支持3k的文本消息，如需发送长文本，需调整输入框maxlength值 -->
        <div class="input-box">
          <textarea ref="input" v-model="text" maxlength="700" autocomplete="off" class="input-content"></textarea>
        </div>
        <div class="send-box">
          <button class="send-button" @click="sendTextMessage">发送</button>
        </div>
      </div>
    </div>
    <!-- 语音播放器 -->
    <audio ref="audioPlayer" @ended="onAudioPlayEnd" @pause="onAudioPlayEnd"></audio>
    <!-- 图片预览弹窗 -->
    <div v-if="imagePreview.visible" class="image-preview">
      <img :src="imagePreview.url" alt="图片"/>
      <span class="close" @click="hideImagePreviewPopup">×</span>
    </div>
    <!-- 消息删除撤回弹窗 -->
    <div class="action-popup" v-if="actionPopup.visible" @click="actionPopup.visible = false">
      <div class="action-popup-main">
        <div class="action-item" @click="deleteSingleMessage">删除</div>
        <div class="action-item" v-if="actionPopup.recallable" @click="recallMessage">撤回</div>
        <div class="action-item" @click="showCheckBox">多选</div>
        <div class="action-item" @click="actionPopup.visible = false">取消</div>
      </div>
    </div>
    <!-- 订单弹窗 -->
    <div v-if="orderList.visible" class="order-box">
      <div class="order-list">
        <div class="title">
          <div>请选择一个订单</div>
          <span @click="closeOrderMessageList">×</span>
        </div>
        <div v-for="(order, index) in orderList.orders" :key="index" class="order-item"
             @click="sendOrderMessage(order)">
          <div class="order-id">订单号：{{ order.id }}</div>
          <div class="order-body">
            <img :src="order.url" class="order-img"/>
            <div class="order-name">{{ order.name }}</div>
            <div>
              <div class="order-price">{{ order.price }}</div>
              <div class="order-count">共{{ order.count }}件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref, reactive, onBeforeMount, onBeforeUnmount, inject, nextTick} from 'vue';
  import {useRoute} from 'vue-router';
  import { useStore } from 'vuex';
  import {formatDate} from '@/utils/utils'
  import restApi from '@/api/restapi.js';
  import EmojiDecoder from '@/utils/EmojiDecoder';
  import GoeasyVideoPlayer from "@/components/GoEasyVideoPlayer";

  const route = useRoute();
  const store = useStore();
  const GoEasy = inject('GoEasy');
  const goEasy = inject('goEasy');
  const currentUser = store.state.currentUser;

  const IMAGE_MAX_WIDTH = 200;
  const IMAGE_MAX_HEIGHT = 150;
  const emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
  const emojiMap = {
    '[么么哒]': 'emoji_3@2x.png',
    '[乒乓]': 'emoji_4@2x.png',
    '[便便]': 'emoji_5@2x.png',
    '[信封]': 'emoji_6@2x.png',
    '[偷笑]': 'emoji_7@2x.png',
    '[傲慢]': 'emoji_8@2x.png',
  };

  let group = ref({
    id: route.params.id,
    name: route.query.name,
    avatar: route.query.avatar
  });
  let to = {
    id: group.value.id,
    type: GoEasy.IM_SCENE.GROUP,
    data: {name: group.value.name, avatar: group.value.avatar}
  };
  let history = reactive({
    messages: [],
    allLoaded: false,
    loading: true
  })

  let text = ref('');
  let emoji = reactive({
    url: emojiUrl,
    map: emojiMap,
    visible: false,
    decoder: new EmojiDecoder(emojiUrl, emojiMap),
  })
  let orderList = reactive({
    orders: [],
    visible: false,
  })
  let imagePreview = reactive({
    visible: false,
    url: ''
  })
  let audioPlayer = reactive({
    audio: {},
    playingMessage: null,
  })
  let actionPopup = reactive({
    visible: false,
    message: null,
    recallable: false,
  })
  let messageSelector = reactive({
    visible: false,
    ids: []
  })

  function onReceivedGroupMessage(message) {
    let groupId = message.groupId;
    if (groupId === group.value.id) {
      history.messages.push(message);
      markGroupMessageAsRead();
    }
    scrollToBottom();
  }

  function getImageHeight(width, height) {
    if (width < IMAGE_MAX_WIDTH && height < IMAGE_MAX_HEIGHT) {
      return height;
    } else if (width > height) {
      return IMAGE_MAX_WIDTH / width * height;
    } else if (width === height || width < height) {
      return IMAGE_MAX_HEIGHT;
    }
  }

  function playAudio(audioMessage) {
    let playingMessage = audioPlayer.playingMessage;

    if (playingMessage) {
      audioPlayer.audio.pause();
      // 如果点击的消息正在播放，就认为是停止播放操作
      if (playingMessage === audioMessage) {
        return;
      }
    }

    audioPlayer.playingMessage = audioMessage;
    audioPlayer.audio.src = audioMessage.payload.url;
    audioPlayer.audio.load();
    audioPlayer.audio.currentTime = 0;
    audioPlayer.audio.play();
  }

  function onAudioPlayEnd() {
    audioPlayer.playingMessage = null;
  }

  function sendTextMessage() {
    if (!text.value.trim()) {
      console.log('输入为空');
      return
    }
    goEasy.im.createTextMessage({
      text: text.value,
      to: to,
      onSuccess: (message) => {
        sendMessage(message);
        text.value = '';
      },
      onFailed: (err) => {
        console.log("创建消息err:", err);
      }
    });
  }

  function showEmojiBox() {
    emoji.visible = !emoji.visible;
  }

  function chooseEmoji(emojiKey) {
    text.value += emojiKey;
    emoji.visible = false;
  }

  function sendImageMessage(e) {
    let fileList = [...e.target.files];
    fileList.forEach((file) => {
      goEasy.im.createImageMessage({
        file: file,
        to: to,
        onProgress: function (progress) {
          console.log(progress)
        },
        onSuccess: (message) => {
          sendMessage(message);
        },
        onFailed: (e) => {
          console.log('error :', e);
        }
      });
    })
  }

  function sendVideoMessage(e) {
    const file = e.target.files[0];
    goEasy.im.createVideoMessage({
      file: file,
      to: to,
      onProgress: function (progress) {
        console.log(progress)
      },
      onSuccess: (message) => {
        sendMessage(message);
      },
      onFailed: (e) => {
        console.log('error :', e);
      }
    });
  }

  function sendFileMessage(e) {
    const file = e.target.files[0];
    goEasy.im.createFileMessage({
      file: file,
      to: to,
      onProgress: function (progress) {
        console.log(progress)
      },
      onSuccess: (message) => {
        sendMessage(message);
      },
      onFailed: (e) => {
        console.log('error :', e);
      }
    });
  }

  function closeOrderMessageList() {
    orderList.visible = false;
  }

  function showOrderMessageList() {
    orderList.orders = restApi.getOrderList();
    orderList.visible = true;
  }

  function sendOrderMessage(order) {
    orderList.visible = false;
    goEasy.im.createCustomMessage({
      type: 'order',
      payload: order,
      to: to,
      onSuccess: (message) => {
        sendMessage(message);
      },
      onFailed: (err) => {
        console.log("创建消息err:", err);
      }
    });
  }

  function sendMessage(message) {
    let messageRef = ref()
    messageRef.value = message
    history.messages.push(messageRef.value);
    scrollToBottom();
    goEasy.im.sendMessage({
      message: messageRef.value,
      onSuccess: (message) => {
        console.log('发送成功', message);
      },
      onFailed: function (error) {
        if (error.code === 507) {
          alert('发送语音/图片/视频/文件失败，没有配置OSS存储');
          console.log('发送语音/图片/视频/文件失败，没有配置OSS存储，详情参考：https://www.goeasy.io/cn/docs/goeasy-2.x/im/message/media/send-media-message.html');
        } else {
          console.log('发送失败:', error);
        }
      }
    });
  }

  function showActionPopup(message) {
    const MAX_RECALLABLE_TIME = 3 * 60 * 1000; //3分钟以内的消息才可以撤回
    messageSelector.ids = [message.messageId];
    if ((Date.now() - message.timestamp) < MAX_RECALLABLE_TIME && message.senderId === currentUser.id && message.status === 'success') {
      actionPopup.recallable = true;
    } else {
      actionPopup.recallable = false;
    }
    actionPopup.visible = true;
  }

  function deleteSingleMessage() {
    actionPopup.visible = false;
    deleteMessage();
  }

  function deleteMultipleMessages() {
    if (messageSelector.ids.length > 0) {
      messageSelector.visible = false;
      deleteMessage();
    }
  }

  function deleteMessage() {
    let conf = confirm("确认删除？");
    if (conf === true) {
      let selectedMessages = [];
      history.messages.forEach((message) => {
        if (messageSelector.ids.includes(message.messageId)) {
          selectedMessages.push(message);
        }
      });
      goEasy.im.deleteMessage({
        messages: selectedMessages,
        onSuccess: () => {
          selectedMessages.forEach((message) => {
            let index = history.messages.indexOf(message);
            if (index > -1) {
              history.messages.splice(index, 1);
            }
          });
          messageSelector.ids = [];
        },
        onFailed: (error) => {
          console.log('error:', error);
        },
      });
    } else {
      messageSelector.ids = [];
    }
  }

  function recallMessage() {
    let selectedMessages = [];
    history.messages.forEach((message) => {
      if (messageSelector.ids.includes(message.messageId)) {
        selectedMessages.push(message);
      }
    });
    actionPopup.visible = false;
    goEasy.im.recallMessage({
      messages: selectedMessages,
      onSuccess: () => {
        console.log('撤回成功');
      },
      onFailed: (error) => {
        console.log('撤回失败,error:', error);
      }
    });
  }

  function editRecalledMessage(content) {
    text.value = content;
  }

  function showImagePreviewPopup(url) {
    imagePreview.visible = true;
    imagePreview.url = url;
  }

  function hideImagePreviewPopup() {
    imagePreview.visible = false;
  }

  function showCheckBox() {
    messageSelector.ids = [];
    messageSelector.visible = true;
    actionPopup.visible = false;
  }

  function selectMessages(e) {
    if (e.target.checked) {
      messageSelector.ids.push(e.target.value)
    } else {
      let index = messageSelector.ids.indexOf(e.target.value);
      if (index > -1) {
        messageSelector.ids.splice(index, 1);
      }
    }
  }

  function loadHistoryMessage(isScrollToBottom) {
    history.loading = true;
    //历史消息
    let lastMessageTimeStamp;
    let lastMessage = history.messages[0];
    if (lastMessage) {
      lastMessageTimeStamp = lastMessage.timestamp;
    }
    goEasy.im.history({
      groupId: group.value.id,
      lastTimestamp: lastMessageTimeStamp,
      limit: 10,
      onSuccess: (result) => {
        history.loading = false;
        let messages = reactive([]);
        messages.push(...result.content);
        if (messages.length === 0) {
          history.allLoaded = true;
        } else {
          if (lastMessageTimeStamp) {
            messages.push(...history.messages)
            history.messages = messages;
          } else {
            history.messages = messages;
          }
          if (messages.length < 10) {
            history.allLoaded = true;
          }
          if (isScrollToBottom) {
            scrollToBottom();
            //收到的消息设置为已读
            markGroupMessageAsRead();
          }
        }
      },
      onFailed: (error) => {
        //获取失败
        history.loading = false;
        console.log('获取历史消息失败, code:' + error.code + ',错误信息:' + error.content);
      },
    });
  }

  function markGroupMessageAsRead() {
    goEasy.im.markMessageAsRead({
      id: to.id,
      type: to.type,
      onSuccess: function () {
        console.log('标记群聊已读成功');
      },
      onFailed: function (error) {
        console.log('标记群聊已读失败', error);
      },
    });
  }

  let scrollView = ref();
  let messageList = ref();
  function scrollToBottom() {
    nextTick(() => {
      scrollView.value.scrollTop = messageList.value.scrollHeight;
    });
  }

  function renderMessageDate(message, index) {
    if (index === 0) {
      return formatDate(message.timestamp);
    } else {
      if (message.timestamp - history.messages[index - 1].timestamp > 5 * 60 * 1000) {
        return formatDate(message.timestamp);
      }
    }
    return '';
  }

  onBeforeMount(() => {
    loadHistoryMessage(true);

    goEasy.im.on(GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, onReceivedGroupMessage);
  })

  onBeforeUnmount(() => {
    goEasy.im.off(GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, onReceivedGroupMessage);
  })
</script>

<style scoped>
  .chat-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .chat-title {
    height: 61px;
    padding: 15px;
    display: flex;
    align-items: center;
    font-size: 18px;

  }

  .chat-avatar {
    width: 40px;
    height: 40px;
  }

  .chat-name {
    width: 400px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    font-family: BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  .chat-main {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
    scrollbar-width: thin;
  }

  .chat-main::-webkit-scrollbar {
    width: 0;
  }

  .chat-main .history-loaded {
    text-align: center;
    font-size: 12px;
    color: #cccccc;
    line-height: 20px;
  }

  .chat-main .load {
    text-align: center;
    font-size: 12px;
    color: #d02129;
    line-height: 20px;
    cursor: pointer;
  }

  .history-loading {
    width: 100%;
    text-align: center;
  }

  .time-tips {
    color: #999;
    text-align: center;
    font-size: 12px;
  }

  .message-list {
    padding: 0 10px;
  }

  .message-item {
    display: flex;
  }

  .message-item-checkbox {
    height: 50px;
    margin-right: 15px;
    display: flex;
    align-items: center;
  }

  .input-checkbox {
    position: relative;
  }

  .message-item-checkbox input[type="checkbox"]:before, .message-item-checkbox input[type="checkbox"]:checked:before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    background: #FFFFFF;
    width: 18px;
    height: 18px;
    border: 1px solid #cccccc;
    border-radius: 50%;
  }

  .message-item-checkbox input[type="checkbox"]:checked:before {
    content: "\2713";
    background-color: #d02129;
    width: 18px;
    color: #FFFFFF;
    text-align: center;
    font-weight: bold;
  }

  .message-item-content {
    flex: 1;
    margin: 5px 0;
    overflow: hidden;
    display: flex;
  }

  .sender-info {
    margin: 0 5px;
  }

  .sender-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .message-content {
    max-width: calc(100% - 100px);
  }

  .message-payload {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .pending {
    background: url("../../assets/images/pending.gif") no-repeat center;
    background-size: 13px;
    width: 15px;
    height: 15px;
  }

  .send-fail {
    background: url("../../assets/images/failed.png") no-repeat center;
    background-size: 15px;
    width: 18px;
    height: 18px;
    margin-right: 3px;
  }

  .content-text {
    display: flex;
    align-items: center;
    text-align: left;
    background: #eeeeee;
    font-size: 14px;
    font-weight: 500;
    padding: 6px 8px;
    margin: 3px 0;
    line-height: 25px;
    white-space: pre-line;
    overflow-wrap: anywhere;
    border-radius: 8px;
    word-break: break-all;
  }

  .content-image {
    display: block;
    cursor: pointer;
  }

  .content-image img {
    height: 100%;
  }

  .content-audio {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .content-audio .audio-facade {
    min-width: 12px;
    background: #eeeeee;
    border-radius: 7px;
    display: flex;
    font-size: 14px;
    padding: 8px;
    margin: 5px 0;
    line-height: 25px;
    cursor: pointer;
  }

  .content-audio .audio-facade-bg {
    background: url("../../assets/images/voice.png") no-repeat center;
    background-size: 15px;
    width: 20px;
  }

  .content-audio .audio-facade-bg.play-icon {
    background: url("../../assets/images/play.gif") no-repeat center;
    background-size: 20px;
  }

  .content-order {
    border-radius: 5px;
    border: 1px solid #eeeeee;
    padding: 8px;
    display: flex;
    flex-direction: column;
  }

  .content-order .order-id {
    font-size: 12px;
    color: #666666;
    margin-bottom: 5px;
  }

  .content-order .order-body {
    display: flex;
    font-size: 13px;
    padding: 5px;
  }

  .content-order .order-img {
    width: 70px;
    height: 70px;
    border-radius: 5px;
  }

  .content-order .order-name {
    margin-left: 10px;
    width: 135px;
    color: #606164;
  }

  .content-order .order-count {
    font-size: 12px;
    color: #666666;
    flex: 1;
  }

  .content-file {
    width: 240px;
    height: 65px;
    font-size: 15px;
    background: #FFFFFF;
    border: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .content-file:hover {
    background: #f1f1f1;
  }

  .file-info {
    width: 194px;
    text-align: left;
  }

  .file-name {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .file-size {
    font-size: 12px;
    color: #ccc;
  }

  .file-img {
    width: 50px;
    height: 50px;
  }

  .message-item .self {
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex-direction: row-reverse;
  }

  .message-item .self .audio-facade {
    flex-direction: row-reverse;
  }

  .message-item .self .audio-facade-bg {
    background: url("../../assets/images/voice.png") no-repeat center;
    background-size: 15px;
    width: 20px;
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .message-item .self .play-icon {
    background: url("../../assets/images/play.gif") no-repeat center;
    background-size: 20px;
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .message-recalled {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 28px;
    font-size: 13px;
    text-align: center;
    color: grey;
    margin-top: 10px;
  }

  .message-recalled-self {
    display: flex;
  }

  .message-recalled-self span {
    margin-left: 5px;
    color: #D02129;
    cursor: pointer;
  }

  .chat-footer {
    border-top: 1px solid #dcdfe6;
    width: 100%;
    height: 200px;
    background: #FFFFFF;
  }

  .action-delete {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }

  .delete-btn {
    width: 25px;
    height: 25px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 50%;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .action-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .action-bar {
    display: flex;
    flex-direction: row;
    padding: 0 10px;
  }

  .action-bar .action-item {
    text-align: left;
    padding: 10px 0;
    position: relative;
  }

  .action-bar .action-item .iconfont {
    font-size: 22px;
    margin: 0 10px;
    z-index: 3;
    color: #606266;
    cursor: pointer;
  }

  .action-bar .action-item .iconfont:focus {
    outline: none;
  }

  .action-bar .action-item .iconfont:hover {
    color: #d02129;
  }

  .emoji-box {
    width: 250px;
    position: absolute;
    top: -125px;
    left: -11px;
    z-index: 2007;
    background: #fff;
    border: 1px solid #ebeef5;
    padding: 12px;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    word-break: break-all;
    border-radius: 4px;
  }

  .emoji-item {
    width: 45px;
    height: 45px;
    margin: 0 2px;
  }

  .input-box {
    padding: 0 10px;
    flex: 1;
  }

  .input-content {
    height: 110px;
    border: none;
    resize: none;
    display: block;
    padding: 5px 15px;
    box-sizing: border-box;
    width: 100%;
    color: #606266;
    outline: none;
    background: #FFFFFF;
    word-break: break-all;
  }

  .send-box {
    padding: 5px 10px;
    text-align: right;
  }

  .send-button {
    width: 70px;
    height: 30px;
    font-size: 15px;
    border: 1px solid #d02129;
    background-color: #ffffff;
    color: #d02129;
    border-radius: 5px;
  }

  .action-popup {
    width: 100%;
    height: calc(100vh - 340px);
    position: absolute;
    top: 0;
    left: -341px;
    background: rgba(51, 51, 51, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-popup-main {
    width: 150px;
    height: 120px;
    background: #ffffff;
    z-index: 100;
    border-radius: 10px;
    overflow: hidden;
  }

  .action-popup-main .action-item {
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    color: #262628;
    border-bottom: 1px solid #efefef;
    cursor: pointer;
  }

  .image-preview {
    max-width: 750px;
    max-height: 500px;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9998;
  }

  .image-preview img {
    max-width: 750px;
    max-height: 500px;
  }

  .image-preview .close {
    font-size: 50px;
    line-height: 24px;
    cursor: pointer;
    color: #FFFFFF;
    position: absolute;
    top: 10px;
    right: 5px;
    z-index: 1002;
  }

  .order-box {
    width: 850px;
    height: 650px;
    position: absolute;
    left: -341px;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2007;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(33, 33, 33, 0.7);
  }

  .order-list {
    width: 300px;
    background: #F1F1F1;
    border-radius: 5px;
  }

  .order-list .title {
    font-weight: 600;
    font-size: 15px;
    color: #000000;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .order-list .title span {
    font-size: 28px;
    font-weight: 400;
    cursor: pointer;
  }

  .order-list .order-item {
    padding: 10px;
    background: #FFFFFF;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  .order-list .order-id {
    font-size: 12px;
    color: #666666;
    margin-bottom: 5px;
  }

  .order-list .order-body {
    display: flex;
    font-size: 13px;
    justify-content: space-between;
  }

  .order-list .order-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  .order-list .order-name {
    width: 160px;
  }

  .order-list .order-count {
    font-size: 12px;
    color: #666666;
    flex: 1;
  }

</style>
