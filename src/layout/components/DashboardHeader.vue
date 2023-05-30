<template>
    <div>
        <el-affix :offset="0">
            <el-header class="header-container" height="auto">
                <el-row class="header-row-container" :gutter="0" justify="start" align="middle">

                    <el-col class="header-l-col" :xs="0" :sm="4" :md="4" :lg="8" :xl="8">
                        <div class="header-page-name">
                            Dashboard
                        </div>
                        <div class="header-welcome-name">
                            Welcome, {{ userInfo.companyName }}!
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

                    <el-col class="header-r-col" :xs="8" :sm="20" :md="20" :lg="16" :xl="16">

                        <div class="nav-link-container">

                            <router-link to="/jobs" exact> EDU JOBS</router-link>
                            <router-link to="/deals" exact> EDU DEALS</router-link>
                            <router-link to="/events" exact> EDU EVENTS</router-link>
                            <template v-if="envBlog === 'yes'">
                                <el-link :underline=false href="https://blog.edupassport.io/" target="_blank">EDU BLOG
                                </el-link>
                            </template>

                        </div>

                        <div class="user-container">
                            <template v-if="token && token !='' ">

                                <!-- <div class="user-earth-container">

                                  <el-popover :width="200" >

                                    <template #reference>
                                      <el-icon :size="24" >
                                        <IconFa6SolidEarthAmericas />
                                      </el-icon>
                                    </template>
                                    <template #default>

                                      <div class="user-earth-expand">
                                        <div class="user-earth-international" @click="goInternationalWebsite()">
                                          <span v-if="envName === 'development' || envName === 'production'"></span>
                                          International
                                        </div>
                                        <div class="user-earth-china" @click="goChinaWebsite()">
                                          <span v-if="envName === 'developmentCN' || envName === 'productionCN'"></span>
                                          Chinese
                                        </div>
                                      </div>

                                    </template>
                                  </el-popover>

                                </div> -->

                                <div class="user-bell-container">
                                    <el-popover :width="330">
                                        <template #reference>
                                            <el-icon class="circle-circle" :size="24" color="#6650B3"
                                                     v-if="unreadTotal>0 || inAppUnreadTotal > 0">
                                                <IconBiBellFill></IconBiBellFill>
                                                <span class="circle-red"></span>
                                            </el-icon>
                                            <el-icon :size="20" v-else>
                                                <IconBiBell></IconBiBell>
                                            </el-icon>

                                        </template>
                                        <template #default>

                                            <div class="notification-c">
                                                <div class="notification-all-read"
                                                     @click="setInAppReadAll()"
                                                >
                                                    Mark all as read
                                                </div>

                                                <div class="notification-items"
                                                     v-infinite-scroll="loadUserUnreadMore">

                                                    <div class="notification-item"
                                                         v-for="(item,i) in inAppNotificationData" :key="i"
                                                    >
                                                        <div class="notification-item-time">
                                                            {{ $filters.howLongFormat(item.c_time) }}
                                                        </div>

                                                        <div class="notification-item-c">
                                                            <div class="notification-item-c-l"
                                                                 :class="item.is_read ? '' : 'no-read-1'"
                                                            >
                                                                <template v-if="item.type == 1">
                                                                    <el-icon :size="20">
                                                                        <IconEduApplicationNofill20/>
                                                                    </el-icon>
                                                                </template>
                                                                <template v-else-if="item.type == 2">
                                                                    <el-icon :size="20">
                                                                        <IconEduPerksNofill20/>
                                                                    </el-icon>
                                                                </template>
                                                                <template v-else>
                                                                    <el-icon :size="20">
                                                                        <IconBiCardText/>
                                                                    </el-icon>
                                                                </template>

                                                            </div>
                                                            <div class="notification-item-c-r"
                                                                 @click="setInAppRead(item.id,item.identity,i)"
                                                                 :class="item.is_read ? '' : 'no-read-2' "
                                                            >
                                                                {{ item.desc }}
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                                <div class="im-msg-container">
                                                    <el-button class="im-msg-btn" plain round
                                                               @click="turnChatPage()">
                                                        <el-icon :size="20">
                                                            <IconEduChatNofill20/>
                                                        </el-icon>
                                                        <span>{{ unreadTotal }}</span>
                                                    </el-button>
                                                </div>

                                            </div>

                                        </template>
                                    </el-popover>

                                </div>

                                <div class="user-avatar-container">

                                    <el-dropdown size="large"
                                                 trigger="click"
                                                 :hide-on-click="true"
                                                 popper-class="xll-dropdown"
                                    >
                     <span class="el-dropdown-link">
                       <el-avatar class="user-avatar-img"
                                  :src="userInfo.avatar !='' ? userInfo.avatar : defaultAvatar"></el-avatar>
                     </span>

                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <template v-if="isThirdCompanyVisible == 1">
                                                    <el-dropdown-item
                                                            @click="turnOverview()"
                                                    >
                                                        <el-icon>
                                                            <IconMaterialSymbolsDashboardOutlineRounded/>
                                                        </el-icon>

                                                        <span class="el-dropdown-link-1">Dashboard</span>

                                                    </el-dropdown-item>
                                                    <el-dropdown-item @click="returnMySelf()">
                                                        <el-icon>
                                                            <IconAkarIconsArrowBackThick/>
                                                        </el-icon>
                                                        <span class="el-dropdown-link-1"> Return to My Account</span>

                                                    </el-dropdown-item>
                                                </template>
                                                <template v-else>
                                                    <el-dropdown-item
                                                            @click="turnOverview()"
                                                    >
                                                        <el-icon>
                                                            <IconMaterialSymbolsDashboardOutlineRounded/>
                                                        </el-icon>

                                                        <span class="el-dropdown-link-1">Dashboard</span>

                                                    </el-dropdown-item>
                                                    <el-dropdown-item @click="turnEditProfile()">
                                                        <el-icon>
                                                            <IconIconoirProfileCircled/>
                                                        </el-icon>

                                                        <span class="el-dropdown-link-1"> My Profile</span>
                                                    </el-dropdown-item>

                                                    <div class="el-dropdown-tips">switch profile</div>
                                                    <el-dropdown-item class="xll-dropdown-item">

                                                        <el-dropdown size="large"
                                                                     placement="left-start"
                                                                     :max-height="400">
                                          <span class="el-dropdown-link-sp">
                                              Educator
                                          </span>
                                                            <template #dropdown>
                                                                <el-dropdown-menu>
                                                                    <div class="xll-sub-dropdown"
                                                                         v-if="educatorIdentities.length>0">
                                                                        <el-dropdown-item
                                                                                class="xll-dropdown-item"
                                                                                v-for="(item,i) in educatorIdentities"
                                                                                :key="i"
                                                                                @click="changeIdentity(item.id,1,2)">

                                                                            <template v-if="item.name">

                                                                                <span class="el-dropdown-link">{{
                                                                                    item.name
                                                                                    }}</span>
                                                                            </template>
                                                                            <template v-else>
                                                                                <span class="el-dropdown-link">Click to Update Profile</span>
                                                                            </template>

                                                                        </el-dropdown-item>
                                                                    </div>

                                                                    <div class="xll-sub-dropdown" v-else>
                                                                        <el-dropdown-item class="xll-dropdown-item"
                                                                                          @click="createRole(1)">
                                                                            <div class="xll-add-icon-container">
                                                                                <span>Add</span>
                                                                                <el-icon class="xll-icon-circle-plus-1"
                                                                                         :size="14">
                                                                                    <CirclePlus/>
                                                                                </el-icon>
                                                                            </div>
                                                                        </el-dropdown-item>
                                                                    </div>

                                                                </el-dropdown-menu>

                                                            </template>
                                                        </el-dropdown>

                                                    </el-dropdown-item>

                                                    <el-dropdown-item class="xll-dropdown-item">
                                                        <el-dropdown size="large" placement="left-start"
                                                                     :max-height="400">
                                  <span class="el-dropdown-link-sp">

                                    Edu-Business
                                  </span>
                                                            <template #dropdown>
                                                                <el-dropdown-menu>
                                                                    <div class="xll-sub-dropdown"
                                                                         v-if="recruiterIdentities.length>0">
                                                                        <el-dropdown-item
                                                                                class="xll-dropdown-item"
                                                                                v-for="(item,i) in recruiterIdentities"
                                                                                :key="i"
                                                                                @click="changeIdentity(item.id,2,2)">

                                                                            <template v-if="item.company_name">
                                                                                <span class="el-dropdown-link">{{
                                                                                    item.company_name
                                                                                    }}</span>
                                                                            </template>
                                                                            <template v-else>
                                                                                <span class="el-dropdown-link">Click to Update Profile</span>
                                                                            </template>
                                                                        </el-dropdown-item>
                                                                    </div>

                                                                    <div class="xll-sub-dropdown"
                                                                         v-if="schoolIdentities.length>0">
                                                                        <el-dropdown-item
                                                                                class="xll-dropdown-item"
                                                                                v-for="(item,i) in schoolIdentities"
                                                                                :key="i"
                                                                                @click="changeIdentity(item.id,3,2)">
                                                                            <template v-if="item.company_name">

                                                                                <span class="el-dropdown-link">{{
                                                                                    item.company_name
                                                                                    }}</span>
                                                                            </template>
                                                                            <template v-else>
                                                                                <span class="el-dropdown-link">Click to Update Profile</span>
                                                                            </template>
                                                                        </el-dropdown-item>
                                                                    </div>
                                                                    <div class="xll-sub-dropdown"
                                                                         v-if="otherIdentities.length>0">
                                                                        <el-dropdown-item
                                                                                v-for="(item,i) in otherIdentities"
                                                                                :key="i"
                                                                                class="xll-dropdown-item"
                                                                                @click="changeIdentity(item.id,4,2)">
                                                                            <template v-if="item.company_name">

                                                                                <span class="el-dropdown-link">{{
                                                                                    item.company_name
                                                                                    }}</span>
                                                                            </template>
                                                                            <template v-else>
                                                                                <span class="el-dropdown-link">Click to Update Profile</span>
                                                                            </template>
                                                                        </el-dropdown-item>
                                                                    </div>

                                                                    <div class="xll-sub-dropdown">
                                                                        <el-dropdown-item class="xll-dropdown-item"
                                                                                          @click="selectBusinessRole()">
                                                                            <div class="xll-add-icon-container">
                                                                                <span>Add</span>
                                                                                <el-icon class="xll-icon-circle-plus-1"
                                                                                         :size="14">
                                                                                    <CirclePlus/>
                                                                                </el-icon>
                                                                            </div>
                                                                        </el-dropdown-item>
                                                                    </div>

                                                                </el-dropdown-menu>
                                                            </template>
                                                        </el-dropdown>

                                                    </el-dropdown-item>


                                                    <el-dropdown-item class="xll-dropdown-item">
                                                        <el-dropdown size="large" placement="left-start"
                                                                     :max-height="400">
                                  <span class="el-dropdown-link-sp">
                                     Vendor
                                  </span>
                                                            <template #dropdown>
                                                                <el-dropdown-menu>
                                                                    <template v-if="vendorIdentities.length>0">

                                                                        <el-dropdown-item
                                                                                class="xll-dropdown-item"
                                                                                v-for="(item,i) in vendorIdentities"
                                                                                :key="i"
                                                                                @click="changeIdentity(item.id,5,2)">
                                                                            <template v-if="item.company_name">
                                                                                <span class="el-dropdown-link">{{
                                                                                    item.company_name
                                                                                    }}</span>
                                                                            </template>
                                                                            <template v-else>
                                                                                <span class="el-dropdown-link">Click to Update Profile</span>
                                                                            </template>
                                                                        </el-dropdown-item>
                                                                    </template>

                                                                    <el-dropdown-item class="xll-dropdown-item"
                                                                                      @click="createRole(5)">
                                                                        <div class="xll-add-icon-container">
                                                                            <span>Add</span>
                                                                            <el-icon class="xll-icon-circle-plus-1"
                                                                                     :size="14">
                                                                                <CirclePlus/>
                                                                            </el-icon>
                                                                        </div>
                                                                    </el-dropdown-item>

                                                                </el-dropdown-menu>

                                                            </template>
                                                        </el-dropdown>

                                                    </el-dropdown-item>

                                                    <el-dropdown-item class="xll-dropdown-item"
                                                                      v-if="contributorIdentities.length>0">
                                                        <el-icon>
                                                            <Refresh/>
                                                        </el-icon>
                                                        <el-dropdown size="large"
                                                                     placement="left-start"
                                                                     :max-height="400">

                                          <span class="el-dropdown-link-sp">
                                              Switch Contributor
                                          </span>
                                                            <template #dropdown>
                                                                <el-dropdown-menu>
                                                                    <div class="xll-sub-dropdown" v-if="identityStore==6">
                                                                        <el-dropdown-item
                                                                                class="xll-dropdown-item"
                                                                                v-for="(item,i) in contributorIdentities"
                                                                                :key="i"
                                                                                @click="switchContributor(item.id,6,2)">

                                                                            <template v-if="item.company_name">
                                                                                <span class="el-dropdown-link">{{
                                                                                    item.company_name
                                                                                    }}</span>
                                                                            </template>
                                                                            <template v-else>
                                                                                <span class="el-dropdown-link">{{ item.company_id }}</span>
                                                                            </template>

                                                                        </el-dropdown-item>
                                                                    </div>
                                                                    <template v-else>
                                                                        <el-dropdown-item
                                                                            class="xll-dropdown-item"
                                                                            @click="switchAndShowContributor()">
                                                                                <span class="el-dropdown-link">Show Contributors</span>
                                                                        </el-dropdown-item>
                                                                    </template>

                                                                </el-dropdown-menu>

                                                            </template>
                                                        </el-dropdown>

                                                    </el-dropdown-item>


                                                    <el-dropdown-item @click="loginOut()">
                                                        <el-icon>
                                                            <IconIcBaselineLogout/>
                                                        </el-icon>
                                                        <span class="el-dropdown-link-1">  Log Out</span>

                                                    </el-dropdown-item>
                                                </template>

                                            </el-dropdown-menu>
                                        </template>

                                    </el-dropdown>

                                </div>

                            </template>
                            <template v-else>
                                <el-button link @click="login()">
                                    LOGIN
                                </el-button>
                                <el-button class="sign-up-btn"
                                           round
                                           type="primary"
                                           @click="signUp()">
                                    Sign Up
                                </el-button>
                            </template>
                        </div>

                    </el-col>

                </el-row>

                <el-row class="header-mobile-row-container" :gutter="0">
                    <el-col class="header-mobile-l-col" :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
                        <div class="header-page-name">
                            Dashboard
                        </div>
                        <div class="header-welcome-name">
                            Welcome, {{ userInfo.companyName }}!
                        </div>
                    </el-col>

                </el-row>

            </el-header>

        </el-affix>

        <el-dialog
                v-model="dialogDiscountCardVisible"
                title="Discount Card"
                width="30%"
        >
            <div class="discount-card-container">
                <el-image :src="discountCardImg"></el-image>
            </div>
        </el-dialog>

        <el-dialog
                v-model="dialogBusinessAccountVisible"
                title="Create Account"
                :width="dialogBusinessAccountWidth"
                center
        >
            <div class="switch-account-tips">
                Hello! Which one are you?
            </div>
            <div class="switch-account-container">
                <div class="switch-account-item" @click="createRole(2)">
                    Recruiter
                </div>
                <div class="switch-account-item" @click="createRole(3)">
                    School
                </div>
                <div class="switch-account-item" @click="createRole(4)">
                    Other
                </div>
            </div>
        </el-dialog>


        <MobileDrawerMenu :visible="menuDrawerStatus" @close="menuDrawerStatus=false"></MobileDrawerMenu>

    </div>

