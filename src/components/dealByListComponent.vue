<template>
<div class="container">
  <el-scrollbar class="deals-from-bg-container">
    <div class="deals-from-t">
      <div class="deals-from-back" v-if="!fromVendorProfile">
        <el-button class="deals-from-back-btn"
                   @click="backToSearchResults()"
                   link>
          <el-icon>
            <ArrowLeft />
          </el-icon>
          BACK TO SEARCH RESULTS
        </el-button>
      </div>

      <div class="deals-from-back" v-if="fromVendorProfile">
        <el-button class="deals-from-back-btn"
                   @click="backToSearchResults()"
                   link>
          <el-icon>
            <ArrowLeft />
          </el-icon>
          EXIT PREVIEW
        </el-button>
      </div>

      <div class="deals-from-label">
        Deals from {{ info.company_name }}
      </div>
    </div>

    <div class="deals-from-b">
      <template v-if="listData.length > 0">
        <div class="deals-from-item" v-for="(item,index) in listData" :key="index">
          <div class="deals-item-bg">
            <el-image
                class="deals-item-background-img"
                :src="item.company_info.background_image ? item.company_info.background_image : ''"
                fit="cover">
              <template #error>
                <div class="img-slot-background">
                  <el-icon :size="80" color="#808080">
                    <Picture/>
                  </el-icon>
                </div>
              </template>

            </el-image>

            <div class="deals-item-favorite" v-if="item.is_favorite && item.is_favorite == 1"
                 @click="cancelFavorite(2,item.id,index)">
              <i class="iconfont el-icon-alixll-heart-filled xll-heart-icon"></i>
            </div>
            <div class="deals-item-favorite" v-else
                 @click="addFavorite(item.id,2,item.title,item.company_logo,index)">
              <i class="iconfont el-icon-alixll-heart xll-heart-icon"></i>
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
              <div class="deals-item-c-r-2" @click="showDealDetailDialog(item)">
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
              <el-button link  @click="showDealDetailDialog(item)">
                DETAILS
              </el-button>
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
export default {
  name: "dealByListComponent",
  props:['listData','info','fromVendorProfile'],
  methods:{
    backToSearchResults(){
        this.$emit('back')
    },
    showDealDetailDialog(item){
        this.$emit('detail',item)
    }

  }
}
</script>

<style scoped>

.container{
  padding-left: 13px;
}

.deals-from-bg-container {
  background-color: #F0F2F5;
  height: calc(100vh - 170px);
  padding: 0 30px 30px 30px;
}

.deals-from-back {
  padding-top: 25px;
}

.deals-from-back-btn {
  font-size: 20px;
}

.deals-from-label {
  margin-top: 25px;
  font-family: BSemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.deals-from-item {
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

.deals-pagination {
  margin-top: 25px;
  display: flex;
  justify-content: center;
}

.xll-ads-container {
  padding: 50px 0;
  background-color: #F0F2F5;
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
  border: 1px solid #EEEEEE;
}

.xll-ads-l {
  width: 60%;
  height: 100%;
}

.xll-ads-l-img {
  background-color: #faecd8;
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

.image-ads-slot {
  text-align: center;
  padding: 50px 150px;
}


.img-slot-background{
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #faf7f7;
  width: 100%;
  height: 100%;
}

</style>