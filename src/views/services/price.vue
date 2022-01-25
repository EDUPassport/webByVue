<template>
  <div class="price-bg">
    <el-row class="banner-row" :gutter="0" align="middle" justify="center">
      <el-col class="banner-bg" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <h1>Pricing</h1>
      </el-col>
    </el-row>

    <el-row class="price-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
<!--        v-if="identity == 2"-->
        <div class="price-label" >
          <div class="price-label-icon"></div>
          <h1>Pricing Table</h1>
        </div>
        <div class="price-container" v-if="identity == 2">
          <div class="price-item price-basic">
            <div class="price-item-label">Basic</div>
            <div class="price-item-money-mask">
              $0
            </div>
            <div class="price-item-content">
              <div class="price-item-content-label">Basic Membership Includes:</div>
              <div class="price-item-content-content">
                <div class="price-item-content-item">Billingual Support</div>
                <div class="price-item-content-item">1 Job Post / Month</div>
                <div class="price-item-content-item">See Job Post Views</div>
                <div class="price-item-content-item">See Applications</div>
                <div class="price-item-content-item">Business Profile</div>
                <div class="price-item-content-item">WeChat Share</div>
                <div class="price-item-content-item">Share To Refresh Jobs</div>
                <div class="price-item-content-item">In-APP Messaging</div>
              </div>
            </div>

            <div class="price-purchase">
              <el-button  class="price-purchase-btn" round :disabled="true">Purchase</el-button>
            </div>
          </div>
          <div class="price-item price-pro">
            <div class="price-item-label">Pro</div>
            <div class="price-item-money-mask">
              $300
            </div>
            <div class="price-item-content">
              <div class="price-item-content-label">Basic Membership Includes:</div>
              <div class="price-item-content-content">
                <div class="price-item-content-item">Annual membership</div>
                <div class="price-item-content-item">8 Job Post / Month</div>
                <div class="price-item-content-item">1 Collective Member Article</div>
                <div class="price-item-content-item">1 WeChat Moment Post</div>
                <div class="price-item-content-item">1 WeChat Channel Post</div>
                <div class="price-item-content-item">1 WeChat Group Job Blast</div>
                <div class="price-item-content-item">Dedicated Account Manager</div>
                <div class="price-item-content-item">Job Expiration Notice</div>
                <div class="price-item-content-item">CSV Uploads</div>
                <div class="price-item-content-item">Direct Job Refresh</div>
                <div class="price-item-content-item">Discount Card </div>
                <div class="price-item-content-item">Advertising Discounts</div>
                <div class="price-item-content-item">Event Discounts</div>
              </div>
            </div>
            <div class="price-purchase">
              <el-button  class="price-purchase-btn" round :disabled="true">Purchase</el-button>
            </div>
          </div>
          <div class="price-item price-plus">
            <div class="price-item-label">Plus</div>
            <div class="price-item-money-mask">
              $350
            </div>
            <div class="price-item-content">
              <div class="price-item-content-label">Pro Membership Includes:</div>
              <div class="price-item-content-content">
                <div class="price-item-content-item">Unlimited Job Posts</div>
                <div class="price-item-content-item">1 Event Advert</div>
                <div class="price-item-content-item">1 Dedicated Article</div>
                <div class="price-item-content-item">1 Month Banner - Home pg.</div>
                <div class="price-item-content-item">1 Banner Advert - Job pg.</div>
                <div class="price-item-content-item">3 Job Features - Home pg.</div>
                <div class="price-item-content-item">12 Job Features - Job pg.</div>
                <div class="price-item-content-item">5 WeChat Group Job Blasts</div>
                <div class="price-item-content-item">10 Top 3 Rankings</div>
                <div class="price-item-content-item">VIP Job Posting Options</div>
                <div class="price-item-content-item">Translation Services</div>
                <div class="price-item-content-item">Job Group Access</div>
                <div class="price-item-content-item">Priority Support</div>
              </div>
            </div>
            <div class="price-purchase">
              <el-button  class="price-purchase-btn" round :disabled="true">Purchase</el-button>
            </div>
          </div>
        </div>

