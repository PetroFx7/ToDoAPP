<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import UsersList from "@/features/users/components/UsersList.vue";

const route = useRoute();
const selectedUserId = ref(route.params.id as string | null);

watch(
  () => route.params.id,
  (newId) => {
    selectedUserId.value = newId as string | null;
  },
);


</script>

<template>
  <div class="p-10">
    <UsersList />
  </div>
</template>
