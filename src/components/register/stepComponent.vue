<template>
  <div class="step-container">

    <template v-if="userType === 'educator' ">

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>1">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 1">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 1">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Select your profile</div>
          <div class="step-item-r-tips">Tell us about yourself a bit.</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>2">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 2">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 2">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Provide your details</div>
          <div class="step-item-r-tips">Enter your Name, Nationality and Residence</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>3">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 3">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 3">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Create your account</div>
          <div class="step-item-r-tips">Enter your email address and setup your password</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>4">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 4">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 4">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Account Verification</div>
          <div class="step-item-r-tips">Verify your email address</div>
        </div>
      </div>
    </template>

    <template v-if="userType === 'business' || userType === 'school' || userType === 'recruiter' || userType === 'other' ">

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>1">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 1">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 1">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Select your profile</div>
          <div class="step-item-r-tips">Tell us about yourself a bit.</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>2">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 2">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 2">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Business Type</div>
          <div class="step-item-r-tips">Tell us your business type</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>3">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 3">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 3">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Provide your details</div>
          <div class="step-item-r-tips">Enter your Name, Nationality and Residence</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>4">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 4">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 4">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Create your account</div>
          <div class="step-item-r-tips">Enter your email address and setup your password</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>5">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 5">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 5">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Account Verification</div>
          <div class="step-item-r-tips">Verify your email address</div>
        </div>
      </div>
    </template>

    <template v-if="userType === 'vendor' ">

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>1">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 1">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 1">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Select your profile</div>
          <div class="step-item-r-tips">Tell us about yourself a bit.</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>2">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 2">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 2">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Provide your details</div>
          <div class="step-item-r-tips">Enter your Name, Nationality and Residence</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>3">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 3">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 3">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Create your account</div>
          <div class="step-item-r-tips">Enter your email address and setup your password</div>
        </div>
      </div>

      <div class="step-item">
        <div class="step-item-l">
          <template v-if="stepIndex>4">
            <el-image class="step-item-l-img" :src="step1img"></el-image>
          </template>
          <template v-if="stepIndex == 4">
            <el-image class="step-item-l-img" :src="step2img"></el-image>
          </template>
          <template v-if="stepIndex < 4">
            <el-image class="step-item-l-img" :src="step3img"></el-image>
          </template>

        </div>
        <div class="step-item-r">
          <div class="step-item-r-label">Account Verification</div>
          <div class="step-item-r-tips">Verify your email address</div>
        </div>
      </div>
    </template>



  </div>

</template>

<script>
import step1img from '@/assets/newHome/register/step-1.png'
import step2img from '@/assets/newHome/register/step-2.png'
import step3img from '@/assets/newHome/register/step-3.png'

export default {
  name: "stepComponent",
  props:{
    userType:{
      type:String,
      default:'educator'
    },
    stepIndex:{
      type:[String,Number],
      default: 1
    }

  },
  data() {
    return {
      step1img,
      step2img,
      step3img
    }
  }
}
</script>

<style scoped>

.step-container{
  margin: 40px 0 0 60px;
}

.step-item{
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 30px;
}

.step-item-l-img{
  width: 30px;
  height: 30px;
}

.step-item-r{
  margin-left: 20px;
}

.step-item-r-label{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */


  /* Grey/800 */

  color: #1D2939;
}

.step-item-r-tips{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */


  /* Grey/500 */

  color: #667085;
}

</style>