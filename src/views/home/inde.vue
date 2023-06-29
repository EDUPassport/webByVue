<template>
    <div class="home-bg">
        <div class="home-header">
            <div class="home-header-l">
                <el-image class="home-logo" :src="logoImg"></el-image>
            </div>
            <div class="home-header-r">
                <el-dropdown max-height="40px"
                             trigger="click"
                             :hide-on-click="true"
                >
                    <span class="el-dropdown-link">Services<el-icon class="el-icon--right"><arrow-down/></el-icon></span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>Action 1</el-dropdown-item>
                            <el-dropdown-item>Action 2</el-dropdown-item>
                            <el-dropdown-item>Action 3</el-dropdown-item>
                            <el-dropdown-item disabled>Action 4</el-dropdown-item>
                            <el-dropdown-item divided>Action 5</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <el-dropdown
                        trigger="click"
                        :hide-on-click="true"
                >
                    <span class="el-dropdown-link">Company<el-icon class="el-icon--right"><arrow-down/></el-icon></span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>Action 1</el-dropdown-item>
                            <el-dropdown-item>Action 2</el-dropdown-item>
                            <el-dropdown-item>Action 3</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <el-button class="btn-txt btn-link" link>Contact us</el-button>

                <el-button class="btn-txt" plain>Log in</el-button>
                <el-button class="btn-txt" type="primary">Sign up</el-button>

            </div>
        </div>

        <div class="section-one">
            <h1>
                The New Global Go-To Education Hub For
            </h1>
            <p>
                The platform assists educators to connect to educational jobs, made just for them
            </p>

            <div class="role-btn-container">
                <div class="role-btn-bg">
                    <el-button class="role-btn" link>Educators</el-button>
                </div>
                <div class="role-btn-bg">
                    <el-button class="role-btn" link>Vendors</el-button>
                </div>
                <div class="role-btn-bg">
                    <el-button class="role-btn" link>EDU Businesses</el-button>
                </div>
            </div>

        </div>

        <div class="section-2">
            <div class="section-2-l">
                <el-image :src="poolJobListing"></el-image>
            </div>
            <div class="section-2-r">
                <h2>Matching you to your dream job</h2>
                <p>
                    The platform assists educators to connect to educational jobs, made just for them
                </p>
                <el-button type="primary">
                    See all jobs
                </el-button>
            </div>
        </div>

        <div class="section-3">
            <div class="section-3-l">
                <h2>Global Savings</h2>
                <p>
                    We believe that the best educators deserve the best deals, so we team up with local businesses to offer discounts and fun events just for our EDU Passport members.
                </p>
                <el-button type="primary">
                    See all events
                </el-button>
            </div>
            <div class="section-3-r">
                <el-image :src="eventsListImg"></el-image>
            </div>
        </div>

        <div class="section-4">
            <div class="section-4-l">
                <el-image :src="messagesImg"></el-image>
            </div>
            <div class="section-4-r">
                <h2>Security and Assistance</h2>
                <p>
                    A dedicated account manager on our educational platform is available to help with legal and visa challenges when teaching abroad.
                </p>
                <el-button type="primary">
                    See all messages
                </el-button>
            </div>
        </div>

    </div>
</template>
<script setup>
import logoImg from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
import poolJobListing from '@/assets/newHome/btns/pool-job-listing.png'
import eventsListImg from '@/assets/newHome/btns/events-list.png'
import messagesImg from '@/assets/newHome/btns/messages.png'
</script>
<style scoped>
.home-bg {
    background-color: #F7F5FF;
    min-height: calc(var(--i-window-height));
}

.home-header {

    max-width: 1440px;
    height: 96px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.home-logo {
    height: 40px;
}

.home-header-r {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #1D2939;
    text-align: center;
    font-size: 14px;
    font-family: Inter;
    font-weight: 600;
    line-height: 18px;
    margin-right: 30px;
}

.btn-link {
    color: #1D2939;
    font-size: 14px;
    font-family: Inter;
    font-weight: 600;
    margin-right: 80px;
}

.section-one {
    max-width: 1440px;
    margin: 0 auto;
    background-color: #6648ff;

    padding-top: 128px;
    padding-bottom: 351px;
    background-image: url("@/assets/newHome/btns/section-one-bg.png");
    background-position: bottom;
    background-repeat: no-repeat;
}

.section-one h1{
    max-width: 862px;
    margin: 0 auto;
    color: #FFFFFF;
    text-align: center;
    font-size: 72px;
    font-family: Work Sans;
    font-weight: 700;
    line-height: 90px;
    letter-spacing: -1.44px;
}

.section-one p{
    max-width: 670px;
    margin: 0 auto;
    text-align: center;
    font-size: 24px;
    font-family: Work Sans;
    line-height: 140%;
    color: #FFFFFF;
}

.role-btn-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 56px;

}

.role-btn-bg{
    background-image: url("@/assets/newHome/btns/btn-bg.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    width:196px;
    height: 132px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.role-btn{
    color: #1D2939;
    font-size: 22px;
    font-family: Inter;
    font-weight: 600;
}

.section-2,.section-3,.section-4{
    max-width: 1440px;
    margin: 100px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

}

.section-2,.section-4{
    background-image: url("@/assets/newHome/btns/btn-bg.svg");
    background-repeat: no-repeat;
    background-position: top;
}

.section-2 h2,.section-3 h2,.section-4 h2{
    color:  #1D2939;
    font-size: 56px;
    font-family:Inter;
    font-weight: 700;
    line-height: 120%;
    letter-spacing: -1.12px;
}

.section-2 p,.section-3 p,.section-4 p{
    color:  #1D2939;
    font-size: 22px;
    font-family: Inter;
    margin: 16px 0;
}

.section-2-l, .section-3-r,.section-4-l{
    width: 60%;
}
.section-2-r, .section-3-l,.section-4-r{
    width: 40%;
}
</style>