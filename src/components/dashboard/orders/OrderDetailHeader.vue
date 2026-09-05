<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { getOrderStatusVariant } from "@/helper/order-helper";
import type { OrderStatus } from "@/types/order";

interface Props {
  orderNumber: string;
  status: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="flex items-center gap-2">
    <h1 class="font-bold lg:text-4xl md:text-2xl px-2">
      Order #{{ orderNumber }}
    </h1>
    <Badge :variant="getOrderStatusVariant(status as OrderStatus)">{{
      status
    }}</Badge>
  </div>
</template>
