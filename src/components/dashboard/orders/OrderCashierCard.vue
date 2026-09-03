<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Store } from "lucide-vue-next";

defineProps<{
  cashierName: string;
}>();
</script>

<template>
  <Card class="px-4 gap-3">
    <section class="flex items-center gap-x-2">
      <Store />
      <h4 class="font-semibold">Register Info</h4>
    </section>

    <section>
      <small class="text-accent-foreground">CASHIER</small>
      <p class="font-semibold">{{ cashierName.toLocaleUpperCase() }}</p>
    </section>

    <section>
      <small class="text-accent-foreground">LOCATION</small>
      <p class="">Bandung, Jawa Barat</p>
    </section>
  </Card>
</template>
