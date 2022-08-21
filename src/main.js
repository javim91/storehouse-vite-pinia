import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from "./App.vue";
import router from "./router";

import VueSweetalert2 from 'vue-sweetalert2';
import VueClipboard from 'vue3-clipboard'

import "bootstrap/dist/css/bootstrap.css"
import './assets/css/font-awesome-all.min.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/css/styles.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
    .use(pinia)
    .use(router)
    .use(VueSweetalert2)
    .use(VueClipboard, {
        autoSetContainer: true,
        appendToBody: true,
      })
    .mount("#app");

import "bootstrap/dist/js/bootstrap.js";