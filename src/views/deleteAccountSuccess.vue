<template>
    <div class="container">

        <div class="logo">
            <el-image class="logo-img" :src="logoImgLightH"></el-image>
        </div>

        <div class="content">
            <div class="icon">
                <el-image class="icon-img" :src="icon"></el-image>
            </div>
            <div class="label">
                Account Deleted Successfully
            </div>
            <div class="text">
                Your account has been deleted successfully. We're sorry to see you go! Your data has been permanently deleted from our system and cannot be retrieved. If you change your mind, you'll need to create a new account to use our services again. Thank you for being a part of our community.
            </div>
            <div class="create-button-container">
                <el-button class="create-button"
                           size="large"
                           @click="createAccount()"
                           type="primary">
                    Create an Account
                </el-button>
            </div>
            <div class="back-button-container">
                <el-button class="back-button" link
                           @click="turnHome()"
                >
                    <el-icon><Back /></el-icon> Back to Home Page
                </el-button>
            </div>

        </div>

        <div class="footer">
            <span>© EDU Passport 2023</span>
        </div>

    </div>
</template>

<script>
import icon from '@/assets/newHome/add-contributors-success.svg'
import logoImgLightH from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
import {useRouter} from 'vue-router'

export default {
    name: "fromAdminPanel",
    data() {
        return {
            icon,
            logoImgLightH,
            loadingValue: true
        }
    },
    setup(){
        const router = useRouter()

        const turnHome = ()=>{
            router.push('/')
        }

        const createAccount = ()=>{
            localStorage.clear()
            router.push('/signup')
        }

        return {
            turnHome,
            createAccount
        }
    }

}
</script>

<style scoped>

.container {
    width: 100%;
    height: 100vh;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;

}

.logo {
    padding: 32px 0 0 40px;
}

.logo-img {
    width: 181px;
}

.content{
    max-width: 500px;
    margin: 80px auto 0;
    text-align: center;
}

.icon-img{
    width: 72px;
    height: 72px;
}

.label{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 32px;
    text-align: center;
    color: #101828;
    margin-top: 32px;
}

.text{
    margin-top: 20px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #667085;
}

.create-button-container{
    margin-top: 34px;
}

.create-button{
    width: 360px;
}

.back-button-container{
    margin-top: 24px;
}

.footer{
    margin-top: auto;
    margin-bottom: 24px;
    margin-left: 40px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #667085;

}
</style>