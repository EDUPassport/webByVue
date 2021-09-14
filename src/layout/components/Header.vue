<template>

  <div>
    <el-row class="header-container" :gutter="0" justify="start" align="middle">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        Home
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        Home
      </el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
        Home
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
        Home
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.header-container{
  background-color: #0aa0a8;
  color: #ffffff;
}

</style>