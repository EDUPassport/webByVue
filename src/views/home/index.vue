<template>
  <div>
    <el-row :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-carousel indicator-position="none" height="700px" :interval="6000">
          <el-carousel-item v-for="item in 4" :key="item">
            <div class="changemakers-container">
              <view class="changemakers-btn-bg">
                <el-button class="changemakers-btn" plain>Education Changemakers</el-button>
              </view>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>

    <el-row class="search-container-row" :gutter="0" align="middle" justify="center">
      <el-col class="search-container-col" :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <div class="search-container-bg">
          <div class="search-container">
            <div class="search-keywords">
              <div class="search-keywords-label">SEARCH KEYWORDS</div>
              <div class="search-keywords-content">
                <el-input class="search-keywords-input" placeholder="Find something..." v-model="searchKeywordsValue">
                  <template #append>
                    <el-button icon="el-icon-search"></el-button>
                  </template>
                </el-input>
              </div>
            </div>

            <div class="service-category">
              <div class="service-category-label">SERVICE CATEGORY</div>
              <div class="service-category-content">
                <el-select v-model="serviceCategoryValue" clearable placeholder="Select">
                  <el-option
                      v-for="item in categoryOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="search-tags">
              <div class="search-tags-label">TAGS</div>
              <div class="search-tags-content">
                <el-select v-model="searchTagsValue" clearable placeholder="Select">
                  <el-option
                      v-for="item in tagsOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="search-btn-container">
              <el-button class="search-btn" type="primary">Search Now</el-button>
            </div>

          </div>
        </div>
      </el-col>
    </el-row>
    <!--  featured jobs -->
    <div class="featured-jobs-bg">

      <el-row :gutter="0" justify="center" align="middle">
        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
          <div class="featured-jobs-label">Featured Jobs</div>
          <div class="featured-jobs-underline"></div>
        </el-col>
        <el-col :xs="0" :sm="8" :md="8" :lg="8" :xl="6"></el-col>
        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
          <div class="featured-jobs-more">
            <el-button class="featured-jobs-more-btn" type="primary">See more jobs ></el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="0" justify="center" align="middle">
        <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="14">
          <div class="featured-jobs-tips">
            Lorem ipsum dolor sit amet , consec tetur cing elit,Suspe nidsse suscipit
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="0" justify="center" align="middle">

        <el-col :xs="0" :sm="24" :md="20" :lg="16" :xl="14">
          <div class="featured-jobs-slider">
            <swiper :slidesPerView="3" :spaceBetween="30"
                    :pagination='{"clickable": true}'
                    :autoplay='{"delay": 2500,"disableOnInteraction": false}'
                    :navigation="true"
                    class="mySwiper">
              <swiper-slide v-for="(item,index) in jobListData" :key="index">
                <div class="featured-jobs-card">
                  <div class="featured-jobs-card-images">
                    <el-image class="featured-jobs-card-image" :src="item.logo" fit="fill"></el-image>
                  </div>
                  <div class="featured-jobs-title">{{ item.job_title }}</div>
                  <div class="featured-business-name">{{ item.business_name }}</div>
                  <div class="featured-jobs-location">{{ item.address }}</div>
                  <div class="featured-b">
                    <div class="featured-b-l">
                      <el-button>Quick Apply</el-button>
                    </div>
                    <div class="featured-b-r">
                      <span>{{ item.currency }} {{ item.salary_min }} {{ item.salary_max }}</span>
                    </div>

                  </div>
                </div>
              </swiper-slide>
            </swiper>

          </div>
        </el-col>

        <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
          <div class="featured-jobs-slider">
            <swiper :slidesPerView="1" :spaceBetween="30"
                    :pagination='{"clickable": true}'
                    :autoplay='{"delay": 3500,"disableOnInteraction": true}'
                    :navigation="true"
                    :zoom="false"
                    :style="{'--swiper-navigation-color' : '#0aa0a8','--swiper-theme-color': '#0aa0a8'}"
                    class="mySwiper">
              <swiper-slide v-for="(item,index) in jobListData" :key="index">
                <div class="featured-jobs-card">
                  <div class="featured-jobs-card-images">
                    <el-image class="featured-jobs-card-image" :src="item.logo" fit="fill"></el-image>
                  </div>
                  <div class="featured-jobs-title">{{ item.job_title }}</div>
                  <div class="featured-business-name">{{ item.business_name }}</div>
                  <div class="featured-jobs-location">{{ item.address }}</div>
                  <div class="featured-b">
                    <div class="featured-b-l">
                      <el-button>Quick Apply</el-button>
                    </div>
                    <div class="featured-b-r">
                      <span>{{ item.currency }} {{ item.salary_min }} {{ item.salary_max }}</span>
                    </div>

                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </el-col>
      </el-row>

    </div>

    <!--    featured schools   -->
    <div class="featured-schools-container">
      <el-row :gutter="0" justify="center" align="middle">

        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
          <div class="featured-schools-label">Featured Schools</div>
          <div class="featured-schools-underline"></div>
        </el-col>

        <el-col :xs="0" :sm="8" :md="8" :lg="8" :xl="6"></el-col>

        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
          <div class="featured-schools-more">
            <el-button class="featured-schools-more-btn" type="primary">See more listings ></el-button>
          </div>
        </el-col>

      </el-row>

      <el-row :gutter="0" justify="center" align="middle">
        <el-col :xs="24" :sm="24" :md="20" :lg="16" :xl="14">
          <div class="featured-schools-tips">
            Lorem ipsum dolor sit amet , consec tetur cing elit,Suspe nidsse suscipit
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="0" justify="center" align="middle">

        <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="6">
          <template v-if="businessListData[0]">
            <div class="featured-schools-plus-container"
                 :style="'background-image:url('+businessListData[0]['header_photo'] +')'">
              <div class="featured-schools-plus-content">
                <div class="featured-schools-plus-content-l">
                  <div class="featured-schools-plus-address">
                    {{ businessListData[0].provinces.Pinyin }} {{ businessListData[0].citys.Pinyin }}
                    {{ businessListData[0].districts.Pinyin }}
                  </div>
                  <div class="featured-schools-plus-type">
                    {{ businessListData[0].business_type_name }}
                  </div>
                  <div class="featured-schools-plus-business-name">
                    {{ businessListData[0].business_name }}
                  </div>
                </div>
                <div class="featured-schools-plus-tags">
                  <div class="featured-schools-plus-tag">Affilication</div>
                  <div class="featured-schools-plus-tag">Computer Lab</div>
                  <div class="featured-schools-plus-tag">Gym & Health</div>
                  <div class="featured-schools-plus-tag">Accessibility Conscious</div>
                  <div class="featured-schools-plus-tag">Wifi</div>
                  <div class="featured-schools-plus-tag">Transport</div>
                </div>
              </div>
            </div>
          </template>
        </el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="1" :xl="1"></el-col>

        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="7">
          <template v-if="businessListData[1]">
            <div class="featured-schools-pro-container">
              <div class="featured-schools-pro-l"
                   :style="'background-image:url('+businessListData[1]['logo'] +')'"
              ></div>
              <div class="featured-schools-pro-r">
                <div class="featured-schools-pro-r-l">
                  <div class="featured-schools-pro-address">
                    {{ businessListData[1].provinces.Pinyin }} {{ businessListData[1].citys.Pinyin }}
                    {{ businessListData[1].districts.Pinyin }}
                  </div>
                  <div class="featured-schools-pro-type">
                    {{ businessListData[1].business_type_name }}
                  </div>
                  <div class="featured-schools-pro-business-name">
                    {{ businessListData[1].business_name }}
                  </div>
                </div>
                <div class="featured-schools-pro-tags">
                  <div class="featured-schools-pro-tag">Affilication</div>
                  <div class="featured-schools-pro-tag">Computer Lab</div>
                  <div class="featured-schools-pro-tag">Gym & Health</div>
                  <div class="featured-schools-pro-tag">Accessibility Conscious</div>
                  <div class="featured-schools-pro-tag">Wifi</div>
                  <div class="featured-schools-pro-tag">Transport</div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="businessListData[2]">
            <div class="featured-schools-pro-container">
              <div class="featured-schools-pro-l"
                   :style="'background-image:url('+businessListData[2]['logo'] +')'"
              ></div>
              <div class="featured-schools-pro-r">
                <div class="featured-schools-pro-r-l">
                  <div class="featured-schools-pro-address">
                    {{ businessListData[2].provinces.Pinyin }} {{ businessListData[2].citys.Pinyin }}
                    {{ businessListData[2].districts.Pinyin }}
                  </div>
                  <div class="featured-schools-pro-type">
                    {{ businessListData[2].business_type_name }}
                  </div>
                  <div class="featured-schools-pro-business-name">
                    {{ businessListData[2].business_name }}
                  </div>
                </div>
                <div class="featured-schools-pro-tags">
                  <div class="featured-schools-pro-tag">Affilication</div>
                  <div class="featured-schools-pro-tag">Computer Lab</div>
                  <div class="featured-schools-pro-tag">Gym & Health</div>
                  <div class="featured-schools-pro-tag">Accessibility Conscious</div>
                  <div class="featured-schools-pro-tag">Wifi</div>
                  <div class="featured-schools-pro-tag">Transport</div>
                </div>
              </div>
            </div>
          </template>

        </el-col>


      </el-row>


    </div>

  </div>
