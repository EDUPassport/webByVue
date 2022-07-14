<template>
  <div class="bg">
    <div class="basic-container">
      <profileTitle :i="i" :action="action"></profileTitle>

      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" v-if="sideMenuStatus">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="basic-r-container" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="basic-breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/educator/profile' }">Profile</el-breadcrumb-item>
              <el-breadcrumb-item>Educator Contact Information</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="basic-form">
            <el-form
                ref="basicForm"
                :model="basicForm"
                :rules="basicRules"
                label-width="120px"
                label-position="top"
                class="demo-ruleForm"
            >
              <el-form-item label="Display Name" prop="name">
                <template #label>
                  Display Name (This is what platform users will actually see)
                </template>
                <el-input v-model="basicForm.name" placeholder="Display Name"></el-input>
              </el-form-item>
              <el-form-item label="Phone #" prop="phone">
                <el-input v-model="basicForm.phone" placeholder="Phone #"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="email">
                <el-input v-model="basicForm.email" placeholder="Email"></el-input>
              </el-form-item>
              <el-form-item label="Address" prop="address">
                <el-input v-model="basicForm.address" placeholder="Address"></el-input>
              </el-form-item>
              <el-form-item label="Job Title" prop="job_title">
                <el-input v-model="basicForm.job_title" placeholder="Job Title"></el-input>
              </el-form-item>
              <el-form-item label="About You" prop="bio">
                <el-input type="textarea" v-model="basicForm.bio" placeholder="Introduction"></el-input>
              </el-form-item>

              <el-form-item label="Nationality">
                <el-select v-model="basicForm.nationality"
                           filterable
                           placeholder="Select your nationality">
                  <el-option v-for="(item,i) in nationalityOptions" :key="i" :label="item.name"
                             :value="item.name"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Job Seeking">
                <el-switch v-model="basicForm.is_seeking"></el-switch>
              </el-form-item>
              <el-form-item label="Public Profile">
                <el-switch v-model="basicForm.is_public"></el-switch>
              </el-form-item>

              <el-form-item label="Education Type(Up to 3)">
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

            </el-form>

          </div>

          <div class="submit-btn-container">
            <el-button type="primary"
                       class="submit-btn"
                       :loading="submitLoadingValue"
                       @click="submitForm('basicForm')">
              Submit
            </el-button>
          </div>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import meSideMenu from "@/components/meSideMenu";
import profileTitle from "@/components/profileTitle";
import {
  SUB_CATE_LIST,
  EDUCATOR_CONTACT_EDIT_V2,
  ZOHO_SYNC,
  USER_INFO_BY_TOKEN_V2,
  USER_INFO_VISITOR_V2, SWITCH_IDENTITY_V2, USER_MENU_LIST,
  USER_SUB_IDENTITY_V2
} from '@/api/api'
import {countriesData} from "@/utils/data";
import {decode} from "js-base64";

