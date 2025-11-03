<script setup lang="ts">
import { twMerge } from "tailwind-merge";

defineOptions({
  inheritAttrs: false,
});

defineProps<{
  label?: string;
  wrapperClass?: string;
  required?: boolean;
  leftDesc?: string;
  rightDesc?: string;
  disabled?: boolean;
  placeholder?: string;
  tags: string[];
  tooltip?: string;
}>();

const inputId = useId();
const modelValue = defineModel<string[]>({ default: [] });
const selectedTags = ref<string[]>(modelValue.value || []);

function updateSelectedTags(tag: string) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
  modelValue.value = selectedTags.value;
}
</script>

<template>
  <Popover>
    <div
      class="relative inline-flex flex-col w-full items-start"
      :class="wrapperClass"
    >
      <template v-if="$slots.iconLeft">
        <div class="absolute top-4 left-3">
          <slot name="iconLeft" />
        </div>
      </template>
      <BaseLabelWithTooltip
        v-if="label"
        :label="label"
        :tooltip="tooltip"
        :required="required"
        :input-id="inputId"
      />
      <PopoverTrigger class="w-full">
        <div
          class="flex flex-row flex-wrap min-h-[48px] items-start gap-2 bg-[#292929] px-4 py-2 rounded-[8px] text-[14px] text-[#fff] mt-2"
          :class="
            twMerge(
              $slots.iconLeft ? 'pl-10' : '',
              disabled ? 'bg-[#131313] ' : ''
            )
          "
          v-bind="$attrs"
        >
          <p v-if="!selectedTags.length" class="mt-1 text-[#979797]">
            Click to select tag
          </p>
          <div
            v-for="(tag, idx) in selectedTags"
            :key="idx"
            @click="updateSelectedTags(tag)"
            class="px-3 py-1 rounded-full border-[1px] border-[#7d7d7d50] bg-[#131313]"
          >
            {{ tag }}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        class="bg-[#040813] rounded-[10px] mt-2 p-4 flex flex-row flex-wrap gap-4 w-[96vw] max-w-[640px] border-[1px] border-[#7d7d7d50]"
      >
        <div
          v-for="(tag, idx) in tags"
          :key="idx"
          @click="updateSelectedTags(tag)"
          class="text-[14px] px-3 py-1 cursor-pointer rounded-full border-[1px] border-[#7d7d7d50]"
        >
          {{ tag }}
        </div>
      </PopoverContent>
    </div>
  </Popover>
</template>
