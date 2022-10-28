<template>
  <div class="bg">
    <el-row class="t-container" :gutter="0" align="middle" justify="center">
      <el-col :span="7">
        <div class="nav-link-container">

          <router-link to="/jobs" exact>EDU Jobs</router-link>
          <router-link to="/deals" exact> EDU Deals</router-link>
          <router-link to="/events" exact>EDU Events</router-link>

<!--          <template v-if="envName === 'development' || envName === 'production'">-->
<!--              <span v-if="!identity || identity == 1"-->
<!--                    class="nav-china-jobs" @click="turnEnvJobs()">China Jobs</span>-->
<!--          </template>-->
<!--          <template v-if="envName === 'developmentCN' || envName === 'productionCN'">-->
<!--              <span v-if="!identity || identity == 1"-->
<!--                    class="nav-china-jobs" @click="turnEnvJobs()">International Jobs</span>-->
<!--          </template>-->

        </div>

      </el-col>
      <el-col :span="8">
<!--        <div class="logo-container">-->
<!--          <div class="logo-logo" @click="turnHome()">-->
<!--            <div class="logo-edu">EDU</div>-->
<!--            <div class="logo-passport">PASSPORT</div>-->
<!--          </div>-->
<!--          <div class="logo-beta">Beta</div>-->
<!--        </div>-->

        <div class="logo-new-container">
          <div class="logo-new">
            <el-image class="logo-new-logo-img" :src="logoImgLightH"></el-image>
          </div>
        </div>

      </el-col>

      <el-col class="t-btn-container" :span="7">

        <template v-if="token">
          <el-button class="home-profile-btn" type="primary" link @click="turnDashboard()">
            PROFILE
            <el-icon>
              <arrowRight></arrowRight>
            </el-icon>
          </el-button>
        </template>
        <template v-else>
          <el-button link @click="login()">
            LOGIN
          </el-button>
          <el-button type="primary" round @click="signUp()">
            SIGN UP
          </el-button>
        </template>


      </el-col>
    </el-row>

    <el-row :gutter="0" justify="center" align="middle">

      <el-col class="f-col-container" :span="24">

        <div class="f-label">
          an <span>all-in-one</span> hub for
        </div>

        <div class="f-tabs">

          <div class="f-tab f-tab-e"
               @click="checkedIdentityType(1)"
               :class="selectIdentityType === 1 ? 'f-tab-active' : '' "
          >
            EDUCATORS
          </div>
          <div class="f-tab f-tab-b"
               @click="checkedIdentityType(2)"
               :class="selectIdentityType === 2 ? 'f-tab-active' : '' "
          >
            EDUCATIONAL BUSINESSES
          </div>
          <div class="f-tab f-tab-v"
               @click="checkedIdentityType(3)"
               :class="selectIdentityType === 3 ? 'f-tab-active' : '' "
          >
            VENDORS
          </div>

          <div v-show="selectIdentityType === 1" class="f-tab-bg f-tab-bg-t-1"></div>
          <div v-show="selectIdentityType === 2" class="f-tab-bg f-tab-bg-t-2"></div>
          <div v-show="selectIdentityType === 3" class="f-tab-bg f-tab-bg-t-3"></div>

        </div>

