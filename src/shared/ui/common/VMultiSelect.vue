<script setup lang="ts">
import { defineProps, ref } from "vue";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

type TaggingProps<T = any> = {
  modelValue: T | T[];
  options: T[];
  labelKey?: keyof T;
  trackKey?: keyof T;
  placeholder?: string;
  tagPlaceholder?: string;
  label?: string;
  id: string;
};

const props = defineProps<TaggingProps>();

const value = ref(props.modelValue || []);
const options = ref(props.options || []);

function addTag(newTag: string) {
  const tag = {
    name: newTag,
    code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
  };

  options.value.push(tag);
  value.value.push(tag);
}

const model = defineModel<{ label: string, value: string }>();
</script>

<template>
  <div class="flex items-center gap-3">
    <label
      v-if="props.label"
      :for="props.id"
      class="typo__label whitespace-nowrap text-txtPrimary"
    >
      {{ props.label }}
    </label>

    <Multiselect
      v-bind="$attrs"
      :id="props.id"
      v-model="model"
      :options="options"
      :placeholder="props.placeholder"
      :tag-placeholder="props.tagPlaceholder"
      :label="props.labelKey"
      :track-by="props.trackKey"
      @tag="addTag"
    />
  </div>
</template>


<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
:deep(.multiselect) {
  @apply relative h-10 cursor-pointer;
}

:deep(.multiselect--active) {
  @apply rounded-none;
}

:deep(.multiselect__single) {
  @apply truncate bg-secondaryBg text-txtPrimary;
}

:deep(.multiselect__tags) {
  @apply pr-10 rounded-lg border-2 bg-secondaryBg
  border-borderDefault hover:border-borderHover ;
}

:deep(.multiselect--active .multiselect__tags) {
  @apply rounded-lg border-primary ;
}

:deep(.multiselect__content-wrapper) {
  @apply absolute left-0 mt-1 z-[100]
  bg-secondaryBg
  rounded-lg
  border-borderDefault hover:border-borderHover
  drop-shadow-primary shadow-xl
  overflow-y-auto max-h-[500px];
}

:deep(.multiselect__option--highlight) {
  @apply bg-transparent text-txtPrimary;
}

:deep(.multiselect__option--selected) {
  @apply bg-transparent text-primary font-medium;
}

:deep(.multiselect__option::after),
:deep(.multiselect__option::before) {
  display: none;
}

.caret-click-zone {
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
}

.icon {
  transition: transform 0.2s ease-in-out;
  transform: rotate(0deg);
}

.icon.is-active {
  transform: rotate(180deg);
}

</style>
