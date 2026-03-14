<script setup lang="ts">

import VContainer from "@/shared/ui/common/VContainer.vue";
import { formatShortDate } from "@/shared/utils/date";

const props = defineProps<{
  name: string;
  email: string;
  createdAt: string;
}>();
</script>

<template>
  <VContainer class="relative">
    <h2 class="text-xl font-bold mb-2 text-txtPrimary">
      {{ props.name }}
    </h2>

    <p class="text-secondary">
      {{ props.email }}
    </p>

    <p
      class="absolute top-4 right-4 text-secondary text-sm"
    >
      Member since: {{ formatShortDate(props.createdAt) }}
    </p>
  </VContainer>
</template>

<style scoped>

</style>
