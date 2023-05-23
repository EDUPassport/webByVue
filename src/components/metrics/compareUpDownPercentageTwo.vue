<template>
<div class="compare-container">
  {{nowValue}}
</div>

</template>

<script>

export default {
  name: "compareUpDownPercentageTwo",
  props:{
    nowValue: String || Number
  },
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
</style>
