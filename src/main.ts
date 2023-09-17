import "./scss/main.scss";
import "bootstrap/dist/css/bootstrap.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueCookies from "vue3-cookies";

//@ts-ignore
import VueClipboard from "vue3-clipboard";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueCookies);

app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
});
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
