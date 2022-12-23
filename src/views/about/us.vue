<template>
  <div class="about-us-bg">
    <h2>Our story</h2>
    <h5>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed.</h5>
    <div class="about-us-pic">
      <el-image class="about-us-pic-img" :src="aboutUsPicImg"></el-image>
    </div>
    <div class="about-us-intro">
      <p>
        EDU Passport was created to modernize / standardize the beautiful, adventurous, and rewarding world of global education. Many educators and school leaders, in the industry, can relate to our founders experience and reason for conceptualizing EDU Passport. The beautiful exciting EDU industry is often also filled with trouble, scams, racism, unreliability, and much more. Our team and community are set to right the wrongs as well as pave a new road for how a career in education should be.
      </p>
    </div>

    <div class="about-us-part-2">
      <h2> <span>EDU Passport will be the the </span>#1 resource <span>in international education by end of 2023.</span> </h2>

      <div class="about-us-our-values">
        <h2>Our Values</h2>
        <div class="about-us-our-values-items">
          <div class="about-us-our-values-item">
            <div class="about-us-our-values-item-t">
              We champion honesty
            </div>
            <div class="about-us-our-values-item-b">
              We work to bring transparency to the international education industry, making it safer and more reliable.
            </div>
          </div>
          <div class="about-us-our-values-item">
            <div class="about-us-our-values-item-t">
              We celebrate diversity
            </div>
            <div class="about-us-our-values-item-b">
              We promote and reward fair, inclusive employment opportunities.
            </div>
          </div>
          <div class="about-us-our-values-item">
            <div class="about-us-our-values-item-t">
              We dare to be different
            </div>
            <div class="about-us-our-values-item-b">
              We're shaking things up in an industry that's stuck in the past.
            </div>
          </div>
          <div class="about-us-our-values-item">
            <div class="about-us-our-values-item-t">
              We’re committed to our community
            </div>
            <div class="about-us-our-values-item-b">
              We empower educators and education businesses worldwide. What matters to them matters to us.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="about-us-part-3">
      <h2>Our team</h2>
      <div class="about-us-our-team">
        <swiper
            :slidesPerView="4"
            :spaceBetween="30"
            :slidesPerGroup="4"
            :loop="true"
            :loopFillGroupWithBlank="true"
            :modules="modules"
            class="mySwiper"
        >
          <swiper-slide>
            <div class="about-us-our-team-item">
              <div class="about-us-our-team-item-t">
                <el-image class="about-us-team-item-t-img" :src="aboutUsPicOne"></el-image>
              </div>
              <div class="about-us-our-team-item-b">
                <div class="about-us-our-team-item-b-t">
                  Lorem ipsum
                </div>
                <div class="about-us-our-team-item-b-b">
                  Lorem ipsum dolor sit amet
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="about-us-our-team-item">
              <div class="about-us-our-team-item-t">
                <el-image class="about-us-team-item-t-img" :src="aboutUsPicTwo"></el-image>
              </div>
              <div class="about-us-our-team-item-b">
                <div class="about-us-our-team-item-b-t">
                  Lorem ipsum
                </div>
                <div class="about-us-our-team-item-b-b">
                  Lorem ipsum dolor sit amet
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="about-us-our-team-item">
              <div class="about-us-our-team-item-t">
                <el-image class="about-us-team-item-t-img" :src="aboutUsPicThree"></el-image>
              </div>
              <div class="about-us-our-team-item-b">
                <div class="about-us-our-team-item-b-t">
                  Lorem ipsum
                </div>
                <div class="about-us-our-team-item-b-b">
                  Lorem ipsum dolor sit amet
                </div>
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="about-us-our-team-item">
              <div class="about-us-our-team-item-t">
                <el-image class="about-us-team-item-t-img" :src="aboutUsPicFour"></el-image>
              </div>
              <div class="about-us-our-team-item-b">
                <div class="about-us-our-team-item-b-t">
                  Lorem ipsum
                </div>
                <div class="about-us-our-team-item-b-b">
                  Lorem ipsum dolor sit amet
                </div>
              </div>
            </div>
          </swiper-slide>

        </swiper>
      </div>
    </div>

    <div class="about-us-part-4">
      <h2>Join Team #EDUPassport</h2>
      <p>Interested in joining the team? Check out our open roles or contact us & tell us more! (link contact us to contact page)</p>
      <div class="about-us-join-team">
        <div class="about-us-join-team-item">
          <div class="about-us-join-team-item-item">Job Title</div>
          <div class="about-us-join-team-item-item">Department</div>
          <div class="about-us-join-team-item-item">Location</div>
          <div class="about-us-join-team-item-item">
            <el-button plain round>Apply</el-button>
          </div>
        </div>
        <div class="about-us-join-team-item">
          <div class="about-us-join-team-item-item">Job Title</div>
          <div class="about-us-join-team-item-item">Department</div>
          <div class="about-us-join-team-item-item">Location</div>
          <div class="about-us-join-team-item-item">
            <el-button plain round>Apply</el-button>
          </div>
        </div>
        <div class="about-us-join-team-item">
          <div class="about-us-join-team-item-item">Job Title</div>
          <div class="about-us-join-team-item-item">Department</div>
          <div class="about-us-join-team-item-item">Location</div>
          <div class="about-us-join-team-item-item">
            <el-button plain round>Apply</el-button>
          </div>
        </div>
        <div class="about-us-join-team-item">
          <div class="about-us-join-team-item-item">Job Title</div>
          <div class="about-us-join-team-item-item">Department</div>
          <div class="about-us-join-team-item-item">Location</div>
          <div class="about-us-join-team-item-item">
            <el-button plain round>Apply</el-button>
          </div>
        </div>
        <div class="about-us-join-team-item">
          <div class="about-us-join-team-item-item">Job Title</div>
          <div class="about-us-join-team-item-item">Department</div>
          <div class="about-us-join-team-item-item">Location</div>
          <div class="about-us-join-team-item-item">
            <el-button plain round>Apply</el-button>
          </div>
        </div>
      </div>
    </div>

    <newFooter></newFooter>

  </div>
