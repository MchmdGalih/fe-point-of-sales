<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import AppCard from "@/components/ui/common/AppCard.vue";
import type { TrendType } from "@/pages/dashboard/DashboardPage.vue";
import { TrendingDown, TrendingUp } from "lucide-vue-next";
import type { Component } from "vue";

interface Props {
  label: string;
  value: number;
  icon: Component;
  trend: number;
  trendType: TrendType;
}

defineProps<Props>();
</script>

<template>
  <AppCard :class="'flex flex-col h-full '" :content-class="'flex-1 space-y-4'">
    <template #header>
      <div class="flex items-center justify-between">
        <component :is="icon" class="h-8 w-8 shrink-0" color="blue" />
        <Badge
          :class="[
            'p-2 rounded-md inline-flex items-center gap-x-2',
            trendType === 'up' ? '  bg-indigo-700' : 'bg-red-600',
          ]"
        >
          <p class="font-semibold">{{ trend }}</p>

          <TrendingUp v-if="trendType === 'up'" />

          <TrendingDown v-else />
        </Badge>
      </div>
    </template>

    <template #default>
      <div class="max-w-md">
        <h1 class="font-bold text-3xl">{{ value }}</h1>
        <h4 class="font-semibold text-gray-400">{{ label }}</h4>
      </div>
    </template>
  </AppCard>
</template>
