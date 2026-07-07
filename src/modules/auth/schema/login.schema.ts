import { z as zod } from 'zod';

export const loginSchema = zod.object({
  username: zod.string().trim().min(1, { message: 'El usuario es obligatorio' }),
  password: zod.string().min(1, { message: 'La contraseña es obligatoria' }),
});

export type LoginFormValues = zod.infer<typeof loginSchema>;
