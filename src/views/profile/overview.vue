<template>
    <div class="bg">
        <el-scrollbar class="overview-container">

            <div class="contributor-dashboard" v-if="identity == 6 && contributorIdentities.length>0">
                <div class="c-d-items">
                    <template v-for="(item,i) in contributorIdentities" :key="i">
                        <div class="c-d-item"
                             :class="switchContributorCompanyId === item.id ? 'c-d-item-active' : '' "
                             v-if="i < card_limit"
                             @click="switchContributor(item.id, 6, 2)"
                             >
                            <div class="c-d-item-t">
                                <div class="c-d-circle"
                                     :class="switchContributorCompanyId === item.id ? 'c-d-circle-active' : '' "
                                ></div>
                                <span>{{item.company_name ? item.company_name : item.name}}</span>
                            </div>

                            <el-row>
                               
                                <el-col :span="12" v-if="item.identity == 2 || item.identity == 3 || item.identity == 4">
                                    <div class="c-d-item-m">
                                        Jobs Posted
                                    </div>
                                    <div class="c-d-item-b-l">{{ item.count }}</div>
                                </el-col>
                                <el-col :span="12" v-else-if="item.identity == 5">
                                    <div class="c-d-item-m">
                                        Deals Posted
                                    </div>
                                    <div class="c-d-item-b-l">{{ item.count }}</div>
                                </el-col>
                                <el-col :span="12" class="c-d-col">
                                    <div class="c-d-item-m">
                                        Events Posted
                                    </div>
                                    <div class="c-d-item-b-l">{{ item.event }}</div>
                                </el-col>
                            </el-row>
                        </div>

                    </template>
                </div>

                <div class="c-d-more" v-if="contributorIdentities.length > card_limit">
                    <el-button link @click="seeMore()">See More</el-button>
                </div>

            </div>

            <el-dialog
                v-model="contributorSwitchBusinessVisible"
                title="Business Accounts"
                :width="contributorSwitchBusinessDialogWidth"
                align-center
            >
                <el-scrollbar class="c-d-items-dialog">
                    <template v-for="(item,i) in contributorIdentities" :key="i">
                        <div class="c-d-item-dialog"  >
                            <div class="c-d-item-t">
                                <div class="c-d-circle"></div>
                                <span>{{item.company_name ? item.company_name : item.company_id}}</span>
                            </div>
                            <div class="c-d-item-m">
                                Jobs Posted
                            </div>
                            <div class="c-d-item-b">
                                <div class="c-d-item-b-l">1</div>
                                <div class="c-d-item-b-r">
                                    <el-button type="info" icon="setting">Setting</el-button>
                                </div>
                            </div>
                        </div>

                    </template>
                </el-scrollbar>

            </el-dialog>

            <div class="dashboard-container">
                <template v-if="identity === 10">
                    <div class="dashboard-b-item">
                        <applicationsUpdates></applicationsUpdates>
                    </div>
                    <div class="dashboard-b-item">
                        <favoritedJobsDashboard></favoritedJobsDashboard>
                    </div>
                </template>

                <div class="dashboard-t-actions" v-if="identity == 2 || identity == 3 || identity == 4 || identity == 5">
                    <el-button plain @click="turnUserManagement()">User Management</el-button>
                    <template v-if="profilePercentage <= 60">
                        <el-tooltip
                            effect="light"
                            content="Finish setting up profile to post a job"
                            placement="bottom"
                        >
                            <el-button
                                v-if="identity == 2 || identity == 3 || identity == 4"
                                type="info"
                                icon="Plus"
                            >
                                Post a Job
                            </el-button>
                        </el-tooltip>
                    </template>
                    <template v-else>
                        <el-button
                            v-if="identity == 2 || identity == 3 || identity == 4"
                            type="primary"
                            icon="Plus"
                            :disabled="profilePercentage <= 60"
                            @click="postJob()">
                            Post a Job
                        </el-button>
                    </template>

                </div>

                <un-complete-profile-prompt
                    :percent="profilePercentage"
                    tips="Get started and complete your profile to start applying for jobs"
                    v-if="(identity == 1 && profilePercentage <= 80 ) || (identity == 2 && profilePercentage <= 60) || (identity == 5 && profilePercentage <= 60)">
                </un-complete-profile-prompt>

                <template v-if="identity == 1">

                    <div class="dashboard-t-container">

                        <div class="dashboard-t-item dashboard-t-item-gap">
                            <div class="dashboard-t-item-t">Jobs Applied</div>
                            <compareUpDownPercentage
                                    :now-value="educatorJobApplyCountForNow"
                                    :percent="educatorJobApplyCountPercent"
                            >
                            </compareUpDownPercentage>
                            <div class="dashboard-t-item-chart">
                                <vsLastMonthCharts :percent="educatorJobApplyCountPercent"></vsLastMonthCharts>
                            </div>
                        </div>

                        <div class="dashboard-t-item dashboard-t-item-gap">
                            <div class="dashboard-t-item-t">Event Registered</div>
                            <compareUpDownPercentage
                                    :now-value="educatorEventRegisterForNow"
                                    :percent="educatorEventRegisterPercent"
                            >
                            </compareUpDownPercentage>
                            <div class="dashboard-t-item-chart">
                                <vsLastMonthCharts :percent="educatorEventRegisterPercent"></vsLastMonthCharts>
                            </div>
                        </div>

                        <div class="dashboard-t-item">
                            <div class="dashboard-t-item-t">Deal Offers</div>
                            <div class="dashboard-t-item-m-other">
                                Discover up to 35% off from vendors across the Globe
                            </div>
                            <div class="dashboard-t-item-b-1">
                                <el-button size="small" type="info" @click="viewDeals()">View Deals</el-button>
                            </div>
                        </div>

                    </div>

                    <div class="dashboard-b-container">
                        <div class="dashboard-b-item">
                            <dailyJobMatch></dailyJobMatch>
                        </div>
                        <div class="dashboard-b-item">
                            <metricsComponent :options="educatorMetricsOptions"
                                              @dateChange="customDateChange"
                                              @howLongChange="changeHowLong">
                            </metricsComponent>
                        </div>

                    </div>

                </template>

                <template v-if="identity == 2 || identity == 3 || identity == 4">

                    <div class="dashboard-t-container">

                        <div class="dashboard-t-item-business dashboard-t-item-gap">
                            <div class="dashboard-t-item-t">Jobs Posted</div>
                            <compareUpDownPercentage
                                    :now-value="businessJobsPostedForNow"
                                    :percent="businessJobsPostedPercent"
                            >
                            </compareUpDownPercentage>
                            <div class="dashboard-t-item-chart">
                                <vsLastMonthCharts :percent="businessJobsPostedPercent" color="#12B76A"
                                                   areaColor="#ecfdf3"></vsLastMonthCharts>
                            </div>
                        </div>

                        <div class="dashboard-t-item-business dashboard-t-item-gap">
                            <div class="dashboard-t-item-t">Job Views</div>
                            <compareUpDownPercentage
                                    :now-value="businessJobViewsForNow"
                                    :percent="businessJobViewsPercent"
                            >
                            </compareUpDownPercentage>
                            <div class="dashboard-t-item-chart">
                                <vsLastMonthCharts :percent="businessJobViewsPercent"></vsLastMonthCharts>
                            </div>
                        </div>

                        <div class="dashboard-t-item-business dashboard-t-item-gap">
                            <div class="dashboard-t-item-t">Fill Rate</div>
                            <compareUpDownPercentage
                                    :now-value="businessFillRateForNow"
                                    :percent="businessFillRatePercent"
                            >
                            </compareUpDownPercentage>
                            <div class="dashboard-t-item-chart">
                                <vsLastMonthCharts :percent="businessFillRatePercent"></vsLastMonthCharts>
                            </div>
                        </div>

                        <div class="dashboard-t-item-business dashboard-t-item-gap">
                            <div class="dashboard-t-item-t">Events Posted</div>
                            <compareUpDownPercentage
                                    :now-value="businessEventsPostedForNow"
                                    :percent="businessEventsPostedPercent"
                            >
                            </compareUpDownPercentage>
                            <div class="dashboard-t-item-chart">
                                <vsLastMonthCharts :percent="businessEventsPostedPercent"></vsLastMonthCharts>
                            </div>
                        </div>

                    </div>

                    <div class="dashboard-b-container">
                        <div class="dashboard-b-item">
                            <NewApplications :data="myApplicationsData"
                                             @updateIndex="updateApplicationIndex">
                            </NewApplications>
                        </div>
                        <div class="dashboard-b-item">
                            <metricsComponent :options="businessMetricsOptions"
                                              @dateChange="customDateChange"
                                              @howLongChange="changeHowLong">
                            </metricsComponent>
                        </div>

                    </div>

                </template>

                <template v-if="identity == 5">

                    <!-- <div class="dashboard-1-container">
                        <div class="dashboard-1">
                  <span>
                    More awesome widgets are coming soon...
                  </span>
                        </div>
                    </div> -->
                    <div class="dashboard-t-container">

                    <div class="dashboard-t-item-vendor dashboard-t-item-gap">
                            <div class="dashboard-t-item-t">Deal Posted</div>
                            <compareUpDownPercentageTwo
                                    :now-value="vendorDealPostedCountForNow"                            >
                            </compareUpDownPercentageTwo>

                            <div class="dashboard-t-item-chart">
                                <vsLastMonthChartsTwo :percent="vendorDealPostedPercent" color="#12B76A"
                                                   areaColor="#ecfdf3"></vsLastMonthChartsTwo>
                            </div>
                        </div>
                        <div class="dashboard-t-item-vendor dashboard-t-item-gap">
                            <div class="dashboard-t-item-t">Redeemed Codes</div>
                            <compareUpDownPercentageTwo
                                    :now-value="13"                            >
                            </compareUpDownPercentageTwo>

                            <div class="dashboard-t-item-chart">
                                <vsLastMonthChartsTwo :percent="0" color="#12B76A"
                                                   areaColor="#ecfdf3"></vsLastMonthChartsTwo>
                            </div>
                        </div>
                        <div class="dashboard-t-item-vendor dashboard-t-item-gap">
                            <div class="dashboard-t-item-t">Total Views</div>
                            <compareUpDownPercentageTwo
                                    :now-value="vendorTotalViewsForNow"                            >
                            </compareUpDownPercentageTwo>

                            <div class="dashboard-t-item-chart">
                                <vsLastMonthChartsTwo :percent="vendorTotalViewsPercent" color="#12B76A"
                                                   areaColor="#ecfdf3"></vsLastMonthChartsTwo>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard-b-container">
                        <div class="dashboard-b-item">
                            <dealUpdates :deals="recentDealData"
                                            >
                            </dealUpdates>
                        </div>
                        <div class="dashboard-b-item">
                            <metricsComponent :options="VendorMetricsOptions"
                                              :show="false"
                                              @dateChange="customDateChange"
                                              @howLongChange="changeHowLong">
                            </metricsComponent>
                        </div>

                    </div>

                </template>

            </div>

        </el-scrollbar>
    </div>
