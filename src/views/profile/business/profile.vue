<template>

  <div class="business-profile-container">

    <div class="business-profile-l">
      <meSideMenu></meSideMenu>
    </div>

    <div class="business-profile-r">

      <el-row :gutter="0" align="top" justify="space-between">

        <el-col :xs="0" :sm="0" :md="8" :lg="9" :xl="8">

          <div class="business-jobs">
            <jobsListComponent
                :jobListData="otherJobsData"
                :companyInfo="companyInfo"
                :jobLimit="otherJobLimit"
                :jobTotalNum="otherJobTotalNum"
                :jobPage="otherJobPage"
                :adsData="[]"
                :from-business-profile="true"
                @jobDetailEvent="turnJobDetail"
                @backToResults="backToResults"
                @jobPageChange="otherJobPageChange"
                @addFavorite = "addFavorite"
                @cancelFavorite="cancelFavorite"
            >
            </jobsListComponent>
          </div>

        </el-col>

        <el-col class="business-profile-col" :xs="24" :sm="24" :md="16" :lg="15" :xl="16">

          <businessProfileActionWithPreview :info="companyInfo" :identity="identity"></businessProfileActionWithPreview>

          <el-scrollbar class="business-profile">
            <businessProfile :info="companyInfo" :identity="identity" :fromMe="true"></businessProfile>
          </el-scrollbar>

        </el-col>

      </el-row>

    </div>
  </div>

</template>

<script>
import meSideMenu from "@/components/meSideMenu";
import businessProfile from "@/components/businessProfile";
import jobsListComponent from "@/components/jobsListComponent";
import businessProfileActionWithPreview from "@/components/businessProfileActionWithPreview";

import {
  USER_INFO_BY_TOKEN_V2,
  RECRUITER_PERCENTAGE_V2,
  OTHER_PERCENTAGE_V2, SCHOOL_PERCENTAGE_V2, COMPANY_JOB_LIST, ADD_FAVORITE, CANCEL_FAVORITE
} from '@/api/api';
import {decode} from 'js-base64';
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "profile",
  components: {
    meSideMenu,
    businessProfile,
    jobsListComponent,
    businessProfileActionWithPreview

  },
  computed:{
    identity:{
      get(){
        return this.$store.state.identity
      }
    }

  },
  data() {
    return {
      profilePercentage:0,
      userContact:{},
      companyContact:{},
      companyInfo:{},

      otherJobsData:[],
      otherJobTotalNum:0,
      otherJobLimit:10,
      otherJobPage:1

    }
  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  mounted() {

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

    let s = this.$route.query.str;
    if(s){
      console.log(decode(s))
    }

    this.getUserInfo()
    this.updateBusinessProfile()
    this.getCompanyJobList(1,10000)
  },
  methods: {
    updateBusinessProfile() {
      let params = {
        token: localStorage.getItem('token')
      }

      if(this.identity == 2){
        RECRUITER_PERCENTAGE_V2(params).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.$message.error(err.msg)
        })
      }

      if(this.identity == 3){
        SCHOOL_PERCENTAGE_V2(params).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.$message.error(err.msg)
        })
      }

      if(this.identity == 4){
        OTHER_PERCENTAGE_V2(params).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.$message.error(err.msg)
        })
      }

    },
    getUserInfo() {

      let identity = localStorage.getItem('identity')
      let params = {
        identity: identity
      }

      USER_INFO_BY_TOKEN_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          let userContact = res.message.user_contact;

          let companyInfo = res.message.user_contact.company;

          if(identity == 2){
            this.profilePercentage = userContact.is_recruiting
          }
          if(identity == 3){
            this.profilePercentage = userContact.is_school
          }
          if(identity == 4){
            this.profilePercentage = userContact.is_other
          }

          if(companyInfo){
            this.companyInfo = companyInfo;

            this.$store.commit('jobCompanyName', companyInfo.company_name)

            if (companyInfo.benefits) {
              let benefitsArr = companyInfo.benefits;
              benefitsArr.forEach((item,i)=>{
                benefitsArr[i].id = item.object_id
                benefitsArr[i].pid = item.object_pid
              })
              this.selectBenefitsList = benefitsArr;
              this.benefitsList = companyInfo.benefits
            }
          }

          if(userContact){
            this.userContact = userContact;
          }


          let userImages = companyInfo.images
          this.accountImageFileList = []
          if (userImages) {
            userImages.forEach(item => {
              let userImageObj = {
                name: '',
                url: item.url
              }
              this.accountImageFileList.push(userImageObj)
            })
          }
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getCompanyJobList(page,limit){

      let userId = localStorage.getItem('uid')

      let params = {
        user_id: userId,
        is_open: 1,
        status:1,
        page: page,
        limit: limit
      }

      COMPANY_JOB_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.otherJobsData = res.message.data;
          this.otherJobTotalNum = res.message.total;
        }

      }).catch(err=>{
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    turnJobDetail(id,page){

      let path = '/jobs/detail/' + id + '/' + page;
      let fromUid = localStorage.getItem('uid')

      this.selectedJobId = id;

      this.$router.push({path:path,query:{uid:fromUid}})

    },
    otherJobPageChange(e) {
      console.log(e)
      // this.showLoadingStatus = true;
      this.otherJobPage = e
      this.selectedJobId = 0
      this.getCompanyJobList(this.companyInfo.user_id,e, this.otherJobLimit)

    },
    backToResults(){

      this.isOther = false;
      this.$router.push({path:'/jobs',query:{id:this.selectedJobId,page:this.jobPage}})

    },
    addFavorite(id, type, title, url, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: id,
        type_title: title,
        type_url: url
      }
      // console.log(params)
      ADD_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.jobListData[index]['is_favorite'] = 1
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })

    },
    cancelFavorite(type, typeId, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.jobListData[index]['is_favorite'] = 0
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    }


  }
}
</script>

<style scoped>

.business-profile-container {
  background-color: #F0F2F5;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

}


.business-profile-r {
  width:calc(100% - 210px);
  height: calc(100vh - 140px);
  padding: 0 0 0 50px;

}

.business-profile{
  margin-left: 50px;
  height: calc(100vh - 200px);
}

@media screen and (min-width: 1200px) and (max-width: 1919px){

}

@media screen and (max-width: 768px){
  .business-profile-r{
    width: 100%;
    height: calc( var(--i-window-height) - 160px);
    padding: 0;
  }

  .business-profile{
    margin-left: 0;
    background-color: #FFFFFF;
    height: calc( var(--i-window-height) - 220px);
  }

}

</style>
