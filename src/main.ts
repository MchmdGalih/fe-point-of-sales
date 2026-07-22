import { createApp } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/main.css";
import { piniaPersistedState } from "./stores/plugin/persist.ts";
import router from "./router";
import App from "./App.vue";
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistedState);

app.use(pinia);
app.use(router);
app.mount("#app");
