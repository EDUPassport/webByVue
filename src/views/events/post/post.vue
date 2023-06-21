<template>
    <div>
        <el-scrollbar class="post-event-bg" always>
            <div class="t-container">
                <div class="t-l">
                    <div class="t-l-label">
                        Post an Event
                    </div>
                    <div class="t-l-tips">
                        Provide the information for the event posting
                    </div>
                </div>
                <div class="t-r">
                    <el-button type="danger"> Cancel</el-button>
                    <el-button plain @click="saveAndExit(basicForms)">Save and Exit</el-button>
                    <el-button type="primary" @click="submitForm(basicForms)">Publish Event</el-button>
                </div>
            </div>

            <div class="form-container">
                <el-form
                        ref="basicForms"
                        :model="basicForm"
                        :rules="basicRules"
                        scroll-to-error
                        require-asterisk-position="right"
                        label-width="220px"
                        label-position="top"
                        class="demo-ruleForm"
                >
                    <div class="form-content">
                        <div class="form-content-l">
                            <el-form-item label="Event name" prop="name">
                                <el-input class="form-width-percent-100"
                                          v-model="basicForm.name"
                                          placeholder="Name of the event">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="Event Date" prop="date">
                                <el-date-picker
                                        class="form-width-percent-100"
                                        v-model="basicForm.date"
                                        type="date"
                                        :disabledDate="eventDisabledDate"
                                        placeholder="Day"
                                        value-format="YYYY-MM-DD"
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item label="Event Time" prop="event_time">

                                <div class="event-time">
                                    <div class="event-time-item">
                                        <el-time-select
                                                class="form-width-percent-100"
                                                v-model="basicForm.start_time"
                                                :max-time="basicForm.end_time"
                                                format="HH:mm A"
                                                placeholder="Start time"
                                                start="00:00"
                                                step="00:01"
                                                end="23:59"

                                        />
                                    </div>
                                    <div class="event-time-item">
                                        <el-time-select
                                                class="form-width-percent-100"
                                                v-model="basicForm.end_time"
                                                :min-time="basicForm.start_time"
                                                format="HH:mm A"
                                                placeholder="End time"
                                                start="00:00"
                                                step="00:01"
                                                end="23:59"

                                        />
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item label="Time Zone" prop="timezone">
                                <el-select
                                        class="form-width-percent-100"
                                        v-model="basicForm.timezone"
                                        filterable
                                        value-key="id"
                                        placeholder="Choose Time Zone">
                                    <el-option v-for="(item,i) in timeZones"
                                               :key="i"
                                               :label="item.name"
                                               :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="Event Format" prop="is_online">
                                <el-radio-group
                                        @change="eventFormatChange"
                                        v-model="eventFormat">
                                    <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                                        <div v-for="(item,i) in eventFormatOptions" :key="i" style="flex-basis: 100%;">
                                            <el-radio :label="item.value">
                                                {{ item.name }}
                                            </el-radio>
                                        </div>
                                    </div>
                                </el-radio-group>
                            </el-form-item>

                            <template v-if="eventFormat === 1">
                                <el-form-item label="Event Link" prop="online_url">
                                    <el-input class="form-width-percent-100" v-model="basicForm.online_url"
                                              placeholder="Paste event link"></el-input>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-form-item label="Event Location" prop="location">
                                    <el-input
                                            class="form-width-percent-100"
                                            v-model="basicForm.location"
                                            placeholder="Enter event location">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Event Venue" prop="event_place">
                                    <el-input
                                            class="form-width-percent-100"
                                            v-model="basicForm.event_place"
                                            placeholder="Enter event venue"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="Event Link" prop="online_url">
                                    <el-input
                                            class="form-width-percent-100"
                                            v-model="basicForm.online_url"
                                            placeholder="Paste event link">
                                    </el-input>
                                </el-form-item>
                            </template>

                            <el-form-item label="Event description" prop="desc">
                                <el-input
                                        class="form-width-percent-100"
                                        v-model="basicForm.desc"
                                        type="textarea"
                                        :rows="5"
                                        placeholder="Enter event description">
                                </el-input>
                            </el-form-item>

                        </div>
                        <div class="form-content-r">
                            <el-form-item label="Add Event Cover Image or Video" prop="file">
                                <template v-if="basicForm.file && editFileStatus">

                                    <div class="attachment-xll form-width-percent-100">
                                        <div class="attachment-xll-btns">
                                            <div class="attachment-xll-btn">
                                                <div class="attachment-xll-btn-l">
                                                    <el-icon color="#667085">
                                                        <IconIcomoonFreeAttachment/>
                                                    </el-icon>
                                                    {{ basicForm.file_name }}
                                                </div>
                                                <div class="attachment-xll-btn-r">
                                                    <el-icon class="attachment-xll-icon"
                                                             @click="handleSingleImageRemove('file')"
                                                             color="#F97066">
                                                        <Delete></Delete>
                                                    </el-icon>
                                                </div>

                                            </div>
                                            <div class="attachment-xll-btn-edit"
                                                 @click="handleEditMedia('file')"
                                            >
                                                <el-icon class="attachment-xll-icon">
                                                    <IconUilEdit/>
                                                </el-icon>
                                            </div>
                                            <div class="attachment-xll-btn-download"
                                                 @click="handleDownloadMedia(basicForm.file)"
                                            >
                                                <el-icon class="attachment-xll-icon">
                                                    <IconUisDownloadAlt/>
                                                </el-icon>
                                            </div>
                                        </div>

