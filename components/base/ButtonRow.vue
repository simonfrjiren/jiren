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
  variant?: "btn" | "btn-secondary" | "btn-secondary-2";
}>();
</script>
<template>
  <button
    :disabled="disabled || loading"
    :class="
      cn(
        'p-4 row-center bg-[#292929] rounded-[12px]',
        props.class,
        disabled ? 'bg-app-card3 pointer-events-none ' : ''
      )
    "
  >
    <img v-if="loading" src="/images/icon-loading.gif" class="w-[18px] mr-2" />

    <img v-else-if="!!icon" :src="icon" class="mr-2" :class="leftIconClass" />

    <p
      class="flex-1 text-start"
      :class="disabled ? 'text-[#3D3D3D] font-[500] ' : ''"
    >
      {{ text }}
    </p>
    <img v-if="!!rightIcon" :src="rightIcon" class="ml-2 w-[22px]" />
    <template v-if="$slots.right">
      <slot name="right" />
    </template>
  </button>
</template>
