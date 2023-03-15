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

              <template v-if="isFromOther">
                <el-button class="account-profile-cancel-btn" plain round
                           v-if="isFavorite"
                           @click="cancelFavorite(educatorContact.id, 4)">
                  <el-icon color="#6650B3" :size="20">
                    <IconFontistoFavorite/>
                  </el-icon>
                  FAVORITED
                </el-button>
                <el-button class="account-profile-cancel-btn" plain round
                           v-if="!isFavorite"
                           @click="addFavorite(educatorContact.id, 4, educatorContact.name, educatorContact.profile_photo)">
                  <el-icon :size="20">
                    <CollectionTag/>
                  </el-icon>
                  FAVORITED
                </el-button>
                <chatButton text="SEND A MESSAGE"
                            :target-user="educatorContact"
                            @onSuccess="chatSuccess"
                            btn-style="primary"
                            :identity="1">
                ></chatButton>

              </template>
              <template v-else>

<!--                <el-button @click="exportPdf()">EXPORT PDF</el-button>-->
              </template>

            </div>
          </div>

          <el-scrollbar class="profile-c-container">

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
                        {{ $filters.textEllipsis(educatorContact.bio, bioTextLength) }}
                        <template v-if="$filters.textEllipsisStatus(educatorContact.bio, bioTextLength)">
                          <el-button v-if="bioTextLength===-1"
                                     class="readmore-btn"
                                     link
                                     type="primary"
                                     @click="closeMoreForBio()">
                            close
                          </el-button>
                          <el-button v-else
                                     class="readmore-btn"
                                     link
                                     type="primary"
                                     @click="readMoreForBio()">
                            read more
                          </el-button>
                        </template>
                      </p>

                      <div class="basic-info-c-r-b">
                        <div class="basic-info-c-hobbies">
                          <div class="basic-info-c-hobby">
                            <el-icon color="#6648ff">
                              <IconEpLocationInformation />
                            </el-icon>
                             {{educatorContact.address}}
                          </div>
                        </div>
<!--                        <div class="basic-info-c-hobbies">-->
<!--                          <div class="basic-info-c-hobby"-->
<!--                               v-for="(item,i) in countriesLivedList" :key="i">-->
<!--                            {{ item.object_en }}-->
<!--                          </div>-->
<!--                        </div>-->
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
                      <div class="exp-c-item-1"  >
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
                        {{ $filters.textEllipsis(work.teaching_experience, work.len) }}
                        <template v-if="$filters.textEllipsisStatus(work.teaching_experience, work.len)">
                          <el-button v-if=" work.len === -1"
                                     class="readmore-btn"
                                     link
                                     type="primary"
                                     @click="closeMoreForWorkExp(i)">
                            close
                          </el-button>
                          <el-button v-else
                                     class="readmore-btn"
                                     link
                                     type="primary"
                                     @click="readMoreForWorkExp(i)">
                            read more
                          </el-button>
                        </template>
                      </div>
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
                      <div class="education-c-item-r-1" >
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
                        {{ $filters.textEllipsis(education.field_of_study, education.len) }}
                        <template v-if="$filters.textEllipsisStatus(education.field_of_study, education.len)">
                          <el-button v-if=" education.len === -1"
                                     class="readmore-btn"
                                     link
                                     type="primary"
                                     @click="closeMoreForEducation(i)">
                            close
                          </el-button>
                          <el-button v-else
                                     class="readmore-btn"
                                     link
                                     type="primary"
                                     @click="readMoreForEducation(i)">
                            read more
                          </el-button>
                        </template>

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
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <div class="preferences-c-item">
                        <div class="preferences-c-item-label">Places lived</div>
                        <div class="object-show-container" >
                          <div class="object-show-item" v-for="(item,i) in countriesLivedList" :key="i">
                            {{ item.object_en }}
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <div class="preferences-c-item">
                        <div class="preferences-c-item-label">Places traveled</div>
                        <div class="object-show-container" >
                          <div class="object-show-item" v-for="(item,i) in countriesTraveledList" :key="i">
                            {{ item.object_en }}
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <div class="preferences-c-item">
                        <div class="preferences-c-item-label">Certifications</div>
                        <div class="object-show-container" >
                          <div class="object-show-item" v-for="(cer,i) in certificationsList" :key="i">
                            {{ cer.object_en }}
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <div class="preferences-c-item">
                        <div class="preferences-c-item-label">Subject to Teach</div>
                        <div class="object-show-container">
                          <div class="object-show-item" v-for="(cer,i) in subjectList" :key="i">
                            {{ cer.object_en }}
                          </div>
                        </div>
                      </div>
                    </el-col>

                  </el-row>

                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <div class="preferences-c-item">
                        <div class="preferences-c-item-label">Preferred Job Type</div>
                        <div class="object-show-container">
                          <div class="object-show-item" v-for="(cer,i) in jobTypeList" :key="i">
                            {{ cer.object_en }}
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <div class="preferences-c-item">
                        <div class="preferences-c-item-label"> Preferred Age To Teach</div>
                        <div class="object-show-container" >
                          <div class="object-show-item" v-for="(cer,i) in ageToTeachList" :key="i">
                            {{ cer.object_en }}
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
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

          </el-scrollbar>

        </div>

      </div>

    </div>

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
  USER_INFO_BY_TOKEN_V2,
  EDUCATOR_PERCENTAGE_V2,USER_INFO_VISITOR_V2, ADD_FAVORITE, CANCEL_FAVORITE
} from '@/api/api'
import {decode} from 'js-base64'

