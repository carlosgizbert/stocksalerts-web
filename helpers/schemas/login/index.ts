import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Digite um email válido'),
  password: z.string().min(6, 'Digite pelo menos 6 caracteres'),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
