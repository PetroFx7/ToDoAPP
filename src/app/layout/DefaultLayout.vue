<script setup lang="ts">
import Sidebar from "@/widgets/Sidebare.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar />

    <div class="flex-1 flex justify-center items-center bg-gray-300">
      <router-view />
    </div>
  </div>
</template>
