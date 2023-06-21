<template>
    <div class="profile-bg">

        <el-scrollbar class="profile-scrollbar">
            <div class="profile-collapse">

                <div class="profile-collapse-t" @click="addExpandKeys(1)">
                    <div class="profile-collapse-t-label"><span>Personal Information</span></div>
                    <div class="profile-collapse-t-line"></div>
                    <div class="profile-collapse-t-icons">
                        <el-image
                                v-if="expandKeysData.indexOf(1) === -1"
                                class="profile-collapse-t-icon"
                                :src="arrowDownIcon">
                        </el-image>
                        <el-image
                                v-else
                                class="profile-collapse-t-icon"
                                :src="arrowUpIcon">
                        </el-image>
                    </div>
                </div>

                <el-collapse-transition>
                    <div class="profile-collapse-b" v-if="expandKeysData.indexOf(1) === -1">

                        <div class="profile-top-container">
                            <div class="profile-top-l">
                                <div class="profile-label">
                                    <span>Personal Information</span>
                                </div>
                                <div class="profile-tips">
                                    <span>Update your personal Information and Photo Here</span>
                                </div>
                            </div>
                            <div class="profile-top-r">

                                <template v-if="stepOneStatus">
                                    <el-button icon="Edit" plain @click="editStepOne()">
                                        Edit
                                    </el-button>
                                </template>
                                <template v-else>
                                    <el-button type="info"
                                               @click="cancelStepOne()">
                                        Cancel
                                    </el-button>
                                    <el-button type="primary"
                                               :loading="stepOneLoadingStatus"
                                               @click="saveStepOne(personalForms)">
                                        Save & Continue
                                    </el-button>

                                </template>

                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="personalForms"
                                    :model="personalForm"
                                    :rules="personalRules"
                                    require-asterisk-position="right"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Name" prop="first_name">
                                    <div class="form-item-container">
                                        <el-input style="margin-right: 20px;"
                                                  disabled
                                                  v-model="personalForm.first_name"
                                                  placeholder="Enter First Name">
                                        </el-input>
                                        <el-input v-model="personalForm.last_name"
                                                  disabled
                                                  placeholder="Enter Second Name">
                                        </el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="E-mail Address" prop="email">
                                    <el-input class="form-width-388"
                                              v-model="personalForm.email"
                                              disabled
                                              placeholder="Enter your E-mail">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="Nationality" prop="nationality">
                                    <el-select v-model="personalForm.nationality"
                                               class="form-width-388"
                                               :disabled="stepOneStatus"
                                               filterable
                                               fit-input-width

                                               placeholder="Enter your nationality">
                                        <el-option v-for="(item,i) in nationalityOptions"
                                                   :key="i"
                                                   :label="item.name"
                                                   :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="Profile visibility">
                                    <el-radio-group :disabled="stepOneStatus" v-model="personalForm.is_visible">
                                        <el-radio class="form-width-percent-100" :label="0">Private</el-radio>
                                        <el-radio class="form-width-percent-100" :label="1">Public</el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="Phone No">
                                    <div class="form-item-container">

                                        <el-input v-model="personalForm.phone"
                                                  :disabled="stepOneStatus"
                                                  class="form-width-388"
                                                  oninput="value=value.replace(/[^\d]/g,'')"
                                                  maxlength="15"
                                                  placeholder="Phone #">
                                            <template #prepend>
                                                <el-select v-model="personalForm.phone_code"
                                                           :disabled="stepOneStatus"
                                                           class="form-width-100"

                                                           filterable
                                                           placeholder="Select">
                                                    <el-option
                                                            v-for="item in phoneCodeOptions"
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
                                            </template>
                                        </el-input>
                                    </div>
                                </el-form-item>

                                <el-form-item label="Job Seeking Status">
                                    <el-radio-group :disabled="stepOneStatus" v-model="personalForm.is_seeking">
                                        <template v-for="(item,i) in jobSeekingOptions" :key="i">
                                            <el-radio class="form-width-percent-100" :label="item.value">
                                                {{ item.name }}
                                            </el-radio>
                                        </template>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="Profile Picture">
                                    <template #label>
                                        <div>
                                            <div>
                                                Profile Picture
                                            </div>
                                            <div class="profile-picture-tips">
                                                This picture display on your Profile account
                                            </div>
                                        </div>
                                    </template>

                                    <div class="profile-picture-r">

                                        <el-avatar class="profile-avatar-img"
                                                   :src="personalForm.profile_photo"></el-avatar>

                                        <el-upload
                                                class="profile-picture-upload"
                                                drag
                                                action=""
                                                :headers="uploadHeaders"
                                                :show-file-list="false"
                                                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                                                :http-request="profilePhotoHttpRequest"
                                                :before-upload="beforeProfilePhotoUpload"
                                                :disabled="stepOneStatus"
                                        >
                                            <el-image class="profile-upload-icon" :src="uploadIcon"></el-image>
                                            <div class="profile-upload-text">
                                                <span>Click to Upload</span> Or Drag your photo <br>
                                                SVG,PNG,JPEG OR GIF (400x400)
                                            </div>

                                        </el-upload>
                                    </div>


                                </el-form-item>

                            </el-form>
                        </div>

                    </div>

                </el-collapse-transition>
            </div>

            <div class="profile-collapse">

                <div class="profile-collapse-t" @click="addExpandKeys(2)">
                    <div class="profile-collapse-t-label"><span>Profession Information</span></div>
                    <div class="profile-collapse-t-line"></div>
                    <div class="profile-collapse-t-icons">
                        <el-image
                                v-if="expandKeysData.indexOf(2) === -1"
                                class="profile-collapse-t-icon"
                                :src="arrowDownIcon">
                        </el-image>
                        <el-image
                                v-else
                                class="profile-collapse-t-icon"
                                :src="arrowUpIcon">
                        </el-image>
                    </div>
                </div>

                <el-collapse-transition>
                    <div class="profile-collapse-b" v-if="expandKeysData.indexOf(2) === -1">

                        <div class="profile-top-container">
                            <div class="profile-top-l">
                                <div class="profile-label">
                                    <span>Profession Information</span>
                                </div>
                                <div class="profile-tips">
                                    <span>Update your personal Information and Photo Here</span>
                                </div>
                            </div>
                            <div class="profile-top-r">

                                <template v-if="stepTwoStatus">
                                    <el-button icon="Edit" plain @click="editStepTwo()">
                                        Edit
                                    </el-button>
                                </template>
                                <template v-else>
                                    <el-button type="info"
                                               @click="cancelStepTwo()">
                                        Cancel
                                    </el-button>
                                    <el-button type="primary"
                                               :loading="stepTwoLoadingStatus"
                                               @click="saveStepTwo(professionForms)">
                                        Save & Continue
                                    </el-button>

                                </template>

                            </div>
                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="professionForms"
                                    :model="professionForm"
                                    :rules="professionRules"
                                    require-asterisk-position="right"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Job title" prop="job_title">
                                    <el-input
                                            class="form-width-388"
                                            :disabled="stepTwoStatus"
                                            v-model="professionForm.job_title"
                                            placeholder="Enter Job title here"></el-input>
                                </el-form-item>
                                <el-form-item label="Qualification/Education Level">
                                    <el-input
                                            class="form-width-388"
                                            :disabled="stepTwoStatus"
                                            v-model="professionForm.education_level"
                                            placeholder="Enter your Qualification"></el-input>
                                </el-form-item>
                                <el-form-item label="Professional Description">
                                    <el-input
                                            class="form-width-388"
                                            :disabled="stepTwoStatus"
                                            v-model="professionForm.bio"
                                            type="textarea"
                                            :rows="6"
                                            placeholder="Description*">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="Educator Type(Up to 3)">

                                    <el-checkbox-group :disabled="stepTwoStatus"
                                                       v-model="personalForm.sub_categories"
                                                       class="form-width-388"
                                                       :min="1"
                                                       :max="3">

                                        <div style="display: flex;flex-direction: row;flex-wrap:wrap;">

                                            <div style="flex-basis: 50%;" v-for="(item,i) in subCategoryOptions"
                                                 :key="i">
                                                <el-checkbox v-if="item['children'].length === 0" :label="item">
                                                    {{ item.identity_name }}
                                                </el-checkbox>
                                                <el-checkbox v-for="(child,key) in item['children']" :key="key"
                                                             :label="item">
                                                    {{ child.identity_name }}
                                                </el-checkbox>
                                            </div>

                                        </div>

                                    </el-checkbox-group>

                                </el-form-item>

                                <el-form-item label="Work destination ">
                                    <template #label>
                                        <div>
                                            <div>
                                                Preferred Job Location
                                            </div>
                                            <div class="profile-picture-tips">

                                            </div>
                                        </div>
                                    </template>
                                    <el-select
                                            class="form-width-388"
                                            filterable

                                            :disabled="stepTwoStatus"
                                            v-model="workDestinationValue"
                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select your Location"
                                            value-key="id"

                                    >
                                        <el-option
                                                v-for="(item,i) in workDestinationOptions"
                                                :key="i"
                                                :label="item.object_en"
                                                :value="item"
                                        />
                                    </el-select>

                                </el-form-item>

                                <el-form-item label="Preferred Job type">

                                    <el-select
                                            class="form-width-388"
                                            filterable

                                            multiple
                                            :disabled="stepTwoStatus"
                                            v-model="jobTypeValue"
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select job type"
                                            value-key="id"
                                    >
                                        <el-option
                                                v-for="(item,i) in jobTypeOptions"
                                                :key="i"
                                                :label="item.object_en"
                                                :value="item"
                                        />
                                    </el-select>

                                </el-form-item>

                                <el-form-item label="Interests">

                                    <el-select
                                            class="form-width-388"
                                            v-model="interestsValue"
                                            :disabled="stepTwoStatus"

                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select interests"
                                            filterable
                                            allow-create
                                            value-key="id"
                                    >
                                        <el-option
                                                v-for="(item,index) in interestsOptions"
                                                :key="index"
                                                :label="item"
                                                :value="item"
                                        />

                                    </el-select>

                                </el-form-item>

                                <el-form-item label="Subject(s) to teach">

                                    <el-select
                                            class="form-width-388"

                                            :disabled="stepTwoStatus"
                                            v-model="subjectValue"
                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select subject(s)"
                                            filterable
                                            allow-create
                                            value-key="id"
                                    >
                                        <el-option
                                                v-for="(item,index) in subjectOptions"
                                                :key="index"
                                                :label="item.object_en"
                                                :value="item"
                                        />

                                    </el-select>

                                </el-form-item>


                                <!--                                <el-form-item label="Work schedule type">-->

                                <!--                                    <el-select-->
                                <!--                                            class="form-width-388"-->
                                <!--                                            :disabled="stepTwoStatus"-->
                                <!--                                            v-model="workScheduleTypeValue"-->
                                <!--                                            -->
                                <!--                                            filterable-->
                                <!--                                            collapse-tags-->
                                <!--                                            placeholder="Select work schedule type"-->
                                <!--                                            value-key="id"-->
                                <!--                                    >-->
                                <!--                                        <el-option v-for="(item,i) in workScheduleTypeOptions"-->
                                <!--                                                   :key="i"-->
                                <!--                                                   :label="item.object_en"-->
                                <!--                                                   :value="item.id">-->
                                <!--                                        </el-option>-->
                                <!--                                    </el-select>-->

                                <!--                                </el-form-item>-->

                                <el-form-item label="Preferred Language">

                                    <el-select
                                            class="form-width-388"
                                            :disabled="stepTwoStatus"
                                            v-model="preferredLanguageValue"

                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select Language"
                                            filterable
                                            allow-create
                                            value-key="id"
                                    >
                                        <el-option
                                                v-for="(item,index) in preferredLanguageOptions"
                                                :key="index"
                                                :label="item.object_en"
                                                :value="item"
                                        />

                                    </el-select>

                                </el-form-item>

                                <el-form-item label="Benefits">

                                    <el-select
                                            class="form-width-388"
                                            :disabled="stepTwoStatus"
                                            v-model="benefitsValue"

                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select benefits"
                                            filterable
                                            allow-create
                                            value-key="id"
                                    >
                                        <el-option
                                                v-for="(item,index) in benefitsOptions"
                                                :key="index"
                                                :label="item.object_en"
                                                :value="item"
                                        />

                                    </el-select>

                                </el-form-item>

                                <el-form-item label="Students Age">

                                    <el-select
                                            class="form-width-388"

                                            :disabled="stepTwoStatus"
                                            v-model="studentsAgeValue"
                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select Students Age"
                                            filterable
                                            allow-create
                                            value-key="id"
                                    >
                                        <el-option
                                                v-for="(item,index) in studentsAgeOptions"
                                                :key="index"
                                                :label="item.object_en"
                                                :value="item"
                                        />

                                    </el-select>

                                </el-form-item>

                                <el-form-item label="Languages & Proficiency">
                                    <div>
                                        <el-button type="primary"
                                                   :disabled="stepTwoStatus"
                                                   @click="addLanguageAndProficiency()"
                                        >
                                            Add Language
                                            <el-icon>
                                                <Plus></Plus>
                                            </el-icon>
                                        </el-button>
                                    </div>

                                    <div class="language-add-container">

                                        <template v-if="selectedLanguageList.length > 0">
                                            <div class="language-checkbox-item" v-for="(item,i) in selectedLanguageList"
                                                 :key="i">
                                                <div class="language-checkbox-item-l">
                                                    {{ item.object_en }}
                                                </div>
                                                <div class="language-checkbox-item-r">
                                                    {{ item.level_name }}
                                                </div>

                                                <div class="language-checkbox-item-delete">
                                                    <el-button link @click="removeLanguageItem(i)">
                                                        Remove
                                                    </el-button>
                                                </div>

                                            </div>

                                        </template>

                                    </div>

                                </el-form-item>

                            </el-form>
                        </div>

                    </div>

                </el-collapse-transition>
            </div>
            <div class="profile-collapse">

                <div class="profile-collapse-t" @click="addExpandKeys(3)">
                    <div class="profile-collapse-t-label"><span>Past Experience</span></div>
                    <div class="profile-collapse-t-line"></div>
                    <div class="profile-collapse-t-icons">
                        <el-image
                                v-if="expandKeysData.indexOf(3) === -1"
                                class="profile-collapse-t-icon"
                                :src="arrowDownIcon">
                        </el-image>
                        <el-image
                                v-else
                                class="profile-collapse-t-icon"
                                :src="arrowUpIcon">
                        </el-image>
                    </div>
                </div>

                <el-collapse-transition>
                    <div class="profile-collapse-b" v-if="expandKeysData.indexOf(3) === -1">

                        <div class="profile-top-container">
                            <div class="profile-top-l">
                                <div class="profile-label">
                                    <span>Past Experience</span>
                                </div>
                                <div class="profile-tips">
                                    <span>Tell us about your previous work experience if any</span>
                                </div>
                            </div>
                            <div class="profile-top-r">
                                <template v-if="stepThreeStatus">
                                    <el-button icon="Edit" plain @click="editStepThree()">
                                        Edit
                                    </el-button>
                                </template>
                                <template v-else>
                                    <el-button type="info" @click="cancelStepThree()">
                                        Cancel
                                    </el-button>
                                    <el-button type="primary"
                                               :loading="stepThreeLoadingStatus"
                                               @click="saveStepThree(pastExpForms)">
                                        Save & Continue
                                    </el-button>

                                </template>

                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="pastExpForms"
                                    :model="pastExpForm"
                                    :rules="pastExpRules"
                                    require-asterisk-position="right"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Years of experience">
                                    <el-select v-model="teachExpValue"
                                               :disabled="stepThreeStatus"
                                               class="form-width-388"
                                               filterable

                                               placeholder="Years of Experience"
                                               value-key="id"
                                    >
                                        <el-option v-for="(item,i) in teachExpOptions"
                                                   :key="i"
                                                   :label="item.object_en"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="Places Traveled">
                                    <el-select
                                            class="form-width-388"
                                            filterable
                                            clearable

                                            v-model="placesTraveledValue"
                                            :disabled="stepThreeStatus"
                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select places traveled"
                                            value-key="id"

                                    >
                                        <el-option
                                                v-for="(item,i) in placesTraveledOptions"
                                                :key="i"
                                                :label="item.object_en"
                                                :value="item"
                                        />
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="Places Lived">
                                    <el-select
                                            class="form-width-388"
                                            filterable
                                            clearable

                                            v-model="placesLivedValue"
                                            :disabled="stepThreeStatus"
                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select places lived"
                                            value-key="id"
                                    >
                                        <el-option
                                                v-for="(item,i) in placesLivedOptions"
                                                :key="i"
                                                :label="item.object_en"
                                                :value="item"
                                        />
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="Working Experience">

                                    <div class="work-experience">
                                        <el-button class="work-exp-temp-btn"
                                                   type="primary"
                                                   :disabled="stepThreeStatus"
                                                   @click="showWorkExpDialog()">
                                            Add Past Experience
                                            <el-icon>
                                                <Plus/>
                                            </el-icon>
                                        </el-button>

                                        <div class="work-exp-temp-container">

                                            <div class="work-exp-temp-item"
                                                 v-for="(item,i) in workExpData" :key="i">

                                                <div class="work-form-item">
                                                    <div class="work-form-item-l">Job title</div>
                                                    <div class="work-form-item-r">{{ item.title }}</div>
                                                </div>
                                                <div class="work-form-item">
                                                    <div class="work-form-item-l">Company</div>
                                                    <div class="work-form-item-r">{{ item.company_name }}</div>
                                                </div>
                                                <div class="work-form-item">
                                                    <div class="work-form-item-l">Location</div>
                                                    <div class="work-form-item-r">{{ item.location }}</div>
                                                </div>
                                                <div class="work-form-item">
                                                    <div class="work-form-item-l">Duration</div>
                                                    <div class="work-form-item-r">
                                                        {{ $filters.ymdFormatTimestamp(item.work_time_from) }} - {{
                                                        $filters.ymdFormatTimestamp(item.work_time_to)
                                                        }}
                                                    </div>
                                                </div>
                                                <div class="work-form-item">
                                                    <div class="work-form-item-l">Responsibilities</div>
                                                    <div class="work-form-item-r">{{ item.teaching_experience }}</div>
                                                </div>

                                                <div class="work-exp-temp-btn-container">
                                                    <el-button plain
                                                               :disabled="stepThreeStatus"
                                                               @click="deleteWorkExp(item)"
                                                    >
                                                        Delete
                                                    </el-button>
                                                    <el-button type="primary"
                                                               :disabled="stepThreeStatus"
                                                               @click="editWorkExp(item)"
                                                    >
                                                        Edit
                                                    </el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-form-item>

                            </el-form>
                        </div>

                    </div>

                </el-collapse-transition>
            </div>
            <div class="profile-collapse">

                <div class="profile-collapse-t" @click="addExpandKeys(4)">
                    <div class="profile-collapse-t-label"><span>Education</span></div>
                    <div class="profile-collapse-t-line"></div>
                    <div class="profile-collapse-t-icons">
                        <el-image
                                v-if="expandKeysData.indexOf(4) === -1"
                                class="profile-collapse-t-icon"
                                :src="arrowDownIcon">
                        </el-image>
                        <el-image
                                v-else
                                class="profile-collapse-t-icon"
                                :src="arrowUpIcon">
                        </el-image>
                    </div>
                </div>

                <el-collapse-transition>
                    <div class="profile-collapse-b" v-if="expandKeysData.indexOf(4) === -1">

                        <div class="profile-top-container">
                            <div class="profile-top-l">
                                <div class="profile-label">
                                    <span>Education</span>
                                </div>
                                <div class="profile-tips">
                                    <span>Tell us about your previous work experience if any</span>
                                </div>
                            </div>
                            <div class="profile-top-r">
                                <template v-if="stepFourStatus">
                                    <el-button icon="Edit" plain @click="editStepFour()">
                                        Edit
                                    </el-button>
                                </template>
                                <template v-else>
                                    <el-button type="info" @click="cancelStepFour()">
                                        Cancel
                                    </el-button>
                                    <el-button type="primary"
                                               :loading="stepFourLoadingStatus"
                                               @click="saveStepFour(educationsForms)">
                                        Save & Continue
                                    </el-button>
                                </template>
                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="educationsForms"
                                    :model="educationsForm"
                                    :rules="educationsRules"
                                    require-asterisk-position="right"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Certifications">

                                    <el-select

                                            v-model="certificationsValue"
                                            :disabled="stepFourStatus"
                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select certifications"
                                            filterable
                                            allow-create
                                            value-key="id"
                                    >
                                        <el-option
                                                v-for="(item,index) in certificationsOptions"
                                                :key="index"
                                                :label="item.object_en"
                                                :value="item"
                                        />

                                    </el-select>

                                </el-form-item>

                                <el-form-item label="Education">
                                    <div class="work-experience">

                                        <el-button class="work-exp-temp-btn"
                                                   type="primary"
                                                   :disabled="stepFourStatus"
                                                   @click="showEducationDialog()">
                                            Add Education
                                            <el-icon>
                                                <Plus></Plus>
                                            </el-icon>
                                        </el-button>

                                        <div class="work-exp-temp-container">

                                            <div class="work-exp-temp-item"
                                                 v-for="(item,i) in educationData" :key="i">

                                                <div class="work-form-item">
                                                    <div class="work-form-item-l">School Name</div>
                                                    <div class="work-form-item-r">{{ item.school_name }}</div>
                                                </div>
                                                <div class="work-form-item">
                                                    <div class="work-form-item-l">Degree</div>
                                                    <div class="work-form-item-r">{{ item.degree }}</div>
                                                </div>
                                                <div class="work-form-item">
                                                    <div class="work-form-item-l">Field of Study</div>
                                                    <div class="work-form-item-r">{{ item.field_of_study }}</div>
                                                </div>
                                                <div class="work-form-item">
                                                    <div class="work-form-item-l">Duration of Study</div>
                                                    <div class="work-form-item-r">
                                                        {{
                                                        $filters.ymdFormatTimestamp(item.start_time)
                                                        }}-{{ $filters.ymdFormatTimestamp(item.end_time) }}
                                                    </div>
                                                </div>

                                                <div class="work-exp-temp-btn-container">
                                                    <el-button plain
                                                               :disabled="stepFourStatus"
                                                               @click="deleteEducation(item)"
                                                    >
                                                        Delete
                                                    </el-button>
                                                    <el-button type="primary"
                                                               :disabled="stepFourStatus"
                                                               @click="editEducation(item)"
                                                    >
                                                        Edit
                                                    </el-button>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </el-form-item>

                            </el-form>
                        </div>

                    </div>

                </el-collapse-transition>
            </div>
            <div class="profile-collapse">

                <div class="profile-collapse-t" @click="addExpandKeys(5)">
                    <div class="profile-collapse-t-label"><span>Attachment Information</span></div>
                    <div class="profile-collapse-t-line"></div>
                    <div class="profile-collapse-t-icons">
                        <el-image
                                v-if="expandKeysData.indexOf(5) === -1"
                                class="profile-collapse-t-icon"
                                :src="arrowDownIcon">
                        </el-image>
                        <el-image
                                v-else
                                class="profile-collapse-t-icon"
                                :src="arrowUpIcon">
                        </el-image>
                    </div>
                </div>

                <el-collapse-transition>
                    <div class="profile-collapse-b" v-if="expandKeysData.indexOf(5) === -1">

                        <div class="profile-top-container">
                            <div class="profile-top-l">
                                <div class="profile-label">
                                    <span>Attachment Information</span>
                                </div>
                                <div class="profile-tips">
                                    <span>Attach files for your Resume</span>
                                </div>
                            </div>
                            <div class="profile-top-r">
                                <template v-if="stepFiveStatus">
                                    <el-button icon="Edit" plain @click="editStepFive()">
                                        Edit
                                    </el-button>
                                </template>
                                <template v-else>
                                    <el-button type="info"
                                               @click="cancelStepFive()">
                                        Cancel
                                    </el-button>
                                    <el-button type="primary"
                                               :loading="stepFiveLoadingStatus"
                                               @click="saveStepFive(mediaForms)">
                                        Save & Continue
                                    </el-button>
                                </template>
                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="mediaForms"
                                    :model="mediaForm"
                                    :rules="mediaRules"
                                    require-asterisk-position="right"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Background Image">
                                    <template #label>
                                        <div>
                                            <div>
                                                Image(s)
                                            </div>
                                            <div class="profile-picture-tips">
                                                Attach Image for Profile(up to 3Mb)
                                            </div>
                                        </div>
                                    </template>

                                    <div class="profile-picture-r">

                                        <template v-if="mediaForm.new_background_image && editBackgroundImageStatus">

                                            <div class="attachment-xll">
                                                <div class="attachment-xll-btns">
                                                    <div class="attachment-xll-btn">
                                                        <div class="attachment-xll-btn-l">
                                                            <el-icon color="#667085">
                                                                <IconIcomoonFreeAttachment/>
                                                            </el-icon>
                                                            {{ mediaForm.background_image_name }}
                                                        </div>
                                                        <div class="attachment-xll-btn-r">
                                                            <el-icon class="attachment-xll-icon"
                                                                     v-if="!stepFiveStatus"
                                                                     @click="handleSingleImageRemove('background_image')"
                                                                     color="#F97066">
                                                                <Delete></Delete>
                                                            </el-icon>
                                                        </div>

                                                    </div>

                                                    <template v-if="!stepFiveStatus">
                                                        <div class="attachment-xll-btn-edit"
                                                             @click="handleEditMedia('background_image')"
                                                        >
                                                            <el-icon class="attachment-xll-icon">
                                                                <IconUilEdit/>
                                                            </el-icon>
                                                        </div>
                                                        <div class="attachment-xll-btn-download"
                                                             @click="handleDownloadMedia(mediaForm.background_image)"
                                                        >
                                                            <el-icon class="attachment-xll-icon">
                                                                <IconUisDownloadAlt/>
                                                            </el-icon>
                                                        </div>
                                                    </template>

                                                </div>

                                                <div class="attachment-xll-image" v-for="(image,index) in mediaForm.new_background_image" :key="image.background_image_name">
                                                    <el-image class="attachment-xll-img" 
                                                              :src="image.background_image"
                                                              fit="cover"
                                                    >
                                                    </el-image>
                                                    <div class="attachment-xll-image-mask" v-if="!stepFiveStatus">
                                                        <el-icon
                                                                style="cursor: pointer;"
                                                                @click="handleSingleImagePreview(image.background_image,'background_image')"
                                                                color="#ffffff"
                                                                :size="20">
                                                            <zoom-in/>
                                                        </el-icon>

                                                        <el-icon
                                                                style="cursor: pointer;margin-left: 15px;"
                                                                @click="handleSingleImageRemove('background_image',index)"
                                                                color="#F97066"
                                                                :size="20">
                                                            <Delete/>
                                                        </el-icon>
                                                    </div>
                                                </div>

                                            </div>

                                        </template>
                                        <template v-else>
                                            <el-upload
                                                    class="form-width-388"
                                                    drag
                                                    :disabled="stepFiveStatus"
                                                    action=""
                                                    multiple
                                                    :limit="10"
                                                    :headers="uploadHeaders"
                                                    :show-file-list="false"
                                                    accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                                                    :http-request="backgroundHttpRequest"
                                                    :before-upload="beforeBackgroundPhotoUpload"
                                            >

                                                <template #trigger>
                                                    <el-image class="profile-upload-icon" :src="uploadIcon"></el-image>
                                                    <div class="profile-upload-text">
                                                        <span>Click to Upload</span> Or Drag your photo <br>
                                                        SVG,PNG,JPEG(400x400)
                                                    </div>
                                                </template>

                                            </el-upload>
                                        </template>
                                    </div>

                                </el-form-item>

                                <el-form-item label="Video">
                                    <template #label>
                                        <div>
                                            <div>
                                                Video(s)
                                            </div>
                                            <div class="profile-picture-tips">
                                                Attach Introduction video for your profile(up to 10Mb)
                                            </div>
                                        </div>
                                    </template>

                                    <div class="profile-picture-r">

                                        <template v-if="mediaForm.video_url && editVideoStatus">

                                            <div class="attachment-xll">
                                                <div class="attachment-xll-btns">
                                                    <div class="attachment-xll-btn">
                                                        <div class="attachment-xll-btn-l">
                                                            <el-icon color="#667085">
                                                                <IconIcomoonFreeAttachment/>
                                                            </el-icon>
                                                            {{ mediaForm.video_name }}
                                                        </div>
                                                        <div class="attachment-xll-btn-r">
                                                            <el-icon class="attachment-xll-icon"
                                                                     v-if="!stepFiveStatus"
                                                                     @click="handleSingleImageRemove('video_url')"
                                                                     color="#F97066">
                                                                <Delete></Delete>
                                                            </el-icon>
                                                        </div>

                                                    </div>
                                                    <template v-if="!stepFiveStatus">
                                                        <div class="attachment-xll-btn-edit"
                                                             @click="handleEditMedia('video_url')"
                                                        >
                                                            <el-icon class="attachment-xll-icon">
                                                                <IconUilEdit/>
                                                            </el-icon>
                                                        </div>
                                                        <div class="attachment-xll-btn-download"
                                                             @click="handleDownloadMedia(mediaForm.video_url)"
                                                        >
                                                            <el-icon class="attachment-xll-icon">
                                                                <IconUisDownloadAlt/>
                                                            </el-icon>
                                                        </div>
                                                    </template>

                                                </div>

                                                <div class="attachment-xll-image">
                                                    <video class="attachment-xll-img"
                                                           :src="mediaForm.video_url"
                                                           controls
                                                    >
                                                    </video>
                                                    <div class="attachment-xll-image-mask" v-if="!stepFiveStatus">
                                                        <el-icon
                                                                style="cursor: pointer;"
                                                                @click="handleSingleImagePreview(mediaForm.video_url,'video_url')"
                                                                color="#ffffff"
                                                                :size="20">
                                                            <zoom-in/>
                                                        </el-icon>

                                                        <el-icon
                                                                style="cursor: pointer;margin-left: 15px;"
                                                                @click="handleSingleImageRemove('video_url')"
                                                                color="#F97066"
                                                                :size="20">
                                                            <Delete/>
                                                        </el-icon>
                                                    </div>
                                                </div>

                                            </div>

                                        </template>
                                        <template v-else>
                                            <el-upload
                                                    class="form-width-388"
                                                    drag
                                                    action=""
                                                    :disabled="stepFiveStatus"
                                                    :limit="1"
                                                    :headers="uploadHeaders"
                                                    :show-file-list="false"
                                                    accept=".mp4,.MP4"
                                                    :http-request="videoHttpRequest"
                                                    :before-upload="beforeIntroVideoUpload"
                                            >

                                                <template #trigger>
                                                    <el-image class="profile-upload-icon" :src="uploadIcon"></el-image>
                                                    <div class="profile-upload-text">
                                                        <span>Click to Upload</span> Or Drag your Video <br>
                                                        MP4,MOV,AVI OR WebM
                                                    </div>
                                                </template>

                                            </el-upload>

                                        </template>
                                    </div>

                                </el-form-item>

                                <el-form-item label="Other Files">
                                    <template #label>
                                        <div>
                                            <div>
                                                Other Files
                                            </div>
                                            <div class="profile-picture-tips">
                                                Attach your account files for your profile(up to 5Mb)
                                            </div>
                                        </div>
                                    </template>

                                    <div style="flex-direction: column;" class="profile-picture-r">

                                        <el-upload
                                                class="form-width-388"
                                                drag
                                                action=""
                                                :disabled="stepFiveStatus"
                                                :multiple="true"
                                                :auto-upload="false"
                                                :show-file-list="false"
                                                :limit="6"
                                                :headers="uploadHeaders"
                                                name="file[]"
                                                accept=".jpg,.jpeg,.png,.pdf,.JPG,.JPEG,.PNG,.PDF"
                                                :before-upload="beforeAccountImageUpload"
                                                :on-change="handleAccountImageChange"
                                                :http-request="handleAccountFilesRequest"
                                        >

                                            <template #trigger>
                                                <el-image class="profile-upload-icon" :src="uploadIcon"></el-image>
                                                <div class="profile-upload-text">
                                                    <span>Click to Upload</span> Or Drag your PDF <br>
                                                    Resume, cover letter, transcripts, certificates
                                                </div>
                                            </template>

                                        </el-upload>

                                        <div style="display: flex;flex-direction: column;margin-top: 20px;"
                                             v-if="accountFilesData.length ">

                                            <div class="attachment-xll"
                                                 v-for="(item, i) in accountFilesData"
                                                 :key="i"
                                            >
                                                <div class="attachment-xll-btns">
                                                    <div class="attachment-xll-btn">
                                                        <div class="attachment-xll-btn-l">
                                                            <el-icon color="#667085">
                                                                <IconIcomoonFreeAttachment/>
                                                            </el-icon>
                                                            {{ $filters.substringFromEnd(item.url, 10) }}
                                                        </div>
                                                        <div class="attachment-xll-btn-r">
                                                            <el-icon class="attachment-xll-icon"
                                                                     v-if="!stepFiveStatus"
                                                                     @click="handleAccountImageRemove(item,i)"
                                                                     color="#F97066">
                                                                <Delete></Delete>
                                                            </el-icon>
                                                        </div>

                                                    </div>

                                                    <div class="attachment-xll-btn-download"
                                                         v-if="!stepFiveStatus"
                                                         @click="handleDownloadMedia(item.url)"
                                                    >
                                                        <el-icon class="attachment-xll-icon">
                                                            <IconUisDownloadAlt/>
                                                        </el-icon>
                                                    </div>
                                                </div>

                                                <div class="attachment-xll-image">
                                                    <el-image class="attachment-xll-img"
                                                              :src="item.url"
                                                              fit="cover"
                                                    >
                                                    </el-image>
                                                    <div class="attachment-xll-image-mask" v-if="!stepFiveStatus">
                                                        <el-icon
                                                                style="cursor: pointer;"
                                                                @click="handleSingleImagePreview(item.url,'account_files')"
                                                                color="#ffffff"
                                                                :size="20">
                                                            <zoom-in/>
                                                        </el-icon>

                                                        <el-icon
                                                                style="cursor: pointer;margin-left: 15px;"
                                                                @click="handleAccountImageRemove(item,i)"
                                                                color="#F97066"
                                                                :size="20">
                                                            <Delete/>
                                                        </el-icon>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </el-form-item>

