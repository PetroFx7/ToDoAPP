<script setup lang="ts">
import { computed } from "vue";

import { useThemeStore } from "@/features/theme";
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
