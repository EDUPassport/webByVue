<template>
    <div class="jobs-filter-container">

        <div class="jobs-filter-t">
            <span>Filter</span>
            <el-button link @click="clearAll()">Clear all</el-button>
        </div>

        <el-scrollbar class="jobs-filter-scroll">
            <div class="jobs-filter-item">
                <div class="jobs-filter-label">Search</div>
                <div class="jobs-filter-c">
                    <el-input size="small" v-model="jobTitle" placeholder="Search" @input="jobTitleChange" @change="jobTitleChange"></el-input>
                </div>
            </div>
            <div class="jobs-filter-item">
                <div class="jobs-filter-label">Date Post</div>
                <div class="jobs-filter-c">
                    <el-select
                        size="small"
                        v-model="datePosted"
                        clearable
                        filterable
                        placeholder="Anytime"
                        @change="datePostedChange"
                    >
                        <el-option
                            v-for="item in datePostedOptions"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">

                        </el-option>

                    </el-select>
                </div>
            </div>

            <div class="jobs-filter-item">
                <div class="jobs-filter-label">Location</div>
                <div class="jobs-filter-c">
                    <el-select class="jobs-filter-select"
                               size="small"
                               v-model="location"
                               clearable
                               filterable
                               :placeholder="locationPlaceholder"
                               @change="search()"
                    >
                        <el-option
                            v-for="item in locationOptions"
                            :key="item.id"
                            :label="item.CityPinyin"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>

            <div class="jobs-filter-item">
                <div class="jobs-filter-label">Job Type</div>
                <div class="jobs-filter-c">
                    <el-checkbox-group
                        @change="jobTypeChange"
                        v-model="employmentType">
                        <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                            <div v-for="(item,i) in employmentTypeOptions" :key="i" style="flex-basis: 50%;">
                                <el-checkbox :label="item.id">
                                    {{ item.object_en }}
                                </el-checkbox>
                            </div>
                        </div>

                    </el-checkbox-group>

                </div>
            </div>

            <div class="jobs-filter-item">
                <div class="jobs-filter-label">
                    Salary Range
                </div>
                <div class="jobs-filter-c">
                    <div>
                        <el-slider v-model="salary"
                                   range
                                   size="small"
                                   show-input
                                   :max="10000"
                                   @change="salaryChange"
                                   :format-tooltip="formatToolTip"
                        ></el-slider>
                    </div>
                    <div style="display: flex;flex-direction: row;">
                        <div style="margin-right: 30px;">
                            <el-input
                                v-model="salaryMin"
                                oninput="value=value.replace(/[^\d]/g,'')"
                                size="small"
                                placeholder="$100"
                                @input="salaryMinInput">
                                <template #prefix>
                                    $
                                </template>
                            </el-input>
                        </div>
                        <div>
                            <el-input
                                v-model="salaryMax"
                                oninput="value=value.replace(/[^\d]/g,'')"
                                size="small"
                                placeholder="$4,000"
                                @input="salaryMaxInput">
                                <template #prefix>
                                    $
                                </template>
                            </el-input>
                        </div>
                    </div>

                </div>

<!--                <div class="jobs-filter-c" style="margin-top: 25px;">-->
<!--                    <el-select class="jobs-filter-select"-->
<!--                               v-model="paymentPeriod"-->
<!--                               clearable-->
<!--                               @change="paymentPeriodChange"-->
<!--                               value-key="id"-->
<!--                               placeholder="Pay period"-->
<!--                               size="small"-->
<!--                    >-->
<!--                        <el-option-->
<!--                            v-for="item in paymentPeriodOptions"-->
<!--                            :key="item.id"-->
<!--                            :label="item.object_en"-->
<!--                            :value="item.id"-->
<!--                        >-->
<!--                        </el-option>-->
<!--                    </el-select>-->

