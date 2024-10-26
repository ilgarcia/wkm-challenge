import * as z from "zod";

export const personSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Digite o nome",
    })
    .max(250, {
      message: "O limite é de 250 caracteres para o nome",
    }),
  email: z
    .string()
    .min(1, {
      message: "Digite o email",
    })
    .email({ message: "Digite um email válido" }),
  state: z.string().min(1, {
    message: "Escolha um estado",
  }),
  city: z.string().min(1, {
    message: "Escolha uma cidade",
  }),
});

export type PersonFormData = z.infer<typeof personSchema>;