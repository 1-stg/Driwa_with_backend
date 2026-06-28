<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const error = ref('');
const isLoading = ref(false);

// Безопасное получение email текущего пользователя
const userEmail = computed(() => authStore.user?.email || 'Гость');

const onLogout = async () => {
    try {
        error.value = '';
        isLoading.value = true;

        await authStore.logout(); // Нам не нужно передавать email и password при выходе

        router.push({ name: 'main' });
    } catch (err) {
        error.value = err.response?.data?.message || 'Ошибка при выходе из системы';
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="user-page mt-4">
        <!-- Карточка профиля, полностью повторяющая стиль формы авторизации -->
        <div class="profile-card col-12 col-md-6 p-4 shadow rounded-4 bg-white">
            <div class="row row-cols-1 g-4 text-center">
                <div class="col d-flex flex-column align-items-center justify-content-center">
                    <div class="avatar-placeholder mb-2">
                        🚗
                    </div>
                    <h2 class="fs-1">Личный кабинет</h2>
                    <p class="text-secondary small fs-5">Добро пожаловать в клуб DRIWA</p>
                </div>

                <!-- Блок с данными пользователя -->
                <div class="col text-start">
                    <div class="info-box w-100">
                        <span class="info-label fs-8">Ваш Email</span>
                        <div class="info-value fs-6">{{ userEmail }}</div>
                    </div>
                </div>

                <div class="col text-start">
                    <div class="info-box w-100">
                        <span class="info-label fs-8">Статус аккаунта</span>
                        <div class="info-value d-flex align-items-center fs-6">
                            <span class="status-badge-active me-2"></span> Активен
                        </div>
                    </div>
                </div>

                <!-- Вывод ошибок, если они возникнут при выходе -->
                <div class="col" v-if="error">
                    <p class="error-msg text-danger small m-0">{{ error }}</p>
                </div>

                <!-- Кнопка выхода в твоем фирменном стиле btn-dark -->
                <div class="col">
                    <button @click="onLogout" class="w-100 btn btn-dark fs-6" :disabled="isLoading">
                        {{ isLoading ? 'Выход из системы...' : 'Выйти из аккаунта' }}
                    </button>
                </div>

            </div>
        </div>
        <div class="col-12 col-md-6 p-4"></div>
        <div class=""></div>
    </div>
</template>

<style scoped>
/* Выравнивание карточки по центру, точно как на auth-page */
.user-page {
    min-height: 88dvh;
    /* Легкий серый фон для контраста с белой карточкой */
}

/* Имитация инпутов для красивого отображения данных */
.info-box {
    padding: 12px 18px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 0 10px 0.2px rgba(0, 0, 0, 0.1);
}

.info-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #8c8c8c;
    display: block;
    margin-bottom: 2px;
}

.info-value {
    font-weight: 500;
    color: #212529;
    font-size: 16px;
}

/* Круглая иконка профиля */
.avatar-placeholder {
    width: 70px;
    height: 70px;
    background-color: #f1f3f5;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    box-shadow: 0 0 10px 0.2px rgba(0, 0, 0, 0.05);
}

/* Зеленый индикатор статуса */
.status-badge-active {
    width: 10px;
    height: 10px;
    background-color: #198754;
    border-radius: 50%;
    display: inline-block;
}

/* Кнопка скругления из твоего глобального стиля */
.btn {
    border-radius: 15px;
    padding: 12px;
    transition: all 0.2s ease;
}

.btn-dark:hover {
    opacity: 0.9;
}
</style>
