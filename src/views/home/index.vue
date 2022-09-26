<template>
  <div class="bg">
    <el-row class="t-container" :gutter="0" align="middle" justify="center">
      <el-col :span="8"></el-col>
      <el-col :span="8">
        <div class="logo-container">
          <div class="logo-logo" @click="turnHome()">
            <div class="logo-edu">EDU</div>
            <div class="logo-passport">PASSPORT</div>
          </div>
          <div class="logo-beta">Beta</div>
        </div>

      </el-col>

      <el-col class="t-btn-container" :span="8">

        <el-button link @click="login()">
          LOGIN
        </el-button>
        <el-button type="primary" round @click="signUp()">
          SIGN UP
        </el-button>

      </el-col>
    </el-row>

    <el-row class="a-row-container" :gutter="0" justify="center" align="middle">
      <el-col :span="10">
        an <span>all-in-one</span> education hub
      </el-col>
    </el-row>

    <el-row class="b-row-container" :gutter="0" justify="center" align="middle">
      <el-col :span="6">
        Educators can search and quickly apply for jobs, track their application status, connect with recruiters, and
        manage their resume all in one place without switching between tabs.
      </el-col>
    </el-row>

    <el-row class="c-row-container" :gutter="0" justify="center" align="middle">
      <el-col :span="24" class="c-col-container">
        <div class="c-container">
          <el-image :src="dashboardDemoImg"></el-image>
        </div>

