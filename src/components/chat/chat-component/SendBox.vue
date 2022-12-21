<template>
  <div class="send-box">

    <div class="send-box-l">
      <div class="send-box-item" @change="chooseFile">
        <el-icon :size="25">
          <IconIcomoonFreeAttachment />
        </el-icon>
        <input type="file" @change="chooseFile" class="img-input" ref="fileInput">
      </div>
    </div>
    <div class="send-box-m">
      <el-input class="message-input"
                type="textarea"
                :rows="1"
                placeholder="Type your message here"
                @focus="messageInputFocusin"
                @keyup.shift.enter="sendTextMessage"
                v-model="content">
      </el-input>
    </div>

    <div class="send-box-r">
      <el-button class="send-btn" link round  @click="sendTextMessage">Send</el-button>
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
            uid: this.to.uid,
            name: this.to.name,
            avatar: this.to.avatar,
            identity:this.to.identity,
            companyId:this.to.companyId
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
            uid: this.to.uid,
            name: this.to.name,
            avatar: this.to.avatar,
            identity:this.to.identity,
            companyId:this.to.companyId
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
            uid: this.to.uid,
            name: this.to.name,
            avatar: this.to.avatar,
            identity:this.to.identity,
            companyId:this.to.companyId
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
            uid: this.to.uid,
            name: this.to.name,
            avatar: this.to.avatar,
            identity:this.to.identity,
            companyId:this.to.companyId
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
      console.log(this.to)
      console.log(this.type)
      if (this.content.trim().length !== 0) {
        let textMessage = this.goEasy.im.createTextMessage({
          text: this.content,
          to: {
            id: this.to.uuid,
            type: this.type,
            data: {
              uid: this.to.uid,
              name: this.to.name,
              avatar: this.to.avatar,
              identity:this.to.identity,
              companyId:this.to.companyId
            }
          }
        });

        this.sendMessage(textMessage);

        this.content = ''

      }
    },
    sendMessage(message) {
      let self = this;
      let toId = this.to.uuid;

      let localHistory = this.type === 'private' ? this.service.getPrivateMessages(toId) : this.service.getGroupMessages(toId);

      localHistory.push(message)

      this.goEasy.im.sendMessage({
        message: message,
        onSuccess: function (message) {
          console.log("发送成功.", message);
          self.$emit('onSent',localHistory);
        },
        onFailed: function (error) {
          console.log(error.response)
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
/*@import "./sendBox.css";*/
.send-box{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  background-color: #F0F2F5;

}

.send-box-l{
  width: 130px;
  text-align: center;
}

.send-box-m{
  width: calc(100% - 290px);

}
.send-box-r{
  width: 160px;
  text-align: center;
}

.send-btn{
  font-size: 30px;
}


.img-input{
  position: absolute;
  width: 130px;
  height: 100%;
  top:0;
  left:0;
  opacity: 0;
}

/deep/ .el-textarea__inner{
  height: 50px;
}


@media screen and (max-width: 768px) {
  .send-box{
    padding: 15px;
    height: 30px;
  }

  .send-box-l{
    width: 40px;
  }
  .send-box-m{
    width: calc( 100% - 105px);
  }

  .send-box-r{
    width: 50px;
  }

  .send-btn{
    font-size: 12px;
  }


}

</style>