<!--                                        <div class="attachment-xll-image">-->
<!-- -->
<!--                                            <el-link :href="basicForm.file" target="_blank">Take a look</el-link>-->
<!--                                            <div class="attachment-xll-image-mask">-->
<!--                                                <el-icon-->
<!--                                                        style="cursor: pointer;"-->
<!--                                                        @click="handleSingleImagePreview(basicForm.file,'file')"-->
<!--                                                        color="#ffffff"-->
<!--                                                        :size="20">-->
<!--                                                    <zoom-in/>-->
<!--                                                </el-icon>-->

<!--                                                <el-icon-->
<!--                                                        style="cursor: pointer;margin-left: 15px;"-->
<!--                                                        @click="handleSingleImageRemove('file')"-->
<!--                                                        color="#F97066"-->
<!--                                                        :size="20">-->
<!--                                                    <Delete/>-->
<!--                                                </el-icon>-->
<!--                                            </div>-->
<!--                                        </div>-->

                                    </div>

                                </template>
                                <template v-else>
                                    <el-upload
                                            class="form-width-percent-100"
                                            drag
                                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG,mp4,MP4"
                                            :limit="1"
                                            :headers="uploadHeaders"
                                            :show-file-list="false"
                                            :http-request="fileHttpRequest"
                                            :before-upload="beforeFilePhotoUpload"
                                    >
                                        <template #trigger>
                                            <el-image class="profile-upload-icon" :src="imageUploadIcon"></el-image>
                                            <div class="profile-upload-text">
                                                Drag or <span>Browse file</span>
                                            </div>
                                        </template>
                                    </el-upload>

                                </template>
                            </el-form-item>
                            <el-form-item label="Event Category" prop="category_id">
                                <el-radio-group
                                        @change="eventCategoryChange"
                                        v-model="eventCategory">
                                    <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                                        <div v-for="(item,i) in categoryData" :key="i" style="flex-basis: 50%;">
                                            <el-radio :label="item.id">
                                                {{ item.name_en }}
                                            </el-radio>
                                        </div>
                                    </div>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item label="Choose Event Type" prop="tag">
                                <el-checkbox-group
                                        v-model="basicForm.tag">
                                    <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                                        <div v-for="(item,i) in tagsData" :key="i" style="flex-basis: 50%;">
                                            <el-checkbox :label="item.id">
                                                {{ item.name_en }}
                                            </el-checkbox>
                                        </div>
                                    </div>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="Additional Details(Optional)">
                                <el-input v-model="basicForm.type_desc"
                                          type="textarea"
                                          :rows="4"
                                          placeholder="Enter additional details">
                                </el-input>
                            </el-form-item>

                        </div>
                    </div>

                </el-form>

            </div>


        </el-scrollbar>

        <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUpload()"></xllLoading>

        <el-dialog width="50%" v-model="dialogSingleImageVisible" center>
            <template v-if="dialogSingleField === 'file'">
                <el-image :src="dialogSingleImageUrl"></el-image>
            </template>
            <template v-if="dialogSingleField === 'video_url' ">
                <video :src="dialogSingleImageUrl" controls></video>
            </template>

        </el-dialog>
    </div>