</template>

<script setup>
import {
    USER_INFO_BY_TOKEN_V2,
    SWITCH_IDENTITY_V2,
    USER_ALL_IDENTITY_V2,
    LOGOUT_V2,
    USER_MENU_LIST,
    COMEBACK_MYSELF,
    USER_UNREAD_LIST,
    SET_READ,
    SET_READ_ALL,
    USER_UNREAD,
    HOME_USER_CHANGE_IDENTITY
} from '@/api/api'

import defaultAvatar from '@/assets/default/avatar.png'
import discountCardImg from '@/assets/discountcard/discountCard.png'
import {encode} from 'js-base64'

import {useRouter,onBeforeRouteUpdate, onBeforeRouteLeave} from 'vue-router'
import {ref, inject, computed, watch, onMounted, onUnmounted} from 'vue'
import {useStore} from 'vuex';
import MobileDrawerMenu from "@/components/mobileDrawerMenu.vue";
import menuLineHorizontalImg from '@/assets/newHome/dashboard/menu-line-horizontal.svg'
import logoMobileImg from '@/assets/newHome/dashboard/logo-mobile.svg'
import {ElMessage, ElLoading,ElNotification} from 'element-plus'

let unreadChanged = ref(0)

const store = useStore();
const router = useRouter()
const goEasy = inject('goEasy');

