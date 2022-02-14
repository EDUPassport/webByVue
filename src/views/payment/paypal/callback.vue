<template>
<div class="bg-container" v-loading="showLoadingValue">
  <div class="success-container" v-if="successValue==2">
    <el-icon color="#00b3d2" :size="80"><success-filled /></el-icon>
    <h1> Order paid successfully</h1>
  </div>
  <div class="success-container" v-if="successValue==3">
    <el-icon color="#D2232A" :size="80"><failed /></el-icon>
    <h1> {{failedText}}</h1>
  </div>

  <div class="tips-container">
    If you have problems with payment, please contact us
  </div>

  <div class="btn-container">
    <el-button class="back-btn" type="primary" round @click="goBack()">Back</el-button>
    <el-button class="home-btn" type="success" round @click="goHome()">Home</el-button>
    <el-button class="profile-btn" type="warning" round @click="goMyProfile()">My Profile</el-button>
  </div>

</div>
</template>

<script>
import {PAY_PAYPAL_CALLBACK} from "../../../api/api";
import {useRouter,useRoute} from "vue-router";
import {ref} from "vue";

export default {
  name: "callback",
  setup(){
    const route = useRoute()
    const routeQuery = route.query
    const successValue = ref(1)
    const failedText = ref('Order paid failed')

    const router = useRouter()
    const goHome = ()=>{
      router.push('/home')
    }
    const goBack = ()=>{
      router.push('/services/price')
    }
    const goMyProfile=()=>{
      router.push({path:'/overview',query:{identity:localStorage.getItem('identity')}})
    }

    return {
      routeQuery,
      successValue,
      goHome,
      goBack,
      goMyProfile,
      failedText
    }

  },
  data(){
    return {
      showLoadingValue:true
    }
  },
  mounted() {
    this.paypalCallback()
  },
  methods:{
    paypalCallback(){
      let params = {
        success:this.routeQuery.success,
        paymentId:this.routeQuery.paymentId,
        PayerID:this.routeQuery.PayerID
      }

      PAY_PAYPAL_CALLBACK(params).then(res=>{
        console.log(res)
        if(res.code === 200){
          this.successValue = 2
          this.showLoadingValue = false
        }
      }).catch(err=>{
        console.log(err)
        if(err.code === 400){
          this.successValue = 3
          if(err.msg =='取消付款'){
            this.failedText = 'Cancel Payment'
          }
        }
        this.showLoadingValue = false
      })

    }

  }

}
</script>

<style scoped>
.bg-container{
  padding: 80px 40px 220px 40px;
  background-color: #f5f6f7;
}

.success-container{
  padding: 40px;
}
.tips-container{
  font-size: 14px;
  padding: 20px;
}
.btn-container{
  padding: 40px;
}
.back-btn{
  font-size: 16px;
  padding: 0 40px;
}
.home-btn{
  font-size: 16px;
  padding: 0 40px;
}
.profile-btn{
  font-size: 16px;
  padding: 0 40px;
}
</style>