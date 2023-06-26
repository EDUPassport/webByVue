<template>
    <el-button type="primary" round @click="centerDialogVisible = true" style="margin-left: 20px">
        Request Promotion
    </el-button>

    <el-dialog v-model="centerDialogVisible" width="45%" center style="border-radius: 8px;">
        <el-row>
            <el-col>
                <svg class="svg-h" xmlns="http://www.w3.org/2000/svg" width="72.65" height="69.656"
                    viewBox="0 0 72.65 69.656">
                    <path id="marketing"
                        d="M65.125,44.613a5.493,5.493,0,0,1,1.855,9.728l-5.468-9.469a5.474,5.474,0,0,1,3.613-.259ZM31.038,80.375l7.631-4.405L28.616,58.581,21,62.982A10.042,10.042,0,0,0,31.038,80.375ZM46.957,90.35l-6.408-11.1-5.981,3.453,6.406,11.1a3.454,3.454,0,0,0,5.983-3.454ZM70.786,68.5,51.153,34.5a2.109,2.109,0,0,0-1.893-1.1h-.047a2.115,2.115,0,0,0-1.9,1.167c-.69,1.3-1.356,2.692-2.06,4.164-2.963,6.188-6.294,13.145-13.392,17.9l10.116,17.5c7.663-3.762,15.351-3.169,22.188-2.641,1.629.126,3.166.244,4.641.3a2.195,2.195,0,0,0,1.981-3.29ZM65.851,33.585a1.892,1.892,0,1,0,3.277,1.892l3.908-6.767a1.892,1.892,0,0,0-3.277-1.892l-3.908,6.767Zm22.78,20.749a1.893,1.893,0,0,0-1.9-1.892H78.922a1.892,1.892,0,0,0,0,3.784h7.812A1.892,1.892,0,0,0,88.631,54.335Zm-4.523-16.2a1.891,1.891,0,0,0-2.583-.692l-6.932,4a1.892,1.892,0,1,0,1.892,3.277l6.93-4a1.89,1.89,0,0,0,.693-2.584Z"
                        transform="translate(-15.981 -25.873)" fill="#6648ff" fill-rule="evenodd" />
                </svg>
                <h2 class="req-h2">Promote your business, your job search or event with us. Start<br> now!</h2>
                <p class="req-h2 text-style">Fill the form and someone will reach out to you.</p>
            </el-col>
        </el-row>

        <el-form ref="fromRef" :model="contactForm" :rules="basicRules" label-width="120px" label-position="top"
            class="demo-ruleForm">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="Enter Name" prop="name">
                        <el-input class="req-input" v-model="contactForm.name" placeholder="Enter Name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Email" prop="email">
                        <el-input class="req-input" v-model="contactForm.email" placeholder="Enter Email" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">

                    <el-form-item label="Profile" prop="profile">
                        <el-select class="req-input" filterable  v-model="contactForm.profile" placeholder="Select Profile">
                            <el-option v-for="item in identity" :key="item.value" :label="item.label" :value="item.value"
                                :style="{ fontFamily: 'sans-serif' }" />
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12" style="position: relative;top: 18px;">
                    <label>Phone Number</label><br>
                    <el-row class="req-input">
                        <el-col :span="6">
                            <el-select class="phone-select" filterable v-model="contactForm.country" placeholder="Select Country">
                                <el-option v-for="item in countryList" :key="item.name"
                                    :label="`${item.name} (${item.phonecode})`" :value="item.phonecode"
                                    :style="{ fontFamily: 'sans-serif' }" />
                            </el-select>
                        </el-col>
                        <el-col :span="6">
                            <el-input class="phone-input" v-model="contactForm.phone_no" placeholder="xxx-xxx-xxxx" />

                        </el-col>
                    </el-row>

                </el-col>

            </el-row>
            <el-row>

                <el-col :span="12">
                    <el-form-item label="Request" prop="request">
                        <el-select class="req-input" filterable v-model="contactForm.request" placeholder="Select Request">
                            <el-option v-for="item in requests" :key="item.value" :label="item.label" :value="item.value"
                                :style="{ fontFamily: 'sans-serif' }" />
                        </el-select>
                    </el-form-item>

                </el-col>
                <el-col :span="12">
                    <el-form-item label="Other Details" prop="other">
                        <el-input class="req-input" v-model="contactForm.other" placeholder="Other Information" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <template #footer style="padding:20px 0px 40px 0px">
            <span class="dialog-footer">
                <el-button class="button-h" type="primary" round @click="save()">
                    Submit
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { GET_COUNTRY_LIST, ADD_REQ_FEATURE } from '@/api/api';
import { ElMessage } from 'element-plus'

