<template>
  <div class="bg">
    <div class="educator-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <accountInfo></accountInfo>
          <div class="educator-r-container">
            <div class="basic-info-container">
              <div class="basic-info-t">
                <div class="basic-info-label">Basic Info</div>
                <div class="basic-info-edit" @click="editBasicInfo()">Edit</div>
              </div>

              <div class="basic-info-content">
                <div class="basic-info-item">
                  First & Last Name: <span>{{ educatorInfo.first_name }} {{ educatorInfo.last_name }}</span>
                </div>
                <div class="basic-info-item">
                  Email: <span>{{ educatorInfo.email }}</span>
                </div>
                <div class="basic-info-item">
                  Wechat ID: <span>{{ educatorInfo.wx_id }}</span>
                </div>
                <div class="basic-info-item">
                  Gender:
                  <span v-if="basicUserInfo.sex == 1">Male</span>
                  <span v-if="basicUserInfo.sex == 2">Female</span>
                  <span v-if="basicUserInfo.sex == 3">No Gender Requirements</span>

                </div>
                <div class="basic-info-item">
                  Nationality: <span>{{ educatorInfo.nationality }}</span>
                </div>
                <div class="basic-info-item">
                  Birthdate: <span>{{ basicUserInfo.birthday }}</span>
                </div>
                <!--                <div class="basic-info-item">-->
                <!--                  Location: <span>shangqiu, shangqiu , henan</span>-->
                <!--                </div>-->
                <div class="basic-info-item">
                  Educator Category: <span>{{ educatorInfo.sub_identity_name }}</span>
                </div>
                <div class="basic-info-item">
                  Job Seeking :
                  <el-switch v-model="basicUserInfo.is_seeking" :active-value="1" disabled></el-switch>
                </div>
                <div class="basic-info-item">
                  Public Profile:
                  <el-switch v-model="basicUserInfo.is_public" :active-value="1" disabled></el-switch>
                </div>
              </div>
            </div>

            <div class="credentials-container">
              <div class="credentials-label">Credentials</div>
              <div class="credentials-content">
                <div class="languages-container">
                  <div class="languages-t">
                    <div class="languages-label">Languages</div>
                    <div class="languages-edit" @click="editLanguages()">Edit</div>
                  </div>
                  <div class="languages-content" v-if="educatorInfo.languages">
                    <div class="languages-item" v-for="(item,i) in educatorInfo.languages" :key="i">
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
                    <div class="certifications-edit" v-if="!canEditCertifications"
                         @click="turnIndexList(7)">Edit
                    </div>
                    <div class="certifications-edit" v-if="canEditCertifications"
                         @click="certificationsConfirm()">Confirm
                    </div>
                  </div>
                  <div class="certifications-content">
                    <!--                    展示 -->
                    <div class="object-show-container" v-if="canEditCertifications === false">
                      <div class="object-show-item" v-for="(cer,i) in certificationsList" :key="i">
                        {{ cer.object_en }}
                      </div>
                    </div>
                    <!--                    编辑-->
                    <div class="object-tags-container" v-if="canEditCertifications">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectCertificationsList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in editCertificationsList" :key="index"
                             @click="selectCertifications(item,1)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectCertificationsList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownCertificationsList" :key="index"
                             @click="selectCertifications(item,2)">
                          {{ item.object_name }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addCertificationsStatus==false"
                             @click="addCertificationsStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addCertificationsStatus">
                          <el-input type="text" v-model="ownCertificationsValue"
                                    placeholder="Add certifications"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownCertificationsValue.length>0"
                                       @click="addOwnCertifications">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownCertificationsValue.length==0"
                                       @click="addCertificationsStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
                <div class="education-container">
                  <div class="education-t">
                    <div class="education-t-label">Education</div>
                    <div class="education-t-edit" @click="addUserEducation()">Add+</div>
                  </div>
                  <div class="education-content">
                    <template v-for="(education,i) in educationInfo" :key="i">
                      <div class="education-item" v-if="i<educationNum">
                        <div class="education-school-name" @click="turnEditEducation(education)">
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
                    <div class="show-more" v-if="showMoreEducationStatus " @click="showMoreEducation">
                      Show More
                    </div>
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
                    <div class="teaching-exp-edit" v-if="!canEditTeachExp"
                         @click="turnIndexList(120)">Edit
                    </div>
                    <div class="teaching-exp-edit" v-if="canEditTeachExp"
                         @click="teachExpConfirm()">Confirm
                    </div>
                  </div>
                  <div class="teaching-exp-content">
                    <!--                    展示 -->
                    <div class="object-show-container" v-if="canEditTeachExp === false">
                      <div class="object-show-item" v-for="(item,i) in teachExpList" :key="i">
                        {{ item.object_en }}
                      </div>
                    </div>
                    <!--                    编辑-->
                    <div class="object-tags-container" v-if="canEditTeachExp">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectTeachExpList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in editTeachExpList" :key="index"
                             @click="selectTeachExp(item,1)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectTeachExpList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownTeachExpList" :key="index"
                             @click="selectTeachExp(item,2)">
                          {{ item.object_name }}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="places-traveled">
                  <div class="places-traveled-t">
                    <div class="places-traveled-label"> Places Traveled</div>
                    <div class="places-traveled-edit" v-if="!canEditCountriesTraveled"
                         @click="turnIndexList(8)">Edit
                    </div>
                    <div class="places-traveled-edit" v-if="canEditCountriesTraveled"
                         @click="countriesTraveledConfirm()">Confirm
                    </div>
                  </div>
                  <div class="places-traveled-content">
                    <!--                    展示 -->
                    <div class="object-show-container" v-if="canEditCountriesTraveled === false">
                      <div class="object-show-item" v-for="(item,i) in countriesTraveledList" :key="i">
                        {{ item.object_en }}
                      </div>
                    </div>
                    <!--                    编辑-->
                    <div class="object-tags-container" v-if="canEditCountriesTraveled">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectCountriesTraveledList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in editCountriesTraveledList" :key="index"
                             @click="selectCountriesTraveled(item,1)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectCountriesTraveledList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownCountriesTraveledList" :key="index"
                             @click="selectCountriesTraveled(item,2)">
                          {{ item.object_name }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addCountriesTraveledStatus==false"
                             @click="addCountriesTraveledStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addCountriesTraveledStatus">
                          <el-input type="text" v-model="ownCountriesTraveledValue"
                                    placeholder="Add certifications"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownCountriesTraveledValue.length>0"
                                       @click="addOwnCountriesTraveled()">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownCountriesTraveledValue.length==0"
                                       @click="addCountriesTraveledStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="places-lived">
                  <div class="places-lived-t">
                    <div class="places-lived-label">Places Lived</div>
                    <div class="places-lived-edit" v-if="!canEditCountriesLived"
                         @click="turnIndexList(9)">Edit
                    </div>
                    <div class="places-lived-edit" v-if="canEditCountriesLived"
                         @click="countriesLivedConfirm()">Confirm
                    </div>
                  </div>
                  <div class="places-lived-content">
                    <!--                    展示 -->
                    <div class="object-show-container" v-if="canEditCountriesLived === false">
                      <div class="object-show-item" v-for="(cer,i) in countriesLivedList" :key="i">
                        {{ cer.object_en }}
                      </div>
                    </div>
                    <!--                    编辑-->
                    <div class="object-tags-container" v-if="canEditCountriesLived">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectCountriesLivedList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in editCountriesLivedList" :key="index"
                             @click="selectCountriesLived(item,1)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectCountriesLivedList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownCountriesLivedList" :key="index"
                             @click="selectCountriesLived(item,2)">
                          {{ item.object_name }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addCountriesLivedStatus==false"
                             @click="addCountriesLivedStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addCountriesLivedStatus">
                          <el-input type="text" v-model="ownCountriesLivedValue"
                                    placeholder="Add certifications"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownCountriesLivedValue.length>0"
                                       @click="addOwnCountriesLived">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownCountriesLivedValue.length==0"
                                       @click="addCountriesLivedStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="work-exp-container">
                  <div class="work-exp-t">
                    <div class="work-exp-t-label">Work Experience</div>
                    <div class="work-exp-t-edit" @click="addEducationWork()">Add+</div>
                  </div>
                  <div class="work-exp-content">
                    <div v-for="(work,i) in workInfo" :key="i">
                      <div class="work-exp-b-item" v-if="i<=workExpNum">
                        <div class="work-exp-item-1">
                          {{work.company_name}}
                        </div>
                        <div class="work-exp-item-2">
                          <div class="work-exp-job-title"
                               @click="turnEditWorkExperience(work)">{{work.title}}</div>
                          <div class="work-exp-date">
                            {{$filters.ymdFormatTimestamp(work.work_time_from) }} - {{
                              $filters.ymdFormatTimestamp(work.work_time_to) }}
                          </div>
                        </div>
                        <div class="work-exp-item-3">{{work.location}}</div>

                        <div class="work-exp-item-4">
                          {{work.teaching_experience}}
                        </div>

                      </div>
                    </div>
                    <div class="show-more" v-if="showMoreWorkExpStatus" @click="showMoreWorkExp">
                      Show More
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="interest-container">
              <div class="interest-t">
                <div class="interest-label">Interest</div>
                <div class="interest-edit"  @click="canEditHobby=true" v-if="canEditHobby===false">Edit</div>
                <div class="interest-edit"  @click="hobbyConfirm()" v-if="canEditHobby">Confirm</div>
              </div>

              <div class="interest-content">
                <!--                    展示 -->
                <div class="object-show-container" v-if="canEditHobby === false">
                  <div class="object-show-item" v-for="(item,i) in hobbiesList" :key="i">
                    {{ item }}
                  </div>
                </div>
                <!--                    编辑-->
                <div class="object-tags-container" v-if="canEditHobby">
                  <div class="object-tags">
                    <div class="object-tags-item"
                         :class=" selectHobbyInfoList.indexOf(item) == -1 ? '' : 'tags-active' "
                         v-for="(item,index) in editHobbyInfoList" :key="index"
                         @click="selectHobby(item,1)">
                      {{ item }}
                    </div>
                  </div>
                  <div class="object-tags">
                    <div class="object-tags-item"
                         :class=" selectHobbyInfoList.indexOf(item) == -1 ? '' : 'tags-active' "
                         v-for="(item,index) in ownHobbyInfoList" :key="index"
                         @click="selectHobby(item,2)">
                      {{ item }}
                    </div>
                  </div>
                  <div class="object-tags">
                    <div class="object-tags-item" v-if="addHobbyInfoStatus==false"
                         @click="addHobbyInfoStatus=true">Add+
                    </div>
                  </div>

                  <div class="object-tags-add">
                    <div class="object-tags-item-add" v-if="addHobbyInfoStatus">
                      <el-input type="text" v-model="ownHobbyInfoValue"
                                placeholder="Add Hobbies"></el-input>
                      <div class="object-tags-item-btn-container">
                        <el-button class="object-tags-item-btn" type="primary"
                                   v-if="ownHobbyInfoValue.length>0"
                                   @click="addOwnHobby()">Confirm
                        </el-button>
                        <el-button class="object-tags-item-btn" type="primary"
                                   v-if="ownHobbyInfoValue.length==0"
                                   @click="addHobbyInfoStatus=false">Cancel
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="media-container">
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
                    <el-image v-if="profilePhotoUrl" :src="profilePhotoUrl" class="profile-avatar" ></el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
              <div class="background-banner-container">
                <div class="background-banner-t">
                  <div class="background-banner-t-label">Background Banner</div>
                </div>
                <div class="background-banner-content">
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
                    <el-image v-if="backgroundUrl" :src="backgroundUrl" class="background-avatar" ></el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </div>
              </div>
              <div class="account-images-container">
                <div class="account-images-t">
                  <div class="account-images-t-label">Account Images(6 max)</div>
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
                  <div class="intro-video-t-label">Intro Video</div>
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
                    <video v-if="introVideoUrl" :src="introVideoUrl" controls class="intro-video-avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
              <div class="my-resume-container">
                <div class="my-resume-t">
                  <div class="my-resume-t-label">Your Resume</div>
                </div>
                <div class="my-resume-content">
                  <el-upload
                      class="resume-uploader"
                      :action="uploadActionUrl"
                      :headers="uploadHeaders"
                      :data="uploadData"
                      :show-file-list="false"
                      name="file[]"
                      :on-success="handleResumeSuccess"
                      :before-upload="beforeResumeUpload"
                  >
                    <a v-if="resumeUrl" :href="resumeUrl" class="resume-avatar" >[PDF] Click to Preview</a>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </div>
            </div>

            <div class="preferences-container">
              <div class="preferences-label">Preferences</div>
              <div class="preferences-content">
                <div class="subject-teach-container">
                  <div class="subject-teach-t">
                    <div class="subject-teach-t-label">Preferred Subject to Teach</div>
                    <div class="subject-teach-t-edit" @click="turnIndexList(1)" v-if="canEditSubject===false">Edit</div>
                    <div class="subject-teach-t-edit" @click="subjectConfirm" v-if="canEditSubject">Confirm</div>
                  </div>
                  <div class="subject-teach-content">
                    <!--                    展示 -->
                    <div class="object-show-container" v-if="canEditSubject === false">
                      <div class="object-show-item" v-for="(cer,i) in subjectList" :key="i">
                        {{ cer.object_en }}
                      </div>
                    </div>
                    <!--                    编辑-->
                    <div class="object-tags-container" v-if="canEditSubject">
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
                  </div>
                </div>
                <div class="p-location-container">
                  <div class="p-location-t">
                    <div class="p-location-t-label">Location</div>
                    <div class="p-location-t-edit" @click="turnIndexList(71)" v-if="canEditLocation===false">Edit</div>
                    <div class="p-location-t-edit" @click="locationConfirm" v-if="canEditLocation">Confirm</div>
                  </div>
                  <div class="p-location-content">
                    <!--                    展示 -->
                    <div class="object-show-container" v-if="canEditLocation === false">
                      <div class="object-show-item" v-for="(cer,i) in locationList" :key="i">
                        {{ cer.object_en }}
                      </div>
                    </div>
                    <!--                    编辑-->
                    <div class="object-tags-container" v-if="canEditLocation">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectLocationList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in editLocationList" :key="index"
                             @click="selectLocation(item,1)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectLocationList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownLocationList" :key="index"
                             @click="selectLocation(item,2)">
                          {{ item.object_name }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addLocationStatus==false"
                             @click="addLocationStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addLocationStatus">
                          <el-input type="text" v-model="ownLocationValue"
                                    placeholder="Add location"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownLocationValue.length>0"
                                       @click="addOwnLocation">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownLocationValue.length==0"
                                       @click="addLocationStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="p-job-type-container">
                  <div class="p-job-type-t">
                    <div class="p-job-type-t-label">Preferred Job Type</div>
                    <div class="p-job-type-t-edit" @click="turnIndexList(3)" v-if="canEditJobType===false">Edit</div>
                    <div class="p-job-type-t-edit"  @click="jobTypeConfirm" v-if="canEditJobType">Confirm</div>
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
                <div class="age-teach-container">
                  <div class="age-teach-t">
                    <div class="age-teach-t-label"> Preferred Age To Teach</div>
                    <div class="age-teach-t-edit" @click="turnIndexList(4)" v-if="canEditAgeToTeach===false">Edit</div>
                    <div class="age-teach-t-edit"  @click="ageToTeachConfirm" v-if="canEditAgeToTeach">Confirm</div>
                  </div>
                  <div class="age-teach-content">
                    <!--                    展示 -->
                    <div class="object-show-container" v-if="canEditAgeToTeach === false">
                      <div class="object-show-item" v-for="(cer,i) in ageToTeachList" :key="i">
                        {{ cer.object_en }}
                      </div>
                    </div>
                    <!--                    编辑-->
                    <div class="object-tags-container" v-if="canEditAgeToTeach">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectAgeToTeachList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in editAgeToTeachList" :key="index"
                             @click="selectAgeToTeach(item,1)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectAgeToTeachList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownAgeToTeachList" :key="index"
                             @click="selectAgeToTeach(item,2)">
                          {{ item.object_name }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addAgeToTeachStatus==false"
                             @click="addAgeToTeachStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addAgeToTeachStatus">
                          <el-input type="text" v-model="ownAgeToTeachValue"
                                    placeholder="Add  age to teach"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownAgeToTeachValue.length>0"
                                       @click="addOwnAgeToTeach">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownAgeToTeachValue.length==0"
                                       @click="addAgeToTeachStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                <div class="p-benefits-container">
                  <div class="p-benefits-t">
                    <div class="p-benefits-t-label">Preferred Benefits</div>
                    <div class="p-benefits-t-edit"  @click="turnIndexList(6)" v-if="canEditBenefits===false">Edit</div>
                    <div class="p-benefits-t-edit" @click="benefitsConfirm" v-if="canEditBenefits">Confirm</div>
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
import {VISITOR_USER_INFO, GET_BASIC_INFO, USER_OBJECT_LIST,
  ADD_LANGUAGE_SCORE, ADD_PROFILE,ADD_EDU_BASIC,ADD_USER_INFO,ADD_USER_IMG} from '@/api/api'

export default {
  name: "profile",
  components: {
    meSideMenu,
    accountInfo
  },
  data() {
    return {
      uploadActionUrl:process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders:{
        platform:4
      },
      uploadData:{
        token:localStorage.getItem('token')
      },
      educatorInfo: {},
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

      teachExpList:[],
      canEditTeachExp: false,
      editTeachExpList: [],
      addTeachExpStatus: false,
      ownTeachExpValue: '',
      ownTeachExpList: [],
      selectTeachExpList: [],
      selectTeachExpArr: [],

      countriesLivedList:[],
      countriesTraveledList:[],
      languagesList:[],
      locationList:[],
      jobTypeList:[],
      ageToTeachList:[],
      regionList:[],
      benefitsList:[],
      subjectList:[],
      userImagesList:[],
      workInfo:[],
      hobbiesList:[],

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

      workExpNum:1,
      showMoreWorkExpStatus:true,

      canEditHobby: false,
      editHobbyInfoList: ['Fitness', 'Photography', 'Travel'],
      addHobbyInfoStatus: false,
      ownHobbyInfoValue: '',
      ownHobbyInfoList: [],
      selectHobbyInfoList: [],
      selectHobbyInfoArr: [],

      profilePhotoUrl:'',
      backgroundUrl:'',
      dialogAccountImageUrl:'',
      dialogAccountImageVisible:false,
      accountImageFileList:[],
      introVideoUrl:'',
      resumeUrl:'',

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
    }
  },
  mounted() {
    this.getVisitorBasicInfo()
    // this.getBasicInfo()

  },
  methods: {
    editBasicInfo() {
      this.$router.push('/educator/edit/basic')
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
          if (identity == 1 && res.message.educator_info) {
            this.educatorInfo = res.message.educator_info
            if (res.message.educator_info.Teaching_certificate) {
              this.certificationsList = res.message.educator_info.Teaching_certificate;
            }

            if (res.message.educator_info.education_info) {
              this.educationInfo = res.message.educator_info.education_info;
            }

            if (res.message.educator_info.places_lived) {
              this.countriesLivedList = res.message.educator_info.places_lived;
            }
            if (res.message.educator_info.places_traveled) {
              this.countriesTraveledList = res.message.educator_info.places_traveled;
            }

            if (res.message.educator_info.languages) {
              this.languagesList = res.message.educator_info.languages;
            }
            if (res.message.educator_info.Location) {
              this.locationList = res.message.educator_info.Location;
            }
            if (res.message.educator_info.job_type) {
              this.jobTypeList = res.message.educator_info.job_type;
            }
            if (res.message.educator_info.age_to_teach) {
              this.ageToTeachList = res.message.educator_info.age_to_teach;
            }
            if (res.message.educator_info.region) {
              this.regionList = res.message.educator_info.region;
            }
            if (res.message.educator_info.benefits) {
              this.benefitsList = res.message.educator_info.benefits;
            }
            if (res.message.educator_info.subject) {
              this.subjectList = res.message.educator_info.subject;
            }
            if(res.message.educator_info.user_images){
              this.userImagesList = res.message.educator_info.user_images;
            }
            if (res.message.educator_info.work_info) {
              this.workInfo = res.message.educator_info.work_info;
            }

            if (res.message.educator_info.Teaching_experience) {
              this.teachExpList = res.message.educator_info.Teaching_experience;
            }

            let hobbies = res.message.educator_info.hobbies;
            if (hobbies) {
              this.hobbiesList = hobbies.split(',');
            }

            if(res.message.educator_info.profile_photo){
              this.profilePhotoUrl = res.message.educator_info.profile_photo
            }
            if(res.message.educator_info.header_photo){
              this.backgroundUrl  = res.message.educator_info.header_photo
            }
            let userImages = res.message.educator_info.user_images
            if(userImages){
              userImages.forEach(item=>{
                let userImageObj = {
                  name:'',
                  url:item.url
                }
                this.accountImageFileList.push(userImageObj)
              })
            }

            let videoUrl = res.message.educator_info.video_url
            let resumePdf = res.message.educator_info.resume_pdf
            if(videoUrl){
              this.introVideoUrl = videoUrl
            }
            if(resumePdf){
              this.resumeUrl = resumePdf
            }

          }
        }
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

      }).catch(error => {
        console.log(error)
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
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('certifications--submit--' + res.data);
          this.canEditCertifications = false;
          this.getVisitorBasicInfo()
        }

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

      this.selectTeachExpList.splice(index, 1,obj);
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

      this.selectTeachExpList.splice(index, 1,value);

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
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          this.canEditTeachExp = false;
          this.getVisitorBasicInfo();
        }

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
      let index ;
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
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('travel--submit--' + res.data);
          this.canEditCountriesTraveled = false;
          this.getVisitorBasicInfo();
        }

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
      let index ;
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
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('lived--submit--' + res.data);
          this.canEditCountriesLived = false;
          this.getVisitorBasicInfo();
        }

      })

    },
    addEducationWork(){
      this.$router.push('/educator/edit/work')
    },
    showMoreWorkExp() {
      this.workExpNum = this.workInfo.length;
      this.showMoreWorkExpStatus = false;
    },
    turnEditWorkExperience(work) {
      this.$router.push({path:'/educator/edit/work',query:{workId:work.id,type:2}})
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
        hobbies: hobbiesStr,
        token: localStorage.getItem('token')
      }
      ADD_EDU_BASIC(data).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.canEditHobby = false;
          this.hobbiesList = this.selectHobbyInfoList;
        }
      })

    },
    handleProfilePhotoSuccess(res, file) {
      // console.log(res.data[0]['file_url'])
      this.profilePhotoUrl = URL.createObjectURL(file.raw)
      let params = {
        profile_photo:res.data[0]['file_url'],
        identity:1,
        token:localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      })

    },
    beforeProfilePhotoUpload(file) {

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    handleBackgroundSuccess(res, file) {
      this.backgroundUrl = URL.createObjectURL(file.raw)
      let params = {
        header_photo:res.data[0]['file_url'],
        identity:1,
        token:localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      })
    },
    beforeBackgroundUpload(file) {
      console.log(file)
    },
    handleAccountImageRemove(file, fileList) {
      console.log(file, fileList)
      let accountImagesArr = []
      fileList.forEach(item=>{
        accountImagesArr.push(item.url)
      })
      let params = {
        token:localStorage.getItem('token'),
        identity:1,
        img:accountImagesArr
      }
      ADD_USER_IMG(params).then(res=>{
        if(res.code == 200){
          this.getVisitorBasicInfo()
        }
      })
    },
    handleAccountImagePreview(file) {
      // console.log(file)
      this.dialogAccountImageUrl = file.url
      this.dialogAccountImageVisible = true
    },
    handleAccountImageSuccess(res, file){
      let accountImages = this.accountImageFileList
      let name = res.data[0]['file_name']
      let url = res.data[0]['file_url']
      let obj = {
        name:name,
        url:url
      }
      this.accountImageFileList.push(obj)

      let accountImagesArr = []
      accountImages.forEach(item=>{
        accountImagesArr.push(item.url)
      })
      // console.log(accountImages)
      //
      // console.log(res)
      // console.log(file)
      this.accoutImageUrl = URL.createObjectURL(file.raw)
      let params = {
        token:localStorage.getItem('token'),
        identity:1,
        img:accountImagesArr
      }
      ADD_USER_IMG(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.getVisitorBasicInfo()
        }
      })


    },
    handleIntroVideoSuccess(res, file) {
      // console.log(res)
      this.introVideoUrl = URL.createObjectURL(file.raw)
      let params = {
        video_url:res.data[0]['file_url'],
        identity:1,
        token:localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      })
    },
    beforeIntroVideoUpload(file) {
      console.log(file)
    },
    handleResumeSuccess(res, file) {
      this.resumeUrl = URL.createObjectURL(file.raw)
      let params = {
        resume_pdf:res.data[0]['file_url'],
        token:localStorage.getItem('token')
      }
      // console.log(params)
      ADD_EDU_BASIC(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      })
    },
    beforeResumeUpload(file) {
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
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('location--submit--' + res.data);
          this.canEditLocation = false;
          this.getVisitorBasicInfo();
        }

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
      let index ;
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
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('agetoteach--submit--' + res.data);
          this.canEditAgeToTeach = false;
          this.getVisitorBasicInfo();
        }

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
        expand: expand
      }

      ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('region--submit--' + res.data);
          this.canEditRegion = false;
          this.getVisitorBasicInfo();
        }

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
        token:localStorage.getItem('token'),
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

      })
    },

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
  padding: 20px;
}

