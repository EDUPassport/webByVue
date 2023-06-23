<template>
  <jobDetailComponent :detailData="detailData" :workingHoursData="workingHoursData" :adsData="jobsAdsListTop"
    :adsHeight="adsHeight" :isFavorite="isFavorite" :loading="showLoadingStatus" @favoriteEvent="favoriteChange">
  </jobDetailComponent>
</template>

<script>
import jobDetailComponent from '@/components/jobs/detailComponent'
import { useRoute } from "vue-router";
import {
  ADD_JOBS_VIEWS,
  ADS_LIST,
  JOB_DETAIL
} from "@/api/api";
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { updateWindowHeight } from "@/utils/tools";

export default {
  name: "detailComponent",
  components: {
    jobDetailComponent
  },
  setup() {
    // let router = useRouter()
    let route = useRoute()
    const showLoadingStatus = ref(false)
    const jobsAdsListTop = ref([])
    const jobsAdsListMid = ref([])
    const workingHoursData = ref([])
    const detailData = ref({})
    const isFavorite = ref(0)

    function getJobDetail(id) {

      showLoadingStatus.value = true;

      let params = {
        job_id: id
      }
      let token = localStorage.getItem('token')

      JOB_DETAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          let resData = res.message;

          if (resData.is_favorite) {
            isFavorite.value = resData.is_favorite
          }

          detailData.value = res.message

          const workHours = res.message.working_hours
          if (workHours) {
            // this.jobForm.working_hours = JSON.parse(workHours)
            workingHoursData.value = JSON.parse(workHours)
          }
          showLoadingStatus.value = false

          if (token) {
            addJobViews(id)
          }

        }
      }).catch(err => {
        console.log(err)
        showLoadingStatus.value = false
      })

    }

    function getAdsList() {
      let ads_data = {
        page: 1,
        limit: 10000,
        type: 'job'
      }
      ADS_LIST(ads_data).then(res => {
        if (res.code == 200) {


          let array = res.message
          const chunkSize = 2;
          let resultArray = [];
          for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            resultArray.push(chunk)
          }

          jobsAdsListTop.value = resultArray;
          jobsAdsListMid.value = resultArray;

        }

      }).catch(err => {
        if (err.msg) {
          return ElMessage.error(err.msg)
        }
        if (err.message) {
          return ElMessage.error(err.message)
        }
      })
    }

    const adsHeight = ref('190px')

    function favoriteChange(e) {
      isFavorite.value = e;
    }

    function addJobViews(id) {
      let params = {
        job_id: id
      }
      ADD_JOBS_VIEWS(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }

    onMounted(() => {

      let screenWidth = document.body.clientWidth
      let screenWidthFloor = Math.floor(screenWidth)

      if (screenWidthFloor <= 768) {
        updateWindowHeight()
        adsHeight.value = '120px'
      }

      if (screenWidthFloor > 768 && screenWidthFloor < 992) {
        adsHeight.value = '120px'
      }

      if (screenWidthFloor >= 992 && screenWidthFloor < 1200) {
        adsHeight.value = '120px'
      }
      if (screenWidthFloor >= 1200 && screenWidthFloor < 1920) {
        adsHeight.value = '140px'
      }
      if (screenWidthFloor >= 1920) {
        adsHeight.value = "190px"
      }

      window.onresize = () => {
        if (screenWidthFloor <= 768) {
          updateWindowHeight()
          adsHeight.value = '120px'
        }

        if (screenWidthFloor > 768 && screenWidthFloor < 992) {
          adsHeight.value = '120px'
        }
        if (screenWidthFloor >= 992 && screenWidthFloor < 1200) {
          adsHeight.value = '120px'
        }
        if (screenWidthFloor >= 1200 && screenWidthFloor < 1920) {
          adsHeight.value = '140px'
        }
        if (screenWidthFloor >= 1920) {
          adsHeight.value = "190px"
        }

      }

      let jobId = route.params.id;

      if (jobId) {
        getJobDetail(jobId)
      }

      getAdsList()

    })

    onUnmounted(() => {
      updateWindowHeight()
      window.onresize = null
    })


    return {
      showLoadingStatus,
      jobsAdsListTop,
      jobsAdsListMid,
      workingHoursData,
      detailData,
      adsHeight,
      isFavorite,
      favoriteChange

    }

  }


}
</script>

<style scoped></style>
