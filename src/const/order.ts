import type { PeriodeType } from "@/types/dashboard";
import type { DataTableColumn } from "@/types/data-table";
import type { Order, OrderItem, OrderStatus } from "@/types/order";

export const ORDER_COLUMNS: DataTableColumn<Order>[] = [
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

export const ORDER_STATUS_OPTIONS: {
  label: string;
  value: OrderStatus | "ALL";
}[] = [
  { label: "All Status", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Canceled", value: "CANCELED" },
];

export const ORDER_DETAIL_COLUMNS: DataTableColumn<OrderItem>[] = [
  {
    key: "productName",
    label: "Items",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "quantity",
    label: "Quantity",
  },

  {
    key: "subtotal",
    label: "Subtotal",
  },
];

export const ORDER_STEPS = [
  {
    step: 1,
    title: "Order dibuat!",
    description: "Order sedang dibuat!",
  },
  {
    step: 2,
    title: "Order selesai!",
    description: "Order diselesaikan!",
  },
];

export const PERIOD_TREND_ORDER_OPTIONS = [
  {
    label: "Hari Ini",
    value: "today" as PeriodeType,
  },
  {
    label: "Minggu Ini",
    value: "week" as PeriodeType,
  },
  {
    label: "Bulan Ini",
    value: "month" as PeriodeType,
  },
  {
    label: "Tahun Ini",
    value: "year" as PeriodeType,
  },
];
