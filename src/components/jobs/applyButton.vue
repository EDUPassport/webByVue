<template>

  <el-button type="primary"
             round
             :loading="applyBtnLoading"
             @click="applyJob()">
    {{btnText}}
  </el-button>

  <template v-if="applyVisible">
    <successMessage :visible="applyVisible"
                    :title="applyTitle"
                    :description="applyDescription"
                    @close="applyVisible=false" >
    </successMessage>
  </template>

</template>

<script>
import successMessage from "@/components/popup/successMessage";
import {APPLY_JOBS} from "@/api/api";

export default {
  name: "applyButton",
  props:['btnText','jobInfo','loading','selectJobId'],
  components:{
    successMessage
  },
  data(){
    return {
      applyBtnLoading:false,
      applyVisible:false,
      applyTitle:'',
      applyDescription:''

    }
  },
  methods:{
    applyJob() {
      let identity = localStorage.getItem('identity')
      let token = localStorage.getItem('token')

      if(token){
        if(this.selectJobId == this.jobInfo.id){
          this.applyBtnLoading = true;
        }

        if (identity == 1) {
          let params = {
            job_id: this.jobInfo.id,
            token: token
          }

          APPLY_JOBS(params).then(res => {
            if (res.code == 200) {
              // this.$message.success('Apply Success')
              this.applyBtnLoading= false;
              this.applyVisible = true;
              this.applyTitle = 'Success'
              this.applyDescription = 'Your Application to ' + this.jobInfo.job_title + ' has been successfully sent.'

            }
          }).catch(err=>{
            console.log(err)
            // this.$message.error(err.msg)
            this.applyVisible = true;
            this.applyTitle = 'Warning'
            this.applyDescription = err.msg

            this.applyBtnLoading =false

          })

        } else {

          this.applyVisible = true;
          this.applyTitle = 'Warning'
          this.applyDescription = 'Please switch to an educator profile to be able to apply'

          // this.$message.warning('Please switch to an educator profile to be able to apply')
          this.applyBtnLoading =false;

        }


      }else{
        this.applyVisible = true;
        this.applyTitle = 'Warning'
        this.applyDescription = ' Please log in & fill in your profile to be able to apply.'
      }


    }

  }
}
</script>

<style scoped>
/deep/ .el-dialog{
  --el-dialog-bg-color: none;
  --el-dialog-box-shadow: none;
}

@media screen and (max-width: 768px){

 }
</style>