<!--        vendor-->
        <div class="price-container" v-if="identity == 3" >
          <div class="price-item price-basic">
            <div class="price-item-label">Basic</div>
            <div class="price-item-money-mask">
              $0
            </div>
            <div class="price-item-content">
              <div class="price-item-content-label">Basic Membership Includes:</div>
              <div class="price-item-content-content">
                <div class="price-item-content-item">1 Deal</div>
                <div class="price-item-content-item">Annual Membership</div>
                <div class="price-item-content-item">Dedicated Account Manager</div>
                <div class="price-item-content-item">Deal Program Visibility</div>
                <div class="price-item-content-item">Discount Card Access</div>
                <div class="price-item-content-item">In-APP Messaging</div>
                <div class="price-item-content-item">WeChat Share</div>
              </div>
            </div>

            <div class="price-purchase">
              <el-button  class="price-purchase-btn" round :disabled="true">Purchase</el-button>
            </div>
          </div>
          <div class="price-item price-pro">
            <div class="price-item-label">Pro</div>
            <div class="price-item-money-mask">
              $300
            </div>
            <div class="price-item-content">
              <div class="price-item-content-label">Basic Membership Includes:</div>
              <div class="price-item-content-content">
                <div class="price-item-content-item">2 Deals</div>
                <div class="price-item-content-item">8 Event Postings</div>
                <div class="price-item-content-item">1 Collective Member Article</div>
                <div class="price-item-content-item">Quarterly WeChat Moments</div>
                <div class="price-item-content-item">1 WeChat Channel Post</div>
                <div class="price-item-content-item">1 Month Article Banner</div>
                <div class="price-item-content-item">2 Social Media Posts</div>
                <div class="price-item-content-item">3 Days APP Top Ranking</div>
                <div class="price-item-content-item">Sponsorship Discounts</div>
                <div class="price-item-content-item">Start-Up & Female Owned Discounts</div>

              </div>
            </div>
            <div class="price-purchase">
              <el-button  class="price-purchase-btn" round :disabled="true">Purchase</el-button>
            </div>

          </div>
          <div class="price-item price-plus">
            <div class="price-item-label">Plus</div>
            <div class="price-item-money-mask">
              $350
            </div>
            <div class="price-item-content">
              <div class="price-item-content-label">Pro Membership Includes:</div>
              <div class="price-item-content-content">
                <div class="price-item-content-item">3 Deals</div>
                <div class="price-item-content-item">15 Event Postings</div>
                <div class="price-item-content-item">1 Dedicated Member Article</div>
                <div class="price-item-content-item">Monthly WeChat Moments</div>
                <div class="price-item-content-item">Quarterly WeChat Channel</div>
                <div class="price-item-content-item">3 Months Article Banner</div>
                <div class="price-item-content-item">1 Month Banner - Deal pg.</div>
                <div class="price-item-content-item">1 Month Feature - Home pg.</div>
                <div class="price-item-content-item">1 Week Top 3 Ranking</div>
                <div class="price-item-content-item">Priority Support</div>

              </div>
            </div>
            <div class="price-purchase">
              <el-button  class="price-purchase-btn" round :disabled="true">Purchase</el-button>
            </div>

          </div>
        </div>


      </el-col>
    </el-row>

  </div>
</template>

<script>
import {useStore} from "vuex";

export default {
  name: "price",
  setup(){
    const store = useStore()
    const identity = store.state.identity
    console.log(identity)
    return {
      identity
    }
  }
}
</script>

<style scoped>
.price-bg{
  background-color: #f5f6f7;
}

.banner-bg{
  height: 200px;
  background-image: url("../../assets/bg/wheat.png");
  background-size:50%;
  background-repeat: repeat;
  background-position: center;
}

.banner-bg h1{
  height: 100%;
  background-color: rgba(0,0,0,0.2);
  font-size: 28px;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 200px;
}

.price-row{
  width: 1100px;
  margin: 0 auto;
  padding: 40px 0 100px 0;
}

.price-label{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 40px;
}

.price-label-icon{
  width: 6px;
  height: 40px;
  border-radius: 6px;
  background-color: #00b3d2;
}

.price-label h1{
  margin-left: 10px;
}

.price-container{
  padding: 20px 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.price-item{
  flex: 1;
  margin: 10px;
  border-radius: 20px;
  box-shadow: 2px 17px 21px 4px rgba(0,0,0,0.81);
  color: #FFFFFF;
  position: relative;
  cursor: pointer;
  padding: 20px 0;
}

.price-item:hover{
  transform: scale(1.2);
  z-index: 1000;
}

.price-basic{
  background-color: #FF2870;
}
.price-pro{
  background-color: #00B2D2;
}
.price-plus{
  background-color: #8E134C;
}
.price-item-label{
  font-size: 24px;
  font-weight: bold;
  padding: 20px 0 10px 0;
}
.price-item-money-mask{
  background-color: rgba(255,255,255,0.2);
  font-size: 22px;
  padding: 10px 0;
  font-weight: bold;
}

.price-item-content{
  padding: 20px;
  text-align: left;
}

.price-item-content-label{
  font-size: 16px;
  font-weight: bold;
}
.price-item-content-item{
  padding:4px 0 4px 20px;
  font-size: 16px;

}

.price-purchase{
  position: absolute;

  bottom: -20px;
  left: 0;
  right: 0;
  margin:  auto;

}

.price-purchase-btn{
  font-size: 14px;
  font-weight: bold;
  padding: 0 60px;
}

</style>