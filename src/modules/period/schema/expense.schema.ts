import { z } from 'zod';

export const expenseSchema = z.object({
  expenseCategoryId: z.string().min(1, 'La categoría es requerida'),
  concept: z.string().trim().min(1, 'El concepto es requerido'),
  amount: z.number().min(0.01, 'El valor debe ser mayor a cero'),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;

export const expenseDefaultValues: ExpenseFormValues = {
  concept: '',
  expenseCategoryId: '',
  amount: 0,
};
