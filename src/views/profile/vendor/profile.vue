<template>
  <div class="bg">
    <div class="educator-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

          <accountInfo :info="userContact" :phone="userContact.phone" :email="userContact.email"
                       :level="companyInfo.vip_level" :vip-due-time="companyInfo.vip_due_time"
                       :category-str="companyInfo.category_name_en  "
                       :percentage-status="true" :profile-percentage="userContact.is_vendor"
          ></accountInfo>

          <div class="educator-r-container">
            <div class="basic-info-container">
              <div class="basic-info-t">
                <div class="basic-info-label">
                  <h4>Your Basic Info</h4>
                  <div class="profile-underline-1"></div>
                </div>
                <div class="basic-info-edit" @click="editBasicInfo()">
                  <el-icon :size="18">
                    <edit/>
                  </el-icon>
                </div>
              </div>

              <div class="basic-info-content">

                <div class="basic-info-item">
                  <div class="basic-info-item-l">First & Last Name:</div>
                  <div class="basic-info-item-r">{{ userContact.first_name }} {{ userContact.last_name }}</div>
                </div>

                <div class="basic-info-item" v-if="userContact.sex">
                  <div class="basic-info-item-l">Gender:</div>
                  <div class="basic-info-item-r">
                    <template v-if="userContact.sex == 1">Male</template>
                    <template v-if="userContact.sex == 2">Female</template>
                    <template v-if="userContact.sex == 3">Undisclosed</template>
                  </div>
                </div>
                <div class="basic-info-item" v-if="userContact.phone">
                  <div class="basic-info-item-l">Phone #:</div>
                  <div class="basic-info-item-r">{{ userContact.phone }}</div>
                </div>

                <div class="basic-info-item" v-if="userContact.email">
                  <div class="basic-info-item-l">Email: </div>
                  <div class="basic-info-item-r">{{ userContact.email }}</div>
                </div>

                <div class="basic-info-item" v-if="userContact.birthday">
                  <div class="basic-info-item-l">Birthdate:</div>
                  <div class="basic-info-item-r">{{ userContact.birthday }}</div>
                </div>

              </div>
            </div>

            <div class="basic-info-container basic-info-margin">
              <div class="basic-info-t">
                <div class="basic-info-label">
                  <h4>Company Contact Info</h4>
                  <div class="profile-underline-1"></div>
                </div>
                <div class="basic-info-edit" @click="editCompanyContactInfo()">
                  <el-icon :size="18">
                    <edit/>
                  </el-icon>
                </div>
              </div>

              <div class="basic-info-content">
                <div class="company-contact-profile-photo-container" v-if="companyInfo.profile_photo">
                  <el-image class="company-contact-profile-photo"
                            :src="companyInfo.profile_photo" ></el-image>
                </div>
                <div class="basic-info-item" v-if="companyInfo.display_name">
                  <div class="basic-info-item-l">Display Name:</div>
                  <div class="basic-info-item-r">{{ companyInfo.display_name }}</div>
                </div>
                <div class="basic-info-item" v-if="companyInfo.job_title">
                  <div class="basic-info-item-l">Job Title:</div>
                  <div class="basic-info-item-r">{{ companyInfo.job_title }}</div>
                </div>

                <div class="basic-info-item" v-if="companyInfo.website">
                  <div class="basic-info-item-l">Website:</div>
                  <div class="basic-info-item-r">{{ companyInfo.website }}</div>
                </div>

              </div>
            </div>

            <div class="basic-info-container basic-info-margin">
              <div class="basic-info-t">
                <div class="basic-info-label">
                  <h4>Vendor Information</h4>
                  <div class="recruiter-underline-2"></div>
                </div>
                <div class="basic-info-edit" @click="editCompanyInfo()">
                  <el-icon :size="18">
                    <edit/>
                  </el-icon>
                </div>
              </div>

              <div class="basic-info-content">
                <div class="recruiter-logo-container" v-if="companyInfo.logo">
                  <el-image class="recruiter-logo" :src="companyInfo.logo" ></el-image>
                </div>

                <div class="basic-info-item" v-if="companyInfo.company_name">
                  <div class="basic-info-item-l">Company Name:</div>
                  <div class="basic-info-item-r">{{ companyInfo.company_name }} </div>
                </div>
                <div class="basic-info-item" v-if="companyInfo.work_phone">
                  <div class="basic-info-item-l">Work Phone #:</div>
                  <div class="basic-info-item-r">{{companyInfo.country_code}} {{ companyInfo.work_phone }}</div>
                </div>
                <div class="basic-info-item" v-if="companyInfo.work_email">
                  <div class="basic-info-item-l"> Work Email:</div>
                  <div class="basic-info-item-r">{{ companyInfo.work_email }}</div>
                </div>
                <div class="basic-info-item" v-if="companyInfo.website">
                  <div class="basic-info-item-l"> Work Email:</div>
                  <div class="basic-info-item-r">{{ companyInfo.website }}</div>
                </div>
                <div class="basic-info-item" v-if="companyInfo.year_founded">
                  <div class="basic-info-item-l">Year Founded:</div>
                  <div class="basic-info-item-r">{{ companyInfo.year_founded }}</div>
                </div>

                <div class="basic-info-item" v-if="companyInfo.country_info">
                  <div class="basic-info-item-l"> Location: </div>
                  <div class="basic-info-item-r">{{ $filters.countryInfoFormat(companyInfo.country_info) }}</div>
                </div>
                <div class="basic-info-item" v-if="companyInfo.address">
                  <div class="basic-info-item-l">Address: </div>
                  <div class="basic-info-item-r">{{ companyInfo.address }}</div>
                </div>

                <div class="basic-info-item" v-if="companyInfo.desc">
                  <div class="basic-info-item-l">Introduction: </div>
                  <div class="basic-info-item-r">{{ companyInfo.desc }}</div>
                </div>

                <div class="recruiter-license-container" v-if="companyInfo.license">
                  <el-image class="recruiter-license" :src="companyInfo.license"></el-image>
                </div>
