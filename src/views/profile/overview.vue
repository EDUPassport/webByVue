<template>
  <div class="bg">

    <el-scrollbar class="overview-container">

      <div class="dashboard-container">
        <template v-if="identity === 10">
          <div class="dashboard-b-item">
            <applicationsUpdates></applicationsUpdates>
          </div>
          <div class="dashboard-b-item">
            <favoritedJobsDashboard></favoritedJobsDashboard>
          </div>
        </template>


        <div class="dashboard-t-actions" v-if="identity == 2 || identity == 3 || identity == 4">
         <el-button plain>User Management</el-button>
         <el-button type="primary" icon="Plus" @click="postJob()">Post a Job</el-button>
        </div>

        <un-complete-profile-prompt :percent="profilePercentage"></un-complete-profile-prompt>

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
                <el-button size="small" type="info">View Deals</el-button>
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
                <vsLastMonthCharts :percent="businessJobsPostedPercent" color="#12B76A" areaColor="#ecfdf3"></vsLastMonthCharts>
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
                <vsLastMonthCharts :percent="businessJobViewsPercent" ></vsLastMonthCharts>
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
                <vsLastMonthCharts :percent="businessFillRatePercent" ></vsLastMonthCharts>
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

          <div class="dashboard-1-container">
            <div class="dashboard-1">
                  <span>
                    More awesome widgets are coming soon...
                  </span>
            </div>
          </div>

          <div class="container-4">
            <div class="container-4-l">
              <activeDealsDashboard
                  :listData="dealsData"
              ></activeDealsDashboard>
            </div>
            <div class="container-4-r">
              <activeEventsDashboard
                  :list-data="eventsData"
              ></activeEventsDashboard>
            </div>
          </div>

        </template>

      </div>

    </el-scrollbar>
  </div>
</template>

<script>
import {
  ALL_JOB_RESUME, BUSINESS_JOB_SHORTLISTED, BUSINESS_JOB_VIEWS,
  EDUCATOR_STATIC_DATA,
  EVENTS_MY_EVENT,
  HOME_JOB_SHORTLISTED,
  HOME_USER_METRICS,
  MY_DEALS,
  USER_INFO_BY_TOKEN_V2, USER_POST_JOB_COUNT
} from '@/api/api';

// import {onBeforeRouteUpdate} from "vue-router";
import {ref, computed, onMounted, watch, onUnmounted} from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

import NewApplications from "@/components/business/newApplications";
import dailyJobMatch from "@/components/educator/dailyJobMatch";
import applicationsUpdates from "@/components/educator/applicationsUpdates";
import favoritedJobsDashboard from "@/components/educator/favoritedJobsDashboard";
import activeDealsDashboard from "@/components/vendor/activeDealsDashboard";
import activeEventsDashboard from "@/components/vendor/activeEventsDashboard";
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
import {ElMessage} from 'element-plus'

