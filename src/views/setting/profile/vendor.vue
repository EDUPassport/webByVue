<template>
    <div class="profile-bg">

        <el-scrollbar class="profile-scrollbar">
            <div class="profile-collapse">

                <div class="profile-collapse-t" @click="addExpandKeys(1)">
                    <div class="profile-collapse-t-label"><span>Basic Information</span></div>
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
                                    <span>Basic Information</span>
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
                                               @click="saveStepOne(basicForms)">
                                        Save & Continue
                                    </el-button>

                                </template>

                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="basicForms"
                                    :model="basicForm"
                                    :rules="basicRules"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Business Name" prop="company_name">
                                    <el-input
                                            class="form-width-388"
                                            :disabled="stepOneStatus"
                                            v-model="basicForm.company_name"
                                            placeholder="Enter your company Name"></el-input>
                                </el-form-item>
                                <el-form-item label="Address">
                                    <el-input v-model="basicForm.address"
                                              :disabled="stepOneStatus"
                                              class="form-width-388"
                                              placeholder="Street name,building,apartment">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Website">
                                    <el-input v-model="basicForm.website"
                                              class="form-width-388"
                                              :disabled="stepOneStatus"
                                              placeholder="https://">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Location">

                                    <div class="xll-form-location-exist" v-if="haveLocationStatus">

                                        <span>{{ $filters.countryInfoFormat(countryInfo) }}</span>
                                        <el-button
                                            link
                                            :disabled="stepOneStatus"
                                            @click="changeEditLocation()">
                                            Edit
                                        </el-button>

                                    </div>

                                    <div class="xll-form-location-no-exist" v-else>
                                        <el-select v-model="countryObj"
                                                   class="form-width-388 form-margin-bottom-18"
                                                   :disabled="stepOneStatus"
                                                   @change="countryChange"
                                                   value-key="id"
                                                   filterable
                                                   placeholder="Select Country">
                                            <el-option v-for="(item,i) in countryOptions"
                                                       :key="i"
                                                       :label="item.name"
                                                       :value="item">
                                            </el-option>
                                        </el-select>
                                        <template v-if="provinceOptions.length>0">
                                            <el-select v-model="provinceObj"
                                                       class="form-width-388 form-margin-bottom-18"
                                                       :disabled="stepOneStatus"
                                                       value-key="id"
                                                       filterable
                                                       @change="provinceChange"
                                                       placeholder="Select Province">
                                                <el-option v-for="(item,i) in provinceOptions"
                                                           :key="i"
                                                           :label="item.name"
                                                           :value="item">
                                                </el-option>
                                            </el-select>
                                        </template>
                                        <template v-if="cityOptions.length>0">
                                            <el-select v-model="cityObj"
                                                       :disabled="stepOneStatus"
                                                       class="form-width-388 form-margin-bottom-18"
                                                       value-key="id"
                                                       filterable
                                                       @change="cityChange"
                                                       placeholder="Select City">
                                                <el-option v-for="(item,i) in cityOptions"
                                                           :key="i"
                                                           :label="item.name"
                                                           :value="item">
                                                </el-option>
                                            </el-select>
                                        </template>

                                        <el-button
                                            v-if="changeCancelLocation"
                                            link
                                            :disabled="stepOneStatus"
                                            @click="changeCancelLocation()">
                                            Cancel
                                        </el-button>

                                    </div>

                                </el-form-item>

                            </el-form>
                        </div>

                    </div>

                </el-collapse-transition>
            </div>

            <div class="profile-collapse">

                <div class="profile-collapse-t" @click="addExpandKeys(2)">
                    <div class="profile-collapse-t-label"><span>Contact Information</span></div>
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
                                    <span>Contact Information</span>
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
                                               @click="saveStepTwo(contactForms)">
                                        Save & Continue
                                    </el-button>

                                </template>

                            </div>
                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="contactForms"
                                    :model="contactForm"
                                    :rules="contactRules"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >
                                <el-form-item label="Contact Name" prop="display_name">
                                    <el-input
                                            class="form-width-388"
                                            :disabled="stepTwoStatus"
                                            v-model="contactForm.display_name"
                                            placeholder="Name that will be visible to others">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Job title" prop="job_title">
                                    <el-input
                                        class="form-width-388"
                                        :disabled="stepTwoStatus"
                                        v-model="contactForm.job_title"
                                        placeholder="Enter Job title here"></el-input>
                                </el-form-item>

                                <el-form-item label="E-mail Address" prop="work_email">
                                    <el-input class="form-width-388"
                                              v-model="contactForm.work_email"
                                              :disabled="stepTwoStatus"
                                              placeholder="Enter your E-mail">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="Phone No">
                                    <div class="form-item-container">

                                        <el-input v-model="contactForm.work_phone"
                                                  :disabled="stepTwoStatus"
                                                  class="form-width-388"
                                                  oninput="value=value.replace(/[^\d]/g,'')"
                                                  maxlength="15"
                                                  placeholder="Phone #">
                                            <template #prepend>
                                                <el-select v-model="contactForm.country_code"
                                                           :disabled="stepTwoStatus"
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
                                                   :src="contactForm.profile_photo"></el-avatar>

                                        <el-upload
                                                class="profile-picture-upload"
                                                drag
                                                action=""
                                                :headers="uploadHeaders"
                                                :show-file-list="false"
                                                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                                                :http-request="profilePhotoHttpRequest"
                                                :before-upload="beforeProfilePhotoUpload"
                                                :disabled="stepTwoStatus"
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

                <div class="profile-collapse-t" @click="addExpandKeys(3)">
                    <div class="profile-collapse-t-label"><span>Business Information</span></div>
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
                                    <span>Business Information</span>
                                </div>
                                <div class="profile-tips">
                                    <span>Update your personal Information and Photo Here</span>
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
                                               @click="saveStepThree(businessForms)">
                                        Save & Continue
                                    </el-button>

                                </template>

                            </div>

                        </div>

                        <div class="profile-form">
                            <el-form
                                    ref="businessForms"
                                    :model="businessForm"
                                    :rules="businessRules"
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >

                                <el-form-item label="Category">

                                    <el-checkbox-group :disabled="stepThreeStatus"
                                                       v-model="businessForm.sub_category"
                                                       class="form-width-388"
                                                       :max="1">
                                        <template v-for="(item,i) in subCategoryOptions" :key="i">

                                            <el-checkbox v-if="item['children'].length === 0" :label="item">
                                                {{ item.identity_name }}
                                            </el-checkbox>

                                            <el-checkbox v-for="(child,key) in item['children']" :key="key"
                                                         :label="item">
                                                {{ child.identity_name }}
                                            </el-checkbox>

                                        </template>

                                    </el-checkbox-group>

                                </el-form-item>

                                <el-form-item label="Registration Certificate">
                                    <template #label>
                                        <div>
                                            <div>
                                                Registration Certificate
                                            </div>
                                            <div class="profile-picture-tips">
                                                Registration Certificate for Company
                                            </div>
                                        </div>
                                    </template>

                                    <div class="profile-picture-r">

                                        <template v-if="businessForm.business_reg_img && editBusinessRegImgStatus">

                                            <div class="attachment-xll">
                                                <div class="attachment-xll-btns">
                                                    <div class="attachment-xll-btn">
                                                        <div class="attachment-xll-btn-l">
                                                            <el-icon color="#667085">
                                                                <IconIcomoonFreeAttachment/>
                                                            </el-icon>
                                                            {{ businessForm.business_reg_img_name }}
                                                        </div>
                                                        <div class="attachment-xll-btn-r">
                                                            <el-icon class="attachment-xll-icon"
                                                                     v-if="!stepThreeStatus"
                                                                     @click="handleSingleImageRemove('business_reg_img')"
                                                                     color="#F97066">
                                                                <Delete></Delete>
                                                            </el-icon>
                                                        </div>

                                                    </div>
                                                    <div class="attachment-xll-btn-edit"
                                                         v-if="!stepThreeStatus"
                                                         @click="handleEditMedia('business_reg_img')"
                                                    >
                                                        <el-icon class="attachment-xll-icon">
                                                            <IconUilEdit/>
                                                        </el-icon>
                                                    </div>
                                                    <div class="attachment-xll-btn-download"
                                                         @click="handleDownloadMedia(businessForm.business_reg_img)"
                                                    >
                                                        <el-icon class="attachment-xll-icon">
                                                            <IconUisDownloadAlt/>
                                                        </el-icon>
                                                    </div>
                                                </div>

                                                <div class="attachment-xll-image">
                                                    <el-image class="attachment-xll-img"
                                                              :src="businessForm.business_reg_img"
                                                              fit="cover"
                                                    >
                                                    </el-image>
                                                    <div class="attachment-xll-image-mask" v-if="!stepThreeStatus">
                                                        <el-icon
                                                                style="cursor: pointer;"
                                                                @click="handleSingleImagePreview(businessForm.business_reg_img,'business_reg_img')"
                                                                color="#ffffff"
                                                                :size="20">
                                                            <zoom-in/>
                                                        </el-icon>

                                                        <el-icon
                                                                style="cursor: pointer;margin-left: 15px;"
                                                                @click="handleSingleImageRemove('business_reg_img')"
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
                                                    :disabled="stepThreeStatus"
                                                    action=""
                                                    :limit="1"
                                                    :headers="uploadHeaders"
                                                    :show-file-list="false"
                                                    accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                                                    :http-request="businessRegImgHttpRequest"
                                                    :before-upload="beforeBusinessRegImgUpload"
                                            >
                                                <template #trigger>
                                                    <div class="attachment-btn">
                                                        <span>Attach files</span>
                                                        <el-icon color="#667085">
                                                            <IconIcomoonFreeAttachment/>
                                                        </el-icon>
                                                    </div>
                                                </template>

                                            </el-upload>
                                        </template>
                                    </div>

                                </el-form-item>

                                <el-form-item label="License">
                                    <template #label>
                                        <div>
                                            <div>
                                                License
                                            </div>
                                            <div class="profile-picture-tips">
                                                License for Company
                                            </div>
                                        </div>
                                    </template>

                                    <div class="profile-picture-r">

                                        <template v-if="businessForm.license && editLicenseStatus">

                                            <div class="attachment-xll">
                                                <div class="attachment-xll-btns">
                                                    <div class="attachment-xll-btn">
                                                        <div class="attachment-xll-btn-l">
                                                            <el-icon color="#667085">
                                                                <IconIcomoonFreeAttachment/>
                                                            </el-icon>
                                                            {{ businessForm.license_name }}
                                                        </div>
                                                        <div class="attachment-xll-btn-r">
                                                            <el-icon class="attachment-xll-icon"
                                                                     v-if="!stepThreeStatus"
                                                                     @click="handleSingleImageRemove('license')"
                                                                     color="#F97066">
                                                                <Delete></Delete>
                                                            </el-icon>
                                                        </div>

                                                    </div>
                                                    <div class="attachment-xll-btn-edit"
                                                         v-if="!stepThreeStatus"
                                                         @click="handleEditMedia('license')"
                                                    >
                                                        <el-icon class="attachment-xll-icon">
                                                            <IconUilEdit/>
                                                        </el-icon>
                                                    </div>
                                                    <div class="attachment-xll-btn-download"
                                                         @click="handleDownloadMedia(businessForm.license)"
                                                    >
                                                        <el-icon class="attachment-xll-icon">
                                                            <IconUisDownloadAlt/>
                                                        </el-icon>
                                                    </div>
                                                </div>

                                                <div class="attachment-xll-image">
                                                    <el-image class="attachment-xll-img"
                                                              :src="businessForm.license"
                                                              fit="cover"
                                                    >
                                                    </el-image>
                                                    <div class="attachment-xll-image-mask" v-if="!stepThreeStatus">
                                                        <el-icon
                                                                style="cursor: pointer;"
                                                                @click="handleSingleImagePreview(businessForm.license,'license')"
                                                                color="#ffffff"
                                                                :size="20">
                                                            <zoom-in/>
                                                        </el-icon>

                                                        <el-icon
                                                                style="cursor: pointer;margin-left: 15px;"
                                                                @click="handleSingleImageRemove('license')"
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
                                                    :disabled="stepThreeStatus"
                                                    action=""
                                                    :limit="1"
                                                    :headers="uploadHeaders"
                                                    :show-file-list="false"
                                                    accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                                                    :http-request="licensePhotoHttpRequest"
                                                    :before-upload="beforeLicensePhotoUpload"
                                            >
                                                <template #trigger>
                                                    <div class="attachment-btn">
                                                        <span>Attach files</span>
                                                        <el-icon color="#667085">
                                                            <IconIcomoonFreeAttachment/>
                                                        </el-icon>
                                                    </div>
                                                </template>

                                            </el-upload>
                                        </template>
                                    </div>

                                </el-form-item>

                                <el-form-item label="Year of establishment">
                                    <el-date-picker
                                            v-model="businessForm.year_founded"
                                            :disabled="stepThreeStatus"
                                            type="year"
                                            format="YYYY"
                                            value-format="YYYY"
                                            placeholder="eg, 1890"
                                            :disabledDate="birthdayDisabledDate"
                                            class="form-width-388"
                                    ></el-date-picker>
                                </el-form-item>

                            </el-form>
                        </div>

                    </div>

                </el-collapse-transition>
            </div>

            <div class="profile-collapse">

                <div class="profile-collapse-t" @click="addExpandKeys(5)">
                    <div class="profile-collapse-t-label"><span>Business Details</span></div>
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
                                    <span>Business Details</span>
                                </div>
                                <div class="profile-tips">
                                    <span>Attach files for your Business</span>
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
                                    label-width="220px"
                                    label-position="left"
                                    class="demo-ruleForm"
                            >

                                <el-form-item label="Description">
                                    <el-input
                                        class="form-width-388"
                                        :disabled="stepFiveStatus"
                                        v-model="mediaForm.desc"
                                        type="textarea"
                                        :rows="6"
                                        placeholder="Description*">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="Company Logo">
                                    <template #label>
                                        <div>
                                            <div>
                                               Company Logo
                                            </div>
                                            <div class="profile-picture-tips">
                                                Attach Image for Logo
                                            </div>
                                        </div>
                                    </template>

                                    <div class="profile-picture-r">

                                        <template v-if="mediaForm.logo && editLogoStatus">

                                            <div class="attachment-xll">
                                                <div class="attachment-xll-btns">
                                                    <div class="attachment-xll-btn">
                                                        <div class="attachment-xll-btn-l">
                                                            <el-icon color="#667085">
                                                                <IconIcomoonFreeAttachment/>
                                                            </el-icon>
                                                            {{ mediaForm.logo_name }}
                                                        </div>
                                                        <div class="attachment-xll-btn-r">
                                                            <el-icon class="attachment-xll-icon"
                                                                     v-if="!stepFiveStatus"
                                                                     @click="handleSingleImageRemove('logo')"
                                                                     color="#F97066">
                                                                <Delete></Delete>
                                                            </el-icon>
                                                        </div>
                                                    </div>

                                                    <div class="attachment-xll-btn-edit"
                                                         v-if="!stepFiveStatus"
                                                         @click="handleEditMedia('logo')"
                                                    >
                                                        <el-icon class="attachment-xll-icon">
                                                            <IconUilEdit/>
                                                        </el-icon>
                                                    </div>
                                                    <div class="attachment-xll-btn-download"
                                                         @click="handleDownloadMedia(mediaForm.logo)"
                                                    >
                                                        <el-icon class="attachment-xll-icon">
                                                            <IconUisDownloadAlt/>
                                                        </el-icon>
                                                    </div>
                                                </div>

                                                <div class="attachment-xll-image">
                                                    <el-image class="attachment-xll-img"
                                                              :src="mediaForm.logo"
                                                              fit="cover"
                                                    >
                                                    </el-image>
                                                    <div class="attachment-xll-image-mask"
                                                         v-if="!stepFiveStatus"
                                                    >
                                                        <el-icon
                                                                style="cursor: pointer;"
                                                                @click="handleSingleImagePreview(mediaForm.logo,'logo')"
                                                                color="#ffffff"
                                                                :size="20">
                                                            <zoom-in/>
                                                        </el-icon>

                                                        <el-icon
                                                                style="cursor: pointer;margin-left: 15px;"
                                                                @click="handleSingleImageRemove('logo')"
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
                                                    :disabled="stepFiveStatus"
                                                    action=""
                                                    :limit="1"
                                                    :headers="uploadHeaders"
                                                    :show-file-list="false"
                                                    accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                                                    :http-request="logoHttpRequest"
                                                    :before-upload="beforeLogoUpload"
                                            >

                                                <template #trigger>
                                                    <div class="attachment-btn">
                                                        <span>Attach files</span>
                                                        <el-icon color="#667085">
                                                            <IconIcomoonFreeAttachment/>
                                                        </el-icon>
                                                    </div>
                                                </template>

                                            </el-upload>
                                        </template>
                                    </div>

                                </el-form-item>

                                <el-form-item label="Background Image">
                                    <template #label>
                                        <div>
                                            <div>
                                                Background Image
                                            </div>
                                            <div class="profile-picture-tips">
                                                Attach Image for background banner
                                            </div>
                                        </div>
                                    </template>

                                    <div class="profile-picture-r">

                                        <template v-if="mediaForm.background_image && editBackgroundImageStatus">

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
                                                    <div class="attachment-xll-btn-edit"
                                                         v-if="!stepFiveStatus"
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
                                                </div>

                                                <div class="attachment-xll-image">
                                                    <el-image class="attachment-xll-img"
                                                              :src="mediaForm.background_image"
                                                              fit="cover"
                                                    >
                                                    </el-image>
                                                    <div class="attachment-xll-image-mask" v-if="!stepFiveStatus">
                                                        <el-icon
                                                                style="cursor: pointer;"
                                                                @click="handleSingleImagePreview(mediaForm.background_image,'background_image')"
                                                                color="#ffffff"
                                                                :size="20">
                                                            <zoom-in/>
                                                        </el-icon>

                                                        <el-icon
                                                                style="cursor: pointer;margin-left: 15px;"
                                                                @click="handleSingleImageRemove('background_image')"
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
                                                    :disabled="stepFiveStatus"
                                                    action=""
                                                    :limit="1"
                                                    :headers="uploadHeaders"
                                                    :show-file-list="false"
                                                    accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                                                    :http-request="backgroundHttpRequest"
                                                    :before-upload="beforeBackgroundPhotoUpload"
                                            >

                                                <template #trigger>
                                                    <div class="attachment-btn">
                                                        <span>Attach files</span>
                                                        <el-icon color="#667085">
                                                            <IconIcomoonFreeAttachment/>
                                                        </el-icon>
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
                                                Video
                                            </div>
                                            <div class="profile-picture-tips">
                                                Attach Introduction video for your profile
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
                                                    <div class="attachment-xll-btn-edit"
                                                         v-if="!stepFiveStatus"
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
                                                    <div class="attachment-btn">
                                                        <span>Attach files</span>
                                                        <el-icon color="#667085">
                                                            <IconIcomoonFreeAttachment/>
                                                        </el-icon>
                                                    </div>
                                                </template>

                                            </el-upload>

                                        </template>
                                    </div>

                                </el-form-item>

                                <el-form-item label="Account Files">
                                    <template #label>
                                        <div>
                                            <div>
                                                Account Files
                                            </div>
                                            <div class="profile-picture-tips">
                                                Attach your account files for your profile
                                            </div>
                                        </div>
                                    </template>

                                    <div style="flex-direction: column;" class="profile-picture-r">

                                        <el-upload
                                                action=""
                                                :disabled="stepFiveStatus"
                                                :multiple="true"
                                                :auto-upload="false"
                                                :show-file-list="false"
                                                :limit="6"
                                                :headers="uploadHeaders"
                                                name="file[]"
                                                accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
                                                :before-upload="beforeAccountImageUpload"
                                                :on-change="handleAccountImageChange"
                                                :http-request="handleAccountFilesRequest"
                                        >

                                            <template #trigger>
                                                <div class="attachment-btn">
                                                    <span>Attach files</span>
                                                    <el-icon color="#667085">
                                                        <IconIcomoonFreeAttachment/>
                                                    </el-icon>
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

                            </el-form>
                        </div>

                    </div>

                </el-collapse-transition>
            </div>

        </el-scrollbar>

        <div class="delete-container">
            <deleteAccountComponent></deleteAccountComponent>
        </div>

        <el-dialog width="50%" v-model="dialogSingleImageVisible" center>
            <template v-if="singleFieldArr.indexOf(dialogSingleField) !== -1 ">
                <el-image :src="dialogSingleImageUrl"></el-image>
            </template>
            <template v-if="dialogSingleField === 'video_url' ">
                <video :src="dialogSingleImageUrl" controls></video>
            </template>

        </el-dialog>

        <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUploadProfile()"></xllLoading>

    </div>
