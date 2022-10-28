<template>
  <div class="bg">
    <div class="educator-container">

      <div class="educator-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <div class="educator-r-container">
        <div class="educator-r-container-bg">

          <div class="account-profile-t">
            <div class="account-profile-t-l">
              <el-button  class="account-profile-back-btn" type="primary" link @click="backToAccountHome()" >
                <el-icon>
                  <ArrowLeft />
                </el-icon>
                Back
              </el-button>
            </div>
            <div class="account-profile-t-r">
<!--              <el-button class="account-profile-cancel-btn" plain round>-->
<!--                FAVORITED-->
<!--              </el-button>-->
<!--              <el-button class="account-profile-save-btn" type="primary" round-->
<!--                         >-->
<!--                SEND A MESSAGE-->
<!--              </el-button>-->
            </div>
          </div>

          <div class="profile-c-container">

            <div class="profile-1-container">

              <div class="profile-background-container"
                   :style="'background-image:url('+ backgroundUrl +')'"
              >
              </div>

              <el-row :gutter="0">

                <el-col :span="24" class="basic-info-1-container">

                  <div class="basic-info-images-container">
                    <el-avatar class="basic-info-profile-photo"
                               :src="profilePhotoUrl"
                    >
                    </el-avatar>
                    <div class="basic-info-six-pic-container"
                      @click="imagesDialogVisible=true"
                    >
                      <div class="basic-info-six-pic-1">
                        <el-avatar class="basic-info-six-pic" :src="profilePhotoUrl" ></el-avatar>
                      </div>
<!--                      <div class="basic-info-six-pic-2">-->
<!--                        4 MORE-->
<!--                      </div>-->
                    </div>
                  </div>

                  <div class="basic-info-c-container">
                    <div class="basic-info-c-l">
                      <div class="basic-info-c-name">
                        {{ educatorContact.name }}
                      </div>
                      <div class="basic-info-c-title">
                        {{ educatorContact.job_title }}
                      </div>
                      <div class="basic-info-c-nationality">
                        {{ educatorContact.nationality }}
                      </div>
<!--                      <div class="basic-c-tags">-->
<!--                        <el-tag class="basic-c-tag">Biology</el-tag>-->
<!--                        <el-tag class="basic-c-tag">Esl English</el-tag>-->
<!--                        <el-tag class="basic-c-tag">Drama</el-tag>-->
<!--                      </div>-->
                    </div>
                    <div class="basic-info-c-r">
                      <p>
                        {{educatorContact.bio}}
<!--                        <span>READ MORE</span>-->
                      </p>
                      <div class="basic-info-c-r-b">
                        <div class="basic-info-c-hobbies">
                          <div class="basic-info-c-hobby"
                               v-for="(item,i) in countriesTraveledList" :key="i">
                            {{ item.object_en }}
                          </div>
                        </div>
                        <div class="basic-info-c-hobbies">
                          <div class="basic-info-c-hobby"
                               v-for="(item,i) in countriesLivedList" :key="i">
                            {{ item.object_en }}
                          </div>
                        </div>
                        <div class="basic-info-c-hobbies">
                          <div class="basic-info-c-hobby" v-for="(item,i) in hobbiesList" :key="i">
                            #{{ item }}
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </el-col>

              </el-row>

            </div>

          </div>

          <div class="profile-2-container">

            <div class="exp-container">
              <div class="exp-label">Experience</div>
              <div class="exp-years">
                <template v-for="(item,i) in teachExpList" :key="i">
                  {{ item.object_en }}
                </template>
              </div>

              <div class="exp-c-container">
                <div class="exp-c-item"  v-for="(work,i) in workInfo" :key="i">
                  <div class="exp-c-item-l">
                    <el-avatar class="exp-c-item-l-icon"></el-avatar>
                  </div>
                  <div class="exp-c-item-r">
                    <div class="exp-c-item-1"  @click="turnEditWorkExperience(work)">
                      {{ work.title }}
                    </div>
                    <div class="exp-c-item-2">
                      {{ work.company_name }}
                    </div>
                    <div class="exp-c-item-3">
                      {{ $filters.ymdFormatTimestamp(work.work_time_from) }} - {{
                        $filters.ymdFormatTimestamp(work.work_time_to)
                      }}
                    </div>
                    <div class="exp-c-item-3">
                      {{ work.location }}
                    </div>
                    <div class="exp-c-item-4">
                      {{ work.teaching_experience }}
                    </div>
<!--                    <div class="exp-c-item-readmore">READ MORE</div>-->
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div class="profile-3-container">

            <div class="education-container">
              <div class="education-label">Education</div>
              <div class="education-c-container">

                <div class="education-c-item" v-for="(education,i) in educationInfo" :key="i">
                  <div class="education-c-item-l">
                    <el-avatar class="education-c-item-l-icon"></el-avatar>
                  </div>
                  <div class="education-c-item-r">
                    <div class="education-c-item-r-1" @click="turnEditEducation(education)">
                      {{ education.school_name }}
                    </div>
                    <div class="education-c-item-r-2">
                      {{ education.degree }}
                    </div>
                    <div class="education-c-item-r-3">
                      {{
                        $filters.ymdFormatTimestamp(education.start_time)
                      }}-{{ $filters.ymdFormatTimestamp(education.end_time) }}
                    </div>
                    <div class="education-c-item-r-4">
                      {{ education.field_of_study }}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div class="profile-4-container">
            <div class="languages-container">
              <div class="languages-label">
                Languages
              </div>

              <div class="languages-c-container" v-if="educatorContact.languages">
                <div class="languages-c-item" v-for="(item,i) in educatorContact.languages" :key="i">
                  <div class="languages-c-item-l">{{ item.object_en }}</div>
                  <div class="languages-c-item-r">
                    <span v-if="item.object_score == 1">
                      Native
                    </span>
                    <span v-if="item.object_score == 2">
                      Fluent
                    </span>
                    <span v-if="item.object_score == 3">
                      Conversational
                    </span>
                    <span v-if="item.object_score == 4">
                      Beginner
                    </span>

                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="profile-5-container">

            <div class="preferences-container">
              <div class="preferences-label">Preferences</div>
              <div class="preferences-c-container">

                <el-row :gutter="50" >
                  <el-col :span="6">
                    <div class="preferences-c-item">
                      <div class="preferences-c-item-label">Certifications</div>
                      <div class="object-show-container" >
                        <div class="object-show-item" v-for="(cer,i) in certificationsList" :key="i">
                          {{ cer.object_en }}
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="preferences-c-item">
                      <div class="preferences-c-item-label">Subject to Teach</div>
                      <div class="object-show-container">
                        <div class="object-show-item" v-for="(cer,i) in subjectList" :key="i">
                          {{ cer.object_en }}
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="preferences-c-item">
                      <div class="preferences-c-item-label">Preferred Job Type</div>
                      <div class="object-show-container">
                        <div class="object-show-item" v-for="(cer,i) in jobTypeList" :key="i">
                          {{ cer.object_en }}
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="preferences-c-item">
                      <div class="preferences-c-item-label"> Preferred Age To Teach</div>
                      <div class="object-show-container" >
                        <div class="object-show-item" v-for="(cer,i) in ageToTeachList" :key="i">
                          {{ cer.object_en }}
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>

                <el-row :gutter="50">
                  <el-col :span="6">
                    <div class="preferences-c-item">
                      <div class="preferences-c-item-label">Preferred Benefits</div>
                      <div class="object-show-container">
                        <div class="object-show-item" v-for="(cer,i) in benefitsList" :key="i">
                          {{ cer.object_en }}
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>

              </div>

            </div>

          </div>

