<template>
<div class="empty-container">
  <el-empty description="..."></el-empty>
</div>
</template>

<script>
export default {
  name: "empty"
}
</script>

<style scoped>
.empty-container{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F0F2F5;
  height: calc(100vh - 140px);
}

@media screen and (max-width: 768px){
  .empty-container{
    display: none;
  }
}
</style>