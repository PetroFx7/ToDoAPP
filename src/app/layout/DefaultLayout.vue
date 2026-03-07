<script setup lang="ts">
import { ref } from "vue";

import Sidebar from "@/widgets/Sidebare/Sidebare.vue";

const isSidebarOpen = ref(true);
</script>

<template>
  <div class="flex min-h-screen bg-background">
    <Sidebar v-model:is-side-bar-open="isSidebarOpen" />

    <main
      class="flex-1 transition-all duration-300"
      :class="isSidebarOpen ? 'ml-64' : 'ml-16'"
    >
      <router-view />
    </main>
  </div>
</template>
