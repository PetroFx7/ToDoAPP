<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch, computed } from "vue";

import { useUsersStore } from "@/features/users/store/useUsers";
import VTable from "@/shared/ui/common/VTable.vue";

const props = defineProps<{
  search: string;
  role: "all" | "admin" | "user";
  sortOrder: "newest" | "oldest";
}>();

const usersStore = useUsersStore();
const { users, loading, pagination } = storeToRefs(usersStore);

const columns = [
  { field: "name", label: "Name" },
  { field: "email", label: "Email" },
  { field: "role", label: "Role" },
  { field: "createdAt", label: "Created at" },
];

const orderMap = {
  newest: "desc",
  oldest: "asc",
} as const;

const fetchUsers = () => {
  usersStore.fetchUsers({
    page: 1,
    limit: 20,
    offset: 0,
    q: props.search || undefined,
    sort: "createdAt",
    order: orderMap[props.sortOrder],
    role: props.role === "all" ? undefined : props.role,
  });
};


watch(

  () => ({
    search: props.search,
    role: props.role,
    sortOrder: props.sortOrder,
  }),
  fetchUsers,
  { immediate: true },

);


const filteredUsers = computed(() => users.value);
</script>

<template>
  <div>
    <div class="">
      <VTable
        :columns="columns"
        :data="filteredUsers"
        :loading="loading"
      />
    </div>

    <div v-if="pagination">
      Page {{ pagination.currentPage }} of {{ pagination.totalPages }}
    </div>
  </div>
</template>
