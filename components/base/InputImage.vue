<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

defineProps({
  label: { type: String, default: "" },
  wrapperClass: { type: String, default: "" },
  required: { type: Boolean, default: false },
});

const inputId = useId();
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
</script>

<template>
  <div class="relative inline-flex flex-col" :class="wrapperClass">
    <label v-if="label" :for="inputId" class="dr-form-label">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <BaseImagePicker v-model="modelValue">
      <div class="flex flex-col items-center py-6 px-3">
        <NuxtIcon v-if="!image" name="icon-drag-image" />
        <div v-else class="h-[48px] w-[48px]">
          <img :src="image" class="h-full w-full rounded-md" />
        </div>
        <p class="text-center mt-2">Choose an image or drag & drop it here</p>
        <p class="text-[14px] text-primary-text2">JPEG, PNG up to 5MB</p>
        <div class="mt-4 text-blue-500">Browse image</div>
      </div>
    </BaseImagePicker>
  </div>
</template>
