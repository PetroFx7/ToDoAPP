import { defineStore } from "pinia";
import { ref } from "vue";

import { useAuthApi } from "../api/useAuthRequest";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!localStorage.getItem("accessToken"));

  const authApi = useAuthApi();

  const login = async (
    email: string,
    password: string,
    options?:{ onSuccess?: () => void; onError?: () => void },
  ) => {
    const { execute } = authApi.login();

    const data = await execute({
      data: {
        email,
        password,
      },
    });

    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      isAuthenticated.value = true;
      options?.onSuccess?.();

    } else {
      options?.onError?.();
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    options?:{ onSuccess?: () => void; onError?: () => void },
  ) => {
    const { execute } = authApi.register();
    await execute({
      data: {
        name,
        email,
        password,
      },
    });
    options?.onSuccess?.();
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    login,
    register,
    logout,
  };
});
