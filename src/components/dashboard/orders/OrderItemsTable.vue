<script setup lang="ts">
import DataTable from "@/components/ui/data-table/DataTable.vue";
import { ORDER_DETAIL_COLUMNS } from "@/const/order";
import type { OrderItem } from "@/types/order";
import { formatCurrency } from "@/utils/format-currency";

interface Props {
  items: OrderItem[];
  isLoading: boolean;
}

defineProps<Props>();
</script>

<template>
  <DataTable
    :columns="ORDER_DETAIL_COLUMNS"
    :data="items"
    :isLoading="isLoading"
    class="border-none"
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
</template>
