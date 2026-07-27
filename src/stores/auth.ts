import { api } from "@/services/api";
import type { RegisterPayload,  Users } from "@/types/auth";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const authStore = defineStore("auth", () => {
  const user = ref<Users | null>(null);
  const accessToken = ref<string | null>(null);

  const isAuthenticated = computed(() => !!accessToken.value);

  async function register(payload: RegisterPayload) {
    try {
      const response = await api.post("/auth/register", payload);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    register,
  };
});
