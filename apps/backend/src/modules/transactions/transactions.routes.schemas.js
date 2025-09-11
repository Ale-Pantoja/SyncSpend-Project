import { z } from 'zod/v4';
import { transactionsSchema } from './transactions.schemas.js';

const transactionIdSchema = z
  .string()
  .transform((val) => Number(val))
  .refine((val) => !isNaN(val), 'El id tiene que ser un numero');

export const createTransactionsRouteSchema = {
  params: z.object({}),
  body: transactionsSchema.omit({ id: true }),
  queries: z.object({}),
};

export const deleteTransactionsRouteSchema = {
  params: z.object({ id: transactionIdSchema }),
  body: z.object({}),
  queries: z.object({}),
};

export const updateTransactionsRouteSchema = {
  params: z.object({ id: transactionIdSchema }),
  body: transactionsSchema.omit({ id: true }),
  queries: z.object({}),
};