<!--          <div class="credentials-container">-->
<!--            <div class="credentials-label">Credentials</div>-->
<!--            <div class="credentials-content">-->
<!--              <div class="languages-container">-->
<!--                <div class="languages-t">-->
<!--                  <div class="languages-label">Languages</div>-->
<!--                  <div class="languages-edit" @click="editLanguages()">Edit</div>-->
<!--                </div>-->
<!--                <div class="languages-content" v-if="educatorContact.languages">-->
<!--                  <div class="languages-item" v-for="(item,i) in educatorContact.languages" :key="i">-->
<!--                    <div class="languages-item-l">{{ item.object_en }}</div>-->
<!--                    <div class="languages-item-r">-->
<!--                      <el-rate-->
<!--                          v-model="item.object_score"-->
<!--                          disabled-->
<!--                          :colors="['#99A9BF', '#F7BA2A', '#FF9900']"-->
<!--                      >-->
<!--                      </el-rate>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="media-container">-->
            <!--              <div class="profile-photo-container">-->
            <!--                <div class="profile-photo-t">-->
            <!--                  <div class="profile-photo-t-label">Profile Photo</div>-->
            <!--                </div>-->
            <!--                <div class="profile-photo-content">-->
            <!--                  <el-upload-->
            <!--                      class="profile-uploader"-->
            <!--                      :action="uploadActionUrl"-->
            <!--                      :headers="uploadHeaders"-->
            <!--                      :data="uploadData"-->
            <!--                      :show-file-list="false"-->
            <!--                      name="file[]"-->
            <!--                      :on-success="handleProfilePhotoSuccess"-->
            <!--                      :before-upload="beforeProfilePhotoUpload"-->
            <!--                  >-->
            <!--                    <el-image v-if="profilePhotoUrl" :src="profilePhotoUrl" class="profile-avatar"></el-image>-->
            <!--                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--                  </el-upload>-->
            <!--                </div>-->
            <!--              </div>-->
<!--            <div class="background-banner-container">-->
<!--              <div class="background-banner-t">-->
<!--                <div class="background-banner-t-label">Background Banner</div>-->
<!--              </div>-->
<!--              <div class="background-banner-content">-->
<!--                <el-upload-->
<!--                    class="background-uploader"-->
<!--                    :action="uploadActionUrl"-->
<!--                    :headers="uploadHeaders"-->
<!--                    :data="uploadData"-->
<!--                    :show-file-list="false"-->
<!--                    name="file[]"-->
<!--                    :on-success="handleBackgroundSuccess"-->
<!--                    :before-upload="beforeBackgroundUpload"-->
<!--                >-->
<!--                  <el-image v-if="backgroundUrl" :src="backgroundUrl" class="background-avatar"></el-image>-->
<!--                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                </el-upload>-->

<!--              </div>-->
<!--            </div>-->
<!--            <div class="account-images-container">-->
<!--              <div class="account-images-t">-->
<!--                <div class="account-images-t-label">Account Images(6 max)</div>-->
<!--                <div class="account-images-t-edit"-->
<!--                     v-if="!editAccountImageStatus"-->
<!--                     @click="editAccountImageStatus=true">-->
<!--                  Edit-->
<!--                </div>-->
<!--                <div class="account-images-t-edit"-->
<!--                     v-if="editAccountImageStatus"-->
<!--                     @click="uploadAccountImages()">-->
<!--                  Save-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="account-images-content">-->
<!--                <div class="account-images-item-container" v-if="!editAccountImageStatus">-->
<!--                  <div class="account-images-item" v-for="(item,i) in accountImageFileList" :key="i" >-->
<!--                    <el-image class="account-images-img" :src="item.url" fit="contain"-->
<!--                              @click="accountImagePreview(item.url)"-->
<!--                    ></el-image>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <template v-if="editAccountImageStatus">-->
<!--                  <el-upload-->
<!--                      ref="accountImagesUpload"-->
<!--                      action="#"-->
<!--                      :headers="uploadHeaders"-->
<!--                      :data="uploadData"-->
<!--                      :auto-upload="false"-->
<!--                      name="file[]"-->
<!--                      list-type="picture-card"-->
<!--                      :limit="6"-->
<!--                      :multiple="true"-->
<!--                      :before-upload="beforeAccountImageUpload"-->
<!--                      :file-list="accountImageFileList"-->
<!--                      :on-change="handleAccountImageChange"-->
<!--                      :on-preview="handleAccountImagePreview"-->
<!--                      :on-remove="handleAccountImageRemove"-->

<!--                  >-->
<!--                    <i class="el-icon-plus"></i>-->
<!--                  </el-upload>-->

<!--                </template>-->
<!--                <el-dialog width="50%" v-model="dialogAccountImageVisible" center>-->
<!--                  <el-image :src="dialogAccountImageUrl"></el-image>-->
<!--                </el-dialog>-->

<!--              </div>-->
<!--            </div>-->
<!--            <div class="intro-video-container">-->
<!--              <div class="intro-video-t">-->
<!--                <div class="intro-video-t-label">Intro Video</div>-->
<!--                <template v-if="introVideoUrl">-->
<!--                  <div class="intro-video-t-edit"-->
<!--                       v-if="editVideoStatus"-->
<!--                       @click="editVideoStatus=false">Edit</div>-->
<!--                  <div class="intro-video-t-edit"-->
<!--                       v-else-->
<!--                       @click="editVideoStatus=true">Cancel</div>-->
<!--                </template>-->

<!--              </div>-->
<!--              <div class="intro-video-content">-->

<!--                <el-upload-->
<!--                    v-if="!editVideoStatus || !introVideoUrl"-->
<!--                    class="intro-video-uploader"-->
<!--                    :action="uploadActionUrl"-->
<!--                    :headers="uploadHeaders"-->
<!--                    :data="uploadData"-->
<!--                    :show-file-list="false"-->
<!--                    name="file[]"-->
<!--                    :on-success="handleIntroVideoSuccess"-->
<!--                    :before-upload="beforeIntroVideoUpload"-->
<!--                >-->
<!--                  <i class="el-icon-plus avatar-uploader-icon"></i>-->
<!--                </el-upload>-->
<!--                <video v-else :src="introVideoUrl" controls class="intro-video-avatar"/>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="my-resume-container">-->
<!--              <div class="my-resume-t">-->
<!--                <div class="my-resume-t-label">Your Resume [PDF]</div>-->
<!--                <template v-if="resumeUrl">-->
<!--                  <div class="my-resume-t-edit"-->
<!--                       v-if="editResumeStatus"-->
<!--                       @click="editResumeStatus=false">Edit</div>-->
<!--                  <div class="my-resume-t-edit"-->
<!--                       v-else-->
<!--                       @click="editResumeStatus=true">Cancel</div>-->
<!--                </template>-->
<!--              </div>-->
<!--              <div class="my-resume-content">-->

<!--                <el-upload-->
<!--                    v-if="!editResumeStatus || !resumeUrl"-->
<!--                    drag-->
<!--                    class="resume-uploader"-->
<!--                    :action="uploadActionUrl"-->
<!--                    :headers="uploadHeaders"-->
<!--                    :data="uploadData"-->
<!--                    :show-file-list="false"-->
<!--                    name="file[]"-->
<!--                    :on-success="handleResumeSuccess"-->
<!--                    :before-upload="beforeResumeUpload"-->
<!--                >-->
<!--                  <el-icon class="el-icon&#45;&#45;upload" :size="80">-->
<!--                    <upload-filled/>-->
<!--                  </el-icon>-->
<!--                  <div class="el-upload__text">-->
<!--                    Drop file here or <em>click to upload</em>-->
<!--                  </div>-->
<!--                  <template #tip>-->
<!--                    <div class="el-upload__tip">-->

