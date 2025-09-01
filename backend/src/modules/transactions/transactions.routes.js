import express from 'express';
import transactionsRepository from './transactions.repository.js';
import {
  createTransactionsRouteSchema,
  deleteTransactionsRouteSchema,
  updateTransactionsRouteSchema,
} from './transactions.routes.schemas.js';
const transactionsRouter = express.Router();

transactionsRouter.get('/', async (req, res) => {
  const user = req.user;
  const transactions = await transactionsRepository.getAll({ userId: user.id });
  
  res.json(transactions);
});

transactionsRouter.post('/', async (req, res) => {
  const user = req.user;
  const body = createTransactionsRouteSchema.body.parse(req.body);
  const newTransaction = await transactionsRepository.addOne({ ...body, userId: user.id });
  res.json(newTransaction);
});

transactionsRouter.delete('/:id', async (req, res) => {
  const user = req.user;
  const params = deleteTransactionsRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const transactionDeleted = await transactionsRepository.deleteOneById({
    id: params.id,
    userId: user.id,
  });
  console.log('CUENTA ELIMINADO', transactionDeleted);

  res.json(transactionDeleted);
});

transactionsRouter.put('/:id', async (req, res) => {
  const user = req.user;
  const body = updateTransactionsRouteSchema.body.parse(req.body);
  const params = updateTransactionsRouteSchema.params.parse(req.params);
  const payload = {
   ...body,
   ...params,
   userId: user.id,
  };

  const transactionUpdated = await transactionsRepository.updateOneById(payload);
  res.json(transactionUpdated);
});

export default transactionsRouter;
