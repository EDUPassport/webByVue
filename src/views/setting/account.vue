<template>
    <div class="account-bg">

        <div class="account-top-container">
            <div class="account-top-l">
                <div class="account-label">
                    <span>Change Password</span>
                </div>
                <div class="account-tips">
                    <span>Changing your password is a simple but effective way to do this!</span>
                </div>
            </div>
            <div class="account-top-r">
                <el-button type="info">Cancel</el-button>
                <el-button type="success">Update Password</el-button>
            </div>

        </div>

        <div class="account-form">
            <el-form
                    ref="accountForms"
                    :model="accountForm"
                    :rules="accountRules"
                    label-width="220px"
                    label-position="left"
                    class="demo-ruleForm"
            >
                <el-form-item label="Current Password">
                    <el-input v-model="accountForm.current_password"
                              placeholder="Enter your Current Password"></el-input>
                </el-form-item>
                <el-form-item label="New Password">
                    <el-input v-model="accountForm.password" placeholder="Enter your New Password"></el-input>
                </el-form-item>
                <el-form-item label="Confirm New Password">
                    <el-input v-model="accountForm.confirm_password" placeholder="Confirm New Password"></el-input>
                </el-form-item>

            </el-form>
        </div>

        <div class="ctb-container">
            <div class="ctb-t">
                <span>Current Contributors</span>
                <el-button type="primary">+ Add Contributors</el-button>
            </div>
            <div class="ctb-b">
                <el-table>
                    <el-table-column></el-table-column>
                </el-table>
            </div>
        </div>

        <div class="delete-container">
            <deleteAccountComponent></deleteAccountComponent>
        </div>

    </div>
</template>

<script>
import {ref, reactive} from 'vue'
import deleteAccountComponent from '@/components/deleteAccountComponent.vue'

export default {
    name: "account",
    components:{
        deleteAccountComponent
    },
    setup() {
        const verificationVisible = ref(false)
        const accountForms = ref(null)
        const accountForm = reactive({
            password: '',
            confirm_password: '',
            current_password: ''
        })

        const accountRules = reactive({
            email_code: [
                {required: true, message: 'Please fill out your code.', trigger: 'blur'}
            ],
            email: [
                {type: 'email', required: true, message: 'Please fill out your email address.', trigger: 'blur'}
            ],
            password: [
                {required: true, message: 'Please enter your password', trigger: 'blur'}
            ],
            confirm_password: [
                {required: true, message: 'Please enter your password again', trigger: 'blur'}
            ]
        })

        function confirmDelete() {
            verificationVisible.value = true
        }

        return {
            accountForms,
            accountForm,
            accountRules,
            verificationVisible,
            confirmDelete
        }
    }
}
</script>

<style scoped>
.account-bg {
    height: calc(var(--i-window-height) - 144px);
    display: flex;
    flex-direction: column;

}

.account-top-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 40px 40px 0 40px;
    border-bottom: 1px solid #D0D5DD;
}

.account-label {

}

.account-label span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.account-tips {
    padding-bottom: 24px;
}

.account-tips span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
}

.account-form {
    margin: 24px 40px;
}

.delete-container{
    margin: auto 40px 40px 40px;
}

</style>
