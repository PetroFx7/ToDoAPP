<script setup lang="ts">
import { ref, watch, computed } from "vue";

import { useUsersApi } from "@/features/users/api/useUsersRequest";
import { permissionGroups } from "@/features/users/utils/constants";
import VButton from "@/shared/ui/common/VButton.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VSwitch from "@/shared/ui/common/VSwitch.vue";
import VTitle from "@/shared/ui/common/VTitle.vue";
import { humanReadable } from "@/shared/utils/formatter";

const props = defineProps<{
  userId: string;
  permissions: string[];
}>();

const loading = ref(false);
const localPermissions = ref<string[]>([]);
const { userPermissionsUpdate } = useUsersApi();

watch(
  () => props.permissions,
  (newPermissions) => {
    localPermissions.value = [...newPermissions];
  },
  { immediate: true },
);

const togglePermission = (key: string) => {
  const index = localPermissions.value.indexOf(key);
  if (index === -1) localPermissions.value.push(key);
  else localPermissions.value.splice(index, 1);
};

const isAllSelected = computed({
  get: () => permissionGroups.flatMap(g => g.keys).every(k => localPermissions.value.includes(k)),
  set: (val: boolean) => {
    if (val) localPermissions.value = permissionGroups.flatMap(g => g.keys);
    else localPermissions.value = [];
  },
});

const savePermissions = async () => {
  loading.value = true;
  try {
    const { execute } = userPermissionsUpdate(props.userId, localPermissions.value);
    await execute();
  } catch (err) {
    console.error("Failed to save permissions", err);
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <div class="py-6">
    <VTitle title="Role & Permissions" />
  </div>
  <VContainer>
    <div class="flex items-center justify-between mb-6">
      <VSwitch
        v-model="isAllSelected"
        text="Select all permissions"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="group in permissionGroups"
        :key="group.name"
        class="flex flex-col gap-2"
      >
        <span class="font-medium text-gray-700">{{ group.name }}</span>
        <div
          v-for="key in group.keys"
          :key="key"
          class="flex items-center gap-2"
        >
          <VSwitch
            :model-value="localPermissions.includes(key)"
            :label="humanReadable(key)"
            label-position="left"
            @update:model-value="() => togglePermission(key)"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-6">
      <VButton
        text="Save changes"
        :loading="loading"
        :disabled="loading"
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
