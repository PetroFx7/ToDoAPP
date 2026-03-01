import { useApi, type UseApiOptions } from "@ametie/vue-muza-use";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types";

export const useAuthApi = () => {
  const login = (options?: UseApiOptions<LoginResponse, LoginRequest>) =>
    useApi<LoginResponse, LoginRequest>("/auth/login", {
      method: "POST",
      authMode: "public",
      ...options,
    });

  const register = (options?: UseApiOptions<RegisterResponse, RegisterRequest>) =>
    useApi<RegisterResponse, RegisterRequest>("/auth/register", {
      method: "POST",
      authMode: "public",
      ...options,
    });

  return {
    login,
    register,
  };
};
