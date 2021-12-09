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
              <el-breadcrumb-item>Education</el-breadcrumb-item>
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
              <el-form-item label="School" prop="school_name">
                <el-input v-model="basicForm.school_name" placeholder="University"></el-input>
              </el-form-item>
              <el-form-item label="Degree" prop="degree">
                <el-input v-model="basicForm.degree" placeholder="Doctorate, Master's, Bachelor's, etc..."></el-input>
              </el-form-item>
              <el-form-item label="Field of Study" >
                <el-input v-model="basicForm.field_of_study" type="textarea"
                          placeholder="Chemistry, International Business, Dance, etc..."></el-input>
              </el-form-item>
              <el-form-item label="Duration of Study" prop="date">
                <el-date-picker
                    v-model="basicForm.date"
                    type="monthrange"
                    format="MM/YYYY"
                    value-format="x"
                    range-separator="To"
                    start-placeholder="Start month"
                    end-placeholder="End month"
                >
                </el-date-picker>
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
import { ADD_USER_EDUCATION,GET_BASIC_INFO} from '@/api/api'

export default {
  name: "education",
  components: {
    meSideMenu
  },
  data() {
    return {
      basicForm: {
        school_name: '',
        degree: '',
        field_of_study: '',
        start_time: '',
        end_time: '',
        grade: '',
        token:localStorage.getItem('token')
      },
      basicRules: {
        school_name: [
          {
            required: true,
            message: 'University',
            trigger: 'blur',
          }
        ],
        degree: [
          {
            required: true,
            message: "Doctorate, Master's, Bachelor's, etc...",
            trigger: 'blur',
          },
        ],
        date: [
          {
            required: true,
            message: "Please select",
            trigger: 'change',
          },
        ]


      },

    }
  },
  mounted() {
    let type = this.$route.query.type
    if(type == 2){
      this.getBasicInfo()
    }

  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let dateArr = this.basicForm.date
          this.basicForm.start_time = Math.floor(dateArr[0] / 1000)
          this.basicForm.end_time = Math.floor(dateArr[1] / 1000)
          console.log(this.basicForm)
          let params = Object.assign({},this.basicForm)
          ADD_USER_EDUCATION(params).then(res=>{
            console.log(res)
            if(res.code == 200){
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
    getBasicInfo() {
      let uid = localStorage.getItem('uid')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        // console.log(res)
        if(res.code == 200){
          let result = res.message.educator_info.education_info;
          let educationId = this.$route.query.educationId
          let education = result.filter(item => item.id == educationId);
          let educationInfo = education[0];

          this.basicForm = Object.assign({},educationInfo)
          let startTime = educationInfo.start_time
          let endTime = educationInfo.end_time
          this.basicForm.date = [startTime*1000,endTime*1000]
          this.basicForm.token = localStorage.getItem('token')
          this.basicForm.education_id = educationId
          // console.log(this.basicForm)

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
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
.basic-breadcrumb-container{
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

</style>