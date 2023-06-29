<template>
    <div>
        <el-scrollbar class="post-container" always>

            <div class="post-bg" v-loading="postJobLoadingValue">

                <div class="post-job-t" v-if="!isEditing">
                    <div class="post-job-t-label">Post A Job</div>
                    <div class="post-job-tabs">
                        <div class="post-job-tab"
                             :class="postType === 1 ? 'post-job-tab-active' : ''"
                             @click="changeJobType(1)"
                        >
                            <div class="post-job-tab-l">
                                <div class="post-job-tab-circle"
                                     :class="postType === 1 ? 'post-job-tab-circle-active' : ''"
                                ></div>
                            </div>
                            <div class="post-job-tab-r">
                                <div class="post-job-tab-r-t">
                                    <span>Manual Posting</span>
                                </div>
                                <div class="post-job-tab-r-b">
                                    Enter custom job details and requirements
                                </div>
                            </div>

                        </div>
                        <div class="post-job-tab"
                             :class="(postType === 2 || postType === 3) ? 'post-job-tab-active' : ''"
                             @click="changeJobType(2)"
                        >
                            <div class="post-job-tab-l">
                                <div class="post-job-tab-circle"
                                     :class="(postType === 2 || postType === 3 )? 'post-job-tab-circle-active' : ''"
                                ></div>
                            </div>
                            <div class="post-job-tab-r">
                                <div class="post-job-tab-r-t">
                                    <span>Post From Template</span>
                                </div>
                                <div class="post-job-tab-r-b">
                                    Select a pre made template for job posting
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div class="form-t-container"  >
                    <template v-if="postType === 1 || postType === 3">
                        <div class="form-t-l">
                            <div class="form-t-label">Job Post Information</div>
                            <div class="form-t-tips">Provide the information for the job posting</div>
                        </div>
                        <div class="form-t-r">
                            <template v-if="!isEditing">
                                <el-button icon="DocumentAdd"
                                           plain
                                           @click="showSaveJobTemplateVisible(jobForms)">
                                    Save as Template
                                </el-button>
                                <el-button type="primary" @click="submitJob(jobForms)">Post Job</el-button>
                            </template>
                            <template v-else>
                                <el-button type="primary" @click="submitJob(jobForms)">Save Changes</el-button>
                            </template>

                        </div>
                    </template>
                    <template v-if="postType === 2">
                        <div class="form-t-l">
                            <div class="form-t-label">Job Post Templates</div>
                            <div class="form-t-tips">Select from the job templates you created and post job</div>
                        </div>
                    </template>
                </div>

                <template v-if="postType === 1 || postType === 3">

                    <el-form
                            ref="jobForms"
                            :model="jobForm"
                            :rules="jobRules"
                            require-asterisk-position="right"
                            status-icon
                            scroll-to-error
                            inline-message
                            label-width="220px"
                            label-position="left"
                            class="demo-ruleForm"
                    >
                        <div class="collapse-item-container">
                            <div class="collapse-item-t" @click="addExpandKeys(1)">
                                <div class="collapse-item-t-label"><span>Job Details</span></div>
                                <div class="collapse-item-t-line"></div>
                                <div class="collapse-item-t-icons">
                                    <el-image
                                            v-if="expandKeysData.indexOf(1) === -1"
                                            class="collapse-item-t-icon"
                                            :src="arrowDownIcon">
                                    </el-image>
                                    <el-image
                                            v-else
                                            class="collapse-item-t-icon"
                                            :src="arrowUpIcon">
                                    </el-image>
                                </div>
                            </div>
                            <el-collapse-transition>
                                <div class="job-form-container" v-if="expandKeysData.indexOf(1) !== -1">

                                    <el-form-item label="Job Title" prop="job_title">
                                        <el-input type="text"
                                                  class="form-width-388"
                                                  v-model="jobForm.job_title"
                                                  placeholder="Enter Job title here">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="Location" prop="location">

                                        <div class="xll-form-location">
                                            <div>
                                                <el-checkbox v-model="jobForm.is_online"
                                                             :true-label="1"
                                                             :false-label="0"
                                                             label="Remote Job">
                                                </el-checkbox>
                                            </div>

                                            <div style="display: flex;flex-direction: row;align-items: center;">
                                                <template v-if="!jobForm.is_online">
                                                    <div class="xll-form-location-text" v-if="haveLocationStatus">
                                                        <span>{{ jobForm.job_location }}</span>
                                                    </div>
                                                    <div class="xll-form-location-select" v-if="!haveLocationStatus">
                                                        <el-select v-model="countryObj"
                                                                   class="form-width-388"
                                                                   @change="countryChange"
                                                                   value-key="id"
                                                                   filterable
                                                                   placeholder="Select your Location">
                                                            <el-option v-for="(item,i) in countryOptions"
                                                                       :key="i"
                                                                       :label="item.name"
                                                                       :value="item">
                                                            </el-option>
                                                        </el-select>
                                                        <template v-if="provinceOptions.length>0">
                                                            <el-select v-model="provinceObj"
                                                                       class="form-width-388 form-margin-top-18"
                                                                       value-key="id"
                                                                       filterable
                                                                       @change="provinceChange"
                                                                       placeholder="Select your State">
                                                                <el-option v-for="(item,i) in provinceOptions"
                                                                           :key="i"
                                                                           :label="item.name"
                                                                           :value="item">
                                                                </el-option>
                                                            </el-select>
                                                        </template>
                                                        <template v-if="cityOptions.length>0">
                                                            <el-select v-model="cityObj"
                                                                       class="form-width-388 form-margin-top-18"
                                                                       value-key="id"
                                                                       filterable
                                                                       @change="cityChange"
                                                                       placeholder="Select your City">
                                                                <el-option v-for="(item,i) in cityOptions"
                                                                           :key="i"
                                                                           :label="item.name"
                                                                           :value="item">
                                                                </el-option>
                                                            </el-select>
                                                        </template>
                                                        <template v-if="showLocationInputStatus">
                                                            <el-input v-model="jobForm.address"
                                                                      class="form-margin-top-18"
                                                                      placeholder="Enter Job Location">
                                                            </el-input>
                                                        </template>
                                                    </div>
                                                    <div class="xll-form-location-action" v-if="haveLocationStatus">
                                                        <el-button
                                                            link
                                                            icon="Edit"
                                                            @click="changeEditLocation()">
                                                        </el-button>
                                                    </div>

                                                    <div class="xll-form-location-action" v-if="showLocationCancelStatus">
                                                        <el-button
                                                            link
                                                            icon="Close"
                                                            @click="changeCancelLocation()">
                                                        </el-button>
                                                    </div>

                                                </template>

                                            </div>

                                        </div>

                                    </el-form-item>

                                    <el-form-item label="Start Date" prop="entry_date">
                                        <el-date-picker
                                                v-model="jobForm.entry_date"
                                                type="date"
                                                placeholder="Select Date"
                                                format="YYYY-MM-DD"
                                                value-format="YYYY-MM-DD"
                                        >
                                        </el-date-picker>
                                    </el-form-item>

                                    <el-form-item label="Application Deadline" prop="apply_due_date">
                                        <el-date-picker
                                                v-model="jobForm.apply_due_date"
                                                type="date"
                                                placeholder="Select Date"
                                                format="YYYY-MM-DD"
                                                value-format="YYYY-MM-DD"
                                        >
                                        </el-date-picker>
                                    </el-form-item>

                                    <el-form-item label="Job description" prop="desc">
                                        <Tinymce v-model="jobForm.desc" width="100%" :height="300"></Tinymce>
                                    </el-form-item>

                                    <el-form-item label="Student Age" prop="student_age">

                                        <el-select
                                                v-model="selectAgeToTeachList"
                                                :teleported="false"
                                                multiple
                                                collapse-tags
                                                collapse-tags-tooltip
                                                placeholder="Select Student Age Group"
                                                filterable
                                                allow-create
                                                value-key="id"
                                        >
                                            <el-option
                                                    v-for="(item,index) in ageToTeachList"
                                                    :key="index"
                                                    :label="item.object_en"
                                                    :value="item"
                                            />

                                        </el-select>

                                    </el-form-item>
                                    <el-form-item label="Subjects">

                                        <el-select
                                                v-model="selectSubjectList"
                                                :teleported="false"
                                                multiple
                                                collapse-tags
                                                collapse-tags-tooltip
                                                placeholder="Select Subjects"
                                                filterable
                                                allow-create
                                                value-key="id"
                                        >
                                            <el-option
                                                    v-for="(item,index) in subjectList"
                                                    :key="index"
                                                    :label="item.object_en"
                                                    :value="item"
                                            />

                                        </el-select>

                                    </el-form-item>

                                    <el-form-item label="Job Type" prop="employment_type">

                                        <el-select
                                                v-model="selectEmploymentTypeList"
                                                multiple
                                                collapse-tags
                                                collapse-tags-tooltip
                                                filterable
                                                allow-create
                                                placeholder="Select Job Type"
                                                value-key="id"
                                        >
                                            <el-option
                                                    v-for="(item,i) in employmentTypeList"
                                                    :key="i"
                                                    :label="item.object_en"
                                                    :value="item"
                                            />
                                        </el-select>

                                    </el-form-item>


                                    <el-form-item label="Working Hours" prop="working_hours">

                                        <div class="xll-salary-container">
                                            <el-time-select

                                                    v-model="jobForm.working_hours_start"
                                                    placeholder="9:00 AM"
                                                    format="HH:mm A"
                                                    start="00:00"
                                                    step="00:15"
                                                    end="24:00"
                                            >
                                            </el-time-select>

                                            <div class="xll-salary-line">To</div>
                                            <el-time-select

                                                    v-model="jobForm.working_hours_end"
                                                    :min-time="jobForm.working_hours_start"
                                                    format="HH:mm A"
                                                    placeholder="5:00 PM"
                                                    start="00:00"
                                                    step="00:15"
                                                    end="24:00"
                                            >
                                            </el-time-select>

                                            <el-select class="xll-payment-select"
                                                       v-model="jobForm.working_time_zone"
                                                       filterable
                                                       value-key="id"
                                                       placeholder="Choose Time Zone">
                                                <el-option v-for="(item,i) in timeZones"
                                                           :key="i"
                                                           :label="item.name"
                                                           :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </div>

                                    </el-form-item>

                                </div>

                            </el-collapse-transition>

                        </div>

                        <div class="collapse-item-container">
                            <div class="collapse-item-t" @click="addExpandKeys(2)">
                                <div class="collapse-item-t-label"><span>Compensation</span></div>
                                <div class="collapse-item-t-line"></div>
                                <div class="collapse-item-t-icons">
                                    <el-image
                                            v-if="expandKeysData.indexOf(2) === -1"
                                            class="collapse-item-t-icon"
                                            :src="arrowDownIcon">
                                    </el-image>
                                    <el-image
                                            v-else
                                            class="collapse-item-t-icon"
                                            :src="arrowUpIcon">
                                    </el-image>
                                </div>
                            </div>
                            <el-collapse-transition>
                                <div class="job-form-container" v-if="expandKeysData.indexOf(2) !== -1">

                                    <el-form-item label="Salary Range" prop="salary_range">

                                        <div class="xll-salary-container">
                                            <el-select
                                                    v-model="jobForm.currency"
                                                    class="xll-currency-select"
                                                    value-key="object_en"
                                                    placeholder="Select">
                                                <el-option
                                                        v-for="(item,index) in currencyList"
                                                        :key="index"
                                                        :label="item.object_en"
                                                        :value="item.object_en"
                                                >
                                                </el-option>
                                            </el-select>
                                            <div class="xll-salary-line">From</div>
                                            <el-input class="xll-min-salary"
                                                      oninput="value=value.replace(/[^\d]/g,'')"
                                                      v-model="jobForm.salary_min"
                                                      placeholder="min">
                                            </el-input>
                                            <div class="xll-salary-line">To</div>
                                            <el-input class="xll-max-salary"
                                                      oninput="value=value.replace(/[^\d]/g,'')"
                                                      v-model="jobForm.salary_max"
                                                      placeholder="max">
                                            </el-input>
                                            <el-select class="xll-payment-select"
                                                       :teleported="false"
                                                       v-model="jobForm.payment_period"
                                                       filterable
                                                       value-key="id"
                                                       placeholder="Choose Payment Period">
                                                <el-option v-for="(item,i) in paymentPeriodList"
                                                           :key="i"
                                                           :label="item.object_en"
                                                           :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </div>

                                    </el-form-item>
                                    <el-form-item label="Benefits">

                                        <el-select
                                                v-model="selectBenefitsList"
                                                class="form-width-388"
                                                multiple
                                                collapse-tags
                                                collapse-tags-tooltip
                                                placeholder="Select Benefits"
                                                filterable
                                                allow-create
                                                value-key="id"
                                        >
                                            <el-option
                                                    v-for="(item,index) in benefitsList"
                                                    :key="index"
                                                    :label="item.object_en"
                                                    :value="item"
                                            />

                                        </el-select>

                                    </el-form-item>
                                    <el-form-item label="Number of Vacancies">
                                        <el-input v-model="jobForm.numbers"
                                                  class="form-width-388"
                                                  oninput="value=value.replace(/[^\d]/g,'')"
                                                  placeholder="Enter Number"></el-input>
                                    </el-form-item>

                                </div>

                            </el-collapse-transition>

                        </div>
                        <div class="collapse-item-container">
                            <div class="collapse-item-t" @click="addExpandKeys(3)">
                                <div class="collapse-item-t-label"><span>Requirements</span></div>
                                <div class="collapse-item-t-line"></div>
                                <div class="collapse-item-t-icons">
                                    <el-image
                                            v-if="expandKeysData.indexOf(3) === -1"
                                            class="collapse-item-t-icon"
                                            :src="arrowDownIcon">
                                    </el-image>
                                    <el-image
                                            v-else
                                            class="collapse-item-t-icon"
                                            :src="arrowUpIcon">
                                    </el-image>
                                </div>
                            </div>
                            <el-collapse-transition>
                                <div class="job-form-container" v-if="expandKeysData.indexOf(3) !== -1">

                                    <el-form-item label="Preferred nationality">

                                        <el-select
                                                v-model="selectPnationalityList"
                                                class="form-width-388"
                                                multiple
                                                collapse-tags
                                                collapse-tags-tooltip
                                                placeholder="Select Nationality"
                                                filterable
                                                allow-create
                                                value-key="id"
                                        >
                                            <el-option
                                                    v-for="(item,index) in pNationalityList"
                                                    :key="index"
                                                    :label="item.object_en"
                                                    :value="item"
                                            />

                                        </el-select>

                                    </el-form-item>

                                    <el-form-item label="Teaching License and Certificates">

                                        <el-select
                                                v-model="selectTeachingCertificateList"
                                                class="form-width-388"
                                                multiple
                                                collapse-tags
                                                collapse-tags-tooltip
                                                placeholder="Select Certificate"
                                                filterable
                                                allow-create
                                                value-key="id"
                                        >
                                            <el-option
                                                    v-for="(item,index) in teachingCertificateList"
                                                    :key="index"
                                                    :label="item.object_en"
                                                    :value="item"
                                            />

                                        </el-select>

                                    </el-form-item>

                                    <el-form-item label="Minimum degree">
                                        <el-select v-model="jobForm.education"
                                                   class="form-width-388"
                                                   placeholder="Select Years">
                                            <el-option v-for="(item,i) in educationList" :key="i"
                                                       :label="item.object_en"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="Languages">

                                        <div>
                                            <div>
                                                <el-select
                                                        v-model="selectLanguagesList"
                                                        class="form-width-388"
                                                        multiple
                                                        collapse-tags
                                                        collapse-tags-tooltip
                                                        placeholder="Select Languages"
                                                        filterable
                                                        allow-create
                                                        value-key="id"
                                                >
                                                    <el-option
                                                            v-for="(item,index) in languagesList"
                                                            :key="index"
                                                            :label="item.object_en"
                                                            :value="item"
                                                    />

                                                </el-select>

                                            </div>
                                            <div>
                                                <el-checkbox v-model="jobForm.is_mom_language"
                                                             :true-label="1"
                                                             :false-label="0"
                                                             label="Native Speaker">
                                                </el-checkbox>
                                            </div>
                                        </div>

                                    </el-form-item>

                                    <el-form-item label="Gender">
                                        <el-select v-model="jobForm.sex"
                                                   class="form-width-388"
                                                   placeholder="Select Gender">
                                            <el-option v-for="(item,i) in sexOptions" :key="i" :label="item.object_en"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="Work schedule">

                                        <el-select
                                                v-model="selectWorkTypeList"
                                                class="form-width-388"
                                                multiple
                                                collapse-tags
                                                collapse-tags-tooltip
                                                placeholder="Select Work Type"
                                                filterable
                                                allow-create
                                                value-key="id"
                                        >
                                            <el-option
                                                    v-for="(item,index) in workTypeList"
                                                    :key="index"
                                                    :label="item.object_en"
                                                    :value="item"
                                            />

                                        </el-select>

                                    </el-form-item>
                                    <el-form-item label="Applicant's age">
                                        <div class="xll-salary-container">
                                            <el-input class="xll-min-salary"
                                                      oninput="value=value.replace(/[^\d]/g,'')"
                                                      v-model="jobForm.age_min"
                                                      placeholder="min">
                                            </el-input>
                                            <div class="xll-salary-line">To</div>
                                            <el-input class="xll-max-salary"
                                                      oninput="value=value.replace(/[^\d]/g,'')"
                                                      v-model="jobForm.age_max"
                                                      placeholder="max">
                                            </el-input>
                                            <div class="xll-salary-line">(Years)</div>
                                        </div>
                                    </el-form-item>
                                    <el-form-item label="Years of Experience">
                                        <div class="xll-salary-container">
                                            <el-input class="xll-min-salary"
                                                      oninput="value=value.replace(/[^\d]/g,'')"
                                                      v-model="jobForm.working_nums_start"
                                                      placeholder="min">
                                            </el-input>
                                            <div class="xll-salary-line">To</div>
                                            <el-input class="xll-max-salary"
                                                      oninput="value=value.replace(/[^\d]/g,'')"
                                                      v-model="jobForm.working_nums_end"
                                                      placeholder="max">
                                            </el-input>
                                            <div class="xll-salary-line">(Years)</div>
                                        </div>
                                    </el-form-item>

                                </div>

                            </el-collapse-transition>

                        </div>

                    </el-form>

                    <div class="post-job-bottom-actions" v-if="!isEditing">
                        <el-button link @click="saveAsDrafts(jobForms)">Save & Exit</el-button>
                        <el-button plain>Cancel</el-button>
                    </div>

                </template>

                <template v-if="postType === 2">
                    <div style="margin: 30px 40px;">
                        <job-templates
                            :job-template-data="jobTemplateData"
                            @post-job="postJobFromTemplate"
                            @edit="editJobTemplate"
                            @delete="deleteJobTemplate"
                            @turn-manual-posting="postType=1"
                        ></job-templates>
                    </div>

                 </template>

            </div>

            <submitMessage :title="jobSuccessTitle"
                           :description="jobSuccessDesc"
                           @close="submitJobSuccess"
                           :visible="jobSuccessVisible">
            </submitMessage>
        </el-scrollbar>

        <el-dialog
                v-model="saveJobTemplateVisible"
                title="Save Job Template"
                align-center
        >
            <el-form
                    ref="saveJobTemplateForms"
                    :model="saveJobTemplateForm"
                    :rules="saveJobTemplateRules"
                    require-asterisk-position="right"
                    status-icon
                    scroll-to-error
                    label-width="220px"
                    label-position="left"
                    class="demo-ruleForm"
            >
                <el-form-item label="Template Name" prop="name">
                    <el-input v-model="saveJobTemplateForm.name" placeholder="Enter Name"></el-input>
                </el-form-item>

            </el-form>

            <template #footer>
                <el-button @click="saveJobTemplateVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitSaveAsTemplate(saveJobTemplateForms)">
                    Save
                </el-button>
            </template>

        </el-dialog>


    </div>

