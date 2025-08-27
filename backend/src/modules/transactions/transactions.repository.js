import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async (payload) => {
  const response = await db.query(
    `
    SELECT transactions.*, accounts.name AS account_name FROM transactions
    INNER JOIN accounts
    ON transactions.account_id = accounts.id
    WHERE transactions.user_id = $1`,
    [payload.userId],
  );
  return response.rows;
};

const addOne = async (payload) => {
  const client = await db.getClient();
  let released = false;

  try {
    await client.query('BEGIN');

    const transactionResponse = await client.query(
      `
      INSERT INTO transactions (description, date, type, amount, account_id, user_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `,
      [payload.description, payload.date, payload.type, payload.amount, payload.accountId, payload.userId],
    );
    const newTransaction = transactionResponse.rows[0];

    const accountResponse = await client.query(
      `SELECT id, balance FROM accounts WHERE id = $1 AND user_id = $2 FOR UPDATE`,
      [payload.accountId, payload.userId]
    );

    if (accountResponse.rowCount === 0) {
      throw new ErrorWithStatus(404, 'La cuenta no fue encontrada');
    }

    const currentAccount = accountResponse.rows[0];
    let newBalance = parseFloat(currentAccount.balance);
    const amount = parseFloat(payload.amount);

    if (payload.type === 'income') {
      newBalance += amount;
    } else if (payload.type === 'expense') {
      if (newBalance < amount) {
        throw new ErrorWithStatus(400, 'Saldo insuficiente en la cuenta');
      }
      newBalance -= amount;
    }

    await client.query(
      `
      UPDATE accounts
      SET balance = $1
      WHERE id = $2 AND user_id = $3
    `,
      [newBalance, payload.accountId, payload.userId],
    );

    await client.query('COMMIT');
    released = true;

    return {
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
    };

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error en addOne de transactionsRepository:', error);
    throw error;
  } finally {
    if (!released) {
      client.release();
    }
  }
};

const deleteOneById = async (payload) => {
  const client = await db.getClient();
  let released = false;

  try {
    await client.query('BEGIN');

    const transactionResponse = await client.query(
      'SELECT type, amount, account_id FROM transactions WHERE id = $1 AND user_id = $2 FOR UPDATE',
      [payload.id, payload.userId]
    );
    if (transactionResponse.rowCount === 0) {
      throw new ErrorWithStatus(404, 'La transacción no fue encontrada');
    }
    const transactionToDelete = transactionResponse.rows[0];

    const accountResponse = await client.query(
      `SELECT id, balance FROM accounts WHERE id = $1 AND user_id = $2 FOR UPDATE`,
      [transactionToDelete.account_id, payload.userId]
    );

    if (accountResponse.rowCount === 0) {
      throw new ErrorWithStatus(404, 'La cuenta asociada a la transacción no fue encontrada');
    }

    const currentAccount = accountResponse.rows[0];
    let newBalance = parseFloat(currentAccount.balance);
    const amount = parseFloat(transactionToDelete.amount);

    if (transactionToDelete.type === 'income') {
      newBalance -= amount;
    } else if (transactionToDelete.type === 'expense') {
      newBalance += amount;
    }

    await client.query(
      `
      UPDATE accounts
      SET balance = $1
      WHERE id = $2 AND user_id = $3
    `,
      [newBalance, transactionToDelete.account_id, payload.userId],
    );

    const deleteResponse = await client.query(
      `
      DELETE FROM transactions
      WHERE id = $1 AND user_id = $2 RETURNING *
    `,
      [payload.id, payload.userId],
    );
    const deletedTransaction = deleteResponse.rows[0];

    await client.query('COMMIT');
    released = true;

    return {
      ...deletedTransaction,
      amount: parseFloat(deletedTransaction.amount),
    };

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error en deleteOneById de transactionsRepository:', error);
    throw error;
  } finally {
    if (!released) {
      client.release();
    }
  }
};

