<template>
<div class="profile-container">

  <div class="action-container" v-if="canEdit">
    <template v-if="fromDeal">
      <div class="action-l">
        <el-button class=""
                   @click="backToSearchResults()"
                   link>
          <el-icon>
            <ArrowLeft />
          </el-icon>
          BACK
        </el-button>
      </div>
      <div class="action-r">

      </div>
    </template>
    <template v-else>
      <div class="action-l">
        <!--      <el-button link @click="exitPreview()">-->
        <!--        <el-icon>-->
        <!--          <ArrowLeft />-->
        <!--        </el-icon>-->
        <!--        EXIT PREVIEW-->
        <!--      </el-button>-->
      </div>
      <div class="action-r">
        <el-button class="action-edit-btn"
                   @click="editProfile()"
                   plain round>
          EDIT PROFILE
        </el-button>
      </div>
    </template>

  </div>

  <el-scrollbar :class="canEdit ? 'container' : 'container-2'">

    <template v-if="info.background_image && info.background_image != '0' ">

      <div class="background-container" :style="'background-image:url('+ info.background_image +')'">
        <el-image class="background-img" :src="info.background_image" fit="cover"
                  :preview-src-list="[info.background_image]"
        >
          <template #error>
            <div class="img-slot-background">
              <el-icon :size="180" color="#808080">
                <Picture/>
              </el-icon>
            </div>
          </template>
        </el-image>
      </div>

    </template>

    <div class="content-bg-container">
      <div class="info-1-container">
        <div class="info-1-l">
          <el-image class="logo-img" :src="info.logo">
            <template #error>
              <div class="img-slot-logo">
                <el-icon :size="60" color="#808080">
                  <Picture/>
                </el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div class="info-1-r">
          <div class="info-1-r-1">
            {{info.company_name}}
          </div>
          <div class="info-1-r-c">
            <div class="info-item" v-if="info.website">
              <div class="info-item-l">Website:</div>
              <div class="info-item-r">{{info.website }}</div>
            </div>
            <div class="info-item" v-if="info.work_phone">
              <div class="info-item-l">Work phone:</div>
              <div class="info-item-r">{{info.work_phone }}</div>
            </div>
            <div class="info-item" v-if="info.work_email">
              <div class="info-item-l">Work email:</div>
              <div class="info-item-r">{{info.work_email }}</div>
            </div>
            <div class="info-item" v-if="info.country_info && $filters.countryInfoFormat(info.country_info)">
              <div class="info-item-l">Location:</div>
              <div class="info-item-r">{{ $filters.countryInfoFormat(info.country_info) }}</div>
            </div>
            <div class="info-item" v-if="info.address">
              <div class="info-item-l">Address:</div>
              <div class="info-item-r">{{ info.address }}</div>
            </div>
            <div class="info-item" v-if="info.category_name_en && info.category_name_en != '0' ">
              <div class="info-item-l" v-if="identity == 2">Recruiter type:</div>
              <div class="info-item-l" v-if="identity == 3">School type:</div>
              <div class="info-item-l" v-if="identity == 4">Other type:</div>
              <div class="info-item-l" v-if="identity == 5">Vendor type:</div>
              <div class="info-item-r">
                {{info.category_name_en}}
              </div>
            </div>

            <div class="info-item" v-if="info.year_founded">
              <div class="info-item-l">Founded:</div>
              <div class="info-item-r">{{info.year_founded }}</div>
            </div>

            <div class="info-item" v-if="identity == 3 && info.tuition_type && info.tuition">
              <div class="info-item-l">Tuition:</div>
              <div class="info-item-r">{{info.tuitions.object_en}} {{ info.tuition }}</div>
            </div>

            <div class="info-item" v-if="identity == 3 && info.class_size">
              <div class="info-item-l">Avg class size:</div>
              <div class="info-item-r">{{info.class_size }}</div>
            </div>

          </div>
        </div>
      </div>
      <div class="contact-container">
        <div class="contact-label">Contact person</div>

        <div class="contact-c">
          <div class="contact-l">
            <el-avatar class="contact-l-img" :src="info.profile_photo"></el-avatar>
          </div>
          <div class="contact-r">
            <div class="contact-r-1">
              {{info.display_name}} <span>{{info.job_title}}</span>
            </div>
            <div class="contact-r-2">
              <chatButton text="GET IN TOUCH"
                          btn-style="link"
                          :targetUser="info"
                          :identity="identity"
                          @onSuccess="chatSuccess"
              >
              </chatButton>
            </div>
          </div>
        </div>

      </div>
      <div class="about-container">
        <div class="about-label">About {{info.company_name}}</div>
        <div class="about-desc" v-html="info.desc"></div>
      </div>

      <div class="video-container" v-if="info.video_url">
        <video id="video" controls :src="info.video_url"></video>
      </div>

      <div class="images-container" v-if="info.images">
        <swiper
            :style="{
      '--swiper-navigation-color': '#000000',
      '--swiper-pagination-color': '#000000',
    }"
            :slidesPerView="4"
            :slidersPerGroup="4"
            :loop="false"
            :loopFillGroupWithBlank="true"
            :spaceBetween="50"
            :pagination="{clickable: true,}"
            :navigation="true"
            class="mySwiper2"
        >
          <swiper-slide v-for="(item,i) in info.images" :key="i">
            <el-image class="images-item-img" :src="item.url">
              <template #error>
                <div class="img-slot-swiper">
                  <el-icon :size="80" color="#808080">
                    <Picture/>
                  </el-icon>
                </div>
              </template>
            </el-image>
          </swiper-slide>
        </swiper>
      </div>
      <div class="expect-container" v-if="identity == 3">
        <div class="expect-label">What to expect</div>
        <div class="expect-c">
          <div class="expect-c-item" v-if="info.staff_student_ratio">
            <div class="expect-c-item-label">Curriculum</div>
            <div class="expect-c-item-c">
              {{ info.staff_student_ratio }}
            </div>
          </div>
          <div class="expect-c-item" v-if="$filters.userObjectFormat(info.subject)">
            <div class="expect-c-item-label">Subjects we teach</div>
            <div class="expect-c-item-c">
              {{ $filters.userObjectFormat(info.subject)  }}
            </div>
          </div>
          <div class="expect-c-item" v-if="$filters.userObjectFormat(info.Student_Age)">
            <div class="expect-c-item-label">Student's age</div>
            <div class="expect-c-item-c">
              {{ $filters.userObjectFormat(info.Student_Age)  }}
            </div>
          </div>
          <div class="expect-c-item" v-if="info.technology_available">
            <div class="expect-c-item-label">Technology available</div>
            <div class="expect-c-item-c">
              {{info.technology_available}}
            </div>
          </div>
          <div class="expect-c-item" v-if="$filters.userObjectFormat(info.facilities)">
            <div class="expect-c-item-label">Facilities</div>
            <div class="expect-c-item-c">
              {{ $filters.userObjectFormat(info.facilities) }}
            </div>
          </div>
          <div class="expect-c-item">
            <div class="expect-c-item-label">Field trips</div>
            <div class="expect-c-item-c" v-if="info.felds_trips == 1">
              Yes
            </div>
            <div class="expect-c-item-c" v-else>
              No
            </div>
          </div>

        </div>
      </div>

      <template v-if="info.lng && info.lat">
        <mapComponent :lng="info.lng" :lat="info.lat" ></mapComponent>
      </template>

      <div class="cre-container" v-if="info.business_reg_img || info.license">
        <div class="cre-label">Credibility</div>
        <el-row class="cre-c" :gutter="0">
          <el-col :span="12">
            <div class="cre-item-label">Business registration certificate</div>
            <div class="cre-item-img-container" v-if="info.business_reg_img">
              <el-image class="cre-item-img" :src="info.business_reg_img">
                <template #error>
                  <div class="img-slot-cre">
                    <el-icon :size="80" color="#808080">
                      <Picture/>
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </el-col>
          <el-col :span="12" v-if="identity == 3 || identity == 4">
            <div class="cre-item-label">License</div>
            <div class="cre-item-img-container" v-if="info.license">
              <el-image class="cre-item-img" :src="info.license">
                <template #error>
                  <div class="img-slot-cre">
                    <el-icon :size="80" color="#808080">
                      <Picture/>
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </el-col>
        </el-row>
      </div>


    </div>

  </el-scrollbar>
