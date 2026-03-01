import { tokenManager, useApiPost } from "@ametie/vue-muza-use";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!tokenManager.getAccessToken());
  const loading = ref(false);

  const login = async (
    email: string,
    password: string,
    options?: { onSuccess?: () => void; onError?: () => void },
  ) => {
    loading.value = true;

    const { execute } = useApiPost<{ accessToken: string; refreshToken: string; expiresIn: number }, { email: string; password: string }>("/auth/login", {
      onSuccess: (res) => {
        if (res.data?.accessToken) {
          tokenManager.setTokens({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            expiresIn: res.data.expiresIn,
          });
          isAuthenticated.value = true;
          options?.onSuccess?.();
        }
      },
      onError: () => {
        options?.onError?.();
      },
    });

    await execute({
      data: { email, password },
    });

    loading.value = false;
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    options?: { onSuccess?: () => void; onError?: () => void },
  ) => {
    loading.value = true;

    const { execute } = useApiPost<{ accessToken: string; refreshToken: string }, { name: string; email: string; password: string }>("/auth/register", {
      onSuccess: (res) => {
        if (res.data?.accessToken) {
          tokenManager.setTokens(res.data);
          isAuthenticated.value = true;
          options?.onSuccess?.();
        }
      },
      onError: () => {
        options?.onError?.();
      },
    });

    await execute({
      data: { name, email, password },
    });

    loading.value = false;
  };

  const logout = () => {
    tokenManager.clearTokens();
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
});
