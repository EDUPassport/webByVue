<template>
    <div class="delete">
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
                    <el-button type="danger" :loading="deleteLoadingStatus">Delete Account</el-button>
                </template>

            </el-popconfirm>

        </div>

    </div>

    <verificationCodeDialog type="deleteAccount"
                            :visible="verificationVisible"
                            @success="deleteSuccess"
                            @close="verificationVisible=false">
    </verificationCodeDialog>

</template>

<script>
import {ref} from 'vue'
import verificationCodeDialog from "@/components/verificationCodeDialog.vue";
import {SEND_DELETE_USER_CODE} from "@/api/api";
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'

export default {
    name: "deleteAccountComponent",
    components:{
        verificationCodeDialog
    },
    setup(){
        const verificationVisible = ref(false)
        const router = useRouter()
        const deleteLoadingStatus = ref(false)

        function confirmDelete(){

            deleteLoadingStatus.value = true;

            SEND_DELETE_USER_CODE().then(res=>{
                if(res.code === 200){
                    ElMessage({
                        type: 'success',
                        message: "Success",
                        grouping: true
                    })

                    verificationVisible.value = true;
                    deleteLoadingStatus.value = false;
                }
            }).catch(err=>{
                deleteLoadingStatus.value = false;
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

        function deleteSuccess(){
            console.log('delete success')
            localStorage.clear()
            router.push('/delete/account/success')
        }

        return {
            verificationVisible,
            confirmDelete,
            deleteSuccess,
            deleteLoadingStatus
        }
    }

}
</script>

<style scoped>

.delete{
    padding: 27px 27px 0 0;
    border-top:1px solid #D0D5DD;
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
    color: #101828;
}

.delete-tips{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #667085;
}

</style>