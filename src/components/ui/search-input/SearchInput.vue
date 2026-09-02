<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { useVModel } from "@vueuse/core";
import { Input } from "@/components/ui/input";

const props = defineProps<{
  modelValue?: string;
  placeholder?: string;
  class?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const modelValue = useVModel(props, "modelValue", emit, {
  passive: true,
});
</script>

<template>
  <div :class="['relative', props.class]">
    <Search
      class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      color="blue"
    />

    <Input
      v-model="modelValue"
      :placeholder="placeholder ?? 'Search...'"
      :class="['pl-10', props.class]"
    />
  </div>
</template>
