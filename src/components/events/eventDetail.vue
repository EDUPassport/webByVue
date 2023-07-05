<template>
    <div>
        <el-drawer
                :model-value="visible"
                direction="rtl"
                size="780px"
                :show-close="false"
                :with-header="false"
                @close="closeVisible"
        >
            <div class="detail-container">
                <div class="detail-t">
                    <div>
                        <el-button style="color: #344054;" link icon="back" @click="turnBack()">Back</el-button>
                    </div>
                    <div>
                        <template v-if="from === 'my-events'">
                            <el-button v-if="data.is_publish === 1 && showCancel"
                                       style="color: #344054;"
                                       link
                                       :disabled="data.status === 5"
                                       @click="cancelEvent(data)">
                                Cancel Event
                            </el-button>
                        </template>
                        <template v-if="from === 'reserved-spots' ">
                            <template v-if="rsvpCancel === 1">
                                <span class="xll-tag-spot-cancel">Event has been canceled</span>
                            </template>
                            <template v-else>
                                <template v-if="data.status === 5">
                                    <span class="xll-tag-spot-cancel">Event has been canceled by the organizer</span>
                                </template>
                                <template v-else>
                                    <el-button v-if="data.is_publish === 1 && showCancel"
                                               style="color: #344054;"
                                               link
                                               :loading="cancelRsvpLoadingStatus"
                                               @click="cancelEvent(data)">
                                        Cancel RSVP
                                    </el-button>
                                </template>

                            </template>

                        </template>

                    </div>
                </div>

                <div class="detail-b">
                    <div class="detail-b-t">
                        <div class="detail-b-t-l">
                            <div class="detail-b-t-l-l">
                                <el-image
                                        class="detail-company-logo"
                                        fit="cover"
                                        :src="data.company_logo ? data.company_logo : defaultAvatar">
                                </el-image>
                            </div>
                            <div class="detail-b-t-l-r">
                                <div class="detail-name">
                                    {{ data.name }}
                                    <span class="xll-tag-rec">Recommended by EDU 💜</span>
                                </div>
                                <div class="detail-name-time">Posted {{ $filters.howLongFormat(data.c_time) }}</div>
                            </div>
                        </div>
                        <div class="detail-b-t-r">
                            <template v-if="from === 'reserved-spots' ">
                                <el-button type="primary" disabled>Reserve Spot</el-button>
                                <el-button
                                           link
                                           style="color:#F04438;"
                                           type="danger"
                                           :loading="removeLoadingStatus"
                                           @click="clientRemoveEvent(data.id)">
                                    Remove Event
                                </el-button>
                            </template>
                            <template v-else-if="from === 'my-events' ">

                                <template v-if="data.is_publish == 1">

                                    <el-button
                                        type="primary"
                                        @click="unPublishEvent(data.id)"
                                        v-if="data.status == 1">
                                        Unpublish Event
                                    </el-button>

                                </template>
                                <template v-else>
                                    <el-button
                                        type="primary"
                                        @click="publishEvent(data.id)"
                                    >
                                        Publish Event
                                    </el-button>
                                </template>

                                <el-button link style="color:#F04438;" type="danger" @click="deleteEvent(data)">
                                    Delete Event
                                </el-button>

                            </template>
                            <template v-else>
                                <el-button type="primary" @click="reserveSpot(data)">Reserve Spot</el-button>
                            </template>

                        </div>
                    </div>
                    <div class="detail-location">
                        <template v-if="data.is_online == 1">
                            <el-icon>
                                <Location/>
                            </el-icon>
                            Online
                        </template>
                        <template v-if="data.is_online == 0 && data.location">
                            <el-icon>
                                <Location/>
                            </el-icon>
                            {{ data.location }}
                        </template>
                    </div>

                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Event Date
                        </div>
                        <div class="detail-table-item-r">
                            {{ data.date }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Hours
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.formatEventTimeForShow(data.start_time) }} to
                            {{ $filters.formatEventTimeForShow(data.end_time) }} {{ data.timezone }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Posted By
                        </div>
                        <div class="detail-table-item-r">
                            <el-avatar style="width: 24px;height: 24px;margin-right: 6px;"
                                       :src="data.company_profile_photo ? data.company_profile_photo : defaultAvatar">
                            </el-avatar>
                            {{ data.company_name }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Role
                        </div>
                        <div class="detail-table-item-r">
                            <span v-if="data.identity == 1">Educator</span>
                            <span v-if="data.identity == 2">Recruiter</span>
                            <span v-if="data.identity == 3">School</span>
                            <span v-if="data.identity == 4">Other</span>
                            <span v-if="data.identity == 5">Vendor</span>
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Event Fee
                        </div>
                        <div class="detail-table-item-r">
                            {{ data.currency }} {{ data.pay_money }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Venue
                        </div>
                        <div class="detail-table-item-r">
                            {{ data.event_place }}
                        </div>
                    </div>
                    <div class="detail-table-item" v-if="data.discount_code && from==='my-events' ">
                        <div class="detail-table-item-l">
                            Coupon Code
                        </div>
                        <div class="detail-table-item-r">
                            {{ data.discount_code }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            No of Reserved Spots
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.numberOfAttendeesInTens(data.no_of_reserved_spots) }}
                        </div>
                    </div>
                    <div class="detail-table-item" v-if="data.status != 1">
                        <div class="detail-table-item-l">
                            Listing Status
                        </div>
                        <div class="detail-table-item-r">
                            <template v-if="data.is_publish == 0">
                                <span class="xll-tag xll-tag-2"><el-icon style="margin-right: 2px;"><IconElOkCircle/></el-icon>Unpublished</span>
                            </template>
                            <template v-else>
                                <span class="xll-tag xll-tag-1" v-if="data.status == 0"><el-icon
                                        style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Approval Pending</span>
                                <span class="xll-tag xll-tag-3" v-if="data.status == 2"><el-icon
                                        style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Not Approved</span>
                                <span class="xll-tag xll-tag-3" v-if="data.status == 5"><el-icon
                                        style="margin-right: 2px;"><IconIcTwotoneError/></el-icon>Canceled</span>
                            </template>
                        </div>
                    </div>

                    <div class="detail-item-label">
                        Event Cover Image
                    </div>

                    <div class="detail-table-item">
                        <template v-if="data.file_type === 'image' ">
                            <el-image class="events-item-banner"
                                      fit="cover"
                                      :preview-src-list="[data.file]"
                                      :src="data.file !='' ? data.file : '' "
                            >
                            </el-image>
                        </template>
                        <template v-else-if="data.file_type === 'video' ">
                            <video style="width: 100%;" :src="data.file" controls></video>
                        </template>
                        <template v-else>
                            <el-image class="events-item-banner"
                                      fit="cover"
                                      :preview-src-list="[data.file]"
                                      :src="data.file !='' ? data.file : '' "
                            >
                            </el-image>
                        </template>
                    </div>

                    <div class="detail-item-label" v-if="data.tags_en">
                        Event Type
                    </div>

                    <div class="event-tags" v-if="data.tags_en">
                        <div class="event-tag"
                             v-for="(tag,i) in data.tags_en.split(',')"
                             :key="i"
                        >
                            {{ tag }}
                        </div>
                    </div>

                    <div class="detail-item-label">
                        Event Description
                    </div>

                    <div class="detail-description">
                        <div class="detail-desc" v-html="data.desc"></div>
                    </div>


                </div>

            </div>

            <div class="other-events">
                <div class="other-events-label">
                    Other events you may be interested in
                </div>
                <div class="events-list-container">

                    <div class="events-item" v-for="(item,i) in eventsList" :key="i">

                        <div class="events-item-share">

                            <el-button icon="share" circle @click="shareEvent(item)"></el-button>
                            <template v-if="item.is_favorite">
                                <el-button circle @click="cancelFavorite(item,i)">
                                    <el-icon :size="14">
                                        <IconFlatColorIconsLike/>
                                    </el-icon>
                                </el-button>
                            </template>
                            <template v-else>
                                <el-button circle @click="addFavorite(item,i)">
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
                                <video style="width: 100%;" :src="item.file" controls></video>
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

                                <div class="events-item-name">
                                    {{ item.name }}
                                </div>
                                <div class="events-item-desc">
                                    {{ item.desc }}
                                </div>
                                <div class="events-item-action-container">
                                    <el-button type="primary" @click="reserveSpot(item)">Reserve Spot</el-button>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>

            </div>

        </el-drawer>

        <share-card-theme-two :visible="shareDialogVisible"
                              share-title="Share Job Post"
                              :title="shareInfo.title"
                              :description="shareInfo.desc"
                              :quote="shareInfo.desc"
                              :url="shareLocationUrl"
                              @close="shareDialogVisible=false"
        >
        </share-card-theme-two>

        <el-dialog
                v-model="cdDialogVisible"
                center
                align-center
                width="500px"
        >
            <div class="cd-dialog-tips">
                {{ cdDialogObj.tips }}
            </div>
            <div class="cd-dialog-actions" v-if="cdDialogObj.type === 'delete' ">
                <el-button plain @click="cdDialogVisible=false">Cancel</el-button>
                <el-button
                        type="primary"
                        :loading="deleteEventLoadingStatus"
                        @click="submitDeleteEvent()">
                    Delete Event
                </el-button>
            </div>
            <div class="cd-dialog-actions" v-if="cdDialogObj.type === 'cancel' ">
                <el-button
                        type="primary"
                        :loading="cancelEventLoadingStatus"
                        @click="submitCancelEvent()">
                    Cancel Event
                </el-button>
            </div>

        </el-dialog>

        <book-event-form :visible="spotVisible" :info="spotInfo" @close="spotVisible=false"></book-event-form>

    </div>
</template>

<script setup>

import {defineProps, defineEmits, ref, onMounted} from 'vue'
import {
    ADD_FAVORITE,
    CANCEL_FAVORITE, EVENTS_ADD_APPLICANTS,
    EVENTS_LIST,
    HOME_CLIENT_CANCEL_EVENT, HOME_CLIENT_REMOVE_EVENT, HOME_EVENT_DELETE, HOME_PUBLISH_EVENT,
    HOME_PUBLISHER_CANCEL_EVENT
} from "@/api/api";
import {ElMessage,ElLoading} from 'element-plus'
import ShareCardThemeTwo from "@/components/shareCardThemeTwo.vue";
import BookEventForm from "@/components/bookEventForm.vue";
import defaultAvatar from "@/assets/newHome/default-business-avatar.svg";

const props = defineProps(['visible', 'data', 'showCancel', 'from','rsvpCancel'])
const emit = defineEmits(['close', 'cancelSuccess','removeSuccess', 'deleteSuccess', 'publishSuccess', 'unPublishSuccess'])
// const currentUserId = localStorage.getItem('uid')
const cdDialogVisible = ref(false)

const cdDialogObj = ref({
    type: '',
    tips: ''
})

const cdEventDetail = ref({})
const cancelEventLoadingStatus = ref(false)
const token = localStorage.getItem('token')

const closeVisible = () => {
    emit('close')
}
const turnBack = () => {
    emit('close')
}
const cancelEvent = (item) => {
    // console.log(item)
    cdEventDetail.value = item

    if(props.from === 'reserved-spots'){
        submitCancelEvent()
    }

    if(props.from === 'my-events'){

        cdDialogObj.value = {
            type: 'cancel',
            tips: 'Canceling this event will unpublished it and remove it from attendees list'
        }
        cdDialogVisible.value = true
    }

}

const submitCancelEvent = () => {

    if (props.from === 'my-events') {
        publisherCancelEvent(cdEventDetail.value.id)
    }

    if(props.from === 'reserved-spots'){
        clientCancelEvent(cdEventDetail.value.id)
    }
}
const removeLoadingStatus = ref(false)
const clientRemoveEvent = (id)=>{
    removeLoadingStatus.value = true
    let params = {
        id:id
    }

    HOME_CLIENT_REMOVE_EVENT(params).then(res=>{
        if(res.code === 200){
            removeLoadingStatus.value = false

            ElMessage({
                type: 'success',
                message: 'You have successfully removed event',
                grouping: true
            })

            emit('removeSuccess')
        }
    }).catch(err=>{
        console.log(err)
        removeLoadingStatus.value = false
    })
}

const cancelRsvpLoadingStatus = ref(false)
const clientCancelEvent = (id) => {
    cancelRsvpLoadingStatus.value = true

    let params = {
        id: id
    }

    HOME_CLIENT_CANCEL_EVENT(params).then(res => {
        console.log(res)
        if (res.code === 200) {
            cancelRsvpLoadingStatus.value = false

            ElMessage({
                type: 'success',
                message: 'You have successfully canceled reserved spot',
                grouping: true
            })

            emit('cancelSuccess')

        }
    }).catch(err => {
        console.log(err)
        cancelRsvpLoadingStatus.value = false
    })

}

const publisherCancelEvent = (id) => {
    cancelEventLoadingStatus.value = true
    let params = {
        id: id
    }
    HOME_PUBLISHER_CANCEL_EVENT(params).then(res => {
        console.log(res)
        if (res.code === 200) {
            cancelEventLoadingStatus.value = false
            cdDialogVisible.value = false
            ElMessage({
                type: 'success',
                message: 'Event listing canceled Successfully',
                grouping: true
            })
            emit('cancelSuccess')
        }
    }).catch(err => {
        console.log(err)
        cancelEventLoadingStatus.value = false
    })

}

const deleteEventLoadingStatus = ref(false)
const deleteEvent = (item) => {
    // console.log(item)
    cdEventDetail.value = item

    cdDialogObj.value = {
        type: 'delete',
        tips: 'Deleting this event will unpublished it. '
    }
    cdDialogVisible.value = true

}

const submitDeleteEvent = () => {
    deleteEventLoadingStatus.value = true;

    let params = {
        id: cdEventDetail.value.id
    }
    HOME_EVENT_DELETE(params).then(res => {
        if (res.code === 200) {
            cdDialogVisible.value = false
            deleteEventLoadingStatus.value = false
            ElMessage({
                type: 'success',
                message: 'Event listing deleted Successfully',
                grouping: true
            })
            emit('deleteSuccess')

        }
    }).catch(err => {
        console.log(err)
        cdDialogVisible.value = false
        deleteEventLoadingStatus.value = false
    })

}

const eventsList = ref([])

const getEventsList = () => {
    let params = {
        page: 1,
        limit: 2
    }
    EVENTS_LIST(params).then(res => {

        if (res.code == 200) {
            eventsList.value = res.message.data;
        }
    }).catch(err => {
        console.log(err)
    })
}

const spotVisible = ref(false)
const spotInfo = ref({})

const reserveSpot = (data) => {
    if(token){
        const reservedLoading = ElLoading.service({
            text:'Loading'
        })

        let uid = localStorage.getItem('uid')
        let params = {
            apply_user_id: uid,
            user_id: props.data.user_id,
            event_id:props.data.id
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
                        window.open(props.data.online_url, '_blank')
                    }, 1500)

                }, 3500)


            }

        }).catch(err => {
            console.log(err)
            reservedLoading.close()
        })
    }else{
        spotVisible.value = true
        spotInfo.value = data
    }

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

