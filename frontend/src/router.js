import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth.js';

const router = createRouter({
    history: createWebHistory(import.meta.env.ENV_BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import('./views/MainView.vue'),
        },
        {
            path: '/car-details/:id',
            name: 'car-details',
            component: () => import('./views/CarDetails.vue'),
            props: true,
        },
        {
            path: '/user-profile',
            name: 'user-profile',
            component: () => import('./views/UserProfileView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/RegisterView.vue'),
            meta: { guestOnly: true },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
            meta: { guestOnly: true }
        },
    ]
});

router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    if (!authStore.isInitialized) {
        await authStore.checkAuth();
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return { name: 'login', query: { redirect: to.fullPath } };
    }

    if (to.meta.guestOnly && authStore.isAuthenticated) {
        return { name: 'user-profile' };
    }

});

export default router;
