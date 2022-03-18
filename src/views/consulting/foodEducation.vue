<template>
  <div>
    <div class="section-one-bg">
      <div class="section-one-pushcart">
        <div class="section-one-pushcart-mask">
          <el-image class="section-one-pushcart-img" :src="pushcartLogoImg"></el-image>
        </div>
      </div>
      <div class="my-wrapper">
        <div class="section-one-label">
          TRUSTED BY SCHOOLS COUNTRYWIDE
        </div>
        <div class="section-one-tags">
          <div class="section-one-tag">
            <el-image class="section-one-tag-img" :src="section1logo1Img" fit="cover"></el-image>
          </div>
          <div class="section-one-tag">
            <el-image class="section-one-tag-img" :src="section1logo2Img" fit="cover"></el-image>
          </div>
          <div class="section-one-tag">
            <el-image class="section-one-tag-img" :src="section1logo3Img" fit="cover"></el-image>
          </div>
          <div class="section-one-tag">
            <el-image class="section-one-tag-img" :src="section1logo4Img" fit="cover"></el-image>
          </div>
        </div>

      </div>
    </div>

    <div class="section-two-bg">
      <div class="section-display section-width">
        <div class="section-two-l">
          <div class="section-two-l-mask">
            FOOD <br>
            EDUCATION
          </div>
        </div>
        <div class="section-two-r">
          <div class="section-two-r-label">Healthy Meals for Healthy Minds</div>
          <div class="section-two-r-label-underline"></div>
          <p>Nutrition directly impacts academic performance, making what students eat as important as the classes they
            take. Yet, catering to different tastes, appetites, and ages is neither easy nor cheap.
            <br> <br>
            At Food For Education, we believe all children have the right to healthy lunches that leave them feeling
            full, satisfied, and focused. That’s why we made it our mission to provide quality school meals that
            students enjoy at prices schools love. Driven by a passion for good food and a desire to help schools and
            their students reach their full potential, we deliver fresh, delicious, and nutritious lunches to schools
            across Asia.</p>
          <div class="section-two-r-btn-container">
            <el-button class="section-two-r-btn" type="primary" round>
              Request a sample
            </el-button>
          </div>
        </div>

      </div>
    </div>

    <div class="section-three-bg">
      <div class="section-display section-width">
        <div class="section-three-l">
          <div class="section-three-l-label">The Missing Ingredient in Your Catering Team</div>
          <div class="section-three-l-label-underline"></div>
          <div class="section-three-l-desc">
            At a lower price per head than competing products, our pre-packed meals fit seamlessly into your lunchtime
            schedule, removing stress from your staff and pressure from your budget.
          </div>
          <div class="section-three-l-enjoy">
            <h4>Enjoy Higher Quality at Lower Prices</h4>
            <p>
              Give your students the nourishment they need to stay focused, alert, and ready to learn with fresh meals
              made from high-quality local ingredients.
            </p>
          </div>
          <div class="section-three-l-container">
            <div class="section-three-l-item">
              <div class="section-three-l-l">
                <el-image class="section-three-l-l-img" :src="section32Img"></el-image>
              </div>
              <div class="section-three-l-r">
                <h4>Encourage Healthy Eating Habits </h4>
                <p>
                  Made to match individual tastes, our varied menus give students more choice in what they eat, keeping
                  them and their parents happy.
                </p>
              </div>
            </div>
            <div class="section-three-l-item">
              <div class="section-three-l-l">
                <el-image class="section-three-l-l-img" :src="section31Img"></el-image>
              </div>
              <div class="section-three-l-r">
                <h4>Say Goodbye to Guesswork </h4>
                <p>
                  Our meal sets make it easy to plan how much food you’ll need and adjust portion sizes as you go, so no
                  student has too much or too little. Minimize waste, cut costs, and become more sustainable.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="section-three-r">
          <div class="section-three-r-position">
            <div class="section-three-r-container">
              <div class="section-three-r-item">
                <el-image class="section-three-r-item-img" :src="section33Img" fit="cover"></el-image>
              </div>
              <div class="section-three-r-item">
                <el-image class="section-three-r-item-img" :src="section34Img" fit="cover"></el-image>
              </div>
              <div class="section-three-r-item">
                <el-image class="section-three-r-item-img" :src="section35Img" fit="cover"></el-image>
              </div>
              <div class="section-three-r-item">
                <el-image class="section-three-r-item-img" :src="section33Img" fit="cover"></el-image>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="section-four-bg">
      <div class="section-four-bg-2">
        <div class="section-four-absolute section-width section-display-mid">
          <div class="section-four-l">

            <swiper
                @slideChange="section4SlideChange"
                :slidesPerView="3"
                :initialSlide="1"
                :centeredSlides="true"
                :spaceBetween="20"
                :loop="false"
                :autoplay='{"delay": 2500,"disableOnInteraction": false,"pauseOnMouseEnter":true}'
                class="mySwiper">
              <swiper-slide class="mySwiper-slide" v-slot="{ isActive }"
                            v-for="(slideContent, index) in section4SlideData"
                            :key="index"
              >
                <div class="section-four-l-item " :class="isActive ? 'section-four-l-item-active' : '' ">
                  <el-image class="section-four-l-item-img" :src="slideContent.url" fit="contain"></el-image>
                </div>
              </swiper-slide>

            </swiper>
          </div>
          <div class="section-four-r">
            <div class="section-four-r-icon"></div>
            <p>
              {{ section4SlideDetailData.text }}
            </p>

            <div class="section-four-r-name">
              {{ section4SlideDetailData.name }}
            </div>
            <div class="section-four-r-intro">
              {{ section4SlideDetailData.intro }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  高乘以0.85为宽-->
    <div class="section-six-bg">
      <div class="section-width">
        <div class="section-six-container ">

          <div class="section-six-label">Fresh, Safe, and Certified</div>
          <div class="section-six-label-underline"></div>

          <h4>Fresh, Safe, and Certified </h4>
          <p>The hardest part of outsourcing catering is knowing who to trust. From preparation to packaging, we guarantee
            food safety and freshness at every stage of the process.
            Our team members are trained in food hygiene, and our meals, kitchens, and delivery systems meet food safety
            standards—we’ve even got the certificates to prove it.
          </p>
          <div class="section-six-content">
            <div class="section-six-content-l">
              <h4>Here’s how it works:</h4>
              <p>
                1.Once made, we freeze meals using rapid air cooling (RAC), ensuring food retains its freshness and
                nutrition.
              </p>
              <p>
                2.We then carefully pack our meals in a refrigerated truck and deliver them directly to you.
              </p>
              <p>
                3.Upon arrival, our specialized food safety team will provide storage and serving training to your staff,
                so they know what to do.
              </p>
            </div>
            <div class="section-six-content-r">
              <el-image src="https://cdn.jsdelivr.net/gh/unilei/images@master/20220318/xxx.pbzmthu1rcw.webp"
                        fit="contain"></el-image>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="section-seven-bg">
      <div class="section-seven-container section-width">
        <div class="section-seven-l">
          <el-image
              class="section-seven-img"
              src="https://cdn.jsdelivr.net/gh/unilei/images@master/20220318/xxx.6m5yscgt3os0.webp"
              fit="cover"
          ></el-image>
        </div>
        <div class="section-seven-r">
          <div class="section-seven-r-label">Customize Your Menus</div>
          <div class="section-seven-r-label-underline"></div>
          <div class="section-seven-r-content">
            <p>
              No two students want the same thing for lunch. That’s why we offer customizable menus you can build to
              suit their tastes. Choose from a range of dishes inspired by local flavors, pallets, and traditions and
              enjoy fresh, locally sourced produce from a supplier near you.
            </p>
            <h5>Standard Set</h5>
            <p>Main dish + side + drink</p>
            <h5>Premium Set</h5>
            <p>Main dish + side + dessert + drink</p>
            <h5>Deluxe Set</h5>
            <p>Main dish + side + snack + fruit cup + dessert + drink</p>

            <p>
              Are you interested in another combination? You can also tailor your set options based on your school’s
              needs. Get in touch to find out more.
            </p>

            <div class="section-seven-btn-container">
              <el-button class="section-seven-btn" type="primary" round>Request Full Menu</el-button>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="section-8-bg">
      <div class="section-8-container section-width">
        <div class="section-8-l">
          <h4>Pricing</h4>
          <p>Our meals aren’t only fresh; they’re also affordable. Prices depend on your location and the set meals you
            choose, but one thing we can say is that it won’t break your budget.</p>
          <h4>How It Works</h4>
          <p>
            1.Submit an inquiry: Tell us about your school and what you’re looking for
          </p>
          <p>2.Connect with us: Chat to a member of our team to discuss your needs </p>
          <p>3.Request a sample: Tell us which dishes you wish to try, and we’ll send a sample to you.</p>
          <p>4.Sign a contract: Once you’ve tried your samples, select your sets, build your menus, and sign a contract</p>
          <div class="section-8-btn-container">
            <el-button class="section-8-btn" type="primary" round>Request a Quote</el-button>
          </div>
        </div>
        <div class="section-8-r">
          <el-image
              class="section-8-img"
              src="https://cdn.jsdelivr.net/gh/unilei/images@master/20220318/xxx.4tvgyz7ui2k0.webp"
                    fit="cover"
          ></el-image>
        </div>
      </div>
    </div>

    <div class="section-five-bg">
      <subscribeCompent></subscribeCompent>
    </div>

  </div>
</template>

<script>
import subscribeCompent from "../../components/consulting/subscribe";
import sectionOneBgImg from '@/assets/partners/background.jpg'
import pushcartLogoImg from '@/assets/partners/pushcart-logo.jpg'
import section31Img from '@/assets/partners/section-3-1.png'
import section32Img from '@/assets/partners/section-3-2.png'
import section33Img from '@/assets/partners/section-3-3.png'
import section34Img from '@/assets/partners/section-3-4.png'
import section35Img from '@/assets/partners/section-3-5.png'
import section41Img from '@/assets/partners/section-4-1.png'

import section1logo1Img from '@/assets/partners/logos/logo-1.jpg'
import section1logo2Img from '@/assets/partners/logos/logo-2.jpg'
import section1logo3Img from '@/assets/partners/logos/logo-3.jpg'
import section1logo4Img from '@/assets/partners/logos/logo-4.png'

// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';
import SwiperCore, {Autoplay} from 'swiper';

SwiperCore.use([Autoplay]);
// Import Swiper styles
import 'swiper/css';
import {reactive} from 'vue'


export default {
  name: "foodEducation",
  data() {
    return {
      sectionOneBgImg,
      pushcartLogoImg,
      section31Img,
      section32Img,
      section33Img,
      section34Img,
      section35Img,
      section41Img,
      section1logo1Img,
      section1logo2Img,
      section1logo3Img,
      section1logo4Img,


    }
  },
  setup() {
    const section4SlideData = [
      {
        id: 1,
        url: 'https://cdn.jsdelivr.net/gh/unilei/images@master/20220318/xxx.61fph34jhbs0.webp',
        text: 'I have known this supplier a long time and the food they make is made with lots of love and care. It gives you the warm feeling of being home.',
        name: 'Haixia',
        intro: 'Acekidz Principal'
      },
      {
        id: 2,
        url: 'https://cdn.jsdelivr.net/gh/unilei/images@master/20220318/xxx.7coo8ljmh7s0.webp',
        text: 'I have known this supplier a long time and the food they make is made with lots of love and care. It gives you the warm feeling of being home.',
        name: 'Kangkang',
        intro: 'GM at Hacksons Internations!'
      },
      {
        id: 3,
        url: 'https://cdn.jsdelivr.net/gh/unilei/images@master/20220318/xxx.3urzbt0t2ee0.webp',
        text: 'I have known this supplier a long time and the food they make is made with lots of love and care. It gives you the warm feeling of being home.',
        name: 'Faker',
        intro: 'GM at Hacksons Internations!'
      },
      {
        id: 4,
        url: section41Img,
        text: 'I have known this supplier a long time and the food they make is made with lots of love and care. It gives you the warm feeling of being home.',
        name: 'Memberory',
        intro: 'GM at Hacksons Internations!'
      },
      {
        id: 5,
        url: 'https://cdn.jsdelivr.net/gh/unilei/images@master/20220318/xxx.1etkqched1s0.webp',
        text: 'I have known this supplier a long time and the food they make is made with lots of love and care. It gives you the warm feeling of being home.',
        name: 'Memberory',
        intro: 'GM at Hacksons Internations!'
      }

    ]

    const section4SlideDetailData = reactive(section4SlideData[0])

    return {
      section4SlideData,
      section4SlideDetailData
    }

  },
  components: {
    subscribeCompent,
    Swiper,
    SwiperSlide,
  },
  methods: {
    section4SlideChange(e) {
      console.log(e.realIndex)
      this.$nextTick(function () {
        this.section4SlideDetailData = this.section4SlideData[e.realIndex]
      })
      this.$forceUpdate()
      // console.log(this.section4SlideDetailData)

    },

  }
}
</script>

<style scoped>
.section-one-bg {
  background-image: url("../../assets/partners/background.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.section-one-pushcart {
  padding: 40px 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
}

.section-one-pushcart-mask {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}

.section-one-pushcart-img {
  width: 240px;
  height: 240px;
}

.my-wrapper {
  background-image: url("../../assets/partners/section-1-1.png");
  background-size: 110% 110%;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 80px 0 40px 0;
}

.section-one-label {
  width: 50%;
  padding-top: 40px;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  color: #403f3d;
}

.section-one-tags {
  width: 60%;
  padding: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.section-one-tag {
  /*font-size: 24px;*/
  width: 120px;
  color: #434750;
  /*font-weight: bold;*/
  /*margin-left: 40px;*/
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  overflow: hidden;
}

.section-one-tag-img {
  width: 100%;
  height: 100%;
}

.section-two-bg {
  background-color: #ececec;

}

.section-two-l {
  width: 45%;
  background-image: url("../../assets/partners/section-2-l.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 20px;
  overflow: hidden;

}

.section-two-l-mask {
  width: 100%;
  height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: bold;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.2);
}

.section-two-r {
  width: 45%;
  padding-left: 40px;
}

.section-two-r-label {
  font-size: 22px;
  font-weight: bold;
  text-align: left;
}

.section-two-r-label-underline {
  background-color: #ff4d51;
  width: 60px;
  height: 2px;
}

.section-two-r p {
  text-align: left;
  font-size: 18px;
  margin-top: 20px;
  color: #808080;
}

.section-two-r-btn-container {
  text-align: center;
  margin-top: 40px;
}

.section-two-r-btn {
  font-size: 14px;
}

.section-three-bg {
  background-color: #FFFFFF;
}

.section-three-l {
  width: 45%;
}

.section-three-l-label {
  font-size: 22px;
  font-weight: bold;
  text-align: left;
}

.section-three-l-label-underline {
  background-color: #ff4d51;
  width: 60px;
  height: 2px;
}

.section-three-l-desc {
  margin-top: 20px;
  font-size: 16px;
  color: #7F7F7F;
}

.section-three-l-enjoy {
  margin-top: 20px;
}

.section-three-l-enjoy p {
  margin-top: 10px;
  font-size: 16px;
  color: #7F7F7F;
}

.section-three-l-container {
  padding: 40px 0;
}

.section-three-l-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 20px;
}

.section-three-l-l {
  width: 20%;
  text-align: left;
}

.section-three-l-l-img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}

.section-three-l-r {
  width: 80%;
}

.section-three-l-r h4 {
  text-align: left;
}

.section-three-l-r p {
  text-align: left;
  margin-top: 10px;
  color: #7F7F7F;
  font-size: 16px;
}

.section-three-r {
  width: 45%;
  height: 540px;
  margin-left: 5%;
  overflow: hidden;
  /*-webkit-box-reflect: below 10px -webkit-linear-gradient(transparent,transparent 50%, rgba(255,255,255,0.6) ) ;*/
  position: relative;
}

.section-three-r-position {
  position: absolute;
  right: -60px;
  top: 2px;
  height: 98%;
  width: 100%;
  border: 1px solid rgba(238, 238, 238, 0.83);
  background-color: #0A2349;
  background-size: 99%;
  border-radius: 20px;
  overflow: hidden;

}

.section-three-r-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #ffffff;
  padding: 20px;
}

