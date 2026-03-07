<script setup lang="ts">

import { ref } from "vue";

import useProfileRequest from "@/features/profile/api/useProfileRequest";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import VButton from "@/shared/ui/common/VButton.vue";
import VContainer from "@/shared/ui/common/VContainer.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import { formatShortDate } from "@/shared/utils/date";

const authStore = useAuthStore();
const { updateOwnProfile } = useProfileRequest();


const form = ref({
  name: authStore.userData.name,
  email: authStore.userData.email,
});

const { execute: updateProfile, loading } = updateOwnProfile();

const handleUpdateProfile = async () => {
  try {
    const updatedUser = await updateProfile({
      data: {
        name: form.value.name,
        // email: form.value.email,
      },
    });

    authStore.setUser(updatedUser);


  } catch (error) {
    console.error("Update failed", error);
  }
};

</script>

<template>
  <div class="px-5">
    <h1 class="text-2xl font-semibold my-3 text-txtPrimary">
      Profile Overview
    </h1>
    <div>
      <VContainer class="relative">
        <h2 class="text-xl font-bold mb-2 text-txtPrimary">
          {{ authStore.userData.name }}
        </h2>

        <p class="text-secondary">
          {{ authStore.userData.email }}
        </p>

        <p
          class="
      absolute
      top-4
      right-4
      text-secondary
      text-sm
    "
        >
          Member since: {{ formatShortDate(authStore.userData.createdAt) }}
        </p>
      </VContainer>
    </div>
    <h1 class="text-2xl font-semibold my-5 text-txtPrimary">
      Account Details
    </h1>
    <VContainer class="relative">
      <VInput
        v-model="form.name"
        label="Name"
        class="v-input"
      />
      <VInput
        v-model="form.email"
        label="Email (Coming soon)"
        class="v-input"
        :disabled="true"
      />
      <VButton
        class="w-[15%]"
        text="Save changes"
        :loading="loading"
        @click="handleUpdateProfile"
      />
    </VContainer>
    <h1 class="text-2xl font-semibold my-5 text-txtPrimary ">
      Change Password  (Coming soon)
    </h1>
    <VContainer class="relative">
      <VInput
        type="password"
        label="Current Password "
        class="v-input"
        :disabled="true"
      />
      <VInput
        type="password"
        label="New Password"
        class="v-input"
        :disabled="true"
      />
      <VInput
        type="password"
        label="Confirm New Password"
        class="v-input"
        :disabled="true"
      />
      <VButton
        class="w-[15%]"
        text="Change Password"
        :disabled="true"
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
