<template>

    <div>
        <el-scrollbar class="bg">
            <div class="t-container">
                <div class="t-label">My Deals</div>
                <div class="t-tips">
                    Track, manage, and showcase your posted deals
                </div>
            </div>
            <div class="content-container">
                <el-tabs v-model="activeTabPane" @tab-change="changeActiveTab">
                    <el-tab-pane label="Deal Posts" name="deal_posts">
                        <div class="deals-loading-container"
                             v-loading="loadingDealsStatus">
                            <template v-if="emptyDealsStatus">
                                <el-empty style="height: 100%;"
                                          :image="emptyImage"
                                          :image-size="456"
                                          description="You have no deal at the moment">
                                    <el-button type="primary" @click="turnToPostDeal()">Post a Deal</el-button>
                                </el-empty>
                            </template>
                            <template v-else>
                                <div class="deals-list-container" >

                                    <div class="deals-item"
                                         v-for="(item,i) in dealsListData" :key="i">

                                        <div class="deals-item-share">
                                            <el-button icon="share" circle  @click="shareDeal(item)"></el-button>

                                            <template v-if="item.is_favorite">
                                                <el-button circle @click="cancelFavorite(item,i,'featured')">
                                                    <el-icon :size="14">
                                                        <IconFlatColorIconsLike/>
                                                    </el-icon>
                                                </el-button>
                                            </template>
                                            <template v-else>
                                                <el-button circle   @click="addFavorite(item,i,'featured')">
                                                    <el-icon :size="14">
                                                        <IconIconParkOutlineLike/>
                                                    </el-icon>
                                                </el-button>
                                            </template>

                                        </div>

                                        <div class="deals-item-t">
                                            <template  v-if="item.company_info">
                                                <el-image class="deals-item-banner"
                                                          fit="cover"
                                                          :src="item.company_info.background_image ? item.company_info.background_image : ''"
                                                >
                                                </el-image>
                                            </template>
                                        </div>
                                        <div class="deals-item-b">

                                            <div class="deals-item-b-l" @click="previewDeal(item,i)">
                                                <el-avatar class="deals-logo"
                                                           :src="item.company_logo"
                                                >
                                                </el-avatar>
                                            </div>
                                            <div class="deals-item-b-r">

                                                <div class="deals-item-name" @click="previewDeal(item,i)">
                                                    {{ item.title }}
                                                </div>
                                                <div class="deals-item-posted" v-if="!token">
                                                    {{ item.company_name }}
                                                </div>

                                            </div>

                                        </div>

                                        <div class="deals-item-actions">
                                            <span v-if="item.company_info && item.company_info.category_name_en != '0'">
                                                {{ item.company_info.category_name_en }}
                                            </span>
                                            <el-button type="primary" @click="previewDeal(item,i)">
                                                View Details
                                            </el-button>
                                        </div>


                                    </div>

                                </div>
                                <div class="deals-pagination" v-if="dealsTotalNum">
                                    <el-pagination layout="prev, pager, next"
                                                   :default-current-page="1"
                                                   @size-change="dealsPageSizeChange"
                                                   @current-change="dealsPageChange"
                                                   :current-page="dealsPage"
                                                   :page-size="dealsLimit"
                                                   :total="dealsTotalNum">
                                    </el-pagination>
                                </div>

                            </template>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Drafts" name="deal_drafts">
                        <div class="deals-loading-container"
                             v-loading="loadingDealsStatus">
                            <template v-if="emptyDealsStatus">
                                <el-empty style="height: 100%;"
                                          :image="emptyImage"
                                          :image-size="456"
                                          description="You have no deal at the moment">
                                    <el-button type="primary" @click="turnToPostDeal()">Post a Deal</el-button>
                                </el-empty>
                            </template>
                            <template v-else>
                                <div class="deals-list-container" >

                                    <div class="deals-item"
                                         v-for="(item,i) in dealsListData" :key="i">

                                        <div class="deals-item-share">
                                            <el-button icon="share" circle  @click="shareDeal(item)"></el-button>

                                            <template v-if="item.is_favorite">
                                                <el-button circle @click="cancelFavorite(item,i,'featured')">
                                                    <el-icon :size="14">
                                                        <IconFlatColorIconsLike/>
                                                    </el-icon>
                                                </el-button>
                                            </template>
                                            <template v-else>
                                                <el-button circle   @click="addFavorite(item,i,'featured')">
                                                    <el-icon :size="14">
                                                        <IconIconParkOutlineLike/>
                                                    </el-icon>
                                                </el-button>
                                            </template>

                                        </div>

                                        <div class="deals-item-t">
                                            <template  v-if="item.company_info">
                                                <el-image class="deals-item-banner"
                                                          fit="cover"
                                                          :src="item.company_info.background_image ? item.company_info.background_image : ''"
                                                >
                                                </el-image>
                                            </template>
                                        </div>
                                        <div class="deals-item-b">

                                            <div class="deals-item-b-l" @click="previewDeal(item,i)">
                                                <el-avatar class="deals-logo"
                                                           :src="item.company_logo"
                                                >
                                                </el-avatar>
                                            </div>
                                            <div class="deals-item-b-r">

                                                <div class="deals-item-name" @click="previewDeal(item,i)">
                                                    {{ item.title }}
                                                </div>
                                                <div class="deals-item-posted" v-if="!token">
                                                    {{ item.company_name }}
                                                </div>

                                            </div>

                                        </div>

                                        <div class="deals-item-actions">
                                            <span v-if="item.company_info && item.company_info.category_name_en != '0'">
                                                {{ item.company_info.category_name_en }}
                                            </span>
                                            <el-button type="primary" @click="previewDeal(item,i)">
                                                View Details
                                            </el-button>
                                        </div>


                                    </div>

                                </div>
                                <div class="deals-pagination" v-if="dealsTotalNum">
                                    <el-pagination layout="prev, pager, next"
                                                   :default-current-page="1"
                                                   @size-change="dealsPageSizeChange"
                                                   @current-change="dealsPageChange"
                                                   :current-page="dealsPage"
                                                   :page-size="dealsLimit"
                                                   :total="dealsTotalNum">
                                    </el-pagination>
                                </div>

                            </template>

                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="Archive" name="deal_archive">

                        <div class="deals-loading-container"
                             v-loading="loadingDealsStatus">
                            <template v-if="emptyDealsStatus">
                                <el-empty style="height: 100%;"
                                          :image="emptyImage"
                                          :image-size="456"
                                          description="You have no deal at the moment">
                                    <el-button type="primary" @click="turnToPostDeal()">Post a Deal</el-button>
                                </el-empty>
                            </template>
                            <template v-else>
                                <div class="deals-list-container" >

                                    <div class="deals-item"
                                         v-for="(item,i) in dealsListData" :key="i">

                                        <div class="deals-item-share">
                                            <el-button icon="share" circle  @click="shareDeal(item)"></el-button>

                                            <template v-if="item.is_favorite">
                                                <el-button circle @click="cancelFavorite(item,i,'featured')">
                                                    <el-icon :size="14">
                                                        <IconFlatColorIconsLike/>
                                                    </el-icon>
                                                </el-button>
                                            </template>
                                            <template v-else>
                                                <el-button circle   @click="addFavorite(item,i,'featured')">
                                                    <el-icon :size="14">
                                                        <IconIconParkOutlineLike/>
                                                    </el-icon>
                                                </el-button>
                                            </template>

                                        </div>

                                        <div class="deals-item-t">
                                            <template  v-if="item.company_info">
                                                <el-image class="deals-item-banner"
                                                          fit="cover"
                                                          :src="item.company_info.background_image ? item.company_info.background_image : ''"
                                                >
                                                </el-image>
                                            </template>
                                        </div>
                                        <div class="deals-item-b">

                                            <div class="deals-item-b-l" @click="previewDeal(item,i)">
                                                <el-avatar class="deals-logo"
                                                           :src="item.company_logo"
                                                >
                                                </el-avatar>
                                            </div>
                                            <div class="deals-item-b-r">

                                                <div class="deals-item-name" @click="previewDeal(item,i)">
                                                    {{ item.title }}
                                                </div>
                                                <div class="deals-item-posted" v-if="!token">
                                                    {{ item.company_name }}
                                                </div>

                                            </div>

                                        </div>

                                        <div class="deals-item-actions">
                                            <span v-if="item.company_info && item.company_info.category_name_en != '0'">
                                                {{ item.company_info.category_name_en }}
                                            </span>
                                            <el-button type="primary" @click="previewDeal(item,i)">
                                                View Details
                                            </el-button>
                                        </div>


                                    </div>

                                </div>
                                <div class="deals-pagination" v-if="dealsTotalNum">
                                    <el-pagination layout="prev, pager, next"
                                                   :default-current-page="1"
                                                   @size-change="dealsPageSizeChange"
                                                   @current-change="dealsPageChange"
                                                   :current-page="dealsPage"
                                                   :page-size="dealsLimit"
                                                   :total="dealsTotalNum">
                                    </el-pagination>
                                </div>

                            </template>

                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-scrollbar>

        <share-card-theme-two :visible="shareDialogVisible"
                              share-title="Share something exciting"
                              :title="shareInfo.title"
                              :description="shareInfo.desc"
                              :quote="shareInfo.desc"
                              :url="shareLocationUrl"
                              @close="shareDialogVisible=false"
        >
        </share-card-theme-two>

        <dealDetailCard :info="dealDetailData"
                        :index="dealIndex"
                        :activeTabName="activeTabName"
                        @add-favorite="addFavorite"
                        @cancel-favorite="cancelFavorite"
                        @close="dealDetailVisible=false"
                        @share="shareDeal"
                        :visible="dealDetailVisible">
        </dealDetailCard>

    </div>

