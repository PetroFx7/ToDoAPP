<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { toast } from "vue-sonner";

import { groupPermissions, useHasPermissions } from "@/shared/composables/usePermissions";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { Permissions } from "@/shared/types";
import VButton from "@/shared/ui/common/VButton.vue";
import VCheckbox from "@/shared/ui/common/VCheckbox.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VMultiSelect from "@/shared/ui/common/VMultiSelect.vue";
import VSwitch from "@/shared/ui/common/VSwitch.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";
import { humanReadablePermissions } from "@/shared/utils/formatter";
import { useUserProfileApi } from "@/widgets/Profile/api/useUserProfileRequest";
import AdminUserActionSkeleton from "@/widgets/Profile/components/AdminUserActionSkeleton.vue";


const props = defineProps<{
  userId: string;
  permissions: string[];
}>();
const authStore = useAuthStore();
const localPermissions = ref<string[]>([]);
const canManagePermissions = useHasPermissions("manage:permissions");
const {
  userPermissionsUpdate,
  fetchAllUsersPermissions,
  fetchRolePermissions,
  userRoleUpdate,
} = useUserProfileApi();

const roleOptions = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];
const selectedRole = ref(roleOptions[0]);

const togglePermission = (key: string) => {
  const index = localPermissions.value.indexOf(key);
  if (index === -1) localPermissions.value.push(key);
  else localPermissions.value.splice(index, 1);
};

const { data:permissionsData, loading } = fetchAllUsersPermissions({
  immediate: true,
});

const { data:rolePermissions } = fetchRolePermissions({
  immediate: true,
});

const allPermissions = computed<Permissions[]>(() => {
  return permissionsData.value ?? [];
});

const isAllSelected = computed({
  get() {
    return allPermissions.value.length > 0 &&
        localPermissions.value.length === allPermissions.value.length;
  },
  set(value: boolean) {
    if (value) localPermissions.value = allPermissions.value.map(p => p.value);
    else localPermissions.value = [];
  },
});

const permissionGroups = computed(() => groupPermissions(allPermissions.value));

const savePermissions = async () => {
  loading.value = true;
  try {
    const { execute: updateRole } = userRoleUpdate(props.userId, { role:"admin" });
    await updateRole();
    const { execute: updatePermissions } = userPermissionsUpdate(props.userId,
      localPermissions.value);
    await updatePermissions();
  } catch (err) {
    toast.error("Permissions update failed");
  } finally {
    loading.value = false;
    authStore.getUser();
    toast.success("Permissions updated successfully");

  }
};

watch(
  () => props.permissions,
  (newPermissions) => {
    localPermissions.value = [...newPermissions];
  },
  { immediate: true },
);
watch(
  () => selectedRole.value,
  (newRole) => {
    if (!rolePermissions.value) return;
    const perms = rolePermissions.value[newRole.value.toUpperCase()] || [];
    localPermissions.value = [...perms];
  },
  { immediate: true },
);

</script>

<template>
  <div class="py-6">
    <VTitle title="Role & Permissions" />
  </div>
  <AdminUserActionSkeleton v-if="loading" />

  <VContainer v-else>
    <div class="flex items-center justify-between mb-6">
      <VMultiSelect
        id="single-select-object"
        v-model="selectedRole"
        :searchable="false"
        :options="roleOptions"
        label="Role"
        label-key="label"
        track-key="value"
        class="h-12"
        :allow-empty="false"
      />
      <VCheckbox
        v-model="isAllSelected"
        label="Select all permissions"
        label-position="right"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="group in permissionGroups"
        :key="group.name"
        class="flex flex-col gap-2"
      >
        <span class="text-headingCard text-txtPrimary">{{ group.name }}</span>
        <div
          v-for="permission in group.permissions"
          :key="permission.value"
          class="flex items-center gap-2"
        >
          <VSwitch
            :model-value="localPermissions.includes(permission.value)"
            :label="humanReadablePermissions(permission.description)"
            label-position="left"
            :disabled="!canManagePermissions || selectedRole.value === 'admin'"
            @update:model-value="() => togglePermission(permission.value)"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-6">
      <VButton
        text="Save changes"
        :loading="loading"
        :disabled="loading"
        class="w-[139px] h-[44px] flex items-center justify-center px-4 py-2"
        @click="savePermissions"
      />
    </div>
  </VContainer>
</template>

<style scoped>
.flex.items-center.gap-2 {
  padding: 0.25rem 0;
}
</style>
