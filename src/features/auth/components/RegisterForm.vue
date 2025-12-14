<script setup lang="ts">
import { reactive } from "vue";
import { toast } from "vue-sonner";

import { useAuthStore } from "@/features/auth/store";
import { useValidation } from "@/features/auth/utils/useValidation";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VInput from "@/shared/ui/common/VInput.vue";


const emit = defineEmits(["switch"]);
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
},
);

const { v$ } = useValidation(form, "register");

const handleRegister = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }
  try {
    await authStore.register(form.username, form.email, form.password);
    toast.success("Registration successful");
  } catch (error) {
    console.error("Register failed:", error);
    toast.error("Registration failed");
  }
};
</script>

<template>
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
            v-model="form.username"
            label="Enter your username"
            type="text"
            placeholder="Username..."
          />
          <p
            v-for="error in v$.username.$errors"
            :key="error.$uid"
            class="text-red-500 text-sm"
          >
            {{ error.$message }}
          </p>
          <VInput
            v-model="form.email"
            label="Enter your email"
            type="email"
            placeholder="Email..."
          />
          <p
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            class="text-red-500 text-sm"
          >
            {{ error.$message }}
          </p>
          <VInput
            v-model="form.password"
            label="Enter your password"
            type="password"
            placeholder="Password"
          />
          <p
            v-for="error in v$.password.$errors"
            :key="error.$uid"
            class="text-red-500 text-sm"
          >
            {{ error.$message }}
          </p>
          <VInput
            v-model="form.confirmPassword"
            label="Confirm your password"
            type="password"
            placeholder="Confirm Password"
          />
          <p
            v-for="error in v$.confirmPassword.$errors"
            :key="error.$uid"
            class="text-red-500 text-sm"
          >
            {{ error.$message }}
          </p>
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
