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
              <el-breadcrumb-item>Work Experience</el-breadcrumb-item>
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
              <el-form-item label="Job Title" prop="title">
                <el-input v-model="basicForm.title" placeholder="Please enter your job title"></el-input>
              </el-form-item>
              <el-form-item label="Company" prop="company_name">
                <el-input v-model="basicForm.company_name" placeholder="ABC Academy"></el-input>
              </el-form-item>
              <el-form-item label="Work Location" >
                <el-input v-model="basicForm.location" placeholder="Please enter your work location"></el-input>
              </el-form-item>

              <el-form-item label="Work Duration" prop="date">
                <el-date-picker
                    v-model="basicForm.date"
                    type="monthrange"
                    format="MM/YYYY"
                    value-format="x"
                    range-separator="To"
                    start-placeholder="Start Date"
                    end-placeholder="End Date"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="Responsibilities" >
                <el-input v-model="basicForm.teaching_experience" type="textarea"
                          placeholder="Your responsibilities"></el-input>
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
import { ADD_USER_WORK,GET_BASIC_INFO} from '@/api/api'

export default {
  name: "work",
  components: {
    meSideMenu
  },
  data() {
    return {
      basicForm: {
        company_name: '',
        title: '',
        location: '',
        teaching_times: '',
        teaching_experience: '',
        work_time_from: '',
        work_time_to: '',
        date:'',
        token:localStorage.getItem('token')
      },
      basicRules: {
        title: [
          {
            required: true,
            message: 'Please enter your job title',
            trigger: 'blur',
          }
        ],
        company_name: [
          {
            required: true,
            message: "ABC Academy",
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
          this.basicForm.work_time_from = Math.floor(dateArr[0] / 1000)
          this.basicForm.work_time_to = Math.floor(dateArr[1] / 1000)
          console.log(this.basicForm)
          let params = Object.assign({},this.basicForm)
          ADD_USER_WORK(params).then(res=>{
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
    getBasicInfo() {
      let uid = localStorage.getItem('uid')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        // console.log(res)
        if(res.code == 200){
          let result = res.message.educator_info.work_info;
          let workId = this.$route.query.workId
          let work = result.filter(item => item.id == workId);
          let workInfo = work[0];

          this.basicForm = Object.assign({},workInfo)
          let workTimeFrom = workInfo.work_time_from
          let workTimeTo = workInfo.work_time_to
          this.basicForm.date = [workTimeFrom*1000,workTimeTo*1000]
          this.basicForm.token = localStorage.getItem('token')
          this.basicForm.work_id = workId
          // console.log(this.basicForm)

        }
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