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
                component: () => import('@/views/home/index.vue'),
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
        ],
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