</template>

<script setup>
import {
    ALL_JOB_RESUME, BUSINESS_JOB_SHORTLISTED, BUSINESS_JOB_VIEWS,
    EDUCATOR_STATIC_DATA,
    EVENTS_MY_EVENT,
    HOME_JOB_SHORTLISTED, HOME_USER_CHANGE_IDENTITY,
    HOME_USER_METRICS,
    MY_DEALS, SWITCH_IDENTITY_V2, USER_CONTRIBUTOR_ACTIVATION,
    USER_INFO_BY_TOKEN_V2, USER_MENU_LIST, USER_POST_JOB_COUNT, VENDOR_INDEX_DATA
} from '@/api/api';

// import {onBeforeRouteUpdate} from "vue-router";
import {ref, inject,onMounted, watch, onUnmounted, computed} from "vue";
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'

import NewApplications from "@/components/business/newApplications";
import dailyJobMatch from "@/components/educator/dailyJobMatch";
import applicationsUpdates from "@/components/educator/applicationsUpdates";
import favoritedJobsDashboard from "@/components/educator/favoritedJobsDashboard";
// import activeDealsDashboard from "@/components/vendor/activeDealsDashboard";
// import activeEventsDashboard from "@/components/vendor/activeEventsDashboard";
import dealUpdates from "@/components/vendor/dealUpdates";