const disconnectIm = ()=> {

    //connected
    if (goEasy.getConnectionStatus() === 'connected') {

        goEasy.disconnect({
            onSuccess: () => {
                console.log('Disconnect GoEasy successful')
                store.commit('setImUnreadTotal', 0)
            },
            onFailed: (error) => {
                console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
            }
        })

    }

}

const menuDrawerStatus = ref(false)
const dialogBusinessAccountVisible = ref(false)
const dialogBusinessAccountWidth = ref('30%')
const dialogDiscountCardVisible = ref(false)

// const envName = process.env.VUE_APP_ENV_NAME
const envBlog = process.env.VUE_APP_BLOG

const educatorContactStatus = ref(false)

const inAppNotificationData = ref([])
const inAppPage = ref(1)
const inAppLimit = ref(10)
const inAppLastPage = ref(0)
const inAppUnreadTotal = ref(0)
const token = localStorage.getItem('token')
// const showEarthStatus = ref(false)
// const nowMenuData = ref([])

onUnmounted(() => {
    window.onresize = null
})

onMounted(() => {
    let screenWidth = document.body.clientWidth
    let screenWidthFloor = Math.floor(screenWidth)

    if (screenWidthFloor <= 768) {
        dialogBusinessAccountWidth.value = '80%'
    }

    window.onresize = () => {
        if (screenWidthFloor <= 768) {
            dialogBusinessAccountWidth.value = '80%'
        }
    }

    if (token) {
        console.log('----- on mounted -------------')
        getBasicInfo(identityStore.value)
        getAllIdentity()
        getUserUnreadList(inAppPage.value, inAppLimit.value)
        getUserUnread()
    }

})

