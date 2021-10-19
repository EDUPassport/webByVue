<template>
  <div class="profile-l-container">
    <div class="profile-photo-container">
      <el-image class="profile-photo"></el-image>
      <span>Jon Snow</span>
    </div>
    <div class="l-container">
      <div class="l-item">
        <router-link to="/overview" exact>Overview</router-link>
      </div>
      <div class="l-item">
        <router-link to="/favorites" exact>My Favorites</router-link>
      </div>
      <div class="l-item">
        <router-link v-if="identity == 1" to="/educator/profile" exact>My Account & Profile</router-link>
        <router-link v-if="identity == 2" to="/business/profile" exact>My Account & Profile</router-link>
        <router-link v-if="identity == 3" to="/vendor/profile" exact>My Account & Profile</router-link>
      </div>
      <div class="l-item">
        <router-link to="/" exact>My Ads</router-link>
      </div>
      <div class="l-item">
        <router-link to="/" exact>My Jobs</router-link>
      </div>
      <div class="l-item">
        <router-link to="/" exact>My Events</router-link>
      </div>
      <div class="l-item">
        <router-link to="/" exact>My Deals</router-link>
      </div>
      <div class="l-item">
        <router-link to="/" exact>Offer a Deal</router-link>
      </div>
      <div class="l-item">
        <router-link to="/" exact>Privacy Policy</router-link>
      </div>
      <div class="l-item">
        <router-link to="/" exact>My Messages</router-link>
      </div>
      <div class="l-item">
        <router-link to="/" exact>My Applications</router-link>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "meSideMenu",
  setup(){
    let identity = localStorage.getItem('identity')
    return {
      identity
    }
  },
  mounted() {
    console.log(this.identity)
  }
}
</script>

<style scoped>
.profile-l-container{
  background-color: #004956;
  border-radius: 10px;
}
.profile-photo-container{
  padding: 30px;
}
.profile-photo{
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.profile-photo-container span{
  font-size: 14px;
  color: #ffffff;
}

.l-container{
  text-align: left;
  padding-top: 40px;
}
.l-item{

}
.l-item a:hover{
  background-color: #0AA0A8;
}
.l-item a{
  /*width: 100%;*/
  font-size: 14px;
  line-height: 40px;
  text-decoration: none;
  color: #ffffff;
  display: block;
  padding-left: 20px;
}
.router-link-exact-active {
  background-color: #00b3d2;
  color: #ffffff !important;
}
</style>