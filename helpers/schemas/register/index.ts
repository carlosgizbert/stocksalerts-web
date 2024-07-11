import { z } from 'zod';

export const registerFormSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'Digite pelo menos 6 caracteres'),
});

export type RegisterFormType = z.infer<typeof registerFormSchema>;