</template>

<script setup>
import {timeZones} from "@/utils/timeZones";
import {ref, reactive, onMounted, onUnmounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import imageUploadIcon from '@/assets/newHome/image-upload.svg'
import xllLoading from '@/components/xllLoading'
import {
    EVENTS_ADD_EVENT,
    EVENTS_CATEGORY,
    UPLOAD_BY_ALI_OSS,
    UPLOAD_BY_SERVICE,
    USER_OBJECT_LIST,
    EVENTS_DETAIL,
    TAGS_LIST
} from '@/api/api';

import ImageCompressor from 'compressorjs'
// import {decode} from 'js-base64'
import {updateWindowHeight} from "@/utils/tools";
import {ElMessage, ElLoading} from 'element-plus'
import {convertTo24HourForEventTime,formatEventTimeForShow} from "@/utils/utils";

const route = useRoute()
const router = useRouter()

const currencyList = ref([])

const uploadLoadingStatus = ref(false)
const uploadHeaders = {platform: 4}

const eventFormat = ref(0)
const eventFormatOptions = [
    {
        name: 'Online(Virtual/Digital)',
        value: 1
    },
    {
        name: 'Offline(In-Person)',
        value: 0
    }
]

const eventFormatChange = (e) => {
    console.log(e)
    basicForm.is_online = parseInt(e)
}


const eventDisabledDate = (date) => {
    let myDate = new Date();
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1
    let day = myDate.getDate()
    let mTime = year + '-' + month + '-' + day;
    let mDate = new Date(mTime)
    return date.getTime() < mDate.getTime();
}

const validateEventTime = (rule, value, callback) => {

    if(!basicForm.start_time && !basicForm.end_time){
        return callback(new Error('Please select time'))
    }
    if (!basicForm.start_time) {
        return callback(new Error('Please select start time'))
    }
    if (!basicForm.end_time) {
        return callback(new Error('Please select end time'))
    }
    callback()
}

const validateEventCategory = (rule, value, callback)=>{
    if(!eventCategory.value){
        return callback(new Error('please select category'))
    }
    callback()
}

const basicForms = ref(null)

const basicForm = reactive({
    user_id: localStorage.getItem('uid'),
    name: '',
    date: '',
    start_time: '',
    end_time: '',
    timezone: '',
    is_online: 0,
    country_id: '',
    state_id: '',
    town_id: '',
    location: '',
    event_place: '',
    online_url: '',
    desc: '',
    tag: [],
    tags_cn: '',
    tags_en: '',
    file: '',
    file_name: '',
    type_desc: '',
    category_id: '',

    third_com_logo: '',
    third_com_name: '',
    pay_money: 0,
    is_all: '1',
    lat: '',
    lng: '',
    currency: 'USD'
})

const basicRules = reactive({
        name: [
            {
                required: true,
                message: 'Please input event name',
                trigger: 'blur',
            }
        ],
        date: [
            {
                required: true,
                message: 'Please select date',
                trigger: 'change',
            },
        ],
        event_time: [
            {
                required: true,
                validator: validateEventTime,
                trigger: 'change'
            }
        ],
        timezone: [
            {
                required: true,
                message: 'Please choose time zone',
                trigger: 'change',
            },
        ],
        is_online: [
            {
                required: true,
                message: 'Please select event format',
                trigger: 'change',
            },
        ],
        location: [
            {
                required: true,
                message: 'Please enter event location',
                trigger: 'blur',
            },
        ],
        event_place: [
            {
                required: true,
                message: 'Please enter event venue',
                trigger: 'blur',
            },
        ],
        online_url: [
            {
                required: true,
                message: 'Please enter event link',
                trigger: 'blur',
            },
        ],
        desc: [
            {
                required: true,
                message: 'Please enter event description',
                trigger: 'blur',
            },
        ],
        file: [
            {
                required: true,
                message: 'Please upload',
                trigger: 'change'
            },
        ],
        category_id: [
            {
                required: true,
                validator:validateEventCategory,
                trigger: 'change',
            },
        ],
        tag: [
            {
                required: true,
                message:'please choose event type',
                trigger: 'change',
            },
        ]


    }
)

const categoryData = ref([])
const tagsData = ref([])

const eventCategory = ref(0)
const eventCategoryChange = (e) => {
    eventCategory.value = e;
    basicForm.category_id = e
}
const getEventDetail = (id) => {
    let params = {
        event_id: id
    }
    basicForm.event_id = id;

    EVENTS_DETAIL(params).then(res => {

        if (res.code == 200) {
            let resMessage = res.message;

            basicForm.user_id = resMessage.user_id
            basicForm.name = resMessage.name
            basicForm.date = resMessage.date
            basicForm.start_time = formatEventTimeForShow(resMessage.start_time)
            basicForm.end_time = formatEventTimeForShow(resMessage.end_time)
            basicForm.timezone = resMessage.timezone
            basicForm.is_online = resMessage.is_online
            basicForm.location = resMessage.location
            basicForm.event_place = resMessage.event_place
            basicForm.online_url = resMessage.online_url
            basicForm.desc = resMessage.desc
            basicForm.file = resMessage.file
            basicForm.file_name =  resMessage.file_name

            basicForm.category_id = resMessage.category_id
            basicForm.tags_cn = resMessage.tags_cn
            basicForm.tags_en = resMessage.tags_en
            basicForm.type_desc = resMessage.type_desc
            editFileStatus.value = true

            // basicForm.third_com_logo = resMessage.third_com_logo
            // basicForm.third_com_name = resMessage.third_com_name
            // basicForm.pay_money = resMessage.pay_money
            // basicForm.is_all = '1'
            // basicForm.country_id = resMessage.country_id
            // basicForm.state_id = resMessage.state_id
            // basicForm.town_id = resMessage.town_id
            // basicForm.lat = resMessage.lat
            // basicForm.lng = resMessage.lng
            // basicForm.currency = 'USD'

        }
    }).catch(err => {
        console.log(err)
    })
}
const editFileStatus = ref(false)
const beforeFilePhotoUpload = (file) => {

    uploadLoadingStatus.value = true;
    const isLt2M = file.size / 1024 / 1024 < 20

    if (!isLt2M) {
        ElMessage.error('Avatar picture size can not exceed 20MB')
    }
    return isLt2M
}

const cancelUpload = () => {
    uploadLoadingStatus.value = false;
}

const fileHttpRequest = (options) => {

    new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
            // console.log(file)
            const formData = new FormData();

            formData.append('token', localStorage.getItem('token'))
            // console.log(file)
            let isInChina = process.env.VUE_APP_CHINA
            if (isInChina === 'yes') {
                formData.append('file[]', file, file.name)
                UPLOAD_BY_ALI_OSS(formData).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        let myFileUrl = res.data[0]['file_url'];
                        uploadLoadingStatus.value = false;
                        basicForm.file = myFileUrl
                        basicForm.file_name = myFileUrl.substring(myFileUrl.length - 10)
                        editFileStatus.value = true
                    }
                }).catch(err => {
                    console.log(err)
                })

            }

            if (isInChina === 'no') {
                formData.append('file', file, file.name)
                UPLOAD_BY_SERVICE(formData).then(res => {
                    // console.log(res)
                    if (res.code == 200) {
                        let myFileUrl = res.message.file_path;
                        uploadLoadingStatus.value = false;
                        basicForm.file = myFileUrl
                        basicForm.file_name = myFileUrl.substring(myFileUrl.length - 10)
                        editFileStatus.value = true
                    }
                }).catch(err => {
                    console.log(err)
                })

            }

        },
        error(err) {
            console.log(err)
        }

    })

}
const handleSingleImageRemove = (field) => {

    if (field === 'file') {
        basicForm.file = ''
        basicForm.file_name = ''
    }

}
const handleEditMedia = (field) => {

    if (field === 'file') {
        editFileStatus.value = false
    }

}
const handleDownloadMedia = (url) => {
    window.open(url, '_blank')
}

