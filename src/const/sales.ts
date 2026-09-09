import type { ChartConfig } from "@/components/ui/chart";
import type { PeriodeType } from "@/types/dashboard";
import type { PaymentMethod } from "@/types/payment";

export const SALES_TREND_DATE_OPTIONS = {
  day: {
    hour: "2-digit",
    minute: "2-digit",
  },
  week: {
    weekday: "long",
  },

  month: {
    day: "numeric",
  },

  year: {
    month: "long",
  },
} satisfies Record<PeriodeType, Intl.DateTimeFormatOptions>;

export const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563eb",
  },
  totalOrders: {
    label: "Total Orders",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export const chartPaymentConfig = {
  paymentMethod: {
    label: "Payment Method",
    color: "#2563eb",
  },

  transactionCount: {
    label: "Transaction Transaksi",
    color: "#60a5fa",
  },
  amount: {
    label: "Total Pembayaran",
    color: "#2563eb",
  },
};
