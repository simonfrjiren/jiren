<script setup lang="ts">
import { UserUpdateForm } from "#components";
import { getUserInfo } from "~/services/api/auth/api";

definePageMeta({
  guest: true,
  name: "Authorization",
  layout: "default",
});
useHead({
  title: "Authorization",
});

const { handleSignMessageAndLinkWallet } = useSolConnect();
const { query } = useRoute();
const authStore = useAuthStore();
const { getUser, setUser } = useAuthStore();

// onMounted(() => {
//   if (authStore.getAccessToken()) {
//     navigateTo((query.redirect as string) || "/");
//   }
// });

async function onLoginSuccess(address?: string) {
  //   navigateTo("/c");
  if (address) {
    const access_token = await handleSignMessageAndLinkWallet();
    if (access_token) {
      authStore.setAccessToken(access_token);
      const user = await getUserInfo();
      if (user) {
        setUser(user);
        user.name
          ? navigateTo((query.redirect as string) || "/character/explore")
          : navigateTo(
              `/user/edit?redirect=${query.redirect || "/character/explore"}`
            );
      }
    }
  }
}
</script>

<template>
  <section
    class="relative flex flex-col w-full h-full items-center justify-center"
  >
    <div
      class="flex flex-col items-center justify-center rounded-[16px] mx-4 px-6 py-10 lg:px-[144px] lg:py-[80px] bg-[url(/images/item-background-form.png)] bg-no-repeat bg-cover"
    >
      <div class="flex flex-col items-center justify-center space-y-10">
        <div class="row-center">
          <img src="/images/icon-logo-row.svg " class="h-[40px] lg:h-[80px]" />
        </div>
        <div class="text-center">
          <p class="text-[24px] font-[600]">Connect Wallet</p>
          <p class="text-[#cacaca]">
            Get started by connecting your preferred wallet below
          </p>
        </div>
        <div class="mt-10 w-full">
          <PartialsBtnPhantomConnect @change="onLoginSuccess" class="w-full">
            <base-button-row
              text="Phantom"
              icon="/images/icon-logo-phantom.svg"
              class="w-full cursor-pointer"
            >
              <template #right>
                <NuxtIcon name="icon-arrow-right" />
              </template>
            </base-button-row>
          </PartialsBtnPhantomConnect>
          <base-button-row
            text="More Option"
            icon="/images/icon-user-profile.svg"
            class="w-full cursor-pointer mt-6"
          >
            <template #right>
              <div
                class="text-[#e0e0e0] bg-[#08080A] py-[6px] px-[8px] rounded-full"
              >
                Coming soon
              </div>
            </template>
          </base-button-row>
        </div>
      </div>
    </div>
    <img
      src="/images/item-background-login.png"
      class="absolute w-full h-full z-[-1] bg-cover"
    />
  </section>
</template>
