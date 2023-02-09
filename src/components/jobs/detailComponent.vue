<template>
<div>
  <el-scrollbar class="xll-job-detail">

    <div class="job-detail-bg-container">

      <div class="xll-ads-container" v-if="adsData.length>0">
        <adsComponent :height="adsHeight" :adsData="adsData">
        </adsComponent>
      </div>

      <div class="back-btn-container">
        <el-button class="back-btn" link type="primary"
                   @click="backToSearchResults()"
        >
          <el-icon>
            <ArrowLeft />
          </el-icon>
          BACK
        </el-button>
      </div>

      <div class="job-detail-container">

        <div class="job-detail-t">
          <div class="job-detail-t-l">
            <div class="job-detail-t-l-1"
                 v-if="detailData.company"
                 @click="turnBusinessProfile(detailData)"
            >
              {{detailData.company.company_name}}
            </div>
            <div class="job-detail-t-l-2">
              {{detailData.job_title}}
            </div>
            <div class="job-detail-t-l-3">
              {{detailData.job_location}}
            </div>
          </div>
          <div class="job-detail-t-r">
            <el-button link @click="shareJob(detailData)">
              SHARE
            </el-button>
<!--            <el-button type="primary" round-->
<!--                       :loading="applyBtnLoading"-->
<!--                       @click="applyJob(detailData.id)">-->
<!--              QUICK APPLY-->
<!--            </el-button>-->
            <applyJobButton btn-text="QUICK APPLY"
                            :selectJobId="detailData.id"
                            :job-info="detailData">
            </applyJobButton>

            <template v-if="currentIdentity != 5">
              <el-button
                  v-if="detailData.is_favorite && detailData.is_favorite == 1 && isFavoriteValue == 1"
                  plain round
                  @click="cancelSaveJob(detailData.id,1,detailData.job_title,detailData.company_logo)">
                SAVE
                <el-icon color="#6650B3" >
                  <IconFontistoFavorite/>
                </el-icon>
              </el-button>

              <el-button
                  v-else
                  plain round
                  @click="saveJob(detailData.id,1,detailData.job_title,detailData.company_logo)">
                SAVE
                <el-icon>
                  <CollectionTag/>
                </el-icon>
              </el-button>

            </template>

          </div>
        </div>

        <div class="job-detail-c">

          <div class="job-detail-c-1">
            <div class="job-detail-c-item" v-if="detailData.entry_date">
              <div class="job-detail-c-item-l">Start date:</div>
              <div class="job-detail-c-item-r">{{detailData.entry_date}}</div>
            </div>

            <div class="job-detail-c-item" v-if="detailData.age_to_teach">
              <div class="job-detail-c-item-l">Student's age:</div>
              <div class="job-detail-c-item-r">
                {{ $filters.userObjectFormat(detailData.age_to_teach)}}
              </div>
            </div>

            <div class="job-detail-c-item" v-if="detailData.subject">
              <div class="job-detail-c-item-l">Subjects:</div>
              <div class="job-detail-c-item-r">
                {{ $filters.userObjectFormat(detailData.subject)}}
              </div>
            </div>

            <div class="job-detail-c-item" v-if="workingHoursData.length>0">
              <div class="job-detail-c-item-l">Hours:</div>
              <div class="job-detail-c-item-r">
                <div class="working-hours">
                  <div class="working-hours-item" v-for="(item,index) in workingHoursData" :key="index">
                    <el-tag class="working-hours-week" v-for="(week,i) in item.week" :key="i">
                      <span v-if="week==1">M</span>
                      <span v-if="week==2">T</span>
                      <span v-if="week==3">W</span>
                      <span v-if="week==4">Th</span>
                      <span v-if="week==5">F</span>
                      <span v-if="week==6">Sa</span>
                      <span v-if="week==7">Su</span>
                    </el-tag>
                    <span class="working-hours-hours">{{item.hours}}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="job-detail-c-2">
            <div class="job-detail-c-2-l">
              <div class="job-detail-c-item-label">Requirements:</div>
              <div class="job-detail-c-item-c">
                <div class="job-detail-c-item" v-if="detailData.teaching_times_en">
                  <div class="job-detail-c-item-l">Teaching experience:</div>
                  <div class="job-detail-c-item-r">
                    {{detailData.teaching_times_en}}
                  </div>
                </div>
                <div class="job-detail-c-item" v-if="detailData.education_en">
                  <div class="job-detail-c-item-l">Minimum education:</div>
                  <div class="job-detail-c-item-r">
                    {{detailData.education_en}}
                  </div>
                </div>
                <div class="job-detail-c-item" v-if="detailData.class_size">
                  <div class="job-detail-c-item-l">Class size:</div>
                  <div class="job-detail-c-item-r">
                    {{detailData.class_size}}
                  </div>
                </div>
                <div class="job-detail-c-item" v-if="detailData.numbers">
                  <div class="job-detail-c-item-l">Number of Vacancies:</div>
                  <div class="job-detail-c-item-r">
                    {{detailData.numbers}}
                  </div>
                </div>
                <div class="job-detail-c-item"
                     v-if="detailData.apply_due_date && detailData.apply_due_date !='0000-00-00'"
                >
                  <div class="job-detail-c-item-l">Application:</div>
                  <div class="job-detail-c-item-r">
                    {{detailData.apply_due_date}}
                  </div>
                </div>

                <div class="job-detail-c-item" v-if="detailData.Teaching_certificate">
                  <div class="job-detail-c-item-l">Teaching certificates:</div>
                  <div class="job-detail-c-item-r">
                    {{ $filters.userObjectFormat(detailData.Teaching_certificate)}}
                  </div>
                </div>

                <div class="job-detail-c-item" v-if="detailData.Nationality">
                  <div class="job-detail-c-item-l">Preferred nationality:</div>
                  <div class="job-detail-c-item-r">
                    {{ $filters.userObjectFormat(detailData.Nationality)}}
                  </div>
                </div>

                <div class="job-detail-c-item" v-if="detailData.Acceptable">
                  <div class="job-detail-c-item-l">Acceptable nationality:</div>
                  <div class="job-detail-c-item-r">
                    {{ $filters.userObjectFormat(detailData.Acceptable)}}
                  </div>
                </div>
                <div class="job-detail-c-item" v-if="detailData.sex">
                  <div class="job-detail-c-item-l">Gender:</div>
                  <div class="job-detail-c-item-r">
                    <template v-if="detailData.sex == 1">Male</template>
                    <template v-if="detailData.sex == 2">Female</template>
                    <template v-if="detailData.sex == 3">Non-binary</template>
                    <template v-if="detailData.sex == 4">No Gender Requirements</template>
                  </div>
                </div>

              </div>

            </div>

            <div class="job-detail-c-2-r">
              <div class="job-detail-c-item-label">Compensation:</div>
              <div class="job-detail-c-item-c">
                <div class="job-detail-c-item">
                  <div class="job-detail-c-item-l">Salary range:</div>
                  <div class="job-detail-c-item-r">
                    {{ detailData.currency }} {{ detailData.salary_min }} - {{ detailData.salary_max }} /
                    <span v-if="detailData.payment_period == 112">hourly</span>
                    <span v-if="detailData.payment_period == 113">daily</span>
                    <span v-if="detailData.payment_period == 114">weekly</span>
                    <span v-if="detailData.payment_period == 115">monthly</span>
                    <span v-if="detailData.payment_period == 116">annually</span>
                  </div>
                </div>
                <div class="job-detail-c-item" v-if="detailData.benefits">
                  <div class="job-detail-c-item-l">Benefits:</div>
                  <div class="job-detail-c-item-r">
                    {{ $filters.userObjectFormat(detailData.benefits)}}
                  </div>
                </div>

              </div>

            </div>

          </div>

          <div class="job-detail-desc">
            <div class="job-detail-desc-label">Job details:</div>

            <div class="job-detail-desc-content" v-html="detailData.desc"></div>

            <div class="job-detail-desc-content-mobile"
                 :class="showMoreVisible ? 'job-detail-desc-content-mobile-more' : ''"
                 v-html="detailData.desc">
            </div>

            <div class="job-detail-desc-content-mobile-btn-container" >
              <el-button class="job-detail-desc-content-mobile-btn"
                         v-if="showMoreVisible"
                         link
                         @click="showMoreVisible=false" >
                SHOW MORE
              </el-button>
              <el-button class="job-detail-desc-content-mobile-btn"
                         v-else
                         link
                         @click="showMoreVisible=true" >
                SHOW LESS
              </el-button>
            </div>

          </div>

          <div class="map-container">
            <div id="mapContainer" class="basemap"></div>
          </div>

        </div>

      </div>

    </div>

  </el-scrollbar>

  <shareCard :visible="shareDialogVisible"
             :title="detailData.job_title"
             :description ="detailData.desc"
             :quote = "detailData.desc"
             :url="locationUrl"
             @close="shareDialogVisible=false"
  >
  </shareCard>


