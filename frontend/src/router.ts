// The routes for the application. Taskly only has one route!

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
