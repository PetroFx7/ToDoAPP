<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";


import { useUsersApi } from "@/features/users/api/useUsersRequest";
import AdminUserAction from "@/features/users/components/AdminUserAction.vue";
import AdminUserActionSkeleton from "@/features/users/components/AdminUserActionSkeleton.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import { formatShortDate } from "@/shared/utils/date";


const route = useRoute();
const userId = computed(() => route.params.id as string);

const { fetchTargetUser } = useUsersApi();

const error = ref<string | null>(null);

const { data: user, loading } = fetchTargetUser(userId.value, {
  immediate: true,
  watch: userId,
});

</script>

<template>
  <div>
    <AdminUserActionSkeleton v-if="loading" />

    <div v-else-if="user">
      <VContainer class="relative">
        <h2 class="text-xl font-bold mb-2">
          {{ user.name }}
        </h2>

        <p class="text-[var(--color-secondary)]">
          {{ user.email }}
        </p>

        <p
          class="
      absolute
      top-4
      right-4
      text-[var(--color-secondary)]
      text-sm
    "
        >
          Member since: {{ formatShortDate(user.createdAt) }}
        </p>
      </VContainer>

      <AdminUserAction
        :user-id="user.id"
        :permissions="user.permissions"
      />
    </div>

    <div
      v-else-if="error"
      class="text-red-500"
    >
      {{ error }}
    </div>

    <div v-else>
      No user data
    </div>
  </div>
</template>
