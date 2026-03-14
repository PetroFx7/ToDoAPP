<script setup lang="ts">

import { computed } from "vue";
import { useRoute } from "vue-router";

import router from "@/app/router";
import VButton from "@/shared/ui/common/VButton.vue";
import { useUserProfileApi } from "@/widgets/Profile/api/useUserProfileRequest";
import AdminUserAction from "@/widgets/Profile/components/AdminUserAction.vue";
import ProfileHeader from "@/widgets/Profile/components/ProfileHeader.vue";
import ProfileOverview from "@/widgets/Profile/components/ProfileOverview.vue";

const route = useRoute();

const userId = computed(() => route.query.id as string | undefined);

const isOwnProfile = computed(() => !userId.value);

const { fetchTargetUser } = useUserProfileApi();

const { data: user } = fetchTargetUser(userId.value ?? "", {
  immediate: true,
});
const handleBack = () => {
  router.push("/users");
};
</script>

<template>
  <div class="px-8">
    <ProfileOverview v-if="isOwnProfile" />

    <div v-else>
      <div v-if="user">
        <VButton
          icon="arrow-left"
          text="All members"
          variant="ghost"
          class="my-3"
          @click="handleBack"
        />
        <ProfileHeader
          :name="user.name"
          :email=" user.email"
          :created-at="user.createdAt"
        />

        <AdminUserAction
          :user-id="user.id"
          :permissions="user.permissions"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
