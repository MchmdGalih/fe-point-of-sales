<script setup lang="ts">
import type { Component } from "vue";

interface Props {
  name: string;
  stock: number;
  icon: Component;
}

defineProps<Props>();
</script>

<template>
  <div
    class="w-full flex items-center space-x-2 px-2 justify-between border bg-slate-100 rounded-md"
  >
    <div class="block p-2">
      <h1 class="font-semibold">{{ name }}</h1>
      <p class="font-semibold text-orange-700">{{ stock }}</p>
    </div>

    <component :is="icon" class="h-8 w-8 shrink-0" color="red" />
  </div>
</template>