</template>

<script>
import newFooter from '@/layout/components/newFooter'
import aboutUsPicOne from '@/assets/about/about-us-team-1.png'
import aboutUsPicTwo from '@/assets/about/about-us-team-2.png'
import aboutUsPicThree from '@/assets/about/about-us-team-3.png'
import aboutUsPicFour from '@/assets/about/about-us-team-4.png'
import aboutUsPicImg from '@/assets/about/about-us-pic.png'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/navigation";

export default {
  name: "us",
  components: {
    Swiper,
    SwiperSlide,
    newFooter
  },
  setup() {
    return {
      modules: [],
    };
  },
  data() {
    return {
      aboutUsPicImg,
      aboutUsPicOne,
      aboutUsPicTwo,
      aboutUsPicThree,
      aboutUsPicFour,
    }
  },
  mounted() {

  },
  methods: {}
}
</script>

<style scoped>
.about-us-bg{
  background-color: #FFFFFF;
}
h2{
  font-family: "Montserrat Medium", Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  color: #6650B3;
  text-align: center;
  margin: 10px 0;
  font-size: 40px;
}
h5{
  font-family: "Cabin SemiBold", Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  text-align: center;
}

.about-us-pic{
  margin: 50px auto 0;
  text-align: center;
}
.about-us-pic-img{
  width: 1000px;
}
.about-us-intro{
  max-width: 810px;
  margin: 50px auto 0;
}
.about-us-intro p{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
}

.about-us-part-2{
  margin-top: 50px;
}
.about-us-part-2 h2{
  width: 940px;
  margin: 0 auto;
  text-align: center;
  font-size: 40px;
}
.about-us-part-2 h2 span{
  color: #262626;
}

.about-us-our-values{
  margin-top: 90px;
}

.about-us-our-values-items{
  width: 1100px;
  margin: 50px auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.about-us-our-values-item{
  flex: 1;
  margin: 15px;
}

.about-us-our-values-item-t{
  font-family: "Cabin SemiBold", Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 26px;
}

.about-us-our-values-item-b{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin-top: 15px;
}

.about-us-our-team{
  /*margin-top: 50px;*/
}


.swiper {
  width: 1100px;
  height: 360px;
  margin: 50px auto;
}

.swiper-slide {
  height: 360px;

}

.about-us-team-item-t-img{
  width: 100%;
}


.about-us-our-team-item-b-t{
  font-family: "Cabin SemiBold", Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
}

.about-us-our-team-item-b-b{
  font-family:AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
}

.about-us-part-4{

}

.about-us-part-4 h2{
  font-size: 40px;
}

.about-us-part-4 p{
  text-align: center;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
}

.about-us-join-team{
  width: 1100px;
  margin: 50px auto;
}
.about-us-join-team-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #262626;
  padding: 16px 0;
}

.about-us-join-team-item-item{
  font-size: 22px;
  font-family: "Cabin SemiBold", Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;

}

@media screen and (max-width: 768px) {
  h2{
    font-size: 24px;
  }
  h5{
    font-size: 18px ;
  }

  .about-us-pic{
    margin-top: 25px;
  }

  .about-us-pic-img{
    width: 100%;
  }

  .about-us-intro{
    margin-top: 25px;
  }

  .about-us-intro p{

    font-size: 16px;
    padding: 0 15px;
  }

  .about-us-part-2{
    margin-top: 25px;
    background-color: #F0F2F5;
    padding: 25px;
  }

  .about-us-part-2 h2{
    width: 100%;
    font-size: 24px;
  }

  .about-us-our-values{
    margin-top: 25px;
  }
  .about-us-our-values-items{
    width: 100%;
    margin: 25px auto;
    flex-direction: column;
  }

  .about-us-our-values-item-t{
    font-size: 18px;
  }

  .about-us-our-values-item-b{
    font-size: 14px;
  }

  .about-us-part-3{
    padding: 25px;
    overflow: hidden;
  }

  .swiper{
    /*width:auto;*/
  }

  .about-us-part-4{
    padding: 25px;
    background-color: #F0F2F5;
  }
  .about-us-part-4 h2{
    font-size: 24px;
  }
  .about-us-part-4 p{
    font-size: 16px;
  }

  .about-us-join-team{
    width: 100%;
  }

  .about-us-join-team-item{
    flex-direction: column;
    align-items: flex-start;
    position: relative;

  }

  .about-us-join-team-item-item{
    font-size: 18px;
  }



}


</style>
