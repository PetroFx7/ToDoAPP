<script setup lang="ts">
import { reactive } from "vue";
import { toast } from "vue-sonner";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useValidation } from "@/features/auth/utils/useValidation";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VTab from "@/shared/ui/common/VTab.vue";

const props = defineProps<{
  activeForm: "login" | "register";
}>();

const emit = defineEmits<{
  "change-form": ["login" | "register"];
}>();

const tabs = [
  { label: "Log In", value: "login" },
  { label: "Sign Up", value: "register" },
];
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
    await authStore.login(form.email, form.password, {
      onSuccess: () => toast.success("Login successful"),
      onError: () => toast.error("Login failed"),
    });

  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <Transition
    name="fade"
    appear
  >
    <VCard>
      <template #tabs>
        <VTab
          :model-value="props.activeForm"
          :tabs="tabs"
          @update:model-value="emit('change-form', $event)"
        />
      </template>
      <template #header>
        Welcome back
      </template>

      <VInput
        v-model="form.email"
        label="Email"
        placeholder="Enter your email"
      />

      <p
        v-for="error in v$.email.$errors"
        :key="error.$uid"
        class="text-red-600 text-sm"
      >
        {{ error.$message }}
      </p>

      <VInput
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

      <p
        v-for="error in v$.password.$errors"
        :key="error.$uid"
        class="text-red-600 text-sm"
      >
        {{ error.$message }}
      </p>

      <VButton
        text="Log In"
        class="w-full py-3 mt-4 rounded-xl bg-neutral-800 text-white hover:bg-neutral-900"
        @click="handleLogin"
      />
    </VCard>
  </Transition>
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
