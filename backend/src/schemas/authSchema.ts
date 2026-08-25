import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  surname: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
  username: z
    .string()
    .min(3, "O username deve ter pelo menos 3 caracteres")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username pode conter apenas letras, números e underline",
    ),
  email: z.email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.email("Formato de e-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
