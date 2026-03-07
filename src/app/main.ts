import { createApi, createApiClient, tokenManager } from "@ametie/vue-muza-use";
import { createPinia } from "pinia";
import { createApp } from "vue";
import VueFeather from "vue-feather";


import App from "./App.vue";
import router from "./router";

import "./main.scss";
import { useThemeStore } from "@/features/theme";

// Create Vue app instance
const app = createApp(App);

const api = createApiClient({
  baseURL: import.meta.env.VITE_API_URL,
  authOptions: {
    refreshUrl: "/auth/refresh",
    onTokenRefreshed: ({ data }) => tokenManager.setTokens({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }),
    refreshPayload: () => ({
      refreshToken: tokenManager.getRefreshToken(),
    }),
    onTokenRefreshFailed: () => {
      tokenManager.clearTokens();
      router.push("/auth");
    },
  },
});
// Install plugins
app.use(createPinia());
app.use(router);

// Register global component
app.component("VueFeather", VueFeather);

app.use(createApi({ axios: api }));

const themeStore = useThemeStore();
themeStore.initTheme();


// Mount the app
app.mount("#app");
