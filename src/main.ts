import "./scss/main.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueCookies from "vue3-cookies";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueCookies);

app.mount("#app");
