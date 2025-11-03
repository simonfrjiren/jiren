<script setup lang="ts">
import ItemTooltip from "./ItemTooltip.vue";

defineProps<{
  label?: string;
  required?: boolean;
  tooltip?: string;
  inputId?: string;
}>();
</script>

<template>
  <ItemTooltip v-if="tooltip" :tooltip="tooltip">
    <label
      v-if="label"
      :for="inputId"
      class="text-[14px] lg:text-[18px] font-[400] mb-1"
    >
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
  </ItemTooltip>
  <label
    v-else-if="label"
    :for="inputId"
    class="text-[14px] lg:text-[18px] font-[400] mb-1"
  >
    {{ label }} <span v-if="required" class="text-red-500">*</span>
  </label>
</template>
