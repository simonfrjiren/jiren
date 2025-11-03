<script setup lang="ts">
import { fetchUserByUsername } from "~/services/api/auth/api";
import { IUserProfile } from "~/services/api/auth/type";

definePageMeta({
  name: "Account",
  layout: "default",
});
useHead({
  title: "User Profile",
});
const route = useRoute();
const profile = ref<IUserProfile | null>(null);
onMounted(async () => {
  if (route.params.username) {
    profile.value = await fetchUserByUsername(route.params.username as string);
  }
});
</script>

<template>
  <UserProfileScreen v-if="profile" :profile="profile" />
</template>
