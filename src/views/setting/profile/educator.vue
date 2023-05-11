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
                                <el-button type="info">Cancel</el-button>
                                <el-button type="primary">Save & Continue</el-button>
                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="personalForms"
                                    :model="personalForm"
                                    :rules="personalRules"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Name">
                                    <div class="form-item-container">
                                        <el-input style="margin-right: 20px;"
                                                  v-model="personalForm.first_name"
                                                  placeholder="Enter First Name">
                                        </el-input>
                                        <el-input v-model="personalForm.last_name"
                                                  placeholder="Enter Second Name">
                                        </el-input>
                                    </div>
                                </el-form-item>
                                <el-form-item label="E-mail Address">
                                    <el-input class="form-width-388"
                                              v-model="personalForm.email"
                                              placeholder="Enter your E-mail">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="Nationality" prop="nationality">
                                    <el-select v-model="personalForm.nationality"
                                               class="form-width-388"
                                               filterable
                                               fit-input-width
                                               :teleported="false"
                                               placeholder="Enter your nationality">
                                        <el-option v-for="(item,i) in nationalityOptions"
                                                   :key="i"
                                                   :label="item.name"
                                                   :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="Profile visibility">
                                    <el-radio-group v-model="personalForm.is_visible">
                                        <el-radio class="form-width-percent-100" :label="0">Private</el-radio>
                                        <el-radio class="form-width-percent-100" :label="1">Public</el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="Phone No">
                                    <div class="form-item-container">

                                        <el-input v-model="personalForm.phone"
                                                  class="form-width-388"
                                                  oninput="value=value.replace(/[^\d]/g,'')"
                                                  maxlength="15"
                                                  placeholder="Phone #">
                                            <template #prepend>
                                                <el-select v-model="personalForm.phone_code"
                                                           class="form-width-100"
                                                           :teleported="false"
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
                                    <el-radio-group v-model="jobSeekingValue">
                                        <template v-for="(item,i) in jobSeekingOptions" :key="i">
                                            <el-radio class="form-width-percent-100" :label="item.id">{{
                                                item.object_en
                                                }}
                                            </el-radio>
                                        </template>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="About Yourself" prop="bio">
                                    <el-input type="textarea"
                                              class="form-width-388"
                                              v-model="personalForm.bio"
                                              :rows="6"
                                              placeholder="A short bio">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="Educator Type(Up to 3)">

                                    <el-checkbox-group v-model="subCategoryValue" class="form-width-388" :min="1"
                                                       :max="3">
                                        <template v-for="(item,i) in subCategoryOptions" :key="i">

                                            <el-checkbox v-if="item['children'].length === 0" :label="item.id">
                                                {{ item.identity_name }}
                                            </el-checkbox>

                                            <el-checkbox v-for="(child,key) in item['children']" :key="key">
                                                {{ child.identity_name }}
                                            </el-checkbox>

                                        </template>

                                    </el-checkbox-group>

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

                                        <el-avatar icon="UserFilled" :size="80"></el-avatar>

                                        <el-upload
                                                class="profile-picture-upload"
                                                drag

                                        >
                                            <el-icon class="el-icon--upload">
                                                <upload-filled/>
                                            </el-icon>
                                            <div class="el-upload__text">
                                                <em>Click to Upload</em> Or Drag your photo
                                            </div>
                                            <div class="el-upload__text">
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
                                <el-button type="info">Cancel</el-button>
                                <el-button type="primary" @click="saveProfession(professionForms)">Save & Continue
                                </el-button>
                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="professionForms"
                                    :model="professionForm"
                                    :rules="professionRules"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Job title" prop="job_title">
                                    <el-input
                                            class="form-width-388"
                                            v-model="professionForm.job_title"
                                            placeholder="Enter Job title here"></el-input>
                                </el-form-item>
                                <el-form-item label="Qualification/Education Level" prop="job_title">
                                    <el-input
                                            class="form-width-388"
                                            v-model="professionForm.job_title"
                                            placeholder="Enter your Qualification"></el-input>
                                </el-form-item>
                                <el-form-item label="Professional Description" prop="job_title">
                                    <el-input
                                            class="form-width-388"
                                            v-model="professionForm.job_title"
                                            type="textarea"
                                            :rows="6"
                                            placeholder="Description*">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="Work destination (Type to add new) ">

                                    <el-select
                                            class="form-width-388"
                                            filterable
                                            :teleported="false"
                                            v-model="workDestinationValue"
                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select work destination"
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

                                <el-form-item label="Job type">

                                    <el-select
                                            class="form-width-388"
                                            filterable
                                            :teleported="false"
                                            multiple
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

                                <el-form-item label="Work schedule type">

                                    <el-select
                                            class="form-width-388"
                                            v-model="workScheduleTypeValue"
                                            :teleported="false"
                                            filterable
                                            collapse-tags
                                            placeholder="Select work schedule type"
                                            value-key="id"
                                    >
                                        <el-option v-for="(item,i) in workScheduleTypeOptions"
                                                   :key="i"
                                                   :label="item.object_en"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>

                                </el-form-item>

                                <el-form-item label="Benefits">

                                    <el-select
                                            class="form-width-388"
                                            v-model="benefitsValue"
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
                                                v-for="(item,index) in benefitsOptions"
                                                :key="index"
                                                :label="item.object_en"
                                                :value="item"
                                        />

                                    </el-select>

                                </el-form-item>

                                <el-form-item label="Subject(s) to teach">

                                    <el-select
                                            class="form-width-388"
                                            :teleported="false"
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

                                <el-form-item label=" Preferred Age To Teach">

                                    <el-select
                                            class="form-width-388"
                                            :teleported="false"
                                            v-model="ageToTeachValue"
                                            multiple
                                            collapse-tags
                                            collapse-tags-tooltip
                                            placeholder="Select preferred age to teach"
                                            filterable
                                            allow-create
                                            value-key="id"
                                    >
                                        <el-option
                                                v-for="(item,index) in ageToTeachOptions"
                                                :key="index"
                                                :label="item.object_en"
                                                :value="item"
                                        />

                                    </el-select>

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
                                <el-button type="info">Cancel</el-button>
                                <el-button type="primary" @click="savePastExp(pastExpForms)">Save & Continue</el-button>
                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="pastExpForms"
                                    :model="pastExpForm"
                                    :rules="pastExpRules"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Years of experience">
                                    <el-select v-model="teachExpValue"
                                               class="form-width-388"
                                               filterable
                                               :teleported="false"
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
                                            :teleported="false"
                                            v-model="placesTraveledValue"
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
                                            :teleported="false"
                                            v-model="placesLivedValue"
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
                                                    <div class="work-form-item-r">{{ item.teaching_experience }}
                                                        ddddddddd ds fdsfds dsfds f sdfsdfdsfds
                                                    </div>
                                                </div>

                                                <div class="work-exp-temp-btn-container">
                                                    <el-button plain
                                                               @click="deleteWorkExp(item)"
                                                    >
                                                        Delete
                                                    </el-button>
                                                    <el-button type="primary"
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
                                <el-button type="info">Cancel</el-button>
                                <el-button type="primary">Save & Continue</el-button>
                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="profileForms"
                                    :model="profileForm"
                                    :rules="profileRules"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Certifications">

                                    <el-select
                                        :teleported="false"
                                        v-model="certificationsValue"
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

