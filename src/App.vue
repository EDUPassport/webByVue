<template>

  <div style="max-width:1920px;margin:0 auto;">
    <router-view></router-view>
  </div>

</template>

<script>
// import DevicePixelRatio from '@/assets/devicePixelRatio'
// onMounted
// import {ref  } from 'vue'

export default {
  name: 'App',
  components: {

  },
  setup(){

    // const envName = process.env.VUE_APP_ENV_NAME
    //
    // const styleValue = ref('')
    //
    // if(envName === 'development' || envName === 'developmentCN' || envName === 'productionCN'){
    //    styleValue.value = 'max-width:1920px;margin:0 auto;'
    // }

    // const bodyScale = () => {
    //   let devicewidth = document.documentElement.clientWidth;//获取当前分辨率下的可是区域宽度
    //   document.body.style.zoom =  devicewidth / 1920; //放大缩小相应倍数
    // }
    //
    // onMounted(()=>{
    //   new DevicePixelRatio().init()
    //
    //   // window.onresize = ()=>{
    //   //   console.log('resize app')
    //   //   setTimeout(function () {
    //   //     bodyScale();
    //   //   },1000)
    //   //
    //   // }
    //   bodyScale();
    // })
    //
    // return {
    //   styleValue
    // }

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
  font-size: 22px;
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;

  color: #262626;
}

button{
  font-family: BCM, 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;
}

input{
  font-size: 18px;
}

</style>
