<template>

    <el-button
            v-if="jobInfo.is_applied === 1"
            type="primary"
            disabled
    >
        <el-icon :size="16" style="margin-right: 10px;">
            <IconGgCheckO />
        </el-icon>
        Applied
    </el-button>
    <el-button
            v-else
            type="primary"
            :loading="applyBtnLoading"
            @click="applyJob()">
        {{ btnText }}
    </el-button>
    
    <template v-if="applyVisible">
        <successMessage :visible="applyVisible"
                        :title="applyTitle"
                        :description="applyDescription"
                        @close="applyVisible=false">
        </successMessage>
    </template>

</template>

<script setup>

import {APPLY_JOBS} from "@/api/api";
import {defineProps, defineEmits,ref} from 'vue'
import SuccessMessage from "@/components/popup/submitMessage.vue";

const props = defineProps(['btnText', 'jobFrom','jobIndex','jobInfo', 'loading', 'selectJobId'])
const emit = defineEmits(['success'])

const applyBtnLoading = ref(false)
const applyVisible = ref(false)
const applyTitle = ref('')
const applyDescription = ref('')

const identity = localStorage.getItem('identity')
const token = localStorage.getItem('token')
const userId = localStorage.getItem('uid')

const applyJob = ()=> {
 
    if (token) {

        if (userId == props.jobInfo.user_id) {
            applyVisible.value = true;
            applyTitle.value = 'Warning'
            applyDescription.value = 'Users cannot apply for jobs posted by themselves'
            return;
        }

        if (props.selectJobId == props.jobInfo.id) {
            applyBtnLoading.value = true;
        }

        if (identity == 1) {
            let params = {
                job_id: props.jobInfo.id,
                token: token
            }

            APPLY_JOBS(params).then(res => {
                if (res.code == 200) {
                    // this.$message.success('Apply Success')
                    applyBtnLoading.value = false;
                    applyVisible.value = true;
                    applyTitle.value = 'Success'
                    applyDescription.value = 'Your Application to ' + props.jobInfo.job_title + ' has been successfully sent.'
                    emit('success', props.jobFrom, props.jobIndex)
                }
            }).catch(err => {
                console.log(err)
                
                applyVisible.value = true;
                applyTitle.value = 'Warning'
                applyDescription.value = err.msg

                applyBtnLoading.value = false

            })

        } else {

            applyVisible.value = true;
            applyTitle.value = 'Warning'
            applyDescription.value = 'Please switch to an educator profile to be able to apply'

            applyBtnLoading.value = false;

        }


    } else {
        applyVisible.value = true;
        applyTitle.value = 'Warning'
        applyDescription.value = ' Please log in & fill in your profile to be able to apply.'
    }


}

</script>

<style scoped>

@media screen and (max-width: 768px) {

}
</style>