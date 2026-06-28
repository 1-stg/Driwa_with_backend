import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('./views/MainView.vue')
    },
    {
        path: '/user-profile',
        name: 'user-profile',
        component: () => import('./views/UserProfileView.vue')
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
