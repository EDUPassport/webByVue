<template>
<div>
  <el-carousel style="margin:0 auto;overflow:hidden;"
               :height="height"
               indicator-position="none">

    <el-carousel-item class="xll-ads-swiper-item"
                      v-for="(item,i) in adsData" :key="i"
                      @click="turnAdsDetail(item.link)"
    >
      <div class="xll-ads-l">

        <div class="xll-ads-l-blur"
             v-if="item.user_url"
             :style="'background-image: url(' + item.user_url  + ');'">
        </div>
        <div class="xll-ads-l-blur"
             v-else
             :style="'background-image: url(' +  item.url + ');'">
        </div>

        <el-image class="xll-ads-l-img"
                  fit="contain"
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
      <div class="xll-ads-r">

        <div class="xll-ads-r-bg">
          {{item.title}}
        </div>

      </div>
    </el-carousel-item>
  </el-carousel>

</div>
</template>

<script>
export default {
  name: "adsComponent",
  props:['adsData','height'],
  methods:{
    turnAdsDetail(link){
      window.open(link, '_blank')
    }
  }
}
</script>

<style scoped>

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
  position: relative;

}

.xll-ads-l-blur{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;

  background-size: cover;
  filter:blur(4px);
}

.xll-ads-l-img {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0 auto;

  width: 100%;
  height: 100%;

  z-index: 100;

  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  /*box-shadow: 5px 10px 5px #888888;*/
}

.xll-ads-r {
  width: 40%;
  padding: 20px 0;
}

.xll-ads-r-bg {
  padding:0 20px;

  font-size: 23px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;

}

.image-ads-slot {
  text-align: center;
  padding: 50px 150px;
}

</style>