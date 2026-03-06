<script setup lang="ts">

import { useAuthStore } from "@/shared/stores/useAuthStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import { formatShortDate } from "@/shared/utils/date";

const authStore = useAuthStore();


</script>

<template>
  <div class="px-5">
    <h1 class="text-2xl font-semibold my-3">
      Profile Overview
    </h1>
    <div>
      <VContainer class="relative">
        <h2 class="text-xl font-bold mb-2">
          {{ authStore.userData.name }}
        </h2>

        <p class="text-[var(--color-secondary)]">
          {{ authStore.userData.email }}
        </p>

        <p
          class="
      absolute
      top-4
      right-4
      text-[var(--color-secondary)]
      text-sm
    "
        >
          Member since: {{ formatShortDate(authStore.userData.createdAt) }}
        </p>
      </VContainer>
    </div>
    <h1 class="text-2xl font-semibold my-5 ">
      Account Details
    </h1>
    <VContainer class="relative">
      <VInput
        v-model="authStore.userData.name"
        label="Name"
        class="v-input"
      />
      <VInput
        v-model="authStore.userData.email"
        label="Email"
        class="v-input"
      />
      <VButton
        class="w-[15%]"
        text="Save changes"
        @click="authStore.updateUser()"
      />
    </VContainer>
    <h1 class="text-2xl font-semibold my-5 ">
      Change Password
    </h1>
    <VContainer class="relative">
      <VInput
        type="password"
        label="Current Password"
        class="v-input"
      />
      <VInput
        type="password"
        label="New Password"
        class="v-input"
      />
      <VInput
        type="password"
        label="Confirm New Password"
        class="v-input"
      />
      <VButton
        class="w-[15%]"
        text="Change Password"
      />
    </VContainer>
  </div>
</template>

<style scoped>
p { margin: 0.3rem 0; }
.v-input{
  max-width: 400px;
  margin-bottom: 16px;
}
</style>
