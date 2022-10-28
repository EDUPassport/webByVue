<template>
<div>
  <el-scrollbar class="deals-featured-scroll">

    <div class="deals-featured-container" >
      <div class="deals-featured-label">
        Promoted
      </div>

      <template v-if="featuredData.length>0">

        <div class="deals-featured-item" v-for="(item,index) in featuredData" :key="index">
          <div class="deals-item-bg">
            <el-image
                class="deals-item-background-img"
                :src="item.company_info.background_image ? item.company_info.background_image : ''"
                fit="cover"
                @click="viewProfile(item.user_id,item.identity, item.company_id)"
            >
            </el-image>

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
                         @click="viewProfile(item.user_id,item.identity, item.company_id)"
              >
              </el-avatar>
            </div>
            <div class="deals-item-c-r">
              <div class="deals-item-c-r-1" @click="viewProfile(item.user_id,item.identity, item.company_id)">
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
                    QUICK VIEW
                  </el-button>
                  <el-button link @click="turnDealDetail(item.id)">
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

    <div class="xll-ads-container" v-if="adsData.length>0">

      <el-carousel style="width:100%;margin:0 auto;overflow:hidden;"
                   height="360px"
                   indicator-position="none">

        <el-carousel-item class="xll-ads-swiper-item"
                          v-for="(item,i) in adsData" :key="i"
                          @click="turnAdsDetail(item.link)"
        >
          <div class="xll-ads">
            <div class="xll-ads-t">
              <el-image class="xll-ads-img"
                        fit="cover"
                        :src="item.user_url !='' ? item.user_url : item.url">
                <template #error>
                  <div class="image-ads-slot">
                    <el-icon :size="80" color="#808080">
                      <Picture/>
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </div>
            <div class="xll-ads-b">
              <div class="xll-ads-b-bg" v-html="item.title"></div>
            </div>
          </div>


        </el-carousel-item>
      </el-carousel>

    </div>


  </el-scrollbar>

</div>
</template>

<script>

export default {
  name: "featuredDealsPromoted",
  props:['featuredData','adsData'],
  data(){
    return {

    }
  },
  methods:{

    viewProfile(userId, identity, companyId){
      this.$emit('viewProfile', userId, identity, companyId)
    },
    showDealDetailDialog(e){
      this.$emit('detail',e)
    },
    addFavorite(id, type, title, url, index) {
      this.$emit('addFavorite',id, type, title, url, index)
    },
    cancelFavorite(type, typeId, index) {
      this.$emit('cancelFavorite',type, typeId, index)

    },
    turnAdsDetail(link){
      window.open(link, '_blank')
    },
    turnDealDetail(id){
      this.$emit('dealDetail', id)
    }

  }
}
</script>

<style scoped>

.deals-featured-scroll{
  height: calc(100vh - 140px);
}

.deals-featured-container{
  padding:0 25px 0 25px;
}

.deals-featured-label{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.deals-featured-item{
  width: 100%;
  margin-top: 5px;
  margin-bottom: 20px;

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

.xll-ads-container{
  /*padding: 0 25px 25px 25px;*/
  margin-bottom: 50px;
}
.xll-ads-swiper-item{
  background-color: #FFFFFF;
  width: 100%;

}

.xll-ads{
  /*width: 90%;*/
  overflow: hidden;
  border-radius: 14px;
  width: calc(100% - 50px);
  margin: 0 auto;
  box-shadow: 0px 0px 10px #0000001A;
}

.xll-ads-img{
  border-radius: 14px;
}

.xll-ads-b{
 padding: 25px;
}

.xll-ads-b-bg{
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 23px;

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