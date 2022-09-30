<template>
  <div class="send-box">
    <div class="send-box-top">
<!--      <div class="send-box-item" >-->
<!--        <GoEasyRecorder @onComplete="onRecordComplete" />-->
<!--      </div>-->
      <div class="send-box-item" @click="showEmoji">
        <i class="iconfont el-icon-alismile emoji-icon"></i>
      </div>
      <div class="send-box-item" @change="chooseImage">
        <el-icon><Picture /></el-icon>
        <input type="file" @change="chooseImage" class="img-input" ref="imgInput">
      </div>
      <div class="send-box-item" @change="chooseVideo">
        <el-icon><VideoCamera /></el-icon>
        <input type="file" @change="chooseVideo" class="img-input" ref="videoInput">
      </div>
      <div class="send-box-item" @change="chooseFile">
        <el-icon><Folder /></el-icon>
        <input type="file" @change="chooseFile" class="img-input" ref="fileInput">
      </div>

    </div>
    <div class="send-box-textarea">
      <el-input class="message-input" type="textarea" maxlength="700" placeholder="Send Message"
                @focus="messageInputFocusin"
                v-model="content"></el-input>
    </div>
    <div class="action-icon-container">
      <el-button class="send-btn" link round  @click="sendTextMessage">Send</el-button>
    </div>

    <div class="send-box-bottom" v-if="emoji.show || more.show">
      <div class="emoji-container" v-if="emoji.show">
        <el-image class="emoji-item"
                  v-for="(emojiItem, emojiKey, index) in emoji.map"
                  :key="index"
                  :src="emoji.url + emojiItem"
                  @click="selectEmoji(emojiKey)"/>
      </div>
      <!--      <div class="more-container" v-if="more.show">-->
      <!--        <div class="more-item" @click="showCustomMessageForm">-->
      <!--          <span>自定义消息</span>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
// import GoEasyRecorder from "../GoEasyRecorder/GoEasyRecorder";
// GoEasyRecorder

export default {
  name: "SendBox",
  props: ['to', 'type'],
  components: {

  },
  setup(){

  },
  data() {
    let emojiUrl = 'https://imgcache.qq.com/open/qcloud/tim/assets/emoji/';
    let emojiMap = {
      '[么么哒]': 'emoji_3@2x.png',
      '[乒乓]': 'emoji_4@2x.png',
      '[便便]': 'emoji_5@2x.png',
      '[信封]': 'emoji_6@2x.png',
      '[偷笑]': 'emoji_7@2x.png',
      '[傲慢]': 'emoji_8@2x.png'
    };
    return {
      audio: {
        //语音录音中
        recording: false,
        //录音按钮展示
        visible: false
      },
      emoji: {
        url: emojiUrl,
        map: emojiMap,
        show: false
      },
      more: {
        show: false
      },
      content: ''
    }
  },
  methods: {
    onRecordComplete(file) {
      let audioMessage = this.goEasy.im.createAudioMessage({
        to: {
          id: this.to.uuid,
          type: this.type,
          data: {
            name: this.to.name,
            avatar: this.to.avatar,
            identity:this.to.identity
          }
        },
        file: file,
        onProgress: function (progress) {
          console.log(progress)
        }
      });
      this.sendMessage(audioMessage);
      this.$emit('onSent');
    },
    chooseImage(e) {
      let file = e.target.files[0];
      let imageMessage = this.goEasy.im.createImageMessage({
        to: {
          id: this.to.uuid,
          type: this.type,
          data: {
            name: this.to.name,
            avatar: this.to.avatar,
            identity:this.to.identity
          }
        },
        file: file,
        onProgress: function (progress) {
          console.log(progress)
        }
      });
      this.sendMessage(imageMessage);
      this.$emit('onSent');
    },
    chooseVideo(e) {
      let file = e.target.files[0];
      let videoMessage = this.goEasy.im.createVideoMessage({
        to: {
          id: this.to.uuid,
          type: this.type,
          data: {
            name: this.to.name,
            avatar: this.to.avatar,
            identity:this.to.identity
          }
        },
        file: file,
        onProgress: function (progress) {
          console.log(progress)
        }
      });
      this.sendMessage(videoMessage);
      this.$emit('onSent');
    },
    chooseFile(e) {
      let file = e.target.files[0];
      let fileMessage = this.goEasy.im.createFileMessage({
        to: {
          id: this.to.uuid,
          type: this.type,
          data: {
            name: this.to.name,
            avatar: this.to.avatar,
            identity:this.to.identity
          }
        },
        file: file,
        onProgress: function (progress) {
          console.log(progress)
        }
      });
      this.sendMessage(fileMessage);
      this.$emit('onSent');
    },
    sendTextMessage() {

      if (this.content.trim().length !== 0) {
        let textMessage = this.goEasy.im.createTextMessage({
          text: this.content,
          to: {
            id: this.to.uuid,
            type: this.type,
            data: {
              name: this.to.name,
              avatar: this.to.avatar,
              identity:this.to.identity
            }
          }
        });

        this.sendMessage(textMessage);
        this.$emit('onSent');
        this.content = ''

      }
    },
    sendMessage(message) {

      let toId = this.to.uuid;

      let localHistory = this.type === 'private' ? this.service.getPrivateMessages(toId) : this.service.getGroupMessages(toId);

      localHistory.push(message)

      this.goEasy.im.sendMessage({
        message: message,
        onSuccess: function (message) {
          console.log("发送成功.", message);
        },
        onFailed: function (error) {
          console.log("发送失败:", error);
        }
      });
    },
    showCustomMessageForm() {
      this.$router.push({
        name: 'customMessage',
        query: {
          to: JSON.stringify(this.to),
          type: this.type
        }
      })
    },
    messageInputFocusin() {
      this.more.show = false;
      this.emoji.show = false
    },
    showEmoji() {
      this.emoji.show = !this.emoji.show;
      this.more.show = false;
    },
    selectEmoji(emojiKey) {
      this.content += emojiKey
    },
    showMore() {
      this.more.show = !this.more.show;
      this.emoji.show = false
    }
  }
}
</script>

<style scoped>
@import "./sendBox.css";
</style>