<!--                    </div>-->
<!--                  </template>-->
<!--                  &lt;!&ndash;                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
<!--                </el-upload>-->
<!--                <a v-else :href="resumeUrl" target="_blank" class="resume-avatar">-->
<!--                  [PDF] Click to Preview-->
<!--                </a>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

        </div>

      </div>

    </div>
    <!--    languages -->
    <el-drawer
        :size="languagesDrawerSize"
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

    <el-dialog v-model="imagesDialogVisible" fullscreen>
      <swiper
          :style="{
      '--swiper-navigation-color': '#fff',
      '--swiper-pagination-color': '#fff',
    }"
          :slidesPerView="3"
          :spaceBetween="50"
          :navigation="true"
          :thumbs="{ swiper: thumbsSwiper }"
          class="mySwiper2"
      >
        <swiper-slide v-for="(item,i) in accountImageFileList" :key="i">
          <el-image :src="item.url"></el-image>
        </swiper-slide>
      </swiper>
      <swiper
          @swiper="setThumbsSwiper"
          :spaceBetween="20"
          :slidesPerView="5"
          :freeMode="true"
          :watchSlidesProgress="true"
          class="mySwiper"
      >
        <swiper-slide v-for="(item,i) in accountImageFileList" :key="i">
          <el-image :src="item.url"></el-image>
        </swiper-slide>
      </swiper>
    </el-dialog>

    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUpload()"></xllLoading>
  </div>
</template>

<script>

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"

import './style.css';

// import required modules
import SwiperCore, {Autoplay, FreeMode, Navigation, Pagination, Thumbs, Zoom} from 'swiper';
SwiperCore.use([Autoplay, FreeMode, Navigation, Pagination, Thumbs, Zoom]);

import meSideMenu from "@/components/meSideMenu";
import {ref} from 'vue'

import {
  USER_OBJECT_LIST,
  ADD_PROFILE_V2,
  EDUCATOR_CONTACT_EDIT_V2,
  ZOHO_SYNC,
  USER_INFO_BY_TOKEN_V2,
  ADD_USER_IMG_V2,
  ADD_LANGUAGE_SCORE_V2,
  EDUCATOR_PERCENTAGE_V2, UPLOAD_IMG, USER_INFO_VISITOR_V2
} from '@/api/api'
import {encode, decode} from 'js-base64'
import xllLoading from '@/components/xllLoading'

