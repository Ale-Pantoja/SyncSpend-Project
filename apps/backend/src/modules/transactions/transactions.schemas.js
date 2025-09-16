import { z } from 'zod/v4';

const DESCRIPTION_REGEX = /^[a-zA-Z0-9\s.,!?/-]+$/;

export const transactionsSchema = z.object({
  id: z.number(),
  description: z.string().regex(DESCRIPTION_REGEX, 'La descripción no es válida.'),
  date: z.string().datetime('La fecha debe ser una cadena ISO 8601 válida.'),
  type: z.enum(['income', 'expense']),
  amount: z.coerce.number().positive('El monto debe ser un número positivo.'),
  accountId: z.number().int().positive('El ID de la cuenta debe ser un número entero positivo.'),
});