<!--                                <el-form-item>-->
<!--                                    <div class="work-experience">-->
<!--                                        <div class="work-exp-temp-container">-->
<!--                                            <div class="work-exp-temp-container">-->

<!--                                                <div class="work-exp-temp-item"-->
<!--                                                     v-for="(item,i) in educationData" :key="i">-->

<!--                                                    <el-form-item label="School" prop="school_name">-->
<!--                                                        {{ item.school_name }}-->
<!--                                                    </el-form-item>-->
<!--                                                    <el-form-item label="Degree" prop="degree">-->
<!--                                                        {{ item.degree }}-->
<!--                                                    </el-form-item>-->
<!--                                                    <el-form-item label="Field of Study">-->
<!--                                                        {{ item.field_of_study }}-->
<!--                                                    </el-form-item>-->

<!--                                                    <el-form-item label="Duration of Study" prop="date">-->
<!--                                                        {{-->
<!--                                                            $filters.ymdFormatTimestamp(item.start_time)-->
<!--                                                        }}-{{ $filters.ymdFormatTimestamp(item.end_time) }}-->
<!--                                                    </el-form-item>-->

<!--                                                    <div class="work-exp-temp-btn-container">-->
<!--                                                        <el-button class="work-exp-temp-btn" link type="primary"-->
<!--                                                                   @click="deleteEducation(item)"-->
<!--                                                        >-->
<!--                                                            DELETE-->
<!--                                                        </el-button>-->
<!--                                                        <el-button class="work-exp-temp-btn" plain round-->
<!--                                                                   @click="editEducation(item)"-->
<!--                                                        >-->
<!--                                                            EDIT-->
<!--                                                        </el-button>-->
<!--                                                    </div>-->
<!--                                                </div>-->

<!--                                            </div>-->

