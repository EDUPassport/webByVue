<template>
  <div class="bg">
    <div class="perks-container">
      <div class="perks-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <el-scrollbar class="perks-r-container">

        <div class="perks-r-bg-container">

          <div class="custom-divider-container">
            <el-divider class="custom-divider-el" :content-position="dividerPosition">
              <span>Manage your perks</span>
            </el-divider>
          </div>

          <div class="plain-xll-container">
            <!--          <div class="plain-mask-container"></div>-->
            <div class="plain-xll-item-container">
              <div class="plain-item-label">
                Ads
              </div>
              <div class="plain-item-tips">
                Promote your business with ad banners on our website.
              </div>
              <div class="plain-item-btn-container-1">
<!--                <el-button class="plain-item-btn" type="primary" link>-->
<!--                  MY ADS-->
<!--                </el-button>-->
              </div>

            </div>

            <div class="plain-xll-item-container">
              <div class="plain-item-label">
                Job posts
              </div>
              <div class="plain-item-tips">
                Add, edit, remove your job posts.
              </div>
              <div class="plain-item-btn-container-1">

                <el-button class="plain-item-btn" type="primary"
                           @click="turnMyJobPosts()"
                           link>
                  MY JOB POSTS
                </el-button>
              </div>

            </div>

            <div class="plain-xll-item-container">
              <div class="plain-item-label">
                Deals
              </div>
              <div class="plain-item-tips">
                Post, edit, remove, track engagement of your deals.
              </div>
              <div class="plain-item-btn-container-1">

                <el-button class="plain-item-btn"
                           type="primary"
                           @click="turnMyDeals()"
                           link>
                  MY DEALS
                </el-button>
              </div>

            </div>

            <div class="plain-xll-item-container">
              <div class="plain-item-label">
                Events
              </div>

              <div class="plain-item-tips">
                Post, edit, remove, track engagement of your events.
              </div>

              <div class="plain-item-btn-container-1">

                <el-button class="plain-item-btn"
                           type="primary"
                           @click="turnMyEvents()"
                           link>
                  MY EVENTS
                </el-button>
              </div>

            </div>
          </div>

          <div class="custom-divider-container custom-divider-margin">
            <el-divider  class="custom-divider-el" :content-position="dividerPosition">
              <span>Make the most out of your plan</span>
            </el-divider>
          </div>

          <div class="plain-container">
            <!--          <div class="plain-mask-container"></div>-->
<!--            <div class="plain-item-container">-->
<!--              <div class="plain-item-label">-->
<!--                Complete your profile-->
<!--              </div>-->
<!--              <div class="plain-item-percentage">-->
<!--                <el-progress color="#f9b019" :stroke-width="10" :percentage="40"/>-->
<!--              </div>-->
<!--              <div class="plain-item-tips">-->
<!--                Increase your chances of finding the right candidate by completing your profile.-->
<!--              </div>-->
<!--              <div class="plain-item-btn-container">-->
<!--                <el-button class="plain-item-btn" link>-->
<!--                  DONE-->
<!--                </el-button>-->
<!--                <el-button class="plain-item-btn" type="primary" link>-->
<!--                  GOT TO MY PROFILE-->
<!--                </el-button>-->
<!--              </div>-->

<!--            </div>-->

            <div class="plain-item-container">
              <div class="plain-item-label">
                In-app messages
              </div>
              <div class="plain-item-image-container">
                <el-image class="plain-item-msg-img" :src="plainImgTwo"></el-image>
              </div>
              <div class="plain-item-tips">
                Chat with your candidates directly and get a new hire faster.
              </div>
              <div class="plain-item-btn-container-1">

<!--                <el-button class="plain-item-btn" type="primary" link>-->
<!--                  GO TO MESSAGES-->
<!--                </el-button>-->
              </div>

            </div>

            <div class="plain-item-container">
              <div class="plain-item-label">
                Unlimited job posts
              </div>
              <div class="plain-item-image-container">
                <el-image class="plain-item-job-img" :src="plainImgOne"></el-image>
              </div>
              <div class="plain-item-tips">
                With unlimited job posts, you will never be understaffed!
              </div>
              <div class="plain-item-btn-container-1">

