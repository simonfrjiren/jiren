<script setup lang="ts">
import { ICharacter } from "~/services/api/chat/type";

const props = defineProps<{ item: ICharacter }>();
const openPopup = ref(false);
const openDelete = ref(false);
const existed = ref(true);
const { getUser } = useAuthStore();

function editClick() {
  openPopup.value = false;
  navigateTo(`/character/${props.item.id}/edit`);
}

function deleteClick() {
  openPopup.value = false;
  setTimeout(() => {
    openDelete.value = true;
  }, 200);
}

function onDeleted() {
  existed.value = false;
}

function itemClick() {
  navigateTo(`/character/${props.item.id}/chat`);
}
</script>

<template>
  <div v-if="existed" class="row-center px-3 cursor-pointer">
    <img
      :src="item.avatar_url || '/images/icon-logo-mask.svg'"
      class="w-[100px] h-[100px] rounded-[12px]"
      @click="itemClick"
    />
    <div class="ml-2 flex-1" @click="itemClick">
      <p class="text-[16px] text-[#fafafa]">{{ item.name }}</p>
      <p class="text-[14px] text-[#A2A2AC] mt-1 line-clamp-2">
        {{ item.metadata?.tagline }}
      </p>
      <div class="row-center flex-wrap gap-2 mt-2">
        <div
          v-for="tag in item.metadata.tags"
          class="py-1 px-3 rounded-full bg-[#26272B]"
        >
          {{ tag }}
        </div>
      </div>
      <div v-if="item.conversations_count > 0" class="row-center mt-2">
        <img src="/images/icon-chat.svg" />
        <p class="ml-2 text-[10px] text-[#A2A2AC]">
          {{ formatNumber(item.conversations_count) }}
        </p>
      </div>
    </div>
    <Popover v-if="getUser().id === item.creator.id" v-model:open="openPopup">
      <PopoverTrigger class="p-2 cursor-pointer">
        <NuxtIcon name="icon-option" />
      </PopoverTrigger>
      <PopoverContent
        class="bg-[#323232] text-[#CACACA] rounded-[8px] w-[120px] cursor-pointer overflow-hidden"
      >
        <div
          class="px-3 py-[6px] hover:bg-[#4C4C4C] hover:text-[#fafafa]"
          @click="editClick"
        >
          Edit
        </div>
        <div
          class="px-3 py-[6px] hover:bg-[#4C4C4C] hover:text-[#fafafa]"
          @click="deleteClick"
        >
          Delete
        </div>
      </PopoverContent>
    </Popover>
    <CharacterModalDelete
      :item="item"
      v-model="openDelete"
      @deleted="onDeleted"
    />
  </div>
</template>
