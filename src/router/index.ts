import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/Layout.vue'
import HomeLayout from '@/layout/HomeLayout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: HomeLayout,
                children: [
                    {
                        path: '',
                        name: 'Home',
                        component: () => import('@/views/Home.vue'),
                    },
                    {
                        path: '/changelog',
                        name: 'Changelog',
                        component: () => import('@/views/Changelog.vue'),
                    },
                    {
                        path: '/about',
                        name: 'About',
                        component: () => import('@/views/About.vue'),
                    },
                ],
            },
        ],
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router