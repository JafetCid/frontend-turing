import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Ingresa tu correo").email("Ingresa un correo válido"),
  password: z.string().min(1, "Ingresa tu contraseña"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Escribe al menos 2 caracteres").max(80, "Máximo 80 caracteres"),
  email: z.string().trim().min(1, "Ingresa tu correo").email("Ingresa un correo válido"),
  password: z.string().min(8, "Usa al menos 8 caracteres").max(72, "Máximo 72 caracteres"),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