<!--                                <el-form-item label="Resume PDF">-->
<!--                                    <template #label>-->
<!--                                        <div>-->
<!--                                            <div>-->
<!--                                                Resume PDF-->
<!--                                            </div>-->
<!--                                            <div class="profile-picture-tips">-->
<!--                                                Attach Resume PDF for your profile-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </template>-->

<!--                                    <div class="profile-picture-r">-->

<!--                                        <template v-if="mediaForm.resume_pdf && editResumeStatus">-->

<!--                                            <div class="attachment-xll">-->
<!--                                                <div class="attachment-xll-btns">-->
<!--                                                    <div class="attachment-xll-btn">-->
<!--                                                        <div class="attachment-xll-btn-l">-->
<!--                                                            <el-icon color="#667085">-->
<!--                                                                <IconIcomoonFreeAttachment/>-->
<!--                                                            </el-icon>-->
<!--                                                            {{ mediaForm.resume_name }}-->
<!--                                                        </div>-->
<!--                                                        <div class="attachment-xll-btn-r">-->
<!--                                                            <el-icon class="attachment-xll-icon"-->
<!--                                                                     v-if="!stepFiveStatus"-->
<!--                                                                     @click="handleSingleImageRemove('resume_pdf')"-->
<!--                                                                     color="#F97066">-->
<!--                                                                <Delete></Delete>-->
<!--                                                            </el-icon>-->
<!--                                                        </div>-->

