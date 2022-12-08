<template>
  <div class="bg">
    <div class="account-container">
      <div class="account-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <el-scrollbar class="account-r-container">
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

              <div :class="editAccountStatus ? 'account-basic-info-c-edit' : 'account-basic-info-c'">

                <div class="account-basic-info-c-l">
                  <template v-if="identity == 1">
                    <el-avatar class="account-basic-info-c-avatar"
                               :src="headImgUrl ? headImgUrl : defaultAvatar "
                    ></el-avatar>
                  </template>
                  <template v-else>
                    <el-avatar class="account-basic-info-c-avatar"
                               :src="headImgUrl ? headImgUrl : '' "
                    ></el-avatar>
                  </template>

                  <el-upload
                      v-if="editAccountStatus"
                      class="profile-uploader"
                      action=""
                      :headers="uploadHeaders"
                      :show-file-list="false"
                      :http-request="profilePhotoHttpRequest"
                      :before-upload="beforeProfilePhotoUpload"
                  >
                    <el-button class="account-basic-info-c-change-btn" link>
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
                            <el-input size="small" v-model="basicForm.first_name" placeholder="First name"></el-input>
                          </el-form-item>
                        </div>

                        <div class="account-last-name">
                          <el-form-item label="Last name" prop="last_name">
                            <el-input size="small" v-model="basicForm.last_name" placeholder="Last name"></el-input>
                          </el-form-item>
                        </div>

                      </div>

                      <el-form-item label="E-mail address" prop="email">
                        <div class="xll-form-email-tips">(Editing this will change your login email)</div>
                        <el-input size="small" v-model="basicForm.email" placeholder="E-mail address"></el-input>
                      </el-form-item>


                      <el-form-item label="Birth date" prop="birthday">
                        <el-date-picker
                            size="small"
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
                        <el-select v-model="basicForm.sex" size="small" placeholder="Select one">
                          <el-option v-for="(item,i) in sexOptions" :key="i"
                                     :label="item.object_en"
                                     :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="Password">
                        <el-button plain round @click="resetPassword()">
                          RESET PASSWORD
                        </el-button>
                      </el-form-item>

                      <ForgotPassword :isShow="forgotDialogVisible" @close="closeForgotDialog()"></ForgotPassword>

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

<!--            <div class="account-refer-container">-->
<!--              <div class="account-refer-label">-->
<!--                Refer someone you know & earn credits-->
<!--              </div>-->
<!--              <div class="account-refer-c">-->
<!--                <div class="account-refer-c-l">-->
<!--                  <el-input class="account-refer-c-l-input" size="default"-->
<!--                            placeholder="Email address of someone you know"></el-input>-->
<!--                </div>-->
<!--                <div class="account-refer-c-r">-->
<!--                  <el-button class="account-refer-send-btn" link>-->
<!--                    SEND-->
<!--                  </el-button>-->
<!--                </div>-->

<!--              </div>-->

