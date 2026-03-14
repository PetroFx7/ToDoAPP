<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

import { ThemeToggle } from "@/features/theme";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import VButton from "@/shared/ui/common/VButton.vue";

const props = defineProps<{
  isSideBarOpen: boolean;
}>();

const emit = defineEmits(["update:isSideBarOpen"]);

const toggleSidebar = () => {
  emit("update:isSideBarOpen", !props.isSideBarOpen);
};

const route = useRoute();
const authStore = useAuthStore();

const logOutUser = () => {
  authStore.logOutUser();
};

const isActive = (path: string) => route.path === path;

const hasPermissions = (permissions: string) => {
  return authStore.userData?.permissions.includes(permissions);
};
const sidebarItemClass = (path?: string) => [
  "nav-item",
  path && isActive(path) && "activeSidebarItem",
  props.isSideBarOpen ? "mx-4 gap-2" : "closeSidebarItem",
];

</script>

<template>
  <aside
    class="fixed top-0 left-0 h-screen flex flex-col
          text-white
         transition-[width] duration-300 ease-in-out
         overflow-hidden z-50 sidebar-bg rounded-r-lg"
    :class="isSideBarOpen ? 'w-64' : 'w-18'"
  >
    <div class="relative h-14">
      <VButton
        :icon="isSideBarOpen ? 'arrow-left' : 'arrow-right'"
        class="absolute top-1/2 -translate-y-1/2"
        variant="ghost"
        :class="isSideBarOpen ? 'right-4' : 'left-1/2 -translate-x-1/2'"
        @click="toggleSidebar"
      />
    </div>

    <nav class="flex-1">
      <ul class="space-y-1 ">
        <li v-if="hasPermissions('read:dashboard')">
          <RouterLink
            to="/"
            :class="sidebarItemClass('/')"
          >
            <vue-feather type="home" />
            <span
              class="sidebar-text"
              :class="isSideBarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'"
            >
              Dashboard
            </span>
          </RouterLink>
        </li>

        <li v-if="hasPermissions('read:list')">
          <RouterLink
            to="/lists"
            :class="sidebarItemClass('/lists')"
          >
            <vue-feather type="list" />
            <span
              class="sidebar-text"
              :class="isSideBarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'"
            >
              Lists
            </span>
          </RouterLink>
        </li>

        <li v-if="hasPermissions('read:analytics')">
          <RouterLink
            to="/analytics"
            :class="sidebarItemClass('/analytics')"
          >
            <vue-feather type="bar-chart-2" />
            <span
              class="sidebar-text"
              :class="isSideBarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'"
            >
              Analytics
            </span>
          </RouterLink>
        </li>

        <li>
          <RouterLink
            to="/profile"
            :class="sidebarItemClass('/profile')"
          >
            <vue-feather type="user" />
            <span
              class="sidebar-text"
              :class="isSideBarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'"
            >
              Profile
            </span>
          </RouterLink>
        </li>

        <li v-if="hasPermissions('read:users')">
          <RouterLink
            to="/users"
            :class="sidebarItemClass('/users')"
          >
            <vue-feather type="settings" />
            <span
              class="sidebar-text"
              :class="isSideBarOpen ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'"
            >
              Admin Panel
            </span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <ThemeToggle />

    <div class="mb-4 mx-4">
      <VButton
        :text="isSideBarOpen ? 'Log out' : ''"
        icon="log-out"
        :class="['nav-item w-full',
                 isSideBarOpen ? 'gap-2' : 'closeSidebarItem']"
        variant="ghost"
        @click="logOutUser"
      />
    </div>
  </aside>
</template>

<style scoped>
.nav-item {
  @apply relative flex items-center px-4 py-3  rounded-lg
    hover:bg-borderDefaultDark transition-colors duration-200
  whitespace-nowrap text-sideBarTxt hover:text-txtPrimaryDark text-uiBtn leading-none
  active:bg-sidebarActive;
  transition-property: margin, gap;
  transition-duration: 300ms;
  transition-timing-function: ease-in-out;
}

.sidebar-text {
  @apply overflow-hidden whitespace-nowrap transition-all duration-200;
}

.sidebar-bg {
  background:
      linear-gradient(to top, rgba(255,255,255,0.1) 0%, transparent 10%),
      linear-gradient(to top, #101624 0%, #192132 10%),
   linear-gradient(to top, #FFFFFF1A 10%, #00000000 0%),
   linear-gradient(to top, #00000000 0%, #4A76FF40 25%),
   linear-gradient(to top, #FFFFFF1A 10%, #00000000 0%),
   linear-gradient(to top, #00000000 0%, #4A76FF26 15%);
  box-shadow: 0px 0px 15px 0px #3121BF66;
}

.activeSidebarItem {
  @apply bg-sidebarActive font-bold shadow-md shadow-sidebarActive;
}
.closeSidebarItem {
  @apply gap-0  justify-center px-0 ;
}
</style>
