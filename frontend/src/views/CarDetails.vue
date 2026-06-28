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

const getIconUrl = (name) => {
    return new URL(`/src/assets/svg/${name}`, import.meta.url).href;
};

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

            <div class="col-12 col-lg-4 cl-bl">
                <div class="p-4 bg-white rounded-4 shadow h-100">
                    <div class="mb-4">
                        <h1 class="fs-3 fw-bold mb-1 cl-bl">{{ car.title }}</h1>
                        <div class="text-secondary small mb-1">Год выпуска: {{ car.year }}</div>
                        <div class="fs-2 fw-bold cl-bl">
                            {{ car.price ? car.price.toLocaleString('ru-RU') + ' ₽' : 'Цена не указана' }}
                        </div>
                    </div>

                    <div class="d-flex flex-column gap-3">
                        <div class="row align-items-center g-2 pb-2 border-bottom">
                            <div class="col-2 text-center">
                                <img class="car-options-svg" :src="'http://localhost:3005/svg/engine.svg'"
                                    alt="Двигатель">
                            </div>
                            <div class="col-10">
                                <div class="text-secondary fs-7 lh-sm">Двигатель</div>
                                <div class="fs-6 fw-semibold cl-bl lh-sm">{{ car.engine }}</div>
                            </div>
                        </div>
                        <div class="row align-items-center g-2 pb-2 border-bottom">
                            <div class="col-2 text-center">
                                <img class="car-options-svg" :src="'http://localhost:3005/svg/gearbox.svg'" alt="КПП">
                            </div>
                            <div class="col-10">
                                <div class="text-secondary fs-7 lh-sm">Коробка передач</div>
                                <div class="fs-6 fw-semibold cl-bl lh-sm">{{ car.gearbox }}</div>
                            </div>
                        </div>
                        <div class="row align-items-center g-2 pb-2 border-bottom">
                            <div class="col-2 text-center">
                                <img class="car-options-svg" :src="'http://localhost:3005/svg/drive_shaft.svg'"
                                    alt="Привод">
                            </div>
                            <div class="col-10">
                                <div class="text-secondary fs-7 lh-sm">Привод</div>
                                <div class="fs-6 fw-semibold cl-bl lh-sm">{{ car.driveShaft }} привод</div>
                            </div>
                        </div>
                        <div class="row align-items-center g-2 pb-2 border-bottom">
                            <div class="col-2 text-center">
                                <img class="car-options-svg" :src="'http://localhost:3005/svg/mileage.svg'"
                                    alt="Пробег">
                            </div>
                            <div class="col-10">
                                <div class="text-secondary fs-7 lh-sm">Пробег</div>
                                <div class="fs-6 fw-semibold cl-bl lh-sm">
                                    {{ car.mileage ? car.mileage.toLocaleString('ru-RU') + ' км' : '0 км' }}
                                </div>
                            </div>
                        </div>
                        <div class="row align-items-center g-2 pb-2">
                            <div class="col-2 text-center">
                                <img class="car-options-svg" :src="'http://localhost:3005/svg/profile.svg'"
                                    alt="Владельцы">
                            </div>
                            <div class="col-10">
                                <div class="text-secondary fs-7 lh-sm">Владельцы</div>
                                <div class="fs-6 fw-semibold cl-bl lh-sm">{{ car.ownersCount }} по ПТС</div>
                            </div>
                        </div>

                    </div>
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
.car-options-svg {
    width: 24px;
    height: 24px;
    object-fit: contain;
    opacity: 0.8;
}

.main-img {
    height: 350px;
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