import {randomString} from "@/utils";
import {
    nowValueFormat,
    getPercentByNowAndPrev,
    updateWindowHeight,
    nowDateYmd,
    dateYmdAgo,
    dateYmdAndNumber
} from "@/utils/tools";
// import {removeZohoFloat, removeJs} from "@/utils/tools";
import metricsComponent from "@/components/metrics/metrics.vue";
import vsLastMonthCharts from "@/components/metrics/vsLastMonthCharts.vue";
import unCompleteProfilePrompt from "@/components/unCompleteProfilePrompt.vue";
import compareUpDownPercentage from "@/components/metrics/compareUpDownPercentage.vue";
import compareUpDownPercentageTwo from "@/components/metrics/compareUpDownPercentageTwo.vue";
import vsLastMonthChartsTwo from "@/components/metrics/vsLastMonthChartsTwo.vue";

import {ElMessage, ElNotification,ElMessageBox} from 'element-plus'
import vueCookies from 'vue-cookies'

const store = useStore()
const router = useRouter()
const route = useRoute()
// const currentUser = computed(() => store.state.currentUser)
const identity = computed(()=>store.state.identity)

// const isThirdCompanyStatus = ref(store.state.isThirdCompanyStatus)

const dealsData = ref([])
const eventsData = ref([])

const getUserMenuList = (uid, identity, companyId, cId) => {

    let params = {
        user_id: uid,
        identity: identity,
        company_id: companyId,
        create_user_id: cId,
        page: 1,
        limit: 1000
    }
    USER_MENU_LIST(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
            let str = JSON.stringify(res.message)
            localStorage.setItem('menuData', str)
            store.commit('menuData', res.message)
        }
    }).catch(err => {
        console.log(err)
    })
}

const switchAndShowContributor = ()=>{

    HOME_USER_CHANGE_IDENTITY().then(res=>{
        console.log(res)
        if(res.code === 200){
            let uid = localStorage.getItem('uid')

            localStorage.setItem('identity', 6)
            store.commit('identity', 6)
            store.commit('setSwitchIdentityStatus', true)

            getUserMenuList(uid, 6, 0, uid)

        }
    }).catch(err=>{
        console.log(err)
    })
}


