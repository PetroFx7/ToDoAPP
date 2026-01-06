<script setup lang="ts">
import { computed } from "vue";

import { useThemeStore } from "../composables/useTheme";

import VSwitch from "@/shared/ui/common/VSwitch.vue";

const themeStore = useThemeStore();

const isDark = computed(() => themeStore.isDark);

const toggleTheme = () => {
  themeStore.setTheme(isDark.value ? "light" : "dark");
};
</script>

<template>
  <VSwitch
    v-model="isDark"
    :label="isDark ? 'Темна тема' : 'Світла тема'"
    @change="toggleTheme"
  />
</template>

<style scoped>
.theme-toggle {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.25rem;
}

.theme-toggle:hover {
  background: #f3f4f6;
}

.theme-toggle:active {
  transform: scale(0.95);
}
</style>

