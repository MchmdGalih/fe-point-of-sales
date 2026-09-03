<script setup lang="ts">
import { ref } from "vue";
import {
  ShoppingCart,
  Package,
  Receipt,
  LogOut,
  UserCog,
  CircleChevronLeft,
  Loader2,
  ClipboardList,
  Home,
} from "lucide-vue-next";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const authStore = useAuthStore();
const isLoading = ref<boolean>(false);
const router = useRouter();

const props = defineProps<{
  collapsed: boolean;
}>();

const menuItems = [
  {
    label: "Beranda",
    path: "/",
    icon: Home,
  },
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
    label: "Orders",
    path: "/orders",
    icon: ClipboardList,
  },
  {
    label: "Transaksi",
    path: "/",
    icon: Receipt,
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
    const response = await authStore.logout();

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    router.push({
      name: "login",
      query: {
        logout: "true",
      },
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <aside class="flex flex-col h-full px-2 py-2 border-r rounded-md">
    <header class="flex h-16 items-center justify-between px-4 border-b">
      <div class="flex items-center gap-3">
        <!-- Logo -->
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-800 text-white font-bold"
        ></div>

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
    </header>

    <!-- Navigation list dashboard! -->
    <nav class="flex-1 space-y-1 px-3 py-2">
      <p
        :class="[
          'font-semibold  text-gray-400 mt-2 mb-4',
          collapsed ? 'text-xs' : 'text-sm',
        ]"
      >
        MENU UTAMA
      </p>
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center rounded-lg py-2.5 mb-2 border border-gray-300 bg-indigo-700 text-white hover:bg-indigo-900 hover:text-white transform transition-color cursor-pointer',
          collapsed ? 'justify-center px-2' : 'gap-3 px-3',
        ]"
      >
        <component :is="item.icon" class="h-5 w-5 shrink-0" />

        <span v-if="!collapsed">
          {{ item.label }}
        </span>
      </RouterLink>
    </nav>

    <!-- Logout -->
    <div class="p-2 border-t">
      <button
        :disabled="isLoading"
        @click="handleSignOut"
        type="button"
        :class="[
          'mt-1 flex w-full items-center rounded-lg py-2.5 hover:text-white hover:bg-indigo-900 transform transition-colors cursor-pointer ',
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
