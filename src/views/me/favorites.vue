<template>
    <el-scrollbar class="favorites-bg">
        <div class="favorites">
            <el-tabs v-model="activeTabName" @tab-change="activeTabChange">
                <el-tab-pane label="Jobs" name="jobs">
                    jobs list
                </el-tab-pane>
                <el-tab-pane label="Events" name="events">

                    <div style="min-height: 300px;" v-loading="eventLoadingStatus">
                        <template v-if="eventEmptyStatus">

                            <el-empty style="height: 100%;"
                                      :image="emptyImage"
                                      :image-size="456"
                                      description="You have no favourite events">

                                <el-button type="primary" @click="turnToEvents()">See publish events</el-button>
                            </el-empty>

                        </template>
                        <template v-else>
                            <div class="events-list-container" >

                                <div class="events-item"  v-for="(item,i) in eventList" :key="i">
                                    <div class="events-item-share">
                                        <el-button icon="share" circle  @click="shareEvent(item.event_info)"></el-button>

                                        <el-button circle @click="cancelFavoriteForEvent(item)">
                                            <el-icon :size="14">
                                                <IconFlatColorIconsLike/>
                                            </el-icon>
                                        </el-button>

                                    </div>

                                    <div class="events-item-t">
                                        <el-image class="events-item-banner"
                                                  fit="cover"
                                                  :preview-src-list="[item.event_info.file]"
                                                  :src="item.event_info.file !='' ? item.event_info.file : '' "
                                        >
                                        </el-image>
                                    </div>
                                    <div class="events-item-b">

                                        <div class="events-item-b-l" @click="previewEvent(item.event_info)">
                                            <div class="events-item-b-month">{{
                                                    $filters.monthFormatEvent(item.event_info.date)
                                                }}
                                            </div>
                                            <div class="events-item-b-day">{{
                                                    $filters.dayFormatEvent(item.event_info.date)
                                                }}
                                            </div>
                                        </div>
                                        <div class="events-item-b-r">

                                            <div class="events-item-name" @click="previewEvent(item.event_info)">
                                                {{ item.event_info.name }}
                                            </div>
                                            <div class="events-item-desc" @click="previewEvent(item.event_info)">
                                                {{ item.event_info.desc }}
                                            </div>
                                            <div class="events-item-action-container" >
                                                <el-button type="primary"
                                                           @click="reserveSpot(item.event_info)">
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
                                               :current-page="eventPage"
                                               :page-size="eventLimit"
                                               :total="eventTotalNum">
                                </el-pagination>
                            </div>
                        </template>

                    </div>

                </el-tab-pane>
                <el-tab-pane label="Deals" name="deals">
                    deals list
                </el-tab-pane>
            </el-tabs>
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

        <event-detail :visible="eventDetailVisible" :data="eventDetailData"
                      @close="eventDetailVisible=false">
        </event-detail>


    </el-scrollbar>
</template>

<script setup>
import emptyImage from '@/assets/newHome/dashboard/empty.svg'
import {
    CANCEL_FAVORITE,
    EVENTS_ADD_APPLICANTS,
    GET_FAVORITE_LIST,
    USER_BROWSING_HISTORY_ADD
} from "@/api/api";
// import {encode} from 'js-base64'
import {updateWindowHeight} from "@/utils/tools";
import {ref, onMounted, onUnmounted} from 'vue'
import {ElMessage, ElLoading} from 'element-plus'
import {useRouter} from 'vue-router'
import ShareCardThemeTwo from "@/components/shareCardThemeTwo.vue";

const router = useRouter()
const eventDetailVisible = ref(false)
const eventDetailData = ref({})

const activeTabName = ref('events')

const activeTabChange = (e) => {
    console.log(e)
    if(e === 'jobs'){
        type.value = 1
    }
    if(e === 'events'){
        type.value = 3
        getFavoriteList(3, eventPage.value, eventLimit.value)
    }

    if(e === 'deals'){
        type.value = 2
    }

}

const type = ref(3)

const favoritedSortValue = ref('desc')

const eventList = ref([])
const eventPage = ref(1)
const eventLimit = ref(6)
const eventTotalNum = ref(0)
const eventLoadingStatus = ref(false)
const eventEmptyStatus = ref(false)