const dialogSingleImageUrl = ref('')
const dialogSingleImageVisible = ref(false)
const dialogSingleField = ref('')
// const handleSingleImagePreview = (url, field) => {
//     dialogSingleImageVisible.value = true
//     dialogSingleImageUrl.value = url
//     dialogSingleField.value = field
// }


const getEventCategories = () => {

    let eventCategoryStorage = localStorage.getItem('eventCategory')
    if (eventCategoryStorage) {
        categoryData.value = JSON.parse(eventCategoryStorage)
    } else {
        let params = {
            page: 1,
            limit: 10000
        }
        EVENTS_CATEGORY(params).then(res => {
            if (res.code === 200) {
                localStorage.setItem('eventCategory', JSON.stringify(res.message.data))
                categoryData.value = res.message.data;
            }

        }).catch(err => {
            console.log(err)
        })
    }

}

const getEventTags = () => {
    let eventTagsStorage = localStorage.getItem('eventTags')
    if (eventTagsStorage) {
        tagsData.value = JSON.parse(eventTagsStorage)
    } else {
        let params = {
            type: 2,
            page: 1,
            limit: 10000
        }
        TAGS_LIST(params).then(res => {
            if (res.code == 200) {
                localStorage.setItem('eventTags', JSON.stringify(res.message.data))
                tagsData.value = res.message.data;
            }
        }).catch(err => {
            console.log(err)
        })
    }

}

