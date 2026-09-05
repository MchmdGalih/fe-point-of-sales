<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import AppCard from "@/components/ui/common/AppCard.vue";
import { getOrderStatusVariant } from "@/helper/order-helper";
import type { Payment, PaymentStatus } from "@/types/payment";
import { formatCurrency } from "@/utils/format-currency";
import { CreditCard } from "lucide-vue-next";

interface Props {
  data: Payment;
  totalAmount: number;
  status: string;
}

defineProps<Props>();
</script>

<template>
  <AppCard>
    <template #header>
      <section class="flex items-center justify-between">
        <div class="flex flex-col space-y-0">
          <h4 class="font-bold">Pembayaran</h4>
          <small class="font-semibold text-slate-400">
            {{ data.paymentNumber }}
          </small>
        </div>

        <Badge :variant="getOrderStatusVariant(status as PaymentStatus)">{{
          status
        }}</Badge>
      </section>
    </template>

    <template #default>
      <div class="flex-1 h-full">
        <div class="flex items-center justify-between">
          <p class="font-bold text-xs">Total Pembayaran</p>
          <p class="font-bold">{{ formatCurrency(totalAmount) }}</p>
        </div>
        <div class="flex items-center pb-2 border-b justify-between">
          <p class="font-bold text-xs">Uang yang dibayarkan</p>
          <p class="font-bold">{{ formatCurrency(data.amount) }}</p>
        </div>
        <div class="flex items-center text-green-500 mt-2 justify-between">
          <p class="font-bold text-xs">Total kembalian</p>
          <p class="font-bold">{{ formatCurrency(data.change) }}</p>
        </div>
      </div>
    </template>

    <template #footer>
      <CreditCard color="gray" :size="16" class="mr-2" />
      <p class="text-xs font-semibold text-slate-400">
        Metode:
        {{ data.providerPaymentType ? data.providerPaymentType : "Tunai" }}
        ({{ data.method }})
      </p>
    </template>
  </AppCard>
</template>
