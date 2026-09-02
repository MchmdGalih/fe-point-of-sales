import type { DataTableColumn } from "@/types/data-table";
import type { Order, OrderStatus } from "@/types/order";

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