</div>
</template>

<script>

import adsComponent from "@/components/ads/adsComponent";
import shareCard from "@/components/shareCard";
import {ADD_FAVORITE, APPLY_JOBS, CANCEL_FAVORITE} from "@/api/api";
import applyJobButton from '@/components/jobs/applyButton'
import {updateWindowHeight} from "@/utils/tools";
import {ref} from 'vue'
export default {
  name: "detailComponent",
  components: {
    adsComponent,
    shareCard,
    applyJobButton
  },
  props:['detailData','adsData','workingHoursData'],
  setup(){
    const currentIdentity = localStorage.getItem('identity')
    const showMoreVisible = ref(true)

    const showMoreAboutJobDetails = ()=>{
      showMoreVisible.value = true
    }

    return {
      showMoreVisible,
      currentIdentity,
      showMoreAboutJobDetails
    }
  },
  data(){
    return {
      isFavoriteValue: 1,
      shareDialogVisible:false,
      locationUrl:'',
      applyBtnLoading:false,
      adsHeight:'190px',

    }
  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  mounted(){
    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      updateWindowHeight()
      this.adsHeight = '120px'
    }

    if (screenWidthFloor > 768 && screenWidthFloor < 992) {
      this.adsHeight = '120px'
    }

    if (screenWidthFloor >= 992 && screenWidthFloor < 1200) {
      this.adsHeight = '120px'
    }
    if (screenWidthFloor >= 1200 && screenWidthFloor < 1920) {
      this.adsHeight = '140px'
    }
    if(screenWidthFloor >= 1920){
      this.adsHeight = "190px"
    }

    window.onresize = () =>{
      if (screenWidthFloor <= 768) {
        updateWindowHeight()
        this.adsHeight = '120px'
      }

      if (screenWidthFloor > 768 && screenWidthFloor < 992) {
        this.adsHeight = '120px'
      }
      if (screenWidthFloor >= 992 && screenWidthFloor < 1200) {
        this.adsHeight = '120px'
      }
      if (screenWidthFloor >= 1200 && screenWidthFloor < 1920) {
        this.adsHeight = '140px'
      }
      if(screenWidthFloor >= 1920){
        this.adsHeight = "190px"
      }

    }
  },
  methods:{
    shareJob(data){
      let origin = window.location.origin;
      let locationUrl = origin + '/jobs/detail?id='+data.id;
      this.locationUrl = locationUrl;
      this.shareDialogVisible = true;
    },
    applyJob(id) {
      this.applyBtnLoading = true;
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
            this.applyBtnLoading = false;
          }
        }).catch(err=>{
          console.log(err)
          this.$message.error(err.msg)
          // if(err.code === 400){
          //   this.$message.error('Please complete your profile in order to apply')
          // }else{
          //   if(err.msg){
          //     this.$message.error(err.msg)
          //   }
          //   if(err.message){
          //     this.$message.error(err.message)
          //   }
          // }

          this.applyBtnLoading = false;

        })

      } else {
        this.$message.warning('Please switch to an educator profile to be able to apply')
        this.applyBtnLoading = false;
      }


    },
    saveJob(id, type, title, url){
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
          this.isFavoriteValue = 1
        }
      }).catch(err=>{
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })
    },
    cancelSaveJob(id, type, title, url){
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: id,
        type_title: title,
        type_url: url
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          // this.detailData.is_favorite = 0
          this.isFavoriteValue = 0;
        }
      }).catch(err=>{
        console.log(err)
        if(err.msg){
          this.$message.error(err.msg)
        }
        if(err.message){
          this.$message.error(err.message)
        }
      })
    },
    turnBusinessProfile(info){

      let obj = {
        jobId:info.id,
        uid:info.user_id,
        i:info.identity,
        cid:info.company_id
      }

      this.$router.push({path:'/jobs/business/profile',query:obj})

    },
    turnBanner(link) {
      console.log(link)
      if (link != '') {
        window.location.href = link
      } else {
        let token = localStorage.getItem('token')
        if (!token) {
          window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')
          return;
        }
        this.$router.push('/me/ads/platform')
      }
    },
    backToSearchResults(){
      this.$router.go(-1)
    }

  }
}
</script>

