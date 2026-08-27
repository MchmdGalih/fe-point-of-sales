<script setup lang="ts">
import { reactive, ref } from "vue";
import type { LoginPayload } from "../../types/auth";
import { useZodValidation } from "../../composables/useZodValidation";
import { loginSchemas } from "../../schemas/auth.schema";
import { toast } from "vue3-toastify";
import { useAuthStore } from "../../stores/auth";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = reactive<LoginPayload>({
  email: "",
  password: "",
});
const { errors, validate, clearErrors } = useZodValidation();

const visiblePassword = ref(false);
const isLoading = ref(false);

const handleTogglePassword = () => {
  visiblePassword.value = !visiblePassword.value;
};

const handleLogin = async () => {
  const validation = validate(loginSchemas, form);

  if (!validation.success) {
    return;
  }
  try {
    isLoading.value = true;

    const response = await authStore.login(validation.data);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    router.push({
      name: "dashboard",
      query: {
        login: "true",
      },
    });

    clearErrors();
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (route.query.registered === "true") {
    toast.success("Registrasi berhasil, silahkan login");
  }

  router.replace({ path: route.path, query: {} });
});
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleLogin">
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
      <span v-if="errors.password" class="text-red-500 text-sm">
        {{ errors.password }}
      </span>
    </div>

    <button
      type="submit"
      :disabled="isLoading"
      class="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition"
    >
      {{ isLoading ? "Loading..." : "Login" }}
    </button>

    <div class="text-center">
      <p class="text-sm text-slate-500">
        Don't have an account?
        <RouterLink
          to="/auth/register"
          class="text-indigo-600 hover:text-indigo-700 transition"
          >Register</RouterLink
        >
      </p>
    </div>
  </form>
</template>
