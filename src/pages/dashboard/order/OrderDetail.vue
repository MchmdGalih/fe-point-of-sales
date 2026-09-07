<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "@/services/api";
import type { OrderDetail } from "@/types/order";

import OrderCustomerCard from "@/components/dashboard/orders/OrderCustomerCard.vue";
import OrderCashierCard from "@/components/dashboard/orders/OrderCashierCard.vue";
import OrderTimeline from "@/components/dashboard/orders/OrderTimeline.vue";
import OrderPaymentCard from "@/components/dashboard/orders/OrderPaymentCard.vue";
import OrderDetailCard from "@/components/dashboard/orders/OrderDetailCard.vue";

const route = useRoute();
const router = useRouter();
const detailOrder = ref<OrderDetail | null>(null);
const isLoading = ref(false);

const orderNumber = computed(() => {
  return detailOrder.value?.orderNumber ?? "";
});

const customerName = computed(() => {
  return detailOrder.value?.customerName ?? "";
});

const cashierName = computed(() => {
  return detailOrder.value?.cashier.username ?? "";
});

const orderStatus = computed(() => {
  return detailOrder.value?.status ?? "PENDING";
});

const totalItems = computed(() => {
  return detailOrder?.value?.orderItems.length ?? 0;
});

const totalQuantity = computed(() => {
  return (
    detailOrder?.value?.orderItems.reduce(
      (total, item) => total + item.quantity,
      0,
    ) ?? 0
  );
});

const paymentSummary = computed(() => {
  const dataPayment = detailOrder?.value?.payment;

  if (!dataPayment) return null;

  return {
    id: dataPayment.id,
    orderId: dataPayment.orderId,
    method: dataPayment.method,
    amount: dataPayment.amount,
    change: dataPayment.change,
    paymentNumber: dataPayment.paymentNumber,
    providerTransactiondId: dataPayment.providerTransactionId,
    providerPaymentType: dataPayment.providerPaymentType,
    status: dataPayment.status,
    paidAt: dataPayment.paidAt,
  };
});
const fetchOrderDetail = async () => {
  try {
    const response = await api.get(`/order/${route.params.id}`);

    if (response.status === 200) {
      detailOrder.value = response.data.data;
    }
  } catch (error: Error | any) {
    if (error.response.status === 404) {
      return router.replace({ name: "not-found" });
    }
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchOrderDetail();
});
</script>

<template>
  <div class="space-y-6 py-4 px-6">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
      <div class="lg:col-span-9">
        <!-- Card Detail Order -->
        <OrderDetailCard
          :orderNumber="orderNumber"
          :status="orderStatus"
          :isLoading="isLoading"
          :totalItems="totalItems"
          :items="detailOrder?.orderItems ?? []"
          :totalQuantity="totalQuantity"
        />
      </div>
      <!-- Card Payment -->
      <div class="lg:col-span-3">
        <OrderPaymentCard
          v-if="paymentSummary"
          :data="paymentSummary"
          :totalAmount="detailOrder?.totalAmount ?? 0"
          :status="paymentSummary.status"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
      <!-- Card Cashier -->
      <div class="md:col-span-1 lg:col-span-4 h-full">
        <OrderCashierCard :cashierName="cashierName" />
      </div>

      <!-- Card Customer -->
      <div class="md:col-span-1 lg:col-span-4 h-full">
        <OrderCustomerCard :customerName="customerName" />
      </div>

      <!-- Card TimeLine -->
      <div class="md:col-span-1 lg:col-span-4 h-full">
        <OrderTimeline :status="orderStatus" />
      </div>
    </div>
  </div>
</template>
