<template>
  <el-container direction="vertical">
    <Header></Header>
    <router-view></router-view>
<!--    <Footer></Footer>-->
  </el-container>
</template>

<script>
import Header from "./components/Header";
// import Footer from "./components/Footer";
export default {
  name: "index",
  components:{
    Header
  },

}
</script>

<style scoped>

</style>
