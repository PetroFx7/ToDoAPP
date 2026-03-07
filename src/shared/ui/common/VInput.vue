<script lang="ts" setup>
import { ref, computed } from "vue";

type InputProps = {
  placeholder?: string;
  label?: string;
  error?: string;
  type?: string;
  modelValue?: string;
  supportTitle?: string;
  disabled?: boolean;
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
  if (props.disabled) return;
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="flex flex-col gap-2 w-full">
    <label
      v-if="props.label"
      class="text-uiLabel text-txtSecondaryDark"
      :class="[props.error ? 'text-dangerous' : '', props.disabled ? 'text-disabledBtn' : '']"
    >
      {{ props.label }}
    </label>

    <div class="relative flex">
      <input
        :type="inputType"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        class="w-full outline-none py-3 pl-4 pr-10 text-bodyL rounded-lg placeholder-muted
         border-2 bg-secondaryBg text-txtPrimary"
        :class="[
          props.error ? 'border-dangerous focus:shadow-none' : 'border-borderDefault',
          !props.disabled ? 'focus:shadow-innerOutline hover:border-borderHover' : '',
          props.disabled ? 'opacity-50 border-disabled cursor-not-allowed' +
            ' bg-secondaryBg text-disabledBtn' : ''
        ]"
        @input="onInput"
      >

      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute right-4 bottom-3.5 flex text-muted"
        :class="props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
        :disabled="props.disabled"
        @click="showPassword = !showPassword"
      >
        <VueFeather :type="showPassword ? 'eye' : 'eye-off'" />
      </button>
    </div>

    <p
      v-if="props.error"
      class="text-dangerousErrMsg text-uiCaption"
    >
      {{ props.error }}
    </p>

    <p
      v-else-if="props.supportTitle"
      class="text-gray-500 text-sm"
      :class="props.disabled ? 'text-gray-400' : ''"
    >
      {{ props.supportTitle }}
    </p>
  </div>
</template>