const allIdentityChangedValue = computed(() => store.state.allIdentityChanged)

const identityStore = computed(() => store.state.identity)
const isThirdCompanyVisible = computed(()=>store.state.isThirdCompanyStatus)

const unreadTotal = computed(() => store.state.imUnreadTotal)

const userInfo = computed(()=>store.state.userInfo)
const switchIdentityStatus = computed(()=>store.state.switchIdentityStatus)
const educatorIdentities = computed(()=>store.state.educatorIdentities)
const recruiterIdentities = computed(()=>store.state.recruiterIdentities)
const schoolIdentities = computed(()=>store.state.schoolIdentities)
const otherIdentities = computed(()=>store.state.otherIdentities)
const vendorIdentities = computed(()=>store.state.vendorIdentities)
const contributorIdentities = computed(()=>store.state.contributorIdentities)


watch(switchIdentityStatus, (newValue, oldValue)=>{
    console.log('switch identity status=>'+ newValue + '=>' + oldValue)
    if(newValue){
        getBasicInfo(identityStore.value)
        getAllIdentity()
        inAppNotificationData.value = []
        getUserUnreadList(1, inAppLimit.value)
        getUserUnread()
    }
})

watch(allIdentityChangedValue, (newValue, oldValue) => {
    console.log(newValue,oldValue)
    getAllIdentity()
    getBasicInfo(identityStore.value)
    inAppNotificationData.value = []
    getUserUnreadList(1, inAppLimit.value)
    getUserUnread()
})

