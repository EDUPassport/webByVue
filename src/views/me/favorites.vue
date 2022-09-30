<template>
  <div class="bg">
    <div class="favorites-container">
      <div class="favorites-l">
        <meSideMenu></meSideMenu>
      </div>
      <div class="favorites-r">

        <div class="favorites-r-bg">

          <div class="favorites-label">
            FAVORITED
          </div>

          <div class="list-container">
            <template v-if="favoriteData.length>0">
              <div class="list-item-bg" v-for="(item,i) in favoriteData" :key="i">

                <div class="list-item" >
                  <div class="list-item-l">
                    <el-avatar class="list-item-l-img" :src="item.type_url"></el-avatar>
                  </div>
                  <div class="list-item-r">
                    <div class="list-item-r-t">
                      <router-link v-if="item.type==1" :to="{path:'/jobs/detail',query:{id:item.type_id}}">
                        {{ item.type_title }}
                      </router-link>
                      <router-link v-if="item.type==2" :to="{path:'/deals/detail',query:{id:item.type_id}}">
                        {{ item.type_title }}
                      </router-link>
                    </div>
                  </div>
                  <div class="list-item-type">
                    <span v-if="item.type==1">Job</span>
                    <span v-if="item.type==2">Deal</span>
                  </div>
                  <div class="list-item-favorite-icon-container"
                       @click="cancelFavorite(item.type,item.type_id)">
                    <el-icon color="#6650B3" :size="25">
                      <IconFontistoFavorite />
                    </el-icon>
                  </div>
                </div>

              </div>

            </template>

            <template v-else>
              <div class="empty-tips">
                You have no favorites yet. <br>
                Click on the
                <el-icon >
                  <CollectionTag />
                </el-icon>
                on any job, event or deal to favorite it.
              </div>
            </template>
          </div>

          <div class="list-pagination-container" v-if="favoriteData.length>0">
            <el-pagination layout="prev, pager, next" :default-current-page="1"
                           class="list-pagination"
                           @size-change="pageSizeChange"
                           @current-change="pageChange"
                           :current-page="page" :page-size="limit"
                           :total="totalNum"></el-pagination>
          </div>
          <!--          <div class="ads-container">-->
          <!--            <el-image :src="dashboardAdsImg"></el-image>-->
          <!--          </div>-->

<!--          <div class="xll-ads-container xll-ads-container-margin" v-if="adsDataTop.length>0">-->
<!--            <el-carousel height="220px" indicator-position="none">-->
<!--              <el-carousel-item class="xll-ads-swiper-item" v-for="(item,i) in adsDataTop" :key="i">-->
<!--                <div class="xll-ads-l">-->
<!--                  <el-avatar class="xll-ads-l-img"-->
<!--                             :src="item.user_url !='' ? item.user_url : item.url"></el-avatar>-->
<!--                </div>-->
<!--                <div class="xll-ads-r">-->
<!--                  <h4>Advertise with Us</h4>-->
<!--                  <h5>Description:</h5>-->
<!--                  <div class="xll-ads-r-desc">-->
<!--                    Your Adverts and their description will be displayed here.-->
<!--                    Just click on the banner-->
<!--                  </div>-->

<!--                </div>-->
<!--              </el-carousel-item>-->
<!--            </el-carousel>-->
<!--          </div>-->

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {GET_FAVORITE_LIST, CANCEL_FAVORITE, ADS_LIST} from "@/api/api";
import dashboardAdsImg from '@/assets/ads/2.png'
import meSideMenu from "@/components/meSideMenu";

