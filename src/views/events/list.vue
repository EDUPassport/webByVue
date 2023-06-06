<template>
    <div class="events-bg">

        <div class="banner-row">
            <el-carousel style="width: 100%" trigger="click" height="200px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <el-image
                            src="https://cdn.staticaly.com/gh/unilei/picx-images-hosting@master/20230531/kkpansBanner.4nqwuipdtbs0.webp">
                    </el-image>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="content-row">

            <el-affix :offset="160">
                <div class="content-filter">
                    <eventFilterComponent
                            :locationData="locationOptions"
                            :tagsData="tagsData"
                            :categoryData="categoryOptions"
                            @search="confirmFilterSearch"
                    >
                    </eventFilterComponent>
                </div>
            </el-affix>

            <div class="content-list">

                <el-tabs  v-model="activeEventStyleName">
                    <el-tab-pane label="Featured Events" name="featured_events">
                        <template v-if="eventTotalNum > 0">

                            <div class="events-list-container">

                                <div class="events-item"  v-for="(item,i) in eventsList" :key="i">
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
                                            <!--                                        <div class="events-item-item">-->
                                            <!--                                            <el-space :size="5" wrap spacer="·">-->
                                            <!--                                                <span>{{ $filters.ymdFormatEvent(item.date) }}</span>-->
                                            <!--                                                <span>{{ $filters.timeFormatEvent(item.start_time, item.end_time) }}</span>-->
                                            <!--                                                <span v-if="item.is_online == 1">online</span>-->
                                            <!--                                                <span v-if="item.is_online == 2">offline</span>-->
                                            <!--                                                <span v-if="item.is_online == 3">both</span>-->
                                            <!--                                            </el-space>-->
                                            <!--                                        </div>-->

                                            <div class="events-item-name" @click="showEventDialog(item)">
                                                {{ item.name }}
                                            </div>
                                            <div class="events-item-desc">
                                                {{ item.desc }}
                                            </div>
                                            <div class="events-item-posted">
                                                Posted by {{ item.company_name }}
                                            </div>
                                            <div class="events-item-identity">
                                                <span v-if="item.identity == 1">Educator</span>
                                                <span v-if="item.identity == 2">Recruiter</span>
                                                <span v-if="item.identity == 3">School</span>
                                                <span v-if="item.identity == 4">Other</span>
                                                <span v-if="item.identity == 5">Vendor</span>
                                            </div>
                                            <div class="events-item-see-more">
                                                See more
                                            </div>
                                            <!--                                        <div class="events-item-action-container">-->
                                            <!--                                            <div class="events-item-action-l">-->
                                            <!--                                                <div class="share-r">-->
                                            <!--                                                    <el-popover-->
                                            <!--                                                        placement="top-start"-->
                                            <!--                                                        :width="40"-->
                                            <!--                                                        trigger="click"-->
                                            <!--                                                        content="link copied!"-->
                                            <!--                                                    >-->
                                            <!--                                                        <template #reference>-->
                                            <!--                                                            <el-button link @click="copyLink(item)">-->
                                            <!--                                                                <el-icon :size="20">-->
                                            <!--                                                                    <IconAntDesignLinkOutlined/>-->
                                            <!--                                                                </el-icon>-->
                                            <!--                                                                Copy Link-->
                                            <!--                                                            </el-button>-->
                                            <!--                                                        </template>-->
                                            <!--                                                    </el-popover>-->
                                            <!--                                                </div>-->
                                            <!--                                            </div>-->
                                            <!--                                            <div class="events-item-action-r">-->
                                            <!--                                                <el-button link @click="showBookEvent(item)">-->
                                            <!--                                                    <el-icon :size="20">-->
                                            <!--                                                        <CollectionTag/>-->
                                            <!--                                                    </el-icon>-->
                                            <!--                                                    Rsvp-->
                                            <!--                                                </el-button>-->
                                            <!--                                            </div>-->

                                            <!--                                        </div>-->

                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div class="events-pagination">
                                <el-pagination layout="prev, pager, next"
                                               :default-current-page="1"
                                               @size-change="eventPageSizeChange"
                                               @current-change="eventPageChange"
                                               :current-page="eventPage" :page-size="eventLimit"
                                               :total="eventTotalNum"></el-pagination>
                            </div>

                        </template>

                        <template v-else>
                            <div class="empty-post-event-btn-container">
                                <el-button type="primary" round @click="postEventWhenEmpty()">
                                    Post an Event
                                </el-button>
                            </div>
                            <el-empty v-if="loadingEvent" style="height: 100%;" description="loading......"></el-empty>
                            <el-empty v-else style="height: 100%;"
                                      description="Sorry, there are no upcoming events at the moment..."></el-empty>
                        </template>
                    </el-tab-pane>

                    <el-tab-pane label="All Events" name="all_events">
                        <template v-if="eventTotalNum > 0">

                            <div class="events-list-container">

                                <div class="events-item"  v-for="(item,i) in eventsList" :key="i">
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

                                            <div class="events-item-name" @click="showEventDialog(item)">
                                                {{ item.name }}
                                            </div>
                                            <div class="events-item-desc">
                                                {{ item.desc }}
                                            </div>
                                            <div class="events-item-posted">
                                                Posted by {{ item.company_name }}
                                            </div>
                                            <div class="events-item-identity">
                                                <span v-if="item.identity == 1">Educator</span>
                                                <span v-if="item.identity == 2">Recruiter</span>
                                                <span v-if="item.identity == 3">School</span>
                                                <span v-if="item.identity == 4">Other</span>
                                                <span v-if="item.identity == 5">Vendor</span>
                                            </div>
                                            <div class="events-item-see-more">
                                                See more
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div class="events-pagination">
                                <el-pagination layout="prev, pager, next"
                                               :default-current-page="1"
                                               @size-change="eventPageSizeChange"
                                               @current-change="eventPageChange"
                                               :current-page="eventPage" :page-size="eventLimit"
                                               :total="eventTotalNum"></el-pagination>
                            </div>

                        </template>

                        <template v-else>
                            <div class="empty-post-event-btn-container">
                                <el-button type="primary" round @click="postEventWhenEmpty()">
                                    Post an Event
                                </el-button>
                            </div>
                            <el-empty v-if="loadingEvent" style="height: 100%;" description="loading......"></el-empty>
                            <el-empty v-else style="height: 100%;"
                                      description="Sorry, there are no upcoming events at the moment..."></el-empty>
                        </template>
                    </el-tab-pane>
                </el-tabs>

            </div>

        </div>

        <eventDetailCard :info="eventDetailData"
                         :visible="eventDialogVisible"
                         @rsvp="showBookEvent"
                         @close="eventDialogVisible=false">
        </eventDetailCard>
        <bookEventForm :visible="bookEventDialogVisible"
                       :info="eventDetailData"
                       @close="bookEventDialogVisible=false">
        </bookEventForm>

        <BookEventList :visible="bookListDialogVisible"
                       :info="bookedListData"
                       @close="bookListDialogVisible=false"
        >
        </BookEventList>


    </div>
