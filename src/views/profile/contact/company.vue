<template>
  <div class="bg">
    <div class="basic-container">

      <profileTitle :i="i" :action="action"></profileTitle>

      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" v-if="sideMenuStatus">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="basic-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="basic-breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item>Company Contact Person</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="basic-form">
            <el-form
                ref="basicForms"
                :model="basicForm"
                :rules="basicRules"
                label-width="120px"
                label-position="top"
                class="demo-ruleForm"
            >
              <el-form-item label="Display Name" prop="display_name">
                <el-input v-model="basicForm.display_name" placeholder="Display Name"></el-input>
              </el-form-item>
              <el-form-item label="Job Title" prop="job_title">
                <el-input v-model="basicForm.job_title" placeholder="Job Title"></el-input>
              </el-form-item>

              <el-form-item label="Profile Photo" prop="profile_photo">
                <el-upload
                    class="profile-uploader"
                    action=""
                    :headers="uploadHeaders"
                    :show-file-list="false"
                    :http-request="profilePhotoHttpRequest"
                    :before-upload="beforeProfilePhotoUpload"
                >
                  <el-image v-if="profilePhotoUrl" :src="profilePhotoUrl" class="profile-avatar"></el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

            </el-form>
          </div>

          <div class="submit-btn-container">
            <el-button type="primary"
                       class="submit-btn"
                       :loading="submitLoadingValue"
                       @click="submitForm('basicForms')">
              Submit
            </el-button>
          </div>

        </el-col>
      </el-row>
    </div>

    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUploadProfile()" ></xllLoading>

  </div>
</template>

<script>
import xllLoading from "@/components/xllLoading"
import ImageCompressor from 'compressorjs'


import profileTitle from "@/components/profileTitle"
import meSideMenu from "@/components/meSideMenu";
import {
  ZOHO_SYNC,
  USER_INFO_VISITOR_V2,
  USER_INFO_BY_TOKEN_V2,
  RECRUITER_COMPANY_EDIT_V2,
  SCHOOL_COMPANY_EDIT_V2,
  OTHER_COMPANY_EDIT_V2,
  VENDOR_COMPANY_EDIT_V2,
  RECRUITER_PERCENTAGE_V2,
  SCHOOL_PERCENTAGE_V2,
  OTHER_PERCENTAGE_V2,
  VENDOR_PERCENTAGE_V2, SWITCH_IDENTITY_V2,
  UPLOAD_BY_ALI_OSS, UPLOAD_BY_SERVICE
} from '@/api/api';
import {useStore} from "vuex";
import {ref,reactive} from "vue";
import {encode,decode} from "js-base64";

