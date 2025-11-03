<script setup lang="ts">
import type { RadioGroupItemProps } from "radix-vue";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-vue-next";
import {
  RadioGroupIndicator,
  RadioGroupItem,
  useForwardProps,
} from "radix-vue";
import { computed } from "vue";
import { twMerge } from "tailwind-merge";

const props = defineProps<
  RadioGroupItemProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="
      twMerge(
        'peer cursor-pointer aspect-square h-4 w-4 rounded-full border border-[#777]  text-gray-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
        props.class
      )
    "
  >
    <RadioGroupIndicator
      class="flex items-center justify-center border-[1px] p-[1px] rounded-full border-[#fff]"
    >
      <Circle class="h-2.5 w-2.5 fill-current text-[#fff]" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
