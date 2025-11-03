<script setup lang="ts">
defineProps<{ tooltip: string }>();
</script>

<template>
  <TooltipProvider :delayDuration="0">
    <Tooltip>
      <TooltipTrigger>
        <div class="row-center relative">
          <slot />
          <NuxtIcon name="icon-information" class="ml-1 text-[#A2A2AC]" />
        </div>
      </TooltipTrigger>
      <TooltipContent class="z-[1000] max-w-[350px] left-0" side="bottom">
        <div class="row-center">
          {{ tooltip }}
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
