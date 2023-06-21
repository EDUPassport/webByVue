<template>
  <div>
    <el-dialog :model-value="visible"
               width="auto"
               center
               :show-close="false"
               :before-close="beforeClose"
    >
      <div class="dialog-container">

        <div class="dialog-bg-container">
          <div class="dialog-title">Booked list</div>
          <div class="dialog-tips">
            List of people who RSVP’d your event.
          </div>

          <el-scrollbar class="dialog-c">

            <div class="dialog-c-item"
                 v-for="(item,i) in info" :key="i"
            >
              <div class="dialog-c-item-name">
                {{ item.first_name }} {{ item.last_name }}
              </div>
              <div class="dialog-c-item-contact">
                {{ item.contact }}
              </div>
            </div>

          </el-scrollbar>

        </div>

        <div class="close-container">
          <el-button link @click="close()">
            CLOSE
          </el-button>
        </div>

      </div>

    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "bookEventList",
  props: ['visible', 'info'],
  data() {
    return {
      BookedData: []
    }
  },
  methods: {
    close(){
      this.$emit('close')
    },
    beforeClose(done) {
      this.$emit('close')
      done()
    }

  }

}
</script>

<style scoped>

.dialog-container {

  background-color: #FFFFFF;
  box-shadow: 0 3px 10px #0000001A;

  border-radius: 40px;

  width: 580px;
  max-height: 700px;
  margin: 0 auto;
  position: relative;

}

.dialog-bg-container {
  padding: 50px;

}

:deep(.el-dialog ){
  --el-dialog-bg-color: none;
  --el-dialog-box-shadow: none;
}

.dialog-title{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 26px;
  color: #262626;

}

.dialog-tips{
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
  margin-top: 25px;
}

.dialog-c{
  min-height: 100px;
  max-height: 400px;
}

.dialog-c-item{
  margin-top: 15px;
}

.dialog-c-item-name{
  font-family: Assistant-SemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
}

.dialog-c-item-contact{
  font-family: BarlowM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

.close-container{
  position: absolute;
  right: 50px;
  bottom: 50px;

}

@media screen and (max-width: 768px) {
  .dialog-container{
    width: 100%;
    border-radius: 20px;
  }
  .dialog-bg-container{
    padding: 15px;
  }
  .dialog-title{
    font-size: 18px;
  }
  .dialog-tips{
    font-size: 14px;
  }
  .dialog-c-item-name{
    font-size: 14px;
  }
  .dialog-c-item-contact{
    font-size: 14px;
  }
  .close-container{
    right: 15px;
    bottom: 15px;
  }
}

</style>