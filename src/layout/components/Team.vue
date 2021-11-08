<template>
  <div class="team-container">
    <el-row :gutter="0" justify="center" align="middle">
      <el-col :xs="0" :sm="24" :md="20" :lg="16" :xl="14">
        <div class="team-label">MEET THE TEAM</div>
      </el-col>
    </el-row>
    <el-row :gutter="0" justify="center" align="middle">
      <el-col :xs="0" :sm="24" :md="20" :lg="16" :xl="14">
        <h2>
          Meet our team of talented an experienced experts who are here to help and
          support you all the way
        </h2>
      </el-col>
    </el-row>

    <el-row :gutter="0" justify="center" align="middle">
      <el-col :xs="0" :sm="24" :md="24" :lg="16" :xl="14">
        <div class="team-slider">
          <swiper :slidesPerView="4" :spaceBetween="30"
                  :pagination='{"clickable": true}'
                  :autoplay='{"delay": 2500,"disableOnInteraction": false,"pauseOnMouseEnter":true}'
                  :navigation="false"
                  class="myTeamSwiper">
            <swiper-slide class="team-card">
              <div class="team-card-avatar-container">
                <el-image class="team-card-avatar" :src="teamImgOne"></el-image>
              </div>
              <div class="team-card-name">
                Kong kong kong
              </div>
              <div class="team-card-position">
                Sales Excutive
              </div>
              <div class="team-social-media">
                <div class="team-social-media-item">Facebook</div>
                <div class="team-social-media-item">Ins</div>
                <div class="team-social-media-item">Twitter</div>
                <div class="team-social-media-item">Reddit</div>
              </div>
              <div class="team-properties">
                6 Listed Properties >
              </div>
            </swiper-slide>

            <swiper-slide class="team-card">
              <div class="team-card-avatar-container">
                <el-image class="team-card-avatar" :src="teamImgOne"></el-image>
              </div>
              <div class="team-card-name">
                Kong kong kong
              </div>
              <div class="team-card-position">
                Sales Excutive
              </div>
              <div class="team-social-media">
                <div class="team-social-media-item">Facebook</div>
                <div class="team-social-media-item">Ins</div>
                <div class="team-social-media-item">Twitter</div>
                <div class="team-social-media-item">Reddit</div>
              </div>
              <div class="team-properties">
                6 Listed Properties >
              </div>
            </swiper-slide>

            <swiper-slide class="team-card">
              <div class="team-card-avatar-container">
                <el-image class="team-card-avatar" :src="teamImgOne"></el-image>
              </div>
              <div class="team-card-name">
                Kong kong kong
              </div>
              <div class="team-card-position">
                Sales Excutive
              </div>
              <div class="team-social-media">
                <div class="team-social-media-item">Facebook</div>
                <div class="team-social-media-item">Ins</div>
                <div class="team-social-media-item">Twitter</div>
                <div class="team-social-media-item">Reddit</div>
              </div>
              <div class="team-properties">
                6 Listed Properties >
              </div>
            </swiper-slide>

            <swiper-slide class="team-card">
              <div class="team-card-avatar-container">
                <el-image class="team-card-avatar" :src="teamImgOne"></el-image>
              </div>
              <div class="team-card-name">
                Kong kong kong
              </div>
              <div class="team-card-position">
                Sales Excutive
              </div>
              <div class="team-social-media">
                <div class="team-social-media-item">Facebook</div>
                <div class="team-social-media-item">Ins</div>
                <div class="team-social-media-item">Twitter</div>
                <div class="team-social-media-item">Reddit</div>
              </div>
              <div class="team-properties">
                6 Listed Properties >
              </div>
            </swiper-slide>

          </swiper>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import teamImgOne from '@/assets/team/kongboss.png';
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import "swiper/css/zoom"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SwiperCore, {
  Pagination, Autoplay, Navigation, Zoom
} from 'swiper';

SwiperCore.use([Pagination, Autoplay, Navigation, Zoom]);

export default {
  name: "Team",
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      teamImgOne
    }
  },


}
</script>

<style scoped>
.team-container {
  padding: 20px 0;
  background-color: #f5f6f7;
}

.team-label {
  font-size: 16px;
  color: #0AA0A8;
  font-weight: bold;
}

.team-container h2 {
  margin-top: 20px;
}

.team-slider {
  margin-top: 20px;

}

.myTeamSwiper {
  height: 340px;
  padding: 20px;
}

.team-card {
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  background-color: #ffffff;
}

.team-card-avatar-container {
  text-align: center;
  padding: 20px;
}

.team-card-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.team-card-name {
  font-size: 16px;
  line-height: 30px;
}

.team-card-position {
  font-size: 16px;
  line-height: 30px;
}

.team-social-media {
  opacity: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
}

.team-social-media-item {
  margin: 10px;
}

.team-properties {
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 16px;
  line-height: 30px;
  height: 60px;
}

.team-card:hover {
  box-shadow: 0 11px 30px 0 rgba(51, 51, 51, .15);
}

.team-card:nth-child(2):not(:hover) {
  box-shadow: 0 11px 30px 0 rgba(51, 51, 51, .15);
}

.team-card:nth-child(2):not(:hover) .team-social-media {
  opacity: 1;
}

.team-card:nth-child(2):not(:hover) .team-properties {
  opacity: 1;
}

.team-card:hover .team-social-media {
  opacity: 1;
}

.team-card:hover .team-properties {
  opacity: 1;
}

</style>