<!--                </div>-->
            </div>

            <div class="jobs-filter-item">
                <div class="jobs-filter-label">Age Group</div>
                <div class="jobs-filter-c">
                    <el-checkbox-group @change="studentAgeChange" v-model="studentAge">
                        <div style="display: flex;flex-direction: row;flex-wrap:wrap;">
                            <div v-for="(item,i) in ageToTeachOptions" :key="i" style="flex-basis: 100%;">
                                <el-checkbox :label="item.id">
                                    {{ item.object_en }}
                                </el-checkbox>
                            </div>
                        </div>
                    </el-checkbox-group>
                </div>
            </div>

<!--            <div class="jobs-filter-item">-->
<!--                <div class="jobs-filter-label">Work schedule</div>-->
<!--                <div class="jobs-filter-c">-->
<!--                    <el-checkbox-group @change="workTypeChange" v-model="workType">-->
<!--                        <div style="display: flex;flex-direction: row;flex-wrap:wrap;">-->
<!--                            <div v-for="(item,i) in workTypeOptions" :key="i" style="flex-basis: 100%;">-->
<!--                                <el-checkbox :label="item.id">-->
<!--                                    {{ item.object_en }}-->
<!--                                </el-checkbox>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </el-checkbox-group>-->
<!--                </div>-->
<!--            </div>-->
        </el-scrollbar>

    </div>

</template>

<script setup>

import {ref, onMounted,defineEmits} from 'vue'
import {useRoute } from 'vue-router'
import {JOBS_AREA_LIST, JOBS_COUNTRY_LIST, USER_OBJECT_LIST} from "@/api/api";
import {formatDateYmdHis} from '@/utils/tools'

const route = useRoute()
const emit = defineEmits(['search'])
const jobTitle = ref('')
const location = ref('')
const salary = ref([100, 4000])
const salaryMin = ref(100)
const salaryMax = ref(4000)

const salaryMinInput = ()=>{
    salary.value[0] = parseInt(salaryMin.value)
}

const salaryMaxInput = ()=>{
    salary.value[1] = parseInt(salaryMax.value)
}

const paymentPeriod = ref('')
const employmentType = ref([])
const studentAge = ref([])
const workType = ref([])
const datePosted = ref([])

const locationOptions = ref([])
const ageToTeachOptions = ref([])
const employmentTypeOptions = ref([])
const paymentPeriodOptions = ref([])
const currencyOptions = ref([])
const workTypeOptions = ref([])
const datePostedOptions = ref([
    {
        name:'Anytime',
        value:0
    },
    {
        name:'7 Days',
        value: 7
    },
    {
        name:'14 Days',
        value: 14
    },
    {
        name:'21 Days',
        value: 21
    },
    {
        name:'30 Days',
        value: 30
    }
])

const isSalaryChange = ref(false)

const locationPlaceholder = ref('')

const clearAll = ()=>{
    jobTitle.value = ''
    location.value = ''
    employmentType.value = []
    studentAge.value = []
    workType.value = []
    paymentPeriod.value = []
    datePosted.value = 0
    isSalaryChange.value = false
    salary.value = [100, 4000]
    salaryMax.value = 4000
    salaryMin.value = 100

    let data = {
        job_title: '',
        location: '',
        employment_type: [],
        student_age: [],
        work_type: [],
        payment_period: '',
        c_time:'',
        salary:[100,4000]
    }

    emit('search', data)
}
const search = () => {

    let data = {
        job_title: jobTitle.value,
        location: location.value,
        employment_type: employmentType.value,
        student_age: studentAge.value,
        work_type: workType.value,
        payment_period: paymentPeriod.value
    }

    if (datePosted.value) {
        let nowDate = new Date()
        nowDate.setDate(nowDate.getDate() - datePosted.value)
        data.c_time = formatDateYmdHis(nowDate)
    }

    if (isSalaryChange.value) {
        data.salary = salary.value
    }

    emit('search', data)

}

