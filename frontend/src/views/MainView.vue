<script setup>
import CarCard from '@/components/CarCard.vue';
import { ref, inject, onMounted } from 'vue';
import { useFavoritesStore } from '@/stores/favorites'; // Импорт стора

const cars = ref([]);
const api = inject('$axios');
const favoritesStore = useFavoritesStore(); // Инициализация

const getAllCars = async () => {
    try {
        let response = await api.get('/getallcars');
        cars.value = response.data;
    } catch {
        console.log('ошибка');
    }
}

onMounted(() => {
    getAllCars();
});
</script>

<template>
  <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 mt-1 g-3">
    <!-- Ключ лучше делать уникальным без index, если _id уникален -->
    <div class="col" v-for="car in cars" :key="car._id">
      <CarCard :car-data="car"></CarCard>
    </div>
  </div>
</template>