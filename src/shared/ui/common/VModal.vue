<script setup lang="ts">
import {  defineProps } from "vue";

const props = defineProps<{
  title?: string;
  message?: string;
  show: boolean;
}>();

</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="props.show"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      >
        <div class="bg-secondaryBg rounded-lg shadow-lg w-96 p-6">
          <h3 class="text-modalHead font-semibold mb-4 text-txtPrimary">
            {{ props.title || "Confirm" }}
          </h3>
          <div class="mb-6 space-y-2 flex flex-col items-center">
            <p class="text-txtPrimary text-uiHead">
              {{ props.message || "Are you sure?" }}
            </p>
            <p class="text-secondary text-uiLabel">
              This action can’t be undone
            </p>
          </div>
          <div class="flex justify-end gap-3">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
