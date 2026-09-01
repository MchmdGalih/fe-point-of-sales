<script setup lang="ts">
import { ref } from "vue";
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-vue-next";

import { cn } from "@/lib/utils";

const props = defineProps<{
  modelValue?: string;
  defaultValue?: string;
  placeholder?: string;
  class?: HTMLAttributes["class"];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const modelValue = useVModel(props, "modelValue", emit, {
  passive: true,
  defaultValue: props.defaultValue,
});

const showPassword = ref(false);
</script>

<template>
  <div class="relative">
    <Input
      v-model="modelValue"
      :type="showPassword ? 'text' : 'password'"
      :placeholder="placeholder"
      :class="cn('pr-10', props.class)"
    />

    <button
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
      @click="showPassword = !showPassword"
    >
      <Eye v-if="!showPassword" class="size-4" />

      <EyeOff v-else class="size-4" />
    </button>
  </div>
</template>