<!--            </div>-->

            <div class="account-perks-container">
              <div class="account-perks-label">
                Get the best perks
              </div>
              <div class="account-perks-tips">
                Check our plans to save more
              </div>
              <div class="account-perks-btn-container">
                <el-button class="account-perks-upgrade-btn"
                           @click="upgrade()"
                           type="primary" round>
                  UPGRADE
                </el-button>
              </div>
            </div>

          </div>
          <div class="account-container-2">
            <div class="account-profile-container">

              <div class="account-profile-t">

                <div class="account-profile-label">
                  Your profiles
                </div>
                <div class="account-add-profile">
                  <el-button class="account-add-profile-btn" type="primary" round
                             @click="turnAddProfile()"
                  >
                    ADD PROFILE
                  </el-button>
                </div>

              </div>

              <el-scrollbar class="account-profile-c"
                            ref="switchAccountScroll"
                            max-height="400px">
                <div class="account-profile-c-item"
                     v-for="(item,i) in companyData" :key="i"
                >
                  <div class="account-profile-c-item-t">
                    <div class="account-profile-c-item-l">
                      <div class="account-profile-name">
                          <span v-if="item.identity == 1">
                            {{item.name ? item.name : 'Unknown'}}
                          </span>
                        <span v-else>
                            {{item.company_name ? item.company_name : 'Unknown'}}
                          </span>
                        <el-tag type="success"
                                style="margin-left: 10px;"
                                v-if="item.identity == identity && item.id == currentCompanyId">
                          current
                        </el-tag>
                      </div>
                      <div class="account-profile-identity">
                        <span v-if="item.identity == 1">Educator</span>
                        <span v-if="item.identity == 2">Recruiter</span>
                        <span v-if="item.identity == 3">School</span>
                        <span v-if="item.identity == 4">Other</span>
                        <span v-if="item.identity == 5">Vendor</span>
                      </div>

                    </div>

                    <div class="account-profile-c-item-b-mobile">
                      <el-progress :text-inside="false" :stroke-width="3"
                                   :percentage="item.completion <= 100 ? item.completion : 100"/>
                    </div>

                    <div class="account-profile-c-item-r">
                      <div class="account-profile-c-item-r-1">
                        <span v-if="item.identity == 1">Complete at least 80% of your profile to apply jobs</span>
                        <span v-if="item.identity == 2">Complete at least 60% of your profile to post jobs</span>
                        <span v-if="item.identity == 3">Complete at least 60% of your profile to post jobs</span>
                        <span v-if="item.identity == 4">Complete at least 60% of your profile to post jobs</span>
                        <span v-if="item.identity == 5">Complete at least 60% of your profile to offer a deal or post event</span>
                      </div>
                      <div class="account-profile-c-item-r-mobile">
                        <div class="account-profile-c-item-r-2">
                          <el-button
                              v-if="item.identity == 1"
                              class="account-profile-c-item-r-2-btn"
                              @click="searchJobs()"
                              :disabled="item.identity != identity || item.id != currentCompanyId"
                              type="primary" round>
                            SEARCH JOBS
                          </el-button>
                          <el-button
                              v-if="item.identity == 2  || item.identity == 3 || item.identity == 4"
                              class="account-profile-c-item-r-2-btn"
                              :disabled="item.identity != identity || item.id != currentCompanyId || item.completion < 60"
                              @click="postJob()"
                              type="primary" round>
                            POST A JOB
                          </el-button>
                          <el-button
                              v-if="item.identity == 5"
                              class="account-profile-c-item-r-2-btn"
                              :disabled="item.identity != identity || item.id != currentCompanyId || item.completion < 60"
                              @click="postDeal()"
                              type="primary" round>
                            OFFER A Deal
                          </el-button>

                        </div>
                        <div class="account-profile-c-item-r-3">

                          <template v-if="item.identity == identity && item.id == currentCompanyId">
                            <el-button
                                class="account-profile-c-item-r-3-btn"
                                @click="editUserProfile(item.id,item.identity)"
                                plain round>
                              EDIT
                            </el-button>
                          </template>
                          <template v-else>
                            <el-button
                                class="account-profile-c-item-r-3-btn"
                                @click="makeCurrent(item.id,item.identity,2)"
                                plain round>
                              MAKE CURRENT
                            </el-button>
                          </template>

                        </div>
                        <div class="account-profile-c-item-r-4"
                             v-if="item.identity == identity && item.id == currentCompanyId">
                          <el-dropdown :hide-on-click="false" trigger="click">
                          <span class="account-profile-c-item-r-4-btn">
                            MORE
                            <el-icon class="el-icon--right">
                              <arrow-down />
                            </el-icon>
                          </span>
                            <template #dropdown>
                              <el-dropdown-menu >
                                <el-dropdown-item>
                                  <el-button link @click="viewUserProfile(item.id,item.user_id,item.identity)">
                                    VIEW PROFILE
                                  </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item v-if="item.identity != 1">
                                  <el-button link @click="showContributorDialog(item.id,item.user_id,item.identity)">
                                    ADD A CONTRIBUTOR
                                  </el-button>
                                </el-dropdown-item>