const contributorActived = (params)=>{
    USER_CONTRIBUTOR_ACTIVATION(params).then(res=>{
        console.log(res)
        if(res.code === 200){
            console.log('激活contributor成功')
            switchAndShowContributor()
        }
    }).catch(err=>{
        ElMessage({
            type:'error',
            message:err,
            grouping:true
        })
    })
}

const contributorSwitchBusinessVisible = ref(false)
const contributorSwitchBusinessDialogWidth = ref('600px')

const goEasy = inject('goEasy');
const disconnectIm = ()=> {

    //connected
    if(goEasy.getConnectionStatus() === 'connected'){

        goEasy.disconnect({
            onSuccess: () => {
                console.log('Disconnect GoEasy successful')
                store.commit('setImUnreadTotal', 0)
            },
            onFailed: (error) => {
                console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
            }
        })

    }

}

const switchContributorCompanyId = ref(0)
const switchContributor = (companyId, identity,language)=>{
    let params = {
        company_id: companyId,
        language: language,
        identity: identity
    }

    SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
            switchContributorCompanyId.value = companyId
            disconnectIm()

            let str = JSON.stringify(res.message)

            localStorage.setItem('menuData', str)
            store.commit('menuData', res.message)

            USER_INFO_BY_TOKEN_V2({
                identity: identity
            }).then(res => {
                // console.log(res)
                if (res.code == 200) {

                    let userContact = res.message.user_contact;

                    localStorage.setItem('is_third_company', userContact.is_third_company)
                    localStorage.setItem('company_id', userContact.company_id)
                    localStorage.setItem('identity', userContact.identity)

                    store.commit('identity', userContact.identity)
                    store.commit('currentCompanyId', userContact.company_id)
                    store.commit('changeThirdCompanyStatus', res.message.user_contact.is_third_company)
                    store.commit('setSwitchIdentityStatus', true)

                }
            }).catch(err => {
                console.log(err)
                ElMessage({
                    type:'error',
                    message:err,
                    grouping:true
                })
            })

        }
    }).catch(err => {
        console.log(err)
        ElMessage({
            type:'error',
            message:err,
            grouping:true
        })
    })

}

const card_limit = ref(3);
function seeMore() {
    card_limit.value = 9;
}
function getDealsList(page, limit) {

    let params = {
        status: 1,
        page: page,
        limit: limit
    }

    MY_DEALS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            dealsData.value = res.message.data;
        }
    }).catch(err => {
        console.log(err)
        ElMessage({
            type: 'error',
            message: err,
            grouping: true
        })

    })
}

function getEventsList(page, limit) {

    let params = {
        status: 1,
        page: page,
        limit: limit
    }

    EVENTS_MY_EVENT(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            eventsData.value = res.message.data;
        }

    }).catch(err => {
        console.log(err)
        ElMessage({
            type: 'error',
            message: err,
            grouping: true
        })
    })

}

const myApplicationsData = ref([])

function getAllJobResumeList(page, limit) {
    let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
    }
    ALL_JOB_RESUME(params).then(res => {

        if (res.code == 200) {
            myApplicationsData.value = res.message.data
        }
    }).catch(err => {
        console.log(err)
        ElMessage({
            type: 'error',
            message: err,
            grouping: true
        })
    })

}

const contributorWidth = ref('50%')
const versionTime = randomString()

function postJob() {
    router.push({path: '/jobs/post', query: {version_time: versionTime}})
}

function updateApplicationIndex(i, value) {
    getAllJobResumeList()
    myApplicationsData[i]['status'] = value;
}

const vendorDealPostedPercent = ref(0)
const vendorDealPostedCountForNow = ref(0)
const vendorTotalViewsPercent = ref(0)
const vendorTotalViewsForNow = ref(0)
const recentDealData = ref([])

function getVendorIndexData(){

    VENDOR_INDEX_DATA().then(res => {
        if (res.code === 200) {
            if (res.msg === 10000) {
                let message = res.message;

                recentDealData.value = message.recent_deals

                if (message.deal_posted_count) {
                    vendorDealPostedCountForNow.value = nowValueFormat(message.deal_posted_count.now_deal_posted_count)
                    vendorDealPostedPercent.value = getPercentByNowAndPrev(message.deal_posted_count.now_deal_posted_count, message.deal_posted_count.prev_deal_posted_count)
                }

                if (message.total_views_count) {
                    vendorTotalViewsForNow.value = nowValueFormat(message.total_views_count.now_total_view_count)
                    vendorTotalViewsPercent.value = getPercentByNowAndPrev(message.total_views_count.now_total_view_count, message.total_views_count.prev_total_view_count);
                }


            }
        }
    }).catch(err => {
        ElNotification({
            title: 'Error',
            message: err,
        })
    })

}

