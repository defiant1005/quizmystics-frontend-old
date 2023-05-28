import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";

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
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (userStore.name.trim().length === 0 && to.name !== "MainRegistration") {
    return { name: "MainRegistration" };
  }
});

export default router;
