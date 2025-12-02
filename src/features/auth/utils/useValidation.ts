import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { computed } from "vue";

export function useValidation(form: any, type : "login" | "register") {
  const rules = computed(() =>  {
    if (type === "login") {
      return {
        email: { required, email },
        password: { required },
      };
    } else {
      return {
        username: { required },
        email: { required, email },
        password: { required },
        confirmPassword: { required },
      };
    }
  });
  const v$ = useVuelidate(rules, form);
  return { v$ };
};
