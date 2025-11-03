<script setup lang="ts">
import { getSolBalance } from "~/services/solana/utils";

const { getUser, logOut } = useAuthStore();

const openPopup = ref(false);
const openAccount = ref(false);

function onViewAccount() {
  navigateTo("/user/profile");
}
</script>

<template>
  <div v-if="getUser().id" class="w-full">
    <Popover v-model:open="openPopup">
      <PopoverTrigger
        class="flex flex-col justify-center items-center py-3 w-full bg-[#2B2B2D] text-start px-4 font-[600] overflow-hidden row-center cursor-pointer"
      >
        <UserAvatar
          :url="getUser().avatar_url"
          :name="getUser().name"
          :size="36"
        />
        <span class="flex-1 ml-2">
          {{ getUser()?.name }}
        </span>
        <NuxtIcon
          name="icon-arrow-right"
          class="text-[16px] text-[#a2a2a2] rotate-[-90deg]"
        />
      </PopoverTrigger>
      <PopoverContent>
        <div class="py-4 px-6 w-[75vw] max-w-[384px] lg:w-64">
          <section
            class="text-[#CACACA] rounded-[20px] overflow-hidden border-[1px] border-[#ffffff33] bg-[#131316]"
          >
            <div class="p-3 row-center">
              <UserAvatar
                :url="getUser().avatar_url"
                :size="36"
                :name="getUser().name"
              />
              <span class="flex-1 truncate ml-2">
                {{ getUser()?.name }}
              </span>
            </div>

            <div class="space-y-2">
              <div
                class="py-1 px-3 cursor-pointer row-center hover:bg-[#232323]"
                @click="onViewAccount"
              >
                View Account
              </div>
              <div
                class="py-1 px-3 cursor-pointer row-center hover:bg-[#232323]"
                @click="logOut"
              >
                Logout
              </div>
            </div>
          </section>
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
