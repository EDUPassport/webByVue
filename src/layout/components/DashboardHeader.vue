<template>
    <div>
        <el-affix :offset="0">
            <el-header class="header-container" height="auto">
                <el-row class="header-row-container" :gutter="0" justify="start" align="middle">
                    <el-col class="header-l-col" :xs="0" :sm="4" :md="12" :lg="12" :xl="12" v-if="currentRoutePath === '/events/post'">
                        <div class="nav-events-container">
                            <div class="nav-events-l">
                                <el-button link icon="back" @click="turnBackToEvents()" >Back to Events</el-button>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="header-l-col" :xs="0" :sm="4" :md="12" :lg="12" :xl="12" v-else-if="currentRoutePath === '/events/myEvents'">
                        <div class="nav-events-container">
                            <div class="nav-events-l">
                                <template v-if="profilePercentage <= 60">
                                    <el-tooltip
                                        effect="light"
                                        content="Complete your profile to post an event"
                                        placement="bottom"
                                    >
                                        <el-button icon="plus" type="info">Post Event</el-button>
                                    </el-tooltip>
                                </template>
                                <template v-else>
                                    <el-button icon="plus" type="primary" @click="turnToPostEvent()">Post Event</el-button>
                                </template>
<!--                                <el-button icon="plus" type="primary" @click="turnToPostEvent()">Post Event</el-button>-->
                            </div>
                            <div class="nav-events-r">
                                <el-breadcrumb separator-icon="ArrowRight">
                                    <el-breadcrumb-item :to="{ path: '/events' }">EDU Events</el-breadcrumb-item>
                                    <el-breadcrumb-item :to="{path:'/events/myEvents'}">My events</el-breadcrumb-item>
                                </el-breadcrumb>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="header-l-col" :xs="0" :sm="4" :md="12" :lg="12" :xl="12" v-else-if="currentRoutePath === '/events/myReservedSpots'">
                        <div class="nav-events-container">

                            <div class="nav-events-r">
                                <el-breadcrumb separator-icon="ArrowRight">
                                    <el-breadcrumb-item :to="{path:'/events/myEvents'}">My events</el-breadcrumb-item>
                                    <el-breadcrumb-item :to="{path:'/events/myReservedSpots'}">Rserved Spots</el-breadcrumb-item>
                                </el-breadcrumb>

                            </div>
                        </div>
                    </el-col>
                    <el-col class="header-l-col" :xs="0" :sm="4" :md="4" :lg="6" :xl="6" v-else-if="currentRoutePath === '/events' && token ">
                        <div class="header-page-name">
                            <template v-if="profilePercentage <= 60">
                                <el-tooltip
                                    effect="light"
                                    content="Complete your profile to post an event"
                                    placement="bottom"
                                >
                                    <el-button icon="plus" type="info">Post Event</el-button>
                                </el-tooltip>
                            </template>
                            <template v-else>
                                <el-button icon="plus" type="primary" @click="turnToPostEvent()">Post Event</el-button>
                            </template>
                            <el-button link @click="turnToMyEvents()">My Events</el-button>
                        </div>
                        <div class="header-welcome-name">

                        </div>
                    </el-col>
                    <el-col class="header-l-col" :xs="0" :sm="4" :md="4" :lg="8" :xl="8" v-else>
                        <div class="header-page-name">
                            <template v-if="currentRoutePath === '/overview' ">Dashboard</template>
                            <template v-if="currentRoutePath === '/job/pool' ">Pool</template>
                            <template v-if="currentRoutePath === '/jobs/post' || currentRoutePath === '/jobs/myJobs'" >
                                <el-button link icon="back" @click="turnBackToDashboard()" >Back to Dashboard</el-button>
                            </template>
                            <template v-if="currentRoutePath === '/favorites' ">
                                Favourites
                            </template>
                        </div>
                        <div class="header-welcome-name">
                            <template v-if="currentRoutePath === '/overview' ">
                                Welcome, {{ userInfo.companyName ?  userInfo.companyName : userInfo.name }}!
                            </template>
                            <template v-if="currentRoutePath === '/job/pool' ">Job Listing</template>
                            <template v-if="currentRoutePath === '/favorites' ">All your favourite jobs and events are here</template>
                        </div>
                    </el-col>

                    <el-col class="mobile-menu-col" :xs="8" :sm="0" :md="0" :lg="0" :xl="0">
                        <el-image class="mobile-menu-img"
                                  @click="menuDrawerStatus=!menuDrawerStatus"
                                  :src="menuLineHorizontalImg"></el-image>
                    </el-col>

                    <el-col class="mobile-logo-col" :xs="8" :sm="0" :md="0" :lg="0" :xl="0">
                        <el-image class="mobile-logo-img" :src="logoMobileImg"></el-image>
                    </el-col>

                    <el-col class="header-r-col" :xs="8" :sm="20" :md="12" :lg="12" :xl="12" v-if="currentRoutePath === '/events/post' ">
                        <div class="nav-events-r-container" >
                            <el-button type="primary" @click="turnToMyEvents()">My Events</el-button>
                            <el-button plain @click="turnToMyReservedSpots()">Reserved Spots</el-button>
                        </div>
                        <HeaderSwitchIdentity></HeaderSwitchIdentity>

                    </el-col>
                    <el-col class="header-r-col" :xs="8" :sm="20" :md="12" :lg="12" :xl="12" v-else-if="currentRoutePath === '/events/myEvents' ">
                        <div class="nav-events-r-container" >
                            <el-button plain type="primary" @click="turnToMyReservedSpots()">Reserved Spots</el-button>
                        </div>
                        <HeaderSwitchIdentity></HeaderSwitchIdentity>

                    </el-col>
                    <el-col class="header-r-col"  :xs="8" :sm="20" :md="20" :lg="16" :xl="16" v-else-if="currentRoutePath === '/favorites' ">
                        <div class="nav-events-r-container" >
                            <el-button plain type="primary" @click="turnToMyReservedSpots()">Reserved Spots</el-button>
                        </div>
                        <HeaderSwitchIdentity></HeaderSwitchIdentity>

                    </el-col>
                    <el-col class="header-r-col" :xs="8" :sm="20" :md="12" :lg="12" :xl="12" v-else-if="currentRoutePath === '/events/myReservedSpots' ">
                        <HeaderSwitchIdentity></HeaderSwitchIdentity>

                    </el-col>
                    <el-col class="header-r-col" :xs="8" :sm="20" :md="20" :lg="18" :xl="18" v-else-if="currentRoutePath === '/events' && token ">

                        <div class="nav-link-container">

                            <router-link to="/jobs" exact> EDU JOBS</router-link>
                            <router-link to="/deals" exact> EDU DEALS</router-link>
                            <router-link to="/events" exact> EDU EVENTS</router-link>
                            <template v-if="envBlog === 'yes'">
                                <el-link :underline=false href="https://blog.edupassport.io/" target="_blank">
                                    EDU BLOG
                                </el-link>
                            </template>

                            <el-button style="margin-right: 16px;" plain type="primary" @click="turnToMyReservedSpots()">Reserved Spots</el-button>
                        </div>

                        <HeaderSwitchIdentity></HeaderSwitchIdentity>

                    </el-col>

                    <el-col class="header-r-col" :xs="8" :sm="20" :md="20" :lg="16" :xl="16" v-else>

                        <div class="nav-link-container">

                            <router-link to="/jobs" exact> EDU JOBS</router-link>
                            <router-link to="/deals" exact> EDU DEALS</router-link>
                            <router-link to="/events" exact> EDU EVENTS</router-link>
                            <template v-if="envBlog === 'yes'">
                                <el-link :underline=false href="https://blog.edupassport.io/" target="_blank">
                                    EDU BLOG
                                </el-link>
                            </template>
                        </div>

                        <HeaderSwitchIdentity></HeaderSwitchIdentity>

                    </el-col>

                </el-row>

                <el-row class="header-mobile-row-container" :gutter="0">
                    <el-col class="header-mobile-l-col" :xs="24" :sm="0" :md="0" :lg="0" :xl="0" v-if="currentRoutePath === '/events/myEvents'">
                        <div class="nav-events-container">
                            <div class="nav-events-l">
                                <template v-if="profilePercentage <= 60">
                                    <el-tooltip
                                        effect="light"
                                        content="Complete your profile to post an event"
                                        placement="bottom"
                                    >
                                        <el-button icon="plus" type="info">Post Event</el-button>
                                    </el-tooltip>
                                </template>
                                <template v-else>
                                    <el-button icon="plus" type="primary" @click="turnToPostEvent()">Post Event</el-button>
                                </template>
                                <!--                                <el-button icon="plus" type="primary" @click="turnToPostEvent()">Post Event</el-button>-->
                            </div>
                            <div class="nav-events-r">
                                <el-breadcrumb separator-icon="ArrowRight">
                                    <el-breadcrumb-item :to="{ path: '/events' }">EDU Events</el-breadcrumb-item>
                                    <el-breadcrumb-item :to="{path:'/events/myEvents'}">My events</el-breadcrumb-item>
                                </el-breadcrumb>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="header-mobile-l-col" :xs="24" :sm="0" :md="0" :lg="0" :xl="0" v-else-if="currentRoutePath === '/events/myReservedSpots'">
                        <div class="nav-events-container">

                            <div class="nav-events-r">
                                <el-breadcrumb separator-icon="ArrowRight">
                                    <el-breadcrumb-item :to="{path:'/events/myEvents'}">My events</el-breadcrumb-item>
                                    <el-breadcrumb-item :to="{path:'/events/myReservedSpots'}">Rserved Spots</el-breadcrumb-item>
                                </el-breadcrumb>

                            </div>
                        </div>
                    </el-col>
                    <el-col class="header-mobile-l-col" :xs="24" :sm="0" :md="0" :lg="0" :xl="0" v-else>
                        <div class="header-page-name">
                            Dashboard
                        </div>
                        <div class="header-welcome-name">
                            Welcome, {{ userInfo.companyName ?  userInfo.companyName : userInfo.name }}!
                        </div>
                    </el-col>

                </el-row>

            </el-header>

        </el-affix>

        <MobileDrawerMenu :visible="menuDrawerStatus" @close="menuDrawerStatus=false"></MobileDrawerMenu>

    </div>

