<script setup lang="ts">
type CheckboxProps = {
  modelValue?: boolean;
  disabled?: boolean;
  label?: string;
  labelPosition?: "left" | "right";
};

const props = defineProps<CheckboxProps>();
const emit = defineEmits(["update:modelValue"]);

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
};
</script>

<template>
  <label class="inline-flex items-center gap-2 cursor-pointer select-none">

    <span
      v-if="props.label && props.labelPosition === 'left'"
      class="text-gray-700"
    >
      {{ props.label }}
    </span>

    <input
      type="checkbox"
      :checked="props.modelValue"
      :disabled="props.disabled"
      class="w-4 h-4 rounded border-gray-300 text-blue-600
       focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      @input="onChange"
    >

    <span
      v-if="props.label && props.labelPosition !== 'left'"
      class="text-gray-700"
    >
      {{ props.label }}
    </span>

  </label>
</template>
