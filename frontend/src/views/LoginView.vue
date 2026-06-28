<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const onLogin = async () => {
    try {
        error.value = true;
        isLoading.value = true;
        
        await authStore.login(email.value, password.value);

        router.push({ name: 'user-profile' });
    } catch (err) {
        error.value = err.response?.data?.message || 'Ошибка при регистрации';
    } finally {
        isLoading.value = false
    }
}

</script>
<template>
    <div class="auth-page">
        <form @submit.prevent="onLogin" class="col-10 col-md-8 col-lg-6 col-xl-5 p-3 shadow rounded-4">
            <div class="row row-cols-1 g-3 text-center">
                <div class="col d-flex align-items-center justify-content-center">
                    <h2>Авторизация</h2>
                </div>
                <div class="col"><input class="w-100 " v-model="email" type="email" placeholder="Email" required />
                </div>
                <div class="col"><input class="w-100 " v-model="password" type="password" placeholder="Пароль"
                        required /></div>
                <div class="col">
                    <p v-if="error && error !== true" class="error-msg">{{ error }}</p>
                </div>
                <div class="col"><button type="submit" class="w-100 btn btn-dark mb-1" :disabled="isLoading">
                        {{ isLoading ? 'Аутентификация...' : 'Войти' }}
                    </button></div>
                <div class="col">
                    <p class="switch-route">
                        Впервые на DRIWA?
                        <router-link to="/register">Регистрация</router-link>
                    </p>
                </div>
            </div>
        </form>
    </div>
</template>

<style>
.auth-page {
    height: 88dvh;
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    padding: 10px;
    border-radius: 15px;
    border: none;
    box-shadow: 0 0 10px 0.2px rgba(0, 0, 0, 0.1);

    &:hover {
        transition: all 0.2s ease-in;
        outline: 2px solid grey;
    }

    &:valid {
        outline: 2px solid black;
    }
}

.btn {
    border-radius: 15px;
    padding: 10px;
}
</style>