<script lang="ts" setup>

type CardProps = {
  title?: string;
};

const props = defineProps<CardProps>();
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md p-4">
    <div
      v-if="$slots.header || props.title"
      class="mb-2 pb-2 font-semibold border-b justify-center flex text-md"
    >
      <slot name="header">
        {{ props.title }}
      </slot>
    </div>

    <div class="mb-2  pb-2 font-semibold">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="mt-3 pt-2  text-sm text-gray-500"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

