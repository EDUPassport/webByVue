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
import {ALL_AREAS, ADD_VENDOR_BASIC, GET_BASIC_INFO, ZOHO_SYNC} from '@/api/api'

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

      let zohoData = [];
      let userId = localStorage.getItem('uid')
      let vendorInfo = this.vendorInfo

      zohoData['zf_referrer_name'] = ''
      zohoData['zf_redirect_url'] = ''
      zohoData['zc_gad'] = ''

      zohoData['SingleLine'] = vendorInfo.vendor_name_en  //vendor company name

      zohoData['Dropdown2'] = vendorInfo.vendor_type_name  //Vendor Category
      zohoData['SingleLine5'] = userId  //UserID

      zohoData['Number2'] = ''   //Company Number
      zohoData['SingleLine1'] =  ''   //Vendor Company Contact

      zohoData['PhoneNumber_countrycode'] = ''  //Vendor Company Phone
      zohoData['Email'] = ''  // vendor company  email

      zohoData['Dropdown'] = 'Vendor'  // company type
      zohoData['Number'] = ''   //Number of Employees
      zohoData['Number1'] = ''   //Membership Duration
      zohoData['Dropdown1'] = ''   //Membership Type

      zohoData['Address_AddressLine1'] = ''   //Street Address
      zohoData['Address_City'] = ''   //City
      zohoData['Address_Region'] = ''   //State/Region/Province
      zohoData['Address_Country'] = ''   //Country

      zohoData['SingleLine4'] = ''   //Business Registration No.
      zohoData['MultiLine'] = params.vendor_bio   //Company Intro
      zohoData['SingleLine3'] = ''   //WeChat ID

      zohoData['Website1'] = ''  // Business License Link
      zohoData['Website2'] = ''   //Company Logo Link
      zohoData['Website3'] = ''   //Header Image Link

      let zohoParams = {
        zoho_data: zohoData,
        zoho_url: 'https://forms.zohopublic.com/edupassport/form/VendorCompanyForm/formperma/otYlWrLwckw-vUm696qIUsMkRlofpZHCqZgodVcl6_c/htmlRecords/submit'
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