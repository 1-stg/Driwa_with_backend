<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import CarCard from '@/components/CarCard.vue';
import api from '@/api/axios';
import { useCars } from '@/composables/useCars';
const { cars, getAllCars } = useCars();

const route = useRoute();
const car = ref({});
const currentPhotoIndex = ref(0);
getAllCars();

const goToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const switchPhoto = (index) => {
    currentPhotoIndex.value = index;
}

const nextPhoto = () => {
    if (!car.value.images) return;
    currentPhotoIndex.value = (currentPhotoIndex.value + 1) % car.value.images.length;
}

const prevPhoto = () => {
    if (!car.value.images) return;
    currentPhotoIndex.value = (currentPhotoIndex.value - 1 + car.value.images.length) % car.value.images.length;
}

const getCarById = async (carId) => {
    if (!carId) return;
    try {
        let response = await api.get('/carDetails', { params: { carId } });
        car.value = response.data;
    } catch (e) {
        console.error('Ошибка: ' + e);
    }
}

watch(
    () => route.params.id,
    (newId) => {
        getCarById(newId);
        goToTop();
    },
    { immediate: true }
);


</script>

<template>
    <div v-if="car._id" class="py-3">
        <div class="row g-3">
            <div class="col-12 col-lg-8">
                <div class="carPhotos rounded-4 shadow p-3 bg-white">

                    <div v-if="car.images && car.images.length > 0">
                        <div class="main-img-wrapper position-relative mb-3">
                            <img :src="'http://localhost:3005/carPhotos' + car.images[currentPhotoIndex]"
                                alt="Главное фото машины" class="img-fluid rounded-4 main-img w-100" />

                            <template v-if="car.images.length > 1">
                                <button class="nav-arrow prev-arrow" @click="prevPhoto" aria-label="Предыдущее фото">
                                    <i class="bi bi-chevron-left"></i>
                                </button>
                                <button class="nav-arrow next-arrow" @click="nextPhoto" aria-label="Следующее фото">
                                    <i class="bi bi-chevron-right"></i>
                                </button>
                            </template>
                        </div>

                        <div class="row g-2" v-if="car.images.length !== 1">
                            <div v-for="(photo, index) in car.images" :key="index" class="col-3 col-sm-2">
                                <img :src="'http://localhost:3005/carPhotos' + photo" alt="Миниатюра"
                                    class="img-fluid rounded-3 sub-img w-100"
                                    :class="{ 'active-thumb': currentPhotoIndex === index }"
                                    @click="switchPhoto(index)" />
                            </div>
                        </div>
                    </div>

                    <div v-else class="text-muted text-center p-5">Фото отсутствует</div>
                </div>
            </div>

            <div class="col-12 col-lg-4">
                <div class="p-3 bg-white rounded-4 shadow h-100">
                    <h5>Характеристики</h5>
                    <p>ID: {{ car._id }}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2">Загрузка данных...</p>
    </div>
    <h2 class="cl-bl fs-2 fw-bold mb-3">Смотрите также:</h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
        <div class="col" v-for="car in cars" :key="car._id">
            <CarCard :car-data="car"></CarCard>
        </div>
    </div>
</template>

<style scoped>
.main-img {
    height: 450px;
    object-fit: cover;
    transition: opacity 0.2s ease-in-out;
}

.nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.4);
    color: white;
    border: none;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
    user-select: none;
    z-index: 10;
}

.nav-arrow:hover {
    background: rgba(0, 0, 0, 0.7);
}

.nav-arrow:active {
    transform: translateY(-50%) scale(0.95);
}

.prev-arrow {
    left: 15px;
}

.next-arrow {
    right: 15px;
}

.sub-img {
    height: 80px;
    object-fit: cover;
    cursor: pointer;
    opacity: 0.6;
    transition: all 0.2s ease;
    border: 2px solid transparent;
}

.sub-img:hover {
    opacity: 0.9;
}

.sub-img.active-thumb {
    opacity: 1;
}

@media (max-width: 576px) {
    .main-img {
        height: 250px;
    }

    .sub-img {
        height: 60px;
    }

    .nav-arrow {
        display: none;
    }
}
</style>
