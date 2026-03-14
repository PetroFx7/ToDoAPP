<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

import Header from "@/widgets/Header.vue";
import Sidebar from "@/widgets/Sidebare/Sidebare.vue";

const route = useRoute();
const isSidebarOpen = ref(true);
</script>

<template>
  <div class="flex min-h-screen bg-background">
    <Sidebar v-model:is-side-bar-open="isSidebarOpen" />

    <main
      class="flex-1 transition-all duration-300"
      :class="isSidebarOpen ? 'ml-64' : 'ml-16'"
    >
      <div
        v-if="route.meta.showHeader"
        class="px-8 py-4"
      >
        <Header
          :title="$route.meta.headerTitle as string"
        />
      </div>

      <router-view />
    </main>
  </div>
</template>
