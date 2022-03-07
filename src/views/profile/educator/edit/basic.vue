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
              <el-breadcrumb-item :to="{ path: '/educator/profile' }">Profile</el-breadcrumb-item>
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
              <el-form-item label="First Name" prop="first_name">
                <el-input v-model="basicForm.first_name" placeholder="First Name"></el-input>
              </el-form-item>
              <el-form-item label="Last Name" prop="last_name">
                <el-input v-model="basicForm.last_name" placeholder="Last Name"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input v-model="basicForm.email" placeholder="Email"></el-input>
              </el-form-item>
              <el-form-item label="Wechat ID" prop="wx_id">
                <el-input v-model="basicForm.wx_id" placeholder="Wechat ID"></el-input>
              </el-form-item>
              <el-form-item label="Gender">
                <el-select v-model="basicForm.sex" placeholder="Select your gender">
                  <el-option v-for="(item,i) in sexOptions" :key="i" :label="item.object_en"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Nationality">
                <el-select v-model="basicForm.nationality"
                           filterable
                           placeholder="Select your nationality">
                  <el-option v-for="(item,i) in nationalityOptions" :key="i" :label="item.name"
                             :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Birthdate" prop="birthday">
                <el-date-picker
                    v-model="basicForm.birthday"
                    type="date"
                    placeholder="Pick a date"
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
              <el-form-item label="Job Seeking">
                <el-switch v-model="basicForm.is_seeking"></el-switch>
              </el-form-item>
              <el-form-item label="Public Profile">
                <el-switch v-model="basicForm.is_public"></el-switch>
              </el-form-item>
              <el-form-item label="Education Type(Up to 3)">
                <div class="categories-tags" v-for="(item,k) in subCateOptions" :key="k">
                  <div v-if="item['children'].length>0" class="category-parent">
                  </div>
                  <div v-if="item['children'].length===0" class="categories-tags-item"
                       :class="selectEducatorTypeList.findIndex(element=>element.id === item.id) == -1 ? '' : 'tag-active' "
                       @click="selectEducatorType(item)">
                    {{ item.identity_name }}
                  </div>
                  <div class="categories-tags-item" v-for="(child,key) in item['children']" :key="key"
                       :class="selectEducatorTypeList.findIndex(element=>element.id === child.id) == -1 ? '' : 'tag-active' "
                       @click="selectEducatorType(child)">
                    {{ child.identity_name }}
                  </div>
                </div>
              </el-form-item>

            </el-form>

            <div class="submit-xll-container">
              <el-button type="primary" @click="submitForm('basicForm')">
                Submit
              </el-button>
              <el-button @click="resetForm('basicForm')">Reset</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import meSideMenu from "@/components/meSideMenu";
import {ALL_AREAS, SUB_CATE_LIST, ADD_EDU_BASIC, GET_BASIC_INFO, ZOHO_SYNC} from '@/api/api'
import {countriesData} from "@/utils/data";