<!--                <el-button class="plain-item-btn" type="primary" link>-->
<!--                  POST A JOB-->
<!--                </el-button>-->
              </div>

            </div>

            <div class="plain-item-container">
              <div class="plain-item-label">
                Job deadline notice
              </div>
              <div class="plain-item-image-container">
                <el-image class="plain-item-notice-img" :src="plainImgThree"></el-image>
              </div>
              <div class="plain-item-tips">
                Whether you need some more time or you simply forgot to
                take the job post down, we'll remind you when you're approaching
                the application deadline.
              </div>

            </div>

            <div class="plain-item-container">
              <div class="plain-item-label">
                1 Deal card
              </div>
              <div class="plain-item-image-container">
                <el-image></el-image>
              </div>
              <div class="plain-item-tips">
                Get great deals from business who support education!
              </div>
              <div class="plain-item-btn-container-1">
<!--                <el-button class="plain-item-btn" type="primary" link>-->
<!--                  REDEEM-->
<!--                </el-button>-->
              </div>

            </div>

          </div>
          <!--        22222222222           -->
          <div class="custom-divider-container custom-divider-margin">
            <el-divider  class="custom-divider-el" :content-position="dividerPosition">
              <span> Pro Plan Perks</span>
            </el-divider>
          </div>

          <div class="plain-container">
            <div class="plain-mask-container"></div>
            <div class="plain-item-2-container">
              <div class="plain-item-label">
                10 days of ads
              </div>
              <div class="plain-item-tips">
                Get a dedicated spot on our website to promote your school or a position.
              </div>
              <div class="plain-item-btn-container-1">
                <el-button class="plain-item-btn" type="primary" link>
                  MANAGE MY ADS
                </el-button>
              </div>

            </div>

            <div class="plain-item-2-container">
              <div class="plain-item-label">
                Personal success manager
              </div>

              <div class="plain-item-tips">
                Our team is here to help you maximize our tools and perks so that you can achieve your goals quickly.
              </div>
              <div class="plain-item-btn-container-1">

                <el-button class="plain-item-btn" type="primary" link>
                  CONTACT US
                </el-button>
              </div>

            </div>

            <div class="plain-item-2-container">
              <div class="plain-item-label">
                Top 6 ranking for 5 days
              </div>

              <div class="plain-item-tips">
                Get your job post on top of the search results for 5 days.
              </div>
              <div class="plain-item-btn-container-1">

                <el-button class="plain-item-btn" type="primary" link>
                  REDEEM
                </el-button>
              </div>

            </div>

            <div class="plain-item-2-container">
              <div class="plain-item-label">
                5 Social media blasts
              </div>

              <div class="plain-item-tips">
                Use the power of social media to spread the work about your job post on EduPassport
              </div>

              <div class="plain-item-btn-container-1">

                <el-button class="plain-item-btn" type="primary" link>
                  LET'S DO IT!
                </el-button>
              </div>

            </div>

            <div class="plain-item-2-container">
              <div class="plain-item-label">
                New member article
              </div>

              <div class="plain-item-tips">
                Let everyone get to know you more personally in our article about all new members.
              </div>
              <div class="plain-item-btn-container-1">
                <el-button class="plain-item-btn" type="primary" link>
                  CONTACT US
                </el-button>
              </div>

            </div>

            <div class="plain-item-2-container">
              <div class="plain-item-label">
                5 deal cards
              </div>

              <div class="plain-item-tips">
                Share great deals and discounts from businesses who support education with friends
              </div>
              <div class="plain-item-btn-container-1">
                <el-button class="plain-item-btn" type="primary" link>
                  REDEEM
                </el-button>
              </div>

            </div>

          </div>
          <!--        3333333333 -->
          <div class="custom-divider-container custom-divider-margin">
            <el-divider  class="custom-divider-el" :content-position="dividerPosition">
              <span>  Plus Plan Perks</span>
            </el-divider>
          </div>

          <div class="plain-container">
            <div class="plain-mask-container"></div>
            <div class="plain-item-3-container">
              <div class="plain-item-label">
                25% off + 15 days of ads
              </div>
              <div class="plain-item-tips">
                Get a dedicated spot on our website to promote your school or a position.
              </div>
              <div class="plain-item-btn-container-1">
                <el-button class="plain-item-btn" type="primary" link>
                  MANAGE MY ADS
                </el-button>
              </div>

            </div>

            <div class="plain-item-3-container">
              <div class="plain-item-label">
                Access to all educators
              </div>

              <div class="plain-item-tips">
                Don't wait for candidates to apply-reach out to them first.
              </div>
              <div class="plain-item-btn-container-1">

                <el-button class="plain-item-btn" type="primary" link>
                  CONTACT US
                </el-button>
              </div>

            </div>

            <div class="plain-item-3-container">
              <div class="plain-item-label">
                Top 6 ranking for 10 days
              </div>

              <div class="plain-item-tips">
                Get your job post on top of the search results for 10 days.
              </div>
              <div class="plain-item-btn-container-1">

                <el-button class="plain-item-btn" type="primary" link>
                  REDEEM
                </el-button>
              </div>

            </div>

            <div class="plain-item-3-container">
              <div class="plain-item-label">
                10 Social media blasts
              </div>

              <div class="plain-item-tips">
                Use the power of social media to spread the work about your job post on EduPassport
              </div>

              <div class="plain-item-btn-container-1">

                <el-button class="plain-item-btn" type="primary" link>
                  LET'S DO IT!
                </el-button>
              </div>

            </div>

            <div class="plain-item-3-container">
              <div class="plain-item-label">
                Dedicated article
              </div>

              <div class="plain-item-tips">
                Let everyone get to know you more personally in our article about you and only you.
              </div>
              <div class="plain-item-btn-container-1">
                <el-button class="plain-item-btn" type="primary" link>
                  CONTACT US
                </el-button>
              </div>

            </div>

            <div class="plain-item-3-container">
              <div class="plain-item-label">
                10 deal cards
              </div>

              <div class="plain-item-tips">
                Share great deals and discounts from businesses who support education with friends
              </div>
              <div class="plain-item-btn-container-1">
                <el-button class="plain-item-btn" type="primary" link>
                  REDEEM
                </el-button>
              </div>

            </div>

            <div class="plain-item-3-container">
              <div class="plain-item-label">
                Job post translating
              </div>

              <div class="plain-item-tips">
                When you go international, make sure that noting is lost in translation.
              </div>
              <div class="plain-item-btn-container-1">
                <el-button class="plain-item-btn" type="primary" link>
                  CONTACT US
                </el-button>
              </div>

            </div>


          </div>


        </div>

      </el-scrollbar>

    </div>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default/avatar.png'
