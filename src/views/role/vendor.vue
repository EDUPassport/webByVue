<template>
  <div class="bg">
    <div class="basic-container">
      <el-row align="top" justify="center">

        <el-col class="basic-r-container" :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <div class="basic-breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/vendor/profile' }">Profile</el-breadcrumb-item>
              <el-breadcrumb-item>Vendor</el-breadcrumb-item>
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
              <el-form-item label="Phone #" prop="phone">
                <el-input v-model="basicForm.phone" placeholder="Phone #"></el-input>
              </el-form-item>
              <el-form-item label="Job Title" prop="job_title">
                <el-input v-model="basicForm.job_title" placeholder="Job Title"></el-input>
              </el-form-item>
              <el-form-item label="Work Email" prop="work_email">
                <el-input v-model="basicForm.work_email" placeholder="Work Email"></el-input>
              </el-form-item>
              <el-form-item label="Company Name (English)" prop="vendor_name_en">
                <el-input v-model="basicForm.vendor_name_en" placeholder="Company Name (English)"></el-input>
              </el-form-item>
              <el-form-item label="Company Name " prop="legal_company_name">
                <el-input v-model="basicForm.legal_company_name" placeholder="Company Name"></el-input>
              </el-form-item>
              <el-form-item label="Company Website" prop="website">
                <el-input v-model="basicForm.website" placeholder="Company Website"></el-input>
              </el-form-item>

              <el-form-item label="Location">
                <el-select v-model="basicForm.province"
                           @change="provinceChange"
                           placeholder="Select Province">
                  <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.Pinyin"
                             :value="item.id"></el-option>
                </el-select>
                <el-select v-model="basicForm.city"
                           @change="cityChange"
                           placeholder="Select City">
                  <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.Pinyin" :value="item.id"></el-option>
                </el-select>
                <el-select v-model="basicForm.district"
                           @change="districtChange"
                           placeholder="Select District">
                  <el-option v-for="(item,i) in districtOptions" :key="i" :label="item.Pinyin"
                             :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Business Category (Choose 1)" prop="vendor_type_id">
                <div class="categories-tags" v-for="(item,k) in subCateOptions" :key="k">
                  <div v-if="item['children'].length>0" class="category-parent">
                  </div>
                  <div v-if="item['children'].length===0" class="categories-tags-item"
                       :class="selectVendorTypeList.findIndex(element=>element.id === item.id) == -1 ? '' : 'tag-active' "
                       @click="selectVendorType(item)">
                    {{ item.identity_name }}
                  </div>
                  <div class="categories-tags-item" v-for="(child,key) in item['children']" :key="key"
                       :class="selectVendorTypeList.findIndex(element=>element.id === child.id) == -1 ? '' : 'tag-active' "
                       @click="selectVendorType(child)">
                    {{ child.identity_name }}
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="Proposed Deal" prop="proposed_deal">
                <el-input v-model="basicForm.proposed_deal" type="textarea" placeholder="10% off all set meals"></el-input>
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

              <el-form-item label="Business Logo" prop="logo">
                <el-upload
                    class="profile-uploader"
                    :action="uploadActionUrl"
                    :headers="uploadHeaders"
                    :data="uploadData"
                    :show-file-list="false"
                    name="file[]"
                    :on-success="handleLogoSuccess"
                    :before-upload="beforeLogoUpload"
                >
                  <el-image v-if="logoPhotoUrl" :src="logoPhotoUrl" class="profile-avatar"></el-image>
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
import {countriesData} from "../../utils/data";
import {CHANGE_IDENTITY_LANGUAGE,ADD_VENDOR_BASIC , SUB_CATE_LIST, ALL_AREAS} from '@/api/api'

