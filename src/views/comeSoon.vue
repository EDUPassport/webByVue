<template>
<div class="bg">
  <div class="container">
    <div class="welcome">
      Welcome to you
    </div>
    <h1>We Are Coming Soon</h1>
    <div class="end-date">
      December 9th, 2021
    </div>
    <div class="count-down">
      <FlipDown
          :endDate="1639065600000"
          :type="4"
          :theme="1"
          :timeUnit="['Days','Hrs','Mins','Secs']"
      ></FlipDown>
    </div>
  </div>

</div>
</template>

<script>
import FlipDown from 'vue-flip-down'
export default {
  name: "comeSoon",
  components:{
    FlipDown
  }
}
</script>

<style scoped>
.bg{
  height: 100vh;
  background-image: url("~@/assets/bg/bg-h-1.jpg");
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;

}
.container{
  background-color: rgba(0,0,0,0.6);
  height: 100%;
}
.welcome{
  padding: 80px 40px 40px 40px;
  color: #ff0000;
  font-size:18px;
}
h1{
  color: #ffffff;
}

.end-date{
  padding: 40px;
  color: #ff0000;
  font-size:18px;
}

.count-down{
  width: 480px;
  margin: 0 auto;
  padding: 20px;
}

/deep/ .time-unit{
  color: #ffffff;
  line-height: 80px;
}
/deep/ .time-box{
  background-color: #000000;
  height: 80px;
  min-width: 80px;
  font-size: 22px;
  line-height: 80px;
}

/deep/ .vue-countdown-component .time-box>div.base .base-b{
  background-color: transparent;
}

/deep/ .vue-countdown-component .time-box>div.face{
  background-color: #ff2870;
}
/deep/ .vue-countdown-component .time-box>div.back{
  background-color: #0AA0A8;
}
</style>