import plainImgOne from '@/assets/perks/plain_1.png'
import plainImgTwo from '@/assets/perks/plain_2.png'
import plainImgThree from '@/assets/perks/warning_fill.png'

import meSideMenu from "@/components/meSideMenu";
import {computed, ref} from "vue";
import imgLogo from '@/assets/logo.png';
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "index",
  components: {
    meSideMenu,
  },
  setup() {

    const i = ref(localStorage.getItem('identity'))

    const identity1 = computed(() => {
      return i.value
    })

    return {
      identity1
    }

  },
  computed: {},
  data() {
    return {
      dividerPosition:'center',
      defaultAvatar,
      imgLogo,
      plainImgOne,
      plainImgTwo,
      plainImgThree
    }
  },
  mounted() {
    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      this.dividerPosition = 'left'
      updateWindowHeight()
    }

    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        this.dividerPosition = 'left'
        updateWindowHeight()
      }
    }

  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  methods: {
    turnMyDeals(){
        this.$router.push({path:'/deals/myDeals',query:{}})
    },
    turnMyEvents(){
      this.$router.push({path:'/events/myEvents',query:{}})
    },
    turnMyJobPosts(){
      this.$router.push({path:'/jobs/home',query:{}})
    }


  }


}
</script>

<style scoped>
.bg {
  background-color: #F0F2F5;
}

.perks-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.perks-l-container {

}

.perks-r-container {
  width: calc(100% - 160px);
  height: calc(100vh - 140px);
}

.perks-r-bg-container{
  padding: 50px;
}

.custom-divider-container {
  width: 100%;
}
.custom-divider-el{
  height:2px;
  border-color: #262626;
}
.custom-divider-container span{
  /*color: #6650B3;*/
  color: #262626;
  font-family: BSemiBold, serif;
  font-size: 35px;
  text-align: center;
}

.custom-divider-margin{
  margin-top: 50px;
}

