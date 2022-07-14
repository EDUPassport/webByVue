<template>
  <div class="bg">
    <div class="favorites-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="list-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="purchase-btn-contianer">
            <el-button plain round @click="turnBack()" >Back</el-button>
          </div>

          <div class="redeem-container">
            <div class="container">
              <div class="ads-banner" v-if="adCategoryDetail.ad_category">
                <el-image class="ads-banner-image" :src="adCategoryDetail.ad_category.image_url" ></el-image>
              </div>

              <div class="ads-desc" v-if="adCategoryDetail.ad_category">
                <div class="ads-desc-1">Description:</div>
                <div class="ads-desc-2">
                  {{adCategoryDetail.ad_category.desc_en}}
                </div>
              </div>

              <div class="ads-wrap">
                <div class="ads-upload">
                  <el-upload
                      drag
                      class="resume-uploader"
                      action=""
                      :headers="uploadHeaders"
                      :show-file-list="true"
                      :http-request="bannerHttpRequest"
                      :before-upload="beforeUpload"
                  >
                    <el-icon class="el-icon--upload" :size="80">
                      <upload-filled  />
                    </el-icon>
                    <div class="el-upload__text">
                      Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        Upload your banner
                      </div>
                    </template>
                    <!--    <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                  </el-upload>

                </div>
                <div v-if="bannerImageUrl">
                  <el-image :src="bannerImageUrl"></el-image>
                </div>

              </div>
              <!--
              educator profile 1
              business profile 2
              vendor profile 3
              jobs 4
              deals 5
              vendor_events 6
              business_events 7
              other 8
              -->
              <div class="ads-link">
                <div class="ads-link-title">I would like to link my banner to:</div>
                <div class="ads-link-tabs" v-if="identity==0">
                  <div class="ads-link-tab"
                       :class="adsTabValue == 8 ? 'ads-tab-active' : '' " @click="adsTabEvent(8)">
                    Others
                  </div>
                </div>
                <div class="ads-link-tabs" v-if="identity==1">
                  <div class="ads-link-tab"
                       :class="adsTabValue == 8 ? 'ads-tab-active' : '' " @click="adsTabEvent(8)">
                    Others
                  </div>
                </div>
                <div class="ads-link-tabs" v-if="identity==2">
                  <div class="ads-link-tab"
                       :class="adsTabValue == 4 ? 'ads-tab-active' : '' " @click="adsTabEvent(4)">
                    My Job
                  </div>
                  <div class="ads-link-tab"
                       :class="adsTabValue == 2 ? 'ads-tab-active' : '' " @click="adsTabEvent(2)">
                    My Company
                  </div>
                  <div class="ads-link-tab"
                       :class="adsTabValue == 8 ? 'ads-tab-active' : '' " @click="adsTabEvent(8)">
                    Others
                  </div>
                </div>
                <div class="ads-link-tabs" v-if="identity==3">
                  <div class="ads-link-tab"
                       :class="adsTabValue == 5 ? 'ads-tab-active' : '' " @click="adsTabEvent(5)">
                    My Deals
                  </div>
                  <div class="ads-link-tab"
                       :class="adsTabValue == 6 ? 'ads-tab-active' : '' " @click="adsTabEvent(6)">
                    My Events
                  </div>
                  <div class="ads-link-tab"
                       :class="adsTabValue == 3 ? 'ads-tab-active' : '' " @click="adsTabEvent(3)">
                    My Profile
                  </div>
                  <div class="ads-link-tab"
                       :class="adsTabValue == 8 ? 'ads-tab-active' : '' " @click="adsTabEvent(8)">
                    Others
                  </div>
                </div>

                <div class="ads-link-tab-content">

                  <div class="ads-jobs" v-if="adsTabValue == 4">
                    <div class="ads-job" v-for="(item,index) in myApprovedJobsData" :key="index"
                         :class="item.id==typeId ? 'link-active' : ''" @click="selectLinkTypeId(item.id)">
                      <div class="ads-job-title">{{item.job_title}}</div>
                      <div class="ads-job-salary">{{item.currency}} {{item.salary_min}} - {{item.salary_max}}</div>
                    </div>

                    <div class="ads-jobs-pg">
                      <div class="ads-jobs-pg-l">
                        <el-button :disabled="jobPage==1" type="info" @click="prevJobs()">
                          Prev
                        </el-button>
                      </div>
                      <div class="ads-jobs-pg-m">
                        {{jobCurrentPage}} / {{jobLastPage}}
                      </div>
                      <div class="ads-jobs-pg-r">
                        <el-button :disabled="jobPage == jobLastPage" type="info" @click="nextJobs()">
                          Next
                        </el-button>
                      </div>
                    </div>
                  </div>

                  <div class="ads-deals" v-if="adsTabValue == 5">
                    <div class="ads-deal" v-for="(item,index) in myDealsData" :key="index"
                         :class="item.id==typeId ? 'link-active' : ''" @click="selectLinkTypeId(item.id)">
                      <div class="ads-deal-title">{{item.title}}</div>
                    </div>
                  </div>

                  <div class="ads-events" v-if="adsTabValue == 6">
                    <div class="ads-event" v-for="(item,index) in myEventsData" :key="index"
                         :class="item.id==typeId ? 'link-active' : ''" @click="selectLinkTypeId(item.id)">
                      <div class="ads-event-name">{{item.name}}</div>
                    </div>
                  </div>

                  <div class="ads-others" v-if="adsTabValue == 8">

                    <el-form
                        :model="basicForm"
                        :rules="basicRules"
                        ref="basicForm"
                        label-width="160px"
                        label-position="top"
                        class="demo-ruleForm"
                    >
                      <el-form-item label="Name" prop="name" required>
                        <el-input size="medium" placeholder="Name" v-model="basicForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="Contact #" prop="contact" required>
                        <el-input size="medium" placeholder="Contact #" v-model="basicForm.contact"></el-input>
                      </el-form-item>
                      <el-form-item label="Wechat ID" prop="wx_id" required>
                        <el-input size="medium" placeholder="Wechat ID" v-model="basicForm.wx_id"></el-input>
                      </el-form-item>
                    </el-form>
                  </div>

                </div>
              </div>

              <div class="ads-submit">
                <el-button class="ads-submit-btn" type="primary" @click="submit()">Submit</el-button>
              </div>

            </div>
          </div>


          <div class="ads-container">
            <el-image :src="dashboardAdsImg"></el-image>
          </div>

        </el-col>
      </el-row>
    </div>

    <xllLoading :show="uploadLoadingStatus" @onCancel="cancelUpload()"></xllLoading>
  </div>
