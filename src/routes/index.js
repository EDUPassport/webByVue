import layout from '../layout/index'

import {createRouter, createWebHistory} from 'vue-router'
// import {isPhone} from "@/utils";
const identity = localStorage.getItem('identity')
const routes = [
    {
        path: '/',
        component: layout,
        redirect: '/home',
        meta: {
            titleC: 'China Home',
            titleG:'Global Home'
        },
        children: [
            {
                path: '/home',
                name: 'home',
                alias:'/',
                component: () => import('@/views/home/index'),
                meta: {
                    titleC: 'China Home',
                    titleG: 'Global Home'
                },
            },
            {
                path: '/services/price',
                name: 'servicesPrice',
                component: () => import('@/views/services/price'),
                meta: {
                    titleC: 'China Pricing',
                    titleG: 'Global Pricing'
                },
            },
            {
                path: '/food4edu',
                name: 'consultingFoodEducation',
                component: () => import('@/views/consulting/foodEducation'),
                meta: {
                    titleC: 'China Partners',
                    titleG: 'Global Partners'
                },
            },
            {
                path: '/jobs',
                name: 'jobs',
                component: () => import('@/views/jobs/list'),
                meta: {
                    titleC: 'China Jobs Lists',
                    titleG: 'Global Jobs Lists'
                }
            },
            {
                path: '/jobs/detail',
                name: 'jobsDetail',
                component: () => import('@/views/jobs/detail'),
                meta: {
                    titleC: 'China Jobs Detail',
                    titleG: 'Global Jobs Detail'
                }
            },
            {
                path: '/jobs/post',
                name: 'postJob',
                component: () => import('@/views/jobs/post/post'),
                meta: {
                    titleC: 'China Post a Job',
                    titleG: 'Global Post a Job',
                }
            },
            {
                path: '/jobs/myJobs',
                name: 'myJobs',
                component: () => import('@/views/jobs/my/jobs'),
                meta: {
                    titleC: 'China My Posted Jobs',
                    titleG: 'Global My Posted Jobs',
                }
            },
            {
                path: '/jobs/applications',
                name: 'jobApplications',
                component: () => import('@/views/jobs/applications'),
                meta: {
                    titleC: 'China Applications',
                    titleG: 'Global Applications',
                    auth:true
                }
            },
            {
                path: '/info/company',
                name: 'companyInfo',
                component: () => import('@/views/info/company'),
                meta: {
                    titleC: 'China Company Info',
                    titleG: 'Global Company Info',
                }
            },
            {
                path: '/info/personal',
                name: 'personalInfo',
                component: () => import('@/views/info/personal'),
                meta: {
                    titleC: 'China Personal Information',
                    titleG: 'Global Personal Information',
                }
            },
            {
                path:'/events/list',
                name:'eventsList',
                component:()=>import('@/views/events/list'),
                meta:{
                    titleC: 'China Events List',
                    titleG: 'Global Events List',
                }
            },
            {
                path:'/events/detail',
                name:'eventsDetail',
                component:()=>import('@/views/events/detail'),
                meta:{
                    titleC: 'China Events Detail',
                    titleG: 'Global Events Detail',
                }
            },
            {
                path: '/events/post',
                name: 'eventsPost',
                component: () => import('@/views/events/post/post'),
                meta: {
                    titleC: 'China Post Event',
                    titleG: 'Global Post Event',
                }
            },
            {
                path: '/events/myEvents',
                name: 'myEvents',
                component: () => import('@/views/events/my/events'),
                meta: {
                    titleC: 'China My Events',
                    titleG: 'Global My Events',
                }
            },
            {
                path: '/deals',
                name: 'deals',
                component: () => import('@/views/deals/index'),
                meta: {
                    titleC: 'China Deals List',
                    titleG: 'Global Deals List',
                }
            },
            {
                path: '/deals/offer',
                name: 'dealsOffer',
                component: () => import('@/views/deals/offer/offer'),
                meta: {
                    titleC: 'China Offer a Deal',
                    titleG: 'Global Offer a Deal',
                }
            },
            {
                path: '/deals/myDeals',
                name: 'myDeals',
                component: () => import('@/views/deals/my/deals'),
                meta: {
                    titleC: 'China My Deals',
                    titleG: 'Global My Deals',
                }
            },
            {
                path: '/deals/detail',
                name: 'dealDetail',
                component: () => import('@/views/deals/detail'),
                meta: {
                    titleC: 'China Deal Detail',
                    titleG: 'Global Deal Detail',
                }
            },
            {
                path: '/overview',
                name: 'overview',
                component: () => import('@/views/profile/overview'),
                meta: {
                    titleC: 'China Overview',
                    titleG: 'Global Overview',
                }
            },
            {
                path: '/account/home',
                name: 'accountHome',
                component: () => import('@/views/account/home'),
                meta: {
                    titleC: 'China Account information',
                    titleG: 'Global Account information',
                }
            },
            {
                path: '/jobs/home',
                name: 'jobsHome',
                component: () => import('@/views/jobs/home'),
                meta: {
                    titleC: 'China jobs and applications',
                    titleG: 'Global jobs and applications',
                }
            },
            {
                path: '/chat/messages',
                name: 'chatMessages',
                component: () => import('@/views/chat/messages'),
                meta: {
                    titleC: 'China Chat Messages',
                    titleG: 'Global Chat Messages',
                }
            },
            {
                path: '/favorites',
                name: 'favorites',
                component: () => import('@/views/me/favorites'),
                meta: {
                    titleC: 'China My Favorites',
                    titleG: 'Global My Favorites'
                }
            },
            {
                path: '/me/applications',
                name: 'myApplications',
                component: () => import('@/views/me/applications'),
                meta: {
                    titleC: 'China My Applications',
                    titleG: 'Global My Applications',
                }
            },
            {
                path: '/profile/admin/add',
                name: 'profileAdminAdd',
                component: () => import('@/views/profile/admin/add'),
                meta: {
                    activeMenu:identity == 1 ?  "/educator/profile" : identity == 2 ? '/business/profile' : identity ==3 ? '/vendor/profile' : '',
                    titleC: 'China Add an Agent',
                    titleG: 'Global Add an Agent',
                }
            },
            {
                path: '/profile/contact/user',
                name: 'profileUserContact',
                component: () => import('@/views/profile/contact/user'),
                meta: {
                    activeMenu:identity == 1 ?  "/educator/profile" : identity == 2 ? '/business/profile' : identity ==3 ? '/vendor/profile' : '',
                    titleC: 'China My User Contact',
                    titleG: 'Global My User Contact',
                }
            },
            {
                path: '/profile/contact/company',
                name: 'profileCompanyContact',
                component: () => import('@/views/profile/contact/company'),
                meta: {
                    activeMenu:identity == 1 ?  "/educator/profile" : identity == 2 ? '/business/profile' : identity ==3 ? '/vendor/profile' : '',
                    titleC: 'China My Company Contact',
                    titleG: 'Global My Company Contact',
                }
            },
            {
                path: '/educator/profile',
                name: 'educatorProfile',
                component: () => import('@/views/profile/educator/profile'),
                meta: {
                    titleC: 'China My Profile',
                    titleG: 'Global My Profile',
                }
            },
            {
                path: '/educator/edit/home',
                name: 'editEducatorHome',
                component: () => import('@/views/profile/educator/edit/home'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'China Add Profile',
                    titleG: 'Global Add Profile',
                }
            },
            {
                path: '/educator/edit/basic',
                name: 'editEducatorBasic',
                component: () => import('@/views/profile/educator/edit/basic'),
                meta: {
                    activeMenu: "/educator/profile",
                    titleC: 'China Edit Basic Info',
                    titleG: 'Global Edit Basic Info',
                }
            },
            {
                path: '/educator/edit/education',
                name: 'editEducatorEducation',
                component: () => import('@/views/profile/educator/edit/education'),
                meta: {
                    activeMenu: "/educator/profile",
                    titleC: 'China Education',
                    titleG: 'Global Education',
                }
            },
            {
                path: '/educator/edit/work',
                name: 'editEducatorWork',
                component: () => import('@/views/profile/educator/edit/work'),
                meta: {
                    activeMenu: "/educator/profile",
                    titleC: 'China Work Experience',
                    titleG: 'Global Work Experience',
                }
            },
            {
                path: '/business/profile',
                name: 'businessProfile',
                component: () => import('@/views/profile/business/profile'),
                meta: {
                    titleC: 'China My Profile',
                    titleG: 'Global My Profile',
                }
            },
            {
                path: '/business/edit/recruiter',
                name: 'editRecruiter',
                component: () => import('@/views/profile/business/edit/recruiter'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'China Edit Recruiter Info',
                    titleG: 'Global Edit Recruiter Info',
                }
            },
            {
                path: '/business/edit/other',
                name: 'editBusinessOther',
                component: () => import('@/views/profile/business/edit/other'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'China Edit Other Info',
                    titleG: 'Global Edit Other Info',
                }
            },
            {
                path: '/business/edit/school',
                name: 'editSchoolInfo',
                component: () => import('@/views/profile/business/edit/school'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'China Edit School Info',
                    titleG: 'Global Edit School Info',
                }
            },
            {
                path: '/vendor/profile',
                name: 'vendorProfile',
                component: () => import('@/views/profile/vendor/profile'),
                meta: {
                    titleC: 'China My Profile',
                    titleG: 'Global My Profile',
                }
            },
            {
                path: '/vendor/edit/vendor',
                name: 'editVendor',
                component: () => import('@/views/profile/vendor/edit/vendor'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'China Edit Vendor Info',
                    titleG: 'Global Edit Vendor Info',
                }
            },
            {
                path: '/search/result',
                name: 'searchResult',
                component: () => import('@/views/search/result'),
                meta: {
                    titleC: 'China Search Result',
                    titleG: 'Global Search Result',
                }
            },
            {
                path: '/privacy/policy',
                name: 'privacyPolicy',
                component: () => import('@/views/privacy/policy'),
                meta: {
                    titleC: 'China Privacy Policy',
                    titleG: 'Global Privacy Policy',
                }
            },
            {
                path: '/contact/us',
                name: 'contactUs',
                component: () => import('@/views/contact/us'),
                meta: {
                    titleC: 'China Contact Us',
                    titleG: 'Global Contact Us',
                }
            },
            {
                path: '/about/us',
                name: 'aboutUs',
                component: () => import('@/views/about/us'),
                meta: {
                    titleC: 'China About Us',
                    titleG: 'Global About Us',
                }
            },
            {
                path:'/industry/news',
                name:'industryNews',
                component:()=>import('@/views/industry/news'),
                meta:{
                    titleC: 'China Industry News',
                    titleG: 'Global Industry News',
                }
            },
            {
                path:'/industry/detail',
                name:'industryDetail',
                component:()=>import('@/views/industry/detail'),
                meta:{
                    titleC: 'China Industry News Detail',
                    titleG: 'Global Industry News Detail'
                }
            },
            {
                path:'/blog/list',
                name:'blogList',
                component:()=>import('@/views/blog/list'),
                meta:{
                    titleC: 'China Blog List',
                    titleG: 'Global Blog List',
                }
            },
            {
                path:'/blog/detail',
                name:'blogDetail',
                component:()=>import('@/views/blog/detail'),
                meta:{
                    titleC: 'China Blog Detail',
                    titleG: 'Global Blog Detail',
                }
            },
            {
                path:'/payment/paypal/callback',
                name:'paypalCallback',
                component:()=>import('@/views/payment/paypal/callback'),
                meta:{
                    titleC: 'China Paypal',
                    titleG: 'Global Paypal',
                }
            },
            {
                path:'/perks/home',
                name:'perksHome',
                component:()=>import('@/views/perks/home'),
                meta:{
                    titleC: 'China Perks',
                    titleG: 'Global Perks',
                }
            },
            {
                path:'/faq/list',
                name:'faqList',
                component:()=>import('@/views/faq/list'),
                meta:{
                    titleC: 'China FAQ',
                    titleG: 'Global FAQ',
                }
            },
            {
                path:'/me/ads',
                name:'myAds',
                component:()=>import('@/views/me/ads/ads'),
                meta:{
                    titleC: 'China My Ads',
                    titleG: 'Global My Ads',
                }
            },
            {
                path:'/me/ads/platform',
                name:'myAdsPlatform',
                component:()=>import('@/views/me/ads/platform'),
                meta:{
                    titleC: 'China Platform',
                    titleG: 'Global Platform',
                }
            },
            {
                path:'/me/ads/identity',
                name:'myAdsIdentity',
                component:()=>import('@/views/me/ads/identity'),
                meta:{
                    titleC: 'China Target Audience',
                    titleG: 'Global Target Audience',
                }
            },
            {
                path:'/me/ads/list',
                name:'myAdsList',
                component:()=>import('@/views/me/ads/list'),
                meta:{
                    titleC: 'China Ads List',
                    titleG: 'Global Ads List',
                }
            },
            {
                path:'/me/ads/detail',
                name:'myAdsDetail',
                component:()=>import('@/views/me/ads/detail'),
                meta:{
                    titleC: 'China Ads Detail',
                    titleG: 'Global Ads Detail',
                }
            },
            {
                path:'/me/ads/redeem',
                name:'myAdsRedeem',
                component:()=>import('@/views/me/ads/redeem'),
                meta:{
                    titleC: 'China Ads Redeem',
                    titleG: 'Global Ads Redeem',
                }
            }

        ],
    },
    {
        path: '/comeSoon',
        name: 'comeSoon',
        component: () => import('@/views/comeSoon'),
        meta: {
            titleC: 'China Coming Soon',
            titleG: 'Global Coming Soon'
        }
    },
    {
        path: '/exchange/account',
        name: 'exchangeAccount',
        component: () => import('@/views/exchange/account'),
        meta: {
            titleC: 'China Exchange Information',
            titleG: 'Global Exchange Information',
        }
    },
    {
        path: '/edupassport',
        name: 'edupassport',
        component: () => import('@/views/login/index'),
        meta: {
            titleC: 'China EDU Passport Login and Sign Up',
            titleG: 'Global Login EDU Passport Login and Sign Up',
        },
    },
    {
        path: '/edupassport/signup',
        name: 'edupassportSignUp',
        component: () => import('@/views/login/register/index'),
        meta: {
            titleC: 'China EDU Passport Sign Up',
            titleG: 'Global Login EDU Passport Sign Up',
        },
    },
    {
        path: '/edupassport/linkedin',
        name: 'linkedinLogin',
        component: () => import('@/views/login/linkedin'),
        meta: {
            titleC: 'China Linkedin Login',
            titleG: 'Global Linkedin Login',
        }
    },
    {
        path: '/edupassport/google',
        name: 'googleLogin',
        component: () => import('@/views/login/google'),
        meta: {
            titleC: 'China Google Login',
            titleG: 'Global Google Login',
        }
    },

    {
        path: '/noFound',
        name: 'noFound',
        component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
        meta: {
            titleC: 'China Not Found',
            titleG: 'Global Not Found',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'noFound',
        component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
        meta: {
            titleC: 'China Not Found',
            titleG: 'Global Not Found',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
})

const defaultTitle = 'Home';

router.beforeEach((to, from, next) => {

    let envName = process.env.VUE_APP_ENV_NAME

    if(envName === 'developmentCN' || envName === 'productionCN'){
        document.title = to.meta.titleC ? to.meta.titleC : defaultTitle;
    }

    if(envName === 'development' || envName === 'production'){
        document.title = to.meta.titleG ? to.meta.titleG : defaultTitle;
    }

    // if (isPhone()) {
    //     let domain = ''
    //     if(envName === 'developmentCN'){
    //         domain = 'https://test.esl-passport.cn/'
    //     }
    //
    //     if(envName === 'development'){
    //         domain = 'https://test.esl-passport.cn/'
    //     }
    //     if(envName === 'productionCN'){
    //         domain = 'https://esl-passport.cn/'
    //     }
    //
    //     if(envName === 'production'){
    //         domain = 'https://esl-passport.cn/'
    //     }
    //
    //     window.location.href = domain
    // }
    next();
});

export default router;
