<template>
  <div class="bg">
    <div class="educator-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <accountInfo :info="vendorInfo" :phone="basicUserInfo.phone"></accountInfo>
          <div class="educator-r-container">
            <div class="basic-info-container">
              <div class="basic-info-t">
                <div class="basic-info-label">Basic Info</div>
                <div class="basic-info-edit" @click="editBasicInfo()">Edit</div>
              </div>

              <div class="basic-info-content">
                <div class="basic-info-item">
                  First & Last Name: <span>{{ vendorInfo.first_name }} {{ vendorInfo.last_name }}</span>
                </div>
               
                <div class="basic-info-item" v-if="vendorInfo.wx_id">
                  Wechat ID: <span>{{ vendorInfo.wx_id }}</span>
                </div>
                <div class="basic-info-item" v-if="basicUserInfo.sex">
                  Gender:
                  <span v-if="basicUserInfo.sex == 1">Male</span>
                  <span v-if="basicUserInfo.sex == 2">Female</span>
                  <span v-if="basicUserInfo.sex == 3">No Gender Requirements</span>

                </div>
                <div class="basic-info-item" v-if="vendorInfo.nationality">
                  Nationality: <span>{{ vendorInfo.nationality }}</span>
                </div>
                <div class="basic-info-item" v-if="vendorInfo.job_title">
                  Job Title: <span>{{  vendorInfo.job_title}}</span>
                </div>
                <div class="basic-info-item" v-if="vendorInfo.first_language">
                  Preferred Language: <span>{{ vendorInfo.first_language }}</span>
                </div>
               
              </div>
            </div>

            <div class="languages-container">
              <div class="languages-t">
                <div class="languages-label">Languages</div>
                <div class="languages-edit" @click="editLanguages()">Edit</div>
              </div>
              <div class="languages-content" v-if="vendorInfo.languages">
                <div class="languages-item" v-for="(item,i) in vendorInfo.languages" :key="i">
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

            <div class="vendor-company-container">
              <div class="vendor-company-t">
                <div class="vendor-company-label">Company Information</div>
                <div class="vendor-company-edit" @click="editCompanyInfo()">Edit</div>
              </div>
              <div class="vendor-company-content">

                <div class="legal-info-container">
                  <div class="legal-info-t">
                    <div class="legal-info-label">Company Legal Info</div>
                  </div>

                  <div class="legal-info-content">
                    <div class="legal-info-item" v-if="vendorInfo.vendor_name_en">
                      Company Name: <span>{{ vendorInfo.vendor_name_en }}</span>
                    </div>

                    <div class="legal-info-item" v-if="vendorInfo.legal_company_name">
                      Legal Company Name: <span>{{ vendorInfo.legal_company_name }}</span>
                    </div>

                    <div class="legal-info-item" v-if="vendorInfo.busin_reg_num">
                      Business Registration ID: <span>{{ vendorInfo.busin_reg_num }}</span>
                    </div>
                    <div class="legal-info-item" v-if="vendorInfo.busin_reg_img">
                      Business License:
                      <el-image style="width: 200px" :src="vendorInfo.busin_reg_img"></el-image>
                    </div>
                  </div>
                </div>

                <div class="vendor-info-container">
                  <div class="vendor-info-t">
                    <div class="vendor-info-label">Company General Info</div>
                  </div>

                  <div class="vendor-info-content">
                    <div class="vendor-info-item" v-if="vendorInfo.vendor_bio">
                      Vendor Introduction: <span>{{ vendorInfo.vendor_bio }}</span>
                    </div>

                    <div class="vendor-info-item" v-if="vendorInfo.wechat_public_name">
                      WeChat Official Account ID: <span>{{ vendorInfo.wechat_public_name }}</span>
                    </div>
                    <div class="vendor-info-item" v-if="vendorInfo.website">
                      Website: <span>{{ vendorInfo.website }}</span>
                    </div>
                    <div class="vendor-info-item" v-if="vendorInfo.phone">
                      Phone #: <span>{{  vendorInfo.phone}}</span>
                    </div>
                    <div class="vendor-info-item"
                         v-if="vendorInfo.provinces && vendorInfo.citys && vendorInfo.districts"
                    >
                      Location:
                      <span>{{vendorInfo.provinces.Pinyin}}, {{vendorInfo.citys.Pinyin}}, {{vendorInfo.districts.Pinyin}}</span>
                    </div>
                    <div class="vendor-info-item">
                      Dog Friendly:
                      <el-switch v-model="vendorInfo.is_dog_friendly" :active-value="1" disabled></el-switch>
                    </div>
                    <div class="vendor-info-item">
                      Events:
                      <el-switch v-model="vendorInfo.is_events" :active-value="1" disabled></el-switch>
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
              <div class="logo-photo-container">
                <div class="logo-photo-t">
                  <div class="logo-photo-t-label">Business Logo</div>
                </div>
                <div class="logo-photo-content">
                  <el-upload
                      class="logo-uploader"
                      :action="uploadActionUrl"
                      :headers="uploadHeaders"
                      :data="uploadData"
                      :show-file-list="false"
                      name="file[]"
                      :on-success="handleLogoPhotoSuccess"
                      :before-upload="beforeLogoPhotoUpload"
                  >
                    <el-image v-if="logoPhotoUrl" :src="logoPhotoUrl" class="logo-avatar" ></el-image>
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
              <div class="qrcode-photo-container">
                <div class="qrcode-photo-t">
                  <div class="qrcode-photo-t-label">Qr Code (WeChat Official Account)</div>
                </div>
                <div class="qrcode-photo-content">
                  <el-upload
                      class="qrcode-uploader"
                      :action="uploadActionUrl"
                      :headers="uploadHeaders"
                      :data="uploadData"
                      :show-file-list="false"
                      name="file[]"
                      :on-success="handleQrcodePhotoSuccess"
                      :before-upload="beforeQrcodePhotoUpload"
                  >
                    <el-image v-if="qrcodePhotoUrl" :src="qrcodePhotoUrl" class="qrcode-avatar" ></el-image>
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
  ADD_LANGUAGE_SCORE,ADD_EDU_BASIC,ADD_USER_INFO,ADD_USER_IMG,ADD_VENDOR_BASIC,
  UPDATE_VENDOR_PROFILE} from '@/api/api'

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
      vendorInfo: {},
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

      profilePhotoUrl:'',
      backgroundUrl:'',
      logoPhotoUrl:'',
      qrcodePhotoUrl:'',
      dialogAccountImageUrl:'',
      dialogAccountImageVisible:false,
      accountImageFileList:[],
      introVideoUrl:'',
      resumeUrl:'',

    }
  },
  mounted() {
    this.getVisitorBasicInfo()
    // this.getBasicInfo()
    this.updateVendorProfile()
  },
  methods: {
    updateVendorProfile(){
      let params = {
        token:localStorage.getItem('token')
      }
      UPDATE_VENDOR_PROFILE(params).then(res=>{
        console.log(res)
      })
    },
    editBasicInfo() {
      this.$router.push('/vendor/edit/basic')
    },
    editCompanyInfo(){
      this.$router.push('/vendor/edit/vendorInfo')
    },
    editLegalInfo(){
      this.$router.push('/vendor/edit/legalInfo')
    },
    editVendorInfo(){
      this.$router.push('/vendor/edit/vendorInfo')
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
          if (identity == 3 && res.message.vendor_info) {
            this.vendorInfo = res.message.vendor_info

            if (res.message.vendor_info.languages) {
              this.languagesList = res.message.vendor_info.languages;
            }

            if(res.message.vendor_info.user_images){
              this.userImagesList = res.message.vendor_info.user_images;
            }

            if(res.message.vendor_info.profile_photo){
              this.profilePhotoUrl = res.message.vendor_info.profile_photo
            }
            if(res.message.vendor_info.logo){
              this.logoPhotoUrl = res.message.vendor_info.logo
            }
            if(res.message.vendor_info.wechat_public_qrcode){
              this.qrcodePhotoUrl = res.message.vendor_info.wechat_public_qrcode
            }
            if(res.message.vendor_info.header_photo){
              this.backgroundUrl  = res.message.vendor_info.header_photo
            }
            let userImages = res.message.vendor_info.user_images
            this.accountImageFileList = []
            if(userImages){
              userImages.forEach(item=>{
                let userImageObj = {
                  name:'',
                  url:item.url
                }
                this.accountImageFileList.push(userImageObj)
              })
            }

            let videoUrl = res.message.vendor_info.video_url
            let resumePdf = res.message.vendor_info.resume_pdf
            if(videoUrl){
              this.introVideoUrl = videoUrl
            }
            if(resumePdf){
              this.resumeUrl = resumePdf
            }

          }
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
      }).catch(err=>{
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
      }).catch(err=>{
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
        object_arr: this.languagesObjArr,
        token: localStorage.getItem('token')
      }
      ADD_LANGUAGE_SCORE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.languagesDrawer = false
          this.getVisitorBasicInfo()
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    handleProfilePhotoSuccess(res, file) {
      // console.log(res.data[0]['file_url'])
      this.profilePhotoUrl = URL.createObjectURL(file.raw)
      let params = {
        profile_photo:res.data[0]['file_url'],
        identity:3,
        token:localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    beforeProfilePhotoUpload(file) {

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    handleLogoPhotoSuccess(res, file) {
      // console.log(res.data[0]['file_url'])
      this.logoPhotoUrl = URL.createObjectURL(file.raw)
      let params = {
        logo:res.data[0]['file_url'],
       identity:3,
        token:localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    beforeLogoPhotoUpload(file) {

      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    handleQrcodePhotoSuccess(res, file) {
      // console.log(res.data[0]['file_url'])
      this.qrcodePhotoUrl = URL.createObjectURL(file.raw)
      let params = {
        wechat_public_qrcode:res.data[0]['file_url'],
        token:localStorage.getItem('token')
      }
      // console.log(params)
      ADD_VENDOR_BASIC(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    beforeQrcodePhotoUpload(file) {

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
        identity:3,
        token:localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
        identity:3,
        img:accountImagesArr
      }
      ADD_USER_IMG(params).then(res=>{
        if(res.code == 200){
          this.getVisitorBasicInfo()
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
        identity:3,
        img:accountImagesArr
      }
      ADD_USER_IMG(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.getVisitorBasicInfo()
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    handleIntroVideoSuccess(res, file) {
      // console.log(res)
      this.introVideoUrl = URL.createObjectURL(file.raw)
      let params = {
        video_url:res.data[0]['file_url'],
        identity:3,
        token:localStorage.getItem('token')
      }
      // console.log(params)
      ADD_USER_INFO(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Success')
          this.getVisitorBasicInfo()
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    beforeResumeUpload(file) {
      console.log(file)
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
  padding:10px 20px;
}

.basic-info-container {
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
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
  justify-content: flex-start;
}

.basic-info-item {
  margin: 10px;
  color: #808080;
}

.basic-info-item span {
  color: #000000;
}

.vendor-company-container{
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
}

.vendor-company-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.vendor-company-label{
  font-size: 16px;
  font-weight: bold;
}

.vendor-company-edit{
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.vendor-company-edit:hover {
  color: #00b3d2;
}

.vendor-company-content {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}


.legal-info-container {
  padding: 10px 0;
  text-align: left;
  background-color: #ffffff;
}

.legal-info-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.legal-info-label {
  font-size: 14px;
  font-weight: bold;
  color:#808080;
}

.legal-info-content {
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

.legal-info-item {
  margin: 10px;
  color: #808080;
}

.legal-info-item span {
  color: #000000;
}

.vendor-info-container {
  padding: 10px 0;
  text-align: left;
  background-color: #ffffff;
}

.vendor-info-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.vendor-info-label {
  font-size: 14px;
  font-weight: bold;
  color:#808080;
}

.vendor-info-content {
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
}

.vendor-info-item {
  margin: 10px;
  color: #808080;
}

.vendor-info-item span {
  color: #000000;
}

.languages-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
}

.languages-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.languages-label {
  font-size: 16px;
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

.media-container {
  margin-top: 20px;
  padding: 20px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
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

.logo-photo-container{
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  margin-top: 10px;
}

.logo-photo-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.logo-photo-t-label{
  font-size: 14px;
  font-weight: bold;

}
.logo-photo-content{
  padding: 10px;
}
/deep/ .logo-uploader .el-upload{
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}
/deep/ .logo-uploader .el-upload:hover {
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

.logo-avatar{
  width: 178px;
  height: 178px;
  display: block;
}

.qrcode-photo-container{
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  margin-top: 10px;
}

.qrcode-photo-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.qrcode-photo-t-label{
  font-size: 14px;
  font-weight: bold;

}
.qrcode-photo-content{
  padding: 10px;
}
/deep/ .qrcode-uploader .el-upload{
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}
/deep/ .qrcode-uploader .el-upload:hover {
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

.qrcode-avatar{
  width: 178px;
  height: 178px;
  display: block;
}
</style>