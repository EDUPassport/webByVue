<template>
  <div class="account-info-container">
    <div class="account-info-label">Account Info</div>
    <div class="account-info-content">
<!--      <div class="account-info-t">-->
<!--        <div class="account-info-t-label">Personal Account Info</div>-->
<!--        <div class="account-info-t-edit">Edit</div>-->
<!--      </div>-->
      <div class="account-info-b">
        <div class="account-info-photo" v-if="accountPhotoValue">
          <el-image class="account-photo-img" :src="accountPhotoValue"></el-image>
        </div>
        <div class="account-info-tags">
          <div class="account-info-tag">
            Name:
            <span>{{ accountInfo.first_name }} {{accountInfo.last_name}}</span>
          </div>
          <div class="account-info-tag" v-if="phone!=''">
            Phone #:
            <span>{{phone}}</span>
          </div>
          <div class="account-info-tag" v-if="categoryName!=''">
            Category:
            <span>{{categoryName}}</span>
          </div>
          <div class="account-info-tag">
            Membership Level:
            <span v-if="level == 1">Basic Member</span>
            <span v-if="level == 2">Pro Member</span>
            <span v-if="level == 3">Plus Member</span>
          </div>
          <div class="account-info-tag" v-if=" vipDueTime && vipDueTime!=''">
            Membership Expiration Date:
            <span>{{vipDueTime}}</span>
          </div>

      </div>
      </div>
<!--      <div class="account-info-bb">-->
<!--        <div class="account-info-name">Lloyd</div>-->
<!--        <div class="account-info-job-title">Esl Teacher</div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import {GET_BASIC_INFO} from  '@/api/api'

export default {
  name: "accountInfo",
  data(){
    return {
      accountInfo:{},
      accountPhotoValue:'',
      phone:'',
      categoryName:'',
      level:1,
      vipDueTime:''
    }
  },
  mounted() {
    this.getBasicInfo()
  },
  methods:{
    getBasicInfo() {
      let uid = localStorage.getItem('uid')
      let identity = localStorage.getItem('identity')
      let params = {
        id: uid,
        token: localStorage.getItem('token')
      }
      GET_BASIC_INFO(params).then(res => {
        console.log(res)
        if(res.code == 200){

          this.phone = res.message.phone;
          if (identity == 1 && res.message.educator_info) {
            this.accountInfo = res.message.educator_info;
            this.categoryName = res.message.educator_info.sub_identity_name
            this.level = res.message.educator_info.level
            this.vipDueTime = res.message.educator_info.vip_due_time
            this.accountPhotoValue = res.message.educator_info.profile_photo
          }
          if (identity == 2 && res.message.business_info) {
            this.accountInfo = res.message.business_info;
            this.categoryName = res.message.business_info.business_type_name
            this.level = res.message.business_info.level
            this.vipDueTime = res.message.business_info.vip_due_time
            this.accountPhotoValue = res.message.business_info.logo

          }
          if (identity == 3 && res.message.vendor_info) {
            this.accountInfo = res.message.vendor_info;
            this.categoryName = res.message.vendor_info.vendor_type_name;
            this.level = res.message.vendor_info.level;
            this.vipDueTime = res.message.vendor_info.vip_due_time
            this.accountPhotoValue = res.message.vendor_info.logo
          }

        }
      })
    },
  }
}
</script>

<style scoped>
.account-info-container{
  padding: 20px;
  text-align: left;
}

.account-info-label{
  font-size: 20px;
  font-weight: bold;
}
.account-info-content{
  margin-top: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;

}

.account-info-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.account-info-t-label{
  font-size: 16px;
  font-weight: bold;
}
.account-info-t-edit{
  font-size: 14px;
  font-weight: bold;
}
.account-info-b{
  border-bottom: 1px solid #eeeeee;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.account-info-photo{
  width: 30%;
}
.account-photo-img{
  width: 120px;
  height: 120px;
  border-radius: 120px;
  border: 1px solid #EEEEEE;
}

.account-info-tags{
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:flex-start;
  flex-wrap: wrap;
  padding: 20px 0;

}

.account-info-tag{
 margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #808080;
}

.account-info-tag span{
  margin-left: 10px;
  background-color: #EEEEEE;
  color: #000000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
}
.account-info-bb{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
.account-info-name{
  font-size: 14px;
}

</style>