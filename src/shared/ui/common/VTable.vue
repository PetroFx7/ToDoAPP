<script setup lang="ts">
type TableProps = {
  title?: string;
  columns: Array<{ label: string; field: string }>;
  data: Array<Record<string, any>>;
  striped?: boolean;
  hoverable?: boolean;
  expandable?: boolean;

};

const props = defineProps<TableProps>();
// const emit = defineEmits([]);

</script>

<template>
  <div>
    <h2
      v-if="props.title"
      class="text-lg font-semibold mb-4"
    >
      {{ props.title }}
    </h2>
    <table class="min-w-full border-collapse">
      <thead>
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.field"
            class="border-b px-4 py-2 text-left bg-gray-100"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in props.data"
          :key="rowIndex"
          :class="[
            props.striped && rowIndex % 2 === 1 ? 'bg-gray-50' : '',
            props.hoverable ? 'hover:bg-gray-100 cursor-pointer' : ''
          ]"
        >
          <td
            v-for="column in props.columns"
            :key="column.field"
            class="border-b px-4 py-2"
          >
            {{ row[column.field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
