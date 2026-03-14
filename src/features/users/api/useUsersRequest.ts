import { UseApiOptions, useApiGet, useApiDelete } from "@ametie/vue-muza-use";

import type { AdminResponse, UserInfo } from "@/shared/types";

export const useUsersApi = () => {

  const fetchAllUsers = (options?: UseApiOptions<AdminResponse>) => {
    return useApiGet<AdminResponse>("/users",
      options,
    );
  };

  const deleteTargetUser = (id: string, options?: UseApiOptions<UserInfo>) => {
    return useApiDelete<UserInfo>(`/users/${id}`, {
      authMode: "default",
      ...options,
    });
  };

  const fetchTargetUser = (id: string, options?: UseApiOptions<UserInfo>) => {
    return useApiGet<UserInfo>(`/users/${id}`, {
      immediate: false,
      authMode: "default",
      ...options,
    });
  };

  return {
    fetchAllUsers,
    deleteTargetUser,
    fetchTargetUser,
  };
};
