<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CarCard from '@/components/CarCard.vue';
import { useFavoritesStore } from '@/stores/favorites';

const route = useRoute();
const router = useRouter();

const modalFavorite = ref(false);
const modalChat = ref(false);

const favoritesStore = useFavoritesStore();

const toggleModal = (modalName) => {
    if (modalName === 'favorite') {
        // УБРАНО: favoritesStore.loadFavorites(), так как данные теперь
        // автоматически загружаются из localStorage при инициализации стора
        modalFavorite.value = !modalFavorite.value;
    } else if (modalName === 'chat') {
        modalChat.value = !modalChat.value;
    }
}

const refreshFavorites = () => {
    favoritesStore.refresh();
}
</script>

<template>
    <header class="mt-3 shadow rounded-4 p-3 header cl-bl">
        <div class="modalBackground" v-if="modalFavorite" @click="toggleModal('favorite')">
            <div class="modalUn shadow col-12 col-md-6 col-lg-5" @click.stop>
                <div class="modalHeader p-2 ps-3 pe-3 d-flex justify-content-between align-items-center">
                    <h3 class="fw-800 fs-2">Избранное</h3>
                    <div><i class="bi bi-x-square fs-1 fw-800" role="button" @click="toggleModal('favorite')"></i>
                    </div>
                </div>
                <div class="modalBody p-3">
                    <div class="row row-cols-1 g-3">
                        <!-- ИСПРАВЛЕНО: убрали .state.cars -> стало favoritesStore.cars -->
                        <div class="col" v-for="car in favoritesStore.cars" :key="car._id">
                            <CarCard :car-data="car"></CarCard>
                        </div>
                    </div>
                    <!-- ИСПРАВЛЕНО: убрали .state.cars -> стало favoritesStore.cars -->
                    <div v-if="favoritesStore.cars.length === 0" class="text-center py-5 mt-5">
                        <i class="bi bi-heart text-secondary big-text"></i>
                        <p class="text-secondary">Нет избранных автомобилей</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row g-0">
            <div class="col-6">
                <h2 @click="router.push('/')"
                    class="fs-4 gap-2 m-0 d-flex align-items-center justify-content-start fw-bold">
                    <div class="link rounded-3">
                        <i class="bi bi-car-front-fill fs-4 me-1"></i>DRIWA
                    </div>
                </h2>
            </div>
            <div class="col-6 gap-2 m-0 d-flex align-items-center justify-content-end fw-bold">
                <i class="bi bi-chat-left-dots-fill link fs-4 rounded-2"></i>
                <i class="bi bi-heart-fill link fs-4 rounded-2" @click="toggleModal('favorite')"></i>
                <i class="bi bi-person-circle link fs-4 rounded-2" @click="router.push('/user-profile')"></i>
            </div>
        </div>
    </header>
</template>

<style>
/* Стили остаются без изменений */
.link {
    padding: 5px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s ease-out, background-color 0.1s ease-out, color 0.1s ease-out;
    user-select: none;
    cursor: pointer;
}

.link:active {
    background-color: rgb(220, 220, 220);
    color: black;
    transform: scale(0.9);
}

.link:active i {
    color: black;
}

.big-text {
    font-size: 100px;
}

.link i {
    margin-top: 2px;
}

@media (max-width: 576px) {
    header.container {
        margin-top: 0px !important;
        border-radius: 0px !important;
        padding-left: 10px !important;
        padding-right: 10px !important;
    }
}

.modalBackground {
    transition: all 0.2s ease-in;
    position: fixed;
    right: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100000;
}

.modalUn {
    position: fixed;
    right: 0;
    top: 0;
    height: 100dvh;
    background-color: white;
    display: flex;
    flex-direction: column;
}

.modalHeader {
    width: 100%;
    border-bottom: 2px solid black;
    flex-shrink: 0;
}

.modalBody {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
}
</style>
