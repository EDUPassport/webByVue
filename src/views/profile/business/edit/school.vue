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
              <el-breadcrumb-item>School</el-breadcrumb-item>
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
              <el-form-item label="Curriculum" prop="curriculum">
                <el-input v-model="basicForm.curriculum" type="textarea" placeholder="Oxford Reading Tree, McGraw Hill,etc..."></el-input>
              </el-form-item>
              <el-form-item label="Technology Available" prop="technology_available">
                <el-input v-model="basicForm.technology_available" type="textarea" placeholder="Computers, Smart screens, 3D Printing, etc..."></el-input>
              </el-form-item>
              <el-form-item label="Average class size" >
                <el-input v-model="basicForm.staff_student_ratio" type="number" placeholder="25 Students"></el-input>
              </el-form-item>

              <el-form-item label="Field Trips">
                <el-switch v-model="basicForm.felds_trips"></el-switch>
              </el-form-item>
              <el-form-item label="Events">
                <el-switch v-model="basicForm.is_events"></el-switch>
              </el-form-item>
              <el-form-item label="Special Needs">
                <el-switch v-model="basicForm.is_special_needs"></el-switch>
              </el-form-item>

              <el-form-item label="Tuition (One Year)" >
                <el-input v-model="basicForm.tuition" type="number" placeholder="Tuition/Year"></el-input>
              </el-form-item>

              <el-form-item label="Our Students Age">
                <div class="object-tags-container" >
                  <div class="object-tags">
                    <div class="object-tags-item"
                         :class=" selectStudentAgeList.indexOf(item) == -1 ? '' : 'tags-active' "
                         v-for="(item,index) in editStudentAgeList" :key="index"
                         @click="selectStudentAge(item,1)">
                      {{ item.object_en}}
                    </div>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="Subjects We Teach">
                <div class="object-tags-container" >
                  <div class="object-tags">
                    <div class="object-tags-item"
                         :class=" selectSubjectList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                         v-for="(item,index) in editSubjectList" :key="index"
                         @click="selectSubject(item,1)">
                      {{ item.object_en }}
                    </div>
                  </div>
                  <div class="object-tags">
                    <div class="object-tags-item"
                         :class=" selectSubjectList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                         v-for="(item,index) in ownSubjectList" :key="index"
                         @click="selectSubject(item,2)">
                      {{ item.object_name }}
                    </div>
                  </div>
                  <div class="object-tags">
                    <div class="object-tags-item" v-if="addSubjectStatus==false"
                         @click="addSubjectStatus=true">Add+
                    </div>
                  </div>

                  <div class="object-tags-add">
                    <div class="object-tags-item-add" v-if="addSubjectStatus">
                      <el-input type="text" v-model="ownSubjectValue"
                                placeholder="Add subject"></el-input>
                      <div class="object-tags-item-btn-container">
                        <el-button class="object-tags-item-btn" type="primary"
                                   v-if="ownSubjectValue.length>0"
                                   @click="addOwnSubject">Confirm
                        </el-button>
                        <el-button class="object-tags-item-btn" type="primary"
                                   v-if="ownSubjectValue.length==0"
                                   @click="addSubjectStatus=false">Cancel
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>

              </el-form-item>

              <el-form-item label="School Facilities">
                <div class="object-tags-container" >
                  <div class="object-tags">
                    <div class="object-tags-item"
                         :class=" selectSchoolFacilitesList.indexOf(item) == -1 ? '' : 'tags-active' "
                         v-for="(item,index) in editSchoolFacilitesList" :key="index"
                         @click="selectSchoolFacilites(item,1)">
                      {{ item.object_en}}
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
import {USER_OBJECT_LIST, ADD_BUSINESS_BASIC,ADD_PROFILE} from '@/api/api'

