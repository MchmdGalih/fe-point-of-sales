import { api, refreshApi } from "@/services/api";
import type { LoginPayload, RegisterPayload, Users } from "@/types/auth";
import { getApiErrorMessage } from "@/utils/api-errors";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref<Users | null>(null);
    const accessToken = ref<string | null>(null);
    const isAuthenticated = computed(() => !!accessToken.value);

    function setAccessToken(token: string | null): void {
      accessToken.value = token;
    }

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

        const accessToken = data.accessToken;

        setAccessToken(accessToken);

        user.value = {
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

    async function refreshToken() {
      try {
        console.log("refresh token dimulai!");

        const response = await refreshApi.post("/auth/refresh-token");

        const { data } = response.data;

        console.log("response data", data);

        const newAccessToken = data.accessToken;

        setAccessToken(newAccessToken);
        console.log("new access token", newAccessToken);

        return {
          success: true,
          accessToken: newAccessToken,
        };
      } catch (error) {
        return {
          success: false,
          message: getApiErrorMessage(error),
        };
      }
    }

    async function logout() {
      try {
        const response = await api.post("/auth/logout");
        const { message } = response.data;
        setAccessToken(null);
        accessToken.value = null;
        user.value = null;
        return {
          success: true,
          message,
        };
      } catch (error) {
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
      user,
      isAuthenticated,
      setAccessToken,
      refreshToken,
      logout,
    };
  },
  {
    persist: {
      pick: ["accessToken", "user"],
    },
  },
);
