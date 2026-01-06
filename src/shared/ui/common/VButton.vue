<script lang="ts" setup>

import { computed } from "vue";

import VLoader from "@/shared/ui/common/VLoader.vue";

type ButtonProps = {
  text?: string;
  disabled?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  negative?: boolean;
  to?: string;
  href?: string;
  type?: "button" | "submit" | "reset"  ;
  loader?: boolean;
  size?: "sm" | "md" | "lg";
  class?: string;
};

const props = defineProps<ButtonProps>();

const isLink = computed(() => !!props.to);

const buttonClasses = computed(() => {

  let baseClasses = "flex items-center gap-2 rounded-lg transition ";

  if (props.size === "sm") {
    baseClasses += "px-3 py-1 text-sm ";
  } else if (props.size === "lg") {
    baseClasses += "px-5 py-3 text-lg ";
  } else {
    baseClasses += "px-4 py-2 text-md ";
  }

  if (props.negative) {
    baseClasses += "bg-red-600 hover:bg-red-700 text-white ";
  } else {
    baseClasses += "bg-blue-600 hover:bg-blue-700 text-white ";
  }

  if (props.class) {
    baseClasses += props.class + " ";
  }

  return baseClasses;
});
</script>

<template>
  <component
    :is="isLink ? 'RouterLink' : 'button'"
    v-bind="isLink ?{
      to: props.to,
      ...$attrs
    } : {
      type: props.type || 'button',
      disabled: props.disabled || props.loader,
      ...$attrs
    }"
    class="flex items-center gap-2 px-4 py-2 rounded-lg transition"
    :class="buttonClasses"
  >
    <VueFeather
      v-if="props.icon && props.iconPosition !== 'right'"
      :type="props.icon"
      class="w-4 h-4"
    />

    <span v-if="!!props.text">{{ props.text }}</span>

    <VueFeather
      v-if="props.icon && props.iconPosition === 'right'"
      :type="props.icon"
      class="w-4 h-4"
    />
    <VLoader
      v-if="props.loader"
      class="w-4 h-4"
    />
  </component>
</template>

<style scoped>
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
