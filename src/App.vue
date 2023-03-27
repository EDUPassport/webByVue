<template>

  <div style="max-width:1920px;margin:0 auto;">
    <router-view></router-view>
  </div>

</template>

<script>

import {onBeforeUnmount, onMounted} from 'vue'

export default {
  name: 'App',
  setup(){

    function updateWindowHeight() {
      let windowHeight = window.innerHeight;
      let html = document.querySelector(":root");
      if (windowHeight > 0 && html) {
        html.style.setProperty("--i-window-height", `${windowHeight}px`);
      }
    }

    onMounted(() => {
      updateWindowHeight();
      window.addEventListener('resize', ()=>{
        updateWindowHeight();
      })

    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', ()=>{
        updateWindowHeight();
      })

    });

  },
  data(){
    return {

    }
  }
}
</script>

<style>

:root {
  --i-window-height: 100vh;
}

#app{
  background-color:  #F0F2F5;
}
/*css 初始化 */
html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, fieldset, legend, img {
  margin: 0;
  padding: 0;
}

h1{
  font-size: 45px;
  font-family: BCSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

h2{
  font-size: 35px;
  font-family: BSemiBold, 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
}

h3{
  font-size: 30px;
  font-family: BSemiBold,'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
}
h4{
  font-size: 24px;
  font-family: BCM, 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
}

h5{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
}

button{
  font-family: BCM, 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
}

input{
  font-size: 18px;
}

</style>
