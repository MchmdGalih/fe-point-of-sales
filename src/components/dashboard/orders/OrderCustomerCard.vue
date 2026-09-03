<script setup lang="ts">
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { MailCheck, PhoneCall, User2 } from "lucide-vue-next";

defineProps<{
  customerName: string;
}>();
</script>

<template>
  <Card class="px-4 gap-3">
    <div class="flex items-center gap-x-2">
      <User2 />
      <h4 class="font-semibold">Customer</h4>
    </div>

    <div class="flex items-center gap-x-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span>
        <p>{{ customerName }}</p>
        <small>Gold, Member</small>
      </span>
    </div>

    <span class="flex items-center gap-x-2">
      <PhoneCall :size="16" />
      <small>+62 123 456 789</small>
    </span>
    <span class="flex items-center gap-x-2">
      <MailCheck :size="16" />
      <small>@example.com</small>
    </span>
  </Card>
</template>
