<script setup lang="ts">
import { toast } from "~/components/ui/toast";
import { postUpdateUserProfile } from "~/services/api/auth/api";

const props = defineProps<{ onUpdated: () => void; title?: string }>();
const { getUser } = useAuthStore();
const name = ref(getUser().name || "");
const username = ref(getUser().username || "");
const imageUrl = ref(getUser().avatar_url || "");
async function onSubmit() {
  const res = await postUpdateUserProfile({
    name: name.value,
    username: username.value,
    avatar_url: imageUrl.value,
  });
  if (res) {
    toast({
      description: "Update profile successfully",
      duration: 5000,
    });
    props.onUpdated();
  }
}
</script>

<template>
  <section class="flex flex-row w-full h-full">
    <div class="flex-1 flex flex-col items-center py-8 w-full overflow-y-auto">
      <div
        class="flex-1 flex flex-col items-center py-8 w-full px-6 md:max-w-[640px]"
      >
        <p class="text-[32px] lg:text-[40px] font-bold">
          {{ title || "Update Profile" }}
        </p>
        <BaseImagePicker v-model="imageUrl">
          <div class="mt-6 relative">
            <div
              class="bg-[#4F46E5] rounded-full w-[120px] h-[120px] flex items-center justify-center"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
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
        <div class="mt-6 space-y-4 w-full">
          <BaseInputText
            placeholder="Airri"
            label="Name"
            v-model="name"
            required
          />
          <BaseInputText
            placeholder="Enter your username"
            label="Username"
            v-model="username"
            required
          />
        </div>

        <button class="btn w-[50%] min-w-[200px] mt-6" @click="onSubmit">
          <span>Update</span>
        </button>
      </div>
    </div>
  </section>
</template>