const educatorJobApplyCountPercent = ref(0)
const educatorJobApplyCountForNow = ref(0)
const educatorEventRegisterPercent = ref(0)
const educatorEventRegisterForNow = ref(0)

function getEducatorStaticData() {
    EDUCATOR_STATIC_DATA().then(res => {
        console.log(res)
        if (res.code === 200) {
            if (res.msg === 10000) {
                let message = res.message;
                if (message.job_apply_count) {
                    educatorJobApplyCountForNow.value = nowValueFormat(message.job_apply_count.now_job_apply_count)
                    educatorJobApplyCountPercent.value = getPercentByNowAndPrev(message.job_apply_count.now_job_apply_count, message.job_apply_count.prev_job_apply_count)
                }

                if (message.getUserRegisterEventLog) {
                    educatorEventRegisterForNow.value = nowValueFormat(message.getUserRegisterEventLog.now_event_apply_count)
                    educatorEventRegisterPercent.value = getPercentByNowAndPrev(message.getUserRegisterEventLog.now_event_apply_count, message.getUserRegisterEventLog.prev_event_apply_count);
                }

            }
        }
    }).catch(err => {
        console.log(err)
    })
}

const profilePercentage = computed(()=> parseInt(store.state.profilePercentage) )

const educatorMetricsOptions = ref({
    title: {
        // text: "参与情况",
        textStyle: {
            color: "#667085",
            fontSize: 12,
            fontWeight: 400,
            fontFamily: "Inter, PingFang SC",
        },
    },
    tooltip: {
        trigger: "axis",
    },
    color: ["#F9B019", "#7F56D9"], // 设置折线颜色
    legend: {
        data: ["Profile Visits", "Jobs Shortlisted"],
        right: "2%",
    },
    grid: {
        left: "3%",
        right: "1%",
        bottom: "0%",
        containLabel: true, // 是否居中显示图表
    },
    xAxis: [
        {
            type: "time",
            axisLabel: {
                interval: 'auto', // 让横坐标每一项都显示
                margin: 10,
                hideOverlap: true
            },
            axisLine: {
                lineStyle: {
                    color: '#667085'
                }
            },
            axisTick: {
                length: 8,
                alignWithLabel: true, // 将刻度显示在中间
            },


        }
    ],
    yAxis: [
        {
            type: "value",
            nameLocation: 'start',
            splitLine: {
                show: true,
                lineStyle: {
                    // 设置坐标轴刻度设置为虚线
                    type: "dashed",
                },
            },
        }
    ],
    series: [
        {
            name: "Profile Visits",
            type: "line",
            symbol: "circle", //将小圆点改成实心 不写symbol默认空心
            symbolSize: 5, //小圆点的大小
            data: []
        },
        {
            name: "Jobs Shortlisted",
            type: "line",
            symbol: "circle", //将小圆点改成实心 不写symbol默认空心
            symbolSize: 5, //小圆点的大小
            data: []
        },
    ],

})

const businessMetricsOptions = ref({
    title: {
        // text: "参与情况",
        textStyle: {
            color: "#667085",
            fontSize: 12,
            fontWeight: 400,
            fontFamily: "Inter, PingFang SC",
        },
    },
    tooltip: {
        trigger: "axis",
    },
    color: ["#F9B019", "#7F56D9"], // 设置折线颜色
    legend: {
        data: ["Job Views", "Candidates Shortlisted"],
        right: "2%",
    },
    grid: {
        left: "3%",
        right: "1%",
        bottom: "0%",
        containLabel: true, // 是否居中显示图表
    },
    xAxis: [
        {
            type: "time",
            axisLabel: {
                interval: 'auto', // 让横坐标每一项都显示
                margin: 10,
                hideOverlap: true
            },
            axisLine: {
                lineStyle: {
                    color: '#667085'
                }
            },
            axisTick: {
                length: 8,
                alignWithLabel: true, // 将刻度显示在中间
            },

        },
    ],
    yAxis: [
        {
            type: "value",
            nameLocation: 'start',
            splitLine: {
                show: true,
                lineStyle: {
                    // 设置坐标轴刻度设置为虚线
                    type: "dashed",
                },
            },
        }
    ],
    series: [
        {
            name: "Job Views",
            type: "line",
            symbol: "circle", //将小圆点改成实心 不写symbol默认空心
            symbolSize: 5, //小圆点的大小
            data: []
        },
        {
            name: "Candidates Shortlisted",
            type: "line",
            symbol: "circle", //将小圆点改成实心 不写symbol默认空心
            symbolSize: 5, //小圆点的大小
            data: []
        },
    ],

})

