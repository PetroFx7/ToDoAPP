<script setup lang="ts">
import { ref } from "vue";

import LoginForm from "@/features/auth/components/LoginForm.vue";
import RegisterForm from "@/features/auth/components/RegisterForm.vue";

const activeForm = ref<"login" | "register">("login");

</script>

<template>
  <LoginForm
    v-if="activeForm === 'login'"
    :active-form="activeForm"
    @change-form="activeForm = $event"
  />

  <RegisterForm
    v-else
    :active-form="activeForm"
    @change-form="activeForm = $event"
  />
</template>




