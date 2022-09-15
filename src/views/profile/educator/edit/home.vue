<template>
  <div class="bg">
    <div class="basic-container">
      <!--      <profileTitle :i="i" :action="action"></profileTitle>-->
      <div class="basic-l-container">
        <meSideMenu></meSideMenu>
      </div>

      <el-scrollbar class="basic-r-container">

        <div class="basic-r-container-bg">

          <div class="account-profile-t">
            <div class="account-profile-t-l">Your profile</div>
            <div class="account-profile-t-r">
              <el-button class="account-profile-cancel-btn" plain round>
                CANCEL
              </el-button>
              <el-button class="account-profile-save-btn" type="primary" round
                         :loading="submitLoadingValue"
                         @click="submitForm('basicForm')">
                SAVE
              </el-button>
            </div>
          </div>

          <el-scrollbar class="basic-form">
            <el-form
                ref="basicForm"
                :model="basicForm"
                :rules="basicRules"
                label-width="120px"
                label-position="top"
                class="demo-ruleForm"
            >
              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  1.Basic information
                </div>
                <div class="account-profile-item-c">
                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Display Name" prop="name">
                        <el-input v-model="basicForm.name" placeholder="Display Name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Nationality" prop="nationality">
                        <el-select v-model="basicForm.nationality"
                                   filterable
                                   placeholder="Select your nationality">
                          <el-option v-for="(item,i) in nationalityOptions" :key="i" :label="item.name"
                                     :value="item.name"></el-option>
                        </el-select>
                      </el-form-item>

                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Profile visibility">
                        <el-radio-group v-model="selectedProfileStatusValue">
                          <template v-for="(item,i) in profileStatusData" :key="i">
                            <el-radio :label="item.id" >{{item.object_en}}</el-radio>
                          </template>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Job seeking status">
                        <el-radio-group v-model="selectedJobSeekingValue">
                          <template v-for="(item,i) in jobSeekingData" :key="i">
                            <el-radio :label="item.id" >{{item.object_en}}</el-radio>
                          </template>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>


                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  2.Contact information
                </div>
                <div class="account-profile-item-c">
                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="E-mail address" prop="email">
                        <el-input v-model="basicForm.email" placeholder="Your email address"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Phone number" prop="phone">
                        <el-input v-model="basicForm.phone" placeholder="Phone #"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Current Address" prop="address">
                        <el-input v-model="basicForm.address" placeholder="Current Address"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">

                    </el-col>
                  </el-row>
                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  3.About yourself
                </div>
                <div class="account-profile-item-c">
                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item
                          label="Education Type(Up to 3)">
                        <div class="categories-tags" v-for="(item,k) in subCateOptions" :key="k">
                          <div v-if="item['children'].length>0" class="category-parent">
                          </div>
                          <div v-if="item['children'].length===0" class="categories-tags-item"
                               :class="selectEducatorTypeList.findIndex(element=>element.id === item.id) == -1 ? '' : 'tag-active' "
                               @click="selectEducatorType(item)">
                            {{ item.identity_name }}
                          </div>
                          <div class="categories-tags-item" v-for="(child,key) in item['children']" :key="key"
                               :class="selectEducatorTypeList.findIndex(element=>element.id === child.id) == -1 ? '' : 'tag-active' "
                               @click="selectEducatorType(child)">
                            {{ child.identity_name }}
                          </div>
                        </div>
                      </el-form-item>

                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Job title" prop="job_title">
                        <el-input v-model="basicForm.job_title"
                                  placeholder="eg, Teacher for children with special needs"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Interests">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text"
                                      v-model="ownHobbyInfoValue"
                                      placeholder='Click "add" after each entry '>
                            </el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         link
                                         :disabled="!ownHobbyInfoValue"
                                         type="primary"
                                         @click="addOwnHobby()">
                                ADD
                              </el-button>
                            </div>
                          </div>
                        </div>

                        <div class="object-tags-container">
                          <div class="object-tags">
                            <div class="object-tags-item"
                                 :class="selectHobbyInfoList.indexOf(item) == -1 ? '' : 'tags-active' "
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

                        </div>
                      </el-form-item>

                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="About yourself" prop="bio">
                        <el-input type="textarea" v-model="basicForm.bio"
                                  :rows="6"
                                  placeholder="A short bio">
                        </el-input>
                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Minimum expected salary (Monthly)" prop="min_monthly_salary">
                        <el-input type="number" v-model="basicForm.min_monthly_salary" placeholder="minimum expected salary">
                          <template #prepend>
                            <el-icon :size="20">
                              <IconIonLogoUsd />
                            </el-icon>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Minimum expected salary (Hourly)" prop="min_monthly_salary">
                        <el-input type="number" v-model="basicForm.min_hourly_salary" placeholder="minimum expected salary">
                          <template #prepend>
                            <el-icon :size="20">
                              <IconIonLogoUsd />
                            </el-icon>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="Languages & Proficiency" >
                        <el-checkbox-group  v-model="selectedLanguageList">
                          <template v-for="(item,i) in languageOptionsData" :key="i">

                            <div class="language-checkbox-item">
                              <div class="language-checkbox-item-l">
                                <el-checkbox  :label="item">
                                  {{item.object_en}}
                                </el-checkbox>
                              </div>
                              <div class="language-checkbox-item-r">
                                <el-select
                                    v-model="item.level"
                                >
                                  <el-option
                                      v-for="(level,ii) in languageLevelOptionsData" :key="ii"
                                      :label="level.label" :value="level.value" value-key="value">
                                  </el-option>
                                </el-select>
                              </div>
                            </div>

                          </template>
                        </el-checkbox-group>
                      </el-form-item>

                    </el-col>

                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  4.Working experience
                </div>
                <div class="account-profile-item-c">
                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Years of experience">

                        <div class="object-tags-container">
                          <div class="object-tags">
                            <div class="object-tags-item"
                                 :class="selectTeachExpList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                                 v-for="(item,index) in editTeachExpList" :key="index"
                                 @click="selectTeachExp(item,1)">
                              {{ item.object_en }}
                            </div>
                          </div>
                          <div class="object-tags">
                            <div class="object-tags-item"
                                 :class="selectTeachExpList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                                 v-for="(item,index) in ownTeachExpList" :key="index"
                                 @click="selectTeachExp(item,2)">
                              {{ item.object_name }}
                            </div>
                          </div>
                        </div>

                      </el-form-item>
                    </el-col>

                    <el-col :span="18" >

                      <el-form-item label="Working experience">
                        <div class="work-experience" >
                          <div class="work-exp-temp-container">
                            <div class="work-exp-temp-container">
                              <div class="work-exp-temp-item"
                                   v-for="(item,i) in workExpData" :key="i">
                                <el-form-item class="work-form-item" label="Job title" >
                                  {{item.title}}
                                </el-form-item>
                                <el-form-item class="work-form-item" label="Company" >
                                  {{item.company_name}}
                                </el-form-item>
                                <el-form-item class="work-form-item" label="Location" >
                                  {{item.location}}
                                </el-form-item>

                                <el-form-item class="work-form-item" label="Duration" prop="date">
                                  {{ $filters.ymdFormatTimestamp(item.work_time_from) }} - {{
                                    $filters.ymdFormatTimestamp(item.work_time_to)
                                  }}
                                </el-form-item>

                                <el-form-item class="work-form-item" label="Responsibilities" >
                                  {{item.teaching_experience}}
                                </el-form-item>

                                <div class="work-exp-temp-btn-container">
                                  <el-button class="work-exp-temp-btn" link type="primary"
                                             @click="deleteWorkExp(item)"
                                  >
                                    DELETE
                                  </el-button>
                                  <el-button class="work-exp-temp-btn" plain round
                                             @click="editWorkExp(item)"
                                  >
                                    EDIT
                                  </el-button>
                                </div>
                              </div>

                            </div>
                            <div class="work-exp-temp-container" >
                              <div class="work-exp-temp-item"
                                   v-for="(item,i) in workExpTempData" :key="i">
                                <el-form-item class="work-form-item" label="Job title" >
                                  {{item.title}}
                                </el-form-item>
                                <el-form-item class="work-form-item" label="Company" >
                                  {{item.company_name}}
                                </el-form-item>
                                <el-form-item class="work-form-item" label="Location" >
                                  {{item.location}}
                                </el-form-item>

                                <el-form-item class="work-form-item" label="Duration" prop="date">
                                  {{item.date}}
                                </el-form-item>

                                <el-form-item class="work-form-item" label="Responsibilities" >
                                  {{item.teaching_experience}}
                                </el-form-item>

                                <div class="work-exp-temp-btn-container">
                                  <el-button class="work-exp-temp-btn" link type="primary"
                                             @click="deleteTempWorkExp(item,i)"
                                  >
                                    DELETE
                                  </el-button>
                                  <el-button class="work-exp-temp-btn" plain round
                                             @click="editTempWorkExp(item,i)"
                                  >
                                    EDIT
                                  </el-button>
                                </div>
                              </div>

                            </div>

                          </div>
                          <el-button  class="work-exp-temp-btn"
                                      plain
                                      round
                                      @click="showWorkExpDialog()">
                            ADD JOB
                          </el-button>
                        </div>

                        <el-dialog
                            v-model="workExpDialogVisible"
                            title="Work experience"
                            width="454px"
                        >

                          <el-form
                              ref="workExpForm"
                              :model="workExpForm"
                              :rules="workExpRules"
                              label-width="120px"
                              label-position="top"
                              class="demo-ruleForm"
                          >
                            <el-form-item class="work-form-item" label="Job title" prop="title">
                              <el-input v-model="workExpForm.title" placeholder="eg. ESL teacher"></el-input>
                            </el-form-item>
                            <el-form-item class="work-form-item" label="Company" prop="company_name">
                              <el-input v-model="workExpForm.company_name" placeholder="ABC Academy"></el-input>
                            </el-form-item>
                            <el-form-item class="work-form-item" label="Location" >
                              <el-input v-model="workExpForm.location" placeholder="City, Country"></el-input>
                            </el-form-item>

                            <el-form-item class="work-form-item" label="Duration" prop="date">
                              <el-date-picker
                                  v-model="workExpForm.date"
                                  size="large"
                                  type="monthrange"
                                  format="MM/YYYY"
                                  value-format="x"
                                  range-separator="To"
                                  start-placeholder="Start Date"
                                  end-placeholder="End Date"
                                  :disabledDate="birthdayDisabledDate"
                              >
                              </el-date-picker>
                            </el-form-item>

                            <el-form-item class="work-form-item" label="Responsibilities" >
                              <el-input v-model="workExpForm.teaching_experience"
                                        :rows="4"
                                        type="textarea"
                                        placeholder="Your responsibilities"></el-input>
                            </el-form-item>

                          </el-form>

                          <div class="work-exp-btn-container">
                            <el-button class="work-exp-cancel-btn" type="primary"
                                       link
                                       @click="workExpDialogVisible=false"
                            >
                              CANCEL
                            </el-button>
                            <el-button type="primary"
                                       class="work-exp-save-btn"
                                       :loading="submitWorkExpLoadingValue"
                                       @click="saveWorkExpTemp()">
                              SAVE
                            </el-button>
                          </div>

                        </el-dialog>

                      </el-form-item>

                    </el-col>

                  </el-row>

                  <el-row :gutter="50">
                    <el-col :span="6">
                      <el-form-item label="Places Traveled">
                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text"
                                      v-model="ownCountriesTraveledValue"
                                      placeholder="Add certifications">
                            </el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         type="primary"
                                         link
                                         :disabled="!ownCountriesTraveledValue"
                                         @click="addOwnCountriesTraveled()">
                                ADD
                              </el-button>
                            </div>
                          </div>
                        </div>

                        <div class="object-tags-container">
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

                        </div>

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Places Lived">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text"
                                      v-model="ownCountriesLivedValue"
                                      placeholder="Add certifications">
                            </el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         type="primary"
                                         link
                                         :disabled="!ownCountriesLivedValue"
                                         @click="addOwnCountriesLived">
                                ADD
                              </el-button>
                            </div>
                          </div>
                        </div>

                        <div class="object-tags-container">
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

                        </div>

                      </el-form-item>

                    </el-col>
                  </el-row>

                </div>
              </div>
              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  5.Education
                </div>
                <div class="account-profile-item-c">

                    <div class="work-experience" >
                      <div class="work-exp-temp-container">
                        <div class="work-exp-temp-container">

                          <div class="work-exp-temp-item"
                               v-for="(item,i) in educationData" :key="i">

                            <el-form-item label="School" prop="school_name">
                              {{item.school_name}}
                            </el-form-item>
                            <el-form-item label="Degree" prop="degree">
                              {{item.degree}}
                            </el-form-item>
                            <el-form-item label="Field of Study" >
                              {{item.field_of_study}}
                            </el-form-item>

                            <el-form-item label="Duration of Study" prop="date">
                              {{
                                $filters.ymdFormatTimestamp(item.start_time)
                              }}-{{ $filters.ymdFormatTimestamp(item.end_time) }}
                            </el-form-item>

                            <div class="work-exp-temp-btn-container">
                              <el-button class="work-exp-temp-btn" link type="primary"
                                         @click="deleteEducation(item)"
                              >
                                DELETE
                              </el-button>
                              <el-button class="work-exp-temp-btn" plain round
                                         @click="editEducation(item)"
                              >
                                EDIT
                              </el-button>
                            </div>
                          </div>

                        </div>

                      </div>
                      <el-button  class="work-exp-temp-btn"
                                  plain
                                  round
                                  @click="showEducationDialog()">
                        ADD EDUCATION
                      </el-button>
                    </div>

                    <el-dialog
                        v-model="educationDialogVisible"
                        title="Education"
                        width="454px"
                    >
                      <el-form
                          ref="educationForm"
                          :model="educationForm"
                          :rules="educationRules"
                          label-width="120px"
                          label-position="top"
                          class="demo-ruleForm"
                      >
                        <el-form-item label="School" prop="school_name">
                          <el-input v-model="educationForm.school_name" placeholder="University"></el-input>
                        </el-form-item>
                        <el-form-item label="Degree" prop="degree">
                          <el-select  v-model="educationForm.degree_id" placeholder="Doctorate, Master's, Bachelor's, etc...">
                            <el-option v-for="(degree,i) in degreeOptionsData" :key="i"
                                       :value-key="degree.id"
                                       :label="degree.object_en"
                                       :value="degree.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="Field of Study" >
                          <el-input v-model="educationForm.field_of_study" type="textarea"
                                    placeholder="Chemistry, International Business, Dance, etc..."></el-input>
                        </el-form-item>
                        <el-form-item label="Duration of Study" prop="date">
                          <el-date-picker
                              v-model="educationForm.date"
                              type="monthrange"
                              format="MM/YYYY"
                              value-format="x"
                              range-separator="To"
                              start-placeholder="Start month"
                              end-placeholder="End month"
                          >
                          </el-date-picker>
                        </el-form-item>

                      </el-form>

                      <div class="work-exp-btn-container">
                        <el-button class="work-exp-cancel-btn" type="primary"
                                   link
                                   @click="educationDialogVisible=false"
                        >
                          CANCEL
                        </el-button>
                        <el-button type="primary"
                                   class="work-exp-save-btn"
                                   :loading="submitEducationLoadingValue"
                                   @click="saveEducationTemp()">
                          SAVE
                        </el-button>
                      </div>

                    </el-dialog>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  6.Preferences
                </div>
                <div class="account-profile-item-c">
                  <el-row :gutter="50">
                    <el-col :span="6">

                      <el-form-item label="Work destination">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text"
                                      v-model="ownWorkDestinationValue"
                                      placeholder="Add work destination">
                            </el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         :disabled="!ownWorkDestinationValue"
                                         type="primary"
                                         link
                                         @click="addOwnLocation">
                                ADD
                              </el-button>
                            </div>
                          </div>
                        </div>

                        <div class="object-tags-container">
                          <div class="object-tags">
                            <div class="object-tags-item"
                                 :class=" selectWorkDestinationList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                                 v-for="(item,index) in editWorkDestinationList" :key="index"
                                 @click="selectWorkDestination(item,1)">
                              {{ item.object_en }}
                            </div>
                          </div>
                          <div class="object-tags">
                            <div class="object-tags-item"
                                 :class=" selectWorkDestinationList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                                 v-for="(item,index) in ownWorkDestinationList" :key="index"
                                 @click="selectWorkDestination(item,2)">
                              {{ item.object_name }}
                            </div>
                          </div>

                        </div>

                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Job type">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text"
                                      v-model="ownJobTypeValue"
                                      placeholder="Add job type">
                            </el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         :disabled="!ownJobTypeValue"
                                         type="primary"
                                         link
                                         @click="addOwnJobType">
                                ADD
                              </el-button>
                            </div>
                          </div>
                        </div>

                        <div class="object-tags-container">
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

                        </div>

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Location">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text"
                                      v-model="ownLocationValue"
                                      placeholder="Add location">
                            </el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         :disabled="!ownLocationValue"
                                         type="primary"
                                         link
                                         @click="addOwnLocation">
                                ADD
                              </el-button>
                            </div>
                          </div>
                        </div>

                        <div class="object-tags-container">
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

                        </div>

                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Work schedule type">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text"
                                      v-model="ownWorkScheduleTypeValue"
                                      placeholder="Add work schedule type">
                            </el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         :disabled="!ownWorkScheduleTypeValue"
                                         type="primary"
                                         link
                                         @click="addOwnWorkScheduleType">
                                ADD
                              </el-button>
                            </div>
                          </div>
                        </div>

                        <div class="object-tags-container">
                          <div class="object-tags">
                            <div class="object-tags-item"
                                 :class=" selectWorkScheduleTypeList.findIndex((element)=>element.id===item.id) == -1 ? '' : 'tags-active' "
                                 v-for="(item,index) in editWorkScheduleTypeList" :key="index"
                                 @click="selectWorkScheduleType(item,1)">
                              {{ item.object_en }}
                            </div>
                          </div>
                          <div class="object-tags">
                            <div class="object-tags-item"
                                 :class=" selectWorkScheduleTypeList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                                 v-for="(item,index) in ownWorkScheduleTypeList" :key="index"
                                 @click="selectWorkScheduleType(item,2)">
                              {{ item.object_name }}
                            </div>
                          </div>

                        </div>

                      </el-form-item>
                    </el-col>


                  </el-row>

                  <el-row :gutter="50">

                    <el-col :span="6">
                      <el-form-item label="Subject(s) to teach">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text" v-model="ownSubjectValue"
                                      placeholder="Add subject"></el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         link
                                         :disabled="!ownSubjectValue"
                                         type="primary"
                                         @click="addOwnSubject">
                                ADD
                              </el-button>

                            </div>
                          </div>
                        </div>

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
                                 :class=" selectSubjectList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                                 v-for="(item,index) in ownSubjectList" :key="index"
                                 @click="selectSubject(item,2)">
                              {{ item.object_name }}
                            </div>
                          </div>

                        </div>

                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label=" Preferred Age To Teach">
                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text"
                                      v-model="ownAgeToTeachValue"
                                      placeholder="Add  age to teach">
                            </el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         :disabled="!ownAgeToTeachValue"
                                         type="primary"
                                         link
                                         @click="addOwnAgeToTeach">
                                ADD
                              </el-button>
                            </div>
                          </div>
                        </div>

                        <div class="object-tags-container">
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

                        </div>

                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Certifications">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text"
                                      v-model="ownCertificationsValue"
                                      placeholder="Add certifications">
                            </el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         :disabled="!ownCertificationsValue"
                                         link
                                         type="primary"
                                         @click="addOwnCertifications">
                                ADD
                              </el-button>
                            </div>
                          </div>
                        </div>

                        <div class="object-tags-container">
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
                        </div>

                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Benefits">

                        <div class="object-tags-add">
                          <div class="object-tags-item-add">
                            <el-input type="text"
                                      v-model="ownBenefitsValue"
                                      placeholder="Add benefits">
                            </el-input>
                            <div class="object-tags-item-btn-container">
                              <el-button class="object-tags-item-btn"
                                         :disabled="!ownBenefitsValue"
                                         link
                                         type="primary"
                                         @click="addOwnBenefits">
                                ADD
                              </el-button>
                            </div>
                          </div>
                        </div>

                        <div class="object-tags-container">
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

                        </div>

                      </el-form-item>
                    </el-col>




                  </el-row>

                </div>
              </div>


              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  7.Media
                </div>
                <div class="account-profile-item-c">

                  <el-row :gutter="50">
                    <el-col :span="24">
                      <el-form-item
                          label="Introduction" prop="desc">
                        <el-input v-model="basicForm.desc" type="textarea"
                                  :rows="4"
                                  placeholder="Write a couple of paragraphs about your school and why educators would want to teach there.">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :span="50">
                    <el-col :span="6">
                      <el-form-item label="Profile images(up to 6)" prop="images">
                        <el-upload
                            style="width: 90%;"
                            ref="accountImagesUpload"
                            action="#"
                            :headers="uploadHeaders"
                            :data="uploadData"
                            :auto-upload="false"
                            name="file[]"
                            :show-file-list="false"
                            :limit="6"
                            :multiple="true"
                            :before-upload="beforeAccountImageUpload"
                            :file-list="accountImageFileList"
                            :on-change="handleAccountImageChange"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>

                        </el-upload>

                        <div class="account-xll-images" >
                          <div class="account-xll-image"
                               v-for="(item,i) in accountImageFileList" :key="i">
                            <el-image :src="item.url"></el-image>
                            <div class="account-xll-image-mask">
                              <span @click="handleAccountImagePreview(item)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in />
                                </el-icon>
                              </span>
                              <span @click="handleAccountImageRemove(item,i)">
                                <el-icon color="#ffffff" :size="45">
                                  <Delete />
                                </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>

                        <el-dialog width="50%" v-model="dialogAccountImageVisible" center>
                          <el-image :src="dialogAccountImageUrl"></el-image>
                        </el-dialog>

                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Introduction Video" prop="video_url">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :http-request="videoHttpRequest"
                            :before-upload="beforeIntroVideoUpload"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images" >
                          <div class="account-xll-image">
                            <div v-if="introVideoUrl">
                              <video  style="width: 100%;" :src="introVideoUrl" controls  />
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleVideoPreview(introVideoUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in />
                                </el-icon>
                              </span>
<!--                              <span @click="handleVideoRemove(introVideoUrl)">-->
<!--                                <el-icon color="#ffffff" :size="45">-->
<!--                                  <Delete />-->
<!--                                </el-icon>-->
<!--                              </span>-->
                            </div>
                          </div>
                        </div>
                        <el-dialog width="50%" v-model="dialogVideoVisible" center>
                          <video :src="dialogVideoUrl" controls></video>
                        </el-dialog>

                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="Background Image" prop="background_image">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :http-request="backgroundHttpRequest"
                            :before-upload="beforeBackgroundPhotoUpload"
                        >

                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images" >
                          <div class="account-xll-image">
                            <div v-if="backgroundPhotoUrl">
                              <el-image
                                  style="width:100%;"
                                  :src="backgroundPhotoUrl">
                              </el-image>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleSingleImagePreview(backgroundPhotoUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in />
                                </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>
                        <el-dialog width="50%" v-model="dialogSingleImageVisible" center>
                          <el-image :src="dialogSingleImageUrl"></el-image>
                        </el-dialog>

                      </el-form-item>
                    </el-col>

                    <el-col :span="6">
                      <el-form-item label="Profile Photo" prop="profile_photo">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            :http-request="profilePhotoHttpRequest"
                            :before-upload="beforeProfilePhotoUpload"
                        >

                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images" >
                          <div class="account-xll-image">
                            <div v-if="profilePhotoUrl">
                              <el-image :src="profilePhotoUrl" style="width: 100%;" ></el-image>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleSingleImagePreview(profilePhotoUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in />
                                </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>
                        <el-dialog width="50%" v-model="dialogSingleImageVisible" center>
                          <el-image :src="dialogSingleImageUrl"></el-image>
                        </el-dialog>

                      </el-form-item>
                    </el-col>

                  </el-row>

                </div>
              </div>

            </el-form>

          </el-scrollbar>

        </div>
      </el-scrollbar>

    </div>

    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUploadProfile()" ></xllLoading>

  </div>
</template>

<script>
import xllLoading from "@/components/xllLoading"

import meSideMenu from "@/components/meSideMenu";
// import profileTitle from "@/components/profileTitle";
import {
  SUB_CATE_LIST,
  EDUCATOR_CONTACT_EDIT_V2,
  ZOHO_SYNC,
  USER_INFO_BY_TOKEN_V2,
  SWITCH_IDENTITY_V2,
  USER_MENU_LIST,
  USER_SUB_IDENTITY_V2,
  UPLOAD_BY_ALI_OSS,
  UPLOAD_BY_SERVICE,
  ADD_PROFILE_V2,
  UPLOAD_IMG,
  ADD_USER_IMG_V2,
  ALL_LANGUAGE_PROFICIENCY,
  USER_OBJECT_LIST, ADD_USER_WORK_V2, ADD_USER_EDUCATION_V2, ADD_LANGUAGE_SCORE_V2
} from '@/api/api'
import {countriesData} from "@/utils/data";
import {decode} from "js-base64";
import ImageCompressor from "compressorjs";

export default {
  name: "editEducatorHome",
  components: {
    meSideMenu,
    xllLoading
  },
  setup(){
    const birthdayDisabledDate = (date)=>{
      let myDate = new Date();
      return date.getTime() >= myDate.getTime();
    }
    return {
      birthdayDisabledDate
    }
  },
  data() {
    return {
      uploadLoadingStatus: false,
      submitLoadingValue: false,
      sideMenuStatus: true,
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },
      profilePhotoUrl: '',
      logoPhotoUrl: '',
      licensePhotoUrl: '',
      businessRegPhotoUrl: '',
      introVideoUrl: '',
      backgroundPhotoUrl: '',
      basicForm: {
        name: '',
        resume_pdf: '',
        video_url: '',
        phone: '',
        email: '',
        address: '',
        bio: '',
        is_seeking: 0,
        is_public: 0,
        job_title: '',
        sub_identity_id: '',
        sub_identity_name_cn: '',
        sub_identity_name_en: '',
        hobbies: '',
        nationality: '',
        background_image: '',
        profile_photo: '',
        logo: '',
        min_monthly_salary:'',
        min_hourly_salary:''

      },
      basicRules: {
        name: [
          {
            required: true,
            message: 'Please input your name',
            trigger: 'blur',
          }
        ],
        phone: [
          {
            required: false,
            message: 'Please input your phone',
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: 'Please input address',
            trigger: 'blur',
          },
        ],
        nationality: [
          {
            required: true,
            message: 'Please select nationality',
            trigger: 'change',
          },
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: 'Please input email',
            trigger: 'blur',
          },
        ],
        bio: [
          {
            required: true,
            message: 'Please input introduction',
            trigger: 'blur',
          },
        ],


      },
      nationalityOptions: countriesData,
      subCateOptions: [],
      selectEducatorTypeList: [],
      educatorContact: {},
      i: 0,
      action: '',

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
      workDestinationList:[],
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

      editHobbyInfoList: ['Fitness', 'Photography', 'Travel'],
      ownHobbyInfoValue: '',
      ownHobbyInfoList: [],
      selectHobbyInfoList: [],
      selectHobbyInfoArr: [],

      backgroundUrl: '',
      dialogAccountImageUrl: '',
      dialogAccountImageVisible: false,
      accountImageFileList: [],
      resumeUrl: '',
      dialogVideoVisible:false,
      dialogVideoUrl:'',
      dialogSingleImageVisible:false,
      dialogSingleImageUrl:'',

      editSubjectList: [],
      ownSubjectValue: '',
      ownSubjectList: [],
      selectSubjectList: [],
      selectSubjectArr: [],

      editLocationList: [],
      ownLocationValue: '',
      ownLocationList: [],
      selectLocationList: [],

      editWorkScheduleTypeList: [],
      ownWorkScheduleTypeValue: '',
      ownWorkScheduleTypeList: [],
      selectWorkScheduleTypeList: [],

      editWorkDestinationList: [],
      ownWorkDestinationValue: '',
      ownWorkDestinationList: [],
      selectWorkDestinationList: [],
      selectWorkDestinationArr: [],

      editJobTypeList: [],
      ownJobTypeValue: '',
      ownJobTypeList: [],
      selectJobTypeList: [],
      selectJobTypeArr: [],

      editAgeToTeachList: [],
      ownAgeToTeachValue: '',
      ownAgeToTeachList: [],
      selectAgeToTeachList: [],
      selectAgeToTeachArr: [],

      editRegionList: [],
      ownRegionValue: '',
      ownRegionList: [],
      selectRegionList: [],
      selectRegionArr: [],

      editBenefitsList: [],
      ownBenefitsValue: '',
      ownBenefitsList: [],
      selectBenefitsList: [],
      selectBenefitsArr: [],

      workExpDialogVisible:false,
      submitWorkExpLoadingValue:false,
      workExpForm: {
        company_name: '',
        title: '',
        location: '',
        teaching_times: '',
        teaching_experience: '',
        work_time_from: '',
        work_time_to: '',
        date:'',
        token:localStorage.getItem('token')
      },
      workExpRules: {
        title: [
          {
            required: true,
            message: 'Please enter your job title',
            trigger: 'blur',
          }
        ],
        company_name: [
          {
            required: true,
            message: "ABC Academy",
            trigger: 'blur',
          },
        ],
        date: [
          {
            required: true,
            message: "Please select",
            trigger: 'change',
          },
        ]


      },
      workExpData:[],
      workExpTempData:[],
      editWorkExpIndex: -1,
      editExistWorkExpStatus:false,

      educationDialogVisible:false,
      submitEducationLoadingValue:false,
      educationForm: {
        school_name: '',
        degree: '',
        degree_id:'',
        field_of_study: '',
        start_time: '',
        end_time: '',
        grade: '',
        token:localStorage.getItem('token')
      },
      educationRules: {
        school_name: [
          {
            required: true,
            message: 'University',
            trigger: 'blur',
          }
        ],
        degree_id: [
          {
            required: true,
            message: "Doctorate, Master's, Bachelor's, etc...",
            trigger: 'blur',
          },
        ],
        date: [
          {
            required: true,
            message: "Please select",
            trigger: 'change',
          },
        ]

      },
      educationData:[],
      educationTempData:[],
      editEducationIndex: -1,
      editExistEducationStatus:false,

      profileStatusData:[],
      selectedProfileStatusValue:'',
      jobSeekingData:[],
      selectedJobSeekingValue:'',

      degreeOptionsData:[],
      languageOptionsData:[],
      selectedLanguageList:[],
      languageLevelOptionsData:[],
      languageLevelValue:'',
      selectedLanguageLevelData:[]


    }
  },
  async mounted() {

    await this.getSubIdentityList()
    await this.getUserObjectList()
    await this.getAllLanguageProficiencyList()
    await this.getUserObjectListtest()

    let str = this.$route.query.s;

    if (str) {
      let strObj = JSON.parse(decode(str))

      this.i = strObj.i;
      this.action = strObj.action;

      if (strObj.action == 'add') {
        await this.getBasicInfo(strObj.i)
      }

      if (strObj.action == 'edit') {
        await this.getBasicInfo(strObj.i)
      }

    }


  },
  methods: {
    languageConfirm(){
      let sLanguageData = this.selectedLanguageList
      let sData = []
      sLanguageData.forEach(item=>{
        let obj = {

          object_id: item.id,
          score: item.level ? item.level : 0,
          object_name: item.object_en,
          object_pid: item.pid
        }
        sData.push(obj)
      })
      console.log(sData)
      let params = {
        company_id:this.educatorContact.id,
        object_arr: sData,
        token: localStorage.getItem('token')
      }
      ADD_LANGUAGE_SCORE_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          console.log('language confirm -------------')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    submitForm(formName) {
      this.submitLoadingValue = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let selectTypeList = this.selectEducatorTypeList;
          // console.log(selectTypeList)
          let educatorTypeIdArr = [];
          let educatorTypeNameEnArr = [];
          let educatorTypeNameCnArr = [];
          let action = this.action

          selectTypeList.forEach(item => {
            educatorTypeIdArr.push(item.id)
            educatorTypeNameEnArr.push(item.identity_name)
            educatorTypeNameCnArr.push(item.identity_name_cn)
          })


          this.basicForm.sub_identity_name_en = educatorTypeNameEnArr.join(',')
          this.basicForm.sub_identity_id = educatorTypeIdArr.join(',')
          this.basicForm.sub_identity_name_cn = educatorTypeNameCnArr.join(',')

          if (this.basicForm.is_public) {
            this.basicForm.is_public = 1
          } else {
            this.basicForm.is_public = 0
          }
          if (this.basicForm.is_seeking) {
            this.basicForm.is_seeking = 1
          } else {
            this.basicForm.is_seeking = 0
          }

          let params = Object.assign({}, this.basicForm);
          EDUCATOR_CONTACT_EDIT_V2(params).then(res => {
            console.log(res)
            if (res.code == 200) {

              if(this.selectedProfileStatusValue){
                this.profileStatusConfirm()
              }

              if(this.selectedJobSeekingValue){
                this.jobSeekingConfirm()
              }

              if (this.selectHobbyInfoList.length > 0) {
                this.hobbyConfirm()
              }

              if(this.selectCertificationsList.length > 0){
                this.certificationsConfirm()
              }

              if(this.selectedLanguageList.length > 0){
                this.languageConfirm()
              }

              if(this.selectTeachExpList.length>0){
                this.teachExpConfirm()
              }

              if(this.selectCountriesTraveledList.length > 0){
                this.countriesTraveledConfirm()
              }

              if(this.selectCountriesLivedList.length > 0){
                this.countriesLivedConfirm()
              }

              if(this.selectSubjectList.length > 0){
                this.subjectConfirm()
              }

              if(this.selectLocationList.length > 0){
                this.locationConfirm()
              }

              if(this.selectWorkDestinationList.length > 0){
                this.workDestinationConfirm()
              }

              if(this.selectWorkScheduleTypeList.length > 0){
                this.workScheduleTypeConfirm()
              }

              if(this.selectJobTypeList.length > 0){
                this.jobTypeConfirm()
              }

              if(this.ageToTeachList.length > 0){
                this.ageToTeachConfirm()
              }

              if(this.regionList.length > 0){
                this.regionConfirm()
              }
              if(this.benefitsList.length > 0){
                this.benefitsConfirm()
              }


              this.submitLoadingValue = false;

              if (action == 'edit') {
                // this.$router.go(-1)
                if(this.accountImageFileList.length > 0){
                  this.uploadAccountImages(this.cid)
                }

                this.$store.commit('username', this.basicForm.name)
                this.$router.push('/account/home')
              } else {

                if(this.accountImageFileList.length > 0){
                  this.uploadAccountImages(res.message.educator_id)
                }

                localStorage.setItem('company_id', res.message.educator_id)

                this.$store.commit('allIdentityChanged', true)

                let uid = localStorage.getItem('uid')

                this.getUserMenuList(uid, 1, res.message.educator_id, uid)

                this.changeIdentity(res.message.educator_id, res.message.user_id)

              }

            }
          }).catch(err => {
            console.log(err)
            this.submitLoadingValue = false;
            this.$message.error(err.msg)
          })

        } else {
          this.submitLoadingValue = false;
          console.log('error submit!!')
          return false
        }
      })
    },
    getUserMenuList(uid, identity, companyId, createUid) {

      let params = {
        user_id: uid,
        identity: identity,
        company_id: companyId,
        create_user_id: createUid,
        page: 1,
        limit: 1000
      }

      USER_MENU_LIST(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          let pcAllData = res.message.pc;
          if (pcAllData) {
            let sData = pcAllData.filter(item => item.identity == identity)
            this.$store.commit('menuData', sData)
            localStorage.setItem('menuData', JSON.stringify(sData))
          }

        }

      }).catch(err => {
        console.log(err)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(e) {
      console.log(e)
    },
    async getSubIdentityList() {
      let params = {
        pid: 1,
        tree: 1
      }

      await USER_SUB_IDENTITY_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.subCateOptions = res.message
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }

      })
    },
    getSubCateList() {
      let params = {
        pid: 1,
        tree: 1
      }
      SUB_CATE_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.subCateOptions = res.message
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    selectEducatorType(item) {
      // console.log(this.selectEducatorTypeList)
      // console.log(item);
      if (this.selectEducatorTypeList.findIndex(element => element.id === item.id) == -1) {
        if (this.selectEducatorTypeList.length > 2) {
          let len = this.selectEducatorTypeList.length - 1;
          this.selectEducatorTypeList.splice(len, 1);
        }
        this.selectEducatorTypeList.push(item);
      } else {
        this.selectEducatorTypeList.splice(this.selectEducatorTypeList.findIndex(element => element.id === item.id), 1);
      }


    },
    changeIdentity(companyId, companyContactId, language) {
      let self = this;
      let params = {
        identity: 1,
        company_id: companyId,
        company_contact_id: companyContactId,
        language: language
      }
      SWITCH_IDENTITY_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          localStorage.setItem('identity', 1)
          self.$store.commit('identity', 1)
          this.$store.commit('username', this.basicForm.name)
          this.$store.commit('allIdentityChanged', true)

          this.$router.push({path: '/overview', query: {identity: 1}})
        }
      }).catch(err => {
        console.log(err)
      })
    },
    async getBasicInfo() {

      let params = {
        identity: 1
      }

      await USER_INFO_BY_TOKEN_V2(params).then(res => {

        if (res.code == 200) {

          let educatorContact = res.message.user_contact.educator_contact;
          let userContact = res.message.user_contact;
          this.educatorContact = educatorContact;

          if (educatorContact.name) {
            this.basicForm.name = educatorContact.name;
          } else {
            this.basicForm.name = userContact.first_name + ' ' + userContact.last_name;
          }

          if (educatorContact.resume_pdf) {
            this.resumeUrl = educatorContact.resume_pdf
            this.basicForm.resume_pdf = educatorContact.resume_pdf
          }

          if (educatorContact.min_monthly_salary) {
            this.basicForm.min_monthly_salary = educatorContact.min_monthly_salary
          }

          if (educatorContact.min_hourly_salary) {
            this.basicForm.min_hourly_salary = educatorContact.min_hourly_salary
          }

          if (educatorContact.background_image) {
            this.backgroundPhotoUrl = educatorContact.background_image
            this.basicForm.background_image = educatorContact.background_image
          }

          if (educatorContact.profile_photo) {
            this.profilePhotoUrl = educatorContact.profile_photo
            this.basicForm.profile_photo = educatorContact.profile_photo
          }

          if (educatorContact.video_url) {
            this.introVideoUrl = educatorContact.video_url
            this.basicForm.video_url = educatorContact.video_url
          }

          if (educatorContact.phone) {
            this.basicForm.phone = educatorContact.phone
          }

          if (educatorContact.desc) {
            this.basicForm.desc = educatorContact.desc
          }

          if (educatorContact.email) {
            this.basicForm.email = educatorContact.email;
          } else {
            this.basicForm.email = userContact.email;
          }

          if (educatorContact.address) {
            this.basicForm.address = educatorContact.address
          }

          if (educatorContact.bio) {
            this.basicForm.bio = educatorContact.bio
          }

          if (educatorContact.is_seeking) {
            this.basicForm.is_seeking = educatorContact.is_seeking;
          }

          if (educatorContact.is_public) {
            this.basicForm.is_public = educatorContact.is_public;
          }

          if (educatorContact.job_title) {
            this.basicForm.job_title = educatorContact.job_title;
          }

          if (educatorContact.hobbies) {
            this.basicForm.hobbies = educatorContact.hobbies;
            this.selectHobbyInfoList = educatorContact.hobbies.split(',');
          }

          if (educatorContact.nationality) {
            this.basicForm.nationality = educatorContact.nationality;
          }


          let subIdentityStr = educatorContact.sub_identity_id
          let subCateOptions = this.subCateOptions

          if (subIdentityStr) {
            if (subIdentityStr.length > 1) {
              let subIdentityArr = subIdentityStr.split(',')
              let subData = []
              subIdentityArr.forEach(item => {
                let cateValue = subCateOptions.filter(value => value.id == item)
                // console.log(cateValue)
                subData.push(cateValue[0])
              })
              this.selectEducatorTypeList = subData

            }

          }

          if (educatorContact.Teaching_certificate) {

            let certificationArr = educatorContact.Teaching_certificate;
            let obj = {}

            certificationArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownCertificationsList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectCertificationsList.push(obj)

            })

          }

          if (educatorContact.education_info) {
            this.educationData = educatorContact.education_info;
          }

          if (educatorContact.Job_Seeking_Status) {
            let objArr = educatorContact.Job_Seeking_Status;
            objArr.forEach((item) => {
              this.selectedJobSeekingValue = item.object_id;
            })
          }

          if (educatorContact.Profile_Status) {
            let objArr = educatorContact.Profile_Status;
            objArr.forEach((item) => {
              this.selectedProfileStatusValue = item.object_id;
            })
          }

          if (educatorContact.places_lived) {

            let livedArr = educatorContact.places_lived;
            let obj = {}

            livedArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownCountriesLivedList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectCountriesLivedList.push(obj)

            })
          }
          if (educatorContact.places_traveled) {

            let travelArr = educatorContact.places_traveled;
            let obj = {}

            travelArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownCountriesTraveledList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectCountriesTraveledList.push(obj)

            })
          }

          if (educatorContact.languages) {
            let languagesArr = educatorContact.languages
            let languagesOptionsData = this.languageOptionsData
            let a = []
            languagesArr.forEach(item=>{
              let b = languagesOptionsData.filter(option=>item.object_id == option.id )

              if(item.object_score){
                b[0]['level'] = item.object_score;
              }

              a = a.concat(b)

            })

            this.selectedLanguageList = a

          }

          if (educatorContact.Location) {
            let locationArr = educatorContact.Location;
            let obj = {}

            locationArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownLocationList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectLocationList.push(obj)

            })

          }

          if (educatorContact.Prefered_Work_Destination) {
            let objArr = educatorContact.Prefered_Work_Destination;
            let obj = {}

            objArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownWorkDestinationList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectWorkDestinationList.push(obj)

            })

          }

          if (educatorContact.Prefered_Work_Schedule_Type) {
            let objArr = educatorContact.Prefered_Work_Schedule_Type;
            let obj = {}

            objArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownWorkScheduleTypeList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectWorkScheduleTypeList.push(obj)

            })

          }

          if (educatorContact.job_type) {

            let jobTypeArr = educatorContact.job_type;
            let obj = {}

            jobTypeArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownJobTypeList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectJobTypeList.push(obj)

            })

          }

          if (educatorContact.age_to_teach) {
            let ageToTeachArr = educatorContact.age_to_teach;
            let obj = {}

            ageToTeachArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownAgeToTeachList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectAgeToTeachList.push(obj)

            })

          }
          if (educatorContact.region) {

            let regionArr = educatorContact.region;
            let obj = {}

            regionArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownRegionList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectRegionList.push(obj)

            })
          }

          if (educatorContact.benefits) {

            let benefitsArr = educatorContact.benefits;
            let obj = {}

            benefitsArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownBenefitsList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectBenefitsList.push(obj)

            })

          }

          if (educatorContact.subject) {

            let subjectArr = educatorContact.subject
            let obj = {}
            subjectArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownSubjectList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectSubjectList.push(obj)

            })

          }

          if (educatorContact.images) {
            console.log(educatorContact.images)

            let userImages = educatorContact.images
            if (userImages.length > 0) {
              let userImagesArr = []
              userImages.forEach(item => {
                let userImageObj = {
                  name: '',
                  url: item.url
                }
                userImagesArr.push(userImageObj)
              })
              this.accountImageFileList = []
              this.accountImageFileList = userImagesArr
              console.log(this.accountImageFileList)

            }

          }

          if (educatorContact.work_info) {
            this.workExpData = educatorContact.work_info;
          }

          if (educatorContact.Teaching_experience) {

            let expArr = educatorContact.Teaching_experience
            let obj = {}
            expArr.forEach((item) => {

              if (item.object_id == 0) {
                obj = {
                  id: item.object_id,
                  object_pid: item.object_pid,
                  object_name: item.object_en
                }
                this.ownTeachExpList.push(obj);
              } else {
                obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
              }

              this.selectTeachExpList.push(obj)

            })

          }


        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    async getUserObjectListtest() {
      let data = {
        pid:0
      }

      await USER_OBJECT_LIST(data).then(res => {
        console.log(res)

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    async getUserObjectList() {
      let data = {}

      await USER_OBJECT_LIST(data).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.editTeachExpList = res.message.filter(item => item.pid === 120)
          this.editSubjectList = res.message.filter(item => item.pid === 1)
          this.editLocationList = res.message.filter(item => item.pid === 71)  // 71 155
          this.editWorkDestinationList = res.message.filter(item => item.pid === 155)  // 71 155
          this.editJobTypeList = res.message.filter(item => item.pid === 3);
          this.editAgeToTeachList = res.message.filter(item => item.pid === 4);
          this.editRegionList = res.message.filter(item => item.pid === 5);
          this.editBenefitsList = res.message.filter(item => item.pid === 6);
          this.editCertificationsList = res.message.filter(item => item.pid === 7);
          this.editCountriesTraveledList = res.message.filter(item => item.pid === 8);
          this.editCountriesLivedList = res.message.filter(item => item.pid === 9);
          this.editCountriesTraveledList = res.message.filter(item => item.pid === 8);
          this.editWorkScheduleTypeList = res.message.filter(item => item.pid === 184);

          this.profileStatusData =  res.message.filter(item => item.pid === 195);
          this.jobSeekingData =  res.message.filter(item => item.pid === 199);
          this.degreeOptionsData =  res.message.filter(item => item.pid === 125);
          this.languageOptionsData =  res.message.filter(item => item.pid === 2);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    async getAllLanguageProficiencyList() {
      let data = {}

      await ALL_LANGUAGE_PROFICIENCY(data).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.languageLevelOptionsData = res.message
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    cancelUploadProfile() {
      this.uploadLoadingStatus = false;
    },
    backgroundHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.backgroundPhotoUrl = myFileUrl
                self.basicForm.background_image = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.backgroundPhotoUrl = myFileUrl
                self.basicForm.background_image = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
          console.log(err.message)
        }

      })

    },
    beforeBackgroundPhotoUpload(file) {
      this.uploadLoadingStatus = true;

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },

    profilePhotoHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.profilePhotoUrl = myFileUrl
                self.basicForm.profile_photo = myFileUrl

              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.profilePhotoUrl = myFileUrl
                self.basicForm.profile_photo = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
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

    logoPhotoHttpRequest(options) {
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file, {
        quality: 0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

          formData.append('token', localStorage.getItem('token'))
          // console.log(file)
          let isInChina = process.env.VUE_APP_CHINA
          if (isInChina === 'yes') {
            formData.append('file[]', file, file.name)
            UPLOAD_BY_ALI_OSS(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.data[0]['file_url'];
                self.uploadLoadingStatus = false;
                self.logoPhotoUrl = myFileUrl
                self.basicForm.logo = myFileUrl

              }
            }).catch(err => {
              console.log(err)
            })

          }

          if (isInChina === 'no') {
            formData.append('file', file, file.name)
            UPLOAD_BY_SERVICE(formData).then(res => {
              // console.log(res)
              if (res.code == 200) {
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.logoPhotoUrl = myFileUrl
                self.basicForm.logo = myFileUrl
              }
            }).catch(err => {
              console.log(err)
            })

          }

        },
        error(err) {
          console.log(err.message)
        }

      })

    },
    beforeLogoPhotoUpload(file) {
      this.uploadLoadingStatus = true;

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    async submitEducatorContactForm() {

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let selectTypeList = this.selectEducatorTypeList;
      let educatorTypeIdArr = [];
      selectTypeList.forEach(item => {
        educatorTypeIdArr.push(item.identity_name)
      })

      let sexStr = ''
      if (params.sex == 1) {
        sexStr = 'Male'
      }
      if (params.sex == 2) {
        sexStr = 'Female'
      }
      if (params.sex == 3) {
        sexStr = 'Undisclosed'
      }

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {
          'SingleLine': userId //UserID
        },
        {
          'SingleLine1': params.first_name // First Name
        },
        {
          'SingleLine2': params.last_name //  Last Name
        },
        {
          'Dropdown': sexStr //  Gender
        },
        {
          'Date': '' //   Date of Birth dd-MMM-yyyy
        },
        {
          'SingleLine3': '' //   Title
        },
        {
          'Email': params.email //   Email
        },
        {
          'PhoneNumber_countrycode': '' //   Phone
        },
        {
          'SingleLine4': params.nationality //   Nationality
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
          'Dropdown2': educatorTypeIdArr.join(',') //   Educator Type
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
          'Website': this.educatorInfo.profile_photo //   Contact image Link
        },
        {
          'Website1': '' //   Intro Video Link
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

    },
    async submitCompanyContactForm() {

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {
          'SingleLine': userId  //UserID
        },
        {
          'SingleLine1': params.first_name  // First Name
        },
        {
          'SingleLine2': params.last_name  //  Last Name
        },
        {
          'Dropdown': params.sex  //  Gender
        },
        {
          'Date': ''  //   Date of Birth dd-MMM-yyyy params.birthday
        },
        {
          'SingleLine3': ''  //   Title
        },
        {
          'Email': params.email  //   Email
        },
        {
          'PhoneNumber_countrycode': ''  //   Phone
        },
        {
          'SingleLine4': params.nationality  //   Nationality
        },
        {
          'Dropdown1': ''  //   Membership Type
        },
        {
          'Number': ''  //   Membership Duration
        },
        {
          'SingleLine5': ''  //   City
        },
        {
          'SingleLine6': ''  //   Province
        },
        {
          'SingleLine7': ''  //   Country
        },
        {
          'Website': this.educatorInfo.profile_photo //   Contact image Link
        }

      ]

      let zohoParams = {
        zoho_data: zohoData,
        zoho_url: 'https://forms.zohopublic.com/edupassport/form/CompanyContactForm/formperma/ZYHWpHeaRP511w85Ljl47AYAS77L3z9qcqUw4Wv48io/htmlRecords/submit'
      }

      await ZOHO_SYNC(zohoParams).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })

    },
    addOwnCertifications() {

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

    },
    certificationsConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectCertificationsList.forEach(item => {

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
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('certifications--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })


    },
    profileStatusConfirm() {

      let profileStatusValue = this.selectedProfileStatusValue
      let objectArr = [profileStatusValue];

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 195,
        object_id: objectArr,
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('profile status --submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })


    },
    jobSeekingConfirm() {

      let jobSeekingValue = this.selectedJobSeekingValue
      let objectArr = [jobSeekingValue];

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 199,
        object_id: objectArr,
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('job seeking --submit--' + res.data);
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
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('teach exp -------')
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })


    },
    addOwnCountriesTraveled() {

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

    },
    countriesTraveledConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectCountriesTraveledList.forEach(item => {

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
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('travel--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })


    },
    addOwnCountriesLived() {

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

    },
    countriesLivedConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectCountriesLivedList.forEach(item => {

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
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('lived--submit--' + res.data);
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

      let index = this.selectHobbyInfoList.indexOf(value);

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
          this.hobbiesList = this.selectHobbyInfoList;
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    cancelUpload() {
      this.uploadLoadingStatus = false;
    },
    beforeBackgroundUpload(file) {
      console.log(file)
      this.uploadLoadingStatus = true;
    },
    handleAccountImageRemove(file, i) {
      console.log(file, i)
      this.accountImageFileList.splice(i,1)

    },
    handleAccountImagePreview(file) {
      // console.log(file)
      this.dialogAccountImageUrl = file.url
      this.dialogAccountImageVisible = true

    },
    handleVideoPreview(file) {
      // console.log(file)
      this.dialogVideoUrl = file;
      this.dialogVideoVisible = true

    },
    handleSingleImagePreview(file){
      this.dialogSingleImageUrl = file
      this.dialogSingleImageVisible = true;
    },
    beforeAccountImageUpload(file) {
      const isJpeg = file.type === 'image/png' || file.type === 'image/jpg'
      if (!isJpeg) {
        return this.$message.error('Please select the correct file format to upload')
      }
      return isJpeg
    },
    handleAccountImageChange(file,fileList) {
      console.log(file)
      console.log(fileList)
      let imgParams = new FormData();
      let token = localStorage.getItem('token')
      imgParams.append('token', token)
      imgParams.append('platform', 4)
      imgParams.append('file[]', file.raw)

      UPLOAD_IMG(imgParams).then(res => {
        console.log(res)
        if (res.code == 200) {
          let imgData = res.data;
          // let imgArr = [];
          imgData.forEach(item => {
            let obj = {
              name:item.file_name,
              url:item.file_url
            }
            this.accountImageFileList.push(obj)
          })
        }

      }).catch(err => {
        this.$loading().close()
        console.log(err.code)
      })

    },
    uploadAccountImages(companyId) {

      let oldData = []

      this.accountImageFileList.forEach(file => {
        oldData.push(file.url)
      })

      let params = {
        token: localStorage.getItem('token'),
        identity: 1,
        company_id: companyId,
        img: oldData
      }

      ADD_USER_IMG_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          console.log('account images ----')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    accountImagePreview(url) {
      this.dialogAccountImageVisible = true;
      this.dialogAccountImageUrl = url;
    },
    videoHttpRequest(options){
      let self = this;
      // console.log(options)
      const formData = new FormData();
      let file = options.file;

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
            self.introVideoUrl = myFileUrl
            self.basicForm.video_url = myFileUrl

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
            self.introVideoUrl = myFileUrl
            self.basicForm.video_url = myFileUrl
          }
        }).catch(err=>{
          console.log(err)
        })

      }

    },
    beforeIntroVideoUpload(file) {
      console.log(file)
      this.uploadLoadingStatus = true;
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
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('subject--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    addOwnLocation() {

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
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('location--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addOwnWorkScheduleType() {

      let obj = {
        id: 0,
        object_name: this.ownWorkScheduleTypeValue,
        object_pid: 71
      }
      let index = this.selectWorkScheduleTypeList.findIndex((element) => element === obj)
      if (index == -1) {
        this.selectWorkScheduleTypeList.push(obj);
        this.ownWorkScheduleTypeList.push(obj);
        this.ownWorkScheduleTypeValue = '';

      } else {
        this.selectWorkScheduleTypeList.splice(index, 1);
      }

    },
    selectWorkScheduleType(value, type) {
      let index;
      if (type == 1) {
        index = this.selectWorkScheduleTypeList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectWorkScheduleTypeList.findIndex((element) => element === value);
      }

      if (index == -1) {
        this.selectWorkScheduleTypeList.push(value);

      } else {
        this.selectWorkScheduleTypeList.splice(index, 1);
      }
      // console.log(this.selectLocationList)
    },
    workScheduleTypeConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectWorkScheduleTypeList.forEach(item => {

        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 184,
        object_id: objectArr,
        expand: expand,
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('WorkScheduleType--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addOwnWorkDestination() {

      let obj = {
        id: 0,
        object_name: this.ownWorkDestinationValue,
        object_pid: 155
      }
      let index = this.selectWorkDestinationList.findIndex((element) => element === obj)
      if (index == -1) {
        this.selectWorkDestinationList.push(obj);
        this.ownWorkDestinationList.push(obj);
        this.ownWorkDestinationValue = '';

      } else {
        this.selectWorkDestinationList.splice(index, 1);
      }

    },
    selectWorkDestination(value, type) {
      let index;
      if (type == 1) {
        index = this.selectWorkDestinationList.findIndex((element) => element.id === value.id);
      }
      if (type == 2) {
        index = this.selectWorkDestinationList.findIndex((element) => element === value);
      }

      if (index == -1) {
        this.selectWorkDestinationList.push(value);

      } else {
        this.selectWorkDestinationList.splice(index, 1);
      }
      // console.log(this.selectLocationList)
    },
    workDestinationConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectWorkDestinationList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 155,
        object_id: objectArr,
        expand: expand,
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('work destination--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addOwnJobType() {

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
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('jobtype--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addOwnAgeToTeach() {

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
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('agetoteach--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addOwnRegion() {

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
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('region--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addOwnBenefits() {

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
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('benefits--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    showWorkExpDialog(){
      this.workExpDialogVisible = true;
    },
    saveWorkExpTemp(){
      this.submitWorkExpForm('workExpForm')

      // let existsStatus = this.editExistWorkExpStatus
      // if(existsStatus){
      //   this.submitWorkExpForm('workExpForm')
      //
      // }else{
      //   let editWorkExpIndex = this.editWorkExpIndex;
      //
      //   let obj = Object.assign({},this.workExpForm)
      //
      //   this.workExpDialogVisible = false
      //
      //   if(editWorkExpIndex !== -1){
      //     return this.workExpTempData.splice(editWorkExpIndex,1,obj)
      //   }
      //   this.workExpTempData.push(obj)
      // }


    },
    deleteWorkExp(item){

      let params = {
        work_id:item.id,
        is_delete:1
      }
      ADD_USER_WORK_V2(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.submitLoadingValue = false;
          this.workExpDialogVisible =false;
          this.getBasicInfo()
        }
      }).catch(err=>{
        console.log(err)
        this.submitLoadingValue = false;
        this.$message.error(err.msg)
      })

    },
    editWorkExp(item){

      let obj = Object.assign({},item)
      this.workExpForm = obj;

      let workTimeFrom = item.work_time_from
      let workTimeTo = item.work_time_to

      this.workExpForm.date = [workTimeFrom*1000,workTimeTo*1000]
      this.workExpForm.work_id = item.id;
      this.editExistWorkExpStatus = true;
      this.workExpDialogVisible = true;

    },
    deleteTempWorkExp(item,i){
      console.log(item)
      let temp = this.workExpTempData
      temp.splice(i,1)
    },
    editTempWorkExp(item, i){
      this.editWorkExpIndex = i;
      let obj = Object.assign({},item)
      this.workExpForm = obj;
      this.workExpDialogVisible = true;
    },
    submitWorkExpForm(formName) {
      this.submitLoadingValue = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let dateArr = this.workExpForm.date
          this.workExpForm.work_time_from = Math.floor(dateArr[0] / 1000)
          this.workExpForm.work_time_to = Math.floor(dateArr[1] / 1000)

          let params = Object.assign({},this.workExpForm)
          ADD_USER_WORK_V2(params).then(res=>{
            console.log(res)
            if(res.code == 200){
              this.submitLoadingValue = false;
              this.editExistWorkExpStatus = false;
              this.workExpDialogVisible =false;
              this.getBasicInfo()
            }
          }).catch(err=>{
            console.log(err)
            this.submitLoadingValue = false;
            this.$message.error(err.msg)
          })
        } else {
          this.submitLoadingValue = false;
          console.log('error submit!!')
          return false
        }
      })
    },
    showEducationDialog(){
      this.educationDialogVisible = true;
    },
    saveEducationTemp(){
      this.submitEducationForm('educationForm')
    },
    deleteEducation(item){

      let params = {
        education_id:item.id,
        is_delete:1
      }
      ADD_USER_EDUCATION_V2(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.submitLoadingValue = false;
          this.educationDialogVisible =false;
          this.getBasicInfo()
        }
      }).catch(err=>{
        console.log(err)
        this.submitLoadingValue = false;
        this.$message.error(err.msg)
      })

    },
    editEducation(item){

      let obj = Object.assign({},item)
      this.educationForm = obj;

      let startTime = item.start_time
      let endTime = item.end_time
      this.educationForm.date = [startTime*1000,endTime*1000]

      this.educationForm.education_id = item.id;
      this.editExistEducationStatus = true;
      this.educationDialogVisible = true;

    },
    deleteTempEducation(item,i){
      console.log(item)
      let temp = this.educationTempData
      temp.splice(i,1)
    },
    editTempEducation(item, i){
      this.editEducationIndex = i;
      let obj = Object.assign({},item)
      this.educationForm = obj;
      this.educationDialogVisible = true;
    },
    submitEducationForm(formName) {
      this.submitLoadingValue = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {

          let dateArr = this.educationForm.date
          this.educationForm.start_time = Math.floor(dateArr[0] / 1000)
          this.educationForm.end_time = Math.floor(dateArr[1] / 1000)

          let params = Object.assign({},this.educationForm)
          ADD_USER_EDUCATION_V2(params).then(res=>{
            console.log(res)
            if(res.code == 200){
              this.submitLoadingValue = false;
              this.editExistEducationStatus = false;
              this.educationDialogVisible =false;
              this.getBasicInfo()
            }
          }).catch(err=>{
            console.log(err)
            this.submitLoadingValue = false;
            this.$message.error(err.msg)
          })
        } else {
          this.submitLoadingValue = false;
          console.log('error submit!!')
          return false
        }
      })

    },



  }
}
</script>