.section-three-r-item {
  width: 45%;
  height: 200px;
  margin: 10px;
}

.section-three-r-item-img {
  height: 100%;
  border-radius: 20px;
}

@media screen and (min-width: 1100px) {
  .section-width {
    width: 1100px;
    margin: 0 auto;
  }
}

.section-width {

}

.section-display {
  padding: 60px 40px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}

.section-display-mid {
  padding: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.section-four-bg {
  background-color: #ffffff;
  padding: 60px 0;
}

.section-four-bg-2 {
  background-color: #0A2349;
  position: relative;
  height: 220px;
}

.section-four-absolute {
  position: absolute;
  width: 1100px;
  height: 280px;
  top: -30px;
  left: 0;
  right: 0;
  bottom: -30px;
  margin: auto;
}

.section-four-l {
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.mySwiper {
  width: 100%;
  height: 400px;
  position: relative;
}

.mySwiper-slide {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section-four-l-item {
  width: 100%;
  height: 200px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

.section-four-l-item-img {
  width: 100%;
  height: 300px;
  background-color: #ffffff;
  border: 1px solid #EEEEEE;
  border-radius: 20px;

}

.section-four-l-item-active {
  transform: scale(1.4);
  position: absolute;
  z-index: 10000;
}

.section-four-r {
  width: 40%;
  color: #ffffff;
  text-align: left;
  padding-left: 20px;
}

.section-four-r p {
  font-size: 16px;
}

.section-four-r-icon {

}

.section-four-r-name {
  margin-top: 20px;
}

.section-four-r-intro {
  color: #00B2D2;
}

.section-six-bg {
  background-color: #f3f4f6;
}

.section-six-container {
  padding: 80px 0;
  width: 85%;
  margin:0 auto;
}

.section-six-label {
  font-size: 22px;
  font-weight: bold;
  text-align: left;
}

.section-six-label-underline {
  background-color: #ff4d51;
  width: 60px;
  height: 2px;
}

.section-six-container h4 {
  margin-top: 40px;
}

.section-six-container p {
  font-size: 16px;
  color: #808080;
  margin-top: 10px;
}

.section-six-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.section-six-content-l {
  width: 80%;
}

.section-six-content-r {
  width: 20%;
  text-align: center;
}

.section-seven-bg {
  background-color: #FFFFFF;
}

.section-seven-container {
  padding: 80px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.section-seven-l {
  width: 35%;
}

.section-seven-img {
  width: 100%;
}


.section-seven-r {
  width: 45%;
  margin-left: 5%;
}

.section-seven-r-label {
  font-size: 22px;
  font-weight: bold;
  text-align: left;
}

.section-seven-r-label-underline {
  background-color: #ff4d51;
  width: 60px;
  height: 2px;
}

.section-seven-r-content {
  margin-top: 10px;
}

.section-seven-r-content p {
  font-size: 16px;
  color: #808080;
  margin-top: 10px;
}

.section-seven-r-content h5 {
  margin-top: 20px;
}

.section-seven-btn-container {
  margin-top: 20px;
}

.section-8-bg {
  background-color: #ececec;
}

.section-8-container {
  padding: 80px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.section-8-l {
  width: 55%;
}

.section-8-l h4 {
  margin-top: 20px;
}

.section-8-l p {
  font-size: 16px;
  color: #808080;
  margin-top: 10px;
}

.section-8-btn-container {
  margin-top: 20px;
}

.section-8-btn {

}

.section-8-r {
  width: 20%;
  margin-left: 15%;
}

.section-8-img{
  width:100%;
}

</style>