</template>

<script>
export default {
    name: 'settingProfileVendor'
}
</script>
<script setup>
import ImageCompressor from "compressorjs";
import uploadIcon from '@/assets/newHome/profile/upload-icon.svg'
import defaultAvatarIcon from '@/assets/newHome/profile/default-avatar.svg'
import deleteAccountComponent from "@/components/deleteAccountComponent.vue";
import {ref, reactive, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import arrowDownIcon from '@/assets/newHome/arrow-circle-down.svg'
import arrowUpIcon from '@/assets/newHome/arrow-circle-up.svg'
import {phoneCodeData} from "@/utils/phoneCode";
import {
    ADD_USER_IMG_V2,
    GET_COUNTRY_LIST, VENDOR_COMPANY_EDIT_V2,
    SWITCH_IDENTITY_V2,
    UPLOAD_BY_ALI_OSS,
    UPLOAD_BY_SERVICE,
    UPLOAD_BY_SERVICE_MORE,
    USER_INFO_BY_TOKEN_V2,
    USER_SUB_IDENTITY_V2
} from "@/api/api";
import {updateWindowHeight} from "@/utils/tools";
// import localStorageService from "@/utils/localStorageService";
import xllLoading from "@/components/xllLoading.vue";
import {ElMessage} from 'element-plus'
import {decode} from 'js-base64'

const store = useStore()
const route = useRoute()

const companyId = ref(store.state.currentCompanyId)

const expandKeysData = ref([2, 3, 5])

const addExpandKeys = (value) => {
    let index = expandKeysData.value.indexOf(value)
    if (index === -1) {
        expandKeysData.value.push(value)
    } else {
        expandKeysData.value.splice(index, 1)
    }

}

const singleFieldArr = ['logo', 'business_reg_img', 'license', 'background_image']

const basicForms = ref(null)
const basicForm = reactive({
    company_name: '',
    address: '',
    website: '',
    country_id: '',
    state_id: '',
    town_id: '',
    country_info: ''
})

const basicRules = reactive({
    
})

const contactForms = ref(null)
const contactForm = reactive({
    display_name:'',
    job_title: '',
    work_email: '',
    country_code: '+1',
    work_phone: '',
    profile_photo: defaultAvatarIcon,
})

const contactRules = reactive({
    job_title: [
        {required: false, message: 'Enter Job title here', trigger: 'blur'}
    ]
})

const businessForms = ref(null)
const businessForm = reactive({
    business_reg_img_name: '',
    business_reg_img: '',
    license_name: '',
    license: '',
    year_founded: '',
    sub_category: [],
    category_id: '',
    category_name_en: '',
    category_name_cn: '',
})

const businessRules = reactive({
    category: [
        {required: true, message: 'Please select', trigger: 'blur'}
    ]
})

const mediaForms = ref(null)
const mediaForm = reactive({
    desc:'',
    logo: '',
    logo_name: '',
    background_image_name: '',
    background_image: '',
    video_name: '',
    video_url: ''
})

const mediaRules = reactive({})

const phoneCodeOptions = ref(phoneCodeData)

const countryOptions = ref([])
const provinceOptions = ref([])
const cityOptions = ref([])
const countryName = ref('')
const countryNameCn = ref('')
const provinceName = ref('')
const provinceNameCn = ref('')
const cityName = ref('')
const cityNameCn = ref('')

const countryObj = ref({})
const provinceObj = ref({})
const cityObj = ref({})

const haveLocationStatus = ref(false)
const showLocationCancelStatus = ref(false)
const countryInfo = ref({})
const changeEditLocation = () => {
    haveLocationStatus.value = false;
    showLocationCancelStatus.value = true;

    countryName.value = '';
    countryNameCn.value = '';

    provinceName.value = '';
    provinceNameCn.value = '';

    cityName.value = '';
    cityNameCn.value = '';
}

const changeCancelLocation = () => {
    haveLocationStatus.value = true;
    showLocationCancelStatus.value = false;

    // let companyInfo = this.companyInfo;
    //
    // if (companyInfo.country_info) {
    //     let countryInfoArr = JSON.parse(companyInfo.country_info)
    //     countryName.value = countryInfoArr.country_name_en;
    //     countryNameCn.value = countryInfoArr.country_name_cn;
    //     provinceName.value = countryInfoArr.province_name_en;
    //     provinceNameCn.value = countryInfoArr.province_name_cn;
    //     cityName.value = countryInfoArr.city_name_en;
    //     cityNameCn.value = countryInfoArr.city_name_cn;
    //     contactForm.country_info = companyInfo.country_info;
    // }
}

const countryChange = (e) => {
    contactForm.state_id = undefined
    contactForm.town_id = undefined

    provinceOptions.value = []
    cityOptions.value = []

    contactForm.country_id = e.id
    countryName.value = e.name
    countryNameCn.value = e.name
    getAllProvinces(e.id)
}

const provinceChange = (e) => {
    contactForm.town_id = undefined
    cityOptions.value = []

    contactForm.state_id = e.id
    provinceName.value = e.name
    provinceNameCn.value = e.name

    getAllCitys(contactForm.country_id, e.id)
}

const cityChange = (e) => {
    contactForm.town_id = e.id
    cityName.value = e.name
    cityNameCn.value = e.name
}

const getAllCountry = async () => {
    let params = {}
    await GET_COUNTRY_LIST(params).then(res => {
        if (res.code == 200) {
            countryOptions.value = res.message;
        }
    }).catch(err => {
        console.log(err)
        // if(err.msg){
        //     ElMessage.error(err.msg)
        // }
    })
}

const getAllProvinces = (countryId) => {
    let params = {
        country_id: countryId
    }
    GET_COUNTRY_LIST(params).then(res => {
        if (res.code == 200) {
            provinceOptions.value = res.message;
        }
    }).catch(err => {
        console.log(err)
        // ElMessage.error(err.msg)
    })
}

const getAllCitys = (countryId, stateId) => {
    let params = {
        country_id: countryId,
        state_id: stateId
    }
    GET_COUNTRY_LIST(params).then(res => {
        if (res.code == 200) {
            cityOptions.value = res.message;
        }
    }).catch(err => {
        console.log(err)
        // ElMessage.error(err.msg)
    })
}

const getBasicInfo = async () => {

    let params = {
        identity: 4
    }

    await USER_INFO_BY_TOKEN_V2(params).then(res => {

        if (res.code == 200) {

            let userContact = res.message.user_contact;
            let companyInfo = res.message.user_contact.company;

            basicForm.first_name = userContact.first_name
            basicForm.last_name = userContact.last_name

            if (companyInfo.display_name) {
                basicForm.display_name = companyInfo.display_name;
            }
            if (companyInfo.work_email) {
                basicForm.work_email = companyInfo.work_email;
            }

            if (companyInfo.country_code) {
                basicForm.country_code = companyInfo.country_code;
            }

            if (companyInfo.work_phone) {
                basicForm.work_phone = companyInfo.work_phone;
            }

            if (companyInfo.profile_photo) {
                basicForm.profile_photo = companyInfo.profile_photo
            }

            if (companyInfo.company_name) {
                contactForm.company_name = companyInfo.company_name;
            }

            if (companyInfo.job_title) {
                contactForm.job_title = companyInfo.job_title;
            }
            if (companyInfo.desc) {
                contactForm.desc = companyInfo.desc;
            }
            if (companyInfo.address) {
                contactForm.address = companyInfo.address;
            }

            if (companyInfo.website) {
                contactForm.website = companyInfo.website;
            }


            if (companyInfo.lat) {
                contactForm.lat = companyInfo.lat;
            }
            if (companyInfo.lng) {
                contactForm.lng = companyInfo.lng;
            }

            // if(companyInfo.lat && companyInfo.lng){
            //     this.mapCenterValue = [companyInfo.lng, companyInfo.lat]
            // }

            if (companyInfo.country_info) {
                contactForm.country_info = companyInfo.country_info;

                let countryInfoArr = JSON.parse(companyInfo.country_info)

                countryName.value = countryInfoArr.country_name_en;
                countryNameCn.value = countryInfoArr.country_name_cn;
                provinceName.value = countryInfoArr.province_name_en;
                provinceNameCn.value = countryInfoArr.province_name_cn;
                cityName.value = countryInfoArr.city_name_en;
                cityNameCn.value = countryInfoArr.city_name_cn;

                countryInfo.value = companyInfo.country_info;

                haveLocationStatus.value = true;
            }

            if (companyInfo.country_id) {
                contactForm.country_id = companyInfo.country_id;
            }
            if (companyInfo.state_id) {
                contactForm.state_id = companyInfo.state_id;
            }
            if (companyInfo.town_id) {
                contactForm.town_id = companyInfo.town_id;
            }

            businessForm.sub_category = []
            let cateValue = subCategoryOptions.value.filter(value => value.id == companyInfo.category_id)
            businessForm.sub_category = cateValue

            let businessRegImg = companyInfo.business_reg_img
            if (businessRegImg) {
                businessForm.business_reg_img = businessRegImg
                businessForm.business_reg_img_name = businessRegImg.substring(businessRegImg.length - 10)
            }

            let licenseImg = companyInfo.license
            if (licenseImg) {
                businessForm.license = licenseImg
                businessForm.license_name = licenseImg.substring(licenseImg.length - 10)
            }

            if (companyInfo.year_founded) {
                businessForm.year_founded = companyInfo.year_founded.toString();
            }
            
            let logoImg = companyInfo.logo
            if (logoImg) {
                mediaForm.logo = logoImg
                mediaForm.logo_name = logoImg.substring(logoImg.length - 10)
            }

            let backgroundImage = companyInfo.background_image
            if (backgroundImage && backgroundImage !== '0') {
                mediaForm.background_image = backgroundImage
                mediaForm.background_image_name = backgroundImage.substring(backgroundImage.length - 10)
            }

            let videoUrl = companyInfo.video_url
            if (videoUrl) {
                mediaForm.video_url = videoUrl
                mediaForm.video_name = videoUrl.substring(videoUrl.length - 10)
            }

            if (companyInfo.images) {

                let userImages = companyInfo.images
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


        }
    }).catch(err => {
        console.log(err)
    })

}


const subCategoryOptions = ref([])

const loadSubCategoryData = async () => {

    let params = {
        pid: 5,
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

const uploadLoadingStatus = ref(false)
const uploadHeaders = {
    platform: 4
}
const businessRegImgHttpRequest = (options) => {
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
                        businessForm.business_reg_img = myFileUrl
                        businessForm.business_reg_img_name = myFileUrl.substring(myFileUrl.length - 10)
                        uploadLoadingStatus.value = false;
                        editBusinessRegImgStatus.value = true
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
                        businessForm.business_reg_img = myFileUrl
                        businessForm.business_reg_img_name = myFileUrl.substring(myFileUrl.length - 10)
                        uploadLoadingStatus.value = false;
                        editBusinessRegImgStatus.value = true
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

const beforeBusinessRegImgUpload = (file) => {
    uploadLoadingStatus.value = true;
    const isLt2M = file.size / 1024 / 1024 < 20

    if (!isLt2M) {
        ElMessage.error('File size can not exceed 20MB')
    }
    return isLt2M
}

const licensePhotoHttpRequest = (options) => {
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
                        businessForm.license = myFileUrl
                        businessForm.license_name = myFileUrl.substring(myFileUrl.length - 10)
                        uploadLoadingStatus.value = false;
                        editLicenseStatus.value = true
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
                        businessForm.license = myFileUrl
                        businessForm.license_name = myFileUrl.substring(myFileUrl.length - 10)
                        uploadLoadingStatus.value = false;
                        editLicenseStatus.value = true
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

const beforeLicensePhotoUpload = (file) => {
    uploadLoadingStatus.value = true;
    const isLt2M = file.size / 1024 / 1024 < 20

    if (!isLt2M) {
        ElMessage.error('File size can not exceed 20MB')
    }
    return isLt2M
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
                        basicForm.profile_photo = myFileUrl
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
                        basicForm.profile_photo = myFileUrl
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
const logoHttpRequest = (options) => {

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
                        editLogoStatus.value = true
                        mediaForm.logo_name = myFileUrl.substring(myFileUrl.length - 10)
                        mediaForm.logo = myFileUrl
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
                        editLogoStatus.value = true
                        mediaForm.logo_name = myFileUrl.substring(myFileUrl.length - 10)
                        mediaForm.logo = myFileUrl
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

const beforeLogoUpload = (file) => {
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
                        mediaForm.background_image_name = myFileUrl.substring(myFileUrl.length - 10)
                        mediaForm.background_image = myFileUrl
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
        identity: 5,
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

const handleSingleImageRemove = (field) => {

    if (field === 'business_reg_img') {
        businessForm.business_reg_img = ''
        businessForm.business_reg_img_name = ''
    }

    if (field === 'license') {
        businessForm.license = ''
        businessForm.license = ''
    }
    if (field === 'logo') {
        mediaForm.logo = ''
        mediaForm.logo = ''
    }

    if (field === 'background_image') {
        mediaForm.background_image = ''
        mediaForm.background_image_name = ''
    }

    if (field === 'video_url') {
        mediaForm.video_url = ''
        mediaForm.video_name = ''
    }

}

const editLogoStatus = ref(true)
const editBusinessRegImgStatus = ref(true)
const editLicenseStatus = ref(true)
const editBackgroundImageStatus = ref(true)
const editVideoStatus = ref(true)
const editResumeStatus = ref(true)

const handleEditMedia = (field) => {

    if (field === 'logo') {
        editLogoStatus.value = false
    }
    if (field === 'business_reg_img') {
        editBusinessRegImgStatus.value = false
    }

    if (field === 'license') {
        editLicenseStatus.value = false
    }

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

const stepFiveStatus = ref(true)

const stepOneLoadingStatus = ref(false)
const stepTwoLoadingStatus = ref(false)
const stepThreeLoadingStatus = ref(false)

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


const editStepFive = () => {
    stepFiveStatus.value = false
}

const cancelStepOne = () => {
    stepOneStatus.value = true
}

const cancelStepTwo = () => {
    stepTwoStatus.value = true
}
const cancelStepThree = () => {
    stepThreeStatus.value = true
}

const cancelStepFive = () => {
    stepFiveStatus.value = true
}

const profileAction = ref('edit')

const saveStepOne = (formEl) => {
    formEl.validate((valid) => {
        if (valid) {
            stepOneLoadingStatus.value = true
            if (countryName.value || countryNameCn.value
                || provinceName.value || provinceNameCn
                || cityName.value || cityNameCn.value) {
                basicForm.country_info = JSON.stringify({
                    country_name_en: countryName.value,
                    country_name_cn: countryNameCn.value,
                    province_name_en: provinceName.value,
                    province_name_cn: provinceNameCn.value,
                    city_name_en: cityName.value,
                    city_name_cn: cityNameCn.value
                })
            }

            let params =  Object.assign({}, basicForm)

            if (profileAction.value === 'edit') {
                params.id = companyId.value
            }

            VENDOR_COMPANY_EDIT_V2(params).then(res => {
                if (res.code === 200) {
                    // console.log(res)
                    if (profileAction.value === 'add') {
                        companyId.value = res.message.vendor_company_id
                        changeIdentity(res.message.vendor_company_id, 2)

                        setTimeout(function () {
                            stepOneLoadingStatus.value = false
                            stepOneStatus.value = true
                        }, 1500)

                        return;
                    }

                    getBasicInfo()
                    setTimeout(function () {
                        stepOneLoadingStatus.value = false
                        stepOneStatus.value = true
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

            let params = Object.assign({}, contactForm)

            if (profileAction.value === 'edit') {
                params.id = companyId.value
            }

            VENDOR_COMPANY_EDIT_V2(params).then(res => {
                if (res.code === 200) {
                    // console.log(res)

                    if (profileAction.value === 'add') {
                        companyId.value = res.message.vendor_company_id
                        changeIdentity(res.message.vendor_company_id, res.message.user_id, 2)

                        setTimeout(function () {
                            stepTwoLoadingStatus.value = false
                            stepTwoStatus.value = true
                        }, 1500)

                        return;
                    }

                    getBasicInfo()
                    setTimeout(function () {
                        stepTwoLoadingStatus.value = false
                        stepTwoStatus.value = true
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
            let categoryArr = businessForm.sub_category
            if (categoryArr && categoryArr.length) {

                categoryArr.forEach(item => {
                    businessForm.category_id = item.id;
                    businessForm.category_name_en = item.identity_name;
                    businessForm.category_name_cn = item.identity_name_cn;
                })

            }

            let params = Object.assign({}, businessForm)

            if (profileAction.value === 'edit') {
                params.id = companyId.value
            }

            VENDOR_COMPANY_EDIT_V2(params).then(res => {
                if (res.code === 200) {

                    if (profileAction.value === 'add') {
                        companyId.value = res.message.vendor_company_id
                        changeIdentity(res.message.vendor_company_id, 2)
                        setTimeout(function () {
                            stepThreeLoadingStatus.value = false
                            stepThreeStatus.value = true
                        }, 1500)

                        return;
                    }

                    getBasicInfo()

                    setTimeout(function () {
                        stepThreeLoadingStatus.value = false
                        stepThreeStatus.value = true
                    }, 1500)
                }
            }).catch(err => {
                console.log(err)
            })

        } else {
            stepThreeLoadingStatus.value = false
            console.log('submit error')
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

            VENDOR_COMPANY_EDIT_V2(params).then(res => {
                if (res.code === 200) {
                    // console.log(res)
                    if (profileAction.value === 'add') {
                        companyId.value = res.message.vendor_company_id
                        changeIdentity(res.message.vendor_company_id, 2)
                        uploadAccountImages()
                        setTimeout(function () {
                            stepFiveLoadingStatus.value = false
                            stepFiveStatus.value = true
                        }, 1500)
                        return;
                    }

                    uploadAccountImages()
                    getBasicInfo()
                    setTimeout(function () {
                        stepFiveLoadingStatus.value = false
                        stepFiveStatus.value = true
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

const changeIdentity = (companyId, language) => {
    let params = {
        identity: 5,
        company_id: companyId,
        language: language
    }
    SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

            let str = JSON.stringify(res.message)
            localStorage.setItem('menuData', str)
            localStorage.setItem('identity', 5)
            localStorage.setItem('company_id', companyId)

            store.commit('identity', 5)
            store.commit('allIdentityChanged', true)
            store.commit('menuData', res.message)
            store.commit('currentCompanyId', companyId)

            getBasicInfo()

            history.pushState({}, '', '/setting/profile/vendor')

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

    await loadSubCategoryData()
    await getAllCountry()

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

    let str = route.query.s

    if (str) {
        let strObj = JSON.parse(decode(str))

        console.log(strObj)
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

.profile-bg {
    height: calc(var(--i-window-height) - 144px);
    display: flex;
    flex-direction: column;
}

.profile-scrollbar {
    height: calc(var(--i-window-height) - 220px);
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
    margin: auto 40px 40px 40px;
}

.profile-picture-r {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

/deep/ .el-upload-dragger {
    padding: 16px 40px;
    border-style: solid;
}

/deep/ .el-radio__label, /deep/ .el-checkbox__label {
    color: #667085;
    font-weight: 400;
    font-size: 14px;
}

.profile-avatar-img {
    width: 70px;
    height: 70px;
}

.profile-upload-icon {
    width: 40px;
    height: 40px;
}

.profile-upload-text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #667085;
}

.profile-upload-text span {
    font-weight: 700;
    color: #5C41E6;
}

.profile-picture-upload {
    margin-left: 20px;

}

.attachment-btn {
    width: 388px;
    height: 44px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #d0d5dd;
    padding: 1px 11px;
    border-radius: 4px;
}

.attachment-btn span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #667085;
}

.profile-picture-tips {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #667085;
}

.attachment-xll {

}

.attachment-xll-btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}

.attachment-xll-btn {
    width: 388px;
    height: 44px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #d0d5dd;
    padding: 1px 11px;
    border-radius: 4px;
}

.attachment-xll-btn span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #667085;
}

.attachment-xll-btn-edit, .attachment-xll-btn-download {
    height: 44px;
    border: 1px solid #D0D5DD;
    border-radius: 5px;
    padding: 0 16px;
    margin-left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.attachment-xll-icon {
    cursor: pointer;
}

.attachment-xll-image {
    width: 245px;
    position: relative;
    margin-top: 10px;
}

.attachment-xll-img {
    width: 100%;
    height: 100%;
}

.attachment-xll-image-mask {
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

.attachment-xll-image:hover .attachment-xll-image-mask {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.xll-form-location-exist {

}

.xll-form-location-exist span {
    font-size: 14px;
    font-weight: 400;
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
    color: #667085;
}

.xll-form-location-no-exist {
    flex-direction: column;
    display: flex;
}

/*forms*/
.form-margin-bottom-18 {
    margin-bottom: 18px;
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