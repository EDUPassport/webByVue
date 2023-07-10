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
            <el-link :underline=false href="https://blog.edupassport.io" target="_blank">EDU BLOG</el-link>
          </template>
          <contactForm></contactForm>

        </div>

      </el-col>

      <el-col :xs="12" :sm="20" :md="0" :lg="0" :xl="0">

        <div class="t-mobile-btn-container">
          <div class="t-mobile-sign-up-free" v-if="!token">
            <el-button type="primary" round @click="signUp()">Sign up Free</el-button>
          </div>
          <div class="t-btn-menu-icon-container">
            <el-icon :size="25" color="#6648FF" @click="menuDrawerStatus = true">
              <IconMaterialSymbolsMenuRounded />
            </el-icon>
          </div>
        </div>

        <mobileDrawerMenu :visible="menuDrawerStatus" @close="menuDrawerStatus = false"></mobileDrawerMenu>
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

          <div class="f-tab f-tab-e" @click="checkedIdentityType(1)"
            :class="selectIdentityType === 1 ? 'f-tab-active' : ''">
            EDUCATORS
          </div>
          <div class="f-tab f-tab-b" @click="checkedIdentityType(2)"
            :class="selectIdentityType === 2 ? 'f-tab-active' : ''">
            EDU BUSINESSES
          </div>
          <div class="f-tab f-tab-v" @click="checkedIdentityType(3)"
            :class="selectIdentityType === 3 ? 'f-tab-active' : ''">
            VENDORS
          </div>

          <div v-show="selectIdentityType === 1" class="f-tab-bg f-tab-bg-t-1"></div>
          <div v-show="selectIdentityType === 2" class="f-tab-bg f-tab-bg-t-2"></div>
          <div v-show="selectIdentityType === 3" class="f-tab-bg f-tab-bg-t-3"></div>

        </div>

        <!--        educator    -->
        <div class="f-c" :class="selectIdentityType === 1 ? 'f-c-active' : ''" v-if="selectIdentityType === 1">
          <div class="f-c-l">

            <div class="f-c-l-item" :class="selectItemValue === 1 ? 'f-c-l-item-active' : ''" @click="checkedItem(1)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Matching You to Your Dream Job
                </div>
                <p>
                  The platform assists educators to connect to educational jobs, made just for them.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 1">
                <el-icon :size="homeArrowRightSize" color="#9173ff">
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>
              <div class="f-c-l-item-mask" v-if="selectItemValue !== 1"></div>

            </div>

            <div class="f-c-l-item" :class="selectItemValue === 2 ? 'f-c-l-item-active' : ''" @click="checkedItem(2)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Global Savings
                </div>
                <p>
                  We believe that the best educators deserve the best deals, so we team up with local businesses to offer
                  discounts and fun events just for our EDU Passport members.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 2">
                <el-icon :size="homeArrowRightSize" color="#9173ff">
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>

              <div class="f-c-l-item-mask" v-if="selectItemValue !== 2"></div>
            </div>

            <div class="f-c-l-item" :class="selectItemValue === 3 ? 'f-c-l-item-active' : ''" @click="checkedItem(3)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Security and Assistance
                </div>
                <p>
                  A dedicated account manager on our educational platform is available to help with legal and visa
                  challenges when teaching abroad.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 3">
                <el-icon :size="homeArrowRightSize" color="#9173ff">
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


        <div class="f-c" :class="selectIdentityType === 2 ? 'f-c-active' : ''" v-if="selectIdentityType === 2">
          <div class="f-c-l">

            <div class="f-c-l-item" :class="selectItemValue === 1 ? 'f-c-l-item-active' : ''" @click="checkedItem(1)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Helping you with the perfect match for recruitment
                </div>
                <p>
                  We’re all about hooking up employers with the perfect candidate for the job, with a focus on the
                  educational experience.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 1">
                <el-icon :size="homeArrowRightSize" color="#9173ff">
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>
              <div class="f-c-l-item-mask" v-if="selectItemValue !== 1"></div>

            </div>


            <div class="f-c-l-item" :class="selectItemValue === 2 ? 'f-c-l-item-active' : ''" @click="checkedItem(2)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Efficient Application Tracking
                </div>
                <p>
                  Our platform simplifies tracking job applications, even for a large number of resumes.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 2">
                <el-icon :size="homeArrowRightSize" color="#9173ff">
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>

              <div class="f-c-l-item-mask" v-if="selectItemValue !== 2"></div>
            </div>

            <div class="f-c-l-item" :class="selectItemValue === 3 ? 'f-c-l-item-active' : ''" @click="checkedItem(3)"
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
                <el-icon :size="homeArrowRightSize" color="#9173ff">
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

        <div class="f-c" :class="selectIdentityType === 3 ? 'f-c-active' : ''" v-if="selectIdentityType === 3">

          <div class="f-c-l">
            <div class="f-c-l-item" :class="selectItemValue === 1 ? 'f-c-l-item-active' : ''" @click="checkedItem(1)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">
                  Advancing Education with your Support
                </div>
                <p>
                  We’re on a mission to make it easier for educators to live and teach abroad, and we know that having a
                  strong community of peers is key.
                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 1">
                <el-icon :size="homeArrowRightSize" color="#9173ff">
                  <IconBiChevronCompactRight />
                </el-icon>
              </div>

              <div class="f-c-l-item-mask" v-if="selectItemValue !== 1"></div>
            </div>
            <div class="f-c-l-item" :class="selectItemValue === 2 ? 'f-c-l-item-active' : ''" @click="checkedItem(2)">
              <div class="f-c-l-item-l">
                <div class="f-c-l-item-label">

                  Strategies for Successful Promotion
                </div>
                <p>
                  We assist businesses in defining educational leadership, connecting with the target audience, and
                  growing.

                </p>

              </div>
              <div class="f-c-l-item-r" v-if="selectItemValue === 2">
                <el-icon :size="homeArrowRightSize" color="#9173ff">
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
            As we continue to grow rapidly, new updates & releases are coming weekly! Sign up for our newsletter to stay
            in the loop.
          </div>

          <el-form ref="subscribeForm" :model="subscribeForm" :rules="subscribeRules" label-width="120px"
            label-position="top" class="demo-ruleForm">
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

    <el-row :gutter="0" align="middle" class="row-bg" style="background-color: #6648FF;padding-left: 230px;">
      <el-col :xs="22" :sm="22" :md="10" :lg="10" :xl="10" style="position: relative;top:-300px">
        <el-button color="#FFC650" class="b-insider-program" round>EDU Passport Insider Program</el-button>
        <p class="h1-text">Get Invited for Beta <br> Testing of V3.0</p>
        <p class="p-text">No other education job board can match our <br> exceptional features! Experience <br> searching,
          applying,and interviewing for global<br> position on our platform</p>


        <div></div>
        <h1 class="h1-text-benefits">Exclusive Benefits</h1>

        <el-row>
          <el-col :span="12">
            <div class="div-group">
              <el-avatar>1</el-avatar>
              <p class="dev-group-p-text">First Hand <br> Access</p>
              <p class="dev-group-p-text-detal">with a complete profile,educators<br>can apply with just one click!</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="div-group">
              <el-avatar>2</el-avatar>
              <p class="dev-group-p-text">Value-Proven <br> Features</p>
              <p class="dev-group-p-text-detal">Successful applicants will <br> beinvited for an interview</p>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:20px">
          <el-col :span="12">
            <div class="div-group">
              <el-avatar>3</el-avatar>
              <p class="dev-group-p-text">6-Week Free <br> Trial</p>
              <p class="dev-group-p-text-detal">Successful applicants will be <br> invited for an interview</p>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="div-group">
              <el-avatar>4</el-avatar>
              <p class="dev-group-p-text">One-Month <br> Half Price</p>
              <p class="dev-group-p-text-detal">Hired! (We love it when<br> this happens)</p>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-button @click="insiderDialogVisible = true" class="b-join-now">
        Join Now
      </el-button>

      <el-dialog v-model="insiderDialogVisible" width="50%" center class="dialog-width">

        <el-row >
          <el-col :sm="24" :md="24" :lg="24">
            <div style="display: flex; justify-content: center; align-items: center;">
          <el-image class="dialog-logo" :src="logoTransparentImg" fit="contain"></el-image>
        </div>
          </el-col>
        
        <el-col :sm="24" :md="24" :lg="24"> <p class="dialog-p-text">Thank you for participating in the pilot testing program for the new version of the EDU
          Passport app! We appreciate your involvement and look forward to gathering your valuable feedback. Please take a
          moment to fill out this short form to help us better understand your needs and preferences.</p></el-col>

       </el-row>

        <el-form ref="formName" :model="contactForm" :rules="contactFormRules" label-width="120px" label-position="top"
          class="insider-program-form">

          <el-row>
            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="Full Name" prop="full_name">
                <el-input class="req-input" v-model="contactForm.full_name" placeholder="Enter Name" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="Email" prop="email">
                <el-input class="req-input" v-model="contactForm.email" placeholder="Enter Email" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="Phone Number" prop="phone_no">
                <el-row class="req-input">
                  <el-col  :md="6" :lg="6" >
                    <el-select class="phone-select" filterable v-model="contactForm.country" placeholder="Select Country">
                      <el-option v-for="item in countryList" :key="item.name" :label="`${item.name} (${item.phonecode})`"
                        :value="item.phonecode" :style="{ fontFamily: 'sans-serif' }" />
                    </el-select>
                  </el-col>
                  <el-col  :md="6" :lg="6">
                    <el-input class="phone-input" v-model="contactForm.phone_no" placeholder="xxx-xxx-xxxx" />
                  </el-col>
                </el-row>
              </el-form-item>


            </el-col>
            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="Location" prop="location">
                <el-input class="req-input" v-model="contactForm.location" placeholder="Other Information" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="Type Of User" prop="type_of_user">
                <el-select class="req-input" filterable v-model="contactForm.type_of_user" placeholder="Select Request">
                  <el-option v-for="item in typeUsers" :key="item.value" :label="item.label" :value="item.value"
                    :style="{ fontFamily: 'sans-serif' }" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="What Are You Expectations From The New Version Of The EDU Passport App?"
                prop="expectations">
                <el-input :rows="8" type="textarea" v-model="contactForm.expectations" />
              </el-form-item>

            </el-col>
            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Are There Any Specific Features Of Functionalities You Would Like To See In The App?"
                prop="specific_feature">
                <el-input :rows="8" type="textarea" v-model="contactForm.specific_feature" />
              </el-form-item>

            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item
                label="Are You Available To Participate In The Pilot Testing Exercise Starting From 1St August 2023 For Five Days?"
                prop="participate_in_program" class="custom-radio-container">
                <el-radio-group v-model="contactForm.participate_in_program"
                  style="display: flex; flex-direction: column;align-items: flex-start">
                  <el-radio :label="true" class="box-radio">Yes</el-radio>
                  <el-radio :label="false" class="box-radio">No</el-radio>
                </el-radio-group>

              </el-form-item>

            </el-col>


            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item
                label="Can You Commit To Providing Detailed Feedback And Reporting Any Issues Encountered During The Testing Period?"
                prop="detail_feedback" class="custom-radio-container">
                <el-radio-group v-model="contactForm.detail_feedback" class="dialog-radio-button">
                  <el-radio :label="true" class="box-radio">Yes</el-radio>
                  <el-radio :label="false" class="box-radio">No</el-radio>
                </el-radio-group>

              </el-form-item>

            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Additional Comments" prop="additional_comment">
                <el-input :rows="8" type="textarea" v-model="contactForm.additional_comment" />
              </el-form-item>

            </el-col>

            <el-col :sm="24" :md="24" :lg="24" class="hidden-mobile">
              <el-form-item label="" prop="submit_form">
                <el-radio-group v-model="contactForm.submit_form">
                  <el-radio :label="true" class="box-radio box-radio-term-condition">By Submitting This Form, I Confirm
                    That I Agree To Participate In The Pilot Testing Program For The New<br> Version Of The EDU Passport
                    App And Provide Feedback Based On My Experience.</el-radio>
                </el-radio-group>

              </el-form-item>

            </el-col>
          </el-row>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" round @click="save('formName')" class="dialog-btn">
              Submit
            </el-button>
          </span>
        </template>
      </el-dialog>


      <el-dialog v-model="successDialog" width="30%" center class="success-dialog">


        <div style="display: flex; justify-content: center; align-items: center;">

          <el-image class="dialog-tick-circle" :src="TickCircle" fit="contain"></el-image>

        </div>
        <p class="success-dialog-heading">Form Submitted Successfully</p>

        <p class="success-dialog-des">Thank you for participating in the pilot testing program for the new version of the
          EDU Passport app! We appreciate your involvement and look forward to gathering.</p>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" round @click="successDialog = false" class="success-dialog-btn">
              Okay
            </el-button>
          </span>
        </template>
      </el-dialog>
    </el-row>



    <newFooter></newFooter>

    <initLoadingComponent :loadingStatus="initLoadingStatus"></initLoadingComponent>

    <!--    <homeDonghua></homeDonghua>-->

  </div>
