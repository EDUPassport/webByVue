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
                                <el-image class="detail-company-logo" :src="data.company_logo"></el-image>
                            </div>
                            <div class="detail-b-t-l-r">
                                <div class="detail-name">{{ data.job_title }}</div>
                                <div class="detail-name-time">{{ data.company_name }} . Posted 6 mins ago</div>
                            </div>
                        </div>
                        <div class="detail-b-t-r">
<!--                            <el-button type="primary">Apply Now</el-button>-->
                            <applyButton :selectJobId="data.id"
                                            btn-text="Apply Now"
                                            :job-info="data" >
                            </applyButton>
                        </div>
                    </div>
                    <div class="detail-location">
                        <el-icon>
                            <Location/>
                        </el-icon>
                        {{data.states.name}}, {{data.countries.name}}
                    </div>

                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Start Date
                        </div>
                        <div class="detail-table-item-r">
                            {{ data.entry_date }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Hours
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.formatJobDetailWorkingHours(data.working_hours) }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Student Age
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.userObjectFormat(data.age_to_teach) }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Subjects
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.userObjectFormat(data.subject) }}
                        </div>
                    </div>

                    <div class="detail-item-label">
                        Requirements
                    </div>

                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Teaching Experience
                        </div>
                        <div class="detail-table-item-r">
                            {{ data.working_nums_start }}-{{ data.working_nums_end }} Years Required
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Minimum Education
                        </div>
                        <div class="detail-table-item-r">
                            {{ data.education_en }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Teaching Certificate
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.userObjectFormat(data.Teaching_certificate) }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Teaching License
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.userObjectFormat(data.Teaching_certificate) }}
                        </div>
                    </div>

                    <div class="detail-item-label">
                        Compensation
                    </div>

                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Salary Range
                        </div>
                        <div class="detail-table-item-r">
                            {{ data.currency }} {{ data.salary_min }} - {{ data.salary_max }} /
                            {{ data.payment_period_en }}
                        </div>
                    </div>
                    <div class="detail-table-item">
                        <div class="detail-table-item-l">
                            Benefits
                        </div>
                        <div class="detail-table-item-r">
                            {{ $filters.userObjectFormat(data.benefits) }}
                        </div>
                    </div>

                    <div class="detail-item-label">
                        Job Description
                    </div>

                    <div class="detail-description">
                        <div class="detail-desc" v-html="data.desc"></div>
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
import applyButton from "@/components/jobs/applyButton.vue";
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
/deep/ .el-drawer__body {
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