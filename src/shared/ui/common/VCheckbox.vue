<script setup lang="ts">
import { computed } from "vue";

type CheckboxProps = {
  modelValue?: boolean;
  disabled?: boolean;
  label?: string;
  labelPosition?: "left" | "right";
};

const props = defineProps<CheckboxProps>();
const emit = defineEmits(["update:modelValue"]);

const isChecked = computed({
  get: () => !!props.modelValue,
  set: (val: boolean) => emit("update:modelValue", val),
});

const toggle = () => {
  if (!props.disabled) isChecked.value = !isChecked.value;
};
</script>

<template>
  <label class="inline-flex items-center gap-2 cursor-pointer select-none">

    <span
      v-if="props.label && props.labelPosition === 'left'"
      class="text-txtPrimary"
    >
      {{ props.label }}
    </span>

    <div
      :class="[
        'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200',
        isChecked ? 'bg-primary border-primary' : 'border-borderDefault',
        props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        !props.disabled ? 'hover:border-borderHover' : ''
      ]"
      @click="toggle"
    >
      <VueFeather
        v-if="isChecked"
        type="check"
        class="w-4 h-5 text-white"
      />
    </div>

    <span
      v-if="props.label && props.labelPosition !== 'left'"
      class="text-txtPrimary"
    >
      {{ props.label }}
    </span>
  </label>
</template>
