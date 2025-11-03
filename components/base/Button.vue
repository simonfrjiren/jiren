<script setup lang="ts">
import { cn } from "~/lib/utils";

const props = defineProps<{
  text: string;
  icon?: string;
  leftIconClass?: string;
  disabled?: boolean;
  rightIcon?: string;
  loading?: boolean;
  cancel?: boolean;
  outline?: boolean;
  class?: string;
  view?: boolean;
  textClass?: any;
}>();
</script>
<template>
  <button
    :disabled="disabled || loading || view"
    :class="
      cn(
        'cursor-pointer relative flex items-center justify-center bg-app-background py-[8px] text-[16px] text-app-tLight font-[00] rounded-full border-[1px] border-[#ffffff1a]',
        props.class,
        disabled ? 'bg-app-btnDisableBg pointer-events-none ' : ''
      )
    "
  >
    <img v-if="loading" src="/images/icon-loading.gif" class="w-[18px] mr-2" />

    <img v-else-if="!!icon" :src="icon" class="mr-2" :class="leftIconClass" />

    <span
      :class="[
        disabled ? 'text-app-text2 font-[500]' : 'text-app-tLight',
        textClass,
      ]"
      >{{ text }}</span
    >
    <img v-if="!!rightIcon" :src="rightIcon" class="ml-2 w-[22px]" />
  </button>
</template>