watch(isThirdCompanyVisible, (newValue,oldValue)=>{console.log(newValue,oldValue)})

watch(unreadTotal, (newValue, oldValue) => {
    console.log(newValue, oldValue)
})

watch(unreadChanged, (newValue, oldValue) => {
    console.log(newValue, oldValue)
})

const turnChatPage = () => {
    router.push('/chat/messages')
}

const getAllIdentity = () => {

    let params = {}
    USER_ALL_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

            // store.commit('allIdentityChanged', false)
            let vendorCompany = []
            let recruitingCompany = []
            let schoolCompany = []
            let otherCompany = []
            let contributorCompany = []

            let userContact = res.message.user_contact

            if (userContact) {
                let educatorContact = userContact.educarot_contact

                if (educatorContact) {
                    educatorContactStatus.value = true;
                    localStorage.setItem('educatorIdentities', JSON.stringify(educatorContact))
                    store.commit('setEducatorIdentities', educatorContact)
                } else {
                    educatorContactStatus.value = false;
                }

                vendorCompany = userContact.vendor_company
                recruitingCompany = userContact.recruiting_company
                schoolCompany = userContact.school_company
                otherCompany = userContact.other_company
                contributorCompany = userContact.contributor_company

                if (vendorCompany) {
                    localStorage.setItem('vendorIdentities', JSON.stringify(vendorCompany))
                    store.commit('setVendorIdentities',vendorCompany)
                }

                if (recruitingCompany) {
                    localStorage.setItem('recruiterIdentities', JSON.stringify(recruitingCompany))
                    store.commit('setRecruiterIdentities',recruitingCompany)
                }

                if (schoolCompany) {
                    localStorage.setItem('schoolIdentities', JSON.stringify(schoolCompany))
                     store.commit('setSchoolIdentities', schoolCompany)
                }

                if (otherCompany) {
                    localStorage.setItem('otherIdentities', JSON.stringify(otherCompany))
                     store.commit('setOtherIdentities', otherCompany)
                }

                if (contributorCompany) {
                    localStorage.setItem('contributorIdentities', JSON.stringify(contributorCompany))
                    store.commit('setContributorIdentities', contributorCompany)
                }

            }

        }

    }).catch(err => {
        console.log(err)
    })
}

const signUp = () => {
    router.push({path: '/signup', query: {}})
}

const handleSetCurrentUser = (uid, identity, companyId, name, avatar) => {

    let uuid = uid + '#' + identity + '#' + companyId

    let currentUser = {
        uuid: uuid,
        name: name,
        avatar: avatar
    }

    store.commit('currentUser', currentUser)

}
const getBasicInfo = (identity) => {

    let params = {
        identity: identity
    }

    USER_INFO_BY_TOKEN_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

            let userContact = res.message.user_contact;

            let companyInfo = {};
            let name = userContact.first_name + ' ' + userContact.last_name;
            let companyName = ''
            let avatar = 'https://oss.esl-passport.cn/educator.png';
            let percentageValue = ''

            if (identity == 1) {
                avatar = userContact.headimgurl;
                companyName = name;
                percentageValue = userContact.is_educator;
            }

            if (identity == 2 || identity == 3 || identity == 4 || identity == 5) {

                if (userContact.company) {
                    companyInfo = userContact.company;
                    avatar = companyInfo.logo;
                    companyName = companyInfo.company_name;
                }
                if (identity == 2) {
                    percentageValue = userContact.is_recruiting
                }
                if (identity == 3) {
                    percentageValue = userContact.is_school
                }
                if (identity == 4) {
                    percentageValue = userContact.is_other
                }
                if (identity == 5) {
                    percentageValue = userContact.is_vendor
                }

            }

            handleSetCurrentUser(userContact.id, identity, userContact.company_id, name, avatar)

            let userInfoObj = {
                name:name,
                avatar:avatar,
                companyName:companyName
            }

            localStorage.setItem('userInfo', JSON.stringify(userInfoObj))
            localStorage.setItem('is_third_company', userContact.is_third_company)
            localStorage.setItem('profile_percentage', percentageValue)

            store.commit('setUserInfo', userInfoObj)
            store.commit('changeThirdCompanyStatus', userContact.is_third_company)
            store.commit('setProfilePercentage', percentageValue)
            store.commit('setSwitchIdentityStatus', false)

        }
    }).catch(err => {
        console.log(err)
        // ElMessage({
        //     type:'error',
        //     message:err,
        //     grouping:true
        // })
    })
}

