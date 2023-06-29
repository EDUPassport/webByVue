<template>
    <div>
        <el-scrollbar class="post-event-bg" always>
            <div class="t-container">
                <div class="t-l">
                    <div class="t-l-label">
                        Post a Deal
                    </div>
                    <div class="t-l-tips">
                        Provide the information for the deal
                    </div>
                </div>
                <div class="t-r">
                    <el-button type="danger" @click="turnMyDeals()"> Cancel</el-button>
                    <el-button plain @click="saveAndExit(basicForms)">Save and Exit</el-button>
                    <el-button type="primary" @click="submitForm(basicForms)">Publish Deal</el-button>
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
                            <el-form-item label="Deal name" prop="title">
                                <el-input class="form-width-percent-100"
                                          v-model="basicForm.title"
                                          placeholder="Enter Deal title here">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="Start Date" prop="start_date">
                                <el-date-picker
                                        class="form-width-percent-100"
                                        v-model="basicForm.start_date"
                                        type="date"
                                        :disabledDate="dealDisabledDate"
                                        placeholder="Select Date"
                                        value-format="YYYY-MM-DD"
                                ></el-date-picker>
                            </el-form-item>

                            <el-form-item label="End Date" prop="end_date">
                                <el-date-picker
                                        class="form-width-percent-100"
                                        v-model="basicForm.end_date"
                                        type="date"
                                        :disabledDate="dealDisabledDate"
                                        placeholder="Select Date"
                                        value-format="YYYY-MM-DD"
                                ></el-date-picker>
                            </el-form-item>

                            <el-form-item label="Deal Format" prop="is_online">
                                <el-radio-group
                                        @change="dealFormatChange"
                                        v-model="dealFormat">
                                    <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                                        <div v-for="(item,i) in dealFormatOptions" :key="i" style="flex-basis: 100%;">
                                            <el-radio :label="item.value">
                                                {{ item.name }}
                                            </el-radio>
                                        </div>
                                    </div>
                                </el-radio-group>
                            </el-form-item>

                            <template v-if="dealFormat === 1">
                                <el-form-item label="Deal Link" prop="online_url">
                                    <el-input class="form-width-percent-100" v-model="basicForm.online_url"
                                              placeholder="Enter Online Link here"></el-input>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-form-item label="Venue Location" prop="location">
                                    <el-input
                                            class="form-width-percent-100"
                                            v-model="basicForm.location"
                                            placeholder="Enter location">
                                    </el-input>
                                </el-form-item>
                            </template>

                            <el-form-item label="Deal description" prop="desc">
                                <el-input
                                        class="form-width-percent-100"
                                        v-model="basicForm.desc"
                                        type="textarea"
                                        :rows="5"
                                        placeholder="Enter deal description">
                                </el-input>
                            </el-form-item>

                        </div>
                        <div class="form-content-r">

                            <el-form-item label="Add Deal Cover Photo" prop="file">
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
                            <el-form-item label="Deal Category" prop="category_id">
                                <el-radio-group v-model="basicForm.category_id">
                                    <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                                        <div v-for="(item,i) in subCateOptions" :key="i" style="flex-basis: 50%;">
                                            <el-radio :label="item.id">
                                                {{ item.identity_name }}
                                            </el-radio>
                                        </div>
                                    </div>
                                </el-radio-group>
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
import imageUploadIcon from '@/assets/newHome/image-upload.svg'
import {
    TAG_LIST,
    ADD_DEALS,
    DEALS_DEAL_DETAIL,
    UPLOAD_BY_ALI_OSS,
    UPLOAD_BY_SERVICE,
    USER_SUB_IDENTITY_V2
} from '@/api/api';
import {updateWindowHeight} from "@/utils/tools";
import {ref, reactive, onMounted, onUnmounted} from 'vue'
import {useRouter,useRoute } from 'vue-router'
import {ElMessage} from 'element-plus'
import ImageCompressor from 'compressorjs'

const router = useRouter()
const route = useRoute()

const uploadLoadingStatus = ref(false)
const uploadHeaders = {platform: 4}

const dealFormat = ref(0)
const dealFormatOptions = [
    {
        name: 'Online(Virtual/Digital)',
        value: 1
    },
    {
        name: 'Offline(In-Person)',
        value: 0
    }
]

const dealFormatChange = (e) => {
    console.log(e)
    basicForm.is_online = parseInt(e)
}


const dealDisabledDate = (date) => {
    let myDate = new Date();
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1
    let day = myDate.getDate()
    let mTime = year + '-' + month + '-' + day;
    let mDate = new Date(mTime)
    return date.getTime() < mDate.getTime();
}

