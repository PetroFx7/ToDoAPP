<script lang="ts" setup>

type CardProps = {
  title?: string;
};

const props = defineProps<CardProps>();
</script>

<template>
  <div class="bg-white rounded-2xl shadow-md py-12 px-10 gap-8">
    <div
      v-if="$slots.header || props.title"
      class="flex items-center justify-center w-full mb-4 text-5xl  font-semibold"
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

