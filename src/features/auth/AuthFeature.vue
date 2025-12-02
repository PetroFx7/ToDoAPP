<script setup lang="ts">
import { ref, watch } from "vue";

import LoginForm from "@/features/auth/components/LoginForm.vue";
import RegisterForm from "@/features/auth/components/RegisterForm.vue";

const props = defineProps<{
  showLogin?: boolean;
  showRegister?: boolean;
}>();

const activeForm = ref<"login" | "register">(
  props.showRegister ? "register" : "login",
);

// Оновлення при зміні пропсів
watch(
  () => props.showLogin,
  (val) => {
    if (val) activeForm.value = "login";
  },
);

watch(
  () => props.showRegister,
  (val) => {
    if (val) activeForm.value = "register";
  },
);

const toggleForm = () => {
  activeForm.value =
      activeForm.value === "login" ? "register" : "login";
};
</script>

<template>
  <div>
    <LoginForm
      v-if="activeForm === 'login'"
      @switch="toggleForm"
    />

    <RegisterForm
      v-if="activeForm === 'register'"
      @switch="toggleForm"
    />
  </div>
</template>
