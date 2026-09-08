import { api } from "@/services/api";
import type {
  DashboardSummary,
  LowStock,
  PeriodeType,
  SalesTrend,
} from "@/types/dashboard";
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

  const lowStock = ref<LowStock[]>([]);
  const salesTrendData = ref<SalesTrend>({
    period: "year",
    salesTrend: [],
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

  async function getLowStock() {
    try {
      const response = await api.get("dashboard/stock-low-products");

      const { data, message } = response.data;

      lowStock.value = data;

      return {
        status: true,
        message: message,
      };
    } catch (error) {
      return {
        status: false,
        message: getApiErrorMessage(error),
      };
    }
  }

  async function getSalesTrend(periode: PeriodeType = "year") {
    try {
      const response = await api.get("dashboard/sales-trend", {
        params: {
          period: periode,
        },
      });

      const { data, message } = response.data;

      salesTrendData.value = data;
      return {
        status: true,
        message: message,
      };
    } catch (error) {
      return {
        status: false,
        message: getApiErrorMessage(error),
      };
    }
  }

  return {
    summary,
    lowStock,
    salesTrendData,
    getDashboardSummary,
    getLowStock,
    getSalesTrend,
  };
});
