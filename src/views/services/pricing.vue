<template>
  <div class="price-bg">

    <el-row class="price-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

        <div class="price-label-container">
          <div class="price-label-label">We have a plan for you</div>
          <div class="price-label-tips">
            We have 3 levels of annual memberships with different perks just for you! Start with basic & upgrade at
            anytime.
          </div>
        </div>

        <div class="switch-identity-container">
          <div class="switch-identity-item"
               :class="identity == 1 ? 'switch-identity-item-active' : ''"
               @click="switchIdentity(1)"
          >
            EDUCATORS
          </div>
          <div class="switch-identity-item"
               :class="identity == 2 ? 'switch-identity-item-active' : ''"
               @click="switchIdentity(2)"
          >
            EDUCATIONAL BUSINESS
          </div>
          <div class="switch-identity-item"
               :class="identity == 3 ? 'switch-identity-item-active' : ''"
               @click="switchIdentity(3)"
          >
            VENDORS
          </div>
        </div>

        <div class="price-container" v-if="identity == 1">
          <template v-for="(item,i) in vipListData" :key="i">
            <div class="price-item" v-if="item.level == 1">
              <div class="price-item-label">BASIC</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{ item.money }}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{ item.dollar }}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                  Value: ￥{{ item.original_money }}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                  Value: ${{ item.original_dollar }}
                </template>
              </div>

              <div :class="showMoreValueArr.indexOf(1) != -1 ? 'price-item-content-view-more' : 'price-item-content'">

                <div class="price-item-content-item" v-for="(i, k) in $filters.formatPriceDescription(item.desc)" :key="k">

                  <el-icon class="price-item-content-icon" :size="17">
                    <IconCarbonCheckmarkOutline />
                  </el-icon>
                  <span>
                    {{i}}
                  </span>

                </div>

                <div :class="showMoreValueArr.indexOf(1) != -1 ? 'price-item-view-more-none' :  'price-item-view-more'" >
                  <el-button class="price-item-view-more-btn" link
                             @click="viewMore(1)"
                  >
                    view more
                    <el-icon :size="20" style="margin-left: 10px;">
                      <IconPhCaretCircleDown />
                    </el-icon>
                  </el-button>
                </div>

              </div>


              <div class="price-purchase">
                <el-button  type="primary"  class="price-purchase-btn"  @click="zohoContactUs()" round>
                  Sign up
                </el-button>
              </div>

            </div>
            <div class="price-item" v-if="item.level == 2">
              <div class="price-item-label">PRO</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{ item.money }}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{ item.dollar }}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                  Value: ￥{{ item.original_money }}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                  Value: ${{ item.original_dollar }}
                </template>
              </div>
              <div :class="showMoreValueArr.indexOf(2) != -1 ? 'price-item-content-view-more' : 'price-item-content'">
                <div class="price-item-content-item" v-for="(i, k) in $filters.formatPriceDescription(item.desc)" :key="k">
                  <el-icon class="price-item-content-icon" :size="17">
                    <IconCarbonCheckmarkOutline />
                  </el-icon>
                  <span>
                    {{i}}
                  </span>
                </div>
                <div :class="showMoreValueArr.indexOf(2) != -1 ? 'price-item-view-more-none' :  'price-item-view-more'" >
                  <el-button class="price-item-view-more-btn" link
                             @click="viewMore(2)"
                  >
                    view more
                    <el-icon :size="20" style="margin-left: 10px;">
                      <IconPhCaretCircleDown />
                    </el-icon>
                  </el-button>
                </div>

              </div>
              <div class="price-purchase">
                <el-button type="primary" class="price-purchase-btn"  round @click="purchase(item.id,item.dollar,item.level_en)">
                  Select this plan
                </el-button>
              </div>
            </div>
            <div class="price-item" v-if="item.level == 3">
              <div class="price-item-label">PLUS</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{ item.money }}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{ item.dollar }}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                  Value: ￥{{ item.original_money }}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                  Value: ${{ item.original_dollar }}
                </template>
              </div>
              <div :class="showMoreValueArr.indexOf(3) != -1 ? 'price-item-content-view-more' : 'price-item-content'">
                <div class="price-item-content-item" v-for="(i, k) in $filters.formatPriceDescription(item.desc)" :key="k">
                  <el-icon class="price-item-content-icon" :size="17">
                    <IconCarbonCheckmarkOutline />
                  </el-icon>
                  <span>
                    {{i}}
                  </span>
                </div>

                <div :class="showMoreValueArr.indexOf(3) != -1 ? 'price-item-view-more-none' :  'price-item-view-more'" >
                  <el-button class="price-item-view-more-btn" link
                             @click="viewMore(3)"
                  >
                    view more
                    <el-icon :size="20" style="margin-left: 10px;">
                      <IconPhCaretCircleDown />
                    </el-icon>
                  </el-button>
                </div>

              </div>
              <div class="price-purchase">
                <el-button type="primary" class="price-purchase-btn"  round @click="purchase(item.id,item.dollar,item.level_en)">
                  Select this plan
                </el-button>
              </div>
            </div>

          </template>

        </div>


        <div class="price-container" v-if="identity == 2">

          <template v-for="(item,i) in vipListData" :key="i">
            <div class="price-item" v-if="item.level == 1">
              <div class="price-item-label">BASIC</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{ item.money }}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{ item.dollar }}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                  Value: ￥{{ item.original_money }}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                  Value: ${{ item.original_dollar }}
                </template>
              </div>
              <div :class="showMoreValueArr.indexOf(4) != -1 ? 'price-item-content-view-more' : 'price-item-content'">
                <div class="price-item-content-item" v-for="(i, k) in $filters.formatPriceDescription(item.desc)" :key="k">
                  <el-icon class="price-item-content-icon" :size="17">
                    <IconCarbonCheckmarkOutline />
                  </el-icon>
                  <span>
                    {{i}}
                  </span>
                </div>

                <div :class="showMoreValueArr.indexOf(4) != -1 ? 'price-item-view-more-none' :  'price-item-view-more'">
                  <el-button class="price-item-view-more-btn" link
                             @click="viewMore(4)"
                  >
                    view more
                    <el-icon :size="20" style="margin-left: 10px;">
                      <IconPhCaretCircleDown />
                    </el-icon>
                  </el-button>
                </div>

              </div>

              <div class="price-purchase">
                <el-button type="primary" class="price-purchase-btn"  @click="zohoContactUs()" round>
                  Sign up
                </el-button>
              </div>
            </div>
            <div class="price-item" v-if="item.level == 2">
              <div class="price-item-label">PRO</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{ item.money }}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{ item.dollar }}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                  Value: ￥{{ item.original_money }}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                  Value: ${{ item.original_dollar }}
                </template>
              </div>
              <div :class="showMoreValueArr.indexOf(5) != -1 ? 'price-item-content-view-more' : 'price-item-content'">
                <div class="price-item-content-item" v-for="(i, k) in $filters.formatPriceDescription(item.desc)" :key="k">
                  <el-icon class="price-item-content-icon" :size="17">
                    <IconCarbonCheckmarkOutline />
                  </el-icon>
                  <span>
                    {{i}}
                  </span>
                </div>

                <div :class="showMoreValueArr.indexOf(5) != -1 ? 'price-item-view-more-none' :  'price-item-view-more'" >
                  <el-button class="price-item-view-more-btn" link
                             @click="viewMore(5)"
                  >
                    view more
                    <el-icon :size="20" style="margin-left: 10px;">
                      <IconPhCaretCircleDown />
                    </el-icon>
                  </el-button>
                </div>

              </div>
              <div class="price-purchase">
                <el-button type="primary" class="price-purchase-btn"  round @click="purchase(item.id,item.dollar,item.level_en)">
                  Select this plan
                </el-button>
              </div>
            </div>
            <div class="price-item" v-if="item.level == 3">
              <div class="price-item-label">PLUS</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{ item.money }}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{ item.dollar }}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                  Value: ￥{{ item.original_money }}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                  Value: ${{ item.original_dollar }}
                </template>
              </div>
              <div :class="showMoreValueArr.indexOf(6) != -1 ? 'price-item-content-view-more' : 'price-item-content'">
                <div class="price-item-content-item" v-for="(i, k) in $filters.formatPriceDescription(item.desc)" :key="k">
                  <el-icon class="price-item-content-icon" :size="17">
                    <IconCarbonCheckmarkOutline />
                  </el-icon>
                  <span>
                    {{i}}
                  </span>
                </div>

                <div :class="showMoreValueArr.indexOf(6) != -1 ? 'price-item-view-more-none' :  'price-item-view-more'" >
                  <el-button class="price-item-view-more-btn" link
                             @click="viewMore(6)"
                  >
                    view more
                    <el-icon :size="20" style="margin-left: 10px;">
                      <IconPhCaretCircleDown />
                    </el-icon>
                  </el-button>
                </div>

              </div>
              <div class="price-purchase">
                <el-button type="primary" class="price-purchase-btn"  round @click="purchase(item.id,item.dollar,item.level_en)">
                  Select this plan
                </el-button>
              </div>
            </div>

          </template>


        </div>

        <!--        vendor-->
        <div class="price-container" v-if="identity == 3">

          <template v-for="(item,i) in vipListData " :key="i">
            <div class="price-item" v-if="item.level == 1">
              <div class="price-item-label">BASIC</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{ item.money }}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{ item.dollar }}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                  Value: ￥{{ item.original_money }}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                  Value: ${{ item.original_dollar }}
                </template>
              </div>
              <div :class="showMoreValueArr.indexOf(7) != -1 ? 'price-item-content-view-more' : 'price-item-content'">
                <div class="price-item-content-item" v-for="(i, k) in $filters.formatPriceDescription(item.desc)" :key="k">
                  <el-icon class="price-item-content-icon" :size="17">
                    <IconCarbonCheckmarkOutline />
                  </el-icon>
                  <span>
                    {{i}}
                  </span>
                </div>

                <div :class="showMoreValueArr.indexOf(7) != -1 ? 'price-item-view-more-none' :  'price-item-view-more'" >
                  <el-button class="price-item-view-more-btn" link
                             @click="viewMore(7)"
                  >
                    view more
                    <el-icon :size="20" style="margin-left: 10px;">
                      <IconPhCaretCircleDown />
                    </el-icon>
                  </el-button>
                </div>

              </div>

              <div class="price-purchase">
                <el-button type="primary" class="price-purchase-btn"  @click="zohoContactUs()" round>
                  Sign up
                </el-button>
              </div>
            </div>
            <div class="price-item" v-if="item.level == 2">
              <div class="price-item-label">PRO</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{ item.money }}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{ item.dollar }}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                  Value: ￥{{ item.original_money }}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                  Value: ${{ item.original_dollar }}
                </template>
              </div>
              <div :class="showMoreValueArr.indexOf(8) != -1 ? 'price-item-content-view-more' : 'price-item-content'">
                <div class="price-item-content-item" v-for="(i, k) in $filters.formatPriceDescription(item.desc)" :key="k">
                  <el-icon class="price-item-content-icon" :size="17">
                    <IconCarbonCheckmarkOutline />
                  </el-icon>
                  <span>
                    {{i}}
                  </span>
                </div>

                <div :class="showMoreValueArr.indexOf(8) != -1 ? 'price-item-view-more-none' :  'price-item-view-more'" >
                  <el-button class="price-item-view-more-btn" link
                             @click="viewMore(8)"
                  >
                    view more
                    <el-icon :size="20" style="margin-left: 10px;">
                      <IconPhCaretCircleDown />
                    </el-icon>
                  </el-button>
                </div>

              </div>
              <div class="price-purchase">
                <el-button type="primary" class="price-purchase-btn"  round @click="purchase(item.id,item.dollar,item.level_en)">
                  Select this plan
                </el-button>
              </div>

            </div>
            <div class="price-item" v-if="item.level==3">
              <div class="price-item-label">PLUS</div>
              <div class="price-item-money-mask">
                <div class="price-item-money-mask-money">
                  <template v-if="envName==='developmentCN' || envName==='productionCN'">
                    ￥{{ item.money }}/yr
                  </template>
                  <template v-if="envName==='development' || envName==='production'">
                    ${{ item.dollar }}/yr
                  </template>
                </div>
                <div class="price-item-money-mask-sjx"></div>
              </div>
              <div class="price-item-actual-money">
                <template v-if="envName==='developmentCN' || envName==='productionCN'">
                  Value: ￥{{ item.original_money }}
                </template>
                <template v-if="envName==='development' || envName==='production'">
                  Value: ${{ item.original_dollar }}
                </template>
              </div>
              <div :class="showMoreValueArr.indexOf(9) != -1 ? 'price-item-content-view-more' : 'price-item-content'">
                <div class="price-item-content-item" v-for="(i, k) in $filters.formatPriceDescription(item.desc)" :key="k">
                  <el-icon class="price-item-content-icon" :size="17">
                    <IconCarbonCheckmarkOutline />
                  </el-icon>
                  <span>
                    {{i}}
                  </span>
                </div>

                <div :class="showMoreValueArr.indexOf(9) != -1 ? 'price-item-view-more-none' :  'price-item-view-more'">
                  <el-button class="price-item-view-more-btn" link
                             @click="viewMore(9)"
                  >
                    view more
                    <el-icon :size="20" style="margin-left: 10px;">
                      <IconPhCaretCircleDown />
                    </el-icon>
                  </el-button>
                </div>

              </div>
              <div class="price-purchase">
                <el-button type="primary" class="price-purchase-btn"  round @click="purchase(item.id,item.dollar,item.level_en)">
                  Select this plan
                </el-button>
              </div>

            </div>

          </template>

        </div>

      </el-col>
    </el-row>

    <newFooter></newFooter>

  </div>