</template>

<script>

import imgLogo from '@/assets/logo.png'
import imgOne from '@/assets/newHome/Landing_application-process.png'
import { ref, onMounted } from 'vue'
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
import { ADD_SUBSCRIBE_EMAIL } from "@/api/api";
import initLoadingComponent from "@/components/initLoadingComponent";
// import homeDonghua from "@/components/homeDonghua";
import logoImg from "@/assets/newHome/logo/Full_Logo_Vertical_Transparent_Dark.png"
import logoImgLight from "@/assets/newHome/logo/Full_Logo_Vertical_Transparent_Light.png"
import logoImgLightH from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
import landingPageMobileResponsiveImg from '@/assets/newHome/landing_page_mobile_responsive.png'
import logoTransparentImg from '@/assets/newHome/logo/Logo_Transparent.png'
import TickCircle from '@/assets/bg/tick-circle.png'
import mobileDrawerMenu from "@/components/mobileDrawerMenu";
// import {loadJs, removeJs} from "@/utils/tools";
import jobProcessComponent from "@/components/landing/home/jobProcess.vue";
import newFooter from '@/layout/components/newFooter.vue'
import contactForm from "@/components/contactForm.vue";
import { GET_COUNTRY_LIST, ADD_INSIDER_PROGRAM } from '@/api/api';
import { ElMessage } from 'element-plus'