</template>

<script setup>
import eventFilterComponent from "@/components/eventFilterComponent";
import {
    EVENT_LOCATION_LIST,
    EVENTS_CATEGORY,
    EVENTS_LIST,
    TAGS_LIST,
    USER_BROWSING_HISTORY_ADD
} from "@/api/api";
import eventDetailCard from "@/components/eventDetailCard";
import bookEventForm from "@/components/bookEventForm";
import BookEventList from "@/components/bookEventList";
import {updateWindowHeight} from "@/utils/tools";
import {ref,onMounted, onUnmounted} from 'vue'
import {useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'

const loadingEvent = ref(false)
const eventPage = ref(1)
const eventLimit = ref(6)
const eventTotalNum = ref(0)
const showLoadingStatus = ref(false)
const eventsList = ref([])

const categoryOptions = ref([])

const locationOptions = ref([])

const tagsData = ref([])

const eventDialogVisible = ref(false)
const eventDetailData = ref({})
const filterResultData = ref({})
const bookEventDialogVisible = ref(false)
const bookListDialogVisible = ref(false)
const bookedListData =  ref([])

const router = useRouter()

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
const getEventLocationList = () => {
    let params = {}
    EVENT_LOCATION_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
             locationOptions.value = res.message;
        }
    }).catch(err => {
        console.log(err)
    })
}
const showBookEvent = (item) => {
     addUserBrowsingHistory(item.id)

    if (item.online_url) {
        window.open(item.online_url, '_blank')
    } else {
        eventDetailData.value = item
        bookEventDialogVisible.value = true
    }

}
// const showBookList = (item) => {
//     bookListDialogVisible.value = true
//
//     let params = {
//         event_id: item.id
//     }
//
//     EVENT_APPLICATIONS(params).then(res => {
//         if (res.code == 200) {
//             bookedListData.value = res.message.data;
//         }
//     }).catch(err => {
//         console.log(err)
//     })
//
// }
const confirmFilterSearch = (e) => {
    filterResultData.value = e;
    eventPage.value = 1;
    getEventsList(eventPage.value, eventLimit.value)
}
const showEventDialog = (item) => {
    // console.log(item)
    eventDetailData.value = item;
    eventDialogVisible.value = true;
    addUserBrowsingHistory(item.id)
}

const getEventTags = () => {
    let params = {
        type: 2,
        page: 1,
        limit: 10000
    }
    TAGS_LIST(params).then(res => {
        if (res.code == 200) {
            tagsData.value = res.message.data;
        }
    }).catch(err => {
        console.log(err)
    })
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
        ElMessage({
            type:'error',
            message:err,
            grouping:true
        })
    })
}

const eventPageSizeChange = (e) => {
    console.log(e)
}
const eventPageChange = (e) => {
     showLoadingStatus.value = true
     eventPage.value = e
     getEventsList(e, eventLimit.value)
}
const getEventsList = (page, limit) => {

    loadingEvent.value = true
    let filterResult = filterResultData.value;

    let paramsA = {
        page: page,
        limit: limit
    }

    let params = Object.assign(paramsA, filterResult)

    EVENTS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
             eventsList.value = res.message.data;
             eventTotalNum.value = res.message.total;
             showLoadingStatus.value = false
            loadingEvent.value = false

        }
    }).catch(err => {
        console.log(err)
    })

}
// const turnDetail = (id, t) => {
//      router.push({path: '/events/detail', query: {id: id, t: t}})
// }
const postEventWhenEmpty = () => {
    let token = localStorage.getItem('token')

    if (token) {

         router.push({path: '/events/post'})

    } else {

         router.push({path: '/post-event', query: {}})

    }

}


onMounted(()=>{
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
    getEventLocationList()
    getEventCategories()
    getEventTags()
    getEventsList(eventPage.value, eventLimit.value)
})

onUnmounted(()=>{
    updateWindowHeight()
    window.onresize = null
})

</script>

<style scoped>

/deep/ .el-tabs__item{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #98A2B3;
}
/deep/ .el-tabs__item.is-active{
    color: #6648FF;
}

/deep/ .el-tabs__active-bar{
    background-color: #6648FF;
}

.events-bg {
    width: 100%;
    max-width: 1440px;
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
    width: calc( (100% - 48px) /3);
    min-width: 290px;
    margin-right: 20px;
    margin-bottom: 30px;
    overflow: hidden;

    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
}

.events-item:nth-child(3n){
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
