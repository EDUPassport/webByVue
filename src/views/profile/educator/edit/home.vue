<template>
  <div class="bg">
    <div class="basic-container">
      <!--      <profileTitle :i="i" :action="action"></profileTitle>-->
      <div class="basic-l-container">
        <meSideMenu></meSideMenu>
      </div>

      <el-scrollbar class="basic-r-container">

        <div class="basic-r-container-bg" v-loading="initProfileLoadingStatus">

          <div class="account-profile-t">
            <div class="account-profile-t-l">Your profile</div>
            <div class="account-profile-t-r">
              <el-button class="account-profile-cancel-btn" plain round @click="cancel()">
                CANCEL
              </el-button>
              <el-button class="account-profile-save-btn" type="primary"
                         round
                         :loading="submitLoadingValue"
                         @click="submitForm('basicForm', 1)">
                SAVE
              </el-button>
              <el-button class="account-profile-save-btn" type="primary"
                         round
                         :loading="submitAndViewLoadingValue"
                         @click="submitForm('basicForm', 2)">
                SAVE & VIEW
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
                    <!--                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">-->
                    <!--                      <el-form-item label="Display Name" prop="name">-->
                    <!--                        <el-input v-model="basicForm.name" placeholder="Display Name" disabled></el-input>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Nationality" prop="nationality">
                        <el-select v-model="basicForm.nationality"
                                   filterable
                                   fit-input-width
                                   :teleported="false"
                                   placeholder="Select your nationality">
                          <el-option v-for="(item,i) in nationalityOptions" :key="i" :label="item.name"
                                     :value="item.name"></el-option>
                        </el-select>
                      </el-form-item>

                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Profile visibility">
                        <el-radio-group v-model="selectedProfileStatusValue">
                          <template v-for="(item,i) in profileStatusData" :key="i">
                            <el-radio :label="item.id">{{ item.object_en }}</el-radio>
                          </template>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Job seeking status">
                        <el-radio-group v-model="selectedJobSeekingValue">
                          <template v-for="(item,i) in jobSeekingData" :key="i">
                            <el-radio :label="item.id">{{ item.object_en }}</el-radio>
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
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="E-mail address" prop="educator_email">
                        <el-input v-model="basicForm.educator_email" placeholder="Your email address"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Phone number">
                        <div class="contact-phone-container">
                          <div class="contact-phone-l">
                            <!--                    @onChange="onDefaultChange"-->
                            <el-select v-model="countryCode" :teleported="false" filterable class="m-2"
                                       placeholder="Select">
                              <el-option
                                  v-for="item in phoneCodeData"
                                  :key="item.phone_code"
                                  :label="item.phone_code"
                                  :value="item.phone_code"
                              >
                                <span style="float: left">{{ item.en }}</span>
                                <span style=" float: right;font-size: 13px;">
                          {{ item.phone_code }}
                        </span>
                              </el-option>
                            </el-select>
                          </div>
                          <div class="contact-phone-r">
                            <el-input v-model="phoneNumber" oninput="value=value.replace(/[^\d]/g,'')" maxlength="15"
                                      placeholder="Phone #"></el-input>
                          </div>
                        </div>
                      </el-form-item>

                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Current Address" prop="address">
                        <el-input v-model="basicForm.address" placeholder="Current Address"></el-input>
                      </el-form-item>
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
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <el-form-item label="About yourself" prop="bio">
                        <el-input type="textarea" v-model="basicForm.bio"
                                  :rows="6"
                                  placeholder="A short bio">
                        </el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Job title" prop="job_title">
                        <el-input v-model="basicForm.job_title"
                                  placeholder="eg, Homeroom teacher"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Interests">

                        <el-select
                            v-model="selectHobbyInfoList"
                            :teleported="false"
                            multiple
                            collapse-tags
                            collapse-tags-tooltip
                            placeholder="Select interests"
                            filterable
                            allow-create
                            value-key="id"
                        >
                          <el-option
                              v-for="(item,index) in editHobbyInfoList"
                              :key="index"
                              :label="item"
                              :value="item"
                          />

                        </el-select>

                      </el-form-item>

                    </el-col>

                  </el-row>

                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <el-form-item label="Educator Type(Up to 3)">

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


                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                      <el-form-item label="Languages & Proficiency">

                        <div class="language-add-container">

                          <template v-if="selectedLanguageList.length > 0">
                            <div class="language-checkbox-item" v-for="(item,i) in selectedLanguageList" :key="i">
                              <div class="language-checkbox-item-l">
                                {{ item.object_en }}
                              </div>
                              <div class="language-checkbox-item-r">
                                {{ item.level_name }}
                              </div>

                              <div class="language-checkbox-item-delete">
                                <el-button link @click="removeLanguageItem(i)">
                                  REMOVE
                                </el-button>
                              </div>

                            </div>

                            <div class="language-add-icon">
                              <el-icon :size="45" @click="addLanguageAndProficiency()">
                                <IconCarbonAddAlt/>
                              </el-icon>
                            </div>

                          </template>
                          <template v-else>
                            <el-icon :size="45" @click="addLanguageAndProficiency()">
                              <IconCarbonAddAlt/>
                            </el-icon>
                          </template>

                        </div>

                        <el-dialog
                            v-model="languageDialogVisible"
                            title="Languages & Proficiency"
                            width="300px"
                        >
                          <el-form
                              ref="languageForm"
                              label-width="120px"
                              :model="languageForm"
                              label-position="top"
                              class="demo-ruleForm"
                          >
                            <el-form-item label="Language">
                              <el-select v-model="languageValue" :teleported="false" value-key="id">
                                <el-option v-for="(item,i) in languageOptionsData" :key="i"
                                           :label="item.object_en"
                                           :value="item"

                                >
                                </el-option>
                              </el-select>

                            </el-form-item>

                            <el-form-item class="work-form-item" label="Proficiency">
                              <el-select v-model="languageLevelValue" :teleported="false" value-key="value">
                                <el-option
                                    v-for="(level,ii) in languageLevelOptionsData" :key="ii"
                                    :label="level.label"
                                    :value="level">
                                </el-option>
                              </el-select>
                            </el-form-item>

                          </el-form>

                          <div style="margin-top: 25px;text-align: center;">
                            <el-button round type="primary" @click="submitLanguageItem()">
                              SUBMIT
                            </el-button>
                          </div>

                        </el-dialog>


                      </el-form-item>

                    </el-col>

                    <!--                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">-->
                    <!--                      <el-form-item label="Minimum expected salary (Monthly)" prop="min_monthly_salary">-->
                    <!--                        <el-input type="number" v-model="basicForm.min_monthly_salary" placeholder="minimum expected salary">-->
                    <!--                          <template #prepend>-->
                    <!--                            <el-icon :size="20">-->
                    <!--                              <IconIonLogoUsd />-->
                    <!--                            </el-icon>-->
                    <!--                          </template>-->
                    <!--                        </el-input>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->
                    <!--                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">-->
                    <!--                      <el-form-item label="Minimum expected salary (Hourly)" prop="min_monthly_salary">-->
                    <!--                        <el-input type="number" v-model="basicForm.min_hourly_salary" placeholder="minimum expected salary">-->
                    <!--                          <template #prepend>-->
                    <!--                            <el-icon :size="20">-->
                    <!--                              <IconIonLogoUsd />-->
                    <!--                            </el-icon>-->
                    <!--                          </template>-->
                    <!--                        </el-input>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->


                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  4.Working experience
                </div>
                <div class="account-profile-item-c">
                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Years of experience">

                        <el-select v-model="checkedYearExpValue"
                                   filterable
                                   :teleported="false"
                                   placeholder="Years of experience"
                                   value-key="id"
                        >
                          <el-option v-for="(item,i) in editTeachExpList"
                                     :key="i"
                                     :label="item.object_en"
                                     :value="item.id">
                          </el-option>
                        </el-select>

                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">

                      <el-form-item label="Working experience">
                        <div class="work-experience">
                          <div class="work-exp-temp-container">
                            <div class="work-exp-temp-container">
                              <div class="work-exp-temp-item"
                                   v-for="(item,i) in workExpData" :key="i">
                                <el-form-item class="work-form-item" label="Job title">
                                  {{ item.title }}
                                </el-form-item>
                                <el-form-item class="work-form-item" label="Company">
                                  {{ item.company_name }}
                                </el-form-item>
                                <el-form-item class="work-form-item" label="Location">
                                  {{ item.location }}
                                </el-form-item>

                                <el-form-item class="work-form-item" label="Duration" prop="date">
                                  {{ $filters.ymdFormatTimestamp(item.work_time_from) }} - {{
                                    $filters.ymdFormatTimestamp(item.work_time_to)
                                  }}
                                </el-form-item>

                                <el-form-item class="work-form-item" label="Responsibilities">
                                  {{ item.teaching_experience }}
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
                            <div class="work-exp-temp-container">
                              <div class="work-exp-temp-item"
                                   v-for="(item,i) in workExpTempData" :key="i">
                                <el-form-item class="work-form-item" label="Job title">
                                  {{ item.title }}
                                </el-form-item>
                                <el-form-item class="work-form-item" label="Company">
                                  {{ item.company_name }}
                                </el-form-item>
                                <el-form-item class="work-form-item" label="Location">
                                  {{ item.location }}
                                </el-form-item>

                                <el-form-item class="work-form-item" label="Duration" prop="date">
                                  {{ item.date }}
                                </el-form-item>

                                <el-form-item class="work-form-item" label="Responsibilities">
                                  {{ item.teaching_experience }}
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
                          <el-button class="work-exp-temp-btn"
                                     plain
                                     round
                                     @click="showWorkExpDialog()">
                            ADD JOB
                          </el-button>
                        </div>

                        <el-dialog
                            v-model="workExpDialogVisible"
                            title="Work experience"
                            :width="workExpDialogWidth"
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
                            <el-form-item class="work-form-item" label="Location">
                              <el-input v-model="workExpForm.location" placeholder="City, Country"></el-input>
                            </el-form-item>

                            <!--                            <el-form-item class="work-form-item duration-pc" label="Duration" prop="date">-->
                            <!--                              <el-date-picker-->
                            <!--                                  v-model="workExpForm.date"-->
                            <!--                                  size="large"-->
                            <!--                                  type="monthrange"-->
                            <!--                                  unlink-panels-->
                            <!--                                  format="MM/YYYY"-->
                            <!--                                  value-format="x"-->
                            <!--                                  range-separator="To"-->
                            <!--                                  start-placeholder="Start Date"-->
                            <!--                                  end-placeholder="End Date"-->
                            <!--                                  :disabledDate="birthdayDisabledDate"-->
                            <!--                              >-->
                            <!--                              </el-date-picker>-->
                            <!--                            </el-form-item>-->

                            <el-form-item class="work-form-item" label="Duration" prop="date">
                              <div class="duration-mobile-container">
                                <div class="duration-mobile-item">
                                  <el-date-picker
                                      v-model="workExpForm.work_time_from"
                                      type="month"
                                      unlink-panels
                                      format="MM/YYYY"
                                      value-format="x"
                                      placeholder="Start Date"
                                      :disabled-date="birthdayDisabledDate"

                                  ></el-date-picker>
                                </div>
                                <div class="duration-mobile-item-to">
                                  <span>To</span>
                                </div>
                                <div class="duration-mobile-item">
                                  <el-date-picker
                                      v-model="workExpForm.work_time_to"
                                      type="month"
                                      unlink-panels
                                      format="MM/YYYY"
                                      value-format="x"
                                      placeholder="End Date"
                                      :disabled-date="birthdayDisabledDate"

                                  ></el-date-picker>
                                </div>
                              </div>

                            </el-form-item>

                            <el-form-item class="work-form-item" label="Responsibilities">
                              <el-input v-model="workExpForm.teaching_experience"
                                        :rows="4"
                                        type="textarea"
                                        placeholder="Your responsibilities"></el-input>
                            </el-form-item>

                          </el-form>

                          <div class="work-exp-btn-container">
                            <el-button type="primary"
                                       link
                                       @click="workExpDialogVisible=false"
                            >
                              CANCEL
                            </el-button>
                            <el-button type="primary"
                                       round
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
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Places Traveled">

                        <el-select
                            filterable
                            :teleported="false"
                            v-model="selectCountriesTraveledList"
                            multiple
                            collapse-tags
                            collapse-tags-tooltip
                            placeholder="Select places traveled"
                            value-key="id"

                        >
                          <el-option
                              v-for="(item,i) in editCountriesTraveledList"
                              :key="i"
                              :label="item.object_en"
                              :value="item"
                          />
                        </el-select>

                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Places Lived">

                        <el-select
                            filterable
                            :teleported="false"
                            v-model="selectCountriesLivedList"
                            multiple
                            collapse-tags
                            collapse-tags-tooltip
                            placeholder="Select places lived"
                            value-key="id"
                        >
                          <el-option
                              v-for="(item,i) in editCountriesLivedList"
                              :key="i"
                              :label="item.object_en"
                              :value="item"
                          />
                        </el-select>

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

                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <el-form-item>
                        <div class="work-experience">
                          <div class="work-exp-temp-container">
                            <div class="work-exp-temp-container">

                              <div class="work-exp-temp-item"
                                   v-for="(item,i) in educationData" :key="i">

                                <el-form-item label="School" prop="school_name">
                                  {{ item.school_name }}
                                </el-form-item>
                                <el-form-item label="Degree" prop="degree">
                                  {{ item.degree }}
                                </el-form-item>
                                <el-form-item label="Field of Study">
                                  {{ item.field_of_study }}
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
                          <el-button class="work-exp-temp-btn"
                                     plain
                                     round
                                     @click="showEducationDialog()">
                            ADD EDUCATION
                          </el-button>
                        </div>
                        <el-dialog
                            v-model="educationDialogVisible"
                            title="Education"
                            :width="educationDialogWidth"
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
                              <el-select v-model="educationDegreeObj"
                                         :teleported="false"
                                         value-key="id"
                                         placeholder="Doctorate, Master's, Bachelor's, etc...">
                                <el-option v-for="(degree,i) in degreeOptionsData" :key="i"
                                           :label="degree.object_en"
                                           :value="degree"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="Field of Study">
                              <el-input v-model="educationForm.field_of_study" type="textarea"
                                        placeholder="Chemistry, International Business, Dance, etc..."></el-input>
                            </el-form-item>
                            <!--                      <el-form-item label="Duration of Study" prop="date">-->
                            <!--                        <el-date-picker-->
                            <!--                            v-model="educationForm.date"-->
                            <!--                            type="monthrange"-->
                            <!--                            unlink-panels-->
                            <!--                            format="MM/YYYY"-->
                            <!--                            value-format="x"-->
                            <!--                            range-separator="To"-->
                            <!--                            start-placeholder="Start month"-->
                            <!--                            end-placeholder="End month"-->
                            <!--                        >-->
                            <!--                        </el-date-picker>-->
                            <!--                      </el-form-item>-->

                            <el-form-item label="Duration of Study" prop="date">
                              <div class="duration-mobile-container">
                                <div class="duration-mobile-item">
                                  <el-date-picker
                                      v-model="educationForm.start_time"
                                      type="month"
                                      unlink-panels
                                      format="MM/YYYY"
                                      value-format="x"
                                      placeholder="Start month"
                                      :disabled-date="birthdayDisabledDate"

                                  ></el-date-picker>
                                </div>
                                <div class="duration-mobile-item-to">
                                  <span>To</span>
                                </div>
                                <div class="duration-mobile-item">
                                  <el-date-picker
                                      v-model="educationForm.end_time"
                                      type="month"
                                      unlink-panels
                                      format="MM/YYYY"
                                      value-format="x"
                                      placeholder="End month"
                                      :disabled-date="birthdayDisabledDate"

                                  ></el-date-picker>
                                </div>
                              </div>

                            </el-form-item>

                          </el-form>

                          <div class="work-exp-btn-container">
                            <el-button type="primary"
                                       link
                                       @click="educationDialogVisible=false"
                            >
                              CANCEL
                            </el-button>
                            <el-button type="primary"
                                       round
                                       :loading="submitEducationLoadingValue"
                                       @click="saveEducationTemp()">
                              SAVE
                            </el-button>
                          </div>

                        </el-dialog>

                      </el-form-item>

                    </el-col>
                  </el-row>

                  <el-row :gutter="50" >
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Certifications">

                        <el-select
                            :teleported="false"
                            v-model="selectCertificationsList"
                            multiple
                            collapse-tags
                            collapse-tags-tooltip
                            placeholder="Select certifications"
                            filterable
                            allow-create
                            value-key="id"
                        >
                          <el-option
                              v-for="(item,index) in editCertificationsList"
                              :key="index"
                              :label="item.object_en"
                              :value="item"
                          />

                        </el-select>

                      </el-form-item>
                    </el-col>

                  </el-row>

                </div>
              </div>

              <div class="account-profile-item-container">
                <div class="account-profile-item-label">
                  6.Preferences
                </div>
                <div class="account-profile-item-c">
                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">

                      <el-form-item label="Work destination (Type to add new) ">

                        <el-select
                            filterable
                            :teleported="false"
                            v-model="selectWorkDestinationList"
                            multiple
                            collapse-tags
                            collapse-tags-tooltip
                            placeholder="Select work destination"
                            value-key="id"

                        >
                          <el-option
                              v-for="(item,i) in editWorkDestinationList"
                              :key="i"
                              :label="item.object_en"
                              :value="item"
                          />
                        </el-select>

                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Job type">

                        <el-select
                            filterable
                            :teleported="false"
                            multiple
                            v-model="selectJobTypeList"
                            collapse-tags
                            collapse-tags-tooltip
                            placeholder="Select job type"
                            value-key="id"
                        >
                          <el-option
                              v-for="(item,i) in editJobTypeList"
                              :key="i"
                              :label="item.object_en"
                              :value="item"
                          />
                        </el-select>

                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Work schedule type">

                        <el-select v-model="checkedWorkScheduleTypeValue"
                                   :teleported="false"
                                   filterable
                                   collapse-tags
                                   placeholder="Select work schedule type"
                                   value-key="id"
                        >
                          <el-option v-for="(item,i) in editWorkScheduleTypeList"
                                     :key="i"
                                     :label="item.object_en"
                                     :value="item.id">
                          </el-option>
                        </el-select>

                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Benefits">

                        <el-select
                            v-model="selectBenefitsList"
                            :teleported="false"
                            multiple
                            collapse-tags
                            collapse-tags-tooltip
                            placeholder="Select benefits"
                            filterable
                            allow-create
                            value-key="id"
                        >
                          <el-option
                              v-for="(item,index) in editBenefitsList"
                              :key="index"
                              :label="item.object_en"
                              :value="item"
                          />

                        </el-select>

                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row :gutter="50">

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Subject(s) to teach">

                        <el-select
                            :teleported="false"
                            v-model="selectSubjectList"
                            multiple
                            collapse-tags
                            collapse-tags-tooltip
                            placeholder="Select subject(s)"
                            filterable
                            allow-create
                            value-key="id"
                        >
                          <el-option
                              v-for="(item,index) in editSubjectList"
                              :key="index"
                              :label="item.object_en"
                              :value="item"
                          />

                        </el-select>

                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label=" Preferred Age To Teach">

                        <el-select
                            :teleported="false"
                            v-model="selectAgeToTeachList"
                            multiple
                            collapse-tags
                            collapse-tags-tooltip
                            placeholder="Select preferred age to teach"
                            filterable
                            allow-create
                            value-key="id"
                        >
                          <el-option
                              v-for="(item,index) in editAgeToTeachList"
                              :key="index"
                              :label="item.object_en"
                              :value="item"
                          />

                        </el-select>

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

                  <!--                  <el-row :gutter="50">-->
                  <!--                    <el-col :span="24">-->
                  <!--                      <el-form-item-->
                  <!--                          label="Introduction" prop="desc">-->
                  <!--                        <el-input v-model="basicForm.desc" type="textarea"-->
                  <!--                                  :rows="4"-->
                  <!--                                  placeholder="Write a couple of paragraphs about your school and why educators would want to teach there.">-->
                  <!--                        </el-input>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                  </el-row>-->

                  <el-row :span="50">
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Images(up to 6)" prop="images">
                        <el-upload
                            style="width: 90%;"
                            ref="accountImagesUpload"
                            action="#"
                            :headers="uploadHeaders"
                            :data="uploadData"
                            :auto-upload="false"
                            :show-file-list="false"
                            :limit="6"
                            name="file[]"
                            :multiple="true"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                            :before-upload="beforeAccountImageUpload"
                            :file-list="accountImageFileList"
                            :on-change="handleAccountImageChange"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>

                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image"
                               v-for="(item,i) in accountImageFileList" :key="i">
                            <el-image :src="item.url"></el-image>
                            <div class="account-xll-image-mask">
                              <span @click="handleAccountImagePreview(item)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleAccountImageRemove(item,i)">
                                <el-icon color="#ffffff" :size="45">
                                  <Delete/>
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

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Introduction Video" prop="video_url">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".mp4,.MP4"
                            :http-request="videoHttpRequest"
                            :before-upload="beforeIntroVideoUpload"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image">
                            <div v-if="introVideoUrl">
                              <video style="width: 100%;" :src="introVideoUrl" controls/>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleVideoPreview(introVideoUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleVideoRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>
                        <el-dialog width="50%" v-model="dialogVideoVisible" center>
                          <video style="width: 100%;" :src="dialogVideoUrl" controls></video>
                        </el-dialog>

                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Background Image" prop="background_image">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                            :http-request="backgroundHttpRequest"
                            :before-upload="beforeBackgroundPhotoUpload"
                        >

                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
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
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleBackgroundPhotoRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>
                            </div>
                          </div>
                        </div>
                        <!--                        <el-dialog width="50%" v-model="dialogSingleImageVisible" center>-->
                        <!--                          <el-image :src="dialogSingleImageUrl"></el-image>-->
                        <!--                        </el-dialog>-->

                      </el-form-item>
                    </el-col>

                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Profile Photo" prop="profile_photo">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                            :http-request="profilePhotoHttpRequest"
                            :before-upload="beforeProfilePhotoUpload"
                        >

                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image">
                            <div v-if="profilePhotoUrl">
                              <el-image :src="profilePhotoUrl" style="width: 100%;"></el-image>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleSingleImagePreview(profilePhotoUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleProfilePhotoRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>

                            </div>
                          </div>
                        </div>
                        <!--                        <el-dialog width="50%" v-model="dialogSingleImageVisible" center>-->
                        <!--                          <el-image :src="dialogSingleImageUrl"></el-image>-->
                        <!--                        </el-dialog>-->

                      </el-form-item>
                    </el-col>

                  </el-row>

                  <el-row :gutter="50">
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
                      <el-form-item label="Resume" prop="resume_pdf">
                        <el-upload
                            class="profile-uploader"
                            action=""
                            :headers="uploadHeaders"
                            :show-file-list="false"
                            accept=".pdf,.PDF"
                            :http-request="resumePdfHttpRequest"
                            :before-upload="beforeResumePdfUpload"
                        >
                          <el-icon :size="45">
                            <IconBiPlusSquare/>
                          </el-icon>
                        </el-upload>

                        <div class="account-xll-images">
                          <div class="account-xll-image">
                            <div v-if="resumePdfUrl">
                              <el-icon :size="45">
                                <IconCiFilePdf/>
                              </el-icon>
                            </div>
                            <div class="account-xll-image-mask">
                              <span @click="handleResumePreview(resumePdfUrl)">
                                <el-icon color="#ffffff" :size="45">
                                  <zoom-in/>
                                </el-icon>
                              </span>
                              <span @click="handleResumeRemove()">
                                 <el-icon color="#ffffff" :size="45">
                                    <Delete/>
                                 </el-icon>
                              </span>

                            </div>
                          </div>
                        </div>


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

    <el-dialog width="50%" v-model="dialogSingleImageVisible" center>
      <el-image :src="dialogSingleImageUrl"></el-image>
    </el-dialog>
    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUploadProfile()"></xllLoading>

  </div>
</template>

<script>
import xllLoading from "@/components/xllLoading"

import meSideMenu from "@/components/meSideMenu";
// import profileTitle from "@/components/profileTitle";
import {
  SUB_CATE_LIST,
  EDUCATOR_CONTACT_EDIT_V2,
  USER_INFO_BY_TOKEN_V2,
  SWITCH_IDENTITY_V2,
  USER_MENU_LIST,
  USER_SUB_IDENTITY_V2,
  UPLOAD_BY_ALI_OSS,
  UPLOAD_BY_SERVICE,
  ADD_PROFILE_V2,
  ADD_USER_IMG_V2,
  ALL_LANGUAGE_PROFICIENCY,
  USER_OBJECT_LIST,
  ADD_USER_WORK_V2,
  ADD_USER_EDUCATION_V2,
  ADD_LANGUAGE_SCORE_V2,
  EDUCATOR_PERCENTAGE_V2,
  USER_CONTACT_EDIT_V2, UPLOAD_BY_SERVICE_MORE, EDUCATOR_DELETE_WORK_ITEM, EDUCATOR_DELETE_EDUCATION_ITEM
} from '@/api/api'
import {countriesData} from "@/utils/data";
import {encode, decode} from "js-base64";
import ImageCompressor from "compressorjs";
import {updateWindowHeight} from "@/utils/tools";
import {phoneCodeData} from "@/utils/phoneCode";

export default {
  name: "editEducatorHome",
  components: {
    meSideMenu,
    xllLoading
  },
  setup() {
    const birthdayDisabledDate = (date) => {
      let myDate = new Date();
      return date.getTime() >= myDate.getTime();
    }
    return {
      birthdayDisabledDate
    }
  },
  data() {

    return {
      initProfileLoadingStatus:false,
      phoneCodeData: phoneCodeData,
      workExpDialogWidth: '454px',
      educationDialogWidth: '454px',
      uploadLoadingStatus: false,
      submitLoadingValue: false,
      submitAndViewLoadingValue: false,

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

      countryCode: '+86',
      phoneNumber: '',
      basicForm: {
        name: '',
        resume_pdf: '',
        video_url: '',
        country_code: '+86',
        phone: '',
        educator_email: '',
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
        min_monthly_salary: '',
        min_hourly_salary: ''

      },
      basicRules: {

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
        educator_email: [
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

      editCertificationsList: [],
      selectCertificationsList: [],

      educationInfo: [],
      educationNum: 1,
      showMoreEducationStatus: true,

      editTeachExpList: [],

      workInfo: [],

      editCountriesTraveledList: [],
      selectCountriesTraveledList: [],

      editCountriesLivedList: [],
      selectCountriesLivedList: [],

      workExpNum: 1,
      showMoreWorkExpStatus: true,

      editHobbyInfoList: ['Fitness', 'Photography', 'Travel'],
      selectHobbyInfoList: [],

      backgroundUrl: '',
      dialogAccountImageUrl: '',
      dialogAccountImageVisible: false,
      accountImageFileList: [],
      resumeUrl: '',
      resumePdfUrl: '',

      dialogVideoVisible: false,
      dialogVideoUrl: '',
      dialogSingleImageVisible: false,
      dialogSingleImageUrl: '',

      editSubjectList: [],
      selectSubjectList: [],

      editLocationList: [],
      selectLocationList: [],

      editWorkScheduleTypeList: [],

      editWorkDestinationList: [],
      selectWorkDestinationList: [],

      selectJobTypeList: [],
      editJobTypeList: [],

      editAgeToTeachList: [],
      selectAgeToTeachList: [],

      editRegionList: [],
      ownRegionValue: '',
      ownRegionList: [],
      selectRegionList: [],
      selectRegionArr: [],

      editBenefitsList: [],
      selectBenefitsList: [],

      workExpDialogVisible: false,
      submitWorkExpLoadingValue: false,
      workExpForm: {
        company_name: '',
        title: '',
        location: '',
        teaching_times: '',
        teaching_experience: '',
        work_time_from: '',
        work_time_to: '',
        date: '',
        token: localStorage.getItem('token')
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
            validator: (rule, value, callback) => {
              let workTimeFrom = this.workExpForm.work_time_from;
              let workTimeTo = this.workExpForm.work_time_to;

              if (!workTimeFrom) {
                return callback(new Error('Please select start date'))
              }

              if (!workTimeTo) {
                return callback(new Error('Please select end date'))
              }
              if (workTimeTo <= workTimeFrom) {
                return callback(new Error('End date is less than start date'))
              }

              callback()

            },
            trigger: 'change',
          },
        ]


      },
      workExpData: [],
      workExpTempData: [],
      editWorkExpIndex: -1,
      editExistWorkExpStatus: false,

      educationDialogVisible: false,
      submitEducationLoadingValue: false,
      educationForm: {
        school_name: '',
        degree: '',
        degree_id: '',
        field_of_study: '',
        start_time: '',
        end_time: '',
        grade: '',
        token: localStorage.getItem('token')
      },
      educationDegreeObj: {},
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
            required: false,
            message: "Doctorate, Master's, Bachelor's, etc...",
            trigger: 'blur',
          },
        ],
        date: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let startTime = this.educationForm.start_time;
              let endTime = this.educationForm.end_time;

              if (!startTime) {
                return callback(new Error('Please select start month'))
              }

              if (!endTime) {
                return callback(new Error('Please select end month'))
              }
              if (endTime <= startTime) {
                return callback(new Error('End month is less than start month'))
              }

              callback()

            },
            trigger: 'change',
          },
        ]

      },
      educationData: [],
      educationTempData: [],
      editEducationIndex: -1,
      editExistEducationStatus: false,

      profileStatusData: [],
      selectedProfileStatusValue: '',
      jobSeekingData: [],
      selectedJobSeekingValue: '',

      degreeOptionsData: [],

      languageOptionsData: [],
      selectedLanguageList: [],
      languageValue: '',

      languageLevelOptionsData: [],
      languageLevelValue: '',

      selectedLanguageLevelData: [],
      languageDialogVisible: false,
      languageForm: {},

      checkedYearExpValue: undefined,
      checkedJobTypeValue: undefined,
      checkedWorkScheduleTypeValue: undefined,

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
      this.workExpDialogWidth = '90%'
      this.educationDialogWidth = '90%'
    }


    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        updateWindowHeight()
        this.workExpDialogWidth = '90%'
        this.educationDialogWidth = '90%'
      }
    }

    await this.getSubIdentityList()
    await this.getUserObjectList()
    await this.getAllLanguageProficiencyList()
    // await this.getUserObjectListtest()

    let str = this.$route.query.s;

    if (str) {
      let strObj = JSON.parse(decode(str))

      this.i = strObj.i;
      this.action = strObj.action;

      if (strObj.action == 'add') {
        console.log(strObj.action)
        // await this.getBasicInfo(strObj.i)
      }

      if (strObj.action == 'edit') {
        this.initProfileLoadingStatus = true;
        await this.getBasicInfo(strObj.i)
      }

    }

  },
  methods: {
    removeLanguageItem(i) {
      this.selectedLanguageList.splice(i, 1)
    },
    addLanguageAndProficiency() {
      this.languageDialogVisible = true;

    },
    submitLanguageItem() {
      let languageObj = this.languageValue
      let level = this.languageLevelValue

      let selectedLanguageList = this.selectedLanguageList;

      let aa = selectedLanguageList.filter(item => item.id === languageObj.id)

      // 说明存在
      if (aa.length > 0) {

        if (aa[0].level === level.value) {
          return this.$message.warning('language and proficiency already added')
        } else {
          aa[0]['level'] = level.value
          aa[0]['level_name'] = level.label
        }

      } else {
        languageObj.level = level.value
        languageObj.level_name = level.label

        this.selectedLanguageList.push(languageObj)
      }

      this.languageDialogVisible = false;

    },
    languageConfirm() {
      let sLanguageData = this.selectedLanguageList
      let sData = []
      sLanguageData.forEach(item => {
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
        company_id: this.educatorContact.id,
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
    cancel() {
      this.$router.go(-1)
      // this.$router.push('/account/home')
    },
    updateUserProfilePercentage() {
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
    submitForm(formName, typeValue) {

      this.$refs[formName].validate((valid) => {
        if (valid) {

          if (typeValue === 1) {
            this.submitLoadingValue = true;
          }

          if (typeValue === 2) {
            this.submitAndViewLoadingValue = true;
          }

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

          if (this.selectHobbyInfoList.length > 0) {
            this.basicForm.hobbies = this.selectHobbyInfoList.join(',');
          }

          this.basicForm.phone = this.countryCode + '#' + this.phoneNumber

          let params = Object.assign({}, this.basicForm);
          EDUCATOR_CONTACT_EDIT_V2(params).then(res => {
            // console.log(res)
            if (res.code == 200) {

              // years of experience single
              if (this.checkedYearExpValue) {
                this.yearOfExpConfirm()
              }
              // job type
              if (this.selectJobTypeList.length > 0) {
                this.jobTypeConfirm()
              }
              // work schedule type
              if (this.checkedWorkScheduleTypeValue) {
                this.workScheduleTypeConfirm()
              }


              if (this.selectedProfileStatusValue) {
                this.profileStatusConfirm()
              }

              if (this.selectedJobSeekingValue) {
                this.jobSeekingConfirm()
              }

              if (this.selectCertificationsList.length > 0) {
                this.certificationsConfirm()
              }

              if (this.selectedLanguageList.length > 0) {
                this.languageConfirm()
              }

              if (this.selectCountriesTraveledList.length > 0) {
                this.countriesTraveledConfirm()
              }

              if (this.selectCountriesLivedList.length > 0) {
                this.countriesLivedConfirm()
              }

              if (this.selectSubjectList.length > 0) {
                this.subjectConfirm()
              }

              if (this.selectLocationList.length > 0) {
                this.locationConfirm()
              }

              if (this.selectWorkDestinationList.length > 0) {
                this.workDestinationConfirm()
              }

              if (this.selectAgeToTeachList.length > 0) {
                this.ageToTeachConfirm()
              }

              if (this.selectRegionList.length > 0) {
                this.regionConfirm()
              }
              if (this.selectBenefitsList.length > 0) {
                this.benefitsConfirm()
              }

              if (this.profilePhotoUrl) {
                let contactParas = {
                  headimgurl: this.profilePhotoUrl
                }
                USER_CONTACT_EDIT_V2(contactParas).then(res => {
                  console.log(res)
                }).catch(err => {
                  console.log(err)
                })
              }

              if (action == 'edit') {
                // this.$router.go(-1)
                this.uploadAccountImages(this.cid)

                this.updateUserProfilePercentage()
                this.$store.commit('username', this.basicForm.name)

                if (typeValue === 1) {
                  this.skipToAccountHome()
                }

                if (typeValue === 2) {
                  this.skipToViewProfile(res.message.educator_id, 1)
                }


              } else {

                if (this.accountImageFileList.length > 0) {
                  this.uploadAccountImages(res.message.educator_id)
                }

                localStorage.setItem('company_id', res.message.educator_id)

                this.$store.commit('allIdentityChanged', true)

                // let uid = localStorage.getItem('uid')

                this.updateUserProfilePercentage()

                // this.getUserMenuList(uid, 1, res.message.educator_id, uid)

                this.changeIdentity(res.message.educator_id, res.message.user_id, 2, typeValue)

              }


            }
          }).catch(err => {
            console.log(err)
            if (typeValue === 1) {
              this.submitLoadingValue = false;
            }

            if (typeValue === 2) {
              this.submitAndViewLoadingValue = false;
            }

            // this.submitLoadingValue = false;
            // this.$message.error(err.msg)
          })

        } else {
          this.$message({
            type:'warning',
            message:'Please complete all required fields',
            grouping:true
          })

          console.log('error submit!!')
          return false
        }
      })
    },
    skipToAccountHome() {
      let self = this;
      setTimeout(function () {

        self.$router.push('/account/home')

      }, 3000)

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
    skipToViewProfile(companyId, roleValue) {
      let userId = localStorage.getItem('uid')
      if (roleValue == 1) {
        let obj = {
          cid: companyId,
          uid: userId,
          identity: 1
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path: '/educator/profile', query: {str: str}})
      }
      if (roleValue == 2) {
        let obj = {
          cid: companyId,
          uid: userId,
          identity: 2
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path: '/business/profile', query: {str: str}})
      }
      if (roleValue == 3) {
        let obj = {
          cid: companyId,
          uid: userId,
          identity: 3
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path: '/business/profile', query: {str: str}})
      }
      if (roleValue == 4) {
        let obj = {
          cid: companyId,
          uid: userId,
          identity: 4
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path: '/business/profile', query: {str: str}})
      }
      if (roleValue == 5) {
        let obj = {
          cid: companyId,
          uid: userId,
          identity: 5
        }
        let str = encode(JSON.stringify(obj))
        this.$router.push({path: '/vendor/profile', query: {str: str}})
      }
    },
    changeIdentity(companyId, companyContactId, language, typeValue) {

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
          this.$store.commit('username', this.basicForm.name)
          this.$store.commit('allIdentityChanged', true)

          let str = JSON.stringify(res.message)
          localStorage.setItem('menuData', str)

          this.$store.commit('identity', 1)
          this.$store.commit('menuData', res.message)
          this.$store.commit('currentCompanyId', companyId)

          if (typeValue === 1) {
            this.skipToAccountHome()
          }

          if (typeValue === 2) {
            this.skipToViewProfile(companyId, 1)
          }

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
            this.resumePdfUrl = educatorContact.resume_pdf
            this.basicForm.resume_pdf = educatorContact.resume_pdf
          }


          if (educatorContact.background_image) {
            this.backgroundPhotoUrl = educatorContact.background_image
            this.basicForm.background_image = educatorContact.background_image
          }

          if (userContact.headimgurl) {
            this.profilePhotoUrl = userContact.headimgurl
          }

          if (educatorContact.video_url) {
            this.introVideoUrl = educatorContact.video_url
            this.basicForm.video_url = educatorContact.video_url
          }

          if (educatorContact.phone) {
            let phone = educatorContact.phone;
            let phoneArr = phone.split('#')
            // console.log(phoneArr)
            if (phoneArr.length > 1) {
              this.countryCode = phoneArr[0]
              this.phoneNumber = phoneArr[1]
            } else {
              this.phoneNumber = phoneArr[0]
            }
            this.basicForm.phone = educatorContact.phone
          }

          if (educatorContact.desc) {
            this.basicForm.desc = educatorContact.desc
          }

          if (educatorContact.email) {
            this.basicForm.educator_email = educatorContact.email;
          } else {
            this.basicForm.educator_email = userContact.email;
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

            certificationArr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectCertificationsList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }

                this.selectCertificationsList.push(obj)

              }

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

              obj = {
                id: item.object_id,
                pid: item.object_pid,
                object_en: item.object_en,
                object_cn: item.object_cn
              }

              this.selectCountriesLivedList.push(obj)

            })
          }
          if (educatorContact.places_traveled) {

            let travelArr = educatorContact.places_traveled;
            let obj = {}

            travelArr.forEach((item) => {

              obj = {
                id: item.object_id,
                pid: item.object_pid,
                object_en: item.object_en,
                object_cn: item.object_cn
              }

              this.selectCountriesTraveledList.push(obj)

            })
          }

          if (educatorContact.languages) {
            let languagesArr = educatorContact.languages
            let languagesOptionsData = this.languageOptionsData
            let a = []
            languagesArr.forEach(item => {
              let b = languagesOptionsData.filter(option => item.object_id == option.id)

              if (item.object_score) {
                b[0]['level'] = item.object_score;
                if (item.object_score == 1) {
                  b[0]['level_name'] = 'Native';
                }
                if (item.object_score == 2) {
                  b[0]['level_name'] = 'Fluent';
                }
                if (item.object_score == 3) {
                  b[0]['level_name'] = 'Conversational';
                }
                if (item.object_score == 4) {
                  b[0]['level_name'] = 'Beginner';
                }

              }

              a = a.concat(b)

            })

            this.selectedLanguageList = a

          }

          if (educatorContact.Location) {
            let locationArr = educatorContact.Location;

            locationArr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectLocationList.push(item.object_en)

              } else {
                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectLocationList.push(obj)

              }

            })

          }

          if (educatorContact.Prefered_Work_Destination) {
            let objArr = educatorContact.Prefered_Work_Destination;
            let obj = {}

            objArr.forEach((item) => {

              obj = {
                id: item.object_id,
                pid: item.object_pid,
                object_en: item.object_en,
                object_cn: item.object_cn
              }

              this.selectWorkDestinationList.push(obj)

            })

          }

          if (educatorContact.job_type) {

            let objArr = educatorContact.job_type;
            let obj = {}

            objArr.forEach((item) => {

              obj = {
                id: item.object_id,
                pid: item.object_pid,
                object_en: item.object_en,
                object_cn: item.object_cn
              }

              this.selectJobTypeList.push(obj)

            })

          }

          if (educatorContact.Prefered_Work_Schedule_Type) {
            let objArr = educatorContact.Prefered_Work_Schedule_Type;
            objArr.forEach((item) => {
              this.checkedWorkScheduleTypeValue = item.object_id
            })

          }


          if (educatorContact.age_to_teach) {
            let ageToTeachArr = educatorContact.age_to_teach;

            ageToTeachArr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectAgeToTeachList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }

                this.selectAgeToTeachList.push(obj)

              }

            })

          }
          if (educatorContact.region) {

            let regionArr = educatorContact.region;

            regionArr.forEach((item) => {

              if (item.object_id == 0) {
                this.selectRegionList.push(item.object_en)
              } else {
                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectRegionList.push(obj)
              }

            })
          }

          if (educatorContact.benefits) {

            let benefitsArr = educatorContact.benefits;

            benefitsArr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectBenefitsList.push(item.object_en)

              } else {

                let obj = {
                  id: item.object_id,
                  pid: item.object_pid,
                  object_en: item.object_en,
                  object_cn: item.object_cn
                }
                this.selectBenefitsList.push(obj)

              }

            })

          }

          if (educatorContact.subject) {

            let subjectArr = educatorContact.subject
            let obj = {}
            subjectArr.forEach((item) => {

              if (item.object_id == 0) {

                this.selectSubjectList.push(item.object_en)

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

            expArr.forEach((item) => {
              this.checkedYearExpValue = item.object_id;
            })

          }

          this.initProfileLoadingStatus = false;

        }
      }).catch(err => {
        console.log(err)

        if (err.msg) {
          return this.$message.error(err.msg)
        }

      })

    },
    async getUserObjectListtest() {
      let data = {
        pid: 0
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
        // console.log(res)
        if (res.code == 200) {

          this.editTeachExpList = res.message.filter(item => item.pid === 120)
          this.editSubjectList = res.message.filter(item => item.pid === 1)

          this.editJobTypeList = res.message.filter(item => item.pid === 3);
          this.editAgeToTeachList = res.message.filter(item => item.pid === 4);
          this.editRegionList = res.message.filter(item => item.pid === 5);
          this.editBenefitsList = res.message.filter(item => item.pid === 6);
          this.editCertificationsList = res.message.filter(item => item.pid === 7);

          // 原来是8 现在使用nationality的值 pid 203
          this.editCountriesTraveledList = res.message.filter(item => item.pid === 8);
          // 原来是9 现在使用nationality的值 pid 203
          this.editCountriesLivedList = res.message.filter(item => item.pid === 9);

          // 原来是71 现在使用nationality的值 pid 203
          this.editLocationList = res.message.filter(item => item.pid === 71)  // 71 155
          // 原来是155 现在使用nationality的值 pid 203
          this.editWorkDestinationList = res.message.filter(item => item.pid === 155)  // 71 155

          this.editWorkScheduleTypeList = res.message.filter(item => item.pid === 184);

          this.profileStatusData = res.message.filter(item => item.pid === 195);
          this.jobSeekingData = res.message.filter(item => item.pid === 199);
          this.degreeOptionsData = res.message.filter(item => item.pid === 125);
          this.languageOptionsData = res.message.filter(item => item.pid === 2);

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
    resumePdfHttpRequest(options) {
      let self = this;
      // console.log(options)
      const formData = new FormData();

      formData.append('token', localStorage.getItem('token'))
      // console.log(file)
      let isInChina = process.env.VUE_APP_CHINA
      if (isInChina === 'yes') {
        formData.append('file[]', options.file, options.file.name)
        UPLOAD_BY_ALI_OSS(formData).then(res => {
          // console.log(res)
          if (res.code == 200) {
            let myFileUrl = res.data[0]['file_url'];
            self.uploadLoadingStatus = false;
            self.resumePdfUrl = myFileUrl
            self.basicForm.resume_pdf = myFileUrl

          }
        }).catch(err => {
          console.log(err)
        })

      }

      if (isInChina === 'no') {
        formData.append('file', options.file, options.file.name)
        UPLOAD_BY_SERVICE(formData).then(res => {
          // console.log(res)
          if (res.code == 200) {
            let myFileUrl = res.message.file_path;
            self.uploadLoadingStatus = false;
            self.resumePdfUrl = myFileUrl
            self.basicForm.resume_pdf = myFileUrl
          }
        }).catch(err => {
          console.log(err)
        })

      }

    },
    beforeResumePdfUpload(file) {
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
    certificationsConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectCertificationsList.forEach(item => {

        if (typeof item === 'string') {
          expand.push(item)
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
    yearOfExpConfirm() {

      let expand = [];
      let objectArr = [this.checkedYearExpValue];

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 120,
        object_id: objectArr,
        expand: expand,
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('years of experience success -------')
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })


    },
    countriesTraveledConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectCountriesTraveledList.forEach(item => {
        objectArr.push(item.id);
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
          console.log('place traveled --submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })


    },
    countriesLivedConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectCountriesLivedList.forEach(item => {
        objectArr.push(item.id);
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
          console.log('place lived --submit--' + res.data);
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
    cancelUpload() {
      this.uploadLoadingStatus = false;
    },
    beforeBackgroundUpload(file) {
      console.log(file)
      this.uploadLoadingStatus = true;
    },
    handleAccountImageRemove(file, i) {
      console.log(file, i)
      this.accountImageFileList.splice(i, 1)

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
    handleResumePreview(file) {
      window.open(file, '_blank')
    },
    handleVideoRemove() {
      this.introVideoUrl = ''
      this.basicForm.video_url = ''
    },
    handleSingleImagePreview(file) {
      this.dialogSingleImageUrl = file
      this.dialogSingleImageVisible = true;
    },
    handleBackgroundPhotoRemove() {
      this.backgroundPhotoUrl = ''
      this.basicForm.background_image = ''
    },
    handleProfilePhotoRemove() {
      this.profilePhotoUrl = ''
      this.basicForm.profile_photo = ''
    },
    handleResumeRemove() {
      this.resumePdfUrl = ''
      this.basicForm.resume_pdf = ''
    },
    beforeAccountImageUpload(file) {
      this.uploadLoadingStatus = true;
      const isJpeg = file.type === 'image/png' || file.type === 'image/jpg'
      if (!isJpeg) {
        return this.$message.error('Please select the correct file format to upload')
      }
      return isJpeg
    },
    handleAccountImageChange(file, fileList) {
      console.log(file)
      console.log(fileList)
      this.uploadLoadingStatus = true;
      let imgParams = new FormData();
      let token = localStorage.getItem('token')
      imgParams.append('token', token)
      imgParams.append('platform', 4)
      imgParams.append('file[]', file.raw)

      UPLOAD_BY_SERVICE_MORE(imgParams).then(res => {
        console.log(res)
        if (res.code == 200) {
          let imgData = res.message;
          // let imgArr = [];
          imgData.forEach(item => {
            let obj = {
              name: '',
              url: item
            }
            this.accountImageFileList.push(obj)

          })
          this.uploadLoadingStatus = false;
        }

      }).catch(err => {
        this.uploadLoadingStatus = false;
        console.log(err)
      })

    },
    uploadAccountImages(companyId) {

      let oldData = []

      let accountImagesData = this.accountImageFileList

      if(accountImagesData.length > 0){
        accountImagesData.forEach(file => {
          oldData.push(file.url)
        })
      }

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
    videoHttpRequest(options) {
      let self = this;
      // console.log(options)
      const formData = new FormData();
      let file = options.file;

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
            self.introVideoUrl = myFileUrl
            self.basicForm.video_url = myFileUrl

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
            self.introVideoUrl = myFileUrl
            self.basicForm.video_url = myFileUrl
          }
        }).catch(err => {
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
    subjectConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectSubjectList.forEach(item => {

        if (typeof item === 'string') {
          expand.push(item)
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
    locationConfirm() {

      let expand = [];
      let objectArr = [];

      this.selectLocationList.forEach(item => {

        if (typeof item === 'string') {
          expand.push(item)
        } else {
          objectArr.push(item.id)
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
    workScheduleTypeConfirm() {

      let expand = [];
      let objectArr = [this.checkedWorkScheduleTypeValue];

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 184,
        object_id: objectArr,
        expand: expand,
        company_id: this.educatorContact.id
      }

      ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
          console.log('Work Schedule Type--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    workDestinationConfirm() {

      let expand = [];
      let objectArr = [];

      this.selectWorkDestinationList.forEach(item => {
        objectArr.push(item.id);
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
    jobTypeConfirm() {

      let expand = [];
      let objectArr = [];

      this.selectJobTypeList.forEach(item => {
        objectArr.push(item.id);
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
          console.log('job type--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    ageToTeachConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectAgeToTeachList.forEach(item => {

        if (typeof item === 'string') {
          expand.push(item)
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
          console.log('age to teach--submit--' + res.data);
        }

      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    regionConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectRegionList.forEach(item => {

        if (typeof item === 'string') {
          expand.push(item);
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
    benefitsConfirm() {

      let expand = [];
      let objectArr = [];
      this.selectBenefitsList.forEach(item => {

        if (typeof item === 'string') {
          expand.push(item);
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
    showWorkExpDialog() {
      this.workExpForm = {
        company_name: '',
        title: '',
        location: '',
        teaching_times: '',
        teaching_experience: '',
        work_time_from: '',
        work_time_to: '',
        date: '',
        token: localStorage.getItem('token')
      }
      this.workExpDialogVisible = true;
    },
    saveWorkExpTemp() {
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
    deleteWorkExp(item) {

      let params = {
        id: item.id
      }
      EDUCATOR_DELETE_WORK_ITEM(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.getBasicInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    editWorkExp(item) {

      this.workExpForm = Object.assign({}, item);

      let workTimeFrom = item.work_time_from
      let workTimeTo = item.work_time_to

      // this.workExpForm.date = [workTimeFrom * 1000, workTimeTo * 1000]

      this.workExpForm.work_time_from = workTimeFrom * 1000;
      this.workExpForm.work_time_to = workTimeTo * 1000;
      this.workExpForm.work_id = item.id;
      this.editExistWorkExpStatus = true;
      this.workExpDialogVisible = true;

    },
    deleteTempWorkExp(item, i) {
      console.log(item)
      let temp = this.workExpTempData
      temp.splice(i, 1)
    },
    editTempWorkExp(item, i) {
      this.editWorkExpIndex = i;
      this.workExpForm = Object.assign({}, item);
      this.workExpDialogVisible = true;
    },
    submitWorkExpForm(formName) {
      this.submitLoadingValue = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.workExpForm.work_time_from = Math.floor(this.workExpForm.work_time_from / 1000)
          this.workExpForm.work_time_to = Math.floor(this.workExpForm.work_time_to / 1000)

          let params = Object.assign({}, this.workExpForm)
          ADD_USER_WORK_V2(params).then(res => {
            // console.log(res)
            if (res.code == 200) {
              this.submitLoadingValue = false;
              this.editExistWorkExpStatus = false;
              this.workExpDialogVisible = false;
              this.getBasicInfo()
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
    showEducationDialog() {
      this.educationForm = {
        school_name: '',
        degree: '',
        degree_id: '',
        field_of_study: '',
        start_time: '',
        end_time: '',
        grade: '',
        token: localStorage.getItem('token')
      }
      this.educationDegreeObj = {}
      this.educationDialogVisible = true;
    },
    saveEducationTemp() {
      this.submitEducationForm('educationForm')
    },
    deleteEducation(item) {

      let params = {
        id: item.id
      }
      EDUCATOR_DELETE_EDUCATION_ITEM(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.getBasicInfo()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    editEducation(item) {

      if (item.degree && item.degree_id) {
        this.educationDegreeObj = {
          id: item.degree_id,
          object_en: item.degree
        }
      }

      this.educationForm = Object.assign({}, item);

      let startTime = item.start_time
      let endTime = item.end_time
      // this.educationForm.date = [startTime * 1000, endTime * 1000]

      this.educationForm.start_time = startTime * 1000;
      this.educationForm.end_time = endTime * 1000;
      this.educationForm.education_id = item.id;
      this.editExistEducationStatus = true;
      this.educationDialogVisible = true;

    },
    deleteTempEducation(item, i) {
      console.log(item)
      let temp = this.educationTempData
      temp.splice(i, 1)
    },
    editTempEducation(item, i) {
      this.editEducationIndex = i;

      let obj = Object.assign({}, item)
      this.educationForm = obj;
      this.educationDialogVisible = true;
    },
    submitEducationForm(formName) {
      this.submitLoadingValue = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.educationForm.start_time = Math.floor(this.educationForm.start_time / 1000)
          this.educationForm.end_time = Math.floor(this.educationForm.end_time / 1000)

          this.educationForm.degree = this.educationDegreeObj.object_en;
          this.educationForm.degree_id = this.educationDegreeObj.id;

          let params = Object.assign({}, this.educationForm)
          ADD_USER_EDUCATION_V2(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.submitLoadingValue = false;
              this.editExistEducationStatus = false;
              this.educationDialogVisible = false;
              this.getBasicInfo()
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
  padding: 25px 50px 50px 50px;

}


.account-profile-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 25px;
}

.account-profile-t-l {
  font-family: BSemiBold, serif;
  font-size: 30px;
  color: #262626;

}

.account-profile-t-r {

}

.account-profile-cancel-btn {
  /*font-size: 20px;*/
}

.account-profile-save-btn {
  /*font-size: 20px;*/
}


.basic-form {
  height: calc(100vh - 285px);
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
  /*border-bottom: 1px dashed #EEEEEE;*/
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

.account-profile-item-label span {
  font-size: 20px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
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

.work-form-item {
  margin-top: 25px;
}

.work-exp-btn-container {
  text-align: right;
  margin-top: 20px;
}

.work-exp-cancel-btn {
  font-size: 20px;
}

.work-exp-save-btn {
  font-size: 20px;
}

.work-exp-temp-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.work-exp-temp-item {
  width: 320px;
  /*height: 500px;*/
  /*overflow: auto;*/
  margin-bottom: 10px;
  margin-right: 20px;
  box-shadow: 0px 3px 23px #00000012;

  padding: 15px;
  border-radius: 38px;
}

.work-exp-temp-btn-container {
  text-align: right;
}

.work-exp-temp-btn {
  /*font-size: 20px;*/
}

.work-experience {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

}

.account-xll-images {
  width: 90%;
}

.account-xll-image {
  position: relative;
  margin-top: 10px;

}

.account-xll-image-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: none;

}

.account-xll-image:hover .account-xll-image-mask {
  /*display: inline;*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.account-xll-image-mask span {
  margin-right: 15px;
  cursor: pointer;
}

.account-xll-image-mask:hover {

}

.language-add-container {
  width: 100%;
  position: relative;
}

.language-checkbox-item {
  width: calc(100% - 80px);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #EEEEEE;

}


.language-checkbox-item-l {
  font-size: 20px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  margin-right: 10px;
}

.language-checkbox-item-r {
  font-size: 20px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  margin-right: 10px;
}

.language-add-icon {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}


.duration-mobile-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.duration-mobile-item {
  width: 45%;
}

.duration-mobile-item-to {
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 12px;
}

/deep/ .el-date-editor {
  --el-date-editor-width: auto;
}

.contact-phone-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.contact-phone-l {
  width: 35%;
}

.contact-phone-r {
  width: 60%;
}


@media screen and (min-width: 1200px) {
  .basic-container {

  }
}

@media screen and (min-width: 769px) {
  .duration-pc {

  }

  .duration-mobile {
    display: none;
  }

}

@media screen and (max-width: 768px) {
  .duration-pc {
    display: none;
  }

  .basic-r-container {
    width: 100%;
    height: calc(var(--i-window-height) - 160px);
  }

  .basic-r-container-bg {
    padding: 15px;
  }

  .account-profile-t {
    padding-bottom: 15px;
    overflow: scroll;
  }

  .account-profile-t-l {
    font-size: 14px;
  }

  .account-profile-item-container {
    padding: 15px;
    margin-bottom: 15px;
  }

  .account-profile-item-label {
    font-size: 18px;
  }

  .account-profile-item-label span {
    font-size: 14px;
  }

  .categories-tags {
    padding-bottom: 0px;
  }

  .categories-tags-item {
    font-size: 12px;
    padding: 0 8px;
  }

  .work-experience {
    flex-direction: column;
    width: 100%;
  }

  .work-exp-temp-container {
    flex-direction: column;
    width: 100%;
  }

  .work-exp-temp-item {
    width: calc(100% - 30px);
    padding: 15px;
    margin-right: 0;
    margin-bottom: 15px;
  }


}

@media screen and (max-width: 360px) {


  .account-profile-t {
    flex-direction: column;
  }

  .account-profile-t-r {
    margin-top: 10px;
  }


}

</style>
