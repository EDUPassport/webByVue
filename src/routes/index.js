import layout from "@/layout";
// import appLayout from "@/layout/appLayout";
import {createRouter, createWebHistory} from 'vue-router'
import appLayout from "@/layout/appLayout";
// import {isPhone} from "@/utils";
const identity = localStorage.getItem('identity')
const routes = [

    {
        path: '/services',
        component: layout,
        redirect:'/services/price',
        children: [
            {
                path: 'price',
                name: 'servicesPrice',
                component: () => import('@/views/services/price'),
                meta: {
                    titleC: 'China Pricing',
                    titleG: 'Global Pricing'
                },
            },
        ]

    },
    {
        path: '/food4edu',
        component: layout,
        redirect:'/food4edu',
        children: [
            {
                path: '/food4edu',
                name: 'consultingFoodEducation',
                component: () => import('@/views/consulting/foodEducation'),
                meta: {
                    titleC: 'China Partners',
                    titleG: 'Global Partners'
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
                    titleC: 'China Jobs Lists',
                    titleG: 'Global Jobs Lists'
                }
            },
            {
                path: 'detail',
                name: 'jobsDetail',
                component: () => import('@/views/jobs/detail'),
                meta: {
                    titleC: 'China Jobs Detail',
                    titleG: 'Global Jobs Detail'
                }
            },
            {
                path: 'post',
                name: 'postJob',
                component: () => import('@/views/jobs/post/post'),
                meta: {
                    activeMenu: '/account/home',
                    titleC: 'China Post a Job',
                    titleG: 'Global Post a Job',
                }
            },
            {
                path: 'myJobs',
                name: 'myJobs',
                component: () => import('@/views/jobs/my/jobs'),
                meta: {
                    titleC: 'China My Posted Jobs',
                    titleG: 'Global My Posted Jobs',
                }
            },
            {
                path: 'applications',
                name: 'jobApplications',
                component: () => import('@/views/jobs/applications'),
                meta: {
                    titleC: 'China Applications',
                    titleG: 'Global Applications',
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
                    titleC: 'China Company Info',
                    titleG: 'Global Company Info',
                }
            },
            {
                path: 'personal',
                name: 'personalInfo',
                component: () => import('@/views/info/personal'),
                meta: {
                    titleC: 'China Personal Information',
                    titleG: 'Global Personal Information',
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
                name: 'eventsList',
                component: () => import('@/views/events/list'),
                meta: {
                    titleC: 'China Events List',
                    titleG: 'Global Events List',
                }
            },
            {
                path: 'detail',
                name: 'eventsDetail',
                component: () => import('@/views/events/detail'),
                meta: {
                    titleC: 'China Events Detail',
                    titleG: 'Global Events Detail',
                }
            },
            {
                path: 'post',
                name: 'eventsPost',
                component: () => import('@/views/events/post/post'),
                meta: {
                    titleC: 'China Post Event',
                    titleG: 'Global Post Event',
                }
            },
            {
                path: 'myEvents',
                name: 'myEvents',
                component: () => import('@/views/events/my/events'),
                meta: {
                    activeMenu: "/perks/home",
                    titleC: 'China My Events',
                    titleG: 'Global My Events',
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
                    titleC: 'China Deals List',
                    titleG: 'Global Deals List',
                }
            },
            {
                path: 'offer',
                name: 'dealsOffer',
                component: () => import('@/views/deals/offer/offer'),
                meta: {
                    activeMenu: "/perks/home",
                    titleC: 'China Offer a Deal',
                    titleG: 'Global Offer a Deal',
                }
            },
            {
                path: 'myDeals',
                name: 'myDeals',
                component: () => import('@/views/deals/my/deals'),
                meta: {
                    activeMenu: "/perks/home",
                    titleC: 'China My Deals',
                    titleG: 'Global My Deals',
                }
            },
            {
                path: 'detail',
                name: 'dealDetail',
                component: () => import('@/views/deals/detail'),
                meta: {
                    titleC: 'China Deal Detail',
                    titleG: 'Global Deal Detail',
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
                    titleC: 'China Overview',
                    titleG: 'Global Overview',
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
                    titleC: 'China Account information',
                    titleG: 'Global Account information',
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
                    titleC: 'China jobs and applications',
                    titleG: 'Global jobs and applications',
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
                    titleC: 'China Chat Messages',
                    titleG: 'Global Chat Messages',
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
                    titleC: 'China My Favorites',
                    titleG: 'Global My Favorites'
                }
            },

        ]

    },
    {
        path: '/me',
        component: layout,
        children: [
            {
                path: 'applications',
                name: 'myApplications',
                component: () => import('@/views/me/applications'),
                meta: {
                    titleC: 'China My Applications',
                    titleG: 'Global My Applications',
                }
            },
            {
                path: 'ads',
                name: 'myAds',
                component: () => import('@/views/me/ads/ads'),
                meta: {
                    titleC: 'China My Ads',
                    titleG: 'Global My Ads',
                }
            },
            {
                path: 'ads/platform',
                name: 'myAdsPlatform',
                component: () => import('@/views/me/ads/platform'),
                meta: {
                    titleC: 'China Platform',
                    titleG: 'Global Platform',
                }
            },
            {
                path: 'ads/identity',
                name: 'myAdsIdentity',
                component: () => import('@/views/me/ads/identity'),
                meta: {
                    titleC: 'China Target Audience',
                    titleG: 'Global Target Audience',
                }
            },
            {
                path: 'ads/list',
                name: 'myAdsList',
                component: () => import('@/views/me/ads/list'),
                meta: {
                    titleC: 'China Ads List',
                    titleG: 'Global Ads List',
                }
            },
            {
                path: 'ads/detail',
                name: 'myAdsDetail',
                component: () => import('@/views/me/ads/detail'),
                meta: {
                    titleC: 'China Ads Detail',
                    titleG: 'Global Ads Detail',
                }
            },
            {
                path: 'ads/redeem',
                name: 'myAdsRedeem',
                component: () => import('@/views/me/ads/redeem'),
                meta: {
                    titleC: 'China Ads Redeem',
                    titleG: 'Global Ads Redeem',
                }
            },

        ]

    },
    {
        path: '/profile',
        component: layout,
        children: [
            {
                path: 'admin/add',
                name: 'profileAdminAdd',
                component: () => import('@/views/profile/admin/add'),
                meta: {
                    activeMenu: identity == 1 ? "/educator/profile" : identity == 2 ? '/business/profile' : identity == 3 ? '/vendor/profile' : '',
                    titleC: 'China Add an Agent',
                    titleG: 'Global Add an Agent',
                }
            },
            {
                path: 'contact/user',
                name: 'profileUserContact',
                component: () => import('@/views/profile/contact/user'),
                meta: {
                    activeMenu: identity == 1 ? "/educator/profile" : identity == 2 ? '/business/profile' : identity == 3 ? '/vendor/profile' : '',
                    titleC: 'China My User Contact',
                    titleG: 'Global My User Contact',
                }
            },
            {
                path: 'contact/company',
                name: 'profileCompanyContact',
                component: () => import('@/views/profile/contact/company'),
                meta: {
                    activeMenu: identity == 1 ? "/educator/profile" : identity == 2 ? '/business/profile' : identity == 3 ? '/vendor/profile' : '',
                    titleC: 'China My Company Contact',
                    titleG: 'Global My Company Contact',
                }
            },
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
                    titleC: 'China My Profile',
                    titleG: 'Global My Profile',
                }
            },
            {
                path: 'edit/home',
                name: 'editEducatorHome',
                component: () => import('@/views/profile/educator/edit/home'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'China Add Profile',
                    titleG: 'Global Add Profile',
                }
            },
            {
                path: 'edit/basic',
                name: 'editEducatorBasic',
                component: () => import('@/views/profile/educator/edit/basic'),
                meta: {
                    activeMenu: "/educator/profile",
                    titleC: 'China Edit Basic Info',
                    titleG: 'Global Edit Basic Info',
                }
            },
            {
                path: 'edit/education',
                name: 'editEducatorEducation',
                component: () => import('@/views/profile/educator/edit/education'),
                meta: {
                    activeMenu: "/educator/profile",
                    titleC: 'China Education',
                    titleG: 'Global Education',
                }
            },
            {
                path: 'edit/work',
                name: 'editEducatorWork',
                component: () => import('@/views/profile/educator/edit/work'),
                meta: {
                    activeMenu: "/educator/profile",
                    titleC: 'China Work Experience',
                    titleG: 'Global Work Experience',
                }
            },
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
                    titleC: 'China My Profile',
                    titleG: 'Global My Profile',
                }
            },
            {
                path: 'edit/recruiter',
                name: 'editRecruiter',
                component: () => import('@/views/profile/business/edit/recruiter'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'China Edit Recruiter Info',
                    titleG: 'Global Edit Recruiter Info',
                }
            },
            {
                path: 'edit/other',
                name: 'editBusinessOther',
                component: () => import('@/views/profile/business/edit/other'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'China Edit Other Info',
                    titleG: 'Global Edit Other Info',
                }
            },
            {
                path: 'edit/school',
                name: 'editSchoolInfo',
                component: () => import('@/views/profile/business/edit/school'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'China Edit School Info',
                    titleG: 'Global Edit School Info',
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
                    titleC: 'China My Profile',
                    titleG: 'Global My Profile',
                }
            },
            {
                path: 'edit/vendor',
                name: 'editVendor',
                component: () => import('@/views/profile/vendor/edit/vendor'),
                meta: {
                    activeMenu: "/account/home",
                    titleC: 'China Edit Vendor Info',
                    titleG: 'Global Edit Vendor Info',
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
                    titleC: 'China Search Result',
                    titleG: 'Global Search Result',
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
                    titleC: 'China Privacy Policy',
                    titleG: 'Global Privacy Policy',
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
                    titleC: 'China Contact Us',
                    titleG: 'Global Contact Us',
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
                    titleC: 'China About Us',
                    titleG: 'Global About Us',
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
                    titleC: 'China Industry News',
                    titleG: 'Global Industry News',
                }
            },
            {
                path: 'detail',
                name: 'industryDetail',
                component: () => import('@/views/industry/detail'),
                meta: {
                    titleC: 'China Industry News Detail',
                    titleG: 'Global Industry News Detail'
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
                    titleC: 'China Blog List',
                    titleG: 'Global Blog List',
                }
            },
            {
                path: 'detail',
                name: 'blogDetail',
                component: () => import('@/views/blog/detail'),
                meta: {
                    titleC: 'China Blog Detail',
                    titleG: 'Global Blog Detail',
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
                    titleC: 'China Paypal',
                    titleG: 'Global Paypal',
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
                    titleC: 'China Perks',
                    titleG: 'Global Perks',
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
                    titleC: 'China FAQ',
                    titleG: 'Global FAQ',
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
                    titleC: 'China Home',
                    titleG: 'Global Home'
                },
            },

        ]

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
