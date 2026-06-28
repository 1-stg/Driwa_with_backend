<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
    carData: Object,
})

const favoritesStore = inject('favoritesStore');

let engineData = props.carData.engine.split(', ');
const isCarInFavorite = computed(() => {
    return favoritesStore.isFavorite(props.carData._id);
});

const formatData = (data) => {
    let formatedPrice = data.toLocaleString('fr-FR');
    return formatedPrice;
}

const toggleFavorite = (car) => {
    favoritesStore.toggleFavorite(car);
}
</script>

<template>
    <BCard class="rounded-4 overflow-hidden shadow h-100 p-0" img-alt="Image" img-top tag="article">
        <BCarousel v-if="carData.images.length === 1">
            <BCarouselSlide class="rounded-4" v-for="(img, index) in carData.images" :key="index"
                :img-src="'http://localhost:3005/carPhotos' + carData.images[index]" />
        </BCarousel>
        <BCarousel v-else controls>
            <BCarouselSlide class="rounded-4" v-for="(img, index) in carData.images" :key="index"
                :img-src="'http://localhost:3005/carPhotos' + carData.images[index]" />
        </BCarousel>
        <BCardBody class="p-3">
            <BCardTitle class="pt-2 fs-4 mb-0 fw-bold">{{ formatData(carData.price) }} ₽</BCardTitle>
            <div class="d-flex justify-content-start align-items-center gap-2">
                <BCardText class="fs-8 fw-600 mb-0">{{ formatData(carData.mileage) }} км</BCardText>
                <span class="fw-bold mb-1">·</span>
                <div class="d-flex justify-content-start align-items-center gap-2" v-for="(value, idx) in engineData"
                    :key="idx">
                    <BCardText class="fs-8 fw-600 mb-0">{{ value }}</BCardText>
                    <span class="fw-bold mb-1">·</span>
                </div>
                <BCardText class="fs-8 fw-600 mb-0">{{ carData.driveShaft }}</BCardText>
            </div>
            <BCardText class="fs-6 fw-500 text-secondary mb-3">
                {{ carData.title }}, {{ carData.year }}
            </BCardText>
            <div class="row g-1 h-100">
                <div class="col-10">
                    <BButton class="h-100 w-100 rounded-start-4 rounded-end-0" variant="dark">Подробнее</BButton>
                </div>
                <div class="col-2">
                    <BButton @click="toggleFavorite(carData)"
                        class="h-100 w-100 rounded-end-4 rounded-start-0 d-flex align-items-center justify-content-center"
                        variant="dark">
                        <i class="bi bi-heart-fill me-1 mt-1 fs-4" v-if="isCarInFavorite"></i>
                        <i class="bi bi-heart me-1 mt-1 fs-4" v-else></i>
                    </BButton>
                </div>
            </div>
        </BCardBody>
    </BCard>
</template>

<style>
.b-img {
    object-fit: cover;
    height: 220px;
}
</style>