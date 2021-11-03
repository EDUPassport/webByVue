<template>
  <div class="container">
    <el-row align="top" justify="center">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <meSideMenu></meSideMenu>
      </el-col>
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
<!--        https://www.unilei.cn/policy.pdf-->
        <iframe width="90%" height="800" src="https://www.unilei.cn/policy.pdf" frameborder="0">

        </iframe>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import meSideMenu from "@/components/meSideMenu";
export default {
  name: "policy",
  components:{
    meSideMenu
  },
  data(){
    return {

    }
  }
}
</script>

<style scoped>
.container{
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}
</style>