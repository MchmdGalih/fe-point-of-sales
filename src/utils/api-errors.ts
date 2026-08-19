import axios from "axios";

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Terjadi kesalahan pada server";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan pada server";
};
