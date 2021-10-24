<template>
  <div class="bg">
    <div class="basic-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="basic-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
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
                <el-input v-model="basicForm.business_bio" placeholder="Business Introduction"></el-input>
              </el-form-item>
              <el-form-item label="Year Founded" >
                <el-date-picker
                    v-model="basicForm.year_founded"
                    type="date"
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
              <el-form-item label="Add Location Pin" >
                <el-input v-model="basicForm.address" placeholder="Add Location Pin"></el-input>
              </el-form-item>
              <el-form-item label="Website" >
                <el-input v-model="basicForm.wx_id" placeholder="www.eslpassport.com"></el-input>
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
import {ALL_AREAS, ADD_BUSINESS_BASIC} from '@/api/api'
import {countriesData} from "../../../../utils/data";

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
        is_currently_hiring: '',
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
            message: 'Please input first name',
            trigger: 'blur',
          }
        ],
        business_bio: [
          {
            required: true,
            message: 'Please input last name',
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
      selectEducatorTypeList: []

    }
  },
  mounted() {
    // console.log(countriesData)
    this.getAllAreas(0)

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let birthday = this.basicForm.birthday
          let year = birthday.getFullYear()
          let month = birthday.getMonth() + 1
          let day = birthday.getDate()
          this.basicForm.birthday = [year, month, day].join('-')

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
          ADD_BUSINESS_BASIC(params).then(res => {
            console.log(res)
            if(res.code == 200){
              this.$router.push('/educator/profile')
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

</style>