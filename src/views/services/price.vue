<template>
  <div class="price-bg">

    <el-row class="price-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

        <div class="price-label-container">
          <h1>Our Pricing & Plans</h1>
          <div class="price-label-tips">
            We have 3 levels of annual memberships with different perks just for you! Start with basic & upgrade at anytime.
          </div>
        </div>

        <div class="switch-identity-container">
          <div class="switch-identity-item"
               :class="identity == 1 ? 'switch-identity-item-active-e' : ''"
               @click="switchIdentity(1)"
          >
            Educators
          </div>
          <div class="switch-identity-item"
               :class="identity == 2 ? 'switch-identity-item-active-b' : ''"
               @click="switchIdentity(2)"
          >
            EDU Business
          </div>
          <div class="switch-identity-item"
               :class="identity == 3 ? 'switch-identity-item-active-v' : ''"
               @click="switchIdentity(3)"
          >
            Vendors
          </div>
        </div>

        <div class="price-container" v-if="identity == 1">
          <template v-for="(item,i) in vipListData" :key="i">
            <div class="price-item-e price-basic" v-if="item.level == 1">
              <div class="price-item-label">BASIC</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{item.money}}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{item.dollar}}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                   Value: ￥{{item.original_money}}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                   Value: ${{item.original_dollar}}
                </template>
              </div>
              <div class="price-item-content">
<!--                <div class="price-item-content-label">Basic Membership Includes:</div>-->
                <div class="price-item-content-content" v-html="item.desc"></div>
              </div>

              <div class="price-purchase">
                <el-button class="price-purchase-btn" color="#b1c452" @click="zohoContactUs()"  round>
                  Get Started
                </el-button>
              </div>
            </div>
            <div class="price-item-e price-pro-e" v-if="item.level == 2">
              <div class="price-item-label">PRO</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{item.money}}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{item.dollar}}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                   Value: ￥{{item.original_money}}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                   Value: ${{item.original_dollar}}
                </template>
              </div>
              <div class="price-item-content">
<!--                <div class="price-item-content-label">Pro Membership Includes:</div>-->
                <div class="price-item-content-content" v-html="item.desc"></div>
              </div>
              <div class="price-purchase">
                <el-button class="price-purchase-btn" round @click="purchase(item.id,item.dollar,item.level_en)">Buy Now</el-button>
              </div>
            </div>
            <div class="price-item-e price-plus" v-if="item.level == 3">
              <div class="price-item-label">PLUS</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{item.money}}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{item.dollar}}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                   Value: ￥{{item.original_money}}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                   Value: ${{item.original_dollar}}
                </template>
              </div>
              <div class="price-item-content">
<!--                <div class="price-item-content-label">Plus Membership Includes:</div>-->
                <div class="price-item-content-content" v-html="item.desc"></div>
              </div>
              <div class="price-purchase">
                <el-button class="price-purchase-btn" round @click="purchase(item.id,item.dollar,item.level_en)">Buy Now</el-button>
              </div>
            </div>
<!--            <div class="price-item-e price-plus" v-if="item.level == 4">-->
<!--              <div class="price-item-label">LIFETIME</div>-->
<!--              <div class="price-item-money-mask">-->
<!--                <div class="price-item-money-mask-money">${{item.dollar}}</div>-->
<!--                <div class="price-item-money-mask-sjx"></div>-->
<!--              </div>-->
<!--              <div class="price-item-actual-money">-->
<!--                Actual Value: ${{item.dollar*10}}-->
<!--              </div>-->
<!--              <div class="price-item-content">-->
<!--                <div class="price-item-content-label">Lifetime Membership Includes:</div>-->
<!--                <div class="price-item-content-content" v-html="item.desc"></div>-->
<!--              </div>-->
<!--              <div class="price-purchase">-->
<!--                <el-button class="price-purchase-btn" @click="zohoContactUs()"  round>Get Started</el-button>-->
<!--              </div>-->
<!--            </div>-->

          </template>

        </div>


        <div class="price-container" v-if="identity == 2">

          <template v-for="(item,i) in vipListData" :key="i">
            <div class="price-item-b price-basic" v-if="item.level == 1">
              <div class="price-item-label">BASIC</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{item.money}}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{item.dollar}}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                   Value: ￥{{item.original_money}}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                   Value: ${{item.original_dollar}}
                </template>
              </div>
              <div class="price-item-content">
