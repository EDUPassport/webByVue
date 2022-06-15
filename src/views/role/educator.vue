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
import {countriesData} from "@/utils/data";
import {CHANGE_IDENTITY_LANGUAGE, UPDATE_EDUCATOR_PROFILE, ADD_EDU_BASIC, ZOHO_SYNC, GET_BASIC_INFO} from '@/api/api'
import {useStore} from "vuex";
import {ref} from "vue";

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
            required: false,
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
    this.getBasicInfo()
  },
  methods: {
    getBasicInfo() {
      let uid = localStorage.getItem('uid')
      let token = localStorage.getItem('token')
      let params = {
        id: uid,
        token: token
      }
      GET_BASIC_INFO(params).then(res => {
        console.log(res)
        if(res.code == 200){
          if(res.message.educator_info){
            let educatorInfo = res.message.educator_info;
            this.basicForm.first_name = educatorInfo.first_name;
            this.basicForm.last_name = educatorInfo.last_name;
            this.basicForm.email = educatorInfo.email ;
          }

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    updateEduProfile(){
      let params = {
        token:localStorage.getItem('token')
      }
      UPDATE_EDUCATOR_PROFILE(params).then(res=>{
        console.log(res)
      })
    },
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
          this.updateEduProfile()
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