import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/api/axios';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(null); // Токен живет только в оперативной памяти (исчезнет при F5)
    const isInitialized = ref(false); // Проверяли ли мы сессию при старте?

    const isAuthenticated = computed(() => !!token.value);

    function setToken(newToken) {
        token.value = newToken;
    }

    // Регистрация
    async function register(email, password) {
        await api.post('/auth/register', { email, password });
    }

    // Логин
    async function login(email, password) {
        const response = await api.post('/auth/login', { email, password });
        token.value = response.data.accessToken;
        user.value = response.data.user;
    }

    // Проверка авторизации при обновлении страницы (F5)
    async function checkAuth() {
        try {
            const response = await api.post('/auth/refresh');
            token.value = response.data.accessToken;
            user.value = response.data.user;
        } catch (e) {
            logout();
        } finally {
            isInitialized.value = true;
        }
    }

    // Выход
    async function logout() {
        token.value = null;
        user.value = null;
        try {
            await api.post('/auth/logout');
        } catch (e) { }
    }

    return { user, token, isAuthenticated, isInitialized, setToken, register, login, checkAuth, logout };
});
