import layout from '../layout/index'

import {createRouter, createWebHistory} from 'vue-router'
import {isPhone} from "@/utils";

const routes = [
    {
        path: '/',
        component: layout,
        redirect: '/home',
        meta: {
            title: 'Home'
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index'),
                meta: {
                    title: 'Home'
                },
            },
            {
                path: '/jobs',
                name: 'jobs',
                component: () => import('@/views/jobs/list'),
                meta: {
                    title: 'Jobs Lists'
                }
            },
            {
                path:'/jobs/detail',
                name:'jobsDetail',
                component:()=>import('@/views/jobs/detail'),
                meta: {
                    title: 'Jobs Detail'
                }
            },
            {
                path:'/jobs/post',
                name:'postJob',
                component:()=>import('@/views/jobs/post/post'),
                meta: {
                    title: 'Post a Job'
                }
            },
            {
                path:'/jobs/myJobs',
                name:'myJobs',
                component:()=>import('@/views/jobs/my/jobs'),
                meta: {
                    title: 'My Posted Jobs'
                }
            },
            {
                path:'/deals',
                name:'deals',
                component:()=>import('@/views/deals/index'),
                meta: {
                    title: 'Deals List'
                }
            },
            {
                path:'/deals/offer',
                name:'dealsOffer',
                component:()=>import('@/views/deals/offer/offer'),
                meta: {
                    title: 'Offer a Deal'
                }
            },
            {
                path:'/deals/myDeals',
                name:'myDeals',
                component:()=>import('@/views/deals/my/deals'),
                meta: {
                    title: 'My Deals'
                }
            },
            {
                path:'/deals/detail',
                name:'dealDetail',
                component:()=>import('@/views/deals/detail'),
                meta: {
                    title: 'Deal Detail'
                }
            },
            {
                path:'/overview',
                name:'overview',
                component:()=>import('@/views/profile/overview'),
                meta: {
                    title: 'Overview'
                }
            },
            {
                path:'/favorites',
                name:'favorites',
                component:()=>import('@/views/me/favorites'),
                meta: {
                    title: 'My Favorites'
                }
            },
            {
                path:'/role/educator',
                name:'roleEducator',
                component:()=>import('@/views/role/educator'),
                meta: {
                    title: 'Educator'
                }
            },
            {
                path:'/role/business',
                name:'roleBusiness',
                component:()=>import('@/views/role/business'),
                meta: {
                    title: 'Business'
                }
            },
            {
                path:'/role/vendor',
                name:'roleVendor',
                component:()=>import('@/views/role/vendor'),
                meta: {
                    title: 'Vendor'
                }
            },
            {
                path:'/educator/profile',
                name:'educatorProfile',
                component:()=>import('@/views/profile/educator/profile'),
                meta: {
                    title: 'My Profile'
                }
            },
            {
                path:'/educator/edit/basic',
                name:'editEducatorBasic',
                component:()=>import('@/views/profile/educator/edit/basic'),
                meta: {
                    title: 'Edit Basic Info'
                }
            },
            {
                path:'/educator/edit/education',
                name:'editEducatorEducation',
                component:()=>import('@/views/profile/educator/edit/education'),
                meta: {
                    title: 'Education'
                }
            },
            {
                path:'/educator/edit/work',
                name:'editEducatorWork',
                component:()=>import('@/views/profile/educator/edit/work'),
                meta: {
                    title: 'Work Experience'
                }
            },
            {
                path:'/business/profile',
                name:'businessProfile',
                component:()=>import('@/views/profile/business/profile'),
                meta: {
                    title: 'My Profile'
                }
            },
            {
                path:'/business/edit/basic',
                name:'editBusinessBasic',
                component:()=>import('@/views/profile/business/edit/basic'),
                meta: {
                    title: 'Edit Basic Info'
                }
            },
            {
                path:'/business/edit/businessInfo',
                name:'editBusinessInfo',
                component:()=>import('@/views/profile/business/edit/businessInfo'),
                meta: {
                    title: 'Edit Business Information'
                }
            },
            {
                path:'/business/edit/school',
                name:'editSchoolInfo',
                component:()=>import('@/views/profile/business/edit/school'),
                meta: {
                    title: 'Edit School Information'
                }
            },
            {
                path:'/vendor/profile',
                name:'vendorProfile',
                component:()=>import('@/views/profile/vendor/profile'),
                meta: {
                    title: 'My Profile'
                }
            },
            {
                path:'/vendor/edit/basic',
                name:'editVendorBasic',
                component:()=>import('@/views/profile/vendor/edit/basic'),
                meta: {
                    title: 'Edit Basic Info'
                }
            },
            {
                path:'/vendor/edit/vendorInfo',
                name:'editVendorInfo',
                component:()=>import('@/views/profile/vendor/edit/vendorInfo'),
                meta: {
                    title: 'Edit Company General Info'
                }
            },
            {
                path:'/vendor/edit/legalInfo',
                name:'editLegalInfo',
                component:()=>import('@/views/profile/vendor/edit/legalInfo'),
                meta: {
                    title: 'Edit Company Legal Info'
                }
            }

        ],
    },
    {
        path:'/comeSoon',
        name:'comeSoon',
        component:()=>import('@/views/comeSoon'),
        meta: {
            title: 'Coming Soon'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: 'Login'
        },
    },

    {
        path: '/noFound',
        name: 'noFound',
        component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
        meta: {
            title: 'NOT FOUND'
        },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'noFound',
        component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
        meta: {
            title: 'NOT FOUND'
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const defaultTitle = 'Home';
router.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : defaultTitle;
    if(isPhone()){
        window.location.href = 'https://esl-passport.cn/'
    }
    next();
});

export default router;
