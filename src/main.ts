import { createApp } from "vue";
import { createPinia } from "pinia";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "@/assets/styles/main.css";
import { piniaPersistedState } from "./stores/plugin/persist.ts";
import router from "@/router";
import App from "@/App.vue";
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistedState);

app.use(Vue3Toastify, {
  autoClose: 3000,
  newestOnTop: true,
} as ToastContainerOptions);
app.use(pinia);
app.use(router);
app.mount("#app");