const VendorMetricsOptions = ref({
    title: {
        // text: "参与情况",
        textStyle: {
            color: "#667085",
            fontSize: 12,
            fontWeight: 400,
            fontFamily: "Inter, PingFang SC",
        },
    },
    tooltip: {
        trigger: "axis",
    },
    color: ["#F9B019", "#7F56D9"], // 设置折线颜色
    legend: {
        data: ["Total Views", "Total Clicks"],
        right: "2%",
    },
    grid: {
        left: "3%",
        right: "1%",
        bottom: "0%",
        containLabel: true, // 是否居中显示图表
    },
    xAxis: [
        {
            type: "time",
            axisLabel: {
                interval: 'auto', // 让横坐标每一项都显示
                margin: 10,
                hideOverlap: true
            },
            axisLine: {
                lineStyle: {
                    color: '#667085'
                }
            },
            axisTick: {
                length: 8,
                alignWithLabel: true, // 将刻度显示在中间
            },

        },
    ],
    yAxis: [
        {
            type: "value",
            nameLocation: 'start',
            splitLine: {
                show: true,
                lineStyle: {
                    // 设置坐标轴刻度设置为虚线
                    type: "dashed",
                },
            },
        }
    ],
    series: [
        {
            name: "Total Views",
            type: "line",
            symbol: "circle",
            symbolSize: 5,
            data: [100, 200, 150, 300, 250] // Add dummy values for Total Views
        },
        {
            name: "Total Clicks",
            type: "line",
            symbol: "circle",
            symbolSize: 5,
            data: [50, 100, 80, 120, 90] // Add dummy values for Total Clicks
        },
    ],

})


const howLong = ref(7)

function getUserMetrics(howLong) {
    let endTime = nowDateYmd()
    let startTime = dateYmdAgo(howLong)

    let params = {
        start_time: startTime,
        end_time: endTime
    }

    HOME_USER_METRICS(params).then(res => {
        if (res.code === 200) {
            let resMessage = res.message;
            if (resMessage.length > 0) {
                educatorMetricsOptions.value.series[0].data = res.message;
            } else {
                educatorMetricsOptions.value.series[0].data = dateYmdAndNumber(howLong);
            }

        }
    }).catch(err => {
        console.log(err)
    })

}

function getJobShortListed(howLong) {

    let endTime = nowDateYmd()
    let startTime = dateYmdAgo(howLong)

    let params = {
        start_time: startTime,
        end_time: endTime
    }
    HOME_JOB_SHORTLISTED(params).then(res => {
        if (res.code === 200) {
            let resMessage = res.message;
            if (resMessage.length > 0) {
                educatorMetricsOptions.value.series[1].data = res.message;
            } else {
                educatorMetricsOptions.value.series[1].data = dateYmdAndNumber(howLong);
            }
        }
    }).catch(err => {
        console.log(err)
    })
}

function getUserMetricsByTime(startTime, endTime) {

    let params = {
        start_time: startTime,
        end_time: endTime
    }

    HOME_USER_METRICS(params).then(res => {
        if (res.code === 200) {
            let resMessage = res.message;
            if (resMessage.length > 0) {
                educatorMetricsOptions.value.series[0].data = res.message;
            } else {
                educatorMetricsOptions.value.series[0].data = dateYmdAndNumber(7);
            }

        }
    }).catch(err => {
        console.log(err)
    })

}

function getJobShortListedByTime(startTime, endTime) {

    let params = {
        start_time: startTime,
        end_time: endTime
    }

    HOME_JOB_SHORTLISTED(params).then(res => {
        if (res.code === 200) {
            let resMessage = res.message;
            if (resMessage.length > 0) {
                educatorMetricsOptions.value.series[1].data = res.message;
            } else {
                educatorMetricsOptions.value.series[1].data = dateYmdAndNumber(7);
            }
        }
    }).catch(err => {
        console.log(err)
    })
}

const businessJobsPostedPercent = ref(0)
const businessJobsPostedForNow = ref(0)
const businessEventsPostedPercent = ref(0)
const businessEventsPostedForNow = ref(0)
const businessJobViewsPercent = ref(0)
const businessJobViewsForNow = ref(0)
const businessFillRatePercent = ref(0)
const businessFillRateForNow = ref(0)

function getUserPostCount() {

    USER_POST_JOB_COUNT().then(res => {
        console.log(res)
        if (res.code === 200) {
            let message = res.message;
            if (message.event_post_result) {
                businessEventsPostedForNow.value = nowValueFormat(message.event_post_result.now_event_post_count)
                businessEventsPostedPercent.value = getPercentByNowAndPrev(message.event_post_result.now_event_post_count, message.event_post_result.prev_event_post_count)
            }
            if (message.job_post_result) {
                businessJobsPostedForNow.value = nowValueFormat(message.job_post_result.now_job_post_count)
                businessJobsPostedPercent.value = getPercentByNowAndPrev(message.job_post_result.now_job_post_count, message.job_post_result.prev_job_post_count)
            }
            if (message.job_views) {
                businessJobViewsForNow.value = nowValueFormat(message.job_views.now_job_views_count)
                businessJobViewsPercent.value = getPercentByNowAndPrev(message.job_views.now_job_views_count, message.job_views.prev_job_views_count)
            }

            if (message.fill_rate) {
                businessFillRateForNow.value = nowValueFormat(message.fill_rate.now_job_fill_rate)
                businessFillRatePercent.value = getPercentByNowAndPrev(message.fill_rate.now_job_fill_rate, message.fill_rate.prev_job_fill_rate)
            }


        }

    }).catch(err => {
        console.log(err)
    })

}

