<script setup lang="ts">
const props = defineProps<{
  onClick?: () => void;
}>();
const app = useAppSetting();
const conversationStore = useConversationStore();

async function onConversationClick(char: any) {
  // conversationStore.setCurrentCharacter(char);
  navigateTo(`/character/${char.id}/chat`);
  props.onClick?.();
}

function onSelectAgent(agent: any) {
  props.onClick?.();
}
</script>

<template>
  <section
    class="bg-[#171717] h-full w-full flex-col flex overflow-hidden relative"
  >
    <div class="flex flex-col flex-1 overflow-hidden">
      <NuxtLink :to="'/character/explore'" @click="onClick">
        <div class="p-4 mt-2">
          <div class="row-center justify-center">
            <img src="/images/icon-logo-row.svg" class="h-[20px] lg:h-[30px]" />
          </div>
        </div>
      </NuxtLink>
      <div class="flex-1 flex flex-col overflow-hidden p-4">
        <div class="h-full overflow-y-scroll pb-[60px]">
          <div class="py-1">
            <NuxtLink to="/character/explore" @click="onClick">
              <div class="menu-button">
                <img
                  src="/images/icon-discover.svg"
                  class="h-[28px] w-[28px]"
                />
                <p class="ml-2">Discover</p>
              </div>
            </NuxtLink>
            <NuxtLink to="/character/create" @click="onClick">
              <div class="menu-button mt-4">
                <img src="/images/icon-add.svg" class="h-[28px] w-[28px]" />
                <p class="ml-2">New Character</p>
              </div>
            </NuxtLink>
          </div>
          <div class="py-3">
            <p class="text-[#A1A1AA] text-[12px] mb-3">A While Ago</p>
            <div
              v-for="(item, idx) in app.recentCharacters"
              :key="idx"
              class="relative cursor-pointer group hover:text-[#FFFFFF] hover:bg-[#26272B] rounded-[12px]"
            >
              <div
                @click="onConversationClick(item)"
                class="row-center justify-between text-[16px] py-2 pl-3 pr-10"
              >
                <div>
                  <img
                    :src="item.avatar_url || '/images/icon-logo-mask.svg'"
                    class="w-8 h-8 rounded-full"
                  />
                </div>
                <p
                  class="overflow-hidden whitespace-nowrap text-ellipsis flex-1 ml-2"
                >
                  {{ item.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PartialsUserInfor />

    <div
      class="absolute z-[1] h-[200px] w[200px] bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"
    />
  </section>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.menu-button {
  @apply flex flex-row items-center px-4 py-[10px] cursor-pointer hover:bg-[#26272B] rounded-[8px];
}
</style>
