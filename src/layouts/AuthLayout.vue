<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center">
    <div class="w-full h-screen lg:grid lg:grid-cols-2">
      <div
        class="flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-32 bg-white"
      >
        <section class="mb-12">
          <span>LOGO</span>
        </section>

        <div class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p class="text-slate-500">
            Enter your credentials to access your account
          </p>
        </div>

        <RouterView />
      </div>

      <div class="hidden lg:block relative overflow-hidden">
        <div class="absolute inset-0 bg-secondary z-0">
          <div
            class="absolute inset-0 bg-linear-to-br from-indigo-600 to-transparent"
          ></div>
        </div>

        <div
          class="relative  z-10 h-full flex flex-col items-center justify-center p-12 text-center text-white"
        >
          <h2
            class="text-4xl xl:text-5xl font-extrabold mb-6 leading-tight max-w-lg"
          >
            Next-Gen POS for
            <span
              class="text-transparent bg-clip-text bg-linear-to-r from-indigo-100 to-indigo-600"
              >Modern Business.</span
            >
          </h2>
          <p class="text-neutral-200 text-lg mb-12 max-w-md">
            Empower your retail operations with real-time sales tracking,
            automated inventory management, and seamless payment processing.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
