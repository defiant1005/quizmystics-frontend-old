import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useCookies } from "vue3-cookies";
import { useAuthStore } from "@/stores/auth";

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
          name: "MainRegistration",
          component: () => import("../views/login/MainRegistration.vue"),
        },
        {
          path: "/home",
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
    {
      path: "/game",
      name: "GameLayout",
      component: () => import("../layouts/GameLayout.vue"),
      children: [
        {
          path: "room/:room",
          name: "GamePage",
          component: () => import("../views/game/GamePage.vue"),
        },
      ],
    },
    {
      path: "/admin",
      name: "AdminLayout",
      component: () => import("../layouts/AdminLayout.vue"),
      children: [
        {
          path: "login",
          name: "AdminLogin",
          component: () => import("../views/admin/AdminLogin.vue"),
        },
        {
          path: "registration",
          name: "AdminRegister",
          component: () => import("../views/admin/AdminRegister.vue"),
        },
        {
          path: "",
          name: "AdminPage",
          component: () => import("../views/admin/AdminPage.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const authStore = useAuthStore();

  if (userStore.id === null && to.name === "MainRoom") {
    return { name: "HomePage" };
  } else if (!authStore.token && to.name === "AdminPage") {
    return { name: "HomePage" };
  }
});

export default router;
