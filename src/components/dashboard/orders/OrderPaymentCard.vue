<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Payment } from "@/types/payment";
import { formatCurrency } from "@/utils/format-currency";
import { CreditCard } from "lucide-vue-next";

interface Props {
  data: Payment;
  totalAmount: number;
}

const props = defineProps<Props>();
</script>

<template>
  <Card class="px-4 py-4">
    <CardHeader class="flex flex-col p-2 border-b border-b-gray-200">
      <div class="flex items-center justify-between">
        <CardTitle class="font-bold">
          <h4 class="font-bold">Pembayaran</h4>
          <p class="font-semibold text-slate-700">
            {{ props.data.paymentNumber }}
          </p>
        </CardTitle>
        <Badge variant="success">Paid</Badge>
      </div>
    </CardHeader>
    <CardContent class="flex flex-col px-0">
      <div class="flex flex-col gap-2 px-2">
        <div class="text-sm flex items-center justify-between">
          <p class="font-semibold text-slate-700">Total Pembayaran</p>
          <span class="font-bold">{{ formatCurrency(props.totalAmount) }}</span>
        </div>
        <div class="font-semibold text-sm flex items-center justify-between">
          <p>Uang yang dibayarkan</p>
          <span>{{ formatCurrency(props.data.amount) }}</span>
        </div>
        <div class="font-semibold text-sm flex items-center justify-between">
          <p>Total Kembalian</p>
          <span>{{ formatCurrency(props.data.change) }}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex items-center px-2 border-t border-t-gray-200">
      <div class="flex items-center gap-2">
        <CreditCard color="gray" :size="14" />
        <p class="text-xs font-semibold">
          Metode pembayaran: {{ props.data.method }}
        </p>
      </div>
    </CardFooter>
  </Card>
</template>
