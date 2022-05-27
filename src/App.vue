<template>
  <div :style="styleValue">
    <router-view></router-view>
  </div>

</template>

<script>
import {ref} from 'vue'
export default {
  name: 'App',
  components: {

  },
  setup(){
    const envName = process.env.VUE_APP_ENV_NAME

    console.log(envName)
    const styleValue = ref('')

    if(envName === 'development' || envName === 'developmentCN' || envName === 'productionCN'){
       styleValue.value = 'max-width:1920px;margin:0 auto;'
    }
    // console.log(styleValue)
    return {
      styleValue
    }

  },
  data(){
    return {

    }
  }
}
</script>

<style>

/*css 初始化 */
html, body, ul, li, ol, dl, dd, dt, p, h1, h2, h3, h4, h5, h6, form, fieldset, legend, img {
  margin: 0;
  padding: 0;
  letter-spacing: 0.02em;
}

*{
  font-family: ArimoRegular, sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
