<template>
  <div class="featured-deals-container">
    <div class="featured-deals-label">Featured Deals</div>
    <div class="featured-deals-content">
      <swiper :slidesPerView="1" :spaceBetween="30"
              :pagination='{"clickable": true}'
              :autoplay='{"delay": 2500,"disableOnInteraction": false}'
              :navigation="false"
              class="mySwiper">
        <swiper-slide v-for="(item,index) in dealsListData" :key="index">
          <!--                animate__animated  animate__backInUp-->
          <div class="hot-deals-item"  :key="index">

            <div class="hot-deals-item-bg" :style="'background-image:url('+ item.user_info.profile_photo + ')'">
              <div class="hot-deals-item-t">
                <div class="hot-deals-item-t-l">
                  <template v-if="item.user_info">
                    <el-image class="hot-deals-logo" :src="item.user_info.logo"></el-image>
                  </template>
                </div>
                <div class="hot-deals-item-t-r">
                  <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
                </div>
              </div>
              <div class="hot-deals-item-tag-container">
                <div class="hot-deals-item-tag">Deal</div>
              </div>

              <div class="hot-deals-item-name-container">
                <div class="hot-deals-item-title">
                  {{ item.desc }}
                </div>
                <div class="hot-deals-item-name">
                  <template v-if="item.user_info">
                    {{ item.user_info.vendor_name_en }}
                  </template>
                </div>
              </div>

            </div>

            <div class="hot-deals-item-b">
              <div class="hot-deals-item-b-l">
                Category
              </div>
              <div class="hot-deals-item-b-r">
                Los Angeles, USA
              </div>
            </div>

          </div>
        </swiper-slide>
      </swiper>

    </div>
  </div>
</template>

<script>
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
import {DEALS_LIST} from "@/api/api";

SwiperCore.use([Pagination, Autoplay, Navigation, Zoom]);

export default {
  name: "featuredDeals",
  data(){
    return  {
      dealsListData: []
    }
  },
  components:{
    Swiper,
    SwiperSlide,
  },
  mounted() {
    this.getDealsList()
  },
  methods:{
    getDealsList() {
      let params = {
        page: 1,
        limit: 5
      }
      DEALS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.dealsListData = res.message.data;
        }
      }).catch(err => {
        console.log(err.response)
      })
    }

  }

}
</script>

<style scoped>
.featured-deals-container {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #eeeeee;
  margin-top: 20px;
}

.featured-deals-label {
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.featured-deals-content {
  margin-top: 10px;
}

#mySwiper {
  height: 350px;
}

.mySwiper {
  padding-bottom: 30px;
}
.hot-deals-item {
  width: 98%;
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #808080;
}

.hot-deals-item-bg {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.hot-deals-item:hover {
  border: 1px solid #eeeeee;
  box-shadow: 0px 5px 4px 0px rgba(50, 50, 50, 0.47);
}

.hot-deals-item-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.hot-deals-item-t-l {

}

.hot-deals-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.hot-deals-item-t-r {
  color: #ffffff;

}

.xll-heart-icon {
  font-size: 30px !important;
}

.hot-deals-item-tag-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
}

.hot-deals-item-tag {
  background-color: #0AA0A8;
  color: #ffffff;
  padding: 4px 14px;
  border-radius: 4px;

}

.hot-deals-item-name-container {
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.6);
}

.hot-deals-item-title {
  color: #ffffff;
  font-size: 16px;
  text-align: left;
}

.hot-deals-item-name {
  color: #ffffff;
  font-size: 16px;
  text-align: left;
}

.hot-deals-item-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.hot-deals-item-b-l {
  color: #000000;
}

.hot-deals-item-b-r {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

</style>