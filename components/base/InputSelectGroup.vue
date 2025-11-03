<script setup lang="ts">
import { Label } from "radix-vue";
import RadioGroup from "../ui/radio-group/RadioGroup.vue";
import RadioGroupItem from "../ui/radio-group/RadioGroupItem.vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    label?: string;
    wrapperClass?: string;
    required?: boolean;
    data: { value: any; label: String }[];
    tooltip?: string;
  }>(),
  {
    label: "",
    wrapperClass: "",
    required: false,
  }
);

const inputId = useId();

const modelValue = defineModel({ type: String, default: "" });
</script>

<template>
  <div class="relative inline-flex flex-col" :class="wrapperClass">
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
    <RadioGroup
      v-model="modelValue"
      class="flex flex-row items-center gap-20 flex-wrap max-w-full"
      :class="label ? ' mt-2' : ''"
    >
      <div
        v-for="item in data"
        :key="item.value"
        class="flex items-center space-x-2"
      >
        <RadioGroupItem :id="item.value" :value="item.value" />
        <Label
          :for="item.value"
          class="cursor-pointer"
          :class="modelValue === item.value ? 'text-[#fff]' : 'text-[#979797]'"
          >{{ item.label }}</Label
        >
      </div>
    </RadioGroup>
  </div>
</template>
