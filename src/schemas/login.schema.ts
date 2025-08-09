import { z } from "zod";

export type LoginTypes = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
    email: z.email("E-mail inválido"),
    password: z.string().min(6, "Sua senha deve ter pelo menos 6 caracteres"),
});