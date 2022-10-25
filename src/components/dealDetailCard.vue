<template>
<div>
  <el-dialog :model-value="visible"
             width="auto"
             center
             :show-close="false"
             :before-close="beforeClose"
  >

    <div class="dialog-container" v-if="info">

      <div class="dialog-t">
        <el-image class="dialog-background-img"
                  fit="cover"
                  :src="info.company_info.background_image">
          <template #error>
            <div class="img-slot-background">
              <el-icon :size="80" color="#808080">
                <Picture/>
              </el-icon>
            </div>
          </template>
        </el-image>
      </div>
      <div class="dialog-b">

        <div class="dialog-b-l">

          <div class="dialog-logo">
            <el-avatar class="dialog-logo-img" :src="info.company_logo"></el-avatar>
          </div>
          <div class="dialog-qrcode">
            <vue-qrcode :value="qrcodeValue" :options="{width:200}"></vue-qrcode>
          </div>

        </div>

        <div class="dialog-b-r">

          <el-scrollbar class="dialog-b-r-height">
            <div class="dialog-company-name">
              {{ info.company_name }}
            </div>
            <p class="dialog-company-desc">
              {{ info.company_info.desc }}
            </p>

            <div class="dialog-vendor-profile" @click="readMoreDeal(info.company_info)">
              VENDOR PROFILE
            </div>

            <div class="dialog-title">
              {{ info.title }}
            </div>

            <p class="dialog-desc">
              {{ info.desc }}
            </p>

            <template v-if="info.is_online == 2 || info.is_online == 3">
              <mapComponent :lng="info.lng" :lat="info.lat"></mapComponent>
            </template>

<!--            <div class="dialog-category">-->
<!--              {{ info.company_info.category_name_en }}-->
<!--            </div>-->

          </el-scrollbar>

          <div class="dialog-close">
            <el-icon class="dialog-close-icon"
                     @click="close()"
                     :size="20">
              <CloseBold />
            </el-icon>
          </div>

        </div>

      </div>

      <div class="dialog-action">
        <div class="dialog-action-l">
          <el-space :size="5" wrap spacer="·">
<!--            <span>discount</span>-->
            <span v-if="info.company_info">{{ info.company_info.category_name_en }}</span>
          </el-space>
        </div>
        <div class="dialog-action-r">
          <el-button link @click="share(info)" >
            SHARE
          </el-button>
        </div>
      </div>

    </div>

  </el-dialog>

</div>
</template>

<script>
import mapComponent from "@/components/mapComponent";
export default {
  name: "dealDetailCard",
  props:['info','visible','qrcodeValue'],
  components:{
    mapComponent
  },
  methods:{
    close(){
      this.$emit('close')
    },
    beforeClose(done){
      this.$emit('close')
      done()
    },
    readMoreDeal(info){
      this.$emit('viewProfile',info)
    },
    share(info){
      this.$emit('share',info)
    }

  }

}
</script>

<style scoped>

.dialog-container{

  background-color: #FFFFFF;
  box-shadow: 0 3px 10px #0000001A;

  width: 956px;
  height: 630px;
  border-radius: 40px;
  margin: 0 auto;
  position: relative;
}

/deep/ .el-dialog{
  --el-dialog-bg-color: none;
  --el-dialog-box-shadow: none;
}

.dialog-t{
  width: 100%;
  height: 180px;

}

.dialog-background-img{
  width: 100%;
  height: 100%;
  border-radius: 40px;
}

.dialog-b{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 25px;
}

.dialog-b-l{

}

.dialog-logo-img{
  width: 70px;
  height: 70px;
  box-shadow: 0px 0px 6px #00000029;
}
.dialog-qrcode{
  display: none;
}

.dialog-b-r{
  width: calc(100% - 120px);
  position: relative;
  padding-right: 25px;
}
.dialog-b-r-height{
  height: 350px ;
}

.dialog-company-name{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.dialog-company-desc{
  margin-top: 10px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.dialog-vendor-profile{
  margin-top: 10px;
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
  color: #6650B3;
  cursor: pointer;
}

.dialog-vendor-profile:hover{
  text-decoration:underline;
}

.dialog-title{
  margin-top: 25px;
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.dialog-desc{
  margin-top: 25px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.dialog-close{
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}

.dialog-action{
  position: absolute;
  left: 120px;
  right: 55px;
  bottom: 25px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.dialog-action-l span{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;
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