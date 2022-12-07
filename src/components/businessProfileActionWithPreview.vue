<template>
  <div class="action-container" >
    <div class="action-l">
      <el-button class="action-exit-preview-btn"
                 link @click="exitPreview()">
        <el-icon>
          <ArrowLeft/>
        </el-icon>
        EXIT PREVIEW
      </el-button>
    </div>
    <div class="action-r">
      <el-button @click="editProfile()"
                 plain round>
        EDIT PROFILE
      </el-button>
    </div>

  </div>

</template>

<script>
import {encode} from 'js-base64'

export default {
  name: "businessProfileActionWithPreview",
  props:['info','identity'],
  methods:{
    exitPreview() {
      this.$router.push('/account/home')
    },
    editProfile() {

      let companyId = this.info.id;
      let identity = this.identity;
      let str = '';

      if (companyId) {
        let strObj = {
          cid: companyId,
          action: 'edit'
        }

        str = encode(JSON.stringify(strObj))

      } else {
        let strObj = {
          i: identity,
          action: 'add'
        }
        str = encode(JSON.stringify(strObj))
      }

      if (identity == 2) {
        this.$router.push({path: '/business/edit/recruiter', query: {s: str}})
      }
      if (identity == 3) {
        this.$router.push({path: '/business/edit/school', query: {s: str}})
      }
      if (identity == 4) {
        this.$router.push({path: '/business/edit/other', query: {s: str}})
      }

      if (identity == 5) {
        this.$router.push({path: '/vendor/edit/vendor', query: {s: str}})
      }

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
.action-exit-preview-btn{

}
.action-r{
  text-align: right;
}

@media screen and (min-width: 769px) {
  .action-exit-preview-btn{
    display: none;
  }
}

@media screen and (max-width: 768px){
  .action-container {
    height: 30px;

    background-color: #FFFFFF;
    padding: 15px;
  }
  .action-r {
    padding-right: 0;
  }


}

</style>