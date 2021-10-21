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
                path:'/deals',
                name:'deals',
                component:()=>import('@/views/deals/index'),
                meta: {
                    title: 'Deals List'
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
