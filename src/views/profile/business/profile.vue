<template>
  <div class="bg">
    <div class="educator-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

          <accountInfo :info="businessInfo" :phone="basicUserInfo.phone"></accountInfo>

          <div class="educator-r-container">
            <div class="basic-info-container">
              <div class="basic-info-t">
                <div class="basic-info-label">
                  <div class="basic-info-label-text">Your Basic Info</div>
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
                  First & Last Name: <span>{{ businessInfo.first_name }} {{ businessInfo.last_name }}</span>
                </div>
                <div class="basic-info-item" v-if="businessInfo.contact_phone">
                  Contact Phone #: <span>{{ businessInfo.contact_phone }}</span>
                </div>
                <div class="basic-info-item" v-if="businessInfo.wx_id">
                  Wechat ID: <span>{{ businessInfo.wx_id }}</span>
                </div>
                <div class="basic-info-item" v-if="basicUserInfo.sex">
                  Gender:
                  <span v-if="basicUserInfo.sex == 1">Male</span>
                  <span v-if="basicUserInfo.sex == 2">Female</span>
                  <span v-if="basicUserInfo.sex == 3">No Gender Requirements</span>

                </div>
                <div class="basic-info-item" v-if="businessInfo.nationality">
                  Nationality: <span>{{ businessInfo.nationality }}</span>
                </div>
                <div class="basic-info-item" v-if="businessInfo.job_title">
                  Job Title: <span>{{ businessInfo.job_title }}</span>
                </div>
                <div class="basic-info-item" v-if="businessInfo.bio">
                  Short Bio: <span>{{ businessInfo.bio }}</span>
                </div>
                <!--                <div class="basic-info-item">-->
                <!--                  Location: <span>shangqiu, shangqiu , henan</span>-->
                <!--                </div>-->
                <div class="basic-info-item" v-if="businessInfo.business_type_name">
                  Business Category: <span>{{ businessInfo.business_type_name }}</span>
                </div>

              </div>
            </div>

            <div class="languages-container">
              <div class="languages-t">
                <div class="languages-label">
                  <div class="languages-label-text">Languages</div>
                  <div class="profile-underline-1"></div>
                </div>
                <div class="languages-edit" @click="editLanguages()">
                  <el-icon :size="18">
                    <edit/>
                  </el-icon>
                </div>
              </div>
              <div class="languages-content" v-if="businessInfo.languages">
                <div class="languages-item" v-for="(item,i) in businessInfo.languages" :key="i">
                  <div class="languages-item-l">{{ item.object_en }}</div>
                  <div class="languages-item-r">
                    <el-rate
                        v-model="item.object_score"
                        disabled
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    >
                    </el-rate>
                  </div>
                </div>
              </div>
            </div>

            <div class="business-info-container">
              <div class="business-info-t">
                <div class="business-info-label">
                  <div class="business-info-label-text">Business Information</div>
                  <div class="profile-underline-2"></div>
                </div>
                <div class="business-info-edit" @click="editBusinessInfo()">
                  <el-icon :size="18">
                    <edit/>
                  </el-icon>
                </div>
              </div>

              <div class="business-info-content">
                <div class="business-info-logo-name-container">
                  <div class="business-info-logo">
                    <el-upload
                        class="logo-uploader"
                        :action="uploadActionUrl"
                        :headers="uploadHeaders"
                        :data="uploadData"
                        :show-file-list="false"
                        name="file[]"
                        :on-success="handleLogoPhotoSuccess"
                        :before-upload="beforeLogoPhotoUpload"
                    >
                      <el-image v-if="logoPhotoUrl" :src="logoPhotoUrl" class="logo-avatar"></el-image>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>
                  <div class="business-info-name" v-if="businessInfo.business_name">
                    {{ businessInfo.business_name }}
                  </div>
                </div>
                <div class="business-info-item" v-if="businessInfo.business_name">
                  Business Name: <span>{{ businessInfo.business_name }} </span>
                </div>
                <div class="business-info-item" v-if="businessInfo.business_bio">
                  Business Introduction #: <span>{{ businessInfo.business_bio }}</span>
                </div>
                <div class="business-info-item" v-if="businessInfo.year_founded ">
                  Year Founded: <span>{{ businessInfo.year_founded }}</span>
                </div>
                <div class="business-info-item"
                     v-if="businessInfo.provinces && businessInfo.citys && businessInfo.districts"
                >
                  Business Location:
                  <span>{{ businessInfo.provinces.Pinyin }}, {{ businessInfo.citys.Pinyin }}, {{ businessInfo.districts.Pinyin }}</span>
                </div>
                <div class="business-info-item" v-if="businessInfo.website">
                  Website: <span>{{ businessInfo.website }}</span>
                </div>
                <div class="business-info-item" v-if="businessInfo.business_phone">
                  Business Phone #: <span>{{ businessInfo.business_phone }}</span>
                </div>
                <div class="business-info-item">
                  Currently Hiring:
                  <el-switch v-model="businessInfo.is_currently_hiring" :active-value="1" disabled></el-switch>
                </div>
                <div class="business-info-background-banner-container">
                  <div class="business-info-background-banner-label">
                    Business Profile Banner
                  </div>
                  <div class="business-info-background-banner">
                    <el-upload
                        class="background-uploader"
                        :action="uploadActionUrl"
                        :headers="uploadHeaders"
                        :data="uploadData"
                        :show-file-list="false"
                        name="file[]"
                        :on-success="handleBackgroundSuccess"
                        :before-upload="beforeBackgroundUpload"
                    >
                      <el-image v-if="backgroundUrl" :src="backgroundUrl" class="background-avatar"></el-image>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>

                </div>

              </div>
            </div>

            <div class="preferences-container">
              <div class="preferences-label">
                <div class="preferences-label-text">Company Policies</div>
                <div class="profile-underline-1"></div>
              </div>
              <div class="preferences-content">
                <div class="p-job-type-container">
                  <div class="p-job-type-t">
                    <div class="p-job-type-t-label">
                      Preferred Job Type
                    </div>
                    <div class="p-job-type-t-edit"
                         @click="turnIndexList(3)"
                         v-if="canEditJobType===false">
                      <el-icon :size="18">
                        <edit/>
                      </el-icon>
                    </div>
                    <div class="p-job-type-t-edit"
                         @click="jobTypeConfirm"
                         v-if="canEditJobType">Confirm
                    </div>
                  </div>
                  <div class="p-job-type-content">
                    <!--                    展示 -->
                    <div class="object-show-container" v-if="canEditJobType === false">
                      <div class="object-show-item" v-for="(cer,i) in jobTypeList" :key="i">
                        {{ cer.object_en }}
                      </div>
                    </div>
                    <!--                    编辑-->
                    <div class="object-tags-container" v-if="canEditJobType">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectJobTypeList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in editJobTypeList" :key="index"
                             @click="selectJobType(item,1)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectJobTypeList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownJobTypeList" :key="index"
                             @click="selectJobType(item,2)">
                          {{ item.object_name }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addJobTypeStatus==false"
                             @click="addJobTypeStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addJobTypeStatus">
                          <el-input type="text" v-model="ownJobTypeValue"
                                    placeholder="Add job type"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownJobTypeValue.length>0"
                                       @click="addOwnJobType">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownJobTypeValue.length==0"
                                       @click="addJobTypeStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="p-benefits-container">
                  <div class="p-benefits-t">
                    <div class="p-benefits-t-label">Employment Benefits</div>
                    <div class="p-benefits-t-edit"
                         @click="turnIndexList(6)"
                         v-if="canEditBenefits===false">
                      <el-icon :size="18">
                        <edit/>
                      </el-icon>
                    </div>
                    <div class="p-benefits-t-edit"
                         @click="benefitsConfirm"
                         v-if="canEditBenefits">Confirm
                    </div>
                  </div>
                  <div class="p-benefits-content">
                    <!--                    展示 -->
                    <div class="object-show-container" v-if="canEditBenefits === false">
                      <div class="object-show-item" v-for="(cer,i) in benefitsList" :key="i">
                        {{ cer.object_en }}
                      </div>
                    </div>
                    <!--                    编辑-->
                    <div class="object-tags-container" v-if="canEditBenefits">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectBenefitsList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in editBenefitsList" :key="index"
                             @click="selectBenefits(item,1)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectBenefitsList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownBenefitsList" :key="index"
                             @click="selectBenefits(item,2)">
                          {{ item.object_name }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addBenefitsStatus==false"
                             @click="addBenefitsStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addBenefitsStatus">
                          <el-input type="text" v-model="ownBenefitsValue"
                                    placeholder="Add benefits"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownBenefitsValue.length>0"
                                       @click="addOwnBenefits">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownBenefitsValue.length==0"
                                       @click="addBenefitsStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>


            <div class="b-tabs-container">
              <el-tabs v-model="activeName" @tab-click="handleTabsClick">
                <el-tab-pane label="I am School" name="first">

                  <div class="school-info-container">
                    <div class="school-info-t">
                      <div class="school-info-label">School Information</div>
                      <div class="school-info-edit" @click="editSchoolInfo()">
                        <el-icon :size="18">
                          <edit/>
                        </el-icon>
                      </div>
                    </div>

                    <div class="school-info-content">
                      <div class="school-info-item" v-if="businessInfo.curriculum">
                        Curriculum: <span>{{ businessInfo.curriculum }} </span>
                      </div>
                      <div class="school-info-item" v-if="businessInfo.technology_available">
                        Technology Available: <span>{{ businessInfo.technology_available }}</span>
                      </div>
                      <div class="school-info-item" v-if="businessInfo.staff_student_ratio">
                        Average class size: <span>{{ businessInfo.staff_student_ratio }}</span>
                      </div>
                      <div class="school-info-item" v-if="businessInfo.tuition">
                        Tuition: <span>{{ businessInfo.tuition }}</span>
                      </div>
                      <div class="school-info-item">
                        Field Trips:
                        <el-switch v-model="businessInfo.felds_trips" :active-value="1" disabled></el-switch>
                      </div>
                      <div class="school-info-item">
                        Events:
                        <el-switch v-model="businessInfo.is_events" :active-value="1" disabled></el-switch>
                      </div>
                      <div class="school-info-item">
                        Special Needs:
                        <el-switch v-model="businessInfo.is_special_needs" :active-value="1" disabled></el-switch>
                      </div>
                      <div class="school-info-item-tags" v-if="studentAgeList.length>0">
                        Our Students Age:
                        <template v-for="(item,i) in studentAgeList" :key="i">
                          <span>{{ item.object_en }}</span>
                        </template>
                      </div>
                      <div class="school-info-item-tags" v-if="subjectList.length>0">
                        Subject We Teach:
                        <template v-for="(item,i) in subjectList" :key="i">
                          <span>{{ item.object_en }}</span>
                        </template>
                      </div>
                      <div class="school-info-item-tags" v-if="facilitiesList.length>0">
                        School Facilities:
                        <template v-for="(item,i) in facilitiesList" :key="i">
                          <span>{{ item.object_en }}</span>
                        </template>
                      </div>

                    </div>
                  </div>

                </el-tab-pane>
                <el-tab-pane label="I am a Recruiter" name="second">
                  I am a Recruiter
                </el-tab-pane>
              </el-tabs>
            </div>

            <div class="media-container">
              <div class="media-label">
                <div class="media-label-text">Account Media</div>
                <div class="profile-underline-1"></div>
              </div>
              <div class="profile-photo-container">
                <div class="profile-photo-t">
                  <div class="profile-photo-t-label">Profile Photo</div>
                </div>
                <div class="profile-photo-content">
                  <el-upload
                      class="profile-uploader"
                      :action="uploadActionUrl"
                      :headers="uploadHeaders"
                      :data="uploadData"
                      :show-file-list="false"
                      name="file[]"
                      :on-success="handleProfilePhotoSuccess"
                      :before-upload="beforeProfilePhotoUpload"
                  >
                    <el-image v-if="profilePhotoUrl" :src="profilePhotoUrl" class="profile-avatar"></el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
              <!--              <div class="logo-photo-container">-->
              <!--                <div class="logo-photo-t">-->
              <!--                  <div class="logo-photo-t-label">Business Logo</div>-->
              <!--                </div>-->
              <!--                <div class="logo-photo-content">-->
              <!--                  <el-upload-->
              <!--                      class="logo-uploader"-->
              <!--                      :action="uploadActionUrl"-->
              <!--                      :headers="uploadHeaders"-->
              <!--                      :data="uploadData"-->
              <!--                      :show-file-list="false"-->
              <!--                      name="file[]"-->
              <!--                      :on-success="handleLogoPhotoSuccess"-->
              <!--                      :before-upload="beforeLogoPhotoUpload"-->
              <!--                  >-->
              <!--                    <el-image v-if="logoPhotoUrl" :src="logoPhotoUrl" class="logo-avatar" ></el-image>-->
              <!--                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <!--                  </el-upload>-->
              <!--                </div>-->
              <!--              </div>-->
              <!--              <div class="background-banner-container">-->
              <!--                <div class="background-banner-t">-->
              <!--                  <div class="background-banner-t-label">Background Banner</div>-->
              <!--                </div>-->
              <!--                <div class="background-banner-content">-->
              <!--                  <el-upload-->
              <!--                      class="background-uploader"-->
              <!--                      :action="uploadActionUrl"-->
              <!--                      :headers="uploadHeaders"-->
              <!--                      :data="uploadData"-->
              <!--                      :show-file-list="false"-->
              <!--                      name="file[]"-->
              <!--                      :on-success="handleBackgroundSuccess"-->
              <!--                      :before-upload="beforeBackgroundUpload"-->
              <!--                  >-->
              <!--                    <el-image v-if="backgroundUrl" :src="backgroundUrl" class="background-avatar" ></el-image>-->
              <!--                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <!--                  </el-upload>-->

              <!--                </div>-->
              <!--              </div>-->
              <div class="account-images-container">
                <div class="account-images-t">
                  <div class="account-images-t-label">Marketing Photos:</div>
                  <div class="account-images-t-tips">Add more pictures to attract better talent</div>
                </div>
                <div class="account-images-content">
                  <el-upload
                      :action="uploadActionUrl"
                      :headers="uploadHeaders"
                      :data="uploadData"
                      name="file[]"
                      list-type="picture-card"
                      :limit="6"
                      multiple
                      :file-list="accountImageFileList"
                      :on-preview="handleAccountImagePreview"
                      :on-remove="handleAccountImageRemove"
                      :on-success="handleAccountImageSuccess"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog width="50%" v-model="dialogAccountImageVisible" center>
                    <el-image :src="dialogAccountImageUrl"></el-image>
                  </el-dialog>
                </div>
              </div>
              <div class="intro-video-container">
                <div class="intro-video-t">
                  <div class="intro-video-t-label">Introduction Video:</div>
                </div>
                <div class="intro-video-content">
                  <el-upload
                      class="intro-video-uploader"
                      :action="uploadActionUrl"
                      :headers="uploadHeaders"
                      :data="uploadData"
                      :show-file-list="false"
                      name="file[]"
                      :on-success="handleIntroVideoSuccess"
                      :before-upload="beforeIntroVideoUpload"
                  >
                    <video v-if="introVideoUrl" :src="introVideoUrl" controls class="intro-video-avatar"/>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
            </div>

          </div>

        </el-col>
      </el-row>


    </div>
    <!--    languages -->
    <el-drawer
        v-model="languagesDrawer"
        title="Languages"
        direction="rtl"
        :before-close="handleLanguagesClose"
        custom-class="languages-drawer"
    >
      <div class="add-languages-drawer-container">
        <el-form
            ref="languagesForm"
            :model="languagesForm"
            :rules="languagesRules"
            label-width="120px"
            label-position="top"
            class="demo-ruleForm"
        >
          <el-form-item prop="languageValue">
            <el-input v-model="languagesForm.languageValue" placeholder="Add your language"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addCustomLanguage('languagesForm')">
              Add
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="languages-drawer-container-bg">
        <div class="languages-drawer-container">
          <div>
            <div class="languages-d-item" v-for="(item,i) in languagesCustomData" :key="i">
              <div class="languages-d-item-l">
                {{ item.object_en }}
              </div>
              <div class="languages-d-item-r">
                <el-rate
                    v-model="item.score"
                    @change="languagesCustomScoreChange($event,item)"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                >
                </el-rate>
              </div>
            </div>
          </div>
          <div>
            <div class="languages-d-item" v-for="(item,i) in languagesData" :key="i">
              <div class="languages-d-item-l">
                {{ item.object_en }}
              </div>
              <div class="languages-d-item-r">
                <el-rate
                    v-model="item.score"
                    @change="languagesScoreChange($event,item)"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                >
                </el-rate>
              </div>
            </div>
          </div>
        </div>
        <div class="languages-d-btn">
          <el-button type="primary" @click="updateLanguagesScore()">Update</el-button>
        </div>

      </div>


    </el-drawer>
  </div>
</template>

<script>
import meSideMenu from "@/components/meSideMenu";
import accountInfo from "../../../components/accountInfo";
import {
  VISITOR_USER_INFO, GET_BASIC_INFO, USER_OBJECT_LIST,
  ADD_LANGUAGE_SCORE, ADD_PROFILE, ADD_USER_INFO, ADD_USER_IMG,
  UPDATE_BUSINESS_PROFILE, ZOHO_SYNC
} from '@/api/api'


export default {
  name: "profile",
  components: {
    meSideMenu,
    accountInfo
  },
  data() {
    return {
      activeName: 'first',
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
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
    this.getVisitorBasicInfo()
    // this.getBasicInfo()
    this.updateBusinessProfile()
  },
  methods: {
    updateBusinessProfile() {
      let params = {
        token: localStorage.getItem('token')
      }
      UPDATE_BUSINESS_PROFILE(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    editBasicInfo() {
      this.$router.push('/business/edit/basic')
    },
    editBusinessInfo() {
      this.$router.push('/business/edit/businessInfo')
    },
    editSchoolInfo() {
      this.$router.push('/business/edit/school')
    },
    editLanguages() {
      this.getUserObjectList()
      this.languagesDrawer = true
    },
    getVisitorBasicInfo() {
      let uid = localStorage.getItem('uid')
      let identity = localStorage.getItem('identity')
      let params = {
        id: uid,
        identity: identity
      }
      VISITOR_USER_INFO(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.basicUserInfo = res.message
          if (identity == 2 && res.message.business_info) {
            this.businessInfo = res.message.business_info

            if (res.message.business_info.user_images) {
              this.userImagesList = res.message.business_info.user_images;
            }

            let hobbies = res.message.business_info.hobbies;
            if (hobbies) {
              this.hobbiesList = hobbies.split(',');
            }

            if (res.message.business_info.profile_photo) {
              this.profilePhotoUrl = res.message.business_info.profile_photo
            }
            if (res.message.business_info.profile_photo) {
              this.logoPhotoUrl = res.message.business_info.logo
            }
            if (res.message.business_info.header_photo) {
              this.backgroundUrl = res.message.business_info.header_photo
            }
            if (res.message.business_info.subject) {
              this.subjectList = res.message.business_info.subject;
            }
            if (res.message.business_info.Student_Age) {
              this.studentAgeList = res.message.business_info.Student_Age;
            }
            if (res.message.business_info.job_type) {
              this.jobTypeList = res.message.business_info.job_type;
            }
            if (res.message.business_info.benefits) {
              this.benefitsList = res.message.business_info.benefits;
            }
            if (res.message.business_info.facilities) {
              this.facilitiesList = res.message.business_info.facilities;
            }
            let userImages = res.message.business_info.user_images
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

            let videoUrl = res.message.business_info.video_url

            if (videoUrl) {
              this.introVideoUrl = videoUrl
            }


          }
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getBasicInfo() {
      let uid = localStorage.getItem('uid')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        console.log(res)
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
          this.getVisitorBasicInfo()
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
    handleProfilePhotoSuccess(res, file) {
      // console.log(res.data[0]['file_url'])
      this.profilePhotoUrl = URL.createObjectURL(file.raw)
      let params = {
        profile_photo: res.data[0]['file_url'],
        identity: 2,
        token: localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    beforeProfilePhotoUpload(file) {

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    handleLogoPhotoSuccess(res, file) {
      // console.log(res.data[0]['file_url'])
      this.logoPhotoUrl = URL.createObjectURL(file.raw)
      let logoLink = res.data[0]['file_url']
      let params = {
        logo: res.data[0]['file_url'],
        identity: 2,
        token: localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.submitEduBusinessCompanyForm(logoLink, '')
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    beforeLogoPhotoUpload(file) {

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    handleBackgroundSuccess(res, file) {
      this.backgroundUrl = URL.createObjectURL(file.raw)
      let headerLink = res.data[0]['file_url']
      let params = {
        header_photo: res.data[0]['file_url'],
        identity: 2,
        token: localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.submitEduBusinessCompanyForm('', headerLink)
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    beforeBackgroundUpload(file) {
      console.log(file)
    },
    handleAccountImageRemove(file, fileList) {
      console.log(file, fileList)
      let accountImagesArr = []
      fileList.forEach(item => {
        accountImagesArr.push(item.url)
      })
      let params = {
        token: localStorage.getItem('token'),
        identity: 2,
        img: accountImagesArr
      }
      ADD_USER_IMG(params).then(res => {
        if (res.code == 200) {
          this.getVisitorBasicInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    handleAccountImagePreview(file) {
      // console.log(file)
      this.dialogAccountImageUrl = file.url
      this.dialogAccountImageVisible = true
    },
    handleAccountImageSuccess(res, file) {
      let accountImages = this.accountImageFileList
      let name = res.data[0]['file_name']
      let url = res.data[0]['file_url']
      let obj = {
        name: name,
        url: url
      }
      this.accountImageFileList.push(obj)

      let accountImagesArr = []
      accountImages.forEach(item => {
        accountImagesArr.push(item.url)
      })
      // console.log(accountImages)
      //
      // console.log(res)
      // console.log(file)
      this.accoutImageUrl = URL.createObjectURL(file.raw)
      let params = {
        token: localStorage.getItem('token'),
        identity: 2,
        img: accountImagesArr
      }
      ADD_USER_IMG(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          this.getVisitorBasicInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    handleIntroVideoSuccess(res, file) {
      // console.log(res)
      this.introVideoUrl = URL.createObjectURL(file.raw)
      let params = {
        video_url: res.data[0]['file_url'],
        identity: 2,
        token: localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    beforeIntroVideoUpload(file) {
      console.log(file)
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
          this.getVisitorBasicInfo();
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
    jobTypeConfirm() {

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
        token: localStorage.getItem('token'),
        object_pid: 3,
        object_id: objectArr,
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('jobtype--submit--' + res.data);
          this.canEditJobType = false;
          this.getVisitorBasicInfo();
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
    benefitsConfirm() {

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
        token: localStorage.getItem('token'),
        object_pid: 6,
        object_id: objectArr,
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('benefits--submit--' + res.data);
          this.canEditBenefits = false;
          this.getVisitorBasicInfo();
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    handleTabsClick(tab, event) {
      console.log(tab, event)
    },
    async submitEduBusinessCompanyForm(logoLink, headerLink) {

      let zohoData = [];
      let userId = localStorage.getItem('uid')

      zohoData['zf_referrer_name'] = ''
      zohoData['zf_redirect_url'] = ''
      zohoData['zc_gad'] = ''

      zohoData['SingleLine'] = this.businessInfo.business_name  // Education Business Name

      zohoData['Dropdown2'] = this.businessInfo.business_type_name  //Education Business Category
      zohoData['Dropdown'] = 'Education Business'  //Company Type
      zohoData['Website'] = ''  //Education Business Website
      zohoData['SingleLine1'] = ''  // Education Business Contact
      zohoData['Number2'] = ''  //  Company Number

      zohoData['SingleLine5'] = userId  //UserID

      zohoData['PhoneNumber_countrycode'] = ''  //Education Business Phone
      zohoData['Email'] = ''  // Education Business Email
      zohoData['Number'] = ''   //Number of Employees
      zohoData['Number1'] = ''   //Membership Duration
      zohoData['Dropdown1'] = ''   //Membership Type

      zohoData['Address_AddressLine1'] = ''   //Street Address
      zohoData['Address_City'] = ''   //City
      zohoData['Address_Region'] = ''   //State/Region/Province
      zohoData['Address_Country'] = ''   //Country

      zohoData['SingleLine4'] = ''   //   Business Registration No.
      zohoData['MultiLine'] = ''   //Company Intro
      zohoData['SingleLine3'] = ''   //WeChat ID

      zohoData['Number3'] = ''  //  Number of Branches
      zohoData['Number4'] = ''  //    Number of Students

      zohoData['MultipleChoice'] = ''  //    Students Ages
      zohoData['MultiLine1'] = ''  //     Curriculum Subjects
      zohoData['MultiLine2'] = ''  //     School Facilities

      zohoData['Website1'] = ''  // Business License Link
      zohoData['Website2'] = logoLink   //Company Logo Link
      zohoData['Website3'] = headerLink   //Header Image Link

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

.basic-info-label-text {
  font-size: 16px;
  font-weight: bold;
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

.basic-info-content {
  padding: 10px 0;
  /*display: flex;*/
  /*flex-direction: row;*/
  /*flex-wrap: wrap;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
}

.basic-info-item {
  font-size: 14px;
  margin: 10px;
  color: #808080;
}

.basic-info-item span {
  color: #000000;
}

.business-info-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.business-info-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.business-info-label {
  font-size: 16px;
  font-weight: bold;
}

.profile-underline-2 {
  width: 60px;
  margin-top: 8px;
  border-bottom: 2px solid #00b3d2;
}


.business-info-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.business-info-edit:hover {
  color: #00b3d2;
}

.business-info-content {
  padding: 10px 0;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*flex-wrap: wrap;*/
  /*align-items: flex-start;*/
  /*justify-content: space-between;*/
}

.business-info-logo-name-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.business-info-logo {
  padding: 10px;
}

.business-info-name {
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
}

.business-info-item {
  margin: 10px;
  color: #00b3d2;
  font-size: 14px;
}

.business-info-item span {
  color: #000000;
}

.business-info-background-banner-container {
  margin: 10px;
}

.business-info-background-banner-label {
  font-size: 14px;
  font-weight: bold;
}

.business-info-background-banner {
  margin-top: 10px;
}

.b-tabs-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.school-info-container {
  padding-top: 20px;
  text-align: left;
}

.school-info-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.school-info-label {
  font-size: 16px;
  font-weight: bold;
}

.school-info-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.school-info-edit:hover {
  color: #00b3d2;
}

.school-info-content {
  padding: 10px 0;
  /*display: flex;*/
  /*flex-direction: row;*/
  /*flex-wrap: wrap;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
}

.school-info-item {
  margin: 10px;
  color: #808080;
  font-size: 14px;
}

.school-info-item span {
  color: #000000;
}

.school-info-item-tags {
  margin: 10px;
  color: #808080;
  font-size: 14px;
}

.school-info-item-tags span {
  background-color: rgba(0, 179, 210, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  margin: 10px;
  font-size: 14px;
  cursor: pointer;
}

.languages-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.languages-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.languages-label {

}

.languages-label-text {
  font-size: 16px;
  font-weight: bold;
}

.languages-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.languages-content {

}

.languages-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
  font-size: 14px;
}

.languages-item-l {
  font-size: 14px;
}

.languages-item-r {
  margin-left: 10px;
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

.profile-photo-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.profile-photo-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.profile-photo-t-label {
  font-size: 14px;
  font-weight: bold;

}

.profile-photo-content {
  padding: 10px;
}

/deep/ .profile-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

/deep/ .profile-uploader .el-upload:hover {
  border-color: #0AA0A8;
}

/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.profile-avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.logo-photo-container {
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.logo-photo-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.logo-photo-t-label {
  font-size: 14px;
  font-weight: bold;

}

.logo-photo-content {
  padding: 10px;
}

/deep/ .logo-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

/deep/ .logo-uploader .el-upload:hover {
  border-color: #0AA0A8;
}

/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.logo-avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.background-banner-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.background-banner-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.background-banner-t-label {
  font-size: 14px;
  font-weight: bold;

}

.background-banner-content {
  padding: 10px;
}

/deep/ .background-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

/deep/ .background-uploader .el-upload:hover {
  border-color: #0AA0A8;
}

/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.background-avatar {
  width: 378px;
  height: 178px;
  display: block;
}

.account-images-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.account-images-t {
  /*display: flex;*/
  /*flex-direction: row;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
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
}

.intro-video-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.intro-video-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.intro-video-t-label {
  font-size: 14px;
  font-weight: bold;

}

.intro-video-content {
  padding: 10px;
}

/deep/ .intro-video-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

/deep/ .intro-video-uploader .el-upload:hover {
  border-color: #0AA0A8;
}

/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.intro-video-avatar {
  width: 378px;
  height: 178px;
  display: block;
}

.my-resume-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.my-resume-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.my-resume-t-label {
  font-size: 14px;
  font-weight: bold;

}

.my-resume-content {
  padding: 10px;
}

/deep/ .resume-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

/deep/ .resume-uploader .el-upload:hover {
  border-color: #0AA0A8;
}

/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.resume-avatar {
  width: 378px;
  /*height: 178px;*/
  display: block;
  text-decoration: none;
  color: #00b3d2;
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

.p-job-type-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.p-job-type-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.p-job-type-t-label {
  font-size: 14px;
  font-weight: bold;
}

.p-job-type-t-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.p-job-type-content {

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


.languages-drawer {
  height: 100%;
}

.add-languages-drawer-container {
  width: 98%;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #EEEEEE;
}

.languages-drawer-container-bg {
  width: 98%;
  margin: 20px auto 0;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #EEEEEE;
}

.languages-drawer-container {
  overflow-y: scroll;
  height: 400px;
}

.languages-d-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
  border-bottom: 1px solid #EEEEEE;
}

.languages-d-item-l {
  font-size: 14px;
}

.languages-d-item-r {

}

.languages-d-btn {
  margin-top: 20px;
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