<style scoped>
.bg {
  background-color: #F0F2F5;
}

.basic-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.basic-l-container {

}

.basic-r-container {
  width: calc(100% - 160px);
  height: calc(100vh - 140px);
}

.basic-r-container-bg {
  padding: 30px 50px 0 50px;

}


.account-profile-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 110px;

}

.account-profile-t-l {
  font-family: BSemiBold, serif;
  font-size: 30px;
  color: #262626;

}

.account-profile-t-r {

}

.account-profile-cancel-btn {
  font-size: 20px;
}

.account-profile-save-btn {
  font-size: 20px;
}


.basic-form {
  height: calc(100vh - 280px);
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
  border-radius: 6px;
  font-size: 20px;
  cursor: pointer;
  font-family: BCM, serif;
}

.tag-active {
  background-color: #6650B3;
  color: #FFFFFF;
}

.submit-xll-container {
  text-align: center;
}

.submit-btn-container {
  text-align: center;
  margin-top: 40px;
}

.submit-btn {
  width: 40%;
}


.account-profile-item-container {
  padding: 50px;
  border-radius: 38px;
  background-color: #ffffff;
  margin-bottom: 50px;

}

.account-profile-item-label {
  font-family: BarlowM, serif;
  font-size: 26px;
  color: #262626;
}

