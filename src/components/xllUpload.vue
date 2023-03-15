<template>
<div>
  <el-upload
      class="profile-uploader"
      :action="uploadActionUrl"
      :headers="uploadHeaders"
      :data="uploadData"
      :show-file-list="false"
      name="file[]"
      :before-upload="beforeProfilePhotoUpload"
  >
    <el-image v-if="profilePhotoUrl" :src="profilePhotoUrl" class="profile-avatar"></el-image>
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</div>
</template>

<script>
export default {
  name: "xllUpload",
  props:{

  },
  setup(){
    const uploadActionUrl  =  process.env.VUE_APP_UPLOAD_ACTION_URL
    const uploadHeaders = {
      platform: 4
    }
    const uploadData =  {
      token: localStorage.getItem('token')
    }

    return {
      uploadActionUrl,
      uploadHeaders,
      uploadData
    }

  },
  data(){
    return {
      profilePhotoUrl:''
    }
  },
  methods:{

    beforeProfilePhotoUpload(file) {
      this.loadingProfilePhotoShow = true;
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 20MB')
      }
      return isLt2M

    },


  }

}
</script>

<style scoped>

</style>