<!--                                                    </div>-->
<!--                                                    <template v-if="!stepFiveStatus">-->
<!--                                                        <div class="attachment-xll-btn-edit"-->
<!--                                                             @click="handleEditMedia('resume_pdf')"-->
<!--                                                        >-->
<!--                                                            <el-icon class="attachment-xll-icon">-->
<!--                                                                <IconUilEdit/>-->
<!--                                                            </el-icon>-->
<!--                                                        </div>-->
<!--                                                        <div class="attachment-xll-btn-download"-->
<!--                                                             @click="handleDownloadMedia(mediaForm.resume_pdf)"-->
<!--                                                        >-->
<!--                                                            <el-icon class="attachment-xll-icon">-->
<!--                                                                <IconUisDownloadAlt/>-->
<!--                                                            </el-icon>-->
<!--                                                        </div>-->
<!--                                                    </template>-->

<!--                                                </div>-->

<!--                                            </div>-->

<!--                                        </template>-->
<!--                                        <template v-else>-->
<!--                                            <el-upload-->
<!--                                                    action=""-->
<!--                                                    :disabled="stepFiveStatus"-->
<!--                                                    :limit="1"-->
<!--                                                    :headers="uploadHeaders"-->
<!--                                                    :show-file-list="false"-->
<!--                                                    accept=".pdf,.PDF"-->
<!--                                                    :http-request="resumePdfHttpRequest"-->
<!--                                                    :before-upload="beforeResumePdfUpload"-->
<!--                                            >-->

