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
  USER_INFO_BY_TOKEN_V2,VENDOR_PERCENTAGE_V2
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
      companyInfo:{},
    }
  },
  mounted() {
    this.getUserInfo()
    this.updateBusinessProfile()
  },
  methods: {
    cancelUploadProfile(){
      this.uploadLoadingStatus = false;
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
    editBasicInfo() {
      let strObj = {
        i:5,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))

      this.$router.push({path:'/profile/contact/user',query:{s:str}})

    },
    editCompanyContactInfo(){
      let strObj = {
        i:5,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))

      this.$router.push({path:'/profile/contact/company',query:{s:str}})
    },
    editCompanyInfo(){
      if(this.companyInfo.id){
        let strObj = {
          cid:this.companyInfo.id,
          action:'edit'
        }
        let str = encode(JSON.stringify(strObj))

        this.$router.push({path:'/vendor/edit/vendor',query:{s:str}})
      }else{
        let strObj = {
          i:5,
          action:'add'
        }
        let str = encode(JSON.stringify(strObj))

        this.$router.push({path:'/vendor/edit/vendor',query:{s:str}})
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

@media screen and (min-width:1200px) {


}

@media screen and (max-width: 768px) {

}

</style>
