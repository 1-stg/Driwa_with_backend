<script setup>
import CarCard from '@/components/CarCard.vue';
import { ref, inject, onMounted, watch } from 'vue';

let cars = ref([]);
const api = inject('$axios');
const favoritesStore = inject('favoritesStore');

watch(() => favoritesStore.state.cars, () => {
    cars.value = [...cars.value];
}, { deep: true });

const getAllCars = async () => {
    try {
        let response = await api.get('/getAllCars');
        cars.value = response.data;
    } catch {
        console.log('Ошибка');
    }
}

onMounted(() => {
    getAllCars();
});
</script>

<template>
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 mt-1 g-3">
        <div class="col" v-for="(car, index) in cars" :key="car._id + index">
            <CarCard :car-data="car"></CarCard>
        </div>
    </div>
</template>