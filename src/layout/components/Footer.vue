<template>
  <div>
    <el-footer height="auto" class="footer-bg">
      <el-row  :gutter="0" align="middle" justify="center">
        <el-col  :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
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
            www.esl-passport.cn
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
          <div class="popular-searches">
            Popular Searches
          </div>
          <div class="esl-jobs">
            ESL Jobs
          </div>
          <div class="esl-deals">
            Deals
          </div>
          <div class="esl-events">
            Events
          </div>
          <div class="esl-business-list">
            Business Listings
          </div>
          <div class="esl-industry-news">
            Industry News
          </div>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
          <div class="quick-links">
            Quick links
          </div>
          <div class="terms-of-use">
            Terms of Use
          </div>
          <div class="privacy">
            Privacy Policy
          </div>
          <div class="contact-support">
            Contact Support
          </div>
          <div class="careers">
            Careers
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
          <div class="sign-up">
            Sign Up for Our Newsletter
          </div>
          <div class="sign-up-tips">
            Lorem ipsum dolor sit amet, consecte tur cing elit. Suspe ndisse suscipit sagittis
          </div>
          <div class="sign-up-form">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                label-position="top"
                class="demo-ruleForm"
            >
              <el-form-item label="Enter your work email address" prop="email">
                <el-input placeholder="name@work-email.com" v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="submit-btn" :loading="submitLoadingStatus" @click="submitForm('ruleForm')">
                  Subscribe
                </el-button>
              </el-form-item>
            </el-form>
            <div class="social-media">
              <div class="social-media-item">
                Twitter
              </div>
              <div class="social-media-item">
                Twitter
              </div>
              <div class="social-media-item">
                Twitter
              </div>
              <div class="social-media-item">
                Twitter
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="footer-b" :gutter="0" align="middle" justify="center">
        <el-col   :xs="24" :sm="24" :md="24" :lg="12" :xl="9">
          <div class="footer-b-l">
            <div class="footer-b-l-item">Terms of Use</div>
            <div class="footer-b-l-item">Privacy Policy</div>
          </div>
        </el-col>
        <el-col  :xs="24" :sm="24" :md="24" :lg="12" :xl="9">

        </el-col>
      </el-row>
    </el-footer>
  </div>
</template>

<script>
import imgLogo from '@/assets/logo.png'

export default {
  name: "Footer",
  data() {
    return {
      imgLogo,
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
  }
}
</script>

<style scoped>

.footer-bg {
  background-color: rgba(0,0,0,0.8);
  color: #ffffff;
  text-align: left;
  padding: 20px 40px;
}

.esl-logo{
  width: 120px;
  height: 120px;
}
.esl-address{
  line-height: 30px;
  font-size: 16px;
}
.esl-email{
  line-height: 30px;
  font-size: 16px;
}

.esl-phone{
  line-height: 30px;
  font-size: 16px;
}
.esl-url{
  line-height: 30px;
  font-size: 16px;
}

.popular-searches{
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;

}

.esl-jobs{
  line-height: 30px;
  font-size: 16px;
}

.esl-deals{
  line-height: 30px;
  font-size: 16px;
}
.esl-events{
  line-height: 30px;
  font-size: 16px;
}

.esl-business-list{
  line-height: 30px;
  font-size: 16px;
}

.esl-industry-news{
  line-height: 30px;
  font-size: 16px;
}

.quick-links{
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;

}

.terms-of-use{
  line-height: 30px;
  font-size: 16px;
}

.privacy{
  line-height: 30px;
  font-size: 16px;
}
.contact-support{
  line-height: 30px;
  font-size: 16px;
}

.careers{
  line-height: 30px;
  font-size: 16px;
}

.sign-up{
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;
}
.sign-up-tips{
  line-height: 30px;
  font-size: 16px;
}

.sign-up-form{

}

.social-media{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:flex-start;

}
.social-media-item{
  margin: 10px;
}
.footer-b{
  text-align: left;
}
.footer-b-l{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

}

.footer-b-l-item{
  margin: 10px;
  line-height: 30px;
  font-size: 16px;
}

</style>
