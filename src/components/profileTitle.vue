<template>
  <div class="title-container" v-if="action=='add' ">
    <h3>
      <span v-if="i==1">Educator</span>
      <span v-if="i==2">Recruiter</span>
      <span v-if="i==3">School</span>
      <span v-if="i==4">Other</span>
      <span v-if="i==5">Vendor</span>
      Profile
    </h3>
    <h4>Please confirm and complete the fields </h4>
  </div>
</template>

<script>
export default {
  name: "profileTitle",
  props:{
    i:{
      type:Number,
      default:0
    },
    action:{
      type:String,
      default:''
    }
  }
}
</script>

<style scoped>
.title-container{
  width:100%;
  text-align: center;
}
.title-container h3 span{
  color:#00b3d2;
}

</style>