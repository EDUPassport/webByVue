<template>
  <div class="account-info-container">
    <div class="account-info-top">
      <div class="account-info-label">Account Info</div>
      <div class="account-info-percentage" v-if="percentageStatus">
        <h4>Profile:</h4>
        <div class="percentage-progress-container-bg">
          <div class="percentage-progress-container">
            <el-progress class="percentage-progress"
                         :text-inside="true"
                         :stroke-width="20"
                         :percentage="profilePercentage" color="#b1c452" >
            </el-progress>

            <div class="percentage-progress-post-job">
              <span v-if="identity == 1">Apply for a job</span>
              <span v-if="identity == 2 || identity == 3 || identity ==4">Post a Job</span>
              <span v-if="identity == 5">Offer a Deal</span>
            </div>

          </div>

        </div>

      </div>

      <div class="account-info-action-btn-container" v-if="identityActionStatus">
        <template  v-if="identity==1">
          <el-button class="action-info-action-btn" type="primary"
                     :disabled="profilePercentage<80"
                     @click="findJob()">Find a Job</el-button>
        </template>
        <template v-if="identity == 2 || identity == 3 || identity == 4">
          <el-button class="action-info-action-btn" type="primary"
                     :disabled="profilePercentage< 80"
                     @click="postJob()">Post a Job</el-button>
        </template>
        <template v-if="identity == 5">
          <el-button class="action-info-action-btn" type="primary"
                     :disabled="profilePercentage<80"
                     @click="offerDeal()">Offer a Deal</el-button>
        </template>
      </div>

    </div>

    <div class="account-info-content">

      <div class="account-info-b">
        <div class="account-info-photo">
          <el-avatar :size="120" :src="info.headimgurl !='' ? info.headimgurl : defaultAvatar"></el-avatar>
          <el-button style="margin-top:10px;" type="warning" round  @click="forgotPassword()" >Reset Password</el-button>
        </div>

        <div class="account-info-tags">
          <div class="account-info-tag">
            <div class="account-info-tag-l">
              Account Type:

            </div>
           <div class="account-info-tag-r">
             <span v-if="identity == 0">Guest</span>
             <span v-if="identity == 1">Educator</span>
             <span v-if="identity == 2">Recruiter</span>
             <span v-if="identity == 3">School</span>
             <span v-if="identity == 4">Other</span>
             <span v-if="identity == 5">Vendor</span>

<!--             <el-button type="primary"  class="switch-profile-btn" @click="changeSwitchProfile" round>-->
<!--               Switch Profile</el-button>-->
           </div>

          </div>

          <div class="account-info-tag" v-if="info.first_name && info.last_name">
            <div class="account-info-tag-l">
              Name:
            </div>
            <div class="account-info-tag-r">
              <span>{{ info.first_name }} {{ info.last_name }}</span>
            </div>
          </div>

          <div class="account-info-tag" v-if="phone!=''">
            <div class="account-info-tag-l">
              Phone #:
            </div>
            <div class="account-info-tag-r">
              <span>{{ phone }}</span>
            </div>
          </div>

          <div class="account-info-tag" v-if="email!=''">
            <div class="account-info-tag-l">
              Email:
            </div>
            <div class="account-info-tag-r">
              <span>{{ email }}</span>
            </div>
          </div>

          <div class="account-info-tag" v-if="categoryStr  ">
            <div class="account-info-tag-l">
              Category:
            </div>
            <div class="account-info-tag-r">
              <template v-if="categoryStr == '0'">
                <span>-Select Category-</span>
              </template>
              <template v-else>
                <span>{{categoryStr}}</span>
              </template>

            </div>

          </div>

          <div class="account-info-tag">
            <div class="account-info-tag-l">
              Membership Level:
            </div>
            <div class="account-info-tag-r">
              <span v-if="level == 1">Basic</span>
              <span v-if="level == 2">Pro</span>
              <span v-if="level == 3">Plus</span>
              <span v-if="level == 4">Lifetime</span>
              <el-button type="primary" class="upgrade-btn"  round @click="turnUpgrade()">Upgrade</el-button>
            </div>

          </div>

          <template v-if="level == 4">
            <div class="account-info-tag" v-if="info.vip_due_time">
              <div class="account-info-tag-l">
                Membership Expiration Date:
              </div>
              <div class="account-info-tag-r">
                <span>-</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="account-info-tag" v-if="vipDueTime">
              <div class="account-info-tag-l">
                Membership Expiration Date:
              </div>
              <div class="account-info-tag-r">

                <template v-if="vipDueTime == '1970-00-00 00:00:00' ">
                  <span> 0000-00-00 00:00:00 </span>
                </template>
                <template v-else>
                  <span>{{ vipDueTime }}</span>
                </template>

                <template v-if="$filters.compareTimeWithCurrentTime(vipDueTime) && level != 1">
                  <el-button class="renew-btn" type="primary" round @click="turnUpgrade()" >Renew</el-button>
                </template>

              </div>

            </div>
          </template>
        </div>
      </div>

    </div>

    <SwitchProfile :isShow="showSwitchProfileStatus" :identity="identity" @close="closeSwitchProfile" ></SwitchProfile>
    <ForgotPassword :type="1" :email="email" :isShow="forgotDialogVisible" @close="closeForgotDialog()"></ForgotPassword>

  </div>