const login = () => {
    router.push('/login')
}
const returnMySelf = () => {
    const loading = ElLoading.service({
        text:'Loading...'
    })

    COMEBACK_MYSELF().then(res => {
        console.log(res)
        if (res.code == 200) {
            let uid = localStorage.getItem('uid')
            let identityValue = res.message.return_identity
            let companyIdValue = res.message.return_company_id

            localStorage.setItem('identity', identityValue)
            localStorage.setItem('company_id', companyIdValue)

            store.commit('identity', identityValue)
            store.commit('setSwitchIdentityStatus', true)
            store.commit('currentCompanyId', companyIdValue)
            store.commit('changeThirdCompanyStatus', 0)

            getAllIdentity()
            getUserMenuList(uid, identityValue, companyIdValue, uid)

            setTimeout(function () {
                router.push({path: '/overview', query: {}})
                loading.close()
            }, 1500)

        }
    }).catch(err => {
        console.log(err)
        ElMessage({
            type:'error',
            message:err,
            grouping:true
        })
    })
}

const loginOut = () => {
    const loading = ElLoading.service({
        text:'Loading...'
    })

    let params = {
        token: localStorage.getItem('token'),
        platform: 4
    }

    LOGOUT_V2(params).then(res => {
        if (res.code == 200) {
            localStorage.clear()
            store.commit('setUserInfo', {})
            router.push('/')
            loading.close()
        }

    }).catch(err => {
        console.log(err)
    })

}

const turnOverview = () => {
    const loading = ElLoading.service({
        text:'Loading...'
    })

    router.push('/overview')

    setTimeout(function () {
        loading.close()
    }, 1500)
}
const turnEditProfile = () => {
    const loading = ElLoading.service({
        text:'Loading...'
    })

    let companyId = localStorage.getItem('company_id')
    let identity = localStorage.getItem('identity')

    if (companyId && companyId != '0') {
        changeIdentity(companyId, identity, 2)
        loading.close()

    } else {
        if (identity == 1) {
            loading.close()
            let strObj = {
                i: 1,
                action: 'add'
            }
            let str = encode(JSON.stringify(strObj))

            router.push({path: '/setting/profile/educator', query: {s: str}})

        }

        if (identity == 2) {

            loading.close()
            let strObj = {
                i: 2,
                action: 'add'
            }
            let str = encode(JSON.stringify(strObj))
            router.push({path: '/setting/profile/recruiter', query: {s: str}})
        }

        if (identity == 3) {

            loading.close()
            let strObj = {
                i: 3,
                action: 'add'
            }
            let str = encode(JSON.stringify(strObj))
            router.push({path: '/setting/profile/school', query: {s: str}})
        }

        if (identity == 4) {
            loading().close()
            let strObj = {
                i: 4,
                action: 'add'
            }
            let str = encode(JSON.stringify(strObj))
            router.push({path: '/setting/profile/other', query: {s: str}})
        }

        if (identity == 5) {

            loading.close()
            let strObj = {
                i: 5,
                action: 'add'
            }
            let str = encode(JSON.stringify(strObj))
            router.push({path: '/setting/profile/vendor', query: {s: str}})

        }

    }

}
const selectBusinessRole = () => {
    dialogBusinessAccountVisible.value = true;
}