</template>
<script>
export default {
    name: "post"
}
</script>
<script setup>
import {timeZones} from "@/utils/timeZones";
import Tinymce from "@/components/Tinymce";
import arrowDownIcon from '@/assets/newHome/arrow-circle-down.svg'
import arrowUpIcon from '@/assets/newHome/arrow-circle-up.svg'
import {
    USER_OBJECT_LIST,
    ADD_JOB,
    JOB_DETAIL,
    JOB_ADD_PROFILE,
    GET_COUNTRY_LIST,
    USER_INFO_BY_TOKEN_V2,
    HOME_JOB_TEMPLATE_ADD,
    JOB_TEMPLATE_LIST,
    HOME_JOB_TEMPLATE_DELETE
} from '@/api/api';

import {ref, reactive, onMounted, onUnmounted, computed,watch} from "vue";
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'

import submitMessage from "@/components/popup/submitMessage";
import {updateWindowHeight} from "@/utils/tools";
import {ElLoading, ElMessage} from 'element-plus'

const store = useStore()
const route = useRoute()
const router = useRouter()
// const companyId = computed(()=>store.state.currentCompanyId)
// const envName = process.env.VUE_APP_ENV_NAME
// const goDomain = process.env.VUE_APP_EXCHANGE_DOMAIN
const identity = computed(() => store.state.identity)