</template>

<script>
import {JOB_FEATURED_LIST, JOB_LIST, BUSINESS_LIST} from "@/api/api";
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/zoom"
import "swiper/css/pagination"
import "swiper/css/navigation"

import SwiperCore, {
  Pagination, Autoplay, Navigation,Zoom
} from 'swiper';

SwiperCore.use([Pagination, Autoplay, Navigation,Zoom]);

export default {
  name: "index",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {

      searchKeywordsValue: '',
      serviceCategoryValue: '',
      categoryOptions: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      searchTagsValue: '',
      tagsOptions: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      jobListData: [],
      businessListData: []

    }
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
    };
  },
  mounted() {
    this.getJobList()
    this.getBusinessList()
  },
  methods: {
    getJobFeaturedList() {
      let params = {}
      JOB_FEATURED_LIST(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.jobListData = res.message.data;
        } else {
          console.log(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getJobList() {
      let params = {
        page: 1,
        limit: 5
      }
      JOB_LIST(params).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.jobListData = res.message.data;
          // console.log(res.message.data)
        } else {
          console.log(res.msg)
        }
      })

    },
    getBusinessList() {
      let params = {
        page: 1,
        limit: 3
      }
      BUSINESS_LIST(params).then(res => {
        console.log(res)
        this.businessListData = res.message.data;
      }).catch(err => {
        console.log(err)
      })
    }

  }

}
</script>

