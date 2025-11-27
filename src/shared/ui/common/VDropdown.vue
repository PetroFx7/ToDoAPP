<script setup lang="ts">
type DropdownProps = {
  modelValue?: any;
  disabled?: boolean;
  options?: Array<{ label: string; value: any }>;
  placeholder?: string;
  label?: string;
};
const props = defineProps<DropdownProps>();
const emit = defineEmits(["update:modelValue"]);

const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="flex flex-col gap-1">
    <label>
      <span
        v-if="props.label"
        class="font-medium text-gray-700"
      >
        {{ props.label }}
      </span>
    </label>
    <select
      :disabled="props.disabled"
      class="block w-full px-3 py-2 border border-gray-300
       bg-white rounded-md shadow-sm focus:outline-none
        focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      :value="props.modelValue"
      @change="onChange"
    >
      <option
        value=""
        disabled
        selected
        hidden
      >
        {{ props.placeholder || 'Select an option' }}
      </option>
      <option
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
