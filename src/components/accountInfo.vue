<template>
  <div class="account-info-container">
    <div class="account-info-label">Account Info</div>
    <div class="account-info-content">
      <div class="account-info-t">
        <div class="account-info-t-label">Personal Account Info</div>
        <div class="account-info-t-edit">Edit</div>
      </div>
      <div class="account-info-b">
        <div class="account-info-photo">
          <el-image></el-image>
        </div>
        <div class="account-info-tags">
          <div class="account-info-tag">
            <el-image></el-image>
            <span>Educator</span>
          </div>
          <div class="account-info-tag">
            <el-image></el-image>
            <span>17621732412</span>
          </div>
          <div class="account-info-tag">
            <el-image></el-image>
            <span>China</span>
          </div>
          <div class="account-info-tag">
            <el-image></el-image>
            <span>Male</span>
          </div>
          <div class="account-info-tag">
            <el-image></el-image>
            <span>Pro Member</span>
          </div>
          <div class="account-info-tag">
            <el-image></el-image>
            <span>my@email.com</span>
          </div>
      </div>
      </div>
      <div class="account-info-bb">
        <div class="account-info-name">Lloyd</div>
        <div class="account-info-job-title">Esl Teacher</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "accountInfo"
}
</script>

<style scoped>
.account-info-container{
  padding: 20px;
  text-align: left;
}

.account-info-label{
  font-size: 20px;
  font-weight: bold;
}
.account-info-content{
  margin-top: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;

}

.account-info-t{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.account-info-t-label{
  font-size: 16px;
  font-weight: bold;
}
.account-info-t-edit{
  font-size: 14px;
  font-weight: bold;
}
.account-info-b{
  border-bottom: 1px solid #eeeeee;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.account-info-photo{
  width: 30%;
}


.account-info-tags{
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:flex-start;
  flex-wrap: wrap;
  padding: 20px 0;

}

.account-info-tag{
 margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.account-info-tag span{
  margin-left: 10px;
}
.account-info-bb{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
.account-info-name{
  font-size: 14px;
}

</style>