import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('./views/Main.vue')
    },
    {
        path: '/user-profile',
        name: 'user-profile',
        component: () => import('./views/UserProfile.vue')
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