export default {
  name: "favorites",
  components: {
    meSideMenu
  },
  data() {
    return {
      dashboardAdsImg,
      favoriteData: [],
      page: 1,
      limit: 8,
      totalNum: 0,
      adsDataTop: []
    }
  },
  mounted() {
    this.getFavoriteList(this.page, this.limit)
    this.getAdsList()
  },
  methods: {
    turnBanner(link) {
      console.log(link)
      if (link != '') {
        window.location.href = link
      } else {
        let token = localStorage.getItem('token')
        if (!token) {
          window.open('https://salesiq.zoho.com/signaturesupport.ls?widgetcode=75672d291fd9d5fcab53ffa3194f32598809c21f9b5284cbaf3493087cdd2e0d1a2010ab7b6727677d37b27582c0e9c4', '_blank')

          return;
        }
        this.$router.push('/me/ads/platform')
      }
    },
    getAdsList() {
      let ads_data = {
        page: 1,
        limit: 10000
      }
      ADS_LIST(ads_data).then(res => {
        if (res.code == 200) {
          // console.log(rs.message)
          let adsDataTop = [];
          let identity = localStorage.getItem('identity');

          if (!identity) {
            adsDataTop = res.message.filter(item => item.name == 'guest_h1');
          }
          if (identity == 1) {

            adsDataTop = res.message.filter(item => item.name == 'educator_h1');
          }
          if (identity == 2) {
            adsDataTop = res.message.filter(item => item.name == 'business_h1');
          }
          if (identity == 3) {
            adsDataTop = res.message.filter(item => item.name == 'vendor_h1');
          }

          if (adsDataTop.length > 0) {
            this.adsDataTop = adsDataTop[0].data;
          }

        }

      }).catch(err => {
        if (err.msg) {
          this.$message.error(err.msg)
        }
        if (err.message) {
          this.$message.error(err.message)
        }
      })
    },
    getFavoriteList(page, limit) {
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      GET_FAVORITE_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.favoriteData = res.message.data
          // console.log(res.message.data)
          this.totalNum = res.message.total
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
    pageSizeChange(e) {
      console.log(e)
    },
    pageChange(e) {
      this.page = e
      this.getFavoriteList(e, this.limit)
      console.log(e)
    },
    cancelFavorite(type, typeId) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.getFavoriteList()
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
    }

  }
}
</script>

<style scoped>
.bg {
  background-color: #f5f6f7;
}

.favorites-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.favorites-l{

}

.favorites-r{
  width: calc(100% - 260px);
  height: calc(100vh - 240px);
  padding: 50px;
}

.favorites-r-bg{
  padding: 50px;
  background-color: #FFFFFF;
  box-shadow: 0px 3px 23px #00000012;
  border-radius: 18px;
}

.favorites-label{
  font-family: BSemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.list-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.list-item-bg{
  width: 25%;
  margin-top: 25px;
}


.list-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: relative;

  margin-right: 50px;
  background-color: #F0F2F5;
  box-shadow: 0px 0px 23px #14363833;
  border-radius: 18px;
  padding: 25px;
}

.list-item:hover {
  background-color: #EEEEEE;
}

.list-item-l {
  width:70px;
  text-align: center;
}

.list-item-l-img {
  width: 70px;
  height: 70px;
  border-radius: 70px;
  border: 1px solid #EEEEEE;
}

.list-item-r {
  width: calc(100% - 85px);

}

.list-item-r-t {
  text-align: left;
}

.list-item-r-t a {
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;

  color: #262626;
  text-decoration: none;
}


.list-item-type {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  background-color: #9173ff;
  color: #FFFFFF;
  padding: 4px 10px;
  border-radius: 4px;
}

.list-item-favorite-icon-container {
  position: absolute;
  top: 0;
  right: 20px;

}

.list-item-favorite-icon {
  font-size: 24px;
  cursor: pointer;

}

.list-pagination-container {
  margin-top: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-pagination {
  margin: 0 auto;
}

.ads-container {
  margin-top: 20px;
  text-align: center;
}

.empty-tips {
  font-size: 24px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  text-align: center;
  margin: 50px auto;
}


.xll-ads-container {
  padding: 20px 20px 0 20px;
}

.xll-ads-container-margin {
  margin-top: 20px;
  margin-bottom: 20px;
}

.xll-ads-swiper-item {
  cursor: pointer;
  border-radius: 10px;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.xll-ads-l {
  width: 60%;
  height: 100%;
}

.xll-ads-l-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

.xll-ads-r {
  width: 36%;
}

.xll-ads-r {
  padding-right: 4%;
}

.xll-ads-r h4 {
  color: #004956;
}

.xll-ads-r h5 {
  margin-top: 20px;
}

.xll-ads-r-desc {
  font-size: 14px;
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

@media screen and (min-width: 1200px) {


}

@media screen and (max-width: 768px) {

}


</style>