const getUserObjectList = () => {

    let userObjectFromStorage = localStorage.getItem('userObject')
    if(userObjectFromStorage){
        let userObjectData = JSON.parse(userObjectFromStorage)

        ageToTeachOptions.value = userObjectData.filter(item => item.pid === 4); //age to teach
        employmentTypeOptions.value = userObjectData.filter(item => item.pid === 3); //employment type
        paymentPeriodOptions.value = userObjectData.filter(item => item.pid === 111); // payment period
        currencyOptions.value = userObjectData.filter(item => item.pid === 117); // currency
        workTypeOptions.value = userObjectData.filter(item => item.pid === 184); //subject

    }else{

        USER_OBJECT_LIST().then(res => {
            if (res.code == 200) {
                localStorage.setItem('userObject', JSON.stringify(res.message))

                ageToTeachOptions.value = res.message.filter(item => item.pid === 4); //age to teach
                employmentTypeOptions.value = res.message.filter(item => item.pid === 3); //employment type
                paymentPeriodOptions.value = res.message.filter(item => item.pid === 111); // payment period
                currencyOptions.value = res.message.filter(item => item.pid === 117); // currency
                workTypeOptions.value = res.message.filter(item => item.pid === 184); //subject

            }
        }).catch(err => {
            console.log(err)

        })
    }

}

const getJobCountryList = () => {
    let params = {}
    JOBS_COUNTRY_LIST(params).then(res => {
        if (res.code == 200) {
            locationOptions.value = res.message;
        }
    }).catch(err => {
        console.log(err)
    })
}
const getJobsAreaList = () => {
    let params = {}
    JOBS_AREA_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            locationOptions.value = res.message;
        }
    }).catch(err => {
        console.log(err)

    })
}
const formatToolTip = (value) => {
    return '$' +  value;
}

const jobTitleChange = ()=>{
    search()
}
const salaryChange = (e) => {
    // console.log(e)
    salaryMin.value = e[0]
    salaryMax.value = e[1]
    isSalaryChange.value = true
    search()
}

// const paymentPeriodChange = () => {
//     search()
// }
const jobTypeChange = () => {
    search()
}
const studentAgeChange = () => {
    search()
}
/*const workTypeChange = () => {
    search()
}*/

const datePostedChange = () => {
    search()
}


onMounted(() => {
    getUserObjectList()
    let envName = process.env.VUE_APP_ENV_NAME
    if (envName === 'development' || envName === 'production') {
        locationPlaceholder.value = 'Select Location'
        getJobCountryList()
        let countryValue = route.query.country;
        if (countryValue && countryValue != '') {
            location.value = Number(countryValue)
        }
    }

    if (envName === 'developmentCN' || envName === 'productionCN') {
        locationPlaceholder.value = 'Select Location'
        getJobsAreaList()
        let cityValue = route.query.city;
        if (cityValue && cityValue != '') {
            location.value = Number(cityValue)
        }
    }

})
</script>

<style scoped>

:deep(.el-checkbox__label){
    font-size: 11px;
}

:deep(.el-slider__bar){
    background-color: #6648FF;
}

.jobs-filter-container {
    width: 240px;
    height: calc(var(--i-window-height) - 180px);
    box-sizing: border-box;
    background-color: #FFFFFF;
    border: 1px solid #D0D5DD;
    border-radius: 11px;
}

.jobs-filter-scroll {
    height: calc(100% - 60px)
}

.jobs-filter-t {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 13px 16px;
    border-bottom: 1px solid #D0D5DD;
}

.jobs-filter-t span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #667085;
}

.jobs-filter-item {
    margin: 12px;
    border-bottom: 1px solid #D0D5DD;
    padding-bottom: 16px;
}

.jobs-filter-item:last-child {
    border-bottom: none;
}

.jobs-filter-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #344054;
}

.jobs-filter-c {
    margin-top: 10px;
}


@media screen and (min-width: 769px) {

}

@media screen and (max-width: 1385px) {
    .job-pool-filter{
        margin-left: 20px;
    }
}


</style>