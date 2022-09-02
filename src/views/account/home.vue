<template>
  <div class="bg">
    <div class="account-container">
      <div class="account-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <div class="account-r-container">
        <div class="account-r-container-bg">
          <div class="account-container-1">
            <div class="account-basic-info">
              <div class="account-basic-info-label">
                <span>Your account</span>
                <el-button link class="account-basic-info-edit-btn"
                           @click="editAccount()"
                >
                  EDIT
                </el-button>
              </div>

              <div :class="editAccountStatus ? 'account-basic-info-c-edit' : 'account-basic-info-c'"

              >
                <div class="account-basic-info-c-l">
                  <el-avatar class="account-basic-info-c-avatar"
                             :src="headImgUrl ? headImgUrl : '' "
                  ></el-avatar>

                  <el-upload
                      v-if="editAccountStatus"
                      class="profile-uploader"
                      action=""
                      :headers="uploadHeaders"
                      :show-file-list="false"
                      :http-request="profilePhotoHttpRequest"
                      :before-upload="beforeProfilePhotoUpload"
                  >
                    <el-button class="account-basic-info-c-change-btn"
                               link
                    >
                      CHANGE
                    </el-button>
                  </el-upload>

                </div>
                <div class="account-basic-info-c-r">
                  <template v-if="editAccountStatus">
                    <el-form
                        ref="basicForms"
                        :model="basicForm"
                        :rules="basicRules"
                        label-width="120px"
                        label-position="top"
                        class="demo-ruleForm"
                    >

                      <div class="account-first-last-name">

                        <div class="account-first-name">
                          <el-form-item label="First name" prop="first_name">
                            <el-input v-model="basicForm.first_name" placeholder="First name"></el-input>
                          </el-form-item>
                        </div>

                        <div class="account-last-name">
                          <el-form-item label="Last name" prop="last_name">
                            <el-input v-model="basicForm.last_name" placeholder="Last name"></el-input>
                          </el-form-item>
                        </div>

                      </div>

                      <el-form-item label="E-mail address" prop="email">
                        <el-input v-model="basicForm.email" placeholder="E-mail address"></el-input>
                      </el-form-item>


                      <el-form-item label="Birth date" prop="birthday">
                        <el-date-picker
                            v-model="basicForm.birthday"
                            type="date"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                            placeholder="Pick a date"
                            :disabledDate="birthdayDisabledDate"
                            style="width: 100%"
                        ></el-date-picker>
                      </el-form-item>

                      <el-form-item label="Gender" prop="sex">
                        <el-select v-model="basicForm.sex" placeholder="Select one">
                          <el-option v-for="(item,i) in sexOptions" :key="i" :label="item.object_en"
                                     :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>

                      <div class="save-form-container">
                        <el-button class="save-form-discard-btn" link
                                   @click="discardAccount()"
                        >
                          DISCARD
                        </el-button>
                        <el-button class="save-form-save-btn" type="primary" round
                                   :loading="submitLoadingValue"
                                   @click="saveAccount('basicForms')"
                        >
                          SAVE
                        </el-button>
                      </div>

                    </el-form>

                  </template>

                  <template v-if="!editAccountStatus">
                    <div class="account-basic-info-c-name">
                      {{userContact.first_name}} {{userContact.last_name}}
                    </div>
                    <div class="account-basic-info-c-email">
                      {{userContact.email}}
                    </div>
                  </template>

                </div>
              </div>

            </div>

            <div class="account-refer-container">
              <div class="account-refer-label">
                Refer someone you know & earn credits
              </div>
              <div class="account-refer-c">
                <div class="account-refer-c-l">
                  <el-input class="account-refer-c-l-input" size="default"
                            placeholder="Email address of someone you know"></el-input>
                </div>
                <div class="account-refer-c-r">
                  <el-button class="account-refer-send-btn" link>
                    SEND
                  </el-button>
                </div>

              </div>

            </div>

            <div class="account-perks-container">
              <div class="account-perks-label">
                Get the best perks
              </div>
              <div class="account-perks-tips">
                Check our plans to save more
              </div>
              <div class="account-perks-btn-container">
                <el-button class="account-perks-upgrade-btn" type="primary" round>
                  UPGRADE
                </el-button>
              </div>
            </div>

          </div>
          <div class="account-container-2">
            <div class="account-profile-container">
              <div class="account-profile-label">
                Your profiles
              </div>
              <div class="account-profile-c">
                <div>
                  <div class="account-profile-c-item"
                       v-for="(item,i) in educatorUserData" :key="i"
                  >
                    <div class="account-profile-c-item-t">
                      <div class="account-profile-c-item-l">
                        <div class="account-profile-name">
                          <span>{{item.name}}</span>
                          <el-tag type="success"
                                  style="margin-left: 10px;"
                                  v-if="item.id == currentCompanyId">
                            current
                          </el-tag>
                        </div>
                        <div class="account-profile-identity">
                          Educator
                        </div>

                      </div>
                      <div class="account-profile-c-item-r">
                        <div class="account-profile-c-item-r-1">
                          Complete at least 75% of your profile to post jobs
                        </div>
                        <div class="account-profile-c-item-r-2">
                          <el-button
                              class="account-profile-c-item-r-2-btn"
                              type="primary" round>
                            SEARCH JOBS
                          </el-button>
                        </div>
                        <div class="account-profile-c-item-r-3">
                          <el-button
                              class="account-profile-c-item-r-3-btn"
                              @click="editEducatorProfile()"
                              plain round>
                            EDIT
                          </el-button>
                        </div>
                        <div class="account-profile-c-item-r-4">
                          <el-dropdown>
                            <span class="account-profile-c-item-r-4-btn">MORE<el-icon class="el-icon--right"><arrow-down /></el-icon></span>
                            <template #dropdown>
                              <el-dropdown-menu>
                                <el-dropdown-item @click="viewEducatorProfile(item.id,item.user_id)">
                                  <span class="account-profile-c-item-r-4-btn"> VIEW PROFILE</span>
                                </el-dropdown-item>
                                <el-dropdown-item class="account-profile-c-item-r-4-btn">
                                  <span class="account-profile-c-item-r-4-btn">REMOVE</span>
                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>

                        </div>
                      </div>

                    </div>

                    <div class="account-profile-c-item-b">
                      <el-progress :text-inside="false" :stroke-width="3" :percentage="item.completion"/>
                    </div>

                  </div>

                </div>

                <div>
                  <div class="account-profile-c-item"
                       v-for="(item,i) in recruiterUserData" :key="i"
                  >
                    <div class="account-profile-c-item-t">
                      <div class="account-profile-c-item-l">
                        <div class="account-profile-name">
                          <span>{{item.company_name}}</span>
                          <el-tag type="success"
                                  style="margin-left: 10px;"
                                  v-if="item.id == currentCompanyId">
                            current
                          </el-tag>
                        </div>
                        <div class="account-profile-identity">
                          Recruiter
                        </div>

                      </div>
                      <div class="account-profile-c-item-r">
                        <div class="account-profile-c-item-r-1">
                          Complete at least 75% of your profile to post jobs
                        </div>
                        <div class="account-profile-c-item-r-2">
                          <el-button
                              class="account-profile-c-item-r-2-btn"
                              type="primary" round>
                            POST A JOB
                          </el-button>
                        </div>
                        <div class="account-profile-c-item-r-3">
                          <el-button
                              class="account-profile-c-item-r-3-btn"
                              @click="editRecruiterProfile(item.id,item.user_id)"
                              plain round>
                            EDIT
                          </el-button>
                        </div>
                        <div class="account-profile-c-item-r-4">
                          <el-dropdown>
                            <span class="account-profile-c-item-r-4-btn">MORE<el-icon class="el-icon--right"><arrow-down /></el-icon></span>
                            <template #dropdown>
                              <el-dropdown-menu>
                                <el-dropdown-item @click="viewRecruiterProfile(item.id)">
                                  <span class="account-profile-c-item-r-4-btn"> VIEW PROFILE</span>
                                </el-dropdown-item>
                                <el-dropdown-item class="account-profile-c-item-r-4-btn">
                                  <span class="account-profile-c-item-r-4-btn">REMOVE</span>
                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>
                        </div>
                      </div>

                    </div>

                    <div class="account-profile-c-item-b">
                      <el-progress :text-inside="false" :stroke-width="3" :percentage="item.completion"/>
                    </div>

                  </div>

                </div>

                <div>
                  <div class="account-profile-c-item" v-for="(item,i) in schoolUserData" :key="i">

                    <div class="account-profile-c-item-t">
                      <div class="account-profile-c-item-l">
                        <div class="account-profile-name">
                          <span>{{item.company_name}}</span>
                          <el-tag type="success"
                                  style="margin-left: 10px;"
                                  v-if="item.id == currentCompanyId">
                            current
                          </el-tag>
                        </div>
                        <div class="account-profile-identity">
                          School
                        </div>

                      </div>
                      <div class="account-profile-c-item-r">
                        <div class="account-profile-c-item-r-1">
                          Complete at least 75% of your profile to post jobs
                        </div>
                        <div class="account-profile-c-item-r-2">
                          <el-button
                              class="account-profile-c-item-r-2-btn"
                              type="primary" round>
                            POST A JOB
                          </el-button>
                        </div>
                        <div class="account-profile-c-item-r-3">
                          <el-button
                              class="account-profile-c-item-r-3-btn"
                              @click="editSchoolProfile(item.id)"
                              plain round>
                            EDIT
                          </el-button>
                        </div>
                        <div class="account-profile-c-item-r-4">
                          <el-dropdown>
                            <span class="account-profile-c-item-r-4-btn">MORE<el-icon class="el-icon--right"><arrow-down /></el-icon></span>
                            <template #dropdown>
                              <el-dropdown-menu>
                                <el-dropdown-item @click="viewSchoolProfile(item.id,item.user_id)">
                                  <span class="account-profile-c-item-r-4-btn"> VIEW PROFILE</span>
                                </el-dropdown-item>
                                <el-dropdown-item class="account-profile-c-item-r-4-btn">
                                  <span class="account-profile-c-item-r-4-btn">REMOVE</span>
                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>
                        </div>
                      </div>

                    </div>

                    <div class="account-profile-c-item-b">
                      <el-progress :text-inside="false" :stroke-width="3" :percentage="item.completion"/>
                    </div>

                  </div>

                </div>

                <div>
                  <div class="account-profile-c-item" v-for="(item,i) in otherUserData" :key="i">

                    <div class="account-profile-c-item-t">
                      <div class="account-profile-c-item-l">
                        <div class="account-profile-name">
                          <span>{{item.company_name}}</span>
                          <el-tag type="success"
                                  style="margin-left: 10px;"
                                  v-if="item.id == currentCompanyId">
                            current
                          </el-tag>
                        </div>
                        <div class="account-profile-identity">
                          Other
                        </div>

                      </div>
                      <div class="account-profile-c-item-r">
                        <div class="account-profile-c-item-r-1">
                          Complete at least 75% of your profile to post jobs
                        </div>
                        <div class="account-profile-c-item-r-2">
                          <el-button
                              class="account-profile-c-item-r-2-btn"
                              type="primary" round>
                            POST A JOB
                          </el-button>
                        </div>
                        <div class="account-profile-c-item-r-3">
                          <el-button
                              class="account-profile-c-item-r-3-btn"
                              @click="editOtherProfile(item.id)"
                              plain round>
                            EDIT
                          </el-button>
                        </div>
                        <div class="account-profile-c-item-r-4">
                          <el-dropdown>
                            <span class="account-profile-c-item-r-4-btn">MORE<el-icon class="el-icon--right"><arrow-down /></el-icon></span>
                            <template #dropdown>
                              <el-dropdown-menu>
                                <el-dropdown-item @click="viewOtherProfile(item.id, item.user_id)" >
                                  <span class="account-profile-c-item-r-4-btn"> VIEW PROFILE</span>
                                </el-dropdown-item>
                                <el-dropdown-item class="account-profile-c-item-r-4-btn">
                                  <span class="account-profile-c-item-r-4-btn">REMOVE</span>
                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>
                        </div>
                      </div>

                    </div>

                    <div class="account-profile-c-item-b">
                      <el-progress :text-inside="false" :stroke-width="3" :percentage="item.completion"/>
                    </div>

                  </div>

                </div>

                <div>
                  <div class="account-profile-c-item" v-for="(item,i) in vendorUserData" :key="i">

                    <div class="account-profile-c-item-t">
                      <div class="account-profile-c-item-l">
                        <div class="account-profile-name">
                          <span>{{item.company_name}}</span>
                          <el-tag type="success"
                                  style="margin-left: 10px;"
                                  v-if="item.id == currentCompanyId">
                            current
                          </el-tag>
                        </div>
                        <div class="account-profile-identity">
                          Vendor
                        </div>

                      </div>
                      <div class="account-profile-c-item-r">
                        <div class="account-profile-c-item-r-1">
                          Complete at least 75% of your profile to post jobs
                        </div>
                        <div class="account-profile-c-item-r-2">
                          <el-button
                              class="account-profile-c-item-r-2-btn"
                              type="primary" round>
                            POST A Deal
                          </el-button>
                        </div>
                        <div class="account-profile-c-item-r-3">
                          <el-button
                              class="account-profile-c-item-r-3-btn"
                              @click="editVendorProfile(item.id)"
                              plain round>
                            EDIT
                          </el-button>
                        </div>
                        <div class="account-profile-c-item-r-4">
                          <el-dropdown>
                            <span class="account-profile-c-item-r-4-btn">MORE<el-icon class="el-icon--right"><arrow-down /></el-icon></span>
                            <template #dropdown>
                              <el-dropdown-menu>
                                <el-dropdown-item @click="viewVendorProfile(item.id,item.user_id)">
                                  <span class="account-profile-c-item-r-4-btn"> VIEW PROFILE</span>
                                </el-dropdown-item>
                                <el-dropdown-item class="account-profile-c-item-r-4-btn">
                                  <span class="account-profile-c-item-r-4-btn">REMOVE</span>
                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>
                        </div>
                      </div>

                    </div>

                    <div class="account-profile-c-item-b">
                      <el-progress :text-inside="false" :stroke-width="3" :percentage="item.completion"/>
                    </div>

                  </div>

                </div>

              </div>
            </div>

            <div class="account-add-profile">
              <el-button class="account-add-profile-btn" type="primary" round
                         @click="turnAddProfile()"
              >
                ADD PROFILE
              </el-button>
            </div>

          </div>

        </div>

      </div>

    </div>

    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUpload()"></xllLoading>
  </div>