export default {
  name: "companyContact",
  components: {
    meSideMenu,
    profileTitle,
    xllLoading
  },
  setup(){
    const store = useStore()

    const setIdentity = (data)=>{
      store.commit('identity',data)
    }
    const submitLoadingValue = ref(false)

    const basicForms = ref(null)

    const basicForm = reactive({
      display_name: "",
      job_title:'',
      profile_photo:'',
      website:''
    })

    const basicRules = reactive({
      display_name: [
        {
          required: true,
          message: 'Display Name',
          trigger: 'blur',
        }
      ],
      job_title: [
        {
          required: true,
          message: 'Job Title',
          trigger: 'blur',
        }
      ],
      profile_photo: [
        {
          required: true,
          message: "Choose your profile photo",
          trigger: 'change',
        },
      ]

    })

    return {
      setIdentity,
      submitLoadingValue,
      basicForm,
      basicForms,
      basicRules
    }
  },
  data() {
    return {
      uploadLoadingStatus:false,
      sideMenuStatus:true,
      companyId:undefined,
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      profilePhotoUrl: '',
      i:0,
      action:''

    }
  },
  mounted() {

    let str = this.$route.query.s;

    if(str){
      let strObj = JSON.parse(decode(str))

      // console.log(str)
      this.i = strObj.i;
      this.action = strObj.action;

      if(strObj.action == 'add'){
        this.sideMenuStatus = false;
      }

      if(strObj.action == 'edit'){
        this.getBasicInfo(strObj.i)
      }

    }

  },
  methods: {
    cancelUploadProfile(){
      this.uploadLoadingStatus = false;
    },
    getVisitorInfo(uid,identity) {

      let params = {
        user_id:uid,
        identity: identity
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        console.log(res)
        if(res.code == 200){
          let companyInfo = res.message.user_contact.company;

          if(companyInfo){

            if(companyInfo.display_name){
              this.basicForm.display_name = companyInfo.display_name;
            }

            if(companyInfo.job_title){
              this.basicForm.job_title = companyInfo.job_title ;
            }
            if(companyInfo.website){
              this.basicForm.website = companyInfo.website;
            }

            if(companyInfo.profile_photo){
              this.basicForm.profile_photo = companyInfo.profile_photo;
              this.profilePhotoUrl = companyInfo.profile_photo
            }

            if(companyInfo.id){
              this.companyId = companyInfo.id;
            }


          }

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getBasicInfo(identity) {

      let params = {
        identity: identity
      }

      USER_INFO_BY_TOKEN_V2(params).then(res => {
        console.log(res)
        if(res.code == 200){
          let companyInfo = res.message.user_contact.company;

          if(companyInfo){

            if(companyInfo.display_name){
              this.basicForm.display_name = companyInfo.display_name;
            }

            if(companyInfo.job_title){
              this.basicForm.job_title = companyInfo.job_title ;
            }
            if(companyInfo.website){
              this.basicForm.website = companyInfo.website;
            }

            if(companyInfo.profile_photo){
              this.basicForm.profile_photo = companyInfo.profile_photo;
              this.profilePhotoUrl = companyInfo.profile_photo
            }

            if(companyInfo.id){
              this.companyId = companyInfo.id;
            }

          }

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    profilePhotoHttpRequest(options){
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file,{
        quality:0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token',localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if(isInChina === 'yes'){
            formData.append('file[]',file,file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.profilePhotoUrl = myFileUrl
                self.basicForm.profile_photo = myFileUrl

              }
            }).catch(err=>{
              console.log(err)
            })

          }

          if(isInChina === 'no'){
            formData.append('file',file,file.name)
            UPLOAD_BY_SERVICE(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.profilePhotoUrl = myFileUrl
                self.basicForm.profile_photo = myFileUrl
              }
            }).catch(err=>{
              console.log(err)
            })

          }

        },
        error(err){
          console.log(err.message)
        }

      })

    },
    beforeProfilePhotoUpload(file) {
      this.uploadLoadingStatus = true;

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    submitForm(formName) {
      // console.log(formName)
      let i = this.i;
      let action = this.action;

      this.submitLoadingValue=true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.basicForm)
          if(this.companyId){
            this.basicForm.id = this.companyId
          }

          let params = Object.assign({}, this.basicForm)

          if(i == 2){
            this.updateRecruiterCompany(params,i,action)
          }

          if(i == 3){
           this.updateSchoolCompany(params,i,action)
          }

          if(i == 4){
           this.updateOtherCompany(params,i,action)
          }

          if(i == 5){
            this.updateVendorCompany(params,i,action)
          }

        } else {
          console.log('error submit!!')
          this.submitLoadingValue=false
          return false

        }
      })
    },
    updateRecruiterCompany(params,i,action){

      RECRUITER_COMPANY_EDIT_V2(params).then(res=>{
        // console.log(res)
        if(res.code == 200){
          if(action == 'edit'){
            this.$router.push('/business/profile')
          }else{
            let strObj = {
              i:i,
              cid:res.message.recruiting_company_id,
              action:'add'
            }
            let str = encode(JSON.stringify(strObj))
            this.changeIdentity(i,res.message.recruiting_company_id,2)
            this.$router.push({path:'/business/edit/recruiter',query:{s:str}})
          }
        }

      }).catch(err=>{
        this.$message.error(err.msg)
        this.submitLoadingValue=false
      })
    },
    updateSchoolCompany(params,i,action){
      SCHOOL_COMPANY_EDIT_V2(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          if(action == 'edit'){
            this.$router.push('/business/profile')
          }else{
            let strObj = {
              i:i,
              cid:res.message.school_company_id,
              action:'add'
            }
            let str = encode(JSON.stringify(strObj))
            this.changeIdentity(i,res.message.school_company_id,2)
            this.$router.push({path:'/business/edit/school',query:{s:str}})
          }
        }
      }).catch(err=>{
        this.$message.error(err.msg)
        this.submitLoadingValue=false
      })
    },
    updateOtherCompany(params,i,action){
      OTHER_COMPANY_EDIT_V2(params).then(res=>{
        console.log(res)
        if(res.code == 200){

          if(action == 'edit'){
            this.$router.push('/business/profile')
          }else{
            let strObj = {
              i:i,
              cid:res.message.other_company_id,
              action:'add'
            }
            let str = encode(JSON.stringify(strObj))
            this.changeIdentity(i,res.message.other_company_id,2)
            this.$router.push({path:'/business/edit/other',query:{s:str}})
          }
        }

      }).catch(err=>{
        this.$message.error(err.msg)
        this.submitLoadingValue=false
      })
    },
    updateVendorCompany(params,i,action){
      VENDOR_COMPANY_EDIT_V2(params).then(res=>{
        console.log(res)

        if(res.code == 200){
          if(action == 'edit'){
            this.$router.push('/vendor/profile')
          }else{
            let strObj = {
              i:i,
              cid:res.message.vendor_company_id,
              action:'add'
            }
            let str = encode(JSON.stringify(strObj))
            this.changeIdentity(i,res.message.vendor_company_id,2)
            this.$router.push({path:'/vendor/edit/vendor',query:{s:str}})
          }
        }

      }).catch(err=>{
        this.$message.error(err.msg)
        this.submitLoadingValue=false
      })
    },
    recruiterCalculate(){
      RECRUITER_PERCENTAGE_V2().then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    schoolCalculate(){
      SCHOOL_PERCENTAGE_V2().then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    otherCalculate(){
      OTHER_PERCENTAGE_V2().then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    vendorCalculate(){
      VENDOR_PERCENTAGE_V2().then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    changeIdentity(identity,companyId,language) {
      let params = {
        identity:identity,
        company_id: companyId,
        language:language
      }

      SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

          localStorage.setItem('identity',identity)
          localStorage.setItem('company_id',companyId)
          this.setIdentity(identity)

          if(identity == 2){
            this.recruiterCalculate()
          }
          if(identity == 3){
            this.schoolCalculate()
          }
          if(identity == 4){
            this.otherCalculate()
          }
          if(identity == 5){
            this.vendorCalculate()
          }

          this.submitLoadingValue=false

        }
      }).catch(err=>{
        console.log(err)
        this.submitLoadingValue=false
        this.$message.error(err.msg)
      })

    },
    async submitEducatorContactForm(){

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {'SingleLine': userId  //UserID//
        },
        {'SingleLine1': params.first_name // First Name
        },
        {'SingleLine2': params.last_name //  Last Name
        },
        {'Dropdown': ''  //  Gender
        },
        {'Date': ''  //   Date of Birth dd-MMM-yyyy
        },
        {'SingleLine3': ''  //   Title
        },
        {'Email': ''  //   Email
        },
        {'PhoneNumber_countrycode': ''  //   Phone
        },
        {'SingleLine4': ''  //   Nationality
        },
        {'Dropdown1': ''  //  Membership Type
        },
        {'MultiLine': ''  //  Languages Spoken
        },
        {'Number': ''  //  Membership Duration
        },
        {'SingleLine5': ''  //  City
        },
        {'SingleLine6': ''  //  Province
        },
        {'SingleLine7': ''  //  Country
        },
        {'Dropdown2': ''  //  Educator Type
        },
        {'MultiLine1': ''  //  Education
        },
        {'MultiLine2': ''  //   Work History
        },
        {'Dropdown3': ''  //  Teaching Experience
        },
        {'MultiLine3': ''  //  Certifications
        },
        {'MultiLine4': ''  //  Educator Intro
        },
        {'Website': params.profile_photo  //   Contact image Link
        },
        {'Website1': ''  //   Intro Video Link
        }
      ]

      let zohoParams = {
        zoho_data:zohoData,
        zoho_url:'https://forms.zohopublic.com/edupassport/form/EducatorContactForm/formperma/G014C7ko-MpOp3A2vp6NZlgxhPbGj2HDtbzlZEI6cks/htmlRecords/submit'
      }

      await ZOHO_SYNC(zohoParams).then(res=>{
        console.log(res)
      }).catch(err=>{
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

.basic-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.basic-breadcrumb-container {
  padding: 10px;
}

.basic-r-container {
  padding: 20px;
}

.basic-form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
}

.demo-ruleForm {
  text-align: left;
}

/deep/ .profile-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

/deep/ .profile-uploader .el-upload:hover {
  border-color: #0AA0A8;
}

/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.profile-avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.submit-btn-container{
  text-align: center;
  margin-top:40px;
}

.submit-btn{
  width:40%;
}
.title-container{
  width:100%;
  text-align: center;
}
.title-container h3 span{
  color:#00b3d2;
}

</style>