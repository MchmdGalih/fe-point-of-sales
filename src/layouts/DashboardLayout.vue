<script lang="ts"></script>

<template>
  <div class="min-h-screen">
    <div class="flex min-h-screen">
      <!-- SIDEBAR! -->
      <aside class="w-64 shrink-0 border-r border-secondary">SIDEBAR</aside>
      <!-- MAIN AREA -->
      <div class="flex min-w-0 flex-1 flex-col">
        <!-- HEADER -->
        <header class="h-16 shrink-0 border-b border-secondary">HEADER</header>

        <!-- CONTENT -->
        <main class="flex-1 p-6 border-2">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>
