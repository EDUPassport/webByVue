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
              <el-breadcrumb-item :to="{ path: '/business/profile' }">Profile</el-breadcrumb-item>
              <el-breadcrumb-item>Business Information</el-breadcrumb-item>
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
              <el-form-item label="Business Name" prop="business_name">
                <el-input v-model="basicForm.business_name" placeholder="Business Name"></el-input>
              </el-form-item>
              <el-form-item label="Business Introduction" prop="business_bio">
                <el-input v-model="basicForm.business_bio" type="textarea" placeholder="Business Introduction"></el-input>
              </el-form-item>
              <el-form-item label="Year Founded" >
                <el-date-picker
                    v-model="basicForm.year_founded"
                    type="year"
                    value-format="YYYY"
                    placeholder="Year Founded"
                    style="width: 100%"
                ></el-date-picker>
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
<!--              <el-form-item label="Add Location Pin" >-->
<!--                <el-input v-model="basicForm.address" placeholder="Add Location Pin"></el-input>-->
<!--                <GMapAutocomplete-->
<!--                    placeholder="This is a placeholder"-->
<!--                    @place_changed="setPlace"-->
<!--                >-->
<!--                </GMapAutocomplete>-->
<!--              </el-form-item>-->
              <el-form-item label="Website" >
                <el-input v-model="basicForm.website" placeholder="www.eslpassport.com"></el-input>
              </el-form-item>
              <el-form-item label="Business Phone #" >
                <el-input v-model="basicForm.business_phone" placeholder="Business Phone #"></el-input>
              </el-form-item>
              <el-form-item label="Currently Hiring">
                <el-switch v-model="basicForm.is_currently_hiring"></el-switch>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('basicForm')">
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
import meSideMenu from "@/components/meSideMenu";
import {ALL_AREAS, ADD_BUSINESS_BASIC,GET_BASIC_INFO} from '@/api/api'
import {countriesData} from "../../../../utils/data";
import axios from "axios";

