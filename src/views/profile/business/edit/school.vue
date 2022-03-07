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
                <el-input v-model="basicForm.curriculum" type="textarea"
                          placeholder="Oxford Reading Tree, McGraw Hill,etc..."></el-input>
              </el-form-item>
              <el-form-item label="Technology Available" prop="technology_available">
                <el-input v-model="basicForm.technology_available" type="textarea"
                          placeholder="Computers, Smart screens, 3D Printing, etc..."></el-input>
              </el-form-item>
              <el-form-item label="Average class size">
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

              <el-form-item label="Tuition (One Year)">
                <el-input v-model="basicForm.tuition" type="number" placeholder="Tuition/Year"></el-input>
              </el-form-item>

              <el-form-item label="Our Students Age">
                <div class="object-tags-container">
                  <div class="object-tags">
                    <div class="object-tags-item"
                         :class=" selectStudentAgeList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                         v-for="(item,index) in editStudentAgeList" :key="index"
                         @click="selectStudentAge(item,1)">
                      {{ item.object_en }}
                    </div>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="Subjects We Teach">
                <div class="object-tags-container">
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
                         :class=" selectSubjectList.findIndex((element)=>element==item) == -1 ? '' : 'tags-active' "
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
                <div class="object-tags-container">
                  <div class="object-tags">
                    <div class="object-tags-item"
                         :class=" selectSchoolFacilitesList.findIndex((element)=>element.id==item.id) == -1 ? '' : 'tags-active' "
                         v-for="(item,index) in editSchoolFacilitesList" :key="index"
                         @click="selectSchoolFacilites(item,1)">
                      {{ item.object_en }}
                    </div>
                  </div>
                </div>
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
import {USER_OBJECT_LIST, ADD_BUSINESS_BASIC, ADD_PROFILE, GET_BASIC_INFO, ZOHO_SYNC} from '@/api/api'


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
        is_school: 1,
        tuition: '',
        token: localStorage.getItem('token')
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
      businessInfo: {}

    }
  },
  created() {
    this.getBasicInfo()
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

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
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
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
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
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
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

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
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

              if (this.selectStudentAgeList.length > 0) {
                this.studentAgeConfirm();
              }
              if (this.selectSubjectList.length > 0) {
                this.subjectConfirm();
              }
              if (this.selectSchoolFacilitesList.length > 0) {
                this.schoolFacilitesConfirm();
              }
              // this.submitEduBusinessCompanyForm()
              setTimeout(function () {
                self.$router.push('/business/profile')
              }, 1200)

            }
          }).catch(err => {
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
        if (res.code == 200) {
          let businessInfo = res.message.business_info;
          this.businessInfo = res.message.business_info;

          this.basicForm.curriculum = businessInfo.curriculum;
          this.basicForm.technology_available = businessInfo.technology_available;
          this.basicForm.staff_student_ratio = businessInfo.staff_student_ratio;
          this.basicForm.felds_trips = businessInfo.felds_trips;
          this.basicForm.is_events = businessInfo.is_events;
          this.basicForm.is_special_needs = businessInfo.is_special_needs;
          this.basicForm.tuition = businessInfo.tuition;
          // that.form.is_school = businessInfo.is_school;

          if (businessInfo.subject) {
            let subjectList = businessInfo.subject;
            let len = subjectList.length;

            for (let i = 0; i < len; i++) {

              if (subjectList[i].object_id == 0) {
                let obj = {
                  id: subjectList[i].object_id,
                  object_pid: subjectList[i].object_pid,
                  object_name: subjectList[i].object_en
                }
                this.ownSubjectList.push(obj);
                this.selectSubjectList.push(obj)
              } else {
                let obj = {
                  id: subjectList[i].object_id,
                  pid: subjectList[i].object_pid,
                  object_en: subjectList[i].object_en,
                  object_cn: subjectList[i].object_cn
                }
                this.selectSubjectList.push(obj)
              }
            }
          }
          if (businessInfo.Student_Age) {
            let studentAgeList = businessInfo.Student_Age;
            let len = studentAgeList.length;

            for (let i = 0; i < len; i++) {
              if (studentAgeList[i].object_id == 0) {
                let obj = {
                  id: studentAgeList[i].object_id,
                  object_pid: studentAgeList[i].object_pid,
                  object_name: studentAgeList[i].object_en
                }
                this.ownStudentAgeList.push(obj);
                this.selectStudentAgeList.push(obj)
              } else {
                let obj = {
                  id: studentAgeList[i].object_id,
                  pid: studentAgeList[i].object_pid,
                  object_en: studentAgeList[i].object_en,
                  object_cn: studentAgeList[i].object_cn
                }
                this.selectStudentAgeList.push(obj)
              }
            }
          }
          console.log(this.selectStudentAgeList)
          if (businessInfo.facilities) {
            let facilitiesList = businessInfo.facilities;
            let len = facilitiesList.length;

            for (let i = 0; i < len; i++) {

              if (facilitiesList[i].object_id == 0) {
                let obj = {
                  id: facilitiesList[i].object_id,
                  object_pid: facilitiesList[i].object_pid,
                  object_name: facilitiesList[i].object_en
                }
                this.selectSchoolFacilitesList.push(obj)
              } else {
                let obj = {
                  id: facilitiesList[i].object_id,
                  pid: facilitiesList[i].object_pid,
                  object_en: facilitiesList[i].object_en,
                  object_cn: facilitiesList[i].object_cn
                }
                this.selectSchoolFacilitesList.push(obj)
              }
            }
          }

        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    async submitEduBusinessCompanyForm() {

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'z_gad': ''},
        {'SingleLine': this.businessInfo.business_name  // Education Business Name
        },
        {'Dropdown2': this.businessInfo.business_type_name  //Education Business Category
        },
        {'Dropdown': 'Education Business'  //Company Type
        },
        {'Website': ''  //Education Business Website
        },
        {'SingleLine1': ''  // Education Business Contact
        },
        {'Number2': ''  //  Company Number
        },
        {'SingleLine5': userId  //UserID
        },
        {'PhoneNumber_countrycode': ''  //Education Business Phone
        },
        {'Email': ''  // Education Business Email
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
        {'SingleLine4': ''   //   Business Registration No.
        },
        {'MultiLine': ''   //Company Intro
        },
        {'SingleLine3': ''   //WeChat ID
        },
        {'Number3': ''  //  Number of Branches
        },
        {'Number4': params.staff_student_ratio  //    Number of Students
        },
        {'MultipleChoice': this.selectStudentAgeList  //    Students Ages
        },
        {'MultiLine1': this.selectSubjectList  //     Curriculum Subjects
        },
        {'MultiLine2': this.selectSchoolFacilitesList  //     School Facilities
        },
        {'Website1': ''  // Business License Link
        },
        {'Website2': ''   //Company Logo Link
        },
        {'Website3': ''   //Header Image Link
        }
      ]

      let zohoParams = {
        zoho_data: zohoData,
        zoho_url: 'https://forms.zohopublic.com/edupassport/form/EduBusinessCompanyForm/formperma/2gsVgXjDNmE5niOKVzRmwT2tlYNWWCTD2kCDHv_CAV8/htmlRecords/submit'
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


.basic-breadcrumb-container {
  padding: 10px;
}

</style>