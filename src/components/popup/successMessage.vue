<template>

  <div class="container">
    <el-dialog :model-value="visible"
               width="auto"
               center
               :show-close="false"
               :before-close="beforeClose"
    >

      <div class="dialog-container" >

        <div class="dialog-t">
          <span>{{title}}</span>
        </div>

        <div class="dialog-b">
          <p>{{description}}</p>
        </div>

        <div class="dialog-action">
          <el-button plain type="primary" round @click="close()" >
            OK
          </el-button>
        </div>

      </div>

    </el-dialog>

  </div>

</template>

<script>

export default {
  name: "successMessage",
  props:['title', 'description','visible'],
  components:{

  },
  data(){
    return {

    }
  },
  methods:{
    close(){
      this.$emit('close')
    },
    beforeClose(done){
      this.$emit('close')
      done()
    },

  }

}
</script>

<style scoped>
.container{
  position: fixed;
  z-index: 100;

}
/deep/ .el-dialog{
  --el-dialog-bg-color: none;
  --el-dialog-box-shadow: none;
}

.dialog-container{

  background-color: #F0F2F5;
  box-shadow: 0px 3px 24px #00000034;

  width: 400px;
  height: 275px;
  border-radius: 26px;
  margin: 0 auto;
  padding: 25px;

  position: relative;
}



.dialog-t{
  width: 100%;

}

.dialog-t span{
  font-family: BSemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-size: 35px;
  color: #262626;

}

.dialog-b{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 25px;
}

.dialog-b p{

  margin-top: 10px;
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 23px;
  color: #262626;
  word-break: normal;

  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
  /*display: -webkit-box;*/
  /*-webkit-line-clamp: 3;*/
  /*-webkit-box-orient: vertical;*/

}

.dialog-action{
  position: absolute;
  left: 120px;
  right: 55px;
  bottom: 25px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

/deep/ .el-overlay{
  background-color: rgba(0, 0, 0, 0.9);
}

</style>