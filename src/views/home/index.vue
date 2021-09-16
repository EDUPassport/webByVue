<template>
  <div>
    <el-row :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="20">
        <div class="changemakers-container">
          <view class="changemakers-btn-bg">
            <el-button class="changemakers-btn" plain>Education Changemakers</el-button>
          </view>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="0" align="middle" justify="center">
      <el-col class="search-container-col" :xs="24" :sm="24" :md="24" :lg="24" :xl="20">
        <div class="search-container-bg">
          <div class="search-container">
            <div class="search-keywords">
              <div class="search-keywords-label">SEARCH KEYWORDS</div>
              <div class="search-keywords-content">
                <el-input placeholder="Find something..." v-model="searchKeywordsValue">
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
        <el-col class="featured-jobs-t" :xs="24" :sm="24" :md="24" :lg="24" :xl="20">
          <div class="featured-jobs-t-l">
            <div class="featured-jobs-label">Featured Jobs</div>
            <div class="featured-jobs-underline"></div>
          </div>
          <div class="featured-jobs-more">
            <el-button class="featured-jobs-more-btn" type="primary">See more jobs -></el-button>
          </div>
        </el-col>

      </el-row>

      <el-row :gutter="0" justify="center" align="middle">
        <el-col :xs="24" :sm="24" :md="22" :lg="22" :xl="20">
          <div class="featured-jobs-tips">
            Lorem ipsum dolor sit amet , consec tetur cing elit,Suspe nidsse suscipit
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="0" justify="center" align="middle">

        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="20">
          <div class="featured-jobs-slider">
            <swiper :slidesPerView="4" :spaceBetween="30"
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
      </el-row>

    </div>

  </div>
</template>

<script>
import {JOB_FEATURED_LIST, JOB_LIST} from "@/api/api";
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/pagination"
import "swiper/css/navigation"

import SwiperCore, {
  Pagination,Autoplay,Navigation
} from 'swiper';
SwiperCore.use([Pagination,Autoplay,Navigation]);

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
      jobListData: []

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
    console.log('home mounted')
    // this.getJobFeaturedList()
    this.getJobList()
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
        console.log(res)
        if (res.code == 200) {
          this.jobListData = res.message.data;
          console.log(res.message.data)
        } else {
          console.log(res.msg)
        }
      })

    }
  }

}
</script>

<style scoped>
.changemakers-container {
  height: 680px;
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

.search-container-col {
  position: relative;
  height: 100px;
  background-color: #eeeeee;
}

.search-container-bg {
  width: 90%;
  background-color: rgba(10, 160, 168, 0.3);
  padding: 10px;
  border-radius: 20px;
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
  border-radius: 20px;
  padding: 20px;
}

.search-keywords {

}

.search-keywords-label {
  color: #808080;
}

.search-keywords-content {
  margin-top: 20px;
}

.service-category {

}

.service-category-label {
  color: #808080;
}

.service-category-content {
  margin-top: 20px;
}

.search-tags {

}

.search-tags-label {
  color: #808080;
}

.search-tags-content {
  margin-top: 20px;
}

.search-btn {
  background-color: #0aa0a8;
  font-size: 16px;
  font-weight: bold;
}

.featured-jobs-bg {
  padding: 20px;
}

.featured-jobs-t{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}
.featured-jobs-t-l{

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
  background-color: #0aa0a8;
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
  height:550px;
}

.featured-jobs-card {
  border: 1px solid #eeeeee;
  border-radius: 4px;
}

.featured-jobs-card-images {
  width: 100%;
  height: 340px;
  overflow: hidden;
}

.featured-jobs-card-image {
  width: 100%;
}
.featured-jobs-title{
  font-weight: bold;
  font-size: 16px;
  color: #000000;
  text-align: left;
  padding: 10px 0 0 20px;
}
.featured-business-name{
  text-align: left;
  font-weight: bold;
  font-size: 16px;
  color: #808080;
  padding: 10px 0 0 20px;
}
.featured-jobs-location{
  text-align: left;
  font-size: 14px;
  color: #808080;
  padding: 10px 0 10px 20px;
}

.featured-b{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid #eeeeee;

}

</style>
