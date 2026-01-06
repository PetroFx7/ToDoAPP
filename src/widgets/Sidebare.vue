<script setup lang="ts">
import VButton from "@/shared/ui/common/VButton.vue";

const props = defineProps<{
  isSideBarOpen : boolean;
}>();

const emit = defineEmits(["update:isSideBarOpen"]);

const hideSidebar = () => {
  emit("update:isSideBarOpen", !props.isSideBarOpen);
};
</script>

<template>
  <aside
    class="fixed top-0 left-0 h-full bg-gray-800 text-white
     p-4 shadow-md rounded-tr-lg rounded-br-lg"
    style="width: 16rem"
  >
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-xl font-bold" />
      <VButton
        icon="arrow-left"
        class="bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
        @click="hideSidebar"
      />
    </div>
    <nav>
      <ul>
        <li>
          <a
            href="#"
            class="block py-2 px-4 hover:bg-gray-700 gap-3 "
          >Dashboard</a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-4 hover:bg-gray-700 gap-3 "
          >Lists</a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-4 hover:bg-gray-700 gap-3 "
          >Analytics</a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-4 hover:bg-gray-700 gap-3 "
          >Profile</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
</style>