export default {
  name: "businessInfo",
  components: {
    meSideMenu
  },
  data() {
    return {
      basicForm: {
        business_name: '',
        business_bio: '',
        year_founded: '',
        location: '',
        country: '',
        province: '',
        city: '',
        district: '',
        website: '',
        business_phone: '',
        is_currently_hiring: 0,
        curriculum: '',
        is_special_needs: '',
        staff_student_ratio: '',
        technology_available: '',
        felds_trips: '',
        is_events: '',
        contact_name: '',
        contact_phone: '',
        is_school: '',
        address: '',
        lat: '',
        lng: '',
        token:localStorage.getItem('token')
      },
      basicRules: {
        business_name: [
          {
            required: true,
            message: 'Please input ',
            trigger: 'blur',
          }
        ],
        business_bio: [
          {
            required: true,
            message: 'Please input ',
            trigger: 'blur',
          },
        ]


      },
      sexOptions: [
        {
          value: 1,
          object_en: 'Male',
          object_cn: '男'
        },
        {
          value: 2,
          object_en: 'Female',
          object_cn: "女"
        },
        {
          value: 3,
          object_en: 'No Gender Requirements',
          object_cn: '无性别要求'
        }
      ],
      nationalityOptions: countriesData,
      provinceOptions: [],
      cityOptions: [],
      districtOptions: [],
      subCateOptions: [],
      selectEducatorTypeList: [],
      businessInfo:{}

    }
  },
  created() {
    this.getBasicInfo()
  },
  mounted() {
    // console.log(countriesData)
    this.getAllAreas(0)

  },
  methods: {
    setPlace(e){
      console.log(e)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          if (this.basicForm.is_currently_hiring) {
            this.basicForm.is_currently_hiring = 1
          } else {
            this.basicForm.is_currently_hiring = 0
          }

          let params = Object.assign({}, this.basicForm);
          ADD_BUSINESS_BASIC(params).then(res => {
            console.log(res)
            if(res.code == 200){
              this.submitEduBusinessCompanyForm()
              this.$router.push('/business/profile')
            }
          }).catch(err=>{
            console.log(err)
            this.$message.error(err.msg)
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
    getBasicInfo() {
      let uid = localStorage.getItem('uid')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        console.log(res)
        if(res.code == 200){
          let businessInfo = res.message.business_info;
          this.businessInfo = res.message.business_info;

          let businessName = businessInfo.business_name;
          let businessBio = businessInfo.business_bio;
          let yearFounded = businessInfo.year_founded;
          let website = businessInfo.website;
          let businessPhone = businessInfo.business_phone;
          let hiringValue = businessInfo.is_currently_hiring;
          let province = businessInfo.province;
          let city = businessInfo.city;
          let district = businessInfo.district;

          if (businessName) {
            this.basicForm.business_name = businessName;
          }
          if (businessBio) {
            this.basicForm.business_bio = businessBio;
          }
          if (yearFounded) {
            this.basicForm.year_founded = yearFounded;
          }
          if (website) {
            this.basicForm.website = website;
          }
          if (businessPhone) {
            this.basicForm.business_phone = businessPhone;
          }
          this.basicForm.is_currently_hiring = hiringValue;

          let provinces = businessInfo.provinces;
          let citys = businessInfo.citys;
          let districts = businessInfo.districts;
          let language = localStorage.getItem('language');

          if(provinces && citys && districts){
            if(language == 'en-US'){
              this.basicForm.location = districts.Pinyin + ', ' + citys.Pinyin + ', ' + provinces.Pinyin;
            }
            if(language == 'zh-CN'){
              this.basicForm.location = districts.ShortName + ', ' + citys.ShortName + ', ' + provinces.ShortName;
            }
          }
          this.basicForm.province = province;
          this.basicForm.city = city;
          this.basicForm.district = district;
          this.basicForm.address = businessInfo.address;
          this.basicForm.lat = businessInfo.lat;
          this.basicForm.lng = businessInfo.lng;
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    async submitEduBusinessCompanyForm(){

      let params = Object.assign({}, this.basicForm)

      let formData = new FormData();
      let userId = localStorage.getItem('uid')

      formData.append('zf_referrer_name','')
      formData.append('zf_redirect_url','')
      formData.append('zc_gad','')

      formData.append('SingleLine',params.business_name) // Education Business Name

      formData.append('Dropdown2',this.businessInfo.business_type_name) //Education Business Category
      formData.append('Dropdown','Education Business') //Company Type
      formData.append('Website',params.website) //Education Business Website
      formData.append('SingleLine1',params.last_name) // Education Business Contact
      formData.append('Number2','') //  Company Number

      formData.append('SingleLine5',userId) //UserID

      formData.append('PhoneNumber_countrycode',params.business_phone) //Education Business Phone
      formData.append('Email','') // Education Business Email
      formData.append('Number','')  //Number of Employees
      formData.append('Number1','')  //Membership Duration
      formData.append('Dropdown1','' ) //Membership Type

      formData.append('Address_AddressLine1','' ) //Street Address
      formData.append('Address_City','' ) //City
      formData.append('Address_Region','' ) //State/Region/Province
      formData.append('Address_Country','' ) //Country

      formData.append('SingleLine4','' ) //   Business Registration No.
      formData.append('MultiLine', '' ) //Company Intro
      formData.append('SingleLine3','' ) //WeChat ID

      formData.append('Number3','') //  Number of Branches
      formData.append('Number4','') //    Number of Students
      formData.append('MultipleChoice','') //    Students Ages
      formData.append('MultiLine1','') //     Curriculum Subjects
      formData.append('MultiLine2','') //     School Facilities

      formData.append('Website1','') // Business License Link
      formData.append('Website2','' ) //Company Logo Link
      formData.append('Website3','' ) //Header Image Link

      await axios.post('/edupassport/form/EduBusinessCompanyForm/formperma/2gsVgXjDNmE5niOKVzRmwT2tlYNWWCTD2kCDHv_CAV8/htmlRecords/submit', formData, {
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
.basic-breadcrumb-container{
  padding: 10px;
}

</style>