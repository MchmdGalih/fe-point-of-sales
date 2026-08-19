import { z } from "zod";

export const registerSchemas = z.object({
  username: z.string().min(3, "Username minimal 3 karakter!"),
  email: z.string().email("Email tidak valid!"),
  password: z.string().min(6, "Password minimal 6 karakter!"),
});

export const loginSchemas = z.object({
  email: z.string().email("Email tidak valid!"),
  password: z.string().min(6, "Password minimal 6 karakter!"),
});
