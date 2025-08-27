import express from 'express';
import accountsRepository from './accounts.repository.js';
import {
  createAccountsRouteSchema,
  deleteAccountsRouteSchema,
  updateAccountsRouteSchema,
} from './accounts.routes.schemas.js';
const accountsRouter = express.Router();

accountsRouter.get('/', async (req, res) => {
  const user = req.user;
  const accounts = await accountsRepository.getAll({ userId: user.id });
  res.json(accounts);
});

accountsRouter.post('/', async (req, res) => {
  const user = req.user;
  const body = createAccountsRouteSchema.body.parse(req.body);
  const newAccount = await accountsRepository.addOne({ ...body, userId: user.id });
  res.json(newAccount);
});

accountsRouter.delete('/:id', async (req, res) => {
  const user = req.user;
  const params = deleteAccountsRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const accountDeleted = await accountsRepository.deleteOneById({
    accountId: params.id,
    userId: user.id,
  });
  console.log('CUENTA ELIMINADO', accountDeleted);

  res.json(accountDeleted);
});

accountsRouter.put('/:id', async (req, res) => {
  const user = req.user;
  const body = updateAccountsRouteSchema.body.parse(req.body);
  const params = updateAccountsRouteSchema.params.parse(req.params);
  const accountUpdated = await accountsRepository.updateOneById(params.id, {
    ...body,
    userId: user.id,
  });
  res.json(accountUpdated);
});

export default accountsRouter;
