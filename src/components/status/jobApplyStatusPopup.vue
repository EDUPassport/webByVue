<template>
  <div>
    <el-dialog :model-value="visible"
               width="auto"
               center
               :show-close="false"
               :before-close="beforeClose"
    >

      <div class="dialog-container" >

        <div class="dialog-t">
          <span v-if="status == 2">You shortlisted an application</span>
          <span v-if="status == 3">Not interested in this applicant?</span>
          <span v-if="status == 4">We will let the applicant know!</span>

        </div>

        <div class="dialog-b">

          <div class="dialog-b-l">
            <el-image v-if="status == 2" :src="jobApplyImg3"></el-image>
            <el-image v-if="status == 3" :src="jobApplyImg2"></el-image>
            <el-image v-if="status == 4" :src="jobApplyImg2"></el-image>

          </div>

          <div class="dialog-b-r">
            <p v-if="status == 2">
              Shortlisted applications will appear on the “Applications” page where you
              will be able to review all of them and determine which applicants you’d like to proceed with, reject, or save for later.
            </p>
            <p v-if="status == 3">
              To provide transparency during the hiring process,
              we will send the applicant the following message on your behalf.
            </p>
            <p v-if="status == 4">
              We are glad that you found a potential candidate! To help you break the ice,
              we will send a quick message on your behalf,
              letting them know that you are interested and would like to set up a time for an interview.
            </p>
            <p v-if="status == 4">
              Application status will be changed to “Accepted”.
            </p>
            <div class="dialog-b-r-not">
              <el-checkbox v-model="notShowStatus" label="DO NOT SHOW THIS MESSAGE AGAIN" />
            </div>
          </div>

        </div>

        <div class="dialog-action">
          <template v-if="status === 2">
            <el-button link @click="close()">
              CANCEL
            </el-button>
            <el-button type="primary" round @click="update()" >
              SHORTLIST THIS APPLICATION
            </el-button>
          </template>
          <template v-if="status === 3">
            <el-button link @click="close()">
              GO BACK
            </el-button>
            <el-button type="danger" round @click="update()" >
              NO, THIS IS NOT A MATCH
            </el-button>
          </template>

          <template v-if="status === 4">
            <el-button link @click="close()">
              CANCEL
            </el-button>
            <el-button plain type="primary" round @click="update()" >
              I WILL MESSAGE MYSELF
            </el-button>
<!--            <el-button type="primary" round @click="updateAndChat()" >-->
<!--              SEND A MESSAGE-->
<!--            </el-button>-->
            <chatButton text="SEND A MESSAGE"
                        btn-style="primary"
                        :targetUser="info"
                        :identity="1"
                        @onSuccess="chatSuccess"
            >

            </chatButton>

          </template>

        </div>

      </div>

    </el-dialog>

  </div>
</template>

<script>
import jobApplyImg1 from '@/assets/newHome/job-apply-status-1.png'
import jobApplyImg2 from '@/assets/newHome/job-apply-status-2.png'
import jobApplyImg3 from '@/assets/newHome/job-apply-status-3.png'
// import mapComponent from "@/components/mapComponent";
import chatButton from "@/components/chat/chatButton";
export default {
  name: "jobApplyStatusPopup",
  props:['status', 'id','visible','info'],
  components:{
    chatButton
  },
  data(){
    return {
      notShowStatus:false,
      jobApplyImg1,
      jobApplyImg2,
      jobApplyImg3,
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
    update(){
      // console.log(this.notShowStatus)
      // if(this.notShowStatus){
      //   localStorage.setItem('notShowStatusDialog', this.notShowStatus)
      //
      // }
      this.$emit('update', this.notShowStatus)
    },
    chatSuccess(){
      console.log('fa song cheng gong')
      this.$emit('updateAndChat', this.notShowStatus)

    }

  }

}
</script>

<style scoped>

.dialog-container{

  background-color: #F0F2F5;
  box-shadow: 0px 3px 24px #00000034;

  width: 800px;
  height: 375px;
  border-radius: 26px;
  margin: 0 auto;
  padding: 25px;

  position: relative;
}

/deep/ .el-dialog{
  --el-dialog-bg-color: none;
  --el-dialog-box-shadow: none;
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

.dialog-b-l{
  width: 100px;
}

.dialog-b-r{
  width: calc(100% - 120px);
  position: relative;
  /*padding-right: 25px;*/
}

.dialog-b-r p{

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

.dialog-b-r-not{
  width: 100%;
  margin-top: 20px;
}
/deep/ .el-checkbox__label{
  font-family: BCM, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 20px;
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


@media screen and (max-width: 768px) {
  .dialog-container{
    width: auto;
    height: auto;
    padding: 15px;
  }

  .dialog-t span{
    font-size: 20px;
  }
  .dialog-b{
    padding:15px 0;
  }
  .dialog-b-l{
    width: 60px;
  }
  .dialog-b-r{
    width: calc(100% - 75px);
  }

  .dialog-b-r p{
    font-size: 14px;
  }

  /deep/ .el-checkbox__label{
    font-size: 12px;
  }

  .dialog-action{
    position: unset;
  }

}

</style>