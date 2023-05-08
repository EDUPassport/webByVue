<template>
  <div class="bg">
    <el-row class="t-container" :gutter="0" align="middle" justify="center">
      <el-col :xs="12" :sm="2" :md="2" :lg="2" :xl="2">

        <div class="logo-new-container">
          <div class="logo-new">
            <el-image class="logo-new-logo-img" :src="logoTransparentImg" fit="contain"></el-image>
            <el-image class="logo-new-logo-mobile-img" :src="logoImgLight" fit="contain"></el-image>
            <div class="logo-new-beta">Beta</div>
          </div>
        </div>

      </el-col>

      <el-col :xs="0" :sm="0" :md="16" :lg="16" :xl="16">

        <div class="nav-link-container">
          <router-link to="/" exact>HOME</router-link>
          <router-link to="/jobs" exact>EDU JOBS</router-link>
          <router-link to="/deals" exact> EDU DEALS</router-link>
          <router-link to="/events" exact>EVENTS</router-link>
          <template v-if="envBlog === 'yes'">
            <el-link :underline=false href="https://blog.edupassport.io" target="_blank">EDU BLOGS</el-link>
          </template>

        </div>

      </el-col>

      <el-col  :xs="12" :sm="20" :md="0" :lg="0" :xl="0">

        <div class="t-mobile-btn-container">
          <div class="t-mobile-sign-up-free" v-if="!token">
            <el-button type="primary" round @click="signUp()">Sign up Free</el-button>
          </div>
          <div class="t-btn-menu-icon-container">
            <el-icon :size="25" color="#6648FF" @click="menuDrawerStatus=true">
              <IconMaterialSymbolsMenuRounded />
            </el-icon>
          </div>
        </div>

        <mobileDrawerMenu :visible="menuDrawerStatus" @close="menuDrawerStatus=false"></mobileDrawerMenu>
      </el-col>

      <el-col class="t-btn-container" :xs="0" :sm="0" :md="4" :lg="4" :xl="4">

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
            Login
          </el-button>
          <el-button type="primary" round @click="signUp()">
            Sign up Free
          </el-button>
        </template>


      </el-col>


    </el-row>

    <el-row :gutter="0" justify="center" align="middle">

      <el-col class="f-col-container" :span="24">

        <h1 class="f-label">
          The New <span>Global Go-To</span> Education hub for
        </h1>

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
            EDU BUSINESSES
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
                  Matching You to Your Dream Job
                </div>
                <p>
                  The platform assists educators to connect to educational jobs, made just for them.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 1">
                <el-icon :size="homeArrowRightSize" color="#9173ff" >
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
                  Global Savings
                </div>
                <p>
                  We believe that the best educators deserve the best deals, so we team up with local businesses to offer discounts and fun events just for our EDU Passport members.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 2">
                <el-icon :size="homeArrowRightSize" color="#9173ff" >
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
                  Security and Assistance
                </div>
                <p>
                  A dedicated account manager on our educational platform is available to help with legal and visa challenges when teaching abroad.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 3">
                <el-icon :size="homeArrowRightSize" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>

              <div class="f-c-l-item-mask" v-if="selectItemValue !== 3"></div>

            </div>

            <div class="f-c-btn-container" v-if="!token">
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
                  Helping you with the perfect match for recruitment
                </div>
                <p>
                  We’re all about hooking up employers with the perfect candidate for the job, with a focus on the educational experience.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 1">
                <el-icon :size="homeArrowRightSize" color="#9173ff" >
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
                  Efficient Application Tracking
                </div>
                <p>
                  Our platform simplifies tracking job applications, even for a large number of resumes.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 2">
                <el-icon :size="homeArrowRightSize" color="#9173ff" >
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
                  Streamlining Recruitment Communication
                </div>
                <p>
                  Our system allows direct communication with candidates for immediate hiring decisions.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 3">
                <el-icon :size="homeArrowRightSize" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>

              <div class="f-c-l-item-mask" v-if="selectItemValue !== 3"></div>

            </div>

            <div class="f-c-btn-container" v-if="!token">
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
                  Advancing Education with your Support
                </div>
                <p>
                  We’re on a mission to make it easier for educators to live and teach abroad, and we know that having a strong community of peers is key.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 1">
                <el-icon :size="homeArrowRightSize" color="#9173ff" >
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

                  Strategies for Successful Promotion
                </div>
                <p>
                  We assist businesses in defining educational leadership, connecting with the target audience, and growing.

                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 2">
                <el-icon :size="homeArrowRightSize" color="#9173ff" >
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>
              <div class="f-c-l-item-mask" v-if="selectItemValue !== 2"></div>

            </div>

            <div class="f-c-btn-container" v-if="!token">
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

    <jobProcessComponent></jobProcessComponent>

    <el-row class="a-row-container" :gutter="0" justify="center" align="middle">
      <el-col :xs="22" :sm="22" :md="12" :lg="12" :xl="12">
        Plus, so <span>much more</span>!
      </el-col>
    </el-row>

    <el-row class="b-row-container" :gutter="0" justify="center" align="middle">
      <el-col :xs="22" :sm="22" :md="8" :lg="8" :xl="8">
        <div class="s-tips" v-if="selectIdentityType === 1">
          We are just getting started! By end of 2023 we will be used by 80% of the global EDU industry.
        </div>
        <div class="s-tips" v-if="selectIdentityType === 2">
          We are just getting started! By end of 2023 we will be used by 80% of the global EDU industry.
        </div>
        <div class="s-tips" v-if="selectIdentityType === 3">
          We are just getting started! By end of 2023 we will be used by 80% of the global EDU industry.
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
            Subscribe to follow <span>our journey</span>
          </div>
          <div class="s-tips">
            As we continue to grow rapidly, new updates & releases are coming weekly! Sign up for our newsletter to stay in the loop.
          </div>

          <el-form
              ref="subscribeForm"
              :model="subscribeForm"
              :rules="subscribeRules"
              label-width="120px"
              label-position="top"
              class="demo-ruleForm"
          >
            <div class="s-input-container">

              <div class="s-input-l">
                <el-form-item prop='email'>
                  <el-input placeholder="Your email address" v-model="subscribeForm.email"></el-input>
                </el-form-item>
              </div>
              <div class="s-input-r">
                <el-form-item>
                  <el-button type="primary" round @click="subscribe('subscribeForm')">
                    Subscribe
                  </el-button>
                </el-form-item>
              </div>

            </div>
          </el-form>

        </div>
      </el-col>
    </el-row>

    <newFooter></newFooter>

    <initLoadingComponent :loadingStatus="initLoadingStatus" ></initLoadingComponent>