<!--                <div class="price-item-content-label">Basic Membership Includes:</div>-->
                <div class="price-item-content-content" v-html="item.desc"></div>
              </div>

              <div class="price-purchase">
                <el-button class="price-purchase-btn" @click="zohoContactUs()"  round>Get Started</el-button>
              </div>
            </div>
            <div class="price-item-b price-pro-b" v-if="item.level == 2">
              <div class="price-item-label">PRO</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{item.money}}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{item.dollar}}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                   Value: ￥{{item.original_money}}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                   Value: ${{item.original_dollar}}
                </template>
              </div>
              <div class="price-item-content">
<!--                <div class="price-item-content-label">Pro Membership Includes:</div>-->
                <div class="price-item-content-content" v-html="item.desc"></div>
              </div>
              <div class="price-purchase">
                <el-button class="price-purchase-btn" round @click="purchase(item.id,item.dollar,item.level_en)">Buy Now</el-button>
              </div>
            </div>
            <div class="price-item-b price-plus" v-if="item.level == 3">
              <div class="price-item-label">PLUS</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{item.money}}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{item.dollar}}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                   Value: ￥{{item.original_money}}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                   Value: ${{item.original_dollar}}
                </template>
              </div>
              <div class="price-item-content">
<!--                <div class="price-item-content-label">Plus Membership Includes:</div>-->
                <div class="price-item-content-content" v-html="item.desc"></div>
              </div>
              <div class="price-purchase">
                <el-button class="price-purchase-btn" round @click="purchase(item.id,item.dollar,item.level_en)">Buy Now</el-button>
              </div>
            </div>
<!--            <div class="price-item-b price-plus" v-if="item.level == 4">-->
<!--              <div class="price-item-label">LIFETIME</div>-->
<!--              <div class="price-item-money-mask">-->
<!--                <div class="price-item-money-mask-money">${{item.dollar}}</div>-->
<!--                <div class="price-item-money-mask-sjx"></div>-->
<!--              </div>-->
<!--              <div class="price-item-actual-money">-->
<!--                Actual Value: ${{item.dollar*10}}-->
<!--              </div>-->
<!--              <div class="price-item-content">-->
<!--                <div class="price-item-content-label">Lifetime Membership Includes:</div>-->
<!--                <div class="price-item-content-content" v-html="item.desc"></div>-->
<!--              </div>-->
<!--              <div class="price-purchase">-->
<!--                <el-button class="price-purchase-btn" @click="zohoContactUs()"  round>Get Started</el-button>-->
<!--              </div>-->
<!--            </div>-->

          </template>


        </div>

        <!--        vendor-->
        <div class="price-container" v-if="identity == 3">

          <template v-for="(item,i) in vipListData " :key="i">
            <div class="price-item-v price-basic" v-if="item.level == 1">
              <div class="price-item-label">BASIC</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{item.money}}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{item.dollar}}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                   Value: ￥{{item.original_money}}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                   Value: ${{item.original_dollar}}
                </template>
              </div>
              <div class="price-item-content">
<!--                <div class="price-item-content-label">Basic Membership Includes:</div>-->
                <div class="price-item-content-content" v-html="item.desc"></div>
              </div>

              <div class="price-purchase">
                <el-button class="price-purchase-btn" @click="zohoContactUs()"  round>Get Started</el-button>
              </div>
            </div>
            <div class="price-item-v price-pro-v" v-if="item.level == 2">
              <div class="price-item-label">PRO</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{item.money}}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{item.dollar}}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                   Value: ￥{{item.original_money}}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                   Value: ${{item.original_dollar}}
                </template>
              </div>
              <div class="price-item-content">
