<template>
  <div class="home-bg">

    <el-row class="xll-slider-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="xll-slider-col">
        <swiper
            :pagination='{"clickable": true,"dynamicBullets": true}'
            :autoplay='{"delay": 13500,"disableOnInteraction": false,"pauseOnMouseEnter":true}'
            class="xllSwiper">
<!--          :style="'background-image:url('+item.url+')'"  class="xll-swiper-slider"-->
          <swiper-slide v-for="(item,index) in xllSliderData" :key="index" class="xll-swiper-slider">
            <div class="xll-swiper-image-container">
              <el-image class="xll-swiper-image" :src="item.url" fit="cover"></el-image>
            </div>
            <div class="xll-swiper-1" ></div>
          </swiper-slide>
        </swiper>

        <div class="xll-search-container">
          <div class="xll-find-best-row">
            <h2>Find new Education</h2>
            <v-typical
                class="blink"
                :steps="['Jobs', 2000, 'Deals', 2000,'Opportunities',2000,'News',2000,'Tools',2000,'Business',2000]"
                :loop="Infinity"
                :wrapper="'h1'"
            ></v-typical>
          </div>
          <!--                <div class="xll-search-btn-row">-->
          <!--                  <div class="xll-search-jobs-btn-container">-->
          <!--                    <div class="xll-search-jobs-btn"-->
          <!--                         :class="searchCategoryValue == 1 ? 'xll-search-jobs-btn-active' : ''"-->
          <!--                         @click="chooseSearchCategory(1)">-->
          <!--                      Jobs-->
          <!--                    </div>-->
          <!--                    <div class="xll-search-btn-sj"-->
          <!--                         :class="searchCategoryValue == 1 ? 'xll-search-btn-sj-active' : ''"></div>-->
          <!--                  </div>-->
          <!--                  <div class="xll-search-deals-btn-container">-->
          <!--                    <div class="xll-search-deals-btn"-->
          <!--                         :class="searchCategoryValue == 2 ? 'xll-search-deals-btn-active' : ''"-->
          <!--                         @click="chooseSearchCategory(2)">-->
          <!--                      Deals-->
          <!--                    </div>-->
          <!--                    <div class="xll-search-btn-sj"-->
          <!--                         :class="searchCategoryValue == 2 ? 'xll-search-btn-sj-active' : ''"></div>-->
          <!--                  </div>-->
          <!--                </div>-->
          <div class="search-container-bg">
            <div class="search-container">
              <div class="search-keywords">
                <el-input class="search-keywords-input" placeholder="Enter Keyword..." size="medium"
                          @change="searchNow()"
                          v-model="searchKeywordsValue">
                </el-input>
              </div>
              <div class="search-btn-container">
                <el-button class="search-btn" type="primary" @click="searchNow()">Search Now</el-button>
              </div>
            </div>
          </div>
        </div>

      </el-col>
    </el-row>

    <!--  featured jobs -->
    <div class="featured-jobs-bg" v-loading="jobFeaturedListData.length<=0" v-if="jobFeaturedShowStatus">
      <el-row :gutter="0" justify="center" align="middle">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="featured-jobs-label">Featured Jobs</div>
        </el-col>
      </el-row>

      <el-row :gutter="0" justify="center" align="middle">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="featured-jobs-tips">
            These are jobs we think are worth seeing.
          </div>
        </el-col>
      </el-row>

      <el-row class="featured-jobs-row" :gutter="0" justify="center" align="middle">

        <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="featured-jobs-slider">
            <swiper :slidesPerView="4" :spaceBetween="10"
                    :pagination='{"clickable": true}'
                    :autoplay='{"delay": 2500,"disableOnInteraction": false,"pauseOnMouseEnter":true}'
                    :navigation="false"
                    class="mySwiper">
              <swiper-slide v-for="(item,index) in jobFeaturedListData" :key="index">
                <!--                animate__animated  animate__backInUp-->
                <div class="featured-jobs-card ">
                  <div class="featured-jobs-card-images"
                       :style="item.logo !='' ? 'background-image:url('+ item.logo + ')' : ''">
                    <div class="featured-jobs-card-image">
                    </div>
                    <div class="featured-jobs-favorite" v-if="item.is_favorite && item.is_favorite == 1"
                         @click="cancelJobFavorite(1,item.id,index)">
                      <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
                    </div>
                    <div class="featured-jobs-favorite" v-else
                         @click="addJobFavorite(item.id,1,item.job_title,item.logo,index)">
                      <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
                    </div>
                  </div>
                  <div class="featured-jobs-title">
                    <router-link :to="{'path':'/jobs/detail',query:{id:item.id}}"> {{ item.job_title }}</router-link>
                  </div>
                  <div class="featured-business-name">{{ item.business_name }}</div>
                  <div class="featured-jobs-location">
                    <el-icon>
                      <LocationFilled></LocationFilled>
                    </el-icon>
                    {{ item.address }}
                  </div>
                  <div class="featured-jobs-tags">
                    <view class="featured-jobs-tags-l">
                      <view class="featured-jobs-work-type">
                        <i class="iconfont el-icon-alishijian"></i>
                        <span v-if="item.employment_type==1">FT</span>
                        <span v-if="item.employment_type==2">PT</span>
                        <span v-if="item.employment_type==3">S</span>
                      </view>
                      <view class="featured-jobs-gender" v-if="item.sex == 1 || item.sex == 2">
                        <i class="iconfont el-icon-alimale-female"></i>
                        <span v-if="item.sex == 1">Male</span>
                        <span v-if="item.sex == 2">Female</span>
                      </view>
                      <!--                      <view class="featured-jobs-work-exp">-->
                      <!--                        <i class="iconfont el-icon-aligongzuojingyan"></i>-->
                      <!--                        1-2 yrs-->
                      <!--                      </view>-->
                    </view>
                    <view class="featured-jobs-salary">
                      {{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}
                    </view>

                  </div>
                  <div class="featured-jobs-b">
                    <div class="featured-jobs-b-l">
                      <el-button class="featured-jobs-apply-btn" type="default" round
                                 @click="applyJobs(item.id)"
                      >Quick Apply
                      </el-button>
                    </div>
                    <div class="featured-jobs-b-r">
                      <el-icon>
                        <Calendar/>
                      </el-icon> &nbsp;
                      {{ $filters.howLongFormat(item.c_time) }}
                    </div>

                  </div>
                </div>
              </swiper-slide>
            </swiper>

          </div>
        </el-col>

      </el-row>

      <el-row :gutter="0" justify="center" align="middle">
        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
          <div class="featured-jobs-more">
            <el-button class="featured-jobs-more-btn" type="primary" round @click="turnJobsList()">
              View All
              <el-icon>
                <ArrowRightBold/>
              </el-icon>
            </el-button>
          </div>
        </el-col>
      </el-row>

    </div>

    <!--    Education Business   -->
    <!--    <div class="featured-schools-container">-->
    <!--      <el-row :gutter="0" justify="center" align="middle">-->
    <!--        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">-->
    <!--          <div class="featured-schools-label">Education Businesses</div>-->
    <!--        </el-col>-->
    <!--      </el-row>-->

    <!--      <el-row :gutter="0" justify="center" align="middle">-->
    <!--        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">-->
    <!--          <div class="featured-schools-tips">-->
    <!--            These are schools we think you would like.-->
    <!--          </div>-->
    <!--        </el-col>-->
    <!--      </el-row>-->

    <!--      <el-row class="featured-schools-content-container" :gutter="0" justify="center" align="middle">-->
    <!--        <el-col :xs="24" :sm="24" :md="11" :lg="11" :xl="11">-->
    <!--          <template v-if="businessListData[0]">-->
    <!--            <div class="featured-schools-plus-container "-->
    <!--                 :style="'background-image:url('+businessListData[0]['header_photo'] +')'">-->
    <!--              <div class="featured-schools-plus-content">-->
    <!--                <div class="featured-schools-plus-content-l">-->
    <!--                  <div class="featured-schools-plus-address" v-if="businessListData[0].provinces">-->
    <!--                    {{ businessListData[0].provinces.Pinyin }} {{ businessListData[0].citys.Pinyin }}-->
    <!--                    {{ businessListData[0].districts.Pinyin }}-->
    <!--                  </div>-->
    <!--                  <div class="featured-schools-plus-type">-->
    <!--                    {{ businessListData[0].business_type_name }}-->
    <!--                  </div>-->
    <!--                  <div class="featured-schools-plus-business-name">-->
    <!--                    {{ businessListData[0].business_name }}-->
    <!--                  </div>-->
    <!--                </div>-->

    <!--              </div>-->
    <!--            </div>-->
    <!--          </template>-->
    <!--        </el-col>-->

    <!--        <el-col :xs="24" :sm="24" :md="1" :lg="1" :xl="1"></el-col>-->

    <!--        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">-->
    <!--          <template v-if="businessListData[1]">-->
    <!--            <div class="featured-schools-pro-container">-->
    <!--              <div class="featured-schools-pro-l"-->
    <!--                   :style="'background-image:url('+businessListData[1]['logo'] +')'"-->
    <!--              >-->
    <!--              </div>-->
    <!--              <div class="featured-schools-pro-r">-->
    <!--                <div class="featured-schools-pro-r-l">-->
    <!--                  <div class="featured-schools-pro-address" v-if="businessListData[0].provinces">-->
    <!--                    {{ businessListData[1].provinces.Pinyin }} {{ businessListData[1].citys.Pinyin }}-->
    <!--                    {{ businessListData[1].districts.Pinyin }}-->
    <!--                  </div>-->
    <!--                  <div class="featured-schools-pro-type">-->
    <!--                    {{ businessListData[1].business_type_name }}-->
    <!--                  </div>-->
    <!--                  <div class="featured-schools-pro-business-name">-->
    <!--                    {{ businessListData[1].business_name }}-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </template>-->

    <!--          <template v-if="businessListData[2]">-->
    <!--            <div class="featured-schools-pro-container featured-schools-pro-margin">-->
    <!--              <div class="featured-schools-pro-l"-->
    <!--                   :style="'background-image:url('+businessListData[2]['logo'] +')'"-->
    <!--              ></div>-->
    <!--              <div class="featured-schools-pro-r">-->
    <!--                <div class="featured-schools-pro-r-l">-->
    <!--                  <div class="featured-schools-pro-address" v-if="businessListData[0].provinces">-->
    <!--                    {{ businessListData[2].provinces.Pinyin }} {{ businessListData[2].citys.Pinyin }}-->
    <!--                    {{ businessListData[2].districts.Pinyin }}-->
    <!--                  </div>-->
    <!--                  <div class="featured-schools-pro-type">-->
    <!--                    {{ businessListData[2].business_type_name }}-->
    <!--                  </div>-->
    <!--                  <div class="featured-schools-pro-business-name">-->
    <!--                    {{ businessListData[2].business_name }}-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </template>-->
    <!--        </el-col>-->
    <!--      </el-row>-->

    <!--      <el-row class="featured-schools-more-container" :gutter="0" align="middle" justify="center">-->
    <!--        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">-->
    <!--          <div class="featured-schools-more">-->
    <!--            <el-button class="featured-schools-more-btn" type="primary">-->
    <!--              View All-->
    <!--              <el-icon>-->
    <!--                <ArrowRightBold/>-->
    <!--              </el-icon>-->
    <!--            </el-button>-->
    <!--          </div>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </div>-->

    <!--  featured deals -->
    <div class="featured-deals-bg" v-loading="featuredDealsList.length<=0" v-if="dealFeaturedShowStatus">

      <el-row :gutter="0" justify="center" align="middle">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="featured-deals-label">Featured Deals</div>
        </el-col>
      </el-row>

      <el-row :gutter="0" justify="center" align="middle">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="featured-deals-tips">
            These are deals we think you would like
          </div>
        </el-col>
      </el-row>

      <el-row class="featured-deals-row" :gutter="0" justify="center" align="middle">

        <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="hot-deals-container">
            <div class="hot-deals-item" v-for="(item,index) in featuredDealsList" :key="index">

              <div class="hot-deals-item-bg"
                   :style="item.user_info.header_photo !='' ? 'background-image:url('+ item.user_info.header_photo + ')' : ''">
                <div class="hot-deals-item-t">
                  <div class="hot-deals-item-t-l">
                    <template v-if="item.user_info">
                      <el-image class="hot-deals-logo" :src="item.user_info.logo"></el-image>
                    </template>
                  </div>
                  <div class="hot-deals-item-t-r" v-if="item.is_favorite && item.is_favorite==1"
                       @click="cancelDealFavorite(2,item.id,index)">
                    <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
                  </div>
                  <div class="hot-deals-item-t-r" v-else
                       @click="addDealFavorite(item.id,2,item.title,item.user_info.logo,index)">
                    <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
                  </div>
                </div>
                <!--                <div class="hot-deals-item-tag-container">-->
                <!--                  <div class="hot-deals-item-tag">Deal</div>-->
                <!--                </div>-->

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
                  <!--                  {{ item.vendor_type_name }}-->
                </div>
                <div class="hot-deals-item-b-r">
                  {{ item.location }}
                </div>
              </div>

            </div>

            <div class="hot-deals-item-more">
              <div class="hot-deals-item-more-logo-container" v-if="featuredDealsLogoData.length>0">
                <div class="hot-deals-item-more-logo-item" v-for="(item,i) in featuredDealsLogoData" :key="i">
                  <el-image class="hot-deals-item-more-logo" :src="item.logo_url" fit="fill"></el-image>
                </div>
              </div>
              <div class="hot-deals-item-more-tips">
                1000+ Deals in multiple locations
                <br>
                <span>Enjoy great discounts and deals where ver you go</span>
              </div>
              <div class="featured-deals-more">
                <el-button class="featured-deals-more-btn" type="primary" round @click="turnDealsPage()">View More
                </el-button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- popular work destinations  -->
    <div class="popular-work-container" v-loading="popularCityData.length<=0" v-if="popularWorkShowStatus">
      <el-row :gutter="0" align="middle" justify="center">
        <el-col class="popular-work-title" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          Popular Work Destinations
        </el-col>
      </el-row>
      <el-row :gutter="0" align="middle" justify="center">
        <el-col class="popular-work-tips" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          These are places you should definitely consider working at.
        </el-col>
      </el-row>

      <el-row class="popular-work-row" :gutter="0" align="middle" justify="center">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

          <swiper :slidesPerView="3" :spaceBetween="30"
                  :pagination='{"clickable": true}'
                  :autoplay='{"delay": 2500,"disableOnInteraction": false}'
                  :navigation="false"
                  class="myWorkSwiper">
            <swiper-slide class="popular-work-card" v-for="(item,i) in popularCityData" :key="i">
              <div class="popular-work-card-bg">
                <div class="popular-work-card-name">
                  <router-link :to="{path:'/jobs',query:{city:item.id}}">{{ item.CityPinyin }}</router-link>
                </div>
              </div>
            </swiper-slide>

          </swiper>

        </el-col>
      </el-row>
    </div>

    <!-- articles industry news   -->
    <div class="industry-news-container" v-loading="articleListData.length<=0" v-if="industryShowStatus">
      <el-row class="industry-news-row" :gutter="0" align="middle" justify="center">
        <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="8">
          <div class="industry-articles-label">Articles</div>
          <div class="industry-news-label">Industry News</div>
          <div class="industry-news-link-container">
            <template v-for="(item,index) in articleListData" :key="index">
              <el-link class="industry-news-link"
                       :href="item.link" target="_blank" :underline="false">{{ item.title }}
              </el-link>
            </template>
          </div>
          <!--          <div class="industry-news-readmore">-->
          <!--            <el-button type="primary">Read More ></el-button>-->
          <!--          </div>-->
        </el-col>
        <el-col :xs="{span:7,offset:1}" :sm="{span:7,offset:1}" :md="{span:7,offset:1}" :lg="{span:7,offset:1}" :xl="{span:7,offset:1}"
                v-for="(item,index) in articleListLimitData" :key="index"
        >
          <div class="industry-item" v-if="index<2">
            <div class="industry-item-t">
              <el-image class="industry-item-t-img" :src="item.user_url !='' ? item.user_url : item.url"
                        fit="cover"></el-image>
              <div class="industry-item-article-tag">ARTICLE</div>
            </div>
            <!--            <div class="industry-item-m">-->
            <!--              <div class="industry-item-author">By Sara</div>-->
            <!--              <div class="industry-item-tag">Policy</div>-->
            <!--            </div>-->
            <div class="industry-item-title">
              <el-link class="industry-item-title-link"
                       :href="item.link" target="_blank" :underline="false">{{ item.title }}
              </el-link>
            </div>
            <div class="industry-item-intro">
              {{ item.desc }}
            </div>

            <div class="industry-item-b">
              <div class="industry-item-date">
                {{ $filters.newsDateFormat(item.u_time) }}
              </div>
              <div class="industry-item-b-r">
                <!--                <div class="industry-item-comment">评论：20</div>-->
                <!--                <div class="industry-item-like">点赞：20</div>-->
                <!--                <div class="industry-item-share">分享：20</div>-->
              </div>
            </div>

          </div>

        </el-col>

      </el-row>
    </div>


    <!-- meet the team   -->
    <!--    <TeamComponent></TeamComponent>-->

    <!-- vendor six logos    -->
    <div class="vendor-logos-container">
      <el-row :gutter="0" justify="center" align="middle">
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="2">
          <el-image class="vendor-logo" :src="teamImgOne"></el-image>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="2">
          <el-image class="vendor-logo" :src="teamImgTwo"></el-image>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="2">
          <el-image class="vendor-logo" :src="teamImgThree"></el-image>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="2">
          <el-image class="vendor-logo" :src="teamImgFour"></el-image>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="2">
          <el-image class="vendor-logo" :src="teamImgFive"></el-image>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="2">
          <el-image class="vendor-logo" :src="teamImgSix"></el-image>
        </el-col>

      </el-row>
    </div>

    <!-- subscribe container   -->
    <div class="subscribe-container">
      <div class="subscribe-container-bg">
        <el-row class="subscribe-label-row" :gutter="0" align="middle" justify="center">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="subscribe-label">
              Subscribe to newsletter to receive exclusive offers and the latest news
            </div>
          </el-col>
        </el-row>

        <el-row class="subscribe-input-row" :gutter="0" align="middle" justify="center">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="xll-subscribe-container">
              <div class="xll-subscribe-input-container">
                <el-input
                    v-model="subscribeEmail"
                    placeholder="Email"
                    class="xll-subscribe-input"
                >
                </el-input>
              </div>
              <div class="xll-subscribe-btn-container">
                <el-button class="xll-subscribe-btn" type="primary" @click="subscribe()">Subscribe</el-button>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>

    </div>

  </div>
</template>

<script>
// import TeamComponent from '@/layout/components/Team'
import imgLogo from '@/assets/logo.png'
import teamImgOne from '@/assets/team/1.jpg'
import teamImgTwo from '@/assets/team/2.jpg'
import teamImgThree from '@/assets/team/3.jpg'
import teamImgFour from '@/assets/team/4.jpg'
import teamImgFive from '@/assets/team/5.jpg'
import teamImgSix from '@/assets/team/6.jpg'

import {
  JOB_FEATURED_LIST, JOB_LIST, BUSINESS_LIST, DEALS_LIST, ADS_LIST, APPLY_JOBS,
  FEATURED_DEALS_LIST, GET_SYSTEM_INFO, ADD_FAVORITE, SIX_LOGO_LIST, JOBS_AREA_LIST,
  ADD_SUBSCRIBE_EMAIL, CANCEL_FAVORITE
} from "@/api/api";
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
import VTypical from 'vue-typical';
import {useRouter} from "vue-router";

import bgBeijingImg from '@/assets/bg/bg-beijing-1.jpg'
import bgShanghaiImg from '@/assets/bg/bg-shanghai-1.jpg'
import bgNanjingImg from '@/assets/bg/bg-nanjing-1.jpg'

export default {
  name: "index",
  components: {
    Swiper,
    SwiperSlide,
    VTypical
  },
  data() {
    return {
      teamImgOne,
      teamImgTwo,
      teamImgThree,
      teamImgFour,
      teamImgFive,
      teamImgSix,

      imgLogo,
      xllSliderData:[
        {
          name:'beijing',
          url:bgBeijingImg
        },
        {
          name:'nanjing',
          url:bgNanjingImg
        },
        {
          name: 'shanghai',
          url:bgShanghaiImg
        }
      ],
      searchCategoryValue: 1,
      subscribeEmail: '',
      searchKeywordsValue: '',
      serviceCategoryValue: '',
      categoryOptions: [
        {
          value: '选项1',
          label: '黄金糕',
        }
      ],
      searchTagsValue: '',
      tagsOptions: [
        {
          value: '选项1',
          label: '黄金糕',
        }
      ],
      jobFeaturedListData: [],
      businessListData: [],
      dealsListData: [],
      featuredDealsList: [],
      articleListData: [],
      articleListLimitData: [],
      featuredDealsLogoData: [],
      popularCityData: [],

      jobFeaturedShowStatus: true,
      dealFeaturedShowStatus: true,
      popularWorkShowStatus: true,
      industryShowStatus: true

    }
  },
  setup() {
    let router = useRouter()
    // let route = useRoute()

    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    // const getParams = () =>{
    //   console.log(route.params)
    // }
    const skipJobsList = (query) => {
      router.push({
        path: '/jobs',
        query: query
      })
    }
    return {
      onSwiper,
      onSlideChange,
      skipJobsList
    };
  },
  created() {
    this.getJobFeaturedList()
    // this.getBusinessList()
    // this.getDealsList()
    this.getAdsList()

    this.getFeaturedDealsList()
    // this.getSystemInfo()
    this.getSixLogos()
    this.getJobsAreaList()

  },
  mounted() {

  },
  methods: {

    getJobsAreaList() {
      let params = {}
      JOBS_AREA_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.popularCityData = res.message;
          let message = res.message;
          if (message.length <= 0) {
            this.popularWorkShowStatus = false
          }
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getSixLogos() {
      let params = {}
      SIX_LOGO_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.featuredDealsLogoData = res.message;
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    chooseSearchCategory(value) {
      this.searchCategoryValue = value
    },
    getSystemInfo() {
      let params = {
        page: 1,
        limit: 10000,
        cate: 1
      }

      GET_SYSTEM_INFO(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          let imgData = res.message.data;
          this.featuredDealsLogoData = imgData.filter(item => item.sys_key == '16')
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getJobFeaturedList() {
      let params = {
        ad_type: 1
      }

      JOB_FEATURED_LIST(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          let message = res.message;
          this.jobFeaturedListData = res.message;

          if (message.length <= 0) {
            this.jobFeaturedShowStatus = false
          }
        }

      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
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
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getFeaturedDealsList() {
      let params = {}
      FEATURED_DEALS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.featuredDealsList = res.message;
          let message = res.message;
          if (message.length <= 0) {
            this.dealFeaturedShowStatus = false
          }
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    getAdsList() {
      let identity = localStorage.getItem('identity')

      let params = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          let adsData = res.message;
          // console.log(adsData);

          let adsDataNews = [];

          if (identity == 0 || !identity) {
            adsDataNews = adsData.filter(item => item.name == 'guest_industry_news');
          }
          if (identity == 1) {
            adsDataNews = adsData.filter(item => item.name == 'educator_industry_news');
          }
          if (identity == 2) {
            adsDataNews = adsData.filter(item => item.name == 'business_industry_news');
          }
          if (identity == 3) {
            adsDataNews = adsData.filter(item => item.name == 'vendor_industry_news');
          }
          let articleListData = adsDataNews[0].data;
          if (articleListData.length <= 0) {
            this.industryShowStatus = false;
          }
          this.articleListData = articleListData;
          this.articleListLimitData = articleListData.slice(0, 2)


        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    subscribe() {
      let params = {
        email: this.subscribeEmail
      }
      ADD_SUBSCRIBE_EMAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Subscribe Success')
          this.subscribeEmail = ''
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    turnJobsList() {
      this.skipJobsList()
    },
    turnDealsPage() {
      this.$router.push({path: '/deals'})
    },
    applyJobs(id) {

      let identity = localStorage.getItem('identity')
      let token = localStorage.getItem('token')
      if (identity == 1) {
        let params = {
          job_id: id,
          token: token
        }
        APPLY_JOBS(params).then(res => {
          if (res.code == 200) {
            this.$message.success('Apply Success')
          }
        }).catch(err=>{
          console.log(err)
          this.$message.error(err.msg)
        })

      } else {
        this.$message.warning('Only Educator Can Apply')
      }


    },
    addJobFavorite(id, type, title, url, index) {
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
          this.jobFeaturedListData[index]['is_favorite'] = 1
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    cancelJobFavorite(type, typeId, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.jobFeaturedListData[index]['is_favorite'] = 0
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    addDealFavorite(id, type, title, url, index) {
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
          this.featuredDealsList[index]['is_favorite'] = 1
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    cancelDealFavorite(type, typeId, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.featuredDealsList[index]['is_favorite'] = 0
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },

    searchNow() {
      this.$router.push({path: '/search/result', query: {keyword: this.searchKeywordsValue}})
    }

  }

}
</script>

<style scoped>
/deep/ .swiper-pagination-bullet-active {
  background-color: #0AA0A8;
}

.home-bg {
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.xll-search-container {
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.xll-find-best-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

.xll-find-best-row h2 {
  color: #ffffff;
  font-size: 36px;
}

.xll-find-best-row h1 {
  color: #ffffff;
  margin-left: 10px;
  text-decoration: underline;
  font-size: 36px;
}

.xll-search-btn-row {
  margin-top: 100px;
}

.xll-search-jobs-btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.xll-search-deals-btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.xll-search-jobs-btn {
  background-color: #ffffff;
  font-size: 16px;
  padding: 14px 40px;
  cursor: pointer;
  border-radius: 6px;

}

.xll-search-jobs-btn-active {
  background-color: #0AA0A8;
  color: #ffffff;
}

.xll-search-deals-btn {
  background-color: #ffffff;
  font-size: 16px;
  padding: 14px 40px;
  cursor: pointer;
  border-radius: 6px;
}

.xll-search-deals-btn-active {
  background-color: #0AA0A8;
  color: #ffffff;
}

.xll-search-btn-sj {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: transparent transparent transparent transparent;
}

.xll-search-btn-sj-active {
  border-color: #0AA0A8 transparent transparent transparent;
}


.search-container-bg {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 10px;
  border-radius: 10px;
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
  width: 80%;
}

.search-keywords-input {

}

.service-category {

}

.search-tags {

}

.search-btn {
  font-size: 16px;
  font-weight: bold;
}

.featured-jobs-bg {
  padding: 20px;
  background-color: #f5f6f7;
}


.featured-jobs-label {
  font-size: 34px;
  font-weight: bold;
  line-height: 40px;
}

.featured-jobs-more {
  text-align: center;
  margin-top: 20px;
}

.featured-jobs-more-btn {
  font-size: 16px;
  font-weight: bold;
}

.featured-jobs-row {
  /*width: 1200px;*/
  margin: 0 auto;
}

.featured-jobs-tips {
  text-align: center;
  color: #808080;
  padding-bottom: 10px;
}

.featured-jobs-slider {
  margin-top: 20px;
}

.mySwiper {
  height: 480px;
}

.featured-jobs-card {
  width: 98%;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 20px;
  /*cursor: pointer;*/
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #eeeeee;
}

.featured-jobs-card:hover {

}

.featured-jobs-card-images {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  background-color: #FFFFFF;
  /*filter: blur(1px);*/
  /*transform: scale(1);*/
  background-position: center;
  background-size:  auto;
  background-repeat: repeat;
}

.featured-jobs-favorite {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.featured-jobs-card-image {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.featured-jobs-title {
  text-align: left;
  padding: 0 20px;
  margin-top: 10px;
}

.featured-jobs-title a {
  font-size: 16px;
  color: #000000;
  font-weight: bold;
  text-decoration: none;
}

.featured-jobs-title a:hover {
  text-decoration: underline;
}


.featured-business-name {
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  color: #808080;
  padding: 0 20px;
  margin-top: 10px;
}

.featured-jobs-location {
  text-align: left;
  font-size: 14px;
  color: #808080;
  padding: 0 20px;
  margin-top: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.featured-jobs-tags {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  margin-top: 10px;
}

.featured-jobs-tags-l {

}

.featured-jobs-work-type {
  font-size: 14px;
  color: #808080;
}

.featured-jobs-work-type span {
  margin-left: 4px;
}

.featured-jobs-gender {
  font-size: 14px;
  color: #808080;
  margin-left: 4px;
}

.featured-jobs-work-exp {
  font-size: 14px;
  color: #808080;
  margin-left: 4px;
}

.featured-jobs-salary {
  color: #00b3d2;
}

.featured-jobs-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid #eeeeee;

}

.featured-jobs-b-l {

}

.featured-jobs-apply-btn {
  background-color: #20AEC6;
  color: #ffffff;
  font-size: 14px;
}

.featured-jobs-b-r {
  font-size: 14px;
  color: #808080;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.featured-schools-container {
  background-color: #f5f6f7;
  padding: 20px 0;
}

.featured-schools-label {
  font-size: 34px;
  font-weight: bold;
  line-height: 40px;
}

.featured-schools-more-container {
  padding: 20px;
}

.featured-schools-more {

}

.featured-schools-more-btn {
  font-size: 16px;
  font-weight: bold;
}

.featured-schools-tips {
  color: #808080;
  padding: 20px 0;
}


.featured-schools-content-container {
  margin: 0 auto;
  padding: 20px;
}

.featured-schools-plus-container {
  height: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 5px 4px 0px rgba(50, 50, 50, 0.47);
}

.featured-schools-plus-container:hover {
  border: 1px solid #eeeeee;
  box-shadow: 0px 5px 4px 0px rgba(50, 50, 50, 0.47);
}

.featured-schools-plus-content {
  background-color: #ffffff;
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
  border-radius: 10px;
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

.featured-schools-pro-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  box-shadow: 0px 5px 4px 0px rgba(50, 50, 50, 0.47);
}

.featured-schools-pro-margin {
  margin-top: 20px;
}

.featured-schools-pro-container:hover {
  border: 1px solid #eeeeee;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.featured-schools-pro-l {
  width: 35%;
  height: 200px;
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

/deep/ .swiper-button-next, /deep/ .swiper-button-prev {
  color: #0AA0A8 !important;
}

.featured-deals-bg {
  padding: 20px 0;
  background-color: #ffffff;
}

.featured-deals-label {
  font-size: 34px;
  font-weight: bold;
  line-height: 40px;
}

.featured-deals-more {
  width: 90%;
  margin-top: 10px;
  text-align: right;
}

.featured-deals-more-btn {
  font-size: 16px;
  font-weight: bold;
}

.featured-deals-tips {
  color: #808080;
  padding-bottom: 10px;
}


.featured-deals-row {
  margin: 0 auto;
}

.hot-deals-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.hot-deals-item {
  width: 32%;
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
  background-color: rgba(0, 0, 0, 0.3);
}

.hot-deals-item-t-l {
  text-align: left;
}

.hot-deals-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #EEEEEE;
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
  background-color: rgba(0, 0, 0, 0.8);
}

.hot-deals-item-title {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 4px 0;
}

.hot-deals-item-title a {
  width: 100%;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  font-weight: bold;
}

.hot-deals-item-title a:hover {
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
  padding: 4px 0;
}

.hot-deals-item-b-l {
  color: #00b3d2;
  font-size: 12px;
  width: 20%;
}

.hot-deal-type-icon {
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

.hot-deals-item-more {
  background-color: #faf7f7;
  width: 32%;
  height: 230px;
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #EEEEEE;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 1px 0px 0px rgba(50, 50, 50, 0.47);
}

.hot-deals-item-more-logo-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.hot-deals-item-more-logo-item {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 2px;
  overflow: hidden;
  border: 1px solid #EEEEEE;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hot-deals-item-more-logo {
  /*width: 100%;*/
}

.hot-deals-item-more-tips {
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  padding: 0 20px;
}

.hot-deals-item-more-tips span {
  font-size: 12px;
  color: #00b3d2;
}


.popular-work-container {
  background-color: #f5f6f7;
  padding: 20px 0;
}

.popular-work-title {
  font-size: 34px;
  font-weight: bold;
  line-height: 40px;
}

.popular-work-tips {
  color: #808080;
  padding-bottom: 10px;
}


.popular-work-row {
  margin: 0 auto;
}

.myWorkSwiper {
  height: 260px;
  padding: 20px 20px 40px 20px;
}

.popular-work-card {
  border: 1px solid #eeeeee;
  background-image: url("../../assets/bg/bg-h-1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  overflow: hidden;
}

.popular-work-card:first-child {
  background-image: url("../../assets/popular/beijing.jpg");
}

.popular-work-card:nth-child(2) {
  background-image: url("../../assets/popular/shanghai.jpg");
}
.popular-work-card:nth-child(3) {
  background-image: url("../../assets/popular/nanjing.jpg");
}

.popular-work-card-bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
}

.popular-work-card-name {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px 0;
}

.popular-work-card-name a {
  text-decoration: none;
  font-size: 34px;
  font-weight: bold;
  color: #ffffff;

}

.industry-news-container {
  background-color: #ffffff;
  padding: 20px 0;
}

.industry-news-row {
  margin: 0 auto;
}

.industry-articles-label {
  color: #00b3d2;
  font-size: 20px;
  text-align: left;
}

.industry-news-label {
  font-weight: bold;
  font-size: 34px;
  line-height: 40px;
  text-align: left;
  color: #0AA0A8;
}

.industry-news-link-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.industry-news-link {
  margin-top: 10px;
  text-align: left;
}

.industry-item {
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #eeeeee;
  background-color: #f5f6f7;
}

.industry-item-t {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.industry-item-t-img {
  width: 100%;
  height: 100%;
}

.industry-item-article-tag {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #00b3d2;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.industry-item-m {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 20px;
}

.industry-item-author {

}

.industry-item-tag {
  margin-left: 10px;
}

.industry-item-title {
  padding: 10px 20px;
  text-align: left;
}

.industry-item-title-link {
  font-size: 16px;
  font-weight: bold;
  /*text-align: left;*/
}

.industry-item-intro {
  font-size: 14px;
  color: #808080;
  text-align: left;
  padding: 10px 20px 0 20px;

  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.industry-news-readmore {
  text-align: left;
  padding: 20px 0;
}

.industry-item-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}

.industry-item-date {
  font-size: 12px;
  color: #808080;
}

.industry-item-b-r {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}

.industry-item-comment {
  font-size: 12px;
  color: #808080;
}

.industry-item-like {
  font-size: 12px;
  color: #808080;
}

.industry-item-share {
  font-size: 12px;
  color: #808080;
}

.vendor-logos-container {
  background-color: #ffffff;
  border-top: 1px solid #efefef;
  padding: 20px;
}

.vendor-logo {
  width: 80px;
}

.subscribe-container {
  background-image: url("../../assets/bg/double-bubble-dark.png");
  background-size: 20%;
  background-repeat: repeat;
  background-position: center;
  height: 300px;

}

.subscribe-container-bg {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.subscribe-input-row, .subscribe-label-row {
  margin: 0 auto;
}

.subscribe-label {
  font-size: 34px;
  font-weight: bold;
  color: #ffffff;
  padding: 40px 20px;
}

.xll-subscribe-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

}

.xll-subscribe-input-container {
  width: 80%;
}

.xll-subscribe-input {

}

.xll-subscribe-btn-container {
  width: 20%;
}

.xll-subscribe-btn {
  font-size: 12px;
}

.xll-slider-row{

}

.xll-slider-col{
  position: relative;
}

.xllSwiper{
  width: 100%;
  height:600px;
}

.xll-swiper-image-container{
  width:100%;
  overflow: hidden;
}
.xll-swiper-image{
  width:100%;
  -webkit-animation:scaleDraw 13.5s ease-in-out infinite ;

}
@keyframes scaleDraw {
  0%{
    transform: scale(1);
  }
  25%{
    transform: scale(1.01);
  }
  50%{
    transform: scale(1.05);
  }
  75%{
    transform: scale(1.06);
  }
}

.xll-swiper-slider{
  height: 100%;
  position: relative;
}

.xll-swiper-1{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index:1;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0,0,0,0.4);
}


@media screen and (max-width: 768px) {
  .featured-jobs-label {
    font-size: 14px;
  }
  .xllSwiper{
    height:240px;
  }
  .xll-find-best-row h2{
    font-size: 14px;
  }
  .xll-find-best-row h1{
    font-size: 16px;
  }
}

@media screen and (min-width: 769px) and (max-width: 992px){
  .xllSwiper{
    height:300px;
  }

}

@media screen and (min-width: 993px) and (max-width: 1200px){
  .xllSwiper{
    height:340px;
  }
}

@media screen and (min-width: 1200px) {

  .search-container-bg{
    width: 1100px;
  }
  .featured-jobs-row {
    width: 1200px;
  }
  .featured-schools-content-container {
    width: 1100px;
  }
  .featured-deals-row {
    width: 1100px;
  }

  .popular-work-row {
    width: 1100px;
  }
  .industry-news-row {
    width: 1100px;
  }

  .xll-search-btn-row {
    width: 1100px;
  }

  .subscribe-input-row, .subscribe-label-row {
    width: 1100px;
    margin: 0 auto;
  }

}

</style>
