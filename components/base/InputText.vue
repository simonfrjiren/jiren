<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import ItemTooltip from "./ItemTooltip.vue";
import LabelWithTooltip from "./LabelWithTooltip.vue";

defineOptions({
  inheritAttrs: false,
});

defineProps<{
  label?: string;
  wrapperClass?: string;
  required?: boolean;
  leftDesc?: string;
  rightDesc?: string;
  rightClass?: any;
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  tooltip?: string;
}>();

const inputId = useId();

const modelValue = defineModel({ default: "" });
</script>

<template>
  <div
    class="relative inline-flex flex-col w-full items-start"
    :class="wrapperClass"
  >
    <template v-if="$slots.iconLeft">
      <div class="absolute top-4 left-3">
        <slot name="iconLeft" />
      </div>
    </template>
    <LabelWithTooltip
      v-if="label"
      :label="label"
      :tooltip="tooltip"
      :required="required"
      :input-id="inputId"
    />

    <input
      v-if="!multiline"
      :id="inputId"
      v-model="modelValue"
      type="text"
      class="bg-[#292929] w-full h-12 px-4 rounded-[8px] text-[14px] text-[#fff] mt-2 placeholder:text-[#7D7D7D]"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="
        twMerge(
          $slots.iconLeft ? 'pl-10' : '',
          disabled ? 'bg-[#D9D9D9] text-primary-black' : ''
        )
      "
      v-bind="$attrs"
    />
    <textarea
      v-else
      :id="inputId"
      v-model="modelValue"
      type="text"
      class="bg-[#292929] w-full min-h-[100px] px-4 py-2 rounded-[8px] text-[14px] text-[#fff] mt-2 placeholder:text-[#7D7D7D]"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="
        twMerge(
          $slots.iconLeft ? 'pl-10' : '',
          disabled ? 'bg-[#D9D9D9] text-primary-black' : ''
        )
      "
      v-bind="$attrs"
    />
    <template v-if="$slots.right">
      <div class="absolute top-10 right-3">
        <slot name="right" />
      </div>
    </template>
    <div class="text-[12px] italic text-[#7D7D7D] mt-1">
      <p v-if="leftDesc">
        {{ leftDesc }}
      </p>
      <p v-if="rightDesc" class="text-end" :class="rightClass">
        {{ rightDesc }}
      </p>
    </div>
  </div>
</template>
