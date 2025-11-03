<script setup lang="ts">
import { debounce } from "lodash";
import { fetchPublicListCharacter } from "~/services/api/chat/api";

const app = useAppSetting();

definePageMeta({
  layout: "conversation",
});

const listExplores = ref(app.explores);
const textSearch = ref("");

onMounted(() => {
  if (!app.explores.length) {
    searchChar();
  }
});

async function searchChar() {
  const res = await fetchPublicListCharacter(textSearch.value);
  listExplores.value = res;
  if (!app.explores.length) {
    app.explores = res;
  }
}

watch(
  () => textSearch.value,
  debounce(() => {
    searchChar();
  }, 300)
);
</script>

<template>
  <section class="flex flex-col flex-1 h-full md:py-6 px-4">
    <div
      class="w-full md:w-[400px] py-3 px-4 rounded-full bg-[#202024] row-center mb-1"
    >
      <NuxtIcon name="icon-search" class="text-[#a2a2a2] w-[18px]" filled />
      <input
        type="text"
        placeholder="Search"
        class="ml-2 flex-1 outline-none"
        v-model="textSearch"
      />
    </div>
    <div class="flex flex-1 flex-col items-center overflow-auto pb-[60px]">
      <div v-for="(item, idx) in listExplores" :key="idx" class="mt-4 w-full">
        <p>{{ item.name }}</p>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <NuxtLink
            v-for="(char, idx) in item.items"
            :key="char.id"
            class="flex flex-row bg-[#202024] rounded-[14px] py-4 px-3"
            :to="`/character/${char.id}/chat`"
          >
            <div
              class="w-[80px] h-[100px] flex items-center justify-center rounded-[12px] bg-[#444]"
            >
              <img
                v-if="char.avatar_url"
                class="w-full h-full object-cover rounded-[12px]"
                :src="char.avatar_url"
              />
            </div>
            <div class="ml-2 flex-1 flex flex-col h-full">
              <div class="flex flex-col">
                <p class="text-[#fafafa] text-[16px] font-[500]">
                  {{ char.name }}
                </p>

                <p class="text-[14px] text-[#cacaca] line-clamp-2">
                  {{ char.metadata?.tagline }}
                </p>
                <div class="flex flex-row flex-wrap gap-1 mt-3">
                  <div
                    v-for="tag in char.metadata.tags"
                    class="py-1 px-2 rounded-full bg-gradient-to-b from-[#392C2E] to-[#582F2F] text-[12px]"
                  >
                    {{ tag }}
                  </div>
                </div>
              </div>

              <p class="text-[10px] text-[#A2A2AC] mt-4">
                By @{{ char.creator?.username || char.creator.name }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
