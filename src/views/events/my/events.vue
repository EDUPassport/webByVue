<template>
    <div>
        <el-scrollbar class="my-events-bg" always>

            <div class="content-container">
                <div class="l-container">
                    <event-filter-component @search="confirmFilterSearch"></event-filter-component>
                </div>
                <div class="r-container">
                    <div class="event-loading-container" v-loading="eventLoadingStatus">

                        <template v-if="eventEmptyStatus">
                            <el-empty style="height: 100%;"
                                      :image="emptyImage"
                                      :image-size="456"
                                      description="You have not posted an event">
                                <el-button icon="plus" type="primary" @click="turnToPostEvent()">
                                    Post Event
                                </el-button>
                            </el-empty>
                        </template>
                        <template v-else>
                            <div class="events-list-container">

                                <div class="events-item" v-for="(item,i) in eventsList" :key="i">

                                    <div class="events-item-share">
                                        <el-button icon="share" circle @click="shareEvent(item)"></el-button>
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

                                        <div class="events-item-b-l">
                                            <div class="events-item-b-month">
                                                {{ $filters.monthFormatEvent(item.date) }}
                                            </div>
                                            <div class="events-item-b-day">
                                                {{ $filters.dayFormatEvent(item.date) }}
                                            </div>
                                        </div>
                                        <div class="events-item-b-r">
                                            <div>
                                                <template v-if="item.is_publish == 1">
                                                    <span class="xll-tag xll-tag-1" v-if="item.status == 0">
                                                        <el-icon style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Approval Pending</span>
                                                    <span class="xll-tag xll-tag-3" v-if="item.status == 2">
                                                        <el-icon style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Not Approved</span>
                                                    <span class="xll-tag xll-tag-3" v-if="item.status == 5">
                                                        <el-icon style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Canceled</span>
                                                    <span class="xll-tag"></span>
                                                </template>
                                                <template v-else>
                                                    <span class="xll-tag xll-tag-2"><el-icon style="margin-right: 2px;"><IconElOkCircle/></el-icon>Unpublished</span>
                                                </template>

                                            </div>
                                            <div class="events-item-name">
                                                {{ item.name }}
                                            </div>
                                            <div class="events-item-desc">
                                                {{ item.desc }}
                                            </div>


                                        </div>

                                    </div>

                                    <div class="events-item-action-container">
                                        <el-button plain @click="previewEvent(item)">Preview</el-button>
                                        <el-button plain type="primary" @click="editListing(item)">Edit Listing</el-button>
                                    </div>

                                </div>

                            </div>
                            <div class="events-pagination" v-if="eventTotalNum">
                                <el-pagination layout="prev, pager, next"
                                               :default-current-page="1"
                                               @size-change="eventPageSizeChange"
                                               @current-change="eventPageChange"
                                               :current-page="eventPage" :page-size="eventLimit"
                                               :total="eventTotalNum"></el-pagination>
                            </div>

                        </template>
                    </div>

                </div>

            </div>

        </el-scrollbar>

        <event-detail :visible="eventDetailVisible"
                      :data="eventDetailData"
                      :show-cancel="true"
                      from="my-events"
                      @cancel-success="cancelEventSuccess"
                      @delete-success="deleteEventSuccess"
                      @un-publish-success="unPublishEventSuccess"
                      @publish-success="publishEventSuccess"
                      @close="eventDetailVisible=false">
        </event-detail>
        <share-card-theme-two :visible="shareDialogVisible"
                   share-title="Share something exciting"
                   :title="shareInfo.title"
                   :description="shareInfo.desc"
                   :quote="shareInfo.desc"
                   :url="shareLocationUrl"
                   @close="shareDialogVisible=false"
        >
        </share-card-theme-two>

    </div>
</template>

<script setup>
import {EVENT_VISITOR_DETAIL, EVENTS_MY_EVENT} from '@/api/api';
// import {encode} from 'js-base64'
import {updateWindowHeight} from "@/utils/tools";
import {ref, onMounted, onUnmounted} from 'vue'
import {useRouter} from 'vue-router'
import emptyImage from "@/assets/newHome/dashboard/empty.svg";
import ShareCardThemeTwo from "@/components/shareCardThemeTwo.vue";
import {ElLoading} from 'element-plus'

