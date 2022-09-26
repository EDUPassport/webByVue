<template>
<div>
  <div class="e-j">
    <div class="e-j-label">
      Daily 5 job matches
    </div>
    <div class="e-j-c">

      <div class="e-j-item-bg">
        <div class="e-j-item">
          <div class="e-j-item-l">
            <el-avatar class="e-j-c-item-avatar"></el-avatar>
          </div>
          <div class="e-j-item-m">
            <div class="e-j-item-m-1">University</div>
            <div class="e-j-item-m-2">
              CLASSROOM TEACHER
            </div>
            <div class="e-j-item-m-3">
              Salary: $100,000-120,000/year
            </div>
            <div class="e-j-item-m-3">
              Multiple
            </div>
            <div class="e-j-item-m-3">
              Full time
            </div>

          </div>
          <div class="e-j-item-r">
            <div class="e-j-item-r-1">90% match</div>
            <div class="e-j-item-r-2">
              <el-avatar class="e-j-c-item-avatar"></el-avatar>
            </div>
          </div>
        </div>

      </div>

      <div class="e-j-item-bg">
        <div class="e-j-item">
          <div class="e-j-item-l">
            <el-avatar class="e-j-c-item-avatar"></el-avatar>
          </div>
          <div class="e-j-item-m">
            <div class="e-j-item-m-1">State College</div>
            <div class="e-j-item-m-2">
              DIRECTOR OF FACULTY
            </div>
            <div class="e-j-item-m-3">
              Salary: $150,000-200,000/year
            </div>
            <div class="e-j-item-m-3">
              London, UK
            </div>
            <div class="e-j-item-m-3">
              Full time
            </div>

          </div>
          <div class="e-j-item-r">
            <div class="e-j-item-r-1">77% match</div>
            <div class="e-j-item-r-2">
              <el-avatar class="e-j-c-item-avatar"></el-avatar>
            </div>
          </div>
        </div>

      </div>


    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "dailyJobMatch"
}
</script>

<style scoped>

.e-j {

  padding: 25px 50px;
  box-shadow: 0px 0px 23px #00000012;
  border-radius: 18px;
  background-color: #FFFFFF;

}

.e-j-label {
  font-family: BSemiBold, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 30px;
  color: #262626;
}

.e-j-c {
  margin-top: 25px;
}

.e-j-item-bg {
  border-bottom: 1px solid #F0F2F5;
  padding: 25px 0;
}

.e-j-item {
  box-shadow: 0px 3px 23px #00000026;
  border-radius: 18px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 25px;
}

.e-j-c-item-avatar {
  width: 70px;
  height: 70px;

}

.e-j-item-l {
  width: 80px;
}

.e-j-item-m {
  width: calc(100% - 190px);
}

.e-j-item-r {
  width: 110px;
  text-align: center;
}

.e-j-item-m-1 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #262626;
}

.e-j-item-m-2 {
  font-family: BCRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 25px;
  color: #262626;
}

.e-j-item-m-3 {
  font-family: AssiRegular, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: #262626;
}

</style>