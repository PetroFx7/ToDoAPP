<script setup lang="ts">
import { ref } from "vue";

import LoginForm from "@/features/auth/components/LoginForm.vue";
import RegisterForm from "@/features/auth/components/RegisterForm.vue";

const activeForm = ref<"login" | "register">("login");

const toggleForm = () => {
  activeForm.value = activeForm.value === "login" ? "register" : "login";
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