const eventPageSizeChange = (e)=>{
    console.log(e)
}

const eventPageChange = (e)=>{
    // console.log(e)
    eventPage.value = e;
    getFavoriteList(3,e, eventLimit.value)
}

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

const cancelFavoriteForEvent = (item) => {
    let params = {
        type: 3,
        type_id: item.type_id
    }
    CANCEL_FAVORITE(params).then(res => {
        if (res.code == 200) {
            getFavoriteList(3,eventPage.value, eventLimit.value)
        }
    }).catch(err => {
        console.log(err)
    })
}

const previewEvent = (item) => {
    eventDetailVisible.value = true
    eventDetailData.value = item
    addUserBrowsingHistory(item.id)
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

const reserveSpot = (item)=>{

    const loading = ElLoading.service({
        text:'loading...'
    })
    let params = {
        first_name: '',
        last_name: '',
        contact: '',
        bookings: 1,
        apply_user_id:localStorage.getItem('uid'),
        user_id: item.user_id,
        event_id: item.id
    }

    EVENTS_ADD_APPLICANTS(params).then(res=>{
        console.log(res)
        if(res.code === 200){
            loading.close()
            ElMessage({
                type:'success',
                message:'You have successfully reserved a spot',
                grouping:true
            })
        }
    }).catch(err=>{
        console.log(err)
        loading.close()
    })
}


// const turnDealDetail = (id) => {
//     let obj = {id: id}
//     let {href} =  router.resolve({
//         path: '/deals/detail', query: obj
//     })
//     window.open(href, '_blank')
// }
//
// const turnBusinessProfile = (info) => {
//
//     let obj = {
//         jobId: info.id,
//         uid: info.user_id,
//         i: info.identity,
//         cid: info.company_id
//     }
//     let {href} = router.resolve({
//         path: '/jobs/business/profile', query: obj
//     })
//     window.open(href, '_blank')
//
// }

// const viewEducatorDetail = (info) => {
//
//     let companyId = info.user_contact.company_id;
//     let userId = info.user_contact.id;
//
//     let obj = {
//         cid: companyId,
//         uid: userId,
//         identity: 1,
//         from: 'other'
//     }
//
//     let str = encode(JSON.stringify(obj))
//     let {href} = router.resolve({
//         path: '/educator/profile', query: {str: str}
//     })
//     window.open(href, '_blank')
//
// }


const getFavoriteList = (type, page, limit) => {

    if(type === 3){
        eventLoadingStatus.value = true
    }

    let params = {
        type:type,
        page: page,
        limit: limit
    }

    if (favoritedSortValue.value) {
        params.order_by = favoritedSortValue.value
    }

    GET_FAVORITE_LIST(params).then(res => {

        if (res.code == 200) {

            if(type === 3){
                eventList.value = res.message.data;
                eventTotalNum.value = res.message.total;
                eventLoadingStatus.value = false
                eventEmptyStatus.value = res.message.total <= 0;
            }

        }
    }).catch(err => {
        console.log(err)
        eventLoadingStatus.value = false
        eventEmptyStatus.value = true
    })

}

// const cancelFavorite = (type, typeId) => {
//     let params = {
//         type: type,
//         type_id: typeId
//     }
//     CANCEL_FAVORITE(params).then(res => {
//         if (res.code == 200) {
//             getFavoriteList()
//         }
//     }).catch(err => {
//         console.log(err)
//     })
// }

const turnToEvents = ()=>{
    router.push({path:'/events'})
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
    // 1.jobs 2.deals 3.Event 4.educator 5.recruitor 6.school 7.other 8.vendor
    if(type.value === 3){
        getFavoriteList(type.value, eventPage.value, eventLimit.value)
    }


})

onUnmounted(() => {
    updateWindowHeight()
    window.onresize = null
})


</script>

<style scoped>
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

 :deep(.el-tabs__active-bar){
     background-color: #6648FF;
 }

.favorites-bg {
    background-color: #FFFFFF;
    width: 100%;
    height: calc(var(--i-window-height) - 120px);
}

.favorites{
    margin: 0 40px 40px 40px;
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
}

.events-item-b-l {
    display: flex;
    flex-direction: column;
    align-items: center;

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
    margin-left: 20px;
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


}


</style>