<!--                                                <template #trigger>-->
<!--                                                    <div class="attachment-btn">-->
<!--                                                        <span>Attach files</span>-->
<!--                                                        <el-icon color="#667085">-->
<!--                                                            <IconIcomoonFreeAttachment/>-->
<!--                                                        </el-icon>-->
<!--                                                    </div>-->
<!--                                                </template>-->

<!--                                            </el-upload>-->
<!--                                        </template>-->
<!--                                    </div>-->

<!--                                </el-form-item>-->


                            </el-form>
                        </div>

                    </div>

                </el-collapse-transition>
            </div>

        </el-scrollbar>

        <div class="delete-container">
            <deleteAccountComponent></deleteAccountComponent>
        </div>

        <el-dialog
                v-model="languageDialogVisible"
                title="Add Languages & Proficiency"
                width="600px"
                align-center
        >
            <el-form
                    ref="languageForms"
                    label-width="120px"
                    :model="languageForm"
                    :rules="languageRules"
                    require-asterisk-position="right"
                    label-position="left"
                    class="demo-ruleForm"
            >
                <el-form-item label="Language">
                    <el-select
                            class="form-width-388"
                            v-model="languageValue"

                            value-key="id">
                        <el-option v-for="(item,i) in languageOptionsData" :key="i"
                                   :label="item.object_en"
                                   :value="item"

                        >
                        </el-option>
                    </el-select>

                </el-form-item>

                <el-form-item class="work-form-item" label="Proficiency">
                    <el-select
                            class="form-width-388"
                            v-model="languageLevelValue"

                            value-key="value">
                        <el-option
                                v-for="(level,ii) in languageLevelOptionsData" :key="ii"
                                :label="level.label"
                                :value="level">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>

            <div style="margin-top: 25px;text-align: right;">
                <el-button plain @click="cancelLanguageItem()">
                    Cancel
                </el-button>
                <el-button type="primary" @click="submitLanguageItem()">
                    Save
                </el-button>
            </div>

        </el-dialog>

        <el-dialog
                v-model="workExpDialogVisible"
                title="Work experience"
                :width="workExpDialogWidth"
                align-center
        >

            <div>
                <el-form
                        ref="workExpForms"
                        :model="workExpForm"
                        :rules="workExpRules"
                        require-asterisk-position="right"
                        label-width="160px"
                        label-position="left"
                        class="demo-ruleForm"
                >
                    <el-form-item label="Job Title" prop="title">
                        <el-input v-model="workExpForm.title"
                                  placeholder="eg. ESL teacher"></el-input>
                    </el-form-item>
                    <el-form-item label="Company" prop="company_name">
                        <el-input v-model="workExpForm.company_name"
                                  placeholder="eg. Academy"></el-input>
                    </el-form-item>
                    <el-form-item label="Location">
                        <el-input v-model="workExpForm.location"
                                  placeholder="City, Country"></el-input>
                    </el-form-item>

                    <el-form-item label="Duration of Study" prop="date">
                        <div class="duration-mobile-container">
                            <div class="duration-mobile-item">
                                <el-date-picker
                                        v-model="workExpForm.work_time_from"
                                        type="month"
                                        unlink-panels
                                        format="MM/YYYY"
                                        value-format="x"
                                        placeholder="DD/MM/YY"
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
                                        placeholder="DD/MM/YY"
                                        :disabled-date="birthdayDisabledDate"

                                ></el-date-picker>
                            </div>
                        </div>

                    </el-form-item>

                    <el-form-item label="Responsibilities">
                        <el-input v-model="workExpForm.teaching_experience"
                                  :rows="4"
                                  type="textarea"
                                  placeholder="Enter Responsibilities"></el-input>
                    </el-form-item>

                </el-form>

            </div>

            <div class="work-exp-btn-container">
                <el-button plain
                           @click="workExpDialogVisible=false"
                >
                    Cancel
                </el-button>
                <el-button type="primary"
                           :loading="submitWorkExpLoadingValue"
                           @click="saveWorkExpTemp(workExpForms)">
                    Save
                </el-button>
            </div>

        </el-dialog>

        <el-dialog
                v-model="educationDialogVisible"
                title="Education"
                :width="educationDialogWidth"
        >
            <el-form
                    ref="educationForms"
                    :model="educationForm"
                    :rules="educationRules"
                    require-asterisk-position="right"
                    label-width="120px"
                    label-position="top"
                    class="demo-ruleForm"
            >
                <el-form-item label="School" prop="school_name">
                    <el-input v-model="educationForm.school_name"
                              placeholder="Please enter the university name"></el-input>
                </el-form-item>
                <el-form-item label="Degree" prop="degree">
                    <el-select v-model="educationDegreeObj"

                               value-key="id"
                               placeholder="Doctorate, Master's, Bachelor's, etc...">
                        <el-option v-for="(degree,i) in degreeOptions" :key="i"
                                   :label="degree.object_en"
                                   :value="degree"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Field of Study">
                    <el-input v-model="educationForm.field_of_study" type="textarea"
                              placeholder="Chemistry, International Business, Dance, etc..."></el-input>
                </el-form-item>

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
                           @click="saveEducationTemp(educationForms)">
                    SAVE
                </el-button>
            </div>

        </el-dialog>

        <el-dialog width="50%" v-model="dialogSingleImageVisible" center>
            <template v-if="dialogSingleField === 'background_image'">
                <el-image :src="dialogSingleImageUrl"></el-image>
            </template>
            <template v-if="dialogSingleField === 'video_url' ">
                <video :src="dialogSingleImageUrl" controls></video>
            </template>

        </el-dialog>
        <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUploadProfile()"></xllLoading>

    </div>
</template>

