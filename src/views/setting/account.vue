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
                        <el-table-column min-width="120px" prop="last_name" label="Name"></el-table-column>
                        <el-table-column min-width="160px" prop="email" label="Email Address"></el-table-column>
                        <el-table-column min-width="100px" prop="permission" label="Permission">Contributor</el-table-column>
                        <el-table-column prop="status" label="Status">
                            <div class="contributor-tag"> <span></span> online</div>
                        </el-table-column>
                        <el-table-column label="">
                            <template #default="scope">
                                <div style="text-align: right;">
                                    <el-popconfirm
                                        width="310"
                                        :hide-icon="true"
                                        confirm-button-text="Yes"
                                        cancel-button-text="No"
                                        title="This action will remove your contributor account permanently, Are your sure?"
                                        @confirm="handleDelete(scope.row)"
                                    >
                                        <template #reference>
                                            <el-icon style="cursor: pointer;margin-right: 35px;" color="#F97066" >
                                                <Delete></Delete>
                                            </el-icon>
                                        </template>
                                    </el-popconfirm>

                                </div>

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
import {ref, reactive, onMounted} from 'vue'
import deleteAccountComponent from '@/components/deleteAccountComponent.vue'
import {useStore} from 'vuex'
import {ALL_ASSIGN_USERS, ALL_MENU_LIST, USER_ADD_MENU, USER_CHANGE_PASSWORD, USER_MENU_DELETE} from "@/api/api";
import {ElMessage, ElMessageBox, ElLoading} from 'element-plus'

export default {
    name: "account",
    components: {
        deleteAccountComponent
    },
    setup() {

        const store = useStore()
        const identity = store.state.identity;
        const currentCompanyId = store.state.currentCompanyId;

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

        const contributorsData = ref([])

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
            let params = {
                user_id:row.id
            }
            USER_MENU_DELETE(params).then(res=>{
                console.log(res)
                if(res.code === 200){
                    getAllAssignUsers()
                }
            }).catch(err=>{
                console.log(err)
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

        }

        const addContributorsDialogVisible = ref(false)

        const createContributors = () => {
            let confirmButtonLoadingStatus = false
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
                    confirmButtonLoading:confirmButtonLoadingStatus

                }
            )
                .then((res) => {
                    if(res.action === 'confirm'){
                       const loading =  ElLoading.service({
                            lock: true,
                            text: 'Loading',
                            background: 'rgba(255, 255, 255, 0.7)',
                        })

                        let email = res.value;

                        ALL_MENU_LIST({}).then(res => {
                            console.log(res)
                            if (res.code == 200) {

                                let resData = res.message

                                let educatorMenuData = resData.educator
                                let recruiterMenuData = resData.recruiting
                                let schoolMenuData = resData.school
                                let otherMenuData = resData.other
                                let vendorMenuData = resData.vendor

                                let menuPermissionData = []

                                if (identity == 1) {
                                    menuPermissionData = educatorMenuData
                                }
                                if (identity == 2) {
                                    menuPermissionData = recruiterMenuData
                                }
                                if (identity == 3) {
                                    menuPermissionData = schoolMenuData
                                }
                                if (identity == 4) {
                                    menuPermissionData = otherMenuData
                                }
                                if (identity == 5) {
                                    menuPermissionData = vendorMenuData
                                }

                                let menuIdData = []
                                menuPermissionData.forEach(item=>{
                                    menuIdData.push(item.id)
                                })

                                let aParams = {
                                    email: email,
                                    identity: identity,
                                    company_id: currentCompanyId,
                                    menu_id: menuIdData.join(',')
                                }

                                console.log(aParams)

                                USER_ADD_MENU(aParams).then(res => {
                                    console.log(res)
                                    if (res.code == 200) {
                                        loading.close()

                                        ElMessageBox.confirm(
                                            '<div class="box-avatar-warn"></div>' +
                                            '<div class="box-label">Alert!</div>' +
                                            '<div class="box-tips">This user is already registered at EDU Passport. <br /> We’ve sent an invitation to his email for Contributor Access</div>',
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

                                                console.log('closed success')
                                                // ElMessage({
                                                //     type: 'success',
                                                //     message: 'Closed Success',
                                                // })
                                            })
                                            .catch(() => {
                                                console.log('cancel close sent')
                                                getAllAssignUsers()
                                            })

                                    }
                                }).catch(err => {
                                    console.log(err)
                                })

                            }
                        }).catch(err => {
                            console.log(err)
                        })


                    }
                })
                .catch((e) => {
                    console.log(e)
                })

        }

        const getAllAssignUsers = ()=> {
            let params = {}
            ALL_ASSIGN_USERS(params).then(res => {
                console.log(res)
                if (res.code === 200) {
                    contributorsData.value = res.message
                }
            }).catch(err => {
                console.log(err)
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
        }

        onMounted(()=>{
            getAllAssignUsers()

        })

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
            createContributors,
            getAllAssignUsers
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

.contributor-tag{
    width: 58px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    /* identical to box height, or 150% */


    /* Success/500 */

    color: #12B76A;
    background: #ECFDF3;
    border-radius: 22px;
}

.contributor-tag span{
    display: block;
    margin-right: 2px;
    width: 4px;
    height: 4px;
    border-radius: 4px;
    background-color: #12B76A;
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
