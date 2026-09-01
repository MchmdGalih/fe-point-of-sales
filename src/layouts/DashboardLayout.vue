<script setup lang="ts">
import { onMounted, ref } from "vue";
import SideBar from "../components/dashboard/SideBar.vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();
const isSidebarCollapse = ref<boolean>(false);

const toggleSidebar = (): void => {
  isSidebarCollapse.value = !isSidebarCollapse.value;
};

onMounted(() => {
  if (route.query.login === "true") {
    toast.success("Login berhasil");
  }

  router.replace({ path: route.path, query: {} });
});
</script>

<template>
  <div class="min-h-screen">
    <div class="flex min-h-screen">
      <!-- SIDEBAR! -->
      <aside
        :class="[
          'shrink-0 bg-white p-2 transition-[width] duration-400 lg:block ',
          isSidebarCollapse ? 'w-30' : 'w-64',
        ]"
      >
        <SideBar
          :collapsed="isSidebarCollapse"
          @toggle-collapse="toggleSidebar"
        />
      </aside>
      <!-- MAIN AREA -->
      <div class="flex min-w-0 flex-1 flex-col">
        <!-- CONTENT -->
        <main class="flex-1 p-2">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
