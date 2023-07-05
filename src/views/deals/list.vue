<template>
    <div class="deals-bg">
        <el-scrollbar class="deals-container" always>
            <un-complete-profile-prompt
                :percent="profilePercentage"
                tips="Get started and complete your profile to post an event"
                v-if="(identity == 1 && profilePercentage <= 80 ) || (identity == 2 && profilePercentage <= 60) || (identity == 5 && profilePercentage <= 60)">
            </un-complete-profile-prompt>

            <div class="banner-row" :class="token ? 'banner-row-token' : ''" >
                <el-carousel style="width: 100%" trigger="click" height="200px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <el-image
                            src="https://cdn.staticaly.com/gh/unilei/picx-images-hosting@master/20230531/kkpansBanner.4nqwuipdtbs0.webp">
                        </el-image>
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="content-row" :class="token ? 'content-row-token' : ''" >

                <div class="content-filter">
                    <dealFilterComponent
                        @search="confirmFilterSearch"
                    ></dealFilterComponent>
                </div>

                <div class="content-list">

                    <el-tabs v-model="activeTabName" @tab-change="dealsTabChange">

                        <el-tab-pane label="Featured Deals" name="featured_deals">

                            <div v-loading="featuredDealsLoadingStatus">
                                <template v-if="featuredDealsEmptyStatus">
                                    <el-empty style="height: 100%;"
                                              :image="emptyImage"
                                              :image-size="456"
                                              description="Oh Sorry, There are no upcoming events">
                                    </el-empty>
                                </template>
                                <template v-else>
                                    <div class="deals-list-container" >

                                        <div :class="token ? 'deals-item-token' : 'deals-item'"
                                             v-for="(item,i) in featuredDealsList" :key="i">

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

                                </template>

                            </div>

                        </el-tab-pane>

                        <el-tab-pane label="All Deals" name="all_deals">

                            <div v-loading="allDealsLoadingStatus">
                                <template v-if="allDealsEmptyStatus">
                                    <el-empty style="height: 100%;"
                                              :image="emptyImage"
                                              :image-size="456"
                                              description="Oh Sorry, There are no upcoming events">
                                    </el-empty>
                                </template>
                                <template v-else>
                                    <div class="deals-list-container" >

                                        <div :class="token ? 'deals-item-token' : 'deals-item'"
                                             v-for="(item,i) in dealsList" :key="i"
                                        >
                                            <div class="deals-item-share">
                                                <el-button icon="share" circle  @click="shareDeal(item)"></el-button>

                                                <template v-if="item.is_favorite">
                                                    <el-button circle @click="cancelFavorite(item,i,'all')">
                                                        <el-icon :size="14">
                                                            <IconFlatColorIconsLike/>
                                                        </el-icon>
                                                    </el-button>
                                                </template>
                                                <template v-else>
                                                    <el-button circle   @click="addFavorite(item,i,'all')">
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

            </div>

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

        </el-scrollbar>

    </div>

</template>

<script setup>
import emptyImage from '@/assets/newHome/dashboard/empty.svg'
import {
    ADD_FAVORITE, CANCEL_FAVORITE, DEALS_LIST, FEATURED_DEALS_LIST,
    USER_BROWSING_HISTORY_ADD
} from "@/api/api";

import {updateWindowHeight} from "@/utils/tools";
import {ref, onMounted, onUnmounted,computed} from 'vue'
// import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ElMessage} from 'element-plus'
import ShareCardThemeTwo from "@/components/shareCardThemeTwo.vue";
import dealDetailCard from "@/components/dealDetailCard.vue";
import dealFilterComponent from "@/components/dealFilterComponent.vue";

const store = useStore()

const identity = computed(()=>store.state.identity)
const profilePercentage = computed(()=> parseInt(store.state.profilePercentage) )

// const router = useRouter()

const dealDetailVisible = ref(false)
const dealIndex = ref(null)

const dealsPage = ref(1)
const dealsLimit = ref(6)
const dealsTotalNum = ref(0)
const showLoadingStatus = ref(false)
const dealsList = ref([])

const featuredDealsList = ref([])

const dealDetailData = ref({})
const filterResultData = ref({})

const activeTabName = ref('featured_deals')

const featuredDealsLoadingStatus = ref(false)
const featuredDealsEmptyStatus = ref(false)
const allDealsLoadingStatus = ref(false)
const allDealsEmptyStatus = ref(false)

const token = localStorage.getItem('token')

const dealsTabChange = (e)=>{
    if(e === 'featured_deals'){
        featuredDealsLoadingStatus.value = true
        getFeaturedDealsList(1, 10000)
    }

    if(e === 'all_deals'){
        allDealsLoadingStatus.value = true
        getDealsList(dealsPage.value, dealsLimit.value)
    }
}