</template>

<script setup>

import {ADD_FAVORITE, CANCEL_FAVORITE, MY_DEALS} from '@/api/api';
import {updateWindowHeight} from "@/utils/tools";
import {ref, onMounted, onUnmounted} from 'vue'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import ShareCardThemeTwo from "@/components/shareCardThemeTwo.vue";
import emptyImage from "@/assets/newHome/dashboard/empty-deals.svg";

const router = useRouter()
// const route = useRoute()

const dealDetailData = ref({})
const activeTabName = ref('')
const dealIndex = ref(null)
const dealDetailVisible = ref(false)

const shareDialogVisible = ref(false)
const shareInfo = ref({})
const shareLocationUrl = ref('')

const dealsListData = ref([])
const dealsPage = ref(1)
const dealsLimit = ref(10)
const dealsTotalNum = ref(0)
const loadingDealsStatus = ref(false)
const emptyDealsStatus = ref(false)

const activeTabPane = ref('deal_posts')

const changeActiveTab = (e)=>{
    // console.log(e)
    emptyDealsStatus.value = false
    loadingDealsStatus.value = false

    if(e === 'deal_posts'){
        console.log('deal_posts')
        getMyDeals(dealsPage.value, dealsLimit.value)
    }
    if(e === 'deal_drafts'){
        console.log('deal_drafts')
        getMyDeals(dealsPage.value, dealsLimit.value)
    }
    if(e === 'deal_archive'){
        console.log('deal_archive')
        getMyDeals(dealsPage.value, dealsLimit.value)
    }
}