<!--    <homeDonghua></homeDonghua>-->

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
// import homeDonghua from "@/components/homeDonghua";
import logoImg from  "@/assets/newHome/logo/Full_Logo_Vertical_Transparent_Dark.png"
import logoImgLight from  "@/assets/newHome/logo/Full_Logo_Vertical_Transparent_Light.png"
import logoImgLightH from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
import landingPageMobileResponsiveImg  from '@/assets/newHome/landing_page_mobile_responsive.png'
import logoTransparentImg from '@/assets/newHome/logo/Logo_Transparent.png'
import mobileDrawerMenu from "@/components/mobileDrawerMenu";
// import {loadJs, removeJs} from "@/utils/tools";
import jobProcessComponent from "@/components/landing/home/jobProcess.vue";
import newFooter from '@/layout/components/newFooter.vue'

export default {
  name: "index",
  components: {
    initLoadingComponent,
    mobileDrawerMenu,
    jobProcessComponent,
    newFooter
  },
  data() {
    return {
      envBlog:process.env.VUE_APP_BLOG,
      logoImg,
      logoImgLight,
      logoImgLightH,
      landingPageMobileResponsiveImg,
      logoTransparentImg,
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
      token: localStorage.getItem('token'),
      homeArrowRightSize:80,
      menuDrawerStatus:false,
      subscribeForm:{
        email:''
      },
      subscribeRules:{
        email: [
          {
            type: 'email',
            required: true,
            message: 'Please enter your email address',
            trigger: 'blur',
          },
        ],
      }

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

            }, 3000)

          }, 3000)

        }, 3000)

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
    // loadJs('https://cdn.pagesense.io/js/edupassport/81b71de4b3744e65b9740dbe657feac5.js')
    // loadJs('/zoho.js')
    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      this.homeArrowRightSize = 20
    }


    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        this.homeArrowRightSize = 20
      }
    }

    this.initLoadingStatus = false;
    setTimeout(function () {
      self.initLoadingStatus = false;
    }, 3000)

  },
  unmounted() {
    // console.log('home index unmounted')
    // removeJs('https://cdn.pagesense.io/js/edupassport/81b71de4b3744e65b9740dbe657feac5.js')
    // removeJs('/zoho.js')
    window.onresize = null
  },
  methods: {
    subscribe(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.subscribeForm);

          ADD_SUBSCRIBE_EMAIL(params).then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message.success('Subscribe Success')
              this.subscribeForm.email = ''
            }
          }).catch(err => {
            console.log(err)
            this.$message.error(err.msg)
          })

        } else {
          this.$message({
            type:'warning',
            message:'please enter your valid email',
            grouping:true
          })

          console.log('error submit!!')
          return false
        }
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
  width: 100%;
}

