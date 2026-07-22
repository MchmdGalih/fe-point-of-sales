import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/auth/LoginPage.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
  ],
});

export default router;