function getBusinessJobViews(howLong) {

    let endTime = nowDateYmd()
    let startTime = dateYmdAgo(howLong)

    let params = {
        start_time: startTime,
        end_time: endTime
    }

    BUSINESS_JOB_VIEWS(params).then(res => {
        if (res.code === 200) {
            let message = res.message
            if (message.length > 0) {
                businessMetricsOptions.value.series[0].data = res.message;
            } else {
                businessMetricsOptions.value.series[0].data = dateYmdAndNumber(howLong)
            }

        }
    }).catch(err => {
        console.log(err)
    })
}

function getBusinessJobShortlisted(howLong) {
    let endTime = nowDateYmd()
    let startTime = dateYmdAgo(howLong)

    let params = {
        start_time: startTime,
        end_time: endTime
    }

    BUSINESS_JOB_SHORTLISTED(params).then(res => {
        if (res.code === 200) {
            let resMessage = res.message
            if (resMessage.length > 0) {
                businessMetricsOptions.value.series[1].data = res.message;
            } else {
                businessMetricsOptions.value.series[1].data = dateYmdAndNumber(howLong)
            }

        }
    }).catch(err => {
        console.log(err)
    })
}

function getBusinessJobViewsByTime(startTime, endTime) {

    let params = {
        start_time: startTime,
        end_time: endTime
    }

    BUSINESS_JOB_VIEWS(params).then(res => {
        if (res.code === 200) {
            let message = res.message
            if (message.length > 0) {
                businessMetricsOptions.value.series[0].data = res.message;
            } else {
                businessMetricsOptions.value.series[0].data = dateYmdAndNumber(7)
            }

        }
    }).catch(err => {
        console.log(err)
    })
}

function getBusinessJobShortlistedByTime(startTime, endTime) {

    let params = {
        start_time: startTime,
        end_time: endTime
    }

    BUSINESS_JOB_SHORTLISTED(params).then(res => {
        if (res.code === 200) {
            let resMessage = res.message
            if (resMessage.length > 0) {
                businessMetricsOptions.value.series[1].data = res.message;
            } else {
                businessMetricsOptions.value.series[1].data = dateYmdAndNumber(7)
            }

        }
    }).catch(err => {
        console.log(err)
    })
}

function changeHowLong(e) {
    // console.log(e)
    if (identity.value == 1) {
        getUserMetrics(e)
        getJobShortListed(e)
    }

    if (identity.value == 2 || identity.value == 3 || identity.value == 4) {
        getBusinessJobViews(e)
        getBusinessJobShortlisted(e)

    }
}

function customDateChange(startTime, endTime) {

    if (identity.value == 1) {
        getUserMetricsByTime(startTime, endTime)
        getJobShortListedByTime(startTime, endTime)
    }

    if (identity.value == 2 || identity.value == 3 || identity.value == 4) {
        getBusinessJobViewsByTime(startTime, endTime)
        getBusinessJobShortlistedByTime(startTime, endTime)

    }

}

function turnUserManagement() {
    router.push({path: '/setting/account'})
}

function viewDeals(){
    router.push('/deals')
}

const contributorIdentities = computed(()=>store.state.contributorIdentities)
const switchIdentityStatus = computed(()=>store.state.switchIdentityStatus)

watch(identity, (newValue, oldValue) => {
    console.log(newValue, oldValue)
})

