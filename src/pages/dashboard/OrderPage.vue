<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useOrdersStore } from "@/stores/orders";
import SearchInput from "@/components/ui/search-input/SearchInput.vue";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getOrderStatusVariant } from "@/helper/order-helper";
import { formatDate } from "@/utils/format-date";
import { formatCurrency } from "@/utils/format-currency";
import type { Order } from "@/types/order";
import { useDebounceFn } from "@vueuse/core";

const columns = [
  {
    key: "orderNumber",
    label: "Order ID",
  },
  {
    key: "customerName",
    label: "Customer",
  },
  {
    key: "itemsCount",
    label: "Items",
  },
  {
    key: "totalAmount",
    label: "Total",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "createdAt",
    label: "Date",
  },
];

const orderStore = useOrdersStore();
const search = ref<string>("");

const orderDataTable = computed(() => {
  const keyword = search.value.toLowerCase().trim();

  return orderStore.orders
    .filter((order: Order) => {
      return (
        order.orderNumber.toLowerCase().includes(keyword) ||
        order.customerName.toLowerCase().includes(keyword)
      );
    })
    .map((order: Order) => {
      return {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        itemsCount: order.itemsCount,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
      };
    });
});

const debouncedSearch = useDebounceFn(() => {
  orderStore.getAllOrders({
    search: search.value,
    page: 1,
    limit: orderStore.meta.limit,
  });
}, 500);

watch(search, debouncedSearch);

onMounted(async () => {
  await orderStore.getAllOrders({
    page: 1,
    limit: 10,
  });
});
</script>

<template>
  <div
    class="h-full space-y-6 flex flex-col gap-4 p-4 bg-gray-50 rounded-md shadow-md"
  >
    <div class="space-y-1">
      <h1 class="font-bold text-4xl">Orders</h1>
      <p class="font-semibold">Manage and track all customer orders</p>
    </div>

    <SearchInput
      v-model="search"
      class="w-full shadow-xs"
      placeholder="Cari order number atau customer name..."
    />

    <div class="overflow-hidden shadow-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              v-for="column in columns"
              :key="column.key"
              class="border px-2 py-2 font-bold bg-slate-50"
              >{{ column.label }}</TableHead
            >
          </TableRow>
        </TableHeader>
        <TableBody class="border-2">
          <TableRow v-for="order in orderDataTable" :key="order.id">
            <TableCell class="border">{{ order.orderNumber }}</TableCell>
            <TableCell class="border">{{ order.customerName }}</TableCell>
            <TableCell class="border">{{ order.itemsCount }}</TableCell>
            <TableCell class="border">{{
              formatCurrency(order.totalAmount)
            }}</TableCell>
            <TableCell class="border">
              <Badge
                :variant="getOrderStatusVariant(order.status)"
                class="bg-green-600"
                >{{ order.status }}</Badge
              >
            </TableCell>
            <TableCell class="border">{{
              formatDate(order.createdAt)
            }}</TableCell>
          </TableRow>

          <TableRow v-if="orderDataTable.length === 0">
            <TableCell :colspan="columns.length" class="h-24 text-center">
              Tidak ada order ditemukan.
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter> </TableFooter>
      </Table>
    </div>
  </div>
</template>
