import { z } from 'zod';

export const createStockSchema = z.object({
  symbol: z.string().min(1, 'Preencha o simbolo').max(255),
  lower_tunnel_limit: z.number().min(0, 'Preencha o limite mínimo').max(1000000),
  upper_tunnel_limit: z.number().min(0, 'Preencha o limite máximo').max(1000000),
  check_frequency: z.number().min(1, 'Preencha a frequência').max(1440),
});

export type CreateStockFormData = z.infer<typeof createStockSchema>;
