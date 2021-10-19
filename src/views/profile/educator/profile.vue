<template>
<div class="bg">
  <div class="educator-container">
    <el-row align="top" justify="center">
      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <meSideMenu></meSideMenu>
      </el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import meSideMenu from "@/components/meSideMenu";
export default {
  name: "profile",
  components: {
    meSideMenu
  },
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.educator-container {
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

</style>