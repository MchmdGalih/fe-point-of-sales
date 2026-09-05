<script setup lang="ts">
import AppCard from "@/components/ui/common/AppCard.vue";
import { Store } from "lucide-vue-next";

defineProps<{
  cashierName: string;
}>();
</script>

<template>
  <AppCard
    :class="'flex flex-col h-full'"
    :header-class="'border-b'"
    :content-class="'flex-1 space-y-4'"
    :footer-class="'border-t'"
  >
    <template #header>
      <div class="flex items-center gap-x-2">
        <div
          class="flex items-center justify-center p-2 bg-slate-300 rounded-md"
        >
          <Store :size="14" />
        </div>
        <h4 class="font-semibold">Register Info</h4>
      </div>
    </template>

    <template #default>
      <section>
        <p class="font-bold text-gray-300 text-xs">CASHIER</p>
        <p class="font-bold">{{ cashierName.toLocaleUpperCase() }}</p>
      </section>
      <section>
        <p class="font-bold text-gray-300 text-xs">LOCATION</p>
        <p class="font-bold">Bandung, Jawa Barat</p>
      </section>
    </template>

    <template #footer>
      <div
        class="w-full font-semibold text-gray-400 flex items-center justify-between py-2"
      >
        <p class="text-sm">Terminal #1</p>
        <span class="bg-green-500 w-4 h-4 rounded-full"></span>
      </div>
    </template>
  </AppCard>
</template>
