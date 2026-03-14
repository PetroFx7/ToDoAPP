<script setup lang="ts">

const props = defineProps<{
  title?: string;

}>();
</script>

<template>
  <div class="box flex justify-between items-center py-4 px-3 w-full ">
    <h1 class="text-2xl font-bold text-txtPrimary">
      {{ props.title }}
    </h1>
    <slot />
  </div>
</template>

<style scoped>
.box {
  border: 2px solid transparent;
  border-radius: 12px;

  background:
      linear-gradient(var(--color-secondaryBg), var(--color-secondaryBg)) padding-box,
      linear-gradient(90deg, #3e0da8, #5f86ef) border-box;
}
</style>
