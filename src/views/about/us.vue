<template>
  <div class="us-bg">
    <el-row class="banner-row" :gutter="0" align="middle" justify="center">
      <el-col class="banner-bg" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h1>About Us</h1>
      </el-col>
    </el-row>
    <el-row class="about-content-row" :gutter="0" align="middle" justify="center">
      <el-col class="about-content-l" :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
        <div class="about-label">
          About <span>ESL Passport</span>
        </div>
        <div class="about-label-underline"></div>
        <div class="about-desc">
          Education professionals around the world face the same problems. As businesses grapple with high staff turnover rates, broken contracts, and increasing competition, educators dodge scams, battle with discrimination, and fight for equal pay - it's the same story everywhere.

          ESL Passport is on a mission to put a stop to practices like these and redefine the international education market. We're the world's first hub of information, resources, and impartial support aimed at anyone and everyone in the industry. Our digital platform sets new standards of transparency and accountability, and our in-person services support your professional growth.

          By shining a light on the good and rebuilding the bad, we're erasing the uncertainty and mistrust that plague the sector and helping everyone - educators, recruiters, and businesses - reach their full potential.

          We're not here to find you a job or send you a teacher. We don't accept commission. And we're not your competition.

          Our aim is simply to make the international education market a more ethical and reliable place for everyone in it.
        </div>
        <div class="about-read-more">
          <el-button type="primary">Read More...</el-button>
        </div>
      </el-col>
      <el-col class="about-content-r" :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
         <el-image class="about-content-img" :src="aboutTeamImg" fit="fill" ></el-image>
      </el-col>
    </el-row>

    <el-row class="we-do-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="we-do-label">
          What <span>we do?</span>
        </div>
        <div class="we-do-content">
          <div class="we-do-item">
            <div class="we-do-icon-container">
              <i class="iconfont el-icon-aliconnection xll-icon"></i>
            </div>
            <div class="we-do-item-label">CONNECTION</div>
            <div class="we-do-item-tips">
              An education hub connecting professionals to education institutions
            </div>
          </div>
          <div class="we-do-item">
            <div class="we-do-icon-container">
              <i class="iconfont el-icon-aliabout-list xll-icon"></i>
            </div>
            <div class="we-do-item-label">LISTINGS</div>
            <div class="we-do-item-tips">
              An organized registery of professional opportunities worldwide
            </div>
          </div>
          <div class="we-do-item">
            <div class="we-do-icon-container">
              <i class="iconfont el-icon-alieducation xll-icon"></i>
            </div>
            <div class="we-do-item-label">EDUCATION</div>
            <div class="we-do-item-tips">
              Promoting education every step of the way; and we do it well
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import aboutTeamImg from '@/assets/about/about-team.png'
export default {
  name: "us",
  data() {
    return {
      aboutTeamImg
    }
  },
  mounted() {

  },
  methods: {}
}
</script>

<style scoped>
.us-bg {
  background-color: #f5f6f7;
}

.banner-bg {
  height: 300px;
  background-color: #000000;
  background-image: url("../../assets/about/about-us-bg-1.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.banner-bg h1 {
  height: 100%;
  background-color: rgba(30, 30, 30, 0.6);
  font-size: 28px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 300px;
}

.about-content-row {
  /*width: 1100px;*/
  margin: 40px auto;
  background-color: #FFFFFF;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  text-align: left;
}

.about-content-l{
  padding: 20px;
}

.about-label{
  font-size: 18px;
  color: #FE2060;
  font-weight: bold;
}

.about-label span{
  font-size: 22px;
  color: #003B48;
}
.about-label-underline{
  border: 1px solid #00b3d2;
  width: 50px;
  margin-top: 4px;
}

.about-desc{
  font-size: 14px;
  color: #808080;
  padding: 10px 0;
}
.about-content-r{
  width: 100%;
  /*height: 100%;*/
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-content-img{
  border-radius: 10px;
}

.we-do-row{
  /*width: 1100px;*/
  margin: 20px auto;
}
.we-do-label{
  font-size: 18px;
  color: #FE2060;
  font-weight: bold;
}

.we-do-label span{
  font-size: 22px;
  color: #003B48;
}
.we-do-content{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.we-do-item{
  background-color: #FFFFFF;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
}

.we-do-item-label{
  font-size: 14px;
  font-weight: bold;
}

.we-do-item-tips{
  font-size: 12px;
  color: #808080;
  padding: 10px;
}

.xll-icon{
  font-size: 140px;
}

@media screen and (min-width: 1200px){
  .about-content-row {
    width: 1100px;
  }
  .we-do-row{
    width: 1100px;
  }

}
</style>
