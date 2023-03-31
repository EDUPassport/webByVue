<template>
<div class="compare-container">
  {{nowValue}}
  <template v-if="percent > 0">
    <el-icon :size="20" color="#027A48">
      <Top/>
    </el-icon>
    <span style="color: #027A48;">{{percent}}%</span>
  </template>
  <template v-else-if="percent === 0">
    <el-icon :size="20" color="#667085">
      <Top/>
    </el-icon>
    <span style="color: #667085;">{{percent}}%</span>
  </template>
  <template v-else>
    <el-icon :size="20" color="#B42318">
      <Bottom/>
    </el-icon>
    <span style="color: #B42318;">{{percent}}%</span>
  </template>

</div>

</template>

<script>
export default {
  name: "compareUpDownPercentage",
  props:['percent','nowValue'],
  setup(){

  }
}
</script>

<style scoped>
.compare-container {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 44px;
  color: #101828;

  display: flex;
  align-items: center;
}

.compare-container span {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
}

</style>