.basic-info-container {
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
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
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.basic-info-item {
  margin: 10px;
  color: #808080;
}

.basic-info-item span {
  color: #000000;
}

.credentials-container {
  margin-top: 40px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
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
  border-bottom: 1px solid #EEEEEE;
}

.education-school-name {
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
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
  margin-top: 40px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
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
  border-bottom: 1px solid #EEEEEE;
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
  padding: 10px 0 ;
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
  margin-top: 40px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
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
  margin-top: 40px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
}

.profile-photo-container{
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.profile-photo-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.profile-photo-t-label{
  font-size: 14px;
  font-weight: bold;

}
.profile-photo-content{
  padding: 10px;
}
/deep/ .profile-uploader .el-upload{
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

.profile-avatar{
  width: 178px;
  height: 178px;
  display: block;
}

.background-banner-container{
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.background-banner-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.background-banner-t-label{
  font-size: 14px;
  font-weight: bold;

}
.background-banner-content{
  padding: 10px;
}
/deep/ .background-uploader .el-upload{
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

.background-avatar{
  width: 378px;
  height: 178px;
  display: block;
}

.account-images-container{
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.account-images-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.account-images-t-label{
  font-size: 14px;
  font-weight: bold;

}
.account-images-content{
  padding: 10px;
}

.intro-video-container{
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.intro-video-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.intro-video-t-label{
  font-size: 14px;
  font-weight: bold;

}
.intro-video-content{
  padding: 10px;
}
/deep/ .intro-video-uploader .el-upload{
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

.intro-video-avatar{
  width: 378px;
  height: 178px;
  display: block;
}

.my-resume-container{
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
}

.my-resume-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.my-resume-t-label{
  font-size: 14px;
  font-weight: bold;

}
.my-resume-content{
  padding: 10px;
}
/deep/ .resume-uploader .el-upload{
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

.resume-avatar{
  width: 378px;
  /*height: 178px;*/
  display: block;
  text-decoration: none;
  color: #00b3d2;
}

.preferences-container {
  margin-top: 40px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
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