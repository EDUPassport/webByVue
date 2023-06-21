<template>
  <div>
    <el-dialog :model-value="visible"
               width="410px"
               :title="shareTitle"
               :before-close="beforeClose"
    >
        <div class="share-container">
            <div class="share-t">
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

                <div class="share-item"  @click="copyLink(url)">
                    <el-image class="share-item-img" :src="copyImg"></el-image>
                    <br>
                    <span>Copy Link</span>
                </div>

            </div>
        </div>

    </el-dialog>

  </div>
</template>

<script setup>
import telegramImg from '@/assets/socialMedia/telegram.svg'
import tumblrImg from '@/assets/socialMedia/tumblr.svg'
import whatsappImg from '@/assets/socialMedia/whatsapp.svg'
import twitterImg from '@/assets/socialMedia/twitter.svg'
import copyImg from '@/assets/socialMedia/copy.svg'

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
:deep(.el-dialog__title){
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
}

:deep(.el-dialog__body){
    padding: 24px;
}

.share-t{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.share-item{
    cursor: pointer;
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

</style>