//1 manual posting 2. post form template
const postType = ref(1)
const changeJobType = (value) => {
    postType.value = value
    if(value === 1){
        loadJobTemplate({})
    }
    if (value === 2) {
        getJobTemplateList()
    }
}

const isEditing = ref(false)

const expandKeysData = ref([1, 2, 3, 4])

const addExpandKeys = (value) => {
    let index = expandKeysData.value.indexOf(value)
    if (index === -1) {
        expandKeysData.value.push(value)
    } else {
        expandKeysData.value.splice(index, 1)
    }

}

const jobForms = ref(null)

const jobForm = reactive({
    job_title: '',
    is_online: 0,
    job_location: '',
    country_id: '',
    state_id: '',
    town_id: '',
    address: '',
    entry_date: '',
    apply_due_date: '',
    desc: '',
    working_hours: "",
    working_hours_start: '',
    working_hours_end: '',
    working_time_zone: 'GMT',
    currency: "USD",
    salary_min: '',
    salary_max: '',
    payment_period: '',
    numbers: 1,
    age_min: '',
    age_max: '',
    working_nums_start: '',
    working_nums_end: '',
    is_mom_language: 0,
    employment_type: '',
    version_time: '',
    sex: '',
    education: '',
    identity: identity.value
})

const initJobForm = {
    job_title: '',
    is_online: 0,
    job_location: '',
    country_id: '',
    state_id: '',
    town_id: '',
    address: '',
    entry_date: '',
    apply_due_date: '',
    desc: '',
    working_hours: "",
    working_hours_start: '',
    working_hours_end: '',
    working_time_zone: 'GMT',
    currency: "USD",
    salary_min: '',
    salary_max: '',
    payment_period: '',
    numbers: 1,
    age_min: '',
    age_max: '',
    working_nums_start: '',
    working_nums_end: '',
    is_mom_language: 0,
    employment_type: '',
    version_time: '',
    sex: '',
    education: '',
    identity: identity.value
}

