<script setup lang="ts">
type SwitchProps = {
  modelValue?: boolean;
  disabled?: boolean;
  label?: string;
  labelPosition?: "left" | "right";

};

const props = defineProps<SwitchProps>();
const emit = defineEmits(["update:modelValue"]);

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.checked);
};


</script>

<template>
  <label class="inline-flex items-center cursor-pointer select-none">

    <span
      v-if="props.label && props.labelPosition === 'left'"
      class="text-gray-700"
      :class="{ 'opacity-50 cursor-not-allowed' : props.disabled }"
    >
      {{ props.label }}
    </span>
    <div
      :class="[
        'relative w-10 h-6 transition-colors duration-300 ease-in-out rounded-full',
        props.modelValue ? 'bg-blue-600' : 'bg-gray-300',
        props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      ]"
    >

      <div
        :class="[
          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full' +
            ' shadow transform transition-transform duration-300 ease-in-out',
          props.modelValue ? 'translate-x-4' : ''
        ]"
      />
      <input
        type="checkbox"
        class="absolute w-full h-full opacity-0 cursor-pointer"
        :checked="props.modelValue"
        :disabled="props.disabled"
        @change="onChange"
      >
    </div>
    <span
      v-if="props.label && props.labelPosition !== 'left'"
      class="text-gray-700"
      :class="{ 'opacity-50 cursor-not-allowed' : props.disabled }"
    >
      {{ props.label }}
    </span>
  </label>
</template>

<style scoped>

</style>
