import { useApiGet, UseApiOptions, useApiPatch } from "@ametie/vue-muza-use";

import type { UserInfo, UserRole } from "@/shared/types";

export const useUserProfileApi = () => {
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
  const fetchAllUsersPermissions = (options?: UseApiOptions<Permissions[]>) => {
    return useApiGet<Permissions[]>("/permissions", {
      immediate: false,
      authMode: "default",
      ...options,
    });
  };

  const fetchRolePermissions = (options?: UseApiOptions<Permissions[]>) => {
    return useApiGet<Permissions[]>("/permissions/roles", {
      immediate: false,
      authMode: "default",
      ...options,
    });
  };

  const updateOwnProfile = (options?: UseApiOptions<UserInfo, Partial<UserInfo>>) => {
    return useApiPatch("/me", options);
  };

  const fetchTargetUser = (id: string, options?: UseApiOptions<UserInfo>) => {
    return useApiGet<UserInfo>(`/users/${id}`, {
      immediate: false,
      authMode: "default",
      ...options,
    });
  };

  return {
    userRoleUpdate,
    userPermissionsUpdate,
    fetchAllUsersPermissions,
    fetchRolePermissions,
    updateOwnProfile,
    fetchTargetUser,
  };
};
