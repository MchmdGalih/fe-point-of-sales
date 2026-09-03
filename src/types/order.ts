export type OrderStatus = "COMPLETED" | "PENDING" | "CANCELED";

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

export interface OrderDetail extends Order {
  orderItems: OrderItem[];
}

export interface OrderItem {
  quantity: number;
  price: number;
  productName: string;
  subtotal: number;
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
