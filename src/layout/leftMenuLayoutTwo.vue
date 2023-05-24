<template>
  <el-container direction="vertical">
    <div class="bg">
      <div class="profile-container">
        <div class="profile-l-container">
          <meSideMenu></meSideMenu>
        </div>
        <div class="profile-r-container">
          <router-view></router-view>
        </div>
      </div>
    </div>
<!--    <Footer></Footer>-->
  </el-container>
</template>

<script>
// import Footer from "./components/Footer";
import meSideMenu from "@/components/meSideMenu";
export default {
  name: "index",
  components:{
    meSideMenu
  },

}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.profile-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.profile-l-container {

}

.profile-r-container {
  padding: 50px;
  width: calc(100% - 260px);
  height: calc(100vh - 240px);
}
</style>
