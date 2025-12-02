<script setup lang="ts">

import { ref } from "vue";
import { toast } from "vue-sonner";

import { useAuthStore } from "@/features/auth/store";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const email = ref("");
const password = ref("");

const emit = defineEmits(["switch"]);
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    console.log("login " + email.value + " " + password.value);
    toast.success("Login successful");

  } catch (error) {
    console.error("Login failed:", error);
  }
};
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
            v-model="email"
            label="Enter your email"
            type="email"
            placeholder="Email..."
          />
          <VInput
            v-model="password"

            label="enter your password"
            type="password"
            placeholder="Password"
          />
          <div class="flex justify-end mt-4 gap-2">
            <VButton
              text="Create an account"
              icon="user-plus"
              class="bg-green-500 hover:bg-green-600"
              @click="emit('switch')"
            />
            <VButton
              text="Log in"
              type="submit"
              icon="log-in"
              @click="handleLogin"
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
