<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { api } from "@/services/api";
import type { OrderDetail, OrderStatus } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { getOrderStatusVariant } from "@/helper/order-helper";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import { ORDER_DETAIL_COLUMNS } from "@/const/order";
import { formatCurrency } from "@/utils/format-currency";
import OrderCustomerCard from "@/components/dashboard/orders/OrderCustomerCard.vue";
import OrderCashierCard from "@/components/dashboard/orders/OrderCashierCard.vue";
import OrderTimeline from "@/components/dashboard/orders/OrderTimeline.vue";

const route = useRoute();
const detailOrder = ref<OrderDetail | null>(null);
const isLoading = ref(false);

const orderNumber = computed(() => {
  return detailOrder.value?.orderNumber ?? "";
});

const customerName = computed(() => {
  return detailOrder.value?.customerName ?? "";
});

const cashierName = computed(() => {
  return detailOrder.value?.cashier.username ?? "";
});

const orderStatus = computed(() => {
  return detailOrder.value?.status ?? null;
});

const fetchOrderDetail = async () => {
  try {
    const response = await api.get(`/order/${route.params.id}`);

    if (response.status === 200) {
      detailOrder.value = response.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchOrderDetail();
});
</script>

<template>
  <div class="px-6 py-4 h-full">
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-3">
        <!-- Header Order Detail -->
        <div
          class="flex items-center gap-2 px-1 py-2 bg-slate-100 border-t border-r border-l"
        >
          <h1 class="font-bold text-2xl px-2">Order #{{ orderNumber }}</h1>
          <Badge
            :variant="getOrderStatusVariant(detailOrder?.status as OrderStatus)"
            >{{ detailOrder?.status }}</Badge
          >
        </div>

        <!-- Table Order Items -->
        <DataTable
          :columns="ORDER_DETAIL_COLUMNS"
          :data="detailOrder?.orderItems ?? []"
          :isLoading="isLoading"
        >
          <template #productName="{ row }">
            <div class="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"
                alt="product-name"
                class="size-10 rounded-md object-cover"
                loading="lazy"
              />
              <span class="font-medium">
                {{ row.productName }}
              </span>
            </div>
          </template>

          <template #price="{ row }">
            {{ formatCurrency(row.price) }}
          </template>

          <template #subtotal="{ row }">
            {{ formatCurrency(row.subtotal) }}
          </template>
        </DataTable>
      </div>
      <div class="col-span-1 space-y-4">
        <!-- Card Customer -->
        <OrderCustomerCard :customerName="customerName" />

        <!-- Card Cashier -->
        <OrderCashierCard :cashierName="cashierName" />

        <!-- Card TimeLine -->
        <OrderTimeline :status="orderStatus" />
      </div>
    </div>
  </div>
</template>
