<script setup lang="ts">
import {
  fetchCharacterById,
  findConversationById,
} from "~/services/api/chat/api";
import { ICharacter, IConversation } from "~/services/api/chat/type";

definePageMeta({
  layout: "conversation",
});

const char = ref<ICharacter | null>(null);
const conv = ref<IConversation | null>(null);
const fetching = ref(true);
const route = useRoute();
const conversationStore = useConversationStore();
onMounted(async () => {
  const res = await fetchCharacterById(route.params.id as string);
  if (res) {
    char.value = res;
    if (char.value.last_conversation_id) {
      const _conv = await findConversationById(char.value.last_conversation_id);
      if (_conv) {
        conv.value = _conv;
        conversationStore.change(_conv);
      }
    } else conversationStore.setCurrentCharacter(char.value);
  }
  fetching.value = false;
});
</script>

<template>
  <ChatScreen v-if="!fetching" />
</template>