</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";
// import {loadScript} from '@paypal/paypal-js'
import {MEMBER_VIP_LIST} from "@/api/api";
import paypalLogoImg from '@/assets/pay/paypal-logo.png'
import newFooter from "@/layout/components/newFooter";

export default {
  name: "price",
  components:{
    newFooter
  },
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
  data() {
    return {
      paypalLogoImg,
      paypalUrl: '',
      vipListData: [],
      showMoreValueArr: []
    }
  },
  mounted() {
    let token = localStorage.getItem('token')

    if (token) {
      this.getVipList(this.identity)
    } else {
      this.identity = 1
      this.getVipList(1)
    }

  },
  methods: {
    viewMore(value){
      console.log(value)
      let index = this.showMoreValueArr.indexOf(value)
      if(index == -1){
        this.showMoreValueArr.push(value)
      }else{
        this.showMoreValueArr.splice(index,1)
      }
    },
    getVipList(identity) {
      let params = {
        identity: identity,
        token: localStorage.getItem('token')
      }

      MEMBER_VIP_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.vipListData = res.message
        }

      }).catch(err => {
        console.log(err)
      })
    },
    switchIdentity(value) {
      // console.log(value)
      this.identity = value
      this.getVipList(value)
    },
    paypalToPay() {
      window.open(this.paypalUrl, '_blank')
    },
    purchase(id, amount, level_en) {

      let token = localStorage.getItem('token')

      if (!token || token === '') {
        return this.$router.push({
          path: '/login',
          query: {}
        })
      }

      this.paypalVisible = true

      let product = id
      let shipping = 0
      let desc = level_en
      let levelId = id
      let identity = this.identity
      let userId = localStorage.getItem('uid')

      let apiDomain = process.env.VUE_APP_URL
      this.paypalUrl = apiDomain + 'pay/paypal?product=' + product + '&price=' + amount + '&shipping=' + shipping + '&desc=' + desc
          + '&level_id=' + levelId + '&identity=' + identity + '&user_id=' + userId

    },
    zohoContactUs() {
      window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')
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

.price-label-container {
  margin-top: 40px;
  text-align: center;
}

.price-label-label{
  font-size: 40px;
  font-family: Montserrat Regular , Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;

}

.price-label-tips {
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 20px;
  margin-top: 25px;
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
  font-size: 30px;
  cursor: pointer;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  height: 40px;
  padding: 4px 25px;
  border-radius: 48px;
}
.switch-identity-item-active{
  background-color: #9173FF;
  color: #ffffff;
}

.price-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin: 70px auto;

}

