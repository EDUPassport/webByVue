<template>
  <div class="subscribe-container">

    <el-row class="subscribe-label-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="subscribe-label">
          Sign up to our newsletter
        </div>
        <div class="subscribe-tips">
          New features, industry news, & more - just without the spam.
        </div>
      </el-col>
    </el-row>

    <el-row class="subscribe-input-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="xll-subscribe-container">
          <el-input
              v-model="subscribeEmail"
              placeholder="Email"
              :input-style="{height:'60px',border:'none','background-color':'#2F2F4D','color':'#ffffff'}"
              class="xll-subscribe-input"
          >
            <template #append>
              <el-button type="primary" @click="subscribe()">Sign Up</el-button>
            </template>
          </el-input>
        </div>

      </el-col>
    </el-row>

    <el-dialog v-model="sdialogVisible" title=""
               :width="sdialogWidth"
               custom-class="dialog-custom"
               center>
      <div class="dialog-container">
        <h1>Thanks for Subscribing</h1>

        <div class="dialog-form-container">
          <div class="dialog-form-item">
            <div class="dialog-form-item-label">How may we refer to you? </div>
            <div class="dialog-form-item-content">
              <el-input
                  v-model="subscribeName"
                  placeholder="Name"
                  :input-style="{'border-radius':'60px',height:'60px',border:'none','background-color':'#2F2F4D','color':'#ffffff'}"
                  class="xll-subscribe-input"
              >

              </el-input>
            </div>
          </div>

          <div class="dialog-form-item">
            <div class="dialog-form-item-label">Which best describes you? </div>
            <div class="dialog-form-item-content">
              <div class="identity-container">
                <div class="identity-btn"
                     :class="identityValue == 1 ? 'identity-educator-active' : '' "
                     @click="selectedIdentity(1)">Educator
                </div>
                <div class="identity-btn identity-btn-margin"
                     :class="identityValue == 2 ? 'identity-business-active' : '' "
                     @click="selectedIdentity(2)">Education-Business
                </div>
                <div class="identity-btn identity-btn-margin"
                     :class="identityValue == 3 ? 'identity-vendor-active' : '' "
                     @click="selectedIdentity(3)">Vendor
                </div>
              </div>

            </div>
          </div>

        </div>

        <div class="dialog-btn-container">
          <el-button type="primary" round class="dialog-btn" @click="submit()">Submit</el-button>
        </div>

      </div>
      <template #footer>

      </template>
    </el-dialog>

  </div>

</template>

<script>
import {ADD_SUBSCRIBE_EMAIL, ZOHO_SYNC} from "@/api/api";
import {ref} from 'vue'

