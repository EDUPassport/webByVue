<template>
<div>
  <div class="e-j">
    <div class="e-j-label">
      Our picks for you
    </div>
    <el-scrollbar max-height="320px" class="e-j-c">

      <div class="e-j-item-bg" v-for="(item,i) in jobFeaturedData" :key="i">
        <div class="e-j-item">
          <div class="e-j-item-l">
            <el-avatar class="e-j-c-item-avatar"
                       :src="item.third_company_logo ? item.third_company_logo : item.company_logo"
            ></el-avatar>
          </div>
          <div class="e-j-item-m">
            <div class="e-j-item-m-1"> {{ item.company_name }}</div>
            <div class="e-j-item-m-2" @click="turnJobDetail(item.id)">
              {{ item.job_title }}
            </div>
            <div class="e-j-item-m-3">
              {{ item.currency }} {{ item.salary_min }} - {{ item.salary_max }}
              <span v-if="item.payment_period == 112">hourly</span>
              <span v-if="item.payment_period == 113">daily</span>
              <span v-if="item.payment_period == 114">weekly</span>
              <span v-if="item.payment_period == 115">monthly</span>
              <span v-if="item.payment_period == 116">annually</span>
            </div>
<!--            <div class="e-j-item-m-3">-->
<!--              Multiple-->
<!--            </div>-->
            <div class="e-j-item-m-3">
              <span v-if="item.employment_type==1">Full time</span>
              <span v-if="item.employment_type==2">Part time</span>
              <span v-if="item.employment_type==3">Seasonal</span>
            </div>

          </div>

          <div class="e-j-item-r">
            <div class="e-j-item-r-1">{{item.educator_matching_score}}% match</div>
            <div class="e-j-item-r-2">
              <template v-if="item.educator_matching_score <= 60">
                <el-image class="e-j-c-item-avatar" :src="doubtingImg" fit="contain"></el-image>
              </template>
              <template v-if="item.educator_matching_score > 60 && item.educator_matching_score <=80">
                <el-image class="e-j-c-item-avatar" :src="thumbUpImg" fit="contain"></el-image>
              </template>
              <template v-if="item.educator_matching_score > 80">
                <el-image class="e-j-c-item-avatar" :src="funfareImg" fit="contain"></el-image>
              </template>

            </div>
          </div>
        </div>

      </div>



    </el-scrollbar>
  </div>

</div>
</template>

<script>
import doubtingImg from '@/assets/newHome/match/doubting.png'
import funfareImg from '@/assets/newHome/match/funfare.png'
import thumbUpImg from '@/assets/newHome/match/thumb_up.png'

import {EDUCATOR_JOB_MATCH_LIST, JOB_FEATURED_LIST} from "@/api/api";

export default {
  name: "dailyJobMatch",
  data(){
    return {
      doubtingImg,
      funfareImg,
      thumbUpImg,
      jobFeaturedData:[]
    }
  },
  mounted(){
    this.getEducatorJobMatchingList()
    // this.getJobFeaturedList()
  },
  methods:{
    turnJobDetail(id){
      this.$router.push({path:'/jobs',query:{id:id}})
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

  padding: 25px 50px;
  box-shadow: 0px 0px 23px #00000012;
  border-radius: 18px;
  background-color: #FFFFFF;

}

.e-j-label {
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.e-j-c {
  margin-top: 25px;

}

.e-j-item-bg {
  border-bottom: 1px solid #F0F2F5;
  padding: 25px 15px;
}

.e-j-item {
  box-shadow: 0px 3px 23px #00000026;
  border-radius: 18px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 25px;
}

.e-j-c-item-avatar {
  margin-top: 15px;
  width: 70px;
  height: 70px;
  /*border-radius: 70px;*/
}

.e-j-item-l {
  width: 80px;
}

.e-j-item-m {
  width: calc(100% - 190px);
}

.e-j-item-r {
  width: 110px;
  text-align: center;
}

.e-j-item-m-1 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;
}

.e-j-item-m-2 {
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 25px;
  color: #262626;
  cursor: pointer;
}

.e-j-item-m-3 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

</style>