<script setup>
import ImageCompressor from "compressorjs";
import uploadIcon from '@/assets/newHome/profile/upload-icon.svg'
import defaultAvatarIcon from '@/assets/newHome/profile/default-avatar.svg'
import deleteAccountComponent from "@/components/deleteAccountComponent.vue";
import {ref, reactive, onMounted,computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import arrowDownIcon from '@/assets/newHome/arrow-circle-down.svg'
import arrowUpIcon from '@/assets/newHome/arrow-circle-up.svg'
import {countriesData} from "@/utils/data";
import {phoneCodeData} from "@/utils/phoneCode";
import {
    ADD_LANGUAGE_SCORE_V2,
    ADD_PROFILE_V2,
    ADD_USER_EDUCATION_V2,
    ADD_USER_IMG_V2,
    ADD_USER_WORK_V2, ALL_LANGUAGE_PROFICIENCY, EDUCATOR_CONTACT_EDIT_V3,
    EDUCATOR_DELETE_EDUCATION_ITEM,
    EDUCATOR_DELETE_WORK_ITEM, SWITCH_IDENTITY_V2,
    UPLOAD_BY_ALI_OSS,
    UPLOAD_BY_SERVICE,
    UPLOAD_BY_SERVICE_MORE,
    USER_CONTACT_EDIT_V3,
    USER_INFO_BY_TOKEN_V2,
    USER_OBJECT_LIST,
    USER_SUB_IDENTITY_V2
} from "@/api/api";
import {updateWindowHeight} from "@/utils/tools";
import localStorageService from "@/utils/localStorageService";
import xllLoading from "@/components/xllLoading.vue";
import {ElMessage} from 'element-plus'
import {decode} from 'js-base64'

const store = useStore()
const route = useRoute()

const companyId = computed(()=>store.state.currentCompanyId)

const expandKeysData = ref([2, 3, 4, 5])

const addExpandKeys = (value) => {
    let index = expandKeysData.value.indexOf(value)
    if (index === -1) {
        expandKeysData.value.push(value)
    } else {
        expandKeysData.value.splice(index, 1)
    }

}

const personalForms = ref(null)
const personalForm = reactive({
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    nationality: '',
    is_seeking: 0,
    is_public: 0,
    is_visible: 0,
    phone_code: '+1',
    phone: '',
    address: '',
    sub_categories: [],
    sub_identity_id: '',
    sub_identity_name_cn: '',
    sub_identity_name_en: '',
    profile_photo: defaultAvatarIcon
})

const personalRules = reactive({
    first_name: [
        {required: true, message: 'Enter First Name', trigger: 'blur'}
    ],
    last_name: [
        {required: true, message: 'Enter Second Name', trigger: 'blur'}
    ],
    email: [
        {type: 'email', required: false, message: 'Enter your E-mail', trigger: 'blur'}
    ]
})

const professionForms = ref(null)
const professionForm = reactive({
    job_title: '',
    education_level: '',
    bio: '',
    hobbies: ''
})

const professionRules = reactive({
    job_title: [
        {required: true, message: 'Enter Job title here', trigger: 'blur'}
    ]
})

const pastExpForms = ref(null)
const pastExpForm = reactive({})
const pastExpRules = reactive({})

const educationsForms = ref(null)
const educationsForm = reactive({})
const educationsRules = reactive({})

const educationForms = ref(null)
const educationForm = reactive({
    school_name: '',
    degree: '',
    degree_id: '',
    field_of_study: '',
    start_time: '',
    end_time: '',
    grade: '',
})

const educationRules = reactive({
    school_name: [
        {
            required: true,
            message: 'Please enter the university name',
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
                let startTime = educationForm.start_time;
                let endTime = educationForm.end_time;

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

})

const mediaForms = ref(null)
const mediaForm = reactive({
    background_image_name: '',
    background_image: '',
    video_name: '',
    video_url: '',
    resume_name: '',
    resume_pdf: '',
    new_background_image: []
})

const mediaRules = reactive({
    email_code: [
        {required: true, message: 'Please fill out your code.', trigger: 'blur'}
    ],
    email: [
        {type: 'email', required: true, message: 'Please fill out your email address.', trigger: 'blur'}
    ],
    password: [
        {required: true, message: 'Please enter your password', trigger: 'blur'}
    ],
    confirm_password: [
        {required: true, message: 'Please enter your password again', trigger: 'blur'}
    ]
})

const nationalityOptions = ref(countriesData)
const phoneCodeOptions = ref(phoneCodeData)

const jobSeekingOptions = ref([
    {
        name:'Actively Seeking',
        value:1
    },
    {
        name:'Passively Seeking',
        value:2
    },
    {
        name:'Not Currently Seeking',
        value:3
    }
])
// const jobSeekingValue = ref()

const workDestinationValue = ref([])
const workDestinationOptions = ref([])

const jobTypeValue = ref([])
const jobTypeOptions = ref([])

const interestsValue = ref([])
const interestsOptions = ref(['Fitness', 'Photography', 'Travel'])

const workScheduleTypeValue = ref(0)
const workScheduleTypeOptions = ref([])

const benefitsValue = ref([])
const benefitsOptions = ref([])

const subjectValue = ref([])
const subjectOptions = ref([])

const studentsAgeValue = ref([])
const studentsAgeOptions = ref([])

const ageToTeachValue = ref([])
const ageToTeachOptions = ref([])

const preferredLanguageValue = ref([])
const preferredLanguageOptions = ref([])

const selectedLanguageList = ref([])
const languageDialogVisible = ref(false)
const languageOptionsData = ref([])
const languageValue = ref('')
const languageLevelOptionsData = ref([])
const languageLevelValue = ref('')
const languageForms = ref(null)
const languageForm = reactive({})
const languageRules = reactive({})

const removeLanguageItem = (i) => {
    selectedLanguageList.value.splice(i, 1)
}

const addLanguageAndProficiency = () => {
    getAllLanguageProficiencyList()
    languageDialogVisible.value = true
}
const cancelLanguageItem = () => {
    languageDialogVisible.value = false
}
const submitLanguageItem = () => {

    if (languageValue.value && languageLevelValue.value) {

        let aa = selectedLanguageList.value.filter(item => item.id === languageValue.value.id)

        // 说明存在
        if (aa.length > 0) {

            if (aa[0].level === languageLevelValue.value) {
                return ElMessage.warning('language and proficiency already added')
            } else {
                aa[0]['level'] = languageLevelValue.value.value
                aa[0]['level_name'] = languageLevelValue.value.label
            }

        } else {
            languageValue.value.level = languageLevelValue.value.value
            languageValue.value.level_name = languageLevelValue.value.label

            selectedLanguageList.value.push(languageValue.value)
        }

        languageDialogVisible.value = false;
    }


}
const getAllLanguageProficiencyList = async () => {
    let data = {}

    await ALL_LANGUAGE_PROFICIENCY(data).then(res => {
        console.log(res)
        if (res.code == 200) {
            languageLevelOptionsData.value = res.message
        }

    }).catch(err => {
        console.log(err)
        ElMessage.error(err.msg)
    })
}

const languageConfirm = () => {
    let sLanguageData = selectedLanguageList.value
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

    let params = {
        company_id: companyId.value,
        object_arr: sData
    }

    ADD_LANGUAGE_SCORE_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            console.log('language confirm -------------')
        }
    }).catch(err => {
        console.log(err)
        ElMessage.error(err.msg)
    })

}

const teachExpValue = ref()
const teachExpOptions = ref([])

const placesTraveledValue = ref([])
const placesTraveledOptions = ref([])

const placesLivedValue = ref([])
const placesLivedOptions = ref([])

const certificationsValue = ref([])
const certificationsOptions = ref([])

const degreeOptions = ref([])


const loadUserObjectData = async () => {

    if (localStorageService.getItem('workDestination') && localStorageService.getItem('preferredLanguage') &&
        localStorageService.getItem('workScheduleType') && localStorageService.getItem('jobType')
        && localStorageService.getItem('benefits') && localStorageService.getItem('subject') &&
        localStorageService.getItem('ageToTeach') && localStorageService.getItem('studentsAge')
        && localStorageService.getItem('teachExp') && localStorageService.getItem('placesTraveled')
        && localStorageService.getItem('placesLived') && localStorageService.getItem('certifications')
        && localStorageService.getItem('degree') && localStorageService.getItem('languages')

    ) {

        workDestinationOptions.value = JSON.parse(localStorageService.getItem('workDestination'))
        preferredLanguageOptions.value = JSON.parse(localStorageService.getItem('preferredLanguage'))
        workScheduleTypeOptions.value = JSON.parse(localStorageService.getItem('workScheduleType'))
        jobTypeOptions.value = JSON.parse(localStorageService.getItem('jobType'))
        benefitsOptions.value = JSON.parse(localStorageService.getItem('benefits'))
        subjectOptions.value = JSON.parse(localStorageService.getItem('subject'))
        ageToTeachOptions.value = JSON.parse(localStorageService.getItem('ageToTeach'))
        studentsAgeOptions.value = JSON.parse(localStorageService.getItem('studentsAge'))
        teachExpOptions.value = JSON.parse(localStorageService.getItem('teachExp'))
        placesTraveledOptions.value = JSON.parse(localStorageService.getItem('placesTraveled'))
        placesLivedOptions.value = JSON.parse(localStorageService.getItem('placesLived'))
        certificationsOptions.value = JSON.parse(localStorageService.getItem('certifications'))
        degreeOptions.value = JSON.parse(localStorageService.getItem('degree'))
        languageOptionsData.value = JSON.parse(localStorageService.getItem('languages'))
        return;
    }

    await USER_OBJECT_LIST({}).then(res => {
        // console.log(res)
        if (res.code == 200) {

            let workDestinationArr = res.message.filter(item => item.pid === 155)  // 71 155
            workDestinationOptions.value = workDestinationArr
            if (!localStorageService.getItem('workDestination')) {
                localStorageService.setItem('workDestination', JSON.stringify(workDestinationArr), 60)
            }

            let preferredLanguageArr = res.message.filter(item => item.pid === 1548)  // 71 155
            preferredLanguageOptions.value = preferredLanguageArr
            if (!localStorageService.getItem('preferredLanguage')) {
                localStorageService.setItem('preferredLanguage', JSON.stringify(preferredLanguageArr), 60)
            }

            let jobTypeArr = res.message.filter(item => item.pid === 3);
            jobTypeOptions.value = jobTypeArr
            if (!localStorageService.getItem('jobType')) {
                localStorageService.setItem('jobType', JSON.stringify(jobTypeArr), 60)
            }

            let workScheduleTypeArr = res.message.filter(item => item.pid === 184);
            workScheduleTypeOptions.value = workScheduleTypeArr
            if (!localStorageService.getItem('workScheduleType')) {
                localStorageService.setItem('workScheduleType', JSON.stringify(workScheduleTypeArr), 60)
            }

            let benefitsArr = res.message.filter(item => item.pid === 6);
            benefitsOptions.value = benefitsArr
            if (!localStorageService.getItem('benefits')) {
                localStorageService.setItem('benefits', JSON.stringify(benefitsArr), 60)
            }

            let subjectArr = res.message.filter(item => item.pid === 1)
            subjectOptions.value = subjectArr
            if (!localStorageService.getItem('subject')) {
                localStorageService.setItem('subject', JSON.stringify(subjectArr), 60)
            }

            let ageToTeachArr = res.message.filter(item => item.pid === 4);
            ageToTeachOptions.value = ageToTeachArr
            if (!localStorageService.getItem('ageToTeach')) {
                localStorageService.setItem('ageToTeach', JSON.stringify(ageToTeachArr), 60)
            }

            let studentsArr = res.message.filter(item => item.pid === 73);
            studentsAgeOptions.value = ageToTeachArr
            if (!localStorageService.getItem('studentsAge')) {
                localStorageService.setItem('studentsAge', JSON.stringify(studentsArr), 60)
            }

            let teachExpArr = res.message.filter(item => item.pid === 120)
            teachExpOptions.value = teachExpArr
            if (!localStorageService.getItem('teachExp')) {
                localStorageService.setItem('teachExp', JSON.stringify(teachExpArr), 60)
            }

            // 原来是8 现在使用nationality的值 pid 203
            let placesTraveledArr = res.message.filter(item => item.pid === 8);
            placesTraveledOptions.value = placesTraveledArr
            if (!localStorageService.getItem('placesTraveled')) {
                localStorageService.setItem('placesTraveled', JSON.stringify(placesTraveledArr), 60)
            }
            // 原来是9 现在使用nationality的值 pid 203
            let placesLivedArr = res.message.filter(item => item.pid === 9);
            placesLivedOptions.value = placesLivedArr
            if (!localStorageService.getItem('placesLived')) {
                localStorageService.setItem('placesLived', JSON.stringify(placesLivedArr), 60)
            }

            let certificationsArr = res.message.filter(item => item.pid === 7);
            certificationsOptions.value = certificationsArr
            if (!localStorageService.getItem('certifications')) {
                localStorageService.setItem('certifications', JSON.stringify(certificationsArr), 60)
            }

            let degreeArr = res.message.filter(item => item.pid === 125);
            degreeOptions.value = degreeArr
            if (!localStorageService.getItem('degree')) {
                localStorageService.setItem('degree', JSON.stringify(degreeArr), 60)
            }

            let languageArr = res.message.filter(item => item.pid === 2);
            languageOptionsData.value = languageArr
            if (!localStorageService.getItem('languages')) {
                localStorageService.setItem('languages', JSON.stringify(languageArr), 60)
            }

            // this.editRegionList = res.message.filter(item => item.pid === 5);

            // // 原来是71 现在使用nationality的值 pid 203
            // this.editLocationList = res.message.filter(item => item.pid === 71)  // 71 155
            // // 原来是155 现在使用nationality的值 pid 203

            // this.profileStatusData = res.message.filter(item => item.pid === 195);

        }

    }).catch(err => {
        console.log(err)
    })

}

