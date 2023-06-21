<template>
  <div class="footer-bg-container">
    <div class="footer-container">
      <div class="footer-t">
        <div class="footer-logo">
          <el-image class="footer-logo-img" :src="logoImg"></el-image>
        </div>
        <div class="footer-t-r">
          <div class="footer-menu">
            <div class="footer-menu-item" @click="turnHome()">
              Home
            </div>
            <div class="footer-menu-item" @click="turnJobs()">
              EDU Jobs
            </div>
            <div class="footer-menu-item" @click="turnDeals()">
              EDU Deals
            </div>
            <div class="footer-menu-item" @click="turnEvents()">
              Events
            </div>
            <div class="footer-menu-item" @click="turnBlogs()">
              EDU Blog
            </div>
            <div class="footer-menu-item" @click="turnSupport()">
              EDU Support
            </div>

<!--            <div class="footer-menu-item" @click="turnAboutUs()">-->
<!--              About Us-->
<!--            </div>-->
            <!--            <div class="footer-menu-item" @click="turnFeatures()">-->
            <!--              FEATURES-->
            <!--            </div>-->
            <!--            <div class="footer-menu-item" @click="turnPricing()">-->
            <!--              PRICING-->
            <!--            </div>-->
            <!--            <div class="footer-menu-item" @click="turnContactUs()">-->
            <!--              CONTACT US-->
            <!--            </div>-->
          </div>
          <div class="footer-contact-us">
            <div class="footer-contact-us-label">Contact us</div>
            <div class="footer-contact-us-c">
              <a href="mailto:care@edupassport.io">care@edupassport.io</a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-m">

      </div>
      <div class="footer-b">

        <div class="footer-b-l">
          © 2023 EDU Passport
        </div>
        <div class="footer-b-r">
          We are change-makers in global education.
        </div>
        <div class="footer-b-r-mobile">
          <a href="mailto:care@edupassport.io">care@edupassport.io</a>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import logoImg from  "@/assets/newHome/logo/Full_Logo_Vertical_Transparent_Dark.png"

export default {
  name: "newFooter",
  data() {
    return {
      logoImg,
    }
  },
  mounted() {
    let self = this;

    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
      this.homeArrowRightSize = 30
    }


    window.onresize = () => {
      if (screenWidthFloor <= 768) {
        this.homeArrowRightSize = 30
      }
    }

    this.initLoadingStatus = false;
    setTimeout(function () {
      self.initLoadingStatus = false;
    }, 3000)

  },
  unmounted() {
    window.onresize = null
  },
  methods: {

    turnHome(){
      this.$router.push('/')
    },
    turnJobs(){
      this.$router.push('/jobs')
    },
    turnDeals(){
      this.$router.push('/deals')
    },
    turnEvents(){
      this.$router.push('/events')
    },
    turnAboutUs() {
      this.$router.push('/about/us')
    },
    turnSupport(){
      window.open('https://support.edupassport.io/portal/en/kb/support', '_blank')
    },
    turnBlogs(){
      window.open('https://blog.edupassport.io','_blank')
    }

  }

}
</script>

<style scoped>

.footer-bg-container {
  background-color: #262626;
  padding: 50px 100px;
}

.footer-container {

}

.footer-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.footer-logo {

  text-align: left;
  position: relative;

  cursor: pointer;
  width: 220px;
}

.footer-logo-img{
  width: 110px;
}

.footer-t-r{

}

.footer-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.footer-menu-item {
  cursor: pointer;
  color: #FFFFFF;
  font-size: 18px;
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  margin-right: 50px;
}

.footer-menu-item:hover {
  text-decoration: underline;
}

.footer-contact-us{
  margin-top: 50px;
}

.footer-contact-us-label{
  font-family: BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #FFFFFF;
}
.footer-contact-us-c a{
  font-family: BarlowM, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #FFFFFF;
}

.footer-m {
  margin-top: 40px;

}

.footer-b {
  margin-top: 10px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
}

.footer-b-l{
  width: 220px;
  font-size: 16px;
}

.footer-b-r{
  font-size: 23px;
}


.nav-link-container {
  text-align: left;
}

.nav-link-container a {
  margin-left: 20px;
  text-decoration: none;
  color: #262626;

  font-size: 24px;
  line-height: 30px;
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.nav-link-container a:hover {
  color: #000000;
}

@media screen and (min-width: 769px) {
  .footer-b-r-mobile{
    display: none;
  }

  .logo-new-logo-mobile-img{
    display: none;
  }

}

@media screen and (max-width: 768px){

  .footer-bg-container{
    padding: 15px;
  }

  .footer-t{
    align-items: flex-start;
    justify-content: space-between;
  }

  .footer-t-r{
    display: flex;
    flex-direction: row;

  }

  .footer-logo{
    width: 80px;
  }

  .footer-logo-img{
    width: 80px;
  }


  .footer-contact-us{
    display: none;
  }

  .footer-menu{
    /*margin-top: 10px;*/
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-menu-item{
    width: 100%;
    font-size: 12px;
    margin-bottom: 20px;
    margin-right: 0;
    text-align: right;
  }

  .footer-contact-us-label{
    font-size: 16px;
  }

  .footer-contact-us-c{
    font-size: 16px;
  }

  .footer-b{

  }
  .footer-b-l{
    text-align: left;
    width: 100%;
    font-size: 12px;
  }

  .footer-b-r{
    display: none;
    margin-top: 10px;
    font-size: 16px;
  }   
  .footer-b-r-mobile a{
    font-size: 12px;
    font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    color: white;
  }

  .t-btn-menu-icon-container{
    padding-right: 15px;
  }

}

</style>
