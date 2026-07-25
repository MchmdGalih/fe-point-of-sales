import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/auth",
      component: () => import("@/layouts/AuthLayout.vue"),
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/pages/auth/LoginPage.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/pages/auth/RegisterPage.vue"),
        },
      ],
    },
  ],
});

export default router;
