export type PaymentMethod = "CASH" | "MIDTRANS";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "EXPIRED"
  | "CANCELLED";

export interface Payment {
  id: string;
  method: string;
  amount: number;
  change: number;
  orderId: string;
  status: PaymentStatus;
  paymentNumber: string | null;
  provider?: string | null;
  providerTransactionId?: string | null;
  providerPaymentType?: string | null;
  snapToken?: string | null;
  paidAt: string;
}
