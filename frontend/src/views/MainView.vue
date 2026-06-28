<script setup>
import CarCard from '@/components/CarCard.vue';
import { ref, inject, onMounted } from 'vue';
import { useCars } from '@/composables/useCars';
const { cars, isLoading, getAllCars } = useCars();
const api = inject('$axios');

onMounted(() => {
    getAllCars();
});
</script>

<template>
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 mt-1 g-3">
        <div class="col" v-for="car in cars" :key="car._id">
            <CarCard :car-data="car"></CarCard>
        </div>
    </div>
</template>