<script setup lang="ts">
import { ref, watch } from "vue";
import { useOrdersStore } from "@/stores/orders";
import { storeToRefs } from "pinia";
import { useDebounceFn } from "@vueuse/core";
import SearchInput from "@/components/ui/search-input/SearchInput.vue";
import DataTable from "@/components/ui/data-table/DataTable.vue";
import type { OrderStatus } from "@/types/order";
import { Badge } from "@/components/ui/badge";
import { getOrderStatusVariant } from "@/helper/order-helper";
import { formatCurrency } from "@/utils/format-currency";
import { Button } from "@/components/ui/button";
import { Eye, ListFilter, Trash2 } from "lucide-vue-next";
import { formatDate } from "@/utils/format-date";
import FilterSelect from "@/components/ui/filter-select/FilterSelect.vue";
import { ORDER_COLUMNS, ORDER_STATUS_OPTIONS } from "@/const/order";

const orderStore = useOrdersStore();
const { orders, meta } = storeToRefs(orderStore);
const { getAllOrders } = orderStore;
const search = ref("");
const selectedStatus = ref<OrderStatus | "ALL">("ALL");
const isLoading = ref(false);

const fecthOrders = async (page: number = 1) => {
  try {
    isLoading.value = true;

    await getAllOrders({
      search: search.value,
      page,
      status: selectedStatus.value === "ALL" ? undefined : selectedStatus.value,
      limit: meta.value.limit,
    });
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = (page: number) => {
  fecthOrders(page);
};

const debouncedSearch = useDebounceFn(() => {
  fecthOrders();
}, 500);

watch(
  [search, selectedStatus],
  () => {
    debouncedSearch();
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="flex flex-col gap-4 px-6 py-2">
    <div class="space-y-1">
      <h1 class="font-bold text-4xl">Orders</h1>
      <p class="font-semibold">Manage and track all customer orders</p>
    </div>

    <!-- Search & Filter  -->
    <div
      class="flex items-center justify-between py-2 px-2 gap-2 border mb-0 rounded-md"
    >
      <SearchInput
        v-model="search"
        class="w-3/5 mb-0"
        placeholder="Cari order number atau customer name..."
      />

      <FilterSelect
        v-model="selectedStatus"
        :options="ORDER_STATUS_OPTIONS"
        placeholder="Filter Status"
      >
        <template #icon>
          <ListFilter class="size-5" />
        </template>
      </FilterSelect>
    </div>

    <!-- Table -->
    <DataTable
      :columns="ORDER_COLUMNS"
      :data="orders"
      :meta="meta"
      :loading="isLoading"
      @on-page-change="handlePageChange"
    >
      <template #orderNumber="{ row }"
        ><span class="font-bold text-indigo-700">{{
          row.orderNumber
        }}</span></template
      >

      <template #status="{ row }">
        <Badge :variant="getOrderStatusVariant(row.status as OrderStatus)">
          {{ row.status }}
        </Badge>
      </template>
      <template #totalAmount="{ row }">
        {{ formatCurrency(row.totalAmount) }}
      </template>

      <template #createdAt="{ row }">
        {{ formatDate(row.createdAt) }}
      </template>

      <template #actions="{ row }">
        <div class="flex items-center gap-2 px-3">
          <RouterLink
            :to="`/order/${row.id}`"
            class="bg-indigo-600 rounded-full"
          >
            <Button
              size="icon"
              title="View order"
              class="cursor-pointer"
              variant="link"
            >
              <Eye class="size-4" color="white" />
            </Button>
          </RouterLink>

          <Button
            size="icon"
            title="Delete order"
            variant="destructive"
            class="cursor-pointer"
          >
            <Trash2 class="size-4" />
          </Button>
        </div>
      </template>
    </DataTable>
  </div>
</template>
