export interface DashboardSummary {
  totalOrders: number;
  revenue: number;
  paidOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  totalCustomers: number;
  averageOrderValue: number;
}

export interface LowStock {
  id: string;
  name: string;
  stock: number;
}

export type PeriodeType = "today" | "week" | "month" | "year" | "custom";

export interface SalesTrend {
  period: PeriodeType;
  salesTrend: SalesTrendItem[];
}

export interface SalesTrendItem {
  date: Date;
  totalOrders: number;
  revenue: number;
}
