import type { UseApiOptions } from "@/shared/api/types";
import { useApiGet, useApiPatch, useApiDelete } from "@/shared/composables";
import type { AdminResponse, UserInfo, UserRole, UserPermissions, Permissions  } from "@/shared/types";

export const useUsersApi = () => {

  const fetchAllUsers = (options?: UseApiOptions<AdminResponse>) => {
    return useApiGet<AdminResponse>("/users", {
      immediate: false,
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

  const deleteTargetUser = (id: string, options?: UseApiOptions<UserInfo>) => {
    return useApiDelete<UserInfo>(`/users/${id}`, {
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
    permissions: UserPermissions,
    options?: UseApiOptions<UserInfo, UserPermissions>,
  ) => {
    return useApiPatch<UserInfo, UserPermissions>(`/users/${id}/permissions`, {
      data: permissions,
      authMode: "default",
      ...options,
    });
  };

  return {
    fetchAllUsers,
    fetchTargetUser,
    deleteTargetUser,
    fetchAllUsersPermissions,
    userRoleUpdate,
    userPermissionsUpdate,
  };
};
