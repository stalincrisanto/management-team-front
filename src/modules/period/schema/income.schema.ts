import { z } from 'zod';

export const incomeSchema = z.object({
  incomeTypeId: z.string().min(1, 'El tipo de ingreso es requerido'),
  sourceName: z.string().trim().min(1, 'La fuente o aportante es requerido'),
  amount: z.number().min(0.01, 'El valor debe ser mayor a cero'),
  description: z.string().optional(),
});

export type IncomeFormValues = z.infer<typeof incomeSchema>;

export const incomeDefaultValues: IncomeFormValues = {
  sourceName: '',
  incomeTypeId: '',
  amount: 0,
  description: '',
};