.plain-container, .plain-xll-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;

}

.plain-mask-container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: rgba(240, 242, 245, .4);
  z-index: 200;
}

.plain-item-container,.plain-xll-item-container {

  width: 276px;
  padding:50px;
  background-color: #F0F2F5;
  box-shadow: 0px 0px 23px #14363833;
  border-radius: 18px;
  margin-top: 50px;
  margin-right: 50px;

}

/*.plain-item-container:nth-child( 4n ){*/
/*  margin-right: 0;*/
/*}*/


.plain-item-container:hover, .plain-xll-item-container:hover {
  background-color: rgba(102, 72, 255, .2);
  box-shadow: 10px 10px 23px #14363833;
}

.plain-item-2-container {

  width: 276px;
  padding:50px;
  background-color: #F0F2F5;
  box-shadow: 0px 0px 23px #14363833;
  border-radius: 18px;
  margin-top: 50px;
  margin-right: 50px;

}

/*.plain-item-2-container:nth-child( 5n ){*/
/*  margin-right: 0;*/
/*}*/


.plain-item-2-container:hover {
  background-color: rgba(102, 72, 255, .2);
  box-shadow: 10px 10px 23px #14363833;
}


.plain-item-3-container {

  width: 276px;
  padding:50px;
  background-color: #F0F2F5;
  box-shadow: 0px 0px 23px #14363833;
  border-radius: 18px;
  margin-top: 50px;
  margin-right: 50px;

}

/*.plain-item-3-container:nth-child( 5n ){*/
/*  margin-right: 0;*/
/*}*/


.plain-item-3-container:hover {
  background-color: rgba(102, 72, 255, .2);
  box-shadow: 10px 10px 23px #14363833;
}

.plain-item-margin-1 {
  margin: 50px 0 0 0;
}

.plain-item-margin {
  margin: 50px 0 0 50px;
}

.plain-item-label {
  font-family: BSemiBold, serif;
  font-size: 24px;

}

.plain-item-image-container {
  text-align: center;
}

.plain-item-msg-img {
  padding: 20px 0;
}

.plain-item-job-img {
  padding: 20px 0;
}

.plain-item-notice-img {
  padding: 50px 0;
}

.plain-item-percentage {
  padding: 50px 0;
}

.plain-item-tips {
  font-family: AssiRegular, serif;
  font-size: 23px;
  color: #262626;
}

.plain-item-btn-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
}

.plain-item-btn-container-1 {
  text-align: right;
  margin-top: 50px;
}

.plain-item-btn {
  font-size: 20px;
}

/deep/ .el-divider__text{
  background-color: #F0F2F5;
  padding: 0 50px;
}


@media screen and (max-width: 768px) {

}

@media screen and (min-width: 769px) and (max-width: 992px) {


}

@media screen and (min-width: 993px) and (max-width: 1200px) {

}

@media screen and (min-width: 1200px) {

}

@media screen and  (min-width: 1200px) {

}

@media screen and (max-width: 768px) {

  .perks-r-container{
    width: 100%;
    height: calc( var(--i-window-height) - 160px);
  }

  .perks-r-bg-container{
    padding: 15px 0;
  }
  /deep/ .el-divider__text{
    background-color: #F0F2F5;
    padding: 0;
    font-size: 20px;
  }

  .custom-divider-container span{
    /*color: #6650B3;*/
    color: #262626;
    font-family: BSemiBold, serif;
    font-size: 20px;
    text-align: center;
  }

  .custom-divider-el{
    border-color: #F0F2F5;
  }

  .plain-xll-container{

  }

  .plain-xll-item-container{
    width: calc(50% - 60px);
    padding: 15px;
    margin: 15px;
  }

  .plain-item-btn{
    font-size: 12px;
  }

  .plain-container{

    flex-wrap: nowrap;
    overflow: scroll;
  }

  .plain-item-container{
    padding: 15px;
    flex-shrink: 0;
    margin: 15px;
  }

  .plain-item-2-container{
    padding: 15px;
    flex-shrink: 0;
    margin: 15px;
  }

  .plain-item-3-container{
    padding: 15px;
    flex-shrink: 0;
    margin: 15px;
  }

  .plain-item-label{
    font-size: 18px;
  }

  .plain-item-tips{
    font-size: 14px;
  }


}


</style>
