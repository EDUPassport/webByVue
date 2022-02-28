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
              <el-breadcrumb-item>Company General Info</el-breadcrumb-item>
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
              <el-form-item label="Vendor Introduction" >
                <el-input v-model="basicForm.vendor_bio" placeholder="Vendor Introduction"></el-input>
              </el-form-item>
              <el-form-item label="WeChat Official Account ID" >
                <el-input v-model="basicForm.wechat_public_name" placeholder="WeChat Official Account ID"></el-input>
              </el-form-item>
              <el-form-item label="Website" >
                <el-input v-model="basicForm.website" placeholder="Website"></el-input>
              </el-form-item>
              <el-form-item label="Phone #" >
                <el-input v-model="basicForm.phone" placeholder="Phone #"></el-input>
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
              <el-form-item label="Dog Friendly">
                <el-switch v-model="basicForm.is_dog_friendly"></el-switch>
              </el-form-item>
              <el-form-item label="Do you have events?">
                <el-switch v-model="basicForm.is_events"></el-switch>
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
import {ALL_AREAS, ADD_VENDOR_BASIC, GET_BASIC_INFO} from '@/api/api'
import axios from "axios";

export default {
  name: "vendorInfo",
  components: {
    meSideMenu
  },
  data() {
    return {

      basicForm: {
        vendor_bio: '',
        country: '',
        location:'',
        province: '',
        city: '',
        district: '',
        address: '',
        website: '',
        wechat_public_name: '',
        phone: '',
        is_events: 0,
        is_dog_friendly: 0,
        lat:'',
        lng:'',
        token:localStorage.getItem('token')
      },
      basicRules: {
        vendor_bio: [
          {
            required: true,
            message: 'Please input',
            trigger: 'blur',
          }
        ],

      },
      provinceOptions: [],
      cityOptions: [],
      districtOptions: [],
      vendorInfo:{}

    }
  },
  mounted() {
    // console.log(countriesData)
    this.getAllAreas(0)
    this.getBasicInfo()
  },
  methods: {
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.basicForm.is_dog_friendly) {
            this.basicForm.is_dog_friendly = 1
          } else {
            this.basicForm.is_dog_friendly = 0
          }
          if (this.basicForm.is_events) {
            this.basicForm.is_events = 1
          } else {
            this.basicForm.is_events = 0
          }
          let params = Object.assign({}, this.basicForm)
          ADD_VENDOR_BASIC(params).then(res => {
            console.log(res)
            if(res.code == 200){
              this.submitVendorCompanyForm()
              this.$router.push('/vendor/profile')
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
    getBasicInfo() {
      let uid = localStorage.getItem('uid')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        console.log(res)
        if(res.code == 200){
          let vendorInfo = res.message.vendor_info;
          this.vendorInfo = vendorInfo

          this.basicForm.vendor_bio = vendorInfo.vendor_bio;
          // this.basicForm.country = vendorInfo.country;
          // this.basicForm.location = vendorInfo.location ;
          // this.basicForm.province = vendorInfo.province;
          this.basicForm.phone = vendorInfo.phone;
          // this.basicForm.city = vendorInfo.city;
          // this.basicForm.district = vendorInfo.district;
          // this.basicForm.address = vendorInfo.address;
          this.basicForm.website = vendorInfo.website;
          this.basicForm.wechat_public_name = vendorInfo.wechat_public_name;
          this.basicForm.is_events = vendorInfo.is_events;
          this.basicForm.is_dog_friendly = vendorInfo.is_dog_friendly;
          this.basicForm.lat = vendorInfo.lat;
          this.basicForm.lng = vendorInfo.lng;

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    async submitVendorCompanyForm(){

      let params = Object.assign({}, this.basicForm)

      let formData = new FormData();
      let userId = localStorage.getItem('uid')
      let vendorInfo = this.vendorInfo

      formData.append('zf_referrer_name','')
      formData.append('zf_redirect_url','')
      formData.append('zc_gad','')

      formData.append('SingleLine',vendorInfo.vendor_name_en) //vendor company name

      formData.append('Dropdown2',vendorInfo.vendor_type_name) //Vendor Category
      formData.append('SingleLine5',userId) //UserID

      formData.append('Number2','' ) //Company Number
      formData.append('SingleLine1', '' ) //Vendor Company Contact

      formData.append('PhoneNumber_countrycode','') //Vendor Company Phone
      formData.append('Email','') // vendor company  email

      formData.append('Dropdown','Vendor') // company type
      formData.append('Number','')  //Number of Employees
      formData.append('Number1','')  //Membership Duration
      formData.append('Dropdown1','' ) //Membership Type

      formData.append('Address_AddressLine1','' ) //Street Address
      formData.append('Address_City','' ) //City
      formData.append('Address_Region','' ) //State/Region/Province
      formData.append('Address_Country','' ) //Country

      formData.append('SingleLine4','' ) //Business Registration No.
      formData.append('MultiLine',params.vendor_bio ) //Company Intro
      formData.append('SingleLine3','' ) //WeChat ID

      formData.append('Website1','') // Business License Link
      formData.append('Website2','' ) //Company Logo Link
      formData.append('Website3','' ) //Header Image Link

      await axios.post('/edupassport/form/VendorCompanyForm/formperma/otYlWrLwckw-vUm696qIUsMkRlofpZHCqZgodVcl6_c/htmlRecords/submit', formData, {
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