const updateOneById = async (payload) => {
    const client = await db.getClient();
    let released = false;

    try {
        await client.query('BEGIN');

        const originalTransactionResponse = await client.query(
            'SELECT type, amount, account_id FROM transactions WHERE id = $1 AND user_id = $2 FOR UPDATE',
            [payload.id, payload.userId]
        );

        if (originalTransactionResponse.rowCount === 0) {
            throw new ErrorWithStatus(404, 'La transacción no fue encontrada');
        }
        const originalTransaction = originalTransactionResponse.rows[0];

        const oldAccountResponse = await client.query(
            `SELECT id, balance FROM accounts WHERE id = $1 AND user_id = $2 FOR UPDATE`,
            [originalTransaction.account_id, payload.userId]
        );

        if (oldAccountResponse.rowCount === 0) {
            throw new ErrorWithStatus(404, 'La cuenta original no fue encontrada');
        }

        const oldAccountId = originalTransaction.account_id;
        const oldAccountBalance = parseFloat(oldAccountResponse.rows[0].balance);
        const originalAmount = parseFloat(originalTransaction.amount);

        const newAccountId = payload.accountId;
        let newAccountBalance;

        if (String(oldAccountId) !== String(newAccountId)) {
            const newAccountResponse = await client.query(
                `SELECT id, balance FROM accounts WHERE id = $1 AND user_id = $2 FOR UPDATE`,
                [newAccountId, payload.userId]
            );
            if (newAccountResponse.rowCount === 0) {
                throw new ErrorWithStatus(404, 'La nueva cuenta no fue encontrada');
            }
            newAccountBalance = parseFloat(newAccountResponse.rows[0].balance);
        } else {
            newAccountBalance = oldAccountBalance;
        }

        let finalOldAccountBalance = oldAccountBalance;
        if (originalTransaction.type === 'income') {
            finalOldAccountBalance -= originalAmount;
        } else if (originalTransaction.type === 'expense') {
            finalOldAccountBalance += originalAmount;
        }

        const updatedAmount = parseFloat(payload.amount);

        if (payload.type === 'income') {
            if (String(oldAccountId) === String(newAccountId)) {
                finalOldAccountBalance += updatedAmount;
            } else {
                newAccountBalance += updatedAmount;
            }
        } else if (payload.type === 'expense') {
            if (String(oldAccountId) === String(newAccountId)) {
                if (finalOldAccountBalance < updatedAmount) {
                    throw new ErrorWithStatus(400, 'Saldo insuficiente en la cuenta para la actualización.');
                }
                finalOldAccountBalance -= updatedAmount;
            } else {
                if (newAccountBalance < updatedAmount) {
                    throw new ErrorWithStatus(400, 'Saldo insuficiente en la cuenta para la actualización.');
                }
                newAccountBalance -= updatedAmount;
            }
        }

        if (String(oldAccountId) !== String(newAccountId)) {
            await client.query(
                `UPDATE accounts SET balance = $1 WHERE id = $2 AND user_id = $3`,
                [finalOldAccountBalance, oldAccountId, payload.userId],
            );
            await client.query(
                `UPDATE accounts SET balance = $1 WHERE id = $2 AND user_id = $3`,
                [newAccountBalance, newAccountId, payload.userId],
            );
        } else {
            await client.query(
                `UPDATE accounts SET balance = $1 WHERE id = $2 AND user_id = $3`,
                [finalOldAccountBalance, oldAccountId, payload.userId],
            );
        }

        const updateResponse = await client.query(
            `
            UPDATE transactions
            SET description = $1, date = $2, type = $3, amount = $4, account_id = $5
            WHERE id = $6 AND user_id = $7
            RETURNING
              transactions.id,
              transactions.description,
              transactions.date,
              transactions.type,
              transactions.amount,
              transactions.account_id,
              (SELECT name FROM accounts WHERE id = transactions.account_id) AS account_name
            `,
            [payload.description, payload.date, payload.type, payload.amount, payload.accountId, payload.id, payload.userId],
        );
        const updatedTransaction = updateResponse.rows[0];

        await client.query('COMMIT');
        released = true;
        return {
            ...updatedTransaction,
            amount: parseFloat(updatedTransaction.amount),
        };

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error en updateOneById de transactionsRepository:', error);
        throw error;
    } finally {
        if (!released) {
            client.release();
        }
    }
};


const transactionsRepository = { getAll, addOne, deleteOneById, updateOneById };

export default transactionsRepository;
