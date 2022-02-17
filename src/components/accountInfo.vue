<template>
  <div class="account-info-container">
    <div class="account-info-label">Account Info</div>
    <div class="account-info-content">

      <div class="account-info-b">
        <div class="account-info-photo">
          <template v-if="identity == 1">
            <el-image class="account-photo-img"
                      :src="info.profile_photo !='' ? info.profile_photo : defaultAvatar"
                      fit="cover"
            ></el-image>
          </template>
          <template v-if="identity == 2 || identity == 3 ">
            <el-image class="account-photo-img" :src="info.logo !='' ? info.logo : defaultAvatar"
                      fit="cover"></el-image>
          </template>
        </div>

        <div class="account-info-tags">
          <div class="account-info-tag-display">
            Account Type:
            <span v-if="identity == 0">Guest</span>
            <span v-if="identity == 1">Educator</span>
            <span v-if="identity == 2">Edu-Business</span>
            <span v-if="identity == 3">Vendor</span>

            <el-button type="primary"  class="switch-profile-btn" @click="changeSwitchProfile" round>
              Switch Profile</el-button>
          </div>

          <div class="account-info-tag">
            Name:
            <span>{{ info.first_name }} {{ info.last_name }}</span>
          </div>
          <div class="account-info-tag" v-if="phone!=''">
            Phone #:
            <span>{{ phone }}</span>
          </div>

          <template v-if="identity == 1 && info.sub_identity_name">
            <div class="account-info-tag">
              Category:<span>{{ info.sub_identity_name }}</span>
            </div>
          </template>
          <template v-if="identity == 2 && info.business_type_name">
            <div class="account-info-tag">
              Category:<span>{{ info.business_type_name }}</span>
            </div>
          </template>
          <template v-if="identity == 3 && info.vendor_type_name">
            <div class="account-info-tag">
              Category:<span>{{ info.vendor_type_name }}</span>
            </div>
          </template>

          <div class="account-info-tag-display">
            Membership Level:
            <span v-if="info.level == 1">Basic</span>
            <span v-if="info.level == 2">Pro</span>
            <span v-if="info.level == 3">Plus</span>
            <span v-if="info.level == 4">Lifetime</span>
            <el-button type="primary" class="upgrade-btn"  round @click="turnUpgrade()">Upgrade</el-button>
          </div>

          <template v-if="info.level == 4">
            <div class="account-info-tag" v-if="info.vip_due_time">
              Membership Expiration Date:<span>-</span>
            </div>
          </template>
          <template v-else>
            <div class="account-info-tag" v-if="info.vip_due_time">
              Membership Expiration Date:<span>{{ info.vip_due_time }}</span>
            </div>
          </template>
        </div>
      </div>

    </div>

    <SwitchProfile :isShow="showSwitchProfileStatus" :identity="identity" @close="closeSwitchProfile" ></SwitchProfile>

  </div>
</template>

<script>
import defaultAvatar from '@/assets/default/avatar.png'
import SwitchProfile from '@/components/switchProfile.vue'
import {computed,ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
  name: "accountInfo",
  props: {
    info: Object,
    phone: String
  },
  setup(){
    const store = useStore()
    const identity = computed(()=>store.state.identity)

    const router = useRouter()

    const turnUpgrade=()=>{
      router.push('/services/price')
    }

    const showSwitchProfileStatus = ref(false)

    const changeSwitchProfile = ()=>{
      showSwitchProfileStatus.value = true
    }

    const closeSwitchProfile = (value)=>{

      showSwitchProfileStatus.value = value
    }

    return {
      identity,
      turnUpgrade,
      changeSwitchProfile,
      showSwitchProfileStatus,
      closeSwitchProfile
    }

  },
  components:{
    SwitchProfile
  },
  data() {
    return {
      defaultAvatar,
      accountInfo: {}
    }
  }

}
</script>

<style scoped>
.account-info-container {
  padding: 10px 20px;
  text-align: left;
}

.account-info-label {
  font-size: 20px;
  font-weight: bold;
}

.account-info-content {
  margin-top: 20px;
  background-color: #ffffff;
  border-radius: 20px;
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
}

.account-photo-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #EEEEEE;
}

.account-info-tags {
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 20px 0;

}

.account-info-tag-display {
  width: 100%;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  color: #808080;
}

.account-info-tag-display span {
  margin-left: 10px;
  background-color: #EEEEEE;
  color: #000000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.account-info-tag {
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #808080;
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

</style>