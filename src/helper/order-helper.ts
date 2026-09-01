import type { OrderStatus } from "@/types/order";

export const getOrderStatusVariant = (status: OrderStatus) => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "PENDING":
      return "secondary";
    case "CANCELLED":
      return "destructive";
    default:
      return "default";
  }
};
