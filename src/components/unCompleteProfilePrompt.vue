<template>
<div>
  <div class="un-profile-container">
    <div class="un-profile-l">
      <div class="un-profile-l-t">
        <span>Finish Setup Your Profile</span>
        <el-progress class="un-profile-progress" :percentage="percent" :stroke-width="8" color="#F9B019" />
      </div>
      <div class="un-profile-l-b">
        Get started and complete your profile to start applying for jobs
      </div>
    </div>
    <div class="un-profile-r">
      <el-button class="complete-btn">
        Complete Profile
      </el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "unCompleteProfilePrompt",
  props:['percent']
}
</script>

<style scoped>
.un-profile-container{
  margin-top: 24px;
  margin-left: 38px;
  padding: 20px 16px;
  background: #FFFAEB;
  border-radius: 12px;
  max-width: 646px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.un-profile-l-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.un-profile-progress{
  width: 192px;
  margin-left: 24px;
}

.un-profile-l-t span{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #1D2939;

}

.un-profile-l-b {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #667085;
  margin-top: 8px;
}

.complete-btn{
  background-color:#FFEBC3;
}
</style>
