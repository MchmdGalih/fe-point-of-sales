export type OrderStatus = "COMPLETED" | "PENDING" | "CANCELLED";

export interface Order {
  id: string;
  orderNumber: string;
  totalAmount: number;
  customerName: string;
  cashier: {
    id: string;
    username: string;
  };
  status: OrderStatus;
  itemsCount: number;
  createdAt: string;
}

export interface OrdersParams {
  search?: string;
  page?: number;
  status?: OrderStatus;
  limit?: number;
}

export interface OrderMeta {
  page: number;
  limit: number;
  totalData: number;
  totalPage: number;
}
