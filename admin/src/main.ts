import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./styles/style.css";
import "./styles/normalize.css";
import "./styles/contant.less";
import App from "./App.vue";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