// const jobForm1 = reactive(
//     {
//         payment_period_str: '',
//         is_equal: 0,
//         sex: '',
//         sex_name: '',
//         is_cpr: 0,
//         is_first_aide: 0,
//         is_teaching_exp: 0,
//         teaching_times: '',
//         teaching_times_str: '',
//         is_teaching_license: 0,
//         education: '',
//         education_str: '',
//         nationality: '',
//         age: '',
//         is_interview: 1,
//         interview_name: '',
//         interview_nationlity: '',
//         interview_imgurl: '',
//         company_name: '',
//         identity: '',
//         employment_type: '',
//         class_size: '',
//         state: '',
//         town: '',
//         lat: '',
//         lng: '',
//         international: 1,
//         nation_address: '',
//     }
// )

const validateLocation = (rule, value, callback) => {
    if (jobForm.is_online) {
        callback()
    } else {
        if (!jobForm.job_location) {
            return callback(new Error('Please select job location'))
        }
        callback()
    }
}

const validateStudentAge = (rule, value, callback) => {
    if (selectAgeToTeachList.value && selectAgeToTeachList.value.length > 0) {
        callback()
    } else {
        return callback(new Error('Please select student age group'))
    }
}

const validateEmploymentType = (rule, value, callback) => {
    if (selectEmploymentTypeList.value && selectEmploymentTypeList.value.length > 0) {
        callback()
    } else {
        return callback(new Error('Please select job type'))
    }
}

const validateWorkingHours = (rule, value, callback) => {
    if (jobForm.working_hours_start && jobForm.working_hours_end && jobForm.working_time_zone) {
        callback()
    } else {
        return callback(new Error('Please complete working hours'))
    }
}

const validateSalaryRange = (rule, value, callback) => {
    if (jobForm.currency && jobForm.salary_min && jobForm.salary_max && jobForm.payment_period) {
        callback()
    } else {
        return callback(new Error('Please complete salary range'))
    }
}

const jobRules = reactive(
    {
        job_title: [
            {
                required: true,
                message: 'Please input job title',
                trigger: ['change', 'blur'],
            },
        ],
        location: [
            {
                required: true,
                validator: validateLocation,
                trigger: ['change', 'blur'],
            },
        ],
        entry_date: [
            {
                required: true,
                message: 'Select Date',
                trigger: ['change', 'blur']
            }
        ],
        apply_due_date: [
            {
                required: true,
                message: 'Select Date',
                trigger: ['change', 'blur']
            }
        ],
        desc: [
            {
                required: true,
                message: 'Please input description',
                trigger: ['change', 'blur']
            }
        ],
        student_age: [
            {
                required: true,
                validator: validateStudentAge,
                trigger: ['change', 'blur']
            }
        ],
        employment_type: [
            {
                required: true,
                validator: validateEmploymentType,
                trigger: ['change', 'blur']
            }
        ],
        working_hours: [
            {
                required: true,
                validator: validateWorkingHours,
                trigger: ['change', 'blur']
            }
        ],
        salary_range: [
            {
                required: true,
                validator: validateSalaryRange,
                trigger: ['change', 'blur']
            }
        ]

    }
)

const jobTemplateData = ref([])
const saveJobTemplateVisible = ref(false)
const saveJobTemplateForms = ref(null)

const saveJobTemplateForm = reactive({
    name: '',
    content: '',
    type: 1
})

const saveJobTemplateRules = reactive({
    name: [
        {
            required: true,
            message: 'Please enter name',
            trigger: ['change', 'blur']
        }
    ]
})

const showSaveJobTemplateVisible = (formEl) => {

    formEl.validate((valid) => {
        if (valid) {

            let jobObj = Object.assign({
                student_age: selectAgeToTeachList.value,
                subject: selectSubjectList.value,
                job_type: selectEmploymentTypeList.value,
                benefits: selectBenefitsList.value,
                preferred_nationality: selectPnationalityList.value,
                certificate: selectTeachingCertificateList.value,
                languages: selectLanguagesList.value,
                work_type: selectWorkTypeList.value
            }, jobForm)

            saveJobTemplateForm.content = JSON.stringify(jobObj)
            saveJobTemplateVisible.value = true

        } else {
            console.log('job form error submit')
        }
    })

}

