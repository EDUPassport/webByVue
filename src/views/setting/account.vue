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
                    <el-button type="primary" @click="addContributorsDialogVisible=true">+ Add Contributors</el-button>
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

    <addContributorsDialog :visible="addContributorsDialogVisible" @close="addContributorsDialogVisible=false" ></addContributorsDialog>

</template>

<script>
import {ref, reactive} from 'vue'
import deleteAccountComponent from '@/components/deleteAccountComponent.vue'
import addContributorsDialog from "@/components/addContributorsDialog.vue";

export default {
    name: "account",
    components:{
        deleteAccountComponent,
        addContributorsDialog
    },
    setup() {

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

        const contributorsData = ref([
            {
                name:'Jack Hill',
                email:'jackhill@edupassport.io',
                permission:'Contributor',
                status:'Online'
            },
            {
                name:'Jack Hill',
                email:'jackhill@edupassport.io',
                permission:'Contributor',
                status:'Away'
            },
            {
                name:'Jack Hill',
                email:'jackhill@edupassport.io',
                permission:'Contributor',
                status:'Online'
            },
            {
                name:'Jack Hill',
                email:'jackhill@edupassport.io',
                permission:'Contributor',
                status:'Online'
            },
            {
                name:'Jack Hill',
                email:'jackhill@edupassport.io',
                permission:'Contributor',
                status:'Away'
            },
            {
                name:'Jack Hill',
                email:'jackhill@edupassport.io',
                permission:'Contributor',
                status:'Online'
            }
        ])

        function handleDelete(row){
            console.log(row)
        }

        const addContributorsDialogVisible = ref(false)

        return {
            accountForms,
            accountForm,
            accountRules,
            contributorsData,
            handleDelete,
            addContributorsDialogVisible
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

.account-scroll-container{
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

.delete-container{
    margin: auto 40px 40px 40px;
}

.ctb-container{
    margin: 24px 40px;
}

.ctb-t {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.ctb-t span{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #1D2939;
}

.ctb-b{

    width: calc(100% - 4px);
    margin-top: 20px;
    background: #FFFFFF;
    border: 1px solid #EAECF0;
    /*box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);*/
    border-radius: 8px;
    overflow: hidden;
}

/deep/ .el-table--default .el-table__header .cell{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #475467;
}

/deep/ .el-table--default .el-table__body .cell{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #1D2939;
}

</style>
