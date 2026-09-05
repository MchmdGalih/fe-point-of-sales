<script setup lang="ts">
import AppCard from "@/components/ui/common/AppCard.vue";
</script>

<template>
  <AppCard
    :class="'flex flex-col h-full '"
    :header-class="'border-b'"
    :content-class="'flex-1 space-y-4'"
    :footer-class="'border-t'"
  >
    <template #header> </template>

    <template #default> </template>

    <template #footer> </template>
  </AppCard>
</template>
