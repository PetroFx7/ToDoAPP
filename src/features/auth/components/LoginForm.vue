<script setup lang="ts">

import { reactive } from "vue";
import { toast } from "vue-sonner";

import { useAuthStore } from "@/features/auth/store";
import { useValidation } from "@/features/auth/utils/useValidation";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VTab from "@/shared/ui/common/VTab.vue";

// const emit = defineEmits(["switch"]);
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
},
);

const { v$ } = useValidation(form, "login");

const handleLogin = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    return;
  }

  try {
    await authStore.login(form.email, form.password);
    console.log("login " + form.email + " " + form.password);
    toast.success("Login successful");

  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>

<template>
  <div class="flex flex-col gap-8 p-4 max-h-96 mx-auto">
    <Transition
      name="fade"
      appear
    >
      <VCard>
        <VTab />
        <template #header>
          Welcome back
        </template>


        <VInput
          v-model="form.email"
          label="Enter your email"
          type="email"
          placeholder="Email..."
        />

        <p
          v-for="error in v$.email.$errors"
          :key="error.$uid"
          class="text-red-800 text-sm"
        >
          {{ error.$message }}
        </p>
        <VInput
          v-model="form.password"
          label="enter your password"
          type="password"
          placeholder="Password"
        />
        <p
          v-for="error in v$.password.$errors"
          :key="error.$uid"
          class="text-red-800 text-sm"
        >
          {{ error.$message }}
        </p>
        <VButton
          text="Log in"
          type="submit"
          icon="log-in"
          class="w-full flex justify-center py-3 px-5 mt-4"
          @click="handleLogin"
        />
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