const preferredLanguageConfirm = () => {

    let expand = [];
    let objectArr = [];

    preferredLanguageValue.value.forEach(item => {
        objectArr.push(item.id);
    })

    let data = {
        object_pid: 1548,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('preferred language--submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })
}


const jobTypeConfirm = () => {

    let expand = [];
    let objectArr = [];

    jobTypeValue.value.forEach(item => {
        objectArr.push(item.id);
    })

    let data = {
        object_pid: 3,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('job type--submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })
}

const workScheduleTypeConfirm = () => {

    let expand = [];
    let objectArr = [workScheduleTypeValue.value];

    let data = {
        object_pid: 184,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('Work Schedule Type--submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })
}

const workDestinationConfirm = () => {

    let expand = [];
    let objectArr = [];

    workDestinationValue.value.forEach(item => {
        objectArr.push(item.id);
    })

    let data = {
        object_pid: 155,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('work destination--submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })
}

const ageToTeachConfirm = () => {

    let expand = [];
    let objectArr = [];

    ageToTeachValue.value.forEach(item => {

        if (typeof item === 'string') {
            expand.push(item)
        } else {
            objectArr.push(item.id);
        }

    })

    let data = {
        object_pid: 4,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('age to teach--submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })
}

const studentsAgeConfirm = () => {

    let expand = [];
    let objectArr = [];

    studentsAgeValue.value.forEach(item => {

        if (typeof item === 'string') {
            expand.push(item)
        } else {
            objectArr.push(item.id);
        }

    })

    let data = {
        object_pid: 73,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('students age--submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })
}

const benefitsConfirm = () => {

    let expand = [];
    let objectArr = [];
    benefitsValue.value.forEach(item => {

        if (typeof item === 'string') {
            expand.push(item);
        } else {
            objectArr.push(item.id);
        }

    })

    let data = {
        object_pid: 6,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('benefits--submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })

}

const subjectConfirm = () => {

    let expand = [];
    let objectArr = [];
    subjectValue.value.forEach(item => {

        if (typeof item === 'string') {
            expand.push(item)
        } else {
            objectArr.push(item.id);
        }
    })

    let data = {
        object_pid: 1,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('subject--submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })

}

const teachExpConfirm = () => {

    let expand = [];
    let objectArr = [teachExpValue.value];

    let data = {
        object_pid: 120,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('years of experience success -------')
        }

    }).catch(err => {
        console.log(err)
    })
}

const placesTraveledConfirm = () => {

    let expand = [];
    let objectArr = [];
    placesTraveledValue.value.forEach(item => {
        objectArr.push(item.id);
    })

    let data = {
        object_pid: 8,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('place traveled --submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })

}

const placesLivedConfirm = () => {

    let expand = [];
    let objectArr = [];
    placesLivedValue.value.forEach(item => {
        objectArr.push(item.id);
    })

    let data = {
        object_pid: 9,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('place lived --submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })

}

const certificationsConfirm = () => {

    let expand = [];
    let objectArr = [];

    certificationsValue.value.forEach(item => {

        if (typeof item === 'string') {
            expand.push(item)
        } else {

            objectArr.push(item.id);
        }

    })

    let data = {
        object_pid: 7,
        object_id: objectArr,
        expand: expand,
        company_id: companyId.value
    }

    ADD_PROFILE_V2(data).then(res => {
        if (res.code == 200) {
            console.log('certifications--submit--' + res.data);
        }

    }).catch(err => {
        console.log(err)
    })

}

const workExpData = ref([])
// const workExpTempData = ref([])
// const editWorkExpIndex = ref(-1)
const editExistWorkExpStatus = ref(false)

const workExpDialogVisible = ref(false)
const submitWorkExpLoadingValue = ref(false)
const workExpDialogWidth = ref('600px')

const workExpForms = ref(null)
const workExpForm = reactive({
    company_name: '',
    title: '',
    location: '',
    teaching_times: '',
    teaching_experience: '',
    work_time_from: '',
    work_time_to: '',
    date: ''
})

const workExpRules = reactive({
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
            message: "Please enter your company name",
            trigger: 'blur',
        },
    ],
    date: [
        {
            required: true,
            validator: (rule, value, callback) => {
                let workTimeFrom = workExpForm.work_time_from;
                let workTimeTo = workExpForm.work_time_to;

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

})

const showWorkExpDialog = () => {
    workExpDialogVisible.value = true;
}

const saveWorkExpTemp = (formEl) => {
    submitWorkExpForm(formEl)
}

const getBasicInfo = async () => {

    let params = {
        identity: 1
    }

    await USER_INFO_BY_TOKEN_V2(params).then(res => {

        if (res.code == 200) {
            let userContact = res.message.user_contact;
            let educatorContact = res.message.user_contact.educator_contact;

            // step one form 第一部分
            personalForm.first_name = userContact.first_name
            personalForm.last_name = userContact.last_name

            personalForm.email = userContact.email
            personalForm.nationality = educatorContact.nationality
            personalForm.is_visible = educatorContact.is_visible

            if (educatorContact.phone) {
                let phone = educatorContact.phone;
                let phoneArr = phone.split('#')
                // console.log(phoneArr)
                if (phoneArr.length > 1) {
                    personalForm.phone_code = phoneArr[0]
                    personalForm.phone = phoneArr[1]
                } else {
                    personalForm.phone = phoneArr[0]
                }
            }

            personalForm.is_seeking = educatorContact.is_seeking

            personalForm.sub_categories = []
            let subIdentityStr = educatorContact.sub_identity_id
            if (subIdentityStr) {
                if (subIdentityStr.length > 1) {
                    let subIdentityArr = subIdentityStr.split(',')
                    let subData = []
                    subIdentityArr.forEach(item => {
                        let cateValue = subCategoryOptions.value.filter(value => value.id == item)
                        subData.push(cateValue[0])
                    })
                    personalForm.sub_categories = subData
                }
            }

            if (userContact.headimgurl) {
                personalForm.profile_photo = userContact.headimgurl
            }

            if (educatorContact.job_title) {
                professionForm.job_title = educatorContact.job_title;
            }

            if (educatorContact.education_level) {
                professionForm.education_level = educatorContact.education_level;
            }

            if (educatorContact.bio) {
                professionForm.bio = educatorContact.bio
            }

            workDestinationValue.value = []
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
                    workDestinationValue.value.push(obj)
                })
            }

            jobTypeValue.value = []
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
                    jobTypeValue.value.push(obj)
                })
            }

            if (educatorContact.hobbies) {
                professionForm.hobbies = educatorContact.hobbies;
                interestsValue.value = educatorContact.hobbies.split(',');
            }

            if (educatorContact.Prefered_Work_Schedule_Type) {
                let objArr = educatorContact.Prefered_Work_Schedule_Type;
                objArr.forEach((item) => {
                    workScheduleTypeValue.value = item.object_id
                })
            }

            benefitsValue.value = []
            if (educatorContact.benefits) {
                let benefitsArr = educatorContact.benefits;
                benefitsArr.forEach((item) => {
                    if (item.object_id == 0) {
                        benefitsValue.value.push(item.object_en)
                    } else {
                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        benefitsValue.value.push(obj)
                    }
                })
            }

            subjectValue.value = []
            if (educatorContact.subject) {
                let subjectArr = educatorContact.subject
                let obj = {}
                subjectArr.forEach((item) => {
                    if (item.object_id == 0) {
                        subjectValue.value.push(item.object_en)
                    } else {
                        obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                    }
                    subjectValue.value.push(obj)
                })
            }

            preferredLanguageValue.value = []
            if (educatorContact.Prefered_Language) {
                let preferredLanguageArr = educatorContact.Prefered_Language
                let obj = {}
                preferredLanguageArr.forEach((item) => {
                    if (item.object_id == 0) {
                        preferredLanguageValue.value.push(item.object_en)
                    } else {
                        obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                    }
                    preferredLanguageValue.value.push(obj)
                })
            }

            ageToTeachValue.value = []
            if (educatorContact.age_to_teach) {
                let ageToTeachArr = educatorContact.age_to_teach;
                ageToTeachArr.forEach((item) => {
                    if (item.object_id == 0) {
                        ageToTeachValue.value.push(item.object_en)
                    } else {
                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        ageToTeachValue.value.push(obj)
                    }
                })

            }

            studentsAgeValue.value = []
            if (educatorContact.Student_Age) {
                let studentsAgeArr = educatorContact.Student_Age;
                studentsAgeArr.forEach((item) => {
                    if (item.object_id == 0) {
                        studentsAgeValue.value.push(item.object_en)
                    } else {
                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        studentsAgeValue.value.push(obj)
                    }
                })

            }

            let languagesArr = educatorContact.languages
            if (languagesArr && languagesArr.length) {

                let languagesOptions = languageOptionsData.value

                let a = []
                languagesArr.forEach(item => {

                    let b = languagesOptions.filter(option => item.object_id == option.id)

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

                selectedLanguageList.value = a
            }

            certificationsValue.value = []
            if (educatorContact.Teaching_certificate) {
                let certificationArr = educatorContact.Teaching_certificate;
                certificationArr.forEach((item) => {
                    if (item.object_id == 0) {
                        certificationsValue.value.push(item.object_en)
                    } else {
                        let obj = {
                            id: item.object_id,
                            pid: item.object_pid,
                            object_en: item.object_en,
                            object_cn: item.object_cn
                        }
                        certificationsValue.value.push(obj)
                    }
                })
            }

            if (educatorContact.work_info) {
                workExpData.value = educatorContact.work_info
            }

            if (educatorContact.education_info) {
                educationData.value = educatorContact.education_info;
            }

            if (educatorContact.Teaching_experience) {
                let expArr = educatorContact.Teaching_experience
                expArr.forEach((item) => {
                    teachExpValue.value = item.object_id;
                })
            }

            placesLivedValue.value = []
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
                    placesLivedValue.value.push(obj)
                })
            }

            placesTraveledValue.value = []
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
                    placesTraveledValue.value.push(obj)
                })
            }

            let backgroundImage = educatorContact.background_image
            if (backgroundImage) {
                mediaForm.background_image = backgroundImage
                mediaForm.background_image_name = backgroundImage.substring(backgroundImage.length - 10)
            }

            let videoUrl = educatorContact.video_url
            if (videoUrl) {
                mediaForm.video_url = videoUrl
                mediaForm.video_name = videoUrl.substring(videoUrl.length - 10)
            }

            if (educatorContact.images) {

                let userImages = educatorContact.images
                if (userImages.length > 0) {
                    let userImagesArr = []
                    userImages.forEach(item => {
                        let userImageObj = {
                            name: item.url.substring(item.url.length - 10),
                            url: item.url
                        }
                        userImagesArr.push(userImageObj)
                    })
                    accountFilesData.value = []
                    accountFilesData.value = userImagesArr
                }

            }

            let resume = educatorContact.resume_pdf
            if (resume) {
                mediaForm.resume_pdf = resume
                mediaForm.resume_name = resume.substring(resume.length - 10)
            }

        }
    }).catch(err => {
        console.log(err)
    })

}

const deleteWorkExp = (item) => {

    let params = {
        id: item.id
    }

    EDUCATOR_DELETE_WORK_ITEM(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            getBasicInfo()
        }
    }).catch(err => {
        console.log(err)
    })

}
const editWorkExp = (item) => {

    workExpForm.company_name = item.company_name
    workExpForm.title = item.title
    workExpForm.location = item.location
    workExpForm.teaching_times = item.teaching_times
    workExpForm.teaching_experience = item.teaching_experience

    workExpForm.date = item.date

    let workTimeFrom = item.work_time_from
    let workTimeTo = item.work_time_to

    // this.workExpForm.date = [workTimeFrom * 1000, workTimeTo * 1000]

    workExpForm.work_time_from = workTimeFrom * 1000;
    workExpForm.work_time_to = workTimeTo * 1000;
    workExpForm.work_id = item.id

    editExistWorkExpStatus.value = true
    workExpDialogVisible.value = true

}

const submitWorkExpForm = (formEl) => {
    formEl.validate((valid) => {
        if (valid) {
            workExpForm.work_time_from = Math.floor(workExpForm.work_time_from / 1000)
            workExpForm.work_time_to = Math.floor(workExpForm.work_time_to / 1000)
            let params = Object.assign({}, workExpForm)
            ADD_USER_WORK_V2(params).then(res => {
                // console.log(res)
                if (res.code == 200) {
                    editExistWorkExpStatus.value = false;
                    workExpDialogVisible.value = false;
                    getBasicInfo()
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            console.log('error submit!!')
        }
    })
}

const educationDialogVisible = ref(false)
const submitEducationLoadingValue = ref(false)
const educationData = ref([])
const editExistEducationStatus = ref(false)
const educationDegreeObj = ref({})
const showEducationDialog = () => {

    educationForm.school_name = ''
    educationForm.degree = ''
    educationForm.degree_id = ''
    educationForm.field_of_study = ''
    educationForm.start_time = ''
    educationForm.end_time = ''
    educationForm.grade = ''

    educationDegreeObj.value = {}
    educationDialogVisible.value = true;
}

const saveEducationTemp = (formEl) => {
    submitEducationForm(formEl)
}

const deleteEducation = (item) => {

    let params = {
        id: item.id
    }

    EDUCATOR_DELETE_EDUCATION_ITEM(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            getBasicInfo()
        }
    }).catch(err => {
        console.log(err)
    })

}

const editEducation = (item) => {

    if (item.degree && item.degree_id) {
        educationDegreeObj.value = {
            id: item.degree_id,
            object_en: item.degree
        }
    }

    educationForm.school_name = item.school_name
    educationForm.degree = item.degree
    educationForm.degree_id = item.degree_id
    educationForm.field_of_study = item.field_of_study

    educationForm.grade = item.grade

    let startTime = item.start_time
    let endTime = item.end_time
    // this.educationForm.date = [startTime * 1000, endTime * 1000]

    educationForm.start_time = startTime * 1000;
    educationForm.end_time = endTime * 1000;
    educationForm.education_id = item.id;
    editExistEducationStatus.value = true;
    educationDialogVisible.value = true;
}

const submitEducationForm = (formEl) => {

    formEl.validate((valid) => {
        if (valid) {

            educationForm.start_time = Math.floor(educationForm.start_time / 1000)
            educationForm.end_time = Math.floor(educationForm.end_time / 1000)

            educationForm.degree = educationDegreeObj.value.object_en;
            educationForm.degree_id = educationDegreeObj.value.id;

            let params = Object.assign({}, educationForm)
            ADD_USER_EDUCATION_V2(params).then(res => {
                console.log(res)
                if (res.code == 200) {
                    editExistEducationStatus.value = false;
                    educationDialogVisible.value = false;
                    getBasicInfo()
                }
            }).catch(err => {
                console.log(err)

            })
        } else {
            console.log('error submit!!')
            return false
        }
    })

}

const subCategoryOptions = ref([])

const loadSubCategoryData = async () => {

    let params = {
        pid: 1,
        tree: 1
    }

    await USER_SUB_IDENTITY_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            subCategoryOptions.value = res.message
        }

    }).catch(err => {
        console.log(err)
    })
}

const birthdayDisabledDate = (date) => {
    let myDate = new Date();
    return date.getTime() >= myDate.getTime();
}

const educationDialogWidth = ref('454px')

const uploadLoadingStatus = ref(false)
const uploadHeaders = {
    platform: 4
}

const profilePhotoHttpRequest = (options) => {
    uploadLoadingStatus.value = true;
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
                        personalForm.profile_photo = myFileUrl
                        uploadLoadingStatus.value = false;
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
                        personalForm.profile_photo = myFileUrl
                        uploadLoadingStatus.value = false;
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

}

const beforeProfilePhotoUpload = (file) => {
    uploadLoadingStatus.value = true;
    const isLt2M = file.size / 1024 / 1024 < 20

    if (!isLt2M) {
        ElMessage.error('File size can not exceed 20MB')
    }
    return isLt2M
}


const backgroundHttpRequest = (options) => {

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
                        uploadLoadingStatus.value = false;
                        editBackgroundImageStatus.value = true
                        mediaForm.background_image_name = myFileUrl.substring(myFileUrl.length - 10)
                        mediaForm.background_image = myFileUrl
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
                        uploadLoadingStatus.value = false;
                        editBackgroundImageStatus.value = true
                        // mediaForm.background_image_name = myFileUrl.substring(myFileUrl.length - 10)
                        // mediaForm.background_image = myFileUrl
                        mediaForm.new_background_image.push({
                            background_image_name: myFileUrl.substring(myFileUrl.length - 10),
                            background_image: myFileUrl
                        })
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

}

const beforeBackgroundPhotoUpload = (file) => {
    uploadLoadingStatus.value = true;
    const isLt2M = file.size / 1024 / 1024 < 20
    if (!isLt2M) {
        ElMessage.error('File size can not exceed 20MB')
    }
    return isLt2M
}


const videoHttpRequest = (options) => {

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
                uploadLoadingStatus.value = false;
                editVideoStatus.value = true
                mediaForm.video_name = myFileUrl.substring(myFileUrl.length - 10)
                mediaForm.video_url = myFileUrl
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
                uploadLoadingStatus.value = false;
                editVideoStatus.value = true
                mediaForm.video_name = myFileUrl.substring(myFileUrl.length - 10)
                mediaForm.video_url = myFileUrl
            }
        }).catch(err => {
            console.log(err)
        })

    }

}

const beforeIntroVideoUpload = (file) => {
    console.log(file)
    uploadLoadingStatus.value = true;
}

// const resumePdfHttpRequest = (options) => {
//
//     // console.log(options)
//     const formData = new FormData();
//
//     formData.append('token', localStorage.getItem('token'))
//     // console.log(file)
//     let isInChina = process.env.VUE_APP_CHINA
//     if (isInChina === 'yes') {
//         formData.append('file[]', options.file, options.file.name)
//         UPLOAD_BY_ALI_OSS(formData).then(res => {
//             // console.log(res)
//             if (res.code == 200) {
//                 let myFileUrl = res.data[0]['file_url'];
//                 uploadLoadingStatus.value = false;
//                 editResumeStatus.value = true
//                 mediaForm.resume_name = myFileUrl.substring(myFileUrl.length - 10)
//                 mediaForm.resume_pdf = myFileUrl
//             }
//         }).catch(err => {
//             console.log(err)
//         })
//
//     }
//
//     if (isInChina === 'no') {
//         formData.append('file', options.file, options.file.name)
//         UPLOAD_BY_SERVICE(formData).then(res => {
//             // console.log(res)
//             if (res.code == 200) {
//                 let myFileUrl = res.message.file_path;
//                 uploadLoadingStatus.value = false;
//                 editResumeStatus.value = true
//                 mediaForm.resume_name = myFileUrl.substring(myFileUrl.length - 10)
//                 mediaForm.resume_pdf = myFileUrl
//             }
//         }).catch(err => {
//             console.log(err)
//         })
//
//     }
//
// }
// const beforeResumePdfUpload = (file) => {
//     uploadLoadingStatus.value = true;
//
//     const isLt2M = file.size / 1024 / 1024 < 20
//
//     if (!isLt2M) {
//         ElMessage.error('File size can not exceed 20MB')
//     }
//     return isLt2M
// }


const accountFilesData = ref([])
// const editAccountFilesStatus = ref(true)

const beforeAccountImageUpload = (file) => {
    uploadLoadingStatus.value = true;
    const isJpeg = file.type === 'image/png' || file.type === 'image/jpg'
    if (!isJpeg) {
        return ElMessage.error('Please select the correct file format to upload')
    }
    return isJpeg
}

const handleAccountImageChange = (file, fileList) => {
    console.log(file)
    console.log(fileList)
    uploadLoadingStatus.value = true;
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
                accountFilesData.value.push(obj)

            })
            uploadLoadingStatus.value = false;
        }

    }).catch(err => {
        uploadLoadingStatus.value = false;
        console.log(err)
    })

}

