import type { RouteLocationNormalized } from "vue-router";

import { tokenManager } from "@/shared/api/tokenManager";
import { useAuthStore } from "@/shared/stores/useAuthStore";

export const authGuard = async (to: RouteLocationNormalized) => {
  const token = tokenManager.getAccessToken();
  const isAuthorized = !!token;
  const authStore = useAuthStore();

  if (isAuthorized && !authStore.userData) {
    await authStore.setUser();
  }

  if (to.meta.requiredAuth && !isAuthorized) {
    return { name: "Auth" };
  }

  if (to.name === "Auth" && isAuthorized) {
    return { name: "Home" };
  }

  const user = authStore.userData;
  if (!user) return;

  if (to.meta.permissions) {
    const hasPermissions = (to.meta.permissions as string[]).every((p) =>
      user.permissions.includes(p),
    );
    if (!hasPermissions) {
      return { name: "Home" };
    }
  }
};
