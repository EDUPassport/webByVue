<template>
  <div class="featured-deals-container">
    <div class="featured-deals-label">Featured Deals</div>
    <div class="featured-deals-content">
      <swiper :slidesPerView="1" :spaceBetween="30"
              :pagination='{"clickable": true}'
              :autoplay='{"delay": 2500,"disableOnInteraction": false,"pauseOnMouseEnter":true}'
              :navigation="false"
              class="mySwiper">
        <swiper-slide v-for="(item,index) in dealsListData" :key="index">
          <!--                animate__animated  animate__backInUp-->
          <div class="hot-deals-item" >
            <div class="hot-deals-item-bg"
                 :style="item.user_info.header_photo !='' ? 'background-image:url('+ item.user_info.header_photo + ')' : ''">
              <div class="hot-deals-item-t">
                <div class="hot-deals-item-t-l">
                  <template v-if="item.user_info">
                    <el-image class="hot-deals-logo" :src="item.user_info.logo"></el-image>
                  </template>
                </div>
                <div class="hot-deals-item-t-r" v-if="item.is_favorite && item.is_favorite==1"
                     @click="cancelFavorite(2,item.id)">
                  <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
                </div>
                <div class="hot-deals-item-t-r" v-else @click="addFavorite(item.id,2,item.title,item.user_info.logo)">
                  <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
                </div>
              </div>
<!--              <div class="hot-deals-item-tag-container">-->
<!--                <div class="hot-deals-item-tag">Deal</div>-->
<!--              </div>-->

              <div class="hot-deals-item-name-container">
                <div class="hot-deals-item-title">
                  <router-link :to="{path:'/deals/detail',query:{id:item.id}}">{{ item.desc }}</router-link>
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
                <template v-if="item.vendor_type_icon">
                  <el-image class="hot-deal-type-icon" :src="item.vendor_type_icon.icon_url"></el-image>
                </template>
              </div>
              <div class="hot-deals-item-b-r">
                {{item.location}}
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
import {DEALS_LIST,FEATURED_DEALS_LIST,ADD_FAVORITE,CANCEL_FAVORITE} from "@/api/api";

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
    // this.getDealsList()
    this.getFeaturedDealsList()
  },
  methods:{
    getFeaturedDealsList(){
      let params = {}
      FEATURED_DEALS_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.dealsListData = res.message;
        }
      })
    },
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
    },
    addFavorite(id, type, title, url) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: id,
        type_title: title,
        type_url: url
      }
      ADD_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.getFeaturedDealsList()
        }
      })

    },
    cancelFavorite(type,typeId){
      let params = {
        token:localStorage.getItem('token'),
        type:type,
        type_id:typeId
      }
      CANCEL_FAVORITE(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.getFeaturedDealsList()
        }
      })
    },


  }

}
</script>

<style scoped>
.featured-deals-container {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  /*border: 1px solid #eeeeee;*/
  margin-top: 20px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
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
  width: 100%;
  /*height: 240px;*/
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #EEEEEE;
  box-shadow: 0px 1px 0px 0px rgba(50, 50, 50, 0.47);
}

.hot-deals-item-bg {
  background-color: #faf7f7;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}

.hot-deals-item:hover {
  /*border: 1px solid #eeeeee;*/
  /*box-shadow: 0px 5px 4px 0px rgba(50, 50, 50, 0.47);*/
}

.hot-deals-item-t {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 10px 40px 10px;
  background-color: rgba(0,0,0,0.3);
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
  font-size: 14px;
}

.hot-deals-item-name-container {
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.6);
}

.hot-deals-item-title {
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 4px 0;
}

.hot-deals-item-title a{
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  font-weight: bold;
}
.hot-deals-item-title a:hover{
  text-decoration: underline;
}


.hot-deals-item-name {
  color: #ffffff;
  font-size: 14px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hot-deals-item-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 6px;
}

.hot-deals-item-b-l {
  color: #00b3d2;
  font-size: 12px;
  width: 20%;
}
.hot-deal-type-icon{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.hot-deals-item-b-r {
  width: 79%;
  font-size: 12px;
  color: #808080;
  padding-right: 20px;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}


</style>