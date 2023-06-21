<template>
<div class="bg">
    <div class="form-container">
        <h2 class="form-label">Education Business</h2>

        <el-form
            class="form-form"
            label-position="top"
            :model="vForm"
            :rules="vRules"
            ref="vForms"
        >
            <el-form-item prop="Radio"  label="Were you able to hire candidates from the platform?">
                <el-radio-group v-model="vForm.Radio" @change="typeChangeEvent">
                    <el-radio label="Yes">Yes</el-radio>
                    <el-radio label="No">No</el-radio>
                </el-radio-group>
            </el-form-item>
            <template v-if="typeValue === 'Yes' ">
                <el-form-item prop="MultiLine1" label="We'd love you to give a short testimonial on our services, it would surely help us(grow and improve!)" >
                    <el-input v-model="vForm.MultiLine1" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </template>
            <template v-if="typeValue === 'No'">
                <el-form-item prop="MultiLine" label="Are there any obstacles that you're currently facing in your recruitment process?" >
                    <el-input v-model="vForm.MultiLine" type="textarea" :rows="5" placeholder="Answer"></el-input>
                </el-form-item>
            </template>

            <div class="submit-btn-container">
                <el-button class="submit-btn" @click="submit(vForms)">Submit</el-button>
            </div>

        </el-form>

    </div>

</div>
</template>

<script>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {ZOHO_SYNC} from "@/api/api";
import {ElLoading} from 'element-plus'

export default {
    name: "business",
    setup(){
        const typeValue = ref('')
        const vForms = ref(null)

        const router = useRouter()
        let formObj = {
            Radio: ''
        }
        let formRules = {
            Radio: [
                {required: true, message: 'Select a choice.', trigger: 'change'}
            ]
        }

        const vForm = ref(formObj)
        const vRules = ref(formRules)

        const email = localStorage.getItem('email')
        function typeChangeEvent(e){
            console.log(e)
            typeValue.value = e
            if(typeValue.value === 'Yes'){
                vForm.value = {
                    SingleLine: email,
                    Radio: 'Yes',
                    MultiLine1: ''
                }
                vRules.value = {
                    Radio: [
                        {required: true, message: 'Select a choice.', trigger: 'change'}
                    ],
                    MultiLine1: [
                        {required: true, message: 'Enter a value for this field.', trigger: 'change'}
                    ]
                }
            }

            if(typeValue.value === 'No'){
                vForm.value = {
                    SingleLine: email,
                    Radio: 'No',
                    MultiLine: ''
                }
                vRules.value = {
                    Radio: [
                        {required: true, message: 'Select a choice.', trigger: 'change'}
                    ],
                    MultiLine: [
                        {required: true, message: 'Enter a value for this field.', trigger: 'change'}
                    ]
                }
            }
        }

        if(typeValue.value === 'Yes'){
            vForm.value = {
                SingleLine: email,
                Radio: 'Yes',
                MultiLine1: ''
            }
            vRules.value = {
                Radio: [
                    {required: true, message: 'Select a choice.', trigger: 'change'}
                ],
                MultiLine1: [
                    {required: true, message: 'Enter a value for this field.', trigger: 'change'}
                ]
            }
        }

        if(typeValue.value === 'No'){
            vForm.value = {
                SingleLine: email,
                Radio: 'No',
                MultiLine: ''
            }
            vRules.value = {
                Radio: [
                    {required: true, message: 'Select a choice.', trigger: 'change'}
                ],
                MultiLine: [
                    {required: true, message: 'Enter a value for this field.', trigger: 'change'}
                ]
            }
        }

        function submit(formEl){
             formEl.validate((valid,fields)=>{
                 if(valid){

                     const loading = ElLoading.service({
                         lock:true,
                         text:'Thank you! Your response has been submitted.',
                         background: 'rgba(255, 255, 255, 0.9)'
                     })

                     let zoho_data = Object.assign({},vForm.value)
                     let zoho_url = 'https://forms.zohopublic.com/edupassport/form/EducationBusiness/formperma/7P0vzN1jnbViC7T_KXKM5OCuZ80k9Wr34nrQYIcgv48/htmlRecords/submit'
                     console.log(zoho_data)
                     let aaa = Object.entries(zoho_data).map(([key, value]) => ({
                         [key]: value
                     }));

                     let params = {
                         zoho_data:aaa,
                         zoho_url: zoho_url
                     }

                     ZOHO_SYNC(params).then(res => {
                         console.log(res)
                         // router.go(-1)
                         loading.close()
                         router.push('/overview')
                     }).catch(err => {
                         console.log(err)
                     })

                 }else{
                     console.log('error, submit', fields)
                 }
             })
        }

        return {
            typeValue,
            typeChangeEvent,
            vForms,
            vForm,
            vRules,
            submit
        }

    }
}
</script>

<style scoped>

.bg{
    width: calc(100% - 100px);
    height:calc(var(--i-window-height) - 100px) ;
    padding: 50px;
    background-size: 100%;
    background-image: url('https://forms.zohopublic.com/edupassport/downloadlogoperma?filepath=/edupassport/zf-customthemes-zf/1679561806263_Survey_Backgrounds_Purple_Tablet.jpg');
}
.form-container{
    width: 700px;
    margin: 0 auto;
    border-radius: 12px;
    background-image: none;
    background-color: #231F20;
    padding: 50px;
}

.form-label{
    font-size: 32px;
    color: #FFFFFF;
    text-align: center;
}
.form-form{
    margin-top: 60px;
}

.submit-btn-container{
    margin-top: 100px;
}

.submit-btn{
    width: 100%;
    background-color: #F9B019;
    color: #FFFFFF;
    font-weight: bold;
}

:deep(.el-form--default.el-form--label-top .el-form-item .el-form-item__label){
    color: #FFFFFF !important;
}
:deep(.el-radio__label){
    color: #FFFFFF;
}
:deep(.el-radio__input.is-checked+.el-radio__label) {
    color: #ed4fcb;
}

:deep(.el-radio__input.is-checked .el-radio__inner){
    border-color: #ed4fcb;
    background:#ed4fcb;
}
:deep(.el-radio-group){
    width: 100%;
}

@media screen and (max-width: 700px) {

    .bg{
        width: calc(100% - 40px);
        height:calc(var(--i-window-height) - 40px) ;
        padding: 20px;
    }

    .form-container{
        width: 90%;
        margin: 0 auto;
        border-radius: 12px;
        background-image: none;
        background-color: #231F20;
        padding: 20px;
    }


}

</style>