export default {
  name: "vendor",
  components: {},
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
        phone: '',
        job_title: '',
        work_email: '',
        profile_photo: '',
        logo: '',
        location: '',
        province: '',
        city: "",
        district: '',
        website: '',
        proposed_deal: '',
        vendor_type_id: '',
        vendor_type_name: '',
        vendor_type_name_cn:'',
        vendor_name_en: '',
        legal_company_name: '',
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
        phone: [
          {
            required: true,
            message: "Phone #",
            trigger: 'blur',
          },
        ],
        job_title: [
          {
            required: true,
            message: "Job Title",
            trigger: 'blur',
          },
        ],
        work_email: [
          {
            required: true,
            message: "Work Email",
            trigger: 'blur',
          },
        ],
        vendor_name_en: [
          {
            required: true,
            message: "Company Name (English)",
            trigger: 'blur',
          },
        ],
        legal_company_name: [
          {
            required: true,
            message: "Company Name",
            trigger: 'blur',
          },
        ],
        website: [
          {
            required: true,
            message: "Company Website ",
            trigger: 'blur',
          },
        ],
        proposed_deal: [
          {
            required: true,
            message: "Proposed Deal",
            trigger: 'blur',
          },
        ],
        profile_photo: [
          {
            required: true,
            message: "Please upload",
            trigger: 'change',
          },
        ],
        location: [
          {
            required: true,
            message: "Please Select ",
            trigger: 'change',
          },
        ],
        vendor_type_id: [
          {
            required: true,
            message: "Business Category (Choose 1) ",
            trigger: 'change',
          },
        ],
        logo: [
          {
            required: true,
            message: "Please upload",
            trigger: 'change',
          },
        ]


      },
      provinceOptions: [],
      cityOptions: [],
      districtOptions: [],
      subCateOptions: [],
      selectVendorTypeList: []

    }
  },
  mounted() {
    this.getAllAreas(0)
    this.getSubCateList()

  },
  methods: {
    handleProfilePhotoSuccess(res, file) {
      // console.log(res.data[0]['file_url'])
      this.profilePhotoUrl = URL.createObjectURL(file.raw)
      this.basicForm.profile_photo = res.data[0]['file_url']
    },
    beforeProfilePhotoUpload(file) {

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    handleLogoSuccess(res, file) {
      // console.log(res.data[0]['file_url'])
      this.logoPhotoUrl = URL.createObjectURL(file.raw)
      this.basicForm.logo = res.data[0]['file_url']

    },
    beforeLogoUpload(file) {

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('logo picture size can not exceed 20MB')
      }
      return isLt2M
    },
    getAllAreas(pid) {
      let params = {
        pid: pid
      }
      ALL_AREAS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.provinceOptions = res.message
        }
      })
    },
    getAllCitys(pid) {
      let params = {
        pid: pid
      }
      ALL_AREAS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.cityOptions = res.message
        }
      })
    },
    getAllDistricts(pid) {
      let params = {
        pid: pid
      }
      ALL_AREAS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.districtOptions = res.message
        }
      })
    },
    provinceChange(e) {
      console.log(e)
      this.getAllCitys(e)
    },
    cityChange(e) {
      console.log(e)
      this.getAllDistricts(e)
    },
    districtChange(e) {
      console.log(e)
    },
    getSubCateList() {
      let params = {
        pid: 3,
        tree: 1
      }
      SUB_CATE_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.subCateOptions = res.message
        }
      })
    },
    selectVendorType(item) {
      // console.log(item);
      if (this.selectVendorTypeList.indexOf(item) == -1) {
        if (this.selectVendorTypeList.length > 0) {
          let len = this.selectVendorTypeList.length - 1;
          this.selectVendorTypeList.splice(len, 1);
        }
        this.selectVendorTypeList.push(item);
      } else {
        this.selectVendorTypeList.splice(this.selectVendorTypeList.indexOf(item), 1);
      }

      console.log(this.selectVendorTypeList);
    },
    submitForm(formName) {

      this.selectVendorTypeList.forEach(item => {
        this.basicForm.vendor_type_id = item.id;
        this.basicForm.vendor_type_name = item.identity_name;
        this.basicForm.vendor_type_name_cn = item.identity_name_cn;
      })

      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.basicForm)
          let params = Object.assign({}, this.basicForm)
          ADD_VENDOR_BASIC(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              // this.$router.push('/educator/profile')
              this.changeIdentity(3)
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
          this.$router.push('/home')
        }
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