</template>

<script>
import meSideMenu from "@/components/meSideMenu";

import {
  USER_INFO_BY_TOKEN_V2,
  EDUCATOR_PERCENTAGE_V2, USER_CONTACT_EDIT_V2, UPLOAD_BY_ALI_OSS, UPLOAD_BY_SERVICE, USER_ALL_INFO
} from '@/api/api'

import xllLoading from '@/components/xllLoading'

import {useStore} from "vuex";
import {ref,reactive} from "vue";
import ImageCompressor from "compressorjs";
import {encode} from "js-base64";

export default {
  name: "accountHome",
  components: {
    meSideMenu,
    xllLoading
  },
  setup(){

    const store = useStore()

    const setIdentity = (data)=>{
      store.commit('identity',data)
    }
    const submitLoadingValue = ref(false)

    const editAccountStatus = ref(false)

    const basicForms = ref(null)

    const basicForm = reactive({
      first_name: "",
      last_name:'',
      identity:localStorage.getItem('identity'),
      sex:'',
      phone:'',
      email:'',
      state_id:'',
      town_id:'',
      country_id:'',
      country_info:'',
      headimgurl:'',
      language: 2,
      birthday:'',
      area_code:''
    })

    const basicRules = reactive({
      first_name: [
        {
          required: true,
          message: 'First Name',
          trigger: 'blur',
        }
      ],
      last_name: [
        {
          required: true,
          message: 'Last Name',
          trigger: 'blur',
        }
      ],
      sex: [
        {
          required: true,
          message: 'Select your gender',
          trigger: 'change',
        }
      ],

      email: [
        {
          required: true,
          message: 'Please enter your email',
          trigger: 'change',
        }
      ],

    })

    const birthdayDisabledDate = (date)=>{
      let myDate = new Date();
      return date.getTime() >= myDate.getTime();
    }

    const currentCompanyId = localStorage.getItem('company_id')

    return {
      currentCompanyId,
      setIdentity,
      submitLoadingValue,
      basicForm,
      basicForms,
      basicRules,
      birthdayDisabledDate,
      editAccountStatus

    }

  },
  data() {
    return {
      headImgUrl:'',
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
      uploadLoadingStatus: false,
      editAccountImageStatus: false,
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      educatorContact: {},
      userContact: {},

      educatorUserData:[],
      recruiterUserData:[],
      schoolUserData:[],
      otherUserData:[],
      vendorUserData:[],


    }
  },
  mounted() {
    this.getUserInfo()
    this.updateEducatorProfile()
    this.getUserAllInfo()

  },
  methods: {
    editAccount(){
      let userContact = this.userContact;
      this.editAccountStatus = true;
      this.basicForm.first_name = userContact.first_name;
      this.basicForm.last_name = userContact.last_name;
      this.basicForm.email = userContact.email;
      this.basicForm.birthday = userContact.birthday;
      this.basicForm.sex = userContact.sex;

    },
    discardAccount(){
      this.editAccountStatus = false;
    },
    saveAccount(formName){
      this.submitLoadingValue = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let params = Object.assign({}, this.basicForm)
          USER_CONTACT_EDIT_V2(params).then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.editAccountStatus = false;
              this.getUserInfo();
              this.submitLoadingValue=false
            }
          }).catch(err=>{
            console.log(err)
            this.$message.error(err.msg)
            this.submitLoadingValue=false
          })
        } else {
          console.log('error submit!!')
          this.submitLoadingValue=false
          return false

        }
      })

    },
    updateEducatorProfile() {
      let params = {
        token: localStorage.getItem('token')
      }
      EDUCATOR_PERCENTAGE_V2(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
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
          let educatorContact = res.message.user_contact.educator_contact;

          if (userContact) {
            this.userContact = userContact
          }

          if(userContact.headimgurl){
            this.headImgUrl = userContact.headimgurl
          }

          if (educatorContact) {
            this.educatorContact = educatorContact;
          }



        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    profilePhotoHttpRequest(options){
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file,{
        quality:0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token',localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if(isInChina === 'yes'){
            formData.append('file[]',file,file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.headImgUrl = myFileUrl
                self.basicForm.headimgurl = myFileUrl

              }
            }).catch(err=>{
              console.log(err)
            })

          }

          if(isInChina === 'no'){
            formData.append('file',file,file.name)
            UPLOAD_BY_SERVICE(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.headImgUrl = myFileUrl
                self.basicForm.headimgurl = myFileUrl
              }
            }).catch(err=>{
              console.log(err)
            })

          }

        },
        error(err){
          console.log(err.message)
        }

      })

    },
    beforeProfilePhotoUpload(file) {
      this.uploadLoadingStatus = true;
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M

    },
    cancelUpload() {
      this.uploadLoadingStatus = false;
    },
    turnAddProfile(){

      let identity = localStorage.getItem('identity')

      let strObj = {
        i:identity,
        action:'add'
      }

      let str = encode(JSON.stringify(strObj))

      if(identity == 1){
        this.$router.push({path:'/educator/edit/home',query:{s:str}})
      }

      if(identity == 2 ){
        this.$router.push({path:'/business/edit/recruiter',query:{s:str}})
      }
      if(identity == 3 ){
        this.$router.push({path:'/business/edit/school',query:{s:str}})
      }
      if(identity == 4 ){
        this.$router.push({path:'/business/edit/other',query:{s:str}})
      }
      if(identity == 5 ){
        this.$router.push({path:'/vendor/edit/vendor',query:{s:str}})
      }

    },
    editEducatorProfile(){
      let strObj = {
        i:1,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))
      this.$router.push({path:'/educator/edit/home',query:{s:str}})
    },
    editRecruiterProfile(companyId){
      let strObj = {
        cid:companyId,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))
      this.$router.push({path:'/business/edit/recruiter',query:{s:str}})
    },
    editSchoolProfile(companyId){
      let strObj = {
        cid:companyId,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))
      this.$router.push({path:'/business/edit/school',query:{s:str}})
    },
    editOtherProfile(companyId){
      let strObj = {
        cid:companyId,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))
      this.$router.push({path:'/business/edit/other',query:{s:str}})
    },
    editVendorProfile(companyId){
      let strObj = {
        cid:companyId,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))
      this.$router.push({path:'/vendor/edit/vendor',query:{s:str}})

    },
    viewEducatorProfile(companyId,userId){
      let obj = {
            cid:companyId,
            uid:userId,
            identity:1
      }
      let str = encode(JSON.stringify(obj))
      this.$router.push({path:'/educator/profile',query:{str:str}})
    },
    viewRecruiterProfile(companyId,userId){
      let obj = {
        cid:companyId,
        uid:userId,
        identity:2
      }
      let str = encode(JSON.stringify(obj))
      this.$router.push({path:'/business/profile',query:{str:str}})
    },
    viewSchoolProfile(companyId,userId){
      let obj = {
        cid:companyId,
        uid:userId,
        identity:3
      }
      let str = encode(JSON.stringify(obj))
      this.$router.push({path:'/business/profile',query:{str:str}})
    },
    viewOtherProfile(companyId,userId){
      let obj = {
        cid:companyId,
        uid:userId,
        identity:4
      }
      let str = encode(JSON.stringify(obj))
      this.$router.push({path:'/business/profile',query:{str:str}})
    },
    viewVendorProfile(companyId,userId){
      let obj = {
        cid:companyId,
        uid:userId,
        identity:5
      }
      let str = encode(JSON.stringify(obj))
      this.$router.push({path:'/vendor/profile',query:{str:str}})
    },
    getUserAllInfo(){

      let params = {}

      USER_ALL_INFO(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          let educator = res.message.educator;
          let recruiter = res.message.recruiting;
          let school = res.message.school;
          let other = res.message.other;
          let vendor = res.message.vendor;

          if(educator){
            this.educatorUserData = educator
          }

          if(recruiter){
            this.recruiterUserData = recruiter
          }

          if(school){
            this.schoolUserData = school
          }

          if(other){
            this.otherUserData = other
          }
          if(vendor){
            this.vendorUserData = vendor
          }
        }

      }).catch(err=>{
        console.log(err)
      })

    }

  }
}
</script>

