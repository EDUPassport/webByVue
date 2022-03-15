<template>
  <div class="bg">
    <div class="basic-container">
      <el-row align="top" justify="center">

        <el-col class="basic-r-container" :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <div class="basic-breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/business/profile' }">Profile</el-breadcrumb-item>
              <el-breadcrumb-item>Business</el-breadcrumb-item>
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
              <el-form-item label="First Name" prop="first_name">
                <el-input v-model="basicForm.first_name" placeholder="First Name"></el-input>
              </el-form-item>
              <el-form-item label="Last Name" prop="last_name">
                <el-input v-model="basicForm.last_name" placeholder="Last Name"></el-input>
              </el-form-item>
              <el-form-item label="Job Title" prop="job_title">
                <el-input v-model="basicForm.job_title" placeholder="Job Title"></el-input>
              </el-form-item>
              <el-form-item label="Work Email" prop="work_email">
                <el-input v-model="basicForm.work_email" placeholder="Work Email"></el-input>
              </el-form-item>
              <el-form-item label="Nationality" prop="nationality">
                <el-select v-model="basicForm.nationality"
                           filterable
                           placeholder="Select your nationality">
                  <el-option v-for="(item,i) in nationalityOptions" :key="i" :label="item.name"
                             :value="item.name"></el-option>
                </el-select>
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

              <el-form-item label="Business/ Institution Name" prop="business_name">
                <el-input v-model="basicForm.business_name" placeholder="Business/ Institution Name"></el-input>
              </el-form-item>
              <el-form-item label="Location" prop="province">
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

              <el-form-item label="Edu-Business Categories (Choose 1)" prop="business_type_id">
                <div class="categories-tags" v-for="(item,k) in subCateOptions" :key="k">
                  <div v-if="item['children'].length>0" class="category-parent">
                  </div>
                  <div v-if="item['children'].length===0" class="categories-tags-item"
                       :class="selectBusinessTypeList.findIndex(element=>element.id === item.id) == -1 ? '' : 'tag-active' "
                       @click="selectBusinessType(item)">
                    {{ item.identity_name }}
                  </div>
                  <div class="categories-tags-item" v-for="(child,key) in item['children']" :key="key"
                       :class="selectBusinessTypeList.findIndex(element=>element.id === child.id) == -1 ? '' : 'tag-active' "
                       @click="selectBusinessType(child)">
                    {{ child.identity_name }}
                  </div>
                </div>
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
                <el-button type="primary" :loading="submitLoadingValue" @click="submitForm('basicForms')">
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
import {CHANGE_IDENTITY_LANGUAGE, ADD_BUSINESS_BASIC, SUB_CATE_LIST, ALL_AREAS, ZOHO_SYNC} from '@/api/api'
import {ref,reactive} from 'vue'
import {useStore} from "vuex";

