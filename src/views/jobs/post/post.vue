<template>
  <div class="bg">
    <div class="profile-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="job-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="job-form-container">
            <el-form
                ref="jobForm"
                :model="jobForm"
                :rules="jobRules"
                label-width="120px"
                label-position="top"
                class="demo-ruleForm"
            >
              <div class="job-detail-container">
                <div class="job-detail-label">
                  Job Details
                </div>
                <div class="job-detail-content">
                  <el-tabs
                      class="is-international-container"
                      v-model="isInternationalName "
                      type="border-card" @tab-click="handleIsInternationalClick">
                    <el-tab-pane label="China" name="first">
                      <el-form-item label="Job Location">
                        <el-select v-model="jobForm.province"
                                   @change="provinceChange"
                                   placeholder="Select Province">
                          <el-option v-for="(item,i) in provinceOptions" :key="i" :label="item.Pinyin"
                                     :value="item.id"></el-option>
                        </el-select>
                        <el-select v-model="jobForm.city"
                                   @change="cityChange"
                                   placeholder="Select City">
                          <el-option v-for="(item,i) in cityOptions" :key="i" :label="item.Pinyin"
                                     :value="item.id"></el-option>
                        </el-select>
                        <el-select v-model="jobForm.district"
                                   @change="districtChange"
                                   placeholder="Select District">
                          <el-option v-for="(item,i) in districtOptions" :key="i" :label="item.Pinyin"
                                     :value="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="International" name="second">
                      <el-form-item label="Job Location">
                        <el-input v-model="jobForm.nation_address" type="text" placeholder="Country, City"></el-input>
                      </el-form-item>
                    </el-tab-pane>
                  </el-tabs>

                  <el-form-item label="Add Location Pin">
                    <div class="map-container">
                      <div id="mapContainer" class="basemap"></div>
                    </div>

                  </el-form-item>
                  <el-form-item label="Number of Vacancies">
                    <el-input v-model="jobForm.numbers" type="number" placeholder="Number of Vacancies"></el-input>
                  </el-form-item>
                  <el-form-item label="Employment Type">

                    <div class="object-tags-container">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class="selectEmploymentTypeList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in employmentTypeList" :key="index"
                             @click="selectEmploymentType(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item label="Is this an Online Job?">
                    <el-switch v-model="jobForm.is_online"></el-switch>
                  </el-form-item>
                </div>
              </div>

              <div class="position-info-container">
                <div class="position-info-label">General Position Info</div>
                <div class="position-info-content">
                  <el-form-item label="Job Title">
                    <div class="object-tags-container">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectJobTitleList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in jobTitleList" :key="index"
                             @click="selectJobTitle(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectJobTitleList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownJobTitleList" :key="index"
                             @click="selectJobTitle(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addJobTitleStatus==false"
                             @click="addJobTitleStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addJobTitleStatus">
                          <el-input type="text" v-model="ownJobTitleValue"
                                    placeholder="Add job title"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownJobTitleValue.length>0"
                                       @click="addOwnJobTitle">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownJobTitleValue.length==0"
                                       @click="addJobTitleStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </el-form-item>
                  <el-form-item label="Application Deadline">
                    <el-date-picker
                        v-model="jobForm.apply_due_date"
                        type="date"
                        placeholder="Application Deadline"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="Start Date">
                    <div class="object-tags-container">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectStartDateList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in startDateList" :key="index"
                             @click="selectStartDate(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectStartDateList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownStartDateList" :key="index"
                             @click="selectStartDate(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addStartDateStatus==false"
                             @click="addStartDateStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addStartDateStatus">
                          <el-input type="text" v-model="ownStartDateValue"
                                    placeholder="Add start date"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownStartDateValue.length>0"
                                       @click="addOwnStartDate">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownStartDateValue.length==0"
                                       @click="addStartDateStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>


                  </el-form-item>
                  <el-form-item label="Student Ages">

                    <div class="object-tags-container">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectAgeToTeachList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ageToTeachList" :key="index"
                             @click="selectAgeToTeach(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                    </div>

                  </el-form-item>
                  <el-form-item label="Class Size (Students)">
                    <el-input v-model="jobForm.class_size" placeholder="Class Size / Students"></el-input>
                  </el-form-item>
                  <el-form-item label="Subject(s)">

                    <div class="object-tags-container">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectSubjectList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in subjectList" :key="index"
                             @click="selectSubject(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectSubjectList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownSubjectList" :key="index"
                             @click="selectSubject(item)">
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
                                    placeholder="Add your subject"></el-input>
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


                  </el-form-item>
                  <el-form-item label="Additional Job information">
                    <el-input v-model="jobForm.desc" type="textarea" placeholder="Please enter additional job information"></el-input>
                  </el-form-item>

                </div>
              </div>

              <div class="compensation-container">
                <div class="compensation-label">Compensation</div>
                <div class="compensation-content">
                  <el-form-item label="Salary (Min)">
                    <el-input v-model="jobForm.salary_min" placeholder="Enter min salary"></el-input>
                  </el-form-item>
                  <el-form-item label="Salary (Max)">
                    <el-input v-model="jobForm.salary_max" placeholder="Enter max salary"></el-input>
                  </el-form-item>
                  <el-form-item label="Payment Period">
                    <el-select v-model="jobForm.payment_period"
                               filterable
                               placeholder="Choose Payment Period">
                      <el-option v-for="(item,i) in paymentPeriodList" :key="i" :label="item.object_en"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Currency">

                    <div class="object-tags-container">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectCurrencyList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in currencyList" :key="index"
                             @click="selectCurrency(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectCurrencyList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownCurrencyList" :key="index"
                             @click="selectCurrency(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addCurrencyStatus==false"
                             @click="addCurrencyStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addCurrencyStatus">
                          <el-input type="text" v-model="ownCurrencyValue"
                                    placeholder="Add your currency"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownCurrencyValue.length>0"
                                       @click="addOwnCurrency">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownCurrencyValue.length==0"
                                       @click="addCurrencyStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </el-form-item>
                  <el-form-item label="Working Hours">
                    <div class="working-hours-show-container" v-if="workingHoursData.length>0">

                      <div class="working-hours-show-item" v-for="(item,index) in workingHoursData" :key="index">
                        <div class="week-show-item" v-for="(week,i) in item.week" :key="i">
                          <span v-if="week==1 ">M</span>
                          <span v-if="week==2 ">T</span>
                          <span v-if="week==3 ">W</span>
                          <span v-if="week==4 ">Th</span>
                          <span v-if="week==5 ">F</span>
                          <span v-if="week==6 ">Sa</span>
                          <span v-if="week==7 ">Su</span>
                        </div>
                        <view class="hours-show-container">{{ item.hours }}</view>
                      </div>
                    </div>
                    <div class="working-hours-add" @click="addWorkingHours">Add+</div>
                    <div class="working-hours-container" v-if="workingHoursContainerStatus">
                      <div class="week-container">
                        <div class="week-item" v-for="(item,index) in weekList" :key="index"
                             @click="selectWeekItem(item.id)"
                             :class="selectWeekItemData.indexOf(item.id) == -1 ? '' : 'week-item-active'">
                          <span>{{ item.name_en }}</span>
                        </div>
                      </div>
                      <div class="hours-container">
                        <el-time-select
                            v-model="workStartTime"
                            placeholder="Start time"
                            start="00:00"
                            step="00:15"
                            end="24:00"
                        >
                        </el-time-select>
                        <el-time-select
                            v-model="workEndTime"
                            :min-time="workStartTime"
                            placeholder="End time"
                            start="00:00"
                            step="00:15"
                            end="24:00"
                        >
                        </el-time-select>
                      </div>
                      <div class="working-hours-button">
                        <el-button type="primary" @click="addWorkingHoursConfirm">Confirm</el-button>
                      </div>
                    </div>

                  </el-form-item>
                  <el-form-item label="Benefits">

                    <div class="object-tags-container">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectBenefitsList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in benefitsList" :key="index"
                             @click="selectBenefits(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectBenefitsList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownBenefitsList" :key="index"
                             @click="selectBenefits(item)">
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
                                    placeholder="Add your benefits"></el-input>
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


                  </el-form-item>
                </div>
              </div>

              <div class="applicant-container">
                <div class="applicant-label">Applicant Requirements</div>
                <div class="applicant-content">
                  <el-form-item label="Native Speaker">
                    <el-switch v-model="jobForm.is_mom_language"></el-switch>
                  </el-form-item>
                  <el-form-item label="Teaching License">
                    <el-switch v-model="jobForm.is_teaching_license"></el-switch>
                  </el-form-item>
                  <el-form-item label="Gender">
                    <el-select v-model="jobForm.sex" placeholder="Select your gender">
                      <el-option v-for="(item,i) in sexOptions" :key="i" :label="item.object_en"
                                 :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Teaching Certificate(s)">

                    <div class="object-tags-container">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectTeachingCertificateList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in teachingCertificateList" :key="index"
                             @click="selectTeachingCertificate(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectTeachingCertificateList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownTeachingCertificateList" :key="index"
                             @click="selectTeachingCertificate(item)">
                          {{ item.object_name }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addTeachingCertificateStatus==false"
                             @click="addTeachingCertificateStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addTeachingCertificateStatus">
                          <el-input type="text" v-model="ownTeachingCertificateValue"
                                    placeholder="Add your teaching certificate"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownTeachingCertificateValue.length>0"
                                       @click="addOwnTeachingCertificate">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownTeachingCertificateValue.length==0"
                                       @click="addTeachingCertificateStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>


                  </el-form-item>
                  <el-form-item label="CPR Certified">
                      <el-switch v-model="jobForm.is_cpr"></el-switch>
                  </el-form-item>
                  <el-form-item label="First Aid Certified">
                    <el-switch v-model="jobForm.is_first_aide"></el-switch>
                  </el-form-item>
                  <el-form-item label="Teaching Experience" >
                    <el-switch v-model="jobForm.is_teaching_exp"></el-switch>
                  </el-form-item>
                  <el-form-item label="" v-if="jobForm.is_teaching_exp">
                    <el-select v-model="jobForm.teaching_times" placeholder="Choose Teaching Experience">
                      <el-option v-for="(item,i) in teachingExpList" :key="i" :label="item.object_en"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Minimum Education Certificate">
                    <el-select v-model="jobForm.education" placeholder="Choose Degree Level">
                      <el-option v-for="(item,i) in educationList" :key="i" :label="item.object_en"
                                 :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Languages">

                    <div class="object-tags-container">
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectLanguagesList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in languagesList" :key="index"
                             @click="selectLanguages(item)">
                          {{ item.object_en }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item"
                             :class=" selectLanguagesList.findIndex((element)=>element===item) == -1 ? '' : 'tags-active' "
                             v-for="(item,index) in ownLanguagesList" :key="index"
                             @click="selectLanguages(item)">
                          {{ item.object_name }}
                        </div>
                      </div>
                      <div class="object-tags">
                        <div class="object-tags-item" v-if="addLanguagesStatus==false"
                             @click="addLanguagesStatus=true">Add+
                        </div>
                      </div>

                      <div class="object-tags-add">
                        <div class="object-tags-item-add" v-if="addLanguagesStatus">
                          <el-input type="text" v-model="ownLanguagesValue"
                                    placeholder="Add your language"></el-input>
                          <div class="object-tags-item-btn-container">
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownLanguagesValue.length>0"
                                       @click="addOwnLanguages">Confirm
                            </el-button>
                            <el-button class="object-tags-item-btn" type="primary"
                                       v-if="ownLanguagesValue.length==0"
                                       @click="addLanguagesStatus=false">Cancel
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </el-form-item>
                  <el-form-item label="Age">
                    <el-slider v-model="ageValue" range show-stops :max="100"> </el-slider>
                  </el-form-item>
                  <el-form-item label="Will you accept applicant of different skin colors?(Equal Opportunity)">
                    <el-switch v-model="jobForm.is_equal"></el-switch>
                  </el-form-item>
                </div>
              </div>

              <div class="submit-container">
                <el-form-item>
                  <el-button type="primary" @click="submitJob('jobForm',3)">Submit</el-button>
                </el-form-item>
              </div>

            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import meSideMenu from "@/components/meSideMenu";
import {VISITOR_USER_INFO, ALL_AREAS, USER_OBJECT_LIST,ADD_JOB,JOB_ADD_PROFILE} from '@/api/api';

export default {
  name: "post",
  components: {
    meSideMenu
  },
  data() {
    return {
      accessToken: process.env.VUE_APP_MAP_BOX_ACCESS_TOKEN,
      mapStyle: process.env.VUE_APP_MAP_BOX_STYLE,
      isInternationalName: 'first',
      provinceOptions: [],
      provinceName: '',
      cityOptions: [],
      cityName: '',
      districtOptions: [],
      districtName: '',
      paymentPeriodList: [],
      employmentTypeList: [{
        id: 1,
        object_cn: "全职",
        object_en: "Full-time"
      }, {
        id: 2,
        object_cn: "兼职",
        object_en: "Part-time"
      }, {
        id: 3,
        object_cn: "季节性",
        object_en: "Seasonal"
      }],
      selectEmploymentTypeList: [],

      jobTitleList: [],
      addJobTitleStatus: false,
      ownJobTitleValue: '',
      ownJobTitleList: [],
      selectJobTitleList: [],
      selectJobTitleArr: [],

      benefitsList: [],
      addBenefitsStatus: false,
      ownBenefitsValue: '',
      ownBenefitsList: [],
      selectBenefitsList: [],
      selectBenefitsArr: [],

      startDateList: [],
      addStartDateStatus: false,
      ownStartDateValue: '',
      ownStartDateList: [],
      selectStartDateList: [],
      selectStartDateArr: [],

      ageToTeachList: [],
      addAgeToTeachStatus: false,
      ownAgeToTeachValue: '',
      ownAgeToTeachList: [],
      selectAgeToTeachList: [],
      selectAgeToTeachArr: [],

      subjectList: [],
      addSubjectStatus: false,
      ownSubjectValue: '',
      ownSubjectList: [],
      selectSubjectList: [],
      selectSubjectArr: [],


      currencyList: [],
      addCurrencyStatus: false,
      ownCurrencyValue: '',
      ownCurrencyList: [],
      selectCurrencyList: [],
      selectCurrencyArr: [],

      teachingCertificateList: [],
      addTeachingCertificateStatus: false,
      ownTeachingCertificateValue: '',
      ownTeachingCertificateList: [],
      selectTeachingCertificateList: [],
      selectTeachingCertificateArr: [],

      languagesList: [],
      addLanguagesStatus: false,
      ownLanguagesValue: '',
      ownLanguagesList: [],
      selectLanguagesList: [],
      selectLanguagesArr: [],

      weekList: [{
        id: 1,
        name_en: 'M',
        name_cn: '一'
      },
        {
          id: 2,
          name_en: 'T',
          name_cn: "二"
        },
        {
          id: 3,
          name_en: 'W',
          name_cn: "三"
        },
        {
          id: 4,
          name_en: 'Th',
          name_cn: "四"
        },
        {
          id: 5,
          name_en: 'F',
          name_cn: "五"
        },
        {
          id: 6,
          name_en: 'Sa',
          name_cn: "六"
        },
        {
          id: 7,
          name_en: 'Su',
          name_cn: "日"
        }
      ],
      workingHoursData: [],
      selectWeekItemData: [],
      workingHoursContainerStatus: false,
      workStartTime: '',
      workEndTime: '',

      sexOptions:[
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
          object_en: 'No Gender Requirements',
          object_cn: '无性别要求'
        }
      ],
      teachingExpList:[],
      educationList:[],
      ageValue:[18,60],

      jobForm: {
        job_title: '',
        job_location: '',
        province: '',
        city: '',
        district: '',
        apply_due_date: '',
        is_online: 0,
        salary_min: '',
        salary_max: '',
        payment_period: '',
        payment_period_str: '',
        desc: '',
        numbers: 1,
        is_equal: 0,
        sex: '',
        sex_name: '',
        is_cpr: 0,
        is_first_aide: 0,
        is_teaching_exp: 0,
        teaching_times: '',
        teaching_times_str: '',
        is_teaching_license: 0,
        education: '',
        education_str: '',
        nationality: '',
        age: '',
        age_min: '',
        age_max: '',
        is_interview: 1,
        interview_name: '',
        interview_nationlity: '',
        interview_imgurl: '',
        entry_date: '',
        business_id: '',
        business_name: '',
        currency: '',
        is_mom_language: 0,
        employment_type: '',
        class_size: '',
        working_hours: '',
        version_time: '',
        address: '',
        lat: '',
        lng: '',
        international: 0,
        nation_address: '',
        token:localStorage.getItem('token')
      },
      jobRules: {
        job_location: [
          {
            required: true,
            message: 'Please input',
            trigger: 'change',
          },
        ],
      },


    }
  },
  mounted() {
    this.initMap()
    this.getVisitorBasicInfo()
    this.getAllAreas(0)
    this.getUserObjectList()
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = this.accessToken;

      const map = new mapboxgl.Map({
        container: "mapContainer",
        center: [115.64673, 34.42592],
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
      // {
      //   draggable:true
      // }
      // marker.on('dragend',(e)=>{
      //   console.log(e)
      // })
      geocoder.on('result', (e) => {
        console.log(e)
        marker.setLngLat(e.result.center).addTo(map)
        this.jobForm.address = e.result.place_name
        this.jobForm.lng = e.result.center[0]
        this.jobForm.lat = e.result.center[1]

      })
      geocoder.on('clear', (e) => {
        console.log(e)
        this.jobForm.address =''
        this.jobForm.lng = ''
        this.jobForm.lat = ''
      })

    },
    handleIsInternationalClick(tab, event) {
      console.log(tab, event)
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
            this.userInfo = res.message.educator_info
          }
          if (identity == 2 && res.message.business_info) {
            this.userInfo = res.message.business_info
            this.jobForm.business_id = res.message.business_info.id;
            this.jobForm.business_name = res.message.business_info.business_name

          }
          if (identity == 3 && res.message.vendor_info) {
            this.userInfo = res.message.vendor_info
          }

        }
      })
    },
    getAllAreas(pid) {
      let params = {
        pid: pid
      }
      ALL_AREAS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.provinceOptions = res.message
        }
      })
    },
    getAllCitys(pid) {
      let params = {
        pid: pid
      }
      ALL_AREAS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.cityOptions = res.message
        }
      })
    },
    getAllDistricts(pid) {
      let params = {
        pid: pid
      }
      ALL_AREAS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.districtOptions = res.message
        }
      })
    },
    provinceChange(e) {
      console.log(e)
      this.getAllCitys(e)
      let data = this.provinceOptions.filter(item=>item.id==e)
      // console.log(data[0])
      this.provinceName = data[0]['Pinyin']

    },
    cityChange(e) {
      console.log(e)
      this.getAllDistricts(e)
      let data = this.cityOptions.filter(item=>item.id==e)
      // console.log(data[0])
      this.cityName = data[0]['Pinyin']

    },
    districtChange(e) {
      console.log(e)
      let data = this.districtOptions.filter(item=>item.id==e)
      // console.log(data[0])
      this.districtName = data[0]['Pinyin']
    },
    selectEmploymentType(value) {

      let index = this.selectEmploymentTypeList.findIndex(element => element == value)

      if (index == -1) {
        let len = this.selectEmploymentTypeList.length;

        if (len > 0) {
          this.selectEmploymentTypeList.splice(len - 1, 1);
        }
        this.selectEmploymentTypeList.push(value);
      } else {
        this.selectEmploymentTypeList.splice(index, 1);
      }
    },
    addOwnJobTitle() {
      this.addJobTitleStatus = false;
      let obj = {
        id: 0,
        object_en: this.ownJobTitleValue,
        object_pid: 6
      }
      this.ownJobTitleList.push(obj);
      this.ownJobTitleValue = '';
      let index = this.selectJobTitleList.findIndex((element) => element === obj);

      if (index == -1) {
        this.selectJobTitleList.splice(index, 1, obj);

      } else {
        this.selectJobTitleList.splice(index, 1);
      }
      // console.log(this.selectJobTitleList)
    },
    selectJobTitle(value) {
      let index = this.selectJobTitleList.findIndex((element) => element === value);

      if (index == -1) {
        this.selectJobTitleList.splice(index, 1, value);
      } else {
        this.selectJobTitleList.splice(index, 1);
      }
      // console.log(this.selectJobTitleList)
    },
    addOwnStartDate() {
      this.addStartDateStatus = false;
      let obj = {
        id: 0,
        object_en: this.ownStartDateValue,
        object_pid: 6
      }
      this.ownStartDateList.push(obj);
      this.ownStartDateValue = '';
      let index = this.selectStartDateList.findIndex((element) => element === obj);

      if (index == -1) {
        this.selectStartDateList.splice(index, 1, obj);

      } else {
        this.selectStartDateList.splice(index, 1);
      }
      // console.log(this.selectStartDateList)
    },
    selectStartDate(value) {
      let index = this.selectStartDateList.findIndex((element) => element === value);

      if (index == -1) {
        this.selectStartDateList.splice(index, 1, value);
      } else {
        this.selectStartDateList.splice(index, 1);
      }
      // console.log(this.selectStartDateList)
    },
    addOwnAgeToTeach() {
      this.addAgeToTeachStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownAgeToTeachValue,
        object_pid: 4
      }
      this.ownAgeToTeachList.push(obj);
      this.ownAgeToTeachValue = '';
      let index = this.selectAgeToTeachList.findIndex((element) => element === obj);
      if (index == -1) {
        if (this.selectAgeToTeachList.length > 3) {
          return false;
        }
        this.selectAgeToTeachList.push(obj);
      } else {
        this.selectAgeToTeachList.splice(index, 1);
      }
    },
    selectAgeToTeach(value) {
      let index = this.selectAgeToTeachList.findIndex((element) => element === value);
      if (index == -1) {
        if (this.selectAgeToTeachList.length > 3) {
          return false;
        }
        this.selectAgeToTeachList.push(value);
      } else {
        this.selectAgeToTeachList.splice(index, 1);
      }
    },
    addOwnSubject() {
      this.addSubjectStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownSubjectValue,
        object_pid: 6
      }
      this.ownSubjectList.push(obj);
      this.ownSubjectValue = '';
      let index = this.selectSubjectList.findIndex((element) => element === obj);

      if (index == -1) {
        if (this.selectSubjectList.length > 4) {
          return false;
        }
        this.selectSubjectList.push(obj);
      } else {
        this.selectSubjectList.splice(index, 1);
      }
    },
    selectSubject(value) {
      let index = this.selectSubjectList.findIndex((element) => element === value);

      if (index == -1) {
        if (this.selectSubjectList.length > 4) {
          return false;
        }
        this.selectSubjectList.push(value);
      } else {
        this.selectSubjectList.splice(index, 1);
      }
      // console.log(this.selectSubjectList)
    },
    addOwnCurrency() {
      this.addCurrencyStatus = false;
      let obj = {
        id: 0,
        object_en: this.ownCurrencyValue,
        object_pid: 117,
      }
      this.ownCurrencyList.push(obj);
      this.ownCurrencyValue = '';
      let index = this.selectCurrencyList.findIndex((element) => element === obj);
      if (index == -1) {
        this.selectCurrencyList.splice(index, 1, obj)
      } else {
        this.selectCurrencyList.splice(index, 1);
      }
    },
    selectCurrency(value) {
      let index = this.selectCurrencyList.findIndex((element) => element === value);
      if (index == -1) {
        this.selectCurrencyList.splice(index, 1, value)
      } else {
        this.selectCurrencyList.splice(index, 1);
      }
      // console.log(this.selectCurrencyList);
    },
    addOwnTeachingCertificate() {
      this.addTeachingCertificateStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownTeachingCertificateValue,
        object_pid: 7,

      }
      this.ownTeachingCertificateList.push(obj);
      this.ownTeachingCertificateValue = '';
      let index = this.selectTeachingCertificateList.findIndex((element) => element === obj);
      if (index == -1) {
        if (this.selectTeachingCertificateList.length > 3) {
          return false;
        }
        this.selectTeachingCertificateList.push(obj);
      } else {
        this.selectTeachingCertificateList.splice(index, 1);
      }
    },
    selectTeachingCertificate(value) {
      let index = this.selectTeachingCertificateList.findIndex((element) => element === value);
      if (index == -1) {
        if (this.selectTeachingCertificateList.length > 3) {
          return false;
        }
        this.selectTeachingCertificateList.push(value);
      } else {
        this.selectTeachingCertificateList.splice(index, 1);
      }
    },
    addOwnLanguages() {
      this.addLanguagesStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownLanguagesValue,
        object_pid: 2
      }
      this.ownLanguagesList.push(obj);
      this.ownLanguagesValue = '';
      let index = this.selectLanguagesList.findIndex((element) => element === obj);
      if (index == -1) {
        if (this.selectLanguagesList.length > 3) {
          return false;
        }
        this.selectLanguagesList.push(obj);

      } else {
        this.selectLanguagesList.splice(index, 1);
      }
    },
    selectLanguages(value) {
      let index = this.selectLanguagesList.findIndex((element) => element === value);
      if (index == -1) {
        if (this.selectLanguagesList.length > 3) {
          return false
        }
        this.selectLanguagesList.push(value);

      } else {
        this.selectLanguagesList.splice(index, 1);
      }
    },
    addOwnBenefits() {
      this.addBenefitsStatus = false;
      let obj = {
        id: 0,
        object_name: this.ownBenefitsValue,
        object_pid: 6
      }
      this.ownBenefitsList.push(obj);
      this.ownBenefitsValue = '';
      let index = this.selectBenefitsList.findIndex((element) => element === obj);

      if (index == -1) {
        if (this.selectBenefitsList.length >= 5) {
          return false
        }
        this.selectBenefitsList.push(obj);
      } else {
        this.selectBenefitsList.splice(index, 1);
      }
    },
    selectBenefits(value) {
      let index = this.selectBenefitsList.findIndex((element) => element === value);

      if (index == -1) {
        if (this.selectBenefitsList.length >= 5) {
          return false
        }
        this.selectBenefitsList.push(value);
      } else {
        this.selectBenefitsList.splice(index, 1);
      }
      // console.log(this.selectBenefitsList)
    },
    submitBenefits(jobId) {
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
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('benefits--submit--' + res.data);
        }
      })
    },
    submitAgeToTeach(jobId) {
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
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('agetoteach--submit--' + res.data);
        } else {
          console.log('agetoTeach--submit--error');
          console.log(res.msg);
        }

      }).catch(error => {
        console.log(error)
      })
    },
    submitSubject(jobId) {
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
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('subject--submit--' + res.data);
        } else {
          console.log('subject--submit-error');
          console.log(res.msg);
        }

      }).catch(error => {
        console.log(error)
      })
    },
    submitEmploymentType(jobId) {
      let expand = [];
      let objectArr = [];
      this.selectEmploymentTypeList.forEach(item => {
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
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('employment--submit--' + res.data);
        } else {
          console.log('employment--submit--error');
          console.log(res.msg)
        }

      }).catch(error => {
        console.log(error)
      })
    },
    submitTeachingCertificate(jobId) {
      let expand = [];
      let objectArr = [];
      this.selectTeachingCertificateList.forEach(item => {
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
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('teachingcertificate--submit--' + res.data);
        } else {
          console.log('teachingcertificate--submit--error');
          console.log(res.msg);
        }

      }).catch(error => {
        console.log(error)
      })
    },
    submitLanguages(jobId) {
      let expand = [];
      let objectArr = [];
      this.selectLanguagesList.forEach(item => {
        console.log(item);
        if (item.id === 0) {
          expand.push(item.object_name);
        } else {
          objectArr.push(item.id);
        }
      })

      let data = {
        token: localStorage.getItem('token'),
        object_pid: 2,
        object_id: objectArr,
        expand: expand,
        job_id: jobId
      }

      JOB_ADD_PROFILE(data).then(res => {
        if (res.code == 200) {
          console.log('languages--submit--' + res.data);
        } else {
          console.log('languages--submit--error');
          console.log(res.msg);
        }

      }).catch(error => {
        console.log(error)
      })
    },
    getUserObjectList() {
      let data = {
        token: localStorage.getItem('token')
      }
      USER_OBJECT_LIST(data).then(res => {
        if (res.code == 200) {
          this.benefitsList = res.message.filter(item => item.pid === 6); //benefits
          this.ageToTeachList = res.message.filter(item => item.pid === 4); //age to teach
          // this.employmentTypeList = res.message.filter(item => item.pid === 3); //employment type
          this.paymentPeriodList = res.message.filter(item => item.pid ===
              111); // payment period
          this.currencyList = res.message.filter(item => item.pid === 117); // currency
          this.teachingCertificateList = res.message.filter(item => item.pid ===
              7); //teaching certificate ...
          this.teachingExpList = res.message.filter(item => item.pid === 120); //teaching exp
          this.educationList = res.message.filter(item => item.pid === 125); // education
          this.languagesList = res.message.filter(item => item.pid === 2); // language ..
          this.jobTitleList = res.message.filter(item => item.pid === 103); //job title
          this.startDateList = res.message.filter(item => item.pid === 108); // start date
          this.subjectList = res.message.filter(item => item.pid === 1); //subject
          this.ageList = res.message.filter(item => item.pid === 131); //age list
        }
      })
    },
    addWorkingHours() {
      // this.workingHoursData = [];
      this.selectWeekItemData = [];
      this.selectWorkingHours = '';
      this.workingHoursContainerStatus = !this.workingHoursContainerStatus;
    },
    addWorkingHoursConfirm() {

      let workingHours = this.workStartTime + '-' + this.workEndTime;
      let weekData = this.selectWeekItemData;

      let data = this.workingHoursData;
      let obj = {
        week: weekData,
        hours: workingHours,
        show: false
      }
      // console.log(obj)
      if (weekData.length > 0 && workingHours) {
        data.push(obj)
      }

      this.jobForm.working_hours = JSON.stringify(data);
      this.workingHoursContainerStatus = false;
    },
    selectWeekItem(weekId) {
      // console.log(weekId)
      let weekItemData = this.selectWeekItemData;
      let index = weekItemData.indexOf(weekId)
      if (index == -1) {
        this.selectWeekItemData.push(weekId)
      } else {
        this.selectWeekItemData.splice(index, 1)
      }
      console.log(this.selectWeekItemData)

    },
    submitJob(formName,submitType) {
      let that = this;

      if (this.selectEmploymentTypeList.length <= 0) {
        return this.$message.warning('Employment Type')
      }

      if (this.selectJobTitleList.length <= 0) {
        return this.$message.warning('Job Title')
      }

      if (this.selectCurrencyList.length <= 0) {
        return this.$message.warning('Currency')
      }

      if (this.selectEmploymentTypeList.length > 0) {
        let employmentTypeList = this.selectEmploymentTypeList;
        this.jobForm.employment_type = employmentTypeList[0].id;
      }
      if (this.selectCurrencyList.length > 0) {
        let currency = this.selectCurrencyList;
        that.jobForm.currency = currency[0].object_en;
      } else {
        that.jobForm.currency = '';
      }
      if (this.selectJobTitleList.length > 0) {
        let a = this.selectJobTitleList;
        that.jobForm.job_title = a[0].object_en;
      } else {
        that.jobForm.job_title = '';
      }

      if (this.selectStartDateList.length > 0) {
        let startDate = this.selectStartDateList;
        that.jobForm.entry_date = startDate[0].object_en;
      } else {
        that.jobForm.entry_date = '';
      }

      that.jobForm.age_min = this.ageValue[0];
      that.jobForm.age_max = this.ageValue[1];

      that.jobForm.version_time = this.$route.query.version_time;

      // if (that.isEdit) {
      //   that.form.job_id = this.jobId;
      // }
      console.log(that.jobForm);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = Object.assign({}, that.jobForm);
          ADD_JOB(data).then(res => {
            // console.log(res);
            if (res.code == 200) {

              let jobId = res.data.job_id;
              if (this.selectBenefitsList.length > 0) {
                that.submitBenefits(jobId);
              }

              if (this.selectAgeToTeachList.length > 0) {
                that.submitAgeToTeach(jobId);
              }
              if (this.subjectList.length > 0) {
                that.submitSubject(jobId);
              }
              if (this.selectTeachingCertificateList.length > 0) {
                that.submitTeachingCertificate(jobId);
              }
              if (this.selectLanguagesList.length > 0) {
                that.submitLanguages(jobId);
              }

              if (submitType == 3) {
                // this.$router.push('/')
              }

            }
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })


    }


  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.profile-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.job-r-container {
  padding: 0 20px;
}

