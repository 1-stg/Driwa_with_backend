import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const api = axios.create({
    baseURL: 'http://localhost:3005/api', // Твой порт бэкенда
    withCredentials: true // ⚠️ КРИТИЧНО! Без этого куки не будут отправляться на бэкенд
});

// 1. Интерцептор запросов: автоматически добавляет токен в заголовки
api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
});

// 2. Интерцептор ответов: перехватывает 401 ошибку и обновляет токен
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const authStore = useAuthStore();

        // Если сервер ответил 401 и мы еще не пытались повторить этот запрос
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Идем на бэкенд за новым Access Token (кука refreshToken отправится автоматически)
                const response = await axios.post('http://localhost:3005/api/auth/refresh', {}, { withCredentials: true });
                const { accessToken } = response.data;

                authStore.setToken(accessToken); // Сохраняем новый токен в Pinia
                originalRequest.headers.Authorization = `Bearer ${accessToken}`; // Обновляем заголовок

                return api(originalRequest); // Повторяем изначальный запрос пользователя
            } catch (refreshError) {
                authStore.logout(); // Если refresh-кука тоже умерла — разлогиниваем
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
