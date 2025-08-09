import { z } from "zod";

export type RegisterTypes = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
    name: z.string().min(1, "Seu nome não pode ficar vazio").refine(value => value.includes(" "), "Você precisa informar nome e sobrenome"),
    email: z.email("E-mail inválido"),
    cell_phone: z.string().min(1, "Informe seu número do whatsapp"),
    password: z.string().min(6, "Sua senha deve ter pelo menos 6 caracteres"),
    confirm_password: z.string().min(6, "Sua senha deve ter pelo menos 6 caracteres"),
});