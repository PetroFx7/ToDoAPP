import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import authRoutes from "@/app/router/auth";
import { authGuard } from "@/app/router/guards";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Main/index.vue"),
    meta: {

      title: "Home - Task manager",
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
  {
    path: "/lists",
    name: "Lists",
    component: () => import("@/pages/Lists/index.vue"),
    meta: {

      title: "Lists - Task manager",
    },
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("@/pages/Analytics/index.vue"),
    meta: {

      title: "Analytics - Task manager",
    },
  },
  {
    path: "/users",
    name: "AdminPanel",
    component: () => import("@/pages/Users/index.vue"),
    meta: {
      title: "Admin Panel - Task manager",

    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/pages/Profile/index.vue"),
    meta: {
      requiredAuth: true,

      title: "Profile - Task manager",
    },
  },
  ...authRoutes,
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL || "/"),
  routes,
});
router.beforeEach(authGuard);

router.afterEach((to) => document.title = (to.meta.title as string) || "Task manager");

export default router;
