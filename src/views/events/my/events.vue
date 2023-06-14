<template>
    <div>
        <el-scrollbar class="my-events-bg" always>

            <div class="content-container">
                <div class="l-container">
                    <event-filter-component></event-filter-component>
                </div>
                <div class="r-container">
                    <div class="events-list-container" >

                        <div class="events-item" v-for="(item,i) in eventsList" :key="i">

                            <div class="events-item-share">
                                <el-button link>
                                    <el-image :src="eventsShareIcon"></el-image>
                                </el-button>
                            </div>

                            <div class="events-item-t">
                                <el-image class="events-item-banner"
                                          fit="cover"
                                          :preview-src-list="[item.file]"
                                          :src="item.file !='' ? item.file : '' "
                                >
                                </el-image>
                            </div>
                            <div class="events-item-b">

                                <div class="events-item-b-l">
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
                                    <div>
                                        <span class="xll-tag xll-tag-1" v-if="item.status == 0" ><el-icon style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Approval Pending</span>
                                        <span class="xll-tag xll-tag-2" v-if="item.status == 3" ><el-icon style="margin-right: 2px;"><IconElOkCircle/></el-icon>Unpublished</span>
                                        <span class="xll-tag xll-tag-3" v-if="item.status == 2"><el-icon style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Not Approved</span>
                                    </div>
                                    <div class="events-item-name" @click="showEventDialog(item)">
                                        {{ item.name }}
                                    </div>
                                    <div class="events-item-desc">
                                        {{ item.desc }}
                                    </div>


                                </div>

                            </div>

                            <div class="events-item-action-container">
                                <el-button plain @click="previewEvent(item)" >Preview</el-button>
                                <el-button plain type="primary">Edit Listing</el-button>
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

                </div>

            </div>

            <bookEventForm :visible="bookEventDialogVisible"
                           :info="eventDetailData"
                           @close="bookEventDialogVisible=false">
            </bookEventForm>

            <BookEventList :visible="bookListDialogVisible"
                           :info="bookedListData"
                           @close="bookListDialogVisible=false"
            >
            </BookEventList>

        </el-scrollbar>

        <event-detail :visible="eventDetailVisible" :data="eventDetailData" @close="eventDetailVisible=false"></event-detail>
    </div>
</template>

<script setup>
import eventsShareIcon from '@/assets/newHome/events-share-icon.svg'
import bookEventForm from "@/components/bookEventForm";
import BookEventList from "@/components/bookEventList";
import {EVENTS_MY_EVENT, EVENTS_CATEGORY} from '@/api/api';
// import {encode} from 'js-base64'
import {updateWindowHeight} from "@/utils/tools";
import {ref, onMounted, onUnmounted} from 'vue'
// import {useRouter} from 'vue-router'

// const router = useRouter()

const eventsList = ref([])
const eventPage = ref(1)
const eventLimit = ref(6)
const eventTotalNum = ref(0)

const categoryId = ref('')

const categoryOptions = ref([])
const eventDialogVisible = ref(false)
const eventDetailData = ref({})
const bookEventDialogVisible = ref(false)
const bookListDialogVisible = ref(false)
const bookedListData = ref([])

const eventDetailVisible = ref(false)

const previewEvent = (item)=>{
    eventDetailVisible.value = true
    eventDetailData.value = item
}

// const editEvent = (item) => {
//     router.push({path: '/events/post', query: {id: item.id}})
// }
// const showBookList = (item) => {
//     bookListDialogVisible.value = true;
//     let params = {
//         event_id: item.id
//     }
//     EVENT_APPLICATIONS(params).then(res => {
//         console.log(res)
//         if (res.code == 200) {
//             bookedListData.value = res.message.data;
//         }
//     }).catch(err => {
//         console.log(err)
//     })
// }
const showEventDialog = (item) => {
    eventDetailData.value = item;
    eventDialogVisible.value = true;
}

const getEventCategories = () => {
    let params = {
        page: 1,
        limit: 10000
    }
    EVENTS_CATEGORY(params).then(res => {
        categoryOptions.value = res.message.data;
    }).catch(err => {
        console.log(err)
    })
}


const eventPageSizeChange = (e) => {
    console.log(e)
}

const eventPageChange = (e) => {
    eventPage.value = e
    getMyEvents(e,  eventLimit.value)
}

const getMyEvents = (page, limit) => {
    let params = {
        page: page,
        limit: limit
    }

    if ( categoryId.value) {
        params.category_id = categoryId.value
    }

    EVENTS_MY_EVENT(params).then(res => {

        if (res.code == 200) {
             eventsList.value = res.message.data
            // console.log(res.message.data)
            eventTotalNum.value = res.message.total
        } else {
            console.log(res.msg)
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

    getEventCategories()
    getMyEvents(eventPage.value, eventLimit.value)

})

onUnmounted(() => {
    updateWindowHeight()
    window.onresize = null
})

</script>

<style scoped>
.my-events-bg{
    background-color: #FFFFFF;
    height: calc(var(--i-window-height) - 120px);
}

.content-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 40px 40px 40px;
}

.l-container{
    width: 290px;
}

.r-container{
    width: calc(100% - 314px);
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

.events-item-share{
    position: absolute;
    right: 20px;
    top: 13px;
    z-index: 100;
}

.events-item:nth-child(3n) {
    margin-right: 0;
}

.events-item-t {
    width: 100%;
    height: 170px;
    overflow: hidden;
}

.events-item-banner {
    width: 100%;
    /*aspect-ratio: 2 / 3;*/
    background-color: #ececec;
    cursor: pointer;
}

.events-item-b {
    margin: 16px 24px 0 24px;
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

.events-item-name:hover {
    color: #000000;
}

.events-item-action-container {
    margin:16px 24px 30px 24px;
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
    background:  #E6E1FF;
}

.xll-tag-3 {
    color: #F04438;
    background: #FEF3F2;
}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {


}


</style>
