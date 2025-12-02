<script setup lang="ts">

import AuthFeature from "@/features/auth/AuthFeature.vue";
import { ThemeToggle } from "@/features/theme";
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4  ">
    <AuthFeature />
    <ThemeToggle />
  </div>
</template>

<style scoped>

</style>
