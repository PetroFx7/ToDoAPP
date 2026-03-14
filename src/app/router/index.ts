import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import authRoutes from "@/app/router/auth";
import { authGuard } from "@/app/router/guards";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Main/index.vue"),
    meta: {
      showHeader: true,
      headerTitle: "Good to see you again,",
      title: "Home - Task manager",
    },
  },
  {
    path: "/lists",
    name: "Lists",
    component: () => import("@/pages/Lists/index.vue"),
    meta: {
      permissions: ["read:list"],
      showHeader: true,
      headerTitle: "Manage all your task groups in one place",
      title: "Lists - Task manager",
    },
  },
  {
    path: "/analytics",
    name: "Analytics",
    component: () => import("@/pages/Analytics/index.vue"),
    meta: {
      showHeader: true,
      headerTitle: "See how your tasks are progressing over time",
      permissions: ["read:analytics"],
      title: "Analytics - Task manager",
    },
  },
  {
    path: "/users",
    name: "AdminPanel",
    component: () => import("@/pages/Users/index.vue"),
    meta: {
      permissions: ["read:users"],
      title: "Admin Panel - Task manager",
    },
  },
  {
    path: "/users/:id",
    name: "AdminUserProfile",
    component: () => import("@/pages/Users/index.vue"),
    meta: {
      permissions: ["read:users"],
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
router.beforeEach(authGuard);

router.afterEach((to) => document.title = (to.meta.title as string) || "Task manager");

export default router;
