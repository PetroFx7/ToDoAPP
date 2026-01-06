import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types";

import type { UseApiOptions } from "@/shared/api/types";
import { useApiPost } from "@/shared/composables/useApi";

export const useAuthApi = () => {
  const login = (options?: UseApiOptions<LoginResponse, LoginRequest>) =>
    useApiPost<LoginResponse, LoginRequest>("/api/auth/login", {
      authMode: "public",
      ...options,
    });

  const register = (options?: UseApiOptions<RegisterResponse, RegisterRequest>) =>
    useApiPost<RegisterResponse, RegisterRequest>("/api/auth/register", {
      authMode: "public",
      ...options,
    });

  return {
    login,
    register,
  };
};