const getUserObjectList = () => {
    let data = {}
    USER_OBJECT_LIST(data).then(res => {
        if (res.code == 200) {
            currencyList.value = res.message.filter(item => item.pid === 117); // currency
        }
    }).catch(err => {
        console.log(err)
    })
}

const saveAndExit = (formEl) => {
    formEl.validate((valid) => {
        if (valid) {

            const loading = ElLoading.service({
                text: 'Loading...'
            })

            let params = Object.assign({},  basicForm);
            params.is_publish = 0
            params.start_time = convertTo24HourForEventTime(basicForm.date, basicForm.start_time)
            params.end_time = convertTo24HourForEventTime(basicForm.date, basicForm.end_time)

            let tagsArr = basicForm.tag;
            let tagsEnArr = []
            let tagsCnArr = []

            tagsArr.forEach(item=>{
                let a = tagsData.value.filter(value=>value.id === item)
                tagsEnArr.push(a[0].name_en)
                tagsCnArr.push(a[0].name_cn)
            })

            params.tags_en = tagsEnArr.join(',')
            params.tags_cn = tagsCnArr.join(',')

            EVENTS_ADD_EVENT(params).then(res => {

                if (res.code == 200) {
                    // this.submitEventForm()
                    loading.close()
                    ElMessage({
                        type:'success',
                        message:'Event listing saved Successfully',
                        grouping:true
                    })
                    setTimeout(function (){
                        router.push('/events/myEvents')
                    }, 1500)

                }
            }).catch(err => {
                console.log(err)
                loading.close()
            })

        } else {
            console.log('error submit!!')
            ElMessage({
                type: 'error',
                message: 'Complete all required fields to save event',
                grouping: true
            })
        }
    })
}