.price-item {
  width: 400px;

  margin: 25px;
  border-radius: 18px;
  box-shadow: 0px 0px 23px #00000012;

  padding: 50px 50px 0 50px;
  background-color: #FFFFFF;

}

.price-item:hover {
  transform: scale(1.05);
  z-index: 990;
  background-color: #6648FF;
  color: #FFFFFF;
}

.price-item:hover .price-item-actual-money {
  color: #FFFFFF;
}

.price-item:hover .price-item-view-more{
  background-color: #6648FF;
}

.price-item:hover .price-item-view-more-btn{
  color: #FFFFFF;
}

.price-item-label {
  font-size: 28px;
  font-family: "Cabin SemiBold",  Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.price-item-money-mask {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 25px;
}

.price-item-money-mask-money {
   font-family: "Montserrat Regular", Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 40px;
}

.price-item-actual-money {
  color: #9173FF;
  font-size: 28px;
  font-family: "Montserrat Regular", Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  margin-top: 25px;
  text-decoration: line-through;
}

.price-item-content-view-more{
  margin: 50px auto 0;
  overflow: hidden;
  position: relative;
}

.price-item-view-more-none{
  display: none;
}

.price-item-content {
  margin: 50px auto 0;
  height: 570px;
  overflow: hidden;
  position: relative;
}

.price-item-view-more{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FFFFFF;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
}



.price-item-content-item{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 15px;
}

.price-item-content-icon{
  margin-top: 6px;
}

.price-item-content-item span {
  font-family: AssiRegular , Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 26px;
  margin-left: 10px;
}

.price-purchase {
  height: 120px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-top: 1px solid #B3B3B3;
}

.price-purchase-btn:hover {
  background-color: #59EDF7;
  color: #262626;
}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {
  .price-row{
    padding: 0;

  }

  .price-label-container{
    margin-top: 0;
    padding: 25px;
  }

  .price-label-label{
    font-size: 32px;
    text-align: left;
    font-weight: bold;
  }

  .price-label-tips{
    font-size: 16px;
    text-align: left;
  }

  .switch-identity-container{
    margin-top: 25px;
    /*padding: 0 20px;*/
  }

  .switch-identity-item{
    font-size: 12px;
    font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    height: 18px;
    padding: 6px 14px;
    margin: 5px;
    border-radius: 30px;
  }

  .price-container{
    margin: 25px auto;
    flex-direction: column;
  }

  .price-item{
    width: calc(100% - 100px);
    margin: 0 auto 25px;
    padding: 25px 25px 0 25px;
  }

  .price-item-label{
    font-size: 18px;
  }

  .price-item-money-mask{
    margin-top: 15px;
  }

  .price-item-money-mask-money{
    font-size: 18px;
  }

  .price-item-actual-money{
    margin-top: 15px;
    font-size: 18px;
  }

  .price-item-content{
    margin: 15px auto 0;
  }

  .price-item-content-view-more{
    margin: 15px auto 0;
  }

  .price-item-content-item{
    margin-bottom: 10px;
  }

  .price-item-content-icon{
    margin-top: 2px;
  }

  .price-item-content-item span{
    font-size: 16px;
  }

  .price-purchase{
    height: 80px;
  }

}

</style>
