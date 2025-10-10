import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "@/views/HomePage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home - Vue 3 Starter",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
