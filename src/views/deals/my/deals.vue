<template>
  <div class="bg">
    <div class="profile-container">
      <div class="profile-l-container">
        <meSideMenu></meSideMenu>
      </div>
      <div class="profile-r-container">

        <el-scrollbar class="profile-r-bg-container">

          <div class="deals-list-container">

            <div class="deals-list-t">
              <div class="deals-list-label">My Deals</div>
              <div class="deals-list-t-r">
                <el-button type="primary"
                           class="post-deal-btn"
                           round
                           @click="postDeal()">
                  Offer a Deal
                </el-button>
              </div>
            </div>

            <div class="deals-list-content">

              <div class="deals-item-container"
                   v-for="(item,index) in dealsListData" :key="index"
              >

                <div class="deals-item">
                  <div class="deals-item-bg">
                    <el-image
                        class="deals-item-background-img"
                        :src="item.company_info.background_image ? item.company_info.background_image : ''"
                        fit="cover"
                    >
                      <template #error>
                        <div class="img-slot-background">
                          <el-icon :size="80" color="#808080">
                            <Picture/>
                          </el-icon>
                        </div>
                      </template>
                    </el-image>

                    <div class="list-item-tag actived-0" v-if="item.status==0">
                      Pending
                    </div>
                    <div class="list-item-tag actived-1" v-if="item.status==1">
                      Active
                    </div>
                    <div class="list-item-tag actived-2" v-if="item.status==2">
                      Rejected
                    </div>

                  </div>
                  <div class="deals-item-c">
                    <div class="deals-item-c-l">
                      <el-avatar class="deals-logo" :src="item.company_logo"></el-avatar>
                    </div>
                    <div class="deals-item-c-r">
                      <div class="deals-item-c-r-1">
                        {{ item.company_name }}
                      </div>
                      <div class="deals-item-c-r-2">
                        {{ item.title }}
                      </div>
                    </div>
                  </div>

                  <div class="deals-item-b">
                    <div class="deals-item-b-l">

                      <template v-if="item.company_info.category_name_en && item.company_info.category_name_en != '0'">
                        {{ item.company_info.category_name_en }}
                      </template>
                      <template v-else>
                        unknown
                      </template>

                    </div>
                    <div class="deals-item-b-r">
                      <el-button link @click="turnEditDeal(item.id)">
                        EDIT
                      </el-button>
                      <el-button link @click="turnDealDetail(item.id)">
                        DETAILS
                      </el-button>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
          <div class="deals-pagination">
            <el-pagination layout="prev, pager, next" :default-current-page="1"
                           @size-change="dealPageSizeChange"
                           @current-change="dealPageChange"
                           :current-page="dealPage" :page-size="dealLimit"
                           :total="dealTotalNum"></el-pagination>
          </div>

        </el-scrollbar>

      </div>

    </div>
  </div>
</template>

<script>

import meSideMenu from "@/components/meSideMenu";
import {MY_DEALS} from '@/api/api';
import {updateWindowHeight} from "@/utils/tools";

export default {
  name: "deals",
  components: {
    meSideMenu
  },
  data() {
    return {
      userInfo: {},
      basicUserInfo: {},
      dealsListData: [],
      dealPage: 1,
      dealLimit: 10,
      dealTotalNum: 0,
    }
  },
  unmounted() {
    updateWindowHeight()
    window.onresize = null
  },
  mounted() {

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


    this.getMyDeals(this.dealPage, this.dealLimit)
  },
  methods: {
    postDeal() {
      this.$router.push({
        path: '/deals/offer', query: {}
      })
    },
    turnDealDetail(id) {
      this.$router.push({
        path: '/deals/detail', query: {
          id: id
        }
      })
    },
    turnEditDeal(id) {
      this.$router.push({path: '/deals/offer', query: {deal_id: id}})
    },
    dealPageSizeChange(e) {
      console.log(e)
    },
    dealPageChange(e) {
      this.jobPage = e
      this.getMyDeals(e, this.dealLimit)
      console.log(e)
    },
    getMyDeals(page, limit) {
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      MY_DEALS(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.dealsListData = res.message.data
          // console.log(res.message.data)
          this.dealTotalNum = res.message.total
        } else {
          console.log(res.msg)
        }
      }).catch(err => {
        console.log(err)
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })

    },

  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.profile-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.profile-l-container {

}

.profile-r-container {
  padding: 50px;
  width: calc(100% - 260px);
  height: calc(100vh - 240px);
}

.profile-r-bg-container {
  width: 100%;
  height: calc(100vh - 240px);
  background-color: #FFFFFF;
  border-radius: 18px;
  box-shadow: 0 3px 23px #00000012;
}

.deals-list-container {
  padding: 25px 50px;
}

.deals-list-t {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.deals-list-label {
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;

}

.post-deal-btn {
  font-size: 20px;
}

.deals-list-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.deals-item-container {
  width: 33%;
  margin-top: 25px;
}

.deals-item {
  width: 95%;
  box-shadow: 0px 0px 10px #0000001A;
  border-radius: 40px;

  overflow: hidden;
  border: 1px solid #eeeeee;
  background-color: #ffffff;
  position: relative;

}

.list-item-tag {
  position: absolute;
  top: 8px;
  right: -60px;
  color: #FFFFFF;
  transform: rotate(30deg);
  padding: 4px 80px 4px 160px;
  text-align: center;
  font-size: 14px;
}

.actived-0 {
  background-color: #00B3D2;
}

.actived-1 {
  background-color: #B1C452;
}

.actived-2 {
  background-color: #FF2870;
}


.deals-item-bg {
  height: 240px;
  border-radius: 40px;

  background-color: #faf7f7;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  overflow: hidden;

  position: relative;
}

.deals-item-background-img {
  width: 100%;
  height: 100%;
}

.deals-item-c {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 25px;
}

.deals-logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid #EEEEEE;
  background-color: #FFFFFF;
}

.deals-item-c-r {
  margin-left: 25px;
}

.deals-item-c-r-1 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
  cursor: pointer;
}

.deals-item-c-r-2 {
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 24px;
  color: #262626;
  cursor: pointer;
}

.deals-item-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px 25px 25px;

}

.deals-item-b-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.deals-item-b-l {
  text-align: left;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.deals-item-b-r {
  font-size: 12px;
  color: #808080;
  padding-right: 20px;
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.deals-pagination {
  margin-top: 25px;
  display: flex;
  justify-content: center;
}

.img-slot-background {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #faf7f7;
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {
  .profile-r-container {
    width: 100%;
    padding: 0;
    height: calc( var(--i-window-height) - 160px);
  }

  .profile-r-bg-container {
    background-color: #F0F2F5;
    border-radius: 0;
    box-shadow: none;
    height: calc( var(--i-window-height) - 160px);

  }

  .deals-list-container{
    padding: 15px;
  }

  .deals-list-label{
    font-size: 18px;
  }
  .post-deal-btn{
    font-size: 12px;
  }

  .deals-list-content{
    flex-direction: column;
  }

  .deals-item-container{
    width: 100%;
    margin-top: 15px;
  }

  .deals-item{
    width: 100%;
  }

  .deals-item-bg{
    height:140px;
  }

  .deals-item-c{
    padding: 15px;
  }

  .deals-logo{
    width:40px;
    height: 40px;
  }

  .deals-item-c-r{
    margin-left: 15px;
  }

  .deals-item-c-r-1{
    font-size: 14px;
  }

  .deals-item-c-r-2{
    font-size: 18px;
  }

  .deals-item-b{
    padding: 0 15px 15px 15px;
  }
  .deals-item-b-l{
    font-size: 12px;
  }


}
</style>
