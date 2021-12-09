<template>
  <div class="bg" v-loading="showLoadingStatus">
    <el-row class="bg-container" align="top" justify="center">
      <el-col class="detail-container-col" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="detail-container">
          <div class="detail-title">{{ detailData.title }}</div>
          <div class="detail-banner-image-container">
            <el-image class="detail-banner-image" :src="detailData.image_url"></el-image>
          </div>
          <div class="detail-options-container">
            <div class="detail-category">{{ detailData.cate_name_en }}</div>
            <div class="detail-tags">{{ detailData.tags }}</div>
            <div class="detail-date">{{ detailData.c_time }}</div>
            <div class="detail-comment-num">{{ detailData.comment_nums }}</div>
            <div class="detail-author">{{ detailData.user_name }}</div>
          </div>
          <div class="detail-content" v-html="detailData.content"/>
          <div class="social-share-container">

            <div class="social-share-icon-container"
                 @click="showSocialShareExpandStatus = !showSocialShareExpandStatus"
                 @mouseover="showSocialShareExpandStatus=true" >
              <el-icon size="30">
                <Share />
              </el-icon>
            </div>

            <div class="social-share-icon-expand" v-if="showSocialShareExpandStatus">
              <ShareNetwork
                  network="Twitter"
                  :url="locationUrl"
                  :title="detailData.title == undefined ? '' : detailData.title"
                  :hashtags="detailData.tags == undefined ? '' : detailData.tags"
              >
                <i class="iconfont el-icon-alitwitter xll-icon"></i>
              </ShareNetwork>
              <ShareNetwork
                  network="LinkedIn"
                  :url="locationUrl"
                  :title="detailData.title == undefined ? '' : detailData.title"
              >
                <i class="iconfont el-icon-alilinkedin xll-icon"></i>
              </ShareNetwork>
              <ShareNetwork
                  network="Facebook"
                  :url="locationUrl"
                  :title="detailData.title == undefined ? '' : detailData.title"
                  :description="detailData.content == undefined ? '' : detailData.content"
                  :quote="detailData.title == undefined ? '' : detailData.title"
                  :hashtags="detailData.tags == undefined ? '' : detailData.tags"
              >
                <i class="iconfont el-icon-alifacebook xll-icon"></i>
              </ShareNetwork>
            </div>

          </div>
        </div>
        <div class="comment-container">
          <div class="comment-list-container" v-if="detailData.comment">
            <div class="comment-item" v-for="(item,i) in detailData.comment" :key="i">
              <div class="comment-item-l">
                <el-avatar :size="80"> {{item.name}}</el-avatar>
              </div>
              <div class="comment-item-r">
                <div class="comment-item-r-t">{{item.name}}</div>
                <div class="comment-item-r-b">{{item.content}}</div>
              </div>
            </div>
          </div>

          <div class="comment-form-container">
            <div class="comment-label">Leave a comment</div>
            <div class="comment-tips">Your email will not be published</div>
            <div class="comment-form">
              <el-form
                  ref="basicForm"
                  :model="basicForm"
                  :rules="basicRules"
                  label-width="120px"
                  label-position="top"
                  class="demo-ruleForm"
              >
                <el-form-item  prop="content">
                  <el-input v-model="basicForm.content" type="textarea" placeholder="Comment Content"></el-input>
                </el-form-item>
                <div class="comment-name-email-container">
                  <el-form-item  prop="name">
                    <el-input v-model="basicForm.name" placeholder="Name"></el-input>
                  </el-form-item>
                  <el-form-item  prop="email">
                    <el-input v-model="basicForm.email" placeholder="Email"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" round @click="submitForm('basicForm')">
                      Post
                    </el-button>
                  </el-form-item>
                </div>

              </el-form>

            </div>
          </div>


        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <!--        featuredJobs jobs    -->
        <featuredJobs></featuredJobs>
        <!--        latest industry articles-->
        <latestIndustryNews></latestIndustryNews>
      </el-col>

    </el-row>
  </div>
