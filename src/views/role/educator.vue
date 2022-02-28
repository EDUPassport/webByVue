<template>
  <div class="bg">
    <div class="basic-container">
      <el-row align="top" justify="center">

        <el-col class="basic-r-container" :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <div class="basic-breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/educator/profile' }">Profile</el-breadcrumb-item>
              <el-breadcrumb-item>Educator</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="basic-form">
            <el-form
                ref="basicForm"
                :model="basicForm"
                :rules="basicRules"
                label-width="120px"
                label-position="top"
                class="demo-ruleForm"
            >
              <el-form-item label="First Name" prop="first_name">
                <el-input v-model="basicForm.first_name" placeholder="First Name"></el-input>
              </el-form-item>
              <el-form-item label="Last Name" prop="last_name">
                <el-input v-model="basicForm.last_name" placeholder="Last Name"></el-input>
              </el-form-item>
              <el-form-item label="Wechat ID" prop="wx_id">
                <el-input v-model="basicForm.wx_id" placeholder="Wechat ID"></el-input>
              </el-form-item>

              <el-form-item label="Profile Photo" prop="profile_photo">
                <el-upload
                    class="profile-uploader"
                    :action="uploadActionUrl"
                    :headers="uploadHeaders"
                    :data="uploadData"
                    :show-file-list="false"
                    name="file[]"
                    :on-success="handleProfilePhotoSuccess"
                    :before-upload="beforeProfilePhotoUpload"
                >
                  <el-image v-if="profilePhotoUrl" :src="profilePhotoUrl" class="profile-avatar"></el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" :loading="submitLoadingValue" @click="submitForm('basicForm')">
                  Submit
                </el-button>

              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {countriesData} from "../../utils/data";
