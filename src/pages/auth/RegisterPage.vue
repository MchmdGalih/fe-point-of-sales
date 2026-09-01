<script setup lang="ts">
import { reactive, ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import type { RegisterPayload } from "../../types/auth";
import { useRouter } from "vue-router";
import { useZodValidation } from "../../composables/useZodValidation";
import { registerSchemas } from "../../schemas/auth.schema";
import { toast } from "vue3-toastify";
import PasswordInput from "@/components/ui/password-input/PasswordInput.vue";

const router = useRouter();
const authStore = useAuthStore();
const { errors, validate, clearErrors } = useZodValidation();

const form = reactive<RegisterPayload>({
  username: "",
  email: "",
  password: "",
});

const isLoading = ref(false);

const handleRegister = async () => {
  const validation = validate(registerSchemas, form);

  if (!validation.success) {
    return;
  }

  try {
    isLoading.value = true;

    const response = await authStore.register(validation.data);
    if (!response.success) {
      toast.error(response.message);
      return;
    }

    clearErrors();

    router.push({
      name: "login",
      query: {
        registered: "true",
      },
    });
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
      <span v-if="errors.username" class="text-red-500 text-sm">
        {{ errors.username }}
      </span>
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
      <span v-if="errors.email" class="text-red-500 text-sm">
        {{ errors.email }}
      </span>
    </div>

    <div>
      <label class="block text-sm font-medium text-slate-700 mb-1"
        >Password</label
      >
      <PasswordInput v-model="form.password" placeholder="••••••••" />
      <span v-if="errors.password" class="text-red-500 text-sm">
        {{ errors.password }}
      </span>
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
