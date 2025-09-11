import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logInRouteSchema } from './login.routes.schemas.js';
import usersRepository from '../users/users.repository.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';
const loginRoutes = express.Router();
 
loginRoutes.post('/', async (req, res) => {
  const body = logInRouteSchema.body.parse(req.body);
  const user = await usersRepository.findByEmail({ email: body.email });
  if (!user) throw new ErrorWithStatus(400, 'Usuario o contraseña invalida');
  const isPasswordvalid = await bcrypt.compare(body.password, user.password_hash);
  if (!isPasswordvalid) throw new ErrorWithStatus(400, 'Usuario o contraseña invalida');
  if (!user.verify_email) throw new ErrorWithStatus(400, 'Usuario o contraseña invalida');
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('access_token', token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });

  res.status(200).json({ id: user.id, email: user.email, accessToken: token });
});

export default loginRoutes;