.logo-new{
  cursor: pointer;
  position: relative;
}

.logo-new-logo-img{
  width:50px;
}

.logo-new-beta {
  position: absolute;
  top: 0;
  right: -50px;
  background-color: #49397f;
  padding: 2px 10px;
  border-radius: 10px;
  color: #EEEEEE;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 12px;
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

.t-mobile-btn-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.t-mobile-sign-up-free{
  margin-right: 15px;
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
  text-align: center;
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
  transform: translateX(522px);
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
  padding: 25px 10px;
  cursor: pointer;

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
  background-color: rgba(255,255,255,.2);
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
  width: 650px;
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
  margin: 15px 25px;
  color: #262626;
  font-size: 23px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.s-input-container {

  margin: 25px 25px 0 25px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.s-input-l {
  width: calc(100% - 120px);

}
.s-input-l /deep/ .el-input__wrapper{
  box-shadow: none;
  border-radius: 50px;
}

.s-input-r {
  width: 100px;
  text-align: right;
}


.nav-link-container {
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav-link-container a {
  margin-left: 20px;
  text-decoration: none;
  color: #262626;

  font-size: 18px;
  line-height: 30px;
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
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
    transform: translateX(360px);
    opacity: 0;
  }
  100% {
    /*transform: translateX(340px);*/
    opacity: 1;
  }
}

@media screen and (min-width: 769px) {
  .footer-b-r-mobile{
    display: none;
  }

  .logo-new-logo-mobile-img{
    display: none;
  }

}

@media screen and (max-width: 768px){

  .logo-new-logo-img{
    display: none;
  }

  .logo-new-container{
    width: 100px;
    float: left;
    padding-left: 15px;
  }

  .logo-new-logo-mobile-img{
    width: 80px;
  }
  .f-col-container{
    padding: 15px;
  }

  .f-label{
    font-size: 28px;
  }

  .f-tabs {
    /*display: none;*/
    width: auto;
    margin: 15px auto;
    flex-direction: column;
  }

  .f-tab {
    font-size: 18px;
    padding: 0 25px;
    cursor: pointer;
    margin-top: 15px;
  }

  .f-tab-e{
    width: auto;
  }

  .f-tab-b{
    width: auto;
  }

  .f-tab-v{
    width: auto;
  }

  .f-tab-active{
    background-color: #9173ff;
  }

  .f-tab-bg{

    position: absolute;
  }

  .f-tab-bg-t-1{
    display: none;
  }

  .f-tab-bg-t-2{
    display: none;
  }

  .f-tab-bg-t-3{
    display: none;
  }

  .f-c{
    flex-direction: column;
    padding-left: 0;
  }


  .f-c-l{
    width: auto;
    height: auto;
  }

  .f-c-btn-container{
    display: none;
  }

  .f-c-l-item{
    padding: 10px;
  }
  .f-c-l-item-r{
    display: flex;
    align-items: center;
  }
  .f-c-l-item-label{
    font-size: 16px;
  }

  .f-c-l-item-l p{
    display: none;
  }

  .f-c-r{
    width: 100%;
    height: auto;
    padding: 25px 0;
  }

  .a-row-container{
    padding-top: 20px;
    font-size: 24px;
  }
  .b-row-container{
    padding-top: 10px;
  }

  .s-tips{
    font-size: 12px;
  }

  .c-row-container{
    padding-top: 15px;
  }
  .c-col-container{
    padding: 15px;
  }

  .s-container{
    width: auto;
    margin: 0 15px;
    padding: 15px;
  }

  .s-label{
    font-size: 20px;
  }

  .t-btn-menu-icon-container{
    padding-right: 15px;
  }

}


</style>