</div>

</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import SwiperCore, {Autoplay, Pagination, Navigation} from 'swiper';
SwiperCore.use([Autoplay, Navigation, Pagination]);
import {ref,computed} from 'vue'
import {useStore} from 'vuex'
import {encode} from 'js-base64'
import { useRouter } from 'vue-router'
import mapComponent from "@/components/mapComponent";
import chatButton from '@/components/chat/chatButton';

export default {
  name: "businessProfile",
  props:[ 'info', 'identity','canEdit','fromDeal'],
  components: {
    Swiper,
    SwiperSlide,
    mapComponent,
    chatButton
  },
  setup() {

    let thumbsSwiper = ref(null);

    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    }

    const store = useStore()
    const router = useRouter()

    function turnChatPage(){
      router.push({path:'/chat/messages'})
    }

    const currentUser = computed(()=>store.state.currentUser)

    return {
      thumbsSwiper,
      setThumbsSwiper,
      currentUser,
      turnChatPage

    }
    

  },
  methods:{
    exitPreview(){
      this.$router.push('/account/home')
    },
    backToSearchResults(){
      this.$emit('back')
    },
    editProfile(){
      let  companyId = this.info.id;
      let identity = this.identity;
      let str = '';

      if(companyId){
        let strObj = {
          cid: companyId,
          action:'edit'
        }

        str = encode(JSON.stringify(strObj))

      }else{
        let strObj = {
          i:identity,
          action:'add'
        }
        str = encode(JSON.stringify(strObj))
      }

      if(identity == 2){
        this.$router.push({path:'/business/edit/recruiter',query:{s:str}})
      }
      if(identity == 3){
        this.$router.push({path:'/business/edit/school',query:{s:str}})
      }
      if(identity == 4){
        this.$router.push({path:'/business/edit/other',query:{s:str}})
      }

      if(identity == 5){
        this.$router.push({path:'/vendor/edit/vendor',query:{s:str}})
      }

    },
    chatSuccess(){
      this.turnChatPage()
    },


  }

}
</script>

