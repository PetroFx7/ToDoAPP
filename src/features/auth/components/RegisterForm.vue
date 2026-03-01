<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useValidation } from "@/features/auth/utils/useValidation";
import VButton from "@/shared/ui/common/VButton.vue";
import VCard from "@/shared/ui/common/VCard.vue";
import VInput from "@/shared/ui/common/VInput.vue";
import VTab from "@/shared/ui/common/VTab.vue";

const router = useRouter();
const route = useRoute();

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
  username: "",
  confirmPassword: "",
},
);

const { v$ } = useValidation(form, "register");

const handleRegister = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    await authStore.register(form.username, form.email, form.password, {
      onSuccess: async () => {
        toast.success("Registration successful");

        const redirectTo = (route.query.redirect as string) || "/";
        await router.push(redirectTo);
      },
      onError: () => toast.error("Registration failed"),
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
        Create your account
      </template>
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

      <VButton
        text="Register"
        class="w-full py-3 mt-4 rounded-xl bg-neutral-800 text-white hover:bg-neutral-900"
        @click="handleRegister"
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