const submitForm = (formEl) => {
    formEl.validate((valid) => {
        if (valid) {

            const loading = ElLoading.service({
                text: 'Loading...'
            })

            let params = Object.assign({},  basicForm);

            params.start_time = convertTo24HourForEventTime(basicForm.date, basicForm.start_time)
            params.end_time = convertTo24HourForEventTime(basicForm.date, basicForm.end_time)

            let tagsArr = basicForm.tag;
            let tagsEnArr = []
            let tagsCnArr = []

            tagsArr.forEach(item=>{
                let a = tagsData.value.filter(value=>value.id === item)
                tagsEnArr.push(a[0].name_en)
                tagsCnArr.push(a[0].name_cn)
            })

            params.tags_en = tagsEnArr.join(',')
            params.tags_cn = tagsCnArr.join(',')

            EVENTS_ADD_EVENT(params).then(res => {

                if (res.code == 200) {
                    // this.submitEventForm()
                    loading.close()
                    ElMessage({
                        type:'success',
                        message:'Event listing published Successfully',
                        grouping:true,
                    })
                    setTimeout(function (){
                        router.push('/events/myEvents')
                    }, 1500)

                }
            }).catch(err => {
                console.log(err)
                loading.close()
            })

        } else {
            console.log('error submit!!')
            ElMessage({
                type: 'error',
                message: 'Complete all required fields to publish event',
                grouping: true
            })
        }
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
    getUserObjectList()
    getEventCategories()
    getEventTags()

    if (route.query.id) {
        getEventDetail(route.query.id)
    }

})

onUnmounted(() => {
    updateWindowHeight()
    window.onresize = null
})


</script>

<style scoped>
.form-width-percent-100 {
    width: 100%;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
    width: 100%;
}

.post-event-bg {
    background-color: #ffffff;
    height: calc(var(--i-window-height) - 120px);
}

.t-container {
    margin: 0 40px;
    padding-bottom: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #D0D5DD;;
}

.t-l-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.t-l-tips {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
}

.form-container {
    margin: 24px 40px 40px 40px;
}

.form-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.form-content-l {
    flex-basis: 388px;
}

.form-content-r {
    flex-basis: 388px;
}


.event-time {
    width: 100%;
}

.event-time-item {
    margin-bottom: 15px;
}

.event-time-item:last-child {
    margin-bottom: 0;
}


:deep(.profile-uploader .el-upload) {
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
}

:deep(.profile-uploader .el-upload:hover)  {
    border-color: #0AA0A8;
}

:deep(.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}


.account-xll-images {
    width: 90%;
}

.account-xll-image {
    position: relative;
    margin-top: 10px;

}

.account-xll-image-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: none;

}

.account-xll-image:hover .account-xll-image-mask {
    /*display: inline;*/
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.account-xll-image-mask span {
    margin-right: 15px;
    cursor: pointer;
}

.account-xll-image-mask:hover {

}


.attachment-xll {

}

.attachment-xll-btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.attachment-xll-btn {
    width: 100%;
    /*width: 388px;*/
    height: 44px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #d0d5dd;
    padding: 1px 11px;
    border-radius: 4px;
}

.attachment-xll-btn span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #667085;
}

.attachment-xll-btn-edit, .attachment-xll-btn-download {
    height: 44px;
    border: 1px solid #D0D5DD;
    border-radius: 5px;
    padding: 0 16px;
    margin-left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.attachment-xll-icon {
    cursor: pointer;
}

.attachment-xll-image {
    width: 245px;
    position: relative;
    margin-top: 10px;
}

.attachment-xll-img {
    width: 100%;
    height: 100%;
}

.attachment-xll-image-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: none;
}

.attachment-xll-image:hover .attachment-xll-image-mask {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.profile-upload-icon {
    width: 40px;
    height: 40px;
}

.profile-upload-text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #667085;
}

.profile-upload-text span {
    font-weight: 700;
    color: #5C41E6;
}


@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {


}

</style>
