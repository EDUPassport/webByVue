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
                <div class="label">Verification Code</div>
                <div class="tips">
                    A Verification code already sent to your email address
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
                        <el-form-item label="6-Digit-Code" prop="code">
                            <sixInputVerificationCode @disabled="disabledNext"
                                                      @complete="sixCodeComplete"></sixInputVerificationCode>
                        </el-form-item>

                        <check-code-button
                                type="delete-account"
                                email=""
                                text="Resend Code"
                                success-text="Resend Code Successfully">
                        </check-code-button>

                        <el-form-item v-if="type === 'deleteAccount' ">
                            <el-button class="next-btn"
                                       size="large"
                                       type="primary"
                                       :loading="deleteAccountLoadingStatus"
                                       :disabled="nextDisabledStatus"
                                       @click="deleteAccount(vForms)">
                                Delete Account
                            </el-button>
                        </el-form-item>

                    </el-form>

                </div>

            </div>

        </el-dialog>

    </div>
</template>

<script>
import {ElMessage} from 'element-plus'
import sixInputVerificationCode from "@/components/register/sixInputVerificationCode.vue";
import checkCodeButton from "@/components/register/checkCodeButton.vue";
import {ref, reactive} from 'vue'
import {CANCEL_MYSELF_ACCOUNT} from "@/api/api";

export default {
    name: "verificationCodeDialog",
    props: ['info', 'visible', 'qrcodeValue', 'type'],
    components: {
        sixInputVerificationCode,
        checkCodeButton
    },
    setup(props,context) {

        const deleteAccountLoadingStatus = ref(false)
        const nextDisabledStatus = ref(true)

        function disabledNext(e) {
            console.log(e)
            nextDisabledStatus.value = e;
        }

        const vForms = ref(null)

        const vForm = reactive({
            code: ''
        })

        const vRules = reactive({
            code: [
                {required: true, message: 'Enter verification code', trigger: 'blur'}
            ],
        })

        function sixCodeComplete(e) {
            console.log(e)
            vForm.code = parseInt(e.join(''))
            
        }

        function deleteAccount(formName) {
            if (!formName) return;
            deleteAccountLoadingStatus.value = true;

            formName.validate((valid) => {
                if (valid) {
                    let params = Object.assign({}, vForm)

                    CANCEL_MYSELF_ACCOUNT(params).then(res => {
                        console.log(res)
                        if (res.code == 200) {
                             context.emit('success')

                            deleteAccountLoadingStatus.value = false;
                        }

                    }).catch(err => {
                        console.log(err)
                        deleteAccountLoadingStatus.value = false;

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
                    console.log('error submit!!')
                    deleteAccountLoadingStatus.value = false;
                    ElMessage({
                        type: 'warning',
                        message: 'Enter your verification code',
                        grouping: true
                    })
                    return false
                }
            })

        }

        return {
            disabledNext,
            vForm,
            vRules,
            vForms,
            sixCodeComplete,
            nextDisabledStatus,
            deleteAccount,
            deleteAccountLoadingStatus

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


    }

}
</script>

<style scoped>

.dialog-container {
    width: 430px;
    height: 310px;
    margin: 0 auto;
    padding: 70px 95px;
    background-color: #FFFFFF;
    position: relative;
}

/deep/ .el-dialog {
    --el-dialog-bg-color: none;
    --el-dialog-box-shadow: none;
}

.label {
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
