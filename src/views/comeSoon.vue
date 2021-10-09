<template>
<div class="bg">
  <div class="container">
    <div class="welcome">

    </div>
    <h1> New Website Coming Soon </h1>
    <div class="end-date">
      December 9th, 2021
    </div>
    <div class="count-down">
      <xllCountDown
          :endDate="1639065600000"
          :type="4"
          :theme="1"
          :timeUnit="['Days','Hrs','Mins','Secs']"
      >
      </xllCountDown>
    </div>
  </div>

</div>
</template>

<script>
import xllCountDown from "@/components/xllCountDown";
export default {
  name: "comeSoon",
  components:{
    xllCountDown
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
  padding: 100px 40px 40px 40px;
  color: #ff0000;
  font-size:18px;
}
h1{
  color: #ffffff;
}

.end-date{
  padding: 40px;
  color: #ffffff;
  font-size:18px;
}

.count-down{
  width: 480px;
  margin: 0 auto;
  padding: 20px;
}

</style>