<!--                                <el-dropdown-item v-if="item.identity == 3">-->
<!--                                    &lt;!&ndash;                                  CONVERT TO A RECRUITER&ndash;&gt;-->
<!--                                  <el-button link @click="schoolConvertToRecruiter(item.id,item.user_id,item.identity)">-->
<!--                                    COPY AS A RECRUITER-->
<!--                                  </el-button>-->
<!--                                </el-dropdown-item>-->
                                <el-dropdown-item >
                                  <el-popconfirm
                                      title="Are you sure to delete this?"
                                      @confirm="removeProfile(item.id, item.identity)"
                                  >
                                    <template #reference>
                                      <el-button link>REMOVE</el-button>
                                    </template>
                                  </el-popconfirm>

                                </el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>

                        </div>
                      </div>

                    </div>

                  </div>

                  <div class="account-profile-c-item-b">
                    <el-progress :text-inside="false" :stroke-width="3"
                                 :percentage="item.completion <= 100 ? item.completion : 100"/>
                  </div>

                  <div v-if="i===0">
                    <el-row :gutter="50" justify="space-between" align="middle"
                            style="margin-top:15px;"
                            v-for="(item,i) in assignUserData" :key="i">
                      <el-col :span="16">
                        <div class="admin-item-container">
                          <div class="admin-item-img-container">
                            <el-avatar class="admin-item-img"
                                      :src="item.headimgurl ? item.headimgurl : defaultAvatar ">
                            </el-avatar>
                          </div>
                          <div class="admin-item-r-container">
                            <div class="admin-item-name">{{ item.first_name }} {{ item.last_name }}</div>
                            <div class="admin-item-role">
                              <template v-if="item.identity === 1">Educator</template>
                              <template v-if="item.identity === 2">Recruiter</template>
                              <template v-if="item.identity === 3">School</template>
                              <template v-if="item.identity === 4">Other</template>
                              <template v-if="item.identity === 5">Vendor</template>
                            </div>
                          </div>

                        </div>
                      </el-col>
                      <el-col :span="8" class="admin-item-btn-container">
                        <el-button plain round class="admin-item-btn"
                                   @click="editAdmin(item)"
                        >
                          EDIT PERMISSIONS
                        </el-button>
                        <el-button link round class="admin-item-btn">
                          DELETE
                        </el-button>
                      </el-col>
                    </el-row>
                  </div>

                </div>

              </el-scrollbar>
            </div>



          </div>

        </div>

      </el-scrollbar>

    </div>

    <el-dialog :width="contributorWidth" v-model="contributorDialogVisible">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h3 :id="titleId" :class="titleClass">Add a contributor for columbia University</h3>
        </div>
      </template>
      <div class="xll-contributor-tips">
        Contributors are allowed to act on behalf of your profile, depending on permissions you have granted to them.
      </div>
      <div class="xll-contributor-c-margin">
        <el-form
            ref="contributorForms"
            :model="contributorForm"
            :rules="contributorRules"
            label-position="top"
            class="xll-contributor-c"
        >
          <div class="xll-contributor-c-l">
            <el-form-item label="E-mail address of a contributor" prop="email">
              <el-input v-model="contributorForm.email" placeholder="One email per invitation"></el-input>
            </el-form-item>
          </div>
          <div class="xll-contributor-c-r">
            <el-form-item label="Select permissions">

              <template v-if="identity == 3">
                <div class="qx-checked-container">
                  <div class="qx-checked-item" v-for="(item,i) in contributorMenuData" :key="i"
                       @click="menuItemSelected(item)"
                  >
                    <div class="qx-checked-square"
                         :class="sMenuItemData.indexOf(item.id) == -1 ? '' : 'qx-checked-square-active' "
                    ></div>
                    <div class="qx-checked-label">{{ item.menu_name_en }}</div>
                  </div>

                </div>
              </template>

            </el-form-item>
          </div>
        </el-form>

      </div>

      <template #footer>
      <span class="dialog-footer">
        <el-button plain round @click="contributorDialogVisible = false">Cancel</el-button>
        <el-button type="primary" round @click="addMenu('contributorForms')" >
          SEND AN INVITATION
        </el-button>
      </span>
      </template>

    </el-dialog>

    <el-dialog v-model="contributorUpdateDialogVisible">
      <template #header="{ titleId, titleClass }">
        <div class="my-header">
          <h3 :id="titleId" :class="titleClass">
            Edit permissions for {{contributorUpdateItemData.first_name}} {{contributorUpdateItemData.last_name}}
          </h3>
        </div>
      </template>

      <div class="xll-contributor-c-update-container">
        <div class="xll-contributor-c-avatar">
          <el-avatar class="admin-item-img"
                     :src="contributorUpdateItemData.headimgurl ? contributorUpdateItemData.headimgurl : defaultAvatar ">
          </el-avatar>
        </div>
        <div class="xll-contributor-c-form">
          <el-form
              ref="contributorForms"
              :model="contributorForm"
              :rules="contributorRules"
              label-position="top"
          >

            <el-form-item label="E-mail address of a contributor" prop="email">
              <el-input v-model="contributorForm.email" placeholder="One email per invitation"></el-input>
            </el-form-item>

            <el-form-item label="Select permissions">

              <template v-if="identity == 3">
                <div class="qx-checked-container">
                  <div class="qx-checked-item" v-for="(item,i) in contributorMenuData" :key="i"
                       @click="menuItemSelected(item)"
                  >
                    <div class="qx-checked-square"
                         :class="sMenuItemData.indexOf(item.id) == -1 ? '' : 'qx-checked-square-active' "
                    ></div>
                    <div class="qx-checked-label">{{ item.menu_name_en }}</div>
                  </div>

                </div>
              </template>

            </el-form-item>

          </el-form>

        </div>

      </div>

      <template #footer>
      <span class="dialog-footer">
        <el-button plain round @click="contributorUpdateDialogVisible = false">Cancel</el-button>
        <el-button type="primary" round @click="updateMenu('contributorForms')" >
          UPDATE
        </el-button>
      </span>
      </template>

    </el-dialog>

    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUpload()"></xllLoading>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default/avatar.png'

