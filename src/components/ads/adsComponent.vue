<template>
  <div>
    <el-carousel
        class="xll-carousel"
        :height="height"
        indicator-position="none">

      <el-carousel-item class="xll-ads-swiper-item"
                        v-for="(item,i) in adsData" :key="i"
                        @click="turnAdsDetail(item.link)"
      >

        <div class="xll-ads-c">

          <div class="xll-ads-l">

            <el-image class="xll-ads-l-img"
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

          <div class="xll-ads-r">
            <div class="xll-ads-r-bg" v-html="item.title"></div>
          </div>

        </div>

      </el-carousel-item>

    </el-carousel>

  </div>
</template>

<script>
export default {
  name: "adsComponent",
  props: ['adsData', 'height'],
  methods: {
    turnAdsDetail(link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style scoped>

@media screen and (min-width: 1920px) {

  .xll-carousel{
    width:calc(475px + 420px);

  }

  .xll-ads-l {
     width: 475px;
     height: 100%;
   }

  .xll-ads-r{
    width: 420px;
    background-color: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;

  }

  .xll-ads-r-bg{
    -webkit-line-clamp: 6;
  }

}

@media screen and (max-width: 1919px) and (min-width: 1200px) {
  .xll-carousel{
    width:calc(350px + 270px);
  }

  .xll-ads-l {
    width: 350px;
    height: 100%;
  }


  .xll-ads-r{
    width: 240px;
    background-color: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;

  }
  .xll-ads-r-bg{
    -webkit-line-clamp: 4;
  }

}

@media screen and (max-width: 1199px) and (min-width: 992px) {
  .xll-carousel{
    width:calc(300px + 200px);
  }
  .xll-ads-l {
    width: 300px;
    height: 100%;
  }

  .xll-ads-r{
    width: 200px;
    background-color: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
  }

  .xll-ads-r-bg{
    -webkit-line-clamp: 3;
  }

}

.xll-carousel{
  margin:0 auto;
  overflow:hidden;
}

.xll-ads-swiper-item {

  cursor: pointer;
  height: 100%;
  background-color: #FFFFFF;
  border-radius: 14px;

}

.xll-ads-c {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  height: 100%;
  box-shadow: 0px 0px 10px #0000001A;
  border-radius: 14px;

}

.xll-ads-l-img {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  box-shadow: 0px 0px 10px #0000001A;
}

.xll-ads-r-bg {

  font-size: 23px;
  font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;

}

.image-ads-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

</style>