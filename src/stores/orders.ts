import { api } from "@/services/api";
import type { Order, OrderMeta, OrdersParams } from "@/types/order";
import { getApiErrorMessage } from "@/utils/api-errors";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrdersStore = defineStore("orders", () => {
  const orders = ref<Order[]>([]);
  const meta = ref<OrderMeta>({
    page: 1,
    limit: 10,
    totalData: 0,
    totalPage: 0,
  });

  async function getAllOrders(params: OrdersParams = {}) {
    try {
      const response = await api.get("/order", {
        params,
      });
      const { data, message, meta } = response.data;

      orders.value = data;
      meta.value = meta;
      return {
        success: true,
        message,
      };
    } catch (error) {
      return {
        success: false,
        message: getApiErrorMessage(error),
      };
    }
  }

  return {
    orders,
    meta,
    getAllOrders,
  };
});
