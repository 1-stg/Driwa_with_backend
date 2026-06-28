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
console.log(authStore.user);


const onLogout = async () => {
    try {
        error.value = true;
        isLoading.value = true;

        await authStore.logout(email.value, password.value);

        router.push({ name: 'main' });
    } catch (err) {
        error.value = err.response?.data?.message || 'Ошибка при регистрации';
    } finally {
        isLoading.value = false
    }
}

</script>
<template>
    
    <button class="btn btn-dark" @click="onLogout()">Выход</button>
</template>
<style>

</style>