</template>

<script>

import {BLOG_DETAIL, BLOG_LIST, ADD_BLOG_COMMENT} from "@/api/api";

import featuredJobs from "@/components/featuredJobs";
import latestIndustryNews from "@/components/latestIndustryNews";

export default {
  name: "detail",
  data() {
    return {
      showSocialShareExpandStatus:false,
      locationUrl:'',
      showLoadingStatus: false,
      detailData: {},
      basicForm: {
        blog_id:undefined,
        content: '',
        name: '',
        email: '',
        image_url:'',
        token: localStorage.getItem('token')
      },
      basicRules: {
        content: [
          {
            required: true,
            message: 'Please input',
            trigger: 'blur',
          }
        ],
        name: [
          {
            required: true,
            message: 'Please input',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'Please input',
            trigger: 'blur',
          },
        ]


      }

    }
  },
  components: {
    featuredJobs,
    latestIndustryNews
  },
  setup() {

  },
  created() {
    let id = this.$route.query.id;
    this.getBlogDetail(id)
    this.locationUrl = window.location.href;
  },
  mounted() {


  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         this.basicForm.blog_id = this.$route.query.id
          let params = Object.assign({}, this.basicForm)
          ADD_BLOG_COMMENT(params).then(res => {
            console.log(res)
            if (res.code == 200) {
                console.log('a')
            }
          }).catch(err=>{
            console.log(err)
            this.$message.error(err.msg)
          })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getBlogDetail(id) {
      let params = {
        id: id
      }

      BLOG_DETAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.detailData = res.message
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    getBlogList() {
      let params = {
        page: 1,
        limit: 5
      }

      BLOG_LIST(params).then(res => {
        console.log(res)
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    }

  }


}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.bg-container {
  width: 1100px;
  margin: 0 auto;
  padding-top: 40px;
}

.detail-container-col {
  padding: 20px;
}

.detail-container {
  padding: 20px;
  border-radius: 20px;
  background-color: #FFFFFF;
}

.detail-title {
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  color: #398AAD;
}

.detail-banner-image-container {
  margin-top: 20px;
}

.detail-banner-image {
  border-radius: 20px;
}

.detail-content {
  font-size: 14px;

}

.detail-content >>> img {
  width: 100%;
}


.detail-options-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0;
  font-size: 14px;
  color: #888888;
}

.detail-category {

}

.detail-tags {
  margin-left: 20px;
}

.detail-date {
  margin-left: 20px;
}

.detail-comment-num {
  margin-left: 20px;
}

.detail-author {
  margin-left: 20px;
}

.comment-container{
  background-color: #FFFFFF;
  padding: 20px;
  margin-top: 20px;

  border-radius: 20px;
}
.comment-list-container{
  padding: 10px;
}

.comment-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  padding: 20px;
  border-bottom: 1px solid #EEEEEE;
}

.comment-item-l{
  width: 20%;
}

.comment-item-r{
  width: 80%;
  text-align: left;
}

.comment-item-r-t{
  font-size: 14px;
  font-weight: bold;
}
.comment-item-r-b{
  font-size: 14px;
  color: #808080;
}

.comment-form-container{
  margin-top: 20px;
  padding: 20px;
}
.comment-label{
  text-align: left;
  font-size: 14px;
  font-weight: bold;
}
.comment-tips{
  font-size: 14px;
  color: #888888;
  text-align: left;
  padding-bottom: 20px;
}

.comment-name-email-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.social-share-container{
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
}

.social-share-icon-container{
  width: 40px;
  height: 40px;
  border: 2px solid #1E7AA2;
  background-color: #FFFFFF;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.social-share-icon-expand{
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.social-share-icon-expand>>>a{
  margin-left: -6px;
  background-color: #FFFFFF;
  width: 40px;
  height: 40px;
  border: 2px solid #000000;
  display: flex;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.xll-icon{
  font-size: 30px;
}

</style>
