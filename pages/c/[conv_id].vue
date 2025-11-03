<script setup lang="ts">
import {
  fetchCharacterById,
  findConversationById,
} from "~/services/api/chat/api";

definePageMeta({
  layout: "conversation",
});

const fetching = ref(true);
const route = useRoute();
const conversationStore = useConversationStore();
onMounted(async () => {
  const res = await findConversationById(route.params.conv_id as string);
  if (res) {
    conversationStore.change(res);
  }
  fetching.value = false;
});
</script>

<template>
  <ChatScreen v-if="conversationStore.conv" />
</template>