const router = useRouter()

const eventsList = ref([])
const eventPage = ref(1)
const eventLimit = ref(6)
const eventTotalNum = ref(0)

const eventLoadingStatus = ref(false)
const eventEmptyStatus = ref(false)

const eventDetailData = ref({})

const eventDetailVisible = ref(false)

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


const previewEvent = (item) => {
    // eventDetailVisible.value = true
    // eventDetailData.value = item
    getEventDetailById(item.id)

}

const getEventDetailById = (id)=>{
    const loading = ElLoading.service({
        text:'loading'
    })
    let params = {
        event_id:id
    }
    EVENT_VISITOR_DETAIL(params).then(res=>{
        eventDetailData.value = res.message
        eventDetailVisible.value = true
        loading.close()
    }).catch(err=>{
        console.log(err)
        loading.close()
    })
}

const eventPageSizeChange = (e) => {
    console.log(e)
}

const eventPageChange = (e) => {
    eventPage.value = e
    getMyEvents(e, eventLimit.value)
}

const filterResultData = ref({})
const confirmFilterSearch = (e) => {
    filterResultData.value = e;
    eventPage.value = 1;
    getMyEvents(eventPage.value, eventLimit.value)
}

const getMyEvents = (page, limit) => {
    eventLoadingStatus.value = true;

    let paramsA = {
        page: page,
        limit: limit
    }

    let filterResult = filterResultData.value;

    let params = Object.assign(paramsA, filterResult)

    EVENTS_MY_EVENT(params).then(res => {

        if (res.code == 200) {
            eventsList.value = res.message.data
            eventTotalNum.value = res.message.total
            eventLoadingStatus.value = false
            eventEmptyStatus.value = res.message.total <= 0;

        }

    }).catch(err => {
        console.log(err)
        eventLoadingStatus.value = false
        eventEmptyStatus.value = true
    })

}

const editListing = (item)=>{
    router.push({path: '/events/post', query: {id: item.id}})
}

const cancelEventSuccess = ()=>{
    eventDetailVisible.value = false
    getMyEvents(eventPage.value, eventLimit.value)
}

const deleteEventSuccess = ()=>{
    eventDetailVisible.value = false
    getMyEvents(eventPage.value, eventLimit.value)
}

const unPublishEventSuccess = ()=>{
    getMyEvents(eventPage.value , eventLimit.value)
    eventDetailVisible.value = false
}

const publishEventSuccess = ()=>{
    getMyEvents(eventPage.value , eventLimit.value)
    eventDetailVisible.value = false
}

const turnToPostEvent = ()=>{
    router.push({path:'/events/post'})
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

    getMyEvents(eventPage.value, eventLimit.value)

})

onUnmounted(() => {
    updateWindowHeight()
    window.onresize = null
})

</script>

<style scoped>
.my-events-bg {
    background-color: #FFFFFF;
    height: calc(var(--i-window-height) - 120px);
}

.content-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 40px 40px 40px;
}

.l-container {
    width: 290px;
}

.r-container {
    width: calc(100% - 314px);
}

.event-loading-container{
    min-height: 300px;
    height: calc(var(--i-window-height) - 120px);
}

.events-list-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.events-item {
    width: calc((100% - 48px) / 2);
    min-width: 290px;
    margin-right: 17px;
    margin-bottom: 16px;
    overflow: hidden;

    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
    position: relative;
}

.events-item-share {
    position: absolute;
    right: 20px;
    top: 13px;
    z-index: 100;
}

.events-item:nth-child(2n) {
    margin-right: 0;
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
    margin: 16px 24px 0 24px;
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

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

}

.events-item-action-container {
    margin: 16px 24px 30px 24px;
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

.xll-tag {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: max-content;
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
    color: #6648FF;
    background: #E6E1FF;
}

.xll-tag-3 {
    color: #F04438;
    background: #FEF3F2;
}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {
    .content-container{
        margin: 20px;
    }
    .l-container{
        display: none;
    }
    .r-container{
        width: 100%;
    }

    .events-item{
        width: 100%;
        margin-right: 0;
    }


}


</style>
