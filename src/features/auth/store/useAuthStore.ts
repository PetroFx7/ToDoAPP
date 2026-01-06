import { defineStore } from "pinia";
import { ref } from "vue";

import { useApiPost } from "@/shared/composables/useApi";

type AuthResponse = {
  accessToken: string;
};

type LoginDto = {
  email: string;
  password: string;
};

type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!localStorage.getItem("accessToken"));

  const login = async (email: string, password: string) => {
    const { execute } = useApiPost<AuthResponse, LoginDto>(
      "/api/auth/login",
      {
        authMode: "public",
        autoCleanup: false,
      },
    );

    const data = await execute({
      data: {
        email,
        password,
      },
    });

    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      isAuthenticated.value = true;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    const { execute } = useApiPost<AuthResponse, RegisterDto>(
      "/api/auth/register",
      {
        authMode: "public",
        autoCleanup: false,
      },
    );

    const data = await execute({
      data: {
        name: username,
        email,
        password,
      },
    });

    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      isAuthenticated.value = true;
    }
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
