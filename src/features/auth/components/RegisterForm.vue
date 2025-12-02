<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue-sonner";

import { useAuthStore } from "@/features/auth/store";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VInput from "@/shared/ui/common/VInput.vue";

const username = ref("");
const email = ref("");
const password = ref("");

const emit = defineEmits(["switch"]);
const authStore = useAuthStore();
const handleRegister = async () => {
  try {
    await authStore.register(username.value, email.value, password.value);
    toast.success("Registration successful");
  } catch (error) {
    console.error("Register failed:", error);
    toast.error("Registration failed");
  }
};
</script>

<template>
  <div>REGISTER FORM</div>
  <div class="flex flex-col gap-8 p-4 max-w-sm mx-auto">
    <Transition
      name="fade"
      appear
    >
      <VCard>
        <template #header>
          Create a new account
        </template>
        <template #default>
          <VInput
            v-model="username"
            label="Enter your username"
            type="text"
            placeholder="Username..."
          />
          <VInput
            v-model="email"
            label="Enter your email"
            type="email"
            placeholder="Email..."
          />
          <VInput
            v-model="password"
            label="Enter your password"
            type="password"
            placeholder="Password"
          />
          <div class="flex justify-end mt-4 gap-2">
            <VButton
              text="Login"
              icon="log-in"
              :negative="true"
              @click="emit('switch')"
            />
            <VButton
              text="Register"
              type="submit"
              icon="user-plus"
              @click="handleRegister"
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
