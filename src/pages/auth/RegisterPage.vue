<script setup lang="ts">
import { reactive, ref } from "vue";

const form = reactive({
  username: "",
  email: "",
  password: "",
});

const visiblePassword = ref(false);
const isLoading = ref(false);

const handleTogglePassword = () => {
  visiblePassword.value = !visiblePassword.value;
};

const handleRegister = () => {
  isLoading.value = true;
  try {
    console.log(form);
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleRegister">
    <div>
      <label class="block text-sm font-medium text-slate-700 mb-1"
        >Username</label
      >
      <input
        v-model="form.username"
        type="text"
        placeholder="username"
        required
        class="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-slate-700 mb-1">Email</label>
      <input
        v-model="form.email"
        type="email"
        placeholder="email@contoh.com"
        required
        class="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-1"
        >Password</label
      >
      <input
        v-model="form.password"
        :type="visiblePassword ? 'text' : 'password'"
        placeholder="••••••••"
        required
        class="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div class="flex items-center mt-2">
        <input
          id="show-password"
          type="checkbox"
          class="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
          @change="handleTogglePassword"
        />
        <label
          for="show-password"
          class="ml-2 text-sm font-medium text-gray-900"
          >Show password</label
        >
      </div>
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition"
    >
      {{ isLoading ? "Loading..." : "Register" }}
    </button>

    <div class="text-center">
      <p class="text-sm text-slate-500">
        have an account?
        <RouterLink
          to="/auth/login"
          class="text-indigo-600 hover:text-indigo-700 transition"
          >Login</RouterLink
        >
      </p>
    </div>
  </form>
</template>
