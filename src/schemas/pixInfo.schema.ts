import z from "zod";

export type PixInfoType = z.infer<typeof pixInfoSchema>;


export const pixInfoSchema = z.object({
    type: z.enum(['CPF', 'CNPJ', 'Telefone', 'Email', 'Chave Aleatória'], "Escolha o tipo de chave"),
    key: z.string().min(1, "Digite sua chave pix"),
    bank: z.string().min(1, "Escolha qual instituição está registrada sua chave pix"),
    ownerName: z.string().min(1, "Digite o nome cadastrado na sua chave pix.")
})