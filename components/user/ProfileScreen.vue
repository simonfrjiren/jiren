<script setup lang="ts">
import { UserUpdateForm } from "#components";
import { toast } from "~/components/ui/toast";
import { postUpdateUserProfile } from "~/services/api/auth/api";
import { IUserProfile } from "~/services/api/auth/type";
import {
  fetchListCharacterByUser,
  fetchMyListCharacter,
} from "~/services/api/chat/api";
import { ICharacter } from "~/services/api/chat/type";
const props = defineProps<{ profile: IUserProfile }>();

const imageUrl = ref(props.profile.avatar_url || "");
const { getUser, setUser } = useAuthStore();
const name = ref(props.profile.name || "");
const showEdit = ref(false);
const listChars = ref<ICharacter[]>([]);
const filterType = ref("all");
const listType = ref(["all", "public", "private"]);
const openFilter = ref(false);
const finalListChars = ref<ICharacter[]>([]);

onMounted(async () => {
  listChars.value = await fetchListCharacterByUser(props.profile.id);
});

watch(
  () => [listChars.value.length, filterType.value],
  () => {
    if (filterType.value === "all") {
      finalListChars.value = listChars.value;
    } else {
      finalListChars.value = listChars.value.filter(
        (char) => char.visibility === filterType.value
      );
    }
  }
);

watch(imageUrl, async () => {
  await updateProfile({
    avatar_url: imageUrl.value,
  });
});

async function updateProfile(body: { avatar_url?: string; name?: string }) {
  const res = await postUpdateUserProfile(body);
  if (res) {
    setUser(res);
    toast({
      description: "Update profile successfully",
      duration: 3000,
    });
  }
}

async function updateName() {
  await updateProfile({
    name: name.value,
  });
  showEdit.value = false;
}

function onFilterItemClick(filter: string) {
  openFilter.value = false;
  filterType.value = filter;
}
</script>

<template>
  <section class="flex flex-row w-full h-full">
    <PartialsChatLeftSection />
    <section
      class="flex flex-col flex-1 h-full items-center py-8 overflow-y-auto"
    >
      <div class="w-[94%] lg:w-[640px] flex flex-col items-center">
        <p class="text-[32px] lg:text-[40px] font-bold">User Profile</p>
        <BaseImagePicker
          v-model="imageUrl"
          :disabled="profile.id !== getUser().id"
        >
          <div class="mt-6 relative">
            <div
              class="bg-[#4F46E5] rounded-full w-[70px] h-[70px] flex items-center justify-center"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                class="w-full h-full rounded-full"
              />
              <span v-else class="text-[28px] lg:text-[40px]">A</span>
            </div>
            <div
              class="absolute bottom-0 right-0 bg-[#222222] rounded-full p-1"
            >
              <img src="/images/icon-camera.svg" class="w-[16px] h-[16px]" />
            </div>
          </div>
        </BaseImagePicker>
        <div class="mt-4">
          <div v-if="showEdit" class="row-center">
            <input
              v-model="name"
              class="border-b-[1px] border-b-[#fafafa] outline-none pl-1"
              autofocus
            />
            <button
              class="text-blue-500 ml-2 cursor-pointer"
              @click="updateName"
            >
              Save
            </button>
          </div>
          <div v-else class="row-center">
            <p class="text-[24px] text-[#fafafa]">{{ name }}</p>
            <button
              v-if="profile.id === getUser().id"
              class="ml-2 p-1 rounded-full border border-[#303136] cursor-pointer"
              @click="showEdit = true"
            >
              <NuxtIcon name="icon-edit-text" />
            </button>
          </div>
        </div>

        <div id="tab-section" class="flex flex-row mt-6 w-full justify-between">
          <div
            class="cursor-pointer border-b-[1px] border-b-[#fafafa] py-2 px-3"
          >
            My Characters
          </div>
          <Popover v-if="profile.id === getUser().id" v-model:open="openFilter">
            <PopoverTrigger
              class="cursor-pointer w-[110px] row-center justify-between border border-[rgba(255,255,255,0.1)] rounded-[8px] py-2 px-4 pr-2 text-[#A2A2AC] capitalize"
            >
              <p>{{ filterType }}</p>
              <!-- <img src="/images/icon-arrow-right.svg" class="rotate-90" /> -->
              <NuxtIcon name="icon-arrow-right" class="rotate-90" />
            </PopoverTrigger>
            <PopoverContent
              class="bg-[#323232] text-[#CACACA] rounded-[8px] w-[120px] cursor-pointer overflow-hidden"
            >
              <div
                v-for="type in listType"
                :key="type"
                class="px-3 py-[6px] hover:bg-[#4C4C4C] hover:text-[#fafafa] capitalize"
                @click="onFilterItemClick(type)"
              >
                {{ type }}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div class="w-full mt-6 space-y-4">
          <CharacterItemRow
            v-for="item in finalListChars"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </section>
  </section>
</template>
