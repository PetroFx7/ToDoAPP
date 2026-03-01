<script setup lang="ts">
import {  defineProps, defineEmits } from "vue";

const props = defineProps<{
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  show: boolean;
}>();

const emit = defineEmits(["update:show", "confirm", "cancel"]);


const handleConfirm = () => {
  emit("confirm");
  emit("update:show", false);
};

const handleCancel = () => {
  emit("cancel");
  emit("update:show", false);
};
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="props.show"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      >
        <div class="bg-white rounded-lg shadow-lg w-96 p-6">
          <h3 class="text-lg font-semibold mb-4">
            {{ props.title || "Confirm" }}
          </h3>
          <p class="text-gray-700 mb-6">
            {{ props.message || "Are you sure?" }}
          </p>
          <div class="flex justify-end gap-3">
            <button
              class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              @click="handleCancel"
            >
              {{ props.cancelText || "Cancel" }}
            </button>
            <button
              class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              @click="handleConfirm"
            >
              {{ props.confirmText || "Delete" }}
            </button>
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
