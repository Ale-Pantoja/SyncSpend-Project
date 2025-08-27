import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async (payload) => {
  const response = await db.query(
    `
    SELECT * FROM accounts 
    WHERE user_id = $1`,
    [payload.userId],
  );
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO accounts (name, currency, balance, user_id)
    VALUES ($1, $2, $3, $4) RETURNING *
  `,
    [payload.name, payload.currency, payload.balance, payload.userId],
  );
  return response.rows[0];
};

const deleteOneById = async (payload) => {
  const response = await db.query(
    `
    DELETE FROM accounts
    WHERE id = $1 AND user_id = $2  RETURNING *
  `,
    [payload.accountId, payload.userId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La cuenta fue no encontrado');
  }
  return response.rows[0];
};

const updateOneById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE accounts
    SET name = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *
  `,
    [payload.name, id, payload.userId],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La cuenta fue no encontrado');
  }
  return response.rows[0];
};

const accountsRepository = { getAll, addOne, deleteOneById, updateOneById };

export default accountsRepository;
