<script setup lang="ts">
import type { OrderItem } from "@/types/order.ts";
import OrderDetailHeader from "./OrderDetailHeader.vue";
import OrderItemsTable from "./OrderItemsTable.vue";
import AppCard from "@/components/ui/common/AppCard.vue";

interface Props {
  orderNumber: string;
  status: string;
  items: OrderItem[];
  isLoading: boolean;
  totalItems: number;
  totalQuantity: number;
}

defineProps<Props>();
</script>

<template>
  <AppCard
    :class="'p-0 gap-0 flex flex-col h-full rounded-md '"
    :headerClass="'px-2 py-4 gap-0'"
    :content-class="'px-0 py-0 flex-1'"
    :footer-class="'px-2 bg-slate-100 py-4'"
  >
    <!-- Header Order Detail -->
    <template #header>
      <OrderDetailHeader :orderNumber="orderNumber" :status="status" />
    </template>

    <!-- Table Order Items -->
    <template #default>
      <div class="h-full flex-1">
        <OrderItemsTable :items="items" :isLoading="isLoading" />
      </div>
    </template>

    <template #footer>
      <div
        class="w-full font-semibold text-gray-400 flex items-center justify-between"
      >
        <small>Pesanan telah diproses & dikonfirmasi</small>
        <small> Total {{ totalItems }} item ({{ totalQuantity }} Qty) </small>
      </div>
    </template>
  </AppCard>
</template>
