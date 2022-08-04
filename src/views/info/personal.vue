<template>
  <div class="bg">
    <el-row class="detail-row" align="top" justify="start">

      <el-col class="detail-l-col" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="back-container">
          <el-button type="info" class="back-btn" @click="turnBack()" >
            <el-icon :size="18">
              <Back></Back>
            </el-icon>
            Back
          </el-button>
        </div>

        <div class="basic-info-container">
          <div class="basic-info-t">
            <div class="basic-info-label">Basic Info</div>
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

            <div class="basic-info-item" v-if="userContact.country_info">
              <div class="basic-info-item-l">Location:</div>
              <div class="basic-info-item-r">{{ $filters.countryInfoFormat(userContact.country_info) }}</div>
            </div>

          </div>

        </div>

        <div class="basic-info-container basic-info-margin">
          <div class="basic-info-t">
            <div class="basic-info-label">Educator Contact Info</div>
          </div>

          <div class="basic-info-content">

            <div class="basic-info-item" v-if="educatorContact.name">
              <div class="basic-info-item-l">Name: </div>
              <div class="basic-info-item-r">{{ educatorContact.name }}</div>
            </div>

            <div class="basic-info-item" v-if="educatorContact.phone">
              <div class="basic-info-item-l">Phone #:</div>
              <div class="basic-info-item-r">{{ educatorContact.phone }}</div>
            </div>
            <div class="basic-info-item" v-if="educatorContact.email">
              <div class="basic-info-item-l"> Email:</div>
              <div class="basic-info-item-r">{{ educatorContact.email }}</div>
            </div>
            <div class="basic-info-item" v-if="educatorContact.job_title">
              <div class="basic-info-item-l">Job Title:</div>
              <div class="basic-info-item-r">{{ educatorContact.job_title }}</div>
            </div>
            <div class="basic-info-item">
              <div class="basic-info-item-l">Job Seeking :</div>
              <div class="basic-info-item-r">
                <el-switch v-model="educatorContact.is_seeking" :active-value="1" disabled></el-switch>
              </div>
            </div>
            <div class="basic-info-item">
              <div class="basic-info-item-l">Public Profile:</div>
              <div class="basic-info-item-r">
                <el-switch v-model="educatorContact.is_public" :active-value="1" disabled></el-switch>
              </div>
            </div>

            <div class="basic-info-item" v-if="educatorContact.nationality">
              <div class="basic-info-item-l">Nationality:</div>
              <div class="basic-info-item-r">{{ educatorContact.nationality }}</div>
            </div>
            <div class="basic-info-item" v-if="educatorContact.address">
              <div class="basic-info-item-l">Address: </div>
              <div class="basic-info-item-r">{{ educatorContact.address }}</div>
            </div>
            <div class="basic-info-item" v-if="educatorContact.sub_identity_name_en">
              <div class="basic-info-item-l">Educator Category:</div>
              <div class="basic-info-item-r">{{ educatorContact.sub_identity_name_en }}</div>
            </div>
            <div class="basic-info-item" v-if="educatorContact.bio">
              <div class="basic-info-item-l">Introduction: </div>
              <div class="basic-info-item-r">{{ educatorContact.bio }}</div>
            </div>

          </div>
        </div>

        <div class="credentials-container">
          <div class="credentials-label">Credentials</div>
          <div class="credentials-content">
            <div class="languages-container">
              <div class="languages-t">
                <div class="languages-label">Languages</div>
              </div>
              <div class="languages-content" v-if="educatorContact.languages">
                <div class="languages-item" v-for="(item,i) in educatorContact.languages" :key="i">
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
            <div class="certifications-container">
              <div class="certifications-t">
                <div class="certifications-label">Certifications</div>
              </div>
              <div class="certifications-content">
                <!--                    展示 -->
                <div class="object-show-container" v-if="canEditCertifications === false">
                  <div class="object-show-item" v-for="(cer,i) in certificationsList" :key="i">
                    {{ cer.object_en }}
                  </div>
                </div>
              </div>

            </div>
            <div class="education-container">
              <div class="education-t">
                <div class="education-t-label">Education</div>
              </div>
              <div class="education-content">
                <template v-for="(education,i) in educationInfo" :key="i">
                  <div class="education-item" >
                    <div class="education-school-name" >
                      {{ education.school_name }}
                    </div>
                    <div class="education-item-2">
                      <div class="education-field">{{ education.field_of_study }}</div>
                    </div>
                    <div class="education-item-3">
                      <div class="education-degree">{{ education.degree }}</div>
                      <div class="education-date">
                        {{
                          $filters.ymdFormatTimestamp(education.start_time)
                        }}-{{ $filters.ymdFormatTimestamp(education.end_time) }}
                      </div>
                    </div>
                  </div>
                </template>

              </div>

            </div>
          </div>
        </div>

        <div class="experience-container">
          <div class="experience-label">Experience</div>
          <div class="experience-content">
            <div class="teaching-experience">
              <div class="teaching-exp-t">
                <div class="teaching-exp-label">Teaching Experience</div>
              </div>
              <div class="teaching-exp-content">
                <!--                    展示 -->
                <div class="object-show-container" v-if="canEditTeachExp === false">
                  <div class="object-show-item" v-for="(item,i) in teachExpList" :key="i">
                    {{ item.object_en }}
                  </div>
                </div>
              </div>
            </div>
            <div class="places-traveled">
              <div class="places-traveled-t">
                <div class="places-traveled-label"> Places Traveled</div>
              </div>
              <div class="places-traveled-content">
                <!--                    展示 -->
                <div class="object-show-container" v-if="canEditCountriesTraveled === false">
                  <div class="object-show-item" v-for="(item,i) in countriesTraveledList" :key="i">
                    {{ item.object_en }}
                  </div>
                </div>
              </div>
            </div>
            <div class="places-lived">
              <div class="places-lived-t">
                <div class="places-lived-label">Places Lived</div>
              </div>
              <div class="places-lived-content">
                <!--                    展示 -->
                <div class="object-show-container" v-if="canEditCountriesLived === false">
                  <div class="object-show-item" v-for="(cer,i) in countriesLivedList" :key="i">
                    {{ cer.object_en }}
                  </div>
                </div>
              </div>
            </div>
            <div class="work-exp-container">
              <div class="work-exp-t">
                <div class="work-exp-t-label">Work Experience</div>
              </div>
              <div class="work-exp-content">
                <div v-for="(work,i) in workInfo" :key="i">
                  <div class="work-exp-b-item" >
                    <div class="work-exp-item-1">
                      {{ work.company_name }}
                    </div>
                    <div class="work-exp-item-2">
                      <div class="work-exp-job-title"
                           @click="turnEditWorkExperience(work)">{{ work.title }}
                      </div>
                      <div class="work-exp-date">
                        {{ $filters.ymdFormatTimestamp(work.work_time_from) }} - {{
                          $filters.ymdFormatTimestamp(work.work_time_to)
                        }}
                      </div>
                    </div>
                    <div class="work-exp-item-3">{{ work.location }}</div>

                    <div class="work-exp-item-4">
                      {{ work.teaching_experience }}
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="interest-container">
          <div class="interest-t">
            <div class="interest-label">Interest</div>
          </div>

          <div class="interest-content">
            <!--                    展示 -->
            <div class="object-show-container" v-if="canEditHobby === false">
              <div class="object-show-item" v-for="(item,i) in hobbiesList" :key="i">
                {{ item }}
              </div>
            </div>
          </div>
        </div>

        <div class="media-container">
          <div class="background-banner-container">
            <div class="background-banner-t">
              <div class="background-banner-t-label">Background Banner</div>
            </div>
            <div class="background-banner-content">
                <el-image v-if="backgroundUrl" :src="backgroundUrl" class="background-avatar"></el-image>
            </div>
          </div>
          <div class="account-images-container">
            <div class="account-images-t">
              <div class="account-images-t-label">Account Images(6 max)</div>
            </div>
            <div class="account-images-content">
              <div class="account-images-item-container" >
                <div class="account-images-item" v-for="(item,i) in accountImageFileList" :key="i" >
                  <el-image class="account-images-img" :src="item.url" fit="contain"></el-image>
                </div>
              </div>

              <el-dialog width="50%" v-model="dialogAccountImageVisible" center>
                <el-image :src="dialogAccountImageUrl"></el-image>
              </el-dialog>
            </div>
          </div>
          <div class="intro-video-container">
            <div class="intro-video-t">
              <div class="intro-video-t-label">Intro Video</div>
            </div>
            <div class="intro-video-content" v-if="introVideoUrl">
              <video :src="introVideoUrl" controls class="intro-video-avatar"/>
            </div>
          </div>
          <div class="my-resume-container">
            <div class="my-resume-t">
              <div class="my-resume-t-label">Your Resume</div>
            </div>
            <div class="my-resume-content" v-if="resumeUrl">
              <a :href="resumeUrl" target="_blank" class="resume-avatar">
                [PDF] Click to Preview
              </a>
            </div>
          </div>
        </div>

        <div class="preferences-container">
          <div class="preferences-label">Preferences</div>
          <div class="preferences-content">
            <div class="subject-teach-container">
              <div class="subject-teach-t">
                <div class="subject-teach-t-label">Preferred Subject to Teach</div>
              </div>
              <div class="subject-teach-content">
                <!--                    展示 -->
                <div class="object-show-container" >
                  <div class="object-show-item" v-for="(cer,i) in subjectList" :key="i">
                    {{ cer.object_en }}
                  </div>
                </div>
              </div>
            </div>
            <div class="p-location-container">
              <div class="p-location-t">
                <div class="p-location-t-label">Location</div>
              </div>
              <div class="p-location-content">
                <!--                    展示 -->
                <div class="object-show-container" >
                  <div class="object-show-item" v-for="(cer,i) in locationList" :key="i">
                    {{ cer.object_en }}
                  </div>
                </div>
              </div>
            </div>
            <div class="p-job-type-container">
              <div class="p-job-type-t">
                <div class="p-job-type-t-label">Preferred Job Type</div>
              </div>
              <div class="p-job-type-content">
                <!--                    展示 -->
                <div class="object-show-container" >
                  <div class="object-show-item" v-for="(cer,i) in jobTypeList" :key="i">
                    {{ cer.object_en }}
                  </div>
                </div>
              </div>
            </div>
            <div class="age-teach-container">
              <div class="age-teach-t">
                <div class="age-teach-t-label"> Preferred Age To Teach</div>
              </div>
              <div class="age-teach-content">
                <!--                    展示 -->
                <div class="object-show-container" >
                  <div class="object-show-item" v-for="(cer,i) in ageToTeachList" :key="i">
                    {{ cer.object_en }}
                  </div>
                </div>
              </div>
            </div>
            <div class="p-benefits-container">
              <div class="p-benefits-t">
                <div class="p-benefits-t-label">Preferred Benefits</div>
              </div>
              <div class="p-benefits-content">
                <!--                    展示 -->
                <div class="object-show-container" >
                  <div class="object-show-item" v-for="(cer,i) in benefitsList" :key="i">
                    {{ cer.object_en }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="job-xll-r-container">

        <div class="contact-container" v-if="userContact">
          <div class="contact-label">Contact Person</div>
          <div class="contact-content">
            <div class="contact-l">
              <el-avatar  class="contact-profile-photo" :src="userContact.headimgurl"></el-avatar>
            </div>
            <div class="contact-r">
              <div class="contact-r-t">
                Hi I am {{ userContact.first_name }}.
              </div>
              <div class="contact-r-b">
                <el-button type="primary" @click="chat(userContact.id)">Let's Chat!</el-button>
              </div>
            </div>
          </div>
        </div>

        <latestIndustryNews></latestIndustryNews>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import {
  ADD_TO_CHAT, USER_INFO_VISITOR_V2
} from "@/api/api";
import latestIndustryNews from "@/components/latestIndustryNews";
import {useStore} from 'vuex'
import {useRoute} from "vue-router";


export default {
  name: "person",
  setup(){
    const store = useStore()
    const Route = useRoute()
    const identityR = Route.query.identity

    const setNowChatUserInfo = (data) => store.commit('nowChatUserInfo',data)
    const setShowChatStatus = () => store.commit('showChatStatus', true)
    const locationUrl  = window.location.href;
    return {
      setNowChatUserInfo,
      setShowChatStatus,
      locationUrl,
      identityR
    }

  },
  data() {
    return {
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
  components:{
    latestIndustryNews
  },
  mounted() {
    let userId = this.$route.query.id;
    let identity = this.$route.query.identity;

    this.getVisitorBasicInfo(userId,identity)

  },
  methods: {
    turnBack(){
      this.$router.go(-1)
    },
    initMap(lng,lat){
      mapboxgl.accessToken = this.accessToken;

      const map = new mapboxgl.Map({
        container: "mapContainer",
        center: [lng, lat],
        style: this.mapStyle,
        zoom: 12
      });

      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "top-right");

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      });

      map.addControl(geolocate, "top-right")

      const geocoder = new MapboxGeocoder({
        "accessToken": this.accessToken,
        "mapboxgl": mapboxgl
      })

      map.addControl(geocoder, 'top-left')
      const marker = new mapboxgl.Marker()
      marker.setLngLat([lng,lat]).addTo(map)

    },
    getVisitorBasicInfo(uid,identity) {

      let params = {
        user_id: uid,
        identity: identity
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

          if (educatorContact.profile_photo) {
            this.profilePhotoUrl = educatorContact.profile_photo
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
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    chat(userId){
      console.log(userId)
      let token = localStorage.getItem('token')
      if(!token || token === ''){
        return this.$router.push('/edupassport')
      }
      let userInfo = this.userInfo;

      let type = this.GoEasy.IM_SCENE.PRIVATE;
      let name = userInfo.first_name+' '+ userInfo.last_name;
      let avatar = userInfo.profile_photo ? userInfo.profile_photo : 'https://oss.esl-passport.cn/educator.png';

      let nowUserInfo = {
        uuid:userId,
        name:name,
        avatar:avatar,
        identity:1
      }

      let textMessage = this.goEasy.im.createTextMessage({
        text: 'Hello',
        to: {
          id: userId,
          type: type,
          data: {
            name: name,
            avatar: avatar,
            identity:1
          }
        }
      });

      let localHistory;
      if (type === this.GoEasy.IM_SCENE.PRIVATE) {
        localHistory = this.service.getPrivateMessages(userId);
      } else {
        localHistory = this.service.getGroupMessages(userId);
      }
      // console.log(localHistory)
      localHistory.push(textMessage)

      this.goEasy.im.sendMessage({
        message: textMessage,
        onSuccess: function (message) {
          console.log("发送成功.", message);
        },
        onFailed: function (error) {
          console.log("发送失败:", error);
        }
      });

      this.setShowChatStatus()
      this.setNowChatUserInfo(nowUserInfo)

    },
    addUserToChat(userId,toIdentity,identity){
      let params = {
        identity:identity,
        to_identity:toIdentity,
        to_user_id: userId
      }

      ADD_TO_CHAT(params).then(res=>{
        if(res.code === 200){
          console.log('add Chat successfuly')
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
  background-color: #f5f6f7;
}

.detail-row {
  width: 1100px;
  margin: 0 auto;
  text-align: left;
  padding: 20px 0;
}

.detail-l-col {
  padding:0 20px 20px 20px;
}

/deep/ .back-btn span{
  display: flex;
  align-items: center;
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

.logo-avatar {
  width: 178px;
  height: 178px;
  border-radius: 50%;
}

.business-info-content {
  padding: 10px 0;
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
.background-avatar{
  border-radius:10px;
}

.job-xll-r-container{
  padding-top:40px;
}
.job-detail-share-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: #FFFFFF;
  padding:10px 20px;
  border-radius: 10px;
}

.jobs-favorite{
  cursor: pointer;
}

.xll-heart-icon{
  font-size: 34px;
}

.company-bio-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
  min-height: 200px;
}

.company-bio-label {
  font-weight: bold;
  font-size: 18px;
}

.company-bio-label-underline {
  width: 100%;
  margin-top: 4px;
  border-bottom: 2px solid #ff2870;
}

.company-bio-content{
  padding-top:10px;
}

.company-logo-container {
  float: left;
  padding: 10px;
}

.company-logo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #EEEEEE;
}

.company-bio-text {
  min-height: 140px;
  font-size: 14px;
  word-wrap: break-word;
}

.view-profile-btn-container {
  padding: 10px 0;
}

.view-profile-btn {
  font-size: 14px;
  margin-top: 10px;
}

.contact-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
}

.contact-label {
  font-weight: bold;
  font-size: 18px;
}

.contact-content {
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.contact-l {
  padding: 10px;
}

.contact-profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.contact-r{
  padding: 10px;
}
.contact-r-t {
  font-size: 14px;
  font-weight: bold;
}

.contact-r-b {
  font-size: 14px;
  margin-top: 20px;
}
.other-jobs-container{
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
}

.other-jobs-label{
  font-weight: bold;
  font-size: 18px;
}

.other-jobs-content{
  padding: 10px 0;

}
.other-jobs-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eeeeee;
}
.other-jobs-l{
  padding: 10px;
}

.other-jobs-logo{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.other-jobs-r{
  padding: 10px;
}
.other-jobs-r-t a{
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
}
.other-jobs-r-t a:hover{
  text-decoration: underline;
}
.other-jobs-r-b{
  font-size: 14px;
  margin-top: 20px;
}

.map-container{
  height: 300px;
}
.basemap{
  width: 100%;
  height: 100%;
}

.social-share-container {
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
}

.social-share-icon-container {
  width: 30px;
  height: 30px;
  border: 2px solid #1E7AA2;
  background-color: #FFFFFF;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.social-share-icon-expand {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.social-share-icon-expand >>> a {
  margin-left: -6px;
  background-color: #FFFFFF;
  width: 30px;
  height: 30px;
  border: 2px solid #000000;
  display: flex;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.xll-icon {
  font-size: 24px;
}

.map-container{
  margin-top: 10px;
  width: 100%;
  height: 300px;
  text-align: center;
}

.basemap{
  width: 100%;
  height: 100%;

}
.detail-swiper-container {
  margin-top: 20px;
}

.detail-swiper-item {
  border-radius: 20px;
  width:100%;
}

.detail-swiper-banner-image {
  width:100%;
  border-radius: 20px;
}

.basic-info-margin{
  margin-top: 20px;
}
.basic-info-container {
  margin-top: 20px;
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
