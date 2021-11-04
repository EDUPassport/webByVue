<template>
  <div class="bg">
    <div class="favorites-container">
      <el-row align="top" justify="center">
        <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
          <meSideMenu></meSideMenu>
        </el-col>
        <el-col class="list-col" :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
          <div class="list-container" v-if="favoriteData.length>0">
            <div class="list-item" v-for="(item,i) in favoriteData" :key="i">
              <div class="list-item-l">
                <el-image class="list-item-l-img" :src="item.type_url"></el-image>
              </div>
              <div class="list-item-r">
                <div class="list-item-r-t">
                 <router-link v-if="item.type==1" :to="{path:'/jobs/detail',query:{id:item.type_id}}"> {{item.type_title}}</router-link>
                 <router-link v-if="item.type==2" :to="{path:'/deals/detail',query:{id:item.type_id}}"> {{item.type_title}}</router-link>
                </div>
              </div>
              <div class="list-item-type">
                <span v-if="item.type==1">Job</span>
                <span v-if="item.type==2">Deal</span>
              </div>
              <div class="list-item-favorite-icon-container" @click="cancelFavorite(item.type,item.type_id)">
                <i class="iconfont el-icon-alixll-heart-filled list-item-favorite-icon"></i>
              </div>
            </div>
          </div>
          <div class="list-pagination" v-if="favoriteData.length>0">
            <el-pagination layout="prev, pager, next" :default-current-page="1"
                           @size-change="pageSizeChange"
                           @current-change="pageChange"
                           :current-page="page" :page-size="limit"
                           :total="totalNum"></el-pagination>
          </div>
          <div class="ads-container">
            <el-image :src="dashboardAdsImg"></el-image>
          </div>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {GET_FAVORITE_LIST,CANCEL_FAVORITE} from "@/api/api";
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
    }
  },
  mounted() {
    this.getFavoriteList(this.page,this.limit)
  },
  methods: {
    getFavoriteList(page,limit){
      let params = {
        token: localStorage.getItem('token'),
        page: page,
        limit: limit
      }
      GET_FAVORITE_LIST(params).then(res=>{
        console.log(res)
        if (res.code == 200) {
          this.favoriteData = res.message.data
          // console.log(res.message.data)
          this.totalNum = res.message.total
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
    cancelFavorite(type,typeId){
       let params = {
         token:localStorage.getItem('token'),
         type:type,
         type_id:typeId
       }
       CANCEL_FAVORITE(params).then(res=>{
         console.log(res)
         if(res.code == 200){
           this.getFavoriteList()
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
  width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
}

.list-col{
  padding: 0 20px;
}
.list-container{
  background-color: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
}

.list-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px 0;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  position: relative;
}

.list-item:hover{
  background-color: #EEEEEE;
}

.list-item-l{
  width: 20%;
}

.list-item-l-img{
  width: 50%;
  border-radius: 50%;
  border: 1px solid #EEEEEE;
}

.list-item-r{
  width: 80%;

}
.list-item-r-t{
  text-align: left;
}
.list-item-r-t a{
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
}


.list-item-type{
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  background-color: #0AA0A8;
  color: #FFFFFF;
  padding: 4px 10px;
  border-radius: 4px;
}

.list-item-favorite-icon-container{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.list-item-favorite-icon{
  font-size: 24px;
  cursor: pointer;
}

.list-pagination{
  margin-top: 20px;
}

.ads-container {
  margin-top: 20px;
}

</style>
