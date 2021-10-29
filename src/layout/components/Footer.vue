<template>
  <div>
    <el-backtop/>
    <el-footer height="auto" class="footer-bg">
      <el-row class="footer-row" :gutter="0" align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="4">
          <div class="esl-logo-container">
            <el-image class="esl-logo" :src="imgLogo"></el-image>
          </div>
          <div class="esl-address">
            58 Howard Street #2 San Francisco
          </div>
          <div class="esl-email">
            contact@homeid.com
          </div>
          <div class="esl-phone">
            (+68)1221 09876
          </div>
          <div class="esl-url">
            <el-link class="esl-url-link"
                     href="https://www.eslpassport.com" target="_blank" :underline="false">
              www.eslpassport.com
            </el-link>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="4">
          <div class="popular-searches">
            Popular Searches
          </div>
          <div class="esl-jobs">
            <router-link to="/jobs">ESL Jobs</router-link>
          </div>
          <div class="esl-deals">
            <router-link to="/deals"> Deals</router-link>
          </div>
<!--          <div class="esl-events">-->
<!--            Events-->
<!--          </div>-->
<!--          <div class="esl-business-list">-->
<!--            Business Listings-->
<!--          </div>-->
<!--          <div class="esl-industry-news">-->
<!--            Industry News-->
<!--          </div>-->
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="4">
          <div class="quick-links">
            Quick links
          </div>
          <div class="terms-of-use">
            Terms of Use
          </div>
          <div class="privacy">
            Privacy Policy
          </div>
<!--          <div class="contact-support">-->
<!--            Contact Support-->
<!--          </div>-->
<!--          <div class="careers">-->
<!--            Careers-->
<!--          </div>-->
        </el-col>
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <div class="sign-up">
            Sign Up for Our Newsletter
          </div>
          <div class="sign-up-tips">
            Subscribe to newsletter to receive exclusive offers and the latest news
          </div>
          <div class="sign-up-form">

            <div class="subscribe-container">
              <el-input
                  v-model="subscribeEmail"
                  placeholder="Email"
                  class="subscribe-input"
              >
                <template #append>
                  <el-button class="subscribe-btn" @click="subscribe()">Subscribe</el-button>
                </template>
              </el-input>
            </div>

            <div class="social-media">
              <div class="social-media-item">
                <el-link class="social-media-item-link"
                         href="https://www.eslpassport.com" target="_blank" :underline="false">
                  <el-image  class="social-media-item-img" :src="twitterImg"></el-image>
                </el-link>

              </div>
              <div class="social-media-item">
                <el-link class="social-media-item-link"
                         href="https://www.eslpassport.com" target="_blank" :underline="false">
                  <el-image  class="social-media-item-img" :src="facebookImg"></el-image>
                </el-link>
              </div>
              <div class="social-media-item">
                <el-link class="social-media-item-link"
                         href="https://www.eslpassport.com" target="_blank" :underline="false">
                  <el-image class="social-media-item-img" :src="linkedinImg"></el-image>
                </el-link>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="footer-b" :gutter="0" align="middle" justify="center">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="9">
          <div class="footer-b-l">
            <div class="footer-b-l-item">Terms of Use</div>
            <div class="footer-b-l-item footer-b-l-item-margin">Privacy Policy</div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="9">

        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>

<script>
import imgLogo from '@/assets/logo.png'
import twitterImg from '@/assets/footer/twitter-footer.png'
import linkedinImg from '@/assets/footer/linkedin-footer.png'
import facebookImg from '@/assets/footer/facebook-footer.png'

export default {
  name: "Footer",
  data() {
    return {
      imgLogo,
      twitterImg,
      linkedinImg,
      facebookImg,
      subscribeEmail: '',
      ruleForm: {
        email: ''
      },
      rules: {
        email: [
          {required: true, message: 'Please fill out your email address.', trigger: 'blur'}
        ]
      },
      submitLoadingStatus: false

    }
  },
  methods:{
    subscribe(){
      console.log('subscribe')
    }
  }
}
</script>

<style scoped>

.footer-bg {
  background-color: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  text-align: left;
  padding: 20px 40px;
}
.footer-row{
  width: 1100px;
  margin: 0 auto;
}
.esl-logo {
  width: 80px;
  height: 80px;
}

.esl-address {
  line-height: 30px;
  font-size: 14px;
}

.esl-email {
  line-height: 30px;
  font-size: 14px;
}

.esl-phone {
  line-height: 30px;
  font-size: 14px;
}

.esl-url-link {
  line-height: 30px;
  font-size: 14px;
  color: #ffffff;
}

.popular-searches {
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;

}

.esl-jobs {
  line-height: 30px;
  font-size: 14px;
}
.esl-jobs a{
  text-decoration: none;
  color: #ffffff;
}
.esl-deals {
  line-height: 30px;
  font-size: 14px;
}
.esl-deals a{
  text-decoration: none;
  color: #ffffff;
}

.esl-events {
  line-height: 30px;
  font-size: 14px;
}

.esl-business-list {
  line-height: 30px;
  font-size: 14px;
}

.esl-industry-news {
  line-height: 30px;
  font-size: 14px;
}

.quick-links {
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;

}

.terms-of-use {
  line-height: 30px;
  font-size: 14px;
}

.privacy {
  line-height: 30px;
  font-size: 14px;
}

.contact-support {
  line-height: 30px;
  font-size: 14px;
}

.careers {
  line-height: 30px;
  font-size: 14px;
}

.sign-up {
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;
}

.sign-up-tips {
  line-height: 30px;
  font-size: 14px;
  color: #808080;
}

.sign-up-form {

}

.subscribe-container {
  margin-top: 20px;
}


.subscribe-input {

}

.subscribe-btn {
  background-color: #0AA0A8 !important;
  color: #ffffff !important;
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
  width: 1100px;
  margin: 0 auto;
  text-align: left;
}

.footer-b-l {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.footer-b-l-item {
  line-height: 30px;
  font-size: 14px;
}

.footer-b-l-item-margin {
  margin-left: 20px;
}
</style>