const submitSaveAsTemplate = (formEl) => {
    const loading = ElLoading.service({
        text: 'Loading'
    })
    formEl.validate((valid) => {
        if (valid) {

            let params = Object.assign({}, saveJobTemplateForm)
            HOME_JOB_TEMPLATE_ADD(params).then(res => {
                if (res.code === 200) {
                    saveJobTemplateVisible.value = false
                    store.commit('setJobTemplateDetail', {})
                    console.log('save template success')

                    setTimeout(function (){
                        loading.close()
                        router.push({path:'/jobs/myJobs',query:{tab:'job_templates'}})
                    }, 1500)

                }
            })

        } else {
            loading.close()
            console.log('save as template error submit')
        }
    })

}
const saveAsDrafts = (formEl) => {
    const loading = ElLoading.service({
        text: 'Loading'
    })
    formEl.validate((valid) => {
        if (valid) {

            let jobObj = Object.assign({
                student_age: selectAgeToTeachList.value,
                subject: selectSubjectList.value,
                job_type: selectEmploymentTypeList.value,
                benefits: selectBenefitsList.value,
                preferred_nationality: selectPnationalityList.value,
                certificate: selectTeachingCertificateList.value,
                languages: selectLanguagesList.value,
                work_type: selectWorkTypeList.value
            }, jobForm)

            let params = {
                content:JSON.stringify(jobObj),
                type:2,
                name:'job_drafts'
            }

            HOME_JOB_TEMPLATE_ADD(params).then(res => {
                if (res.code === 200) {

                    store.commit('setJobTemplateDetail', {})
                    console.log('save template success')

                    setTimeout(function (){
                        loading.close()
                        router.push({path:'/jobs/myJobs',query:{tab:'job_drafts'}})
                    }, 1500)

                }
            })

        } else {
            loading.close()
            console.log('save as template error submit')
        }
    })

}

const getJobTemplateList = () => {
    let params = {
        type:1,
        page: 1,
        limit: 100
    }

    JOB_TEMPLATE_LIST(params).then(res => {
        console.log(res)
        if (res.code === 200) {
            let jobTemplateArr = res.message.data;
            jobTemplateArr.forEach(item => {
                item.content = item.content ? JSON.parse(item.content) : {}
            })
            jobTemplateData.value = jobTemplateArr;
        }

    }).catch(err => {
        console.log(err)
    })

}


const loadJobTemplate = (item)=>{

    saveJobTemplateForm.id = item.id;

    if(item.content){
        selectAgeToTeachList.value = item.content.student_age;
        selectSubjectList.value = item.content.subject;
        selectEmploymentTypeList.value = item.content.job_type;
        selectBenefitsList.value = item.content.benefits;
        selectPnationalityList.value = item.content.preferred_nationality;
        selectTeachingCertificateList.value = item.content.certificate;
        selectLanguagesList.value = item.content.languages;
        selectWorkTypeList.value = item.content.work_type;

        if(item.content.is_online == 0){
            haveLocationStatus.value = true
        }

        jobForm.job_title = item.content.job_title
        jobForm.is_online = item.content.is_online
        jobForm.job_location = item.content.job_location
        jobForm.country_id = item.content.country_id
        jobForm.state_id = item.content.state_id
        jobForm.town_id = item.content.town_id
        jobForm.address = item.content.address
        jobForm.entry_date = item.content.entry_date
        jobForm.apply_due_date = item.content.apply_due_date
        jobForm.desc = item.content.desc
        jobForm.working_hours = item.content.working_hours
        jobForm.working_hours_start = item.content.working_hours_start
        jobForm.working_hours_end = item.content.working_hours_end
        jobForm.working_time_zone = item.content.working_time_zone
        jobForm.currency = item.content.currency
        jobForm.salary_min = item.content.salary_min
        jobForm.salary_max = item.content.salary_max
        jobForm.payment_period = item.content.payment_period
        jobForm.numbers = item.content.numbers
        jobForm.age_min = item.content.age_min
        jobForm.age_max = item.content.age_max
        jobForm.working_nums_start = item.content.working_nums_start
        jobForm.working_nums_end = item.content.working_nums_end
        jobForm.is_mom_language = item.content.is_mom_language
        jobForm.employment_type = item.content.employment_type
        jobForm.version_time = item.content.version_time
        jobForm.sex = item.content.sex
        jobForm.education = item.content.education
    }else{
        let keys = Object.keys(jobForm)
        for(let i=0;i<keys.length;i++){
            let key = keys[i]
            jobForm[key] = initJobForm[key]
        }

        selectAgeToTeachList.value = [];
        selectSubjectList.value = [];
        selectEmploymentTypeList.value = [];
        selectBenefitsList.value = [];
        selectPnationalityList.value = [];
        selectTeachingCertificateList.value = [];
        selectLanguagesList.value = [];
        selectWorkTypeList.value = [];

    }


}

const editJobTemplate = (item) => {
    postType.value = 1
    // saveJobTemplateForm.id = item.id;
    store.commit('setJobTemplateDetail', item)
}

const postJobFromTemplate = (item) => {
    postType.value = 3
    // saveJobTemplateForm.id = item.id;
    store.commit('setJobTemplateDetail', item)
}

const deleteJobTemplate = (id) => {
    let params = {
        id: id
    }
    HOME_JOB_TEMPLATE_DELETE(params).then(res => {
        if (res.code === 200) {
            getJobTemplateList()
        }
    }).catch(err => {
        console.log(err)
    })
}

const jobTemplateDetailObj = computed(()=>store.state.jobTemplateDetail)

// if(Object.keys(jobTemplateDetailObj.value).length !== 0 && jobTemplateDetailObj.value.constructor === Object){
//     loadJobTemplate(jobTemplateDetailObj.value)
// }

watch(jobTemplateDetailObj, (newValue,oldValue)=>{
    console.log(newValue,oldValue)
    if(newValue){
        loadJobTemplate(newValue)
    }
})


const paymentPeriodList = ref([])

const employmentTypeList = ref([])
const selectEmploymentTypeList = ref([])

const jobTitleList = ref([])

const benefitsList = ref([])
const selectBenefitsList = ref([])

const startDateList = ref([])

const ageToTeachList = ref([])
const selectAgeToTeachList = ref([])

const subjectList = ref([])
const selectSubjectList = ref([])

const currencyList = ref([])

const teachingCertificateList = ref([])
const selectTeachingCertificateList = ref([])

const languagesList = ref([])
const selectLanguagesList = ref([])

const workTypeList = ref([])
const selectWorkTypeList = ref([])

const pNationalityList = ref([])
const selectPnationalityList = ref([])

const aNationalityList = ref([])
const selectAnationalityList = ref([])

const sexOptions = [
    {
        value: 1,
        object_en: 'Male',
        object_cn: '男'
    },
    {
        value: 2,
        object_en: 'Female',
        object_cn: "女"
    },
    {
        value: 3,
        object_en: 'Non-binary',
        object_cn: '非二元人'
    },
    {
        value: 4,
        object_en: 'No Gender Requirements',
        object_cn: '无性别要求'
    }
]
const teachingExpList = ref([])
const educationList = ref([])

const countryObj = ref({})
const provinceObj = ref({})
const cityObj = ref({})
const countryName = ref('')
const countryNameCn = ref('')
const provinceName = ref('')
const provinceNameCn = ref('')
const cityName = ref('')
const cityNameCn = ref('')

const countryOptions = ref([])
const provinceOptions = ref([])
const cityOptions = ref([])

const haveLocationStatus = ref(false)
const showLocationCancelStatus = ref(false)
const showLocationInputStatus = ref(false)

