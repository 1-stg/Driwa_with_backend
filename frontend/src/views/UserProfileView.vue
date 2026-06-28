<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import CarCard from '@/components/CarCard.vue';
import api from '@/api/axios';

const authStore = useAuthStore();
const router = useRouter();
const userCars = ref([]);

const getUserCars = async () => {
    try {
        const user = authStore.user;
        let id = user._id;
        console.log(id);

        let response = await api.get('/user-cars', { params: { id } });
        userCars.value = response.data;
        console.log(userCars.value);
    } catch (e) {
        console.error('Ошибка: ' + e);
    }
};

getUserCars();

const error = ref('');
const isLoading = ref(false);

const userEmail = computed(() => authStore.user?.email || 'Гость');

const onLogout = async () => {
    try {
        error.value = '';
        isLoading.value = true;

        await authStore.logout();

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
        <div class="row g-4 mb-4">
            <div class="col-12 col-md-6">
                <div class="profile-card p-4 shadow rounded-4 bg-white h-100">
                    <div class="row row-cols-1 g-4 text-center">
                        <div class="col d-flex flex-column align-items-center justify-content-center">
                            <div class="avatar-placeholder mb-2">🚗</div>
                            <h2 class="fs-1">Личный кабинет</h2>
                            <p class="text-secondary small fs-5">Добро пожаловать в клуб DRIWA</p>
                        </div>

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

                        <div class="col" v-if="error">
                            <p class="error-msg text-danger small m-0">{{ error }}</p>
                        </div>

                        <div class="col">
                            <button @click="onLogout" class="w-100 btn btn-dark fs-6" :disabled="isLoading">
                                {{ isLoading ? 'Выход из системы...' : 'Выйти из аккаунта' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div
                    class="add-car p-4 shadow rounded-4 bg-white h-100 d-flex align-items-center justify-content-center">
                    <div class="link w-100 h-100 rounded-4 d-flex align-items-center justify-content-center flex-column">
                        <i class="bi bi-file-plus cl-bl big-text"></i>
                        <span class="fs-2 fw-bold cl-bl">Создать объявление</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="cars-section mt-4" v-if="userCars && userCars.length">
            <h3 class="mb-4 fs-3 fw-bold">Мои автомобили</h3>
            <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                <div class="col" v-for="car in userCars" :key="car._id">
                    <CarCard :car-data="car"></CarCard>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.user-page {
    min-height: 88dvh;
}

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

.status-badge-active {
    width: 10px;
    height: 10px;
    background-color: #198754;
    border-radius: 50%;
    display: inline-block;
}

.btn {
    border-radius: 15px;
    padding: 12px;
    transition: all 0.2s ease;
}

.btn-dark:hover {
    opacity: 0.9;
}
</style>
