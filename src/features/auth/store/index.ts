import { defineStore } from "pinia";

import request from "@/shared/api/client";

const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = false;

  const login = async (emailValue: string, passwordValue: string) => {
    try {
      const response = await request.post("/api/auth/login", {
        email: emailValue,
        password: passwordValue,
      });
      const data = response.data;
      const token = data.token;
      localStorage.setItem("accessToken", token);
    } catch (err) {
      console.error("Login failed", err);
    }

  };

  const register = async (usernameValue: string, emailValue: string, passwordValue: string) => {
    try {
      const response = await request.post("/api/auth/register", {
        name: usernameValue,
        email: emailValue,
        password: passwordValue,
      });
      const data = response.data;
      const token = data.token;
      localStorage.setItem("accessToken", token);

    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
  };

  return {
    isAuthenticated,
    login,
    register,
    logout,
  };

});

export { useAuthStore };