<style scoped>

.changemakers-container {
  height: 100%;
  background: url("../../assets/changemakers.jpg") center no-repeat;
  background-size: cover;
}

.changemakers-btn-bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.changemakers-btn {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px 40px;
  font-size: 16px;
  font-weight: bold;
}

.search-container-row {
  background-color: #eeeeee;
}

.search-container-col {
  position: relative;
  height: 100px;
}

.search-container-bg {
  width: 90%;
  background-color: rgba(10, 160, 168, 0.3);
  padding: 10px;
  border-radius: 10px;
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  margin: auto;
}

.search-container {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 10px;
  padding: 20px;
}

.search-keywords {

}

.search-keywords-label {
  color: #808080;
  font-weight: bold;
}

.search-keywords-content {
  margin-top: 20px;
}

/deep/ .el-input__inner {
  height: 40px;
  line-height: 40px;
}

.search-keywords-input {

}

.service-category {

}

.service-category-label {
  color: #808080;
  font-weight: bold;
}

.service-category-content {
  margin-top: 20px;
}

.search-tags {

}

.search-tags-label {
  color: #808080;
  font-weight: bold;
}

.search-tags-content {
  margin-top: 20px;
}

.search-btn {
  /*background-color: #0aa0a8;*/
  font-size: 16px;
  font-weight: bold;
}