<!--                <div class="price-item-content-label">Pro Membership Includes:</div>-->
                <div class="price-item-content-content" v-html="item.desc"></div>
              </div>
              <div class="price-purchase">
                <el-button class="price-purchase-btn" round @click="purchase(item.id,item.dollar,item.level_en)">Buy Now</el-button>
              </div>

            </div>
            <div class="price-item-v price-plus" v-if="item.level==3">
              <div class="price-item-label">PLUS</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{item.money}}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{item.dollar}}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                   Value: ￥{{item.original_money}}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                   Value: ${{item.original_dollar}}
                </template>
              </div>
              <div class="price-item-content">
<!--                <div class="price-item-content-label">Plus Membership Includes:</div>-->
                <div class="price-item-content-content" v-html="item.desc"></div>
              </div>
              <div class="price-purchase">
                <el-button class="price-purchase-btn" round @click="purchase(item.id,item.dollar,item.level_en)">Buy Now</el-button>
              </div>

            </div>
<!--            <div class="price-item-v price-plus" v-if="item.level == 4">-->
<!--              <div class="price-item-label">LIFETIME</div>-->
<!--              <div class="price-item-money-mask">-->
<!--                <div class="price-item-money-mask-money">${{item.dollar}}</div>-->
<!--                <div class="price-item-money-mask-sjx"></div>-->
<!--              </div>-->
<!--              <div class="price-item-actual-money">-->
<!--                Actual Value: ${{item.dollar*10}}-->
<!--              </div>-->
<!--              <div class="price-item-content">-->
<!--                <div class="price-item-content-label">Lifetime Membership Includes:</div>-->
<!--                <div class="price-item-content-content" v-html="item.desc"></div>-->
<!--              </div>-->
<!--              <div class="price-purchase">-->
<!--                <el-button class="price-purchase-btn" @click="zohoContactUs()" round>Get Started</el-button>-->
<!--              </div>-->
<!--            </div>-->

          </template>

        </div>

        <div class="price-help-container">
          Need a higher level plan? <span @click="zohoContactUs()">Contact us</span> for enterprise plan
        </div>

      </el-col>
    </el-row>

    <el-row class="faq-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="faq-label-container">
          <h1>FAQ</h1>
        </div>
        <div class="faq-content-container">
          <el-collapse accordion>
            <el-collapse-item name="1">
              <template #title>
                Do I need to pay to apply to a job?
              </template>
              <div>
                No. It's free.
              </div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template #title>
                How to I find out all the data you have on me?
              </template>
              <div>
                Please contact us.
              </div>

            </el-collapse-item>
            <el-collapse-item name="3">
              <template #title>
                What do I need to be a vendor?
              </template>
              <div>
                You just need to register our platform.
              </div>
            </el-collapse-item>

          </el-collapse>
        </div>

        <el-dialog v-model="paypalVisible" title="Click to pay" width="30%" center>
<!--          <div id="paypal-id"></div>-->
            <div class="paypal-btn" @click="paypalToPay()">
              <el-image class="paypal-logo-img" :src="paypalLogoImg"></el-image>
            </div>
        </el-dialog>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";
// import {loadScript} from '@paypal/paypal-js'
import {MEMBER_VIP_LIST} from "@/api/api";
import paypalLogoImg from '@/assets/pay/paypal-logo.png'