<!--        <div class="c-tips">-->
<!--          For a demonstration purpose only. Includes features and designs that may be in development. Actual dashboard-->
<!--          may look differently.-->
<!--        </div>-->

      </el-col>
    </el-row>


    <el-row class="d-row-container" :gutter="0" justify="center">
      <el-col class="d-col-container" :span="24">
        <div class="d-container">
          <div class="d-label">
            a <span>transparent</span> hiring process
          </div>
          <div class="d-tips">
            No more guessing whether your application has been received, viewed, thrown away.
          </div>
          <div class="d-c-bg">

          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="0" justify="center" align="middle">

      <el-col class="f-col-container" :span="24">

        <div class="f-label">
          EDU Passport is so <span>much more</span>
        </div>

        <div class="f-tabs">
          <div class="f-tab"
               @click="checkedIdentityType(1)"
               :class="selectIdentityType === 1 ? 'f-tab-active' : '' "
          >
            EDUCATORS
          </div>
          <div class="f-tab"
               @click="checkedIdentityType(2)"
               :class="selectIdentityType === 2 ? 'f-tab-active' : '' "
          >
            EDUCATIONAL BUSINESSES
          </div>
          <div class="f-tab"
               @click="checkedIdentityType(3)"
               :class="selectIdentityType === 3 ? 'f-tab-active' : '' "
          >
            VENDORS
          </div>
        </div>

        <div class="f-c">
          <div class="f-c-l">
            <div class="f-c-l-item"
                 :class="selectItemValue === 1 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(1)">
              <div class="f-c-l-item-label">
                <template v-if="selectIdentityType === 1">
                  easy way to connect with fellow educators
                </template>
                <template v-if="selectIdentityType === 2">
                  tracking all applications with ease
                </template>
                <template v-if="selectIdentityType === 3">
                  join our mission to support educators
                </template>
              </div>
              <p>
                <template v-if="selectIdentityType === 1">
                  We partner up with local vendors to support educators, promote educator-centric events, and offer
                  exclusive deals to our EDU Passport members.
                </template>
                <template v-if="selectIdentityType === 2">
                  Whether you have 2 applicants or a 102, you will never get confused who is applying for which job, and
                  who you’re going to interview.
                </template>
                <template v-if="selectIdentityType === 3">
                  Our mission is to make access to a better education easier by helping educators work and live abroad.
                  We believe having safe spaces where educators can meet their peers is crucial for building
                  connections.
                </template>
              </p>
            </div>
            <div class="f-c-l-item"
                 :class="selectItemValue === 2 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(2)">
              <div class="f-c-l-item-label">

                <template v-if="selectIdentityType === 1">
                  matchmaking for you and your ideal job
                </template>
                <template v-if="selectIdentityType === 2">
                  matchmaking for you and your next hire
                </template>
                <template v-if="selectIdentityType === 3">
                  promote your business
                </template>
              </div>
              <p>
                <template v-if="selectIdentityType === 1">
                  Being educator-centric allows us to suggest the jobs that match educators’ specific requirements and
                  experience.
                </template>
                <template v-if="selectIdentityType === 2">
                  Being educator-centric allows us to suggest the right candidates matching your job requirements.
                </template>
                <template v-if="selectIdentityType === 3">
                  Let our team of marketing wizards help you connect with your audience and grow your business.
                </template>

              </p>
            </div>

            <div class="f-c-l-item"
                 :class="selectItemValue === 3 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(3)"
                 v-if="selectIdentityType !== 3">
              <div class="f-c-l-item-label">
                <template v-if="selectIdentityType === 1">
                  having a personal legal support
                </template>
                <template v-if="selectIdentityType === 2">
                  a direct line to your candidates
                </template>
              </div>
              <p>
                <template v-if="selectIdentityType === 1">
                  Living abroad often means facing challenges alone, but it doesn’t have to be that way. Your dedicated
                  account manager is only a click or tap away from providing you legal and visa support.
                </template>
                <template v-if="selectIdentityType === 2">
                  Hire high-quality candidates faster by contacting them directly to get important questions answered
                  quickly.
                </template>
              </p>
            </div>

            <div class="f-c-btn-container">
              <el-button type="primary" round @click="signUp()">SIGN UP</el-button>
            </div>

          </div>
          <div class="f-c-r">
            <template v-if="selectIdentityType === 1 && selectItemValue === 1">
              <el-image class="f-c-r-img" fit="cover" :src="dealsDemoImg"></el-image>
            </template>
            <template v-if="selectIdentityType === 1 && selectItemValue === 2">
              <el-image class="f-c-r-img" fit="cover" :src="jobMatchDemoImg"></el-image>
            </template>
            <template v-if="selectIdentityType === 1 && selectItemValue === 3">
              <el-image class="f-c-r-img" fit="cover" :src="chatDemoImg"></el-image>
            </template>
            <template v-if="selectIdentityType === 2 && selectItemValue === 1">
              <el-image class="f-c-r-img" fit="cover" :src="applicationsDemoImg"></el-image>
            </template>
            <template v-if="selectIdentityType === 2 && selectItemValue === 2">
              <el-image class="f-c-r-img" fit="cover" :src="applicantMatchDemoImg"></el-image>
            </template>
            <template v-if="selectIdentityType === 2 && selectItemValue === 3">
              <el-image class="f-c-r-img" fit="cover" :src="chatEducatorDemoImg"></el-image>
            </template>
            <template v-if="selectIdentityType === 3 && selectItemValue === 1">
              <el-image class="f-c-r-img" fit="cover" :src="supportImg"></el-image>
            </template>
            <template v-if="selectIdentityType === 3 && selectItemValue === 2">
              <el-image class="f-c-r-img" fit="cover" :src="promotionImg"></el-image>
            </template>

          </div>
        </div>


      </el-col>
    </el-row>

    <el-row :gutter="0" justify="center" align="middle">
      <el-col class="s-col-container" :span="24">
        <div class="s-container">
          <div class="s-label">
            subscribe and join <span>our journey</span>
          </div>
          <div class="s-tips">
            As we are growing rapidly, we work hard adding new features. You will only receive the news and updates for
            EDU Passport and we will never share your address with anyone else.
          </div>

          <div class="s-input-container">
            <div class="s-input-l">
              <el-input placeholder="Your email address" v-model="subscribeEmailValue"></el-input>
            </div>
            <div class="s-input-r">
              <el-button link @click="subscribe()">
                SUBSCRIBE
              </el-button>
            </div>
          </div>

        </div>
      </el-col>
    </el-row>

    <div class="footer-bg-container">
      <div class="footer-container">
        <div class="footer-t">
          <div class="footer-logo">
            <div class="footer-logo-edu">EDU</div>
            <div class="footer-logo-passport">PASSPORT</div>
          </div>
          <div class="footer-menu">
            <div class="footer-menu-item" @click="turnAboutUs()">
              ABOUT US
            </div>
            <div class="footer-menu-item" @click="turnFeatures()">
              FEATURES
            </div>
            <div class="footer-menu-item" @click="turnPricing()">
              PRICING
            </div>
            <div class="footer-menu-item" @click="turnContactUs()">
              CONTACT US
            </div>
          </div>
        </div>
        <div class="footer-m">
          Make sure to check back soon as we add more information.
        </div>
        <div class="footer-b">
          © 2022 EDU Passport
        </div>
      </div>
    </div>

    <initLoadingComponent :loadingStatus="initLoadingStatus" ></initLoadingComponent>

    <homeDonghua></homeDonghua>

  </div>
