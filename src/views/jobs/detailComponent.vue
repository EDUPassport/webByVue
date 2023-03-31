<template>
  <jobDetailComponent
      :detailData="detailData"
      :workingHoursData="workingHoursData"
      :adsData="jobsAdsListTop"
      :adsHeight="adsHeight"
      :isFavorite="isFavorite"
      :loading="showLoadingStatus"
      @favoriteEvent="favoriteChange"
  ></jobDetailComponent>

</template>

<script>
import jobDetailComponent from '@/components/jobs/detailComponent'
import {useRoute} from "vue-router";
import {
  ADD_JOBS_VIEWS,
  ADS_LIST,
  JOB_DETAIL, USER_BROWSING_HISTORY_ADD
} from "@/api/api";
import {ref, onMounted,onUnmounted} from 'vue'
import {ElMessage} from 'element-plus'
import {updateWindowHeight} from "@/utils/tools";

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

    function  getJobDetail(id) {

      showLoadingStatus.value = true;

      let params = {
        job_id: id
      }
      let token = localStorage.getItem('token')

      JOB_DETAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          let resData = res.message;

          if(resData.is_favorite){
            isFavorite.value = resData.is_favorite
          }

          detailData.value = res.message

          const workHours = res.message.working_hours
          if (workHours) {
            // this.jobForm.working_hours = JSON.parse(workHours)
            workingHoursData.value = JSON.parse(workHours)
          }
          showLoadingStatus.value = false

          if(token){
            addJobViews(id)
          }
          addUserBrowsingHistory(id)

        }
      }).catch(err=>{
        console.log(err)
        showLoadingStatus.value = false
      })

    }

    function  getAdsList() {
      let ads_data = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(ads_data).then(res => {
        if (res.code == 200) {
          // console.log(rs.message)
          let adsTopData = [];
          let adsMidData = [];
          let identity = localStorage.getItem('identity');

          if (!identity) {
            adsTopData = res.message.filter(item => item.name == 'guest_j2');
            adsMidData = res.message.filter(item => item.name == 'guest_j3');
          }
          if (identity == 1) {
            adsTopData = res.message.filter(item => item.name == 'educator_j2');
            adsMidData = res.message.filter(item => item.name == 'educator_j3');
          }

          if (identity == 2 || identity == 3 || identity == 4) {
            adsTopData = res.message.filter(item => item.name == 'business_j2');
            adsMidData = res.message.filter(item => item.name == 'business_j3');
          }

          if (identity == 5) {
            adsTopData = res.message.filter(item => item.name == 'vendor_j2');
            adsMidData = res.message.filter(item => item.name == 'vendor_j3');
          }

          if (adsTopData.length > 0) {
             jobsAdsListTop.value = adsTopData[0].data;
          }

          if (adsMidData.length > 0) {
             jobsAdsListMid.value = adsMidData[0].data;
          }

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

    function favoriteChange(e){
      isFavorite.value = e;
    }

    function addJobViews(id){
      let params = {
        job_id:id
      }
      ADD_JOBS_VIEWS(params).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }

    function addUserBrowsingHistory(id){
      let params = {
        type:1,
        type_id:id
      }
      USER_BROWSING_HISTORY_ADD(params).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })

    }

    onMounted(()=>{

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
      if(screenWidthFloor >= 1920){
        adsHeight.value = "190px"
      }

      window.onresize = () =>{
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
        if(screenWidthFloor >= 1920){
          adsHeight.value = "190px"
        }

      }

      let jobId = route.params.id;

      if(jobId){
        getJobDetail(jobId)
      }

      getAdsList()

    })

    onUnmounted(()=>{
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

<style scoped>

</style>