const basicForms = ref(null)

const basicForm = reactive({
    user_id: localStorage.getItem('uid'),
    deal_id: '',
    title: '',
    desc: '',
    tag: '',
    is_online: 0,
    location: '',
    category_id:'',
    country_id: '',
    state_id: '',
    town_id: '',
    lng: '',
    lat: '',
    tags_cn: '',
    tags_en: ''
})

const basicRules = reactive({
    title: [
        {
            required: true,
            message: 'Please input',
            trigger: 'blur',
        }
    ],
    desc: [
        {
            required: true,
            message: 'Please input',
            trigger: 'blur',
        },
    ]

})

const editDealStatus = ref(false)

const tagsOptions = ref([])
const subCateOptions = ref([])

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

const getDealDetail = (id) => {

    let params = {
        deal_id: id
    }
    DEALS_DEAL_DETAIL(params).then(res => {

        if (res.code == 200) {
            let resMessage = res.message;
            basicForm.title = resMessage.title
            basicForm.desc = resMessage.desc
            basicForm.tags_cn = resMessage.tags_cn
            basicForm.tags_en = resMessage.tags_en
            basicForm.is_online = resMessage.is_online
            basicForm.location = resMessage.location

            // tags 返回的数据和tagslist里面的数据的id不一致
            let tags = resMessage.tags;

            let tagsData = []
            let old = tagsData.value
            let oldTagsEnData = []
            let tagsEnStr = resMessage.tags_en;

            if (tags && tags.length > 0 && old && old.length > 0) {
                tags.forEach(item => {
                    let i = old.filter(value => value.id == item.tag_name)
                    tagsData.push(i[0])
                    oldTagsEnData.push(i[0]['name_en'])
                })

                let abc = tagsEnStr.split(',')
                abc.forEach(a => {
                    let a_i = oldTagsEnData.indexOf(a)
                    if (a_i === -1) {
                        tagsData.push(a)
                    }
                })

            }

        }
    }).catch(err => {
        console.log(err)
    })
}

const getTagsList = () => {
    let data = {
        page: 1,
        limit: 1000
    }
    TAG_LIST(data).then(res => {
        if (res.code === 200) {
            tagsOptions.value = res.message.data;
        }
    }).catch(err => {
        console.log(err)
    })
}
const getSubIdentityList = ()=> {
    let params = {
        pid: 5,
        tree: 1
    }

    USER_SUB_IDENTITY_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            subCateOptions.value = res.message
        }
    }).catch(err => {
        console.log(err)
    })
}

const submitForm = (formEl) => {

    formEl.validate((valid) => {
        if (valid) {

            let selectedTagsData = this.selectedTagsValue;
            let tagsIdData = []
            let tagsEnData = []
            let tagsCnData = []

            selectedTagsData.forEach(item => {

                if (typeof item === 'string') {
                    tagsEnData.push(item)
                    tagsCnData.push(item)
                }
                if (typeof item === 'object') {
                    tagsIdData.push(item.id)
                    tagsEnData.push(item.name_en)
                    tagsCnData.push(item.name_cn)
                }

            })

            basicForm.tag = tagsIdData;
            if (tagsCnData.length > 0) {
                basicForm.tags_cn = tagsCnData.join(',')
            }

            if (tagsEnData.length > 0) {
                basicForm.tags_en = tagsEnData.join(',')
            }

            basicForm.is_online = this.dealLocationType

            let params = Object.assign({}, basicForm);
            ADD_DEALS(params).then(res => {

                if (res.code == 200) {
                    ElMessage({
                        type: 'success',
                        message: 'Deal Posted Successfully',
                        grouping: true,
                    })
                    setTimeout(function () {
                        router.push('/deals/myDeals')
                    }, 1500)
                }
            }).catch(err => {
                console.log(err)
            })

        } else {
            console.log('error submit!!')
            ElMessage({
                type: 'error',
                message: 'Complete all required field to Post a Deal',
                grouping: true,
            })
        }
    })
}

const saveAndExit = ()=>{
    console.log('save and exit')
}
const turnMyDeals = ()=>{
    router.push({path:'/deals/myDeals'})
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

    getTagsList()
    getSubIdentityList()

    let dealId = route.query.deal_id
    if (dealId) {
        basicForm.deal_id = dealId
        getDealDetail(dealId)
        editDealStatus.value = true
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

.xll-currency-select {
    width: 80px;
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

:deep(.profile-uploader .el-upload:hover) {
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