export default {
  name: "business",
  components: {},
  setup(){
    const submitLoadingValue = ref(false)
    const store = useStore()
    const setIdentity = (data)=>{
      store.commit('identity',data)
    }

    let basicForms = ref(null)

    const basicForm = reactive({
      first_name: "",
      last_name:'',
      job_title: '',
      work_email: '',
      nationality: '',
      profile_photo: '',
      business_name: '',
      location: '',
      province: '',
      city: '',
      district: '',
      business_type_id: '',
      business_type_name: '',
      business_type_name_cn: '',
      logo: '',
      token: localStorage.getItem('token')
    })

    const checkLocations=(rule,value,callback)=>{
      if(!value){
        return callback(new Error('Please select'))
      }
      if(!basicForm.province || !basicForm.city || !basicForm.district){
        return callback(new Error('Please select'))
      }
      callback()
    }

    const basicRules = reactive({
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
      nationality: [
        {
          required: true,
          message: "Nationality",
          trigger: 'change',
        },
      ],
      profile_photo: [
        {
          required: true,
          message: "Choose Your Profile Photo",
          trigger: 'change',
        },
      ],
      business_name: [
        {
          required: true,
          message: "Business/ Institution Name",
          trigger: 'blur',
        },
      ],
      province: [
        {
          required: true,
          validator:checkLocations,
          trigger: 'blur',
        },
      ],
      business_type_id: [
        {
          required: true,
          message: "Edu-Business Categories (Choose 1) ",
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

    })

    return {
      submitLoadingValue,
      setIdentity,
      basicForms,
      basicForm,
      basicRules
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

      provinceOptions: [],
      cityOptions: [],
      districtOptions: [],
      subCateOptions: [],
      selectBusinessTypeList: []

    }
  },
  mounted() {
    this.getAllAreas(0)
    this.getSubCateList()

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
    handleLogoSuccess(res, file) {
      this.$loading().close()
      // console.log(res.data[0]['file_url'])
      this.logoPhotoUrl = URL.createObjectURL(file.raw)
      this.basicForm.logo = res.data[0]['file_url']

    },
    beforeLogoUpload(file) {
      this.$loading({
        text:'Uploading...'
      })
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
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
        pid: 2,
        tree: 1
      }
      SUB_CATE_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.subCateOptions = res.message
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    selectBusinessType(item) {
      // console.log(item);
      if (this.selectBusinessTypeList.indexOf(item) == -1) {
        if (this.selectBusinessTypeList.length > 0) {
          let len = this.selectBusinessTypeList.length - 1;
          this.selectBusinessTypeList.splice(len, 1);
        }
        this.selectBusinessTypeList.push(item);
      } else {
        this.selectBusinessTypeList.splice(this.selectBusinessTypeList.indexOf(item), 1);
      }

    },
    submitForm(formName) {
      this.submitLoadingValue = true
      let businessTypeId;
      let businessTypeName;
      let businessTypeNameCn;
      this.selectBusinessTypeList.forEach(item => {
        businessTypeId = item.id;
        businessTypeName = item.identity_name;
        businessTypeNameCn = item.identity_name_cn;
      })
      this.basicForm.business_type_id = businessTypeId;
      this.basicForm.business_type_name = businessTypeName;
      this.basicForm.business_type_name_cn = businessTypeNameCn;

      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.basicForm)
          let params = Object.assign({}, this.basicForm)
          ADD_BUSINESS_BASIC(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              // this.$router.push('/educator/profile')
              this.submitEduBusinessCompanyForm()
              this.changeIdentity(2)
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
          // console.log('success')
          localStorage.setItem('identity',identity)
          this.setIdentity(identity)
          this.$router.push('/home')
          this.submitLoadingValue=false
        }
      }).catch(err=>{
        console.log(err)
        this.submitLoadingValue=false
        this.$message.error(err.msg)
      })
    },
    async submitEduBusinessCompanyForm(){

      let params = Object.assign({}, this.basicForm)

      let userId = localStorage.getItem('uid')

      let zohoData = [
        {
          'zf_referrer_name':''
        },
        {
          'zf_redirect_url':''
        },
        {
          'zc_gad':''
        },
        {
          'SingleLine':params.business_name // Education Business Name
        },
        {
          'Dropdown2': params.business_type_name //Education Business Category
        },
        {
          'Dropdown':'Education Business' //Company Type
        },
        {
          'Website':'' //Education Business Website
        },
        {
          'SingleLine1':'' // Education Business Contact
        },
        {
          'Number2':'' //  Company Number
        },
        {
          'SingleLine5':userId //UserID
        },
        {
          'PhoneNumber_countrycode':'' //Education Business Phone
        },
        {
          'Email':params.work_email  //Education Business Email
        },
        {
          'Number':'' //Number of Employees
        },
        {
          'Number1':'' //  Membership Duration
        },
        {
          'Dropdown1':'' // Membership Type
        },
        {
          'Address_AddressLine1':'' //Street Address
        },
        {
          'Address_City':'' //City
        },
        {
          'Address_Region':'' //State/Region/Province
        },
        {
          'Address_Country':'' //Country
        },
        {
          'SingleLine4':'' //   Business Registration No.
        },
        {
          'MultiLine':''  //Company Intro
        },
        {
          'SingleLine3':'' //WeChat ID
        },
        {
          'Number3':'' //  Number of Branches
        },
        {
          'Number4':'' // Number of Students
        },
        {
          'MultipleChoice':''  // Students Ages
        },
        {
          'MultiLine1':'' //  Curriculum Subjects
        },
        {
          'MultiLine2':''  //  School Facilities
        },
        {
          'Website1':'' // Business License Link
        },
        {
          'Website2': params.logo   //Company Logo Link
        },
        {
          'Website3':''  //Header Image Link
        }
      ]

      let zohoParams = {
        zoho_data:zohoData,
        zoho_url:'https://forms.zohopublic.com/edupassport/form/EduBusinessCompanyForm/formperma/2gsVgXjDNmE5niOKVzRmwT2tlYNWWCTD2kCDHv_CAV8/htmlRecords/submit'
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