<!--                <div class="recruiter-license-container" v-if="companyInfo.business_reg_img">-->
<!--                  <el-image class="recruiter-license" :src="companyInfo.business_reg_img"></el-image>-->
<!--                </div>-->


              </div>
            </div>


            <div class="media-container">
              <div class="media-label">
                <div class="media-label-text">Marketing Photos</div>
                <div class="profile-underline-1"></div>
              </div>

              <div class="account-images-container">
                <div class="account-images-t">
                  <div class="account-images-t-tips">Add more pictures to attract clients</div>
                  <div class="account-images-t-edit"
                       v-if="!editAccountImageStatus"
                       @click="editAccountImageStatus=true">
                    <el-icon :size="18">
                      <edit/>
                    </el-icon>
                  </div>
                  <div class="account-images-t-edit"
                       v-if="editAccountImageStatus"
                       @click="uploadAccountImages()">
                    Upload
                  </div>

                </div>
                <div class="account-images-content">
                  <div class="account-images-item-container" v-if="!editAccountImageStatus">
                    <div class="account-images-item" v-for="(item,i) in accountImageFileList" :key="i" >
                      <el-image class="account-images-img" :src="item.url" fit="contain"
                                @click="accountImagePreview(item.url)"
                      ></el-image>
                    </div>
                  </div>

                  <template v-if="editAccountImageStatus">
                    <el-upload
                        ref="accountImagesUpload"
                        action="#"
                        :headers="uploadHeaders"
                        :data="uploadData"
                        :auto-upload="false"
                        name="file[]"
                        list-type="picture-card"
                        :limit="6"
                        :multiple="true"
                        :before-upload="beforeAccountImageUpload"
                        :file-list="accountImageFileList"
                        :on-change="handleAccountImageChange"
                        :on-preview="handleAccountImagePreview"
                        :on-remove="handleAccountImageRemove"

                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>

                  </template>
                  <el-dialog width="50%" v-model="dialogAccountImageVisible" center>
                    <el-image :src="dialogAccountImageUrl"></el-image>
                  </el-dialog>
                </div>

              </div>

            </div>

          </div>

        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import meSideMenu from "@/components/meSideMenu";
import accountInfo from "../../../components/accountInfo";
import {
  USER_OBJECT_LIST,
  ADD_LANGUAGE_SCORE, ADD_PROFILE_V2,
  ZOHO_SYNC, USER_INFO_BY_TOKEN_V2, ADD_USER_IMG_V2, VENDOR_PERCENTAGE_V2, UPLOAD_IMG
} from '@/api/api'
import {encode} from 'js-base64'

