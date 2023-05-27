import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      name: "LoginLayout",
      component: () => import("../layouts/LoginLayout.vue"),
      children: [
        {
          path: "",
          name: "HomePage",
          component: () => import("../views/login/HomePage.vue"),
        },
        {
          path: "enter-room",
          name: "EnterRoom",
          component: () => import("../views/login/EnterRoom.vue"),
        },
        {
          path: "/:id",
          name: "MainRoom",
          component: () => import("../views/login/MainRoom.vue"),
        },
      ],
    },
  ],
});

export default router;
