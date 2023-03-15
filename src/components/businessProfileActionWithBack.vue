<template>
  <div class="action-container">
    <div class="action-l">
      <el-button
          @click="backToSearchResults()"
          link>
        <el-icon>
          <ArrowLeft />
        </el-icon>
        BACK
      </el-button>
    </div>
    <div class="action-r">

    </div>
  </div>

</template>

<script>
export default {
  name: "businessProfileAction",
  methods:{
    backToSearchResults(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

.action-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: #F0F2F5;
  padding: 0 50px;
}

.action-r{
  text-align: right;
  padding-right: 50px;
}

@media screen and (max-width: 768px){
  .action-container {
    height: 30px;
    background-color: #FFFFFF;
    padding: 0 15px;
  }
  .action-r {
    padding-right: 0;
  }


}

</style>