.account-profile-item-c {
  margin-top: 15px;
}

.account-profile-item-c-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.account-profile-item-c-item-1 {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}


.account-profile-category {
  width: 30%;
}

.account-profile-form-item {
  width: 350px;
  margin-right: 50px;
}

.account-profile-item-textarea {
  width: 100%;
}


.account-profile-item-location {
  width: 60%;
}

.account-profile-item-map {
  width: 40%;
}

/deep/ .el-input--default .el-input__wrapper {
  /*min-width: 350px;*/
}

.upload-photo-img {
  width: 70px;
}

.upload-photo-img-1 {
  width: 200px;
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
  background-color: #F0F2F5;
  border: 1px solid #262626;
  padding: 4px 10px;
  border-radius: 6px;
  margin: 10px;
  font-size: 20px;
  font-family: BCM, serif;
  cursor: pointer;
}

.object-tags-add {
  width: 100%;
  margin-top: 10px;
}

.object-tags-item-add {
  width: 100%;
  position: relative;
}

.object-tags-item-btn-container {
  position: absolute;
  right: 10px;
  top: 10px;

}

.object-tags-item-btn {
  color: #262626;
  font-size: 20px;
}


.tags-active {
  background-color: #6650B3;
  color: #FFFFFF;
}

.work-form-item{
  margin-top:25px;
}

.work-exp-btn-container{
  text-align: right;
  margin-top:20px;
}

.work-exp-cancel-btn{
  font-size:20px;
}

.work-exp-save-btn{
  font-size:20px;
}

.work-exp-temp-container{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap:wrap;
}

.work-exp-temp-item{
  width:350px;
  /*height: 500px;*/
  /*overflow: auto;*/
  margin-right: 20px;
}

.work-exp-temp-btn-container{
  text-align: right;
}

.work-exp-temp-btn{
  font-size:20px;
}

.work-experience{
  display:flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

}

.account-xll-images{
  width:90%;
}

.account-xll-image{
  position: relative;
  margin-top: 10px;

}

.account-xll-image-mask{
  position: absolute;
  width:100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
  display: none;

}

.account-xll-image:hover .account-xll-image-mask{
  /*display: inline;*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.account-xll-image-mask span{
  margin-right: 15px;
  cursor: pointer;
}

.account-xll-image-mask:hover{

}

.language-checkbox-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.language-checkbox-item-l{
}
.language-checkbox-item-r{
  padding-left: 15px;
}

@media screen and (min-width: 1200px) {
  .basic-container {

  }
}

@media screen and (max-width: 768px) {

}

</style>