const createRole = (identity) => {
    const loading = ElLoading.service({
        text:'Loading...'
    })


    if (identity == 1) {
        loading.close()
        let strObj = {
            i: 1,
            action: 'add'
        }
        let str = encode(JSON.stringify(strObj))
        router.push({path: '/setting/profile/educator', query: {s: str}})

    }

    if (identity == 2) {

        loading.close()
        let strObj = {
            i: 2,
            action: 'add'
        }
        let str = encode(JSON.stringify(strObj))
        router.push({path: '/setting/profile/recruiter', query: {s: str}})

        dialogBusinessAccountVisible.value = false
    }

    if (identity == 3) {

        loading.close()
        let strObj = {
            i: 3,
            action: 'add'
        }
        let str = encode(JSON.stringify(strObj))
        router.push({path: '/setting/profile/school', query: {s: str}})

        dialogBusinessAccountVisible.value = false

    }

    if (identity == 4) {

        loading.close()

        let strObj = {
            i: 4,
            action: 'add'
        }
        let str = encode(JSON.stringify(strObj))

        router.push({path: '/setting/profile/other', query: {s: str}})
        dialogBusinessAccountVisible.value = false

    }

    if (identity == 5) {

        loading.close()

        let strObj = {
            i: 5,
            action: 'add'
        }

        let str = encode(JSON.stringify(strObj))
        router.push({path: '/setting/profile/vendor', query: {s: str}})

    }


}
const switchAndShowContributor = ()=>{

    const loading = ElLoading.service({
        text:'Loading...'
    })

    HOME_USER_CHANGE_IDENTITY().then(res=>{
        console.log(res)
        if(res.code === 200){
            let uid = localStorage.getItem('uid')

            localStorage.setItem('identity', 6)
            store.commit('identity', 6)
            store.commit('setSwitchIdentityStatus', true)

            getUserMenuList(uid, 6, 0, uid)

            setTimeout(function () {
                router.push({path: '/overview', query: {}})
                loading.close()
            }, 1500)
        }
    }).catch(err=>{
        console.log(err)
        ElNotification({
            title:'Err',
            message:err,
            grouping:true
        })
        loading.close()
    })
}

const switchContributor = (companyId, identity,language)=>{
    let params = {
        company_id: companyId,
        language: language,
        identity: identity
    }

    SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

            disconnectIm()
            let str = JSON.stringify(res.message)

            localStorage.setItem('menuData', str)
            store.commit('menuData', res.message)

            USER_INFO_BY_TOKEN_V2({
                identity: identity
            }).then(res => {
                // console.log(res)
                if (res.code == 200) {

                    let userContact = res.message.user_contact;

                    localStorage.setItem('is_third_company', userContact.is_third_company)
                    localStorage.setItem('company_id', userContact.company_id)
                    localStorage.setItem('identity', userContact.identity)

                    store.commit('identity', userContact.identity)
                    store.commit('currentCompanyId', userContact.company_id)
                    store.commit('changeThirdCompanyStatus', res.message.user_contact.is_third_company)
                    store.commit('setSwitchIdentityStatus', true)

                }
            }).catch(err => {
                console.log(err)
                ElMessage({
                    type:'error',
                    message:err,
                    grouping:true
                })
            })

        }
    }).catch(err => {
        console.log(err)
        ElMessage({
            type:'error',
            message:err,
            grouping:true
        })
    })

}
const changeIdentity = (companyId, identity, language) => {

    const loading = ElLoading.service({
        text:'Loading...'
    })

    let params = {
        company_id: companyId,
        language: language,
        identity: identity
    }

    SWITCH_IDENTITY_V2(params).then(res => {
        // console.log(res)
        if (res.code == 200) {

            disconnectIm()
            // store.commit('allIdentityChanged', true)

            localStorage.setItem('company_id', companyId)
            localStorage.setItem('identity', identity)

            let str = JSON.stringify(res.message)
            localStorage.setItem('menuData', str)

            store.commit('identity', identity)
            store.commit('currentCompanyId', companyId)
            store.commit('menuData', res.message)

            store.commit('setSwitchIdentityStatus', true)
            loading.close()

        }
    }).catch(err => {
        console.log(err)
        loading.close()

    })

}

const getUserMenuList = (uid, identity, companyId, cId) => {

    let params = {
        user_id: uid,
        identity: identity,
        company_id: companyId,
        create_user_id: cId,
        page: 1,
        limit: 1000
    }
    USER_MENU_LIST(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
            let str = JSON.stringify(res.message)
            localStorage.setItem('menuData', str)
            store.commit('menuData', res.message)
        }
    }).catch(err => {
        console.log(err)
    })
}

const loadUserUnreadMore = () => {
    inAppPage.value++
    if ( inAppPage.value <= inAppLastPage.value) {
        getUserUnreadList(inAppPage.value, inAppLimit.value)
    }

}
const getUserUnreadList = (page, limit) => {
    let params = {
        page: page,
        limit: limit
    }
    USER_UNREAD_LIST(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            inAppNotificationData.value = inAppNotificationData.value.concat(res.message.data);
            inAppLastPage.value = res.message.last_page;

        }
    }).catch(err => {
        console.log(err)
    })
}
const setInAppRead = (id, identity, index) => {
    let params = {
        id: id,
        identity: identity,
        status: 1
    }
    SET_READ(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            inAppNotificationData.value[index]['is_read'] = 1
            getUserUnread()
        }
    }).catch(err => {
        console.log(err)
    })

}
const setInAppReadAll = () => {

    let params = {
        status: 1
    }

    SET_READ_ALL(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            inAppNotificationData.value = []
            getUserUnreadList(1, inAppLimit.value)
            getUserUnread()
        }
    }).catch(err => {
        console.log(err)
    })

}
const getUserUnread = () => {
    let params = {
        identity: localStorage.getItem('identity')
    }
    USER_UNREAD(params).then(res => {
        console.log(res)
        if (res.code == 200) {
            inAppUnreadTotal.value = res.message.count;
        }
    }).catch(err => {
        console.log(err)
    })
}

