<template>

  <div class="donghua" v-if="visible">

    <div class="donghua-bg">
      <div class="top-container">

        <div class="logo-new-container">
          <div class="logo-new"  @click="turnHome()">
            <el-image class="logo-new-logo-img" :src="logoImgDarkH"></el-image>
          </div>
          <div class="logo-new-beta">Beta</div>
        </div>

      </div>

      <div class="content-container">
        <div class="content-l" :class="cl ? 'content-l-animation' : ''">as <span>Educators</span></div>
        <div class="content-r" :class="cr ? 'content-r-animation' : ''">

          <div class="content-r-1">
            <div v-if="span1" class="content-r-1-item">we</div>
            <div v-if="span2" class="content-r-1-item">don't</div>
            <div v-if="span4" class="content-r-1-item-2">didn't</div>
            <div v-if="span3" class="content-r-1-item">have</div>

          </div>

          <div class="content-r-cc">

            <div class="content-text content-style-1" v-if="show1">a dedicated place for all things education</div>
            <div class="content-text content-style-1" v-if="show2">a transparent hiring process</div>
            <div class="content-text content-style-1" v-if="show3">support from local businesses</div>
            <div class="content-text content-style-1" v-if="show4">support in moving and living abroad</div>

            <div class="content-r-3" v-if="show5">
              <div class="content-text">a dedicated place for all things education</div>
              <div class="content-text">a transparent hiring process</div>
              <div class="content-text">support from local businesses</div>
              <div class="content-text">support in moving and living abroad</div>
            </div>

          </div>

        </div>
      </div>


      <div class="skip-container">
        <el-button round @click="skip()">
          SKIP
        </el-button>
      </div>

    </div>

  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import logoImgLight from  "@/assets/newHome/logo/Full_Logo_Vertical_Transparent_Light.png"
import logoImgDark from  "@/assets/newHome/logo/Full_Logo_Vertical_Transparent_Dark.png"
import logoImgDarkH from  '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Dark.png'
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "homeDonghua",
  setup() {
    const visible = ref(true)
    const span1 = ref(false)
    const span2 = ref(false)
    const span3 = ref(false)
    const span4 = ref(false)

    const show1 = ref(false)
    const show2 = ref(false)
    const show3 = ref(false)
    const show4 = ref(false)
    const show5 = ref(false)

    const cl = ref(false)
    const cr = ref(false)

    const skip = ()=>{

      let body = document.body;
      let documentTop = document.scrollingElement.scrollTop;

      visible.value = false
      localStorage.setItem('homeDongHua',1)
      body.style.position = "static";
      body.style.top = "auto";
      document.scrollingElement.scrollTop = documentTop;
    }

    onMounted(() => {

      let homeDongHuaValue = localStorage.getItem('homeDongHua')

      if(homeDongHuaValue){
        visible.value = false

      }else{

        let body = document.body;
        let documentTop = document.scrollingElement.scrollTop;
        body.style.position = "fixed"
        body.style.top = -documentTop + "px";

        setTimeout(function () {
          span1.value = true
        }, 500)
        setTimeout(function () {
          span2.value = true
        }, 1200)
        setTimeout(function () {
          span3.value = true
        }, 1700)

        setTimeout(function () {
          span2.value = false
          span4.value = true
        }, 21200)

        setTimeout(function () {
          show1.value = true
        }, 2200)

        setTimeout(function () {
          show1.value = false
          show2.value = true
        }, 6200)

        setTimeout(function () {
          // show1.value = false
          show2.value = false
          show3.value = true
        }, 10200)

        setTimeout(function () {
          // show1.value = false
          // show2.value = false
          show3.value = false
          show4.value = true
        }, 14200)

        setTimeout(function () {
          // show1.value = false
          // show2.value = false
          // show3.value = false
          show4.value = false
          show5.value = true
        }, 18200)

        setTimeout(function () {
          cl.value = true
          cr.value = true
        }, 26200)

        setTimeout(function () {
          visible.value = false
          localStorage.setItem('homeDongHua',1)
          body.style.position = "static";
          body.style.top = "auto";
          document.scrollingElement.scrollTop = documentTop;
        }, 28200)


      }

    })

    return {
      span1,
      span2,
      span3,
      span4,
      show1,
      show2,
      show3,
      show4,
      show5,
      cl,
      cr,
      visible,
      skip

    }

  },
  data(){
    return {
      logoImgLight,
      logoImgDark,
      logoImgDarkH
    }
  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  mounted(){
    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      updateWindowHeight()
    }

    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        updateWindowHeight()
      }
    }

  },
  methods:{
    turnHome(){
      this.$router.push('/')
    }
  }

}
</script>

