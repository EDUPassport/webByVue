<template>
  <div
      :class="['vue-countdown-component', { theme2: theme !== 1 }, { ie: isIE }]"
  >
    <template v-for="(item, index) in timeArray" :key="index">
      <div :class="['time-box']">
        <!-- 底层基础div -->
        <div class="base">
          {{ item }}
        </div>
        <div
            class="time-unit"
            :key="`unit-${index}`"
            v-if="isTimeUnitShow(index)"
        >
          {{ setTimeUnit(index) }}
        </div>
      </div>
      <!-- 文字 -->
    </template>
  </div>
</template>

<script>
import {ref, computed, watch, onMounted, onBeforeUnmount} from "vue";

export default {
  emits: ["timeUp"],
  props: {
    endDate: {type: [Date, Number, String], default: 0}, // 截止时间
    type: {type: [Number, String], default: 4}, // 时间精度 4/3/2/1
    theme: {type: [Number, String], default: 1},
    timeUnit: {type: Array, default: () => []},
  },
  setup(props, context) {
    const isIE = ref(false);
    const timeArray = ref(
        props.theme === 2
            ? new Array(props.type * 2).fill("0")
            : new Array(props.type).fill("00")
    );
    const timeArrayT = ref(
        props.theme === 2
            ? new Array(props.type * 2).fill("0")
            : new Array(props.type).fill("00")
    );
    const isAnimate = ref(
        props.theme === 2
            ? new Array(props.type * 2).fill(false)
            : new Array(props.type).fill(false)
    );
    const timer = ref(null);
    const endTime = computed(() => {
      if (props.endDate instanceof Date) {
        return props.endDate.getTime();
      }
      return Number(props.endDate) > 0 ? Number(props.endDate) : 0;
    });
    const step = computed(() => (props.theme === 1 ? 1 : 2));
    const arr = computed(() => {
      const length = timeArray.value.length;
      const temp = [
        length - 1,
        length - step.value - 1,
        length - step.value * 2 - 1,
        length - step.value * 3 - 1,
      ];
      temp.length = props.type > 1 ? props.type : 1;
      return temp;
    });
    watch(timeArray, (newV, oldV) => {
      const diff = [];
      newV.forEach((value, index) => {
        if (value !== oldV[index]) {
          diff.push({value, index});
          isAnimate.value[index] = true;
        }
      });
      setTimeout(() => {
        diff.forEach((item) => {
          timeArrayT.value[item.index] = item.value;
        });
      }, 350);
    });
    watch(endTime, (newV) => {
      if (newV > 0) {
        start();
      }
    });
    onMounted(() => {
      if (
          window.ActiveXObject ||
          "ActiveXObject" in window ||
          window.navigator.userAgent.indexOf("Edge") > -1
      ) {
        isIE.value = true;
      }
      start(0);
    });
    onBeforeUnmount(() => {
      clearTimeout(timer.value);
    });
    /**
     * 开始倒计时
     * @param st 重复执行的间隔时间
     */
    const start = (st = 1000) => {
      clearTimeout(timer.value);
      timer.value = setTimeout(() => {
        let t = endTime.value - new Date().getTime(); // 剩余的毫秒数
        t = t < 0 ? 0 : t;
        let day = 0; // 剩余的天
        let hour = 0; // 剩余的小时
        let min = 0; // 剩余的分钟
        let second = 0; // 剩余的秒
        const type = Number(props.type);
        if (type >= 4) {
          day = Math.floor(t / 86400000); // 剩余的天
          hour = Math.floor(t / 3600000 - day * 24); // 剩余的小时 已排除天
          min = Math.floor(t / 60000 - day * 1440 - hour * 60); // 剩余的分钟 已排除天和小时
          second = Math.floor(t / 1000 - day * 86400 - hour * 3600 - min * 60); // 剩余的秒
        } else if (type >= 3) {
          hour = Math.floor(t / 3600000); // 剩余的小时
          min = Math.floor(t / 60000 - hour * 60); // 剩余的分钟 已排小时
          second = Math.floor(t / 1000 - hour * 3600 - min * 60); // 剩余的秒
        } else if (type >= 2) {
          min = Math.floor(t / 60000); // 剩余的分钟
          second = Math.floor(t / 1000 - min * 60); // 剩余的秒
        } else {
          second = Math.floor(t / 1000); // 剩余的秒
        }
        let ar = [];
        if (Number(props.theme) === 1) {
          // 不分开
          type >= 4 && ar.push(String(day).padStart(2, "0"));
          type >= 3 && ar.push(String(hour).padStart(2, "0"));
          type >= 2 && ar.push(String(min).padStart(2, "0"));
          ar.push(String(second).padStart(2, "0"));
        } else {
          // 分开
          type >= 4 && ar.push(...String(day).padStart(2, "0").split(""));
          type >= 3 && ar.push(...String(hour).padStart(2, "0").split(""));
          type >= 2 && ar.push(...String(min).padStart(2, "0").split(""));
          ar.push(...String(second).padStart(2, "0").split(""));
        }
        timeArray.value = ar;
        if (t > 0) {
          start();
        } else {
          context.emit("timeUp");
        }
      }, st);
    };
    // 动画完毕后，去掉对应的class, 为下次动画做准备
    const onAnimateEnd = (index) => {
      isAnimate.value[index] = false;
    };
    const isTimeUnitShow = (index) => {
      if (arr.value.includes(index)) {
        if (index === timeArray.value.length - 1 && !props.timeUnit[3]) {
          return false;
        }
        return true;
      }
      return false;
    };
    const setTimeUnit = (index) => {
      switch (index) {
        case timeArray.value.length - 1:
          return props.timeUnit[3] || ""; // 秒
        case timeArray.value.length - step.value - 1:
          return props.timeUnit[2] || ""; // 分
        case timeArray.value.length - step.value * 2 - 1:
          return props.timeUnit[1] || ""; // 时
        default:
          return props.timeUnit[0] || ""; // 天
      }
    };
    return {
      isIE,
      timeArray,
      timeArrayT,
      isAnimate,
      endTime,
      step,
      arr,
      onAnimateEnd,
      isTimeUnitShow,
      setTimeUnit,
    };
  },
};
</script>


<style scoped>
.vue-countdown-component {
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes animate-filp-face {
  0% {
    transform: rotateX(-0.01deg);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  51% {
    opacity: 0;
  }
  100% {
    transform: rotateX(-180deg);
    opacity: 0;
  }
}

@keyframes animate-filp-back {
  0% {
    transform: rotateX(180deg);
  }
  100% {
    transform: rotateX(-0.01deg);
  }
}

.vue-countdown-component.theme2 .time-box {
  min-width: 20px;
}

.vue-countdown-component.theme2 .time-box + .time-box {
  margin-left: 1px;
}

.vue-countdown-component .time-unit {
  padding: 0 4px;
  color: #eeeeee;
  font-size: 14px;
  line-height: 30px;
  white-space: nowrap;
}

.vue-countdown-component .time-box {
  border: 1px solid rgba(255,255,255,0.6);
  background-color: rgba(0, 0, 0, 0.8);
  padding: 4px;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.vue-countdown-component .time-box + .time-box {
  margin-left: 8px;
}

.vue-countdown-component .time-box > div {
  overflow: hidden;
  animation-timing-function: linear;
  animation-duration: 400ms;
  transform: rotateX(-0.01deg);
  border-radius: 3px;
}

.vue-countdown-component .time-box > div.base {
  position: relative;
}

</style>