import { api } from "@/services/api";
import type { DashboardSummary } from "@/types/dashboard";
import { getApiErrorMessage } from "@/utils/api-errors";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDashboardStore = defineStore("dashboard", () => {
  const summary = ref<DashboardSummary>({
    totalOrders: 0,
    revenue: 0,
    paidOrders: 0,
    pendingOrders: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    totalCustomers: 0,
    averageOrderValue: 0,
  });

  async function getDashboardSummary() {
    try {
      const response = await api.get("dashboard/summary");

      const { data, message } = response.data;

      summary.value = data.summary;

      return {
        status: "success",
        message: message,
      };
    } catch (error) {
      return {
        status: "error",
        message: getApiErrorMessage(error),
      };
    }
  }

  return {
    summary,
    getDashboardSummary,
  };
});