const addUserBrowsingHistory = (id) => {
    let params = {
        type: 2,
        type_id: id
    }
    USER_BROWSING_HISTORY_ADD(params).then(res => {
        console.log(res)

    }).catch(err => {
        console.log(err)
    })

}

const confirmFilterSearch = (e) => {
    activeTabName.value = 'all_deals'
    filterResultData.value = e;
    dealsPage.value = 1;
    getDealsList(dealsPage.value, dealsLimit.value)
}

const previewDeal = (item,i) => {
    dealDetailVisible.value = true
    dealIndex.value = i
    dealDetailData.value = item
    let token = localStorage.getItem('token')
    if(token){
        addUserBrowsingHistory(item.id)
    }
}

const dealsPageSizeChange = (e) => {
    console.log(e)
}
const dealsPageChange = (e) => {
    showLoadingStatus.value = true
    dealsPage.value = e
    getDealsList(e, dealsLimit.value)
}

const getFeaturedDealsList = (page, limit) => {

    featuredDealsLoadingStatus.value = true
    let filterResult = filterResultData.value;

    let paramsA = {
        page: page,
        limit: limit
    }

    let params = Object.assign(paramsA, filterResult)

    FEATURED_DEALS_LIST(params).then(res => {

        if (res.code == 200) {
            featuredDealsList.value = res.message;
            featuredDealsLoadingStatus.value = false
            featuredDealsEmptyStatus.value = res.message.total <= 0;

        }
    }).catch(err => {
        console.log(err)
        featuredDealsLoadingStatus.value = false

    })

}

const getDealsList = (page, limit) => {

    allDealsLoadingStatus.value = true
    let filterResult = filterResultData.value;

    let paramsA = {
        page: page,
        limit: limit
    }

    let params = Object.assign(paramsA, filterResult)

    DEALS_LIST(params).then(res => {

        if (res.code == 200) {
            dealsList.value = res.message.data;
            dealsTotalNum.value = res.message.total;
            allDealsLoadingStatus.value = false
            if(res.message.total > 0 ){
                allDealsEmptyStatus.value = false
            }else{
                allDealsLoadingStatus.value = true
            }

        }
    }).catch(err => {
        console.log(err)
        allDealsLoadingStatus.value = false

    })

}

const shareDialogVisible = ref(false)
const shareInfo = ref({})
const shareLocationUrl = ref('')
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

const addFavorite = (item, index,dealType) => {

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
            if(dealType === 'featured'){
                featuredDealsList.value[index].is_favorite = 1
            }

            if(dealType === 'all'){
                dealsList.value[index].is_favorite = 1
            }

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

const cancelFavorite = (item,index, dealType) => {
    let params = {
        type: 2,
        type_id: item.id
    }
    CANCEL_FAVORITE(params).then(res => {
        if (res.code == 200) {

            if(dealType === 'featured'){
                featuredDealsList.value[index].is_favorite = 0
            }

            if(dealType === 'all'){
                dealsList.value[index].is_favorite = 0
            }

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
    getFeaturedDealsList(1, 10000)

})

onUnmounted(() => {
    updateWindowHeight()
    window.onresize = null
})

</script>

<style scoped>

:deep(.el-tabs__item) {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #98A2B3;
}

:deep(.el-tabs__item.is-active)  {
    color: #6648FF;
}

:deep(.el-tabs__active-bar) {
    background-color: #6648FF;
}

.deals-bg {
    width: 100%;
    /*background-color: #FFFFFF;*/
}

.deals-container{
    max-width: 1440px;
    height: calc(var(--i-window-height) - 120px);
    margin: 0 auto;
    background-color: #FFFFFF;
}

.banner-row {
    margin: 0 100px;
}

.content-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 40px 100px 0 100px;
}

.banner-row-token{
    margin: 0 40px;
}

.content-row-token{
    margin: 40px;
}

.content-filter {
    width: 290px;
}

.content-list {
    width: calc(100% - 313px);
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


.empty-post-event-btn-container {
    text-align: right;
    padding: 50px;
}


@media screen and (min-width: 1200px) {


}

@media screen and (max-width: 768px) {
    .deals-list-col {
        padding-left: 0;

    }

    .empty-post-event-btn-container {
        padding: 15px;
    }

    .deals-list-bg-container {
        height: calc(var(--i-window-height) - 180px);
        padding: 0;
        background-color: #FFFFFF;
    }

    .deals-list-container {
        flex-direction: column;
    }


    .deals-item {
        margin: 15px;
    }

    .deals-item-t {
        max-height: 170px;
    }

    .deals-item-banner {
        aspect-ratio: auto;
        height: 100%;
    }

    .deals-item-b {
        padding: 15px;
    }

    .deals-item-item span {
        font-size: 12px;
    }

    .deals-item-name {
        margin-top: 15px;
        font-size: 18px;
        height: auto;
    }

    .deals-item-desc {
        margin-top: 15px;
        font-size: 14px;
    }


}

</style>