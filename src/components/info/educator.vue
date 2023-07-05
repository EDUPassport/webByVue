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
                        <el-button link icon="back" @click="turnBack()">Back</el-button>
                    </div>
                    <div>
                        <el-button link type="info" @click="shareJob(data)">
                            <el-icon>
                                <IconIcRoundShare/>
                            </el-icon>

                        </el-button>

                        <template v-if="favoriteStatus || data.is_favorite">
                            <el-button link type="info" @click="cancelFavorite(data)">
                                <el-icon>
                                    <IconFlatColorIconsLike/>
                                </el-icon>
                            </el-button>
                        </template>
                        <template v-else>
                            <el-button link type="info" @click="addFavorite(data)">
                                <el-icon>
                                    <IconIconParkOutlineLike/>
                                </el-icon>
                            </el-button>
                        </template>

                    </div>
                </div>

                <div class="detail-b">
                    <div class="detail-b-t">
                        <div class="detail-b-t-l">
                            <div class="detail-b-t-l-l">
                                <el-image class="detail-company-logo" :src="data.headimgurl"></el-image>
                            </div>
                            <div class="detail-b-t-l-r">
                                <div class="detail-name">{{ data.first_name }} {{data.last_name}}</div>
                                <div class="detail-name-time">
                                    {{ data.educator_contact.job_title }}

                                </div>
                            </div>
                        </div>
                        <div class="detail-b-t-r">
                            <el-button type="primary">Message</el-button>
                        </div>
                    </div>
                    <div class="detail-location">
                        <el-icon>
                            <Location/>
                        </el-icon>
                        {{data.educator_contact.nationality}}
                    </div>

                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            preferred Location
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.userObjectFormat(data.educator_contact.Prefered_Work_Destination) }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Student Age
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.userObjectFormat(data.educator_contact.Student_Age) }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Preferred Language
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.userObjectFormat(data.educator_contact.Prefered_Language) }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Preferred Job Type
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.userObjectFormat(data.educator_contact.job_type) }}
                        </div>
                    </div>

                    <div class="detail-item-label">
                        Professional Description
                    </div>

                    <div class="detail-description">
                        <div class="detail-desc" v-html="data.educator_contact.bio"></div>
                    </div>

                    <div class="detail-item-label">
                        Work Experience
                    </div>

                    <div class="detail-work-exp">
                        <el-timeline>
                            <template v-for="(work,i) in data.educator_contact.work_info" :key="i">
                                <el-timeline-item>
                                    <div class="work-exp-company-name">
                                        {{work.company_name}}
                                    </div>
                                    <div class="work-exp-title">
                                        {{work.title}} {{ $filters.ymdFormatTimestamp(work.work_time_from) }} - {{
                                            $filters.ymdFormatTimestamp(work.work_time_to)
                                        }}
                                    </div>
                                </el-timeline-item>
                            </template>

                        </el-timeline>
                    </div>

                    <div class="detail-item-label">
                        Education History
                    </div>

                    <div class="detail-education">
                        <el-timeline>
                            <template v-for="(education,i) in data.educator_contact.education_info" :key="i">
                                <el-timeline-item>
                                    <div class="education-school-name">
                                        {{education.school_name}}
                                    </div>
                                    <div class="work-exp-title">
                                        {{education.degree}} {{ $filters.ymdFormatTimestamp(education.start_time) }} - {{
                                            $filters.ymdFormatTimestamp(education.end_time)
                                        }}
                                    </div>
                                </el-timeline-item>
                            </template>

                        </el-timeline>
                    </div>

                    <div class="detail-item-label">
                        Attachments
                    </div>

                    <div class="detail-images">
                        {{data.educator_contact.images}}
                    </div>

                </div>

            </div>

        </el-drawer>

        <shareCard :visible="shareDialogVisible"
                   share-title="Share Job Post"
                   :title="shareInfo.title"
                   :description="shareInfo.desc"
                   :quote="shareInfo.desc"
                   :url="shareLocationUrl"
                   @close="shareDialogVisible=false"
        >
        </shareCard>

    </div>
</template>

<script setup>
import {defineProps, defineEmits, ref} from 'vue'
import {ADD_FAVORITE, CANCEL_FAVORITE} from "@/api/api";

defineProps(['visible', 'data'])
const emit = defineEmits(['close'])

const closeVisible = () => {
    emit('close')
}
const turnBack = ()=>{
    emit('close')
}

const shareDialogVisible = ref(false)
const shareInfo = ref({})
const shareLocationUrl = ref('')
const shareJob = (item) => {
    shareInfo.value = {
        title: item.job_title,
        desc: item.desc,
        id: item.id
    }

    let origin = window.location.origin
    shareLocationUrl.value = origin + '/jobs/detail?id=' + item.id;

    shareDialogVisible.value = true;
}

const favoriteStatus = ref(false)
const addFavorite = (item) => {

    let params = {
        type: 1,
        type_id: item.id,
        type_title: item.title,
        type_url: item.company_logo
    }
    // console.log(params)
    ADD_FAVORITE(params).then(res => {
        if (res.code == 200) {
            favoriteStatus.value = true
        }
    }).catch(err => {
        console.log(err)

    })

}

const cancelFavorite = (item) => {
    let params = {
        type: 1,
        type_id: item.id
    }
    CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            favoriteStatus.value = false
        }
    }).catch(err => {
        console.log(err)
    })
}

</script>

<style scoped>
:deep(.el-drawer__body){
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

}

.detail-table-item-r {
    padding: 11px 11px 11px 24px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #667085;

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

</style>