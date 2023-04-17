<template>
    <div>
        <el-dialog :model-value="visible"
                   width="600px"
                   center
                   align-center
                   :show-close="false"
                   :before-close="beforeClose"
                   draggable
        >

            <div class="dialog-container">
                <div class="dialog-img-container">
                    <el-image class="dialog-img" :src="contributorPersonIcon"></el-image>
                </div>
                <div class="label">Add Contributor</div>
                <div class="tips">
                    Enter the email address for the user to join as contributor
                </div>
                <div class="form">
                    <el-form
                            :model="vForm"
                            :rules="vRules"
                            ref="vForms"
                            label-width="100px"
                            label-position="top"
                            class="demo-ruleForm"
                    >
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="vForm.email" placeholder="Enter a valid email address"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button class="next-btn"
                                       size="large"
                                       type="primary"
                                       @click="sendInvite(vForms)">
                                Send Invite
                            </el-button>
                        </el-form-item>

                    </el-form>

                </div>

            </div>

        </el-dialog>

    </div>
</template>

<script>
import contributorPersonIcon from '@/assets/newHome/add-contributor-person.svg'
import contributorSuccessIcon from '@/assets/newHome/add-contributors-success.svg'
import {ElMessage, ElMessageBox} from 'element-plus'
import {ref, reactive, onMounted} from 'vue'

export default {
    name: "verificationCodeDialog",
    props: ['info', 'visible', 'qrcodeValue'],
    data() {
        return {
            contributorPersonIcon,
            contributorSuccessIcon
        }
    },
    setup() {

        const nextDisabledStatus = ref(true)

        function disabledNext(e) {
            console.log(e)
            nextDisabledStatus.value = e;
        }

        const vForms = ref(null)

        const vForm = reactive({
            email: ''
        })

        const vRules = reactive({
            email: [
                {type: 'email', required: true, message: 'Enter a valid email address', trigger: 'blur'}
            ]
        })

        function sendInvite(formName) {
            if (!formName) return;
            formName.validate((valid) => {
                if (valid) {
                    let params = Object.assign({}, vForm)
                    console.log(params)

                    ElMessageBox.confirm(
                        'Invitation Sent',
                        'Warning',
                        {
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Cancel',
                            type: 'warning',
                            center: true,
                        }
                    )
                        .then(() => {
                            ElMessage({
                                type: 'success',
                                message: 'Delete completed',
                            })
                        })
                        .catch(() => {
                            ElMessage({
                                type: 'info',
                                message: 'Delete canceled',
                            })
                        })

                } else {
                    console.log('error submit!!')
                    ElMessageBox.confirm(
                        '<div class="box-avatar"></div><div >Invitation Sent</div><a href="https://www.baidu.com">Invite sent successfully. We’ll let you know when user joins.</a>',
                        '',
                        {
                            customClass:'edu-msg-box',
                            confirmButtonText: 'OK',
                            cancelButtonText: 'Close',
                            center: true,
                            dangerouslyUseHTMLString:true
                        }
                    )
                        .then(() => {
                            ElMessage({
                                type: 'success',
                                message: 'Delete completed',
                            })
                        })
                        .catch(() => {
                            ElMessage({
                                type: 'info',
                                message: 'Delete canceled',
                            })
                        })

                    ElMessage({
                        type: 'warning',
                        message: 'Enter a valid email address',
                        grouping: true
                    })
                    return false
                }
            })

        }

        onMounted(() => {

        })

        return {
            disabledNext,
            vForm,
            vRules,
            vForms,
            nextDisabledStatus,
            sendInvite

        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        beforeClose(done) {
            this.$emit('close')
            done()
        },
        readMoreDeal(userId, identity, companyId) {
            this.$emit('viewProfile', userId, identity, companyId)
        },
        share(info) {
            this.$emit('share', info)
        }

    }

}
</script>

<style scoped>

.dialog-container {

    margin: 0 auto;
    padding: 23px 85px;
    background-color: #FFFFFF;
    position: relative;
    border-radius: 8px;
}

/deep/ .el-dialog {
    --el-dialog-bg-color: none;
    --el-dialog-box-shadow: none;
}

.dialog-img-container{
    text-align: center;
}

.dialog-img{
    width: 70px;
    height: 70px;
}

.label {
    margin-top: 20px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    color: #101828;

}

.tips {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;

    text-align: center;

    color: #667085;
    margin-top: 12px;

}

.form {
    margin-top: 40px;
}

.next-btn {
    width: 100%;
    margin-top: 40px;
}


@media screen and (max-width: 768px) {
    .dialog-container {
        width: 100%;
        height: auto;
    }

}
</style>
