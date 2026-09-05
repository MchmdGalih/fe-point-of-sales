<script setup lang="ts">
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AppCard from "@/components/ui/common/AppCard.vue";
import { MailCheck, PhoneCall, User2 } from "lucide-vue-next";

defineProps<{
  customerName: string;
}>();
</script>

<template>
  <AppCard
    :class="'flex flex-col h-full '"
    :header-class="'border-b'"
    :content-class="'flex-1 space-y-4'"
    :footer-class="'border-t'"
  >
    <template #header>
      <div class="flex items-center gap-x-2">
        <div
          class="flex items-center justify-center p-2 bg-slate-300 rounded-md"
        >
          <User2 :size="14" />
        </div>
        <h4 class="font-semibold">Customer</h4>
      </div>
    </template>

    <template #default>
      <div class="flex items-center gap-x-4">
        <Avatar class="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div class="flex flex-col gap-1">
          <h4 class="font-bold">{{ customerName }}</h4>
          <Badge variant="warning">
            <p class="text-orange-700">Gold, Member</p>
          </Badge>
        </div>
      </div>

      <div class="space-y-1">
        <div class="flex items-center gap-x-4">
          <PhoneCall :size="14" color="gray" />
          <p class="font-semibold">+62 123 456 789</p>
        </div>
        <div class="flex items-center gap-x-4">
          <MailCheck :size="14" color="gray" />
          <p class="font-semibold text-gray-400">@example.com</p>
        </div>
      </div>
    </template>

    <template #footer>
      <div
        class="w-full font-semibold text-gray-400 flex items-center justify-between py-2"
      >
        <p class="text-xs">Member ID: CUST</p>
        <p class="text-green-500 text-sm font-bold">Terverifikasi</p>
      </div>
    </template>
  </AppCard>
</template>
