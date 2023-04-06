<template>
  <div class="profile-bg">

    <div class="profile-top-container">
      <div class="profile-top-l">
        <div class="profile-label">
          <span>Personal Information</span>
        </div>
        <div class="profile-tips">
          <span>Update your personal Information and Photo Here</span>
        </div>
      </div>
      <div class="profile-top-r">
        <el-button type="info">Cancel</el-button>
        <el-button type="primary">Save & Continue</el-button>
      </div>

    </div>

    <div class="profile-form">
      <el-form
          ref="profileForms"
          :model="profileForm"
          :rules="profileRules"
          label-width="220px"
          label-position="left"
          class="demo-ruleForm"
      >
        <el-form-item label="Name">
          <el-input v-model="profileForm.first_name" placeholder="Enter First Name"></el-input>
          <el-input v-model="profileForm.last_name" placeholder="Enter Second Name"></el-input>
        </el-form-item>
        <el-form-item label="E-mail Address">
          <el-input v-model="profileForm.email" placeholder="Enter your E-mail"></el-input>
        </el-form-item>
        <el-form-item label="Profile Picture">
          <el-input v-model="profileForm.profile_photo" placeholder="profile photo"></el-input>
        </el-form-item>

      </el-form>
    </div>

    <div class="delete-container">
      <div class="delete-l">
        <div class="delete-label">Delete Account</div>
        <div class="delete-tips">
          By clicking on Delete Account Button your account will be removed permanently
        </div>
      </div>
      <div class="delete-r">
        <el-popconfirm
            width="310"
            :hide-icon="true"
            confirm-button-text="Yes"
            cancel-button-text="No"
            title="This action will remove your account permanently, Are your sure?"
            @confirm="confirmDelete"
        >
          <template #reference>
            <el-button type="danger">Delete Account</el-button>
          </template>

        </el-popconfirm>

      </div>

    </div>

    <verificationCodeDialog :visible="verificationVisible" @close="verificationVisible=false"></verificationCodeDialog>

  </div>
</template>

<script>
import verificationCodeDialog from "@/components/verificationCodeDialog.vue";
import {ref, reactive} from 'vue'
export default {
  name: "educator",
  components:{
    verificationCodeDialog
  },
  setup(){
    const profileForms = ref(null)
    const profileForm = reactive({
      password:'',
      confirm_password:'',
      current_password:''
    })

    const profileRules = reactive({
      email_code: [
        {required: true, message: 'Please fill out your code.', trigger: 'blur'}
      ],
      email: [
        {type:'email',required: true, message: 'Please fill out your email address.', trigger: 'blur'}
      ],
      password: [
        {required: true, message: 'Please enter your password', trigger: 'blur'}
      ],
      confirm_password: [
        {required: true, message: 'Please enter your password again', trigger: 'blur'}
      ]
    })

    const verificationVisible = ref(false)
    function confirmDelete(){
      verificationVisible.value = true
    }

    return {
      profileForms,
      profileForm,
      profileRules,
      verificationVisible,
      confirmDelete
    }
  }
}
</script>

<style scoped>
.profile-bg{
  height: calc(var(--i-window-height) - 144px);
  display: flex;
  flex-direction: column;

}

.profile-top-container{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 40px 40px 0 40px;
  border-bottom: 1px solid #D0D5DD;
}

.profile-label{

}
.profile-label span{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: #101828;
}
.profile-tips{
  padding-bottom: 24px;
}
.profile-tips span{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #667085;
}

.profile-form{
  margin:24px 40px;
}

.delete-container{
  border-top:1px solid #D0D5DD;
  margin: auto 40px 40px 40px;
  padding: 27px 27px 0 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.delete-label{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  /* identical to box height, or 140% */


  /* Gray/900 */

  color: #101828;
}

.delete-tips{
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */


  /* Grey/500 */

  color: #667085;
}

</style>
