<template>
  <div class="bg">
    <div class="educator-container">

      <div class="educator-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <div class="educator-r-container">

        <div class="educator-r-container-bg">
          <businessProfile :canEdit="true" :info="companyInfo" :identity="identity"></businessProfile>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import meSideMenu from "@/components/meSideMenu";
import businessProfile from "@/components/businessProfile";

import {
  ZOHO_SYNC,
  USER_INFO_BY_TOKEN_V2,
  RECRUITER_PERCENTAGE_V2,
  OTHER_PERCENTAGE_V2, SCHOOL_PERCENTAGE_V2
} from '@/api/api'
import {encode} from 'js-base64'

export default {
  name: "profile",
  components: {
    meSideMenu,
    businessProfile

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

    }
  },
  mounted() {
    this.getUserInfo()
    this.updateBusinessProfile()
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
    editBasicInfo() {

      let identity = Number(localStorage.getItem('identity'))

      let strObj = {
        i:identity,
        action:'edit'
      }

      let str = encode(JSON.stringify(strObj))

      this.$router.push({path:'/profile/contact/user',query:{s:str}})

    },
    editCompanyContactInfo(){
      let identity = Number(localStorage.getItem('identity'))

      let strObj = {
        i:identity,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))

      this.$router.push({path:'/profile/contact/company',query:{s:str}})
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
.bg {
  background-color: #f5f6f7;
}

.educator-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.educator-r-container {
  width:calc(100% - 160px);
  height: calc(100vh - 220px);
}

.educator-r-container-bg{
  padding: 30px 50px 50px 50px;
}


@media screen and (min-width: 1200px){

}

@media screen and (max-width: 768px){

}

</style>