import chatButton from "@/components/chat/chatButton";
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "profile",
  components: {
    meSideMenu,
    Swiper,
    SwiperSlide,
    chatButton
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
      educatorContact: {},
      userContact: {},
      certificationsList: [],
      educationInfo: [],
      teachExpList: [],
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
      profilePhotoUrl: '',
      backgroundUrl: '',
      accountImageFileList: [],
      introVideoUrl: '',
      resumeUrl: '',
      isFromOther:false,
      isFavorite:false,
      bioTextLength:140,


    }
  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  mounted() {

    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      updateWindowHeight()
    }

    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        updateWindowHeight()
      }
    }

    let str = this.$route.query.str
    if(str){
      let strDecode = decode(str)
      let strParse = JSON.parse(strDecode)

      if(strParse.from == 'other'){
        this.isFromOther = true;
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
    readMoreForBio(){
      this.bioTextLength = -1
    },
    closeMoreForBio(){
      this.bioTextLength = 140
    },
    readMoreForWorkExp(i){
      this.workInfo[i]['len'] = -1
    },
    closeMoreForWorkExp(i){
      this.workInfo[i]['len'] = 240
    },
    readMoreForEducation(i){
      this.educationInfo[i]['len'] = -1
    },
    closeMoreForEducation(i){
      this.educationInfo[i]['len'] = 240
    },
    chatSuccess(){
      this.$router.push({path:'/chat/messages'})
    },
    cancelFavorite(type, typeId) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.isFavorite = false
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addFavorite(id, type, title, url){
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: id,
        type_title: title,
        type_url: url
      }
      ADD_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.isFavorite = true;
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
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
            let workInfo = educatorContact.work_info;
            workInfo.forEach(item=>{
              item.len = 240
            })
            this.workInfo = workInfo;
          }

          if (educatorContact.education_info) {
            let educationInfo = educatorContact.education_info;
            educationInfo.forEach(item=>{
              item.len = 240
            })
            this.educationInfo = educationInfo
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
            this.introVideoUrl = videoUrl
          }
          if (resumePdf) {

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

            }

          }

          if (educatorContact.work_info) {
            let workInfo = educatorContact.work_info;
            workInfo.forEach(item=>{
              item.len = 240
            })
            this.workInfo = workInfo;
          }

          if (educatorContact.education_info) {
            let educationInfo = educatorContact.education_info;
            educationInfo.forEach(item=>{
              item.len = 240
            })
            this.educationInfo = educationInfo
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
            this.introVideoUrl = videoUrl
          }
          if (resumePdf) {

            this.resumeUrl = resumePdf
          }


        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    exportPdf(){
      window.print()
    }

  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.readmore-btn{
  color: #9173ff;
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
  margin:30px 0 50px 0;
}