const centerDialogVisible = ref(false)

const requests = [
    {
        label: 'Feature a Listing',
        value: 'feature_a_listing'
    },
    {
        label: 'Advertise Your Business',
        value: 'advertise_your_business'
    }
]

const identity = [

    {
        label: 'Educator',
        value: 1
    },
    {
        label: 'EDU Busniess',
        value: 2
    },
    {
        label: 'Other',
        value: 4
    },
    {
        label: 'Vendor',
        value: 5
    },
]

const countryList = ref([])

const basicRules = {

    name: [
        {
            required: true,
            message: 'Please enter your name',
            trigger: 'blur',
        },
    ],
    email: [
        {
            type: 'email',
            required: true,
            message: 'Please enter your email',
            trigger: 'blur',
        },
    ],
    profile: [
        {
            required: true,
            message: 'Please select your profile',
            trigger: 'blur',
        },
    ],
    country: [
        {
            required: false,
            message: 'Please select country',
            trigger: 'blur',
        },
    ],
    number: [
        {
            required: false,
            message: 'Please enter your number',
            trigger: 'blur',
        },
    ],
    request: [
        {
            required: true,
            message: 'Please select request',
            trigger: 'blur',
        },
    ],
    other: [
        {
            required: false,
            message: 'Please enter the other detail',
            trigger: 'blur',
        },
    ],


}
const contactForm = reactive({
    name: '',
    email: '',
    profile: '',
    country: '',
    phone_no: '',
    request: '',
    other: '',
})


function getAllCountry() {
    let params = {}
    GET_COUNTRY_LIST(params).then(res => {
        if (res.code == 200) {
            countryList.value = res.message;
        }
    }).catch(err => {
        console.log(err)
    })
}

onMounted(() => {
    getAllCountry()
})

const fromRef = ref(null)
function save() {
    fromRef.value.validate((valid) => {
        if (valid) {
            contactForm.phone_no = `${contactForm.country} ${contactForm.phone_no}`
            delete contactForm.country
            ADD_REQ_FEATURE(contactForm).then(res => {
                if (res.code == 200) {
                    ElMessage({
                        message: 'Thank you for filling out your information! ...',
                        type: 'success',
                    })
                    Object.keys(contactForm).forEach(key => {
                        contactForm[key] = null;
                    });
                    centerDialogVisible.value = false
                }
            }).catch(err => {
                ElMessage({
                    message: err.msg,
                    type: 'error',
                })
            })

        }
    })


}

</script>

<style>
.demo-ruleForm.el-form--default.el-form--label-top .el-form-item .el-form-item__label {
    text-transform: uppercase !important;
    font-family: sans-serif !important;
}
</style>

<style scoped>
.font-family {
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: bold !important;

}

.phone-select {
    width: 200px
}

.phone-input {
    margin-left: 5.010417rem;
    width: 12.2rem;
}

.button-h {
    margin: 5px 0px 30px 0px;
    padding: 0px 25px 0px 25px;
}

.svg-h {
    position: relative;
    left: 430px;
    top: -12px;
}

.text-style {
    font-size: 1.145833rem;
    padding-bottom: 20px !important;
}

.req-h2 {
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    text-align: center;
    padding: 5px;
}

.req-input {
    width: 23.395833rem;
}

label {
    position: relative;
    text-transform: uppercase !important;
    font-family: sans-serif !important;
    top: -9px;
}
</style>