export default {
  name: "index",
  components: {
    initLoadingComponent,
    mobileDrawerMenu,
    jobProcessComponent,
    newFooter,
    contactForm
  },
  data() {
    return {
      successDialog: false,
      insiderDialogVisible: false,
      envBlog: process.env.VUE_APP_BLOG,
      logoImg,
      logoImgLight,
      logoImgLightH,
      landingPageMobileResponsiveImg,
      logoTransparentImg,
      TickCircle,
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
      homeArrowRightSize: 80,
      menuDrawerStatus: false,
      subscribeForm: {
        email: ''
      },
      subscribeRules: {
        email: [
          {
            type: 'email',
            required: true,
            message: 'Please enter your email address',
            trigger: 'blur',
          },
        ],
      },
      countryList: [],
      typeUsers: [
        {
          label: 'Educator',
          value: 1
        },
        {
          label: 'EDU Busniess',
          value: 2
        },
        {
          label: 'Other',
          value: 4
        },
        {
          label: 'Vendor',
          value: 5
        },
      ],
      contactForm: {
        full_name: '',
        email: '',
        phone_no: '',
        location: '',
        type_of_user: '',
        expectations: '',
        specific_feature: null,
        participate_in_program: null,
        detail_feedback: '',
        additional_comment: '',
        submit_form: '',
        country: ''
      },
      fromRef: '',

      contactFormRules: {
        full_name: [
          {
            required: true,
            message: 'Please enter your full name',
            trigger: 'blur',
          },
        ],
        email: [
          {
            type: 'email',
            required: true,
            message: 'Please enter your email address',
            trigger: 'blur',
          },
        ],
        phone_no: [
          {
            required: true,
            message: 'Please enter your phone number',
            trigger: 'blur',
          },
        ],
        location: [
          {
            required: true,
            message: 'Please enter your location',
            trigger: 'blur',
          },
        ],
        type_of_user: [
          {
            required: true,
            message: 'Please select type of user',
            trigger: 'change',
          },
        ],
        participate_in_program: [
          {
            required: true,
            message: ' Please Choose an Option',
            trigger: 'change',
          },
        ],
        detail_feedback: [
          {
            required: true,
            message: ' Please Choose an Option',
            trigger: 'change',
          },
        ],

      },






    }
  },
  setup() {
    const selectIdentityType = ref(1)
    const selectItemValue = ref(1)
    let timer = ref('')
    let timer2 = ref('')
    let timer3 = ref('')

    const tabSliderEvent = (stop) => {

      if (stop) {
        console.log('stop slider')
        window.clearTimeout(timer)
        window.clearTimeout(timer2)
        window.clearTimeout(timer3)

      } else {

        timer = window.setTimeout(function () {
          selectIdentityType.value = 2

          timer2 = window.setTimeout(function () {
            selectIdentityType.value = 3

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

    onMounted(() => {
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

    this.getAllCountry()

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

    save(formName) {
  this.$refs[formName].validate((valid) => {
    if (valid) {
      this.contactForm.phone_no = `${this.contactForm.country} ${this.contactForm.phone_no}`;
      delete this.contactForm.country;
      this.insiderDialogVisible = false;
      ADD_INSIDER_PROGRAM(this.contactForm).then(res => {
        if (res.code == 200) {
          this.successDialog = true;
          this.$refs[formName].resetFields();
          setTimeout(() => {
            this.successDialog = false;
          }, 4000);
        }
      }).catch(err => {
        ElMessage({
          message: err.msg,
          type: 'error',
        });
      });
    }
  });
},

getAllCountry() {
  let params = {}
  GET_COUNTRY_LIST(params).then(res => {
    if (res.code == 200) {
      this.countryList = res.message;
    }
  }).catch(err => {
    console.log(err)
  })
},
subscribe(formName) {
  this.$refs[formName].validate((valid) => {
    if (valid) {
      let params = Object.assign({}, this.subscribeForm);

      ADD_SUBSCRIBE_EMAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Thanks for signing up')
          this.subscribeForm.email = ''
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    } else {
      this.$message({
        type: 'warning',
        message: 'please enter your valid email',
        grouping: true
      })

      console.log('error submit!!')
      return false
    }
  })


},
turnJobs() {
  this.$router.push('/jobs')
},
turnDeals() {
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
turnDashboard() {
  this.$router.push('/overview')
},
login() {
  this.$router.push('/login')
},
signUp() {
  this.$router.push({ path: '/signup', query: {} })
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
  this.$router.push({ path: '/search/result', query: { keyword: this.searchKeywordsValue } })
},
turnArticleLink(link) {
  window.open(link, '_blank')
}

  }

}
</script>

<style>
@media screen and (max-width: 768px){

.dialog-width{

  width:100%
}
.insider-program-form {
    position: relative;
    top: 4.166667rem;
    padding-left: 0px !important; 
     padding-right: 0px !important;
}
.phone-select {
  width: 100% !important
}

.phone-input {
  margin-left: 0px !important;
  margin-top: 10px !important;

  width: 100% !important;
}
.dialog-p-text{
font-size:14px !important
}
.hidden-mobile{
  display:none !important 
}
}
.row-bg {
  padding-top: 500px;
  padding-bottom: 0px;

  background-image: url("../../assets/bg/row-bg.jpg");
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: right;
}

.b-insider-program span {

  font-size: 21px;
  font-weight: bold;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.b-insider-program {
  padding: 28px 18px 28px 18px !important;
}

.h1-text {
  position: relative;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: white;
  font-weight: bold;
  font-size: 41px;
  top: 25px;
}

.p-text {
  color: white;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  position: relative;
  top: 60px;
  line-height: 25px;

}

.dialog-p-text {
  position: relative;
  top: 50px;
  line-height: 30px;
  font-family: "Assistant";
font-size: 24px;
font-weight: normal;
font-style: normal;
text-align: center;
color: #262626;

}

.b-join-now span {
  font-weight: bold;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.b-join-now {
  position: relative;
  top: -17.520833rem;
  right: 43.75rem;
}

.h1-text-benefits {

  font-size: 29px;
  color: white;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  position: relative;
  top: 180px;
}

.div-group {
  position: relative;
  top: 190px;
}


.div-group .el-avatar {
  --el-avatar-bg-color: #ffffff;
  color: black !important;
}

.dev-group-p-text {
  padding: 18px 0px 20px 0px;
  font-size: 25px;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: white;
}

.dev-group-p-text-detal {
  font-size: 18px !important;
  color: white;
  position: relative;
  top: -7px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;

}

.req-input {
  width: 23.395833rem;

}
.phone-select {
  width: 200px
}

.phone-input {
  margin-left: 5.010417rem;
  width: 12.5rem;
}

.insider-program-form.el-form--default.el-form--label-top .el-form-item .el-form-item__label {
  font-family: "Cabin" !important;
font-size: 16px !important;
font-weight: 500 !important;
font-style: normal !important;
color: #262626 !important;}

.insider-program-form .box-radio .el-radio__label {
  font-family: "Cabin" !important;
font-size: 20px !important;
font-weight: 500 !important;
font-style: normal !important;
color: #262626 !important;  
}

.insider-program-form {

  position: relative;
  top: 80px;
  padding-left: 70px;
  padding-right: 50px;
}

.phone-label {
  position: relative;
  font-family: sans-serif !important;
  top: -9px;
}

.box-radio .el-radio__inner {
  border: 3px solid #D6D6D6;
  border-radius: 0;
  width: 16px;
  height: 16px;
}

.box-radio .el-radio__inner::after {
  display: none;
}

.box-radio .el-radio__label {
  font-family: sans-serif;
  padding-left: 8px;
}


.box-radio-term-condition .el-radio__label {
  font-family: "Cabin" !important;
font-size: 18px !important;
font-weight: 500 !important;
font-style: normal !important;
color: #262626 !important;
  
  padding-left: 16px;
  line-height: 23px;
  padding-top: 20px;
}

.dialog-btn {
  margin: 60px 0px 40px 0px !important;
}

.dialog-radio-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start
}

.insider-program-form .el-form-item__error {
  color: red !important;
  font-family: sans-serif !important;

}

.insider-program-form .el-form-item.is-error .el-input__wrapper {
  box-shadow: 0 0 0 1px red inset !important;
}

.insider-program-form .el-form-item.is-required:not(.is-no-asterisk).asterisk-left>.el-form-item__label:before {
  color: red !important;
}

.insider-program-form .custom-radio-container .el-form-item__error {
  position: absolute !important;
  top: -53px !important;
}


.success-dialog-heading {
  font-family: "Assistant";
  font-size: 40px;
  font-weight: bold;
  font-style: normal;
  color: #262626;
  text-align: center;
  position: relative;
  top: 37px;

}

.dialog-tick-circle {

  width: 12%
}

.success-dialog-des {
  position: relative;
  top: 65px;
  font-family: "Assistant";
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  text-align: center;
  color: #262626;
}


.success-dialog-btn {
  position: relative;
  top: 65px;
  font-family: "Assistant";
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  text-align: center;
}

.success-dialog {
  padding: 0px 20px 90px 20px
}
</style>

<style scoped>
.bg {
  min-height: 100vh;
}

.t-container {
  height: 140px;
}

.logo-new-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
}

.logo-new {
  cursor: pointer;
  position: relative;
}

.logo-new-logo-img {
  width: 50px;
}

.dialog-logo {
  width: 50px;

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

.t-mobile-btn-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.t-mobile-sign-up-free {
  margin-right: 15px;
}

.home-profile-btn {
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

.f-tab-e {
  width: 167px;
}

.f-tab-b {
  width: 340px;
}

.f-tab-v {
  width: 130px;
}

.f-tab-bg {
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

.f-tab-bg-t-1 {
  width: 167px;
  animation-name: slide-in-left-e;

  animation-duration: .8s;
  transform: translateX(0);
}

.f-tab-bg-t-2 {
  width: 340px;
  transform: translateX(177px);
  animation-name: slide-in-left-b;
  animation-duration: .8s;
}

.f-tab-bg-t-3 {
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

.f-c-active {
  opacity: 1;

}

.f-c-l {
  width: 720px;
  height: 700px;
  position: relative;
}

.f-c-btn-container {
  position: absolute;
  bottom: 10px;
  left: 0px;
}

.f-c-btn-container button {
  font-size: 30px;
}

.f-c-r {
  width: calc(100% - 820px);
  /*height: 870px;*/
  height: 700px;
  text-align: left;
}

.f-c-r-img-edu {
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

.f-c-l-item-l {}

.f-c-l-item-r {}

.f-c-l-item-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, .2);
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

.s-input-l /deep/ .el-input__wrapper {
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
  .footer-b-r-mobile {
    display: none;
  }

  .logo-new-logo-mobile-img {
    display: none;
  }

}

@media screen and (max-width: 768px) {

  .logo-new-logo-img {
    display: none;
  }

  .logo-new-container {
    width: 100px;
    float: left;
    padding-left: 15px;
  }

  .logo-new-logo-mobile-img {
    width: 80px;
  }

  .f-col-container {
    padding: 15px;
  }

  .f-label {
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

  .f-tab-e {
    width: auto;
  }

  .f-tab-b {
    width: auto;
  }

  .f-tab-v {
    width: auto;
  }

  .f-tab-active {
    background-color: #9173ff;
  }

  .f-tab-bg {

    position: absolute;
  }

  .f-tab-bg-t-1 {
    display: none;
  }

  .f-tab-bg-t-2 {
    display: none;
  }

  .f-tab-bg-t-3 {
    display: none;
  }

  .f-c {
    flex-direction: column;
    padding-left: 0;
  }


  .f-c-l {
    width: auto;
    height: auto;
  }

  .f-c-btn-container {
    display: none;
  }

  .f-c-l-item {
    padding: 10px;
  }

  .f-c-l-item-r {
    display: flex;
    align-items: center;
  }

  .f-c-l-item-label {
    font-size: 16px;
  }

  .f-c-l-item-l p {
    display: none;
  }

  .f-c-r {
    width: 100%;
    height: auto;
    padding: 25px 0;
  }

  .a-row-container {
    padding-top: 20px;
    font-size: 24px;
  }

  .b-row-container {
    padding-top: 10px;
  }

  .s-tips {
    font-size: 12px;
  }

  .c-row-container {
    padding-top: 15px;
  }

  .c-col-container {
    padding: 15px;
  }

  .s-container {
    width: auto;
    margin: 0 15px;
    padding: 15px;
  }

  .s-label {
    font-size: 20px;
  }

  .t-btn-menu-icon-container {
    padding-right: 15px;
  }

}
</style>