export default {
  name: "basic",
  components: {
    meSideMenu,
    profileTitle
  },
  data() {
    return {
      submitLoadingValue:false,
      sideMenuStatus:true,
      basicForm: {
        name: '',
        resume_pdf: '',
        video_url:'',
        phone:'',
        email: '',
        address:'',
        bio:'',
        is_seeking: 0,
        is_public: 0,
        job_title:'',
        sub_identity_id:'',
        sub_identity_name_cn:'',
        sub_identity_name_en:'',
        hobbies:'',
        nationality: '',
        background_image:''
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
        email: [
          {
            type: 'email',
            required: true,
            message: 'Please input email',
            trigger: 'blur',
          },
        ],
        job_title: [
          {
            required: true,
            message: 'Please input job title',
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
      educatorContact:{},
      i:0,
      action:''

    }
  },
  async mounted() {
    // console.log(countriesData)
    // this.getSubCateList()

    await this.getSubIdentityList()

    let str = this.$route.query.s;

    if(str){
      let strObj = JSON.parse(decode(str))

      // console.log(str)
      this.i = strObj.i;
      this.action = strObj.action;

      if(strObj.action == 'add'){
        this.sideMenuStatus = false;
        await this.getBasicInfo(strObj.i)
      }

      if(strObj.action == 'edit'){
        await this.getBasicInfo(strObj.i)
      }

    }

  },
  methods: {
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
            if(res.code == 200){
              this.submitLoadingValue = false;
              if(action == 'edit'){
                // this.$router.go(-1)
                this.$store.commit('username',this.basicForm.name)
                this.$router.push('/educator/profile')
              }else{
                localStorage.setItem('company_id', res.message.educator_id)

                this.$store.commit('allIdentityChanged',true )

                let uid = localStorage.getItem('uid')

                this.getUserMenuList(uid,1, res.message.educator_id, uid)

                this.changeIdentity(res.message.educator_id,res.message.user_id)

              }

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
    getUserMenuList(uid,identity,companyId,createUid){

      let params = {
        user_id: uid,
        identity: identity,
        company_id: companyId,
        create_user_id: createUid,
        page:1,
        limit:1000
      }

      USER_MENU_LIST(params).then(res=>{
        // console.log(res)
        if(res.code === 200){
          let pcAllData = res.message.pc;
          let sData = pcAllData.filter(item=>item.identity == identity)
          this.$store.commit('menuData', sData)
          localStorage.setItem('menuData',JSON.stringify(sData))
        }

      }).catch(err=>{
        console.log(err)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(e) {
      console.log(e)
    },
    async getSubIdentityList(){
      let params = {
        pid: 1,
        tree: 1
      }

      await USER_SUB_IDENTITY_V2(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.subCateOptions = res.message
        }
      }).catch(err=>{
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
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
      }).catch(err=>{
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
    changeIdentity(companyId,companyContactId,language){
      let self = this;
      let params = {
        identity:1,
        company_id:companyId,
        company_contact_id:companyContactId,
        language:language
      }
      SWITCH_IDENTITY_V2(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          localStorage.setItem('identity',1)
          self.$store.commit('identity',1)
          this.$store.commit('username',this.basicForm.name)
          this.$store.commit('allIdentityChanged',true)

          this.$router.push({path:'/overview',query:{identity:1}})
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getVisitorInfo(uid,identity) {

      let params = {
        user_id:uid,
        identity:identity
      }

      USER_INFO_VISITOR_V2(params).then(res => {
        console.log(res)
        if(res.code == 200){

          let educatorContact = res.message.user_contact.educator_contact;

          if(educatorContact.name){
            this.basicForm.name = educatorContact.name;
          }

          this.basicForm.name = educatorContact.name;
          if(educatorContact.resume_pdf){
            this.basicForm.resume_pdf = educatorContact.resume_pdf
          }

          if(educatorContact.background_image){
            this.basicForm.background_image = educatorContact.background_image
          }

          if(educatorContact.video_url){
            this.basicForm.video_url = educatorContact.video_url
          }

          if(educatorContact.phone){
            this.basicForm.phone = educatorContact.phone
          }

          if(educatorContact.email){
            this.basicForm.email = educatorContact.email ;
          }

          if(educatorContact.address){
            this.basicForm.address = educatorContact.address
          }

          if(educatorContact.bio){
            this.basicForm.bio = educatorContact.bio
          }

          if(educatorContact.is_seeking){
            this.basicForm.is_seeking = educatorContact.is_seeking;
          }

          if(educatorContact.is_public){
            this.basicForm.is_public = educatorContact.is_public;
          }

          if(educatorContact.job_title){
            this.basicForm.job_title = educatorContact.job_title;
          }

          if(educatorContact.hobbies){
            this.basicForm.hobbies = educatorContact.hobbies;
          }

          if(educatorContact.nationality){
            this.basicForm.nationality = educatorContact.nationality;
          }


          let subIdentityStr = educatorContact.sub_identity_id
          let subCateOptions = this.subCateOptions

          if(subIdentityStr){
            if(subIdentityStr.length>1){
              let subIdentityArr = subIdentityStr.split(',')
              let subData = []
              subIdentityArr.forEach(item=>{
                let cateValue = subCateOptions.filter(value => value.id == item)
                // console.log(cateValue)
                subData.push( cateValue[0] )
              })
              this.selectEducatorTypeList = subData

            }

          }

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    async getBasicInfo() {

      let params = {
        identity:1
      }

      await USER_INFO_BY_TOKEN_V2(params).then(res => {
        console.log(res)
        if(res.code == 200){

          let educatorContact = res.message.user_contact.educator_contact;
          let userContact = res.message.user_contact;

          if(educatorContact.name){
            this.basicForm.name = educatorContact.name;
          }else{
            this.basicForm.name = userContact.first_name + ' ' + userContact.last_name;
          }

          if(educatorContact.resume_pdf){
            this.basicForm.resume_pdf = educatorContact.resume_pdf
          }

          if(educatorContact.background_image){
            this.basicForm.background_image = educatorContact.background_image
          }

          if(educatorContact.video_url){
            this.basicForm.video_url = educatorContact.video_url
          }

          if(educatorContact.phone){
            this.basicForm.phone = educatorContact.phone
          }

          if(educatorContact.email){
            this.basicForm.email = educatorContact.email ;
          }else{
            this.basicForm.email = userContact.email;
          }

          if(educatorContact.address){
            this.basicForm.address = educatorContact.address
          }

          if(educatorContact.bio){
            this.basicForm.bio = educatorContact.bio
          }

          if(educatorContact.is_seeking){
            this.basicForm.is_seeking = educatorContact.is_seeking;
          }

          if(educatorContact.is_public){
            this.basicForm.is_public = educatorContact.is_public;
          }

          if(educatorContact.job_title){
            this.basicForm.job_title = educatorContact.job_title;
          }

          if(educatorContact.hobbies){
            this.basicForm.hobbies = educatorContact.hobbies;
          }

          if(educatorContact.nationality){
            this.basicForm.nationality = educatorContact.nationality;
          }


          let subIdentityStr = educatorContact.sub_identity_id
          let subCateOptions = this.subCateOptions

          if(subIdentityStr){
            if(subIdentityStr.length>1){
              let subIdentityArr = subIdentityStr.split(',')
              let subData = []
              subIdentityArr.forEach(item=>{
                let cateValue = subCateOptions.filter(value => value.id == item)
                // console.log(cateValue)
                subData.push( cateValue[0] )
              })
              this.selectEducatorTypeList = subData

              // this.basicForm.sub_identity_name_en = educatorContact.sub_identity_name_en
              // this.basicForm.sub_identity_name_cn = educatorContact.sub_identity_name_cn
            }

          }

        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    async submitEducatorContactForm(){

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let selectTypeList = this.selectEducatorTypeList;
      let educatorTypeIdArr = [];
      selectTypeList.forEach(item => {
        educatorTypeIdArr.push(item.identity_name)
      })

      let sexStr = ''
      if(params.sex == 1){
        sexStr = 'Male'
      }
      if(params.sex == 2){
        sexStr = 'Female'
      }
      if(params.sex == 3){
        sexStr = 'Undisclosed'
      }

      let zohoData = [
        {'zf_referrer_name':''},
        {'zf_redirect_url':''},
        {'zc_gad':''},
        {'SingleLine':userId //UserID
        },
        {'SingleLine1':params.first_name // First Name
        },
        {'SingleLine2':params.last_name //  Last Name
        },
        {'Dropdown':sexStr //  Gender
        },
        {'Date':'' //   Date of Birth dd-MMM-yyyy
        },
        {'SingleLine3':'' //   Title
        },
        {'Email':params.email //   Email
        },
        {'PhoneNumber_countrycode':'' //   Phone
        },
        {'SingleLine4':params.nationality //   Nationality
        },
        {'Dropdown1':'' //   Membership Type
        },
        {'MultiLine':'' //   Languages Spoken
        },
        {'Number':'' //   Membership Duration
        },
        {'SingleLine5':'' //   City
        },
        {'SingleLine6':'' //   Province
        },
        {'SingleLine7':'' //   Country
        },
        {'Dropdown2':educatorTypeIdArr.join(',') //   Educator Type
        },
        {'MultiLine1':'' //   Education
        },
        {'MultiLine2':'' //    Work History
        },
        {'Dropdown3':'' //    Teaching Experience
        },
        {'MultiLine3':'' //   Certifications
        },
        {'MultiLine4':'' //   Educator Intro
        },
        {'Website':this.educatorInfo.profile_photo //   Contact image Link
        },
        {'Website1':'' //   Intro Video Link
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
    async submitCompanyContactForm(){

      let params = Object.assign({}, this.basicForm)
      let userId = localStorage.getItem('uid')

      let zohoData = [
        {'zf_referrer_name':''},
        {'zf_redirect_url':''},
        {'zc_gad':''},
        {'SingleLine':userId  //UserID
        },
        {'SingleLine1':params.first_name  // First Name
        },
        {'SingleLine2':params.last_name  //  Last Name
        },
        {'Dropdown':params.sex  //  Gender
        },
        {'Date':''  //   Date of Birth dd-MMM-yyyy params.birthday
        },
        {'SingleLine3':''  //   Title
        },
        {'Email':params.email  //   Email
        },
        {'PhoneNumber_countrycode':''  //   Phone
        },
        {'SingleLine4':params.nationality  //   Nationality
        },
        {'Dropdown1':''  //   Membership Type
        },
        {'Number':''  //   Membership Duration
        },
        {'SingleLine5':''  //   City
        },
        {'SingleLine6':''  //   Province
        },
        {'SingleLine7':''  //   Country
        },
        {'Website':this.educatorInfo.profile_photo //   Contact image Link
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

    }

  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.basic-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.basic-r-container {
  padding: 20px;
}
.basic-breadcrumb-container{
  padding: 10px;
}
.basic-form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
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
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
}

.tag-active {
  background-color: #00b3d2;
  color: #FFFFFF;
}

.submit-xll-container{
  text-align: center;
}

.submit-btn-container{
  text-align: center;
  margin-top:40px;
}
.submit-btn{
  width:40%;
}

</style>