import meSideMenu from "@/components/meSideMenu";
import ForgotPassword from '@/components/forgotPassword'

import {
  USER_INFO_BY_TOKEN_V2,
  USER_CONTACT_EDIT_V2,
  UPLOAD_BY_ALI_OSS,
  UPLOAD_BY_SERVICE,
  USER_ALL_INFO,
  SWITCH_IDENTITY_V2,
  USER_ADMIN_DELETE,
  USER_ADMIN_MENU_INFO,
  USER_MENU_DELETE,
  USER_ADD_MENU,
  USER_MENU_LIST,
  ALL_MENU_LIST, ALL_ASSIGN_USERS, DELETE_USER_PROFILE, SCHOOL_CONVERT_TO_RECRUITER
} from '@/api/api'

import xllLoading from '@/components/xllLoading'

import {useStore} from "vuex";
import {ref,reactive} from "vue";
import ImageCompressor from "compressorjs";
import {encode} from "js-base64";
import {randomString} from "@/utils";
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "accountHome",
  components: {
    meSideMenu,
    xllLoading,
    ForgotPassword
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
      sex: '',
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

    // const currentCompanyId = ref( localStorage.getItem('company_id'))

    // const identity = ref(localStorage.getItem('identity'))

    const contributorForms = ref(null)

    const contributorForm = reactive({
      email:''
    })

    const contributorRules = reactive({
      email: [
        {
          required: true,
          message: 'One email per invitation',
          trigger: 'blur',
        }
      ],
    })

    return {
      // identity,
      setIdentity,
      submitLoadingValue,
      basicForm,
      basicForms,
      basicRules,
      birthdayDisabledDate,
      editAccountStatus,
      contributorForms,
      contributorForm,
      contributorRules

    }

  },
  watch:{
    currentCompanyId(newValue){
      console.log(newValue)
      if(newValue){
        this.getUserAllInfo()
      }
    },
    identity(newValue){
      console.log(newValue)
    }
  },
  computed:{
    currentCompanyId:{
      get(){
        return this.$store.state.currentCompanyId
      }
    },
    identity:{
      get(){
        return this.$store.state.identity
      }
    }

  },
  data() {
    return {
      defaultAvatar,
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
          object_en: 'Non-binary',
          object_cn:'非二元人'
        },
        {
          value: 4,
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
      currentProfileData:[],
      companyData:[],
      contributorDialogVisible:false,

      contributorMenuData:[],
      contributorCompanyId: 0,
      contributorIdentity:0,
      contributorUserId:0,

      sMenuItemData: [],
      email:'',
      addLoading:false,
      action:'',
      deleteLoading:false,
      assignUserData:[],

      contributorUpdateDialogVisible:false,
      contributorUpdateItemData:{},
      versionTime:randomString(),

      forgotDialogVisible:false,

      contributorWidth:'50%',

    }
  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  async mounted() {

    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      updateWindowHeight()
      this.contributorWidth = '80%'
    }

    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        updateWindowHeight()
        this.contributorWidth = '80%'
      }
    }

    this.getUserInfo()
    this.getUserAllInfo()
    this.getAllAssignUsers()

  },
  methods: {
    resetPassword(){
      this.forgotDialogVisible = true;
    },
    closeForgotDialog() {
      this.forgotDialogVisible = false
    },
    upgrade(){
      this.$router.push('/perks/home')
    },
    searchJobs(){
      this.$router.push('/jobs')
    },
    postJob(){
      this.$router.push({path:'/jobs/post',query:{version_time:this.versionTime}})
    },
    postDeal(){
      this.$router.push({path:'/deals/offer',query:{}})
    },
    getAllAssignUsers() {
      let params = {}
      ALL_ASSIGN_USERS(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.assignUserData = res.message
        }
      }).catch(err => {
        console.log(err)
      })
    },
    editAccount(){
      let userContact = this.userContact;
      this.editAccountStatus = true;
      this.basicForm.first_name = userContact.first_name;
      this.basicForm.last_name = userContact.last_name;
      this.basicForm.email = userContact.email;
      this.basicForm.birthday = userContact.birthday;
      if(userContact.sex){
        this.basicForm.sex = userContact.sex;
      }

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
    editUserProfile(companyId,roleValue){
      if(roleValue == 1){
        let strObj = {
          i:1,
          action:'edit'
        }
        let str = encode(JSON.stringify(strObj))
        this.$router.push({path:'/educator/edit/home',query:{s:str}})
      }
      if(roleValue == 2){
        let strObj = {
          cid:companyId,
          action:'edit'
        }
        let str = encode(JSON.stringify(strObj))
        this.$router.push({path:'/business/edit/recruiter',query:{s:str}})
      }
      if(roleValue == 3){
        let strObj = {
          cid:companyId,
          action:'edit'
        }
        let str = encode(JSON.stringify(strObj))
        this.$router.push({path:'/business/edit/school',query:{s:str}})
      }
      if(roleValue == 4){
        let strObj = {
          cid:companyId,
          action:'edit'
        }
        let str = encode(JSON.stringify(strObj))
        this.$router.push({path:'/business/edit/other',query:{s:str}})
      }
      if(roleValue == 5){
        let strObj = {
          cid:companyId,
          action:'edit'
        }
        let str = encode(JSON.stringify(strObj))
        this.$router.push({path:'/vendor/edit/vendor',query:{s:str}})

      }
    },
    removeProfile(companyId, identity){
      let params = {
        company_id: companyId,
        identity: identity
      }
      DELETE_USER_PROFILE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.getUserAllInfo()
          this.$store.commit('allIdentityChanged',true )
          this.getAllAssignUsers()
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    viewUserProfile(companyId,userId,roleValue){
      if(roleValue == 1){
        let obj = {
          cid:companyId,
          uid:userId,
          identity:1
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path:'/educator/profile',query:{str:str}})
      }
      if(roleValue == 2){
        let obj = {
          cid:companyId,
          uid:userId,
          identity:2
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path:'/business/profile',query:{str:str}})
      }
      if(roleValue == 3){
        let obj = {
          cid:companyId,
          uid:userId,
          identity:3
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path:'/business/profile',query:{str:str}})
      }
      if(roleValue == 4){
        let obj = {
          cid:companyId,
          uid:userId,
          identity:4
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path:'/business/profile',query:{str:str}})
      }
      if(roleValue == 5){
        let obj = {
          cid:companyId,
          uid:userId,
          identity:5
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path:'/vendor/profile',query:{str:str}})
      }
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

          let currentCompanyId = this.currentCompanyId;
          let companyData = []

          if(educator){

            for (let i=0;i<educator.length;i++)
            {
               educator[i]['identity'] = 1
            }

            companyData = companyData.concat(educator)

          }

          if(recruiter){

            for(let i=0;i<recruiter.length;i++){
               recruiter[i]['identity'] = 2
            }
            companyData = companyData.concat(recruiter)

          }

          if(school){

            for(let i=0;i<school.length;i++){
              school[i]['identity'] = 3
            }

            companyData = companyData.concat(school)

          }

          if(other){
            for(let i=0;i<other.length;i++){
              other[i]['identity'] = 4
            }

            companyData = companyData.concat(other)

          }
          if(vendor){
            for(let i=0;i<vendor.length;i++){
              vendor[i]['identity'] = 5
            }
            companyData = companyData.concat(vendor)

          }

          let index = companyData.findIndex(item=>item.id == currentCompanyId && item.identity == this.identity)
          if(index){
            let first = companyData.splice(index,1)[0];
            companyData.unshift(first)
          }
          // console.log(companyData)
          this.companyData = companyData

        }

      }).catch(err=>{
        console.log(err)
      })

    },
    makeCurrent(companyId,identity,language){
      let params = {
        company_id: companyId,
        language: language,
        identity: identity
      }

      SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

          this.currentCompanyId = companyId;

          this.$store.commit('currentCompanyId',companyId )
          this.$store.commit('allIdentityChanged',true )

          localStorage.setItem('company_id',companyId)
          localStorage.setItem('identity', identity)

          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData',str)

          this.$store.commit('identity', identity)
          this.$store.commit('menuData', res.message)
          this.getUserAllInfo()
          this.getAllAssignUsers()

          this.$refs.switchAccountScroll.setScrollTop(0)

          this.$loading().close()
        }
      }).catch(err => {
        console.log(err)
        this.$loading().close()
        this.$message.error(err.msg)
      })
    },
    deleteUserMenu(){
      let self = this;
      this.deleteLoading = true;
      let uid = this.$route.query.uid
      let companyId = this.$route.query.cId

      let params = {
        user_id:uid,
        identity:self.identity,
        company_id:companyId
      }

      USER_ADMIN_DELETE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.deleteLoading = false;
          this.$router.push({path:'/overview',query:{identity:self.identity}})
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    async getUserAdminMenuList(uid,identity,companyId){
      let params = {
        user_id:uid,
        identity:identity,
        company_id:companyId
      }

      await USER_ADMIN_MENU_INFO(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          let resData = res.message;
          resData.forEach(item=>{
            this.sMenuItemData.push( Number(item.menu_id) )
          })

          // console.log(this.sMenuItemData)
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    addMenu(formName) {

      let identity = this.contributorIdentity;
      let companyId = this.contributorCompanyId;
      let sMenuData = this.sMenuItemData;

      if(sMenuData.length<=0){
        this.$message.warning('Choose what the added user will have access to')
        return;
      }

      this.addLoading = true;

      this.$refs[formName].validate((valid) => {

        if (valid) {

          let params = Object.assign({
            identity:identity,
            company_id: companyId,
            menu_id:sMenuData.join(',')
          },this.contributorForm)

          USER_ADD_MENU(params).then(res=>{
            console.log(res)
            if(res.code == 200){
              this.addLoading =false;
              this.contributorDialogVisible = false;
              this.getAllAssignUsers()

              this.$message.success('Success ')
              // this.$router.push({path:'/overview',query:{identity:identity}})
            }
          }).catch(err=>{
            console.log(err)
            this.$message.error(err.msg)

            this.addLoading = false;
            // this.contributorDialogVisible = false;
          })

        } else {
          this.addLoading = false;
          // this.contributorDialogVisible = false;
          console.log('error submit!!')
          return false
        }
      })

    },
    updateMenu(formName){

      let sMenuData = this.sMenuItemData;
      let identity = this.identity;
      let currentCompanyId = this.currentCompanyId;
      let userId = this.contributorUserId;

      if(sMenuData.length<=0){
        this.$message.warning('Choose what the added user will have access to')
        return;
      }

      this.addLoading = true;

      this.$refs[formName].validate((valid) => {

        if (valid) {

          let params = Object.assign( {
            user_id: userId,
            identity:identity,
            company_id: currentCompanyId,
            menu_id:sMenuData.join(',')
          }, this.contributorForm)

          USER_MENU_DELETE({
            user_id: Number(userId),
            company_id: Number(currentCompanyId)
          }).then(res=>{
            console.log(res)
            if(res.code == 200){
              params =  {
                user_id:userId,
                identity:identity,
                company_id: currentCompanyId,
                menu_id:sMenuData.join(',')
              }

              USER_ADD_MENU(params).then(res=>{
                console.log(res)
                if(res.code == 200){
                  this.addLoading =false;
                  this.contributorUpdateDialogVisible = false;
                  this.getAllAssignUsers()

                  this.$message.success('Success ')

                }
              }).catch(err=>{
                console.log(err)
                this.addLoading = false;
              })

            }
          }).catch(err=>{
            console.log(err)
          })

        } else {
          this.addLoading = false;
          // this.contributorDialogVisible = false;
          console.log('error submit!!')
          return false
        }
      })


    },
    menuItemSelected(item) {
      // console.log(item)
      let sMenuItemData = this.sMenuItemData;
      let index = sMenuItemData.indexOf(item.id);
      if (index === -1) {
        this.sMenuItemData.push(item.id)
      } else {
        this.sMenuItemData.splice(index, 1)
      }
      console.log(this.sMenuItemData)
    },
    getUserMenuList(){
      let self = this;
      let params = {
        user_id:localStorage.getItem('uid'),
        identity:self.identity,
        company_id:localStorage.getItem('company_id'),
        create_user_id: localStorage.getItem('uid'),
        page:1,
        limit:1000
      }
      USER_MENU_LIST(params).then(res=>{
        // console.log(res)
        if(res.code === 200){
          let pcAllData = res.message.pc;
          if(self.identity == 1){
            this.educatorMenuData = pcAllData

          }
          if(self.identity == 2){
            this.recruiterMenuData = pcAllData

          }
          if(self.identity == 3){
            this.schoolMenuData = pcAllData

          }
          if(self.identity == 4){
            this.otherMenuData = pcAllData

          }

          if(self.identity == 5){
            this.vendorMenuData = pcAllData
          }

        }
      }).catch(err=>{
        console.log(err)
      })
    },
    schoolConvertToRecruiter(id,uid,identity){

      let params = {
        school_id:id,
        user_id: uid,
        identity: identity

      }

      SCHOOL_CONVERT_TO_RECRUITER(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.getUserAllInfo()
          this.$message.success('Success')
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    showContributorDialog(companyId,userId,i){
      this.contributorDialogVisible = true;
      this.contributorCompanyId = companyId;
      this.contributorIdentity = i;
      this.contributorUserId = userId;

      let params = {}

      ALL_MENU_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          let resData = res.message

          let educatorMenuData = resData.educator
          let recruiterMenuData = resData.recruiting
          let schoolMenuData = resData.school
          let otherMenuData = resData.other
          let vendorMenuData = resData.vendor

          if(i == 1){
            this.contributorMenuData = educatorMenuData
          }
          if(i == 2){
            this.contributorMenuData = recruiterMenuData
          }
          if(i == 3){
            this.contributorMenuData = schoolMenuData
          }
          if(i == 4){
            this.contributorMenuData = otherMenuData
          }
          if(i == 5){
            this.contributorMenuData = vendorMenuData
          }

        }
      }).catch(err => {
        console.log(err)
      })
    },
    editAdmin(item){
      this.contributorUpdateItemData = item;
      this.contributorUpdateDialogVisible = true;
      this.contributorForm.email = item.email;
      this.contributorUserId = item.id;

      let i = this.identity;
      let currentCompanyId = this.currentCompanyId;
      let params = {};

      ALL_MENU_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          let resData = res.message

          let educatorMenuData = resData.educator
          let recruiterMenuData = resData.recruiting
          let schoolMenuData = resData.school
          let otherMenuData = resData.other
          let vendorMenuData = resData.vendor

          if(i == 1){
            this.contributorMenuData = educatorMenuData
          }
          if(i == 2){
            this.contributorMenuData = recruiterMenuData
          }
          if(i == 3){
            this.contributorMenuData = schoolMenuData
          }
          if(i == 4){
            this.contributorMenuData = otherMenuData
          }
          if(i == 5){
            this.contributorMenuData = vendorMenuData
          }

          let params = {
            user_id: item.id,
            identity: i,
            company_id: currentCompanyId
          }

          USER_ADMIN_MENU_INFO(params).then(res=>{
            console.log(res)
            if(res.code == 200){
              let resData = res.message;
              resData.forEach(item=>{
                this.sMenuItemData.push( Number(item.menu_id) )
              })

              // console.log(this.sMenuItemData)
            }
          }).catch(err=>{
            console.log(err)
          })


        }
      }).catch(err => {
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
  height: calc(100vh - 140px);
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
  width: 490px;
  padding: 20px;
  border-radius: 18px;
  margin-right: 20px;
  margin-top: 20px;
}

.account-basic-info-label {
  font-size: 30px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
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
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #262626;
}

.account-basic-info-c-email {
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
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
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
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
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
}

.account-perks-tips {
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 400;
  color: #262626;
  margin-top: 10px;
}

.account-perks-btn-container {
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
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
  padding: 40px;
  border-radius: 18px;

}

.account-profile-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.account-profile-label {
  font-size: 30px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  color: #262626;
}

.account-add-profile {
  text-align: right;
}

.account-add-profile-btn {
  font-size: 20px;
}


.account-profile-c {
  margin-top: 15px;

  /*height: 800px;*/
  /*overflow: auto;*/
}

.account-profile-c-item {
  margin: 30px 0;
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
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 500;
  color: #262626;
}

.account-profile-identity {
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
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
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 400;
  color: #262626;
}
.account-profile-c-item-r-mobile{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
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

.account-profile-c-item-r-4-btn {
  font-size: 20px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color:#262626;
  cursor: pointer;
}

.account-profile-c-item-b {
  margin-top: 10px;
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

.xll-contributor-tips{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color:#262626;
}
.xll-contributor-c-margin{
  margin-top: 25px;
}

.xll-contributor-c{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.xll-contributor-c-l{
  width:45%;
}

.xll-contributor-c-r{
  width:45%;
}

.qx-container {
  margin-top: 60px;
}

.add-agent-btn-container {
  text-align: right;
  margin-top: 20px;
}

.qx-checked-container {

}

.qx-checked-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
}

.qx-checked-square {
  border: 1px solid #808080;
  width: 14px;
  height: 14px;
  border-radius: 2px;
  cursor: pointer;
}

.qx-checked-label{
  text-align: left;
  margin-left: 10px;
}

.qx-done-btn-container {
  text-align: right;
  margin-top: 20px;
}

.qx-checked-square-active {
  background-color: #6650B3;
}


.admin-item-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}

.admin-item-img-container {
  width:60px;
  height: 60px;
  border: 1px solid #EEEEEE;
  border-radius: 80px;
  overflow: hidden;
}

.admin-item-img {
  width: 100%;
}
.admin-item-r-container{
  padding-left: 10px;
  text-align: left;
}
.admin-item-name {
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #262626;
}

.admin-item-role {
  font-family: AssiRegular, serif;
  font-size: 18px;
  color: #262626;
}

.admin-item-btn-container{
  text-align: right;
}

.admin-item-btn{
  font-size:20px;
}

.xll-contributor-c-update-container{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

}

.xll-contributor-c-avatar{
  padding:0 20px;
}

.xll-contributor-c-form{
  padding:0 20px;
}

.xll-form-email-tips{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
}

@media screen and (min-width: 769px) {
  .account-profile-c-item-b-mobile{
    display: none;
  }
}

@media screen and (max-width: 768px) {

  .account-profile-c-item-b{
    display: none;
  }

  .account-profile-c-item-b-mobile{
    width: 100%;
    margin-top: 15px;
  }

  .account-r-container{
    width: 100%;
    height: calc( var(--i-window-height) - 160px);

    /*height: calc(100vh - 160px);*/
  }

  .account-r-container-bg{
    padding: 0;
  }

  .account-basic-info-c-edit{
    min-width: 300px;
  }

  .save-form-discard-btn{
    font-size: 12px;
  }

  .save-form-save-btn{
    font-size: 12px;
  }

  .account-basic-info{
    margin: 15px;
    padding: 15px;
  }

  .account-basic-info-label{
    font-size: 18px;
  }

  .account-basic-info-c{
    margin-top: 15px;
  }

  .account-basic-info-edit-btn{
    font-size: 12px;
  }
  .account-basic-info-c-avatar{
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }

  .account-basic-info-c-name{
    font-size: 16px;
  }

  .account-basic-info-c-email{
    font-size: 16px;
  }

  .account-container-1{
    flex-wrap: nowrap;
    overflow: scroll;
  }

  .account-perks-container{
    flex-shrink: 0;
    margin: 15px;
    padding: 15px;
  }

  .account-perks-label{
    font-size: 18px;
  }

  .account-perks-tips{
    font-size: 16px;
  }

  .account-container-2{
    margin-top: 15px;
  }

  .account-profile-label{
    font-size: 20px;
  }

  .account-profile-container{
    padding: 0;
    background-color: #F0F2F5;
  }

  .account-profile-t{
    padding: 0 15px ;
  }

  .account-add-profile{
    /*display: none;*/
  }

  .account-add-profile-btn{
    font-size: 12px;
  }

  .account-profile-c-item{
    background-color: #FFFFFF;
    padding: 15px;
    border-radius: 18px;
    margin: 15px;
  }

  .account-profile-c-item-t{
    flex-direction: column;
  }

  .account-profile-c-item-l{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .account-profile-c-item-r{
    flex-direction: column;
  }

  .account-profile-name{
    font-size: 18px;
  }

  .account-profile-identity{
    font-size: 12px;
  }

  .account-profile-c-item-r-1{
    font-size: 16px;
    margin-top: 10px;
  }

  .account-profile-c-item-r-mobile{
    width: 100%;
    margin-top: 10px;
    justify-content: space-between;
  }

  .account-profile-c-item-r-2{
    margin-left: 0;
  }
  .account-profile-c-item-r-3{
    margin-left: 0;
  }

  .account-profile-c-item-r-4{
    margin-left: 0;
  }


  .xll-contributor-tips{
    font-size: 18px;
  }

  .xll-contributor-c{
    flex-direction: column;
  }

  .xll-contributor-c-l{
    width: 100%;
  }
  .xll-contributor-c-r{
    width: 100%;
  }




}

</style>
