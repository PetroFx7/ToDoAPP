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
  variant?: "primary" | "danger" | "ghost";
  loading?: boolean;
  size?: "sm" | "md" | "lg";
};

const props = defineProps<ButtonProps>();

const isLink = computed(() => !!props.to);

const isDisabled = computed(() => props.disabled || props.loading);

</script>

<template>
  <component
    :is="isLink ? 'RouterLink' : 'button'"
    v-bind="isLink ? { to: props.to, ...$attrs } : {
      type: props.type || 'button', disabled: isDisabled, ...$attrs }"
    class="flex items-center gap-2 rounded-lg transition "
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