</template>

<script>
import defaultAvatar from '@/assets/default/avatar.png'
import SwitchProfile from '@/components/switchProfile.vue'
import {computed,ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {randomString} from "@/utils";
import ForgotPassword from '@/components/forgotPassword';

export default {
  name: "accountInfo",
  props: {
    info: Object,
    phone: {
      type:String,
      default:''
    },
    email: {
      type:String,
      default:''
    },
    level:{
      type:Number,
      default:1
    },
    vipDueTime:{
      type:String,
      default:''
    },
    categoryStr:{
      type:String,
      default:''
    },
    percentageStatus:{
      type:Boolean,
      default:false
    },
    profilePercentage:{
      type:Number,
      default:0
    },
    identityActionStatus:{
      type:Boolean,
      default:false
    }
  },
  setup(){
    const store = useStore()
    const identity = computed(()=>store.state.identity)
    const versionTime = randomString()

    const router = useRouter()

    const turnUpgrade=()=>{
      router.push('/services/price')
    }
    const findJob = ()=>{
      router.push('/jobs')
    }
    const postJob = ()=>{
      router.push({path:'/jobs/post',query:{version_time:versionTime}})
    }
    const offerDeal = ()=>{
      router.push('/deals/offer')
    }

    const showSwitchProfileStatus = ref(false)

    const changeSwitchProfile = ()=>{
      showSwitchProfileStatus.value = true
    }

    const closeSwitchProfile = (value)=>{

      showSwitchProfileStatus.value = value
    }
    const forgotDialogVisible = ref(false)


    return {
      identity,
      turnUpgrade,
      changeSwitchProfile,
      showSwitchProfileStatus,
      closeSwitchProfile,
      findJob,
      offerDeal,
      postJob,
      forgotDialogVisible

    }

  },
  components:{
    SwitchProfile,
    ForgotPassword
  },
  data() {
    return {
      defaultAvatar,
      accountInfo: {}
    }
  },

  methods:{
    forgotPassword() {
      this.forgotDialogVisible = true
    },
    closeForgotDialog() {
      this.forgotDialogVisible = false
    }

  }

}
</script>

<style scoped>
.account-info-container {
  padding: 10px 20px;
  text-align: left;

}
.account-info-top{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.account-info-action-btn-container{
  width: 50%;
  text-align: right;
}
.account-info-action-btn{

}

.account-info-percentage{
  width:50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

}
.percentage-progress-container-bg{
  background-color:#ffffff;
  padding:10px;
  width:80%;
  border-radius:20px;
}

.percentage-progress-container{
  width:100%;
  height: 20px;
  position: relative;
}

.percentage-progress{
  width:100%;
  position: absolute;
  bottom:0;

}

.percentage-progress-post-job{
  width:80%;
  position: absolute;
  height: 10px;
  bottom:20px;
  border-right: 1px solid #808080;
}
.percentage-progress-post-job span{
  position: absolute;
  right: -30px;
  top:-16px;
  font-size: 12px;
}


.account-info-label {
  font-size: 20px;
  font-weight: bold;
}

.account-info-content {
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
}

.account-info-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.account-info-photo {
  width: 20%;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:10px;

}

.account-photo-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #EEEEEE;
}

.account-info-tags {
  width: 80%;
  padding: 20px;
}

.account-info-tag {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  font-size: 14px;
  border-bottom:1px solid #FFFFFF;
}
.account-info-tag-l{
  width: 40%;
  background-color: #f4f5f6;
  line-height: 40px;
  padding: 2px 0 2px 20px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.account-info-tag-r{
  width: 60%;
  background-color: #EEEEEE;
  line-height: 40px;
  padding: 2px 0 2px 10px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.renew-btn{
  margin-left:10px;
}
.account-info-tag span {
  margin-left: 10px;
  background-color: #EEEEEE;
  color: #000000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.account-info-bb {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.account-info-name {
  font-size: 14px;
}

.upgrade-btn {
  margin-left: 10px;
}

.switch-profile-btn {
  margin-left: 10px;
}

@media screen and (max-width: 768px){

  .account-info-container{

  }
  .account-info-b{
    flex-direction: column;
    padding:10px 0;
  }
  .account-info-photo{
    width: 100%;
    padding-top: 10px;
  }
  .account-info-tags{
    width:90%;
    padding:0
  }
  .account-info-tag{
    font-size: 12px;
  }
  .account-info-tag-l{
    width:30%;
  }
  .account-info-tag-r{
    width:70%;
  }
  .account-info-tag-r span{
    font-size: 12px;
  }



}
</style>