export default {
  name: "price",
  setup() {
    const envName = process.env.VUE_APP_ENV_NAME

    const store = useStore()
    const identity = ref(store.state.identity)
    const paypalVisible = ref(false)

    return {
      identity,
      paypalVisible,
      envName
    }
  },
  data(){
    return {
      paypalLogoImg,
      paypalUrl:'',
      vipListData:[]
    }
  },
  mounted() {
    let token = localStorage.getItem('token')

    if(token){
      this.getVipList(this.identity)
    }else{
      this.identity = 1
      this.getVipList(1)
    }

  },
  methods: {
    getVipList(identity){
      let params = {
        identity:identity,
        token:localStorage.getItem('token')
      }

      MEMBER_VIP_LIST(params).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.vipListData = res.message
        }

      }).catch(err=>{
        console.log(err)
      })
    },
    switchIdentity(value) {
      // console.log(value)
      this.identity = value
      this.getVipList(value)
    },
    paypalToPay(){
      window.open(this.paypalUrl,'_blank')
    },
    purchase(id,amount,level_en){

      let token = localStorage.getItem('token')

      if(!token || token === ''){
        return this.$router.push({
          path:'/login',
          query:{type:1}
        })
      }

      this.paypalVisible=true

      let product = id
      let shipping = 0
      let desc = level_en
      let levelId = id
      let identity = this.identity
      let userId = localStorage.getItem('uid')

      let apiDomain = process.env.VUE_APP_URL
      this.paypalUrl = apiDomain + 'pay/paypal?product='+product + '&price='+amount + '&shipping='+shipping+'&desc='+desc
      +'&level_id='+levelId+'&identity='+identity + '&user_id='+userId

      // loadScript({
      //       "client-id": "ARBRiffHCNjNTHo1cO6wmW7TPlEWOW84VqW1o_5wG6koeavGacLIaROjXXbbvwb2uT0A7suHDHzbi0w8",
      //       "intent":"authorize"
      //     })
      //     .then((paypal) => {
      //       paypal
      //           .Buttons(
      //               {
      //                 style: {
      //                   layout: 'vertical',
      //                   color: 'blue',
      //                   shape: 'rect',
      //                   label: 'paypal'
      //                 },
      //                 createOrder: function (data, actions) {
      //                   // Set up the transaction
      //                   return actions.order.create({
      //                     purchase_units: [{
      //                       amount: {
      //                         value: amount
      //                       }
      //                     }]
      //                   });
      //                 },
      //                 onApprove: function (data, actions) {
      //                   // Authorize the transaction
      //                   actions.order.authorize().then(function(authorization) {
      //                     // Get the authorization id
      //                     var authorizationID = authorization.purchase_units[0].payments.authorizations[0].id
      //                     alert('You have authorized this transaction. Order ID:  ' + data.orderID + ', Authorization ID: ' + authorizationID); // Optional message given to purchaser
      //                     // Call your server to validate and capture the transaction
      //
      //                   });
      //
      //                   // This function captures the funds from the transaction.
      //                   // return actions.order.capture().then(function (details) {
      //                   //   console.log(details)
      //                   //   // This function shows a transaction success message to your buyer.
      //                   //   alert('Transaction completed by ' + details.payer.name.given_name);
      //                   // });
      //                 },
      //                 onCancel: function (data) {
      //                   // Show a cancel page, or return to cart
      //                   console.log(data)
      //                 },
      //                 onError: function (err) {
      //                   // For example, redirect to a specific error page
      //                   console.log(err)
      //                 }
      //
      //               }
      //           )
      //           .render("#paypal-id")
      //           .catch((error) => {
      //             console.error("failed to render the PayPal Buttons", error);
      //           });
      //     })
      //     .catch((error) => {
      //       console.error("failed to load the PayPal JS SDK script", error);
      //     });

    },
    zohoContactUs(){
      window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4','_blank')
    }
  }
}
</script>

<style scoped>
.price-bg {
  background-color: #f5f6f7;
}

.banner-bg {
  height: 200px;
  background-image: url("../../assets/bg/wheat.png");
  background-size: 50%;
  background-repeat: repeat;
  background-position: center;
}

.banner-bg h1 {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  font-size: 28px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 200px;
}

.price-row {
  margin: 0 auto;
  padding: 40px 0 100px 0;
}

@media screen and (min-width: 1400px) {
  .price-row {
    //width: 1400px;
    width:1100px;
  }

}

.price-label-container {
  margin-top: 40px;
  text-align: center;
}

.price-label-container h1 {

}

.price-label-tips {
  margin-top: 10px;
  color: #808080;
}

.switch-identity-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
}

.switch-identity-item {
  margin: 10px;
  line-height: 40px;
  border-radius: 40px;
  background-color: #FFFFFF;
  padding: 0 40px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  font-size: 14px;
  cursor: pointer;
}

.switch-identity-item-active-b {
  background-color: #00b3d2;
  color: #ffffff;
}
.switch-identity-item-active-e {
  background-color: #FF2870;
  color: #ffffff;
}
.switch-identity-item-active-v {
  background-color: #8E134C;
  color: #ffffff;
}


