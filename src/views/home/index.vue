<template>
    <div class="home-bg">
        <div class="home-header">
            <div class="home-header-l">
                <el-image class="home-logo" :src="logoImg"></el-image>
            </div>
            <div class="home-header-r">
                <el-dropdown
                             trigger="click"
                             :hide-on-click="true"
                >
                    <span class="el-dropdown-link">Services<el-icon class="el-icon--right"><arrow-down/></el-icon></span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="turnJobsPage()">EDU Jobs</el-dropdown-item>
                            <el-dropdown-item @click="turnDealsPage()">EDU Deals</el-dropdown-item>
                            <el-dropdown-item @click="turnEventsPage()">EDU Events</el-dropdown-item>
                            <el-dropdown-item @click="turnBlogPage()">EDU Blog</el-dropdown-item>
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


                <HeaderSwitchIdentity></HeaderSwitchIdentity>

            </div>
        </div>

        <div class="section-one-bg">
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

        <div class="section-5-bg">
            <div class="section-5">
                <div class="section-5-l">
                    <h2>Our Transparent Job Process</h2>
                    <p>
                        No other education job boards can match our exceptional features! Experience searching,applying, and interviewing for global positions on our platform
                    </p>
                </div>
                <div class="section-5-r">
                    <div class="section-5-r-items">
                        <div class="section-5-r-item">
                            <div class="section-number-circle">1</div>
                            <h5>Create & Complete a Profile</h5>
                            <p>
                                With a complete profile,educators can apply with just one click!
                            </p>
                        </div>
                        <div class="section-5-r-item">
                            <div class="section-number-circle">2</div>
                            <h5>Application Review</h5>
                            <p>
                                Successful applicants will beinvited for an interview.
                            </p>
                        </div>
                        <div class="section-5-r-item">
                            <div class="section-number-circle">3</div>
                            <h5>Get Invited</h5>
                            <p>
                                Successful applicants will be invited for an interview.
                            </p>
                        </div>
                        <div class="section-5-r-item">
                            <div class="section-number-circle">4</div>
                            <h5>You’re Hired</h5>
                            <p>
                                Hired! (We love it when this happens)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="section-6">
            <div class="section-6-item">
                <h2>20K+</h2>
                <p>Educator</p>
            </div>
            <div class="section-6-item">
                <h2>6000+</h2>
                <p>EDU Jobs</p>
            </div>
            <div class="section-6-item">
                <h2>300+</h2>
                <p>hired</p>
            </div>
        </div>

        <div class="section-8">
            <div class="section-8-l">
                <el-image :src="joinUsEmailImg" ></el-image>
            </div>
            <div class="section-8-r">
                <h3>
                    Join Our Vibrant Community & Unlock Limitless Possibilities For Growth and Collaboration!
                </h3>

            </div>
        </div>

    </div>
</template>
<script setup>
import logoImg from '@/assets/newHome/logo/Full_Logo_Horizontal_Transparent_Light.png'
import poolJobListing from '@/assets/newHome/btns/pool-job-listing.png'
import eventsListImg from '@/assets/newHome/btns/events-list.png'
import messagesImg from '@/assets/newHome/btns/messages.png'

import joinUsEmailImg from '@/assets/newHome/join-us-email.svg'
import {useRouter} from 'vue-router'
import HeaderSwitchIdentity from "@/layout/components/HeaderSwitchIdentity.vue";

const router = useRouter()
const turnJobsPage = ()=>{
    router.push('/job/pool')
}

const turnDealsPage = ()=>{
    router.push('/deals')
}

const turnEventsPage = ()=>{
    router.push('/events')
}

const turnBlogPage = ()=>{
    window.open('https://blog.edupassport.io','_blank')
}

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
.section-one-bg{
    width: 100%;
    background-color: #6648ff;
}

.section-one {
    max-width: 1440px;
    margin: 0 auto;

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
.section-5-bg{
    width: 100%;
    background: #6648FF;
}
.section-5{
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    padding: 52px 100px;
}

.section-5-l{
    width: 40%;
}
.section-5-r{
    width: 60%;
}
.section-5-l h2{
    color: #FFFFFF;
    font-size: 56px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 700;
    line-height: 60px;
    letter-spacing: -1.12px;
}

.section-5-l p{
    color: #FFFFFF;
    font-size: 24px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
}

.section-5-r-items{
    margin-left: 120px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.section-5-r-item{
    width: 45%;
    margin-right: 30px;
    margin-bottom: 30px;
}
.section-5-r-item h5{
    color: #FFFFFF;
    font-size: 32px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
}

.section-5-r-item p{
    color:  #FFFFFF;
    font-size: 18px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
}

.section-number-circle{
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: #FFFFFF;

    color: #1D2939;
    font-size: 24px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;

}

.section-6{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.section-6-item h2{
    color: #6648FF;
    font-size: 56px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 700;
    line-height: 60px;
    letter-spacing: -1.12px;
    text-align: center;
}

.section-6-item p{
    color: #6648FF;
    font-size: 24px;
    font-family: Work Sans;
    font-style: normal;
    font-weight: 500;
    line-height: 60px;
    letter-spacing: -0.48px;
    text-align: center;
}

.section-6-item{
    margin:140px 100px;
}


.section-8{
    width: 1110px;
    margin: 50px auto;
    height: 288px;
    background:url("@/assets/newHome/join-us-bg.svg") no-repeat center 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.section-8-r{

}

.section-8-r h3{

}


</style>