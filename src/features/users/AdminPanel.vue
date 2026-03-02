<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import UserView from "@/features/users/components/UserView.vue";
import UsersList from "@/features/users/components/UsersList.vue";
import VButton from "@/shared/ui/common/VButton.vue";

const route = useRoute();
const router = useRouter();
const selectedUserId = ref(route.params.id as string | null);

watch(
  () => route.params.id,
  (newId) => {
    selectedUserId.value = newId as string | null;
  },
);

const handleBack = () => {
  router.push("/users");
};
</script>

<template>
  <div class="p-3">
    <VButton
      v-if="selectedUserId"
      class="bg-transparent p-1 text-[var(--color-muted)] hover:text-gray-700
      transition-all duration-300"
      icon="arrow-left"
      text="All members"
      @click="handleBack"
    />
    <div class="p-7">
      <UsersList v-if="!selectedUserId" />
      <UserView
        v-else
        :user-id="selectedUserId"
      />
    </div>
  </div>
</template>
