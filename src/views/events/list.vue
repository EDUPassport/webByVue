<template>
    <div class="events-bg">
        <el-scrollbar class="events-container" always>
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
                    <eventFilterComponent
                        @search="confirmFilterSearch"
                    >
                    </eventFilterComponent>
                </div>

                <div class="content-list">

                    <el-tabs v-model="activeEventStyleName" @tab-change="eventTabChange">
                        <el-tab-pane label="Featured Events" name="featured_events">

                            <div v-loading="featuredEventsLoadingStatus">
                                <template v-if="featuredEventsEmptyStatus">
                                    <el-empty style="height: 100%;"
                                              :image="emptyImage"
                                              :image-size="456"
                                              description="Oh Sorry, There are no upcoming events">
                                    </el-empty>
                                </template>
                                <template v-else>
                                    <div class="events-list-container" >

                                        <div :class="token ? 'events-item-token' : 'events-item'"
                                             v-for="(item,i) in featuredEventsList" :key="i">

                                            <div class="events-item-share">
                                                <el-button icon="share" circle  @click="shareEvent(item)"></el-button>

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

                                            <div class="events-item-t">
                                                <template v-if="item.file_type === 'image' ">
                                                    <el-image class="events-item-banner"
                                                              fit="cover"
                                                              :preview-src-list="[item.file]"
                                                              :src="item.file !='' ? item.file : '' "
                                                    >
                                                    </el-image>
                                                </template>
                                                <template v-else-if="item.file_type === 'video' ">
                                                    <video style="width: 100%;" :src="item.file" controls ></video>
                                                </template>
                                                <template v-else>
                                                    <el-image class="events-item-banner"
                                                              fit="cover"
                                                              :preview-src-list="[item.file]"
                                                              :src="item.file !='' ? item.file : '' "
                                                    >
                                                    </el-image>
                                                </template>
                                            </div>
                                            <div class="events-item-b">

                                                <div class="events-item-b-l" @click="previewEvent(item)">
                                                    <div class="events-item-b-month">
                                                        {{$filters.monthFormatEvent(item.date) }}
                                                    </div>
                                                    <div class="events-item-b-day">
                                                        {{$filters.dayFormatEvent(item.date)}}
                                                    </div>
                                                </div>
                                                <div class="events-item-b-r">

                                                    <div class="events-item-name" @click="previewEvent(item)">
                                                        {{ item.name }}
                                                    </div>
                                                    <div class="events-item-desc" @click="previewEvent(item)">
                                                        {{ item.desc }}
                                                    </div>
                                                    <div class="events-item-posted" v-if="!token">
                                                        Posted by {{ item.company_name }}
                                                    </div>
                                                    <div class="events-item-identity" v-if="!token">
                                                        <span v-if="item.identity == 1">Educator</span>
                                                        <span v-if="item.identity == 2">Recruiter</span>
                                                        <span v-if="item.identity == 3">School</span>
                                                        <span v-if="item.identity == 4">Other</span>
                                                        <span v-if="item.identity == 5">Vendor</span>
                                                    </div>
                                                    <div class="events-item-action-container">
                                                        <el-button type="primary"
                                                                   @click="reserveSpot(item)">
                                                            Reserve Spot
                                                        </el-button>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </template>

                            </div>

                        </el-tab-pane>

                        <el-tab-pane label="All Events" name="all_events">

                            <div v-loading="allEventsLoadingStatus">
                                <template v-if="allEventsEmptyStatus">
                                    <el-empty style="height: 100%;"
                                              :image="emptyImage"
                                              :image-size="456"
                                              description="Oh Sorry, There are no upcoming events">
                                    </el-empty>
                                </template>
                                <template v-else>
                                    <div class="events-list-container" >

                                        <div :class="token ? 'events-item-token' : 'events-item'"
                                             v-for="(item,i) in eventsList" :key="i"
                                        >
                                            <div class="events-item-share">
                                                <el-button icon="share" circle  @click="shareEvent(item)"></el-button>

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

                                            <div class="events-item-t">

                                                <template v-if="item.file_type === 'image' ">
                                                    <el-image class="events-item-banner"
                                                              fit="cover"
                                                              :preview-src-list="[item.file]"
                                                              :src="item.file !='' ? item.file : '' "
                                                    >
                                                    </el-image>
                                                </template>
                                                <template v-else-if="item.file_type === 'video' ">
                                                    <video style="width: 100%;" :src="item.file" controls ></video>
                                                </template>
                                                <template v-else>
                                                    <el-image class="events-item-banner"
                                                              fit="cover"
                                                              :preview-src-list="[item.file]"
                                                              :src="item.file !='' ? item.file : '' "
                                                    >
                                                    </el-image>
                                                </template>
                                            </div>
                                            <div class="events-item-b">

                                                <div class="events-item-b-l" @click="previewEvent(item)">
                                                    <div class="events-item-b-month">{{
                                                            $filters.monthFormatEvent(item.date)
                                                        }}
                                                    </div>
                                                    <div class="events-item-b-day">{{
                                                            $filters.dayFormatEvent(item.date)
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="events-item-b-r">

                                                    <div class="events-item-name" @click="previewEvent(item)">
                                                        {{ item.name }}
                                                    </div>
                                                    <div class="events-item-desc" @click="previewEvent(item)">
                                                        {{ item.desc }}
                                                    </div>
                                                    <div class="events-item-posted" v-if="!token">
                                                        Posted by {{ item.company_name }}
                                                    </div>
                                                    <div class="events-item-identity" v-if="!token">
                                                        <span v-if="item.identity == 1">Educator</span>
                                                        <span v-if="item.identity == 2">Recruiter</span>
                                                        <span v-if="item.identity == 3">School</span>
                                                        <span v-if="item.identity == 4">Other</span>
                                                        <span v-if="item.identity == 5">Vendor</span>
                                                    </div>
                                                    <div class="events-item-action-container">
                                                        <el-button type="primary"
                                                                   @click="reserveSpot(item)">
                                                            Reserve Spot
                                                        </el-button>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                    <div class="events-pagination" v-if="eventTotalNum">
                                        <el-pagination layout="prev, pager, next"
                                                       :default-current-page="1"
                                                       @size-change="eventPageSizeChange"
                                                       @current-change="eventPageChange"
                                                       :current-page="eventPage" :page-size="eventLimit"
                                                       :total="eventTotalNum">
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

            <event-detail :visible="eventDetailVisible"
                          :data="eventDetailData"
                          @close="eventDetailVisible=false">
            </event-detail>

            <book-event-form :visible="guestSpotVisible" :info="guestSpotInfo" @close="guestSpotVisible=false"></book-event-form>

        </el-scrollbar>

    </div>

</template>

<script setup>
import emptyImage from '@/assets/newHome/dashboard/empty.svg'
import eventFilterComponent from "@/components/eventFilterComponent";
import {
    ADD_FAVORITE, CANCEL_FAVORITE, EVENTS_ADD_APPLICANTS,
    EVENTS_LIST, HOME_FEATURE_EVENT_LIST,
    USER_BROWSING_HISTORY_ADD
} from "@/api/api";

import {updateWindowHeight} from "@/utils/tools";
import {ref, onMounted, onUnmounted,computed} from 'vue'
// import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ElMessage,ElLoading} from 'element-plus'
import ShareCardThemeTwo from "@/components/shareCardThemeTwo.vue";
import BookEventForm from "@/components/bookEventForm.vue";

const store = useStore()
const token = localStorage.getItem('token')
const identity = computed(()=>store.state.identity)
const profilePercentage = computed(()=> parseInt(store.state.profilePercentage) )

// const router = useRouter()

const eventDetailVisible = ref(false)

const eventPage = ref(1)
const eventLimit = ref(6)
const eventTotalNum = ref(0)
const showLoadingStatus = ref(false)
const eventsList = ref([])

const featuredEventsList = ref([])

const eventDetailData = ref({})
const filterResultData = ref({})

const activeEventStyleName = ref('featured_events')
// const copyLink = (val) => {
//     let origin = window.location.origin
//     let locationUrl = origin + '/event/event-detail?event_id=' + val.id;
//     this.$copyText(locationUrl).then(function (e) {
//         console.log(e)
//     }, function (e) {
//         console.log(e)
//     })
// }

const featuredEventsLoadingStatus = ref(false)
const featuredEventsEmptyStatus = ref(false)
const allEventsLoadingStatus = ref(false)
const allEventsEmptyStatus = ref(false)

const eventTabChange = (e)=>{
    if(e === 'featured_events'){
        getFeaturedEventsList(1, 10000)
    }

    if(e === 'all_events'){
        getEventsList(eventPage.value, eventLimit.value)
    }
}

const addUserBrowsingHistory = (id) => {
    let params = {
        type: 3,
        type_id: id
    }
    USER_BROWSING_HISTORY_ADD(params).then(res => {
        console.log(res)

    }).catch(err => {
        console.log(err)
    })

}

const guestSpotVisible = ref(false)
const guestSpotInfo = ref({})

const reserveSpot = (item)=>{
    if(token){
        const reservedLoading = ElLoading.service({
            text:'Loading'
        })

        let uid = localStorage.getItem('uid')
        let params = {
            apply_user_id: uid,
            user_id:item.user_id,
            event_id:item.id
        }

        EVENTS_ADD_APPLICANTS(params).then(res => {

            if (res.code == 200) {

                ElMessage({
                    type: 'success',
                    message: 'Congrats!Please check your email for your coupon code',
                    grouping: true
                })
                reservedLoading.close()

                setTimeout(function (){

                    const loading = ElLoading.service({
                        text:'Redirecting'
                    })
                    setTimeout(function () {
                        loading.close()
                        window.open(item.online_url, '_blank')
                    }, 1500)

                }, 3500)


            }

        }).catch(err => {
            console.log(err)
            reservedLoading.close()
        })

    }else{
        guestSpotVisible.value = true
        guestSpotInfo.value = item;
    }

}



const confirmFilterSearch = (e) => {
    activeEventStyleName.value = 'all_events'
    filterResultData.value = e;
    eventPage.value = 1;
    getEventsList(eventPage.value, eventLimit.value)
}

const previewEvent = (item) => {
    eventDetailVisible.value = true
    eventDetailData.value = item
    let token = localStorage.getItem('token')
    if(token){
        addUserBrowsingHistory(item.id)
    }
}

const eventPageSizeChange = (e) => {
    console.log(e)
}
const eventPageChange = (e) => {
    showLoadingStatus.value = true
    eventPage.value = e
    getEventsList(e, eventLimit.value)
}

const getFeaturedEventsList = (page, limit) => {

    featuredEventsLoadingStatus.value = true
    let filterResult = filterResultData.value;

    let paramsA = {
        page: page,
        limit: limit
    }

    let params = Object.assign(paramsA, filterResult)

    HOME_FEATURE_EVENT_LIST(params).then(res => {

        if (res.code == 200) {
            featuredEventsList.value = res.message.data;
            featuredEventsLoadingStatus.value = false
            featuredEventsEmptyStatus.value = res.message.total <= 0;

        }
    }).catch(err => {
        console.log(err)
        featuredEventsLoadingStatus.value = false

    })

}

const getEventsList = (page, limit) => {

    allEventsLoadingStatus.value = true
    let filterResult = filterResultData.value;

    let paramsA = {
        page: page,
        limit: limit
    }

    let params = Object.assign(paramsA, filterResult)

    EVENTS_LIST(params).then(res => {
        
        if (res.code == 200) {
            eventsList.value = res.message.data;
            eventTotalNum.value = res.message.total;
            allEventsLoadingStatus.value = false
            if(res.message.total > 0 ){
                allEventsEmptyStatus.value = false
            }else{
                allEventsLoadingStatus.value = true
            }

        }
    }).catch(err => {
        console.log(err)
        allEventsLoadingStatus.value = false

    })

}
// const turnDetail = (id, t) => {
//      router.push({path: '/events/detail', query: {id: id, t: t}})
// }

const shareDialogVisible = ref(false)
const shareInfo = ref({})
const shareLocationUrl = ref('')
const shareEvent = (item) => {
    shareInfo.value = {
        title: item.name,
        desc: item.desc,
        id: item.id
    }

    let origin = window.location.origin
    shareLocationUrl.value = origin + '/events/detail?id=' + item.id;
    shareDialogVisible.value = true;
}

const addFavorite = (item, index,eventType) => {

    let params = {
        type: 3,
        type_id: item.id,
        type_title: item.name,
        type_url: item.company_logo
    }
    // console.log(params)
    ADD_FAVORITE(params).then(res => {
        if (res.code == 200) {
             console.log(res)
            if(eventType === 'featured'){
                featuredEventsList.value[index].is_favorite = 1
            }

            if(eventType === 'all'){
                eventsList.value[index].is_favorite = 1
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

const cancelFavorite = (item,index, eventType) => {
    let params = {
        type: 3,
        type_id: item.id
    }
    CANCEL_FAVORITE(params).then(res => {
        if (res.code == 200) {

            if(eventType === 'featured'){
                featuredEventsList.value[index].is_favorite = 0
            }

            if(eventType === 'all'){
                eventsList.value[index].is_favorite = 0
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
    getFeaturedEventsList(1, 10000)
    // getEventsList(eventPage.value, eventLimit.value)
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

.events-bg {
    width: 100%;
    /*background-color: #FFFFFF;*/
}

.events-container{
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

.events-list-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.events-item {
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

.events-item:nth-child(3n) {
    margin-right: 0;
}

.events-item-token {
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

.events-item-token:nth-child(2n) {
    margin-right: 0;
}

.events-item-share{
    position: absolute;
    right: 20px;
    top: 10px;
    z-index: 100;
}
.events-item-t {
    width: 100%;
    height: 170px;
    overflow: hidden;
}

.events-item-banner {
    width: 100%;
    height: 100%;
    /*aspect-ratio: 2 / 3;*/
    background-color: #ececec;
    cursor: pointer;
}

.events-item-b {
    margin: 16px 24px 33px 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.events-item-b-l {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 50px;
}

.events-item-b-month {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: #6648FF;
}

.events-item-b-day {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    color: #1D2939;

}

.events-item-b-r {
    width: calc(100% - 70px);
}

.events-item-item span {
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #262626;
}

.events-item-desc {
    min-height: 40px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #667085;
    cursor: pointer;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

}

.events-item-name {

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

.events-item-posted {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    color: #1D2939;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.events-item-identity {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 140%;
    color: #667085;

}

.events-item-see-more {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;

    text-decoration-line: underline;
    color: #6648FF;
    cursor: pointer;

}

.events-item-action-container {
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

}

.events-pagination {
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
    .events-list-col {
        padding-left: 0;

    }

    .empty-post-event-btn-container {
        padding: 15px;
    }

    .events-list-bg-container {
        height: calc(var(--i-window-height) - 180px);
        padding: 0;
        background-color: #FFFFFF;
    }

    .events-list-container {
        flex-direction: column;
    }


    .events-item {
        margin: 15px;
    }

    .events-item-t {
        max-height: 170px;
    }

    .events-item-banner {
        aspect-ratio: auto;
        height: 100%;
    }

    .events-item-b {
        padding: 15px;
    }

    .events-item-item span {
        font-size: 12px;
    }

    .events-item-name {
        margin-top: 15px;
        font-size: 18px;
        height: auto;
    }

    .events-item-desc {
        margin-top: 15px;
        font-size: 14px;
    }


}

</style>
