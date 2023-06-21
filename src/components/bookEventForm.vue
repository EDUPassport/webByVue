<template>
    <div>
        <el-dialog :model-value="visible"
                   title="RSVP"
                   :before-close="beforeClose"
                   :width="width"
        >
            <el-form
                    :model="bookForm"
                    :rules="bookRules"
                    ref="bookForms"
                    require-asterisk-position="right"
                    label-position="top"
                    class="demo-ruleForm"
            >
                <div class="event-detail-form-input">
                    <div class="event-detail-form-item2">
                        <el-form-item label="First name" prop="first_name">
                            <el-input placeholder="Enter first Name" v-model="bookForm.first_name"></el-input>
                        </el-form-item>
                        <el-form-item label="Last name" prop="last_name">
                            <el-input placeholder="Enter last Name" v-model="bookForm.last_name"></el-input>
                        </el-form-item>
                    </div>
                    <el-form-item label="Email Address" prop="contact">
                        <el-input placeholder="Enter email address" v-model="bookForm.contact"></el-input>
                    </el-form-item>
                </div>

                <el-form-item label="No of Spots" prop="bookings">
                    <el-input-number v-model="bookForm.bookings"/>
                </el-form-item>

            </el-form>

            <div class="submit-btn-container">
                <el-button
                        type="primary"
                        :loading="submitLoadingStatus"
                        @click="submitForm(bookForms)">
                    Reserve Spot
                </el-button>
            </div>


        </el-dialog>

    </div>
</template>

<script setup>
import {EVENTS_ADD_APPLICANTS} from "@/api/api";
import {defineProps, ref, reactive, onMounted, onUnmounted, defineEmits} from 'vue'
import {ElMessage} from 'element-plus'

const props = defineProps(['visible', 'info'])

const emit = defineEmits(['close'])
const bookForms = ref(null)

const bookForm = reactive({
    first_name: '',
    last_name: '',
    contact: '',
    bookings: 1,
    apply_user_id: undefined,
    user_id: undefined,
    event_id: undefined
})

const bookRules = reactive({
    first_name: [
        {required: true, message: 'Please enter first name', trigger: 'blur'}
    ],
    last_name: [
        {required: true, message: 'Please enter last name', trigger: 'blur'}
    ],
    contact: [
        {required: true,type:'email', message: 'Please enter email address', trigger: 'blur'}
    ],
    bookings: [
        {required: true, message: 'Please enter No of Spots', trigger: ['blur', 'change']}
    ]
})

const width = ref('494px')
const submitLoadingStatus = ref(false)
const beforeClose = (done) => {
    emit('close')
    done()
}
const submitForm = (formEl) => {
    let uid = localStorage.getItem('uid');
    submitLoadingStatus.value = true;

    formEl.validate((valid) => {
        if (valid) {
            if (uid) {
                bookForm.apply_user_id = uid
            }
            bookForm.user_id = props.info.user_id;
            bookForm.event_id = props.info.id;

            let params = Object.assign({}, bookForm)
            EVENTS_ADD_APPLICANTS(params).then(res => {

                if (res.code == 200) {

                    submitLoadingStatus.value = false;
                    emit('close')
                    ElMessage({
                        type: 'success',
                        message: 'You have successfully reserved a spot',
                        grouping: true
                    })
                }

            }).catch(err => {
                console.log(err)

            })

        } else {
            console.log('error submit!!')
            submitLoadingStatus.value = false
        }
    })
}

onMounted(() => {
    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
        width.value = '90%'
    }

    window.onresize = () => {
        if (screenWidthFloor <= 768) {
            width.value = '90%'
        }
    }
})

onUnmounted(() => {
    window.onresize = null
})
</script>

<style scoped>
 :deep(.el-dialog__title){
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #101828;
}

.submit-btn-container{
    margin-top: 30px;
}
</style>