export default {
  name: "profile",
  components: {
    meSideMenu,
    xllLoading,
    Swiper,
    SwiperSlide,
  },
  setup() {

    let thumbsSwiper = ref(null);

    const setThumbsSwiper = (swiper) => {
          thumbsSwiper.value = swiper;
        }

    return {
      thumbsSwiper,
      setThumbsSwiper
    }

  },
  data() {
    return {
      imagesDialogVisible:false,
      uploadLoadingStatus:false,
      editAccountImageStatus:false,
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      educatorContact: {},
      userContact: {},
      languagesDrawerSize:"30%",
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

      certificationsList: [],
      canEditCertifications: false,
      editCertificationsList: [],
      addCertificationsStatus: false,
      ownCertificationsValue: '',
      ownCertificationsList: [],
      selectCertificationsList: [],
      selectCertificationsArr: [],
      educationInfo: [],
      educationNum: 1,
      showMoreEducationStatus: true,

      teachExpList: [],
      canEditTeachExp: false,
      editTeachExpList: [],
      addTeachExpStatus: false,
      ownTeachExpValue: '',
      ownTeachExpList: [],
      selectTeachExpList: [],
      selectTeachExpArr: [],

      countriesLivedList: [],
      countriesTraveledList: [],
      languagesList: [],
      locationList: [],
      jobTypeList: [],
      ageToTeachList: [],
      regionList: [],
      benefitsList: [],
      subjectList: [],
      userImagesList: [],
      workInfo: [],
      hobbiesList: [],

      canEditCountriesTraveled: false,
      editCountriesTraveledList: [],
      addCountriesTraveledStatus: false,
      ownCountriesTraveledValue: '',
      ownCountriesTraveledList: [],
      selectCountriesTraveledList: [],
      selectCountriesTraveledArr: [],

      canEditCountriesLived: false,
      editCountriesLivedList: [],
      addCountriesLivedStatus: false,
      ownCountriesLivedValue: '',
      ownCountriesLivedList: [],
      selectCountriesLivedList: [],
      selectCountriesLivedArr: [],

      workExpNum: 1,
      showMoreWorkExpStatus: true,

      canEditHobby: false,
      editHobbyInfoList: ['Fitness', 'Photography', 'Travel'],
      addHobbyInfoStatus: false,
      ownHobbyInfoValue: '',
      ownHobbyInfoList: [],
      selectHobbyInfoList: [],
      selectHobbyInfoArr: [],

      profilePhotoUrl: '',
      backgroundUrl: '',
      dialogAccountImageUrl: '',
      dialogAccountImageVisible: false,
      accountImageFileList: [],
      introVideoUrl: '',
      resumeUrl: '',

      canEditSubject: false,
      editSubjectList: [],
      addSubjectStatus: false,
      ownSubjectValue: '',
      ownSubjectList: [],
      selectSubjectList: [],
      selectSubjectArr: [],

      canEditLocation: false,
      editLocationList: [],
      addLocationStatus: false,
      ownLocationValue: '',
      ownLocationList: [],
      selectLocationList: [],
      selectLocationArr: [],

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

      canEditRegion: false,
      editRegionList: [],
      addRegionStatus: false,
      ownRegionValue: '',
      ownRegionList: [],
      selectRegionList: [],
      selectRegionArr: [],

      canEditBenefits: false,
      editBenefitsList: [],
      addBenefitsStatus: false,
      ownBenefitsValue: '',
      ownBenefitsList: [],
      selectBenefitsList: [],
      selectBenefitsArr: [],

      editVideoStatus:false,
      editResumeStatus:false

    }
  },
  mounted() {
    let screenWidth = document.body.clientWidth

    if (Math.floor(screenWidth) < 768) {
      this.languagesDrawerSize = '90%'
    }
    if (Math.floor(screenWidth) >= 768 && Math.floor(screenWidth) < 992) {
      this.languagesDrawerSize = '90%'
    }
    if (Math.floor(screenWidth) >= 992 && Math.floor(screenWidth) < 1200) {
      this.languagesDrawerSize = '30%'
    }
    if (Math.floor(screenWidth) >= 1200) {
      this.languagesDrawerSize = '30%'
    }

    window.onresize = () => {
      let screenWidth2 = document.body.clientWidth
      if (Math.floor(screenWidth2) < 768) {
        this.languagesDrawerSize = '90%'
      }
      if (Math.floor(screenWidth2) >= 768 && Math.floor(screenWidth2) < 992) {
        this.languagesDrawerSize = '90%'
      }
      if (Math.floor(screenWidth2) >= 992 && Math.floor(screenWidth2) < 1200) {
        this.languagesDrawerSize = '30%'
      }
      if (Math.floor(screenWidth2) >= 1200) {
        this.languagesDrawerSize = '30%'
      }
    }

    let str = this.$route.query.str
    if(str){
      let strDecode = decode(str)
      let strParse = JSON.parse(strDecode)
      if(strParse.from == 'other'){
        this.getUserInfoForVisitor(strParse.uid, strParse.cid)
      }else{
        this.getUserInfo()
        this.updateEducatorProfile()
      }

    }else{

      this.getUserInfo()
      this.updateEducatorProfile()

    }


  },
  methods: {
    backToAccountHome(){
      // this.$router.go(-1)
      this.$router.push('/account/home')
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
    editBasicInfo() {
      let strObj = {
        i:1,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))

      this.$router.push({path:'/profile/contact/user',query:{s:str}})
    },
    editEducatorContactInfo(){
      let strObj = {
        i:1,
        action:'edit'
      }
      let str = encode(JSON.stringify(strObj))
      this.$router.push({path:'/educator/edit/basic',query:{s:str}})
    },
    editLanguages() {
      this.getUserObjectList()
      this.languagesDrawer = true
    },
    getUserInfoForVisitor(userId,companyId) {
      let params = {
        user_id:userId,
        company_id:companyId,
        identity:1
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          let userContact = res.message.user_contact;
          let educatorContact = res.message.user_contact.educator_contact;

          if (userContact) {
            this.userContact = userContact
          }

          if (educatorContact) {
            this.educatorContact = educatorContact;
          }

          if (educatorContact.Teaching_certificate) {
            this.certificationsList = educatorContact.Teaching_certificate;
          }

          if (educatorContact.education_info) {
            this.educationInfo = educatorContact.education_info;
          }

          if (educatorContact.places_lived) {
            this.countriesLivedList = educatorContact.places_lived;
          }
          if (educatorContact.places_traveled) {
            this.countriesTraveledList = educatorContact.places_traveled;
          }

          if (educatorContact.languages) {
            this.languagesList = educatorContact.languages;
          }
          if (educatorContact.Location) {
            this.locationList = educatorContact.Location;
          }
          if (educatorContact.job_type) {
            this.jobTypeList = educatorContact.job_type;
          }
          if (educatorContact.age_to_teach) {
            this.ageToTeachList = educatorContact.age_to_teach;
          }
          if (educatorContact.region) {
            this.regionList = educatorContact.region;
          }
          if (educatorContact.benefits) {
            this.benefitsList = educatorContact.benefits;
          }
          if (educatorContact.subject) {
            this.subjectList = educatorContact.subject;
          }
          if (educatorContact.images) {
            console.log(educatorContact.images)

            let userImages = educatorContact.images
            if (userImages.length>0) {
              let userImagesArr = []
              userImages.forEach(item => {
                let userImageObj = {
                  name: '',
                  url: item.url
                }
                userImagesArr.push(userImageObj)
              })
              this.accountImageFileList = userImagesArr
              console.log(this.accountImageFileList)

            }

          }

          if (educatorContact.work_info) {
            this.workInfo = educatorContact.work_info;
          }

          if (educatorContact.Teaching_experience) {
            this.teachExpList = educatorContact.Teaching_experience;
          }

          let hobbies = educatorContact.hobbies;
          if (hobbies) {
            this.hobbiesList = hobbies.split(',');
          }

          if (userContact.headimgurl) {
            this.profilePhotoUrl = userContact.headimgurl
          }
          if (educatorContact.background_image) {
            this.backgroundUrl = educatorContact.background_image
          }


          let videoUrl = educatorContact.video_url
          let resumePdf = educatorContact.resume_pdf
          if (videoUrl) {
            this.editVideoStatus = true;
            this.introVideoUrl = videoUrl
          }
          if (resumePdf) {
            this.editResumeStatus = true;
            this.resumeUrl = resumePdf
          }


        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getUserInfo() {
      let params = {
        identity:1
      }

      USER_INFO_BY_TOKEN_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {

          let userContact = res.message.user_contact;
          let educatorContact = res.message.user_contact.educator_contact;

          if (userContact) {
            this.userContact = userContact
          }

          if (educatorContact) {
            this.educatorContact = educatorContact;
          }

          if (educatorContact.Teaching_certificate) {
            this.certificationsList = educatorContact.Teaching_certificate;
          }

          if (educatorContact.education_info) {
            this.educationInfo = educatorContact.education_info;
          }

          if (educatorContact.places_lived) {
            this.countriesLivedList = educatorContact.places_lived;
          }
          if (educatorContact.places_traveled) {
            this.countriesTraveledList = educatorContact.places_traveled;
          }

          if (educatorContact.languages) {
            this.languagesList = educatorContact.languages;
          }
          if (educatorContact.Location) {
            this.locationList = educatorContact.Location;
          }
          if (educatorContact.job_type) {
            this.jobTypeList = educatorContact.job_type;
          }
          if (educatorContact.age_to_teach) {
            this.ageToTeachList = educatorContact.age_to_teach;
          }
          if (educatorContact.region) {
            this.regionList = educatorContact.region;
          }
          if (educatorContact.benefits) {
            this.benefitsList = educatorContact.benefits;
          }
          if (educatorContact.subject) {
            this.subjectList = educatorContact.subject;
          }
          if (educatorContact.images) {
            console.log(educatorContact.images)

            let userImages = educatorContact.images
            if (userImages.length>0) {
              let userImagesArr = []
              userImages.forEach(item => {
                let userImageObj = {
                  name: '',
                  url: item.url
                }
               userImagesArr.push(userImageObj)
              })
              this.accountImageFileList = userImagesArr
              console.log(this.accountImageFileList)

            }

          }

          if (educatorContact.work_info) {
            this.workInfo = educatorContact.work_info;
          }

          if (educatorContact.Teaching_experience) {
            this.teachExpList = educatorContact.Teaching_experience;
          }

          let hobbies = educatorContact.hobbies;
          if (hobbies) {
            this.hobbiesList = hobbies.split(',');
          }

          if (userContact.headimgurl) {
            this.profilePhotoUrl = userContact.headimgurl
          }
          if (educatorContact.background_image) {
            this.backgroundUrl = educatorContact.background_image
          }


          let videoUrl = educatorContact.video_url
          let resumePdf = educatorContact.resume_pdf
          if (videoUrl) {
            this.editVideoStatus = true;
            this.introVideoUrl = videoUrl
          }
          if (resumePdf) {
            this.editResumeStatus = true;
            this.resumeUrl = resumePdf
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
        company_id:this.educatorContact.id,
        object_arr: this.languagesObjArr,
        token: localStorage.getItem('token')
      }
      ADD_LANGUAGE_SCORE_V2(params).then(res => {
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
      this.selectLocationList = [];
      this.ownLocationList = [];
      this.selectCertificationsList = [];
      this.ownCertificationsList = [];
      this.selectCountriesTraveledList = [];
      this.ownCountriesTraveledList = [];
      this.selectCountriesLivedList = [];
      this.ownCountriesLivedList = [];
      this.selectTeachExpList = [];
      this.ownTeachExpList = [];

      USER_OBJECT_LIST(data).then(res => {
        console.log(res)
        if (type == 120) {
          this.editTeachExpList = res.message;
          let len = this.teachExpList.length;
          let teachExpList = this.teachExpList;
          for (let i = 0; i < len; i++) {

            if (teachExpList[i].object_id == 0) {
              let obj = {
                id: teachExpList[i].object_id,
                object_pid: teachExpList[i].object_pid,
                object_name: teachExpList[i].object_en
              }
              this.ownTeachExpList.push(obj);
              this.selectTeachExpList.push(obj)
            } else {
              let obj = {
                id: teachExpList[i].object_id,
                pid: teachExpList[i].object_pid,
                object_en: teachExpList[i].object_en,
                object_cn: teachExpList[i].object_cn
              }
              this.selectTeachExpList.push(obj)
            }
          }

          this.canEditTeachExp = true;
        }
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
        // location
        if (type == 71) {
          this.editLocationList = res.message;
          console.log(this.locationList);
          let len = this.locationList.length;
          let locationList = this.locationList;
          console.log(len);
          for (let i = 0; i < len; i++) {
            console.log(locationList[i].object_id);
            if (locationList[i].object_id == 0) {
              let obj = {
                id: locationList[i].object_id,
                object_pid: locationList[i].object_pid,
                object_name: locationList[i].object_en
              }
              this.ownLocationList.push(obj);
              this.selectLocationList.push(obj)
            } else {
              let obj = {
                id: locationList[i].object_id,
                pid: locationList[i].object_pid,
                object_en: locationList[i].object_en,
                object_cn: locationList[i].object_cn
              }
              this.selectLocationList.push(obj)
            }
          }

          this.canEditLocation = true;
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
        // age to teach
        if (type == 4) {
          this.editAgeToTeachList = res.message;
          console.log(this.ageToTeachList);
          let len = this.ageToTeachList.length;
          let ageToTeachList = this.ageToTeachList;
          console.log(len);
          for (let i = 0; i < len; i++) {
            console.log(ageToTeachList[i].object_id);
            if (ageToTeachList[i].object_id == 0) {
              let obj = {
                id: ageToTeachList[i].object_id,
                object_pid: ageToTeachList[i].object_pid,
                object_name: ageToTeachList[i].object_en
              }
              this.ownAgeToTeachList.push(obj);
              this.selectAgeToTeachList.push(obj)
            } else {
              let obj = {
                id: ageToTeachList[i].object_id,
                pid: ageToTeachList[i].object_pid,
                object_en: ageToTeachList[i].object_en,
                object_cn: ageToTeachList[i].object_cn
              }
              this.selectAgeToTeachList.push(obj)
            }
          }

          this.canEditAgeToTeach = true;
        }
        // region
        if (type == 5) {
          this.editRegionList = res.message;
          console.log(this.regionList);
          let len = this.regionList.length;
          let regionList = this.regionList;
          console.log(len);
          for (let i = 0; i < len; i++) {
            console.log(regionList[i].object_id);
            if (regionList[i].object_id == 0) {
              let obj = {
                id: regionList[i].object_id,
                object_pid: regionList[i].object_pid,
                object_name: regionList[i].object_en
              }
              this.ownRegionList.push(obj);
              this.selectRegionList.push(obj)
            } else {
              let obj = {
                id: regionList[i].object_id,
                pid: regionList[i].object_pid,
                object_en: regionList[i].object_en,
                object_cn: regionList[i].object_cn
              }
              this.selectRegionList.push(obj)
            }
          }

          this.canEditRegion = true;
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

        if (type == 7) {
          this.editCertificationsList = res.message;
          let len = this.certificationsList.length;
          let certificationsList = this.certificationsList;

          for (let i = 0; i < len; i++) {
            console.log(certificationsList[i].object_id);
            if (certificationsList[i].object_id == 0) {
              let obj = {
                id: certificationsList[i].object_id,
                object_pid: certificationsList[i].object_pid,
                object_name: certificationsList[i].object_en
              }
              this.ownCertificationsList.push(obj);
              this.selectCertificationsList.push(obj)
            } else {
              let obj = {
                id: certificationsList[i].object_id,
                pid: certificationsList[i].object_pid,
                object_en: certificationsList[i].object_en,
                object_cn: certificationsList[i].object_cn
              }
              this.selectCertificationsList.push(obj)
            }
          }

          this.canEditCertifications = true;
        }
        if (type == 8) {
          this.editCountriesTraveledList = res.message;
          let len = this.countriesTraveledList.length;
          let countriesTraveledList = this.countriesTraveledList;
          console.log(len);
          for (let i = 0; i < len; i++) {
            console.log(countriesTraveledList[i].object_id);
            if (countriesTraveledList[i].object_id == 0) {
              let obj = {
                id: countriesTraveledList[i].object_id,
                object_pid: countriesTraveledList[i].object_pid,
                object_name: countriesTraveledList[i].object_en
              }
              this.ownCountriesTraveledList.push(obj);
              this.selectCountriesTraveledList.push(obj)
            } else {
              let obj = {
                id: countriesTraveledList[i].object_id,
                pid: countriesTraveledList[i].object_pid,
                object_en: countriesTraveledList[i].object_en,
                object_cn: countriesTraveledList[i].object_cn
              }
              this.selectCountriesTraveledList.push(obj)
            }
          }

          this.canEditCountriesTraveled = true;
        }
        if (type == 9) {
          this.editCountriesLivedList = res.message;
          let len = this.countriesLivedList.length;
          let countriesLivedList = this.countriesLivedList;

          for (let i = 0; i < len; i++) {
            console.log(countriesLivedList[i].object_id);
            if (countriesLivedList[i].object_id == 0) {
              let obj = {
                id: countriesLivedList[i].object_id,
                object_pid: countriesLivedList[i].object_pid,
                object_name: countriesLivedList[i].object_en
              }
              this.ownCountriesLivedList.push(obj);
              this.selectCountriesLivedList.push(obj)
            } else {
              let obj = {
                id: countriesLivedList[i].object_id,
                pid: countriesLivedList[i].object_pid,
                object_en: countriesLivedList[i].object_en,
                object_cn: countriesLivedList[i].object_cn
              }
              this.selectCountriesLivedList.push(obj)
            }
          }

          this.canEditCountriesLived = true;
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addOwnCertifications() {
      this.addCertificationsStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownCertificationsValue,
        object_pid: 7
      }

      let index = this.selectCertificationsList.findIndex((element) => element === obj);
      if (index == -1) {
        // if (this.selectCertificationsList.length > 4) {
        // 	return false;
        // }
        this.ownCertificationsList.push(obj);
        this.selectCertificationsList.push(obj);
        this.ownCertificationsValue = '';
      } else {
        this.selectCertificationsList.splice(index, 1);
      }
      console.log(this.selectCertificationsList);
    },
    selectCertifications(value, type) {
      let index;
      if (type == 1) {
        index = this.selectCertificationsList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectCertificationsList.findIndex((element) => element === value);
      }
      // console.log(index);
      if (index == -1) {
        // if (this.selectCertificationsList.length > 4) {
        // 	return false;
        // }
        this.selectCertificationsList.push(value);

      } else {
        this.selectCertificationsList.splice(index, 1);
      }
      console.log(this.selectCertificationsList)
    },
    certificationsConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectCertificationsList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 7,
        object_id: objectArr,
        expand: expand,
        company_id:this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('certifications--submit--' + res.data);
          this.canEditCertifications = false;
          this.getUserInfo()
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })


    },
    addUserEducation() {
      this.$router.push('/educator/edit/education')
    },
    showMoreEducation() {
      this.educationNum = this.educationInfo.length;
      this.showMoreEducationStatus = false;
    },
    turnEditEducation(education) {
      this.$router.push({path: '/educator/edit/education', query: {educationId: education.id, type: 2}})
    },
    addOwnTeachExp() {
      this.addTeachExpStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownTeachExpValue,
        object_pid: 120
      }
      let index = this.selectTeachExpList.findIndex((element) => element === obj);
      // if (index == -1) {
      // 	this.selectTeachExpList.push(obj);
      // 	this.ownTeachExpList.push(obj);
      // 	this.ownTeachExpValue = '';
      // } else {
      // 	this.selectTeachExpList.splice(index, 1);
      // }

      this.selectTeachExpList.splice(index, 1, obj);
      this.ownTeachExpList.push(obj);
      this.ownTeachExpValue = '';
    },
    selectTeachExp(value, type) {
      let index;
      if (type == 1) {
        index = this.selectTeachExpList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectTeachExpList.findIndex((element) => element === value);
      }

      // if (index == -1) {
      // 	this.selectTeachExpList.push(value);

      // } else {
      // 	this.selectTeachExpList.splice(index, 1);
      // }

      this.selectTeachExpList.splice(index, 1, value);

      console.log(this.selectTeachExpList)
    },
    teachExpConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectTeachExpList.forEach(item => {
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 120,
        object_id: objectArr,
        expand: expand,
        company_id:this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          this.canEditTeachExp = false;
          this.getUserInfo();
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })


    },
    addOwnCountriesTraveled() {
      this.addCountriesTraveledStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownCountriesTraveledValue,
        object_pid: 8
      }
      let index = this.selectCountriesTraveledList.findIndex((element) => element === obj);
      if (index == -1) {
        // if (this.selectCountriesTraveledList.length > 4) {
        // 	return false;
        // }
        this.selectCountriesTraveledList.push(obj);
        this.ownCountriesTraveledList.push(obj);
        this.ownCountriesTraveledValue = '';
      } else {
        this.selectCountriesTraveledList.splice(index, 1);
      }

    },
    selectCountriesTraveled(value, type) {
      let index;
      if (type == 1) {
        index = this.selectCountriesTraveledList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectCountriesTraveledList.findIndex((element) => element === value);
      }

      if (index == -1) {
        // if (this.selectCountriesTraveledList.length > 4) {
        // 	return false;
        // }
        this.selectCountriesTraveledList.push(value);

      } else {
        this.selectCountriesTraveledList.splice(index, 1);
      }
      console.log(this.selectCountriesTraveledList)
    },
    countriesTraveledConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectCountriesTraveledList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 8,
        object_id: objectArr,
        expand: expand,
        company_id:this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('travel--submit--' + res.data);
          this.canEditCountriesTraveled = false;
          this.getUserInfo();
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })


    },
    addOwnCountriesLived() {
      this.addCountriesLivedStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownCountriesLivedValue,
        object_pid: 9
      }
      let index = this.selectCountriesLivedList.findIndex((element) => element === obj);
      if (index == -1) {
        // if (this.selectCountriesLivedList.length > 4) {
        // 	return false;
        // }
        this.selectCountriesLivedList.push(obj);
        this.ownCountriesLivedList.push(obj);
        this.ownCountriesLivedValue = '';
      } else {
        this.selectCountriesLivedList.splice(index, 1);
      }

    },
    selectCountriesLived(value, type) {
      let index;
      if (type == 1) {
        index = this.selectCountriesLivedList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectCountriesLivedList.findIndex((element) => element === value);
      }

      if (index == -1) {
        // if (this.selectCountriesLivedList.length > 4) {
        // 	return false;
        // }
        this.selectCountriesLivedList.push(value);

      } else {
        this.selectCountriesLivedList.splice(index, 1);
      }
      console.log(this.selectCountriesLivedList)
    },
    countriesLivedConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectCountriesLivedList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 9,
        object_id: objectArr,
        expand: expand,
        company_id:this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('lived--submit--' + res.data);
          this.canEditCountriesLived = false;
          this.getUserInfo();
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    addEducationWork() {
      this.$router.push('/educator/edit/work')
    },
    showMoreWorkExp() {
      this.workExpNum = this.workInfo.length;
      this.showMoreWorkExpStatus = false;
    },
    turnEditWorkExperience(work) {
      this.$router.push({path: '/educator/edit/work', query: {workId: work.id, type: 2}})
    },
    addOwnHobby() {
      this.addHobbyInfoStatus = false;
      let obj = this.ownHobbyInfoValue;
      let index = this.selectHobbyInfoList.findIndex((element) => element === obj);
      if (index == -1) {
        this.selectHobbyInfoList.push(obj);
        this.ownHobbyInfoList.push(obj);
        this.ownHobbyInfoValue = '';
      } else {
        this.selectHobbyInfoList.splice(index, 1);
      }

    },
    selectHobby(value) {
      let index = this.selectHobbyInfoList.findIndex((element) => element === value);

      if (index == -1) {
        this.selectHobbyInfoList.push(value);

      } else {
        this.selectHobbyInfoList.splice(index, 1);
      }
    },
    hobbyConfirm() {

      let hobbiesStr = this.selectHobbyInfoList.join(',');
      let data = {
        hobbies: hobbiesStr
      }
      EDUCATOR_CONTACT_EDIT_V2(data).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.canEditHobby = false;
          this.hobbiesList = this.selectHobbyInfoList;
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    handleProfilePhotoSuccess(res, file) {
      this.$loading().close()

      // console.log(res.data[0]['file_url'])
      this.profilePhotoUrl = URL.createObjectURL(file.raw)
      let profileLink = res.data[0]['file_url']
      let params = {
        profile_photo: res.data[0]['file_url']
      }
      // console.log(params)
      EDUCATOR_CONTACT_EDIT_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.submitEducatorContactForm(profileLink, '')
          this.$message.success('Success')
          this.getUserInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    beforeProfilePhotoUpload(file) {
      this.$loading({
        text:'Uploading...'
      })
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    cancelUpload(){
      this.uploadLoadingStatus = false;
    },
    handleBackgroundSuccess(res, file) {
      this.uploadLoadingStatus = false;

      this.backgroundUrl = URL.createObjectURL(file.raw)
      let params = {
        background_image: res.data[0]['file_url']
      }
      // console.log(params)
      EDUCATOR_CONTACT_EDIT_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.getUserInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    beforeBackgroundUpload(file) {
      console.log(file)
      this.uploadLoadingStatus = true;
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
              identity: 1,
              company_id:this.educatorContact.id,
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
          identity: 1,
          company_id:this.educatorContact.id,
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
    handleIntroVideoSuccess(res, file) {
      // console.log(res)
      this.$loading().close()

      this.introVideoUrl = URL.createObjectURL(file.raw)
      let introLink = res.data[0]['file_url']
      let params = {
        video_url: res.data[0]['file_url']
      }
      // console.log(params)
      EDUCATOR_CONTACT_EDIT_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.editVideoStatus = true;
          this.submitEducatorContactForm('', introLink)
          this.$message.success('Success')
          this.getUserInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    beforeIntroVideoUpload(file) {
      console.log(file)
      this.$loading({
        text:'Uploading...'
      })
    },
    handleResumeSuccess(res, file) {
      // this.$loading().close()
      this.uploadLoadingStatus = false;

      this.resumeUrl = URL.createObjectURL(file.raw)
      let params = {
        resume_pdf: res.data[0]['file_url']
      }
      // console.log(params)
      EDUCATOR_CONTACT_EDIT_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.editResumeStatus = true;
          this.getUserInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    beforeResumeUpload(file) {
      console.log(file)
      this.uploadLoadingStatus = true;
      // this.$loading({
      //   text:'Uploading...'
      // })
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
        expand: expand,
        company_id:this.educatorContact.id
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
    addOwnLocation() {
      this.addLocationStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownLocationValue,
        object_pid: 71
      }
      let index = this.selectLocationList.findIndex((element) => element === obj)
      if (index == -1) {
        this.selectLocationList.push(obj);
        this.ownLocationList.push(obj);
        this.ownLocationValue = '';

      } else {
        this.selectLocationList.splice(index, 1);
      }

    },
    selectLocation(value, type) {
      let index;
      if (type == 1) {
        index = this.selectLocationList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectLocationList.findIndex((element) => element === value);
      }

      if (index == -1) {
        this.selectLocationList.push(value);

      } else {
        this.selectLocationList.splice(index, 1);
      }
      // console.log(this.selectLocationList)
    },
    locationConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectLocationList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 71,
        object_id: objectArr,
        expand: expand,
        company_id:this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('location--submit--' + res.data);
          this.canEditLocation = false;
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
        expand: expand,
        company_id:this.educatorContact.id
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
    addOwnAgeToTeach() {
      this.addAgeToTeachStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownAgeToTeachValue,
        object_pid: 4
      }
      let index = this.selectAgeToTeachList.findIndex((element) => element === obj);
      if (index == -1) {
        this.selectAgeToTeachList.push(obj);
        this.ownAgeToTeachList.push(obj);
        this.ownAgeToTeachValue = '';
      } else {
        this.selectAgeToTeachList.splice(index, 1);
      }

    },
    selectAgeToTeach(value, type) {
      let index;
      if (type == 1) {
        index = this.selectAgeToTeachList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectAgeToTeachList.findIndex((element) => element === value);
      }

      if (index == -1) {
        this.selectAgeToTeachList.push(value);

      } else {
        this.selectAgeToTeachList.splice(index, 1);
      }
      // console.log(this.selectAgeToTeachList)
    },
    ageToTeachConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectAgeToTeachList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 4,
        object_id: objectArr,
        expand: expand,
        company_id:this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('agetoteach--submit--' + res.data);
          this.canEditAgeToTeach = false;
          this.getUserInfo();
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addOwnRegion() {
      this.addRegionStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownRegionValue,
        object_pid: 5
      }
      let index = this.selectRegionList.findIndex((element) => element === obj);
      if (index == -1) {
        this.selectRegionList.push(obj);
        this.ownRegionList.push(obj);
        this.ownRegionValue = '';
      } else {
        this.selectRegionList.splice(index, 1);
      }

    },
    selectRegion(value, type) {
      let index;
      if (type == 1) {
        index = this.selectRegionList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectRegionList.findIndex((element) => element === value);
      }

      if (index == -1) {
        this.selectRegionList.push(value);

      } else {
        this.selectRegionList.splice(index, 1);
      }
      // console.log(this.selectRegionList)
    },
    regionConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectRegionList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 5,
        object_id: objectArr,
        expand: expand,
        company_id:this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('region--submit--' + res.data);
          this.canEditRegion = false;
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
        expand: expand,
        company_id:this.educatorContact.id
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
    async submitEducatorContactForm(contactImageLink, introLink) {
      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {
          'SingleLine': userId //UserID
        },
        {
          'SingleLine1': this.userContact.first_name // First Name
        },
        {
          'SingleLine2': this.userContact.last_name //  Last Name
        },
        {
          'Dropdown': '' //  Gender
        },
        {
          'Date': '' //   Date of Birth dd-MMM-yyyy
        },
        {
          'SingleLine3': '' //   Title
        },
        {
          'Email': '' //   Email
        },
        {
          'PhoneNumber_countrycode': '' //   Phone
        },
        {
          'SingleLine4': '' //   Nationality
        },
        {
          'Dropdown1': '' //   Membership Type
        },
        {
          'MultiLine': '' //   Languages Spoken
        },
        {
          'Number': '' //   Membership Duration
        },
        {
          'SingleLine5': '' //   City
        },
        {
          'SingleLine6': '' //   Province
        },
        {
          'SingleLine7': '' //   Country
        },
        {
          'Dropdown2': '' //   Educator Type
        },
        {
          'MultiLine1': '' //   Education
        },
        {
          'MultiLine2': '' //    Work History
        },
        {
          'Dropdown3': '' //    Teaching Experience
        },
        {
          'MultiLine3': '' //   Certifications
        },
        {
          'MultiLine4': '' //   Educator Intro
        },
        {
          'Website': contactImageLink //   Contact image Link
        },
        {
          'Website1': introLink //   Intro Video Link
        }
      ]

      let zohoParams = {
        zoho_data: zohoData,
        zoho_url: 'https://forms.zohopublic.com/edupassport/form/EducatorContactForm/formperma/G014C7ko-MpOp3A2vp6NZlgxhPbGj2HDtbzlZEI6cks/htmlRecords/submit'
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.educator-r-container {
  width:calc(100% - 160px);
}

.educator-r-container-bg{
  padding:30px 50px 50px 50px;
}

.account-profile-t{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0 40px 0;
}

.account-profile-t-l{
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:30px;
  color:#262626;

}

.account-profile-t-r{

}
.account-profile-back-btn{
  font-size:20px;
}
.account-profile-cancel-btn{
  font-size:20px;
}

.account-profile-save-btn{
  font-size:20px;
}

.basic-info-margin{
  margin-top: 20px;
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
  font-size: 16px;
  font-weight: bold;
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
  margin-top: 10px;
  border-radius:10px;
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
  min-height:24px;
  font-size: 14px;
  color:#333333;
}

.basic-info-item-r{
  font-size:14px;
  width:80%;
  text-align: left;
  background-color: #eeeeee;
  padding:10px;

  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  line-height: 24px;
  min-height:24px;
}


.credentials-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.credentials-label {
  font-size: 16px;
  font-weight: bold;
}

.credentials-content {
  padding: 10px 0;
}

.languages-container {
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.languages-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.languages-label {
  font-size: 14px;
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
}

.languages-item-l {
  font-size: 14px;
}

.languages-item-r {
  margin-left: 10px;
}

.certifications-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.certifications-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.certifications-label {
  font-size: 14px;
  font-weight: bold;
}

.certifications-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.certifications-content {


}

.education-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.education-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.education-t-label {
  font-size: 14px;
  font-weight: bold;
}

.education-t-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.education-content {
  padding: 10px;
}

.education-item {
  padding: 10px;
  background-color:#f4f5f6;
  margin-top:10px;
  border-radius:10px;
}

.education-school-name {
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  line-height: 30px;
}

.education-school-name:hover {
  color: #00b3d2;
}

.education-item-2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.education-field {
  font-size: 14px;
  color: #808080;
  width: 80%;
  line-height: 28px;
  /* 这两个在技术上是一样的, 为了兼容了浏览器两个都加上 */
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  /* 这个的使用在web-kit中有些危险，他可能会阶段所有东西 */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;
  /* 如果浏览器支持的话增加一个连接符(Blink不支持) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

.education-degree {
  font-size: 14px;
  color: #000000;
}

.education-date {
  font-size: 14px;
  color: #808080;
}

.education-item-3 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
}

.show-more {
  padding: 10px;
  text-align: center;
  font-size: 14px;
  color: #00b3d2;
  cursor: pointer;
}

.experience-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.experience-label {
  font-size: 16px;
  font-weight: bold;
}

.experience-content {
  padding: 10px 0;
}

.teaching-experience {
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.teaching-exp-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.teaching-exp-label {
  font-size: 14px;
  font-weight: bold;
}

.teaching-exp-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.teaching-exp-content {

}

.places-traveled {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.places-traveled-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.places-traveled-label {
  font-size: 14px;
  font-weight: bold;
}

.places-traveled-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.places-traveled-content {

}

.places-lived {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.places-lived-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.places-lived-label {
  font-size: 14px;
  font-weight: bold;
}

.places-lived-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.places-lived-content {

}

.work-exp-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.work-exp-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.work-exp-t-label {
  font-size: 14px;
  font-weight: bold;
}

.work-exp-t-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.work-exp-content {
  padding: 10px;
}

.work-exp-b-item {
  padding: 10px;
  background-color:#f4f5f6;
  margin-top:10px;
  border-radius:10px;
}

.work-exp-item-1 {
  font-size: 14px;
  font-weight: 700;
  word-wrap: break-word;
}

.work-exp-job-title {
  font-size: 14px;
  color: #000000;
  width: 50%;
  cursor: pointer;
  /* 这两个在技术上是一样的, 为了兼容了浏览器两个都加上 */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* 这个的使用在web-kit中有些危险，他可能会阶段所有东西 */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* 如果浏览器支持的话增加一个连接符(Blink不支持) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

.work-exp-date {
  font-size: 14px;
  color: #808080;

}

.work-exp-item-2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #808080;
  padding: 10px 0;
}

.work-exp-item-3 {
  font-size: 14px;
  color: #808080;
}

.work-exp-item-4 {
  margin-top: 10px;
  font-size: 14px;
  word-break: break-all;
  word-wrap: break-word;
}

.interest-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.interest-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.interest-label {
  font-size: 16px;
  font-weight: bold;
}

.interest-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.interest-content {
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.media-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.profile-photo-container {
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

.background-uploader{
  text-align: center;
  padding:10px;
  border:1px dashed #eeeeee;
  border-radius:10px;
}

.background-avatar {

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

.account-images-content {
  padding: 10px;
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
.intro-video-t-edit{
  font-size: 14px;
  font-weight: bold;
  cursor:pointer;
}
.intro-video-content {
  padding: 10px;
}
.intro-video-uploader{
  border:1px dashed #eeeeee;
  border-radius:10px;
  text-align: center;
}

.intro-video-avatar {
  width: 100%;
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
.my-resume-t-edit{
  font-size:14px;
  font-weight: bold;
  cursor:pointer;
}

.my-resume-content {
  padding: 10px;
  text-align: center;
}

/deep/ .resume-uploader .el-upload-dragger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

  padding:20px;
  display: block;
  text-decoration: none;
  color: #00b3d2;
  background-color:#f4f5f6;
  border-radius:10px;
}

.preferences-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
}

.preferences-label {
  font-size: 16px;
  font-weight: bold;
}

.preferences-content {
  padding: 10px 0;
}

.subject-teach-container {
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.subject-teach-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.subject-teach-t-label {
  font-size: 14px;
  font-weight: bold;
}

.subject-teach-t-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.subject-teach-content {

}

.p-location-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.p-location-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.p-location-t-label {
  font-size: 14px;
  font-weight: bold;
}

.p-location-t-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.p-location-content {

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

.age-teach-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.age-teach-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.age-teach-t-label {
  font-size: 14px;
  font-weight: bold;
}

.age-teach-t-edit {
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.age-teach-content {

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


.profile-1-container{
  background-color:#FFFFFF;
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;
  margin-bottom:30px;
}

.profile-background-container{
  height: 200px;
  background-color: #262626;
  border-radius: 18px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.basic-info-1-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.basic-info-images-container{
  position: relative;
  width:290px;
  height: 200px;
}

.basic-info-profile-photo{
  width:200px;
  height: 200px;
  position: absolute;
  top:-100px;
  left: 50px;
  border:2px solid #EEEEEE;
}

.basic-info-six-pic-container{
  position:absolute;
  bottom:100px;
  left: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.basic-info-six-pic-1{

}

.basic-info-six-pic-2{
  font-size: 16px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;
  cursor:pointer;
}

.basic-info-six-pic-2:hover{
  color:#6650B3;

}


.basic-info-six-pic{
  width: 66px;
  height: 66px;
  border:2px solid #EEEEEE;
  cursor: pointer;
}

.basic-info-c-container{
  width: calc( 100% - 290px );

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.basic-info-c-l{
  width:40%;
}


.basic-info-c-name{
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 35px;
  color: #262626;

}

.basic-info-c-title{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.basic-info-c-nationality{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.basic-c-tags{
  margin-top: 15px;
}

.basic-c-tag{
  margin-right:10px;
}

.basic-info-c-r{
  width: 60%;
  padding-right: 20px;
}

.basic-info-c-r p{
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #262626;

  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:3;
-webkit-box-orient:vertical;

}
.basic-info-c-r span{
  color:#6650B3;
  font-size:20px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.basic-info-c-r-b{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.basic-info-c-location{
  margin-right:15px;
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color:#262626;
}

.basic-info-c-hobbies{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.basic-info-c-hobby{
  margin-right: 15px;
  font-size: 23px;
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color:#262626;
}

.profile-2-container{
  background-color:#FFFFFF;
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;
  margin-bottom:30px;
}

.exp-container{
  padding:50px;
}

.exp-label{
  font-family:BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:30px;
  color: #262626;

}

.exp-years{
  font-family:BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:20px;
  color: #262626;
}

.exp-c-container{
  margin-top: 20px;
}

.exp-c-item{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 25px;
}

.exp-c-item-l{

}
.exp-c-item-l-icon{
  width:50px;
  height: 50px;

}
.exp-c-item-r{
  padding-left: 25px;
}
.exp-c-item-1{
  font-family:Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}
.exp-c-item-2{
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}
.exp-c-item-3{
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}

.exp-c-item-4{
  margin-top: 25px;
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}

.exp-c-item-readmore{
  font-family:BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:20px;
  color: #6650B3;
}

.profile-3-container{
  background-color:#FFFFFF;
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;
  margin-bottom:30px;
}

.education-container{
  padding:50px;
}

.education-label{
  font-family:BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:30px;
  color: #262626;

}

.education-c-container{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.education-c-item{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 25px 25px 25px 0;
}

.education-c-item-l{

}
.education-c-item-l-icon{
  width:50px;
  height: 50px;

}

.education-c-item-r{
  padding-left: 25px;

}

.education-c-item-r-1{
  font-family:Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}

.education-c-item-r-2{
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}

.education-c-item-r-3{
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}

.education-c-item-r-4{
  margin-top: 25px;
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}

.profile-4-container{
  background-color:#FFFFFF;
  box-shadow: 0 3px 23px #00000012;
  border-radius: 18px;
  margin-bottom:30px;
}

.languages-container{
  padding:50px;
}

.languages-label{
  font-family:BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:30px;
  color: #262626;

}

.languages-c-container{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.languages-c-item{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 25px 25px 25px 0;
}

.languages-c-item-l{
  font-family:Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}

.languages-c-item-r{
  padding-left: 25px;
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}


.profile-5-container{
  background-color:#FFFFFF;
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;
  margin-bottom:30px;
}

.preferences-container{
  padding:50px;
}

.preferences-label{
  font-family:BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:30px;
  color: #262626;

}

.preferences-c-container{
  margin-top: 20px;
}

.preferences-c-item{
  margin-top: 25px;
}

.preferences-c-item-label{
  font-family:Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size:23px;
  color: #262626;
}

.object-show-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}

.object-show-item {
  padding: 4px 10px;
  background-color: #EEEEEE;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 6px;
  font-size: 20px;
  cursor: pointer;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}




@media screen and (min-width: 1200px){
  .educator-container{
    /*width: 1100px;*/
  }
}

@media screen and (max-width: 768px){
    /deep/ .el-upload-dragger{
      width:260px;
    }

  .basic-info-item-l{
    font-size:12px;
    width:30%;
  }
  .basic-info-item-r{
    font-size: 12px;
  }
  .work-exp-content{
    padding:0;
  }
  .work-exp-date{
    font-size: 12px;
  }
  .education-content{
    padding:0;
  }
  .education-date{
    font-size: 12px;
  }

}

</style>