<style scoped>

.donghua {

  width: 100%;
  height: var(--i-window-height);
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  /*background-color: #F0F2F5;*/
  background-color: #262626;

}

.donghua-bg {
  height: var(--i-window-height);
  padding: 30px 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
}

.top-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: absolute;
  top: 25px;
  left: 0;
  right: 0;
  margin: auto;
}

.edu-text {
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 50px;
  color: #FFFFFF;
}

.passport-text {
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 21px;
  color: #FFFFFF;
}

.content-container {

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;


}

.content-l {
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 45px;
  color: #E7DEFF;
}

.content-l span {
  color: #59EDF7;
}

.content-l-animation{
  animation-name: slide-out-left;
  animation-duration: 2s;

}

.content-r-animation{
  animation-name: slide-out-right;
  animation-duration: 2s;
}

.content-r {
  padding-left: 10px;
  min-width: 937px;
}

.content-r-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.content-r-1-item {
  margin-right: 10px;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 45px;
  color: #F9B019;

  animation-name: slide-in-bottom;
  animation-timing-function: linear;
  animation-duration: 0.5s;
}

.content-r-1-item-2{
  margin-right: 10px;
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 45px;
  color: #F9B019;

  animation-name: slide-in-top;
  animation-timing-function: linear;
  animation-duration: 0.5s;
}

@keyframes slide-in-bottom {

  0% {
    transform: translateY(50px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }

}


.content-r-cc {
  overflow: hidden;
  margin-top: 25px;

}

.content-text {
  font-family: BExtraBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 45px;
  color: #59EDF7;

}

.content-style-1 {

  animation-name: slide-out-top;
  animation-duration: 4s;
  /*animation-timing-function: linear;*/

}

.content-r-2 span:before {
  content: "education hub";
  animation-name: changeSpan2;
  animation-duration: 7s;
}

.content-r-3 {
  animation-name: slide-in-top;
  animation-duration: 3s;
}


@keyframes slide-out-top {

  0% {
    transform: translateY(50px);
    opacity: 1;
  }

  25% {
    transform: translateY(0);
    opacity: 1;
  }

  50%{
    transform: translateY(0);
    opacity: 1;
  }

  75%{
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-300px);
    opacity: 0;
  }


}


@keyframes slide-in-top {

  0% {
    transform: translateY(-100px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out-left {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px);
    opacity: 0;
  }
}

@keyframes slide-out-right {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(1000px);
    opacity: 0;
  }
}


.skip-container{
  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}


.logo-new-container{
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 300px;
}

.logo-new{
  cursor: pointer;
}

.logo-new-logo-img{
  width: 260px;
}

.logo-new-beta{
  position: absolute;
  top: 0;
  right: -25px;
  background-color:#49397f;
  padding:2px 10px;
  border-radius:10px;
  color:#EEEEEE;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 12px;
}

@media screen and (max-width: 768px){
  .content-container{
    width: 100%;
    flex-direction: column;
  }

  .content-r{
    min-width: auto;
    padding-left: 0;
    margin-top: 15px;
  }

  .content-l{
    font-size: 16px;
  }

  .content-r-1-item{
    font-size: 16px;
  }

  .content-r-1-item-2{
    font-size: 16px;
  }

  .content-text{
    font-size: 14px;
  }
}
</style>