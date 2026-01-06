<script setup lang="ts">
type TabItem = {
  label: string;
  value: string;
};

defineProps<{
  modelValue: string;
  tabs: TabItem[];
}>();

const emit = defineEmits(["update:modelValue"]);

</script>

<template>
  <div class="flex justify-center gap-12 mb-8">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="pb-2 text-1xl transition-colors p-8 "
      :class="
        modelValue === tab.value
          ? 'border-b-2  border-black text-black'
          : 'text-gray-400 hover:text-black'
      "
      @click="emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
