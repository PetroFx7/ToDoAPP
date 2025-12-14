<script lang="ts" setup>
import { ref, computed } from "vue";

type InputProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  type?: string;
  modelValue?: string;
  supportTitle?: string;
};

const props = defineProps<InputProps>();
const emit = defineEmits(["update:modelValue"]);


const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === "password") {
    return showPassword.value ? "text" : "password";
  }
  return props.type || "text";
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="flex flex-col gap-1">
    <label
      v-if="props.label"
      class="font-medium text-gray-700 text-sm"
    >
      {{ props.label }}
    </label>

    <div class="relative">
      <input
        :type="inputType"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        class="w-full rounded border border-gray-300
         px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        @input="onInput"
      >
      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
        @click="showPassword = !showPassword"
      >
        <span v-if="showPassword">
          <VueFeather type="eye" />
        </span>
        <span v-else>
          <VueFeather type="eye-off" />
        </span>
      </button>
    </div>

    <p
      v-if="$slots.error"
      class="text-red-500 text-sm mt-1"
    >
      <slot name="error" />
    </p>
  </div>
</template>
