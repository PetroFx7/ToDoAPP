<script setup lang="ts">
import { ref } from "vue";

const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;
};
</script>

<template>
  <div
    class="relative flex justify-center items-center bg-gray-900 min-h-screen overflow-hidden"
    @mousemove="handleMouseMove"
  >
    <div
      class="absolute inset-0"
      :style="{
        background: `radial-gradient(circle at ${mouseX}px ${mouseY}px,
         rgba(15, 23, 42, 0.8), rgba(59, 130, 246, 0.4))`
      }"
    />

    <div class="relative">
      <router-view />
    </div>
  </div>
</template>


