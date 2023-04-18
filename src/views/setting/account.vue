<template>
    <div class="account-bg">

        <el-scrollbar class="account-scroll-container">
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
                    <el-button type="info" @click="cancelUpdatePassword(accountForms)">Cancel</el-button>
                    <el-button type="success"
                               :loading="submitPasswordLoading"
                               @click="submitUpdatePassword(accountForms)">
                        Update Password
                    </el-button>
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
                    <el-form-item label="Current Password" prop="password">
                        <el-input v-model="accountForm.password"
                                  placeholder="Enter your Current Password"></el-input>
                    </el-form-item>
                    <el-form-item label="New Password" prop="new_password">
                        <el-input v-model="accountForm.new_password" placeholder="Enter your New Password"></el-input>
                    </el-form-item>
                    <el-form-item label="Confirm New Password" prop="confirm_password">
                        <el-input v-model="accountForm.confirm_password" placeholder="Confirm New Password"></el-input>
                    </el-form-item>

                </el-form>
            </div>

            <div class="ctb-container">
                <div class="ctb-t">
                    <span>Current Contributors</span>
                    <el-button type="primary" @click="createContributors()">+ Add Contributors</el-button>
                </div>
                <div class="ctb-b">
                    <el-table
                            :data="contributorsData"
                            flexible
                            max-height="224px"
                    >
                        <el-table-column prop="name" label="Name"></el-table-column>
                        <el-table-column prop="email" label="Email Address"></el-table-column>
                        <el-table-column prop="permission" label="Permission"></el-table-column>
                        <el-table-column prop="status" label="Status"></el-table-column>
                        <el-table-column label="">
                            <template #default="scope">
                                <el-icon @click="handleDelete(scope.row)">
                                    <Delete></Delete>
                                </el-icon>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

        </el-scrollbar>

        <div class="delete-container">
            <deleteAccountComponent></deleteAccountComponent>
        </div>


    </div>

</template>

<script>
import {ref, reactive} from 'vue'
import deleteAccountComponent from '@/components/deleteAccountComponent.vue'

