import { z } from 'zod';

export const periodSchema = z.object({
  seasonId: z.string().min(1, 'La temporada es requerida'),
  title: z.string().trim().min(1, 'El título es requerido'),
  periodDate: z.string().min(1, 'La fecha es requerida'),
  opponent: z.string().trim().min(1, 'El rival es requerido'),
});

export type PeriodFormValues = z.infer<typeof periodSchema>;

export const periodDefaultValues: PeriodFormValues = {
  seasonId: '',
  title: '',
  periodDate: '',
  opponent: '',
};
