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
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger" | "ghost" | "outline";
  loading?: boolean;
  size?: "sm" | "md" | "lg";
};

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
});
const isLink = computed(() => !!props.to);

const isDisabled = computed(() => props.disabled || props.loading);

const variantClasses = computed(() => {
  switch (props.variant) {
    case "primary":
      return ` inline-flex items-center justify-center px-4 py-2
        flex items-center gap-2 rounded-lg transition
     bg-authBorder text-white rounded-[12px] cursor-pointer
          transition-all duration-300 whitespace-nowrap
           hover:bg-buttonHoverBg hover:shadow-[0_0_5px_#5A6BFF] hover:opacity-100
      `;

    case "ghost":
      return `flex items-center gap-2 rounded-lg transition
        bg-transparent p-1 text-muted hover:text-gray-700
      transition-all duration-300
      `;

    case "danger":
      return `
        px-4 py-2 rounded-xl bg-dangerous text-white
               hover:bg-hoverDangerous transition
                active:bg-activeDangerous
      `;
    case "outline":
      return `
        px-4 py-2 rounded-xl text-primary bg-none border-primary border-2
               hover:shadow-[inset_0_0_5px_0_#5A6BFF,0_0_5px_0_#5A6BFF]
                 hover:[text-shadow:0_0_5px_#5A6BFF]
 transition ease-in-out duration-150
      `;
    default:
      return "";
  }
});

</script>

<template>
  <component
    :is="isLink ? 'RouterLink' : 'button'"
    v-bind="isLink ? { to: props.to, ...$attrs } : {
      type: props.type || 'button', disabled: isDisabled, ...$attrs }"
    :class="variantClasses"
  >
    <VueFeather
      v-if="props.icon && props.iconPosition !== 'right'"
      :type="props.icon"
      class="w-4 h-4"
    />

    <span v-if="props.text">{{ props.text }}</span>

    <VueFeather
      v-if="props.icon && props.iconPosition === 'right'"
      :type="props.icon"
      class="w-4 h-4"
    />

    <VLoader
      v-if="props.loading"
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
