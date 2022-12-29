<template>
  <div class="contact-us-bg">
    <div class="contact-us-t-bg">
      <h1>Got questions?</h1>
      <p>Questions, bug reports, feedback — we’re here for it all</p>
    </div>

    <div class="contact-us-bg-container">

      <div class="contact-us-container">
        <div class="contact-us-l-container">

          <div class="contact-us-l-item">
            <div class="contact-us-l-label">Choose a topic</div>
            <div class="contact-us-l-content">
              <div class="contact-us-l-tags">
                <div class="contact-us-l-tag">Signing in</div>
                <div class="contact-us-l-tag">Upgrading</div>
                <div class="contact-us-l-tag">Billing and plans</div>
                <div class="contact-us-l-tag">Deals/Events/Ads</div>
                <div class="contact-us-l-tag">Topic</div>
                <div class="contact-us-l-tag">Another topic</div>
                <div class="contact-us-l-tag">Questions about this topic</div>
                <div class="contact-us-l-tag">Feedback</div>
              </div>
            </div>
          </div>

          <div class="contact-us-l-item">
            <div class="contact-us-l-label">Something else</div>
            <div class="contact-us-l-content">
                <el-input placeholder='Enter a topic, like "bugs"'></el-input>
            </div>
          </div>

          <div class="contact-us-l-item">
            <div class="contact-us-l-label">Featured articles</div>
            <div class="contact-us-l-content">
              <div class="contact-us-l-article">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</div>
              <div class="contact-us-l-article">Lorem ipsum dolor sit amet, consetetur sadipscing</div>
              <div class="contact-us-l-article">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</div>
            </div>
          </div>


        </div>
        <div class="contact-us-r-container">
          <div class="contact-us-r-label">Have a feedback to share?</div>
          <div class="contact-us-r-content">
            <el-button plain>Yes!</el-button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>


export default {
  name: "us",
  data() {
    return {}
  },
  mounted() {

  },
  methods: {}

}
</script>

<style scoped>
.contact-us-bg{
  background-color: #F0F2F5;
  min-height: calc(var(--i-window-height) - 140px);
}

.contact-us-t-bg{
  height: 170px;
  background-color: #6650b3;
  padding: 55px 55px 55px 200px;
}

.contact-us-t-bg h1{
  font-family: Montserrat Regular , Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 40px;
  color: #FFFFFF;
}

.contact-us-t-bg p{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #F0F2F5;
  margin-top: 20px;
}

.contact-us-bg-container{
  position: relative;
}

.contact-us-container{
  position: absolute;
  left: 50px;
  right: 50px;
  top: -100px;
  margin: auto;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.contact-us-l-container{
  width: 800px;
  background-color: #FFFFFF;
  padding: 50px;
  border-radius: 18px;
  box-shadow: 0 0 23px #00000012;
}

.contact-us-l-item{
  margin-bottom: 25px;
}

.contact-us-l-label{
  font-size: 20px;
  font-family: Cabin Medium, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  margin-bottom: 15px;
}

.contact-us-l-content{

}

.contact-us-l-tags{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.contact-us-l-tag{
  font-size: 18px;
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  padding: 10px 25px;
  border-radius: 25px;
  background-color: #F0F2F5;
  box-shadow: 0px 0px 23px #00000012;
  margin-right: 25px;
  margin-bottom: 25px;
  cursor: pointer;
}

.contact-us-l-article{
  font-size: 18px;
  font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  color: #6650B3;
  margin-bottom: 15px;
  cursor: pointer;
}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {

}

</style>
