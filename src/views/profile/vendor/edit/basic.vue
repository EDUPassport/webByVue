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
              <el-form-item label="First Name" prop="first_name">
                <el-input v-model="basicForm.first_name" placeholder="First Name"></el-input>
              </el-form-item>
              <el-form-item label="Last Name" prop="last_name">
                <el-input v-model="basicForm.last_name" placeholder="Last Name"></el-input>
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
              <el-form-item label="Job Title" >
                <el-input v-model="basicForm.job_title" placeholder="Job Title"></el-input>
              </el-form-item>

              <el-form-item label="Preferred Language">
                <div class="object-tags-container" >
                  <div class="object-tags">
                    <div class="object-tags-item"
                         :class=" selectFirstLanguageList.indexOf(item) == -1 ? '' : 'tags-active' "
                         v-for="(item,index) in firstLanguageList" :key="index"
                         @click="selectFirstLanguage(item)">
                      {{ item }}
                    </div>
                  </div>
                </div>
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
import {countriesData} from "../../../../utils/data";

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
        sex: '',
        nationality: '',
        job_title: '',
        first_contact: '',
        first_language: '',
        wx_id: '',
        proposed_deal: '',
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
      firstLanguageList: ['中文/Chinese', '英语/English'],
      selectFirstLanguageList: [],
      selectFirstLanguageListIndex: [],

    }
  },
  mounted() {
    // console.log(countriesData)

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.basicForm.first_language = this.selectFirstLanguageList.join(',')
          let params = Object.assign({}, this.basicForm)
          ADD_VENDOR_BASIC(params).then(res => {
            console.log(res)
            if(res.code == 200){
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
    selectFirstLanguage(item) {
      if (this.selectFirstLanguageList.indexOf(item) == -1) {
        this.selectFirstLanguageList.splice(0, 1, item);
      }
      // console.log(this.selectFirstLanguageList)
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

</style>