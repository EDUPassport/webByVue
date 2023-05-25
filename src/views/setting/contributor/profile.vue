<template>
    <div class="profile-bg">

        <el-row justify="center" align="top" class="profile-container">
            <el-col class="profile-col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

                <div class="profile-t" @click="turnHome()">
                    <el-image class="profile-t-logo" :src="imgLogo"></el-image>
                </div>

                <div class="add-contributor-box">
                    <div class="box-avatar-person"></div>
                    <div class="box-label">Setup your profile</div>
                    <div class="box-tips">
                        Setup your Contributor Profile for {Company Name}
                    </div>
                    <div class="box-form">
                        <el-form
                            :model="contributorForm"
                            :rules="contributorRules"
                            ref="contributorForms"
                            label-position="top"
                            @submit.prevent
                        >
                            <el-form-item label="Email" prop="email">
                                <el-input v-model="contributorForm.email" disabled placeholder="Enter your email"></el-input>
                            </el-form-item>
                            <div class="xll-form-item">
                                <div class="xll-form-item-l">
                                    <el-form-item label="First Name" prop="first_name">
                                        <el-input v-model="contributorForm.first_name" placeholder="Enter your Name"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="xll-form-item-r">
                                    <el-form-item label="Last Name" prop="last_name">
                                        <el-input v-model="contributorForm.last_name" placeholder="Enter your Name"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <el-form-item label="Password" prop="password">
                                <el-input show-password v-model="contributorForm.password" placeholder="Enter your password"></el-input>
                            </el-form-item>
                            <el-form-item label="Confirm Password" prop="confirm_password">
                                <el-input show-password v-model="contributorForm.confirm_password" placeholder="Confirm your password"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="box-btns">
                        <el-button type="primary"
                                   class="box-btn"
                                   size="large"
                                   @click="submit(contributorForms)">
                            Sign up
                        </el-button>
                    </div>
                </div>

                <div class="profile-copyright">
                    © EDU Passport 2023
                </div>

            </el-col>
        </el-row>
    </div>

</template>

<script setup>

// import logoImgLight from "@/assets/newHome/logo/Logo_Transparent.png"

import imgLogo from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
import {reactive, ref, onMounted} from "vue";
import {useRouter,useRoute} from 'vue-router'
import {USER_CONTRIBUTOR_COMPANY_ADD} from "@/api/api";
const router = useRouter()
const route = useRoute()
import {ElLoading,ElMessage} from 'element-plus'


const turnHome = ()=>{
    router.push('/')
}

const contributorForms = ref(null)

const contributorForm = reactive({
    first_name: route.query.first_name,
    last_name: route.query.last_name,
    email: route.query.email,
    password:"",
    confirm_password:''
})

const contributorRules = reactive({
    first_name: [
        {required: true, message: 'Enter your first name', trigger: 'blur'}
    ],
    last_name: [
        {required: true, message: 'Enter your last name', trigger: 'blur'}
    ],
    email: [
        {type: 'email', required: true, message: 'Enter a invalid email address', trigger: 'blur'}
    ],
})

const registerKey = route.query.register_key
const submit = (formEl)=>{

    formEl.validate((valid)=>{
        if(valid){
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(255, 255, 255, 0.7)',
            })

            let params = Object.assign({register_key:registerKey}, contributorForm)

            USER_CONTRIBUTOR_COMPANY_ADD(params).then(res=>{
                console.log(res)
                if(res.code === 200){
                    router.push({path:'/login',query:{email:params.email}})
                    loading.close()
                }

            }).catch(err=>{
                console.log(err)
                loading.close()

                ElMessage({
                    message:err,
                    type:'warning',
                    grouping:true
                })

            })

        }else{
            console.log('error submit')
        }
    })
}

onMounted(() => {



})

</script>

<style scoped>

.profile-bg {
    height: var(--i-window-height);
    position: relative;
    background-color: #FFFFFF;
}

.profile-container {
    max-width: 1440px;
    margin: 0 auto;
    height: 100%;
}

.profile-col {
    display: flex;
    flex-direction: column;
}

.profile-t {
    padding: 32px 0 0 40px;
    cursor: pointer;
}

.profile-t-logo {
    width: 180px;
}

.profile-copyright {
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;

    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;

    color: #667085;

    margin-top: auto;
    margin-left: 40px;
    margin-bottom: 25px;
}

.add-contributor-box {
    width: 400px;
    padding: 0 25px 0 25px;
    margin: 80px auto 0;
}

.box-avatar-person {
    background-image: url("@/assets/newHome/add-contributor-person-add.svg");
    background-position: center;
    background-size: 100%;
    width: 72px;
    height: 72px;
    margin: 0 auto;
}

.box-label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    color: #101828;
    margin-top: 20px;

}

.box-tips {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #667085;
    margin-top: 12px;
}

.box-form {
    margin-top: 30px;
}

.box-btns {
    margin-top: 40px;
    width: 100%;
}

.box-btn {
    width: 100%;
}

.xll-form-item{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.xll-form-item-l{width: calc(50% - 10px)}
.xll-form-item-r{ width: calc(50% - 10px)}

@media screen and (min-width: 992px ) and (max-width: 1399px) {

}

@media screen and (max-width: 768px) {

}
</style>