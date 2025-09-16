import { z } from 'zod/v4';
import { accountSchema } from './accounts.schemas.js';

const accountIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createAccountsRouteSchema = {
  params: z.object({}),
  body: accountSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deleteAccountsRouteSchema = {
  params: z.object({ id: accountIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const updateAccountsRouteSchema = {
  params: z.object({ id: accountIdSchema }),
  body: z.object({
    name: z.string().optional(),
    is_active: z.boolean().optional(),
  }),
  queries: z.object({}),
};
