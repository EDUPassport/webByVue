<template>
  <div>
    <el-dialog :model-value="visible"
               width="auto"
               center
               :show-close="false"
               :before-close="beforeClose"
    >

      <div class="dialog-container">

        <div class="dialog-label">
          Share
        </div>

        <div class="share">

          <div class="share-l">
            <ShareNetwork
                style="margin-right: 10px;"
                network="Facebook"
                :url="url"
                :title="title"
                :description="description"
                :quote="quote"
            >
              <el-icon :size="40">
                <IconLogosFacebook />
              </el-icon>
            </ShareNetwork>
            <ShareNetwork
                style="margin-right: 10px;"
                network="LinkedIn"
                :url="url"
                :title="title"
            >
              <el-icon :size="40">
                <IconLogosLinkedinIcon />
              </el-icon>
            </ShareNetwork>

            <ShareNetwork
                style="margin-right: 10px;"
                network="Twitter"
                :url="url"
                :title="title"
            >
              <el-icon :size="40">
                <IconLogosTwitter />
              </el-icon>
            </ShareNetwork>
          </div>

          <div class="share-r" >
            <el-popover
                placement="top-start"
                :width="40"
                trigger="click"
                content="link copied!"
            >
              <template #reference>
                <el-icon :size="40" @click="copyLink(url)">
                  <IconAntDesignLinkOutlined />
                </el-icon>
              </template>
            </el-popover>
          </div>

        </div>

        <div class="action">
          <el-button link @click="close()">
            CANCEL
          </el-button>
        </div>


      </div>

    </el-dialog>

  </div>
</template>

<script>

export default {
  name: "shareCard",
  props:['title','description','quote','url','visible'],

  methods:{
    close(){
      this.$emit('close')
    },
    beforeClose(done){
      this.$emit('close')
      done()
    },
    readMoreDeal(){

    },
    copyLink(val) {

      this.$copyText(val).then(function (e) {
        console.log('copied')
        console.log(e)
      }, function (e) {
         console.log(e)
      })
    },



  }

}
</script>

<style scoped>

.dialog-container{

  background-color: #FFFFFF;
  box-shadow: 0 3px 10px #0000001A;

  width:  260px;

  border-radius: 40px;
  margin: 50px auto;
  position: relative;

  padding: 50px;
}

/deep/ .el-dialog{
  --el-dialog-bg-color: none;
  --el-dialog-box-shadow: none;
}

.dialog-label{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;
}

.share{
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}

.share-r{
  cursor: pointer;
}

.action{
  margin-top: 25px;
  text-align: right;
}

</style>