<template>
  <div>
    <ChatComponent></ChatComponent>
    <el-backtop :right="10"  :bottom="74" />
    <el-footer height="auto" class="footer-bg">
      <el-row class="footer-row" :gutter="0" align="top" justify="center">
        <el-col :xs="24" :sm="3" :md="3" :lg="3" :xl="3">
          <div class="esl-logo-container">
            <el-image class="esl-logo" :src="imgLogo"></el-image>
          </div>
          <div class="esl-intro">
            Platform for today's education needs, people, and businesses.
          </div>
        </el-col>
        <el-col :xs="24" :sm="{span:5,offset:1}" :md="{span:5,offset:1}" :lg="{span:5,offset:1}" :xl="{span:5,offset:1}">
          <div class="footer-nav-label">
            Services
          </div>
          <div class="footer-nav-item">
            <router-link to="/jobs">Free Job Posting</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="/deals">Free Deal Posting</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Job Featuring</router-link>
          </div>
          <div class="footer-nav-item" v-if="identity==1 || identity==2 || identity == 3">
            <router-link to="/services/price">Pricing</router-link>
          </div>
          <div class="footer-nav-item">
            <el-link href="weixin://dl/business/?t=6eaAd7x8him">Wechat Mini Program</el-link>
<!--            <router-link to="#">Wechat Mini Program</router-link>-->
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Start-Up Program</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Women Owned Program</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Equal Opportunity Employers</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">More Services</router-link>
          </div>

        </el-col>
        <el-col :xs="24" :sm="{span:4,offset:1}" :md="{span:4,offset:1}" :lg="{span:4,offset:1}" :xl="{span:4,offset:1}">
          <div class="footer-nav-label">
            Consulting
          </div>
          <div class="footer-nav-item">
            <router-link to="/">Marketing & Branding</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="/">Tech Solutions</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="/consulting/foodEducation">Food For Education</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Schedule a Meeting</router-link>
          </div>

        </el-col>
        <el-col :xs="24" :sm="{span:4,offset:1}" :md="{span:4,offset:1}" :lg="{span:4,offset:1}" :xl="{span:4,offset:1}">
          <div class="footer-nav-label">
            Company
          </div>
          <div class="footer-nav-item">
            <router-link to="/about/us">About Us</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="/">Careers</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Meet The Team</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Media Kit</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Community Support</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="/industry/news">Industry News</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="/blog/list">Our Blog</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Sitemap</router-link>
          </div>

        </el-col>
        <el-col :xs="24" :sm="{span:4,offset:1}" :md="{span:4,offset:1}" :lg="{span:4,offset:1}" :xl="{span:4,offset:1}">
          <div class="footer-nav-label">
            Get Help
          </div>
          <div class="footer-nav-item">
            <router-link to="/">Contact Support</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="/">Contact Sales</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Schedule A Demo</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">ESL Passport Academy</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Intro Webinars</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="/privacy/policy">Privacy</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="/privacy/policy">Terms</router-link>
          </div>
          <div class="footer-nav-item">
            <router-link to="#">Feedback</router-link>
          </div>

        </el-col>
      </el-row>

      <el-row class="footer-b" :gutter="0" align="middle" justify="space-between">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="social-media">
            <div class="social-media-item">
              <el-link class="social-media-item-link"
                       href="https://www.eslpassport.com" target="_blank" :underline="false">
                <el-image  class="social-media-item-img" :src="twitterImg"></el-image>
              </el-link>

            </div>
            <div class="social-media-item">
              <el-link class="social-media-item-link"
                       href="https://web.facebook.com/eslpassport/?_rdc=1&_rdr" target="_blank" :underline="false">
                <el-image  class="social-media-item-img" :src="facebookImg"></el-image>
              </el-link>
            </div>
            <div class="social-media-item">
              <el-link class="social-media-item-link"
                       href="https://www.eslpassport.com" target="_blank" :underline="false">
                <el-image  class="social-media-item-img" :src="instagramImg"></el-image>
              </el-link>
            </div>
            <div class="social-media-item">
              <el-link class="social-media-item-link"
                       href="https://www.linkedin.com/company/esl-passport/" target="_blank" :underline="false">
                <el-image class="social-media-item-img" :src="linkedinImg"></el-image>
              </el-link>
            </div>
          </div>

        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="footer-b-tips">
            We are global education change-markers. <span>©2021 ESL Passport</span>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>

<script>
import imgLogo from '@/assets/logo.png'
import twitterImg from '@/assets/footer/twitter.png'
import linkedinImg from '@/assets/footer/linkedin.png'
import facebookImg from '@/assets/footer/facebook.png'
import instagramImg from '@/assets/footer/instagram-fill.png'
import {ADD_SUBSCRIBE_EMAIL} from '@/api/api'
import ChatComponent from '@/components/chat/chat'

export default {
  name: "Footer",
  setup(){

  },
  computed:{
    identity:{
      get(){
        return this.$store.state.identity
      }
    }
  },
  data() {
    return {
      imgLogo,
      twitterImg,
      linkedinImg,
      facebookImg,
      instagramImg,
      subscribeEmail: '',

      ruleForm: {
        email: ''
      },
      rules: {
        email: [
          {required: true, message: 'Please fill out your email address.', trigger: 'blur'}
        ]
      },
      submitLoadingStatus: false,


    }
  },
  components:{
    ChatComponent
  },
  methods:{
    subscribe(){
      let params = {
        email:this.subscribeEmail
      }
      ADD_SUBSCRIBE_EMAIL(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$message.success('Subscribe Success')
          this.subscribeEmail = ''
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },

  }
}
</script>

<style scoped>

.footer-bg {
  background-color: #162028;
  color: #ffffff;
  text-align: left;

}
.footer-row{
  border-bottom: 2px solid #545B61;
  margin: 0 auto;
  padding: 20px 40px;
}
.esl-logo {
  width: 80px;
  height: 80px;
}

.esl-intro{
  font-size: 14px;
  font-weight: bold;
}

.footer-nav-label{
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;

}

.footer-nav-item {
  line-height: 30px;
  font-size: 14px;
}
.footer-nav-item a{
  text-decoration: none;
  color: #C8C8CA;
}

.footer-nav-item a:hover{
  color: #00b3d2;
  border-bottom: 1px solid #00b3d2;
}

.social-media {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
}

.social-media-item {
  margin: 10px;
}

.social-media-item-link{
  text-decoration: none;
}
.social-media-item-img{
  width: 30px;
  height: 30px;
}

.footer-b {
  /*width: 1100px;*/
  margin: 0 auto;
  text-align: left;
  padding: 0px 40px 60px 40px;
}

.footer-b-tips{
  text-align: right;
  font-size: 14px;
}
.footer-b-tips span{
  color: #ADAEB1;
}
@media screen and (min-width: 1200px) {

  .footer-row{
    width: 1100px;
  }
  .footer-b {
    width: 1100px;
  }
}


</style>
