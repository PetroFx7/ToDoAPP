<script setup lang="ts">
import { ref } from "vue";

import Sidebar from "@/widgets/Sidebare/Sidebare.vue";

const isSidebarOpen = ref(true);
</script>

<template>
  <div>
    <Sidebar v-model:is-side-bar-open="isSidebarOpen" />
    <div
      class="
             transition-[margin] duration-300 ease-in-out bg-background"
      :class="isSidebarOpen ? 'ml-64' : 'ml-16'"
    >
      <router-view />
    </div>
  </div>
</template>
