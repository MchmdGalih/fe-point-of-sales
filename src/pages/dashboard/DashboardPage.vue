<script setup lang="ts">
import CardStats from "@/components/dashboard/home/CardStats.vue";
import HeaderCard from "@/components/dashboard/home/HeaderCard.vue";
import { useDashboardStore } from "@/stores/dashboard";
import { formatDate } from "@/utils/format-date";

import {
  ChartNoAxesColumnIncreasing,
  ShoppingCart,
  User2,
  Wallet,
} from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
const dashboardStore = useDashboardStore();
const { summary } = storeToRefs(dashboardStore);
const isLoading = ref(false);

export type TrendType = "up" | "down";

const getToday = computed(() => formatDate(new Date()));

const cardStats = computed(() => [
  {
    label: "Total Customers",
    value: summary.value?.totalCustomers,
    icon: User2,
    trend: 12.5,
    trendType: "up",
  },
  {
    label: "Total Orders",
    value: summary.value?.totalOrders,
    icon: ShoppingCart,
    trend: 8.2,
    trendType: "up",
  },
  {
    label: "Total Revenue",
    value: summary.value?.revenue,
    icon: Wallet,
    trend: 3.4,
    trendType: "down",
  },
  {
    label: "Average Orders",
    value: summary.value?.averageOrderValue,
    icon: ChartNoAxesColumnIncreasing,
    trend: 5.8,
    trendType: "up",
  },
]);

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
    <div class="space-y-4 border p-4 bg-white rounded-md">
      <div class="flex items-center justify-between md:max-w-md lg:max-w-full">
        <div class="space-y-1">
          <h1 class="font-bold md:text-sm lg:text-xl">Ringkasan Hari ini</h1>
          <h2 class="font-semibold lg:text-sm md:text-xs text-gray-400">
            Data Transaksi hari ini
          </h2>
        </div>

        <h1 class="font-bold lg:text-xl md:text-sm">
          {{ getToday }}
        </h1>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        <CardStats
          v-for="item in cardStats"
          :key="item.label"
          :label="item.label"
          :value="item.value"
          :icon="item.icon"
          :trend="item.trend"
          :trend-type="item.trendType as TrendType"
        />
      </div>
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
