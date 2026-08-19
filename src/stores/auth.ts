import { api } from "@/services/api";
import type { LoginPayload, RegisterPayload, Users } from "@/types/auth";
import { getApiErrorMessage } from "@/utils/api-errors";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const users = ref<Users | null>(null);
    const accessToken = ref<string | null>(null);
    const isAuthenticated = computed(() => !!accessToken.value);

    async function register(payload: RegisterPayload) {
      try {
        const response = await api.post("/auth/register", payload);

        const { message } = response.data;

        return {
          success: true,
          message,
        };
      } catch (error: unknown) {
        return {
          success: false,
          message: getApiErrorMessage(error),
        };
      }
    }

    async function login(payload: LoginPayload) {
      try {
        const response = await api.post("/auth/login", payload);

        const { data, message } = response.data;

        accessToken.value = data.accessToken;

        users.value = {
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,
        };

        return {
          success: true,
          message,
        };
      } catch (error: unknown) {
        return {
          success: false,
          message: getApiErrorMessage(error),
        };
      }
    }

    return {
      register,
      accessToken,
      login,
      users,
      isAuthenticated,
    };
  },
  {
    persist: {
      pick: ["accessToken", "users"],
    },
  },
);