<style scoped>
.profile-container{
  /*max-width: 1130px;*/
}

.container{
  height: calc(100vh - 200px);
  background-color: #F0F2F5;
}

.container-2{
  height: calc(100vh - 140px);
  background-color: #F0F2F5;
}

.background-container{
  /*height: 260px;*/
  background-size: 100%;
  background-repeat: repeat;
  background-position: center;
  height: 380px;
  overflow: hidden;

  text-align: center;
}

.background-img{
  width: 100%;
  height: 100%;
}

.content-bg-container{
  padding: 25px;
}

.info-1-container{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 25px;

}

.info-1-l{

}
.logo-img{
 width: 100px;
  height: 100px;
}

.info-1-r{
  width: calc(100% - 125px);
}

.info-1-r-1{
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 35px;
  color: #262626;
}

.info-1-r-c{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.info-item{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.info-item-l{
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.info-item-r{
  margin-left: 4px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.contact-container{
  margin-top: 50px;

}

.contact-label{
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.contact-c{
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.contact-l{

}
.contact-l-img{
  width: 74px;
  height: 74px;
}

.contact-r{
  width: calc(100% - 89px);
}

.contact-r-1{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}
.contact-r-1 span{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.contact-r-2{
  font-size: 20px;
}

.about-container{
  margin-top: 50px;
}

.about-label{
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.about-desc{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
  margin-top: 25px;
}

.video-container{
  width: 100%;
  margin-top: 25px;
  text-align: center;
}

#video{
  width: 400px;
}

.expect-container{
  margin-top: 50px;
}
.expect-label{
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.expect-c{
  margin-top: 25px;
}

.expect-c-item{
  margin-top: 25px;
}
.expect-c-item-label{
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.expect-c-item-c{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.cre-container{
  margin-top: 50px;
}

.cre-label{
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.cre-c{
  margin-top: 25px;
}

.cre-item-label{
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.cre-item-img-container{
  width: 98%;
  min-height: 200px;
  margin: 10px auto;

}

.cre-item-img{
  width: 100%;
  min-height: 200px;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.images-container{
  width: 100%;
  margin-top: 25px;
}
.images-item-img{
  height: 140px;
}

.action-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.action-r{
  text-align: right;
  padding-right: 50px;
}


.deals-from-back-btn {
  font-size: 20px;
}

.img-slot-background{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

}

.img-slot-logo{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

}

.img-slot-swiper{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-slot-cre{
  width: 90%;
  height: 94%;
  display: flex;
  align-items: center;
  justify-content: center;
  border:1px solid rgba(0, 0, 0, 0.1);
}

@media screen and (min-width: 1200px) and (max-width: 1919px){

  .logo-img{
    width: 40px;
    height: 40px;

  }

  .info-1-r-1{
    font-size: 20px;
  }

  .info-1-r{
    width: calc(100% - 50px);
  }

  .info-item-l{
    font-size: 14px;
  }

  .info-item-r{
    font-size: 14px;
  }

  .contact-label{
    font-size: 20px;
  }

  .contact-l-img{
    width: 40px;
    height: 40px;
  }

  .contact-r{
    width: calc(100% - 50px);
  }

  .contact-r-1{
    font-size: 16px;
  }
  .content-r-1 span{
    font-size: 14px;
  }

  .about-label{
    font-size: 20px;
  }
  .about-desc{
    font-size: 14px;
  }

  .cre-label{
    font-size: 20px;
  }

}

</style>