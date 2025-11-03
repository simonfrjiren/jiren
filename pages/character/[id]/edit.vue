<script setup lang="ts">
import { fetchCharacterById } from "~/services/api/chat/api";
import { ICharacter } from "~/services/api/chat/type";

definePageMeta({
  layout: "conversation",
});
const route = useRoute();
const id = route.params.id;
const char = ref<ICharacter | null>(null);
onMounted(async () => {
  const res = await fetchCharacterById(id as string);
  if (res) {
    char.value = res;
  }
});
</script>

<template>
  <CharacterCreateScreen v-if="char" :char="char" />
</template>