const handleAccountFilesRequest = () => {
    console.log('account files http request')
}
const handleAccountImageRemove = (file, i) => {
    console.log(file, i)
    accountFilesData.value.splice(i, 1)
}

const uploadAccountImages = () => {

    let oldData = []

    if (accountFilesData.value.length > 0) {
        accountFilesData.value.forEach(file => {
            oldData.push(file.url)
        })
    }

    let params = {
        identity: 1,
        company_id: companyId.value,
        img: oldData
    }

    ADD_USER_IMG_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            console.log('account images ----')
        }
    }).catch(err => {
        console.log(err)
        ElMessage.error(err.msg)
    })

}

// const accountImagePreview = (url)=>{
//     dialogAccountImageVisible.value = true;
//     dialogAccountImageUrl.value = url;
// }

const dialogSingleImageUrl = ref('')
const dialogSingleImageVisible = ref(false)
const dialogSingleField = ref('')
const handleSingleImagePreview = (url, field) => {
    dialogSingleImageVisible.value = true
    dialogSingleImageUrl.value = url
    dialogSingleField.value = field
}

const handleSingleImageRemove = (field,index) => {

    if (field === 'background_image') {
        // mediaForm.background_image = ''
        // mediaForm.background_image_name = ''
        mediaForm.new_background_image.splice(index, 1)
    }
    if (field === 'video_url') {
        mediaForm.video_url = ''
        mediaForm.video_name = ''
    }

}

const editBackgroundImageStatus = ref(true)
const editVideoStatus = ref(true)
const editResumeStatus = ref(true)
const handleEditMedia = (field) => {
    if (field === 'background_image') {
        editBackgroundImageStatus.value = false
    }
    if (field === 'video_url') {
        editVideoStatus.value = false
    }
    if (field === 'resume_pdf') {
        editResumeStatus.value = false
    }

}
const stepOneStatus = ref(true)
const stepTwoStatus = ref(true)
const stepThreeStatus = ref(true)
const stepFourStatus = ref(true)
const stepFiveStatus = ref(true)

