<template>
  <div class="bg">
    <div class="basic-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="basic-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="basic-breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/vendor/profile' }">Profile</el-breadcrumb-item>
              <el-breadcrumb-item>Basic</el-breadcrumb-item>
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
              <el-form-item label="Company Name" prop="vendor_name_en">
                <el-input v-model="basicForm.vendor_name_en" placeholder="Company Name"></el-input>
              </el-form-item>
              <el-form-item label="Legal Company Name" >
                <el-input v-model="basicForm.legal_company_name" placeholder="Legal Company Name"></el-input>
              </el-form-item>
              <el-form-item label="Business Registration ID" >
                <el-input v-model="basicForm.busin_reg_num" placeholder="Business Registration ID"></el-input>
              </el-form-item>
              <el-form-item label="Business License">
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
                  <el-image v-if="businessRegImgUrl" :src="businessRegImgUrl" class="profile-avatar" ></el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('basicForm')">
                  Submit
                </el-button>
                <el-button @click="resetForm('basicForm')">Reset</el-button>
              </el-form-item>
            </el-form>

          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import meSideMenu from "@/components/meSideMenu";
import { ADD_VENDOR_BASIC} from '@/api/api'

export default {
  name: "legalInfo",
  components: {
    meSideMenu
  },
  data() {
    return {
      uploadActionUrl:process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders:{
        platform:4
      },
      uploadData:{
        token:localStorage.getItem('token')
      },
      businessRegImgUrl:'',
      basicForm: {
        vendor_name_en: '',
        legal_company_name: '',
        busin_reg_num: '',
        busin_reg_img: '',
        token:localStorage.getItem('token')
      },
      basicRules: {
        vendor_name_en: [
          {
            required: true,
            message: 'Please input',
            trigger: 'blur',
          }
        ],

      }

    }
  },
  mounted() {
    // console.log(countriesData)

  },
  methods: {
    handleProfilePhotoSuccess(res, file) {
      // console.log(res.data[0]['file_url'])
      this.businessRegImgUrl = URL.createObjectURL(file.raw)
      this.basicForm.busin_reg_img = res.data[0]['file_url']
    },
    beforeProfilePhotoUpload(file) {

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let params = Object.assign({}, this.basicForm)
          ADD_VENDOR_BASIC(params).then(res => {
            console.log(res)
            if(res.code == 200){
              this.$router.push('/vendor/profile')
            }
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(e) {
      console.log(e)
    },



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
.object-show-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}

.object-show-item {
  background-color: rgba(0, 179, 210, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  margin: 10px;
  font-size: 14px;
  cursor: pointer;
}

.object-tags-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}

.object-tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

}

.object-tags-item {
  background-color: rgba(0, 179, 210, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  margin: 10px;
  font-size: 14px;
  cursor: pointer;
}

.object-tags-add {
  width: 100%;
  margin-top: 10px;
}

.object-tags-item-add {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}


.tags-active {
  background-color: #00CE47;
  color: #FFFFFF;
}


.basic-breadcrumb-container{
  padding: 10px;
}
/deep/ .profile-uploader .el-upload{
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

.profile-avatar{
  width: 178px;
  height: 178px;
  display: block;
}

</style>