<style scoped>

.xll-ads-container {
  margin-bottom: 50px;
}

.xll-job-detail{
  height: calc(100vh - 140px);
  background-color: #F0F2F5;
}

.job-detail-bg-container{
  padding: 30px;
}


.job-detail-t{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  height: 120px;
}

.job-detail-t-l{
  width: 50%;
}

.job-detail-t-l-1{
  cursor: pointer;
  font-family:BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color:#6650B3;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.job-detail-t-l-2{
  font-family:BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 35px;
  color:#262626;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.job-detail-t-l-3{
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color:#262626;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}




.job-detail-c-1{

}

.job-detail-c-item{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.job-detail-c-item-l{
  /*width: 210px;*/
  font-family:Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color:#262626;
}
.job-detail-c-item-r{
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color:#262626;
  margin-left: 10px;
}

.job-detail-c-2{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
}

.job-detail-c-2-l{
  width: 100%;
}
.job-detail-c-2-r{
  width:100%;
  margin-top: 50px;
}

.job-detail-c-item-label{
  font-family:BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color:#262626;
}
.job-detail-c-item-c{
  margin-top: 25px;
}
.job-detail-desc{
  margin-top: 50px;
}

.job-detail-desc-label{
  font-family:BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color:#262626;
}

.job-detail-desc-content{
  margin-top: 25px;
  font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color:#262626;
}

.map-container{
  margin-top: 25px;
  margin-bottom: 50px;
}

#mapContainer{
  height: 300px;
}

.working-hours{
  width: 100%;
}

.working-hours-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 10px;
  position: relative;
}
.working-hours-week{
  margin-left: 10px;
}
.working-hours-hours{
  margin-left: 20px;
}


