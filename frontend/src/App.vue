<template>
  <div class="container">
    <Header></Header>
    <main>
      <router-view />
    </main>
    <Footer></Footer>
  </div>

</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style>
html {
  scrollbar-gutter: stable;
}

:root {
  --bs-body-font-family: 'Montserrat Variable', sans-serif !important;
}

body {
  font-family: 'Montserrat Variable', sans-serif;
}

.card {
  border: none !important;
}

.card-body {
  padding: 0px !important;
}

.card-text {
  margin: 0px !important;
}
</style>