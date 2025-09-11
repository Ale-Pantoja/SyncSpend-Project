import { z } from 'zod/v4';

const NAME_REGEX = /^[a-zA-Z0-9\s]+$/;

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  name: z.string().regex(NAME_REGEX, 'El nombre no es valido.'),
  passwordHash: z.string(),
});