watch(switchIdentityStatus, (newValue, oldValue) => {
    console.log('---- dashboard ---- switch -- identity -- ' + newValue, oldValue )
    if(newValue){
        switchContributorCompanyId.value = 0
        initLoadingData()
    }

})
const initLoadingStepTwo = ()=>{

    if(route.query.register_key){
        contributorActived({register_key:route.query.register_key})
        history.pushState({}, '', '/overview')
    }

    if(!vueCookies.isKey('contributor_login')){

        console.log('contributor first login')
        let customHtml = '<div class="box-avatar-setting"></div>' +
            '<div class="box-label">Update your Account Information</div>' +
            '<div class="box-tips">For your safety and security, please update your account information including your name and password in the account settings.</div>'

        ElMessageBox.confirm(customHtml,
            '',
            {
                customClass: 'contributor-setting-account-box',
                confirmButtonClass: 'box-cancel-button',
                confirmButtonText: 'Update Account Settings',
                buttonSize: 'large',
                showCancelButton: false,
                center: true,
                dangerouslyUseHTMLString: true
            }
        )
            .then(() => {
                vueCookies.set('contributor_login',1)
                router.push('/setting/account')
                console.log('closed success')
                // ElMessage({
                //     type: 'success',
                //     message: 'Closed Success',
                // })
            })
            .catch(() => {

                console.log('cancel close sent')
            })

    }

}
const initLoadingData = ()=>{

    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
        updateWindowHeight()
        contributorWidth.value = '80%'
        contributorSwitchBusinessDialogWidth.value = '80%'
    }

    window.onresize = () => {
        if (screenWidthFloor <= 768) {
            contributorWidth.value = '80%'
            contributorSwitchBusinessDialogWidth.value = '80%'
            updateWindowHeight()
        }
    }

    if (identity.value == 1) {
        getEducatorStaticData()
        getUserMetrics(howLong.value)
        getJobShortListed(howLong.value)
    }

    if (identity.value == 2 || identity.value == 3 || identity.value == 4) {
        getAllJobResumeList(1, 100)
        getUserPostCount()
        getBusinessJobViews(howLong.value)
        getBusinessJobShortlisted(howLong.value)

    }

    if (identity.value == 5) {
        getVendorIndexData()
        getDealsList(1, 1000)
        getEventsList(1, 1000)
    }

}

onMounted(() => {
    initLoadingData()
    initLoadingStepTwo()
})

onUnmounted(() => {
    updateWindowHeight()
    window.onresize = null
})


</script>

<style scoped>
@import "@/style/contributor-dashboard.css";

.bg {
    background-color: #FFFFFF;
}

.overview-container {
    width: 100%;
    height: calc(var(--i-window-height) - 120px);
}

.dashboard-container {

}

.dashboard-t-actions {
    margin: 0 38px;
    text-align: right;
}

.dashboard-t-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;

    margin-left: 40px;
}

.dashboard-t-item {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 20px;

    width: 272px;
    height: 188px;
    background: #FFFFFF;
    border: 1px solid #EAECF0;
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 8px;

    margin: 20px 32px 0 0;
}

.dashboard-t-item-business {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 20px;

    width: 252px;
    height: 188px;
    background: #FFFFFF;
    border: 1px solid #EAECF0;
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 8px;

    margin: 20px 20px 20px 0;
}

.dashboard-t-item-vendor {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px 20px;

    width: 271px;
    height: 147px;
    background: #FFFFFF;
    border: 1px solid #EAECF0;
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 8px;

    margin: 20px 20px 20px 0;
}

.dashboard-t-item-gap {
    gap: 16px;
}

.dashboard-t-item-t {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #101828;
}

.dashboard-t-item-m-other {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #667085;
}

.dashboard-t-item-chart {
    width: 100%;
}

.dashboard-t-item-b {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #667085;

    display: flex;
    align-items: center;

}

.dashboard-t-item-b-1 {
    width: 100%;
    margin-bottom: 0;
    margin-top: auto;
    text-align: right;
}

.dashboard-b-container {
    margin: 0 40px 24px 40px;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;

}

.dashboard-b-item {

    margin-top: 24px;
}

.dashboard-item-r a {
    text-decoration: none;
    color: #FFFFFF;
}

.dashboard-1-container {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.dashboard-1 {
    background-color: #FFFFFF;
    padding: 20px;
    box-shadow: 0px 3px 23px 1px rgba(0, 0, 0, 0.07);
    border-radius: 18px;

    margin-right: 50px;
    margin-bottom: 50px;
}

.dashboard-1 h5 {
    font-weight: 400;
}

.dashboard-1 h1 {
    color: #6650B3;
    display: flex;
    align-items: flex-end;
}

.dashboard-1 span {
    margin-left: 15px;
    font-size: 20px;
    font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
    color: #262626;
}

.dashboard-1-h h1:nth-child(1) {
    margin-right: 15px;
}

.container-4 {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.container-4-l {

}

.container-4-r {
    margin-left: 50px;
}
/deep/ .el-dialog__title{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    /* identical to box height, or 133% */


    /* Grey/900 */

    color: #101828;
}

@media screen and (max-width: 768px) {
    .overview-container {
        height: calc(100vh - 182px);
    }

    .dashboard-t-container {
        margin: 0 24px;
    }

    .dashboard-t-item {
        width: 100%;
        margin: 0 0 20px 0;
    }

    .dashboard-b-container {
        margin: 0 24px;
    }

    .dashboard-b-item {
        margin: 0 0 24px 0;
        width: 100%;
        overflow: scroll;
    }

    .dashboard-t-item-business {
        width: 100%;
        margin: 0 0 20px 0;
    }

}

</style>
