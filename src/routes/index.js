import layout from "@/layout";
// import appLayout from "@/layout/appLayout";
import {createRouter, createWebHistory} from 'vue-router'
import appLayout from "@/layout/appLayout";
// import {isPhone} from "@/utils";
import chatHome from '@/views/chat/chatHome'

const routes = [

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
                name: 'zohoPostEvent',
                component: () => import('@/views/events/postEvent'),
                meta: {
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
                    requireAuth: true
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
                    requireAuth: true
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
                    requireAuth: true
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
                    requireAuth: true
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
                    requireAuth: true
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
                    requireAuth: true
                }
            },

        ]

    },
    {
        path: '/jobs',
        component: layout,
        children: [
            {
                path: '',
                name: 'jobs',
                component: () => import('@/views/jobs/list'),
                meta: {
                    titleC: 'Jobs Lists',
                    titleG: 'Jobs Lists'
                },
                children: [
                    {
                        path: '/jobs',
                        name: 'jobsList',
                        component: () => import('@/views/jobs/empty.vue'),
                        meta: {
                            titleC: 'Jobs Lists',
                            titleG: 'Jobs Lists'
                        }
                    },
                    {
                        path: 'detail/:id/:page',
                        name: 'jobsDetail',
                        component: () => import('@/views/jobs/detailComponent.vue'),
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


                ]
            },
            {
                path: 'post',
                name: 'postJob',
                component: () => import('@/views/jobs/post/post'),
                meta: {
                    activeMenu: '/account/home',
                    titleC: 'Post a Job',
                    titleG: 'Post a Job',
                    requireAuth: true
                }
            },
            {
                path: 'myJobs',
                name: 'myJobs',
                component: () => import('@/views/jobs/my/jobs'),
                meta: {
                    titleC: 'My Posted Jobs',
                    titleG: 'My Posted Jobs',
                    requireAuth: true
                }
            },
            {
                path: 'applications',
                name: 'jobApplications',
                component: () => import('@/views/jobs/applications'),
                meta: {
                    titleC: 'Applications',
                    titleG: 'Applications',
                    requireAuth: true
                }
            },
            {
                path: 'home',
                name: 'jobsHome',
                component: () => import('@/views/jobs/home'),
                meta: {
                    titleC: 'jobs and applications',
                    titleG: 'jobs and applications',
                    requireAuth: true
                }
            }

        ]

    },
    {
        path: '/chat',
        name: 'chat',
        component: layout,
        redirect: '/chat/messages',
        children: [
            {
                path: '',
                name: 'chatHome',
                component: chatHome,
                children: [
                    {
                        path: 'messages',
                        name: 'chatMessages',
                        component: () => import('@/views/chat/Conversations'),
                        meta: {
                            titleC: 'Chat Messages',
                            titleG: 'Chat Messages',
                            requireAuth: true
                        },
                        children: [
                            {
                                path: 'privatechat/:id',
                                component: () => import('@/views/chat/PrivateChat'),
                                activeMenu:'/chat/messages',
                                requireAuth: true
                            },
                            {
                                path: 'groupchat/:id',
                                component: () => import('@/views/chat/GroupChat'),
                                activeMenu:'/chat/messages',
                                requireAuth: true
                            },
                        ],
                    },
                    {
                        path: 'contacts',
                        component: () => import('@/views/chat/Contacts'),
                        activeMenu:'/chat/messages',
                        requireAuth: true
                    },
                    {
                        path: 'history',
                        component: () => import('@/views/chat/History'),
                        activeMenu:'/chat/messages',
                        requireAuth: true
                    },

                ]
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
                    titleG: 'My Favorites',
                    requireAuth: true
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
                    requireAuth: true
                }
            },
            {
                path: 'ads/platform',
                name: 'myAdsPlatform',
                component: () => import('@/views/me/ads/platform'),
                meta: {
                    titleC: 'Platform',
                    titleG: 'Platform',
                    requireAuth: true
                }
            },
            {
                path: 'ads/identity',
                name: 'myAdsIdentity',
                component: () => import('@/views/me/ads/identity'),
                meta: {
                    titleC: 'Target Audience',
                    titleG: 'Target Audience',
                    requireAuth: true
                }
            },
            {
                path: 'ads/list',
                name: 'myAdsList',
                component: () => import('@/views/me/ads/list'),
                meta: {
                    titleC: 'Ads List',
                    titleG: 'Ads List',
                    requireAuth: true
                }
            },
            {
                path: 'ads/detail',
                name: 'myAdsDetail',
                component: () => import('@/views/me/ads/detail'),
                meta: {
                    titleC: 'Ads Detail',
                    titleG: 'Ads Detail',
                    requireAuth: true
                }
            },
            {
                path: 'ads/redeem',
                name: 'myAdsRedeem',
                component: () => import('@/views/me/ads/redeem'),
                meta: {
                    titleC: 'Ads Redeem',
                    titleG: 'Ads Redeem',
                    requireAuth: true
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
                    requireAuth: true
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
                    requireAuth: true
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
                    requireAuth: true
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
                    requireAuth: true
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
                    requireAuth: true
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
                    requireAuth: true
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
                    requireAuth: true
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
        path: '/pricing',
        component: layout,
        children: [
            {
                path: '/pricing',
                name: 'edupassportPricing',
                component: () => import('@/views/services/pricing'),
                meta: {
                    titleC: 'Pricing',
                    titleG: 'Pricing',
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
                    titleC: 'Educational Businesses - EDU Passport',
                    titleG: 'Global Education Hub - EDU Passport'
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

    if(to.path === '/jobs/detail'){

        let nPath = '/jobs/detail/' + to.query.id + '/' + 1
        next({path:nPath})

    }

    //判断该路由是否需要登录权限
    if (to.matched.some(record => record.meta.requireAuth)) {
        const token = localStorage.getItem('token')
        if (token) {
            next()
        } else {
            next({path: '/login'})
        }
    } else {
        next()
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

    // next();

})

export default router;