<script setup lang="ts">
interface Props {
  class?: string;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
}

defineProps<Props>();
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
</script>

<template>
  <Card :class="class">
    <CardHeader v-if="$slots.header" :class="headerClass">
      <slot name="header" />
    </CardHeader>

    <CardContent :class="contentClass">
      <slot />
    </CardContent>

    <CardFooter v-if="$slots.footer" :class="footerClass">
      <slot name="footer" />
    </CardFooter>
  </Card>
</template>
