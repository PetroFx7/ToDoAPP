<script setup lang="ts">

import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VInput from "@/shared/ui/common/VInput.vue";
</script>

<template>
  <div>LOGIN FORM</div>
  <div class="flex flex-col gap-8 p-4 max-w-sm mx-auto">
    <Transition
      name="fade"
      appear
    >
      <VCard>
        <template #header>
          Welcome back! please login to your account.
        </template>
        <template #default>
          <VInput
            label="Enter your email"
            type="email"
            placeholder="Email..."
          />
          <VInput
            label="enter your password"
            type="password"
            placeholder="Password"
          />
          <div class="flex justify-end mt-4">
            <VButton
              text="Log in"
              type="submit"
              icon="log-in"
            />
          </div>
        </template>
      </VCard>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
