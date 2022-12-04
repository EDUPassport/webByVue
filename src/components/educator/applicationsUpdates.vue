<template>
<div>
  <div class="e-a">

    <div class="e-a-label">
      Your applications updates
      <el-button link primary @click="turnMyApplications()">SEE ALL UPDATES</el-button>
    </div>
    <el-scrollbar max-height="320px" class="e-a-c">
      <template v-if="myApplyJobData.length>0">
        <div class="e-a-item-bg" v-for="(item,i) in myApplyJobData" :key="i">
          <div class="e-a-item">
            <div class="e-a-item-l">
              <el-avatar class="e-a-item-avatar"></el-avatar>
            </div>
            <div class="e-a-item-m">
              <div class="e-a-item-m-1">{{item.job.company_name}}</div>
              <div class="e-a-item-m-2">
                {{item.job.job_title}}
              </div>
              <div class="e-a-item-m-3">
                {{ item.job.currency }} {{ item.job.salary_min }} - {{ item.job.salary_max }}
                <span v-if="item.job.payment_period == 112">hourly</span>
                <span v-if="item.job.payment_period == 113">daily</span>
                <span v-if="item.job.payment_period == 114">weekly</span>
                <span v-if="item.job.payment_period == 115">monthly</span>
                <span v-if="item.job.payment_period == 116">annually</span>
              </div>
              <div class="e-a-item-m-3">
                {{item.job.job_location}}
              </div>
              <div class="e-a-item-m-3">
                <span v-if="item.job.employment_type==1">Full time</span>
                <span v-if="item.job.employment_type==2">Part time</span>
                <span v-if="item.job.employment_type==3">Seasonal</span>
              </div>
            </div>
            <div class="e-a-item-r">
              <!--             . Interested -->
              <div class="e-a-item-r-1">
                <span v-if="item.status == 1">Submitted</span>
                <span v-if="item.status == 2">Shortlisted</span>
                <span v-if="item.status == 3">Not Selected</span>
                <span v-if="item.status == 4">Interested</span>
              </div>
              <div class="e-a-item-r-2">
                <chatButton text="SEND A MESSAGE"
                            :target-user="item.job.company"
                            @onSuccess="chatSuccess"
                            btn-style="primary"
                            :identity="item.job.identity">

                </chatButton>
              </div>
              <div class="e-a-item-r-3">
                {{ $filters.howLongFormat(item.job.refresh_time) }}
                <!--              Updated: June 23, 2022-->
              </div>
            </div>
          </div>

        </div>
        <!--      <div class="e-a-item-bg">-->
        <!--        <div class="e-a-item">-->
        <!--          <div class="e-a-item-l">-->
        <!--            <el-avatar class="e-a-item-avatar"></el-avatar>-->
        <!--          </div>-->
        <!--          <div class="e-a-item-m">-->
        <!--            <div class="e-a-item-m-1">Columbia University</div>-->
        <!--            <div class="e-a-item-m-2">-->
        <!--              Art History Teacher-->
        <!--            </div>-->
        <!--            <div class="e-a-item-m-3">-->
        <!--              Salary: $90,000-120,000-->
        <!--            </div>-->
        <!--            <div class="e-a-item-m-3">-->
        <!--              Paris, France-->
        <!--            </div>-->
        <!--            <div class="e-a-item-m-3">-->
        <!--              Seasonal-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div class="e-a-item-r">-->
        <!--            <div class="e-a-item-r-1">-->
        <!--              Position closed-->
        <!--            </div>-->
        <!--            <div class="e-a-item-r-3">-->
        <!--              Updated: June 19, 2022-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->

        <!--      </div>-->

      </template>

      <template v-else>
        <el-empty description="..."></el-empty>
      </template>



    </el-scrollbar>
  </div>

</div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import {MY_APPLY_JOBS} from "@/api/api";
import chatButton from "@/components/chat/chatButton";

export default {
  name: "applicationsUpdates",
  components:{
    chatButton
  },
  setup() {

    const store = useStore()
    const router = useRouter()

    const setNowChatUserInfo = (data) => store.commit('nowChatUserInfo',data)

    const setShowChatStatus = () => store.commit('showChatStatus', true)

    function turnChatPage(){
      router.push({path:'/chat/messages'})
    }

    const currentUser = computed(()=>store.state.currentUser)

    return {
      setNowChatUserInfo,
      setShowChatStatus,
      currentUser,
      turnChatPage

    }


  },
  data(){
    return {
      myApplyJobData:[],
      page:1,
      limit:20
    }
  },
  mounted(){
    this.getMyApplyJobs(this.page,this.limit)
  },
  methods:{
    getMyApplyJobs(page,limit){
      let params = {
        page:page,
        limit:limit
      }
      MY_APPLY_JOBS(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.myApplyJobData = res.message.data;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    chatSuccess(){
      this.turnChatPage()
    },
    turnMyApplications(){
      this.$router.push({path:'/jobs/home'})
    }

  }
}
</script>

<style scoped>

.e-a {
  /*width: calc(45% - 100px);*/
  /*width: 600px;*/
  padding: 25px 50px;
  box-shadow: 0px 0px 23px #00000012;
  border-radius: 18px;
  background-color: #FFFFFF;

}

.e-a-label {
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.e-a-c {
  margin-top: 25px;
}

.e-a-item-bg {
  border-bottom: 1px solid #F0F2F5;
  padding: 25px 0;
}

.e-a-item {

  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 25px;
}

.e-a-item-avatar {
  width: 70px;
  height: 70px;

}

.e-a-item-l {
  width: 70px;
}

.e-a-item-m {
  width: calc(100% - 260px);
}

.e-a-item-r {
  width: 175px;
  text-align: center;
}

.e-a-item-m-1 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;
}

.e-a-item-m-2 {
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 25px;
  color: #262626;
}

.e-a-item-m-3 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.e-a-item-r-1 {
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.e-a-item-r-2 {
  margin-top: 25px;
}

.e-a-item-r-3 {
  margin-top: 25px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

@media screen and (max-width: 768px) {
  .e-a{
    padding: 0;
    background-color: #F0F2F5;
    box-shadow: none;
  }

  .e-a-label{
    font-size: 20px;
    margin: 0 15px 8px 15px;
  }

  .e-a-item-bg{
    padding: 0;
    margin: 7px 15px 15px 15px;
  }

  .e-a-c{
    margin-top: 0;
  }

  .e-a-item{
    padding: 15px;
    flex-wrap: wrap;
    box-shadow: 0px 0px 10px #00000012;
    border-radius: 18px;
  }

  .e-a-item-l{
    width: 40px;
  }
  .e-a-item-avatar{
    width: 40px;
    height: 40px;
  }

  .e-a-item-m{
    width: calc(100% - 55px);
  }

  .e-a-item-m-1{
    font-size: 12px;
  }

  .e-a-item-m-2{
    font-size: 18px;
  }

  .e-a-item-m-3{
    font-size: 12px;
  }



  .e-a-item-r{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .e-a-item-r-1{
    font-size: 12px;
  }
  .e-a-item-r-2{
    margin-top: 0;
  }
  .e-a-item-r-3{
    font-size: 12px;
    margin-top: 0;
  }

}

</style>