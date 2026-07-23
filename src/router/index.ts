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
          component: () => import("@/pages/auth/LoginPage.vue"),
        },
      ],
    },
  ],
});

export default router;
