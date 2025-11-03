<script setup lang="ts">
import Collapsible from "../ui/collapsible/Collapsible.vue";
import CollapsibleContent from "../ui/collapsible/CollapsibleContent.vue";
import CollapsibleTrigger from "../ui/collapsible/CollapsibleTrigger.vue";

const openSetting = ref(false);
const listPrompt = defineModel<{ user: string; assistant: string }[]>({
  default: [
    {
      user: "",
      assistant: "",
    },
  ],
});

function onAddPrompt() {
  listPrompt.value.push({
    user: "",
    assistant: "",
  });
}
</script>

<template>
  <div class="w-full">
    <Collapsible v-model:open="openSetting">
      <CollapsibleTrigger>
        <div class="row-center">
          <p class="text-[14px] lg:text-[18px]">Advanced Setting</p>
          <img
            src="/images/icon-arrow-right.svg"
            class="duration-300"
            :class="openSetting ? 'rotate-90' : ''"
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="row-center mt-4">
          <p class="text-[13px] lg:text-[16px] text-[#cacaca]">
            Example Prompts
          </p>
        </div>
        <div
          v-for="(prompt, idx) in listPrompt"
          :key="idx"
          class="mt-3 border border-[rgba(255,255,255,0.1)] p-4 rounded-[12px] space-y-2"
        >
          <div class="row-center">
            <p class="w-[120px]">User</p>
            <input
              v-model="prompt.user"
              placeholder="Airri"
              class="bg-[#292929] outline-none px-3 py-2 rounded-[8px] flex-1"
            />
          </div>
          <div class="row-center">
            <p class="w-[120px]">Character</p>
            <input
              v-model="prompt.assistant"
              placeholder="CEO of Tesla. Ideas faster than rockets."
              class="bg-[#292929] outline-none px-3 py-2 rounded-[8px] flex-1"
            />
          </div>
        </div>
        <button
          class="row-center mt-3 rounded-full border border-[#fff] p-2 pr-4"
          @click="onAddPrompt"
        >
          <img src="/images/icon-add.svg" />
          <p>Add User Conversation</p>
        </button>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