const changeEditLocation = () => {
    haveLocationStatus.value = false;
    showLocationCancelStatus.value = true;

    countryName.value = '';
    countryNameCn.value = '';

    provinceName.value = '';
    provinceNameCn.value = '';

    cityName.value = '';
    cityNameCn.value = '';
}

const changeCancelLocation = () => {
    getBasicInfo()
    haveLocationStatus.value = true;
    showLocationCancelStatus.value = false;
}

const getAllCountry = () => {
    let params = {}
    GET_COUNTRY_LIST(params).then(res => {
        //console.log(res)
        if (res.code == 200) {
            countryOptions.value = res.message;
        }
    }).catch(err => {
        console.log(err)
    })
}

const getAllProvinces = (countryId) => {
    let params = {
        country_id: countryId
    }
    GET_COUNTRY_LIST(params).then(res => {
        //console.log(res)
        if (res.code == 200) {
            provinceOptions.value = res.message;
        }
    }).catch(err => {
        console.log(err)
    })
}

const getAllCitys = (countryId, stateId) => {
    let params = {
        country_id: countryId,
        state_id: stateId
    }
    GET_COUNTRY_LIST(params).then(res => {
        //console.log(res)
        if (res.code == 200) {
            cityOptions.value = res.message;
        }
    }).catch(err => {
        console.log(err)
    })
}

const countryChange = (e) => {
    // console.log(e)
    jobForm.state_id = undefined
    jobForm.town_id = undefined

    provinceOptions.value = []
    cityOptions.value = []

    jobForm.country_id = e.id
    countryName.value = e.name
    countryNameCn.value = e.name
    getAllProvinces(e.id)

    jobForm.job_location = countryName.value

}
const provinceChange = (e) => {
    console.log(e)
    jobForm.town_id = undefined
    cityOptions.value = []

    jobForm.state_id = e.id
    provinceName.value = e.name
    provinceNameCn.value = e.name

    getAllCitys(jobForm.country_id, e.id)
    jobForm.job_location = provinceName.value + ', ' + countryName.value
}
const cityChange = (e) => {
    console.log(e)
    showLocationInputStatus.value = true
    jobForm.town_id = e.id
    cityName.value = e.name
    cityNameCn.value = e.name
    jobForm.job_location = cityName.value + ', ' + provinceName.value + ', ' + countryName.value
}


const jobSuccessTitle = ref('')
const jobSuccessDesc = ref('')
const jobSuccessVisible = ref(false)
const postJobLoadingValue = ref(true)

// const discardJobPost() {
//     router.go(-1)
// }

const getJobDetail = (id) => {

    let params = {
        job_id: id
    }

    JOB_DETAIL(params).then(res => {
        //console.log(res)
        if (res.code == 200) {
            // detailData.value = res.message

            const workHours = res.message.working_hours
            if (workHours) {
                let workingHoursParse = JSON.parse(workHours)
                jobForm.working_hours =  workingHoursParse
                jobForm.working_hours_start = workingHoursParse.working_hours_start
                jobForm.working_hours_end = workingHoursParse.working_hours_end
            }

            let jobMessage = res.message;

            jobForm.job_title = jobMessage.job_title;
            if(jobMessage.is_online == 0){
                haveLocationStatus.value = true
            }
            jobForm.job_location = jobMessage.job_location;
            jobForm.age_min = jobMessage.age_min;
            jobForm.age_max = jobMessage.age_max;
            jobForm.is_online = jobMessage.is_online;
            jobForm.salary_min = jobMessage.salary_min.toString();
            jobForm.salary_max = jobMessage.salary_max.toString();
            jobForm.currency = jobMessage.currency;
            jobForm.business_id = jobMessage.business_id;
            jobForm.business_name = jobMessage.business_name;

            jobForm.employment_type = jobMessage.employment_type;

            jobForm.desc = jobMessage.desc;
            jobForm.numbers = jobMessage.numbers;
            jobForm.is_equal = jobMessage.is_equal;
            jobForm.is_cpr = jobMessage.is_cpr;
            jobForm.is_first_aide = jobMessage.is_first_aide;
            jobForm.is_mom_language = jobMessage.is_mom_language;
            jobForm.is_teaching_exp = jobMessage.is_teaching_exp;
            jobForm.is_interview = jobMessage.is_interview;
            jobForm.interview_name = jobMessage.interview_name;
            jobForm.nationality = jobMessage.nationality;
            jobForm.interview_nationlity = jobMessage.interview_nationlity;
            jobForm.entry_date = jobMessage.entry_date;
            jobForm.is_teaching_license = jobMessage.is_teaching_license;
            jobForm.version_time = jobMessage.version_time;

            jobForm.province = jobMessage.province;
            jobForm.city = jobMessage.city;
            jobForm.district = jobMessage.district;

            jobForm.class_size = jobMessage.class_size;

            jobForm.address = jobMessage.address;

            jobForm.international = jobMessage.international;
            jobForm.nation_address = jobMessage.nation_address;

            jobForm.working_nums_start = jobMessage.working_nums_start
            jobForm.working_nums_end = jobMessage.working_nums_end

            if (jobMessage.job_type) {

                let arr = jobMessage.job_type;

                arr.forEach((item) => {

                    if (item.object_id == 0) {

                        selectEmploymentTypeList.value.push(item.object_en)

                    } else {

                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        selectEmploymentTypeList.value.push(obj)

                    }

                })

            }

            if (jobMessage.benefits) {

                let benefitsArr = jobMessage.benefits;

                benefitsArr.forEach((item) => {

                    if (item.object_id == 0) {

                        selectBenefitsList.value.push(item.object_en)

                    } else {

                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        selectBenefitsList.value.push(obj)

                    }

                })

            }

            if (jobMessage.Acceptable) {

                let arr = jobMessage.Acceptable;

                arr.forEach((item) => {

                    if (item.object_id == 0) {

                        selectAnationalityList.value.push(item.object_en)

                    } else {

                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        selectAnationalityList.value.push(obj)

                    }

                })

            }

            if (jobMessage.Prefered_Work_Schedule_Type) {

                let arr = jobMessage.Prefered_Work_Schedule_Type;

                arr.forEach((item) => {

                    if (item.object_id == 0) {

                        selectWorkTypeList.value.push(item.object_en)

                    } else {

                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        selectWorkTypeList.value.push(obj)

                    }

                })

            }

            if (jobMessage.Nationality) {

                let arr = jobMessage.Nationality;

                arr.forEach((item) => {

                    if (item.object_id == 0) {

                        selectPnationalityList.value.push(item.object_en)

                    } else {

                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        selectPnationalityList.value.push(obj)

                    }

                })

            }

            if (jobMessage.age_to_teach) {

                let arr = jobMessage.age_to_teach;

                arr.forEach((item) => {

                    if (item.object_id == 0) {

                        selectAgeToTeachList.value.push(item.object_en)

                    } else {

                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        selectAgeToTeachList.value.push(obj)

                    }

                })

            }

            if (jobMessage.subject) {

                let arr = jobMessage.subject;

                arr.forEach((item) => {

                    if (item.object_id == 0) {

                        selectSubjectList.value.push(item.object_en)

                    } else {

                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        selectSubjectList.value.push(obj)

                    }

                })

            }

            if (jobMessage.Teaching_certificate) {
                let arr = jobMessage.Teaching_certificate;

                arr.forEach((item) => {

                    if (item.object_id == 0) {

                        selectTeachingCertificateList.value.push(item.object_en)

                    } else {

                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        selectTeachingCertificateList.value.push(obj)

                    }

                })

            }

            if (jobMessage.languages) {

                let arr = jobMessage.languages;

                arr.forEach((item) => {

                    if (item.object_id == 0) {

                        selectLanguagesList.value.push(item.object_en)

                    } else {

                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        selectLanguagesList.value.push(obj)

                    }

                })

            }

            if (jobMessage.apply_due_date != '' && jobMessage.apply_due_date != '0000-00-00') {
                jobForm.apply_due_date = jobMessage.apply_due_date;
            }

            if (jobMessage.payment_period) {
                jobForm.payment_period = jobMessage.payment_period;
            }

            if (jobMessage.street_address) {
                jobForm.street_address = jobMessage.street_address;
            }

            if (jobMessage.sex) {
                jobForm.sex = jobMessage.sex;
            }

            if (jobMessage.teaching_times) {
                jobForm.teaching_times = jobMessage.teaching_times;
            }

            if (jobMessage.education) {
                jobForm.education = jobMessage.education;
            }

        }
    }).catch(err => {
        console.log(err)

    })

}

