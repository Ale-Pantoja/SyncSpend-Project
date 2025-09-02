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
  const { name, currency, balance, is_active = true, userId } = payload;
  const response = await db.query(
    `
    INSERT INTO accounts (name, currency, balance, is_active, user_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  `,
    [name, currency, balance, is_active, userId],
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
  const { name, is_active } = payload;
  const updates = [];
  const values = [];
  let paramIndex = 1;

  if (name !== undefined) {
    updates.push(`name = $${paramIndex++}`);
    values.push(name);
  }

  if (is_active !== undefined) {
    updates.push(`is_active = $${paramIndex++}`);
    values.push(is_active);
  }

  const setClause = updates.join(', ');

  const query = `
    UPDATE accounts
    SET ${setClause}
    WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
    RETURNING *
  `;

  values.push(id, payload.userId);

  const response = await db.query(query, values);

  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'La cuenta no fue encontrada');
  }

  return response.rows[0];
};

const accountsRepository = { getAll, addOne, deleteOneById, updateOneById };

export default accountsRepository;
