<script setup lang="ts" generic="T extends Record<string, any>">
import type { DataTableColumn, DataTableMeta } from "@/types/data-table";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

defineProps<{
  columns: DataTableColumn<T>[];
  data: T[];
  meta: DataTableMeta;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "on-page-change", page: number): void;
}>();
</script>

<template>
  <Table>
    <!-- Header -->
    <TableHeader>
      <TableRow>
        <TableHead
          v-for="column in columns"
          :key="column.key"
          class="border px-2 py-2 font-bold bg-slate-50"
          >{{ column.label }}</TableHead
        >

        <TableHead
          v-if="$slots.actions"
          class="border px-2 py-2 font-bold bg-slate-50"
        >
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>

    <!-- Body -->
    <TableBody>
      <!-- Loading -->
      <template v-if="loading">
        <TableRow v-for="row in 3" :key="row">
          <TableCell v-for="column in columns" :key="column.key" class="border">
            <Skeleton class="h-4 w-full" />
          </TableCell>
        </TableRow>
      </template>

      <!-- Data -->
      <template v-else-if="data.length > 0">
        <TableRow v-for="row in data">
          <TableCell
            v-for="column in columns"
            :key="String(column.key)"
            class="border"
          >
            <slot :name="String(column.key)" :row="row" :column="column">
              {{ row[column.key] }}
            </slot>
          </TableCell>

          <TableCell v-if="$slots.actions" class="border">
            <slot name="actions" :row="row" />
          </TableCell>
        </TableRow>
      </template>

      <!-- Empty -->
      <TableRow v-else>
        <TableCell :colspan="columns.length" class="h-24 text-center">
          Tidak ada order ditemukan.
        </TableCell>
      </TableRow>
    </TableBody>

    <!-- Footer -->
    <TableFooter class="border">
      <TableCell :colspan="columns.length" class="w-full">
        <div class="flex items-center justify-between">
          <p class="text-xs text-slate-500">
            Showing
            <span class="font-bold">
              {{
                meta.totalData === 0 ? 0 : (meta.page - 1) * meta.limit + 1
              }}</span
            >
            -
            <span class="font-bold">{{
              Math.min(meta.page * meta.limit, meta.totalData)
            }}</span>
            of
            <span class="font-bold">{{ meta.totalData }}</span>
            orders
          </p>

          <Pagination
            class="flex items-center space-x-2 justify-end"
            :page="meta.page"
            :total="meta.totalData"
            :items-per-page="meta.limit"
            :sibling-count="1"
            show-edges
            @update:page="emit('on-page-change', $event)"
          >
            <PaginationContent v-slot="{ items }">
              <PaginationPrevious />

              <template v-for="(item, index) in items" :key="index">
                <PaginationItem v-if="item.type === 'page'" :value="item.value">
                  <PaginationLink
                    :value="item.value"
                    class="text-accent-foreground"
                    :is-active="item.value === meta.page"
                  >
                    {{ item.value }}
                  </PaginationLink>
                </PaginationItem>

                <PaginationEllipsis v-else />
              </template>

              <PaginationNext />
            </PaginationContent>
          </Pagination>
        </div>
      </TableCell>
    </TableFooter>
  </Table>
</template>
