<template>
  <div class="bg">
    <div class="educator-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">

          <accountInfo :info="userContact" :phone="userContact.phone" :email="userContact.email"
                       :level="educatorContact.vip_level" :vip-due-time="educatorContact.vip_due_time"
                       :category-str="educatorContact.sub_identity_name_en"
                       :percentage-status="true" :profile-percentage="userContact.is_educator"
          ></accountInfo>

          <div class="educator-r-container">
            <div class="basic-info-container">
              <div class="basic-info-t">
                <div class="basic-info-label">Basic Info</div>
                <div class="basic-info-edit" @click="editBasicInfo()">Edit</div>
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
                <div class="basic-info-edit" @click="editEducatorContactInfo()">Edit</div>
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
                    <div class="languages-edit" @click="editLanguages()">Edit</div>
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
                    <template v-if="educationInfo.length>0">
                      <div class="show-more" v-if="showMoreEducationStatus " @click="showMoreEducation">
                        Show More
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
                    <template v-if="workInfo.length>0">
                      <div class="show-more" v-if="showMoreWorkExpStatus" @click="showMoreWorkExp">
                        Show More
                      </div>
                    </template>

                  </div>
                </div>
              </div>
            </div>

            <div class="interest-container">
              <div class="interest-t">
                <div class="interest-label">Interest</div>
                <div class="interest-edit" @click="canEditHobby=true" v-if="canEditHobby===false">Edit</div>
                <div class="interest-edit" @click="hobbyConfirm()" v-if="canEditHobby">Confirm</div>
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
                    <el-image v-if="backgroundUrl" :src="backgroundUrl" class="background-avatar"></el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </div>
              </div>
              <div class="account-images-container">
                <div class="account-images-t">
                  <div class="account-images-t-label">Account Images(6 max)</div>
                  <div class="account-images-t-edit"
                       v-if="!editAccountImageStatus"
                       @click="editAccountImageStatus=true">
                    Edit
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
              <div class="intro-video-container">
                <div class="intro-video-t">
                  <div class="intro-video-t-label">Intro Video</div>
                  <template v-if="introVideoUrl">
                    <div class="intro-video-t-edit"
                         v-if="editVideoStatus"
                         @click="editVideoStatus=false">Edit</div>
                    <div class="intro-video-t-edit"
                         v-else
                         @click="editVideoStatus=true">Cancel</div>
                  </template>

                </div>
                <div class="intro-video-content">

                  <el-upload
                      v-if="!editVideoStatus || !introVideoUrl"
                      class="intro-video-uploader"
                      :action="uploadActionUrl"
                      :headers="uploadHeaders"
                      :data="uploadData"
                      :show-file-list="false"
                      name="file[]"
                      :on-success="handleIntroVideoSuccess"
                      :before-upload="beforeIntroVideoUpload"
                  >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <video v-else :src="introVideoUrl" controls class="intro-video-avatar"/>
                </div>
              </div>
              <div class="my-resume-container">
                <div class="my-resume-t">
                  <div class="my-resume-t-label">Your Resume</div>
                  <template v-if="resumeUrl">
                    <div class="my-resume-t-edit"
                         v-if="editResumeStatus"
                         @click="editResumeStatus=false">Edit</div>
                    <div class="my-resume-t-edit"
                         v-else
                         @click="editResumeStatus=true">Cancel</div>
                  </template>
                </div>
                <div class="my-resume-content">

                  <el-upload
                      v-if="!editResumeStatus || !resumeUrl"
                      drag
                      class="resume-uploader"
                      :action="uploadActionUrl"
                      :headers="uploadHeaders"
                      :data="uploadData"
                      :show-file-list="false"
                      name="file[]"
                      :on-success="handleResumeSuccess"
                      :before-upload="beforeResumeUpload"
                  >
                    <el-icon class="el-icon--upload" :size="80">
                      <upload-filled/>
                    </el-icon>
                    <div class="el-upload__text">
                      Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">

                      </div>
                    </template>
                    <!--                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                  </el-upload>
                  <a v-else :href="resumeUrl" target="_blank" class="resume-avatar">
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
                    <div class="p-job-type-t-edit" @click="jobTypeConfirm" v-if="canEditJobType">Confirm</div>
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
                    <div class="age-teach-t-edit" @click="ageToTeachConfirm" v-if="canEditAgeToTeach">Confirm</div>
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
                    <div class="p-benefits-t-edit" @click="turnIndexList(6)" v-if="canEditBenefits===false">Edit</div>
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
import {
  USER_OBJECT_LIST,
  ADD_PROFILE_V2,
  EDUCATOR_CONTACT_EDIT_V2,
  ZOHO_SYNC,
  USER_INFO_BY_TOKEN_V2,
  ADD_USER_IMG_V2,
  ADD_LANGUAGE_SCORE_V2,
  EDUCATOR_PERCENTAGE_V2, UPLOAD_IMG
} from '@/api/api'
import {encode} from 'js-base64'

export default {
  name: "profile",
  components: {
    meSideMenu,
    accountInfo
  },
  data() {
    return {
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
    this.getUserInfo()
    this.updateEducatorProfile()
  },
  methods: {
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
            this.userImagesList = educatorContact.images;
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
    handleBackgroundSuccess(res, file) {
      this.$loading().close()

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
      this.$loading({
        text:'Uploading...'
      })
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
      this.$loading().close()

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
      this.$loading({
        text:'Uploading...'
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
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.educator-r-container {
  padding: 10px 20px;
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
  //border-bottom: 1px solid #EEEEEE;
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
  //border-bottom: 1px solid #EEEEEE;
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