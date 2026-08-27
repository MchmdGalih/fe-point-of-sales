<script setup lang="ts">
import {
  ShoppingCart,
  Package,
  Receipt,
  Users,
  BarChart3,
  LogOut,
  UserCog,
  CircleChevronLeft,
  Loader2,
} from "lucide-vue-next";

import { ref } from "vue";

const isLoading = ref<boolean>(false);

const props = defineProps<{
  collapsed: boolean;
}>();

const menuItems = [
  {
    label: "Kasir",
    path: "/",
    icon: ShoppingCart,
  },
  {
    label: "Produk",
    path: "/",
    icon: Package,
  },
  {
    label: "Pelanggan",
    path: "/",
    icon: Users,
  },
  {
    label: "Transaksi",
    path: "/",
    icon: Receipt,
  },
  {
    label: "Laporan",
    path: "/",
    icon: BarChart3,
  },
  {
    label: "Users",
    path: "/",
    icon: UserCog,
  },
];

const emit = defineEmits<{
  toggleCollapse: [];
}>();

const handleSignOut = async () => {
  try {
    isLoading.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <aside class="flex flex-col h-full">
    <div class="flex h-16 items-center justify-between px-4">
      <div class="flex items-center gap-3">
        <!-- Logo -->
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold"
        >
          P
        </div>

        <!-- App Name -->
        <span
          v-if="!collapsed"
          class="whitespace-nowrap text-lg font-bold text-slate-800"
        >
          POS App
        </span>
      </div>

      <button
        type="button"
        @click="emit('toggleCollapse')"
        class="cursor-pointer"
      >
        <CircleChevronLeft
          :size="22"
          :class="[
            'transition-transform duration-500 ease-in-out',
            collapsed ? 'rotate-180' : 'rotate-0',
          ]"
        />
      </button>
    </div>

    <!-- Navigation list dashboard! -->
    <nav class="flex-1 space-y-1 px-3 py-2">
      <p class="font-semibold text-sm text-gray-400 mt-2 mb-4">MENU UTAMA</p>
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center rounded-lg py-2.5 mb-2',
          collapsed ? 'justify-center px-2' : 'gap-3 px-3',
        ]"
        active-class="bg-indigo-700 text-white"
      >
        <component :is="item.icon" class="h-5 w-5 shrink-0" />

        <span v-if="!collapsed">
          {{ item.label }}
        </span>
      </RouterLink>
    </nav>

    <!-- Logout -->
    <div class="p-2">
      <button
        :disabled="isLoading"
        @click="handleSignOut"
        type="button"
        :class="[
          'mt-1 flex w-full items-center rounded-lg py-2.5 text-white cursor-pointer bg-red-700',
          collapsed ? 'justify-center px-2' : 'gap-3 px-3',
        ]"
      >
        <Loader2 v-if="isLoading" class="h-5 w-5 shrink-0 animate-spin" />
        <LogOut v-else class="h-5 w-5 shrink-0" />
        <span v-if="!collapsed">{{
          isLoading ? "Logging out..." : "Logout"
        }}</span>
      </button>
    </div>
  </aside>
</template>
