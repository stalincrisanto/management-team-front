import { z } from 'zod';

export const seasonSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'El nombre es requerido')
      .max(100, 'El nombre no puede superar los 100 caracteres'),

    startDate: z.string().min(1, 'La fecha de inicio es requerida'),

    endDate: z.string().optional(),

    initialBalance: z
      .number({
        required_error: 'El saldo inicial es requerido',
        invalid_type_error: 'El saldo inicial debe ser numérico',
      })
      .min(0, 'El saldo inicial no puede ser negativo'),

    active: z.boolean(),
  })
  .refine(
    (values) => {
      if (!values.endDate) return true;

      return values.endDate >= values.startDate;
    },
    {
      path: ['endDate'],
      message: 'La fecha fin no puede ser menor a la fecha inicio',
    },
  );

export type SeasonFormValues = z.infer<typeof seasonSchema>;

export const seasonDefaultValues: SeasonFormValues = {
  name: '',
  startDate: '',
  endDate: '',
  initialBalance: 0,
  active: false,
};
