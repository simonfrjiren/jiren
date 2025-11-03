<script setup lang="ts">
import { useMarkdownIt } from "~/composables/useMarkdownIt";
import { IChatMessage } from "~/services/api/chat/type";
const md = useMarkdownIt();

defineProps<{
  item: IChatMessage;
  thinking?: boolean;
  showPreDate?: boolean;
  isPreview?: boolean;
}>();
</script>

<template>
  <div class="flex-1 flex flex-col items-start">
    <div
      class="flex-1 flex flex-col items-start max-w-full space-y-2 bg-[#323232d9] rounded-[8px] py-2 px-3"
    >
      <div
        v-if="
          (thinking || (!item.content && !item.completed)) &&
          item.role === 'assistant'
        "
        class="p-2 rounded-[8px]"
      >
        <div
          class="dots h-6 w-10 rounded-full flex items-center justify-center flex-nowrap"
        >
          <div class="dot h-2 w-2 mx-0.5 rounded-full bg-slate-600" />
          <div class="dot h-2 w-2 mx-0.5 rounded-full bg-slate-600" />
          <div class="dot h-2 w-2 mx-0.5 rounded-full bg-slate-600" />
        </div>
      </div>
      <div v-else-if="item.content" class="markdown max-w-full">
        <div
          v-html="md.render(item.content)"
          class="text-[#ececec] text-[16px] break-words text-start"
          :class="{
            'text-[#efefef] mt-0  ': item.role === 'user',
            'mt-[2px]': item.role === 'assistant',
          }"
        />
      </div>
    </div>
  </div>
</template>
