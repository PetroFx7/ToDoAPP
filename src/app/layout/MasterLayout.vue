<script setup lang="ts">
import { computed  } from "vue";
import { useRoute } from "vue-router";
import { Toaster } from "vue-sonner";

import AuthLayout from "@/app/layout/AuthLayout.vue";
import DefaultLayout from "@/app/layout/DefaultLayout.vue";
import "vue-sonner/style.css";



const route = useRoute();

const layouts = {
  auth: AuthLayout,
  default: DefaultLayout,
};

const routePath = computed(() => {
  const layoutKey = route.meta.layout as keyof typeof layouts || "default";

  return layouts[layoutKey];
});
</script>

<template>
  <Toaster position="top-center" />

  <component :is="routePath" />
</template>
