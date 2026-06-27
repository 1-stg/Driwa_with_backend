<script>
</script>
<template>
    <footer class="rounded-top-4 shadow bg-white mt-3 p-3">
        <div class="row">
            <div class="col-6 d-flex justify-content-center align-items-center gap-2">
                <a href="" class="d-flex text-dark justify-content-center fs-1 align-items-center"><i class="bi bi-telegram"></i></a>
                <a href="" class="d-flex text-dark justify-content-center fs-1 align-items-center"><i class="bi bi-h-circle-fill"></i></a>
                <a href="" class="d-flex text-dark justify-content-center fs-1 align-items-center"><i class="bi bi-hypnotize"></i></a>
            </div>
            <div class="col-6 d-flex justify-content-center align-items-center">
                <h2 @click="router.push('/')"
                    class="fs-4 gap-2 m-0 d-flex align-items-center justify-content-start fw-bold">
                    <div class="link rounded-3">
                        <i class="bi bi-car-front-fill fs-4 me-1"></i>DRIWA
                    </div>
                </h2>
            </div>
        </div>
    </footer>
</template>

<style>
footer {
    z-index: 100000;
}
</style>