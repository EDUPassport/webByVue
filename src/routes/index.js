import layout from '../layout/index'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: layout,
        redirect: '/home',
        meta: {
            title:{
                '/zh-CN': '首页',
                '/en-US': 'Home Page'
            },
            icon: 'el-icon-s-home',
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title:{
                        '/zh-CN': '首页',
                        '/en-US': 'Home Page'
                    },
                    icon: 'home',
                },
            },
        ],
    },
    {
        path: '/login',
        name: '登录',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title:{
                '/zh-CN': '登录',
                '/en-US': 'Login'
            },
            hidden: true,
            hiddenTab: true,
        },
    },
    {
        path: '/register',
        name: '注册',
        component: () => import('@/views/register/index.vue'),
        meta: {
            title:{
                '/zh-CN': '注册',
                '/en-US': 'Register'
            },
            hidden: true,
            hiddenTab: true,
        },
    },
    {
        path: '/confirmemail',
        name: 'Confirm Email',
        component: () => import('@/views/register/email/confirmEmail'),
        meta: {
            title:{
                '/zh-CN': '注册',
                '/en-US': 'Register'
            },
            hidden: true,
            hiddenTab: true,
        },
    },
    {
        path: '/noFound',
        name: 'NoFound',
        component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
        meta: {
            title:{
                '/zh-CN': '404',
                '/en-US': '404'
            },
            hidden: true,
            hiddenTab: true,
        },
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
        meta: {
            title:{
                '/zh-CN': '未找到',
                '/en-US': 'NOT FOUND'
            },
            hidden: true,
            hiddenTab: true,
        }, },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router;
