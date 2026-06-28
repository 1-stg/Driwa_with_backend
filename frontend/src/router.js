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
            path: '/user-profile',
            name: 'user-profile',
            component: () => import('./views/UserProfileView.vue'),
            meta: { requiresAuth: true } // Страница только для вошедших
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/RegisterView.vue'),
            meta: { guestOnly: true }, // Страница только для гостей
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
            meta: { guestOnly: true } // Страница только для гостей
        },
    ]
});

router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    // 1. Инициализируем проверку сессии (Silent Login по куке) при первом открытии сайта
    if (!authStore.isInitialized) {
        await authStore.checkAuth();
    }

    // 2. ИСПРАВЛЕНО: Если страница требует авторизации, а пользователь НЕ залогинен (!authStore.isAuthenticated)
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Перекидываем на логин и запоминаем, куда пользователь шел (через query параметр redirect)
        return { name: 'login', query: { redirect: to.fullPath } };
    }

    // 3. Если страница только для гостей (логин/регистрация), а пользователь УЖЕ залогинен
    if (to.meta.guestOnly && authStore.isAuthenticated) {
        return { name: 'user-profile' }; // Выкидываем его в профиль
    }

});

export default router;