export default {
  name: "basic",
  components: {
    meSideMenu
  },
  data() {
    return {
      basicForm: {
        first_name: '',
        last_name: '',
        email: '',
        sex: '',
        nationality: '',
        birthday: '',
        location: '',
        country: '',
        province: '',
        city: '',
        district: '',
        address: '',
        is_seeking: 0,
        is_public: 0,
        wx_id: '',
        sub_identity: '',
        token:localStorage.getItem('token')
      },
      basicRules: {
        first_name: [
          {
            required: true,
            message: 'Please input first name',
            trigger: 'blur',
          }
        ],
        last_name: [
          {
            required: true,
            message: 'Please input last name',
            trigger: 'blur',
          },
        ],
        wx_id: [
          {
            required: true,
            message: 'Please input wechat id',
            trigger: 'blur',
          },
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: 'Please input email',
            trigger: 'blur',
          },
        ],
        birthday: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
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
          object_en: 'Undisclosed',
          object_cn: '未公开'
        }
      ],
      nationalityOptions: countriesData,
      provinceOptions: [],
      cityOptions: [],
      districtOptions: [],
      subCateOptions: [],
      selectEducatorTypeList: [],
      educatorInfo:{}

    }
  },
  mounted() {
    // console.log(countriesData)
    this.getAllAreas(0)
    this.getSubCateList()
    this.getBasicInfo()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let selectTypeList = this.selectEducatorTypeList;
          let educatorTypeIdArr = [];
          selectTypeList.forEach(item => {
            educatorTypeIdArr.push(item.id)
          })
          let birthday = this.basicForm.birthday
          let year = birthday.getFullYear()
          let month = birthday.getMonth() + 1
          let day = birthday.getDate()
          this.basicForm.birthday = [year, month, day].join('-')
          this.basicForm.sub_identity = educatorTypeIdArr.join(',')

          if (this.basicForm.is_public) {
            this.basicForm.is_public = 1
          } else {
            this.basicForm.is_public = 0
          }
          if (this.basicForm.is_seeking) {
            this.basicForm.is_seeking = 1
          } else {
            this.basicForm.is_seeking = 0
          }
          let params = Object.assign({}, this.basicForm);
          ADD_EDU_BASIC(params).then(res => {
            console.log(res)
            if(res.code == 200){
              this.submitEducatorContactForm()
              // this.submitCompanyContactForm()
              this.$router.push('/educator/profile')
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
    getSubCateList() {
      let params = {
        pid: 1,
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
    selectEducatorType(item) {
      // console.log(item);
      if (this.selectEducatorTypeList.findIndex(element => element.id === item.id) == -1) {
        if (this.selectEducatorTypeList.length > 2) {
          let len = this.selectEducatorTypeList.length - 1;
          this.selectEducatorTypeList.splice(len, 1);
        }
        this.selectEducatorTypeList.push(item);
      } else {
        // let len = this.selectEducatorTypeList.length - 1;

        this.selectEducatorTypeList.splice(this.selectEducatorTypeList.findIndex(element => element.id === item.id), 1);
      }
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
          let educatorInfo = res.message.educator_info;
          this.educatorInfo = educatorInfo
          // first_name: '',
          //     last_name: '',
          //     email: '',
          //     sex: '',
          //     nationality: '',
          //     birthday: '',
          //     location: '',
          //     country: '',
          //     province: '',
          //     city: '',
          //     district: '',
          //     address: '',
          //     is_seeking: 0,
          //     is_public: 0,
          //     wx_id: '',
          //     sub_identity: '',

          this.basicForm.first_name = educatorInfo.first_name;
          this.basicForm.last_name = educatorInfo.last_name;
          this.basicForm.email = educatorInfo.email ;

          if(res.message.sex){
            this.basicForm.sex = res.message.sex;
          }

          this.basicForm.nationality = educatorInfo.nationality;

          // this.basicForm.birthday = educatorInfo.birthday;
          // this.basicForm.location = educatorInfo.location;
          // this.basicForm.country = educatorInfo.country;
          // this.basicForm.province = educatorInfo.province;
          // this.basicForm.city = educatorInfo.city;
          // this.basicForm.district = educatorInfo.district;
          // this.basicForm.address = educatorInfo.address;

          this.basicForm.is_seeking = educatorInfo.is_seeking;
          this.basicForm.is_public = educatorInfo.is_public;
          this.basicForm.wx_id = educatorInfo.wx_id;
          // this.basicForm.sub_identity = educatorInfo.sub_identity;


        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    async submitEducatorContactForm(){

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let selectTypeList = this.selectEducatorTypeList;
      let educatorTypeIdArr = [];
      selectTypeList.forEach(item => {
        educatorTypeIdArr.push(item.identity_name)
      })

      let sexStr = ''
      if(params.sex == 1){
        sexStr = 'Male'
      }
      if(params.sex == 2){
        sexStr = 'Female'
      }
      if(params.sex == 3){
        sexStr = 'Undisclosed'
      }

      let zohoData = [
        {'zf_referrer_name':''},
        {'zf_redirect_url':''},
        {'zc_gad':''},
        {'SingleLine':userId //UserID
        },
        {'SingleLine1':params.first_name // First Name
        },
        {'SingleLine2':params.last_name //  Last Name
        },
        {'Dropdown':sexStr //  Gender
        },
        {'Date':'' //   Date of Birth dd-MMM-yyyy
        },
        {'SingleLine3':'' //   Title
        },
        {'Email':params.email //   Email
        },
        {'PhoneNumber_countrycode':'' //   Phone
        },
        {'SingleLine4':params.nationality //   Nationality
        },
        {'Dropdown1':'' //   Membership Type
        },
        {'MultiLine':'' //   Languages Spoken
        },
        {'Number':'' //   Membership Duration
        },
        {'SingleLine5':'' //   City
        },
        {'SingleLine6':'' //   Province
        },
        {'SingleLine7':'' //   Country
        },
        {'Dropdown2':educatorTypeIdArr.join(',') //   Educator Type
        },
        {'MultiLine1':'' //   Education
        },
        {'MultiLine2':'' //    Work History
        },
        {'Dropdown3':'' //    Teaching Experience
        },
        {'MultiLine3':'' //   Certifications
        },
        {'MultiLine4':'' //   Educator Intro
        },
        {'Website':this.educatorInfo.profile_photo //   Contact image Link
        },
        {'Website1':'' //   Intro Video Link
        }
      ]

      let zohoParams = {
        zoho_data: zohoData,
        zoho_url: 'https://forms.zohopublic.com/edupassport/form/EducatorContactForm/formperma/G014C7ko-MpOp3A2vp6NZlgxhPbGj2HDtbzlZEI6cks/htmlRecords/submit'
      }

      await ZOHO_SYNC(zohoParams).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })

    },
    async submitCompanyContactForm(){

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name':''},
        {'zf_redirect_url':''},
        {'zc_gad':''},
        {'SingleLine':userId  //UserID
        },
        {'SingleLine1':params.first_name  // First Name
        },
        {'SingleLine2':params.last_name  //  Last Name
        },
        {'Dropdown':params.sex  //  Gender
        },
        {'Date':''  //   Date of Birth dd-MMM-yyyy params.birthday
        },
        {'SingleLine3':''  //   Title
        },
        {'Email':params.email  //   Email
        },
        {'PhoneNumber_countrycode':''  //   Phone
        },
        {'SingleLine4':params.nationality  //   Nationality
        },
        {'Dropdown1':''  //   Membership Type
        },
        {'Number':''  //   Membership Duration
        },
        {'SingleLine5':''  //   City
        },
        {'SingleLine6':''  //   Province
        },
        {'SingleLine7':''  //   Country
        },
        {'Website':this.educatorInfo.profile_photo //   Contact image Link
        }

      ]

      let zohoParams = {
        zoho_data: zohoData,
        zoho_url: 'https://forms.zohopublic.com/edupassport/form/CompanyContactForm/formperma/ZYHWpHeaRP511w85Ljl47AYAS77L3z9qcqUw4Wv48io/htmlRecords/submit'
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
.basic-breadcrumb-container{
  padding: 10px;
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

.submit-xll-container{
  text-align: center;
}


</style>