import { UseApiOptions, useApiPatch, useApiGet, useApiDelete } from "@ametie/vue-muza-use";


import type { AdminResponse, UserInfo, UserRole } from "@/shared/types";

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
  const fetchAllUsersPermissions = (options?: UseApiOptions<Permissions[]>) => {
    return useApiGet<Permissions[]>("/permissions", {
      immediate: false,
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
  const userRoleUpdate = (
    id: string,
    role: UserRole,
    options?: UseApiOptions<UserInfo, UserRole>,
  ) => {
    return useApiPatch<UserInfo, UserRole>(`/users/${id}/role`, {
      data: role,
      authMode: "default",
      ...options,
    });
  };

  const userPermissionsUpdate = (
    id: string,
    permissions: string[],
    options?: UseApiOptions<UserInfo, { permissions: string[] }>,
  ) => {
    return useApiPatch<UserInfo, { permissions: string[] }>(
      `/users/${id}/permissions`,
      {
        data: { permissions },
        authMode: "default",
        ...options,
      },
    );
  };
  const fetchOwnProfile = (options?: UseApiOptions<UserInfo>) => {
    return useApiGet<UserInfo>("/me", {
      immediate: false,
      authMode: "default",
      ...options,
    });
  };

  return {
    fetchAllUsers,
    deleteTargetUser,
    fetchAllUsersPermissions,
    fetchTargetUser,
    userRoleUpdate,
    userPermissionsUpdate,
    fetchOwnProfile,
  };
};