</template>

<script setup>
import HeaderSwitchIdentity from "@/layout/components/HeaderSwitchIdentity.vue";
import {useRoute,useRouter} from 'vue-router'
import {ref,computed} from 'vue'
import {useStore} from 'vuex'
import MobileDrawerMenu from "@/components/mobileDrawerMenu.vue";
import menuLineHorizontalImg from '@/assets/newHome/dashboard/menu-line-horizontal.svg'
import logoMobileImg from '@/assets/newHome/dashboard/logo-mobile.svg'

const route = useRoute()
const router = useRouter()
const store = useStore()
const currentRoutePath = route.path
const menuDrawerStatus = ref(false)

// const envName = process.env.VUE_APP_ENV_NAME
const envBlog = process.env.VUE_APP_BLOG
const userInfo = computed(()=>store.state.userInfo)
const token = localStorage.getItem('token')

const profilePercentage = computed(()=> parseInt(store.state.profilePercentage) )

const turnBackToDashboard = ()=>{
    router.push({path:'/overview'})
}

const turnBackToEvents = ()=>{
    router.push({path:'/events'})
}

const turnToMyEvents = ()=>{
    router.push({path:'/events/myEvents'})
}

const turnToPostEvent = ()=>{
    router.push({path:'/events/post'})
}

