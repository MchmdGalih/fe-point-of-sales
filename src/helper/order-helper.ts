import type { OrderStatus } from "@/types/order";
import type { PaymentStatus } from "@/types/payment";

type status = OrderStatus | PaymentStatus;

export const getOrderStatusVariant = (status: status) => {
  switch (status) {
    case "COMPLETED":
    case "PAID":
      return "success";
    case "PENDING":
      return "secondary";
    case "CANCELED":
    case "FAILED":
    case "EXPIRED":
    case "CANCELLED":
      return "destructive";
    default:
      return "default";
  }
};