const addFavorite = (item, index) => {

    let params = {
        type: 3,
        type_id: item.id,
        type_title: item.name,
        type_url: item.company_logo
    }
    // console.log(params)
    ADD_FAVORITE(params).then(res => {
        if (res.code == 200) {
            eventsList.value[index].is_favorite = 1
            ElMessage({
                type: 'success',
                message: 'Added to Favourites',
                grouping: true
            })
        }
    }).catch(err => {
        console.log(err)

    })

}

const cancelFavorite = (item, index) => {
    let params = {
        type: 3,
        type_id: item.id
    }
    CANCEL_FAVORITE(params).then(res => {

        if (res.code == 200) {
            eventsList.value[index].is_favorite = 0
        }
    }).catch(err => {
        console.log(err)
    })
}

const unPublishEvent = (id) => {
    let params = {
        id: id,
        is_publish: 0
    }
    HOME_PUBLISH_EVENT(params).then(res => {
        if (res.code === 200) {
            console.log('success')
            emit('unPublishSuccess')
        }
    }).catch(err => {
        console.log(err)
    })
}

const publishEvent = (id) => {
    let params = {
        id: id,
        is_publish: 1
    }
    HOME_PUBLISH_EVENT(params).then(res => {
        if (res.code === 200) {
            console.log('success')
            emit('publishSuccess')
        }
    }).catch(err => {
        console.log(err)
    })
}

