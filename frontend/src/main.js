import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import api from './api/axios';

import "@fontsource-variable/montserrat";;
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import './assets/main.css';

import { createBootstrap } from 'bootstrap-vue-next';
import * as Components from 'bootstrap-vue-next';

const app = createApp(App);

app.use(router);
app.use(createBootstrap());
app.provide('$axios', api);

Object.entries(Components).forEach(([name, component]) => {
    if (name.startsWith('B') && component) {
        app.component(name, component)
    }
});

app.mount('#app');