<!--        educator    -->
        <div class="f-c"
             :class="selectIdentityType === 1 ? 'f-c-active' : ''"
             v-if="selectIdentityType ===  1">
          <div class="f-c-l">

            <div class="f-c-l-item"
                 :class="selectItemValue === 1 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(1)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Matchmaking for you and your ideal job
                </div>
                <p>
                  Being educator-centric allows us to suggest the jobs that match educators’ specific requirements and experience.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 1">
                <el-icon :size="80" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>
              <div class="f-c-l-item-mask" v-if="selectItemValue !== 1"></div>

            </div>

            <div class="f-c-l-item"
                 :class="selectItemValue === 2 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(2)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Best educators deserve the best deals
                </div>
                <p>
                  We partner up with local vendors to support educators, promote educator-centric events, and offer exclusive deals to our EDU Passport members.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 2">
                <el-icon :size="80" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>

              <div class="f-c-l-item-mask" v-if="selectItemValue !== 2"></div>
            </div>

            <div class="f-c-l-item"
                 :class="selectItemValue === 3 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(3)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Having a personal legal support
                </div>
                <p>
                  Living abroad often means facing challenges alone, but it doesn’t have to be that way. Your dedicated account manager is only a click or tap away from providing you legal and visa support.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 3">
                <el-icon :size="80" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>

              <div class="f-c-l-item-mask" v-if="selectItemValue !== 3"></div>

            </div>

            <div class="f-c-btn-container">
              <el-button type="primary" size="large" round @click="signUp()">
                SIGN UP
              </el-button>
            </div>

          </div>

          <div class="f-c-r">
            <template v-if="selectItemValue === 1">
              <el-image class="f-c-r-img" fit="contain" :src="jobMatchDemoImg"></el-image>
            </template>
            <template v-if="selectItemValue === 2">
              <el-image class="f-c-r-img-edu" fit="cover" :src="dealsDemoImg"></el-image>
            </template>
            <template v-if="selectItemValue === 3">
              <el-image class="f-c-r-img" fit="contain" :src="chatDemoImg"></el-image>
            </template>

          </div>
        </div>


        <div class="f-c"
             :class="selectIdentityType === 2 ? 'f-c-active' : ''"
             v-if="selectIdentityType === 2">
          <div class="f-c-l">

            <div class="f-c-l-item"
                 :class="selectItemValue === 1 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(1)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Matchmaking for you and your next hire
                </div>
                <p>
                  Being educator-centric allows us to suggest the right candidates matching your job requirements.

                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 1">
                <el-icon :size="80" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>
              <div class="f-c-l-item-mask" v-if="selectItemValue !== 1"></div>

            </div>


            <div class="f-c-l-item"
                 :class="selectItemValue === 2 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(2)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Tracking all applications with ease
                </div>
                <p>
                  Whether you have 2 applicants or a 102, you will never get confused who is applying for which job, and who you’re going to interview.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 2">
                <el-icon :size="80" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>

              <div class="f-c-l-item-mask" v-if="selectItemValue !== 2"></div>
            </div>

            <div class="f-c-l-item"
                 :class="selectItemValue === 3 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(3)"
                 v-if="selectIdentityType !== 3">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  A direct line to your candidates
                </div>
                <p>
                  Hire high-quality candidates faster by contacting them directly to get important questions answered quickly.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 3">
                <el-icon :size="80" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>

              <div class="f-c-l-item-mask" v-if="selectItemValue !== 3"></div>

            </div>

            <div class="f-c-btn-container">
              <el-button type="primary" size="large" round @click="signUp()">SIGN UP</el-button>
            </div>

          </div>

          <div class="f-c-r">

            <template v-if="selectItemValue === 1">
              <el-image class="f-c-r-img" fit="contain" :src="applicationsDemoImg"></el-image>
            </template>
            <template v-if="selectItemValue === 2">
              <el-image class="f-c-r-img" fit="contain" :src="applicantMatchDemoImg"></el-image>
            </template>
            <template v-if="selectItemValue === 3">
              <el-image class="f-c-r-img" fit="contain" :src="chatEducatorDemoImg"></el-image>
            </template>

          </div>
        </div>

        <div class="f-c"
             :class="selectIdentityType === 3 ? 'f-c-active' : ''"
             v-if="selectIdentityType === 3">

          <div class="f-c-l">
            <div class="f-c-l-item"
                 :class="selectItemValue === 1 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(1)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Join our mission to support educators
                </div>
                <p>
                  Our mission is to make access to a better education easier by helping educators work and live abroad. We believe having safe spaces where educators can meet their peers is crucial for building connections.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 1">
                <el-icon :size="80" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>

              <div class="f-c-l-item-mask" v-if="selectItemValue !== 1"></div>
            </div>
            <div class="f-c-l-item"
                 :class="selectItemValue === 2 ? 'f-c-l-item-active' : ''"
                 @click="checkedItem(2)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">

                  Promote your business
                </div>
                <p>
                  Let our team of marketing wizards help you connect with your audience and grow your business.

                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 2">
                <el-icon :size="80" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>
              <div class="f-c-l-item-mask" v-if="selectItemValue !== 2"></div>

            </div>

            <div class="f-c-btn-container">
              <el-button type="primary" size="large" round @click="signUp()">SIGN UP</el-button>
            </div>

          </div>

          <div class="f-c-r">

            <template v-if="selectItemValue === 1">
              <el-image class="f-c-r-img" fit="contain" :src="supportImg"></el-image>
            </template>
            <template v-if="selectItemValue === 2">
              <el-image class="f-c-r-img" fit="contain" :src="promotionImg"></el-image>
            </template>

          </div>
        </div>

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
          <div>
            <el-button type="primary" round @click="searchJobs()">
              SEARCH JOBS
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="a-row-container" :gutter="0" justify="center" align="middle">
      <el-col :span="10">
        and so <span>much more</span>
      </el-col>
    </el-row>

    <el-row class="b-row-container" :gutter="0" justify="center" align="middle">
      <el-col :span="6">
        <div class="s-tips" v-if="selectIdentityType === 1">
          Search and quickly apply for jobs Receive jobs that match your profile Track your application updates.
        </div>
        <div class="s-tips" v-if="selectIdentityType === 2">
          A birds-eye view of all applicants and job posts Contact candidates directly in dashboard Recommended applicants that match your job descriptions
        </div>
        <div class="s-tips" v-if="selectIdentityType === 3">
          Promote your business and support educators Review performance metrics of your events and deals
        </div>

      </el-col>
    </el-row>

    <el-row class="c-row-container" :gutter="0" justify="center" align="middle">
      <el-col :span="24" class="c-col-container">
        <div class="c-container" v-if="selectIdentityType === 1">
          <el-image :src="dashboardDemoImg"></el-image>
        </div>
        <div class="c-container" v-if="selectIdentityType === 2">
          <el-image :src="dashboardBDemoImg"></el-image>
        </div>
        <div class="c-container" v-if="selectIdentityType === 3">
          <el-image :src="dashboardVDemoImg"></el-image>
        </div>

        <!--        <div class="c-tips">-->
        <!--          For a demonstration purpose only. Includes features and designs that may be in development. Actual dashboard-->
        <!--          may look differently.-->
        <!--        </div>-->

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
            <el-image class="footer-logo-img" :src="logoImg"></el-image>
          </div>
          <div class="footer-t-r">
            <div class="footer-menu">
              <div class="footer-menu-item" @click="turnJobs()">
                JOBS
              </div>
              <div class="footer-menu-item" @click="turnDeals()">
                DEALS
              </div>
              <div class="footer-menu-item" @click="turnAboutUs()">
                ABOUT US
              </div>
              <!--            <div class="footer-menu-item" @click="turnFeatures()">-->
              <!--              FEATURES-->
              <!--            </div>-->
              <!--            <div class="footer-menu-item" @click="turnPricing()">-->
              <!--              PRICING-->
              <!--            </div>-->
              <!--            <div class="footer-menu-item" @click="turnContactUs()">-->
              <!--              CONTACT US-->
              <!--            </div>-->
            </div>
            <div class="footer-contact-us">
              <div class="footer-contact-us-label">Contact us</div>
              <div class="footer-contact-us-c">
                hello@edupassport.io
              </div>
            </div>
          </div>
        </div>
        <div class="footer-m">

        </div>
        <div class="footer-b">

          <div class="footer-b-l">
            © 2022 EDU Passport
          </div>
          <div class="footer-b-r">
            Make sure to check back soon as we add more information.
          </div>

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
import {ref, onMounted} from 'vue'
// import DevicePixelRatio from '@/assets/devicePixelRatio'
import dashboardDemoImg from '@/assets/newHome/dashboard-demo.png'
import dashboardBDemoImg from '@/assets/newHome/dashboard-b-demo.png'
import dashboardVDemoImg from '@/assets/newHome/dashboard-v-demo.png'
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
import logoImg from  "@/assets/newHome/logo/Full_Logo_Vertical_Transparent_Dark.png"
import logoImgLight from  "@/assets/newHome/logo/Full_Logo_Vertical_Transparent_Light.png"
import logoImgLightH from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'