.account-profile-t{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height:60px;
  margin: 0 50px;
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

.profile-c-container{
  height: calc(100vh - 280px);

}

.account-profile-save-btn{
  font-size:20px;
}

.languages-container {
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.languages-label {
  font-size: 14px;
  font-weight: bold;
}

.education-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
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


.profile-1-container{
  background-color:#FFFFFF;
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;

  margin: 0 50px 30px 50px;
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
  align-items: flex-start;
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
  border:1px solid #FFFFFF;
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
  border:1px solid #FFFFFF;
  cursor: pointer;
}

.basic-info-c-container{
  width: calc( 100% - 290px );
  margin-top: 25px;
  margin-bottom: 25px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
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
}

.basic-info-c-r span{
  color:#6650B3;
  font-size: 23px;
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
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
  flex-wrap: wrap;
}

.basic-info-c-hobby{
  display: flex;
  align-items: center;

  margin-right: 15px;
  font-size: 23px;
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color:#262626;
}

.profile-2-container{
  background-color:#FFFFFF;
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;
  margin: 0 50px 30px 50px;
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
  margin: 0 50px 30px 50px;
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
  margin: 0 50px 30px 50px;
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
  margin: 0 50px 30px 50px;
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

  .educator-r-container{
    width: 100%;
  }

  .educator-r-container-bg{
    padding: 0;
    margin: 0;
  }

  .account-profile-t{
    height: 50px;
    padding: 0 15px;
    margin: 0;
  }

  .account-profile-cancel-btn{
    font-size: 12px;
  }

  .profile-c-container{
    height: calc( var(--i-window-height) - 210px);
  }

  .profile-1-container{
    margin: 15px;
    box-shadow: 0px 0px 10px #00000012;
  }

  .profile-background-container{
    height: 150px;
  }

  .basic-info-images-container{
    width: 66px;
    height: 66px;
  }
  .basic-info-profile-photo{
    width: 66px;
    height: 66px;
    position: relative;
    left: 0;
    top: 0;
    border: 1px solid #FFFFFF;
  }

  .basic-info-c-container{
    width: calc(100% - 91px);
    margin-top: 0;
  }

  .basic-info-six-pic-container{
    left: 56px;
    bottom: 1px;
    z-index: 10;

  }

  .basic-info-six-pic{
    width: 25px;
    height: 25px;
    border: 1px solid #FFFFFF;
  }

  .basic-info-1-container{
    position: relative;
  }

  .basic-info-images-container{
    position: absolute;
    top: -30px;
    left: 15px;
  }


  .basic-info-c-container{
    width: 100%;
    flex-direction: column;
    align-items: flex-start;

  }

  .basic-info-c-l{
    width: auto;
    padding-left: 110px;
    padding-top: 10px;
  }

  .basic-info-c-name{
    font-size: 18px;
  }
  .basic-info-c-title{
    font-size: 14px;
  }
  .basic-info-c-nationality{
    font-size: 14px;
  }

  .basic-info-c-r{
    margin:15px 15px 15px 15px;
    padding-right: 0;
    width: auto;
    display: flex;
    flex-direction: column-reverse;
  }

  .basic-info-c-r p{
    font-size: 14px;
  }

  .basic-info-c-hobby{
    font-size: 13px;
  }

  .profile-2-container{

    margin: 15px;
  }

  .exp-container{
    padding: 15px;
    margin-top: 0;
  }

  .exp-label{
    font-size: 18px;
  }

  .exp-years{
    font-size: 14px;
  }

  .exp-c-container{
    margin-top: 15px;
  }

  .exp-c-item{
    margin-bottom: 15px;
  }
  .exp-c-item-1{
    font-size: 18px;
  }
  .exp-c-item-2{
    font-size: 14px;
  }
  .exp-c-item-3{
    font-size: 14px;
  }
  .exp-c-item-4{
    font-size: 14px;
    margin-top: 15px;
  }

  .profile-3-container{
    margin: 15px;
  }

  .education-container{
    padding: 15px;
    margin-top: 0;
  }

  .education-label{
    font-size: 18px;
  }
  .education-c-container{
    margin-top: 15px;
  }
  .education-c-item{
    margin: 15px 15px 15px 0;
  }
  .education-c-item-r-1{
    font-size: 18px;
  }
  .education-c-item-r-2{
    font-size: 14px;
  }
  .education-c-item-r-3{
    font-size: 14px;
  }
  .education-c-item-r-4{
    font-size: 14px;
    margin-top: 15px;
  }

  .profile-4-container{
    margin: 15px;

  }

  .languages-container{
    padding: 15px;
  }

  .languages-label{
    font-size: 18px;
  }
  .languages-c-container{
    margin-top: 15px;
  }
  .languages-c-item{
    margin: 10px 10px 10px 0;
  }
  .languages-c-item-l{
    font-size: 14px;
  }
  .languages-c-item-r{
    font-size: 14px;
    margin-left: 10px;
    padding-left: 0;
  }

  .profile-5-container{
    margin: 15px;

  }

  .preferences-container{
    padding: 15px;
  }
  .preferences-label{
    font-size: 18px;
  }
  .preferences-c-container{
    margin-top: 15px;
  }

  .preferences-c-item-label{
    font-size: 14px;
  }
  .object-show-item{
    font-size: 12px;
  }

}

</style>
