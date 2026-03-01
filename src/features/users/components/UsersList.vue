<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useUsersApi } from "@/features/users/api/useUsersRequest";
import VActionMenu from "@/shared/ui/common/VActionMenu.vue";
import VButton from "@/shared/ui/common/VButton.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VModal from "@/shared/ui/common/VModal.vue";
import VMultiSelect from "@/shared/ui/common/VMultiSelect.vue";
import VTable from "@/shared/ui/common/VTable.vue";
import { deleteEmptyKeys } from "@/shared/utils/formatter";

const columns = [
  { field: "name", label: "Name" },
  { field: "role", label: "Role" },
  { field: "createdAt", label: "Registered" },
];

const sortOptions = [
  { value: "desc", label: "New first" },
  { value: "asc", label: "Old first" },
];

const roleOptions = [
  { value: "", label: "All roles" },
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

const search = ref("");
const selectedRole = ref(roleOptions[0]);
const selectedSort = ref(sortOptions[0]);
const limit = ref(20);

const showDeleteModal = ref(false);
const targetId = ref<string | null>(null);

const router = useRouter();

const { fetchAllUsers, deleteTargetUser } = useUsersApi();

const { execute, data: users, loading } = fetchAllUsers({
  immediate: true,
  watch: [search, selectedRole, selectedSort],
  params: () =>
    deleteEmptyKeys({
      limit: limit.value,
      q: search.value || undefined,
      sort: "createdAt",
      order: selectedSort.value.value,
      role: selectedRole.value.value || "",
    }),
  debounce: 300,
});

const handleDelete = async (id: string) => {
  try {
    const { execute } = deleteTargetUser(id);
    await execute();

    if (users.value?.data) {
      users.value.data = users.value.data.filter((u) => u.id !== id);
    }
  } catch (error) {
    console.error(error);
  }
};

const loadMore = () => {
  limit.value += 20;
  execute();
};

const handleAction = (action: string, row: { id: string }) => {
  if (action === "open") {
    router.push({
      name: "AdminUserProfile",
      params: { id: row.id },
    });
  }  if (action === "delete") {
    targetId.value = row.id;
    showDeleteModal.value = true;
  }
};

const onConfirmDelete = async () => {
  if (!targetId.value) return;
  await handleDelete(targetId.value);
  targetId.value = null;
};
</script>

<template>
  <div class="px-2">
    <VTable
      :columns="columns"
      :data="users?.data ?? []"
      :loading="loading"
      :skeleton-rows="35"
    >
      <template #toolbar>
        <div class="flex flex-col md:flex-row gap-4 mb-6 md:items-end">
          <div class="md:w-[320px]">
            <VInput
              v-model="search"
              placeholder="Search by name or email"
              class="h-12"
            />
          </div>
          <div class="md:w-[200px]">
            <VMultiSelect
              id="single-select-object"
              v-model="selectedRole"
              :options="roleOptions"
              label="Role"
              label-key="label"
              track-key="value"
              class="h-12"
              :allow-empty="false"
            />
          </div>
          <div class="md:w-[200px]">
            <VMultiSelect
              id="single-select-object"
              v-model="selectedSort"
              :options="sortOptions"
              label="Date"
              label-key="label"
              track-key="value"
              class="h-12"
              :allow-empty="false"
            />
          </div>
        </div>
      </template>

      <template #actions="{ row }">
        <VActionMenu
          :actions="[
            { label: 'Open profile', value: 'open' },
            { label: 'Delete user', value: 'delete', danger: true }
          ]"
          @select="(action) => handleAction(action, row)"
        />
      </template>
    </VTable>

    <VModal
      v-model:show="showDeleteModal"
      title="Delete User"
      message="Are you sure you want to delete this user?"
      @confirm="onConfirmDelete"
    />

    <VButton
      v-if="!loading && users?.pagination?.hasMore"
      class="mt-4"
      text="Load More"
      @click="loadMore"
    />
  </div>
</template>
