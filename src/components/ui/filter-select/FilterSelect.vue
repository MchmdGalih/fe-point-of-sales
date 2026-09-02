<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { AcceptableValue } from "reka-ui";
type FilterOption = {
  label: string;
  value: string;
};

const props = defineProps<{
  modelValue: string;
  options: FilterOption[];
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const handleChange = (value: AcceptableValue) => {
  if (typeof value === "string") {
    emit("update:modelValue", value);
  }
};
</script>

<template>
  <div class="flex items-center gap-2">
    <slot name="icon" />

    <Select :model-value="modelValue" @update:model-value="handleChange" Select>
      <SelectTrigger>
        <SelectValue :placeholder="placeholder ?? 'Selecte option'" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
