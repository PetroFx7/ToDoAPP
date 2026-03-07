import { useApiGet, tokenManager, type UseApiOptions } from "@ametie/vue-muza-use";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";


import type { UserInfo } from "@/shared/types";

export const useAuthStore = defineStore("user", () => {
  const userData = ref<UserInfo | null>(null);

  const fetchOwnProfile = (options?: UseApiOptions<UserInfo>) => {
    return useApiGet("/me", options);
  };

  const { data: user, loading, execute } = fetchOwnProfile();

  const getUser = async () => {
    await execute();

    if (user.value) {
      userData.value = user.value;
    }
  };

  const setUser = async (user: UserInfo) => {
    userData.value = user;

    if (userData.value) return;

    await getUser();
  };

  const router =  useRouter();

  const logOutUser = (): void => {
    tokenManager.clearTokens();
    userData.value = null;
    router.push("/auth");
  };

  const isAdmin = () => userData.value?.role === "admin" ? router.push("/users") : router.push("/");

  return {
    userData,
    loading,
    isAdmin,
    setUser,
    getUser,
    logOutUser,
  };
});
