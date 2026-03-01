<script setup lang="ts">
import { formatShortDate } from "@/shared/utils/date";

type TableProps = {
  title?: string;
  columns: Array<{ label: string; field: string }>;
  data: Array<Record<string, any>>;
  striped?: boolean;
  hoverable?: boolean;
  expandable?: boolean;
  loading?: boolean;
  skeletonRows?: number;
};

const props = withDefaults(defineProps<TableProps>(), {
  loading: false,
  skeletonRows: 35,
});</script>

<template>
  <div>
    <slot name="toolbar" />

    <h2
      v-if="props.title"
      class="mb-4 text-lg font-semibold"
    >
      {{ props.title }}
    </h2>

    <table class="min-w-full border-collapse text-sm">
      <thead>
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.field"
            class="px-4 py-2 text-left font-medium bg-gray-100 border-b border-gray-300"
          >
            {{ column.label }}
          </th>
          <th
            class="px-4 py-2 text-right font-medium bg-gray-100 border-b border-gray-300 w-16"
          />
        </tr>
      </thead>

      <tbody v-if="props.loading">
        <tr
          v-for="rowIndex in props.skeletonRows"
          :key="rowIndex"
          class="animate-pulse"
        >
          <td
            v-for="column in props.columns"
            :key="column.field"
            class="px-4 py-2 border-b border-gray-200"
          >
            <div
              v-if="column.field === 'name'"
              class="flex flex-col gap-2"
            >
              <div class="h-6 w-48 rounded bg-gray-300" />
              <div class="h-4 w-64 rounded bg-gray-200" />
            </div>

            <div
              v-else
              class="h-6 w-40 rounded bg-gray-300"
            />
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr
          v-for="(row, rowIndex) in props.data"
          :key="rowIndex"
          class="border-b border-gray-200 transition-all duration-200
             hover:scale-[1.03] hover:shadow-lg hover:bg-gray-100"
        >
          <td
            v-for="column in props.columns"
            :key="column.field"
            class="px-4 py-2 text-gray-700"
          >
            <div
              v-if="column.field === 'name'"
              class="flex flex-col"
            >
              <span class="font-medium text-gray-900">{{ row.name }}</span>
              <span class="text-xs text-gray-500">{{ row.email }}</span>
            </div>

            <span v-else-if="column.field === 'createdAt'">
              {{ formatShortDate(row.createdAt) }}
            </span>

            <span v-else>
              {{ row[column.field] }}
            </span>
          </td>
          <td class="px-4 py-2 text-right relative">
            <slot
              name="actions"
              :row="row"
            >
              <button
                class="p-2 rounded hover:bg-gray-200 transition ьп "
              >
                ...
              </button>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