<!--                                        </div>-->
<!--                                        <el-button class="work-exp-temp-btn"-->
<!--                                                   plain-->
<!--                                                   round-->
<!--                                                   @click="showEducationDialog()">-->
<!--                                            ADD EDUCATION-->
<!--                                        </el-button>-->
<!--                                    </div>-->

<!--                                </el-form-item>-->

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
                                <el-button type="info">Cancel</el-button>
                                <el-button type="primary">Save & Continue</el-button>
                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="profileForms"
                                    :model="profileForm"
                                    :rules="profileRules"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >


                            </el-form>
                        </div>

                    </div>

                </el-collapse-transition>
            </div>

        </el-scrollbar>

        <div class="delete-container">
            <div class="delete-l">
                <div class="delete-label">Delete Account</div>
                <div class="delete-tips">
                    By clicking on Delete Account Button your account will be removed permanently
                </div>
            </div>
            <div class="delete-r">
                <el-popconfirm
                        width="310"
                        :hide-icon="true"
                        confirm-button-text="Yes"
                        cancel-button-text="No"
                        title="This action will remove your account permanently, Are your sure?"
                        @confirm="confirmDelete"
                >
                    <template #reference>
                        <el-button type="danger">Delete Account</el-button>
                    </template>

                </el-popconfirm>

            </div>

        </div>

        <verificationCodeDialog :visible="verificationVisible"
                                @close="verificationVisible=false">
        </verificationCodeDialog>

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

<!--        <el-dialog-->
<!--            v-model="educationDialogVisible"-->
<!--            title="Education"-->
<!--            :width="educationDialogWidth"-->
<!--        >-->
<!--            <el-form-->
<!--                ref="educationForm"-->
<!--                :model="educationForm"-->
<!--                :rules="educationRules"-->
<!--                label-width="120px"-->
<!--                label-position="top"-->
<!--                class="demo-ruleForm"-->
<!--            >-->
<!--                <el-form-item label="School" prop="school_name">-->
<!--                    <el-input v-model="educationForm.school_name" placeholder="Please enter the university name"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Degree" prop="degree">-->
<!--                    <el-select v-model="educationDegreeObj"-->
<!--                               :teleported="false"-->
<!--                               value-key="id"-->
<!--                               placeholder="Doctorate, Master's, Bachelor's, etc...">-->
<!--                        <el-option v-for="(degree,i) in degreeOptionsData" :key="i"-->
<!--                                   :label="degree.object_en"-->
<!--                                   :value="degree"-->
<!--                        ></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="Field of Study">-->
<!--                    <el-input v-model="educationForm.field_of_study" type="textarea"-->
<!--                              placeholder="Chemistry, International Business, Dance, etc..."></el-input>-->
<!--                </el-form-item>-->

<!--                <el-form-item label="Duration of Study" prop="date">-->
<!--                    <div class="duration-mobile-container">-->
<!--                        <div class="duration-mobile-item">-->
<!--                            <el-date-picker-->
<!--                                v-model="educationForm.start_time"-->
<!--                                type="month"-->
<!--                                unlink-panels-->
<!--                                format="MM/YYYY"-->
<!--                                value-format="x"-->
<!--                                placeholder="Start month"-->
<!--                                :disabled-date="birthdayDisabledDate"-->

<!--                            ></el-date-picker>-->
<!--                        </div>-->
<!--                        <div class="duration-mobile-item-to">-->
<!--                            <span>To</span>-->
<!--                        </div>-->
<!--                        <div class="duration-mobile-item">-->
<!--                            <el-date-picker-->
<!--                                v-model="educationForm.end_time"-->
<!--                                type="month"-->
<!--                                unlink-panels-->
<!--                                format="MM/YYYY"-->
<!--                                value-format="x"-->
<!--                                placeholder="End month"-->
<!--                                :disabled-date="birthdayDisabledDate"-->

<!--                            ></el-date-picker>-->
<!--                        </div>-->
<!--                    </div>-->

<!--                </el-form-item>-->

<!--            </el-form>-->

<!--            <div class="work-exp-btn-container">-->
<!--                <el-button type="primary"-->
<!--                           link-->
<!--                           @click="educationDialogVisible=false"-->
<!--                >-->
<!--                    CANCEL-->
<!--                </el-button>-->
<!--                <el-button type="primary"-->
<!--                           round-->
<!--                           :loading="submitEducationLoadingValue"-->
<!--                           @click="saveEducationTemp()">-->
<!--                    SAVE-->
<!--                </el-button>-->
<!--            </div>-->

<!--        </el-dialog>-->



    </div>
</template>

<script>

