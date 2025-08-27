import { z } from 'zod/v4';

const NAME_REGEX = /^[A-Z][a-z]*[ ][A-Z][a-z]{3,}[ ]{0,1}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

export const createUserRouteSchema = {
  params: z.object({}),
  body: z.object({
    email: z.email('Tiene que ser un email valido'),
    name: z.string().regex(NAME_REGEX, 'El nombre no es valido.'),
    password: z
      .string()
      .regex(
        PASSWORD_REGEX,
        'Debe tener al menos 6 caracteres e incluir una letra, un número y un carácter especial (!@#$%^&*).',
      ),
  }),
  queries: z.object({}),
};

export const verifyUserRouteSchema = {
  params: z.object({}),
  body: z.object({
    token: z.jwt('Tiene que ser un token valido'),
  }),
  queries: z.object({}),
};
