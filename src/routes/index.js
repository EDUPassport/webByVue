import layout from "@/layout";
// import appLayout from "@/layout/appLayout";
import {createRouter, createWebHistory} from 'vue-router'
import appLayout from "@/layout/appLayout";
// import {isPhone} from "@/utils";
// const identity = localStorage.getItem('identity')

const routes = [

    {
        path: '/services',
        component: layout,
        redirect: '/services/price',
        children: [
            {
                path: 'price',
                name: 'servicesPrice',
                component: () => import('@/views/services/price'),
                meta: {
                    titleC: 'Pricing',
                    titleG: 'Pricing'
                },
            },
        ]

    },
    {
        path: '/food4edu',
        component: layout,
        redirect: '/food4edu',
        children: [
            {
                path: '/food4edu',
                name: 'consultingFoodEducation',
                component: () => import('@/views/consulting/foodEducation'),
                meta: {
                    titleC: 'Partners',
                    titleG: 'Partners'
                },
            }
        ]

    },
    {
        path: '/jobs',
        component: layout,
        children: [
            {
                path: '/jobs',
                name: 'jobs',
                component: () => import('@/views/jobs/list'),
                meta: {
                    titleC: 'Jobs Lists',
                    titleG: 'Jobs Lists'
                }
            },
            {
                path: 'detail',
                name: 'jobsDetail',
                component: () => import('@/views/jobs/detail'),
                meta: {
                    titleC: 'Jobs Detail',
                    titleG: 'Jobs Detail'
                }
            },
            {
                path: 'business/profile',
                name: 'jobsBusinessProfile',
                component: () => import('@/views/jobs/businessProfile'),
                meta: {
                    titleC: 'Jobs Business Profile',
                    titleG: 'Jobs Business Profile'
                }
            },
            {
                path: 'post',
                name: 'postJob',
                component: () => import('@/views/jobs/post/post'),
                meta: {
                    activeMenu: '/account/home',
                    titleC: 'Post a Job',
                    titleG: 'Post a Job',
                }
            },
            {
                path: 'myJobs',
                name: 'myJobs',
                component: () => import('@/views/jobs/my/jobs'),
                meta: {
                    titleC: 'My Posted Jobs',
                    titleG: 'My Posted Jobs',
                }
            },
            {
                path: 'applications',
                name: 'jobApplications',
                component: () => import('@/views/jobs/applications'),
                meta: {
                    titleC: 'Applications',
                    titleG: 'Applications',
                    auth: true
                }
            },

        ]

    },
    {
        path: '/info',
        component: layout,
        children: [
            {
                path: 'company',
                name: 'companyInfo',
                component: () => import('@/views/info/company'),
                meta: {
                    titleC: 'Company Info',
                    titleG: 'Company Info',
                }
            },
            {
                path: 'personal',
                name: 'personalInfo',
                component: () => import('@/views/info/personal'),
                meta: {
                    titleC: 'Personal Information',
                    titleG: 'Personal Information',
                }
            },

        ]

    },
    {
        path: '/events',
        component: layout,
        children: [
            {
                path: 'list',
                redirect: '/events'
            },
            {
                path: '/events',
                name: 'eventsList',
                component: () => import('@/views/events/list'),
                meta: {
                    titleC: 'Events List',
                    titleG: 'Events List',
                }
            },
            {
                path: '/post-event',
                name:'zohoPostEvent',
                component:()=>import('@/views/events/postEvent'),
                meta:{
                    titleC: 'Post Event',
                    titleG: 'Post Event',
                }
            },
            {
                path: 'detail',
                name: 'eventsDetail',
                component: () => import('@/views/events/detail'),
                meta: {
                    titleC: 'Events Detail',
                    titleG: 'Events Detail',
                }
            },
            {
                path: 'post',
                name: 'eventsPost',
                component: () => import('@/views/events/post/post'),
                meta: {
                    titleC: 'Post Event',
                    titleG: 'Post Event',
                }
            },
            {
                path: 'myEvents',
                name: 'myEvents',
                component: () => import('@/views/events/my/events'),
                meta: {
                    activeMenu: "/perks/home",
                    titleC: 'My Events',
                    titleG: 'My Events',
                }
            },

        ]

    },
    {
        path: '/deals',
        component: layout,
        children: [
            {
                path: '/deals',
                name: 'deals',
                component: () => import('@/views/deals/index'),
                meta: {
                    titleC: 'Deals List',
                    titleG: 'Deals List',
                }
            },
            {
                path: 'offer',
                name: 'dealsOffer',
                component: () => import('@/views/deals/offer/offer'),
                meta: {
                    activeMenu: "/perks/home",
                    titleC: 'Offer a Deal',
                    titleG: 'Offer a Deal',
                }
            },
            {
                path: 'myDeals',
                name: 'myDeals',
                component: () => import('@/views/deals/my/deals'),
                meta: {
                    activeMenu: "/perks/home",
                    titleC: 'My Deals',
                    titleG: 'My Deals',
                }
            },
            {
                path: 'detail',
                name: 'dealDetail',
                component: () => import('@/views/deals/detail'),
                meta: {
                    titleC: 'Deal Detail',
                    titleG: 'Deal Detail',
                }
            },
            {
                path: 'vendor/profile',
                name: 'dealsVendorProfile',
                component: () => import('@/views/deals/vendorProfile'),
                meta: {
                    titleC: 'Deal Vendor Profile',
                    titleG: 'Deal Vendor Profile',
                }
            },

        ]

    },
    {
        path: '/overview',
        component: layout,
        children: [
            {
                path: '/overview',
                name: 'overview',
                component: () => import('@/views/profile/overview'),
                meta: {
                    titleC: 'Overview',
                    titleG: 'Overview',
                }
            },

        ]

    },
    {
        path: '/account',
        component: layout,
        children: [
            {
                path: 'home',
                name: 'accountHome',
                component: () => import('@/views/account/home'),
                meta: {
                    titleC: 'Account information',
                    titleG: 'Account information',
                }
            },

        ]

    },
    {
        path: '/jobs',
        component: layout,
        children: [
            {
                path: 'home',
                name: 'jobsHome',
                component: () => import('@/views/jobs/home'),
                meta: {
                    titleC: 'jobs and applications',
                    titleG: 'jobs and applications',
                }
            },

        ]

    },
    {
        path: '/chat',
        component: layout,
        children: [
            {
                path: 'messages',
                name: 'chatMessages',
                component: () => import('@/views/chat/messages'),
                meta: {
                    titleC: 'Chat Messages',
                    titleG: 'Chat Messages',
                }
            },

        ]

    },
    {
        path: '/favorites',
        component: layout,
        children: [
            {
                path: '/favorites',
                name: 'favorites',
                component: () => import('@/views/me/favorites'),
                meta: {
                    titleC: 'My Favorites',
                    titleG: 'My Favorites'
                }
            },

        ]

    },
    {
        path: '/me',
        component: layout,
        children: [
            {
                path: 'ads',
                name: 'myAds',
                component: () => import('@/views/me/ads/ads'),
                meta: {
                    titleC: 'My Ads',
                    titleG: 'My Ads',
                }
            },
            {
                path: 'ads/platform',
                name: 'myAdsPlatform',
                component: () => import('@/views/me/ads/platform'),
                meta: {
                    titleC: 'Platform',
                    titleG: 'Platform',
                }
            },
            {
                path: 'ads/identity',
                name: 'myAdsIdentity',
                component: () => import('@/views/me/ads/identity'),
                meta: {
                    titleC: 'Target Audience',
                    titleG: 'Target Audience',
                }
            },
            {
                path: 'ads/list',
                name: 'myAdsList',
                component: () => import('@/views/me/ads/list'),
                meta: {
                    titleC: 'Ads List',
                    titleG: 'Ads List',
                }
            },
            {
                path: 'ads/detail',
                name: 'myAdsDetail',
                component: () => import('@/views/me/ads/detail'),
                meta: {
                    titleC: 'Ads Detail',
                    titleG: 'Ads Detail',
                }
            },
            {
                path: 'ads/redeem',
                name: 'myAdsRedeem',
                component: () => import('@/views/me/ads/redeem'),
                meta: {
                    titleC: 'Ads Redeem',
                    titleG: 'Ads Redeem',
                }
            },

        ]

    },
    {
        path: '/profile',
        component: layout,
        children: [

        ]

    },
    {
        path: '/educator',
        component: layout,
        children: [
            {
                path: 'profile',
                name: 'educatorProfile',
                component: () => import('@/views/profile/educator/profile'),
                meta: {
                    titleC: 'My Profile',
                    titleG: 'My Profile',
                }
            },
            {
                path: 'edit/home',
                name: 'editEducatorHome',
                component: () => import('@/views/profile/educator/edit/home'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'Add Profile',
                    titleG: 'Add Profile',
                }
            }

        ]

    },
    {
        path: '/business',
        component: layout,
        children: [
            {
                path: 'profile',
                name: 'businessProfile',
                component: () => import('@/views/profile/business/profile'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'My Profile',
                    titleG: 'My Profile',
                }
            },
            {
                path: 'edit/recruiter',
                name: 'editRecruiter',
                component: () => import('@/views/profile/business/edit/recruiter'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'Edit Recruiter Info',
                    titleG: 'Edit Recruiter Info',
                }
            },
            {
                path: 'edit/other',
                name: 'editBusinessOther',
                component: () => import('@/views/profile/business/edit/other'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'Edit Other Info',
                    titleG: 'Edit Other Info',
                }
            },
            {
                path: 'edit/school',
                name: 'editSchoolInfo',
                component: () => import('@/views/profile/business/edit/school'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'Edit School Info',
                    titleG: 'Edit School Info',
                }
            },
        ]

    },
    {
        path: '/vendor',
        component: layout,
        children: [
            {
                path: 'profile',
                name: 'vendorProfile',
                component: () => import('@/views/profile/vendor/profile'),
                meta: {
                    titleC: 'My Profile',
                    titleG: 'My Profile',
                }
            },
            {
                path: 'edit/vendor',
                name: 'editVendor',
                component: () => import('@/views/profile/vendor/edit/vendor'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'Edit Vendor Info',
                    titleG: 'Edit Vendor Info',
                }
            },
        ]

    },
    {
        path: '/search',
        component: layout,
        children: [
            {
                path: 'result',
                name: 'searchResult',
                component: () => import('@/views/search/result'),
                meta: {
                    titleC: 'Search Result',
                    titleG: 'Search Result',
                }
            },
        ]

    },
    {
        path: '/privacy',
        component: layout,
        children: [
            {
                path: 'policy',
                name: 'privacyPolicy',
                component: () => import('@/views/privacy/policy'),
                meta: {
                    titleC: 'Privacy Policy',
                    titleG: 'Privacy Policy',
                }
            },
        ]

    },
    {
        path: '/contact',
        component: layout,
        children: [
            {
                path: '/contact/us',
                name: 'contactUs',
                component: () => import('@/views/contact/us'),
                meta: {
                    titleC: 'Contact Us',
                    titleG: 'Contact Us',
                }
            },
        ]

    },
    {
        path: '/about',
        component: layout,
        children: [
            {
                path: 'us',
                name: 'aboutUs',
                component: () => import('@/views/about/us'),
                meta: {
                    titleC: 'About Us',
                    titleG: 'About Us',
                }
            },
        ]

    },
    {
        path: '/industry',
        component: layout,
        children: [
            {
                path: 'news',
                name: 'industryNews',
                component: () => import('@/views/industry/news'),
                meta: {
                    titleC: 'Industry News',
                    titleG: 'Industry News',
                }
            },
            {
                path: 'detail',
                name: 'industryDetail',
                component: () => import('@/views/industry/detail'),
                meta: {
                    titleC: 'Industry News Detail',
                    titleG: 'Industry News Detail'
                }
            },

        ]

    },
    {
        path: '/blog',
        component: layout,
        children: [
            {
                path: 'list',
                name: 'blogList',
                component: () => import('@/views/blog/list'),
                meta: {
                    titleC: 'Blog List',
                    titleG: 'Blog List',
                }
            },
            {
                path: 'detail',
                name: 'blogDetail',
                component: () => import('@/views/blog/detail'),
                meta: {
                    titleC: 'Blog Detail',
                    titleG: 'Blog Detail',
                }
            },

        ]

    },

    {
        path: '/payment',
        component: layout,
        children: [
            {
                path: 'paypal/callback',
                name: 'paypalCallback',
                component: () => import('@/views/payment/paypal/callback'),
                meta: {
                    titleC: 'Paypal',
                    titleG: 'Paypal',
                }
            },

        ]

    },
    {
        path: '/perks',
        component: layout,
        children: [
            {
                path: 'home',
                name: 'perksHome',
                component: () => import('@/views/perks/home'),
                meta: {
                    titleC: 'Perks',
                    titleG: 'Perks',
                }
            },

        ]

    },
    {
        path: '/faq',
        component: layout,
        children: [
            {
                path: 'list',
                name: 'faqList',
                component: () => import('@/views/faq/list'),
                meta: {
                    titleC: 'FAQ',
                    titleG: 'FAQ',
                }
            },

        ]

    },
    {
        path: '/',
        component: appLayout,
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('@/views/home/index'),
                meta: {
                    layout: 'app-layout',
                    titleC: 'Home',
                    titleG: 'Home'
                },
            },

        ]

    },
    {
        path: '/comeSoon',
        name: 'comeSoon',
        component: () => import('@/views/comeSoon'),
        meta: {
            titleC: 'Coming Soon',
            titleG: 'Coming Soon'
        }
    },
    {
        path: '/exchange/account',
        name: 'exchangeAccount',
        component: () => import('@/views/exchange/account'),
        meta: {
            titleC: 'Exchange Information',
            titleG: 'Exchange Information',
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index'),
        meta: {
            titleC: 'EDU Passport Login',
            titleG: 'EDU Passport Login',
        },
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/login/register/index'),
        meta: {
            titleC: 'EDU Passport Sign Up',
            titleG: 'EDU Passport Sign Up',
        },
    },
    {
        path: '/login/linkedin',
        name: 'linkedinLogin',
        component: () => import('@/views/login/linkedin'),
        meta: {
            titleC: 'Linkedin Login',
            titleG: 'Linkedin Login',
        }
    },
    {
        path: '/login/google',
        name: 'googleLogin',
        component: () => import('@/views/login/google'),
        meta: {
            titleC: 'Google Login',
            titleG: 'Google Login',
        }
    },

    {
        path: '/noFound',
        name: 'noFound',
        component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
        meta: {
            titleC: 'Not Found',
            titleG: 'Not Found',
        },
    },
    {
        path: '/from/admin/landing',
        name: 'fromAdminPanel',
        component: () => import(/* webpackChunkName: "noFound" */ '@/views/fromAdminPanel.vue'),
        meta: {
            titleC: 'From Admin Landing Page',
            titleG: 'From Admin Landing Page',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'noFound',
        component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
        meta: {
            titleC: 'Not Found',
            titleG: 'Not Found',
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
            return {top: 0}
        }
    },
})

const defaultTitle = 'Home';

router.beforeEach((to, from, next) => {

    let envName = process.env.VUE_APP_ENV_NAME

    if (envName === 'developmentCN' || envName === 'productionCN') {
        document.title = to.meta.titleC ? to.meta.titleC : defaultTitle;
    }

    if (envName === 'development' || envName === 'production') {
        document.title = to.meta.titleG ? to.meta.titleG : defaultTitle;
    }

    // if (isPhone()) {
    //     let domain = ''
    //     if (envName === 'developmentCN') {
    //         domain = 'https://m.dev.edupassport.cn'
    //     }
    //
    //     if (envName === 'development') {
    //         domain = 'https://test.esl-passport.cn'
    //     }
    //
    //     if (envName === 'productionCN') {
    //         domain = 'https://m.edupassport.cn'
    //     }
    //
    //     if (envName === 'production') {
    //         domain = 'https://m.edupassport.io'
    //     }
    //
    //     return window.location.href = domain
    // }

    next();

})

export default router;