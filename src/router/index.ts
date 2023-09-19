import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useAuthStore } from "@/stores/auth";
import { useGameStore } from "@/stores/game.store";

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
          meta: {
            secret: true,
          },
          children: [
            {
              path: "",
              name: "AdminPageUsers",
              component: () =>
                import("../views/admin/admin-page/AdminPageUsers.vue"),
            },
            {
              path: "categories",
              name: "AdminPageCategories",
              component: () =>
                import("../views/admin/admin-page/AdminPageCategories.vue"),
            },
            {
              path: "questions",
              name: "AdminPageQuestions",
              component: () =>
                import("../views/admin/admin-page/AdminPageQuestions.vue"),
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const gameStore = useGameStore();

  if (userStore.id === null && to.name === "MainRoom") {
    return { name: "MainRegistration" };
  } else if (!authStore.token && to.meta.secret && !authStore.isAdmin) {
    return { name: "AdminLogin" };
  } else if (authStore.token && to.name === "AdminLogin") {
    return { name: "AdminLayout" };
  } else if (
    gameStore.question === null &&
    userStore.room === "" &&
    to.name === "GamePage"
  ) {
    return { name: "HomePage" };
  }

  // @ts-ignore
  document.title = to.meta.title ?? "quizmystics";
});

export default router;
