<template>

  <div class="business-profile-container">

    <div class="business-profile-l">
      <meSideMenu></meSideMenu>
    </div>

    <div class="business-profile-r">

      <el-row :gutter="0" align="top" justify="space-between">

        <el-col :xs="0" :sm="0" :md="8" :lg="9" :xl="8">

          <div class="business-deals">
            <dealByListComponent
                :listData="dealsListData"
                :from-vendor-profile="true"
                @back="backToSearchResults"
                @detail="showDealDetailDialog"
                :info="companyInfo"
            ></dealByListComponent>
          </div>

        </el-col>

        <el-col  :xs="24" :sm="24" :md="16" :lg="15" :xl="16">
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
import dealByListComponent from "@/components/dealByListComponent";

import {
  ZOHO_SYNC,
  USER_INFO_BY_TOKEN_V2,
  ADD_FAVORITE, CANCEL_FAVORITE, MY_DEALS, VENDOR_PERCENTAGE_V2
} from '@/api/api'
import {decode} from 'js-base64'
import {updateWindowHeight} from "@/utils/tools";
import businessProfileActionWithPreview from "@/components/businessProfileActionWithPreview";

export default {
  name: "profile",
  components: {
    meSideMenu,
    businessProfile,
    dealByListComponent,
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
      dealsListData:[]


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
    this.getDealsList(1, 1000)

  },
  methods: {
    getDealsList(page, limit) {

      let filterResult = this.filterResultData;

      let paramsA = {
        page: page,
        limit: limit
      }

      let params = Object.assign(paramsA,filterResult)

      MY_DEALS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.dealsListData = res.message.data;
          this.dealTotalNum = res.message.total
          this.showLoadingStatus = false
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    backToSearchResults(){
      this.$router.push('/account/home')
    },
    showDealDetailDialog(){

    },
    updateBusinessProfile() {
      let params = {
        token: localStorage.getItem('token')
      }

      VENDOR_PERCENTAGE_V2(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

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
    },

    async submitEduBusinessCompanyForm() {

      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {'SingleLine': this.companyInfo.company_name  // Education Business Name
        },
        {'Dropdown2': ''  //Education Business Category
        },
        {'Dropdown': 'Education Business'  //Company Type
        },
        {'Website': ''  //Education Business Website
        },
        {'SingleLine1': ''  // Education Business Contact
        },
        {'Number2': ''  //  Company Number
        },
        {'SingleLine5': userId  //UserID
        },
        {'PhoneNumber_countrycode': ''  //Education Business Phone
        },
        {'Email': ''  // Education Business Email
        },
        {'Number': ''   //Number of Employees
        },
        {'Number1': ''   //Membership Duration
        },
        {'Dropdown1': ''   //Membership Type
        },
        {'Address_AddressLine1': ''   //Street Address
        },
        {'Address_City': ''   //City
        },
        {'Address_Region': ''   //State/Region/Province
        },
        {'Address_Country': ''   //Country
        },
        {'SingleLine4': ''   //   Business Registration No.
        },
        {'MultiLine': ''   //Company Intro
        },
        {'SingleLine3': ''   //WeChat ID
        },
        {'Number3': ''  //  Number of Branches
        },
        {'Number4': ''  //    Number of Students
        },
        {'MultipleChoice': ''  //    Students Ages
        },
        {'MultiLine1': ''  //     Curriculum Subjects
        },
        {'MultiLine2': ''  //     School Facilities
        },
        {'Website1': ''  // Business License Link
        },
        {'Website2': this.companyInfo.logo   //Company Logo Link
        },
        {'Website3': this.companyInfo.background_image   //Header Image Link
        }

      ]

      let zohoParams = {
        zoho_data: zohoData,
        zoho_url: 'https://forms.zohopublic.com/edupassport/form/EduBusinessCompanyForm/formperma/2gsVgXjDNmE5niOKVzRmwT2tlYNWWCTD2kCDHv_CAV8/htmlRecords/submit'
      }

      await ZOHO_SYNC(zohoParams).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
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

.business-deals{

}

.business-profile{
  margin-left: 50px;
  height: calc(100vh - 200px);
}

@media screen and (min-width: 1200px) and (max-width: 1919px){

}


@media screen and (max-width: 768px){
  .business-profile{
    margin-left: 0;
    height: calc( var(--i-window-height) - 220px);
    background-color: #FFFFFF;
  }
   .business-profile-r{
     width: 100%;
     height: calc( var(--i-window-height) - 160px);
     padding: 0;
   }



}

</style>
