<template>
    <div class="goEasy-recorder">
        <div class="record-input" @click="onStateChange">
<!--          {{recording ? '点击发送' : '点击录音'}}-->
          <el-icon><Mic /></el-icon>
        </div>
        <div class="record-loading" v-if="recording"></div>
    </div>
</template>

<script>
    import Recorder from 'recorder-core';
    import 'recorder-core/src/engine/mp3'
    import 'recorder-core/src/engine/mp3-engine'
    export default {
        name: "GoEasyRecorder",
        data () {
            return {
                recording : false,
                recorder : null,
                file : null
            }
        },
        mounted() {
            this.init()
        },
        beforeUnmount() {
            this.close();
            this.recorder = null;
        },
        methods : {
            init() {
                this.recorder = Recorder({
                    type : 'mp3',
                    sampleRate:16000,
                    bitRate:16,
                    onProcess : function () {

                    }
                });
                this.recorder.open(() => {
                    console.log('录音授权成功')
                    //授权成功
                }, (e) => {
                    console.log('录音授权失败',e);
                    //授权失败
                    this.close()
                })
            },
            onStateChange () {
                if(this.recording) {
                    this.stop()
                }else{
                    this.start()
                }
            },
            start () {
                this.recording = true;
                if(this.recorder && this.recorder.state != 1) {
                    this.recorder.start()
                }
            },
            stop () {
                this.recorder.stop((blob, duration) => {
                    console.log(duration)
                    this.recording = false;
                    this.open = false;
                    let file = new File([blob], 'audio.mp3', {type: blob.type, lastModified: Date.now()});
                    this.$emit('onComplete', file);
                }, (msg) => {
                    console.log(msg)
                })
            },
            close () {
                this.open = true;
                if(this.recorder) {
                    this.recorder.close();
                }
            }
        }
    }
</script>

<style scoped>
.goEasy-recorder{
  padding-left: 10px;
}

.goEasy-recorder .record-input{

}

.record-loading{
  position: absolute;
  top:50%;
  left: 50%;
  width: 150px;
  height: 150px;
  margin: -400px -75px;
  background: #262628 url("./images/loading.gif") no-repeat center;
  background-size: 100%;
  border-radius: 20px;
}

</style>