const getBasicInfo = (identity) => {

    let params = {
        identity: identity
    }

    USER_INFO_BY_TOKEN_V2(params).then(res => {
        // //console.log(res)
        if (res.code == 200) {
            let userContact = res.message.user_contact;

            if (userContact) {
                jobForm.company_id = userContact.company_id;
                jobForm.company_name = userContact.company.company_name;

            }

        }
    }).catch(err => {
        console.log(err)
    })

}

const submitBenefits = (jobId) => {
    let expand = [];
    let objectArr = [];
    selectBenefitsList.value.forEach(item => {
        if (typeof item === 'string') {
            expand.push(item);
        } else {
            objectArr.push(item.id);
        }
    })

    let data = {
        object_pid: 6,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
    }

    JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
            console.log('benefits--submit--' + res.data);
        }
    }).catch(err => {
        console.log(err)
    })
}

const submitAgeToTeach = (jobId) => {

    let expand = [];
    let objectArr = [];
    selectAgeToTeachList.value.forEach(item => {
        if (typeof item === 'string') {
            expand.push(item);
        } else {
            objectArr.push(item.id);
        }

    })

    let data = {
        object_pid: 4,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
    }

    JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
            console.log('age to teach--submit--' + res.data);
        } else {
            console.log('age to Teach--submit--error');
            //console.log(res.msg);
        }

    }).catch(err => {
        console.log(err)
    })
}

const submitSubject = (jobId) => {
    let expand = [];
    let objectArr = [];

    selectSubjectList.value.forEach(item => {

        if (typeof item === 'string') {
            expand.push(item);
        } else {
            objectArr.push(item.id);
        }

    })

    let data = {
        object_pid: 1,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
    }

    JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
            console.log('subject--submit--' + res.data);
        } else {
            console.log('subject--submit-error');
            //console.log(res.msg);
        }

    }).catch(err => {
        console.log(err)
    })
}

const submitEmploymentType = (jobId) => {

    let expand = [];
    let objectArr = [];

    selectEmploymentTypeList.value.forEach(item => {
        // console.log(item);
        if (typeof item === 'string') {
            expand.push(item);
        } else {
            objectArr.push(item.id);
        }
    })

    let data = {
        object_pid: 3,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
    }

    JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
            console.log('employment--submit--' + res.data);
        } else {
            console.log('employment--submit--error');
        }

    }).catch(err => {
        console.log(err)
    })
}

const submitTeachingCertificate = (jobId) => {
    let expand = [];
    let objectArr = [];
    selectTeachingCertificateList.value.forEach(item => {
        if (typeof item === 'string') {
            expand.push(item);
        } else {
            objectArr.push(item.id);
        }
    })

    let data = {
        object_pid: 7,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
    }

    JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
            console.log('teachingcertificate--submit--' + res.data);
        } else {
            console.log('teachingcertificate--submit--error');
        }

    }).catch(err => {
        console.log(err)
    })
}

const submitLanguages = (jobId) => {
    let expand = [];
    let objectArr = [];
    selectLanguagesList.value.forEach(item => {
        if (typeof item === 'string') {
            expand.push(item);
        } else {
            objectArr.push(item.id);
        }

    })

    let data = {
        object_pid: 2,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
    }

    JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
            console.log('languages--submit--' + res.data);
        } else {
            console.log('languages--submit--error');
        }

    }).catch(err => {
        console.log(err)
    })
}

const submitWorkType = (jobId) => {

    let expand = [];
    let objectArr = [];
    selectWorkTypeList.value.forEach(item => {

        if (typeof item === 'string') {
            expand.push(item);
        } else {
            objectArr.push(item.id);
        }

    })

    let data = {
        object_pid: 184,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
    }

    JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
            console.log('work type--submit--' + res.data);
        } else {
            console.log('work type --submit--error');
        }

    }).catch(err => {
        console.log(err)
    })
}

const submitPnationality = (jobId) => {

    let expand = [];
    let objectArr = selectPnationalityList.value;

    selectPnationalityList.value.forEach(item => {

        if (typeof item === 'string') {
            expand.push(item);
        } else {
            objectArr.push(item.id);
        }

    })

    let data = {
        object_pid: 203,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
    }

    JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
            console.log('p nationality--submit--' + res.data);
        } else {
            console.log('p nationality --submit--error');
        }

    }).catch(err => {
        console.log(err)
    })
}

const submitAnationality = (jobId) => {
    let expand = [];
    let objectArr = selectAnationalityList.value;

    selectAnationalityList.value.forEach(item => {

        if (typeof item === 'string') {
            expand.push(item);
        } else {
            objectArr.push(item.id);
        }

    })

    let data = {
        object_pid: 239,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
    }

    JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
            console.log('a nationality--submit--' + res.data);
        } else {
            console.log('a nationality --submit--error');
        }

    }).catch(err => {
        console.log(err)
    })
}

const getUserObjectList = () => {

    let data = {
        token: localStorage.getItem('token')
    }
    USER_OBJECT_LIST(data).then(res => {
        if (res.code == 200) {
            benefitsList.value = res.message.filter(item => item.pid === 6); //benefits
            ageToTeachList.value = res.message.filter(item => item.pid === 4); //age to teach
            employmentTypeList.value = res.message.filter(item => item.pid === 3); //employment type
            paymentPeriodList.value = res.message.filter(item => item.pid === 111); // payment period
            currencyList.value = res.message.filter(item => item.pid === 117); // currency
            // console.log(this.currencyList)
            teachingCertificateList.value = res.message.filter(item => item.pid === 7); //teaching certificate ...
            teachingExpList.value = res.message.filter(item => item.pid === 120); //teaching exp
            educationList.value = res.message.filter(item => item.pid === 125); // education
            languagesList.value = res.message.filter(item => item.pid === 2); // language ..
            jobTitleList.value = res.message.filter(item => item.pid === 103); //job title
            startDateList.value = res.message.filter(item => item.pid === 108); // start date
            subjectList.value = res.message.filter(item => item.pid === 1); //subject
            workTypeList.value = res.message.filter(item => item.pid === 184); //subject
            pNationalityList.value = res.message.filter(item => item.pid === 203); //subject
            aNationalityList.value = res.message.filter(item => item.pid === 239); //subject

        }
    }).catch(err => {
        console.log(err)
    })
}

