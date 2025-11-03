<script setup lang="ts">
defineProps<{
  url?: string;
  size: number;
  name?: string;
}>();
</script>

<template>
  <div :class="`w-[40px] h-[40px]`">
    <img
      v-if="url"
      :src="url"
      class="rounded-full w-full h-full object-cover"
      :class="``"
    />
    <div
      v-else
      class="w-full h-full bg-[#4F46E5] rounded-full flex items-center justify-center"
    >
      <span :class="`text-[${size / 2}px] uppercase font-[500]`">{{
        name?.[0] || "U"
      }}</span>
    </div>
  </div>
</template>