export default {
  name: "index",
  components: {
    NewApplications,
    dailyJobMatch,
    applicationsUpdates,
    favoritedJobsDashboard,
    activeDealsDashboard,
    activeEventsDashboard,
    metricsComponent,
    vsLastMonthCharts,
    unCompleteProfilePrompt,
    compareUpDownPercentage
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const currentUser = computed(() => store.state.currentUser)
    const identity =  ref(store.state.identity)

    const isThirdCompanyStatus = ref(store.state.isThirdCompanyStatus)
    const allIdentityChanged = ref(store.state.allIdentityChanged)

    const dealsData = ref([])
    const eventsData = ref([])

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
          message: err.msg,
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
          message: err.msg,
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
        if (err.msg) {
          ElMessage({
            type: 'error',
            message: err.msg,
            grouping: true
          })
          return;
        }
        if (err.message) {
          ElMessage({
            type: 'error',
            message: err.message,
            grouping: true
          })
        }
      })

    }

    const contributorWidth = ref('50%')
    const versionTime = randomString()

    function postJob() {
      router.push({path: '/jobs/post', query: {version_time: versionTime}})
    }

    const userContact = ref({})
    const educatorContact = ref({})
    const companyInfo = ref({})

    function getBasicInfo(identity) {

      let params = {
        identity: identity
      }

      USER_INFO_BY_TOKEN_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          let userContactValue = res.message.user_contact;

          let companyValue = {};
          let educatorContactValue = {};

          if (userContactValue) {
            userContact.value = userContactValue
          }

          if (identity == 1) {

            educatorContactValue = res.message.user_contact.educator_contact;

            if (educatorContactValue) {
              educatorContact.value = educatorContactValue
            }
          }

          if (identity == 2 || identity == 3 || identity == 4 || identity == 5) {

            companyValue = res.message.user_contact.company;

            if (companyValue) {
              companyInfo.value = companyValue
            }

          }


        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          ElMessage({
            type: 'error',
            message: err.msg,
            grouping: true
          })
          return;
        }
        if (err.message) {
          ElMessage({
            type: 'error',
            message: err.message,
            grouping: true
          })
        }
      })

    }

    function updateApplicationIndex(i, value) {
      myApplicationsData[i]['status'] = value;
    }

    const educatorJobApplyCountPercent = ref(0)
    const educatorJobApplyCountForNow = ref(0)
    const educatorEventRegisterPercent = ref(0)
    const educatorEventRegisterForNow = ref(0)

    function getEducatorStaticData(){
      EDUCATOR_STATIC_DATA().then(res=>{
        console.log(res)
        if(res.code === 200){
          if(res.msg === 10000){
              let message = res.message;
              if(message.job_apply_count){
                educatorJobApplyCountForNow.value = nowValueFormat(message.job_apply_count.now_job_apply_count)
                educatorJobApplyCountPercent.value = getPercentByNowAndPrev(message.job_apply_count.now_job_apply_count,message.job_apply_count.prev_job_apply_count)
              }

              if(message.getUserRegisterEventLog){
                educatorEventRegisterForNow.value = nowValueFormat(message.getUserRegisterEventLog.now_event_apply_count)
                educatorEventRegisterPercent.value =getPercentByNowAndPrev(message.getUserRegisterEventLog.now_event_apply_count,message.getUserRegisterEventLog.prev_event_apply_count) ;
              }

          }
        }
      }).catch(err=>{
        console.log(err)
      })
    }

    watch(identity, (newValue, oldValue) => {
      console.log(newValue, oldValue)
    })

    watch(allIdentityChanged, (newValue, oldValue) => {
      if (newValue) {
        console.log('old value --- ' + oldValue)
        getBasicInfo(newValue)
      }
    }, {
      immediate: true
    })

    const profilePercentage = ref(Number(store.state.profilePercentage))

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
            margin:10,
            hideOverlap:true
          },
          axisLine:{
            lineStyle:{
              color:'#667085'
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
          nameLocation:'start',
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
            margin:10,
            hideOverlap:true
          },
          axisLine:{
            lineStyle:{
              color:'#667085'
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
          nameLocation:'start',
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

    const howLong = ref(7)

    function getUserMetrics(howLong){
      let endTime = nowDateYmd()
      let startTime = dateYmdAgo(howLong)

      let params = {
        start_time:startTime,
        end_time:endTime
      }

      HOME_USER_METRICS(params).then(res=>{
        if(res.code === 200){
          let resMessage = res.message;
          if(resMessage.length > 0){
            educatorMetricsOptions.value.series[0].data = res.message;
          }else{
            educatorMetricsOptions.value.series[0].data = dateYmdAndNumber(howLong);
          }

        }
      }).catch(err=>{
        console.log(err)
      })

    }

    function getJobShortListed(howLong){

      let endTime = nowDateYmd()
      let startTime = dateYmdAgo(howLong)

      let params = {
        start_time:startTime,
        end_time:endTime
      }
      HOME_JOB_SHORTLISTED(params).then(res=>{
        if(res.code === 200){
          let resMessage = res.message;
          if(resMessage.length > 0){
            educatorMetricsOptions.value.series[1].data = res.message;
          }else{
            educatorMetricsOptions.value.series[1].data = dateYmdAndNumber(howLong);
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    }

    function getUserMetricsByTime(startTime, endTime){

      let params = {
        start_time:startTime,
        end_time:endTime
      }

      HOME_USER_METRICS(params).then(res=>{
        if(res.code === 200){
          let resMessage = res.message;
          if(resMessage.length > 0){
            educatorMetricsOptions.value.series[0].data = res.message;
          }else{
            educatorMetricsOptions.value.series[0].data = dateYmdAndNumber(7);
          }

        }
      }).catch(err=>{
        console.log(err)
      })

    }

    function getJobShortListedByTime(startTime, endTime){

      let params = {
        start_time:startTime,
        end_time:endTime
      }

      HOME_JOB_SHORTLISTED(params).then(res=>{
        if(res.code === 200){
          let resMessage = res.message;
          if(resMessage.length > 0){
            educatorMetricsOptions.value.series[1].data = res.message;
          }else{
            educatorMetricsOptions.value.series[1].data = dateYmdAndNumber(7);
          }
        }
      }).catch(err=>{
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

    function getUserPostCount(){

      USER_POST_JOB_COUNT().then(res=>{
        console.log(res)
        if(res.code === 200){
          let message = res.message;
          if(message.event_post_result){
            businessEventsPostedForNow.value = nowValueFormat(message.event_post_result.now_event_post_count)
            businessEventsPostedPercent.value = getPercentByNowAndPrev(message.event_post_result.now_event_post_count,message.event_post_result.prev_event_post_count)
          }
          if(message.job_post_result){
            businessJobsPostedForNow.value = nowValueFormat(message.job_post_result.now_job_post_count)
            businessJobsPostedPercent.value = getPercentByNowAndPrev(message.job_post_result.now_job_post_count,message.job_post_result.prev_job_post_count)
          }
          if(message.job_views){
            businessJobViewsForNow.value = nowValueFormat(message.job_views.now_job_views_count)
            businessJobViewsPercent.value = getPercentByNowAndPrev(message.job_views.now_job_views_count,message.job_views.prev_job_views_count)
          }

          if(message.fill_rate){
            businessFillRateForNow.value = nowValueFormat(message.fill_rate.now_job_fill_rate)
            businessFillRatePercent.value = getPercentByNowAndPrev(message.fill_rate.now_job_fill_rate,message.fill_rate.prev_job_fill_rate)
          }


        }

      }).catch(err=>{
        console.log(err)
      })

    }

    function getBusinessJobViews(howLong){

      let endTime = nowDateYmd()
      let startTime = dateYmdAgo(howLong)

      let params = {
        start_time:startTime,
        end_time:endTime
      }

      BUSINESS_JOB_VIEWS(params).then(res=>{
        if(res.code === 200){
          let message = res.message
          if(message.length > 0 ){
            businessMetricsOptions.value.series[0].data = res.message;
          }else{
            businessMetricsOptions.value.series[0].data = dateYmdAndNumber(howLong)
          }

        }
      }).catch(err=>{
        console.log(err)
      })
    }

    function getBusinessJobShortlisted(howLong){
      let endTime = nowDateYmd()
      let startTime = dateYmdAgo(howLong)

      let params = {
        start_time:startTime,
        end_time:endTime
      }

      BUSINESS_JOB_SHORTLISTED(params).then(res=>{
        if(res.code === 200){
          let resMessage = res.message
          if(resMessage.length > 0){
            businessMetricsOptions.value.series[1].data = res.message;
          }else{
            businessMetricsOptions.value.series[1].data = dateYmdAndNumber(howLong)
          }

        }
      }).catch(err=>{
        console.log(err)
      })
    }

    function getBusinessJobViewsByTime(startTime, endTime){

      let params = {
        start_time:startTime,
        end_time:endTime
      }

      BUSINESS_JOB_VIEWS(params).then(res=>{
        if(res.code === 200){
          let message = res.message
          if(message.length > 0 ){
            businessMetricsOptions.value.series[0].data = res.message;
          }else{
            businessMetricsOptions.value.series[0].data = dateYmdAndNumber(7)
          }

        }
      }).catch(err=>{
        console.log(err)
      })
    }

    function getBusinessJobShortlistedByTime(startTime, endTime){

      let params = {
        start_time:startTime,
        end_time:endTime
      }

      BUSINESS_JOB_SHORTLISTED(params).then(res=>{
        if(res.code === 200){
          let resMessage = res.message
          if(resMessage.length > 0){
            businessMetricsOptions.value.series[1].data = res.message;
          }else{
            businessMetricsOptions.value.series[1].data = dateYmdAndNumber(7)
          }

        }
      }).catch(err=>{
        console.log(err)
      })
    }

    function changeHowLong(e){
      // console.log(e)
      if(identity.value == 1){
        getUserMetrics(e)
        getJobShortListed(e)
      }

      if (identity.value == 2 || identity.value == 3 || identity.value == 4) {
        getBusinessJobViews(e)
        getBusinessJobShortlisted(e)

      }
    }

    function customDateChange(startTime,endTime){

      if(identity.value == 1){
        getUserMetricsByTime(startTime,endTime)
        getJobShortListedByTime(startTime,endTime)
      }

      if (identity.value == 2 || identity.value == 3 || identity.value == 4) {
        getBusinessJobViewsByTime(startTime,endTime)
        getBusinessJobShortlistedByTime(startTime,endTime)

      }

    }

    onMounted(() => {

      let screenWidth = document.body.clientWidth
      let screenWidthFloor = Math.floor(screenWidth)

      if (screenWidthFloor <= 768) {
        updateWindowHeight()
        contributorWidth.value = '80%'
      }

      window.onresize = () => {
        if (screenWidthFloor <= 768) {
          contributorWidth.value = '80%'
          updateWindowHeight()
        }
      }

      if(identity.value == 1){
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
        getDealsList(1, 1000)
        getEventsList(1, 1000)
      }

    })

    onUnmounted(()=>{
      updateWindowHeight()
      window.onresize = null
    })

    return {
      identity,
      currentUser,
      dealsData,
      eventsData,
      isThirdCompanyStatus,
      allIdentityChanged,
      contributorWidth,
      myApplicationsData,
      postJob,
      updateApplicationIndex,
      userContact,
      companyInfo,
      educatorContact,
      profilePercentage,
      educatorJobApplyCountPercent,
      educatorJobApplyCountForNow,
      educatorEventRegisterPercent,
      educatorEventRegisterForNow,
      educatorMetricsOptions,
      businessMetricsOptions,
      businessJobsPostedPercent,
      businessJobsPostedForNow,
      businessEventsPostedPercent,
      businessEventsPostedForNow,
      businessJobViewsPercent,
      businessJobViewsForNow,
      businessFillRateForNow,
      businessFillRatePercent,
      howLong,
      changeHowLong,
      customDateChange

    }

  }


}
</script>

<style scoped>
.bg {
  background-color: #FFFFFF;
}

.overview-container {
  width: 100%;
  height: calc(100vh - 120px);
}

.dashboard-container {

}

.dashboard-t-actions{
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

@media screen and (max-width: 768px) {
  .overview-container{
    height: calc(100vh - 182px);
  }
  .dashboard-t-container{
    margin: 0 24px;
  }

  .dashboard-t-item{
    width: 100%;
    margin: 0 0 20px 0;
  }

  .dashboard-b-container{
    margin: 0 24px;
  }
  .dashboard-b-item{
    margin: 0 0 24px 0;
    width: 100%;
    overflow: scroll;
  }

  .dashboard-t-item-business{
    width: 100%;
    margin: 0 0 20px 0;
  }

}

</style>