export default {
  name: "school",
  components: {
    meSideMenu
  },
  data() {
    return {
      basicForm: {
        is_currently_hiring: '',
        curriculum: '',
        is_special_needs: 0,
        staff_student_ratio: '',
        technology_available: '',
        felds_trips: 0,
        is_events: 0,
        is_school:1,
        tuition:'',
        token:localStorage.getItem('token')
      },
      basicRules: {
        curriculum: [
          {
            required: true,
            message: 'Please input ',
            trigger: 'blur',
          }
        ],
        technology_available: [
          {
            required: true,
            message: 'Please input ',
            trigger: 'blur',
          },
        ]


      },
      subjectList: [],
      studentAgeList: [],

      editStudentAgeList: [],
      addStudentAgeStatus: false,
      ownStudentAgeValue: '',
      ownStudentAgeList: [],
      selectStudentAgeList: [],
      selectStudentAgeArr: [],

      editSubjectList: [],
      addSubjectStatus: false,
      ownSubjectValue: '',
      ownSubjectList: [],
      selectSubjectList: [],
      selectSubjectArr: [],

      editSchoolFacilitesList: [],
      addSchoolFacilitesStatus: false,
      ownSchoolFacilitesValue: '',
      ownSchoolFacilitesList: [],
      selectSchoolFacilitesList: [],
      selectSchoolFacilitesArr: [],

    }
  },
  mounted() {
    // console.log(countriesData)
    this.turnSearchTags(73);
    this.turnSearchTags(1);
    this.turnSearchTags(147);
    // this.getBasicInfo();
  },
  methods: {
    turnSearchTags(type) {
      // student age
      let data = {
        token: localStorage.getItem('token'),
        pid: type
      }
      this.selectStudentAgeList = [];
      this.ownStudentAgeList = [];

      USER_OBJECT_LIST(data).then(res => {
        if (type == 73) {
          this.editStudentAgeList = res.message;
        }

        if (type == 1) {
          this.editSubjectList = res.message;
        }

        if (type == 147) {
          this.editSchoolFacilitesList = res.message;
        }

      }).catch(error => {
        console.log(error)
      })
    },
    selectStudentAge(value, type) {
      let index;
      if (type == 1) {
        index = this.selectStudentAgeList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectStudentAgeList.findIndex((element) => element === value);
      }

      if (index == -1) {
        // if (this.selectStudentAgeList.length > 4) {
        // 	return false;
        // }
        this.selectStudentAgeList.push(value);

      } else {
        this.selectStudentAgeList.splice(index, 1);
      }
      console.log(this.selectStudentAgeList)
    },
    studentAgeConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectStudentAgeList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 73,
        object_id: objectArr,
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('StudentAge--submit--' + res.data);
          this.canEditStudentAge = false;
          // this.getBasicInfo();
        }
      })

    },
    addOwnSubject() {
      this.addSubjectStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownSubjectValue,
        object_pid: 1
      }
      let index = this.selectSubjectList.findIndex((element) => element === obj);
      if (index == -1) {
        // if (this.selectSubjectList.length > 4) {
        // 	return false;
        // }
        this.selectSubjectList.push(obj);
        this.ownSubjectList.push(obj);
        this.ownSubjectValue = '';

      } else {
        this.selectSubjectList.splice(index, 1);
      }

    },
    selectSubject(value, type) {
      let index;
      if (type == 1) {
        index = this.selectSubjectList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectSubjectList.findIndex((element) => element === value);
      }

      if (index == -1) {
        // if (this.selectSubjectList.length > 4) {
        // 	return false;
        // }
        this.selectSubjectList.push(value);

      } else {
        this.selectSubjectList.splice(index, 1);
      }
      console.log(this.selectSubjectList)
    },
    subjectConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectSubjectList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 1,
        object_id: objectArr,
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('subject--submit--' + res.data);
          this.canEditSubject = false;
          // this.getBasicInfo();
        }
      })
    },
    selectSchoolFacilites(value, type) {
      let index;
      if (type == 1) {
        index = this.selectSchoolFacilitesList.findIndex((element) => element.id === value.id);
      }

      if (index == -1) {
        this.selectSchoolFacilitesList.push(value);

      } else {
        this.selectSchoolFacilitesList.splice(index, 1);
      }

    },
    schoolFacilitesConfirm() {
      let expand = [];
      let objectArr = [];
      this.selectSchoolFacilitesList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 147,
        object_id: objectArr,
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('SchoolFacilites--submit--' + res.data);
          // this.getBasicInfo();
        }

      })
    },
    submitForm(formName) {
      let self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.basicForm)
          ADD_BUSINESS_BASIC(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              if(this.selectStudentAgeList.length>0){
                this.studentAgeConfirm();
              }
              if(this.selectSubjectList.length>0){
                this.subjectConfirm();
              }
             if(this.selectSchoolFacilitesList.length>0){
               this.schoolFacilitesConfirm();
             }
              setTimeout(function (){
                self.$router.push('/business/profile')
              },1200)

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