<script setup lang="ts">
import {
  createNewConversation,
  fetchHistoriesByCharacter,
} from "~/services/api/chat/api";
import { IConversation } from "~/services/api/chat/type";

const conversationStore = useConversationStore();
const char = computed(() => conversationStore.currentCharacter);
const scrollView = ref<HTMLDivElement | null>(null);
const page = ref(1);
const { getUser } = useAuthStore();

const convs = ref<IConversation[]>([]);

async function onNewChat() {
  conversationStore.newConversation(char.value!.id);
}

function onConversationClick(conv: IConversation) {
  conversationStore.change(conv, true);
  window.history.pushState({}, "", `/c/${conv.id}`);
}

async function scrollToPage(_page: number) {
  page.value = _page;
  const page1 = document.getElementById("page-1");
  const page1Width = page1?.offsetWidth || 0;
  if (_page === 2 && char.value?.id) {
    convs.value = await fetchHistoriesByCharacter(char.value?.id);
  }
  if (scrollView.value) {
    scrollView.value.scrollTo({
      left: (_page - 1) * page1Width,
      behavior: "smooth",
    });
  }
}
</script>

<template>
  <section ref="scrollView" class="w-full overflow-hidden">
    <div class="w-[200%] h-full flex flex-row">
      <div id="page-1" class="w-[50%] flex flex-col items-start px-4 py-6">
        <div class="row-center w-full">
          <UserAvatar :name="char?.name" :url="char?.avatar_url" :size="40" />
          <div class="ml-2 flex-1">
            <p>{{ char?.name }}</p>
            <p class="text-[12px] text-[#a2a2a2]">
              By @{{ char?.creator?.username }}
            </p>
          </div>
          <NuxtLink
            v-if="getUser().id === char?.creator?.id"
            :to="`/character/${char?.id}/edit`"
          >
            <div class="p-1">
              <NuxtIcon name="icon-edit-text" class="text-[#a2a2a2]" />
            </div>
          </NuxtLink>
        </div>
        <div class="my-6 h-[1px] w-full bg-[#26272B]" />
        <div
          class="row-center py-3 px-4 rounded-full bg-[#202024] cursor-pointer"
          @click="onNewChat"
        >
          <img src="/images/icon-new-chat.svg" />
          <p class="ml-2">New chat</p>
        </div>
        <div
          class="mt-3 row-center py-3 px-4 pr-1 cursor-pointer w-full hover:bg-[#4C4C4C30]"
          @click="scrollToPage(2)"
        >
          <div class="row-center flex-1">
            <img src="/images/icon-load-history.svg" />
            <p class="ml-2">History</p>
          </div>
          <NuxtIcon
            name="icon-arrow-right"
            class="text-[12px] text-[#a2a2a2]"
          />
        </div>
      </div>
      <div class="w-[50%] flex flex-col h-full px-4 py-6">
        <div class="row-center cursor-pointer" @click="scrollToPage(1)">
          <NuxtIcon
            name="icon-arrow-right"
            class="rotate-[180deg] text-[#A2A2AC]"
          />
          <p>History</p>
        </div>
        <div class="my-6 h-[1px] w-full bg-[#26272B]" />
        <div class="space-y-3 flex-1 w-full overflow-y-auto">
          <template v-for="conv in convs">
            <div
              v-if="conv.last_message?.content"
              class="py-2 px-4 rounded-[8px] bg-[#202024] text-[14px] cursor-pointer hover:bg-[#37373E]"
              @click="onConversationClick(conv)"
            >
              <p class="line-clamp-3">
                {{ conv.last_message?.content }}
              </p>
              <p class="mt-2 text-end text-[#ffffff77]">
                {{ getTimeToDiff(conv.last_message?.created_at) }}
              </p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