<style scoped>
.bg {
  background-color: #F0F2F5;
}

.account-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.account-l-container{

}

.account-r-container{
  width:calc(100% - 160px);
}

.account-r-container-bg{
  padding:30px 50px 50px 50px;
}

.account-container-1 {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.account-basic-info {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 18px;
  margin-right: 20px;
  margin-top: 20px;
}

.account-basic-info-label {
  font-size: 30px;
  font-family: BSemiBold, serif;
  color: #262626;
}

.account-basic-info-edit-btn {
  font-size: 20px;
  font-weight: 500;
  color: #6650B3;
  margin-left: 15px;
}
.account-basic-info-c-edit {

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
}

.account-basic-info-c {

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
}

.account-basic-info-c-l {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.account-basic-info-c-avatar {
  width: 100px;
  height: 100px;
  border-radius: 100px;
}
.account-basic-info-c-change-btn{
  font-size: 20px;
  color:#6650B3;
}
.account-basic-info-c-r {
  margin-left: 15px;
}

.account-basic-info-c-name {
  font-size: 26px;
  font-family: BarlowM, serif;
  font-weight: 500;
  color: #262626;
}

.account-basic-info-c-email {
  font-size: 23px;
  font-family: AssiRegular, serif;
  font-weight: 400;
  color: #262626;
}

.account-refer-container {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 18px;
  margin-right: 20px;
  margin-top: 20px;
}

.account-refer-label {
  font-size: 30px;
  font-family: BSemiBold, serif;
  color: #262626;
}

.account-refer-c {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
}

.account-refer-c-l {
  width: 310px;
  height: 50px;
}

/deep/ .account-refer-c-l .el-input__wrapper {
  height: 50px;
  border-radius: 50px;
}

.account-refer-c-r {

}

.account-refer-send-btn {
  margin-left: 15px;
  font-size: 25px;
  font-weight: 500;
  color: #262626;
}

.account-perks-container {
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 18px;
  margin-right: 20px;
  margin-top: 20px;
}

.account-perks-label {
  font-size: 30px;
  font-family: BSemiBold, serif;
  color: #262626;
}

.account-perks-tips {
  font-size: 23px;
  font-family: AssiRegular, serif;
  font-weight: 400;
  color: #262626;
  margin-top: 10px;
}

.account-perks-btn-container {
  font-size: 23px;
  font-family: AssiRegular, serif;
  font-weight: 400;
  color: #262626;
}

.account-perks-upgrade-btn {
  margin-top: 20px;
}

.account-container-2 {
  margin-top: 50px;
  position: relative;

}

.account-profile-container {
  background-color: #ffffff;
  padding: 20px 40px 80px 40px;
  border-radius: 18px;

}

.account-profile-label {
  font-size: 30px;
  font-family: BSemiBold, serif;
  font-weight: 600;
  color: #262626;
}

.account-profile-c {
  margin-top: 15px;
  height: 800px;
  overflow: auto;
}

.account-profile-c::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.account-profile-c {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}

.account-profile-c:hover::-webkit-scrollbar{
  width: 6px;
  display: inline;
}
.account-profile-c:hover::-webkit-scrollbar-thumb{
  /*滚动条里面小方块*/
  border-radius   : 6px;
  background-color: #cdbfff;
}
.account-profile-c:hover::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 6px;
}

.account-profile-c-item {
  margin-top: 30px;
}

.account-profile-c-item-t {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

}

.account-profile-c-item-l {

}

.account-profile-name {
  font-size: 26px;
  font-family: BarlowM, serif;
  font-weight: 500;
  color: #262626;
}

.account-profile-identity {
  font-size: 23px;
  font-family: AssiRegular, serif;
  font-weight: 400;
  color: #262626;
}

.account-profile-c-item-r {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

}

.account-profile-c-item-r-1 {
  font-size: 23px;
  font-family: AssiRegular, serif;
  font-weight: 400;
  color: #262626;
}

.account-profile-c-item-r-2 {
  margin-left: 25px;
}

.account-profile-c-item-r-3 {
  margin-left: 25px;
}

.account-profile-c-item-r-4 {
  margin-left: 25px;
}


.account-profile-c-item-r-2-btn {
  font-size: 20px;
}

.account-profile-c-item-r-3-btn {
  font-size: 20px;
}

.account-profile-c-item-r-4-btn {
  font-size: 20px;
  font-family: BCM, serif;
  color:#262626;

}

.account-profile-c-item-b {
  margin-top: 10px;
}

.account-add-profile {
  position: absolute;
  bottom: 20px;
  left:40px;
}

.account-add-profile-btn {
  font-size: 20px;
}

.account-first-last-name{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.account-first-name{
  flex:1;
}
.account-last-name{
  flex:1;
  margin-left: 20px;
}

.save-form-container{
  text-align: right;
}
.save-form-discard-btn{
  font-size:20px;
  color:#6650B3;
}
.save-form-save-btn{
  font-size:20px;
}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {


}

</style>