.featured-jobs-bg {
  padding: 20px;
}


.featured-jobs-label {
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  line-height: 40px;
}

.featured-jobs-underline {
  background-color: #0aa0a8;
  height: 2px;
  width: 80px;
}

.featured-jobs-more {
  text-align: right;
}

.featured-jobs-more-btn {
  /*background-color: #0aa0a8;*/
  font-size: 16px;
  font-weight: bold;
}

.featured-jobs-tips {
  text-align: left;
  color: #808080;
  padding: 20px 0;
}

.featured-jobs-slider {

}

.mySwiper {
  height: 550px;
}

.featured-jobs-card {
  border: 1px solid #eeeeee;
  border-radius: 4px;
  cursor: pointer;
}

.featured-jobs-card:hover {
  border: 1px solid #eeeeee;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.featured-jobs-card-images {
  width: 100%;
  height: 340px;
  overflow: hidden;
}

.featured-jobs-card-image {
  width: 100%;
  border-radius: 4px;
}

.featured-jobs-title {
  font-weight: bold;
  font-size: 16px;
  color: #000000;
  text-align: left;
  padding: 10px 0 0 20px;
}

.featured-business-name {
  text-align: left;
  font-weight: bold;
  font-size: 16px;
  color: #808080;
  padding: 10px 0 0 20px;
}

.featured-jobs-location {
  text-align: left;
  font-size: 14px;
  color: #808080;
  padding: 10px 0 10px 20px;
}

.featured-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid #eeeeee;

}

.featured-schools-label {
  font-size: 30px;
  font-weight: bold;
  text-align: left;
  line-height: 40px;
}

.featured-schools-underline {
  background-color: #0aa0a8;
  height: 2px;
  width: 80px;
}

.featured-schools-more {
  text-align: right;
}

.featured-schools-more-btn {
  /*background-color: #0aa0a8;*/
  font-size: 16px;
  font-weight: bold;
}

.featured-schools-tips {
  text-align: left;
  color: #808080;
  padding: 20px 0;
}

.featured-schools-plus-container {
  height: 550px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
}

.featured-schools-plus-container:hover {
  border: 1px solid #eeeeee;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.featured-schools-plus-content {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  width: 80%;
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;

}

.featured-schools-plus-content-l {
  text-align: left;
  width: 50%;
}

.featured-schools-plus-address {
  font-size: 14px;
  color: #808080;
  line-height: 40px;
}

.featured-schools-plus-type {
  font-size: 18px;
  font-weight: bold;
  line-height: 40px;
}

.featured-schools-plus-business-name {
  font-size: 18px;
  color: #808080;
  line-height: 40px;
}

.featured-schools-plus-tags {
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.featured-schools-plus-tag {
  margin: 2%;
  width: 45%;
  color: #808080;
}

.featured-schools-pro-container {
  height: 225px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
}

.featured-schools-pro-container:hover {
  border: 1px solid #eeeeee;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.featured-schools-pro-l {
  width: 40%;
  height: 225px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 4px;
  border: 1px solid #eeeeee;

}

.featured-schools-pro-r {
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.featured-schools-pro-r-l {
  padding: 10px;
  text-align: left;
}

.featured-schools-pro-address {
  font-size: 14px;
  color: #808080;
  line-height: 40px;
}

.featured-schools-pro-type {
  font-size: 18px;
  font-weight: bold;
  line-height: 40px;
}

.featured-schools-pro-business-name {
  font-size: 18px;
  color: #808080;
  line-height: 40px;
}

.featured-schools-pro-tags {
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.featured-schools-pro-tag {
  margin: 2%;
  width: 45%;
  color: #808080;
  font-size: 14px;
}

/deep/ .swiper-button-next,  /deep/ .swiper-button-prev{
  color: #0AA0A8 !important;
}

@media screen and (max-width: 768px) {
  .featured-jobs-label {
    font-size: 14px;
  }

  .search-container-col {
    display: none;
  }

}

</style>
