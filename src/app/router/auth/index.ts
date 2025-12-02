import { RouteRecordRaw } from "vue-router";

const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/pages/Auth/index.vue"),
    meta: {
      title: "Auth",
      layout: "auth",
    },
  },
];
export default authRoutes;

