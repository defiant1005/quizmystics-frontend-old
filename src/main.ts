import "./scss/main.scss";
import "bootstrap/dist/css/bootstrap.css";

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

import "bootstrap/dist/js/bootstrap.js";