import verificationCodeDialog from "@/components/verificationCodeDialog.vue";
import {ref, reactive, onMounted} from 'vue'
import {useStore} from 'vuex'
import arrowDownIcon from '@/assets/newHome/arrow-circle-down.svg'
import arrowUpIcon from '@/assets/newHome/arrow-circle-up.svg'
import {countriesData} from "@/utils/data";
import {phoneCodeData} from "@/utils/phoneCode";
import {
    ADD_PROFILE_V2,
    ADD_USER_WORK_V2,
    EDUCATOR_DELETE_WORK_ITEM, USER_INFO_BY_TOKEN_V2,
    USER_OBJECT_LIST,
    USER_SUB_IDENTITY_V2
} from "@/api/api";
import VueCookies from 'vue-cookies'
import {updateWindowHeight} from "@/utils/tools";

export default {
    name: "educator",
    components: {
        verificationCodeDialog
    },
    data() {
        return {
            arrowDownIcon,
            arrowUpIcon
        }
    },
    setup() {

        const store = useStore()

        const companyId = store.state.currentCompanyId

        const expandKeysData = ref([])

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

        })

        const personalRules = reactive({
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

        const professionForms = ref(null)
        const professionForm = reactive({})

        const professionRules = reactive({
            email_code: [
                {required: true, message: 'Please fill out your code.', trigger: 'blur'}
            ],
            email: [
                {type: 'email', required: true, message: 'Please fill out your email address.', trigger: 'blur'}
            ],
        })

        const pastExpForms = ref(null)
        const pastExpForm = reactive({})

        const pastExpRules = reactive({
            email_code: [
                {required: true, message: 'Please fill out your code.', trigger: 'blur'}
            ],
            email: [
                {type: 'email', required: true, message: 'Please fill out your email address.', trigger: 'blur'}
            ],
        })


        const profileForms = ref(null)
        const profileForm = reactive({
            password: '',
            confirm_password: '',
            current_password: ''
        })

        const profileRules = reactive({
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

        const jobSeekingOptions = ref([])
        const jobSeekingValue = ref()

        const workDestinationValue = ref()
        const workDestinationOptions = ref([])

        const jobTypeValue = ref()
        const jobTypeOptions = ref([])

        const workScheduleTypeValue = ref()
        const workScheduleTypeOptions = ref([])

        const benefitsValue = ref()
        const benefitsOptions = ref([])

        const subjectValue = ref()
        const subjectOptions = ref([])

        const ageToTeachValue = ref()
        const ageToTeachOptions = ref([])

        const teachExpValue = ref()
        const teachExpOptions = ref([])

        const placesTraveledValue = ref()
        const placesTraveledOptions = ref([])

        const placesLivedValue = ref()
        const placesLivedOptions = ref([])

        const certificationsValue = ref()
        const certificationsOptions = ref([])

        const loadUserObjectData = async () => {

            if (VueCookies.isKey('jobSeeking') && VueCookies.isKey('workDestination') &&
                VueCookies.isKey('workScheduleType') && VueCookies.isKey('jobType')
                && VueCookies.isKey('benefits') && VueCookies.isKey('subject') && VueCookies.isKey('ageToTeach'
                    && VueCookies.isKey('teachExp') && VueCookies.isKey('placesTraveled') && VueCookies.isKey('placesLived')
                )
            ) {
                jobSeekingOptions.value = JSON.parse(VueCookies.get('jobSeeking'))
                workDestinationOptions.value = JSON.parse(VueCookies.get('workDestination'))
                workScheduleTypeOptions.value = JSON.parse(VueCookies.get('workScheduleType'))
                jobTypeOptions.value = JSON.parse(VueCookies.get('jobType'))
                benefitsOptions.value = JSON.parse(VueCookies.get('benefits'))
                subjectOptions.value = JSON.parse(VueCookies.get('subject'))
                ageToTeachOptions.value = JSON.parse(VueCookies.get('ageToTeach'))
                teachExpOptions.value = JSON.parse(VueCookies.get('teachExp'))
                placesTraveledOptions.value = JSON.parse(VueCookies.get('placesTraveled'))
                placesLivedOptions.value = JSON.parse(VueCookies.get('placesLived'))
                return;
            }

            await USER_OBJECT_LIST({}).then(res => {
                // console.log(res)
                if (res.code == 200) {

                    let jobSeekingArr = res.message.filter(item => item.pid === 199);
                    jobSeekingOptions.value = jobSeekingArr
                    if (!VueCookies.isKey('jobSeeking')) {
                        VueCookies.set('jobSeeking', JSON.stringify(jobSeekingArr), 60 * 60 * 60)
                    }

                    let workDestinationArr = res.message.filter(item => item.pid === 155)  // 71 155
                    workDestinationOptions.value = workDestinationArr
                    if (!VueCookies.isKey('workDestination')) {
                        VueCookies.set('workDestination', JSON.stringify(workDestinationArr), 60 * 60 * 60)
                    }

                    let jobTypeArr = res.message.filter(item => item.pid === 3);
                    jobTypeOptions.value = jobTypeArr
                    if (!VueCookies.isKey('jobType')) {
                        VueCookies.set('jobType', JSON.stringify(jobTypeArr), 60 * 60 * 60)
                    }

                    let workScheduleTypeArr = res.message.filter(item => item.pid === 184);
                    workScheduleTypeOptions.value = workScheduleTypeArr
                    if (!VueCookies.isKey('workScheduleType')) {
                        VueCookies.set('workScheduleType', JSON.stringify(workScheduleTypeArr), 60 * 60 * 60)
                    }

                    let benefitsArr = res.message.filter(item => item.pid === 6);
                    benefitsOptions.value = benefitsArr
                    if (!VueCookies.isKey('benefits')) {
                        VueCookies.set('benefits', JSON.stringify(benefitsArr), 60 * 60 * 60)
                    }

                    let subjectArr = res.message.filter(item => item.pid === 1)
                    subjectOptions.value = subjectArr
                    if (!VueCookies.isKey('subject')) {
                        VueCookies.set('subject', JSON.stringify(subjectArr), 60 * 60 * 60)
                    }

                    let ageToTeachArr = res.message.filter(item => item.pid === 4);
                    ageToTeachOptions.value = ageToTeachArr
                    if (!VueCookies.isKey('ageToTeach')) {
                        VueCookies.set('ageToTeach', JSON.stringify(ageToTeachArr), 60 * 60 * 60)
                    }

                    let teachExpArr = res.message.filter(item => item.pid === 120)
                    teachExpOptions.value = teachExpArr
                    if (!VueCookies.isKey('teachExp')) {
                        VueCookies.set('teachExp', JSON.stringify(teachExpArr), 60 * 60 * 60)
                    }

                    // 原来是8 现在使用nationality的值 pid 203
                    let placesTraveledArr = res.message.filter(item => item.pid === 8);
                    placesTraveledOptions.value = placesTraveledArr
                    if (!VueCookies.isKey('placesTraveled')) {
                        VueCookies.set('placesTraveled', JSON.stringify(placesTraveledArr), 60 * 60 * 60)
                    }
                    // 原来是9 现在使用nationality的值 pid 203
                    let placesLivedArr = res.message.filter(item => item.pid === 9);
                    placesLivedOptions.value = placesLivedArr
                    if (!VueCookies.isKey('placesLived')) {
                        VueCookies.set('placesLived', JSON.stringify(placesLivedArr), 60 * 60 * 60)
                    }

                    // this.editRegionList = res.message.filter(item => item.pid === 5);

                    // this.editCertificationsList = res.message.filter(item => item.pid === 7);
                    //

                    // // 原来是71 现在使用nationality的值 pid 203
                    // this.editLocationList = res.message.filter(item => item.pid === 71)  // 71 155
                    // // 原来是155 现在使用nationality的值 pid 203

                    // this.profileStatusData = res.message.filter(item => item.pid === 195);

                    // this.degreeOptionsData = res.message.filter(item => item.pid === 125);
                    // this.languageOptionsData = res.message.filter(item => item.pid === 2);

                }

            }).catch(err => {
                console.log(err)
            })

        }

        const saveProfession = (formEl) => {
            formEl.validate((valid) => {
                if (valid) {
                    if (workDestinationValue.value && workDestinationValue.value.length) {
                        workDestinationConfirm()
                    }
                    if (jobTypeValue.value && jobTypeValue.value.length) {
                        jobTypeConfirm()
                    }
                    if (workScheduleTypeValue.value && workScheduleTypeValue.value.length) {
                        workScheduleTypeConfirm()
                    }
                    if (benefitsValue.value && benefitsValue.value.length) {
                        benefitsConfirm()
                    }
                    if (subjectValue.value && subjectValue.value.length) {
                        subjectConfirm()
                    }
                    if (ageToTeachValue.value && ageToTeachValue.value.length) {
                        ageToTeachConfirm()
                    }


                    console.log('submit')
                } else {
                    console.log('submit error')
                }
            })
        }

        const savePastExp = (formEl) => {
            formEl.validate((valid) => {
                if (valid) {
                    if (teachExpValue.value && teachExpValue.value.length) {
                        teachExpConfirm()
                    }
                    if (placesTraveledValue.value && placesTraveledValue.value.length) {
                        placesTraveledConfirm()
                    }
                    if (placesLivedValue.value && placesLivedValue.value.length) {
                        placesLivedConfirm()
                    }

                    console.log('submit')
                } else {
                    console.log('submit error')
                }
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
                company_id: companyId
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
                company_id: companyId
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
                company_id: companyId
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
                company_id: companyId
            }

            ADD_PROFILE_V2(data).then(res => {
                if (res.code == 200) {
                    console.log('age to teach--submit--' + res.data);
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
                company_id: companyId
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
                company_id: companyId
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
                company_id: companyId
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
            placesTraveledOptions.value.forEach(item => {
                objectArr.push(item.id);
            })

            let data = {
                object_pid: 8,
                object_id: objectArr,
                expand: expand,
                company_id: companyId
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
            placesLivedOptions.value.forEach(item => {
                objectArr.push(item.id);
            })

            let data = {
                object_pid: 9,
                object_id: objectArr,
                expand: expand,
                company_id: companyId
            }

            ADD_PROFILE_V2(data).then(res => {
                if (res.code == 200) {
                    console.log('place lived --submit--' + res.data);
                }

            }).catch(err => {
                console.log(err)
            })

        }

        const workExpData = ref([])
        const workExpTempData = ref([])
        const editWorkExpIndex = ref(-1)
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
        }

        const getBasicInfo = async () => {

            let params = {
                identity: 1
            }

            await USER_INFO_BY_TOKEN_V2(params).then(res => {

                if (res.code == 200) {

                    let educatorContact = res.message.user_contact.educator_contact;
                    // let userContact = res.message.user_contact;
                    // this.educatorContact = educatorContact;
                    //
                    // if (educatorContact.name) {
                    //     this.basicForm.name = educatorContact.name;
                    // } else {
                    //     this.basicForm.name = userContact.first_name + ' ' + userContact.last_name;
                    // }
                    //
                    // if (educatorContact.resume_pdf) {
                    //     this.resumePdfUrl = educatorContact.resume_pdf
                    //     this.basicForm.resume_pdf = educatorContact.resume_pdf
                    // }
                    //
                    //
                    // if (educatorContact.background_image) {
                    //     this.backgroundPhotoUrl = educatorContact.background_image
                    //     this.basicForm.background_image = educatorContact.background_image
                    // }
                    //
                    // if (userContact.headimgurl) {
                    //     this.profilePhotoUrl = userContact.headimgurl
                    // }
                    //
                    // if (educatorContact.video_url) {
                    //     this.introVideoUrl = educatorContact.video_url
                    //     this.basicForm.video_url = educatorContact.video_url
                    // }
                    //
                    // if (educatorContact.phone) {
                    //     let phone = educatorContact.phone;
                    //     let phoneArr = phone.split('#')
                    //     // console.log(phoneArr)
                    //     if (phoneArr.length > 1) {
                    //         this.countryCode = phoneArr[0]
                    //         this.phoneNumber = phoneArr[1]
                    //     } else {
                    //         this.phoneNumber = phoneArr[0]
                    //     }
                    //     this.basicForm.phone = educatorContact.phone
                    // }
                    //
                    // if (educatorContact.desc) {
                    //     this.basicForm.desc = educatorContact.desc
                    // }
                    //
                    // if (educatorContact.email) {
                    //     this.basicForm.educator_email = educatorContact.email;
                    // } else {
                    //     this.basicForm.educator_email = userContact.email;
                    // }
                    //
                    // if (educatorContact.address) {
                    //     this.basicForm.address = educatorContact.address
                    // }
                    //
                    // if (educatorContact.bio) {
                    //     this.basicForm.bio = educatorContact.bio
                    // }
                    //
                    // if (educatorContact.is_seeking) {
                    //     this.basicForm.is_seeking = educatorContact.is_seeking;
                    // }
                    //
                    // if (educatorContact.is_public) {
                    //     this.basicForm.is_public = educatorContact.is_public;
                    // }
                    //
                    // if (educatorContact.job_title) {
                    //     this.basicForm.job_title = educatorContact.job_title;
                    // }
                    //
                    // if (educatorContact.hobbies) {
                    //     this.basicForm.hobbies = educatorContact.hobbies;
                    //     this.selectHobbyInfoList = educatorContact.hobbies.split(',');
                    // }
                    //
                    // if (educatorContact.nationality) {
                    //     this.basicForm.nationality = educatorContact.nationality;
                    // }


                    let subIdentityStr = educatorContact.sub_identity_id
                    if (subIdentityStr) {
                        if (subIdentityStr.length > 1) {
                            let subIdentityArr = subIdentityStr.split(',')
                            let subData = []
                            subIdentityArr.forEach(item => {
                                let cateValue = subCategoryOptions.value.filter(value => value.id == item)
                                subData.push(cateValue[0])
                            })
                            subCategoryValue.value = subData
                        }
                    }

                    // if (educatorContact.Teaching_certificate) {
                    //     let certificationArr = educatorContact.Teaching_certificate;
                    //     certificationArr.forEach((item) => {
                    //         if (item.object_id == 0) {
                    //             this.selectCertificationsList.push(item.object_en)
                    //         } else {
                    //             let obj = {
                    //                 id: item.object_id,
                    //                 pid: item.object_pid,
                    //                 object_en: item.object_en,
                    //                 object_cn: item.object_cn
                    //             }
                    //             this.selectCertificationsList.push(obj)
                    //         }
                    //     })
                    // }

                    // if (educatorContact.education_info) {
                    //     this.educationData = educatorContact.education_info;
                    // }
                    //
                    // if (educatorContact.Job_Seeking_Status) {
                    //     let objArr = educatorContact.Job_Seeking_Status;
                    //     objArr.forEach((item) => {
                    //         this.selectedJobSeekingValue = item.object_id;
                    //     })
                    // }
                    //
                    // if (educatorContact.Profile_Status) {
                    //     let objArr = educatorContact.Profile_Status;
                    //     objArr.forEach((item) => {
                    //         this.selectedProfileStatusValue = item.object_id;
                    //     })
                    // }
                    if (educatorContact.Teaching_experience) {
                        let expArr = educatorContact.Teaching_experience
                        expArr.forEach((item) => {
                            teachExpValue.value = item.object_id;
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
                            placesLivedValue.value.push(obj)
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
                            placesTraveledValue.value.push(obj)
                        })
                    }

                    // if (educatorContact.languages) {
                    //     let languagesArr = educatorContact.languages
                    //     let languagesOptionsData = this.languageOptionsData
                    //     let a = []
                    //     languagesArr.forEach(item => {
                    //         let b = languagesOptionsData.filter(option => item.object_id == option.id)
                    //
                    //         if (item.object_score) {
                    //             b[0]['level'] = item.object_score;
                    //             if (item.object_score == 1) {
                    //                 b[0]['level_name'] = 'Native';
                    //             }
                    //             if (item.object_score == 2) {
                    //                 b[0]['level_name'] = 'Fluent';
                    //             }
                    //             if (item.object_score == 3) {
                    //                 b[0]['level_name'] = 'Conversational';
                    //             }
                    //             if (item.object_score == 4) {
                    //                 b[0]['level_name'] = 'Beginner';
                    //             }
                    //
                    //         }
                    //
                    //         a = a.concat(b)
                    //
                    //     })
                    //
                    //     this.selectedLanguageList = a
                    //
                    // }

                    // if (educatorContact.Location) {
                    //     let locationArr = educatorContact.Location;
                    //
                    //     locationArr.forEach((item) => {
                    //
                    //         if (item.object_id == 0) {
                    //
                    //             this.selectLocationList.push(item.object_en)
                    //
                    //         } else {
                    //             let obj = {
                    //                 id: item.object_id,
                    //                 pid: item.object_pid,
                    //                 object_en: item.object_en,
                    //                 object_cn: item.object_cn
                    //             }
                    //             this.selectLocationList.push(obj)
                    //
                    //         }
                    //
                    //     })
                    //
                    // }

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

                    if (educatorContact.Prefered_Work_Schedule_Type) {
                        let objArr = educatorContact.Prefered_Work_Schedule_Type;
                        objArr.forEach((item) => {
                            workScheduleTypeValue.value = item.object_id
                        })
                    }

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

                    // if (educatorContact.region) {
                    //
                    //     let regionArr = educatorContact.region;
                    //
                    //     regionArr.forEach((item) => {
                    //
                    //         if (item.object_id == 0) {
                    //             this.selectRegionList.push(item.object_en)
                    //         } else {
                    //             let obj = {
                    //                 id: item.object_id,
                    //                 pid: item.object_pid,
                    //                 object_en: item.object_en,
                    //                 object_cn: item.object_cn
                    //             }
                    //             this.selectRegionList.push(obj)
                    //         }
                    //
                    //     })
                    // }

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

                    // if (educatorContact.images) {
                    //     console.log(educatorContact.images)
                    //
                    //     let userImages = educatorContact.images
                    //     if (userImages.length > 0) {
                    //         let userImagesArr = []
                    //         userImages.forEach(item => {
                    //             let userImageObj = {
                    //                 name: '',
                    //                 url: item.url
                    //             }
                    //             userImagesArr.push(userImageObj)
                    //         })
                    //         this.accountImageFileList = []
                    //         this.accountImageFileList = userImagesArr
                    //         console.log(this.accountImageFileList)
                    //
                    //     }
                    //
                    // }

                    if (educatorContact.work_info) {
                        workExpData.value = educatorContact.work_info
                    }


                    // this.initProfileLoadingStatus = false;

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

        const deleteTempWorkExp = (item, i) => {
            console.log(item)
            let temp = this.workExpTempData
            temp.splice(i, 1)
        }

        const editTempWorkExp = (item, i) => {
            editWorkExpIndex.value = i;
            workExpDialogVisible.value = true;
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

        const subCategoryOptions = ref([])
        const subCategoryValue = ref()
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

        onMounted(() => {
            loadUserObjectData()
            loadSubCategoryData()

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

            getBasicInfo()

        })

        const verificationVisible = ref(false)

        function confirmDelete() {
            verificationVisible.value = true
        }

        return {
            personalForms,
            personalForm,
            personalRules,

            profileForms,
            profileForm,
            profileRules,
            verificationVisible,
            confirmDelete,
            expandKeysData,
            addExpandKeys,
            nationalityOptions,
            phoneCodeOptions,
            jobSeekingOptions,
            jobSeekingValue,
            subCategoryOptions,
            subCategoryValue,
            professionForms,
            professionForm,
            professionRules,
            workDestinationValue,
            workDestinationOptions,
            workScheduleTypeValue,
            workScheduleTypeOptions,
            jobTypeValue,
            jobTypeOptions,
            benefitsValue,
            benefitsOptions,
            subjectValue,
            subjectOptions,
            ageToTeachValue,
            ageToTeachOptions,
            saveProfession,
            teachExpValue,
            teachExpOptions,
            placesTraveledValue,
            placesTraveledOptions,
            placesLivedValue,
            placesLivedOptions,
            workExpData,
            workExpTempData,
            editWorkExpIndex,
            editExistWorkExpStatus,
            workExpDialogVisible,
            submitWorkExpLoadingValue,
            workExpForms,
            workExpForm,
            workExpRules,
            workExpDialogWidth,
            showWorkExpDialog,
            saveWorkExpTemp,
            deleteWorkExp,
            editWorkExp,
            deleteTempWorkExp,
            editTempWorkExp,
            submitWorkExpForm,
            educationDialogWidth,
            birthdayDisabledDate,
            savePastExp,
            pastExpForms,
            pastExpForm,
            pastExpRules,
            certificationsValue,
            certificationsOptions
        }
    }
}
</script>

<style scoped>

.profile-bg {
    height: calc(var(--i-window-height) - 144px);
    display: flex;
    flex-direction: column;
}

.profile-scrollbar {
    height: calc(var(--i-window-height) - 220px);;
}

.profile-collapse {

}

.profile-collapse-t {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 40px 40px 0 40px;;
    cursor: pointer;
}

.profile-collapse-t-label span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #101828;
}

.profile-collapse-t-line {
    width: calc(100% - 200px);
    height: 1px;
    background-color: #D0D5DD;
}

.profile-top-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 40px 40px 0 40px;
    border-bottom: 1px solid #D0D5DD;
}

.profile-label {

}

.profile-label span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.profile-tips {
    padding-bottom: 24px;
}

.profile-tips span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
}

.profile-form {
    margin: 24px 40px;
}

.delete-container {
    border-top: 1px solid #D0D5DD;
    margin: auto 40px 40px 40px;
    padding: 27px 27px 0 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.delete-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;

    color: #101828;
}

.delete-tips {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    color: #667085;
}

.profile-picture-r {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

.profile-picture-upload {
    margin-left: 20px;
}

.profile-picture-tips {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #667085;
}

.work-form-item {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
}

.work-form-item-l {
    width: 110px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;

    color: #101828;
}


.work-form-item-r {
    width: calc(100% - 120px);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #667085;
}

.work-exp-btn-container {
    text-align: right;
    margin-top: 30px;
}

.work-experience {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
}

.work-exp-temp-container {
    width: 100%;
    margin-top: 24px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.work-exp-temp-item {
    width: 314px;
    padding: 16px;
    background: #FFFFFF;
    border: 1px solid #D0D5DD;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin: 0 24px 24px 0;
}

.work-exp-temp-btn-container {
    text-align: right;
    margin-top: 14px;
}

.work-exp-temp-btn {
    /*font-size: 20px;*/
}


.duration-mobile-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
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


/*forms*/
.form-width-388 {
    width: 388px;
}

.form-width-100 {
    width: 100px;
}

.form-width-percent-100 {
    width: 100%;
}

.form-item-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

</style>