const turnToPostDeal = ()=>{
    router.push({path:'/deals/offer'})
}
const dealsPageSizeChange = (e) => {
    console.log(e)
}
const dealsPageChange = (e) => {
    dealsPage.value = e
    getMyDeals(e, dealsLimit.value)
}
const getMyDeals = (page, limit) => {
    loadingDealsStatus.value = true
    let params = {
        page: page,
        limit: limit
    }
    MY_DEALS(params).then(res => {

        if (res.code == 200) {
            dealsListData.value = res.message.data
            dealsTotalNum.value = res.message.total
            loadingDealsStatus.value = false
            emptyDealsStatus.value = res.message.total <= 0;
        }

    }).catch(err => {
        loadingDealsStatus.value = false
        emptyDealsStatus.value = true
        console.log(err)
    })
}

const shareDeal = (item) => {
    shareInfo.value = {
        title: item.title,
        desc: item.desc,
        id: item.id
    }

    let origin = window.location.origin
    shareLocationUrl.value = origin + '/deals/detail?id=' + item.id;
    shareDialogVisible.value = true;
}

const addFavorite = (item, index) => {

    let params = {
        type: 2,
        type_id: item.id,
        type_title: item.name,
        type_url: item.company_logo
    }
    // console.log(params)
    ADD_FAVORITE(params).then(res => {
        if (res.code == 200) {
            console.log(res)
            dealsListData.value[index].is_favorite = 1
            ElMessage({
                type:'success',
                message:'Added to Favourites',
                grouping:true
            })

        }
    }).catch(err => {
        console.log(err)

    })

}

