import { createPinia } from "pinia";
import { createApp } from "vue";
import VueFeather from "vue-feather";

import App from "./App.vue";
import router from "./router";

import "./main.scss";
import { setupApiClient } from "@/shared/api";

// Create Vue app instance
const app = createApp(App);

// Install plugins
app.use(createPinia());
app.use(router);

// Register global component
app.component("VueFeather", VueFeather);

setupApiClient({
  onTokenRefreshFailed: () => {
    const currentRoute = router.currentRoute.value;

    if (currentRoute.name !== "Auth") {
      router.push({
        name: "Auth",
        // query: { redirect: currentRoute.fullPath },
      });
    }
  },
});
// Mount the app
app.mount("#app");
