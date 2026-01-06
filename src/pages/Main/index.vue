<script setup lang="ts">

import VButton from "@/shared/ui/common/VButton.vue";
</script>

<template>
  <div class="fixed top-4 right-4">
    <VButton
      to="/auth"
      icon="user-plus"
    />
  </div>
  <div class="p-4 text-center text-2xl font-bold">
    Головна сторінка
  </div>
</template>

<style scoped>

</style>