.price-container {
  margin-top: 40px;
  padding: 20px 80px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}

.price-item-e {
  flex: 1;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 2px 17px 21px 4px rgba(120, 120, 120, 0.4);
  border: 1px solid rgba(128, 128, 128, 0.2);
  position: relative;
  cursor: pointer;
  padding: 20px 0;
  background-color: #FFFFFF;
  text-align: center;
}

.price-item-e:hover {
  transform: scale(1.05);
  z-index: 990;
  background-color: #FF2870;
  color: #FFFFFF;
}

.price-item-e:hover .price-item-actual-money{
  color: #FFFFFF;
}
.price-item-b {
  flex: 1;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 2px 17px 21px 4px rgba(120, 120, 120, 0.4);
  border: 1px solid rgba(128, 128, 128, 0.2);
  position: relative;
  cursor: pointer;
  padding: 20px 0;
  background-color: #FFFFFF;
  text-align: center;
}

.price-item-b:hover {
  transform: scale(1.05);
  z-index: 990;
  background-color: #00b3d2;
  color: #FFFFFF;
}

.price-item-b:hover .price-item-actual-money{
  color: #FFFFFF;
}
.price-item-v {
  flex: 1;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 2px 17px 21px 4px rgba(120, 120, 120, 0.4);
  border: 1px solid rgba(128, 128, 128, 0.2);
  position: relative;
  cursor: pointer;
  padding: 20px 0;
  background-color: #FFFFFF;
  text-align: center;
}

.price-item-v:hover {
  transform: scale(1.05);
  z-index: 990;
  background-color: #8E134C;
  color: #FFFFFF;
}

.price-item-v:hover .price-item-actual-money{
  color: #FFFFFF;
}


.price-basic {

}

.price-pro-e {
  background-color: #FF2870;
  transform: scale(1.05);
  z-index: 990;
  color:#ffffff;
}


.price-pro-e .price-item-actual-money{
  color:#FFFFFF;
}

.price-pro-b {
background-color: #00B2D2;
  transform: scale(1.05);
  z-index: 990;
color:#ffffff;
}


.price-pro-b .price-item-actual-money{
color:#FFFFFF;
}

.price-pro-v {
background-color: #8E134C;
  transform: scale(1.05);
  z-index: 990;
color:#ffffff;
}


.price-pro-v .price-item-actual-money{
color:#FFFFFF;
}


.price-plus {
  /*background-color: #8E134C;*/
}

.price-item-label {
  font-size: 24px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}

.price-item-money-mask {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.price-item-money-mask-money {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 24px;
  //letter-spacing: 2px;
  padding: 10px 0;
  font-weight: bold;
}

.price-item-money-mask-sjx {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: rgba(0, 0, 0, 0.1) transparent transparent transparent;
}

.price-item-actual-money {
  color: #3588AB;
  font-size: 12px;
  font-weight: bold;
}

.price-item-content {
  padding: 0 20px 20px 20px;
  text-align: left;
}

.price-item-content-label {
  font-size: 16px;
  font-weight: bold;
}

.price-item-content-content{
  padding-top:10px;
  //padding-left: 20px;
}

.price-purchase {
  position: absolute;
  bottom: -20px;
  left: 0;
  right: 0;
  margin: auto;
}

.price-purchase-btn {
  font-size: 16px;
  font-weight: bold;
  padding: 10px 60px;
  background-color: #B1C452;
  color: #FFFFFF;
}

.price-help-container {
  margin-top: 40px;
  font-size: 14px;
  text-align: center;
}

.price-help-container span {
  color: #00b3d2;
  text-decoration: underline;
  cursor:pointer;
}

.faq-row {
  background-color: #FFFFFF;
  padding: 40px;
}
.faq-label-container{
  text-align: center;
}

.faq-content-container {
  width: 60%;
  margin: 40px auto 80px ;

}

.paypal-btn{
  border: 1px solid #EEEEEE;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.1);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
}

.paypal-btn:hover{
  border: 1px solid #00b3d2;
}

.paypal-logo-img{
  width: 100%;
  transform: scale(0.8);
}

</style>
