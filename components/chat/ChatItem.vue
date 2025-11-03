<script setup lang="ts">
import { useMarkdownIt } from "~/composables/useMarkdownIt";
import { IChatMessage } from "~/services/api/chat/type";
const md = useMarkdownIt();

const openPreview = ref(false);

const props = defineProps<{
  item: IChatMessage;
  thinking?: boolean;
  showPreDate?: boolean;
}>();
const conversationStore = useConversationStore();
const app = useAppSetting();

const currentCharacter = computed(() => {
  return conversationStore.currentCharacter;
});
</script>

<template>
  <div
    class="w-full row-center px-3"
    :class="{
      'justify-end ': item.role === 'user',
      'mt-6': !showPreDate,
      'mt-3': showPreDate,
    }"
  >
    <div
      class="w-[94%] row-center overflow-hidden"
      :class="{ 'justify-end': item.role === 'user' }"
    >
      <div
        class="flex flex-row max-w-full items-start"
        :class="{
          'w-full': item.role === 'assistant',
        }"
      >
        <div
          v-if="item.role === 'assistant'"
          class="w-[30px] h-[30px] md:w-[40px] md:h-[40px] mr-2 rounded-full overflow-hidden flex-shrink-0 border border-[#a9a9a9ff]"
        >
          <img
            :src="currentCharacter?.avatar_url || '/images/icon-logo-mask.svg'"
            class="w-full"
          />
        </div>
        <div class="flex-1 overflow-hidden">
          <ChatItemContent :item="item" :thinking="thinking" />
        </div>
      </div>
    </div>
  </div>
</template>
