<template>
  <div>
    <el-carousel class="xll-carousel" :height="height" indicator-position="none" :interval="6000">
      <el-carousel-item class="xll-ads-swiper-item" v-for="(chunk, index) in adsData" :key="index">
        <div class="xll-ads-c">
          <template v-if="chunk.length === 1">
            <el-image @click="turnAdsDetail(item?.id, item?.link)" class="xll-ads-l-img" fit="cover"
              :src="chunk[0].user_url != '' ? chunk[0].user_url : chunk[0].url">
              <template #error>
                <div class="image-ads-slot">
                  <el-icon :size="80" color="#808080">
                    <Picture />
                  </el-icon>
                </div>
              </template>
            </el-image>
          </template>
          <template v-else>
            <div class="xll-ads-l" v-for="(item, itemIndex) in chunk" :key="itemIndex">
              <el-image @click="turnAdsDetail(item?.id, item?.link)" class="xll-ads-l-img" fit="cover"
                :src="item.user_url != '' ? item.user_url : item.url">
                <template #error>
                  <div class="image-ads-slot">
                    <el-icon :size="80" color="#808080">
                      <Picture />
                    </el-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </template>
        </div>
      </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>
import { ADD_INCREMENT, ADD_VIEWS_INCREMENT } from "@/api/api";
export default {
  name: "adsComponent",
  props: ['adsData', 'height'],
  mounted() {
    console.log("this.adsData", this.adsData)
    this.viewsIncremnt(this.adsData);
  },
  methods: {
    turnAdsDetail(id, link) {
      let params = {
        add_id: id
      };
      ADD_INCREMENT(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
      window.open(link, '_blank');
    },

    viewsIncremnt(adsData) {
      let params = [];
      let array = []
      array = adsData.reduce((acc, chunk) => acc.concat(chunk), []);
      array.forEach(item => {
        params.push({
          "add_id": item?.id,
          "user_id": localStorage.getItem('uid'),
        });

      });
      ADD_VIEWS_INCREMENT(params).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
    }
  }
}
</script>

<style scoped>
@media screen and (min-width: 1920px) {

  .xll-carousel {
    width: calc(475px + 420px);

  }

  .xll-ads-l {
    width: 475px;
    height: 100%;
    margin-right: 10px;
  }

  .xll-ads-r {
    width: 420px;
    background-color: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;

  }

  .xll-ads-r-bg {
    -webkit-line-clamp: 6;
  }

}

@media screen and (max-width: 1919px) and (min-width: 1200px) {
  .xll-carousel {
    width: calc(350px + 270px);
  }

  .xll-ads-l {
    width: 350px;
    height: 100%;
  }


  .xll-ads-r {
    width: 240px;
    background-color: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;

  }

  .xll-ads-r-bg {
    -webkit-line-clamp: 4;
  }

}

@media screen and (max-width: 1199px) and (min-width: 992px) {
  .xll-carousel {
    width: calc(300px + 200px);
  }

  .xll-ads-l {
    width: 300px;
    height: 100%;
  }

  .xll-ads-r {
    width: 200px;
    background-color: #FFFFFF;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
  }

  .xll-ads-r-bg {
    -webkit-line-clamp: 3;
  }

}

.xll-carousel {
  margin: 0 auto;
  overflow: hidden;
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

@media screen and (max-width: 768px) {
  .xll-ads-swiper-item {
    background-color: #F0F2F5;
  }

  .xll-ads-r {
    display: none;
  }
}
</style>