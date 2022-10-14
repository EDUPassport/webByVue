<template>
<div>
  <el-scrollbar class="deals-featured-scroll">

    <div class="deals-featured-container" >
      <div class="deals-featured-label">
        Promoted
      </div>
      <template v-if="featuredDealsData.length>0">
        <div class="deals-featured-item" v-for="(item,index) in featuredDealsData" :key="index">
          <div class="deals-item-bg">
            <el-image
                class="deals-item-background-img"
                :src="item.company_info.background_image ? item.company_info.background_image : ''"
                fit="cover"
                @click="viewProfile(item.company_info)"
            ></el-image>

            <div class="deals-item-favorite" v-if="item.is_favorite && item.is_favorite == 1"
                 @click="cancelFavorite(2,item.id,index)">
              <el-icon color="#6650B3" :size="25">
                <IconFontistoFavorite />
              </el-icon>
            </div>
            <div class="deals-item-favorite" v-else
                 @click="addFavorite(item.id,2,item.title,item.company_logo,index)">
              <el-icon :size="25">
                <CollectionTag />
              </el-icon>
            </div>

          </div>
          <div class="deals-item-c">
            <div class="deals-item-c-l">
              <el-avatar class="deals-logo"
                         :src="item.company_logo"
                         @click="viewProfile(item.company_info)"
              >
              </el-avatar>
            </div>
            <div class="deals-item-c-r">
              <div class="deals-item-c-r-1" @click="viewProfile(item.company_info)">
                {{ item.company_info.company_name }}
              </div>
              <div class="deals-item-c-r-2" @click="showDealDetailDialog(item)">
                {{ item.title }}
              </div>
              <div class="deals-item-c-r-3" @click="showDealDetailDialog(item)">
                {{ item.desc }}
              </div>
              <div class="deals-item-b">
                <div class="deals-item-b-l">

                  <template v-if="item.company_info.category_name_en && item.company_info.category_name_en != '0'">
                    {{ item.company_info.category_name_en }}
                  </template>
                  <template v-else>

                  </template>

                </div>
                <div class="deals-item-b-r">
                  <el-button link @click="showDealDetailDialog(item)">
                    DETAILS
                  </el-button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </template>
      <template v-else>
        <el-empty description="..."></el-empty>
      </template>

    </div>


  </el-scrollbar>

</div>
</template>

<script>
import {ADD_FAVORITE, CANCEL_FAVORITE, FEATURED_DEALS_LIST} from "@/api/api";

export default {
  name: "featuredDealsPromoted",
  data(){
    return {
      featuredDealsData:[]
    }
  },
  mounted(){
    this.getFeaturedDealsList()
  },
  methods:{
    getFeaturedDealsList() {
      let params = {}
      FEATURED_DEALS_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.featuredDealsData = res.message;
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },
    viewProfile(e){
      this.$emit('viewProfile',e)
    },
    showDealDetailDialog(e){
      this.$emit('detail',e)
    },
    addFavorite(id, type, title, url, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: id,
        type_title: title,
        type_url: url
      }
      ADD_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Success')
          this.featuredDealsData[index]['is_favorite'] = 1
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })

    },
    cancelFavorite(type, typeId, index) {
      let params = {
        token: localStorage.getItem('token'),
        type: type,
        type_id: typeId
      }
      CANCEL_FAVORITE(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.featuredDealsData[index]['is_favorite'] = 0
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.msg)
      })
    },

  }
}
</script>

<style scoped>

.deals-featured-scroll{
  height: calc(100vh - 140px);
}

.deals-featured-container{
  padding: 25px;
}
.deals-featured-label{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.deals-featured-item{
  width: 100%;
  margin-top: 20px;
  border-radius: 40px;
  overflow: hidden;

  background-color: #ffffff;
  box-shadow: 0px 0px 10px #0000001A;
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

.deals-item-favorite {
  position: absolute;
  right: 20px;
  top: 20px;

}

.deals-item-background-img {
  width: 100%;
}

.deals-item-c {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
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
.deals-item-c-r-3{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;

  /*word-break: break-all;*/
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* 这里是超出几行省略 */
  overflow: hidden;

}

.deals-item-b {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /*padding: 0 25px 25px 25px;*/
  margin-top: 25px;
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

.hot-deal-type-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
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


@media screen and (min-width: 1200px) {

}

@media screen and (max-width: 768px) {

}
</style>