const submitJob = (formEl) => {

    formEl.validate((valid) => {
        if (valid) {

            const loading = ElLoading.service({
                text: 'Loading...'
            })

            if (jobForm.is_online) {
                jobForm.job_location = ''
            }

            jobForm.version_time = route.query.version_time;

            let workingHoursObj = {
                working_hours_start: jobForm.working_hours_start,
                working_hours_end: jobForm.working_hours_end,
                working_time_zone: jobForm.working_time_zone
            }

            jobForm.working_hours = JSON.stringify(workingHoursObj)

            if (route.query.job_id) {
                jobForm.job_id = route.query.job_id
            }

            let data = Object.assign({}, jobForm);

            ADD_JOB(data).then(res => {
                // //console.log(res);
                if (res.code == 200) {

                    let jobId = res.data.job_id;

                    if (selectBenefitsList.value.length > 0) {
                        submitBenefits(jobId);
                    }

                    if (selectAgeToTeachList.value.length > 0) {
                        submitAgeToTeach(jobId);
                    }

                    if (selectSubjectList.value.length > 0) {
                        submitSubject(jobId);
                    }

                    if (selectEmploymentTypeList.value.length > 0) {
                        submitEmploymentType(jobId)
                    }

                    if (selectTeachingCertificateList.value.length > 0) {
                        submitTeachingCertificate(jobId);
                    }

                    if (selectLanguagesList.value.length > 0) {
                        submitLanguages(jobId);
                    }

                    if (selectWorkTypeList.value.length > 0) {
                        submitWorkType(jobId)
                    }

                    if (selectPnationalityList.value.length > 0) {
                        submitPnationality(jobId)
                    }

                    if (selectAnationalityList.value.length > 0) {
                        submitAnationality(jobId)
                    }


                    setTimeout(function () {
                        loading.close()
                        store.commit('setJobTemplateDetail', {})

                        ElMessage({
                            type:'success',
                            message:'Job Posted Successfully',
                            grouping:true
                        })
                        router.push({path:'/jobs/myJobs'})
                        // jobSuccessTitle.value = 'Success'
                        // jobSuccessDesc.value = 'Your Job Submission ' + jobForm.job_title + ' has been successfully sent.'
                        // jobSuccessVisible.value = true;
                    }, 1500)

                }
            }).catch(err => {
                console.log(err)
                loading.close()
            })

        } else {
            console.log('error submit!!')
            ElMessage({
                type: 'warning',
                message: 'Please complete all required fields',
                grouping: true
            })
        }
    })

}

const submitJobSuccess = () => {
    jobSuccessVisible.value = false
    router.push('/jobs/home')

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
    // getBasicInfo(identity)

    getAllCountry()

    getUserObjectList()

    let jobId = route.query.job_id;
    if (jobId) {
        getJobDetail(jobId)
        isEditing.value = true
    }

    setTimeout(function () {
        postJobLoadingValue.value = false
    }, 3000)

    if(route.query.post_from === 'template'){
        postType.value = 3
        getJobTemplateList()
    }

    if(Object.keys(jobTemplateDetailObj.value).length !== 0 && jobTemplateDetailObj.value.constructor === Object){
         loadJobTemplate(jobTemplateDetailObj.value)
    }

})

onUnmounted(() => {
    updateWindowHeight()
    window.onresize = null
})

</script>

<style scoped>

.form-width-388 {
    width: 388px;
}

.xll-form-location {
    display: flex;
    flex-direction: column;
}

.xll-form-location-text span {
    font-size: 14px;
    font-weight: 400;
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
    color: #667085;
}

.xll-form-location-select {
    flex-direction: column;
    display: flex;
}

.xll-form-location-action {

}

:deep(.el-dialog__title){
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #101828;
}

:deep(.el-checkbox__label){
    font-weight: 400;
    font-size: 12px;
    color: #667085;
}

.form-margin-top-18 {
    margin-top: 18px;
}

.form-margin-bottom-18 {
    margin-bottom: 18px;
}

.collapse-item-container {
    margin: 40px;
}

.collapse-item-t {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 30px;
}

.collapse-item-t-label span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #101828;
}

.collapse-item-t-line {
    width: calc(100% - 200px);
    height: 1px;
    background-color: #D0D5DD;
}

.post-container {
    width: 100%;
    height: calc(var(--i-window-height) - 120px);
    background-color: #FFFFFF;
}

.post-bg {
    width: 100%;
}

.post-job-t {
    margin: 40px;
}

.post-job-t-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #1D2939;

}

.post-job-tabs {
    display: flex;
    flex-direction: row;
    margin-top: 24px;
}

.post-job-tab {
    margin-right: 40px;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px 16px;

    border: 1px solid #D0D5DD;
    border-radius: 12px;
    cursor: pointer;
}

.post-job-tab-active {
    border: 1px solid #A391FF;
}

.post-job-tab-circle {
    width: 4px;
    height: 4px;
    border: 6px solid #D0D5DD;
    border-radius: 50%;
    background: transparent;

}

.post-job-tab-circle-active {
    border-color: #A391FF;
}

.post-job-tab-r {
    margin-left: 16px;
}

.post-job-tab-r-t span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #1D2939;

}

.post-job-tab-r-b {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
    margin-top: 8px;
}

.form-t-container {
    margin: 0 40px;
    padding: 8px 0 24px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #D0D5DD;
}

.form-t-l {

}

.form-t-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;

    color: #101828;
}

.form-t-tips {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    color: #667085;
}

.form-t-r {

}

.job-form-container {

}


.job-detail-china-tips-2 a {
    color: #00b3d2;
    font-size: 16px;
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: bold;
    padding: 0 10px;
}

.job-form-container {

}


.xll-salary-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.xll-currency-select {
    width: 100px;
}

.xll-min-salary {
    margin-left: 5px;
    width: 120px;
}

.xll-salary-line {
    margin: 0 16px;
    text-align: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #101828;
}

.xll-max-salary {
    margin-left: 5px;
    width: 120px;
}

.xll-payment-select {
    margin-left: 5px;
}

.post-job-bottom-actions {
    text-align: right;
    margin: 80px 60px 60px 40px;
}

@media screen and (min-width: 1200px) {


}

@media screen and (max-width: 768px) {

    .job-form-container {
        height: calc(var(--i-window-height) - 245px);
    }

    :deep(.mce-container *){
        white-space: normal;
    }

    .working-hours-show-container {
        margin-bottom: 15px;
    }

}

</style>