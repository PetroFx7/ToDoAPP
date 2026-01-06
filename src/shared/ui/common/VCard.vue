<script lang="ts" setup>
type CardProps = {
  title?: string;
};

const props = defineProps<CardProps>();
</script>

<template>
  <div
    class="w-[420px] bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col
    "
  >
    <div
      v-if="$slots.tabs"
      class="mb-6"
    >
      <slot name="tabs" />
    </div>
    <div
      v-if="$slots.header || props.title"
      class="mb-8 text-5xl font-bold text-center ds"
    >
      <slot name="header">
        {{ props.title }}
      </slot>
    </div>

    <div class="flex flex-col gap-4">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="mt-6 text-sm text-gray-500 text-center"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
