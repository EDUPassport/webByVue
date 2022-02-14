import layout from '../layout/index'

import {createRouter, createWebHistory} from 'vue-router'
import {isPhone} from "@/utils";

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
                path: '/consulting/foodEducation',
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
                path: '/role/educator',
                name: 'roleEducator',
                component: () => import('@/views/role/educator'),
                meta: {
                    titleC: 'China Educator',
                    titleG: 'Global Educator',
                }
            },
            {
                path: '/role/business',
                name: 'roleBusiness',
                component: () => import('@/views/role/business'),
                meta: {
                    titleC: 'China Business',
                    titleG: 'Global Business',
                }
            },
            {
                path: '/role/vendor',
                name: 'roleVendor',
                component: () => import('@/views/role/vendor'),
                meta: {
                    titleC: 'China Vendor',
                    titleG: 'Global Vendor',
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
                path: '/educator/edit/basic',
                name: 'editEducatorBasic',
                component: () => import('@/views/profile/educator/edit/basic'),
                meta: {
                    titleC: 'China Edit Basic Info',
                    titleG: 'Global Edit Basic Info',
                }
            },
            {
                path: '/educator/edit/education',
                name: 'editEducatorEducation',
                component: () => import('@/views/profile/educator/edit/education'),
                meta: {
                    titleC: 'China Education',
                    titleG: 'Global Education',
                }
            },
            {
                path: '/educator/edit/work',
                name: 'editEducatorWork',
                component: () => import('@/views/profile/educator/edit/work'),
                meta: {
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
                path: '/business/edit/basic',
                name: 'editBusinessBasic',
                component: () => import('@/views/profile/business/edit/basic'),
                meta: {
                    titleC: 'China Edit Basic Info',
                    titleG: 'Global Edit Basic Info',
                }
            },
            {
                path: '/business/edit/businessInfo',
                name: 'editBusinessInfo',
                component: () => import('@/views/profile/business/edit/businessInfo'),
                meta: {
                    titleC: 'China Edit Business Information',
                    titleG: 'Global Edit Business Information',
                }
            },
            {
                path: '/business/edit/school',
                name: 'editSchoolInfo',
                component: () => import('@/views/profile/business/edit/school'),
                meta: {
                    titleC: 'China Edit School Information',
                    titleG: 'Global Edit School Information',
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
                path: '/vendor/edit/basic',
                name: 'editVendorBasic',
                component: () => import('@/views/profile/vendor/edit/basic'),
                meta: {
                    titleC: 'China Edit Basic Info',
                    titleG: 'Global Edit Basic Info',
                }
            },
            {
                path: '/vendor/edit/vendorInfo',
                name: 'editVendorInfo',
                component: () => import('@/views/profile/vendor/edit/vendorInfo'),
                meta: {
                    titleC: 'China Edit Company General Info',
                    titleG: 'Global Edit Company General Info',
                }
            },
            {
                path: '/vendor/edit/legalInfo',
                name: 'editLegalInfo',
                component: () => import('@/views/profile/vendor/edit/legalInfo'),
                meta: {
                    titleC: 'China Edit Company Legal Info',
                    titleG: 'Global Edit Company Legal Info',
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
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index'),
        meta: {
            titleC: 'China Login',
            titleG: 'Global Login',
        },
    },
    {
        path: '/login/linkedin',
        name: 'linkedinLogin',
        component: () => import('@/views/login/linkedin'),
        meta: {
            titleC: 'China Linkedin Login',
            titleG: 'Global Linkedin Login',
        }
    },
    {
        path: '/login/google',
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

    if (isPhone()) {
        let domain = ''
        if(envName === 'developmentCN'){
            domain = 'https://test.esl-passport.cn/'
        }

        if(envName === 'development'){
            domain = 'https://test.esl-passport.cn/'
        }
        if(envName === 'productionCN'){
            domain = 'https://esl-passport.cn/'
        }

        if(envName === 'production'){
            domain = 'https://esl-passport.cn/'
        }

        window.location.href = domain
    }
    next();
});

export default router;
