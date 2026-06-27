<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

let route = useRoute();
let router = useRouter();
let modalFavorite = ref(false);


</script>

<template>
    <header class="mt-3 shadow rounded-4 p-3 header">
        <BModal v-model="modalFavorite" title="Hello, World!">
            Foobar?
        </BModal>
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
                <i class="bi bi-heart-fill link fs-4 rounded-2" @click="modalFavorite = !modalFavorite"></i>
                <i class="bi bi-person-circle link fs-4 rounded-2" @click="router.push('/user-profile')"></i>
            </div>
        </div>
    </header>
</template>

<style>
.link {
    padding: 5px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.1s ease-out,
        background-color 0.1s ease-out,
        color 0.1s ease-out;
    user-select: none;
    cursor: pointer;
}

.link:active {
    background-color: rgb(220, 220, 220);
    color: black;
    transform: scale(0.9);
}

/* Для поддержки иконки */
.link:active i {
    color: black;
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

.modal {
    left: 0;
}
</style>