.job-detail-container {
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: left;
}

.job-detail-label {
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #EEEEEE;
  padding: 10px 0;
}

.is-international-container {
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
}

.map-container {
  height: 300px;
}

.basemap {
  width: 100%;
  height: 100%;
}

.position-info-container {
  margin-top: 20px;
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: left;
}

.position-info-label {
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #EEEEEE;
  padding: 10px 0;
}

.compensation-container {
  margin-top: 20px;
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: left;
}

.compensation-label {
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #EEEEEE;
  padding: 10px 0;
}

.applicant-container {
  margin-top: 20px;
  background-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: left;
}

.applicant-label {
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #EEEEEE;
  padding: 10px 0;
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


.working-hours-add {
  width: 70px;
  margin-top: 10px;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  background-color: rgba(0, 180, 210, 0.2);
}

.working-hours-container {
  /* background-color: rgba(0, 180, 210, 0.2); */
  background-color: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}

.week-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.week-item {
  background-color: rgba(0, 179, 210, 0.1);
  color: #000000;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  text-align: center;
  border-radius: 40px;
}

.hours-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  width: 98%;
}

.working-hours-button {
  margin-top: 20px;
}

.working-hours-button button {
  width: 30%;
  background-color: #0AA0A8;
  color: #FFFFFF;
  font-size: 14px;
}

.working-hours-show-container {
}

.working-hours-show-item {
  border: 1px solid #EEEEEE;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}

.week-show-item {
  width: 60px;

  background-color: rgba(0, 180, 210, 0.9);
  color: #FFFFFF;
  font-size: 14px;
  text-align: center;
  border-radius: 60px;
  margin: 10px;
}

.hours-show-container {
  border: 1px solid #EEEEEE;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #FFFFFF;
}

.week-item-active {
  background-color: #00CE47;
  color: #FFFFFF;
}
.submit-container{
  margin-top: 20px;
}
</style>