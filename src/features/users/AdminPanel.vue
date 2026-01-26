<script setup lang="ts">
import { ref } from "vue";

import UsersList from "@/features/users/components/UsersList.vue";
import { SortFilterMode, UsersFilterMode } from "@/features/users/types";
import VInput from "@/shared/ui/common/VInput.vue";
import VMultiSelect from "@/shared/ui/common/VMultiSelect.vue";

const search = ref("");
const selectedRole = ref<UsersFilterMode>("all");
const sortOrder = ref<SortFilterMode>("newest");

const roleOptions = [
  { value: "all", label: "All roles" },
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" },
];

const sortOptions = [
  { value: "newest", label: "New first" },
  { value: "oldest", label: "Old first" },
];
</script>

<template>
  <div class="p-7">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      User Management
    </h1>

    <div class="flex flex-сol md:flex-row gap-4 mb-6 md:items-end">
      <div class="md:w-[320px]">
        <VInput
          v-model="search"
          placeholder="Search by name or email"
        />
      </div>

      <div class="md:w-[200px]">
        <VMultiSelect
          id="single-select-object"
          v-model="selectedRole"
          :options="roleOptions"
          label="Role"
          label-key="label"
          track-key="value"
          :return-object="false"
        />
      </div>
      <div class="md:w-[200px]">
        <VMultiSelect
          id="single-select-object"
          v-model="sortOrder"
          :options="sortOptions"
          label="Date"
          label-key="label"
          track-key="value"
          :return-object="false"
        />
      </div>
    </div>

    <UsersList
      :search="search"
      :role="selectedRole"
      :sort-order="sortOrder"
    />
  </div>
</template>
