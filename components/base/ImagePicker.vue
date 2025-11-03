<script setup lang="ts">
import { postUploadImage } from "~/services/api/auth/api";

defineOptions({
  inheritAttrs: false,
});

defineProps({
  label: { type: String, default: "" },
  wrapperClass: { type: String, default: "" },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const imageFile = ref<any>(null);
const image = ref<any>(null);
const modelValue = defineModel({ type: String, default: "" });

watch(
  modelValue,
  () => {
    image.value = modelValue.value;
  },
  { immediate: true }
);

watch(imageFile, async () => {
  if (!imageFile.value) return;
  const url = await postUploadImage(imageFile.value);
  if (url) {
    modelValue.value = url;
  }
});

function dropHandler(event: any) {
  event.preventDefault();

  if (event.dataTransfer?.items) {
    [...event.dataTransfer?.items].forEach((item: any, i: number) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        imageFile.value = file;
      }
    });
  }
}

const onChangeFile = (event: any) => {
  imageFile.value = event.target.files[0];
};
</script>

<template>
  <div class="relative" @drop="dropHandler">
    <slot />
    <input
      v-if="!disabled"
      id="file-click-hidden"
      class="absolute z-[1] opacity-[0] w-full h-full top-0 cursor-pointer"
      type="file"
      accept=".jpg,.jpeg,.png,image/jpeg"
      @change="onChangeFile"
    />
  </div>
</template>
