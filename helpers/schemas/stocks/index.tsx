import { z } from 'zod';

export const createStockSchema = z.object({
  symbol: z.string().min(4, 'Preencha o simbolo').max(255),
  lower_tunnel_limit: z.string().min(0, 'Preencha o limite mínimo').max(1000000),
  upper_tunnel_limit: z.string().min(0, 'Preencha o limite máximo').max(1000000),
  check_frequency: z.string().min(1, 'Preencha a frequência').max(1440),
});

export const editStockSchema = z.object({
  symbol: z.string().min(4, 'Preencha o simbolo').max(255),
  lower_tunnel_limit: z.string().min(0, 'Preencha o limite mínimo').max(1000000),
  upper_tunnel_limit: z.string().min(0, 'Preencha o limite máximo').max(1000000),
  check_frequency: z.string().min(1, 'Preencha a frequência').max(1440),
});

export type CreateStockFormType = z.infer<typeof createStockSchema>;
export type EditStockFormType = z.infer<typeof editStockSchema>;