const turnToMyReservedSpots = ()=>{
    router.push({path:'/events/myReservedSpots'})
}

</script>

<style scoped>
.header-container {
    width: 100%;
    height: 120px;
    background-color: #FFFFFF;
    padding: 40px 40px 20px 40px;
}

.header-row-container {
    height: 100%;
}

.header-page-name {
    font-family: 'Work Sans', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 32px;
    color: #000000;
}

.header-welcome-name {
    font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #667085;
    margin-top: 8px;
}

.header-r-col {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
}

.nav-link-container {
    display: flex;
    align-items: center;
}

.nav-link-container a {

    display: flex;
    align-items: center;

    height: 40px;
    background: #F2F4F7;
    border-radius: 8px;
    padding: 0 16px;

    margin-right: 16px;
    text-decoration: none;

    font-family: 'Inter', Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    text-align: center;
    color: #1D2939;

}

.nav-link-container a:hover {
    color: #000000;
    text-decoration: underline;
}

.nav-events-container{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.nav-events-r{
    margin-left: 12px;
}

.nav-events-r-container{
    margin-right: 16px;
}

:deep(.el-breadcrumb__inner.is-link){
    font-family: 'Inter';
    font-weight: 500;
    font-size: 18px;
    color: #C6C7C8;
}


:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner.is-link){
    font-family: 'Inter';
    font-weight: 500;
    font-size: 18px;
    color: #6648FF;
}

@media screen and (min-width: 769px) {
    .header-mobile-row-container {
        display: none;
    }
}

@media screen and  (max-width: 768px) {

    .header-container {
        padding: 32px 24px 0 24px;
        height: auto;
    }

    .nav-link-container {
        display: none;
    }

    .mobile-menu-col {
        text-align: left;
    }

    .mobile-menu-img {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .mobile-logo-col {
        text-align: center;
    }

    .mobile-logo-img {
        width: 100%;
        cursor: pointer;
    }

    .user-avatar-img {
        width: 32px;
        height: 32px;
    }

    .header-mobile-row-container {

    }

    .header-mobile-l-col {
        margin-top: 26px;
        margin-bottom: 20px;
    }

    .header-welcome-name {
        font-size: 14px;
    }

    .header-page-name {
        font-size: 24px;
    }

    :deep( .el-breadcrumb__inner.is-link) {
        font-family: 'Inter';
        font-weight: 500;
        font-size: 12px;
        color: #C6C7C8;
    }

    :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner.is-link ) {
        font-family: 'Inter';
        font-weight: 500;
        font-size: 12px;
        color: #6648FF;
    }

    .nav-events-r-container{
        display: none;
    }
}


</style>
