<script setup lang="ts">
import type { ChartConfig } from "@/components/ui/chart";
import CardTotalCustomer from "@/components/dashboard/home/CardTotalCustomer.vue";
import HeaderCard from "@/components/dashboard/home/HeaderCard.vue";
import { useDashboardStore } from "@/stores/dashboard";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
const dashboardStore = useDashboardStore();
const { summary } = storeToRefs(dashboardStore);
const isLoading = ref(false);

const fetchOrderSummary = async () => {
  try {
    isLoading.value = true;
    const response = await dashboardStore.getDashboardSummary();

    if (!response?.status) {
      toast.error(response?.message);
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchOrderSummary();
});
</script>

<template>
  <div class="space-y-6 py-2 px-6">
    <!-- Header Dashboard -->
    <HeaderCard />

    <!-- Card Dashboard Summary -->
    <div
      class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white rounded-md border items-stretch"
    >
      <CardTotalCustomer />
      <CardTotalCustomer />
      <CardTotalCustomer />
      <CardTotalCustomer />
    </div>

    <!-- Cart Dashboard -->
    <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
      <div
        class="w-full h-24 border rounded-md col-span-2 flex items-center justify-center bg-white"
      >
        <h1 class="font-bold text-2xl">Grafik Penjualan</h1>
      </div>
      <div
        class="w-full h-24 border flex items-center justify-center rounded-md col-span-1 bg-white"
      >
        <h1 class="font-bold text-2xl">Grafik Produk</h1>
      </div>
    </div>
  </div>
</template>
