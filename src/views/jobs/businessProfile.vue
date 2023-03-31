<template>

  <div class="business-profile-container" >
    <div class="business-profile-mobile-back">
      <businessProfileActionWithBack></businessProfileActionWithBack>
    </div>

    <el-scrollbar class="business-profile" v-loading=showLoadingStatus>
      <businessProfile
          :info="companyInfo"
          :identity="identity"
          :fromMe="false"
          @back="back()"
      >
      </businessProfile>
    </el-scrollbar>
  </div>

</template>

<script>

import {
  USER_BROWSING_HISTORY_ADD,
  USER_INFO_VISITOR_V2,
} from "@/api/api";
import BusinessProfile from "@/components/businessProfile";
import {updateWindowHeight} from "@/utils/tools";
import businessProfileActionWithBack from "@/components/businessProfileActionWithBack";
import {ref, onMounted, onUnmounted} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {ElMessage} from 'element-plus'

export default {
  name: "detail",
  components: {
    BusinessProfile,
    businessProfileActionWithBack

  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const showLoadingStatus = ref(false)
    const companyInfo = ref({})
    const identity = ref(0)

    function back(){
      router.go(-1)
    }

    function getVisitorUserInfo(userId,identity,companyId) {

      let params = {
        user_id:userId,
        identity:identity,
        company_id:companyId
      }

      showLoadingStatus.value = true;

      USER_INFO_VISITOR_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          addUserBrowsingHistory(identity, companyId)
          companyInfo.value = res.message.user_contact.company;
          store.commit('jobCompanyName', res.message.user_contact.company.company_name)
          showLoadingStatus.value = false;

        }
      }).catch(err => {
        console.log(err)
        ElMessage.error(err.msg)
      })

    }

    function addUserBrowsingHistory(identity,id){
      let type = 0
      if(identity == 2){
        type = 5
      }
      if(identity == 3){
        type = 6
      }
      if(identity == 4){
        type = 7
      }
      if(type){
        let params = {
          type: type,
          type_id:id
        }
        USER_BROWSING_HISTORY_ADD(params).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }

    }

    onUnmounted(()=>{
      updateWindowHeight()
      window.onresize = null
    })

    onMounted(()=>{

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


      let userId =  route.query.uid;
      let cid =  route.query.cid;
      let i = route.query.i;

      identity.value = route.query.i;

      if(userId && i && cid){
         getVisitorUserInfo( userId, i, cid)
      }

    })


    return {
      identity,
      showLoadingStatus,
      companyInfo,
      back
    }

  }


}
</script>

<style scoped>

.business-profile-container{
  background-color: #F0F2F5;
  height: calc(100vh - 140px);
}

@media screen and (min-width: 769px) {
  .business-profile-mobile-back{
    display: none;
  }
}

@media screen and (max-width: 768px ) {

  .business-profile-container{
    position: fixed;
    z-index: 2000;
    top:80px;
    left: 0;
    right: 0;
    bottom: 0;
    width:100%;

  }

  .business-profile{
    background-color: #FFFFFF;
    height: calc( var(--i-window-height) - 110px);
  }


}


</style>