import {CHANGE_IDENTITY_LANGUAGE, ADD_EDU_BASIC} from '@/api/api'
import {useStore} from "vuex";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "educator",
  components: {},
  setup(){
    const store = useStore()

    const setIdentity = (data)=>{
          store.commit('identity',data)
    }
    const submitLoadingValue = ref(false)

    return {
      setIdentity,
      submitLoadingValue
    }
  },
  data() {
    return {
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      profilePhotoUrl: '',
      logoPhotoUrl: '',
      nationalityOptions: countriesData,
      basicForm: {
        first_name: "",
        last_name:'',
        wx_id: '',
        profile_photo: '',
        token: localStorage.getItem('token')
      },
      basicRules: {
        first_name: [
          {
            required: true,
            message: 'First Name',
            trigger: 'blur',
          }
        ],
        last_name: [
          {
            required: true,
            message: 'Last Name',
            trigger: 'blur',
          }
        ],
        wx_id: [
          {
            required: true,
            message: "Wechat ID",
            trigger: 'blur',
          },
        ],
        profile_photo: [
          {
            required: true,
            message: "Choose Your Profile Photo",
            trigger: 'change',
          },
        ]
      }

    }
  },
  mounted() {

  },
  methods: {
    handleProfilePhotoSuccess(res, file) {
      // console.log(res.data[0]['file_url'])
      this.$loading().close()
      this.profilePhotoUrl = URL.createObjectURL(file.raw)
      this.basicForm.profile_photo = res.data[0]['file_url']
    },
    beforeProfilePhotoUpload(file) {
      this.$loading({
        text:'Uploading...'
      })
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    submitForm(formName) {
      this.submitLoadingValue=true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.basicForm)
          let params = Object.assign({}, this.basicForm)
          ADD_EDU_BASIC(params).then(res => {
            // console.log(res)
            if (res.code == 200) {
              // this.$router.push('/educator/profile')
              this.submitEducatorContactForm()
              this.submitCompanyContactForm()

              this.changeIdentity(1)
            }
          }).catch(err=>{
            console.log(err)
            this.$message.error(err.msg)
            this.submitLoadingValue=false
          })
        } else {
          console.log('error submit!!')
          this.submitLoadingValue=false
          return false

        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    changeIdentity(identity) {
      let params = {
        token: localStorage.getItem('token'),
        identity: identity
      }

      CHANGE_IDENTITY_LANGUAGE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          console.log('success')
          localStorage.setItem('identity',identity)
          this.setIdentity(identity)
          this.submitLoadingValue=false
          this.$router.push('/home')
        }
      }).catch(err=>{
        console.log(err)
        this.submitLoadingValue=false
        this.$message.error(err.msg)
      })

    },
    async submitEducatorContactForm(){

      let params = Object.assign({}, this.basicForm)

      let formData = new FormData();
      let userId = localStorage.getItem('uid')

      formData.append('zf_referrer_name','')
      formData.append('zf_redirect_url','')
      formData.append('zc_gad','')

      formData.append('SingleLine',userId) //UserID
      formData.append('SingleLine1',params.first_name) // First Name
      formData.append('SingleLine2',params.last_name) //  Last Name
      formData.append('Dropdown','') //  Gender
      formData.append('Date','') //   Date of Birth dd-MMM-yyyy
      formData.append('SingleLine3','') //   Title
      formData.append('Email','') //   Email
      formData.append('PhoneNumber_countrycode','') //   Phone
      formData.append('SingleLine4','') //   Nationality
      formData.append('Dropdown1','') //   Membership Type
      formData.append('MultiLine','') //   Languages Spoken
      formData.append('Number','') //   Membership Duration
      formData.append('SingleLine5','') //   City
      formData.append('SingleLine6','') //   Province
      formData.append('SingleLine7','') //   Country
      formData.append('Dropdown2','') //   Educator Type
      formData.append('MultiLine1','') //   Education
      formData.append('MultiLine2','') //    Work History
      formData.append('Dropdown3','') //    Teaching Experience
      formData.append('MultiLine3','') //   Certifications
      formData.append('MultiLine4','') //   Educator Intro
      formData.append('Website',params.profile_photo) //   Contact image Link
      formData.append('Website1','') //   Intro Video Link

      await axios.post('/edupassport/form/EducatorContactForm/formperma/G014C7ko-MpOp3A2vp6NZlgxhPbGj2HDtbzlZEI6cks/htmlRecords/submit', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        baseURL: '/zohoPublic',
        timeout: 100000
      }).then(res => {
        console.log(res)

      }).catch(err=>{
        console.log(err)
      })

    },
    async submitCompanyContactForm(){

      let params = Object.assign({}, this.basicForm)

      let formData = new FormData();
      let userId = localStorage.getItem('uid')

      formData.append('zf_referrer_name','')
      formData.append('zf_redirect_url','')
      formData.append('zc_gad','')

      formData.append('SingleLine',userId) //UserID
      formData.append('SingleLine1',params.first_name) // First Name
      formData.append('SingleLine2',params.last_name) //  Last Name
      formData.append('Dropdown','') //  Gender
      formData.append('Date','') //   Date of Birth dd-MMM-yyyy
      formData.append('SingleLine3','') //   Title
      formData.append('Email','') //   Email
      formData.append('PhoneNumber_countrycode','') //   Phone
      formData.append('SingleLine4','') //   Nationality

      formData.append('Dropdown1','') //   Membership Type

      formData.append('Number','') //   Membership Duration
      formData.append('SingleLine5','') //   City
      formData.append('SingleLine6','') //   Province
      formData.append('SingleLine7','') //   Country

      formData.append('Website',params.profile_photo) //   Contact image Link

      await axios.post('/edupassport/form/CompanyContactForm/formperma/ZYHWpHeaRP511w85Ljl47AYAS77L3z9qcqUw4Wv48io/htmlRecords/submit', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        baseURL: '/zohoPublic',
        timeout: 100000
      }).then(res => {
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

.categories-tags {

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px dashed #EEEEEE;
  padding-bottom: 10px;
}

.categories-tags:last-child {
  border-bottom: none;
}

.category-parent {
  width: 100%;
  font-size: 14px;
  color: #808080;
  font-weight: 700;
  text-align: left;
}

.categories-tags-item {
  padding: 4px 10px;
  background-color: #EEEEEE;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
}

.tag-active {
  background-color: #00b3d2;
  color: #FFFFFF;
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

</style>