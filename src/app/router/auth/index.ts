import { RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/pages/Auth/index.vue"),
    meta: {
      title: "Auth - Task manager",
      layout: "auth",
    },
  },
];
export default authRoutes;