</template>

<script>

import imgLogo from '@/assets/logo.png'
import imgOne from '@/assets/newHome/Landing_application-process.png'
// import {ref, onMounted} from 'vue'
// import DevicePixelRatio from '@/assets/devicePixelRatio'
import dashboardDemoImg from '@/assets/newHome/dashboard-demo.png'
import dealsDemoImg from '@/assets/newHome/deals-demo.png'
import applicantMatchDemoImg from '@/assets/newHome/landing_applicant-match-demo.png'
import applicationsDemoImg from '@/assets/newHome/landing_applications-demo.png'
import chatDemoImg from '@/assets/newHome/landing_chat-demo.png'
import chatEducatorDemoImg from '@/assets/newHome/landing_chat-educator-demo.png'
import jobMatchDemoImg from '@/assets/newHome/landing_job-match-demo.png'
import promotionImg from '@/assets/newHome/landing_promotion.png'
import supportImg from '@/assets/newHome/landing_support.png'
import {ADD_SUBSCRIBE_EMAIL} from "@/api/api";
import initLoadingComponent from "@/components/initLoadingComponent";
import homeDonghua from "@/components/homeDonghua";

export default {
  name: "index",
  components: {
    initLoadingComponent,
    homeDonghua
  },
  data() {
    return {
      imgLogo,
      imgOne,
      dealsDemoImg,
      applicantMatchDemoImg,
      applicationsDemoImg,
      chatDemoImg,
      chatEducatorDemoImg,
      jobMatchDemoImg,
      promotionImg,
      supportImg,
      dashboardDemoImg,

      selectIdentityType: 1,
      selectItemValue: 1,
      subscribeEmailValue: '',
      initLoadingStatus: false

    }
  },
  setup() {

    // const styleValue = ref('')
    //
    // const bodyScale = () => {
    //   let devicewidth = document.documentElement.clientWidth;//获取当前分辨率下的可是区域宽度
    //   document.body.style.zoom =  devicewidth / 1920; //放大缩小相应倍数
    // }
    //
    // onMounted(()=>{
    //   new DevicePixelRatio().init()
    //
    //   window.onresize = ()=>{
    //     console.log('resize app')
    //     setTimeout(function () {
    //       bodyScale();
    //     },1000)
    //
    //   }
    //   bodyScale();
    // })
    //
    // return {
    //   styleValue
    // }
  },
  mounted() {
    let self = this;
    this.initLoadingStatus = false;
    setTimeout(function () {
      self.initLoadingStatus = false;
    }, 3000)

  },
  unmounted() {
    window.onresize = null
  },
  methods: {
    subscribe() {
      let params = {
        email: this.subscribeEmailValue
      }
      ADD_SUBSCRIBE_EMAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Subscribe Success')
          this.subscribeEmailValue = ''
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    turnAboutUs() {
      this.$router.push('/about/us')
    },
    turnFeatures() {
      this.$router.push('/edupassport')
    },
    turnPricing() {
      this.$router.push('/services/price')
    },
    turnContactUs() {
      this.$router.push('/contact/us')
    },
    login() {
      this.$router.push('/edupassport')
    },
    signUp() {
      this.$router.push({path: '/edupassport/signup', query: {}})
    },
    checkedIdentityType(value) {
      this.selectIdentityType = value
      this.selectItemValue = 1
    },
    checkedItem(value) {
      this.selectItemValue = value;
    },
    turnHome() {
      this.$router.push('/')
    },
    searchNow() {
      this.$router.push({path: '/search/result', query: {keyword: this.searchKeywordsValue}})
    },
    turnArticleLink(link) {
      window.open(link, '_blank')
    }

  }

}
</script>

<style scoped>
.bg {
  min-height: 100vh;
}

.t-container {
  margin-top: 25px;
}

.logo-edu {
  font-family: BCExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 40px;
}

.logo-passport {
  font-family: BCSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 17px;
}

.logo-container {
  margin: 0 auto;

  text-align: left;
  position: relative;
  width: 60px;
  height: 60px;
  cursor: pointer;
}

.logo-beta {
  position: absolute;
  font-size: 12px;
  top: 0;
  right: -32px;
  background-color: #49397f;
  padding: 2px 10px;
  border-radius: 10px;
  color: #EEEEEE;
}


.t-btn-container {
  text-align: right;
  padding-right: 100px;
}

.a-row-container {
  text-align: center;
  margin-top: 120px;
  font-size: 45px;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.a-row-container span {
  color: #6648FF;
}


.b-row-container {
  text-align: center;
  margin-top: 25px;
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.c-row-container {
  margin-top: 50px;
}

.c-col-container {
  padding: 0 100px 50px 100px;
}

.c-container {
  max-width: 1720px;
  margin: 0 auto;

  /*border-radius: 16px 0px 0px 16px;*/
  /*box-shadow: 0px 0px 20px #00000033;*/
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;

}

.c-tips {
  width: 1720px;
  margin: 0 auto;
  padding: 25px 0 50px 0;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;
}


.d-row-container {

}

.d-col-container {
  background-color: #FFFFFF;
  padding: 50px;
}

.d-container {
  max-width: 1347px;
  margin: 0 auto;
  text-align: center;

}

.d-label {
  text-align: center;
  font-size: 45px;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.d-label span {
  color: #6648FF;
}

.d-tips {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
  margin-top: 25px;
}

.d-c-bg {
  height: 1133px;
  background-image: url("@/assets/newHome/Landing_application-process.png");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.f-col-container {
  padding: 50px 0;
}

.f-label {
  text-align: center;
  font-size: 45px;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.f-label span {
  color: #6648FF;
}

.f-tabs {
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.f-tab {
  color: #262626;
  font-size: 30px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  height: 40px;
  line-height: 40px;
  border-radius: 40px;
  padding: 0 25px;
  margin-right: 10px;
  cursor: pointer;
}

.f-tab-active {
  background-color: #9173FF;
  color: #FFFFFF;
}

.f-tab:hover {
  background-color: #9173FF;
  color: #FFFFFF;
}

.f-c {
  max-width: 1830px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 90px;
}

.f-c-l {
  max-width: 600px;

}

.f-c-r {
  max-width: calc(100% - 700px);
  height: 872px;

}

.f-c-r-img {
  height: 100%;

}

/deep/ .f-c-r-img .el-image__inner {
  object-position: left;
}

.f-c-l-item {
  margin-bottom: 50px;
  cursor: pointer;
  padding-left: 10px;

}

.f-c-l-item:hover {
  border-left: 7px solid #6650B3;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
}

.f-c-l-item-active {
  border-left: 7px solid #6650B3;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
}

.f-c-l-item-label {
  color: #262626;
  font-size: 30px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.f-c-l-item p {
  margin-top: 15px;
  color: #262626;
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.s-col-container {
  padding: 50px 0;
  background-color: #FFFFFF;
}

.s-container {
  width: 610px;
  padding: 25px 50px;
  background-color: #F0F2F5;
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;
  margin: 0 auto;
}

.s-label {
  text-align: center;
  font-size: 45px;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.s-label span {
  color: #6648FF;
}

.s-tips {
  margin-top: 15px;
  color: #262626;
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.s-input-container {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.s-input-l {
  width: 80%;
}

.s-input-r {
  width: 20%;
  text-align: right;
}


.footer-bg-container {
  background-color: #6648FF;
  padding: 50px 100px;
}

.footer-container {

}

.footer-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.footer-logo {

  text-align: left;
  position: relative;

  cursor: pointer;
}

.footer-logo-edu {
  color: #FFFFFF;
  font-family: BCExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 62px;
}

.footer-logo-passport {
  color: #FFFFFF;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
}

.footer-logo-beta {
  position: absolute;
  font-size: 12px;
  top: 0;
  right: -32px;
  background-color: #49397f;
  padding: 2px 10px;
  border-radius: 10px;
  color: #EEEEEE;
}

.footer-menu {
  margin-left: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.footer-menu-item {
  cursor: pointer;
  color: #FFFFFF;
  font-size: 25px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  margin-right: 50px;
}

.footer-menu-item:hover {
  text-decoration: underline;
}

.footer-m {
  margin-top: 40px;
  color: #FFFFFF;
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.footer-b {
  margin-top: 10px;
  color: #FFFFFF;
  font-size: 16px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

</style>
