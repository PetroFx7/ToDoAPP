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
  <div class="flex flex-col gap-2 w-full">
    <!-- Label -->
    <label
      v-if="props.label"
      class="text-uiLabel text-txtSecondaryDark"
      :class="props.error ? 'text-dangerous' : ''"
    >
      {{ props.label }}
    </label>

    <!-- Input wrapper -->
    <div class="relative flex">
      <input
        :type="inputType"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        class="
          w-full outline-none bg-transparent
          py-3 pl-4 pr-10
          text-bodyL text-txtPrimary
          bg-secondaryBg
          border-2 rounded-lg
          placeholder-muted
          hover:border-borderHover
          focus:shadow-innerOutline
          disabled:border-disabled
          disabled:cursor-not-allowed
        "
        :class="props.error
          ? 'border-dangerous focus:shadow-none'
          : 'border-borderDefault'"
        @input="onInput"
      >

      <!-- Password toggle -->
      <button
        v-if="props.type === 'password'"
        type="button"
        class="absolute right-4 bottom-3.5 flex cursor-pointer text-muted"
        @click="showPassword = !showPassword"
      >
        <VueFeather :type="showPassword ? 'eye-off' : 'eye'" />
      </button>
    </div>

    <!-- Error -->
    <p
      v-if="props.error"
      class="text-dangerousErrMsg text-uiCaption"
    >
      {{ props.error }}
    </p>

    <!-- Support text -->
    <p
      v-else-if="props.supportTitle"
      class="text-gray-500 text-sm"
    >
      {{ props.supportTitle }}
    </p>
  </div>
</template>
