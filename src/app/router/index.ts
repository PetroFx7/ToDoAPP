import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import authRoutes from "@/app/router/auth";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Main/index.vue"),
    meta: {
      title: "Auth",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound/index.vue"),
    meta: {
      title: "404 - Сторінку не знайдено",
    },
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL || "/"),
  routes,
});

export default router;
