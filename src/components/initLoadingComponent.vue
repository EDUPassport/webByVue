<template>
<div class="container" v-if="loadingStatus" v-loading="loadingStatus"></div>
</template>

<script>
export default {
  name: "initLoadingComponent",
  props:['loadingStatus']

}
</script>

<style scoped>

.container{
  position: fixed;
  z-index: 100000;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #F0F2F5;
}

</style>