export default {
  name: "index",
  components: {
    initLoadingComponent,
    homeDonghua
  },
  data() {
    return {
      logoImg,
      logoImgLight,
      logoImgLightH,
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
      dashboardBDemoImg,
      dashboardVDemoImg,

      subscribeEmailValue: '',
      initLoadingStatus: false,
      token: localStorage.getItem('token')

    }
  },
  setup() {
    const selectIdentityType = ref(1)
    const selectItemValue = ref(1)
    let timer = ref('')
    let timer2 = ref('')
    let timer3 = ref('')

    const tabSliderEvent = (stop)=>{

      if(stop){
        console.log('stop slider')
        window.clearTimeout(timer)
        window.clearTimeout(timer2)
        window.clearTimeout(timer3)

      }else{

        timer = window.setTimeout(function (){
          selectIdentityType.value = 2

          timer2 = window.setTimeout(function (){
            selectIdentityType.value  = 3

            timer3 = window.setTimeout(function () {
              selectIdentityType.value = 1

              tabSliderEvent(false);

            }, 1500)

          }, 1500)

        }, 1500)

      }
    }

    // let a = setInterval(function (){
    //
    //   setTimeout(function () {
    //     selectIdentityType.value = 2
    //   },1000)
    //
    //   setTimeout(function () {
    //     selectIdentityType.value  = 3
    //   },3000)
    //
    //   setTimeout(function () {
    //     selectIdentityType.value  = 1
    //   },5000)
    //
    // }, 7000 )

    // const clearTimer = ()=>{
    //   window.clearInterval(a)
    // }

    onMounted(()=>{
      // a
      tabSliderEvent()
    })

    return {
      selectIdentityType,
      selectItemValue,
      tabSliderEvent,
      timer
      // clearTimer
    }

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
    turnJobs(){
      this.$router.push('/jobs')
    },
    turnDeals(){
      this.$router.push('/deals')
    },
    turnAboutUs() {
      this.$router.push('/about/us')
    },
    turnFeatures() {
      this.$router.push('/login')
    },
    turnPricing() {
      this.$router.push('/services/price')
    },
    turnContactUs() {
      this.$router.push('/contact/us')
    },
    turnDashboard(){
      this.$router.push('/overview')
    },
    login() {
      this.$router.push('/login')
    },
    signUp() {
      this.$router.push({path: '/signup', query: {}})
    },
    checkedIdentityType(value) {
      this.selectIdentityType = value
      this.selectItemValue = 1
      this.tabSliderEvent(true)

    },
    checkedItem(value) {
      this.selectItemValue = value;
      this.tabSliderEvent(true)

    },
    turnHome() {
      this.$router.push('/')
    },
    searchNow() {
      this.$router.push({path: '/search/result', query: {keyword: this.searchKeywordsValue}})
    },
    turnArticleLink(link) {
      window.open(link, '_blank')
    },
    searchJobs(){
      this.$router.push('/jobs')
    }

  }

}
</script>

