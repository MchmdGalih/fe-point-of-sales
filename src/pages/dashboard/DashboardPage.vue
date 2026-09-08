<script setup lang="ts">
import CardLowStock from "@/components/dashboard/home/CardLowStock.vue";
import CardStats from "@/components/dashboard/home/CardStats.vue";
import HeaderCard from "@/components/dashboard/home/HeaderCard.vue";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { VisAxis, VisGroupedBar, VisXYContainer } from "@unovis/vue";
import { useDashboardStore } from "@/stores/dashboard";
import type { PeriodeType, SalesTrendItem } from "@/types/dashboard";
import { formatDate } from "@/utils/format-date";

import {
  ChartNoAxesColumnIncreasing,
  TriangleAlert,
  ShoppingCart,
  User2,
  Wallet,
  ListFilter,
} from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import FilterSelect from "@/components/ui/filter-select/FilterSelect.vue";
import { PERIOD_TREND_ORDER_OPTIONS } from "@/const/order";
const dashboardStore = useDashboardStore();
const { summary, lowStock, salesTrendData } = storeToRefs(dashboardStore);

const { getDashboardSummary, getLowStock, getSalesTrend } = dashboardStore;

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

const totalItemsStockLow = computed(() => lowStock.value.length);
const selectedSalesTrendPeriode = ref<PeriodeType>("week");

const chartData = computed(() => {
  return salesTrendData.value.salesTrend.map((sales) => {
    return {
      ...sales,
      date: formatDate(sales.date),
    };
  });
});

console.log(chartData.value);
const fetchDashboard = async () => {
  try {
    const response = await Promise.all([
      getDashboardSummary(),
      getLowStock(),
      getSalesTrend(selectedSalesTrendPeriode.value),
    ]);

    if (!response.every((res) => res.status)) {
      toast.error(response.find((res) => !res.status)?.message);
    }
  } finally {
    isLoading.value = false;
  }
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#00000",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

watch(selectedSalesTrendPeriode, async () => {
  await getSalesTrend(selectedSalesTrendPeriode.value);
});

onMounted(() => {
  fetchDashboard();
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

    <div class="grid md:grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
      <!-- Cart Dashboard -->

      <div class="w-full h-full border rounded-md col-span-2 bg-white">
        <div class="flex items-center p-4 gap-4">
          <h1>Grafik Penjualan:</h1>
          <FilterSelect
            v-model="selectedSalesTrendPeriode"
            :options="PERIOD_TREND_ORDER_OPTIONS"
            placeholder="Filter Periode"
          >
            <template #icon>
              <ListFilter class="size-5" />
            </template>
          </FilterSelect>
        </div>
        <div
          v-if="!chartData.length"
          class="w-full h-full flex justify-center items-center border"
        >
          <h1 class="text-orange-700 font-bold">
            Grafik Penjualan untuk hari ini Belum Tersedia!
          </h1>
        </div>

        <ChartContainer :config="chartConfig" v-else>
          <VisXYContainer :data="chartData">
            <VisGroupedBar
              :x="(d: SalesTrendItem) => d.date"
              :y="[
                (d: SalesTrendItem) => d.revenue,
                (d: SalesTrendItem) => d.totalOrders,
              ]"
              :color="[chartConfig.desktop.color, chartConfig.mobile.color]"
              :rounded-corners="4"
              bar-padding="0.1"
              group-padding="0"
            />
            <VisAxis
              type="x"
              :x="(d: SalesTrendItem) => d.date"
              :tick-line="false"
              :domain-line="false"
              :grid-line="false"
              :tick-format="
                (d: number) => {
                  const date = new Date(d);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                  });
                }
              "
            />
            <VisAxis
              type="y"
              :tick-format="
                (d: number) => {
                  return new Intl.NumberFormat('id-ID', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                  }).format(d);
                }
              "
              :tick-line="false"
              :domain-line="false"
              :grid-line="true"
            />
          </VisXYContainer>
        </ChartContainer>
      </div>

      <!-- Stock Dashboard -->
      <div
        class="w-full border rounded-md col-span-1 flex flex-col gap-2 p-4 bg-white"
      >
        <div class="flex items-center gap-2 space-x-2">
          <TriangleAlert color="orange" :size="20" />
          <h1 class="font-semibold text-orange-700">
            Stock Terendah ({{ totalItemsStockLow }} Item)
          </h1>
        </div>
        <CardLowStock
          v-for="item in lowStock"
          :key="item.id"
          :name="item.name"
          :stock="item.stock"
          :icon="TriangleAlert"
        />
      </div>
    </div>
  </div>
</template>
