<script setup lang="ts">
import { UserUpdateForm } from "#components";
import { toast } from "~/components/ui/toast";

definePageMeta({
  name: "Edit Profile",
  layout: "default",
});
useHead({
  title: "Edit Profile",
});

const route = useRoute();
const router = useRouter();

async function onUpdated() {
  toast({
    description: "Update profile successfully",
    duration: 3000,
  });
  if (route.query.redirect) {
    return navigateTo(route.query.redirect as string);
  }
  router.back();
}
</script>

<template>
  <section
    class="relative flex flex-col w-full h-full items-center justify-center"
  >
    <div
      class="flex flex-col items-center justify-center rounded-[16px] mx-4 py-10 lg:px-[144px] lg:py-[80px] bg-[url(/images/item-background-form.png)] bg-no-repeat bg-cover"
    >
      <div class="flex flex-col items-center justify-center space-y-10">
        <UserUpdateForm @updated="onUpdated" />
      </div>
    </div>
    <img
      src="/images/item-background-login.png"
      class="absolute w-full h-full z-[-1] bg-cover"
    />
  </section>
</template>
