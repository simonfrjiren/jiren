<script setup lang="ts">
import { IUserProfile } from "~/services/api/auth/type";

definePageMeta({
  name: "User Profile",
  layout: "default",
});
useHead({
  title: "User Profile",
});
const { getUser } = useAuthStore();
</script>

<template>
  <UserProfileScreen :profile="getUser()" />
</template>
