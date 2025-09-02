import { z } from 'zod/v4';

const NAME_REGEX = /^[a-zA-Z0-9\s]+$/;

export const accountSchema = z.object({
  id: z.number(),
  name: z.string().regex(NAME_REGEX, 'El nombre no es válido.'),
  currency: z.enum(['VES', 'USD']),
  balance: z.coerce.number().positive(),
  is_active: z.boolean().default(true).optional(),
});
