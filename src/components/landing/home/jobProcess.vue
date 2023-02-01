<template>
<div>
  <el-row class="d-row-container" :gutter="0" justify="center">
    <el-col class="d-col-container" :span="24">
      <div class="d-container">
        <div class="d-label">
          Our <span>Transparent</span> Job process
        </div>
        <div class="d-tips">
          Other education job boards just don’t compare! Enjoy searching, applying, & interviewing for global positions with ease.
        </div>
        <div class="d-c-bg">
          <div class="d-c-container">
            <div class="d-c-t">
              <div class="d-c-t-item d-c-t-item-1">
                <el-image class="image-pc" :src="pcImageOne"></el-image>
                <br>
                <span>
                    With a complete profile, <br> educators can apply with just one click!
                  </span>
              </div>
              <div class="d-c-t-item d-c-t-item-s">
                <el-icon :size="80">
                  <IconPcStatusSent />
                </el-icon>
              </div>
              <div class="d-c-t-item d-c-t-item-2">
                <el-image class="image-pc" :src="pcImageTwo"></el-image>
                <br>
                <span>
                    The recruiter / HR officer will be <br> notified & instantly be able to <br> review your application.
                  </span>
              </div>
              <div class="d-c-t-item d-c-t-item-i">
                <el-icon :size="120">
                  <IconPcStatusInterested />
                </el-icon>
              </div>
              <div class="d-c-t-item d-c-t-item-3">
                <el-image class="image-pc" :src="pcImageThree"></el-image>
                <br>
                <span>
                    Successful applicants will be<br> invited for an interview.
                  </span>
              </div>

            </div>
            <div class="d-c-b">
              <div class="d-c-b-item">
                <el-image class="image-pc" :src="pcImageFour"></el-image>
                <br>
                <h5>Hired!</h5>
                <span>
                    Hired! (We love it when this happens.)
                  </span>
              </div>
              <div class="d-c-b-item-then">
                <el-icon :size="80">
                  <IconPcStatusThen />
                </el-icon>
              </div>
            </div>
          </div>
        </div>

        <div class="d-c-bg-mobile">
            <div class="d-c-mobile-container">

              <div class="d-c-mobile-item">
                <el-image class="image-mobile" :src="mobileImageOne"></el-image>
                <br>
                <span>
                    With a complete profile, <br> educators can apply with just one click!
                  </span>
              </div>
              <div class="d-c-mobile-item">
                <el-icon :size="80">
                  <IconMobileStatusSent />
                </el-icon>
              </div>
              <div class="d-c-mobile-item">
                <el-image class="image-mobile" :src="mobileImageTwo"></el-image>
                <br>
                <span>
                    The recruiter / HR officer will be <br> notified & instantly be able to <br> review your application.
                  </span>
              </div>
              <div class="d-c-mobile-item">
                <el-icon :size="120">
                  <IconMobileStatusInterested />
                </el-icon>
              </div>
              <div class="d-c-mobile-item">
                <el-image class="image-mobile" :src="mobileImageThree"></el-image>
                <br>
                <span>
                    Successful applicants will <br> invited for an interview.
                  </span>
              </div>
              <div class="d-c-mobile-item">
                <el-icon :size="80">
                  <IconMobileStatusThen />
                </el-icon>
              </div>

              <div class="d-c-mobile-item">
                <el-image class="image-mobile" :src="mobileImageFour"></el-image>
                <br>
                <h5>Hired!</h5>
                <span>
                    Hired! (We love it when this happens.)
                  </span>
              </div>


            </div>
        </div>

        <div>
          <el-button type="primary" round @click="searchJobs()">
            See All EDU Jobs
          </el-button>
        </div>
      </div>
    </el-col>
  </el-row>

</div>
</template>

<script>
import pcImageOne from '@/assets/svg/pc/image-one.svg'
import pcImageTwo from '@/assets/svg/pc/image-two.svg'
import pcImageThree from '@/assets/svg/pc/image-three.svg'
import pcImageFour from '@/assets/svg/pc/image-four.svg'
import mobileImageOne from '@/assets/svg/mobile/image-one.svg'
import mobileImageTwo from '@/assets/svg/mobile/image-two.svg'
import mobileImageThree from '@/assets/svg/mobile/image-three.svg'
import mobileImageFour from '@/assets/svg/mobile/image-four.svg'
export default {
  name: "jobProcess",
  data(){
    return {
      pcImageOne,
      pcImageTwo,
      pcImageThree,
      pcImageFour,
      mobileImageOne,
      mobileImageTwo,
      mobileImageThree,
      mobileImageFour
    }
  },
  methods:{
    searchJobs(){
      this.$router.push('/jobs')
    }
  }
}
</script>

<style scoped>

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
  width:1200px;
  height: 1300px;
  margin: 0 auto;
  background-image: url("@/assets/svg/pc/background-path.svg");
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}

.d-c-container{

}

.d-c-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.d-c-t-item{

}
.d-c-t-item span{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 22px;
}

.d-c-t-item-1{
  margin-top: 100px;
  margin-left: -200px;
  margin-right: 30px;
}
.d-c-t-item-2{
  margin-top: 100px;
  margin-left: 20px;
  margin-right: 20px;
}
.d-c-t-item-3{
  margin-top: 100px;
  margin-right: -200px;
}
.d-c-t-item-s{
  margin-top: 120px;
}

.d-c-t-item-i{
  margin-top: 120px;
}
.d-c-b{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
}

.d-c-b-item{
  margin-top: 260px;
}
.d-c-b-item span{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 16px;
}
.d-c-b-item-then{
  position: absolute;
  right:166px;
}
.image-pc{

}
.image-mobile{
  width: 200px;
}

@media screen and (min-width: 769px){
  .d-c-bg-mobile {
    display: none;
  }

}
@media screen and (min-width: 769px) and (max-width: 992px) {
  .d-c-bg{
    transform: scale(.5);
    margin-top: -230px;
  }

}

@media screen and (min-width: 993px) and (max-width: 1200px) {
  .d-c-bg{
    transform: scale(.7);
    margin-top: -120px;
  }
}

@media screen and (min-width: 1201px ) and (max-width: 1377px) {
  .d-c-bg{
    margin-top: -60px;
    transform: scale(.8);
  }
}

@media screen and (max-width: 768px){

  .d-label{
    font-size: 24px;
  }
  .d-tips{
    font-size: 16px;
  }
  .d-c-bg{
    display: none;
  }

  .d-col-container{
    padding: 15px;
  }

  .d-c-bg-mobile {

  }

  .d-c-mobile-container{
    margin-top: 25px;
    margin-bottom: 25px;
    background-image: url("@/assets/svg/mobile/background-path.svg");
    background-size: 100% 90%;
    background-position: center;
    background-repeat: no-repeat;
  }

  .d-c-mobile-item{

  }

  .d-c-mobile-item span{
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 16px;
  }

}

</style>