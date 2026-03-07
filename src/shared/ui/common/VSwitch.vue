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
  <label
    class="flex items-center justify-between w-full cursor-pointer select-none"
  >
    <span
      v-if="props.label && props.labelPosition === 'left'"
      class="text-txtPrimary"
      :class="{ 'opacity-50 cursor-not-allowed' : props.disabled }"
    >
      {{ props.label }}
    </span>
    <div
      :class="[
        'relative w-11 h-6 rounded-full border-2 transition-colors duration-300 ease-in-out',
        props.modelValue
          ? 'bg-authBorder border-authBorder'
          : 'bg-secondaryBg border-switchOff',
        props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      ]"
    >
      <div
        :class="[
          'absolute top-1/2 left-1 w-[18px] h-[18px] rounded-full shadow-md' +
            ' transform -translate-y-1/2 transition-transform duration-300 ease-in-out',
          props.modelValue
            ? 'translate-x-[18px] bg-switchOn'
            : 'translate-x-0 bg-switchOff'
        ]"
      />

      <input
        type="checkbox"
        class="absolute w-full h-full opacity-0 cursor-pointer"
        :checked="props.modelValue"
        :disabled="props.disabled"
        @change="onChange"
      >
    </div>    <span
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
