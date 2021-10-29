<template>
  <div class="account-info-container">
    <div class="account-info-label">Account Info</div>
    <div class="account-info-content">
<!--      <div class="account-info-t">-->
<!--        <div class="account-info-t-label">Personal Account Info</div>-->
<!--        <div class="account-info-t-edit">Edit</div>-->
<!--      </div>-->
      <div class="account-info-b">
        <div class="account-info-photo">
          <template v-if="identity == 1">
            <el-image class="account-photo-img" :src="info.profile_photo"></el-image>
          </template>
          <template v-if="identity == 2 || identity == 3 ">
            <el-image class="account-photo-img" :src="info.logo"></el-image>
          </template>
        </div>
        <div class="account-info-tags">
          <div class="account-info-tag">
            Name:
            <span>{{ info.first_name }} {{info.last_name}}</span>
          </div>
          <div class="account-info-tag" v-if="phone!=''">
            Phone #:
            <span>{{phone}}</span>
          </div>
          <div class="account-info-tag">
            Category:
            <span v-if="identity == 1">{{info.sub_identity_name}}</span>
            <span v-if="identity == 2">{{info.business_type_name}}</span>
            <span v-if="identity == 3">{{info.vendor_type_name}}</span>
          </div>
          <div class="account-info-tag">
            Membership Level:
            <span v-if="info.level == 1">Basic Member</span>
            <span v-if="info.level == 2">Pro Member</span>
            <span v-if="info.level == 3">Plus Member</span>
          </div>
          <div class="account-info-tag" v-if=" info.vip_due_time && info.vip_due_time!=''">
            Membership Expiration Date:
            <span>{{info.vip_due_time}}</span>
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

export default {
  name: "accountInfo",
  props:{
    info:Object,
    phone:String
  },
  computed:{
    identity(){
      return this.$store.state.identity
    }
  },
  data(){
    return {
      accountInfo:{},
    }
  },
  mounted() {

  },
  methods:{

  }
}
</script>

<style scoped>
.account-info-container{
  padding:10px 20px;
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
  /*border-bottom: 1px solid #eeeeee;*/
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