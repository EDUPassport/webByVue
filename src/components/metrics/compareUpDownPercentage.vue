<template>
<div class="compare-container">
  {{now}}
  <template v-if="percent >= 0">
    <el-icon :size="20" :color="color">
      <Top/>
    </el-icon>
  </template>
  <template v-else>
    <el-icon :size="20" :color="color">
      <Bottom/>
    </el-icon>
  </template>

  <span :style="'color: ' + color + ';'">{{percent}}%</span>
</div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: "compareUpDownPercentage",
  props:['nowValue','prevValue','color'],
  setup(props){
    const now = ref(props.nowValue)
    now.value = new Intl.NumberFormat('en-IN').format(now.value)

    function getPercent(now,prev){
      now = parseFloat(now)
      prev = parseFloat(prev)
      if(isNaN(now) || isNaN(prev)){
        return '-'
      }

      if(prev > 0){
        let a = Math.round((now - prev) / prev * 10000 ) / 100.00
        console.log(a)
        return a;
      }else{
        return 0
      }

    }

    const percent = getPercent(props.nowValue, props.prevValue)

    return {
      now,
      percent
    }

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
