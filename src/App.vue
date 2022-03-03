<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  setup(){
    // const allTag = document.getElementsByTagName('*')
    // const arrTag = Array.prototype.slice.call(allTag)
    // arrTag.forEach(function (ele){
    //   console.log(ele)
    //   ele.style.fontFamily = 'ArimoBold !important'
    // })

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
}

*{
  font-family: ArimoRegular, sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
