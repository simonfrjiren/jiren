<script setup lang="ts">
import { toast } from "~/components/ui/toast";
import { LIST_TAGS } from "~/constants";
import {
  postCreateCharacter,
  putUpdateCharacter,
} from "~/services/api/chat/api";
import { ICharacter } from "~/services/api/chat/type";
import Collapsible from "../ui/collapsible/Collapsible.vue";
import CollapsibleTrigger from "../ui/collapsible/CollapsibleTrigger.vue";
import CollapsibleContent from "../ui/collapsible/CollapsibleContent.vue";
const props = defineProps<{ char?: ICharacter }>();

const name = ref(props.char?.name || "");
const description = ref(props.char?.metadata.description || "");
const tagline = ref(props.char?.metadata.tagline || "");
const tags = ref<string[]>(props.char?.metadata.tags || []);
const greeting = ref(props.char?.metadata.greeting || "");
const loading = ref(false);
const avatar_url = ref(props.char?.avatar_url || "");
const visibility = ref(props.char?.visibility || "public");
const listPrompts = ref(
  props.char?.config?.example_prompts || [{ user: "", assistant: "" }]
);
const router = useRouter();

function checkCondition() {
  if (!name.value || name.value.length > 20) return false;
  if (!tagline.value || tagline.value.length > 50) return false;
  if (description.value.length > 500) return false;
  if (greeting.value.length > 500) return false;
  return true;
}

async function submitCreate() {
  if (!avatar_url.value) {
    return toast({
      description: "Avatar is required",
      duration: 5000,
    });
  }
  loading.value = true;
  const prompts = listPrompts.value.filter((p) => p.user && p.assistant);
  const body = {
    name: name.value,
    config: {
      example_prompts: prompts,
    },
    metadata: {
      tagline: tagline.value,
      description: description.value,

      tags: tags.value,
      greeting: greeting.value,
    },
    avatar_url: avatar_url.value,
    visibility: visibility.value || ("private" as any),
  };
  const res = await (props.char
    ? putUpdateCharacter(props.char.id, body)
    : postCreateCharacter(body));
  loading.value = false;
  // 01983bd931337b098e73080a9b8bdb82
  if (res) {
    toast({
      description: `${props.char ? "Update" : "Create"} character successfully`,
      duration: 5000,
    });
    if (props.char) {
      return router.back();
    }
    navigateTo(`/character/${res.id}/chat`);
  }
}
</script>

<template>
  <section class="flex flex-1 h-full">
    <div class="flex-1 flex flex-col items-center py-8 w-full overflow-y-auto">
      <div
        class="flex-1 flex flex-col items-center py-8 w-full px-6 lg:px-0 md:max-w-[640px]"
      >
        <p class="text-[32px] lg:text-[40px] font-bold">Create Character</p>
        <BaseImagePicker v-model="avatar_url">
          <div class="mt-6 relative">
            <div
              class="bg-[#4F46E5] rounded-full w-[120px] h-[120px] flex items-center justify-center"
            >
              <img
                v-if="avatar_url"
                :src="avatar_url"
                class="w-full h-full rounded-full"
              />
              <span v-else class="text-[32px] lg:text-[40px]">A</span>
            </div>
            <div
              class="absolute bottom-0 right-0 bg-[#222222] rounded-full p-2"
            >
              <img src="/images/icon-camera.svg" class="w-[20px] h-[20px]" />
            </div>
          </div>
        </BaseImagePicker>
        <div class="mt-6 space-y-6 w-full">
          <BaseInputText
            placeholder="Airri"
            label="Character Name"
            :right-desc="`${name.length}/20`"
            :right-class="{ 'text-red-500': name.length > 20 }"
            v-model="name"
            required
          />
          <BaseInputText
            placeholder="CEO of Tesla. Ideas faster than rockets."
            label="Tagline"
            tooltip="Your character’s self-description"
            :right-desc="`${tagline.length}/50`"
            :right-class="{ 'text-red-500': tagline.length > 50 }"
            v-model="tagline"
            required
          />
          <BaseInputText
            placeholder="A visionary tech entrepreneur and engineer, Elon Musk is known for pushing humanity toward a multiplanetary future. Founder of SpaceX, Tesla, and Neuralink, blends ambition with relentless innovation. Fearless, controversial, and always curious, Musk breaks norms, questions limits, and redefines what's possible."
            label="Description"
            tooltip="Description to build character. The closer you describe to the desired, the more complete the character will be"
            :right-desc="`${description.length}/500`"
            :right-class="{ 'text-red-500': description.length > 500 }"
            v-model="description"
            multiline
          />
          <BaseInputText
            placeholder="Welcome. I hope you’re ready to question reality. What's your mission?"
            label="Greeting"
            tooltip="The first response of character when users open a new chat"
            :right-desc="`${greeting.length}/500`"
            :right-class="{ 'text-red-500': greeting.length > 500 }"
            v-model="greeting"
            multiline
          />
          <BaseInputPickerTag
            label="Tag"
            tooltip="Categorize your character"
            :tags="LIST_TAGS"
            v-model="tags"
          />
          <BaseInputSelectGroup
            label="Visibility"
            tooltip="Visibility of a character. You can change this later"
            :data="[
              { label: 'Public', value: 'public' },
              { label: 'Private', value: 'private' },
            ]"
            v-model="visibility"
          />
          <CharacterAdvanceSetting v-model="listPrompts" />
        </div>

        <button
          class="btn w-[50%] min-w-[200px] mt-6"
          :class="{ 'opacity-[0.5] cursor-default': !checkCondition() }"
          @click="submitCreate"
          :disabled="!checkCondition()"
        >
          <span>{{ char ? "Update" : "Create" }}</span>
        </button>
      </div>
    </div>
  </section>
</template>
