<template>
  <div>
    <div class="e-a">

      <div class="e-a-label">
        Favorited jobs 
        <el-button link primary>VIEW ALL</el-button>
      </div>

      <el-scrollbar max-height="350px" class="e-a-c">

        <template v-if="favoriteData.length>0">
          <div class="e-a-item-bg" v-for="(item,i) in favoriteData" :key="i">
            <div class="e-a-item">
              <div class="e-a-item-l">
                <el-avatar class="e-a-item-avatar" :src="item.type_url"></el-avatar>
              </div>
              <div class="e-a-item-m">
                <div class="e-a-item-m-1">
                  <span v-if="item.type==1">Job</span>
                  <span v-if="item.type==2">Deal</span>
                </div>

                <div class="e-a-item-m-2">
                  <router-link v-if="item.type==1" :to="{path:'/jobs/detail',query:{id:item.type_id}}">
                    {{ item.type_title }}
                  </router-link>
                  <router-link v-if="item.type==2" :to="{path:'/deals/detail',query:{id:item.type_id}}">
                    {{ item.type_title }}
                  </router-link>

                </div>
                <!--              <div class="e-a-item-m-3">-->
                <!--                Salary: $240,000-280,000-->
                <!--              </div>-->
                <!--              <div class="e-a-item-m-3">-->
                <!--                Dubai, UAE-->
                <!--              </div>-->
                <!--              <div class="e-a-item-m-3">-->
                <!--                Full time-->
                <!--              </div>-->
              </div>
              <div class="e-a-item-r">
                <div class="e-a-item-r-1">
                  <!--                <el-button type="primary" round >-->
                  <!--                  APPLY-->
                  <!--                </el-button>-->
                </div>
              </div>
            </div>

          </div>

          <!--        <div class="e-a-item-bg">-->
          <!--          <div class="e-a-item">-->
          <!--            <div class="e-a-item-l">-->
          <!--              <el-avatar class="e-a-item-avatar"></el-avatar>-->
          <!--            </div>-->
          <!--            <div class="e-a-item-m">-->
          <!--              <div class="e-a-item-m-1">Columbia University</div>-->
          <!--              <div class="e-a-item-m-2">-->
          <!--                Art History Teacher-->
          <!--              </div>-->
          <!--              <div class="e-a-item-m-3">-->
          <!--                Salary: $90,000-120,000-->
          <!--              </div>-->
          <!--              <div class="e-a-item-m-3">-->
          <!--                Paris, France-->
          <!--              </div>-->
          <!--              <div class="e-a-item-m-3">-->
          <!--                Seasonal-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="e-a-item-r">-->
          <!--              <div class="e-a-item-r-1">-->
          <!--                Position closed-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->

          <!--        </div>-->

        </template>

        <template v-else>
          <el-empty description="..."></el-empty>
        </template>



      </el-scrollbar>
    </div>

  </div>
</template>

<script>
import {GET_FAVORITE_LIST} from "@/api/api";

export default {
  name: "favoritedJobsDashboard",
  data(){
   return {
     page:1,
     limit:10000,
     favoriteData:[],
     totalNum:0
   }
  },
  mounted(){
    this.getFavoriteList(this.page,this.limit)
  },
  methods:{
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

    }
  }

}
</script>

<style scoped>

.e-a {
  /*width: calc(45% - 100px);*/
  /*width: 600px;*/
  padding: 25px 50px;
  box-shadow: 0px 0px 23px #00000012;
  border-radius: 18px;
  background-color: #FFFFFF;

}

.e-a-label {
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.e-a-c {
  margin-top: 25px;
}

.e-a-item-bg {
  border-bottom: 1px solid #F0F2F5;
  padding: 25px 0;
}

.e-a-item {

  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 25px;
}

.e-a-item-avatar {
  width: 70px;
  height: 70px;

}

.e-a-item-l {
  width: 70px;
}

.e-a-item-m {
  width: calc(100% - 260px);
}

.e-a-item-r {
  width: 175px;
  text-align: center;
}

.e-a-item-m-1 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;
}

.e-a-item-m-2 a{
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 25px;
  color: #262626;
  text-decoration: none;
}

.e-a-item-m-3 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.e-a-item-r-1 {
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.e-a-item-r-2 {
  margin-top: 25px;
}

.e-a-item-r-3 {
  margin-top: 25px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

</style>