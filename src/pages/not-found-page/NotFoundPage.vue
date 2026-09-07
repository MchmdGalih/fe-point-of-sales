<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-vue-next";

const router = useRouter();
</script>

<template>
  <div class="w-full flex justify-center items-center h-screen">
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you're looking for doesn't exist. Try searching for what you
          need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <EmptyDescription>
          <Button @click="router.back()">
            <ArrowLeft :size="24" />
            Kembali
          </Button>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  </div>
</template>
