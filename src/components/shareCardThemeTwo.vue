<template>
  <div>
    <el-dialog :model-value="visible"
               width="625px"
               :title="shareTitle"
               :before-close="beforeClose"
    >
        <div class="share-container">
            <div class="share-label">
                Let your friends know
            </div>
            <div class="share-t">

                <div class="share-item">
                    <ShareNetwork
                            network="Twitter"
                            :url="url"
                            :title="title"
                    >
                        <el-image class="share-item-img" :src="twitterImg"></el-image>
                        <br>
                        <span>Twitter</span>
                    </ShareNetwork>
                </div>

                <div class="share-item">
                    <ShareNetwork
                        network="Tumblr"
                        :url="url"
                        :title="title"
                        :description="description"
                    >
                        <el-image class="share-item-img" :src="tumblrImg"></el-image>
                        <br>
                        <span>Tumblr</span>
                    </ShareNetwork>
                </div>

                <div class="share-item">
                    <ShareNetwork
                        network="WhatsApp"
                        :url="url"
                        :title="title"
                        :description="description"
                    >
                        <el-image class="share-item-img" :src="whatsappImg"></el-image>
                        <br>
                        <span>WhatsApp</span>
                    </ShareNetwork>
                </div>
                <div class="share-item">
                    <ShareNetwork
                        network="Telegram"
                        :url="url"
                        :title="title"
                        :description="description"
                        :quote="quote"
                    >
                        <el-image class="share-item-img" :src="telegramImg"></el-image>
                        <br>
                        <span>Telegram</span>
                    </ShareNetwork>
                </div>

            </div>

            <div class="share-b">
                <div class="share-copy-input">
                    <el-input :model-value="url" @focus="copyLink(url)"></el-input>
                    <el-button class="share-copy-btn" icon="CopyDocument" type="primary" @click="copyLink(url)">Copy Link</el-button>
                </div>
            </div>
        </div>

    </el-dialog>

  </div>
</template>

<script setup>
import telegramImg from '@/assets/socialMedia/telegram-2.svg'
import tumblrImg from '@/assets/socialMedia/tumblr-2.svg'
import whatsappImg from '@/assets/socialMedia/whatsapp-2.svg'
import twitterImg from '@/assets/socialMedia/twitter-2.svg'
// import copyImg from '@/assets/socialMedia/copy.svg'

import {defineProps, defineEmits} from 'vue'
import useClipboard from 'vue-clipboard3'
import {ElMessage} from 'element-plus'

defineProps(['title','description','quote','url','visible','shareTitle'])
const emit = defineEmits(['close'])

const {toClipboard} = useClipboard()

const beforeClose = (done)=>{
    emit('close')
    done()
}

const copyLink =async  (val)=> {

    try {
        await toClipboard(val)
        console.log('Copied to clipboard')
        ElMessage({
            type:'success',
            message:'Link Copied!',
            grouping:true
        })
    } catch (e) {
        console.error(e)
    }

}

</script>

<style scoped>
/deep/ .el-dialog__title{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    color: #101828;
}

/deep/ .el-dialog__body{
    padding: 24px;
}

.share-label{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #667085;

}

.share-t{
    margin-top: 24px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.share-item{
    cursor: pointer;
    margin-right: 30px;
}

.share-item a {
    text-decoration: none;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #667085;
}

.share-item span{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #667085;
}
.share-b{
    margin-top: 50px;
}
.share-copy-input{
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 2px 24px;
    background: #F7F5FF;
    border-radius: 8px;
}

.share-copy-btn{

}

.share-copy-input /deep/ .el-input__wrapper{
    background-color: #F7F5FF;
    box-shadow: none;
}

</style>