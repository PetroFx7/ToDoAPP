import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs, minLength, helpers } from "@vuelidate/validators";
import { computed } from "vue";

export function useValidation(form: any, type : "login" | "register") {
  const rules = computed(() =>  {
    if (type === "login") {
      return {
        email: {
          required: helpers.withMessage("Email is required", required),
          email: helpers.withMessage("Invalid email format", email),
        },
        password: {
          required: helpers.withMessage("Password is required", required),
        },
      };
    } else {
      return {
        username: {
          required: helpers.withMessage("Username is required", required),
        },
        email: {
          required: helpers.withMessage("Email is required", required),
          email: helpers.withMessage("Invalid email format", email),
        },
        password: {
          required: helpers.withMessage("Password id required", required),
          minLength: helpers.withMessage("Password must be at least 8 characters", minLength(8)),
        },
        confirmPassword: {
          required: helpers.withMessage("Please confirm your password", required),
          sameAs: helpers.withMessage("Password do not match", sameAs(form.password)),
        },
      };
    }
  });
  const v$ = useVuelidate(rules, form);
  return { v$ };
};