// const goChinaWebsite = () => {
//     window.open('https://www.edupassport.cn')
// }
// const goInternationalWebsite = () => {
//     window.open('https://www.edupassport.io')
// }

onBeforeRouteUpdate(() => {
    unreadChanged.value++
})

onBeforeRouteLeave(() => {
    unreadChanged.value++
})

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

.user-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

}

.user-earth-container {
    margin-right: 16px;
    cursor: pointer;
    position: relative;
}

.user-earth-expand {
    padding: 15px;
}

.user-earth-international {
    font-family: Inter, Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 18px;
    margin-bottom: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
}

.user-earth-international span {
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #9173ff;
    margin-right: 10px;
}

.user-earth-china {
    font-family: Inter, Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

}

.user-earth-china span {
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #9173ff;
    margin-right: 10px;
}

.user-bell-container {
    margin-right: 16px;
    cursor: pointer;
}

.user-avatar-img {
    width: 40px;
    height: 40px;
    cursor: pointer;
}

.router-link-exact-active {
    background-color: #6650B3;
    color: #ffffff !important;
    padding: 10px 20px;
    border-radius: 4px;
}

.el-dropdown-link {

    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 14px;
    line-height: 18px;
    color: #1D2939;
    font-weight: 600;
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}


.el-dropdown-link-sp {
    display: flex;
    align-items: center;

    font-size: 14px;
    line-height: 18px;
    color: #1D2939;
    font-weight: 600;
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.el-dropdown-link-1 {

    font-size: 14px;
    line-height: 18px;
    color: #1D2939;
    font-weight: 600;
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.el-dropdown-tips {
    margin-top: 10px;
    padding-left: 20px;
    color: #262626;
    font-size: 14px;
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.xll-add-icon-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.xll-add-icon-container span {
    font-size: 14px;
    line-height: 18px;
    color: #1D2939;
    font-weight: 600;
    font-family: Inter, "Open Sans", "Helvetica Neue", Arial, Helvetica, sans-serif;
}

.xll-icon-circle-plus-1 {
    margin-left: 4px;
}

.xll-icon-arrow-left {
    position: absolute;
    left: -12px;
    top: -1px;
    bottom: 0;
    margin: auto;
}

.xll-sub-dropdown {
    padding: 10px;
}

.xll-sub-dropdown h4 {
    padding: 4px 10px;
    border-bottom: 1px solid #eeeeee;
    color: #808080;
}

.switch-account-tips {
    font-size: 16px;
    text-align: center;
}

.switch-account-container {
    padding: 10px;
}

.switch-account-item {
    font-size: 14px;
    padding: 10px;
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    text-align: center;
}

.switch-account-item:hover {
    background-color: #0AA0A8;
    color: #FFFFFF;
}

.discount-card-container {
    width: 99%;
    margin: 0 auto;
}

.notification-c {
    padding: 15px;
}

.notification-all-read {
    font-family: Inter, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: 600;
    text-align: right;
    cursor: pointer;
}

.notification-items {
    margin-top: 25px;
    max-height: 300px;
    overflow: auto;
}

.notification-items::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.notification-items::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: #9173ff;
    background-image: -webkit-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
    );
}

.notification-items::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
}

.notification-item {
    padding: 0 15px;
    margin-bottom: 25px;
}

.notification-item-time {
    font-family: Inter, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 500;
}

.notification-item-c {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: row;
    margin-top: 15px;
}

.notification-item-c-l {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: #F0F2F5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-item-c-r {
    width: calc(100% - 50px);
    font-family: AssiRegular, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-size: 14px;
    word-break: break-word;
    text-align: left;
    cursor: pointer;
}

.no-read-1 {
    background-color: #E7DEFF;
}

.no-read-2 {
    font-family: Assistant-SemiBold, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
}

.im-msg-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding-top: 25px;
}

.im-msg-btn {
    width: 100%;
}

.im-msg-container span {

    font-size: 14px;
    font-family: Inter, Open Sans, Helvetica Neue, Arial, Helvetica, sans-serif;
    margin-left: 15px;
}


.circle-circle {
    position: relative;
}

.circle-red {
    display: block;
    position: absolute;
    right: 0;
    top: -5px;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #FF4D4D;
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

}


</style>
