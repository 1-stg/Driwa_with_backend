<script setup>
import CarCard from '@/components/CarCard.vue';
import { ref, inject, onMounted } from 'vue';

let cars = ref([]);
let activeCars = ref([]);
const api = inject('$axios');

const getAllCars = async () => {
    try {
        let response = await api.get('/getAllCars');
        cars.value = response.data;
        activeCars.value = response.data;
    } catch {
        console.log('Ошибка');
    }
}

onMounted(
    getAllCars
)

</script>

<template>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-1 g-3">
        <div class="col" v-for="(car, index) in cars">
            <CarCard :car-data="car"></CarCard>
        </div>
    </div>
</template>

<style></style>