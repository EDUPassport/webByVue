<template>
  <div class="e-j">
    <div class="e-j-label">
      Our picks for you
    </div>

    <el-scrollbar max-height="320px" class="e-j-c">
      <template v-if="jobFeaturedData.length>0 && percentage >= 80">

        <div class="e-j-item"
             v-for="(item,i) in jobFeaturedData" :key="i"
        >
          <div class="e-j-item-t">
            <div class="e-j-item-t-l">
              <el-image class="e-j-item-avatar"
                        :src="item.third_company_logo ? item.third_company_logo : item.company_logo"
              ></el-image>
            </div>
            <div class="e-j-item-t-r">
              <div class="e-j-item-t-r-t">
                <h5  @click="turnJobDetail(item.id)"> {{ item.job_title }} </h5>
                <el-tag class="e-j-item-tag"
                        type="warning"
                        round
                        v-if="item.employment_type==1">
                  Full time
                </el-tag>
                <el-tag class="e-j-item-tag"
                        type="warning"
                        round
                        v-if="item.employment_type==2">
                  Part time
                </el-tag>
                <el-tag class="e-j-item-tag"
                        type="warning"
                        round
                        v-if="item.employment_type==3">
                  Seasonal
                </el-tag>
              </div>
              <div class="e-j-item-t-r-b">
                <el-image class="e-j-item-icon-16" :src="companyIconImg"></el-image>
                <span>{{item.company_name}}</span>
              </div>

            </div>

          </div>
          <div class="e-j-item-b">

            <el-tooltip
                effect="light"
                :content="item.job_location"
                placement="bottom"
            >
              <div class="e-j-item-b-item-job-location">
                <el-image class="e-j-item-icon-24" :src="locationIconImg"></el-image>
                <span>{{item.job_location}}</span>
              </div>

            </el-tooltip>

            <div class="e-j-item-b-item">
              <el-image class="e-j-item-icon-24" :src="salaryIconImg"></el-image>
              <span>{{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}</span>
<!--              <span v-if="item.payment_period == 112">hourly</span>-->
<!--              <span v-if="item.payment_period == 113">daily</span>-->
<!--              <span v-if="item.payment_period == 114">weekly</span>-->
<!--              <span v-if="item.payment_period == 115">monthly</span>-->
<!--              <span v-if="item.payment_period == 116">annually</span>-->
            </div>

            <div class="e-j-item-b-btn-container">

              <applyJobButton :selectJobId="item.id"
                                btn-text="Apply Now"
                                :job-info="item" >
                </applyJobButton>
            </div>
          </div>

<!--          <div class="e-j-item-r">-->
<!--            <div class="e-j-item-r-1">{{item.educator_matching_score}}% match</div>-->
<!--            <div class="e-j-item-r-2">-->
<!--              <template v-if="item.educator_matching_score <= 60">-->
<!--                <el-image class="e-j-c-item-avatar" :src="doubtingImg" fit="contain"></el-image>-->
<!--              </template>-->
<!--              <template v-if="item.educator_matching_score > 60 && item.educator_matching_score <=80">-->
<!--                <el-image class="e-j-c-item-avatar" :src="thumbUpImg" fit="contain"></el-image>-->
<!--              </template>-->
<!--              <template v-if="item.educator_matching_score > 80">-->
<!--                <el-image class="e-j-c-item-avatar" :src="funfareImg" fit="contain"></el-image>-->
<!--              </template>-->

<!--            </div>-->
<!--          </div>-->

        </div>

      </template>
      <template v-else>
        <el-empty description="..."></el-empty>
      </template>

    </el-scrollbar>
  </div>

</template>

<script>
import doubtingImg from '@/assets/newHome/match/doubting.png'
import funfareImg from '@/assets/newHome/match/funfare.png'
import thumbUpImg from '@/assets/newHome/match/thumb_up.png'
import companyIconImg from '@/assets/newHome/dashboard/company_nofill.svg'
import locationIconImg from '@/assets/newHome/dashboard/location_nofill.svg'
import salaryIconImg from '@/assets/newHome/dashboard/salary_nofill.svg'
import applyJobButton from '@/components/jobs/applyButton'


import {EDUCATOR_JOB_MATCH_LIST, EDUCATOR_MANUAL_MATCH_JOB, JOB_FEATURED_LIST} from "@/api/api";

export default {
  name: "dailyJobMatch",
  components: {
  applyJobButton
  },
  data(){
    return {
      doubtingImg,
      funfareImg,
      thumbUpImg,
      companyIconImg,
      locationIconImg,
      salaryIconImg,
      jobFeaturedData:[],
      percentage:null
    }
  },
  mounted(){
    this.manualMatchJob()

    this.getEducatorJobMatchingList()
      this.percentage=localStorage.getItem('profile_percentage')
    // this.getJobFeaturedList()
  },
  methods:{
    manualMatchJob(){
      let self = this;
      let params = {}
      EDUCATOR_MANUAL_MATCH_JOB(params).then(res=>{
        console.log(res)
        setTimeout(function () {
          self.getEducatorJobMatchingList()
        }, 1000 * 6)
      }).catch(err=>{
        console.log(err)
      })
    },
    turnJobDetail(id){
      let path = '/jobs/detail/' + id + '/' + 1
      this.$router.push({path:path,query:{}})
    },
    getJobFeaturedList() {
      let params = {
        ad_type: 2
      }

      JOB_FEATURED_LIST(params).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.jobFeaturedData = res.message;
        } else {
          console.log(res.msg)
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    getEducatorJobMatchingList(){
      let params = {
        user_id:localStorage.getItem('uid')
      }
      EDUCATOR_JOB_MATCH_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.jobFeaturedData = res.message
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }

}
</script>

<style scoped>

.e-j {
  box-sizing: border-box;
  width: 508px;
  height: 409px;
  background: #FFFFFF;
  border: 1px solid #EAECF0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
}

.e-j-label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #101828;
  margin: 16px 0 8px 20px;
}

.e-j-item {
  margin: 16px 20px;
  padding: 16px;
  height: 124px;
  background: #F9FAFB;
  border-radius: 12px;
}

.e-j-item-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

}

.e-j-item-avatar {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #EEEEEE;
}

.e-j-item-t-r-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 9px;
}
.e-j-item-tag{
  margin-left: 20px;
}

.e-j-item-t-r-b{
  margin-left: 9px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.e-j-item-t-r-b span{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #667085;
}

.e-j-item-b{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
}
.e-j-item-b-item-job-location{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: 8px;
}

.e-j-item-b-item-job-location span{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #344054;
  cursor: pointer;

  width: 80px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.e-j-item-b-item{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.e-j-item-b-item span{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #344054;
}

.e-j-item-b-btn-container{

}

.e-j-item-icon-16{
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.e-j-item-icon-24{
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

@media screen and (max-width: 768px){
  .e-j{
    width: 100%;
  }
  .e-j-item{
    height: 140px;
  }
  .e-j-item-b{
    margin-top: 10px;
    flex-direction: column;
  }

}

</style>