<style scoped>
.bg {
  min-height: 100vh;
}

.t-container {
  height: 140px;
}

.logo-new-container{

  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 300px;
}

.logo-new{
  cursor: pointer;
}

.logo-new-logo-img{
  width:260px;
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
}

.home-profile-btn{
  color: #6648FF;
  font-size: 28px;
}

.a-row-container {
  background-color: #F0F2F5;
  text-align: center;
  padding-top: 120px;
  font-size: 45px;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.a-row-container span {
  color: #6648FF;
}


.b-row-container {
  background-color: #F0F2F5;
  text-align: center;
  padding-top: 25px;
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.c-row-container {
  padding-top: 50px;
  background-color: #F0F2F5;
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

  width: 667px;
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  z-index: 2;
  position: relative;


}

.f-tab {

  color: #262626;
  font-size: 30px;

  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  height: 40px;
  line-height: 40px;
  border-radius: 40px;
  padding: 0 25px;

  cursor: pointer;
  transition: 0.15s ease-in-out;
  z-index: 2;
}

.f-tab-e{
  width: 167px;
}

.f-tab-b{
  width: 340px;
}
.f-tab-v{
  width: 130px;
}

.f-tab-bg{
  position: absolute;

  /*width: 280px;*/
  height: 40px;
  border-radius: 40px;
  left: 0;
  top: 0;
  background-color: #9173FF;
  color: #FFFFFF;
  z-index: 1;
  transition: all .8s;

}

.f-tab-bg-t-1{
  width: 167px;
  animation-name: slide-in-left-e;

  animation-duration: .8s;
  transform: translateX(0);
}

.f-tab-bg-t-2{
  width: 340px;
  transform: translateX(177px);
  animation-name: slide-in-left-b;
  animation-duration: .8s;
}

.f-tab-bg-t-3{
  width: 130px;
  transform: translateX(517px);
  animation-name: slide-in-left-v;
  animation-duration: .8s;
 }


.f-tab-active {
  /*background-color: #9173FF;*/
  color: #FFFFFF;
  /*transition: all 2.3s;*/
  /*animation-name: slide-in-left;*/
  /*animation-duration: 2s;*/
}

.f-tab:hover {
  /*background-color: #9173FF;*/
  /*color: #FFFFFF;*/
}

.f-c {
  max-width: 1830px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding-left: 90px;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.f-c-active{
  opacity: 1;

}

.f-c-l {
  width: 720px;
  height: 700px;
  position: relative;
}

.f-c-btn-container{
  position: absolute;
  bottom: 10px;
  left: 0px;
}

.f-c-btn-container button{
  font-size: 30px;
}

.f-c-r {
  width: calc(100% - 820px);
  /*height: 870px;*/
  height: 700px;
  text-align: left;
}

.f-c-r-img-edu{
  height: 700px;
}

.f-c-r-img {
  height: 100%;

}

/deep/ .f-c-r-img-edu .el-image__inner {
  object-position: left;
}

/deep/ .f-c-r-img .el-image__inner {
  object-position: left;
}

.f-c-l-item {
  margin-top: 50px;
  /*margin-bottom: 50px;*/
  cursor: pointer;
  padding-left: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  position: relative;

}

.f-c-l-item:hover {
  /*border-left: 7px solid #6650B3;*/
  /*border-top-left-radius: 7px;*/
  /*border-bottom-left-radius: 7px;*/
}

.f-c-l-item-l{

}
.f-c-l-item-r{

}

.f-c-l-item-mask{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,.3);
}

.f-c-l-item-active {
  /*opacity: 1;*/
  /*border-left: 7px solid #6650B3;*/
  /*border-top-left-radius: 7px;*/
  /*border-bottom-left-radius: 7px;*/
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
  background-color: #262626;
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
  width: 220px;
}

.footer-logo-img{
  width: 120px;
}

.footer-t-r{

}

.footer-menu {
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

.footer-contact-us{
  margin-top: 50px;
}

.footer-contact-us-label{
  font-family: BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #FFFFFF;
}
.footer-contact-us-c{
  font-family: BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #FFFFFF;
}

.footer-m {
  margin-top: 40px;

}

.footer-b {
  margin-top: 10px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
}

.footer-b-l{
  width: 220px;
  font-size: 16px;
}

.footer-b-r{
  font-size: 23px;
}


.nav-link-container {
  text-align: left;
}

.nav-link-container a {
  margin-left: 20px;
  text-decoration: none;
  color: #262626;

  font-size: 24px;
  line-height: 30px;
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.nav-link-container a:hover {
  color: #000000;
}

@keyframes slide-in-left-e {
  0% {
    transform: translateX(-167px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-in-left-b {
  0% {
    transform: translateX(0);
    opacity: 0;
  }
  100% {
    /*transform: translateX(167px);*/
    opacity: 1;
  }
}

@keyframes slide-in-left-v {

  0% {
    transform: translateX(340px);
    opacity: 0;
  }
  100% {
    /*transform: translateX(340px);*/
    opacity: 1;
  }
}


</style>
