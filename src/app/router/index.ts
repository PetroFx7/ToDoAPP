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
  ...authRoutes,
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL || "/"),
  routes,
});
router.beforeEach(authGuard);

router.afterEach((to) => document.title = (to.meta.title as string) || "Task manager");

export default router;