</template>

<script>
import xllLoading from '@/components/xllLoading';
import {EVENTS_MY_EVENT, MY_DEALS, MY_JOBS, SET_USER_ADS, UPLOAD_BY_ALI_OSS, UPLOAD_BY_SERVICE} from "@/api/api";
import dashboardAdsImg from '@/assets/ads/2.png'
import meSideMenu from "@/components/meSideMenu"
import {decode} from 'js-base64'
import ImageCompressor from 'compressorjs'



export default {
  name: "redeem",
  components: {
    meSideMenu,
    xllLoading
  },
  data() {
    return {
      uploadLoadingStatus:false,
      dashboardAdsImg,
      uploadActionUrl: process.env.VUE_APP_UPLOAD_ACTION_URL,
      uploadHeaders: {
        platform: 4
      },
      uploadData: {
        token: localStorage.getItem('token')
      },

      identity: 0,

      jobPage: 1,
      jobLimit: 5,
      jobLastPage: 0,
      jobCurrentPage: 0,
      myApprovedJobsData: [],
      myDealsData: [],
      myEventsData: [],
      dealPage: 1,
      dealLimit: 100,
      dealLastPage: 0,
      eventPage: 1,
      eventLimit: 100,
      eventLastPage: 0,

      basicForm: {
        name: "",
        contact: '',
        wx_id: ''
      },
      basicRules: {
        name: [
          {required: true, message: 'Please fill out your name.', trigger: 'blur'}
        ],
        contact: [
          {required: true, message: 'Please enter your contact', trigger: 'blur'}
        ],
        wx_id: [
          {required: false, message: 'Please enter your wechat id', trigger: 'blur'}
        ]
      },

      adsTabValue: 0,
      type: 0,
      typeId: 0,
      bannerImageUrl: '',
      adCategoryDetail:{}

    }
  },
  mounted() {
    let info = this.$route.query.info
    let infoDecode = decode(info)
    this.adCategoryDetail = JSON.parse(infoDecode)
    // console.log(this.adCategoryDetail)
    let identity = localStorage.getItem('identity');
    this.identity = identity;
    if (identity == 2) {
      this.getJobListApproved(this.jobPage, this.jobLimit);
    }
    if (identity == 3) {
      this.getDealsList(this.dealPage, this.dealLimit);
      this.getEventsList(this.eventPage, this.eventLimit);
    }
  },
  methods: {
    turnBack(){
      this.$router.push('/me/ads')
    },
    bannerHttpRequest(options){
      let self = this;
      // console.log(options)
      new ImageCompressor(options.file,{
        quality:0.6,
        success(file) {
          // console.log(file)
          const formData = new FormData();

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
                self.bannerImageUrl = myFileUrl

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

          }

          if(isInChina === 'no'){
            formData.append('file',file,file.name)
            UPLOAD_BY_SERVICE(formData).then(res=>{
              // console.log(res)
              if(res.code == 200){
                let myFileUrl = res.message.file_path;
                self.uploadLoadingStatus = false;
                self.bannerImageUrl = myFileUrl

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

          }

        },
        error(err){
          console.log(err.message)
        }

      })

    },
    beforeUpload(file) {
      this.uploadLoadingStatus = true;
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M
    },
    cancelUpload(){
      this.uploadLoadingStatus = false;
    },
    // 获取我发布的已审核通过的职位列表
    getJobListApproved(page, limit) {
      let token = localStorage.getItem('token');

      let data = {
        token: token,
        page: page,
        limit: limit,
        status: 0
      }
      MY_JOBS(data).then(res => {
        // console.log(res)
        if (res.code == 200) {
          let jobData = res.message.data;
          this.jobLastPage = res.message.last_page;
          this.jobCurrentPage = res.message.current_page;
          this.myApprovedJobsData = jobData;

        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })
    },
    getDealsList(page, limit) {
      let data = {
        token:localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      MY_DEALS(data).then(res => {
        console.log(res);

        if (res.code == 200) {
          this.myDealsData = res.message.data;

        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err);
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })
    },
    getEventsList(page, limit) {
      let data = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      EVENTS_MY_EVENT(data).then(res => {
        console.log(res);

        if (res.code == 200) {
          this.myEventsData = res.message.data;
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err);
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })
    },
    submit() {
      let adCategoryDetail = this.adCategoryDetail;

      let type = this.adsTabValue;
      let typeId = this.typeId;
      let imageUrl = this.bannerImageUrl;

      let adCategoryId = adCategoryDetail.ad_category_id;
      let myAdsId = adCategoryDetail.id;

      if (imageUrl == '') {
        return this.$message.error(
            'Please upload your banner'
        )
      }

      let data = {
        ad_category_id: adCategoryId,
        my_ads_id:myAdsId,
        type: type,
        type_id: typeId,
        image_url: imageUrl,
        token: localStorage.getItem('token')
      }

      if (type == 8) {
        this.$refs['basicForm'].validate((valid) => {
          if (valid) {
            data.name = this.basicForm.name;
            data.contact = this.basicForm.contact;
            data.wx_id = this.basicForm.wx_id;

          } else {
            console.log('error submit!!')
            this.submitLoginLoadingStatus = false
            return false
          }
        })

      }

      SET_USER_ADS(data).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })

    },
    adsTabEvent(value) {
      // var self = this;
      this.adsTabValue = value;
      this.typeId = 0;
      if (value == 2 || value == 3 ) {
        this.typeId = localStorage.getItem('uid');
      }
      if (value == 8) {
        console.log('8')
      }

    },
    selectLinkTypeId(typeId) {
      this.typeId = typeId;
    },
    prevJobs() {
      this.jobPage--;
      if (this.jobPage <= 1) {
        this.jobPage = 1;
      }
      this.getJobListApproved(this.jobPage, this.jobLimit)
    },
    nextJobs() {
      this.jobPage++;
      if (this.jobPage >= this.jobLastPage) {
        this.jobPage = this.jobLastPage;
      }
      this.getJobListApproved(this.jobPage, this.jobLimit)
    }


  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.favorites-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.list-col{
  padding: 0 20px;
}

.redeem-container{
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  margin-top: 10px;
}
.container {}

.ads-banner {
  width: 80%;
  margin: 0 auto;
}

.ads-banner-image {
  width: 100%;
  border-radius: 20px;
}

.ads-desc {
  width: 96%;
  margin: 20px auto 0;
}

.ads-desc-1 {
  font-size: 16px;
  font-weight: 700;
}

.ads-desc-2 {
  margin-top: 10px;
  font-size: 14px;
  line-height: 24px;
}

.ads-upload {
  width: 400px;
  margin: 0 auto;
}

.ads-wrap {
  margin-top: 40px;
  text-align: center;
}

.ads-link {
  width: 94%;
  margin: 20px auto 0;
  padding-bottom: 40px;
}

.ads-link-title {
  font-size: 16px;
}

.ads-link-tabs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 20px;
}

.ads-link-tab {
  margin-left: 10px;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: rgba(0, 180, 210, 0.2);
  text-align: center;
  border-radius: 20px;
  font-size: 14px;
  cursor:pointer;
}

.ads-link-tab-content {
  margin-top: 20px;
}

.ads-jobs {
  border: 1px solid #EEEEEE;
  padding: 20px;
  border-radius: 20px;
}

.ads-job {
  border: 1px solid #EEEEEE;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 0 0 30px 0 rgba(43, 86, 112, .1);
}

.ads-job-title {
  font-size: 16px;
  font-weight: 700;
}

.ads-job-salary {
  font-size: 14px;
  color: #00B3D2;
  font-weight: 700;
}

.ads-jobs-pg {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.ads-jobs-pg-l {
  flex:1;
  text-align: left;
}

.ads-jobs-pg-l button {
  background-color: #B1C452;
  color: #FFFFFF;
  font-size: 14px;
}

.ads-jobs-pg-m {
  flex:1;
  font-size: 14px;
  text-align: center;
}

.ads-jobs-pg-r {
  flex:1;
  text-align: right;
}

.ads-jobs-pg-r button {
  background-color: #00B3D2;
  color: #FFFFFF;
  font-size: 14px;
}

.ads-deals {
  border: 1px solid #EEEEEE;
  padding: 20px;
  border-radius: 20px;
}

.ads-deal {
  border: 1px solid #EEEEEE;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 0 0 30px 0 rgba(43, 86, 112, .1);
}

.ads-deal-title {
  font-size: 16px;
  font-weight: 700;
}

.ads-events {
  border: 1px solid #EEEEEE;
  padding: 20px;
  border-radius: 20px;
}

.ads-event {
  border: 1px solid #EEEEEE;
  padding: 20px;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 0 0 30px 0 rgba(43, 86, 112, .1);
}

.ads-event-name {
  font-size: 16px;
  font-weight: 700;
}

.ads-others {
  border: 1px solid #EEEEEE;
  padding: 20px;
  border-radius: 20px;
}

.ads-tab-active {
  background-color: #00CE47;
  color: #FFFFFF;
}

.ads-submit {
  width: 80%;
  margin: 20px auto 40px;
  text-align: center;
}

.ads-submit-btn {
  font-size: 16px;
}

.link-active {
  background-color: #00CE47;
  color: #FFFFFF;
}

.ads-container {
  margin-top: 20px;
  text-align: center;
}

</style>