export default {
  name: "profile",
  components: {
    meSideMenu,
    accountInfo
  },
  computed:{
    identity:{
      get(){
        return this.$store.state.identity
      }
    }

  },
  data() {
    return {
      profilePercentage:0,
      editAccountImageStatus:false,
      activeName: 'first',
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      userContact:{},

      companyInfo:{},

      businessInfo: {},
      basicUserInfo: {},
      languagesDrawer: false,
      languagesData: [],
      languagesCustomData: [],
      languagesIconClasses: [
        'icon-rate-face-1',
        'icon-rate-face-2',
        'icon-rate-face-3',
      ],
      languagesForm: {
        languageValue: ''
      },
      languagesRules: {
        languageValue: [
          {
            required: true,
            message: 'Add your language',
            trigger: 'blur',
          }
        ],
      },
      languagesObjArr: [],

      jobTypeList: [],
      ageToTeachList: [],
      benefitsList: [],
      subjectList: [],
      studentAgeList: [],
      userImagesList: [],
      facilitiesList: [],

      profilePhotoUrl: '',
      backgroundUrl: '',
      dialogAccountImageUrl: '',
      dialogAccountImageVisible: false,
      accountImageFileList: [],
      introVideoUrl: '',
      logoPhotoUrl: '',

      canEditSubject: false,
      editSubjectList: [],
      addSubjectStatus: false,
      ownSubjectValue: '',
      ownSubjectList: [],
      selectSubjectList: [],
      selectSubjectArr: [],

      canEditJobType: false,
      editJobTypeList: [],
      addJobTypeStatus: false,
      ownJobTypeValue: '',
      ownJobTypeList: [],
      selectJobTypeList: [],
      selectJobTypeArr: [],

      canEditAgeToTeach: false,
      editAgeToTeachList: [],
      addAgeToTeachStatus: false,
      ownAgeToTeachValue: '',
      ownAgeToTeachList: [],
      selectAgeToTeachList: [],
      selectAgeToTeachArr: [],

      canEditBenefits: false,
      editBenefitsList: [],
      addBenefitsStatus: false,
      ownBenefitsValue: '',
      ownBenefitsList: [],
      selectBenefitsList: [],
      selectBenefitsArr: [],

    }
  },
  mounted() {
    this.getUserInfo()
    this.updateBusinessProfile()
  },
  methods: {
    updateBusinessProfile() {
      let params = {
        token: localStorage.getItem('token')
      }
      VENDOR_PERCENTAGE_V2(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    editBasicInfo() {
      let strObj = {
        i:5,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))

      this.$router.push({path:'/profile/contact/user',query:{s:str}})

    },
    editCompanyContactInfo(){
      let strObj = {
        i:5,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))

      this.$router.push({path:'/profile/contact/company',query:{s:str}})
    },
    editCompanyInfo(){
      if(this.companyInfo.id){
        let strObj = {
          cid:this.companyInfo.id,
          action:'edit'
        }
        let str = encode(JSON.stringify(strObj))

        this.$router.push({path:'/vendor/edit/vendor',query:{s:str}})
      }else{
        let strObj = {
          i:5,
          action:'add'
        }
        let str = encode(JSON.stringify(strObj))

        this.$router.push({path:'/vendor/edit/vendor',query:{s:str}})
      }


    },
    editLanguages() {
      this.getUserObjectList()
      this.languagesDrawer = true
    },
    getUserInfo() {

      let identity = localStorage.getItem('identity')
      let params = {
        identity: identity
      }

      USER_INFO_BY_TOKEN_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          let userContact = res.message.user_contact;

          let companyInfo = res.message.user_contact.company;

          if(companyInfo){
            this.companyInfo = companyInfo;

            if (companyInfo.benefits) {
              let benefitsArr = companyInfo.benefits;
              benefitsArr.forEach((item,i)=>{
                benefitsArr[i].id = item.object_id
                benefitsArr[i].pid = item.object_pid
              })
              this.selectBenefitsList = benefitsArr;
              this.benefitsList = companyInfo.benefits
            }
          }

          if(userContact){
            this.userContact = userContact;
          }

            let userImages = companyInfo.images
            this.accountImageFileList = []
            if (userImages) {
              userImages.forEach(item => {
                let userImageObj = {
                  name: '',
                  url: item.url
                }
                this.accountImageFileList.push(userImageObj)
              })
            }
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    handleLanguagesClose(e) {
      console.log(e)
      this.languagesDrawer = false
    },
    getUserObjectList() {
      let params = {
        pid: 2
      }
      USER_OBJECT_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.languagesData = res.message
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    addCustomLanguage(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let ownLanguageValue = this.languagesForm.languageValue;
          let obj = {
            id: 0,
            object_cn: ownLanguageValue,
            object_en: ownLanguageValue,
            p_name_cn: '语言',
            p_name_en: 'languages',
            pid: 2
          }

          this.languagesCustomData.push(obj)
          this.languagesForm.languageValue = ''
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    languagesScoreChange(e, value) {
      // console.log(e)
      // console.log(value)
      let obj = {
        object_id: value.id,
        score: e,
        object_name: value.object_en,
        object_pid: value.pid
      }
      let indexKey = this.languagesObjArr.findIndex(item => item.object_id == value.id)

      if (e > 0) {
        if (this.languagesObjArr.length > 9) {
          this.$message.warning('Choose up to 10 tags')
        } else {
          if (indexKey == -1) {
            this.languagesObjArr.push(obj)
          } else {
            this.languagesObjArr[indexKey]['score'] = e
          }
        }

      } else {
        let arr = [];
        this.languagesObjArr.forEach(item => {
          if (item.object_id != value.id) {
            arr.push(item)
          }
        })
        this.languagesObjArr = arr;
      }
      // console.log(this.languagesObjArr)
    },
    languagesCustomScoreChange(e, value) {

      let indexKey = this.languagesObjArr.findIndex(item => item.object_name == value.object_en)

      let obj = {
        object_id: value.id,
        score: e,
        object_name: value.object_en,
        object_pid: value.pid
      }

      if (e > 0) {
        if (this.languagesObjArr.length > 9) {
          this.$message.warning('Choose up to 10 tags')
        } else {
          if (indexKey == -1) {
            this.languagesObjArr.push(obj)
          } else {
            this.languagesObjArr[indexKey]['score'] = e
          }

        }

      } else {
        let arr = [];
        this.languagesObjArr.forEach(item => {
          if (item.object_name != value.object_en) {
            arr.push(item)
          }
        })
        this.languagesObjArr = arr;
      }
      // console.log(this.languagesObjArr)
    },
    updateLanguagesScore() {
      let params = {
        object_arr: this.languagesObjArr,
        token: localStorage.getItem('token')
      }
      ADD_LANGUAGE_SCORE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.languagesDrawer = false
          this.getUserInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    turnIndexList(type) {
      let data = {
        token: localStorage.getItem('token'),
        pid: type
      }
      this.selectSubjectList = [];
      this.ownSubjectList = [];

      USER_OBJECT_LIST(data).then(res => {
        console.log(res)

        if (type == 1) {
          this.editSubjectList = res.message;
          let len = this.subjectList.length;
          let subjectList = this.subjectList;
          for (let i = 0; i < len; i++) {
            console.log(subjectList[i].object_id);
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

          this.canEditSubject = true;
        }

        // job type
        if (type == 3) {
          this.editJobTypeList = res.message;
          console.log(this.jobTypeList);
          let len = this.jobTypeList.length;
          let jobTypeList = this.jobTypeList;
          console.log(len);
          for (let i = 0; i < len; i++) {
            console.log(jobTypeList[i].object_id);
            if (jobTypeList[i].object_id == 0) {
              let obj = {
                id: jobTypeList[i].object_id,
                object_pid: jobTypeList[i].object_pid,
                object_name: jobTypeList[i].object_en
              }
              this.ownJobTypeList.push(obj);
              this.selectJobTypeList.push(obj)
            } else {
              let obj = {
                id: jobTypeList[i].object_id,
                pid: jobTypeList[i].object_pid,
                object_en: jobTypeList[i].object_en,
                object_cn: jobTypeList[i].object_cn
              }
              this.selectJobTypeList.push(obj)
            }
          }

          this.canEditJobType = true;
        }

        // benefits
        if (type == 6) {
          this.editBenefitsList = res.message;
          console.log(this.benefitsList);
          let len = this.benefitsList.length;
          let benefitsList = this.benefitsList;
          console.log(len);
          for (let i = 0; i < len; i++) {
            console.log(benefitsList[i].object_id);
            if (benefitsList[i].object_id == 0) {
              let obj = {
                id: benefitsList[i].object_id,
                object_pid: benefitsList[i].object_pid,
                object_name: benefitsList[i].object_en
              }
              this.ownBenefitsList.push(obj);
              this.selectBenefitsList.push(obj)
            } else {
              let obj = {
                id: benefitsList[i].object_id,
                pid: benefitsList[i].object_pid,
                object_en: benefitsList[i].object_en,
                object_cn: benefitsList[i].object_cn
              }
              this.selectBenefitsList.push(obj)
            }
          }

          this.canEditBenefits = true;
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
        this.selectSubjectList.push(value);

      } else {
        this.selectSubjectList.splice(index, 1);
      }
      // console.log(this.selectSubjectList)
    },
    subjectConfirm(companyId) {

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
        company_id:companyId,
        token: localStorage.getItem('token'),
        object_pid: 1,
        object_id: objectArr,
        expand: expand
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('subject--submit--' + res.data);
          this.canEditSubject = false;
          this.getUserInfo();
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    addOwnJobType() {
      this.addJobTypeStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownJobTypeValue,
        object_pid: 3
      }
      let index = this.selectJobTypeList.findIndex((element) => element === obj);
      if (index == -1) {
        this.selectJobTypeList.push(obj);
        this.ownJobTypeList.push(obj);
        this.ownJobTypeValue = '';
      } else {
        this.selectJobTypeList.splice(index, 1);
      }

    },
    selectJobType(value, type) {
      let index;
      if (type == 1) {
        index = this.selectJobTypeList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectJobTypeList.findIndex((element) => element === value);
      }

      if (index == -1) {
        this.selectJobTypeList.push(value);

      } else {
        this.selectJobTypeList.splice(index, 1);
      }
      // console.log(this.selectJobTypeList)
    },
    jobTypeConfirm(companyId) {

      let expand = [];
      let objectArr = [];
      this.selectJobTypeList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        company_id:companyId,
        object_pid: 3,
        object_id: objectArr,
        expand: expand
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('jobtype--submit--' + res.data);
          this.canEditJobType = false;
          this.getUserInfo();
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    addOwnBenefits() {
      this.addBenefitsStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownBenefitsValue,
        object_pid: 6
      }
      let index = this.selectBenefitsList.findIndex((element) => element === obj);
      if (index == -1) {
        this.selectBenefitsList.push(obj);
        this.ownBenefitsList.push(obj);
        this.ownBenefitsValue = '';
      } else {
        this.selectBenefitsList.splice(index, 1);
      }

    },
    selectBenefits(value, type) {
      let index;
      if (type == 1) {
        index = this.selectBenefitsList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectBenefitsList.findIndex((element) => element === value);
      }

      if (index == -1) {
        this.selectBenefitsList.push(value);

      } else {
        this.selectBenefitsList.splice(index, 1);
      }
      // console.log(this.selectBenefitsList)
    },
    benefitsConfirm(companyId) {

      let expand = [];
      let objectArr = [];
      this.selectBenefitsList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        company_id:companyId,
        object_pid: 6,
        object_id: objectArr,
        expand: expand
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('benefits--submit--' + res.data);
          this.canEditBenefits = false;
          this.getUserInfo();
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    handleTabsClick(tab, event) {
      console.log(tab, event)
    },
    handleAccountImageRemove(file, fileList) {
      console.log(file, fileList)
      this.accountImageFileList = fileList
    },
    handleAccountImagePreview(file) {
      // console.log(file)
      this.dialogAccountImageUrl = file.url
      this.dialogAccountImageVisible = true
    },
    beforeAccountImageUpload(file){
      const isJpeg = file.type === 'image/png' || file.type === 'image/jpg'
      if(!isJpeg){
        return this.$message.error('Please select the correct file format to upload')
      }
      return isJpeg
    },
    handleAccountImageChange(fileList){
      this.accountImageFileList.push(fileList)
    },
    uploadAccountImages(){
      this.$loading({
        text:'Uploading'
      })
      console.log(this.accountImageFileList)

      if(this.accountImageFileList.length === 0){
        this.$loading().close()
        return this.$message.warning('Select File')
      }

      let imgParams = new FormData();
      let oldData = []

      let token = localStorage.getItem('token')
      imgParams.append('token' , token)
      imgParams.append('platform',4)

      this.accountImageFileList.forEach(file=>{
        if(file.name == ''){
          oldData.push(file.url)
        }else{
          imgParams.append('file[]',file.raw)
        }

      })

      if(imgParams.get('file[]')){

        UPLOAD_IMG(imgParams).then(res=>{
          console.log(res)
          if(res.code == 200){
            let imgData = res.data;
            // let imgArr = [];
            imgData.forEach(item=>{
              oldData.push(item.file_url)
            })
            let params = {
              token: localStorage.getItem('token'),
              identity: localStorage.getItem('identity'),
              company_id:this.companyInfo.id,
              img: oldData
            }
            ADD_USER_IMG_V2(params).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.getUserInfo()
                this.editAccountImageStatus = false;
                this.$loading().close()
              }
            }).catch(err => {
              console.log(err)
              this.$loading().close()
              this.$message.error(err.msg)
            })
          }

        }).catch(err=>{
          this.$loading().close()
          console.log(err.code)
        })

      }else{

        let params = {
          token: localStorage.getItem('token'),
          identity: localStorage.getItem('identity'),
          company_id:this.companyInfo.id,
          img: oldData
        }

        ADD_USER_IMG_V2(params).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.getUserInfo()
            this.editAccountImageStatus = false;
            this.$loading().close()
          }
        }).catch(err => {
          console.log(err)
          this.$loading().close()
          this.$message.error(err.msg)
        })
      }
    },

    accountImagePreview(url){
      this.dialogAccountImageVisible = true;
      this.dialogAccountImageUrl = url;
    },
    async submitEduBusinessCompanyForm(logoLink, headerLink) {

      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {'SingleLine': this.companyInfo.company_name  // Education Business Name
        },
        {'Dropdown2': this.companyInfo.business_type_name  //Education Business Category
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
        {'Number4': ''  //    Number of Students
        },
        {'MultipleChoice': ''  //    Students Ages
        },
        {'MultiLine1': ''  //     Curriculum Subjects
        },
        {'MultiLine2': ''  //     School Facilities
        },
        {'Website1': ''  // Business License Link
        },
        {'Website2': logoLink   //Company Logo Link
        },
        {'Website3': headerLink   //Header Image Link
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

.educator-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.educator-r-container {
  padding: 10px 20px;
}

.basic-info-container {
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
//background-color: aliceblue;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.basic-info-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.basic-info-label {

}

.profile-underline-1 {
  margin-top: 8px;
  width: 60px;
  border-bottom: 2px solid #ff2870;
}

.basic-info-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.basic-info-edit:hover {
  color: #00b3d2;
}
.basic-info-margin{
  margin-top: 20px;
}
.company-contact-profile-photo-container{
  text-align: center;
  padding-bottom:10px;
}
.company-contact-profile-photo{
  width:120px;
  height: 120px;
  border-radius: 120px;
  border:2px solid #00b3d2;
}

.basic-info-content {
  margin-top: 10px;
  border-radius:10px;
//background-color: aliceblue;
//padding:20px;
}

.basic-info-item {

  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  border-bottom:1px solid #FFFFFF;

}

.basic-info-item-l{

  width:20%;
  text-align: left;
  background-color: #f4f5f6;
  padding:10px 0 10px 20px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  line-height: 24px;
  min-height: 24px;

}

.basic-info-item-r{

  width:80%;
  text-align: left;
  background-color: #eeeeee;
  padding:10px;

  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  line-height: 24px;
  min-height: 24px;
}


.recruiter-underline-2 {
  width: 60px;
  margin-top: 8px;
  border-bottom: 2px solid #00b3d2;
}

.recruiter-logo-container{
  text-align: center;
  padding-bottom: 10px;
}
.recruiter-logo{
  width:120px;
  height: 120px;
  border-radius:120px;
  border:2px solid #00b3d2;

}
.recruiter-license-container{
  width:100%;
  margin-top: 14px;
}
.recruiter-license{
  width:100%;
  border-radius: 10px;
}

.recruiter-video-container{
  width:100%;
  margin-top:14px;
}

.recruiter-video{
  width:100%;
  height: 360px;
}

.media-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.media-label-text {
  font-size: 16px;
  font-weight: bold;
}


.account-images-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.account-images-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.account-images-t-label {
  font-size: 14px;
  font-weight: bold;

}

.account-images-t-tips {
  font-size: 14px;
  color: #808080;
}

.account-images-content {
  padding: 10px;
//text-align: center;

}
.account-images-item-container{
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content: space-between;
  flex-wrap:wrap;

}

.account-images-item{
  width:45%;
//flex:1;
  height: 140px;
  padding:1%;
  margin:1%;
  border:1px solid #EEEEEE;
  border-radius:10px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
}

.account-images-img{
  height: 100%;
}

.account-images-t-edit{
  font-size: 14px;
  font-weight: bold;
  cursor:pointer;
}

.preferences-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.preferences-label-text {
  font-size: 16px;
  font-weight: bold;
}


.preferences-content {
  padding: 10px 0;
}


.p-benefits-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.p-benefits-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.p-benefits-t-label {
  font-size: 14px;
  font-weight: bold;
}

.p-benefits-t-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.p-benefits-content {

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


</style>