<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";

type Action = {
  label: string;
  value: string;
  danger?: boolean;
};

const props = defineProps<{
  actions: Action[];
}>();

const emit = defineEmits(["select"]);

const isOpen = ref(false);
const buttonRef = ref<HTMLElement | null>(null);

const position = ref({
  top: 0,
  left: 0,
});

const toggle = async () => {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    await nextTick();
    updatePosition();
  }
};

const updatePosition = () => {
  const rect = buttonRef.value?.getBoundingClientRect();
  if (!rect) return;

  position.value = {
    top: rect.bottom + window.scrollY,
    left: rect.right + window.scrollX - 180,
  };
};

const close = () => {
  isOpen.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
  if (!buttonRef.value?.contains(e.target as Node)) {
    close();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="inline-block">
    <button
      ref="buttonRef"
      class="p-2 rounded hover:bg-gray-200 transition"
      @click.stop="toggle"
    >
      ...
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed z-[9999] w-44 bg-white border border-gray-200
               rounded-lg shadow-lg overflow-hidden"
        :style="{
          top: position.top + 'px',
          left: position.left + 'px'
        }"
      >
        <button
          v-for="action in props.actions"
          :key="action.value"
          class="block w-full text-left px-4 py-2 text-sm transition"
          :class="action.danger
            ? 'text-red-600 hover:bg-red-50'
            : 'text-gray-700 hover:bg-gray-100'"
          @click="emit('select', action.value); close()"
        >
          {{ action.label }}
        </button>
      </div>
    </Teleport>
  </div>
</template>