onMounted(() => {
    getEventsList()
})
</script>

<style scoped>
:deep(.el-drawer__body) {
    padding: 0;
}

.detail-container {
    margin: 40px;

    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 8px;
}

.detail-t {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 17px;
    border-bottom: 1px solid #D0D5DD;;
}

.detail-b {
    padding: 28px 24px;
}

.detail-b-t {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.detail-b-t-l {
    display: flex;
    flex-direction: row;
}

.detail-company-logo {
    width: 48px;
    height: 48px;
    background: #F7F5FF;
    border-radius: 6px;

}

.detail-b-t-l-r {
    margin-left: 12px;
}

.detail-b-t-r {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.detail-name {

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #000000;

}

.detail-name-time {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #98A2B3;
}

.detail-location {
    margin: 15px 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #667085;
}

.detail-table-item {
    display: flex;
    flex-direction: row;

    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 5px;
    margin-bottom: 8px;

}

.detail-table-item-l {
    min-width: 185px;
    padding: 11px 11px 11px 24px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #1D2939;
    border-right: 1px solid #D0D5DD;

    display: flex;
    flex-direction: row;
    align-items: center;
}

.detail-table-item-r {
    padding: 11px 11px 11px 24px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #667085;

    display: flex;
    flex-direction: row;
    align-items: center;

}

.detail-item-label {
    margin: 16px 0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #1D2939;
}

.detail-desc {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #344054;
}

.event-tags {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
}

.event-tag {
    margin-right: 16px;
    margin-bottom: 10px;
    padding: 11px 16px;
    background: #F2F4F7;
    border-radius: 8px;
    font-family: 'Inter';
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    color: #1D2939;
}

.xll-tag-rec {
    padding: 4px 8px;
    gap: 2px;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    /*line-height: 18px;*/
    background: #FFDB91;
    color: #1D2939;
}

.xll-tag-spot-cancel {
    padding: 4px 8px;
    gap: 2px;
    border-radius: 4px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    /*line-height: 18px;*/
    background: #FEF3F2;
    color: #1D2939;
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

.other-events {
    margin: 32px 40px 40px 40px;
}

.other-events-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #1D2939;
}

.events-list-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 16px;
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
    height: 100%;
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
    margin: 16px 0 30px 0;
}

.cd-dialog-tips {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    color: #101828;
}

.cd-dialog-actions {
    margin-top: 16px;
    text-align: center;
}


</style>