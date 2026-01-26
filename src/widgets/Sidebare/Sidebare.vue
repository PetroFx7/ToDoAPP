<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

import VButton from "@/shared/ui/common/VButton.vue";

const props = defineProps<{
  isSideBarOpen: boolean;
}>();

const emit = defineEmits(["update:isSideBarOpen"]);


const toggleSidebar = () => {
  emit("update:isSideBarOpen", !props.isSideBarOpen);
};

const route = useRoute();

const isActive = (path: string) => route.path === path;


</script>

<template>
  <aside
    class="fixed top-0 left-0 h-screen bg-gray-800 text-white
           transition-[width] duration-300 ease-in-out
           overflow-hidden z-50"
    :class="isSideBarOpen ? 'w-64' : 'w-16'"
  >
    <div class="relative h-14">
      <VButton
        :icon="isSideBarOpen ? 'arrow-left' : 'arrow-right'"
        class="absolute top-1/2 -translate-y-1/2
               bg-gray-800 text-white hover:bg-gray-700
               transition-all duration-300"
        :class="isSideBarOpen ? 'right-4' : 'left-1/2 -translate-x-1/2'"
        @click="toggleSidebar"
      />
    </div>

    <nav class="mt-4">
      <ul class="space-y-1">
        <li>
          <RouterLink
            to="/"
            class="nav-item"
            :class="isActive('/') ? 'bg-gray-900 font-bold' : ''"
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

        <li>
          <RouterLink
            to="/lists"
            class="nav-item"
            :class="isActive('/lists') ? 'bg-gray-900 font-bold' : ''"
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

        <li>
          <RouterLink
            to="/analytics"
            class="nav-item"
            :class="isActive('/analytics') ? 'bg-gray-900 font-bold' : ''"
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
            class="nav-item"
            :class="isActive('/profile') ? 'bg-gray-900 font-bold' : ''"
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

        <li>
          <RouterLink
            to="/users"
            class="nav-item"
            :class="isActive('/users') ? 'bg-gray-900 font-bold' : ''"
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
  </aside>
</template>

<style scoped>
.nav-item {
  @apply flex items-center gap-3 px-3 py-2 rounded-md
  hover:bg-gray-700 transition-colors;
}

.sidebar-text {
  @apply overflow-hidden whitespace-nowrap
  transition-all duration-200;
}
</style>