@media screen and (min-width: 1920px) {
  /*  190 */
}

@media screen and (max-width: 1919px) and (min-width: 1200px) {
  /*  140 */

}

@media screen and (max-width: 1199px) and (min-width: 992px) {
  /*  120 */

}

@media screen and (min-width: 769px) {
  .back-btn-container{
    display: none;
  }

  .job-detail-desc-content-mobile{
    display: none;
  }

  .job-detail-desc-content-mobile-btn-container{
    display: none;
  }

}

@media screen and (max-width: 768px) {
  .xll-job-detail{
    height: calc( var(--i-window-height) - 80px);
    background-color: #FFFFFF;
  }
  .job-detail-bg-container{
    padding: 15px;
  }

  .xll-ads-container{
    margin-bottom: 25px;
  }

  .job-detail-t{
    flex-direction: column;
    background-color: #F0F2F5;
    padding: 15px;
    border-radius: 4px;
    height: auto;
  }

  .job-detail-t-l{
    width: 100%;
  }

  .job-detail-t-l-1{
    text-align: center;
    font-size: 12px;
  }
  .job-detail-t-l-2{
    width: 100%;
    text-align: center;
    font-size: 20px;
  }
  .job-detail-t-l-3{
    text-align: center;
    font-size: 16px;
  }

  .job-detail-t-r{
    width: 100%;
    text-align: center;
    margin-top: 15px;
  }

  .job-detail-c-1{
    margin-top: 15px;
    margin-left: 15px;
  }

  .job-detail-c-item{
    flex-direction: column;
  }

  .job-detail-c-item-l{
    font-size: 16px;
  }

  .job-detail-c-item-r{
    font-size: 16px;
    margin-left: 0;
  }

  .job-detail-c-2{
    margin-top: 15px;
  }

  .job-detail-c-item-label{
    font-size: 18px;
  }

  .job-detail-c-item-c{
    margin-top: 10px;
    margin-left: 15px;
  }

  .job-detail-c-2-r{
    margin-top: 15px;
  }

  .job-detail-desc{
    margin-top: 15px;

  }

  .job-detail-desc-label{
    font-size: 18px;
  }

  .job-detail-desc-content{
    display: none;
  }

  .job-detail-desc-content-mobile{

    margin-top: 10px;
    margin-left: 15px;

    font-family:AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
    color:#262626;
    font-size: 16px;
  }
  .job-detail-desc-content-mobile-more{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  .job-detail-desc-content-mobile-btn-container{

  }

  .job-detail-desc-content-mobile-btn{
    color:#6650B3;
  }

  .back-btn-container{
    margin-bottom: 15px;
  }

}

</style>