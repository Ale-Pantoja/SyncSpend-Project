import { ErrorWithStatus } from '../../utils/errorTypes.js';
import jwt from 'jsonwebtoken';
import usersRepository from '../users/users.repository.js';

export const authenticateUser = async (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    throw new ErrorWithStatus(401, 'No estas autorizado para esta operacion');
  }

  const decodedToken = jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await usersRepository.findByEmail({ email: decodedToken.email });
  if (!user) {
    throw new ErrorWithStatus(401, 'No estas autorizado para esta operacion');
  }

  req.user = user;
  next();
};
