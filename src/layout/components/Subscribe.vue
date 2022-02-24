<template>
  <div class="subscribe-container">

    <el-row class="subscribe-label-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="subscribe-label">
          Sign up to our newsletter
        </div>
        <div class="subscribe-tips">
          New features, industry news, & more - just without the spam.
        </div>
      </el-col>
    </el-row>

    <el-row class="subscribe-input-row" :gutter="0" align="middle" justify="center">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="xll-subscribe-container">
          <el-input
              v-model="subscribeEmail"
              placeholder="Email"
              :input-style="{height:'60px',border:'none','background-color':'#2F2F4D','color':'#ffffff'}"
              class="xll-subscribe-input"
          >
            <template #append>
              <el-button type="primary" @click="subscribe()">Sign Up</el-button>
            </template>
          </el-input>
        </div>

      </el-col>
    </el-row>

  </div>

</template>

<script>
import {ADD_SUBSCRIBE_EMAIL} from "@/api/api";

export default {
  name: "subscribe",
  data(){
    return {
      subscribeEmail:''
    }
  },
  methods:{
    subscribe() {
      let params = {
        email: this.subscribeEmail
      }
      ADD_SUBSCRIBE_EMAIL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('Subscribe Success')
          this.subscribeEmail = ''
        }
      }).catch(err=>{
        console.log(err)
        this.$message.error(err.msg)
      })
    },
  }
}
</script>

<style scoped>
.subscribe-container {
  background-color: #272641;
  padding: 80px 20px;
  text-align: center;
}

.subscribe-input-row, .subscribe-label-row {
  margin: 0 auto;
}

.subscribe-label {
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
}

.subscribe-tips{
  font-size: 14px;
  color: #E5E2E4;
}

.xll-subscribe-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  width: 102%;
  height: 60px;
  border-radius: 60px;
  overflow: hidden;
}

/deep/ .el-input-group__append{
  border:none;
  background-color: #091E77;
  padding: 0 40px;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 16px;
}

@media screen and (min-width: 1200px) {

  .subscribe-input-row, .subscribe-label-row {
    width: 1100px;
    margin: 0 auto;
  }

}

</style>