const cancelFavorite = (item,index) => {
    let params = {
        type: 2,
        type_id: item.id
    }
    CANCEL_FAVORITE(params).then(res => {
        if (res.code == 200) {

            dealsListData.value[index].is_favorite = 1

        }
    }).catch(err => {
        console.log(err)
    })
}

onMounted(() => {
    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
        updateWindowHeight()
    }
    window.onresize = () => {
        if (screenWidthFloor <= 768) {
            updateWindowHeight()
        }
    }
    getMyDeals(dealsPage.value, dealsLimit.value)

})

onUnmounted(() => {
    updateWindowHeight()
    window.onresize = null
})
</script>

<style scoped>


.dialog-border{
    border-radius: 10px !important;
}
.my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.text-ellipsis{
    text-overflow: ellipsis;
    overflow: hidden;
    width: 180px;
    white-space: nowrap
}

.deals-loading-container{
    min-height: 300px;
}

:deep(.el-tabs__item){
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #98A2B3;
}

:deep(.el-tabs__item.is-active){
    color: #6648FF;
}

:deep(.el-tabs__active-bar) {
    background-color: #6648FF;
}


.bg {
    background-color: #FFFFFF;
    height: calc(var(--i-window-height) - 120px);

}

.t-container {
    margin: 0 40px 0 40px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
    color: #000000;
}

.t-tips {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
}

.content-container {
    margin: 30px 40px 40px 40px;
    position: relative;
}


.deals-list-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.deals-item {
    width: calc((100% - 48px) / 3);
    min-width: 290px;
    margin-right: 20px;
    margin-bottom: 30px;
    overflow: hidden;

    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    position: relative;
}

.deals-item:nth-child(3n) {
    margin-right: 0;
}

.deals-item-token {
    width: calc((100% - 48px) / 2);
    min-width: 290px;
    margin-right: 20px;
    margin-bottom: 30px;
    overflow: hidden;

    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    position: relative;
}

.deals-item-token:nth-child(2n) {
    margin-right: 0;
}

.deals-item-share{
    position: absolute;
    right: 20px;
    top: 10px;
    z-index: 100;
}
.deals-item-t {
    width: 100%;
    height: 170px;
    border-bottom: 1px solid #d0d5dd;
    overflow: hidden;
}

.deals-item-banner {
    width: 100%;
    height: 100%;
    /*aspect-ratio: 2 / 3;*/
    background-color: #ececec;
    cursor: pointer;
}

.deals-item-b {
    margin: 16px 14px 0 14px;
    display: flex;
    flex-direction: row;
}

.deals-item-b-l {
    display: flex;
    flex-direction: column;
    align-items: center;

}

.deals-logo{
    width: 56px;
    height: 56px;
    border: 1px solid #d0d5dd;
}

.deals-item-b-r {
    margin-left: 20px;
}

.deals-item-item span {
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #262626;
}

.deals-item-name {

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #1D2939;
    cursor: pointer;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

}

.deals-item-posted {
    font-size: 14px;
    font-family: Inter;
    color: #667085;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.deals-item-actions {
    margin: 25px 14px 20px 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.deals-item-actions span{
    color:  #667085;
    font-size: 14px;
    font-family: Inter;
}

.deals-pagination {
    padding: 40px;
    display: flex;
    justify-content: center;
}



.xll-tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 12px;
    padding: 4px 8px;
    gap: 2px;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
}

.xll-tag-1 {
    color: #F79009;
    background: #FFFAEB;
}

.xll-tag-2 {
    color: #12B76A;
    background: #ECFDF3;
}


.xll-tag-3 {
    color: #F04438;
    background: #FEF3F2;
}

.xll-tag-application{
    cursor: pointer;
    background: #E6E1FF;
    border-radius: 4px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    text-decoration-line: underline;
    color: #344054;
}

.job-pagination {
    margin-top: 60px;
    display: flex;
    justify-content: center;
}

.read-star {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: red;
    top: 10px;
    right: 19px;
}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {



}
</style>
