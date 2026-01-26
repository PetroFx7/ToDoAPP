import { defineStore } from "pinia";
import { ref } from "vue";

import { useUsersApi } from "@/features/users/api/useUsersRequest";
import type {  UserInfo } from "@/features/users/types";

interface Pagination {
  total: number;
  limit: number;
  offset: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

export const useUsersStore = defineStore("users", () => {
  const { fetchAllUsers } = useUsersApi();

  const users = ref<UserInfo[]>([]);
  const loading = ref(false);
  const pagination = ref<Pagination | null>(null);
  const error = ref<string | null>(null);
  const fetchUsers = async (params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: "asc" | "desc";
    q?: string;
    role?: "admin" | "user";
  } = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const { execute } = fetchAllUsers({
        immediate: false,
      });

      const response = await execute({
        params: {
          limit: params.limit || 20,
          offset: ((params.page || 1) - 1) * (params.limit || 20),
          sort: params.sort,
          order: params.order,
          q: params.q,
          role: params.role,
        },
      });

      if (response) {
        users.value = response.data;
        pagination.value = response.pagination;
      }
    } catch (err) {
      error.value = "Failed to fetch users";
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    users,
    loading,
    pagination,
    error,
    fetchUsers,
  };
});
