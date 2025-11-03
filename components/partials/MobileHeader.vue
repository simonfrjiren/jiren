<script setup lang="ts">
import { PartialsRightSection } from "#components";
import Sheet from "../ui/sheet/Sheet.vue";
import SheetContent from "../ui/sheet/SheetContent.vue";
import SheetTrigger from "../ui/sheet/SheetTrigger.vue";
import MenuConversation from "./MenuConversation.vue";

const openLeftSheet = ref(false);
const openRightSheet = ref(false);
const onItemMenuClick = () => {
  openLeftSheet.value = !openLeftSheet.value;
};
const conversationStore = useConversationStore();
</script>

<template>
  <div class="flex items-center justify-between w-full h-[64px] lg:hidden">
    <Sheet v-model:open="openLeftSheet">
      <SheetTrigger>
        <div class="pl-4 py-2 cursor-pointer">
          <img alt src="/images/icon-menu.svg" />
        </div>
      </SheetTrigger>
      <SheetContent side="left" class="p-0">
        <MenuConversation @click="onItemMenuClick" />
      </SheetContent>
    </Sheet>
    <Sheet
      v-if="conversationStore.currentCharacter?.id"
      v-model:open="openRightSheet"
    >
      <SheetTrigger>
        <div class="pr-4 py-2 cursor-pointer">
          <img
              alt
            :src="conversationStore.currentCharacter?.avatar_url"
            class="w-[32px] h-[32px] rounded-full"
          />
        </div>
      </SheetTrigger>
      <SheetContent side="right" class="p-0 border-none">
        <PartialsRightSection />
      </SheetContent>
    </Sheet>
  </div>
</template>
