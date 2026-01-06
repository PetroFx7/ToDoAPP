<script setup lang="ts">
import { ref } from "vue";

import VButton from "@/shared/ui/common/VButton.vue";
import Sidebar from "@/widgets/Sidebare.vue";

const isSidebarOpen = ref(true);

const showSidebar = () => {
  isSidebarOpen.value = true;
};
</script>

<template>
  <div class="flex min-h-screen relative">
    <Transition name="fade">
      <VButton
        v-if="!isSidebarOpen"
        class="absolute top-4 left-4 z-10"
        icon="arrow-right"
        @click="showSidebar"
      />
    </Transition>

    <Transition name="slide">
      <Sidebar
        v-if="isSidebarOpen"
        v-model:is-side-bar-open="isSidebarOpen"
      />
    </Transition>

    <div class="flex-1 flex justify-center items-center bg-gray-300">
      <router-view />
    </div>
  </div>
</template>


<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
