<template>
    <div>
        <el-dialog :model-value="visible"
                   width="490px"
                   center
                   :show-close="false"
                   :before-close="beforeClose"
        >

            <div class="deal-container" v-if="info">

                <div class="deal-close">
                    <el-button circle @click="close()">
                        <el-icon :size="14">
                            <CloseBold/>
                        </el-icon>
                    </el-button>
                </div>

                <div class="deal-share">
                    <el-button icon="share" circle  @click="share(info)"></el-button>

                    <template v-if="info.is_favorite">
                        <el-button circle @click="cancelFavorite()">
                            <el-icon :size="14">
                                <IconFlatColorIconsLike/>
                            </el-icon>
                        </el-button>
                    </template>
                    <template v-else>
                        <el-button circle   @click="addFavorite()">
                            <el-icon :size="14">
                                <IconIconParkOutlineLike/>
                            </el-icon>
                        </el-button>
                    </template>
                </div>

                <div class="deal-t">
                    <el-image class="deal-background-img"
                              fit="cover"
                              :src="info.company_info.background_image">
                        <template #error>
                            <div class="img-slot-background">
                                <el-icon :size="80" color="#808080">
                                    <Picture/>
                                </el-icon>
                            </div>
                        </template>
                    </el-image>
                </div>
                <div class="deal-b">
                    <div class="deal-b-l">
                        <el-avatar class="deal-logo" :src="info.company_logo"></el-avatar>
                    </div>

                    <div class="deal-b-r">

                        <div class="deal-title">
                            {{ info.title }}
                        </div>
                        <div class="deal-redeems">
                            18 Redeems . 22/03/2023 - 27/04/2023
                        </div>
                        <div class="deal-company-name">
                            {{ info.company_name }}
                        </div>

                    </div>

                </div>
                <div class="deal-desc">
                    <p>
                        {{info.desc}}
                    </p>
                </div>

                <div class="deal-action">
                    <span v-if="info.company_info">{{ info.company_info.category_name_en }}</span>
                    <el-button type="primary" @click="share(info)">
                        Redeem Deal
                    </el-button>
                </div>

            </div>

        </el-dialog>

    </div>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue'

const props = defineProps(['info', 'visible','activeTabName','dealIndex', 'qrcodeValue'])

const emit = defineEmits(['close', 'viewProfile', 'share','addFavorite','cancelFavorite'])

const close = () => {
    emit('close')
}
const beforeClose = (done) => {
    emit('close')
    done()
}

const share = (info) => {
    emit('share', info)
}

const addFavorite = ()=>{
    if(props.activeTabName === 'featured_deals'){
        emit('addFavorite',props.info,props.dealIndex,'featured')
    }

    if(props.activeTabName === 'all_deals'){
        emit('addFavorite',props.info,props.dealIndex,'all')
    }
}

const cancelFavorite = ()=>{
    if(props.activeTabName === 'featured_deals'){
        emit('cancelFavorite',props.info,props.dealIndex,'featured')
    }

    if(props.activeTabName === 'all_deals'){
        emit('cancelFavorite',props.info,props.dealIndex,'all')
    }

}

</script>

<style scoped>

.deal-container {
    background-color: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

:deep(.el-dialog) {
    --el-dialog-bg-color: none;
    --el-dialog-box-shadow: none;
}

.deal-t {
    width: 100%;
    height: 220px;
}

.deal-background-img {
    width: 100%;
    height: 100%;
}

.deal-b {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin: 12px 24px 12px 24px;
}

.deal-b-l {

}

.deal-logo{
    width: 56px;
    height: 56px;
}

.deal-b-r {
    width: calc(100% - 70px);
}

.deal-title {
    color:  #1D2939;
    font-size: 18px;
    font-family: Inter;
    font-weight: 600;
}

.deal-redeems{
    color:  #667085;
    font-size: 14px;
    font-family: Inter;
    line-height: 18px;
}

.deal-company-name {
    color: #667085;
    font-size: 14px;
    font-family: Inter;
    text-decoration-line: underline;
}

.deal-desc {
    margin: 16px 24px;
    font-size: 14px;
    font-family: Inter;
    line-height: 18px;
    color: #667085;

    word-break: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

}

.deal-action {
    margin: 20px 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.deal-action span {
    color:  #667085;
    font-size: 14px;
    font-family: Inter;
}

.img-slot-background {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #faf7f7;
    width: 100%;
    height: 100%;
}

:deep(.el-overlay) {
    background-color: rgba(0, 0, 0, 0.9);
}

.deal-close {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 100;
}

.deal-share{
    position: absolute;
    top: 10px;
    right: 14px;
    z-index: 100;
}

@media screen and (max-width: 768px) {


}
</style>