const stepOneLoadingStatus = ref(false)
const stepTwoLoadingStatus = ref(false)
const stepThreeLoadingStatus = ref(false)
const stepFourLoadingStatus = ref(false)
const stepFiveLoadingStatus = ref(false)

const editStepOne = () => {
    stepOneStatus.value = false
}

const editStepTwo = () => {
    stepTwoStatus.value = false
}

const editStepThree = () => {
    stepThreeStatus.value = false
}

const editStepFour = () => {
    stepFourStatus.value = false
}

const editStepFive = () => {
    stepFiveStatus.value = false
}

const cancelStepOne = () => {
    getBasicInfo()
    stepOneStatus.value = true
}

const cancelStepTwo = () => {
    getBasicInfo()
    stepTwoStatus.value = true
}
const cancelStepThree = () => {
    getBasicInfo()
    stepThreeStatus.value = true
}
const cancelStepFour = () => {
    getBasicInfo()
    stepFourStatus.value = true
}

const cancelStepFive = () => {
    getBasicInfo()
    stepFiveStatus.value = true
}

const saveUserContactInfo = (params) => {
    USER_CONTACT_EDIT_V3(params).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

const profileAction = ref('edit')

const saveStepOne = (formEl) => {
    formEl.validate((valid) => {
        if (valid) {
            stepOneLoadingStatus.value = true
            let name = personalForm.first_name + ' ' + personalForm.last_name
            let phone = personalForm.phone_code + '#' + personalForm.phone

            let params = {
                name: name,
                email: personalForm.email,
                nationality: personalForm.nationality,
                is_visible: personalForm.is_visible,
                phone: phone,
                is_seeking: personalForm.is_seeking,

            }

            if (personalForm.sub_categories.length) {
                let subCategoryIdArr = []
                let subCategoryNameEnArr = []
                let subCategoryNameCnArr = []

                personalForm.sub_categories.forEach(item => {
                    subCategoryIdArr.push(item.id)
                    subCategoryNameEnArr.push(item.identity_name)
                    subCategoryNameCnArr.push(item.identity_name_cn)
                })

                params.sub_identity_id = subCategoryIdArr.join(',')
                params.sub_identity_name_en = subCategoryNameEnArr.join(',')
                params.sub_identity_name_cn = subCategoryNameCnArr.join(',')
            }

            if (profileAction.value === 'edit') {
                params.id = companyId.value
            }

            EDUCATOR_CONTACT_EDIT_V3(params).then(res => {
                if (res.code === 200) {
                    // console.log(res)
                    store.commit('username', name)

                    if (profileAction.value === 'add') {
                        companyId.value = res.message.educator_id
                        changeIdentity(res.message.educator_id, res.message.user_id, 2)
                        setTimeout(function () {
                            stepOneLoadingStatus.value = false
                            stepOneStatus.value = true
                        }, 1500)
                        return;
                    }

                    saveUserContactInfo({
                        first_name: personalForm.first_name,
                        last_name: personalForm.last_name,
                        headimgurl: personalForm.profile_photo
                    })

                    setTimeout(function () {
                        getBasicInfo()
                        setTimeout(function (){
                            stepOneLoadingStatus.value = false
                            stepOneStatus.value = true
                        },1500)

                    }, 1500)

                }
            }).catch(err => {
                console.log(err)
                stepOneLoadingStatus.value = false
            })

        } else {
            stepOneLoadingStatus.value = false
            console.log('submit error')
        }
    })
}

const saveStepTwo = (formEl) => {
    formEl.validate((valid) => {
        if (valid) {

            stepTwoLoadingStatus.value = true

            if (interestsValue.value && interestsValue.value.length) {
                professionForm.hobbies = interestsValue.value.join(',')
            }

            let params = Object.assign({}, professionForm)
            if (profileAction.value === 'edit') {
                params.id = companyId.value
            }
            EDUCATOR_CONTACT_EDIT_V3(params).then(res => {
                if (res.code === 200) {
                    console.log(res)

                    if (profileAction.value === 'add') {
                        companyId.value = res.message.educator_id

                        if (workDestinationValue.value && workDestinationValue.value.length) {
                            workDestinationConfirm()
                        }
                        if (jobTypeValue.value && jobTypeValue.value.length) {
                            jobTypeConfirm()
                        }

                        if (selectedLanguageList.value && selectedLanguageList.value.length) {
                            languageConfirm()
                        }

                        if (workScheduleTypeValue.value) {
                            workScheduleTypeConfirm()
                        }
                        if (benefitsValue.value && benefitsValue.value.length) {
                            benefitsConfirm()
                        }
                        if (subjectValue.value && subjectValue.value.length) {
                            subjectConfirm()
                        }

                        if (preferredLanguageValue.value && preferredLanguageValue.value.length) {
                            preferredLanguageConfirm()
                        }

                        if (ageToTeachValue.value && ageToTeachValue.value.length) {
                            ageToTeachConfirm()
                        }

                        if (studentsAgeValue.value && studentsAgeValue.value.length) {
                            studentsAgeConfirm()
                        }

                        changeIdentity(res.message.educator_id, res.message.user_id, 2)

                        setTimeout(function () {
                            stepTwoLoadingStatus.value = false
                            stepTwoStatus.value = true
                        }, 1500)
                        return;
                    }

                    if (workDestinationValue.value && workDestinationValue.value.length) {
                        workDestinationConfirm()
                    }
                    if (jobTypeValue.value && jobTypeValue.value.length) {
                        jobTypeConfirm()
                    }

                    if (selectedLanguageList.value && selectedLanguageList.value.length) {
                        languageConfirm()
                    }

                    if (workScheduleTypeValue.value) {
                        workScheduleTypeConfirm()
                    }
                    if (benefitsValue.value && benefitsValue.value.length) {
                        benefitsConfirm()
                    }
                    if (subjectValue.value && subjectValue.value.length) {
                        subjectConfirm()
                    }
                    if (preferredLanguageValue.value && preferredLanguageValue.value.length) {
                        preferredLanguageConfirm()
                    }

                    if (ageToTeachValue.value && ageToTeachValue.value.length) {
                        ageToTeachConfirm()
                    }

                    if (studentsAgeValue.value && studentsAgeValue.value.length) {
                        studentsAgeConfirm()
                    }

                    setTimeout(function () {
                        getBasicInfo()
                        setTimeout(function (){
                            stepTwoLoadingStatus.value = false
                            stepTwoStatus.value = true
                        },1500)

                    }, 1500)


                }
            }).catch(err => {
                console.log(err)
                stepTwoLoadingStatus.value = false
            })

        } else {
            console.log('submit error')
        }
    })
}
const saveStepThree = (formEl) => {
    formEl.validate((valid) => {
        if (valid) {

            stepThreeLoadingStatus.value = true

            if (teachExpValue.value) {
                teachExpConfirm()
            }
            if (placesTraveledValue.value && placesTraveledValue.value.length) {
                placesTraveledConfirm()
            }
            if (placesLivedValue.value && placesLivedValue.value.length) {
                placesLivedConfirm()
            }

            setTimeout(function () {
                getBasicInfo()
                setTimeout(function (){
                    stepThreeLoadingStatus.value = false
                    stepThreeStatus.value = true
                },1500)

            }, 1500)


        } else {
            stepThreeLoadingStatus.value = false
            console.log('submit error')
        }
    })
}

const saveStepFour = (formEl) => {
    formEl.validate((valid) => {
        if (valid) {
            stepFourLoadingStatus.value = true

            if (certificationsValue.value && certificationsValue.value.length) {
                certificationsConfirm()
            }

            setTimeout(function () {
                getBasicInfo()
                setTimeout(function (){
                    stepFourLoadingStatus.value = false
                    stepFourStatus.value = true
                },1500)

            }, 1500)

        } else {
            stepFourLoadingStatus.value = false
            console.log('error submit!!')
        }
    })

}

const saveStepFive = (formEl) => {

    formEl.validate((valid) => {
        if (valid) {
            stepFiveLoadingStatus.value = true

            let params = Object.assign({}, mediaForm)
            if (profileAction.value === 'edit') {
                params.id = companyId.value
            }
            EDUCATOR_CONTACT_EDIT_V3(params).then(res => {
                if (res.code === 200) {
                    console.log(res)
                    if (profileAction.value === 'add') {
                        companyId.value = res.message.educator_id
                        uploadAccountImages()
                        changeIdentity(res.message.educator_id, res.message.user_id, 2)
                        setTimeout(function () {
                            stepFiveLoadingStatus.value = false
                            stepFiveStatus.value = true
                        }, 1500)

                        return;
                    }

                    uploadAccountImages()

                    setTimeout(function () {
                        getBasicInfo()
                        setTimeout(function (){
                            stepFiveLoadingStatus.value = false
                            stepFiveStatus.value = true
                        },1500)

                    }, 1500)


                }
            }).catch(err => {
                console.log(err)
                stepFiveLoadingStatus.value = false
            })

        } else {
            stepFiveLoadingStatus.value = false
            console.log('error submit!!')
        }
    })

}

const changeIdentity = (companyId, companyContactId, language) => {

    let params = {
        identity: 1,
        company_id: companyId,
        company_contact_id: companyContactId,
        language: language
    }

    SWITCH_IDENTITY_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {

            let str = JSON.stringify(res.message)
            localStorage.setItem('identity', 1)
            localStorage.setItem('menuData', str)

            store.commit('username', personalForm.name)
            store.commit('allIdentityChanged', true)
            store.commit('identity', 1)
            store.commit('menuData', res.message)
            store.commit('currentCompanyId', companyId)

            getBasicInfo()
            history.pushState({}, '', '/setting/profile/educator')

        }
    }).catch(err => {
        console.log(err)
    })
}

const handleDownloadMedia = (url) => {
    window.open(url, '_blank')
}

const cancelUploadProfile = () => {
    uploadLoadingStatus.value = false;
}

onMounted(async () => {

    await loadUserObjectData()
    await loadSubCategoryData()
    await getAllLanguageProficiencyList()

    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
        updateWindowHeight()
        workExpDialogWidth.value = '90%'
        educationDialogWidth.value = '90%'
    }

    window.onresize = () => {
        if (screenWidthFloor <= 768) {
            updateWindowHeight()
            workExpDialogWidth.value = '90%'
            educationDialogWidth.value = '90%'
        }
    }

    let str = route.query.s

    if (str) {
        let strObj = JSON.parse(decode(str))
        // this.i = strObj.i;
        // this.id = strObj.id;
        // this.cid = strObj.cid;
        // this.action = strObj.action;

        if (strObj.action) {
            profileAction.value = strObj.action
        }
    }

    if (profileAction.value === 'edit') {
        await getBasicInfo()
    }


})

</script>

<style scoped>
@import "@/style/profile-business.css";
@import "@/style/profile-educator.css";

:deep(.el-upload-dragger) {
    padding: 16px 40px;
    border-style: solid;
}

:deep(.el-radio__label), :deep(.el-checkbox__label){
    color: #667085;
    font-weight: 400;
    font-size: 14px;
}


:deep(.el-date-editor){
    --el-date-editor-width: auto;
}


</style>