import {USER_CHANGE_PASSWORD} from "@/api/api";
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
    name: "account",
    components: {
        deleteAccountComponent
    },
    setup() {

        const accountForms = ref(null)
        const accountForm = reactive({
            password: '',
            confirm_password: '',
            new_password: ''
        })

        const accountRules = reactive({

            password: [
                {required: true, message: 'Enter your Current Password', trigger: 'blur'}
            ],
            new_password: [
                {required: true, message: 'Enter your New Password', trigger: 'blur'}
            ],
            confirm_password: [
                {required: true, message: 'Confirm New Password', trigger: 'blur'}
            ]
        })

        const contributorsData = ref([
            {
                name: 'Jack Hill',
                email: 'jackhill@edupassport.io',
                permission: 'Contributor',
                status: 'Online'
            },
            {
                name: 'Jack Hill',
                email: 'jackhill@edupassport.io',
                permission: 'Contributor',
                status: 'Away'
            },
            {
                name: 'Jack Hill',
                email: 'jackhill@edupassport.io',
                permission: 'Contributor',
                status: 'Online'
            },
            {
                name: 'Jack Hill',
                email: 'jackhill@edupassport.io',
                permission: 'Contributor',
                status: 'Online'
            },
            {
                name: 'Jack Hill',
                email: 'jackhill@edupassport.io',
                permission: 'Contributor',
                status: 'Away'
            },
            {
                name: 'Jack Hill',
                email: 'jackhill@edupassport.io',
                permission: 'Contributor',
                status: 'Online'
            }
        ])

        const submitPasswordLoading = ref(false)

        const cancelUpdatePassword = (formEl) => {
            if (!formEl) return
            formEl.resetFields()
        }

        const submitUpdatePassword = (formEl) => {
            if (!formEl) return

            formEl.validate((valid) => {
                if (valid) {
                    submitPasswordLoading.value = true;

                    let params = Object.assign({}, accountForm)
                    USER_CHANGE_PASSWORD(params).then(res => {
                        console.log(res)
                        if (res.code === 200) {
                            ElMessage({
                                type: 'success',
                                message: 'Password Changed Successfully',
                                grouping: true
                            })
                            submitPasswordLoading.value = false
                        }
                    }).catch(err => {
                        submitPasswordLoading.value = false

                        if (err.msg) {
                            ElMessage({
                                type: 'error',
                                message: err.msg,
                                grouping: true
                            })
                            return;
                        }

                        if (err.message) {
                            ElMessage({
                                type: 'error',
                                message: err.message,
                                grouping: true
                            })

                        }
                    })
                } else {
                    console.log('error submit')
                }
            })
        }

        function handleDelete(row) {
            console.log(row)
        }

        const addContributorsDialogVisible = ref(false)

        const createContributors = () => {
            ElMessageBox.prompt(
                '<div class="box-avatar-person"></div>' +
                '<div class="box-label">Add Contributor</div>' +
                '<div class="box-tips">Enter the email address for the user to join as contributor</div>' +
                '<div class="box-form-label">Email</div>',
                '',
                {
                    customClass: 'edu-msg-box',
                    confirmButtonClass: 'box-prompt-confirm-button',
                    confirmButtonText: 'Send Invite',
                    buttonSize: 'large',
                    showCancelButton: false,
                    dangerouslyUseHTMLString: true,
                    inputPattern:
                        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: 'Enter a invalid email address',
                    inputPlaceholder: 'Enter your email',
                    confirmButtonLoading:false

                }
            )
                .then((res) => {
                    if(res.action === 'confirm'){
                        alert(res.value)

                        ElMessageBox.confirm(
                            '<div class="box-avatar"></div>' +
                            '<div class="box-label">Invitation Sent</div>' +
                            '<div class="box-tips">Invite sent successfully. We’ll let you know when user joins.</div>',
                            '',
                            {
                                customClass:'edu-msg-box',
                                cancelButtonClass:'box-cancel-button',
                                cancelButtonText: 'Close',
                                buttonSize:'large',
                                showConfirmButton:false,
                                center: true,
                                dangerouslyUseHTMLString:true
                            }
                        )
                            .then(() => {
                                ElMessage({
                                    type: 'success',
                                    message: 'Closed Success',
                                })
                            })
                            .catch(() => {
                                console.log('cancel close sent')
                            })


                    }
                })
                .catch((e) => {
                    console.log(e)
                })

        }

        return {
            accountForms,
            accountForm,
            accountRules,
            cancelUpdatePassword,
            submitUpdatePassword,
            contributorsData,
            handleDelete,
            submitPasswordLoading,
            addContributorsDialogVisible,
            createContributors
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

.account-scroll-container {
    height: calc(var(--i-window-height) - 220px);
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

.delete-container {
    margin: auto 40px 40px 40px;
}

.ctb-container {
    margin: 24px 40px;
}

.ctb-t {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.ctb-t span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #1D2939;
}

.ctb-b {

    width: calc(100% - 4px);
    margin-top: 20px;
    background: #FFFFFF;
    border: 1px solid #EAECF0;
    /*box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);*/
    border-radius: 8px;
    overflow: hidden;
}

/deep/ .el-table--default .el-table__header .cell {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #475467;
}

/deep/ .el-table--default .el-table__body .cell {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #1D2939;
}

@media screen and (max-width: 768px) {

    .account-top-container{
        margin: 24px 24px 0 24px;
        flex-direction: column;
    }
    .account-label span{font-size: 18px;}

    .account-tips{padding-bottom: 10px}
    .account-tips span{
        font-size: 14px;
    }

    .account-top-r{
        width: 100%;
        text-align: right;
        margin-bottom: 24px;
    }


    .account-form{
        margin: 24px;
    }

    /deep/ .el-form-item{
        flex-direction: column;
    }

    .ctb-container{
        margin: 24px;
    }

    .ctb-t span{
        font-size: 16px;
    }

    .delete-container{
        margin: 0 24px 24px 24px;
    }
}

</style>