export default {
  name: "subscribe",
  setup(){

    const identityValue = ref(localStorage.getItem('identity'))

    const selectedIdentity = (value)=>{
      identityValue.value = value
    }

    return {
      identityValue,
      selectedIdentity
    }
  },
  data(){
    return {
      sdialogWidth: '60%',
      subscribeEmail:'',
      subscribeName:'',
      sdialogVisible:false

    }
  },
  mounted() {
    let screenWidth = document.body.clientWidth

    if (Math.floor(screenWidth) < 768) {
       this.sdialogWidth = "90%"
    }
    if (Math.floor(screenWidth) >= 768 && Math.floor(screenWidth) < 992) {
      this.sdialogWidth = "60%"
    }
    if (Math.floor(screenWidth) >= 992 && Math.floor(screenWidth) < 1200) {
      this.sdialogWidth = "60%"
    }
    if (Math.floor(screenWidth) >= 1200) {
      this.sdialogWidth = "60%"
    }

    window.onresize = () => {
      let screenWidth2 = document.body.clientWidth
      if (Math.floor(screenWidth2) < 768) {
         this.sdialogWidth = "90%"
      }
      if (Math.floor(screenWidth2) >= 768 && Math.floor(screenWidth2) < 992) {
         this.sdialogWidth = "60%"
      }
      if (Math.floor(screenWidth2) >= 992 && Math.floor(screenWidth2) < 1200) {
         this.sdialogWidth = "60%"
      }
      if (Math.floor(screenWidth2) >= 1200) {
         this.sdialogWidth = "60%"
      }

    }

  },
  unmounted() {
    window.onresize = null
  },
  methods:{

    subscribe() {
      if(!this.subscribeEmail){
        return this.$message.error('Please input email');
      }
      this.sdialogVisible = true
    },
    async submitSubscribeForm(){

      let userId = localStorage.getItem('uid')
      let identityValue = this.identityValue
      let identityName = ''

      if(identityValue == 1){
          identityName = 'Educator'
      }
      if(identityValue == 2){
        identityName = 'Edu-Business'
      }
      if(identityValue == 3){
        identityName = 'Vendor'
      }

      let zohoData = [
        {'zf_referrer_name': ''},
        {'zf_redirect_url': ''},
        {'zc_gad': ''},
        {'SingleLine': this.subscribeName // name
        },
        {'Email': this.subscribeEmail // email
        },
        {
          'Dropdown1':identityName
        },
        {
          'Dropdown2':'Website Newsletter Subscription'
        }
      ]

      if(userId){
        zohoData.push(
            {
              'SingleLine1': userId  //  userId
            })

        let zohoParams = {
          zoho_data:zohoData,
          zoho_url:'https://forms.zohopublic.com/edupassport/form/UserEmailSubscription/formperma/yIiE5T3qMFGCpLNETibhYb3Vk8Cj5xCFehie_faFf-g/htmlRecords/submit'
        }

        await ZOHO_SYNC(zohoParams).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })

      }else{

        let zohoParams = {
          zoho_data:zohoData,
          zoho_url:'https://forms.zohopublic.com/edupassport/form/EmailSubscription1/formperma/8jXGGCyyrWXDE4zTRQbpNa-BoSMquHc6am8owPPn4zA/htmlRecords/submit'
        }

        await ZOHO_SYNC(zohoParams).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })

      }



    },
    submit(){
      let params = {
        email: this.subscribeEmail
      }
      ADD_SUBSCRIBE_EMAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.submitSubscribeForm()

          this.$message.success('Subscribe Success')
          this.subscribeEmail = ''
          this.subscribeName = ''
          this.sdialogVisible = false
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    }
  }
}
</script>

<style scoped>
.subscribe-container {
  background-color: #272641;
  padding: 80px 20px;
  text-align: center;
}

.subscribe-input-row, .subscribe-label-row {
  margin: 0 auto;
}

.subscribe-label {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
}

.subscribe-tips{
  font-size: 14px;
  color: #E5E2E4;
}

.xll-subscribe-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  width: 102%;
  height: 60px;
  border-radius: 60px;
  overflow: hidden;
}

:deep(.el-input-group__append){
  border:none;
  background-color: #091E77;
  padding: 0 40px;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 16px;
}

@media screen and (min-width: 1200px) {

  .subscribe-input-row, .subscribe-label-row {
    width: 1100px;
    margin: 0 auto;
  }

}
:deep(.dialog-custom){
  border-radius: 20px;
}

.dialog-container{
  width:80%;
  margin: 0 auto;
}

.dialog-container h1{
  text-align: center;
}

.dialog-form-container{
  margin-top: 40px;
}

.dialog-form-item{
  margin-top: 20px;
}

.dialog-form-item-label{
  font-size:14px;
}

.dialog-form-item-content{
  margin-top: 10px;
}

.identity-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}


.identity-btn {
  background-color: rgba(41, 75, 108, 0.1);
  flex:1;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  padding: 20px 0;
}

.identity-btn-margin {
  margin-left: 10px;
}

.identity-educator-active {
  background-color: #00b3d2;
  color: #ffffff;
}

.identity-business-active {
  background-color: #d2005b;
  color: #ffffff;
}

.identity-vendor-active {
  background-color: #b1c452;
  color: #ffffff;
}


.dialog-btn-container{
 margin-top: 40px;
  text-align: center;
}

.dialog-btn{
  background-color: #0A1E76;
  width: 40%;
  height: 60px;
  margin: 0 auto;
  font-size: 18px;
  border-radius: 60px;
}

@media screen and (max-width: 768px){
  .dialog-container{
    width: 100%;
  }
  .identity-btn{
    padding:10px;
    font-size: 12px;
  }

}

</style>
