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
              <el-breadcrumb-item>Company Information</el-breadcrumb-item>
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

              <el-form-item label="Company Name" prop="vendor_name_en">
                <el-input v-model="basicForm.vendor_name_en" placeholder="Company Name"></el-input>
              </el-form-item>
              <el-form-item label="Legal Company Name">
                <el-input v-model="basicForm.legal_company_name" placeholder="Legal Company Name"></el-input>
              </el-form-item>
              <el-form-item label="Business Registration ID">
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
                  <el-image v-if="businessRegImgUrl" :src="businessRegImgUrl" class="profile-avatar"></el-image>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

              </el-form-item>
              <el-form-item label="Vendor Introduction" >
                <el-input v-model="basicForm.vendor_bio" type="textarea" placeholder="Vendor Introduction"></el-input>
              </el-form-item>
              <el-form-item label="WeChat Official Account ID" >
                <el-input v-model="basicForm.wechat_public_name" placeholder="WeChat Official Account ID"></el-input>
              </el-form-item>
              <el-form-item label="Website" >
                <el-input v-model="basicForm.website" placeholder="Website"></el-input>
              </el-form-item>
              <el-form-item label="Phone #" prop="phone">

                <div class="contact-phone-container">
                  <div class="contact-phone-l">
                    <Vue3CountryIntl
                        schema="input"
                        type="phone"
                        placeholder="select phone area code "
                        v-model="basicForm.area_code"
                    >
                    </Vue3CountryIntl>
                  </div>
                  <div class="contact-phone-r">
                    <el-input v-model="basicForm.phone" placeholder="Phone #"></el-input>
                  </div>
                </div>


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

              <el-form-item style="text-align: center;">
                <el-button type="primary" @click="submitForm('basicForms')">
                  Submit
                </el-button>
                <el-button @click="resetForm('basicForms')">Reset</el-button>
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
import {ALL_AREAS, ADD_VENDOR_BASIC, GET_BASIC_INFO, ZOHO_SYNC, SUB_CATE_LIST} from '@/api/api'
import {reactive, ref} from "vue";

export default {
  name: "vendorInfo",
  components: {
    meSideMenu
  },
  setup(){
    let basicForms = ref(null)

    const basicForm = reactive({
      vendor_name_en: '',
      legal_company_name: '',
      busin_reg_num: '',
      busin_reg_img: '',
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
      area_code:"86",
      is_events: 0,
      is_dog_friendly: 0,
      lat:'',
      lng:'',
      vendor_type_id:'',
      vendor_type_name: '',
      vendor_type_name_cn: '',
      token:localStorage.getItem('token')
    })

    const checkContactPhone=(rule,value,callback)=>{
      if(!value){
        return callback(new Error('Please input contact phone'))
      }
      if(!basicForm.area_code){
        return callback(new Error('Please input area code'))
      }
      callback()
    }

    const basicRules = reactive({
      vendor_name_en: [
        {
          required: true,
          message: 'Please input',
          trigger: 'blur',
        }
      ],
      vendor_bio: [
        {
          required: true,
          message: 'Please input',
          trigger: 'blur',
        }
      ],
      vendor_type_id: [
        {
          required: true,
          message: "Business Category (Choose 1) ",
          trigger: 'change',
        },
      ],
      phone: [
        {
          required: true,
          validator:checkContactPhone,
          trigger: 'blur',
        },
      ]


    })

    return {
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
      businessRegImgUrl: '',

      provinceOptions: [],
      cityOptions: [],
      districtOptions: [],
      vendorInfo:{},
      subCateOptions: [],
      selectVendorTypeList: []

    }
  },
  mounted() {
    // console.log(countriesData)
    this.getAllAreas(0)
    this.getBasicInfo()
    this.getSubCateList()
  },
  methods: {
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
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
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

      this.selectVendorTypeList.forEach(item => {
        this.basicForm.vendor_type_id = item.id;
        this.basicForm.vendor_type_name = item.identity_name;
        this.basicForm.vendor_type_name_cn = item.identity_name_cn;
      })

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

          this.basicForm.vendor_name_en = vendorInfo.vendor_name_en;
          this.basicForm.legal_company_name = vendorInfo.legal_company_name;
          this.basicForm.busin_reg_num = vendorInfo.busin_reg_num;
          this.basicForm.busin_reg_img = vendorInfo.busin_reg_img;
          this.basicForm.area_code = vendorInfo.area_code;
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
      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {'SingleLine': params.vendor_name_en  //vendor company name
        },
        {'Dropdown2': params.vendor_type_name  //Vendor Category
        },
        {'SingleLine5': userId  //UserID
        },
        {'Number2': ''   //Company Number
        },
        {'SingleLine1':  ''   //Vendor Company Contact
        },
        {'PhoneNumber_countrycode': ''  //Vendor Company Phone
        },
        {'Email': ''  // vendor company  email
        },
        {'Dropdown': 'Vendor'  // company type
        },
        {'Number': ''   //Number of Employees
        },
        {'Number1': ''   //Membership Duration
        },
        {'Dropdown1': ''   //Membership Type
        },
        {'Address_AddressLine1': ''   //Street Address
        },
        {'Address_City': ''   //City
        },
        {'Address_Region': ''   //State/Region/Province
        },
        {'Address_Country': ''   //Country
        },
        {'SingleLine4': params.busin_reg_num   //Business Registration No.
        },
        {'MultiLine': params.vendor_bio   //Company Intro
        },
        {'SingleLine3': params.wechat_public_name   //WeChat ID
        },
        {'Website1': params.busin_reg_img  // Business License Link
        },
        {'Website2': ''   //Company Logo Link
        },
        {'Website3': ''   //Header Image Link
        }
      ]

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



.contact-phone-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.contact-phone-l{
  width:28%;
}

.contact-phone-r{
  width:70%;
}

/deep/ .vue-country-intl-input .country-intl-input{
  height: 32px;
}

/deep/ .vue-country-intl-input .country-intl-label{
  padding: 0 15px;
}

</style>